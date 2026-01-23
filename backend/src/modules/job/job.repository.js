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
