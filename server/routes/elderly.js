const express = require('express');
const router = express.Router();
const elderlyController = require('../controllers/elderlyController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Public routes
router.get('/', elderlyController.getAllElderly);
router.get('/:id', elderlyController.getElderlyById);
router.get('/status/:status', elderlyController.getElderlyByStatus);

// Protected routes (admin only)
router.post('/', auth, role('admin'), elderlyController.createElderly);
router.put('/:id', auth, role('admin'), elderlyController.updateElderly);
router.put('/:id/status', auth, role('admin'), elderlyController.updateStatus);
router.delete('/:id', auth, role('admin'), elderlyController.deleteElderly);

module.exports = router; 