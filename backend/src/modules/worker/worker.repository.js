import pool from "../../config/db.js";

export const createWorker = async ({ name, phone, city, area }) => {
    const query = `
    INSERT INTO workers (name, phone, city, area)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, phone, city, area, availability;
  `;

    const values = [name, phone, city, area];
    const { rows } = await pool.query(query, values);

    return rows[0];
};

export const assignSkills = async (workerId, skills) => {
    const query = `
    INSERT INTO worker_skills (worker_id, skill_id)
    VALUES ($1, $2);
  `;

    for (const skillId of skills) {
        await pool.query(query, [workerId, skillId]);
    }
};

export const updateAvailability = async (workerId, availability) => {
    const query = `
    UPDATE workers
    SET availability = $1
    WHERE id = $2
    RETURNING id, name, availability;
  `;

    const { rows } = await pool.query(query, [availability, workerId]);
    return rows[0];
};
