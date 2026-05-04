import pool from "../../config/db.js";
import AppError from "../../utils/AppError.js";

export const createJob = async (data, clientId) => {
    const { skill, city, area, description, lat, lng } = data;

    if (!skill || !city) {
        throw new AppError("Skill and city are required", 400);
    }

    if (lat == null || lng == null) {
        throw new AppError("Location is required", 400);
    }

    const query = `
    INSERT INTO job_requests
    (client_id, skill, city, area, description, lat, lng, status)
    VALUES ($1,$2,$3,$4,$5,$6,$7,'pending')
    RETURNING id, skill, city, area, status, created_at;
  `;

    const { rows } = await pool.query(query, [
        clientId,
        skill,
        city,
        area,
        description,
        lat,
        lng,
    ]);

    return rows[0];
};

export const getMatchesByJob = async (jobId) => {
    const query = `
    SELECT w.id, w.name, w.phone, w.city, w.rating
    FROM matches m
    JOIN workers w ON w.id = m.worker_id
    WHERE m.job_id = $1
    ORDER BY m.rank;
    `;

    const { rows } = await pool.query(query, [jobId]);
    return rows;
};

export const findJobById = async (jobId) => {
    const query = `
    SELECT * FROM job_requests
    WHERE id = $1
  `;

    const { rows } = await pool.query(query, [jobId]);
    return rows[0];
};

export const findByClientId = async (clientId) => {
    const query = `
    SELECT j.*, r.rating
    FROM job_requests j
    LEFT JOIN ratings r ON r.job_id = j.id
    WHERE j.client_id = $1
    ORDER BY j.created_at DESC
  `;

    const { rows } = await pool.query(query, [clientId]);
    return rows;
};

export const findJobsForWorker = async (workerId) => {
    const query = `     
    SELECT 
        j.id,
        j.skill,
        j.city,
        j.area,
        j.status,
        m.rank
    FROM matches m
    JOIN job_requests j ON j.id = m.job_id
    WHERE m.worker_id = $1
      AND j.status = 'pending'
    ORDER BY m.rank ASC;
  `;
    const { rows } = await pool.query(query, [workerId]);
    return rows;
};

export const assignJob = async (jobId, workerId) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const updateRes = await client.query(
            `
        UPDATE job_requests
        SET status = 'accepted'
        WHERE id = $1
        AND status = 'pending'
        RETURNING id
        `,
            [jobId],
        );

        if (updateRes.rowCount === 0) {
            throw new AppError("Job already accepted", 400);
        }

        await client.query(
            `
        INSERT INTO job_assignments (job_id, worker_id)
        VALUES ($1,$2)
        `,
            [jobId, workerId],
        );

        await client.query("COMMIT");

        return updateRes.rows[0];
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
};

export const updateJobStatus = async (jobId, status) => {
    await pool.query(
        `
    UPDATE job_requests
    SET status = $2
    WHERE id = $1
  `,
        [jobId, status],
    );
};

export const getWorkerAssignments = async (workerId) => {
    const query = `
        SELECT 
            j.id, j.skill, j.city, j.area, j.description, j.status, 
            c.name AS client_name, c.phone AS client_phone,
            ja.created_at as accepted_at
        FROM job_assignments ja
        JOIN job_requests j ON ja.job_id = j.id
        JOIN clients c ON j.client_id = c.id
        WHERE ja.worker_id = $1
        ORDER BY ja.created_at DESC;
    `;
    const { rows } = await pool.query(query, [workerId]);
    return rows;
};

export const getAssignedWorker = async (jobId) => {
    const { rows } = await pool.query(
        `
    SELECT worker_id
    FROM job_assignments
    WHERE job_id = $1
  `,
        [jobId],
    );

    return rows[0]?.worker_id;
};

export const createRating = async ({
    jobId,
    clientId,
    workerId,
    rating,
    review,
}) => {
    await pool.query(
        `
    INSERT INTO ratings (job_id, worker_id, client_id, rating, review)
    VALUES ($1,$2,$3,$4,$5)
  `,
        [jobId, workerId, clientId, rating, review],
    );
};

export const updateWorkerRating = async (workerId) => {
    const { rows } = await pool.query(
        `
    SELECT AVG(rating)::numeric(2,1) as avg_rating
    FROM ratings
    WHERE worker_id = $1
  `,
        [workerId],
    );

    const avg = rows[0].avg_rating || 0;

    await pool.query(
        `
    UPDATE workers
    SET rating = $2
    WHERE id = $1
  `,
        [workerId, avg],
    );
};
