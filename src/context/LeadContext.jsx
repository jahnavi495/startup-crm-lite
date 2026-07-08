import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { sampleLeads } from '../data/sampleLeads';
import leadService from '../services/leadService';
import { toast } from 'react-hot-toast';

// Create the Context object
const LeadContext = createContext(undefined);

/**
 * LeadProvider Component
 * Exposes opportunity leads database operations and recent notifications.
 * Scope is isolated to the currently logged-in user database records.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements
 */
export const LeadProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // Core API integration states
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, pages: 0 });

  // Notifications and UI local preferences
  const [notifications, setNotifications] = useState([]);
  const [currency, setCurrencyState] = useState('₹');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch leads from backend
  const fetchLeads = async (params = {}) => {
    setIsLoading(true);
    try {
      const response = await leadService.getLeads(params);
      if (response && response.success) {
        setLeads(response.data);
        setPagination(response.pagination || {
          total: response.data.length,
          page: 1,
          limit: 20,
          pages: 1
        });
      }
    } catch (error) {
      console.error('Failed to fetch leads from API:', error);
      toast.error('Failed to load leads from database.', {
        style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Synchronize leads and preferences whenever user authentication state changes
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLeads([]);
      setPagination({ total: 0, page: 1, limit: 20, pages: 0 });
      setNotifications([]);
      setCurrencyState('₹');
      return;
    }

    // Fetch initial leads list
    fetchLeads();

    // Load user preferences (currency and notifications list)
    const emailKey = user.email.toLowerCase();
    const notifsKey = `startup-crm-notifications-${emailKey}`;
    const currencyKey = `startup-crm-currency-${emailKey}`;

    const storedCurrency = localStorage.getItem(currencyKey) || '₹';
    setCurrencyState(storedCurrency);

    try {
      const storedNotifs = localStorage.getItem(notifsKey);
      if (storedNotifs) {
        setNotifications(JSON.parse(storedNotifs));
      } else {
        localStorage.setItem(notifsKey, JSON.stringify([]));
        setNotifications([]);
      }
    } catch (e) {
      console.error('Failed to parse notifications:', e);
      setNotifications([]);
    }
  }, [user, isAuthenticated]);

  /**
   * Helper: Saves notifications to local storage under user-specific key.
   */
  const saveNotifications = (updatedNotifs) => {
    if (!user) return;
    const emailKey = user.email.toLowerCase();
    const notifsKey = `startup-crm-notifications-${emailKey}`;
    localStorage.setItem(notifsKey, JSON.stringify(updatedNotifs));
    setNotifications(updatedNotifs);
  };

  /**
   * Update active display currency symbol.
   */
  const changeCurrency = (newSymbol) => {
    if (!user) return;
    const emailKey = user.email.toLowerCase();
    const currencyKey = `startup-crm-currency-${emailKey}`;
    localStorage.setItem(currencyKey, newSymbol);
    setCurrencyState(newSymbol);
  };

  /**
   * Formats standard numbers into localized currency display representation.
   */
  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    if (currency === '₹') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(num);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(num);
    }
  };

  /**
   * Formats numbers into a shortened string with currency symbols.
   */
  const formatCurrencyShort = (val) => {
    const num = Number(val) || 0;
    if (currency === '₹') {
      if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
      if (num >= 1000) return `₹${(num / 1000).toFixed(0)}k`;
      return `₹${num}`;
    } else {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
      return `$${num}`;
    }
  };

  /**
   * Registers a new lead.
   * 
   * @param {Object} newLeadData - Lead input parameters
   * @returns {Object} The created lead object
   */
  const addLead = async (newLeadData) => {
    setIsLoading(true);
    try {
      const response = await leadService.createLead(newLeadData);
      const newLead = response.data;
      
      // Prepend to current leads list
      setLeads((prevLeads) => [newLead, ...prevLeads]);

      toast.success(`Registered new lead: "${newLead.name}"`, {
        style: { background: '#22C55E', color: '#FFFFFF', fontWeight: 'bold' }
      });

      // Create a new unread notification
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: 'New Lead Registered',
        message: `${newLead.name} from ${newLead.company} was added to the pipeline (${formatCurrency(newLead.value)}).`,
        type: 'info',
        read: false,
        time: 'Just now'
      };
      saveNotifications([newNotif, ...notifications]);

      return newLead;
    } catch (error) {
      console.error('Add lead error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to create lead.';
      toast.error(errorMsg, {
        style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Updates an existing lead record.
   * 
   * @param {string} id - Target lead identifier to search
   * @param {Object} updatedFields - Key-value map of updated parameters
   * @returns {Object} The updated lead object
   */
  const updateLead = async (id, updatedFields) => {
    setIsLoading(true);
    try {
      // Fetch current copy for status change checking
      const oldLead = leads.find((l) => l.id === id || l._id === id);

      let response;
      // If we only passed status in updatedFields (e.g. Kanban drag and drop)
      if (Object.keys(updatedFields).length === 1 && updatedFields.status !== undefined) {
        response = await leadService.updateLeadStatus(id, updatedFields.status);
      } else {
        response = await leadService.updateLead(id, updatedFields);
      }

      const updatedLead = response.data;

      // Update leads array state
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === id || lead._id === id ? updatedLead : lead))
      );

      toast.success(`Updated lead details for "${updatedLead.name}"`, {
        style: { background: '#22C55E', color: '#FFFFFF', fontWeight: 'bold' }
      });

      // Create a status change notification if stage modified
      if (updatedLead && oldLead && updatedFields.status && oldLead.status !== updatedFields.status) {
        let title = 'Lead Status Updated';
        let type = 'info';
        if (updatedFields.status === 'Won') {
          title = 'Deal Won! 🚀';
          type = 'success';
        } else if (updatedFields.status === 'Lost') {
          title = 'Deal Lost 😔';
          type = 'danger';
        } else if (updatedFields.status === 'Meeting Scheduled') {
          title = 'Meeting Scheduled 📅';
          type = 'warning';
        }

        const newNotif = {
          id: `notif-${Date.now()}`,
          title,
          message: `${updatedLead.name} (${updatedLead.company}) is now in stage "${updatedFields.status}".`,
          type,
          read: false,
          time: 'Just now'
        };
        saveNotifications([newNotif, ...notifications]);
      }

      return updatedLead;
    } catch (error) {
      console.error('Update lead error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to update lead.';
      toast.error(errorMsg, {
        style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Deletes a lead record from the database.
   * 
   * @param {string} id - Target lead identifier to delete
   * @returns {Object|null} The deleted lead object, or null
   */
  const deleteLead = async (id) => {
    setIsLoading(true);
    try {
      const leadToDelete = leads.find((l) => l.id === id || l._id === id);
      if (!leadToDelete) return null;

      await leadService.deleteLead(id);

      // Remove from state array
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id && lead._id !== id));

      toast.error(`Removed lead record: "${leadToDelete.name}"`, {
        style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
      });

      // Create a lead deletion notification
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: 'Lead Deleted',
        message: `${leadToDelete.name} from ${leadToDelete.company} was removed from opportunities.`,
        type: 'danger',
        read: false,
        time: 'Just now'
      };
      saveNotifications([newNotif, ...notifications]);

      return leadToDelete;
    } catch (error) {
      console.error('Delete lead error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to delete lead.';
      toast.error(errorMsg, {
        style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Queries a lead by its identifier.
   * 
   * @param {string} id - Target lead identifier
   * @returns {Object|undefined} The matched lead object
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id || lead._id === id);
  };

  // Notification action handlers
  const markNotificationAsRead = (id) => {
    const updatedNotifs = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    saveNotifications(updatedNotifs);
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifs = notifications.map((notif) => ({ ...notif, read: true }));
    saveNotifications(updatedNotifs);
  };

  const clearNotifications = () => {
    saveNotifications([]);
  };

  const deleteNotification = (id) => {
    const updatedNotifs = notifications.filter((notif) => notif.id !== id);
    saveNotifications(updatedNotifs);
  };

  /**
   * Pre-populates the backend leads database with rich sample data.
   */
  const loadDemoLeads = async () => {
    setIsLoading(true);
    try {
      const createPromises = sampleLeads.map((lead) => {
        const leadData = {
          name: lead.name,
          company: lead.company,
          email: lead.email,
          phone: lead.phone || '',
          value: lead.value || 0,
          status: lead.status || 'New',
          source: lead.source || 'Website',
          notes: lead.notes || '',
        };
        return leadService.createLead(leadData);
      });
      
      await Promise.all(createPromises);
      await fetchLeads();

      toast.success('Sample workspace seeded successfully!', {
        style: { background: '#22C55E', color: '#FFFFFF', fontWeight: 'bold' }
      });

      const newNotif = {
        id: `notif-${Date.now()}`,
        title: 'Sample Workspace Seeded 🎉',
        message: 'Workspace leads database initialized with 10 enterprise opportunities.',
        type: 'success',
        read: false,
        time: 'Just now'
      };
      saveNotifications([newNotif, ...notifications]);
    } catch (error) {
      console.error('Failed to seed demo leads:', error);
      toast.error('Failed to seed demo data on server.', {
        style: { background: '#EF4444', color: '#FFFFFF', fontWeight: 'bold' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        isLoading,
        pagination,
        fetchLeads,
        addLead,
        updateLead,
        deleteLead,
        getLeadById,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        deleteNotification,
        currency,
        changeCurrency,
        formatCurrency,
        formatCurrencyShort,
        loadDemoLeads,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

/**
 * useLeads custom hook
 * Consumer hook allowing immediate access to LeadContext getters, mutators, and notification history.
 * 
 * @returns {{ leads: Object[], isLoading: boolean, pagination: Object, fetchLeads: (params: Object) => Promise<void>, addLead: (data: Object) => Promise<Object>, updateLead: (id: string, data: Object) => Promise<Object>, deleteLead: (id: string) => Promise<Object>, getLeadById: (id: string) => Object|undefined, notifications: Array, markNotificationAsRead: (id: string) => void, markAllNotificationsAsRead: () => void, clearNotifications: () => void, deleteNotification: (id: string) => void, currency: string, changeCurrency: (symbol: string) => void, formatCurrency: (val: number) => string, formatCurrencyShort: (val: number) => string, loadDemoLeads: () => Promise<void>, searchQuery: string, setSearchQuery: (query: string) => void }}
 */
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be consumed inside a LeadProvider');
  }
  return context;
};
