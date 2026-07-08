import api from './api';

/**
 * Service to execute Lead CRUD operations and Aggregations against the backend API.
 * Unwraps Axios response payloads to return server JSON data directly.
 */
const leadService = {
  /**
   * Retrieves a list of paginated and filtered leads.
   * 
   * @param {Object} [params] - Query parameters (status, search, page, limit, sortBy, sortOrder)
   * @returns {Promise<Object>} Response data containing leads array and pagination metadata
   */
  async getLeads(params) {
    const response = await api.get('/api/leads', { params });
    return response.data;
  },

  /**
   * Creates a new lead record.
   * 
   * @param {Object} leadData - Lead fields matching Lead schema
   * @returns {Promise<Object>} Response data containing the newly created lead object
   */
  async createLead(leadData) {
    const response = await api.post('/api/leads', leadData);
    return response.data;
  },

  /**
   * Updates an existing lead record's fields.
   * 
   * @param {string} id - Lead ObjectId
   * @param {Object} leadData - Fields to update
   * @returns {Promise<Object>} Response data containing the updated lead object
   */
  async updateLead(id, leadData) {
    const response = await api.put(`/api/leads/${id}`, leadData);
    return response.data;
  },

  /**
   * Updates only the lifecycle status stage of a specific lead record.
   * 
   * @param {string} id - Lead ObjectId
   * @param {string} status - New status stage enum value
   * @returns {Promise<Object>} Response data containing the updated lead object
   */
  async updateLeadStatus(id, status) {
    const response = await api.patch(`/api/leads/${id}/status`, { status });
    return response.data;
  },

  /**
   * Deletes a lead record from the database.
   * 
   * @param {string} id - Lead ObjectId to remove
   * @returns {Promise<Object>} Response data confirming deletion success
   */
  async deleteLead(id) {
    const response = await api.delete(`/api/leads/${id}`);
    return response.data;
  },

  /**
   * Retrieves cumulative sales opportunity stats for dashboard summary cards.
   * 
   * @returns {Promise<Object>} Response data containing total, active, won, and conversion rates
   */
  async getLeadStats() {
    const response = await api.get('/api/leads/stats/summary');
    return response.data;
  },

  /**
   * Retrieves 6-month historical leads aggregates for analytics.
   * 
   * @returns {Promise<Object>} Response data containing month-by-month total and won counts
   */
  async getMonthlyStats() {
    const response = await api.get('/api/leads/stats/monthly');
    return response.data;
  },
};

export default leadService;
