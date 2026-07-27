import pool from "../../config/db.js";

export const create = async ({
    userId,
    refreshTokenHash,
    deviceName,
    userAgent,
    ipAddress,
    expiresAt,
}) => {
    const query = `
        INSERT INTO sessions (
            user_id,
            refresh_token_hash,
            device_name,
            user_agent,
            ip_address,
            expires_at
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const values = [
        userId,
        refreshTokenHash,
        deviceName,
        userAgent,
        ipAddress,
        expiresAt,
    ];

    const { rows } = await pool.query(query, values);

    return rows[0];
};

export const findById = async (id) => {
    const query = `
        SELECT *
        FROM sessions
        WHERE id = $1
          AND revoked_at IS NULL
          AND expires_at > NOW();
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];
};

// export const findByRefreshTokenHash = async (hash) => {
//     const query = `
//         SELECT *
//         FROM sessions
//         WHERE refresh_token_hash = $1
//           AND revoked_at IS NULL
//           AND expires_at > NOW();
//     `;

//     const { rows } = await pool.query(query, [hash]);

//     return rows[0];
// };

export const updateRefreshTokenHash = async (id, refreshTokenHash) => {
    const query = `
        UPDATE sessions
        SET refresh_token_hash = $1
        WHERE id = $2
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [refreshTokenHash, id]);

    return rows[0];
};

export const updateLastActivity = async (id) => {
    const query = `
        UPDATE sessions
        SET last_activity_at = NOW()
        WHERE id = $1
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];
};

export const revoke = async (id) => {
    const query = `
        UPDATE sessions
        SET revoked_at = NOW()
        WHERE id = $1
          AND revoked_at IS NULL
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];
};
export const revokeAll = async (userId) => {
    const query = `
        UPDATE sessions
SET revoked_at = NOW()
WHERE user_id = $1
  AND revoked_at IS NULL;
    `;

    await pool.query(query, [userId]);
};

export const deleteExpired = async () => {
    await pool.query(`
        DELETE
        FROM sessions
        WHERE expires_at < NOW();
    `);
};

export const findAllByUserId = async (userId) => {
    const query = `
        SELECT *
        FROM sessions
        WHERE user_id = $1
          AND revoked_at IS NULL
        ORDER BY created_at DESC;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows;
};
