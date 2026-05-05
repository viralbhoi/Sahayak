import pool from "../../config/db.js";

export const createNotification = async (userId, role, message) => {
    await pool.query(
        `
    INSERT INTO notifications (user_id, role, message)
    VALUES ($1,$2,$3)
  `,
        [userId, role, message],
    );
};

export const getNotifications = async (userId) => {
    const { rows } = await pool.query(
        `
    SELECT *
    FROM notifications
    WHERE user_id = $1
    ORDER BY created_at DESC
  `,
        [userId],
    );

    return rows;
};

export const markAsRead = async (id, userId) => {
    await pool.query(
        `
    UPDATE notifications
    SET is_read = true
    WHERE id = $1 AND user_id = $2
  `,
        [id, userId],
    );
};
