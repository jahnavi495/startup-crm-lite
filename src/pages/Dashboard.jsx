import React, { useMemo, useState } from 'react';
import { Users, DollarSign, Percent, TrendingUp, Plus } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { sampleLeads } from '../data/sampleLeads';

/**
 * Dashboard Page Component
 * Assembles the main CRM dashboard experience with KPI cards, pipeline insight,
 * recent lead activity, and quick actions. The page uses sample data for now.
 */
const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const leads = sampleLeads;

  const metrics = useMemo(() => {
    const totalLeads = leads.length;
    const activePipeline = leads.filter((lead) => lead.status !== 'Lost').reduce((sum, lead) => sum + lead.value, 0);
    const wonLeads = leads.filter((lead) => lead.status === 'Won');
    const lostLeads = leads.filter((lead) => lead.status === 'Lost');
    const closedCount = wonLeads.length + lostLeads.length;
    const winRate = closedCount > 0 ? Math.round((wonLeads.length / closedCount) * 100) : 0;
    const closedRevenue = wonLeads.reduce((sum, lead) => sum + lead.value, 0);

    return {
      totalLeads,
      activePipeline,
      winRate,
      closedRevenue
    };
  }, [leads]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200/80 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.12),_transparent_45%),linear-gradient(135deg,_#ffffff,_#f8fbff)] p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_45%),linear-gradient(135deg,_#0f172a,_#111827)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Startup CRM Lite</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Dashboard overview
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Monitor pipeline health, recent opportunities, and growth signals from one premium workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            Add new lead
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Leads" value={metrics.totalLeads} icon={Users} change={8.2} color="bg-primary" />
        <StatsCard title="Active Pipeline" value={formatCurrency(metrics.activePipeline)} icon={DollarSign} change={12.4} color="bg-success" />
        <StatsCard title="Win Rate" value={`${metrics.winRate}%`} icon={Percent} change={-1.5} color="bg-warning" />
        <StatsCard title="Closed Revenue" value={formatCurrency(metrics.closedRevenue)} icon={TrendingUp} change={24.1} color="bg-danger" />
      </div>

      <PipelineOverview leads={leads} />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
        <RecentLeads leads={leads} />
        <QuickActions onAddLeadClick={() => setIsAddModalOpen(true)} />
      </div>
    </div>
  );
};

export default Dashboard;
