export const findEligibleWorkers = async (client, job) => {
    const query = `
    SELECT 
      w.id,
      w.name,
      w.phone,
      w.area,
      MAX(m.created_at) AS last_assigned_at
    FROM workers w
    LEFT JOIN matches m ON m.worker_id = w.id
    WHERE w.skills @> ARRAY[$1::text] 
      AND w.city = $2
      AND w.availability = TRUE
    GROUP BY w.id
    ORDER BY 
      (w.area = $3) DESC,
      last_assigned_at NULLS FIRST
    LIMIT 5;
    `;

    const values = [job.skill, job.city, job.area];
    const { rows } = await client.query(query, values);

    return rows;
};

export const insertMatch = async (client, jobId, workerId, rank) => {
    const query = `
    INSERT INTO matches (job_id, worker_id, rank)
    VALUES ($1, $2, $3);
  `;

    await client.query(query, [jobId, workerId, rank]);
};
