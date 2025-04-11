/**
 * Elderly Controller
 * Handles all operations related to elderly profiles
 * Includes CRUD operations and status management
 */

const Elderly = require('../models/elderly');

/**
 * Get all elderly profiles
 * @route GET /api/elderly
 * @access Public
 */
exports.getAllElderly = async (req, res) => {
  try {
    const elderly = await Elderly.find();
    res.json({
      success: true,
      data: elderly
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בקבלת רשימת הקשישים',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get elderly profile by ID
 * @route GET /api/elderly/:id
 * @access Public
 */
exports.getElderlyById = async (req, res) => {
  try {
    const elderly = await Elderly.findById(req.params.id);
    if (!elderly) {
      return res.status(404).json({
        success: false,
        message: 'קשיש לא נמצא'
      });
    }
    res.json({
      success: true,
      data: elderly
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בקבלת פרטי הקשיש',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get elderly profiles by status
 * @route GET /api/elderly/status/:status
 * @access Public
 */
exports.getElderlyByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const elderly = await Elderly.find({ status });
    res.json({
      success: true,
      data: elderly
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בקבלת רשימת הקשישים לפי סטטוס',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Create new elderly profile
 * @route POST /api/elderly
 * @access Private (Admin only)
 */
exports.createElderly = async (req, res) => {
  try {
    const elderly = new Elderly(req.body);
    await elderly.save();
    res.status(201).json({
      success: true,
      data: elderly
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'שגיאה ביצירת פרופיל קשיש',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Update elderly profile
 * @route PUT /api/elderly/:id
 * @access Private (Admin only)
 */
exports.updateElderly = async (req, res) => {
  try {
    const elderly = await Elderly.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!elderly) {
      return res.status(404).json({
        success: false,
        message: 'קשיש לא נמצא'
      });
    }
    res.json({
      success: true,
      data: elderly
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בעדכון פרופיל הקשיש',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Update elderly status
 * @route PUT /api/elderly/:id/status
 * @access Private (Admin only)
 */
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const elderly = await Elderly.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!elderly) {
      return res.status(404).json({
        success: false,
        message: 'קשיש לא נמצא'
      });
    }
    res.json({
      success: true,
      data: elderly
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'שגיאה בעדכון סטטוס הקשיש',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Delete elderly profile
 * @route DELETE /api/elderly/:id
 * @access Private (Admin only)
 */
exports.deleteElderly = async (req, res) => {
  try {
    const elderly = await Elderly.findByIdAndDelete(req.params.id);
    if (!elderly) {
      return res.status(404).json({
        success: false,
        message: 'קשיש לא נמצא'
      });
    }
    res.json({
      success: true,
      message: 'פרופיל הקשיש נמחק בהצלחה'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'שגיאה במחיקת פרופיל הקשיש',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 