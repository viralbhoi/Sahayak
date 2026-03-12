export const createJob = async (
    client,
    { client_id, skill_id, city, area, urgency },
) => {
    const query = `
    INSERT INTO job_requests (client_id, skill_id, city, area, urgency)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

    const values = [client_id, skill_id, city, area, urgency];
    const { rows } = await client.query(query, values);

    return rows[0];
};

export const getMatchesByJob = async (dbClient, jobId) => {
    const query = `
    SELECT 
      m.rank,
      w.id AS worker_id,
      w.name,
      w.phone,
      w.area
    FROM matches m
    JOIN workers w ON w.id = m.worker_id
    WHERE m.job_id = $1
    ORDER BY m.rank;
  `;

    const { rows } = await dbClient.query(query, [jobId]);
    return rows;
};

export const findJobById = async (jobId) => {
    const query = `
    SELECT id, client_id
    FROM job_requests
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
    SELECT j.*
    FROM job_requests j
    JOIN worker_skills ws ON ws.skill_id = j.skill_id
    JOIN workers w ON w.id = ws.worker_id
    WHERE w.id = $1
      AND w.availability = true
      AND w.city = j.city
    ORDER BY j.created_at DESC
  `;

    const { rows } = await pool.query(query, [workerId]);
    return rows;
};

export const assignJob = async (jobId, workerId) => {
    await pool.query(
        `
    INSERT INTO job_assignments (job_id, worker_id)
    VALUES ($1,$2)
  `,
        [jobId, workerId],
    );

    await pool.query(
        `
    UPDATE job_requests
    SET status = 'accepted'
    WHERE id = $1
  `,
        [jobId],
    );
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
