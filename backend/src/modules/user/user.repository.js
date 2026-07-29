import pool from "../../config/db.js";

export const findById = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT
            id,
            name,
            phone,
            email,
            role,
            is_verified,
            is_active,
            created_at,
            updated_at
        FROM users
        WHERE id = $1;
        `,
        [id],
    );

    return rows[0];
};

export const update = async ({ id, name, email }) => {
    const query = `
        UPDATE users
        SET
            name = $1,
            email = $2,
            updated_at = NOW()
        WHERE id = $3
        RETURNING
            id,
            name,
            phone,
            email,
            role,
            is_verified,
            is_active,
            created_at,
            updated_at;
    `;

    const { rows } = await pool.query(query, [name, email, id]);

    return rows[0];
};

export const findPublicProfile = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT
            id,
            phone,
            name,
            email,
            role,
            is_verified
        FROM users
        WHERE id = $1;
        `,
        [id],
    );

    return rows[0];
};

export const findByEmail = async (email) => {
    const { rows } = await pool.query(
        `
        SELECT id, email
        FROM users
        WHERE email = $1;
        `,
        [email],
    );

    return rows[0];
};

export const findByPhone = async (phone) => {
    const { rows } = await pool.query(
        `
        SELECT id, phone
        FROM users
        WHERE phone = $1;
        `,
        [phone],
    );

    return rows[0];
};
