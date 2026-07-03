import Lead from '../models/Lead.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * Format raw mongoose Lead document into standardized frontend representation
 * @param {Object} lead - Mongoose Lead document
 * @returns {Object} Clean formatted lead data
 */
const formatLead = (lead) => ({
  id: lead._id,
  name: lead.name,
  company: lead.company,
  email: lead.email,
  phone: lead.phone || '',
  value: lead.value || 0,
  status: lead.status,
  source: lead.source,
  notes: lead.notes || '',
  owner: lead.owner,
  age: lead.age || 0,
  createdAt: lead.createdAt,
  updatedAt: lead.updatedAt,
});

/**
 * @desc    Get all leads for the authenticated user
 * @route   GET /api/leads
 * @access  Private
 */
export const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find({ owner: req.user.id }).sort({ createdAt: -1 });
    const formattedLeads = leads.map(formatLead);
    return successResponse(res, 'Leads retrieved successfully.', { leads: formattedLeads });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single lead by ID
 * @route   GET /api/leads/:id
 * @access  Private
 */
export const getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user.id });

    if (!lead) {
      return errorResponse(res, 'Lead not found or unauthorized access.', 404);
    }

    return successResponse(res, 'Lead retrieved successfully.', { lead: formatLead(lead) });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Private
 */
export const createLead = async (req, res, next) => {
  try {
    const { name, company, email, phone, value, status, source, notes } = req.body;

    const lead = await Lead.create({
      owner: req.user.id,
      name,
      company,
      email,
      phone,
      value: value ? Number(value) : 0,
      status,
      source,
      notes,
    });

    return successResponse(res, 'Lead created successfully.', { lead: formatLead(lead) }, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a lead record
 * @route   PUT /api/leads/:id
 * @access  Private
 */
export const updateLead = async (req, res, next) => {
  try {
    let lead = await Lead.findOne({ _id: req.params.id, owner: req.user.id });

    if (!lead) {
      return errorResponse(res, 'Lead not found or unauthorized access.', 404);
    }

    const { name, company, email, phone, value, status, source, notes } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (company !== undefined) updateData.company = company;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (value !== undefined) updateData.value = value ? Number(value) : 0;
    if (status !== undefined) updateData.status = status;
    if (source !== undefined) updateData.source = source;
    if (notes !== undefined) updateData.notes = notes;

    lead = await Lead.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    return successResponse(res, 'Lead updated successfully.', { lead: formatLead(lead) });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a lead record
 * @route   DELETE /api/leads/:id
 * @access  Private
 */
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user.id });

    if (!lead) {
      return errorResponse(res, 'Lead not found or unauthorized access.', 404);
    }

    await lead.deleteOne();

    return successResponse(res, 'Lead deleted successfully.');
  } catch (error) {
    next(error);
  }
};
