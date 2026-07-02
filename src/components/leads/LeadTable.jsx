import { useState } from 'react';
import { LayoutGrid, Table, Edit, Trash2, Building, Calendar, Mail, Compass } from 'lucide-react';
import StatusBadge from './StatusBadge';
import LeadCard from './LeadCard';

/**
 * @typedef {Object} Lead
 * @property {string} id - Lead identifier
 * @property {string} name - Contact person's name
 * @property {string} company - Organization name
 * @property {string} email - Contact email address
 * @property {string} phone - Contact phone number
 * @property {number} value - Opportunity value
 * @property {string} status - Pipeline status
 * @property {string} source - Acquisition source channel
 * @property {string} date - Creation date
 */

/**
 * @typedef {Object} LeadTableProps
 * @property {Lead[]} leads - List of leads to render
 * @property {function} onEditLead - Callback function to edit a lead
 * @property {function} onDeleteLead - Callback function to delete a lead
 */

/**
 * LeadTable Component
 * Renders the leads database. Supports toggling between standard desktop-oriented Table list
 * and modern responsive Card grid layouts.
 * 
 * @param {LeadTableProps} props
 */
const LeadTable = ({ leads, onEditLead, onDeleteLead }) => {
  // Local state to toggle between table format ('table') and card format ('card')
  const [viewMode, setViewMode] = useState('table');

  return (
    <div className="space-y-4">
      {/* View Switcher Toolbar (Hidden on mobile as mobile always defaults to card view for usability) */}
      <div className="hidden md:flex items-center justify-end gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1 select-none">
          Layout View:
        </span>
        
        {/* Table Toggle Button */}
        <button
          type="button"
          onClick={() => setViewMode('table')}
          className={`p-2 rounded-xl border transition-all cursor-pointer focus:outline-hidden ${
            viewMode === 'table'
              ? 'bg-slate-100 dark:bg-slate-800 text-primary border-slate-300 dark:border-slate-700'
              : 'bg-white dark:bg-card-dark text-slate-400 border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-hover-dark'
          }`}
          title="Table View"
          aria-label="Table layout view"
        >
          <Table size={16} />
        </button>

        {/* Card Toggle Button */}
        <button
          type="button"
          onClick={() => setViewMode('card')}
          className={`p-2 rounded-xl border transition-all cursor-pointer focus:outline-hidden ${
            viewMode === 'card'
              ? 'bg-slate-100 dark:bg-slate-800 text-primary border-slate-300 dark:border-slate-700'
              : 'bg-white dark:bg-card-dark text-slate-400 border-slate-200 dark:border-border-dark hover:bg-slate-50 dark:hover:bg-hover-dark'
          }`}
          title="Card View"
          aria-label="Card grid layout view"
        >
          <LayoutGrid size={16} />
        </button>
      </div>

      {/* Main Content Layout Renderer */}
      {leads.length > 0 ? (
        <>
          {/* Mobile View: Force Card Stack (always active on narrow screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {leads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEdit={() => onEditLead(lead)}
                onDelete={() => onDeleteLead(lead.id)}
              />
            ))}
          </div>

          {/* Desktop View: Respect viewMode state */}
          <div className="hidden md:block">
            {viewMode === 'table' ? (
              /* Table Layout */
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Source</th>
                      <th className="px-6 py-4">Date Added</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              {lead.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white">{lead.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{lead.phone || 'No phone'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-slate-400" />
                            <span>{lead.company}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-slate-400" />
                            <span>{lead.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <Compass className="h-4 w-4 text-slate-400" />
                            <span>{lead.source}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span>{lead.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => onEditLead(lead)}
                              className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                              title="Edit Lead"
                              aria-label={`Edit ${lead.name}`}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteLead(lead.id)}
                              className="rounded-xl border border-slate-200 p-2 text-danger transition hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:hover:bg-rose-950/30"
                              title="Delete Lead"
                              aria-label={`Delete ${lead.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Card Grid Layout */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onEdit={() => onEditLead(lead)}
                    onDelete={() => onDeleteLead(lead.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default LeadTable;
