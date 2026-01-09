import React, { useState, useEffect } from 'react';
import Components from './components';
import './modal.css';

const ServiceManagementSystem = () => {
  // Sample data from App.jsx
  const sampleLeads = [
    {
      id: 'lead-hc-000',
      firstName: 'Sarah',
      lastName: 'Johnson',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '(843) 555-0199',
      address: '45 Market Street, Charleston, SC 29401',
      source: 'Website',
      service: ['Home/Business Exterior'],
      status: 'Uncontacted',
      dateAdded: new Date().toISOString().split('T')[0],
      estimatedValue: 1200,
      notes: 'New inquiry from website contact form',
      estimateData: null
    },
    {
      id: 'lead-hc-001',
      firstName: 'Emily',
      lastName: 'Thompson',
      name: 'Emily Thompson',
      email: 'emily.thompson@example.com',
      phone: '(843) 555-0112',
      address: '183 Shem Creek Dr, Mount Pleasant, SC 29464',
      source: 'Google Search',
      service: ['Home/Business Exterior'],
      status: 'New',
      dateAdded: '2025-01-12',
      estimatedValue: 950,
      notes: 'Wants quote for main house + carriage house',
      estimateData: null
    },
    {
      id: 'lead-hc-002',
      firstName: 'Jared',
      lastName: 'Lopez',
      name: 'Jared Lopez',
      email: 'jared.lopez@example.com',
      phone: '(843) 555-0144',
      address: '22 Carolina Oaks Ave, Summerville, SC 29485',
      source: 'Facebook Ads',
      service: ['Concrete Pressure Washing'],
      status: 'Contacted',
      dateAdded: '2025-01-08',
      estimatedValue: 600,
      notes: 'Driveway + walkways',
      estimateData: {
        serviceType: 'Concrete Pressure Washing',
        squareFootage: 2200,
        pricePerSqFt: 0.28,
        total: 616
      }
    },
    {
      id: 'lead-hc-003',
      firstName: 'Claire',
      lastName: 'Nguyen',
      name: 'Claire Nguyen',
      email: 'claire.nguyen@example.com',
      phone: '(843) 555-0175',
      address: '9 Indigo Point Dr, Charleston, SC 29407',
      source: 'Instagram',
      service: ['Deck/Fence Cleaning'],
      status: 'Estimate Sent',
      dateAdded: '2025-01-05',
      estimatedValue: 780,
      notes: 'Cypress deck needs soft wash',
      estimateData: null
    },
    {
      id: 'lead-hc-004',
      firstName: 'Owen',
      lastName: 'Carpenter',
      name: 'Owen Carpenter',
      email: 'owen.carpenter@example.com',
      phone: '(843) 555-0160',
      address: '415 River Landing Dr, Daniel Island, SC 29492',
      source: 'Instagram',
      service: ['Roof Softwash'],
      status: 'Scheduled',
      dateAdded: '2024-12-28',
      estimatedValue: 1200,
      notes: 'Booked for next Thursday morning',
      estimateData: null
    },
    {
      id: 'lead-hc-005',
      firstName: 'Sasha',
      lastName: 'Morales',
      name: 'Sasha Morales',
      email: 'sasha.morales@example.com',
      phone: '(843) 555-0133',
      address: '58 Live Oak Dr, Mount Pleasant, SC 29464',
      source: 'Instagram',
      service: ['Gutter Brightening'],
      status: 'Completed',
      dateAdded: '2024-12-18',
      estimatedValue: 450,
      notes: 'Interested in annual maintenance plan',
      estimateData: null
    },
    {
      id: 'lead-hc-006',
      firstName: 'Taylor',
      lastName: 'Brooks',
      name: 'Taylor Brooks',
      email: 'taylor.brooks@example.com',
      phone: '(843) 555-0199',
      address: '210 Harbor Breeze Ln, Charleston, SC 29492',
      source: 'Google Search',
      service: ['Home/Business Exterior'],
      status: 'Rejected',
      dateAdded: '2025-01-03',
      estimatedValue: 725,
      notes: 'Decided not to move forward after estimate',
      estimateData: null
    },
    {
      id: 'lead-hc-007',
      firstName: 'Michael',
      lastName: 'Chen',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '(843) 555-0155',
      address: '145 Waterfront Park Dr, Charleston, SC 29401',
      source: 'Facebook Ads',
      service: ['Concrete Pressure Washing'],
      status: 'Paused',
      dateAdded: '2024-12-20',
      estimatedValue: 850,
      notes: 'Waiting for homeowner approval - paused follow-up',
      estimateData: {
        serviceType: 'Concrete Pressure Washing',
        squareFootage: 3200,
        pricePerSqFt: 0.28,
        total: 896
      }
    },
    {
      id: 'lead-hc-008',
      firstName: 'Sarah',
      lastName: 'Martinez',
      name: 'Sarah Martinez',
      email: 'sarah.martinez@example.com',
      phone: '(843) 555-0177',
      address: '88 King Street, Charleston, SC 29401',
      source: 'Instagram',
      service: ['Deck/Fence Cleaning'],
      status: 'Paused',
      dateAdded: '2024-12-15',
      estimatedValue: 650,
      notes: 'Customer requested to pause - will resume in spring',
      estimateData: null
    },
    {
      id: 'lead-hc-009',
      firstName: 'David',
      lastName: 'Kim',
      name: 'David Kim',
      email: 'david.kim@example.com',
      phone: '(843) 555-0188',
      address: '312 Meeting Street, Charleston, SC 29401',
      source: 'Google Search',
      service: ['Home/Business Exterior'],
      status: 'Paused',
      dateAdded: '2024-12-10',
      estimatedValue: 1100,
      notes: 'Paused due to scheduling conflict - will reschedule',
      estimateData: null
    }
  ];

  const sampleCustomers = [
    {
      id: 'cust-hc-001',
      firstName: 'Marcus',
      lastName: 'Reeves',
      name: 'Marcus Reeves',
      email: 'marcus.reeves@example.com',
      phone: '(843) 555-0188',
      address: '77 Broad St, Charleston, SC 29401',
      source: 'Referral',
      services: [
        { type: 'Home/Business Exterior', date: '2024-11-02' },
        { type: 'Concrete Pressure Washing', date: '2024-12-15' }
      ],
      totalSpent: 2450,
      serviceCount: 3,
      rating: 5,
      reviewStatus: 'given',
      estimateData: null
    },
    {
      id: 'cust-hc-002',
      firstName: 'Danielle',
      lastName: 'Knox',
      name: 'Danielle Knox',
      email: 'danielle.knox@example.com',
      phone: '(843) 555-0156',
      address: '12 Battery Park Ct, Charleston, SC 29401',
      source: 'Google Search',
      services: [
        { type: 'Roof Softwash', date: '2024-10-20', pricePaid: 850 },
        { type: 'Gutter Brightening', date: '2024-12-05', pricePaid: 1040 },
        { type: 'Home/Business Exterior', date: '2024-08-15', pricePaid: 1200 },
        { type: 'Concrete Pressure Washing', date: '2024-06-10', pricePaid: 650 }
      ],
      totalSpent: 3740,
      serviceCount: 4,
      rating: 4,
      reviewStatus: 'requested',
      estimateData: null
    },
    {
      id: 'cust-hc-003',
      firstName: 'Logan',
      lastName: 'Price',
      name: 'Logan Price',
      email: 'logan.price@example.com',
      phone: '(843) 555-0104',
      address: '201 Oak Forest Dr, Summerville, SC 29485',
      source: 'Facebook Ads',
      services: [
        { type: 'Deck/Fence Cleaning', date: '2024-09-14' },
        { type: 'Concrete Pressure Washing', date: '2024-12-30' }
      ],
      totalSpent: 1625,
      serviceCount: 2,
      rating: 5,
      reviewStatus: 'given',
      estimateData: null
    },
    {
      id: 'cust-hc-004',
      firstName: 'Ivy',
      lastName: 'Sullivan',
      name: 'Ivy Sullivan',
      email: 'ivy.sullivan@example.com',
      phone: '(843) 555-0129',
      address: '310 Palmetto Isles Cir, Mount Pleasant, SC 29464',
      source: 'Instagram',
      services: [
        { type: 'Home/Business Exterior', date: '2024-08-22' }
      ],
      totalSpent: 980,
      serviceCount: 1,
      rating: 0,
      reviewStatus: 'requested',
      estimateData: null
    },
    {
      id: 'cust-hc-005',
      firstName: 'Trevor',
      lastName: 'Banks',
      name: 'Trevor Banks',
      email: 'trevor.banks@example.com',
      phone: '(843) 555-0193',
      address: '142 Indigo Run Dr, Charleston, SC 29412',
      source: 'Repeat Customer',
      services: [
        { type: 'Concrete Pressure Washing', date: '2024-07-10' },
        { type: 'Home/Business Exterior', date: '2024-11-18' },
        { type: 'Holiday Lighting Removal', date: '2025-01-06' }
      ],
      totalSpent: 3120,
      serviceCount: 4,
      rating: 5,
      reviewStatus: 'given',
      estimateData: null
    }
  ];

  // Main state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState(sampleLeads);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'lead', message: 'New lead from Emily Thompson', time: '2 minutes ago', read: false },
    { id: 2, type: 'customer', message: 'Ivy Sullivan completed service', time: '1 hour ago', read: false },
    { id: 3, type: 'payment', message: 'Payment received from Jared Lopez', time: '3 hours ago', read: true },
    { id: 4, type: 'reminder', message: 'Follow up with Sarah Martinez scheduled', time: '5 hours ago', read: false },
    { id: 5, type: 'lead', message: 'New lead from Michael Chen', time: '1 day ago', read: true }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: '', id: null });
  const [newLeadForm, setNewLeadForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    source: 'Website',
    service: [],
    estimatedValue: '',
    notes: ''
  });
  const [newCustomerForm, setNewCustomerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    source: 'Website'
  });
  const [businessInfo, setBusinessInfo] = useState({
    address: '123 Main St, Charleston, SC 29401'
  });

  // Leads state
  const [expandedLeads, setExpandedLeads] = useState(new Set());
  const [expandedChatPanels, setExpandedChatPanels] = useState({});
  const [chatMediumByLead, setChatMediumByLead] = useState({});

  // Customer Directory state
  const [expandedCustomers, setExpandedCustomers] = useState(new Set());

  // My Agent state
  const [isAgentSettingsOpen, setIsAgentSettingsOpen] = useState(false);
  const [agentName, setAgentName] = useState('My AI Agent');
  const [agentTone, setAgentTone] = useState('Friendly & Conversational');
  const [emojiIntegration, setEmojiIntegration] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState({
    facebook: true,
    instagram: false,
    tiktok: false,
    website: true,
    sms: false
  });
  const [agentFlowSteps, setAgentFlowSteps] = useState([
    { 
      id: 1, 
      name: 'Personal Greeting', 
      principle: 'Focus your effort on leads that have a genuine need, budget, and authority.',
      description: 'Use criteria like BANT (Budget, Authority, Need, Timing) to filter prospects. Avoid wasting resources on unqualified leads.',
      order: 0,
      mediaItems: [{ id: Date.now(), media: null, description: '', service: '' }]
    },
    { 
      id: 2, 
      name: 'Add Job Demos', 
      principle: 'Focus your effort on leads that have a genuine need, budget, and authority.',
      description: 'Use criteria like BANT (Budget, Authority, Need, Timing) to filter prospects. Avoid wasting resources on unqualified leads.',
      order: 1,
      mediaItems: [{ id: Date.now() + 1, media: null, description: '', service: '' }]
    },
    { 
      id: 3, 
      name: 'Reviews and Testimonials', 
      principle: 'Social proof builds trust and credibility with potential customers.',
      description: 'Share customer reviews and testimonials to demonstrate your quality work and satisfied customers.',
      order: 2,
      reviewsData: {
        customerReviews: []
      }
    }
  ]);
  const [leadFollowupEnabled, setLeadFollowupEnabled] = useState(false);
  const [leadFollowupFrequency, setLeadFollowupFrequency] = useState('daily');
  const [leadFollowupDays, setLeadFollowupDays] = useState(7);
  const [leadFollowupDuration, setLeadFollowupDuration] = useState('days');
  const [leadFollowupDurationValue, setLeadFollowupDurationValue] = useState(30);
  const [leadFollowupDurationUnit, setLeadFollowupDurationUnit] = useState('days');
  const [editingStepId, setEditingStepId] = useState(null);
  const [promotions, setPromotions] = useState([{
    id: Date.now(),
    services: [],
    promotionType: 'percentOff',
    percentOff: '',
    percentOffServices: [],
    packageType: 'buyOneGetOne',
    packageFormula: {
      initialServices: [],
      additionalServices: []
    },
    packagePrice: '',
    packageServices: [],
    startDate: '',
    endDate: '',
  }]);
  const [softWashingServices] = useState([
    'House Washing',
    'Roof Cleaning',
    'Soffit & Fascia Cleaning',
    'Gutter Cleaning',
    'Window Cleaning',
    'Deck Cleaning',
    'Fence Cleaning',
    'Patio Cleaning',
    'Siding Cleaning',
    'Brick Cleaning',
    'Stucco Cleaning',
    'Vinyl Siding Cleaning'
  ]);
  const [customSoftWashingServices, setCustomSoftWashingServices] = useState([]);
  const [pressureWashingServices] = useState([
    'Driveway',
    'Sidewalk',
    'Patio',
    'Pool Deck',
    'Parking Lot',
    'Garage Floor',
    'Concrete Walkway',
    'Retaining Wall',
    'Concrete Steps',
    'Brick Pavers'
  ]);
  const [customPressureWashingServices, setCustomPressureWashingServices] = useState([]);
  const [specialtyCleaningServices] = useState([
    'Gutter Cleaning',
    'Gutter Brightening',
    'Window Cleaning',
    'Solar Panel Cleaning',
    'Awning Cleaning',
    'Sign Cleaning',
    'Graffiti Removal',
    'Rust Removal',
    'Oil Stain Treatment',
    'Efflorescence Removal'
  ]);
  const [customSpecialtyCleaningServices, setCustomSpecialtyCleaningServices] = useState([]);

  // My Business state
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'Holy City Clean Co.',
    phone: '(843) 555-0100',
    email: 'contact@hccc.com',
    website: '',
    street: '123 Main St',
    street2: '',
    city: 'Charleston',
    state: 'SC',
    zip: '29401',
    address: '123 Main St, Charleston, SC 29401',
    facebook: '',
    instagram: '',
    tiktok: '',
    nextdoor: '',
    angiesList: '',
    twitter: '',
    companySlogan: '',
    experienceYears: '',
    experienceMonths: '',
    jobsCompleted: '',
    whatMakesDifferent: [],
    areasServed: [],
    operatingHours: [
      { day: 'Monday', open: '8:00 AM', close: '6:00 PM', closed: false },
      { day: 'Tuesday', open: '8:00 AM', close: '6:00 PM', closed: false },
      { day: 'Wednesday', open: '8:00 AM', close: '6:00 PM', closed: false },
      { day: 'Thursday', open: '8:00 AM', close: '6:00 PM', closed: false },
      { day: 'Friday', open: '8:00 AM', close: '6:00 PM', closed: false },
      { day: 'Saturday', open: '9:00 AM', close: '2:00 PM', closed: false },
      { day: 'Sunday', open: 'Closed', close: 'Closed', closed: true }
    ],
    certificationsList: [],
    insuranceStatus: '',
    insuranceCompany: '',
    insurancePolicyNumber: '',
    insuranceCoverageLimits: '',
    guaranteeWarranty: '',
    onlineReviews: {}
  });
  const [collapsedContactDetails, setCollapsedContactDetails] = useState(true);

  // Pricing Tool state
  const [pricingFormats, setPricingFormats] = useState([{
    id: Date.now(),
    services: [],
    price: '',
    unit: '',
    basePrice: '',
    jobDifficultyMultiplier: '',
    storyMultiplier: '',
    isPricingPanelsCollapsed: false,
    pricingStructure: {
      rates: [],
      expenses: [],
      multipliers: [],
      fees: []
    }
  }]);
  const [openPricingDropdown, setOpenPricingDropdown] = useState(null);
  const [openPricingStructureDropdown, setOpenPricingStructureDropdown] = useState({});
  const [pricingStructureOptions] = useState({
    rates: ['Per Hour', 'Per Item', 'Per Job', 'Per Linear Foot', 'Per Square Foot'].sort(),
    expenses: ['Chemicals and detergents', 'Travel', 'Vehicle and Fuel', 'Water and Filtration'].sort(),
    multipliers: ['Commercial Job', 'Per Building Story', 'Taxes'].sort(),
    fees: ['Administrative', 'Estimate', 'High Risk', 'Unique Surface', 'Urgent Job/Day Of Multiplier', 'Waste Disposal Fee'].sort()
  });
  
  // Custom pricing structure options state
  const [customPricingStructureOptions, setCustomPricingStructureOptions] = useState({
    rates: [],
    expenses: [],
    multipliers: [],
    fees: []
  });
  const [unitOptions] = useState([
    'Square Foot',
    'Hour',
    'Linear Foot',
    'Square Yard',
    'Each',
    'Per Project',
    'Per Day',
    'Gallon',
  ]);

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Helper functions
  const getJobsForDate = (date) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return jobs.filter(job => job.date === dateStr);
  };

  const toggleLeadExpansion = (leadId) => {
    setExpandedLeads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(leadId)) {
        newSet.delete(leadId);
      } else {
        newSet.add(leadId);
      }
      return newSet;
    });
  };

  const toggleChatPanel = (leadId) => {
    setExpandedChatPanels(prev => ({
      ...prev,
      [leadId]: !prev[leadId]
    }));
  };

  const toggleChatPanelSize = (leadId) => {
    // Toggle chat panel size logic
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
    const parts = address.split(',').map(p => p.trim());
    if (parts.length >= 2) {
      result.line1 = parts[0];
      const city = parts[1];
      const zipMatch = address.match(/\b\d{5}(?:-\d{4})?\b/);
      const zip = zipMatch ? zipMatch[0] : '';
      const stateMatch = address.match(/\b([A-Z]{2})\b/);
      const state = stateMatch ? stateMatch[1] : '';
      let cityOnly = city.replace(/\b[A-Z]{2}\b/, '').replace(/\b\d{5}(?:-\d{4})?\b/, '').trim();
      if (cityOnly === city && parts.length > 2) {
        cityOnly = city;
      }
      const line2Parts = [cityOnly || city, state, zip].filter(Boolean);
      result.line2 = line2Parts.join(' ');
    } else {
      result.line1 = address.trim();
    }
    return result;
  };

  const handleEstimateClick = (lead, e) => {
    if (e) e.stopPropagation();
    // Handle estimate click
  };

  const handleServiceFileClick = (type, item, service) => {
    // Handle service file click
  };

  const getLeadActionButton = (lead) => {
    if (lead.status === 'Rejected') {
      return null; // No actions for rejected leads
    }

    // Determine action based on lead status and data
    if (lead.status === 'Completed') {
      return { 
        label: 'Send Thank You', 
        color: 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100',
        onClick: () => handleEstimateClick(lead)
      };
    } else if (lead.status === 'Contract Signed' || lead.status === 'Scheduled' || lead.status === 'In Progress') {
      return { 
        label: 'Send Invoice', 
        color: 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100',
        onClick: () => handleEstimateClick(lead)
      };
    } else if (lead.estimateData || lead.status === 'Estimate Sent') {
      return { 
        label: 'Send Contract', 
        color: 'bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100',
        onClick: () => handleEstimateClick(lead)
      };
    } else if (lead.status === 'New' || lead.status === 'Contacted') {
      return { 
        label: 'Send Estimate', 
        color: 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100',
        onClick: () => handleEstimateClick(lead)
      };
    } else {
      return { 
        label: 'Follow Up', 
        color: 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100',
        onClick: () => handleEstimateClick(lead)
      };
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const openJobDetailModal = (job) => {
    setEditingItem(job);
    setModalType('jobDetail');
    setIsModalOpen(true);
  };

  const updateCompanyInfo = (field, value) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const getContactDetailsCompletion = () => ({ completed: 5, total: 8 });
  const getBrandIdentityCompletion = () => ({ completed: 3, total: 5 });
  const getAreasServedCompletion = () => ({ completed: 1, total: 2 });
  const getOperatingHoursCompletion = () => ({ completed: 7, total: 7 });
  const getCertificationsCompletion = () => ({ completed: 0, total: 3 });
  const getInsuranceCompletion = () => ({ completed: 2, total: 4 });
  const getGuaranteeWarrantyCompletion = () => ({ completed: 1, total: 2 });
  const getOnlineReviewsCompletion = () => ({ completed: 0, total: 3 });

  const updateFlowStep = (stepId, updates) => {
    setAgentFlowSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  // Filter leads into categories
  const uncontactedLeads = leads.filter(lead => lead.status === 'Uncontacted');
  const readyJobs = leads.filter(lead => lead.status === 'New' || lead.status === 'Contacted' || lead.status === 'Estimate Sent' || lead.status === 'Follow Up');
  const inProgress = leads.filter(lead => lead.status === 'Scheduled' || lead.status === 'In Progress' || lead.status === 'Contract Signed');
  const stopped = leads.filter(lead => lead.status === 'Paused');
  const rejected = leads.filter(lead => lead.status === 'Rejected');

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        businessInfo={businessInfo}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[1.575rem]">
        {activeTab === 'dashboard' && (
          <Components.Dashboard
            customers={customers}
            jobs={jobs}
            leads={leads}
            notifications={notifications}
            setNotifications={setNotifications}
            getJobsForDate={getJobsForDate}
          />
        )}

        {activeTab === 'leads' && (
          <Components.Leads
            uncontactedLeads={uncontactedLeads}
            readyJobs={readyJobs}
            inProgress={inProgress}
            stopped={stopped}
            rejected={rejected}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            expandedLeads={expandedLeads}
            toggleLeadExpansion={toggleLeadExpansion}
            expandedChatPanels={expandedChatPanels}
            chatMediumByLead={chatMediumByLead}
            setChatMediumByLead={setChatMediumByLead}
            toggleChatPanelSize={toggleChatPanelSize}
            toggleChatPanel={toggleChatPanel}
            getLeadActionButton={getLeadActionButton}
            mapServiceLabel={mapServiceLabel}
            formatAddressLines={formatAddressLines}
            handleEstimateClick={handleEstimateClick}
            handleServiceFileClick={handleServiceFileClick}
            openModal={openModal}
          />
        )}

        {activeTab === 'customers' && (
          <Components.CustomerDirectory
            customers={customers}
            setCustomers={setCustomers}
            openModal={openModal}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {activeTab === 'calendar' && (
          <Components.Calendar
            setModalType={setModalType}
            setIsModalOpen={setIsModalOpen}
            setEditingItem={setEditingItem}
            setDeleteConfirm={setDeleteConfirm}
            openJobDetailModal={openJobDetailModal}
          />
        )}

        {activeTab === 'customerCorrespondence' && (
          <Components.CustomerCorrespondence
            customers={customers}
          />
        )}

        {activeTab === 'aiAgent' && (
          <Components.MyAgent
            agentFlowSteps={agentFlowSteps}
            setAgentFlowSteps={setAgentFlowSteps}
            connectedAccounts={connectedAccounts}
            setConnectedAccounts={setConnectedAccounts}
            isAgentSettingsOpen={isAgentSettingsOpen}
            setIsAgentSettingsOpen={setIsAgentSettingsOpen}
            agentName={agentName}
            setAgentName={setAgentName}
            agentTone={agentTone}
            setAgentTone={setAgentTone}
            emojiIntegration={emojiIntegration}
            setEmojiIntegration={setEmojiIntegration}
            leadFollowupEnabled={leadFollowupEnabled}
            setLeadFollowupEnabled={setLeadFollowupEnabled}
            leadFollowupFrequency={leadFollowupFrequency}
            setLeadFollowupFrequency={setLeadFollowupFrequency}
            leadFollowupDays={leadFollowupDays}
            setLeadFollowupDays={setLeadFollowupDays}
            leadFollowupDuration={leadFollowupDuration}
            setLeadFollowupDuration={setLeadFollowupDuration}
            leadFollowupDurationValue={leadFollowupDurationValue}
            setLeadFollowupDurationValue={setLeadFollowupDurationValue}
            leadFollowupDurationUnit={leadFollowupDurationUnit}
            setLeadFollowupDurationUnit={setLeadFollowupDurationUnit}
            editingStepId={editingStepId}
            setEditingStepId={setEditingStepId}
            promotions={promotions}
            setPromotions={setPromotions}
            softWashingServices={softWashingServices}
            customSoftWashingServices={customSoftWashingServices}
            pressureWashingServices={pressureWashingServices}
            customPressureWashingServices={customPressureWashingServices}
            specialtyCleaningServices={specialtyCleaningServices}
            customSpecialtyCleaningServices={customSpecialtyCleaningServices}
            updateFlowStep={updateFlowStep}
            companyInfo={companyInfo}
            updateCompanyInfo={updateCompanyInfo}
          />
        )}

        {activeTab === 'business' && (
          <Components.MyBusiness
            companyInfo={companyInfo}
            updateCompanyInfo={updateCompanyInfo}
            collapsedContactDetails={collapsedContactDetails}
            setCollapsedContactDetails={setCollapsedContactDetails}
            getContactDetailsCompletion={getContactDetailsCompletion}
            getBrandIdentityCompletion={getBrandIdentityCompletion}
            getAreasServedCompletion={getAreasServedCompletion}
            getOperatingHoursCompletion={getOperatingHoursCompletion}
            getCertificationsCompletion={getCertificationsCompletion}
            getInsuranceCompletion={getInsuranceCompletion}
            getGuaranteeWarrantyCompletion={getGuaranteeWarrantyCompletion}
            getOnlineReviewsCompletion={getOnlineReviewsCompletion}
          />
        )}

        {activeTab === 'pricingTool' && (
          <Components.PricingTool
            pricingFormats={pricingFormats}
            setPricingFormats={setPricingFormats}
            openPricingDropdown={openPricingDropdown}
            setOpenPricingDropdown={setOpenPricingDropdown}
            openPricingStructureDropdown={openPricingStructureDropdown}
            setOpenPricingStructureDropdown={setOpenPricingStructureDropdown}
            pricingStructureOptions={pricingStructureOptions}
            customPricingStructureOptions={customPricingStructureOptions}
            setCustomPricingStructureOptions={setCustomPricingStructureOptions}
            softWashingServices={softWashingServices}
            customSoftWashingServices={customSoftWashingServices}
            pressureWashingServices={pressureWashingServices}
            customPressureWashingServices={customPressureWashingServices}
            specialtyCleaningServices={specialtyCleaningServices}
            customSpecialtyCleaningServices={customSpecialtyCleaningServices}
            unitOptions={unitOptions}
          />
        )}
      </div>

      {/* Modal for Add Lead and Add Customer */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {modalType === 'addLead' ? 'Add New Lead' : modalType === 'addCustomer' ? 'Add New Customer' : ''}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="modal-close"
                aria-label="Close modal"
              >
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              {modalType === 'addLead' && (
                <div style={{ padding: '1.5rem' }}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!newLeadForm.firstName || !newLeadForm.lastName) {
                      alert('Please fill in at least first name and last name');
                      return;
                    }
                    const newLead = {
                      id: `lead-hc-${Date.now()}`,
                      firstName: newLeadForm.firstName,
                      lastName: newLeadForm.lastName,
                      name: `${newLeadForm.firstName} ${newLeadForm.lastName}`,
                      email: newLeadForm.email || '',
                      phone: newLeadForm.phone || '',
                      address: newLeadForm.address || '',
                      source: newLeadForm.source || 'Website',
                      service: Array.isArray(newLeadForm.service) ? newLeadForm.service : (newLeadForm.service ? [newLeadForm.service] : []),
                      status: 'Uncontacted',
                      dateAdded: new Date().toISOString().split('T')[0],
                      estimatedValue: newLeadForm.estimatedValue ? parseFloat(newLeadForm.estimatedValue) : null,
                      notes: newLeadForm.notes || '',
                      estimateData: null
                    };
                    setLeads([newLead, ...leads]);
                    setNewLeadForm({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      address: '',
                      source: 'Website',
                      service: [],
                      estimatedValue: '',
                      notes: ''
                    });
                    setIsModalOpen(false);
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          First Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newLeadForm.firstName}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, firstName: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Last Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newLeadForm.lastName}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, lastName: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={newLeadForm.email}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={newLeadForm.phone}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Address
                        </label>
                        <input
                          type="text"
                          value={newLeadForm.address}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, address: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter address"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Lead Source
                        </label>
                        <select
                          value={newLeadForm.source}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="Website">Website</option>
                          <option value="Google Search">Google Search</option>
                          <option value="Facebook Ads">Facebook Ads</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Referral">Referral</option>
                          <option value="Repeat Customer">Repeat Customer</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Service Type
                        </label>
                        <select
                          value={Array.isArray(newLeadForm.service) && newLeadForm.service.length > 0 ? newLeadForm.service[0] : newLeadForm.service || ''}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value ? [e.target.value] : [] })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="">Select a service</option>
                          <option value="Home/Business Exterior">Home/Business Exterior</option>
                          <option value="Concrete Pressure Washing">Concrete Pressure Washing</option>
                          <option value="Roof Softwash">Roof Softwash</option>
                          <option value="Gutter Brightening">Gutter Brightening</option>
                          <option value="Deck/Fence Cleaning">Deck/Fence Cleaning</option>
                          <option value="Window Cleaning">Window Cleaning</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Estimated Value ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={newLeadForm.estimatedValue}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedValue: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter estimated value"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Notes
                        </label>
                        <textarea
                          value={newLeadForm.notes}
                          onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                          rows={4}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            resize: 'vertical'
                          }}
                          placeholder="Enter any additional notes..."
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setIsModalOpen(false);
                            setNewLeadForm({
                              firstName: '',
                              lastName: '',
                              email: '',
                              phone: '',
                              address: '',
                              source: 'Website',
                              service: [],
                              estimatedValue: '',
                              notes: ''
                            });
                          }}
                          style={{
                            padding: '0.625rem 1.25rem',
                            backgroundColor: 'white',
                            color: 'rgb(55 65 81)',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          style={{
                            padding: '0.625rem 1.25rem',
                            backgroundColor: 'rgb(37 99 235)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          Add Lead
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {modalType === 'addCustomer' && (
                <div style={{ padding: '1.5rem' }}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCustomerForm.firstName || !newCustomerForm.lastName) {
                      alert('Please fill in at least first name and last name');
                      return;
                    }
                    const newCustomer = {
                      id: `cust-hc-${Date.now()}`,
                      firstName: newCustomerForm.firstName,
                      lastName: newCustomerForm.lastName,
                      name: `${newCustomerForm.firstName} ${newCustomerForm.lastName}`,
                      email: newCustomerForm.email || '',
                      phone: newCustomerForm.phone || '',
                      address: newCustomerForm.address || '',
                      source: newCustomerForm.source || 'Website',
                      services: [],
                      totalSpent: 0,
                      serviceCount: 0,
                      rating: null,
                      reviewStatus: 'not_given',
                      estimateData: null
                    };
                    setCustomers([newCustomer, ...customers]);
                    setNewCustomerForm({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      address: '',
                      source: 'Website'
                    });
                    setIsModalOpen(false);
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          First Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newCustomerForm.firstName}
                          onChange={(e) => setNewCustomerForm({ ...newCustomerForm, firstName: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Last Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newCustomerForm.lastName}
                          onChange={(e) => setNewCustomerForm({ ...newCustomerForm, lastName: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={newCustomerForm.email}
                          onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={newCustomerForm.phone}
                          onChange={(e) => setNewCustomerForm({ ...newCustomerForm, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Address
                        </label>
                        <input
                          type="text"
                          value={newCustomerForm.address}
                          onChange={(e) => setNewCustomerForm({ ...newCustomerForm, address: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                          placeholder="Enter address"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'rgb(55 65 81)' }}>
                          Customer Source
                        </label>
                        <select
                          value={newCustomerForm.source}
                          onChange={(e) => setNewCustomerForm({ ...newCustomerForm, source: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="Website">Website</option>
                          <option value="Google Search">Google Search</option>
                          <option value="Facebook Ads">Facebook Ads</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Referral">Referral</option>
                          <option value="Repeat Customer">Repeat Customer</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setIsModalOpen(false);
                            setNewCustomerForm({
                              firstName: '',
                              lastName: '',
                              email: '',
                              phone: '',
                              address: '',
                              source: 'Website'
                            });
                          }}
                          style={{
                            padding: '0.625rem 1.25rem',
                            backgroundColor: 'white',
                            color: 'rgb(55 65 81)',
                            border: '1px solid rgb(209 213 219)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          style={{
                            padding: '0.625rem 1.25rem',
                            backgroundColor: 'rgb(37 99 235)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          Add Customer
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagementSystem;

