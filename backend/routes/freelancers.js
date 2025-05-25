const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Get all freelancers (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                u.id,
                u.name,
                u.email,
                u.profile_picture,
                u.created_at,
                f.is_approved,
                f.is_verified,
                f.is_suspended,
                f.skills
            FROM users u
            JOIN freelancers f ON u.id = f.user_id
            ORDER BY u.created_at DESC
        `);

        res.json({ freelancers: result.rows });
    } catch (error) {
        console.error('Error fetching freelancers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Approve freelancer (admin only)
router.post('/:id/approve', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            'UPDATE freelancers SET is_approved = true WHERE user_id = $1',
            [id]
        );
        res.json({ message: 'Freelancer approved successfully' });
    } catch (error) {
        console.error('Error approving freelancer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Reject freelancer (admin only)
router.post('/:id/reject', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            'DELETE FROM freelancers WHERE user_id = $1',
            [id]
        );
        res.json({ message: 'Freelancer rejected successfully' });
    } catch (error) {
        console.error('Error rejecting freelancer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify freelancer (admin only)
router.post('/:id/verify', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            'UPDATE freelancers SET is_verified = true WHERE user_id = $1',
            [id]
        );
        res.json({ message: 'Freelancer verified successfully' });
    } catch (error) {
        console.error('Error verifying freelancer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Suspend freelancer (admin only)
router.post('/:id/suspend', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            'UPDATE freelancers SET is_suspended = true WHERE user_id = $1',
            [id]
        );
        res.json({ message: 'Freelancer suspended successfully' });
    } catch (error) {
        console.error('Error suspending freelancer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 