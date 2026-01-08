const Table = require('../models/Table');

// @desc    Get all tables
// @route   GET /api/tables
// @access  Private
const getTables = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const tables = await Table.find(filter)
      .populate('currentOrder')
      .sort({ tableNumber: 1 });

    res.json(tables);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single table
// @route   GET /api/tables/:id
// @access  Private
const getTable = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id).populate('currentOrder');

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.json(table);
  } catch (error) {
    next(error);
  }
};

// @desc    Create table
// @route   POST /api/tables
// @access  Private/Admin
const createTable = async (req, res, next) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (error) {
    next(error);
  }
};

// @desc    Update table
// @route   PUT /api/tables/:id
// @access  Private
const updateTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.json(table);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete table
// @route   DELETE /api/tables/:id
// @access  Private/Admin
const deleteTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.json({ message: 'Table removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
};
