import pool from "../../config/db.js";

export const findUserByPhone = async (phone) => {
    const { rows } = await pool.query(
        `
        SELECT id, phone, role
        FROM users
        WHERE phone = $1
        `,
        [phone],
    );

    return rows[0];
};

export const findById = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT id, phone, role
        FROM users
        WHERE id = $1
        `,
        [id],
    );

    return rows[0];
};
