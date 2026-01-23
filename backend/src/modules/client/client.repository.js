import pool from "../../config/db.js";

export const createClient = async ({ name, phone, city }) => {
    const query = `
    INSERT INTO clients (name, phone, city)
    VALUES ($1, $2, $3)
    RETURNING id, name, phone, city;
  `;

    const values = [name, phone, city];
    const { rows } = await pool.query(query, values);

    return rows[0];
};
