import Lead from '../models/Lead.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get paginated, search-filtered leads belonging to the logged-in user with dynamic parameters
 * @route   GET /api/leads
 * @access  Private
 * 
 * Inputs:
 *   - req.query: { page, limit, sortBy, sortOrder, status, search, source, dateFrom, dateTo }
 *   - req.user: Authenticated user object
 * Outputs:
 *   - 200: JSON success payload containing paginated leads array and pagination headers
 */
export const getLeads = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
      search,
      source,
      dateFrom,
      dateTo,
    } = req.query;

    // Enforce owner isolation
    const filter = { owner: req.user._id };

    // 1. Filter by status stage (if not 'All' or empty)
    if (status && status !== 'All') {
      filter.status = status;
    }

    // 2. Filter by acquisition source channel
    if (source) {
      filter.source = source;
    }

    // 3. Filter by date created range (dateFrom <= createdAt <= dateTo)
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        const endOfDay = new Date(dateTo);
        endOfDay.setHours(23, 59, 59, 999); // cover full day up to the final millisecond
        filter.createdAt.$lte = endOfDay;
      }
    }

    // 4. Filter by search keyword query (case-insensitive regex check on name, company, email)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 20;
    const skip = (pageNum - 1) * limitNum;
    const sortVal = sortOrder === 'desc' ? -1 : 1;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Controller] User ${req.user._id} querying filtered leads. Filter:`, JSON.stringify(filter));
    }

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ [sortBy]: sortVal })
        .skip(skip)
        .limit(limitNum),
      Lead.countDocuments(filter),
    ]);

    return paginatedResponse(res, leads, total, pageNum, limitNum);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new lead opportunity scoped to the active user
 * @route   POST /api/leads
 * @access  Private
 * 
 * Inputs:
 *   - req.body: Lead fields (name, company, email, phone, value, status, source, notes)
 *   - req.user: Authenticated user object
 * Outputs:
 *   - 201: JSON success payload containing the newly created Lead document
 */
export const createLead = async (req, res, next) => {
  try {
    const { name, company, email, phone, value, status, source, notes } = req.body;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Controller] User ${req.user._id} initiating lead creation for: "${name}"`);
    }

    const lead = await Lead.create({
      name,
      company,
      email,
      phone,
      value: value !== undefined ? Number(value) : 0,
      status,
      source,
      notes,
      owner: req.user._id,
    });

    return successResponse(res, lead, 'Lead created successfully.', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch details of a single lead by its identifier with owner isolation
 * @route   GET /api/leads/:id
 * @access  Private
 * 
 * Inputs:
 *   - req.params.id: MongoDB ObjectId string of target lead
 *   - req.user: Authenticated user object
 * Outputs:
 *   - 200: JSON success payload containing the requested Lead document
 *   - 404: If lead is missing or belongs to a different owner
 */
export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Controller] User ${req.user._id} fetched lead: ${req.params.id}`);
    }

    return successResponse(res, lead, 'Lead retrieved successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Modify fields of a lead ensuring owner isolation
 * @route   PUT /api/leads/:id
 * @access  Private
 * 
 * Inputs:
 *   - req.params.id: Target lead ID
 *   - req.body: Lead fields to update (excludes owner modification)
 * Outputs:
 *   - 200: JSON success payload containing the updated Lead document
 *   - 404: If lead is missing or belongs to a different owner
 */
export const updateLead = async (req, res, next) => {
  try {
    // Force prevent changing lead ownership
    const updateData = { ...req.body };
    delete updateData.owner;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Controller] User ${req.user._id} updating lead: ${req.params.id}`);
    }

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, lead, 'Lead updated successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Patch only the status stage of a specific lead record with owner checks
 * @route   PATCH /api/leads/:id/status
 * @access  Private
 * 
 * Inputs:
 *   - req.params.id: Target lead ID
 *   - req.body: { status } - New lifecycle status stage value
 * Outputs:
 *   - 200: JSON success payload containing the updated Lead document
 *   - 404: If lead is missing or belongs to a different owner
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Controller] User ${req.user._id} patching status of lead ${req.params.id} to "${status}"`);
    }

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, lead, 'Lead status updated successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove a lead record from database with owner verification
 * @route   DELETE /api/leads/:id
 * @access  Private
 * 
 * Inputs:
 *   - req.params.id: Target lead ID to delete
 * Outputs:
 *   - 200: JSON success response confirming removal
 *   - 404: If lead is missing or belongs to a different owner
 */
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    await lead.deleteOne();

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Controller] User ${req.user._id} deleted lead: ${req.params.id}`);
    }

    return successResponse(res, null, 'Lead deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Aggregate lead records to compile dashboard KPIs in a SINGLE database query
 * @route   GET /api/leads/stats/summary
 * @access  Private
 * 
 * Inputs:
 *   - req.user: Authenticated user object
 * Outputs:
 *   - 200: JSON success response containing stats payload with pipeline volumes, growth rate, and breakdowns
 */
export const getLeadStats = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Controller] User ${req.user._id} compiling dashboard aggregations.`);
    }

    const today = new Date();
    // Boundaries for this calendar month and previous calendar month
    const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = startOfThisMonth;

    // Single-operation DB aggregation query
    const statsResult = await Lead.aggregate([
      { $match: { owner: req.user._id } },
      {
        $facet: {
          totalLeads: [
            { $count: 'count' }
          ],
          statusCounts: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          sourceCounts: [
            { $group: { _id: '$source', count: { $sum: 1 } } }
          ],
          monthlyCounts: [
            {
              $group: {
                _id: null,
                thisMonthLeads: {
                  $sum: {
                    $cond: [{ $gte: ['$createdAt', startOfThisMonth] }, 1, 0]
                  }
                },
                lastMonthLeads: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $gte: ['$createdAt', startOfLastMonth] },
                          { $lt: ['$createdAt', endOfLastMonth] }
                        ]
                      },
                      1,
                      0
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    ]);

    const facet = statsResult[0];
    const totalLeadsCount = (facet.totalLeads && facet.totalLeads[0]) ? facet.totalLeads[0].count : 0;

    // Compile status breakdown counts map
    const statusBreakdown = {
      New: 0,
      Contacted: 0,
      'Meeting Scheduled': 0,
      'Proposal Sent': 0,
      Won: 0,
      Lost: 0
    };
    if (facet.statusCounts) {
      facet.statusCounts.forEach((item) => {
        if (item._id && item._id in statusBreakdown) {
          statusBreakdown[item._id] = item.count;
        }
      });
    }

    // Compile source breakdown counts map
    const sourceBreakdown = {
      Website: 0,
      Referral: 0,
      LinkedIn: 0,
      'Cold Call': 0,
      'Email Campaign': 0,
      Other: 0
    };
    if (facet.sourceCounts) {
      facet.sourceCounts.forEach((item) => {
        if (item._id && item._id in sourceBreakdown) {
          sourceBreakdown[item._id] = item.count;
        }
      });
    }

    // Extract current/prior calendar month leads counts
    const monthlyData = (facet.monthlyCounts && facet.monthlyCounts[0])
      ? facet.monthlyCounts[0]
      : { thisMonthLeads: 0, lastMonthLeads: 0 };

    const thisMonthLeads = monthlyData.thisMonthLeads;
    const lastMonthLeads = monthlyData.lastMonthLeads;

    // Calculate month-over-month growth rate percentage
    let growthRate = 0.0;
    if (lastMonthLeads > 0) {
      growthRate = Number((((thisMonthLeads - lastMonthLeads) / lastMonthLeads) * 100).toFixed(1));
    } else if (thisMonthLeads > 0) {
      growthRate = 100.0; // 100% growth from zero base
    }

    // Calculate overall pipeline conversion rate (Won / Total) * 100
    const wonCount = statusBreakdown.Won;
    const conversionRate = totalLeadsCount > 0
      ? Number(((wonCount / totalLeadsCount) * 100).toFixed(1))
      : 0.0;

    const statsPayload = {
      totalLeads: totalLeadsCount,
      statusBreakdown,
      conversionRate,
      sourceBreakdown,
      thisMonthLeads,
      lastMonthLeads,
      growthRate
    };

    return successResponse(res, statsPayload, 'Statistics compiled successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Aggregate leads grouped by month for the last 6 months in chronological order
 * @route   GET /api/leads/stats/monthly
 * @access  Private
 * 
 * Inputs:
 *   - req.user: Authenticated user object
 * Outputs:
 *   - 200: JSON success payload containing sorted list of monthly stats including zeroes
 */
export const getMonthlyStats = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Controller] User ${req.user._id} generating monthly trends.`);
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();

    // 1. Generate chronological list of the last 6 months including current month
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      last6Months.push({
        year: d.getFullYear(),
        monthNum: d.getMonth() + 1, // 1-indexed for MongoDB month matching
        monthName: monthNames[d.getMonth()],
        label: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
        total: 0,
        won: 0,
        lost: 0
      });
    }

    // Align matching interval beginning boundary
    const startOfPeriod = new Date(today.getFullYear(), today.getMonth() - 5, 1);

    // 2. Query aggregate status counts
    const results = await Lead.aggregate([
      {
        $match: {
          owner: req.user._id,
          createdAt: { $gte: startOfPeriod }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: 1 },
          won: {
            $sum: { $cond: [{ $eq: ['$status', 'Won'] }, 1, 0] }
          },
          lost: {
            $sum: { $cond: [{ $eq: ['$status', 'Lost'] }, 1, 0] }
          }
        }
      }
    ]);

    // 3. Merge aggregates into the template slots
    results.forEach((result) => {
      const match = last6Months.find(
        (m) => m.year === result._id.year && m.monthNum === result._id.month
      );
      if (match) {
        match.total = result.total;
        match.won = result.won;
        match.lost = result.lost;
      }
    });

    // 4. Map to final output payload calculating conversion rates safely
    const monthlyStatsPayload = last6Months.map((m) => {
      const conversionRate = m.total > 0
        ? Number(((m.won / m.total) * 100).toFixed(1))
        : 0.0;
        
      return {
        month: m.label,
        total: m.total,
        won: m.won,
        lost: m.lost,
        conversionRate
      };
    });

    return successResponse(res, monthlyStatsPayload, 'Monthly statistics calculated successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Quick autocomplete prefix search returning projected summary data limited to 5 results
 * @route   GET /api/leads/search
 * @access  Private
 * 
 * Inputs:
 *   - req.query: { q, limit }
 *   - req.user: Authenticated user object
 * Outputs:
 *   - 200: JSON success payload containing array of matched leads with limited fields
 */
export const getQuickSearch = async (req, res, next) => {
  try {
    const { q, limit = 5 } = req.query;

    const filter = { owner: req.user._id };

    // Apply regex search on name, company, email
    if (q) {
      const searchRegex = new RegExp(q, 'i');
      filter.$or = [
        { name: searchRegex },
        { company: searchRegex },
        { email: searchRegex }
      ];
    }

    const limitNum = Math.min(Number(limit) || 5, 20); // enforce maximum of 20 results for safety

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Lead Controller] Autocomplete search query: "${q}", limit: ${limitNum}`);
    }

    // Retrieve projected fields only
    const leads = await Lead.find(filter)
      .select('_id name company email status')
      .limit(limitNum);

    return successResponse(res, leads, 'Autocomplete results retrieved successfully.');
  } catch (error) {
    next(error);
  }
};
