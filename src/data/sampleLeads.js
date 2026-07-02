/**
 * @typedef {Object} Lead
 * @property {string} id - Lead identifier
 * @property {string} name - Contact person's name
 * @property {string} company - Organization name
 * @property {string} email - Contact email address
 * @property {string} phone - Contact phone number
 * @property {number} value - Financial deal estimate value in INR
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status - Pipeline stage status
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source - Acquisition source channel
 * @property {string} createdAt - Calendar ISO timestamp when lead was created
 * @property {string} [contactedAt] - Contacted timestamp
 * @property {string} [meetingAt] - Meeting scheduled timestamp
 * @property {string} [proposalAt] - Proposal sent timestamp
 * @property {string} [wonAt] - Won timestamp
 * @property {string} owner - Assigned sales rep owner
 */

/**
 * 6 default sample leads representing realistic Indian startup leads
 * Spread over the last 6 months for clear monthly analytical graphs.
 * @type {Lead[]}
 */
export const sampleLeads = [
  {
    id: 'lead_001',
    name: 'Vikram Malhotra',
    company: 'Alpha Digital solutions',
    email: 'vikram@alphadigital.co.in',
    phone: '+91 98765 43210',
    status: 'Lost',
    source: 'LinkedIn',
    value: 45000,
    createdAt: '2026-01-15T10:30:00Z',
    contactedAt: '2026-01-16T11:00:00Z',
    owner: 'Sarah'
  },
  {
    id: 'lead_002',
    name: 'Neha Gupta',
    company: 'Gupta Tech Corp',
    email: 'neha@guptatech.com',
    phone: '+91 99999 88888',
    status: 'New',
    source: 'Website',
    value: 25000,
    createdAt: '2026-02-20T14:45:00Z',
    owner: 'Sarah'
  },
  {
    id: 'lead_003',
    name: 'Amit Sharma',
    company: 'Sharma Logistics',
    email: 'amit@sharmalogistics.in',
    phone: '+91 91234 56789',
    status: 'Contacted',
    source: 'Cold Call',
    value: 65000,
    createdAt: '2026-03-12T09:15:00Z',
    contactedAt: '2026-03-14T15:30:00Z',
    owner: 'Alex'
  },
  {
    id: 'lead_004',
    name: 'Priya Iyer',
    company: 'Iyer Consulting Services',
    email: 'priya@iyerconsulting.com',
    phone: '+91 98760 12345',
    status: 'Meeting Scheduled',
    source: 'Referral',
    value: 120000,
    createdAt: '2026-04-18T10:00:00Z',
    contactedAt: '2026-04-19T11:30:00Z',
    meetingAt: '2026-04-22T14:00:00Z',
    owner: 'David'
  },
  {
    id: 'lead_005',
    name: 'Rajesh Kumar',
    company: 'Kumar Ventures',
    email: 'rajesh@kumarventures.com',
    phone: '+91 90000 12345',
    status: 'Won',
    source: 'LinkedIn',
    value: 180000,
    createdAt: '2026-05-25T11:00:00Z',
    contactedAt: '2026-05-26T12:00:00Z',
    meetingAt: '2026-05-28T10:00:00Z',
    proposalAt: '2026-05-30T16:00:00Z',
    wonAt: '2026-06-05T14:30:00Z',
    owner: 'Sarah'
  },
  {
    id: 'lead_006',
    name: 'Divya Rao',
    company: 'Rao Industries',
    email: 'divya@raoind.com',
    phone: '+91 95555 66666',
    status: 'New',
    source: 'Email Campaign',
    value: 90000,
    createdAt: '2026-06-10T15:00:00Z',
    owner: 'Alex'
  }
];
