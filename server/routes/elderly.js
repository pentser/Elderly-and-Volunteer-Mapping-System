/**
 * Elderly Management Routes
 * Defines endpoints for managing elderly profiles and status
 * Includes CRUD operations and status management
 */

const express = require('express');
const router = express.Router();
const {
  getAllElderly,
  getElderlyById,
  getElderlyByStatus,
  createElderly,
  updateElderly,
  updateStatus,
  deleteElderly
} = require('../controllers/elderlyController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

/**
 * @route   GET /api/elderly
 * @desc    Get all elderly profiles
 * @access  Public
 */
router.get('/', getAllElderly);

/**
 * @route   GET /api/elderly/:id
 * @desc    Get elderly profile by ID
 * @access  Public
 */
router.get('/:id', getElderlyById);

/**
 * @route   GET /api/elderly/status/:status
 * @desc    Get elderly profiles by status
 * @access  Public
 */
router.get('/status/:status', getElderlyByStatus);

/**
 * @route   POST /api/elderly
 * @desc    Create new elderly profile
 * @access  Private (Admin only)
 */
router.post('/', auth, role('admin'), createElderly);

/**
 * @route   PUT /api/elderly/:id
 * @desc    Update elderly profile
 * @access  Private (Admin only)
 */
router.put('/:id', auth, role('admin'), updateElderly);

/**
 * @route   PUT /api/elderly/:id/status
 * @desc    Update elderly status
 * @access  Private (Admin only)
 */
router.put('/:id/status', auth, role('admin'), updateStatus);

/**
 * @route   DELETE /api/elderly/:id
 * @desc    Delete elderly profile
 * @access  Private (Admin only)
 */
router.delete('/:id', auth, role('admin'), deleteElderly);

module.exports = router; 