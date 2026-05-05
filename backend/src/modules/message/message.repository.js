import pool from "../../config/db.js";

export const createMessage = async ({
    jobId,
    senderId,
    senderRole,
    message,
}) => {
    const { rows } = await pool.query(
        `
    INSERT INTO messages (job_id, sender_id, sender_role, message)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
    `,
        [jobId, senderId, senderRole, message],
    );

    return rows[0];
};

export const getMessagesByJob = async (jobId) => {
    const { rows } = await pool.query(
        `
    SELECT *
    FROM messages
    WHERE job_id = $1
    ORDER BY created_at ASC
    `,
        [jobId],
    );

    return rows;
};
