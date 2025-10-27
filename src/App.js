import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, DollarSign, Users, TrendingUp, Mail, Phone, Edit3, Trash2, ArrowRight, Star, Calendar, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';

const ServiceManagementSystem = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: '', id: null });
  const [expandedCampaigns, setExpandedCampaigns] = useState(new Set());
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [selectedLeadForEstimate, setSelectedLeadForEstimate] = useState(null);
  const [estimateData, setEstimateData] = useState({});
  const [campaignView, setCampaignView] = useState('live'); // 'live' or 'ended'
  const [pricingTimeframe, setPricingTimeframe] = useState('30'); // days
  const [pricingServiceTab, setPricingServiceTab] = useState('exterior'); // 'exterior', 'concrete', 'deck'
  const [correspondenceType, setCorrespondenceType] = useState('email'); // 'email' or 'sms'
  const [correspondenceData, setCorrespondenceData] = useState({
    subject: '',
    message: '',
    recipientType: 'all', // 'all', 'customers', 'leads', 'custom'
    selectedRecipients: [],
    template: 'custom' // 'custom', 'followup', 'promotion', 'reminder'
  });
  const [jobs, setJobs] = useState([]);
  const [, setCalendarView] = useState('month'); // 'month', 'week', 'day'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [, setSelectedJob] = useState(null);
  const [, setIsJobDetailModalOpen] = useState(false);
  const [pricingData, setPricingData] = useState({
    exterior: {
      basePrice: 1.50, // base price per linear foot
      minPrice: 1.00,
      maxPrice: 2.50,
      leadThreshold: 8,
      unit: 'linear foot',
      description: 'Home/Business Exterior Softwash'
    },
    concrete: {
      basePrice: 0.25, // base price per sq ft
      minPrice: 0.15,
      maxPrice: 0.45,
      leadThreshold: 12,
      unit: 'square foot',
      description: 'Concrete Pressure Washing'
    },
    deck: {
      basePrice: 0.35, // base price per sq ft
      minPrice: 0.25,
      maxPrice: 0.60,
      leadThreshold: 6,
      unit: 'square foot',
      description: 'Deck/Fence Cleaning'
    }
  });

  // Railway backend URL
  const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://hccc-db-production.up.railway.app';

  const serviceTypes = [
    'Home/Business Exterior',
    'Concrete Pressure Washing',
    'Deck/Fence Cleaning',
    'Other'
  ];

  const referralSources = [
    'Google Search',
    'Facebook',
    'Instagram',
    'Nextdoor',
    'Word of Mouth',
    'Yard Sign',
    'Flyer/Mailer',
    'Previous Customer',
    'Angie\'s List',
    'Home Advisor',
    'Other'
  ];

  const leadStatuses = [
    'New',
    'Contacted',
    'Estimate Sent',
    'Scheduled',
    'Completed'
  ];

  const campaignPlatforms = [
    'Facebook',
    'Instagram',
    'Google Ads',
    'TikTok',
    'Nextdoor',
    'Yelp',
    'Angie\'s List',
    'Home Advisor',
    'Other'
  ];

  const getLeadStatusClasses = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Estimate Sent': return 'bg-purple-100 text-purple-800';
      case 'Scheduled': return 'bg-indigo-100 text-indigo-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const mapServiceLabel = (raw) => {
    const v = String(raw || '').toLowerCase();
    if (!v) return 'Other';
    if (v.includes('exterior') || v.includes('softwash') || v.includes('soft wash')) return 'Home/Business Exterior';
    if (v.includes('concrete') || v.includes('driveway') || v.includes('walkway') || v.includes('sidewalk')) return 'Concrete Pressure Washing';
    if (v.includes('deck') || v.includes('fence')) return 'Deck/Fence Cleaning';
    return 'Other';
  };

  const formatAddressLines = (address) => {
    const result = { line1: '', line2: '' };
    if (!address || typeof address !== 'string') return result;
    const parts = address.split(',');
    if (parts.length >= 2) {
      result.line1 = parts[0].trim();
      const city = parts[1].trim();
      // Extract ZIP code (supports 5 or 9 digits)
      const zipMatch = address.match(/\b\d{5}(?:-\d{4})?\b/);
      const zip = zipMatch ? zipMatch[0] : '';
      result.line2 = zip ? `${city} ${zip}` : city;
    } else {
      result.line1 = address.trim();
    }
    return result;
  };

  // Load from backend
  useEffect(() => {
    const load = async () => {
      try {
        const [leadsRes, custRes] = await Promise.all([
          fetch(`${API_URL}/api/leads/`),
          fetch(`${API_URL}/api/customers/`)
        ]);
        const leadsJson = await leadsRes.json();
        const customersJson = await custRes.json();
        // Normalize fields expected by UI
        const uiLeads = (leadsJson || []).map(l => ({
          id: l.id,
          name: l.name,
          email: l.email,
          phone: l.phone,
          address: l.address,
          source: l.referrer,
          service: Array.isArray(l.service)
            ? l.service.map(s => mapServiceLabel(s))
            : (l.service ? [mapServiceLabel(l.service)] : []),
          notes: l.notes || '',
          status: 'New',
          dateAdded: (l.created_at || '').slice(0, 10),
          estimatedValue: '',
          documents: []
        }));
        const uiCustomers = (customersJson || []).map(c => ({
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone,
          address: c.address,
          source: c.source,
          joinDate: (c.join_date || c.joinDate || '').slice(0, 10),
          totalSpent: Number(c.total_spent ?? c.totalSpent ?? 0),
          serviceCount: Number(c.service_count ?? c.serviceCount ?? 0),
          lastService: (c.last_service || c.lastService || '')?.slice ? (c.last_service || c.lastService || '').slice(0, 10) : c.last_service || c.lastService,
          rating: Number(c.rating ?? 5),
          services: c.services || [],
          reviewStatus: c.review_status || c.reviewStatus || 'none',
          estimateData: c.estimate_data || c.estimateData || null
        }));
        setLeads(uiLeads);
        setCustomers(uiCustomers);
      } catch (e) {
        // keep UI usable even if backend not available
        console.error('Failed to load data', e);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL]);

  const stats = {
    totalLeads: leads.length,
    totalCustomers: customers.length,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0),
    avgJobValue: customers.length > 0 ? customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / customers.reduce((sum, customer) => sum + customer.serviceCount, 0) : 0,
    conversionRate: leads.length > 0 ? (customers.length / (leads.length + customers.length) * 100) : 0,
    newLeadsThisMonth: leads.filter(lead => {
      const leadDate = new Date(lead.dateAdded);
      const currentDate = new Date();
      return leadDate.getMonth() === currentDate.getMonth() && leadDate.getFullYear() === currentDate.getFullYear();
    }).length,
    totalCampaigns: campaigns.length,
    totalAdSpend: campaigns.reduce((sum, campaign) => sum + ((campaign.dailySpend || 0) * (campaign.duration || 0)), 0),
    totalViews: campaigns.reduce((sum, campaign) => sum + (campaign.views || 0), 0)
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);
    if (type === 'convert' && item) {
      setSelectedLead(item);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setEditingItem(null);
    setSelectedLead(null);
  };

  const addLead = (leadData) => {
    const newLead = {
      id: Date.now(),
      ...leadData,
      // normalize service to array with standard label for consistent rendering
      service: leadData.service ? [mapServiceLabel(leadData.service)] : [],
      // ensure source is set with a default if not provided
      source: leadData.source || 'Unknown',
      dateAdded: new Date().toISOString().split('T')[0],
      status: 'New',
      documents: [],
      // Add analytics fields for efficiency metrics
      views: leadData.views || 0,
      clicks: leadData.clicks || 0,
      conversions: leadData.conversions || 0,
      dailySpend: leadData.dailySpend || 0,
      duration: leadData.duration || 1
    };
    setLeads([newLead, ...leads]);
  };

  const addCampaign = (campaignData) => {
    const newCampaign = {
      id: Date.now(),
      name: campaignData.name || '',
      platform: campaignData.platform || 'Facebook',
      startDate: campaignData.startDate || new Date().toISOString().split('T')[0],
      duration: campaignData.duration || 0,
      dailySpend: campaignData.dailySpend || 0,
      views: campaignData.views || 0,
      clicks: campaignData.clicks || 0,
      conversions: campaignData.conversions || 0,
      status: 'Active'
    };
    setCampaigns([newCampaign, ...campaigns]);
  };

  const addCustomer = async (customerData) => {
    try {
      const payload = {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        source: customerData.source,
      joinDate: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      serviceCount: 0,
        rating: 5,
      services: [],
        estimateData: customerData.estimateData || null
    };
      const res = await fetch(`${API_URL}/api/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to create customer');
      const saved = await res.json();
      setCustomers(prev => [{
        id: saved.id,
        name: saved.name,
        email: saved.email,
        phone: saved.phone,
        address: saved.address,
        source: saved.source,
        joinDate: (saved.join_date || '').slice(0,10),
        totalSpent: Number(saved.total_spent ?? 0),
        serviceCount: Number(saved.service_count ?? 0),
        lastService: (saved.last_service || '')?.slice ? (saved.last_service || '').slice(0,10) : saved.last_service,
        rating: Number(saved.rating ?? 5),
        services: saved.services || [],
        reviewStatus: saved.review_status || 'none',
        estimateData: saved.estimate_data || null
      }, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  const convertLeadToCustomer = async (leadId, serviceData) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    try {
      // create customer
      const payload = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      address: lead.address,
      source: lead.source,
      joinDate: new Date().toISOString().split('T')[0],
        totalSpent: parseFloat(serviceData.amount || 0),
      serviceCount: 1,
      lastService: serviceData.date,
        rating: serviceData.reviewStatus === 'given' ? Number(serviceData.stars || 5) : 5,
        services: [{ type: serviceData.service, date: serviceData.date, amount: parseFloat(serviceData.amount || 0), status: 'Scheduled' }],
        reviewStatus: serviceData.reviewStatus || 'none',
        estimateData: lead.estimateData || null
      };
      const res = await fetch(`${API_URL}/api/customers`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to create customer');
      const saved = await res.json();
      setCustomers(prev => [{
        id: saved.id,
        name: saved.name,
        email: saved.email,
        phone: saved.phone,
        address: saved.address,
        source: saved.source,
        joinDate: (saved.join_date || '').slice(0,10),
        totalSpent: Number(saved.total_spent ?? 0),
        serviceCount: Number(saved.service_count ?? 0),
        lastService: (saved.last_service || '')?.slice ? (saved.last_service || '').slice(0,10) : saved.last_service,
        rating: Number(saved.rating ?? 5),
        services: saved.services || [],
        reviewStatus: saved.review_status || 'none',
        estimateData: saved.estimate_data || lead.estimateData || null
      }, ...prev]);
      // delete lead
      await fetch(`${API_URL}/api/leads/${leadId}`, { method: 'DELETE' });
      setLeads(prev => prev.filter(l => l.id !== leadId));
    } catch (e) {
      console.error(e);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const toggleLeadStatus = (leadId) => {
    setLeads(prevLeads => prevLeads.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status: lead.status === 'New' ? 'Contacted' : 'New'
        };
      }
      return lead;
    }));
  };

  const updateLeadStatus = (leadId, status) => {
    setLeads(prevLeads => prevLeads.map(lead => lead.id === leadId ? { ...lead, status } : lead));
  };

  const deleteLead = (id) => {
    setDeleteConfirm({ show: true, type: 'lead', id: id });
  };

  const deleteCustomer = (id) => {
    setDeleteConfirm({ show: true, type: 'customer', id: id });
  };

  const deleteCampaign = (id) => {
    setDeleteConfirm({ show: true, type: 'campaign', id: id });
  };

  const handleAdFileUpload = (campaignId, files) => {
    const fileArray = Array.from(files);
    const newFiles = fileArray.map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      file: file
    }));

    setCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, adFiles: [...(campaign.adFiles || []), ...newFiles] }
          : campaign
      )
    );
  };

  const removeAdFile = (campaignId, fileIndex) => {
    setCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign.id === campaignId 
          ? { 
              ...campaign, 
              adFiles: campaign.adFiles.filter((_, index) => index !== fileIndex)
            }
          : campaign
      )
    );
  };

  // eslint-disable-next-line no-unused-vars
  const generateAnalyticsData = (campaign) => {
    const duration = campaign.duration || 7;
    const totalViews = campaign.views || 0;
    const totalClicks = campaign.clicks || 0;
    const totalConversions = campaign.conversions || 0;
    
    // Generate realistic daily data with some variation
    const data = [];
    for (let i = 0; i < duration; i++) {
      const dayViews = Math.floor(totalViews / duration * (0.8 + Math.random() * 0.4));
      const dayClicks = Math.floor(totalClicks / duration * (0.8 + Math.random() * 0.4));
      const dayConversions = Math.floor(totalConversions / duration * (0.8 + Math.random() * 0.4));
      
      data.push({
        day: i + 1,
        views: Math.max(0, dayViews),
        clicks: Math.max(0, dayClicks),
        conversions: Math.max(0, dayConversions)
      });
    }
    return data;
  };


  const downloadAdFile = (file) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleCampaignExpansion = (campaignId) => {
    const newExpanded = new Set(expandedCampaigns);
    if (newExpanded.has(campaignId)) {
      newExpanded.delete(campaignId);
    } else {
      newExpanded.add(campaignId);
    }
    setExpandedCampaigns(newExpanded);
  };

  const toggleCampaignStatus = (campaignId) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === campaignId) {
        const now = new Date().toISOString();
        if (campaign.status === 'Active') {
          // Stopping campaign - record end date
          return { 
            ...campaign, 
            status: 'Stopped',
            endDate: now,
            pausePeriods: campaign.pausePeriods || []
          };
        } else {
          // Starting campaign - record restart if it was previously stopped
          const pausePeriods = campaign.pausePeriods || [];
          if (campaign.endDate) {
            pausePeriods.push({
              startDate: campaign.endDate,
              endDate: now
            });
          }
          return { 
            ...campaign, 
            status: 'Active',
            endDate: null,
            pausePeriods: pausePeriods
          };
        }
      }
      return campaign;
    }));
  };

  const openEstimateModal = (lead) => {
    setSelectedLeadForEstimate(lead);
    setEstimateData(lead.estimateData || {});
    setEstimateModalOpen(true);
  };

  const saveEstimate = () => {
    if (selectedLeadForEstimate) {
      // Check if it's a lead or customer by looking for specific properties
      const isLead = leads.some(l => l.id === selectedLeadForEstimate.id);
      const isCustomer = customers.some(c => c.id === selectedLeadForEstimate.id);
      
      if (isLead) {
        setLeads(leads.map(lead => 
          lead.id === selectedLeadForEstimate.id 
            ? { ...lead, estimateData: estimateData }
            : lead
        ));
      } else if (isCustomer) {
        setCustomers(customers.map(customer => 
          customer.id === selectedLeadForEstimate.id 
            ? { ...customer, estimateData: estimateData }
            : customer
        ));
      }
    }
    setEstimateModalOpen(false);
    setSelectedLeadForEstimate(null);
  };

  const closeEstimateModal = () => {
    setEstimateModalOpen(false);
    setSelectedLeadForEstimate(null);
    setEstimateData({});
  };

  const calculateTotalPauseTime = (campaign) => {
    if (!campaign.pausePeriods || campaign.pausePeriods.length === 0) return 0;
    
    return campaign.pausePeriods.reduce((total, period) => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      return total + (end - start);
    }, 0);
  };

  const formatPauseTime = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const liveCampaigns = campaigns.filter(campaign => campaign.status === 'Active');
  const endedCampaigns = campaigns.filter(campaign => campaign.status === 'Stopped');

  // Pricing Tool Functions
  const calculateLeadsOverTimeframe = (timeframeDays, serviceType) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - timeframeDays);
    
    return leads.filter(lead => {
      const leadDate = new Date(lead.dateAdded);
      const isWithinTimeframe = leadDate >= cutoffDate;
      
      // Filter by service type
      const hasService = Array.isArray(lead.service) ? 
        lead.service.some(service => {
          const serviceLower = service.toLowerCase();
          if (serviceType === 'exterior') {
            return serviceLower.includes('exterior') || serviceLower.includes('softwash');
          } else if (serviceType === 'concrete') {
            return serviceLower.includes('concrete') || serviceLower.includes('pressure') || serviceLower.includes('driveway');
          } else if (serviceType === 'deck') {
            return serviceLower.includes('deck') || serviceLower.includes('fence');
          }
          return false;
        }) : false;
      
      return isWithinTimeframe && hasService;
    });
  };

  const calculateRecommendedPrice = (leadsCount, timeframe, serviceType) => {
    const leadsPerDay = leadsCount / timeframe;
    const serviceData = pricingData[serviceType];
    const { basePrice, minPrice, maxPrice, leadThreshold } = serviceData;
    
    // Calculate price adjustment based on lead volume
    const leadRatio = leadsPerDay / (leadThreshold / timeframe);
    
    let recommendedPrice;
    if (leadRatio > 1.5) {
      // High demand - increase price
      recommendedPrice = Math.min(basePrice * 1.3, maxPrice);
    } else if (leadRatio > 1.0) {
      // Moderate demand - slight increase
      recommendedPrice = Math.min(basePrice * 1.1, maxPrice);
    } else if (leadRatio < 0.5) {
      // Low demand - decrease price
      recommendedPrice = Math.max(basePrice * 0.8, minPrice);
    } else {
      // Normal demand - use base price
      recommendedPrice = basePrice;
    }
    
    return {
      price: recommendedPrice,
      adjustment: ((recommendedPrice - basePrice) / basePrice * 100).toFixed(1),
      demandLevel: leadRatio > 1.5 ? 'High' : leadRatio > 1.0 ? 'Moderate' : leadRatio < 0.5 ? 'Low' : 'Normal',
      leadsPerDay: leadsPerDay.toFixed(2)
    };
  };

  const getPricingRecommendation = () => {
    const timeframe = parseInt(pricingTimeframe);
    const recentLeads = calculateLeadsOverTimeframe(timeframe, pricingServiceTab);
    const recommendation = calculateRecommendedPrice(recentLeads.length, timeframe, pricingServiceTab);
    
    return {
      timeframe,
      totalLeads: recentLeads.length,
      recommendation,
      recentLeads,
      serviceData: pricingData[pricingServiceTab]
    };
  };

  // Correspondence Functions
  const getRecipients = () => {
    const allContacts = [
      ...customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        type: 'customer',
        source: customer.source
      })),
      ...leads.map(lead => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        type: 'lead',
        source: lead.source
      }))
    ];

    switch (correspondenceData.recipientType) {
      case 'customers':
        return allContacts.filter(contact => contact.type === 'customer');
      case 'leads':
        return allContacts.filter(contact => contact.type === 'lead');
      case 'custom':
        return correspondenceData.selectedRecipients;
      default:
        return allContacts;
    }
  };

  const getMessageTemplates = () => {
    return {
      followup: {
        subject: 'Thank you for your interest in our services',
        message: 'Hi {{recipientName}},\n\nThank you for your interest in our cleaning services. We would love to discuss your project and provide you with a free estimate.\n\nPlease let us know if you have any questions or would like to schedule a consultation.\n\nBest regards,\nHoly City Clean Co.'
      },
      promotion: {
        subject: 'Special Offer - Professional Cleaning Services',
        message: 'Hi {{recipientName}},\n\nWe have a special promotion running this month! Get 20% off your first cleaning service.\n\nOur services include:\n- Home/Business Exterior Softwash\n- Concrete Pressure Washing\n- Deck/Fence Cleaning\n\nContact us today to book your service!\n\nBest regards,\nHoly City Clean Co.'
      },
      reminder: {
        subject: 'Reminder - Your cleaning service is due',
        message: 'Hi {{recipientName}},\n\nThis is a friendly reminder that your cleaning service is scheduled for this week.\n\nIf you need to reschedule or have any questions, please contact us.\n\nThank you for choosing Holy City Clean Co.\n\nBest regards,\nHoly City Clean Co.'
      }
    };
  };

  const applyTemplate = (templateName) => {
    const templates = getMessageTemplates();
    const template = templates[templateName];
    if (template) {
      setCorrespondenceData({
        ...correspondenceData,
        subject: template.subject,
        message: template.message,
        template: templateName
      });
    }
  };

  const sendCorrespondence = () => {
    const recipients = getRecipients();
    const validRecipients = recipients.filter(recipient => {
      if (correspondenceType === 'email') {
        return recipient.email && recipient.email.includes('@');
      } else {
        return recipient.phone && recipient.phone.length >= 10;
      }
    });

    if (validRecipients.length === 0) {
      alert('No valid recipients found for the selected criteria.');
      return;
    }

    // In a real implementation, this would send actual emails/SMS
    console.log('Sending correspondence:', {
      type: correspondenceType,
      recipients: validRecipients,
      subject: correspondenceData.subject,
      message: correspondenceData.message
    });

    alert(`Correspondence sent to ${validRecipients.length} recipients!`);
    
    // Reset form
    setCorrespondenceData({
      subject: '',
      message: '',
      recipientType: 'all',
      selectedRecipients: [],
      template: 'custom'
    });
  };

  // Calendar and Job Functions
  const addJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      ...jobData,
      createdAt: new Date().toISOString()
    };
    setJobs([...jobs, newJob]);
  };

  const updateJob = (id, updatedData) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updatedData } : job));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const getJobsForDate = (date) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return jobs.filter(job => job.date === dateStr);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const scheduleLeadJob = (lead) => {
    // Pre-fill the form with lead information
    const jobData = {
      customerName: lead.name,
      phone: lead.phone,
      address: lead.address,
      service: Array.isArray(lead.service) && lead.service.length > 0 ? lead.service[0] : '',
      status: 'scheduled',
      date: '',
      time: '',
      notes: `Lead from ${lead.source}`
    };
    setEditingItem(jobData);
    setModalType('addJob');
    setIsModalOpen(true);
  };

  const openJobDetailModal = (job) => {
    setSelectedJob(job);
    setIsJobDetailModalOpen(true);
  };

  // eslint-disable-next-line no-unused-vars
  const closeJobDetailModal = () => {
    setSelectedJob(null);
    setIsJobDetailModalOpen(false);
  };

  const confirmDelete = async () => {
    const { type, id } = deleteConfirm;
    
    try {
    if (type === 'lead') {
        await fetch(`${API_URL}/api/leads/${id}`, { method: 'DELETE' });
      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
    } else if (type === 'customer') {
        await fetch(`${API_URL}/api/customers/${id}`, { method: 'DELETE' });
      setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== id));
      } else if (type === 'campaign') {
        setCampaigns(prevCampaigns => prevCampaigns.filter(campaign => campaign.id !== id));
      } else if (type === 'job') {
        deleteJob(id);
      }
    } catch (e) {
      console.error(e);
    }
    
    setDeleteConfirm({ show: false, type: '', id: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, type: '', id: null });
  };

  const exportToCSV = (type) => {
    let csvContent = '';
    let filename = '';

    if (type === 'leads') {
      csvContent = 'Name,Email,Phone,Address,Source,Service,Status,Date Added,Estimated Value,Notes\n';
      leads.forEach(lead => {
        csvContent += `"${lead.name}","${lead.email}","${lead.phone}","${lead.address}","${lead.source}","${lead.service}","${lead.status}","${lead.dateAdded}","${lead.estimatedValue}","${lead.notes}"\n`;
      });
      filename = 'leads';
    } else if (type === 'customers') {
      csvContent = 'Name,Email,Phone,Address,Source,Join Date,Total Spent,Service Count,Last Service\n';
      customers.forEach(customer => {
        csvContent += `"${customer.name}","${customer.email}","${customer.phone}","${customer.address}","${customer.source}","${customer.joinDate}","${customer.totalSpent}","${customer.serviceCount}","${customer.lastService}"\n`;
      });
      filename = 'customers';
    } else if (type === 'campaigns') {
      csvContent = 'Campaign Name,Platform,Start Date,Duration (Days),Daily Spend,Total Spend,Views,Clicks,Conversions\n';
      campaigns.forEach(campaign => {
        csvContent += `"${campaign.name || ''}","${campaign.platform || ''}","${campaign.startDate || ''}","${campaign.duration || 0}","${campaign.dailySpend || 0}","${(campaign.dailySpend || 0) * (campaign.duration || 0)}","${campaign.views || 0}","${campaign.clicks || 0}","${campaign.conversions || 0}"\n`;
      });
      filename = 'campaigns';
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `holy_city_clean_${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const StatusBadge = ({ status, onClick }) => {
    const getStatusColor = (status) => {
      switch(status) {
        case 'New': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
        case 'Contacted': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
        case 'Quoted': return 'bg-purple-100 text-purple-800';
        case 'Won': return 'bg-green-100 text-green-800';
        case 'Lost': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const isClickable = status === 'New' || status === 'Contacted';

    return (
      <button
        onClick={onClick}
        disabled={!isClickable}
        className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${getStatusColor(status)} ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
        title={isClickable ? 'Click to toggle status' : ''}
      >
        {status}
      </button>
    );
  };

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // eslint-disable-next-line no-unused-vars
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateCustomerReview = async (customerId, reviewStatus, rating) => {
    try {
      const res = await fetch(`${API_URL}/api/customers/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewStatus, rating })
      });
      if (!res.ok) throw new Error('Failed to update review');
      const saved = await res.json();
      setCustomers(prev => prev.map(c => c.id === customerId ? {
        ...c,
        reviewStatus: saved.review_status || saved.reviewStatus || 'none',
        rating: Number(saved.rating ?? c.rating)
      } : c));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password protection - Change this to your desired password
    if (username === 'rradeba' && password === '843RnR$$') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Holy City Clean Co.</h1>
            <p className="text-gray-600">CRM Login</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Default: admin / hcc123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Holy City Clean Co.</h1>
              <p className="text-gray-600">Customer Relationship Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Today's Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'leads', label: 'Leads', icon: Users },
            { id: 'customers', label: 'Customers', icon: Star },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
            { id: 'campaigns', label: 'Ad Campaigns', icon: DollarSign },
            { id: 'pricing', label: 'Pricing Tool', icon: TrendingUp },
            { id: 'correspondence', label: 'Correspondence', icon: Mail }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.conversionRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Leads</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {leads.slice(0, 3).map(lead => (
                      <div key={lead.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.service}</p>
                        </div>
                        <StatusBadge status={lead.status} onClick={() => {}} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Top Customers</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {customers.slice(0, 3).map(customer => (
                      <div key={customer.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.serviceCount} services</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${customer.totalSpent.toFixed(2)}</p>
                          <RatingStars rating={customer.rating} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>
                <p className="text-gray-600 mt-1">Track and convert potential customers</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openModal('addLead')}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead</span>
                </button>
                <button
                  onClick={() => exportToCSV('leads')}
                  className="bg-white border-2 border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Service Requested</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forms</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeads.map(lead => (
                      <>
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {lead.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {lead.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {(() => { const a = formatAddressLines(lead.address || ''); return (
                            <div>
                              <div>{a.line1 || '-'}</div>
                              {a.line2 && <div className="text-gray-500">{a.line2}</div>}
                            </div>
                          ); })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center align-middle">
                          <div className="inline-block text-left text-sm text-gray-900">
                            {(() => {
                              // Handle different service data formats
                              if (Array.isArray(lead.service) && lead.service.length > 0) {
                                return (
                                  <ul className="list-disc list-inside space-y-1">
                                    {lead.service.map((s, idx) => (
                                      <li key={idx}>{s}</li>
                                    ))}
                                  </ul>
                                );
                              } else if (lead.service && typeof lead.service === 'string') {
                                return <span>{lead.service}</span>;
                              } else {
                                return <span className="text-gray-500">None</span>;
                              }
                            })()}
                            {lead.notes && (
                              <div className="text-sm text-gray-500 mt-1">{lead.notes}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.source || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            className={`text-xs rounded px-2 py-1 border-0 ${getLeadStatusClasses(lead.status)}`}
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          >
                            {leadStatuses.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.estimateData ? (
                            <button
                              onClick={() => openEstimateModal(lead)}
                              className="text-blue-600 hover:text-blue-900 underline flex items-center space-x-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Estimate</span>
                            </button>
                          ) : (
                            <span className="text-gray-400">No forms</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.dateAdded).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => scheduleLeadJob(lead)}
                              className="text-purple-600 hover:text-purple-900"
                              title="Schedule Job"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openModal('convert', lead)}
                              className="text-green-600 hover:text-green-900"
                              title="Convert to Customer"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEstimateModal(lead)}
                              className="text-green-600 hover:text-green-900"
                              title="Create/Edit Estimate"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => openModal('editLead', lead)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit Lead"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
                <p className="text-gray-600 mt-1">Manage your customer relationships and service history</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openModal('addCustomer')}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Customer</span>
                </button>
                <button
                  onClick={() => exportToCSV('customers')}
                  className="bg-white border-2 border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forms</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map(customer => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {customer.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {customer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.source}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 align-top">
                          <div className="flex items-center justify-between">
                            <div className="max-w-xs">
                              {Array.isArray(customer.services) && customer.services.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1">
                                  {customer.services.map((s, idx) => {
                                    const rawType = (s.type || s.name || s);
                                    const type = mapServiceLabel(rawType);
                                    const date = s.date ? new Date(s.date).toLocaleDateString() : '';
                                    return (
                                      <li key={idx} title={date ? `${type} (${date})` : type}>
                                        {type}{date ? ` (${date})` : ''}
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <span className="text-gray-500">None</span>
                              )}
                            </div>
                            <button
                              className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 ml-3 shrink-0"
                              onClick={() => openModal('addService', customer)}
                              title="Add service"
                              aria-label="Add service"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs" title={customer.address}>
                          {(() => { const a = formatAddressLines(customer.address || ''); return (
                            <div>
                              <div className="truncate">{a.line1 || '-'}</div>
                              {a.line2 && <div className="text-gray-500 truncate">{a.line2}</div>}
                            </div>
                          ); })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${customer.totalSpent.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(() => {
                            const isEditing = modalType === 'editCustomer' && editingItem && editingItem.id === customer.id;
                            const status = (customer.reviewStatus || 'none');
                            if (!isEditing) {
                              if (status === 'given') {
                                return <RatingStars rating={customer.rating} />;
                              }
                              const label = status.charAt(0).toUpperCase() + status.slice(1);
                              return <span className="text-sm text-gray-700">{label}</span>;
                            }
                            // Editing: allow changes
                            if (status === 'given') {
                              return (
                                <div className="flex items-center space-x-2">
                          <RatingStars rating={customer.rating} />
                                  <select
                                    className="text-xs border border-gray-300 rounded px-1 py-0.5"
                                    value={customer.rating}
                                    onChange={(e) => updateCustomerReview(customer.id, 'given', Number(e.target.value))}
                                  >
                                    {[5,4,3,2,1].map(star => (
                                      <option key={star} value={star}>{star}</option>
                                    ))}
                                  </select>
                                </div>
                              );
                            }
                            return (
                              <select
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                                value={status}
                                onChange={(e) => updateCustomerReview(customer.id, e.target.value, customer.rating)}
                              >
                                <option value="none">None</option>
                                <option value="requested">Requested</option>
                                <option value="given">Given</option>
                              </select>
                            );
                          })()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.estimateData ? (
                            <button
                              onClick={() => {
                                // Create a temporary lead object with customer data to open estimate modal
                                const tempLead = {
                                  ...customer,
                                  estimateData: customer.estimateData
                                };
                                openEstimateModal(tempLead);
                              }}
                              className="text-blue-600 hover:text-blue-900 underline flex items-center space-x-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Estimate</span>
                            </button>
                          ) : (
                            <span className="text-gray-400">No forms</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal('editCustomer', customer)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteCustomer(customer.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete customer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Job Calendar</h2>
                <p className="text-gray-600 mt-1">Schedule and manage your cleaning jobs</p>
              </div>
              <button
                onClick={() => {
                  setModalType('addJob');
                  setIsModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Job</span>
              </button>
            </div>

            {/* Calendar Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={navigateToToday}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Today
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {(() => {
                  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
                  const days = [];
                  
                  // Empty cells for days before month starts
                  for (let i = 0; i < startingDayOfWeek; i++) {
                    days.push(
                      <div key={`empty-${i}`} className="min-h-[100px] bg-gray-50 rounded-lg"></div>
                    );
                  }

                  // Days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day);
                    const dateStr = date.toISOString().split('T')[0];
                    const dayJobs = getJobsForDate(date);
                    const isToday = dateStr === new Date().toISOString().split('T')[0];
                    const isSelected = selectedDate && dateStr === new Date(selectedDate).toISOString().split('T')[0];

                    days.push(
                      <div
                        key={day}
                        onClick={() => setSelectedDate(date)}
                        className={`min-h-[100px] border-2 rounded-lg p-2 cursor-pointer transition-all ${
                          isToday ? 'border-blue-500 bg-blue-50' : 
                          isSelected ? 'border-green-500 bg-green-50' :
                          'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className={`text-sm font-semibold mb-1 ${
                          isToday ? 'text-blue-600' : 'text-gray-700'
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayJobs.slice(0, 3).map(job => (
                            <div
                              key={job.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                openJobDetailModal(job);
                              }}
                              className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
                                job.status === 'completed' ? 'bg-green-100 text-green-800' :
                                job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                job.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}
                              title={`${job.customerName} - ${job.service}`}
                            >
                              {job.time} {job.customerName}
                            </div>
                          ))}
                          {dayJobs.length > 3 && (
                            <div className="text-xs text-gray-500 font-medium">
                              +{dayJobs.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return days;
                })()}
              </div>
            </div>

            {/* Upcoming Jobs List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Upcoming Jobs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobs
                      .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))
                      .map(job => (
                        <tr key={job.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(job.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">{job.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{job.customerName}</div>
                            <div className="text-sm text-gray-500">{job.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {job.service}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {job.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              job.status === 'completed' ? 'bg-green-100 text-green-800' :
                              job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                              job.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setEditingItem(job);
                                  setModalType('editJob');
                                  setIsModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirm({ show: true, type: 'job', id: job.id });
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {jobs.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                          No jobs scheduled yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Ad Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Ad Campaign Management</h2>
                <p className="text-gray-600 mt-1">Track your advertising campaigns and performance</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openModal('addCampaign')}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Campaign</span>
                </button>
                <button
                  onClick={() => exportToCSV('campaigns')}
                  className="bg-white border-2 border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Campaign View Toggle */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  onClick={() => setCampaignView('live')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    campaignView === 'live' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Live Campaigns ({liveCampaigns.length})
                </button>
                <button
                  onClick={() => setCampaignView('ended')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    campaignView === 'ended' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Ended Campaigns ({endedCampaigns.length})
                </button>
              </div>
            </div>

            {/* Live Campaigns Table */}
            {campaignView === 'live' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Live Campaigns</h3>
                  <p className="text-sm text-gray-500">Currently running ad campaigns</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (Days)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Spend</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spend</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {liveCampaigns.map(campaign => (
                        <>
                          <tr 
                            key={campaign.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleCampaignExpansion(campaign.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCampaignStatus(campaign.id);
                                  }}
                                  className="w-4 h-4 rounded-full border-2 bg-green-500 border-green-500 hover:bg-green-600 transition-colors"
                                  title="Click to stop campaign"
                                >
                                </button>
                                <div 
                                  className="absolute top-0 left-0 w-4 h-4 rounded-full border-2 border-green-500 opacity-75 pointer-events-none"
                                  style={{
                                    animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'
                                  }}
                                ></div>
                                <div 
                                  className="absolute top-0 left-0 w-4 h-4 rounded-full border-2 border-green-500 opacity-50 pointer-events-none"
                                  style={{
                                    animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
                                    animationDelay: '1s'
                                  }}
                                ></div>
                                <div 
                                  className="absolute top-0 left-0 w-4 h-4 rounded-full border-2 border-green-500 opacity-25 pointer-events-none"
                                  style={{
                                    animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
                                    animationDelay: '2s'
                                  }}
                                ></div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.platform}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(campaign.startDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.duration}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${(campaign.dailySpend || 0).toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${((campaign.dailySpend || 0) * (campaign.duration || 0)).toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(campaign.views || 0).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(campaign.clicks || 0).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.conversions || 0}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal('editCampaign', campaign);
                                  }}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCampaign(campaign.id);
                                  }}
                                  className="text-red-600 hover:text-red-900"
                                  title="Delete campaign"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <svg 
                                className={`w-6 h-6 text-gray-400 transform transition-transform ${expandedCampaigns.has(campaign.id) ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </td>
                          </tr>
                          
                          {/* Accordion Details Row */}
                          {expandedCampaigns.has(campaign.id) && (
                            <tr>
                              <td colSpan="12" className="px-6 py-4 bg-gray-50">
                                <div className="space-y-6">
                                  {/* Ad Attachment Section */}
                                  <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-4">Ad Creative</h4>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                      {campaign.adFiles && campaign.adFiles.length > 0 ? (
                                        <div className="space-y-4">
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {campaign.adFiles.map((file, index) => (
                                              <div key={index} className="relative bg-gray-50 rounded-lg p-4">
                                                {file.type.startsWith('video/') ? (
                                                  <video
                                                    controls
                                                    className="w-full h-48 rounded-lg object-cover"
                                                    src={file.url}
                                                  >
                                                    Your browser does not support the video tag.
                                                  </video>
                                                ) : (
                                                  <img
                                                    src={file.url}
                                                    alt={`Ad creative ${index + 1}`}
                                                    className="w-full h-48 rounded-lg object-cover"
                                                  />
                                                )}
                                                <div className="mt-3 flex justify-between items-center">
                                                  <span className="text-xs text-gray-500 truncate">
                                                    {file.name || `File ${index + 1}`}
                                                  </span>
                                                  <div className="flex space-x-1">
                                                    <button
                                                      onClick={() => downloadAdFile(file)}
                                                      className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                                                      title="Download"
                                                    >
                                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                      </svg>
                                                    </button>
                                                    <button
                                                      onClick={() => removeAdFile(campaign.id, index)}
                                                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                                                      title="Remove"
                                                    >
                                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                      </svg>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                          
                                          {/* Add More Files Button */}
                                          <div className="text-center pt-4 border-t border-gray-200">
                                            <input
                                              type="file"
                                              multiple
                                              accept="image/*,video/*"
                                              onChange={(e) => handleAdFileUpload(campaign.id, e.target.files)}
                                              className="hidden"
                                              id={`ad-upload-more-${campaign.id}`}
                                            />
                                            <label
                                              htmlFor={`ad-upload-more-${campaign.id}`}
                                              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                                            >
                                              <Plus className="w-4 h-4 mr-2" />
                                              Add More Files
                                            </label>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="text-center">
                                          <div className="text-gray-500 mb-2">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                          </div>
                                          <p className="text-sm text-gray-600 mb-2">Upload ad creative files</p>
                                          <p className="text-xs text-gray-500 mb-4">Supports multiple videos and images</p>
                                          <input
                                            type="file"
                                            multiple
                                            accept="image/*,video/*"
                                            onChange={(e) => handleAdFileUpload(campaign.id, e.target.files)}
                                            className="hidden"
                                            id={`ad-upload-${campaign.id}`}
                                          />
                                          <label
                                            htmlFor={`ad-upload-${campaign.id}`}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                                          >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Upload Files
                                          </label>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Efficiency Metrics */}
                                  <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-4">Cost Efficiency Metrics</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                      <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                          <div className="text-lg font-semibold text-blue-600">
                                            ${((Math.max((campaign.dailySpend || 0) * (campaign.duration || 1), 1)) / Math.max((campaign.views || 0), 1)).toFixed(2)}
                                          </div>
                                          <div className="text-xs text-gray-500">Cost per view</div>
                                        </div>
                                        <div>
                                          <div className="text-lg font-semibold text-green-600">
                                            ${((Math.max((campaign.dailySpend || 0) * (campaign.duration || 1), 1)) / Math.max((campaign.clicks || 0), 1)).toFixed(2)}
                                          </div>
                                          <div className="text-xs text-gray-500">Cost per click</div>
                                        </div>
                                        <div>
                                          <div className="text-lg font-semibold text-purple-600">
                                            ${((Math.max((campaign.dailySpend || 0) * (campaign.duration || 1), 1)) / Math.max((campaign.conversions || 0), 1)).toFixed(2)}
                                          </div>
                                          <div className="text-xs text-gray-500">Cost per conversion</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Ended Campaigns Table */}
            {campaignView === 'ended' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Ended Campaigns</h3>
                  <p className="text-sm text-gray-500">Completed and paused ad campaigns</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (Days)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pause Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Spend</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spend</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {endedCampaigns.map(campaign => (
                        <>
                          <tr 
                            key={campaign.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleCampaignExpansion(campaign.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCampaignStatus(campaign.id);
                                  }}
                                  className="w-4 h-4 rounded-full border-2 bg-red-500 border-red-500 hover:bg-red-600 transition-colors"
                                  title="Click to restart campaign"
                                >
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.platform}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(campaign.startDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.duration}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {campaign.pausePeriods && campaign.pausePeriods.length > 0 ? 
                                formatPauseTime(calculateTotalPauseTime(campaign)) : 
                                'No pauses'
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${(campaign.dailySpend || 0).toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${((campaign.dailySpend || 0) * (campaign.duration || 0)).toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(campaign.views || 0).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(campaign.clicks || 0).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.conversions || 0}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal('editCampaign', campaign);
                                  }}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCampaign(campaign.id);
                                  }}
                                  className="text-red-600 hover:text-red-900"
                                  title="Delete campaign"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <svg 
                                className={`w-6 h-6 text-gray-400 transform transition-transform ${expandedCampaigns.has(campaign.id) ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </td>
                          </tr>
                          
                          {/* Accordion Details Row */}
                          {expandedCampaigns.has(campaign.id) && (
                            <tr>
                              <td colSpan="14" className="px-6 py-4 bg-gray-50">
                                <div className="space-y-6">
                                  {/* Ad Attachment Section */}
                                  <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-4">Ad Creative</h4>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                      {campaign.adFiles && campaign.adFiles.length > 0 ? (
                                        <div className="space-y-4">
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {campaign.adFiles.map((file, index) => (
                                              <div key={index} className="relative bg-gray-50 rounded-lg p-4">
                                                {file.type.startsWith('video/') ? (
                                                  <video
                                                    controls
                                                    className="w-full h-48 rounded-lg object-cover"
                                                    src={file.url}
                                                  >
                                                    Your browser does not support the video tag.
                                                  </video>
                                                ) : (
                                                  <img
                                                    src={file.url}
                                                    alt={`Ad creative ${index + 1}`}
                                                    className="w-full h-48 rounded-lg object-cover"
                                                  />
                                                )}
                                                <div className="mt-3 flex justify-between items-center">
                                                  <span className="text-xs text-gray-500 truncate">
                                                    {file.name || `File ${index + 1}`}
                                                  </span>
                                                  <div className="flex space-x-1">
                                                    <button
                                                      onClick={() => downloadAdFile(file)}
                                                      className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                                                      title="Download"
                                                    >
                                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                      </svg>
                                                    </button>
                                                    <button
                                                      onClick={() => removeAdFile(campaign.id, index)}
                                                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                                                      title="Remove"
                                                    >
                                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                      </svg>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="text-center">
                                          <div className="text-gray-500 mb-2">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                          </div>
                                          <p className="text-sm text-gray-600 mb-2">No ad creative files uploaded</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Efficiency Metrics */}
                                  <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-4">Cost Efficiency Metrics</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                      <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                          <div className="text-lg font-semibold text-blue-600">
                                            ${((Math.max((campaign.dailySpend || 0) * (campaign.duration || 1), 1)) / Math.max((campaign.views || 0), 1)).toFixed(2)}
                                          </div>
                                          <div className="text-xs text-gray-500">Cost per view</div>
                                        </div>
                                        <div>
                                          <div className="text-lg font-semibold text-green-600">
                                            ${((Math.max((campaign.dailySpend || 0) * (campaign.duration || 1), 1)) / Math.max((campaign.clicks || 0), 1)).toFixed(2)}
                                          </div>
                                          <div className="text-xs text-gray-500">Cost per click</div>
                                        </div>
                                        <div>
                                          <div className="text-lg font-semibold text-purple-600">
                                            ${((Math.max((campaign.dailySpend || 0) * (campaign.duration || 1), 1)) / Math.max((campaign.conversions || 0), 1)).toFixed(2)}
                                          </div>
                                          <div className="text-xs text-gray-500">Cost per conversion</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Pricing Tool Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dynamic Pricing Tool</h2>
                <p className="text-gray-600 mt-1">Optimize pricing based on lead volume and demand</p>
              </div>
            </div>

            {/* Service Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Service Type</h3>
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  onClick={() => setPricingServiceTab('exterior')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    pricingServiceTab === 'exterior' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Home/Business Exterior
                </button>
                <button
                  onClick={() => setPricingServiceTab('concrete')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    pricingServiceTab === 'concrete' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Concrete Pressure Washing
                </button>
                <button
                  onClick={() => setPricingServiceTab('deck')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    pricingServiceTab === 'deck' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Deck/Fence Cleaning
                </button>
              </div>
            </div>

            {/* Pricing Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Pricing Configuration - {pricingData[pricingServiceTab].description}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe (Days)</label>
                  <select
                    value={pricingTimeframe}
                    onChange={(e) => setPricingTimeframe(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Base Price ($/{pricingData[pricingServiceTab].unit})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={pricingData[pricingServiceTab].basePrice}
                    onChange={(e) => setPricingData({
                      ...pricingData,
                      [pricingServiceTab]: {
                        ...pricingData[pricingServiceTab],
                        basePrice: parseFloat(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price ($/{pricingData[pricingServiceTab].unit})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={pricingData[pricingServiceTab].minPrice}
                    onChange={(e) => setPricingData({
                      ...pricingData,
                      [pricingServiceTab]: {
                        ...pricingData[pricingServiceTab],
                        minPrice: parseFloat(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price ($/{pricingData[pricingServiceTab].unit})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={pricingData[pricingServiceTab].maxPrice}
                    onChange={(e) => setPricingData({
                      ...pricingData,
                      [pricingServiceTab]: {
                        ...pricingData[pricingServiceTab],
                        maxPrice: parseFloat(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Threshold (leads per timeframe for price adjustment)</label>
                <input
                  type="number"
                  value={pricingData[pricingServiceTab].leadThreshold}
                  onChange={(e) => setPricingData({
                    ...pricingData,
                    [pricingServiceTab]: {
                      ...pricingData[pricingServiceTab],
                      leadThreshold: parseInt(e.target.value)
                    }
                  })}
                  className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Pricing Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Analysis */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current Analysis</h3>
                {(() => {
                  const analysis = getPricingRecommendation();
                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Timeframe</div>
                          <div className="text-2xl font-bold text-gray-900">{analysis.timeframe} days</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Total Leads</div>
                          <div className="text-2xl font-bold text-gray-900">{analysis.totalLeads}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Leads per Day</div>
                          <div className="text-2xl font-bold text-gray-900">{analysis.recommendation.leadsPerDay}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Demand Level</div>
                          <div className={`text-2xl font-bold ${
                            analysis.recommendation.demandLevel === 'High' ? 'text-red-600' :
                            analysis.recommendation.demandLevel === 'Moderate' ? 'text-yellow-600' :
                            analysis.recommendation.demandLevel === 'Low' ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {analysis.recommendation.demandLevel}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Pricing Recommendation */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing Recommendation</h3>
                {(() => {
                  const analysis = getPricingRecommendation();
                  const { recommendation } = analysis;
                  return (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="text-sm text-blue-600 mb-2">Recommended Price</div>
                        <div className="text-4xl font-bold text-blue-900">${recommendation.price.toFixed(2)}</div>
                        <div className="text-sm text-blue-600">per square foot</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Price Adjustment</div>
                          <div className={`text-xl font-bold ${
                            parseFloat(recommendation.adjustment) > 0 ? 'text-green-600' : 
                            parseFloat(recommendation.adjustment) < 0 ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {parseFloat(recommendation.adjustment) > 0 ? '+' : ''}{recommendation.adjustment}%
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Base Price</div>
                          <div className="text-xl font-bold text-gray-900">${analysis.serviceData.basePrice.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Lead Volume Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Volume Over Time</h3>
              {(() => {
                const analysis = getPricingRecommendation();
                const { recentLeads, timeframe } = analysis;
                
                // Group leads by day
                const leadsByDay = {};
                recentLeads.forEach(lead => {
                  const date = new Date(lead.dateAdded).toISOString().split('T')[0];
                  leadsByDay[date] = (leadsByDay[date] || 0) + 1;
                });
                
                const maxLeads = Math.max(...Object.values(leadsByDay), 1);
                const days = Object.keys(leadsByDay).sort();
                
                return (
                  <div className="space-y-4">
                    <div className="h-64 flex items-end space-x-1">
                      {days.map((date, index) => {
                        const leadCount = leadsByDay[date] || 0;
                        const height = (leadCount / maxLeads) * 200;
                        return (
                          <div key={date} className="flex-1 flex flex-col items-center">
                            <div
                              className="bg-blue-500 rounded-t"
                              style={{ height: `${height}px`, minHeight: '4px' }}
                              title={`${date}: ${leadCount} leads`}
                            ></div>
                            <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                      Showing {days.length} days with lead activity out of {timeframe} days analyzed
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Pricing Strategy Explanation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">High Demand (Increase Price)</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    When leads per day exceed 1.5x the threshold, increase price by up to 30% to maximize revenue.
                  </p>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="text-sm text-red-800">
                      <strong>Example:</strong> 15+ leads/day → Price: ${(pricingData[pricingServiceTab].basePrice * 1.3).toFixed(2)}/{pricingData[pricingServiceTab].unit}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Low Demand (Decrease Price)</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    When leads per day are below 50% of threshold, decrease price by up to 20% to attract more customers.
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Example:</strong> 3- leads/day → Price: ${(pricingData[pricingServiceTab].basePrice * 0.8).toFixed(2)}/{pricingData[pricingServiceTab].unit}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Correspondence Tab */}
        {activeTab === 'correspondence' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Mass Communication</h2>
                <p className="text-gray-600 mt-1">Send emails and text messages to your customers and leads</p>
              </div>
            </div>

            {/* Communication Type Toggle */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Communication Type</h3>
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                <button
                  onClick={() => setCorrespondenceType('email')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    correspondenceType === 'email' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </button>
                <button
                  onClick={() => setCorrespondenceType('sms')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    correspondenceType === 'sms' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Text Message
                </button>
              </div>
            </div>

            {/* Recipient Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recipients</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Type</label>
                  <select
                    value={correspondenceData.recipientType}
                    onChange={(e) => setCorrespondenceData({...correspondenceData, recipientType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Contacts ({customers.length + leads.length})</option>
                    <option value="customers">Customers Only ({customers.length})</option>
                    <option value="leads">Leads Only ({leads.length})</option>
                    <option value="custom">Custom Selection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valid Recipients</label>
                  <div className="text-sm text-gray-600">
                    {(() => {
                      const recipients = getRecipients();
                      const validRecipients = recipients.filter(recipient => {
                        if (correspondenceType === 'email') {
                          return recipient.email && recipient.email.includes('@');
                        } else {
                          return recipient.phone && recipient.phone.length >= 10;
                        }
                      });
                      return `${validRecipients.length} recipients will receive this ${correspondenceType}`;
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Message Templates */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Message Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => applyTemplate('followup')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    correspondenceData.template === 'followup' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-900">Follow-up</h4>
                  <p className="text-sm text-gray-600 mt-1">Thank you for your interest in our services</p>
                </button>
                <button
                  onClick={() => applyTemplate('promotion')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    correspondenceData.template === 'promotion' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-900">Promotion</h4>
                  <p className="text-sm text-gray-600 mt-1">Special offers and discounts</p>
                </button>
                <button
                  onClick={() => applyTemplate('reminder')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    correspondenceData.template === 'reminder' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-900">Reminder</h4>
                  <p className="text-sm text-gray-600 mt-1">Service reminders and scheduling</p>
                </button>
              </div>
            </div>

            {/* Message Composition */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compose Message</h3>
              <div className="space-y-4">
                {correspondenceType === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={correspondenceData.subject}
                      onChange={(e) => setCorrespondenceData({...correspondenceData, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email subject"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {correspondenceType === 'email' ? 'Message' : 'Text Message'}
                  </label>
                  <textarea
                    value={correspondenceData.message}
                    onChange={(e) => setCorrespondenceData({...correspondenceData, message: e.target.value})}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter your ${correspondenceType} message here...`}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Use {'{{recipientName}}'} to personalize messages with recipient names
                  </p>
                </div>
              </div>
            </div>

            {/* Preview and Send */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preview & Send</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Message Preview</h4>
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {correspondenceType === 'email' && correspondenceData.subject && (
                      <div className="font-medium mb-2">Subject: {correspondenceData.subject}</div>
                    )}
                    {correspondenceData.message || 'No message entered'}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {(() => {
                      const recipients = getRecipients();
                      const validRecipients = recipients.filter(recipient => {
                        if (correspondenceType === 'email') {
                          return recipient.email && recipient.email.includes('@');
                        } else {
                          return recipient.phone && recipient.phone.length >= 10;
                        }
                      });
                      return `Ready to send to ${validRecipients.length} recipients`;
                    })()}
                  </div>
                  <button
                    onClick={sendCorrespondence}
                    disabled={!correspondenceData.message || (correspondenceType === 'email' && !correspondenceData.subject)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Send {correspondenceType === 'email' ? 'Email' : 'Text Message'}
                  </button>
                </div>
              </div>
            </div>

            {/* Recipient List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recipient List</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getRecipients().map(recipient => {
                      const isValid = correspondenceType === 'email' 
                        ? (recipient.email && recipient.email.includes('@'))
                        : (recipient.phone && recipient.phone.length >= 10);
                      
                      return (
                        <tr key={`${recipient.type}-${recipient.id}`} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {recipient.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              recipient.type === 'customer' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {recipient.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {recipient.email || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {recipient.phone || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              isValid 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {isValid ? 'Valid' : 'Invalid'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && (
        <Modal
          type={modalType}
          item={editingItem}
          onClose={closeModal}
          onSubmit={(data) => {
            if (modalType === 'addLead') {
              addLead(data);
            } else if (modalType === 'addCustomer') {
              addCustomer(data);
            } else if (modalType === 'editCustomer') {
              updateCustomerReview(editingItem.id, data.reviewStatus, data.rating);
            } else if (modalType === 'addJob') {
              addJob(data);
            } else if (modalType === 'editJob') {
              updateJob(editingItem.id, data);
            } else if (modalType === 'addCampaign') {
              addCampaign(data);
            } else if (modalType === 'convert') {
              convertLeadToCustomer(selectedLead.id, data);
            } else if (modalType === 'addService') {
              // data: { service, date, amount }
              const serviceEntry = {
                type: data.service,
                date: data.date,
                amount: parseFloat(data.amount || 0),
                status: 'Completed'
              };
              updateCustomerReview(editingItem.id, (editingItem.reviewStatus || 'none'), editingItem.rating);
              // Call backend to append service and refresh UI entry
              fetch(`${API_URL}/api/customers/${editingItem.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ addService: serviceEntry })
              }).then(r => r.json()).then(saved => {
                setCustomers(prev => prev.map(c => c.id === editingItem.id ? {
                  ...c,
                  services: saved.services || c.services,
                  totalSpent: Number(saved.total_spent ?? c.totalSpent),
                  serviceCount: Number(saved.service_count ?? c.serviceCount),
                  lastService: saved.last_service || c.lastService
                } : c));
              }).catch(() => {});
            }
            closeModal();
          }}
          serviceTypes={serviceTypes}
          referralSources={referralSources}
          campaignPlatforms={campaignPlatforms}
        />
      )}

      {/* Estimate Modal */}
      {estimateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Estimate for {selectedLeadForEstimate?.firstName} {selectedLeadForEstimate?.lastName}
                </h2>
                <button
                  onClick={closeEstimateModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                      <input
                        type="text"
                        value={estimateData.customerName || `${selectedLeadForEstimate?.firstName} ${selectedLeadForEstimate?.lastName}`}
                        onChange={(e) => setEstimateData({...estimateData, customerName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={estimateData.customerPhone || selectedLeadForEstimate?.phone || ''}
                        onChange={(e) => setEstimateData({...estimateData, customerPhone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={estimateData.customerEmail || selectedLeadForEstimate?.email || ''}
                        onChange={(e) => setEstimateData({...estimateData, customerEmail: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                      <input
                        type="text"
                        value={estimateData.propertyAddress || selectedLeadForEstimate?.address || ''}
                        onChange={(e) => setEstimateData({...estimateData, propertyAddress: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Estimate Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Estimate Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimate Date</label>
                      <input
                        type="date"
                        value={estimateData.estimateDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setEstimateData({...estimateData, estimateDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimate Number</label>
                      <input
                        type="text"
                        value={estimateData.estimateNumber || `EST-${Date.now()}`}
                        onChange={(e) => setEstimateData({...estimateData, estimateNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Services</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="drivewayCheckbox"
                        checked={estimateData.drivewaySelected || false}
                        onChange={(e) => setEstimateData({...estimateData, drivewaySelected: e.target.checked})}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="drivewayCheckbox" className="text-sm font-medium text-gray-700">
                        Driveway/Walkway Pressure Wash
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="softwashCheckbox"
                        checked={estimateData.softwashSelected || false}
                        onChange={(e) => setEstimateData({...estimateData, softwashSelected: e.target.checked})}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="softwashCheckbox" className="text-sm font-medium text-gray-700">
                        Exterior Softwash
                      </label>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Driveway Total</label>
                      <input
                        type="number"
                        step="0.01"
                        value={estimateData.drivewayTotal || ''}
                        onChange={(e) => setEstimateData({...estimateData, drivewayTotal: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Softwash Total</label>
                      <input
                        type="number"
                        step="0.01"
                        value={estimateData.softwashTotal || ''}
                        onChange={(e) => setEstimateData({...estimateData, softwashTotal: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Grand Total</label>
                      <input
                        type="number"
                        step="0.01"
                        value={estimateData.grandTotal || ''}
                        onChange={(e) => setEstimateData({...estimateData, grandTotal: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                  <textarea
                    value={estimateData.notes || ''}
                    onChange={(e) => setEstimateData({...estimateData, notes: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional notes or special requirements..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeEstimateModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEstimate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this {deleteConfirm.type === 'lead' ? 'lead' : 'customer'}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Modal = ({ type, item, onClose, onSubmit, serviceTypes, referralSources, campaignPlatforms }) => {
  const [formData, setFormData] = useState(() => {
    if (type === 'convert' && item) {
      return {
        service: item.service,
        date: new Date().toISOString().split('T')[0],
        amount: item.estimatedValue || ''
      };
    }
    return item || {};
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const getTitle = () => {
    switch(type) {
      case 'addLead': return 'Add New Lead';
      case 'editLead': return 'Edit Lead';
      case 'addCustomer': return 'Add New Customer';
      case 'editCustomer': return 'Edit Customer';
      case 'addJob': return 'Add New Job';
      case 'editJob': return 'Edit Job';
      case 'addCampaign': return 'Add New Campaign';
      case 'editCampaign': return 'Edit Campaign';
      case 'convert': return 'Convert Lead to Customer';
      default: return 'Modal';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{getTitle()}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(type === 'addLead' || type === 'editLead' || type === 'addCustomer' || type === 'editCustomer') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select
                    value={formData.source || ''}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a source</option>
                    {referralSources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {(type === 'editCustomer') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Review Status</label>
                      <select
                        value={formData.reviewStatus || 'none'}
                        onChange={(e) => setFormData({...formData, reviewStatus: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="none">None</option>
                        <option value="requested">Requested</option>
                        <option value="given">Given</option>
                      </select>
                    </div>
                    {formData.reviewStatus === 'given' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (Stars)</label>
                        <select
                          value={formData.rating || 5}
                          onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {[5,4,3,2,1].map(star => (
                            <option key={star} value={star}>{star} Star{star !== 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            
            {(type === 'addLead' || type === 'editLead') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select
                    value={formData.service || ''}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a service type</option>
                    {serviceTypes.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value ($)</label>
                  <input
                    type="number"
                    value={formData.estimatedValue || ''}
                    onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {type === 'convert' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select
                    value={formData.service || serviceTypes[0]}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {serviceTypes.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Date</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Status</label>
                  <select
                    value={formData.reviewStatus || 'none'}
                    onChange={(e) => setFormData({...formData, reviewStatus: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {['none','requested','given'].map(status => (
                      <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                    ))}
                  </select>
                </div>
                {formData.reviewStatus === 'given' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stars</label>
                    <select
                      value={formData.stars || 5}
                      onChange={(e) => setFormData({...formData, stars: Number(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[5,4,3,2,1].map(star => (
                        <option key={star} value={star}>{star}</option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {type === 'addService' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select
                    value={formData.service || serviceTypes[0]}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[
                      'Home/Business Exterior',
                      'Concrete Pressure Washing',
                      'Deck/Fence Cleaning',
                      'Other'
                    ].map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Date</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            {(type === 'addJob' || type === 'editJob') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={formData.customerName || ''}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select
                    value={formData.service || ''}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Home/Business Exterior">Home/Business Exterior</option>
                    <option value="Concrete Pressure Washing">Concrete Pressure Washing</option>
                    <option value="Deck/Fence Cleaning">Deck/Fence Cleaning</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status || 'scheduled'}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={formData.time || ''}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
              </>
            )}

            {(type === 'addCampaign' || type === 'editCampaign') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select
                    value={formData.platform || campaignPlatforms[0]}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {campaignPlatforms.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => {
                      const startDate = e.target.value;
                      const currentDate = new Date().toISOString().split('T')[0];
                      const daysDiff = Math.max(0, Math.ceil((new Date(currentDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)));
                      setFormData({...formData, startDate, duration: daysDiff});
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    value={formData.duration || 0}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    title="Automatically calculated from start date to today"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Daily Spend ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.dailySpend || ''}
                    onChange={(e) => setFormData({...formData, dailySpend: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Views</label>
                  <input
                    type="number"
                    value={formData.views || ''}
                    onChange={(e) => setFormData({...formData, views: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clicks</label>
                  <input
                    type="number"
                    value={formData.clicks || ''}
                    onChange={(e) => setFormData({...formData, clicks: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conversions</label>
                  <input
                    type="number"
                    value={formData.conversions || ''}
                    onChange={(e) => setFormData({...formData, conversions: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {type === 'convert' ? 'Convert to Customer' : type.includes('add') ? 'Create' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const JobDetailModal = ({ job, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Date and Time */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <div className="text-sm text-gray-500">Date & Time</div>
                <div className="text-lg font-semibold text-gray-900">
                  {new Date(job.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {job.time}
                </div>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                job.status === 'completed' ? 'bg-green-100 text-green-800' :
                job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                job.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {job.status}
              </span>
            </div>

            {/* Customer Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-900 font-medium">{job.customerName}</span>
                </div>
                {job.phone && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">{job.phone}</span>
                  </div>
                )}
                {job.address && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">{job.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Service Details */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Service</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-gray-900 font-medium">{job.service}</div>
              </div>
            </div>

            {/* Notes */}
            {job.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{job.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Job</span>
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Job</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagementSystem;