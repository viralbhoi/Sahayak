import pool from "../../config/db.js";

export const findUserByPhone = async (phone) => {
    const query = `
    SELECT id, phone, 'worker' AS role
    FROM workers
    WHERE phone = $1

    UNION

    SELECT id, phone, 'client' AS role
    FROM clients
    WHERE phone = $1;
  `;
    const { rows } = await pool.query(query, [phone]);
    return rows[0];
};
