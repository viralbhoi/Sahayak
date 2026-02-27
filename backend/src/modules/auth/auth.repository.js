import pool from "../../config/db.js";

export const saveOtp = async (phone, otp, expiresAt) => {
    const query = `
    INSERT INTO otp_codes (phone, otp, expires_at)
    VALUES ($1, $2, $3);
  `;
    await pool.query(query, [phone, otp, expiresAt]);
};

export const findLatestOtp = async (phone) => {
    const query = `
    SELECT *
    FROM otp_codes
    WHERE phone = $1
      AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1;
  `;
    const { rows } = await pool.query(query, [phone]);
    return rows[0];
};

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

export const countRecentOtps = async (phone) => {
    const query = `
    SELECT COUNT(*) 
    FROM otp_codes
    WHERE phone = $1
      AND created_at > NOW() - INTERVAL '5 minutes';
  `;

    const { rows } = await pool.query(query, [phone]);
    return Number(rows[0].count);
};

export const incrementOtpAttempts = async (id) => {
    const query = `
    UPDATE otp_codes
    SET attempts = attempts + 1
    WHERE id = $1;
  `;
    await pool.query(query, [id]);
};
