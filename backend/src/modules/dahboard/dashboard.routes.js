import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import pool from "../../config/db.js";

const router = express.Router();

router.get(
    "/client/stats",
    protect,
    allowRoles("client"),
    async (req, res, next) => {
        try {
            const query = `
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status IN ('pending', 'accepted', 'in_progress') THEN 1 ELSE 0 END) as active,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
            FROM job_requests WHERE client_id = $1
        `;
            const { rows } = await pool.query(query, [req.user.id]);

            res.status(200).json({
                success: true,
                data: {
                    total: Number(rows[0].total) || 0,
                    active: Number(rows[0].active) || 0,
                    completed: Number(rows[0].completed) || 0,
                },
            });
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    "/worker/stats",
    protect,
    allowRoles("worker"),
    async (req, res, next) => {
        try {
            const workerQuery = `SELECT rating, area FROM workers WHERE id = $1`;
            const { rows: workerRows } = await pool.query(workerQuery, [
                req.user.id,
            ]);

            const jobsQuery = `
            SELECT COUNT(*) as completed 
            FROM job_assignments ja 
            JOIN job_requests jr ON ja.job_id = jr.id 
            WHERE ja.worker_id = $1 AND jr.status = 'completed'
        `;
            const { rows: jobRows } = await pool.query(jobsQuery, [
                req.user.id,
            ]);

            res.status(200).json({
                success: true,
                data: {
                    rating: workerRows[0].rating,
                    area: workerRows[0].area,
                    completed: Number(jobRows[0].completed) || 0,
                },
            });
        } catch (error) {
            next(error);
        }
    },
);

export default router;
