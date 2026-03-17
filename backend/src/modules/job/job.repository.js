import pool from "../../config/db.js";
import AppError from "../../utils/AppError.js";

export const createJob = async (data, clientId) => {
    const { skill, city, area, description } = data;

    const query = `
    INSERT INTO job_requests
    (client_id, skill, city, area, description, status)
    VALUES ($1,$2,$3,$4,$5,'pending')
    RETURNING id, skill, city, area, status;
  `;

    const { rows } = await pool.query(query, [
        clientId,
        skill,
        city,
        area,
        description,
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
    SELECT *
    FROM job_requests
    WHERE client_id = $1
    ORDER BY created_at DESC
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
