const vetModel = require('../models/vetrequestmodel');

const addNewRecord = async (req, res) => {
  try {
    await vetModel.addRecord(req.body);
    res.status(201).json({ message: 'Request submitted and pending' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add request' });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.query;
  const { approved } = req.body;

  // Allow only true, false, or pending
  if (!["true", "false", "pending"].includes(approved)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    await vetModel.updateRecordStatus(id, approved);
    res.json({ message: `Request status updated to ${approved}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

const getPendingRecords = async (req, res) => {
  try {
    const records = await vetModel.getPendingOnly();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending records' });
  }
};

const getRejectedRecords = async (req, res) => {
  try {
    const records = await vetModel.getRejectedOnly();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rejected records' });
  }
};

module.exports = {
  addNewRecord,
  updateStatus,
  getPendingRecords,
  getRejectedRecords,
};
