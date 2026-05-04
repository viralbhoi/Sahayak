import pool from "../../config/db.js";

export const createWorker = async ({
    name,
    phone,
    city,
    area,
    skills,
    lat,
    lng,
}) => {
    const query = `
    INSERT INTO workers (name, phone, city, area, skills, lat, lng)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING id, name, phone, city, area, skills, availability;
  `;

    const { rows } = await pool.query(query, [name, phone, city, area, skills, lat, lng]);

    return rows[0];
};

export const updateAvailability = async (workerId, availability) => {
    const query = `
    UPDATE workers
    SET availability = $1
    WHERE id = $2
    RETURNING id, availability;
  `;

    const { rows } = await pool.query(query, [availability, workerId]);

    return rows[0];
};

export const findById = async (id) => {
    const query = `
    SELECT *
    FROM workers
    WHERE id = $1
  `;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

export const updateSkills = async (workerId, skillsArray) => {
    const query = `
        UPDATE workers 
        SET skills = $1 
        WHERE id = $2 
        RETURNING id, skills;
    `;
    const { rows } = await pool.query(query, [skillsArray, workerId]);
    return rows[0];
};
