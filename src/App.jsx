import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, DollarSign, Users, TrendingUp, Mail, Phone, Edit3, Trash2, Star, Calendar, ChevronLeft, ChevronRight, Edit2, Bot, Send, BarChart3, Building2, MoveDiagonal, FileText, FileSignature, Receipt, HeartHandshake, ArrowRight, ChevronDown, Check, Pause, GripVertical, X, ArrowUp, ArrowDown, Bell, Settings, Upload, Image, Video, Wrench, MapPin, Clock, Award, Shield, ShieldCheck, Percent, ShoppingCart, Gift } from 'lucide-react';

const ServiceManagementSystem = () => {
  const sampleLeads = [
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
        { type: 'Roof Softwash', date: '2024-10-20' },
        { type: 'Gutter Brightening', date: '2024-12-05' }
      ],
      totalSpent: 1890,
      serviceCount: 2,
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

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState(sampleLeads);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerSortBy, setCustomerSortBy] = useState('name');
  const [customerSortOrder, setCustomerSortOrder] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, type: '', id: null });
  const [expandedCampaigns, setExpandedCampaigns] = useState(new Set());
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [selectedLeadForEstimate, setSelectedLeadForEstimate] = useState(null);
  const [estimateData, setEstimateData] = useState({});
  const [expandedChatPanels, setExpandedChatPanels] = useState({});
  const [chatMediumByLead, setChatMediumByLead] = useState({});
  const [expandedLeads, setExpandedLeads] = useState(new Set());
  const [expandedCustomers, setExpandedCustomers] = useState(new Set());
  const [isAgentSettingsOpen, setIsAgentSettingsOpen] = useState(false);
  const [agentName, setAgentName] = useState('');
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
  const [editingStepId, setEditingStepId] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'lead', message: 'New lead from Emily Thompson', time: '2 minutes ago', read: false },
    { id: 2, type: 'customer', message: 'Ivy Sullivan completed service', time: '1 hour ago', read: false },
    { id: 3, type: 'payment', message: 'Payment received from Jared Lopez', time: '3 hours ago', read: true },
    { id: 4, type: 'reminder', message: 'Follow up with Sarah Martinez scheduled', time: '5 hours ago', read: false },
    { id: 5, type: 'lead', message: 'New lead from Michael Chen', time: '1 day ago', read: true }
  ]);
  const [campaignView, setCampaignView] = useState('live'); // 'live' or 'ended'
  const [pricingTimeframe, setPricingTimeframe] = useState('30'); // days
  const [pricingServiceTab, setPricingServiceTab] = useState('exterior'); // 'exterior', 'concrete', 'deck'
  const [jobs, setJobs] = useState([]);
  // const [, setCalendarView] = useState('month'); // 'month', 'week', 'day'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAvailabilityCollapsed, setIsAvailabilityCollapsed] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    return startOfWeek.toISOString().split('T')[0];
  });
  const [weeklyAvailability, setWeeklyAvailability] = useState({});
  const [currentWeekHours, setCurrentWeekHours] = useState(() => {
    const defaultHours = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day, idx) => ({
      day,
      enabled: idx < 6,
      startTime: idx === 6 ? '09:00' : '08:00',
      endTime: idx === 6 ? '14:00' : '18:00'
    }));
    return defaultHours;
  });

  // Pricing format builder state
  const [pricingFormats, setPricingFormats] = useState([{
    id: Date.now(),
    services: [], // Changed from service (string) to services (array)
    price: '',
    unit: '',
    basePrice: '',
    jobDifficultyMultiplier: '',
    storyMultiplier: '',
    isPricingPanelsCollapsed: false,
    pricingStructure: {
      rates: [], // Array of objects: { option: string, value: number }
      expenses: [], // Array of objects: { option: string, value: number, perUnit: string }
      multipliers: [], // Array of objects: { option: string, value: number } (percentage)
      fees: [] // Array of objects: { option: string, value: number } (one-time dollar value)
    }
  }]);

  // Pricing structure options
  const pricingStructureOptions = {
    rates: ['Hourly', 'Per Square Foot', 'Per Linear Foot', 'Per Job', 'Per Item'],
    expenses: ['Chemicals and detergents', 'Water and Filtration', 'Vehicle and Fuel', 'Travel'],
    multipliers: ['Per Building Story', 'Commercial Job', 'Taxes'],
    fees: ['Urgent Job/Day Of Multiplier', 'Waste Disposal Fee', 'Administrative', 'High Risk', 'Unique Surface']
  };

  const unitOptions = [
    'Square Foot',
    'Hour',
    'Linear Foot',
    'Square Yard',
    'Each',
    'Per Project',
    'Per Day',
    'Gallon',
  ];
  const [availablePricingServices, setAvailablePricingServices] = useState([
    'Pressure Wash',
    'Soft wash',
    'Rust removal',
    'Oil stain treatment',
    'Oxidation removal on siding',
    'Solar panel cleaning',
    'Soffit & fascia cleaning',
    'Efflorescence removal',
    'Battery acid stain removal',
    'Trash Bin/Dumpster Cleaning',
    'Gutter cleaning & gutter whitening',
  ]);
  const [newPricingServiceName, setNewPricingServiceName] = useState('');
  const [openPricingDropdown, setOpenPricingDropdown] = useState(null);
  const [openPromotionDropdown, setOpenPromotionDropdown] = useState(null);
  const [openPackageFormulaDropdown, setOpenPackageFormulaDropdown] = useState(null); // { promotionId: { type: 'initial' | 'additional', index?: number } }
  const [openPricingStructureDropdown, setOpenPricingStructureDropdown] = useState({});
  const [openPercentDropdown, setOpenPercentDropdown] = useState(null);
  const [headerColor, setHeaderColor] = useState('blue');
  const [openHeaderSettings, setOpenHeaderSettings] = useState(false);
  const [customHeaderIcon, setCustomHeaderIcon] = useState(null); // Store as base64 or URL
  
  const headerColorClasses = {
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    teal: 'bg-teal-600',
    pink: 'bg-pink-600',
    indigo: 'bg-indigo-600',
    gray: 'bg-gray-600',
    yellow: 'bg-yellow-600',
  };
  
  const headerColorOptions = [
    { name: 'Blue', value: 'blue', color: 'bg-blue-600' },
    { name: 'Red', value: 'red', color: 'bg-red-600' },
    { name: 'Green', value: 'green', color: 'bg-green-600' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-600' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-600' },
    { name: 'Teal', value: 'teal', color: 'bg-teal-600' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-600' },
    { name: 'Indigo', value: 'indigo', color: 'bg-indigo-600' },
    { name: 'Gray', value: 'gray', color: 'bg-gray-600' },
    { name: 'Yellow', value: 'yellow', color: 'bg-yellow-600' },
  ];
  
  const [promotions, setPromotions] = useState([{
    id: Date.now(),
    services: [],
    promotionType: 'percentOff', // 'percentOff' or 'package' or 'buyGet'
    percentOff: '',
    percentOffServices: [], // Services for percent off promotion (array)
    packageType: 'buyOneGetOne', // 'buyOneGetOne' or other package types
    packageFormula: {
      initialServices: [], // Array of services for Buy section
      additionalServices: [] // Array of { service: string, discountType: 'percentOff' | 'free', percentOff: number }
    },
    packagePrice: '', // Package price for selected services
    packageServices: [], // Array of services included in the package deal
    startDate: '',
    endDate: '',
  }]);

  // Load week hours when selected week changes
  useEffect(() => {
    if (weeklyAvailability[selectedWeek]) {
      setCurrentWeekHours(weeklyAvailability[selectedWeek]);
    } else {
      const defaultHours = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day, idx) => ({
        day,
        enabled: idx < 6,
        startTime: idx === 6 ? '09:00' : '08:00',
        endTime: idx === 6 ? '14:00' : '18:00'
      }));
      setCurrentWeekHours(defaultHours);
    }
  }, [selectedWeek, weeklyAvailability]);

  // Close pricing dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openPricingDropdown !== null && !event.target.closest('.pricing-dropdown-container')) {
        setOpenPricingDropdown(null);
      }
      if (openPromotionDropdown !== null && !event.target.closest('.pricing-dropdown-container')) {
        setOpenPromotionDropdown(null);
      }
      if (openPackageFormulaDropdown !== null && !event.target.closest('button') && !event.target.closest('div[class*="absolute"]')) {
        setOpenPackageFormulaDropdown(null);
      }
      if (openPercentDropdown !== null && !event.target.closest('.percent-dropdown-container')) {
        setOpenPercentDropdown(null);
      }
      if (openHeaderSettings && !event.target.closest('button[aria-label="Header settings"]') && !event.target.closest('.absolute')) {
        setOpenHeaderSettings(false);
      }
      // Close pricing structure dropdowns when clicking outside
      if (Object.keys(openPricingStructureDropdown).length > 0) {
        const clickedInside = event.target.closest('.pricing-structure-dropdown-container');
        if (!clickedInside) {
          setOpenPricingStructureDropdown({});
        }
      }
    };
    if (openPricingDropdown !== null || openPromotionDropdown !== null || openPackageFormulaDropdown !== null || openPercentDropdown !== null || openHeaderSettings || Object.keys(openPricingStructureDropdown).length > 0) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openPricingDropdown, openPromotionDropdown, openPackageFormulaDropdown, openPercentDropdown, openHeaderSettings, openPricingStructureDropdown]);

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

const SourceBadge = ({ source }) => {
  const normalized = String(source || '').toLowerCase();

  if (normalized.includes('facebook')) {
    return (
      <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
        <svg viewBox="0 0 24 24" className="w-4 h-4">
          <path
            fill="#1877F2"
            d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H8.03v-2.91h2.41V9.41c0-2.4 1.43-3.72 3.62-3.72 1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.2 0-1.57.75-1.57 1.53v1.84h2.67l-.43 2.91h-2.24v7.03C18.34 21.19 22 17.05 22 12.06z"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes('instagram')) {
    return (
      <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center shadow-sm bg-white">
        <svg viewBox="0 0 24 24" className="w-4 h-4">
          <defs>
            <linearGradient id="igGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="50%" stopColor="#DD2A7B" />
              <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#igGradient)"
            d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.505 4.505 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.503 2.503 0 0 1 12 9.5zm4.75-2.62a1.12 1.12 0 1 0 1.12 1.12 1.12 1.12 0 0 0-1.12-1.12z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm border border-slate-200">
      <svg viewBox="0 0 24 24" className="w-3 h-3">
        <path
          fill="#10B981"
          d="M12 3C6.486 3 2 6.944 2 11.5c0 2.28 1.107 4.351 2.934 5.931-.139.955-.566 2.158-1.542 3.088a1 1 0 0 0 1.12 1.63c2.273-.935 3.74-2.364 4.552-3.41A11.8 11.8 0 0 0 12 20c5.514 0 10-3.944 10-8.5S17.514 3 12 3z"
        />
        <circle cx="8" cy="12" r="1.15" fill="#fff" />
        <circle cx="12" cy="12" r="1.15" fill="#fff" />
        <circle cx="16" cy="12" r="1.15" fill="#fff" />
      </svg>
    </div>
  );
};


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

  const smartChatTimeLabel = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [smartChatMessages, setSmartChatMessages] = useState([
    {
      id: 'assistant-welcome',
      sender: 'assistant',
      text: 'Hi there! I\'m Smart Chat, your AI concierge. Ask me anything about customers, campaigns, or outreach and I\'ll draft a helpful response.',
      timestamp: smartChatTimeLabel(),
    },
  ]);
  const [smartChatInput, setSmartChatInput] = useState('');
  const [smartChatIsTyping, setSmartChatIsTyping] = useState(false);
  const smartChatPrompts = [
    'Craft a friendly follow-up to a driveway cleaning lead.',
    'Summarize this week\'s booked jobs.',
    'Draft a promotional SMS for past customers.',
  ];

  const [businessInfo, setBusinessInfo] = useState({
    businessName: 'Holy City Clean Co.',
    tagline: 'Exterior Cleaning & Pressure Washing Specialists',
    address: '123 Harbor View Rd, Charleston, SC 29412',
    phone: '(843) 609-6932',
    email: 'hello@holycitycleanco.com',
    website: 'https://holycityclean.co',
    serviceArea: 'Charleston, Mt. Pleasant, Daniel Island, Summerville',
    licenseNumber: 'SC-2025-4821',
    insuranceProvider: 'Palmetto Commercial Insurance',
    insuranceNotes: 'General liability $2M aggregate, workers comp active',
    paymentMethods: 'Cards, ACH, Checks, Cash',
    notes: '',
  });

  const defaultBusinessHours = [
    { day: 'Monday', open: '8:00 AM', close: '6:00 PM', closed: false },
    { day: 'Tuesday', open: '8:00 AM', close: '6:00 PM', closed: false },
    { day: 'Wednesday', open: '8:00 AM', close: '6:00 PM', closed: false },
    { day: 'Thursday', open: '8:00 AM', close: '6:00 PM', closed: false },
    { day: 'Friday', open: '8:00 AM', close: '6:00 PM', closed: false },
    { day: 'Saturday', open: '9:00 AM', close: '2:00 PM', closed: false },
    { day: 'Sunday', open: 'Closed', close: 'Closed', closed: true },
  ];
  const [businessHours, setBusinessHours] = useState(defaultBusinessHours);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);

  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    aboutBusiness: '',
    companySlogan: '',
    experienceYears: '',
    experienceMonths: '',
    jobsCompleted: '',
    whatMakesDifferent: [],
    areasServed: [],
    operatingHours: [
      { day: 'Monday', open: '', close: '', closed: false },
      { day: 'Tuesday', open: '', close: '', closed: false },
      { day: 'Wednesday', open: '', close: '', closed: false },
      { day: 'Thursday', open: '', close: '', closed: false },
      { day: 'Friday', open: '', close: '', closed: false },
      { day: 'Saturday', open: '', close: '', closed: false },
      { day: 'Sunday', open: '', close: '', closed: false },
    ],
    certifications: '',
    certificationsList: [],
    insuranceStatus: '',
    insuranceCompany: '',
    insurancePolicyNumber: '',
    insuranceCoverageLimits: '',
    guaranteeWarranty: '',
    phone: '',
    email: '',
    website: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    facebook: '',
    instagram: '',
    nextdoor: '',
    angiesList: '',
    twitter: '',
    onlineReviews: {
      google: { averageRating: '', totalReviews: '', fiveStarReviews: '' },
      facebook: { averageRating: '', totalReviews: '', fiveStarReviews: '' },
      nextdoor: { averageRating: '', totalReviews: '', fiveStarReviews: '' },
      yelp: { averageRating: '', totalReviews: '', fiveStarReviews: '' },
      homeadvisor: { averageRating: '', totalReviews: '', fiveStarReviews: '' }
    }
  });
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [isCitySearchOpen, setIsCitySearchOpen] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [citySearchError, setCitySearchError] = useState(null);

  const [isEditingCompanyInfo, setIsEditingCompanyInfo] = useState(false);
  const [savedCompanyInfo, setSavedCompanyInfo] = useState({});

  const updateCompanyInfo = (field, value) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveCompanyInfo = () => {
    setSavedCompanyInfo({ ...companyInfo });
    setIsEditingCompanyInfo(false);
  };

  const handleEditCompanyInfo = () => {
    setIsEditingCompanyInfo(true);
  };

  // Helper function to get the appropriate action button for a lead
  const getLeadActionButton = (lead) => {
    if (lead.status === 'Rejected') {
      return null; // No actions for rejected leads
    }

    // Determine action based on lead status and data
    if (lead.status === 'Completed') {
      return { label: 'Send Thank You', color: 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100', icon: HeartHandshake };
    } else if (lead.status === 'Contract Signed' || lead.status === 'Scheduled' || lead.status === 'In Progress') {
      return { label: 'Send Invoice', color: 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100', icon: Receipt };
    } else if (lead.estimateData || lead.status === 'Estimate Sent') {
      return { label: 'Send Contract', color: 'bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100', icon: FileSignature };
    } else if (lead.status === 'New' || lead.status === 'Contacted') {
      return { label: 'Send Estimate', color: 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100', icon: FileText };
    } else {
      return { label: 'Follow Up', color: 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100', icon: Mail };
    }
  };

  // Helper function to get action icon for "Send Contact" (for new leads)
  const getContactActionIcon = (lead) => {
    if (lead.status === 'New') {
      return Mail; // Mail icon for Send Contact
    }
    return null;
  };

  // Helper functions to calculate completion for each section
  const getContactDetailsCompletion = () => {
    const requiredFields = [
      companyInfo.companyName,
      companyInfo.phone,
      companyInfo.email,
      companyInfo.website,
      companyInfo.street,
      companyInfo.city,
      companyInfo.state,
      companyInfo.zip
    ];
    const completed = requiredFields.filter(field => field && field.trim() !== '').length;
    return { completed, total: requiredFields.length };
  };

  const getBrandIdentityCompletion = () => {
    const requiredFields = [
      companyInfo.companySlogan,
      companyInfo.experienceYears,
      companyInfo.experienceMonths,
      companyInfo.jobsCompleted,
      companyInfo.whatMakesDifferent.length >= 3 ? 'completed' : ''
    ];
    const completed = requiredFields.filter(field => field && field !== '').length;
    return { completed, total: requiredFields.length };
  };

  const getAreasServedCompletion = () => {
    const completed = companyInfo.areasServed.length > 0 ? 1 : 0;
    return { completed, total: 1 };
  };

  const getOperatingHoursCompletion = () => {
    const total = companyInfo.operatingHours.length;
    const completed = companyInfo.operatingHours.filter(hours => {
      if (hours.closed) return true;
      return hours.open && hours.open.trim() !== '' && hours.close && hours.close.trim() !== '';
    }).length;
    return { completed, total };
  };

  const getCertificationsCompletion = () => {
    if (companyInfo.certificationsList.length === 0) {
      return { completed: 0, total: 1 };
    }
    const total = companyInfo.certificationsList.length;
    const completed = companyInfo.certificationsList.filter(cert => 
      cert.certificationName && cert.certificationName.trim() !== '' &&
      cert.certifyingOrganization && cert.certifyingOrganization.trim() !== ''
    ).length;
    // If there are certifications, all must be complete
    return { completed, total };
  };

  const getInsuranceCompletion = () => {
    if (!companyInfo.insuranceStatus || companyInfo.insuranceStatus === 'Uninsured') {
      const completed = companyInfo.insuranceStatus ? 1 : 0;
      return { completed, total: 1 };
    }
    const requiredFields = [
      companyInfo.insuranceStatus,
      companyInfo.insuranceCompany,
      companyInfo.insurancePolicyNumber,
      companyInfo.insuranceCoverageLimits
    ];
    const completed = requiredFields.filter(field => field && field.trim() !== '').length;
    return { completed, total: requiredFields.length };
  };

  const getGuaranteeWarrantyCompletion = () => {
    const completed = companyInfo.guaranteeWarranty && companyInfo.guaranteeWarranty.trim() !== '' ? 1 : 0;
    return { completed, total: 1 };
  };

  const getOnlineReviewsCompletion = () => {
    const platforms = ['google', 'facebook', 'nextdoor', 'yelp', 'homeadvisor'];
    let total = 0;
    let completed = 0;
    
    platforms.forEach(platform => {
      const review = companyInfo.onlineReviews?.[platform];
      if (review) {
        total += 3; // averageRating, totalReviews, fiveStarReviews
        if (review.averageRating && review.averageRating.trim() !== '') completed++;
        if (review.totalReviews && review.totalReviews.trim() !== '') completed++;
        if (review.fiveStarReviews && review.fiveStarReviews.trim() !== '') completed++;
      } else {
        total += 3;
      }
    });
    
    return { completed, total };
  };

  const softWashingServices = [
    'Residential Washing',
    'Roof washing (asphalt, metal, tile)',
    'Commercial washing',
    'Fence cleaning (wood, vinyl)',
    'Deck cleaning (wood or composite)'
  ];

  const softWashingSurfaces = [
    'Vinyl siding',
    'Aluminum siding',
    'Painted wood siding',
    'Stucco',
    'EIFS (synthetic stucco)',
    'Brick',
    'Stone',
    'Concrete',
    'Fiber cement siding (Hardie board)',
    'Roof shingles (asphalt)',
    'Metal roofing',
    'Tile roofing (clay, concrete)',
    'Exterior windows',
    'Exterior doors (wood, metal, fiberglass)'
  ];

  const specialtyCleaningSurfaces = [
    'Gutters and fascia',
    'Soffits',
    'Composite decking',
    'Wood decking',
    'Fences (wood, vinyl, composite)',
    'Awnings (fabric or vinyl)',
    'Screen enclosures',
    'Solar panels',
    'Outdoor furniture',
    'Pool decks',
    'Pavers (concrete or stone)'
  ];

  const companyQualities = [
    'Safety above everything',
    'Professional service always',
    'Quality you can see',
    'Honest, transparent pricing',
    'We show up',
    'Respect for your home',
    'Clean, careful work',
    'No-damage guarantee',
    'Customer-first mindset',
    'Reliable scheduling',
    'Fast, efficient service',
    'Pride in workmanship',
    'Job done right',
    'Clear communication',
    'Local community focused',
    'Environmentally responsible practices',
    'Licensed and insured',
    'Attention to detail',
    'Results that last',
    'Integrity in every job'
  ];

  const pressureWashingServices = [
    'Residential Pressure Washing',
    'Commercial Cleaning',
    'Patio and porch cleaning',
    'Pool deck (concrete) cleaning',
    'Garage floor cleaning'
  ];

  const specialtyCleaningServices = [
    'Rust removal',
    'Efflorescence removal',
    'Oil stain treatment',
    'Oxidation removal on siding',
    'Trash Bin/Dumpster Cleaning',
    'Solar panel cleaning',
    'Gutter cleaning & gutter whitening',
    'Soffit & fascia cleaning'
  ];

  const windowCleaningServices = [
    'Exterior window cleaning',
    'Interior window cleaning',
    'Screen cleaning',
    'Window track cleaning',
    'Window sill cleaning',
    'Hard water stain removal',
    'Oxidation removal',
    'Skylight cleaning',
    'High-rise window cleaning',
    'Screen enclosure cleaning',
    'Pool cage cleaning'
  ];

  // Comprehensive chemicals list in alphabetical order
  const allChemicals = [
    'Algaecides / mold and mildew inhibitors',
    'Citric Acid',
    'Degreasers',
    'Foaming Agents',
    'Hydrochloric Acid (muriatic acid)',
    'Non-abrasive cleaners for solar panels',
    'Oxidation removers',
    'Oxalic Acid',
    'Paver joint sand',
    'Paver sealers',
    'Phosphoric Acid',
    'Plant Protectants / Neutralizers',
    'Rust removers',
    'Scent Maskers',
    'Sodium bicarbonate',
    'Sodium Hypochlorite (SH / bleach)',
    'Sodium Hydroxide (caustic soda)',
    'Sodium Percarbonate',
    'Surfactants / detergents',
    'Vinegar (acetic acid)'
  ];

  const chemicalsUsed = [
    'Sodium Hypochlorite (SH)',
    'Surfactants',
    'Sodium Hydroxide',
    'Sodium Percarbonate',
    'Oxalic Acid',
    'Citric Acid',
    'Degreasers',
    'Foaming Agents',
    'Scent Maskers',
    'Plant Protectants / Neutralizers'
  ];

  const pressureWashingChemicals = [
    'Sodium Hypochlorite (SH / bleach)',
    'Surfactants / detergents',
    'Sodium Hydroxide (caustic soda)',
    'Hydrochloric Acid (muriatic acid)',
    'Oxalic Acid',
    'Phosphoric Acid',
    'Vinegar (acetic acid)',
    'Degreasers',
    'Rust removers',
    'Algaecides / mold and mildew inhibitors'
  ];

  const specialtyCleaningChemicals = [
    'Oxalic acid',
    'Phosphoric acid',
    'Sodium hydroxide',
    'Sodium bicarbonate',
    'Sodium hypochlorite (bleach)',
    'Surfactants / detergents',
    'Degreasers',
    'Rust removers',
    'Algaecides / mold inhibitors',
    'Vinegar (acetic acid)',
    'Oxidation removers',
    'Paver sealers',
    'Paver joint sand',
    'Non-abrasive cleaners for solar panels'
  ];

  const windowCleaningChemicals = [
    'Dish soap (Dawn, Joy)',
    'Ammonia-based glass cleaners',
    'Vinegar-based glass cleaners',
    'Isopropyl alcohol (IPA)',
    'Commercial glass cleaning concentrates',
    'Pure water (deionized)',
    'Hard water stain removers (acid-based)',
    'Cerium oxide polish',
    'Biodegradable surfactants',
    'Neutral pH detergents'
  ];

  const safetyMeasures = [
    'Pre-wet all plants and landscaping',
    'Protect electrical outlets, meters, and fixtures',
    'Close all windows and doors',
    'Move or cover outdoor items',
    'Use correct SH concentration',
    'Use low pressure only',
    'Protect painted surfaces',
    'Avoid overspray on adjacent surfaces',
    'Protect metals',
    'Monitor downspouts and runoff',
    'Protect windows and doors',
    'Perform a post-cleaning inspection of property'
  ];

  const pressureWashingSafetyMeasures = [
    'Move or cover outdoor items',
    'Move vehicles or protect them with covers',
    'Pre-wet or cover nearby plants and landscaping',
    'Protect garden beds and sensitive landscaping with tarps or plastic',
    'Protect windows and doors',
    'Protect electrical outlets, meters, and fixtures',
    'Mark or block off slippery areas',
    'Direct runoff away from sensitive areas',
    'Avoid overspray on adjacent surfaces',
    'Use proper pressure settings for concrete',
    'Check for cracks or damage before washing',
    'Rinse thoroughly to remove chemicals',
    'Perform a post-cleaning inspection of property'
  ];

  const specialtyCleaningSafetyMeasures = [
    'Remove or cover outdoor furniture and decorations',
    'Move or protect vehicles nearby',
    'Cover or pre-wet all plants, shrubs, and grass',
    'Protect garden beds and sensitive landscaping with tarps or plastic',
    'Cover exterior electrical outlets, meters, and fixtures',
    'Shield garage doors, exterior doors, and painted surfaces',
    'Protect metals (aluminum, copper, stainless steel) from chemical exposure',
    'Pre-treat and neutralize sensitive surfaces if required',
    'Use proper chemical concentrations per surface and stain type',
    'Avoid overspray on neighboring properties or adjacent surfaces',
    'Direct runoff away from plants, water features, and sensitive areas',
    'Rinse all surfaces thoroughly after cleaning',
    'Perform a post-cleaning inspection of all protected areas'
  ];

  const windowCleaningSafetyMeasures = [
    'Use of ladder stabilizers',
    'Soft, non-marking ladder feet',
    'Window frame padding',
    'Drop cloths inside the home',
    'Shoe covers',
    'Pure water systems to eliminate chemicals',
    'Low-pressure cleaning methods',
    'Secured screens during removal',
    'Protection of plants and landscaping',
    'Safe placement of hoses and equipment',
    'Use of safety cones around work areas',
    'Avoiding work in high winds or storms',
    'Properly secured tools (no loose items)',
    'Hard water–safe cleaning pads',
    'Inspection of glass and frames before starting'
  ];

  const softWashingPricingOptions = [
    { 
      label: 'Per Square Foot Pricing', 
      description: `Most common method in the industry.

HOW IT WORKS:
You measure the home/building (or use tax records / satellite measurements) and charge a rate per sqft.

TYPICAL RATES:
• House wash: $0.15–$0.35 per sqft
• Roof wash: $0.25–$0.70 per sqft
• Concrete soft wash: $0.10–$0.25 per sqft
• Commercial: usually lower volume pricing

PROS:
• Scales with building size
• Easy to train employees
• Easy to quote remotely

CONS:
• Harder with complex architecture
• Some customers find it confusing` 
    },
    { 
      label: 'Flat-Rate Pricing', 
      description: `Simple, fast, and great for small jobs.

EXAMPLES:
• House wash up to 2,000 sqft: $249–$349
• Driveway: $99–$199
• Small roof sections: $99+

PROS:
• Easy to sell
• Customers love simple packages

CONS:
• You must calculate your averages carefully
• Risk of underpricing big or complex jobs` 
    },
    { 
      label: 'Tiered / Package Pricing', 
      description: `The best upsell method in the industry.

EXAMPLE PACKAGES:
• Basic: House Wash
• Standard: House Wash + Gutter Brightening
• Premium: House Wash + Driveway + Windows
• Ultimate: Full Soft Wash Package + Roof Wash

PROS:
• Increases average ticket
• Makes customers feel they are "getting a deal"
• Creates predictable revenue

CONS:
• Requires good bundling strategy
• Must track your labor times well` 
    },
    { 
      label: 'Hourly Rate (Internal Calculation Only)', 
      description: `Not shown to customer — but used internally to ensure profitability.

TYPICAL BUSINESS HOURLY GOALS:
• Solo operator: $100–$200/hr
• 2-man crew: $150–$300/hr
• Commercial: Varies based on volume

PROS:
• Helps determine if your flat or sqft rates are profitable

CONS:
• Customers don't like hourly pricing for softwash
• Harder to quote upfront` 
    },
    { 
      label: 'Minimum Job Charge', 
      description: `Most companies use this. Your crew has to leave the shop, so you must cover labor + truck cost.

TYPICAL MINIMUM CHARGES:
• $150–$250 residential
• $250–$400 commercial

PROS:
• Eliminates small unprofitable jobs
• Gives you a predictable floor for revenue

CONS:
• Some budget customers may drop off` 
    },
    { 
      label: 'Linear Foot Pricing (Fences, gutters, curbing)', 
      description: `Used for surfaces where square footage doesn't make sense.

TYPICAL RATES:
• Fences: $1.00–$3.00 per linear foot
• Gutters (exterior brightening): $1–$2 per linear foot
• Curbs: $0.50–$1 per linear foot` 
    },
    { 
      label: 'Property-Type Based Pricing', 
      description: `You charge differently depending on the category.

EXAMPLES:
• Residential: Standard pricing
• Commercial retail: Lower sqft rate but higher minimum
• Apartment complexes / condos: Lower per-unit rate but massive volume
• HOAs: Contract pricing, recurring` 
    },
    { 
      label: 'Condition-Based Pricing', 
      description: `Used when surfaces need extra chemical, dwell time, or agitation.

EXAMPLES:
• Light algae: base rate
• Heavy algae/mildew: +20–50%
• Oxidation: entirely separate pricing
• Red clay stains: specialty
• Efflorescence: specialty
• Rust removal: specialty

IMPORTANT:
You don't discount because it's dirty — you charge more because it requires more chemistry and time.` 
    }
  ];

  const pressureWashingPricingOptions = softWashingPricingOptions;
  const specialtyCleaningPricingOptions = softWashingPricingOptions;

  const [selectedSoftWashing, setSelectedSoftWashing] = useState([]);
  const [selectedSoftWashingSurfaces, setSelectedSoftWashingSurfaces] = useState([]);
  const [selectedPressureWashing, setSelectedPressureWashing] = useState([]);
  const [selectedSpecialtyCleaning, setSelectedSpecialtyCleaning] = useState([]);
  const [selectedSpecialtyCleaningSurfaces, setSelectedSpecialtyCleaningSurfaces] = useState([]);
  // Service-specific chemicals with concentrations: { serviceName: [{ chemical: 'name', concentration: '5%' }] }
  const [serviceChemicals, setServiceChemicals] = useState({});
  // Service-specific PSI values: { serviceName: '1500' }
  const [servicePSI, setServicePSI] = useState({});
  const [selectedSafetyMeasures, setSelectedSafetyMeasures] = useState([]);
  const [selectedPressureWashingSafetyMeasures, setSelectedPressureWashingSafetyMeasures] = useState([]);
  const [selectedSpecialtyCleaningSafetyMeasures, setSelectedSpecialtyCleaningSafetyMeasures] = useState([]);
  const [selectedWindowCleaningSafetyMeasures, setSelectedWindowCleaningSafetyMeasures] = useState([]);
  const [selectedSoftWashingPricing, setSelectedSoftWashingPricing] = useState('');
  const [selectedPressureWashingPricing, setSelectedPressureWashingPricing] = useState('');
  const [selectedSpecialtyCleaningPricing, setSelectedSpecialtyCleaningPricing] = useState('');
  const [serviceDescriptions, setServiceDescriptions] = useState({});
  // Custom items for surfaces and safety measures
  const [customSoftWashingSurfaces, setCustomSoftWashingSurfaces] = useState([]);
  const [customSoftWashingSafetyMeasures, setCustomSoftWashingSafetyMeasures] = useState([]);
  const [customPressureWashingSafetyMeasures, setCustomPressureWashingSafetyMeasures] = useState([]);
  const [customSpecialtyCleaningSafetyMeasures, setCustomSpecialtyCleaningSafetyMeasures] = useState([]);
  const [customWindowCleaningSafetyMeasures, setCustomWindowCleaningSafetyMeasures] = useState([]);
  const [customCompanyQualities, setCustomCompanyQualities] = useState([]);
  // Input states for adding new items
  const [newSoftWashingSurface, setNewSoftWashingSurface] = useState('');
  const [newCompanyQuality, setNewCompanyQuality] = useState('');
  const [newSoftWashingSafetyMeasure, setNewSoftWashingSafetyMeasure] = useState('');
  const [newPressureWashingSafetyMeasure, setNewPressureWashingSafetyMeasure] = useState('');
  const [newSpecialtyCleaningSafetyMeasure, setNewSpecialtyCleaningSafetyMeasure] = useState('');
  const [newWindowCleaningSafetyMeasure, setNewWindowCleaningSafetyMeasure] = useState('');
  // Custom services for each section
  const [customSoftWashingServices, setCustomSoftWashingServices] = useState([]);
  const [customPressureWashingServices, setCustomPressureWashingServices] = useState([]);
  const [customSpecialtyCleaningServices, setCustomSpecialtyCleaningServices] = useState([]);
  const [selectedWindowCleaning, setSelectedWindowCleaning] = useState([]);
  const [customWindowCleaningServices, setCustomWindowCleaningServices] = useState([]);
  const [newWindowCleaningService, setNewWindowCleaningService] = useState('');
  // Input states for adding new services
  const [newSoftWashingService, setNewSoftWashingService] = useState('');
  const [newPressureWashingService, setNewPressureWashingService] = useState('');
  const [newSpecialtyCleaningService, setNewSpecialtyCleaningService] = useState('');
  const [showSoftWashing, setShowSoftWashing] = useState(false);
  const [showPressureWashing, setShowPressureWashing] = useState(false);
  const [showSpecialtyCleaning, setShowSpecialtyCleaning] = useState(false);
  const [showWindowCleaning, setShowWindowCleaning] = useState(false);
  const [showPaverSealing, setShowPaverSealing] = useState(false);
  const [collapsedSoftWashing, setCollapsedSoftWashing] = useState(true);
  const [collapsedPressureWashing, setCollapsedPressureWashing] = useState(true);
  const [collapsedSpecialtyCleaning, setCollapsedSpecialtyCleaning] = useState(true);
  const [collapsedWindowCleaning, setCollapsedWindowCleaning] = useState(true);
  const [collapsedPaverSealing, setCollapsedPaverSealing] = useState(true);
  const [collapsedBrandIdentity, setCollapsedBrandIdentity] = useState(true);
  const [collapsedAreasServed, setCollapsedAreasServed] = useState(true);
  const [collapsedOperatingHours, setCollapsedOperatingHours] = useState(true);
  const [collapsedContactDetails, setCollapsedContactDetails] = useState(true);
  const [collapsedOnlineReviews, setCollapsedOnlineReviews] = useState(true);
  const [collapsedInsurance, setCollapsedInsurance] = useState(true);
  const [collapsedCertifications, setCollapsedCertifications] = useState(true);
  const [collapsedGuaranteeWarranty, setCollapsedGuaranteeWarranty] = useState(true);
  const [leadFollowupEnabled, setLeadFollowupEnabled] = useState(false);
  const [leadFollowupFrequency, setLeadFollowupFrequency] = useState('');
  const [leadFollowupDays, setLeadFollowupDays] = useState('');
  const [leadFollowupDuration, setLeadFollowupDuration] = useState('indefinitely');
  const [leadFollowupDurationValue, setLeadFollowupDurationValue] = useState('');
  const [leadFollowupDurationUnit, setLeadFollowupDurationUnit] = useState('days');
  const [weatherIntegrationEnabled, setWeatherIntegrationEnabled] = useState(false);
  const [smartPricingBasePrice, setSmartPricingBasePrice] = useState(100);
  const [smartPricingCostPerUnit, setSmartPricingCostPerUnit] = useState(30);
  // Pricing Calculator state
  const [overheadChemicals, setOverheadChemicals] = useState(0);
  const [overheadFuel, setOverheadFuel] = useState(0);
  const [overheadTravel, setOverheadTravel] = useState(0);
  const [overheadConsumables, setOverheadConsumables] = useState(0);
  const [overheadSafetyGear, setOverheadSafetyGear] = useState(0);
  const [overheadShopMaterials, setOverheadShopMaterials] = useState(0);
  const [overheadVehicleMaterials, setOverheadVehicleMaterials] = useState(0);
  const [overheadMarketingMaterials, setOverheadMarketingMaterials] = useState(0);
  const [overheadReplacementReserve, setOverheadReplacementReserve] = useState(0);
  const [desiredMargin, setDesiredMargin] = useState(30); // percentage
  const [convertedLeads, setConvertedLeads] = useState(0);
  const [leadsCanHandle, setLeadsCanHandle] = useState(0);
  const [dayBeforeJobEnabled, setDayBeforeJobEnabled] = useState(false);
  const [dayBeforeJobTime, setDayBeforeJobTime] = useState('');
  const [dayBeforeJobInstructions, setDayBeforeJobInstructions] = useState('');
  const [dayOfJobEnabled, setDayOfJobEnabled] = useState(false);
  const [dayOfJobTime, setDayOfJobTime] = useState('');
  const [dayOfJobInstructions, setDayOfJobInstructions] = useState('');

  const toggleService = (service, category) => {
    let isSelected = false;
    let setter = null;

    switch (category) {
      case 'softWashing':
        isSelected = selectedSoftWashing.includes(service);
        setter = setSelectedSoftWashing;
        break;
      case 'pressureWashing':
        isSelected = selectedPressureWashing.includes(service);
        setter = setSelectedPressureWashing;
        break;
      case 'specialtyCleaning':
        isSelected = selectedSpecialtyCleaning.includes(service);
        setter = setSelectedSpecialtyCleaning;
        break;
      case 'windowCleaning':
        isSelected = selectedWindowCleaning.includes(service);
        setter = setSelectedWindowCleaning;
        break;
    }

    if (isSelected) {
      // Remove service
      setter((prev) => prev.filter((s) => s !== service));
      // Remove description
      setServiceDescriptions((prev) => {
        const newDesc = { ...prev };
        delete newDesc[service];
        return newDesc;
      });
      // Remove service chemicals
      setServiceChemicals((prev) => {
        const newChemicals = { ...prev };
        delete newChemicals[service];
        return newChemicals;
      });
    } else {
      // Add service
      setter((prev) => [...prev, service]);
      // Initialize description if it doesn't exist
      setServiceDescriptions((prev) => ({
        ...prev,
        [service]: prev[service] || '',
      }));
      // Initialize service chemicals if it doesn't exist
      setServiceChemicals((prev) => ({
        ...prev,
        [service]: prev[service] || [],
      }));
    }
  };

  const addChemicalToService = (service, chemical) => {
    setServiceChemicals((prev) => {
      const serviceChemList = prev[service] || [];
      if (!serviceChemList.find(c => c.chemical === chemical)) {
        return {
          ...prev,
          [service]: [...serviceChemList, { chemical, concentration: '1%' }]
        };
      }
      return prev;
    });
  };

  const removeChemicalFromService = (service, chemical) => {
    setServiceChemicals((prev) => {
      const serviceChemList = prev[service] || [];
      return {
        ...prev,
        [service]: serviceChemList.filter(c => c.chemical !== chemical)
      };
    });
  };

  const updateChemicalConcentration = (service, chemical, concentration) => {
    setServiceChemicals((prev) => {
      const serviceChemList = prev[service] || [];
      return {
        ...prev,
        [service]: serviceChemList.map(c => 
          c.chemical === chemical ? { ...c, concentration } : c
        )
      };
    });
  };

  const updateServicePSI = (service, psi) => {
    setServicePSI((prev) => ({
      ...prev,
      [service]: psi
    }));
  };

  const toggleSoftWashingSurface = (surface) => {
    if (selectedSoftWashingSurfaces.includes(surface)) {
      setSelectedSoftWashingSurfaces((prev) => prev.filter((s) => s !== surface));
    } else {
      setSelectedSoftWashingSurfaces((prev) => [...prev, surface]);
    }
  };

  const toggleSpecialtyCleaningSurface = (surface) => {
    if (selectedSpecialtyCleaningSurfaces.includes(surface)) {
      setSelectedSpecialtyCleaningSurfaces((prev) => prev.filter((s) => s !== surface));
    } else {
      setSelectedSpecialtyCleaningSurfaces((prev) => [...prev, surface]);
    }
  };

  const toggleCompanyQuality = (quality) => {
    if (companyInfo.whatMakesDifferent.includes(quality)) {
      updateCompanyInfo('whatMakesDifferent', companyInfo.whatMakesDifferent.filter((q) => q !== quality));
    } else {
      if (companyInfo.whatMakesDifferent.length < 3) {
        updateCompanyInfo('whatMakesDifferent', [...companyInfo.whatMakesDifferent, quality]);
      }
    }
  };

  const addCustomCompanyQuality = () => {
    if (newCompanyQuality.trim() && !companyQualities.includes(newCompanyQuality.trim()) && !customCompanyQualities.includes(newCompanyQuality.trim())) {
      setCustomCompanyQualities([...customCompanyQualities, newCompanyQuality.trim()]);
      setNewCompanyQuality('');
    }
  };

  const searchCities = async (searchTerm) => {
    if (searchTerm.length < 2) {
      setCitySearchResults([]);
      setIsCitySearchOpen(false);
      setCitySearchError(null);
      return;
    }

    setIsLoadingCities(true);
    setCitySearchError(null);
    
    try {
      // Using GeoNames API - try with demo username first
      // Note: For production, you should register for a free account at geonames.org
      const geonamesUrl = `https://secure.geonames.org/searchJSON?name_startsWith=${encodeURIComponent(searchTerm)}&country=US&maxRows=10&featureClass=P&orderby=population&username=demo`;
      
      console.log('Fetching cities from:', geonamesUrl);
      
      const response = await fetch(geonamesUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors'
      });
      
      console.log('Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      
      // Check for GeoNames error message
      if (data.status && data.status.message) {
        console.error('GeoNames API error:', data.status.message);
        setCitySearchError(data.status.message);
        setCitySearchResults([]);
        setIsCitySearchOpen(true);
        return;
      }
      
      if (data && data.geonames && Array.isArray(data.geonames) && data.geonames.length > 0) {
        const cities = data.geonames
          .map(city => {
            const state = city.adminName1 || city.adminCode1 || '';
            const name = city.name || '';
            return {
              name: name,
              state: state,
              fullName: state ? `${name}, ${state}` : name
            };
          })
          .filter(city => city.name) // Keep cities with at least a name
          .slice(0, 10);
        
        console.log('Processed cities:', cities);
        
        if (cities.length > 0) {
          setCitySearchResults(cities);
          setIsCitySearchOpen(true);
          setCitySearchError(null);
        } else {
          setCitySearchResults([]);
          setIsCitySearchOpen(true);
        }
      } else {
        console.log('No cities found in response');
        setCitySearchResults([]);
        setIsCitySearchOpen(true);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
      
      // Show error message
      setCitySearchError('Unable to connect to city database. Please check your internet connection or try again later.');
      setCitySearchResults([]);
      setIsCitySearchOpen(true);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const handleCitySearchChange = (e) => {
    const value = e.target.value;
    setCitySearchTerm(value);
    if (value.length >= 2) {
      searchCities(value);
      setIsCitySearchOpen(true);
    } else {
      setCitySearchResults([]);
      setIsCitySearchOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCitySearchOpen && !event.target.closest('.city-search-container')) {
        setIsCitySearchOpen(false);
      }
    };

    if (isCitySearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isCitySearchOpen]);

  const selectCity = (city) => {
    const cityString = city.fullName;
    if (!companyInfo.areasServed.includes(cityString)) {
      updateCompanyInfo('areasServed', [...companyInfo.areasServed, cityString]);
    }
    setCitySearchTerm('');
    setCitySearchResults([]);
    setIsCitySearchOpen(false);
  };

  const removeArea = (area) => {
    updateCompanyInfo('areasServed', companyInfo.areasServed.filter((a) => a !== area));
  };

  const toggleSafetyMeasure = (measure) => {
    if (selectedSafetyMeasures.includes(measure)) {
      setSelectedSafetyMeasures((prev) => prev.filter((m) => m !== measure));
    } else {
      setSelectedSafetyMeasures((prev) => [...prev, measure]);
    }
  };

  const togglePressureWashingSafetyMeasure = (measure) => {
    if (selectedPressureWashingSafetyMeasures.includes(measure)) {
      setSelectedPressureWashingSafetyMeasures((prev) => prev.filter((m) => m !== measure));
    } else {
      setSelectedPressureWashingSafetyMeasures((prev) => [...prev, measure]);
    }
  };

  const toggleSpecialtyCleaningSafetyMeasure = (measure) => {
    if (selectedSpecialtyCleaningSafetyMeasures.includes(measure)) {
      setSelectedSpecialtyCleaningSafetyMeasures((prev) => prev.filter((m) => m !== measure));
    } else {
      setSelectedSpecialtyCleaningSafetyMeasures((prev) => [...prev, measure]);
    }
  };

  const handleSoftWashingPricingChange = (value) => {
    setSelectedSoftWashingPricing(value);
  };

  const handlePressureWashingPricingChange = (value) => {
    setSelectedPressureWashingPricing(value);
  };

  const handleSpecialtyCleaningPricingChange = (value) => {
    setSelectedSpecialtyCleaningPricing(value);
  };

  // Functions to add custom items
  const addCustomSoftWashingSurface = () => {
    if (newSoftWashingSurface.trim() && !softWashingSurfaces.includes(newSoftWashingSurface.trim()) && !customSoftWashingSurfaces.includes(newSoftWashingSurface.trim())) {
      setCustomSoftWashingSurfaces([...customSoftWashingSurfaces, newSoftWashingSurface.trim()]);
      setNewSoftWashingSurface('');
    }
  };

  const addCustomSoftWashingSafetyMeasure = () => {
    if (newSoftWashingSafetyMeasure.trim() && !safetyMeasures.includes(newSoftWashingSafetyMeasure.trim()) && !customSoftWashingSafetyMeasures.includes(newSoftWashingSafetyMeasure.trim())) {
      setCustomSoftWashingSafetyMeasures([...customSoftWashingSafetyMeasures, newSoftWashingSafetyMeasure.trim()]);
      setNewSoftWashingSafetyMeasure('');
    }
  };

  const addCustomPressureWashingSafetyMeasure = () => {
    if (newPressureWashingSafetyMeasure.trim() && !pressureWashingSafetyMeasures.includes(newPressureWashingSafetyMeasure.trim()) && !customPressureWashingSafetyMeasures.includes(newPressureWashingSafetyMeasure.trim())) {
      setCustomPressureWashingSafetyMeasures([...customPressureWashingSafetyMeasures, newPressureWashingSafetyMeasure.trim()]);
      setNewPressureWashingSafetyMeasure('');
    }
  };

  const addCustomSpecialtyCleaningSafetyMeasure = () => {
    if (newSpecialtyCleaningSafetyMeasure.trim() && !specialtyCleaningSafetyMeasures.includes(newSpecialtyCleaningSafetyMeasure.trim()) && !customSpecialtyCleaningSafetyMeasures.includes(newSpecialtyCleaningSafetyMeasure.trim())) {
      setCustomSpecialtyCleaningSafetyMeasures([...customSpecialtyCleaningSafetyMeasures, newSpecialtyCleaningSafetyMeasure.trim()]);
      setNewSpecialtyCleaningSafetyMeasure('');
    }
  };

  const toggleWindowCleaningSafetyMeasure = (measure) => {
    if (selectedWindowCleaningSafetyMeasures.includes(measure)) {
      setSelectedWindowCleaningSafetyMeasures((prev) => prev.filter((m) => m !== measure));
    } else {
      setSelectedWindowCleaningSafetyMeasures((prev) => [...prev, measure]);
    }
  };

  const addCustomWindowCleaningSafetyMeasure = () => {
    if (newWindowCleaningSafetyMeasure.trim() && !windowCleaningSafetyMeasures.includes(newWindowCleaningSafetyMeasure.trim()) && !customWindowCleaningSafetyMeasures.includes(newWindowCleaningSafetyMeasure.trim())) {
      setCustomWindowCleaningSafetyMeasures([...customWindowCleaningSafetyMeasures, newWindowCleaningSafetyMeasure.trim()]);
      setNewWindowCleaningSafetyMeasure('');
    }
  };

  // Functions to add custom services
  const addCustomSoftWashingService = () => {
    if (newSoftWashingService.trim() && !softWashingServices.includes(newSoftWashingService.trim()) && !customSoftWashingServices.includes(newSoftWashingService.trim())) {
      setCustomSoftWashingServices([...customSoftWashingServices, newSoftWashingService.trim()]);
      setNewSoftWashingService('');
      // Initialize chemicals for the new service
      setServiceChemicals((prev) => ({
        ...prev,
        [newSoftWashingService.trim()]: []
      }));
    }
  };

  const addCustomPressureWashingService = () => {
    if (newPressureWashingService.trim() && !pressureWashingServices.includes(newPressureWashingService.trim()) && !customPressureWashingServices.includes(newPressureWashingService.trim())) {
      setCustomPressureWashingServices([...customPressureWashingServices, newPressureWashingService.trim()]);
      setNewPressureWashingService('');
      // Initialize chemicals for the new service
      setServiceChemicals((prev) => ({
        ...prev,
        [newPressureWashingService.trim()]: []
      }));
    }
  };

  const addCustomSpecialtyCleaningService = () => {
    if (newSpecialtyCleaningService.trim() && !specialtyCleaningServices.includes(newSpecialtyCleaningService.trim()) && !customSpecialtyCleaningServices.includes(newSpecialtyCleaningService.trim())) {
      setCustomSpecialtyCleaningServices([...customSpecialtyCleaningServices, newSpecialtyCleaningService.trim()]);
      setNewSpecialtyCleaningService('');
      // Initialize chemicals for the new service
      setServiceChemicals((prev) => ({
        ...prev,
        [newSpecialtyCleaningService.trim()]: []
      }));
    }
  };

  const addCustomWindowCleaningService = () => {
    const serviceName = newWindowCleaningService.trim();
    if (serviceName && !windowCleaningServices.includes(serviceName) && !customWindowCleaningServices.includes(serviceName)) {
      setCustomWindowCleaningServices([...customWindowCleaningServices, serviceName]);
      setNewWindowCleaningService('');
      // Initialize chemicals for the new service
      setServiceChemicals((prev) => ({
        ...prev,
        [serviceName]: []
      }));
    }
  };

  const handleSaveServicesOffered = () => {
    // Save all services offered data
    // This can be extended to save to a backend or local storage
    console.log('Saving services offered:', {
      selectedSoftWashing,
      selectedSoftWashingSurfaces,
      selectedPressureWashing,
      selectedSpecialtyCleaning,
      selectedSpecialtyCleaningSurfaces,
      serviceChemicals,
      selectedSafetyMeasures,
      selectedPressureWashingSafetyMeasures,
      selectedSpecialtyCleaningSafetyMeasures,
      selectedSoftWashingPricing,
      selectedPressureWashingPricing,
      selectedSpecialtyCleaningPricing,
      serviceDescriptions
    });
    // You can add a success message or notification here
  };

  // Get all selected services across all categories
  const getAllSelectedServices = () => {
    return [
      ...selectedSoftWashing,
      ...selectedPressureWashing,
      ...selectedSpecialtyCleaning,
    ];
  };

  const updateServiceDescription = (service, description) => {
    setServiceDescriptions((prev) => ({
      ...prev,
      [service]: description,
    }));
  };

  const updateBusinessInfo = (field, value) => {
    setBusinessInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveBusiness = () => {
    // Save logic would go here (API call, etc.)
    setIsEditingBusiness(false);
  };

  const updateBusinessHours = (index, key, value) => {
    setBusinessHours((prev) =>
      prev.map((entry, idx) =>
        idx === index
          ? {
              ...entry,
              [key]: value,
              ...(key === 'closed' && value
                ? { open: 'Closed', close: 'Closed' }
                : key === 'closed' && !value
                ? { open: '8:00 AM', close: '6:00 PM' }
                : {}),
            }
          : entry,
      ),
    );
  };
  const weatherCodeMap = {
    0: { label: 'Clear sky', icon: '☀️' },
    1: { label: 'Mainly clear', icon: '🌤️' },
    2: { label: 'Partly cloudy', icon: '⛅' },
    3: { label: 'Overcast', icon: '☁️' },
    45: { label: 'Foggy', icon: '🌫️' },
    48: { label: 'Rime fog', icon: '🌫️' },
    51: { label: 'Light drizzle', icon: '🌦️' },
    53: { label: 'Drizzle', icon: '🌦️' },
    55: { label: 'Heavy drizzle', icon: '🌧️' },
    61: { label: 'Light rain', icon: '🌦️' },
    63: { label: 'Rain', icon: '🌧️' },
    65: { label: 'Heavy rain', icon: '🌧️' },
    71: { label: 'Snow', icon: '❄️' },
    80: { label: 'Rain showers', icon: '🌧️' },
    95: { label: 'Thunderstorm', icon: '⛈️' },
  };
  const extractZipFromAddress = (address) => {
    const match = String(address || '').match(/\b\d{5}\b/);
    return match ? match[0] : null;
  };
  const [weather, setWeather] = useState({ temperature: null, description: '', icon: '', location: '' });
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  useEffect(() => {
    const zip = extractZipFromAddress(businessInfo.address);
    if (!zip) {
      setWeather({ temperature: null, description: '', icon: '', location: '' });
      return;
    }

    let cancelled = false;

    const fetchWeather = async () => {
      setIsWeatherLoading(true);
      setWeatherError(null);
      try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${zip}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();
        if (!geoData?.results?.length) throw new Error('Location not found');
        const { latitude, longitude, name, admin1 } = geoData.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`,
        );
        const weatherData = await weatherRes.json();
        const temperature = weatherData?.current?.temperature_2m ?? null;
        const code = weatherData?.current?.weather_code ?? 0;
        const meta = weatherCodeMap[code] || { label: 'Conditions', icon: '🌤️' };

        if (!cancelled) {
          setWeather({
            temperature: temperature != null ? Math.round(temperature) : null,
            description: meta.label,
            icon: meta.icon,
            location: name ? `${name}${admin1 ? `, ${admin1}` : ''}` : '',
          });
        }
      } catch (err) {
        if (!cancelled) {
          setWeatherError('Weather unavailable');
          setWeather((prev) => ({ ...prev, temperature: null, description: '', icon: '' }));
        }
      } finally {
        if (!cancelled) setIsWeatherLoading(false);
      }
    };

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [businessInfo.address]);

  const handleSmartChatSend = (event, overridePrompt) => {
    if (event) event.preventDefault();
    const prompt = (overridePrompt ?? smartChatInput).trim();
    if (!prompt) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: smartChatTimeLabel(),
    };

    setSmartChatMessages((prev) => [...prev, userMessage]);
    setSmartChatInput('');
    setSmartChatIsTyping(true);

    setTimeout(() => {
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `Here’s a polished draft:\n\n${prompt}\n\n• Tone: friendly, confident, and service-focused.\n• Next step: personalize names, pricing, or job details before sending.`,
        timestamp: smartChatTimeLabel(),
      };
      setSmartChatMessages((prev) => [...prev, assistantMessage]);
      setSmartChatIsTyping(false);
    }, 900);
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
      // Extract ZIP code (supports 5 or 9 digits)
      const zipMatch = address.match(/\b\d{5}(?:-\d{4})?\b/);
      const zip = zipMatch ? zipMatch[0] : '';
      
      if (parts.length >= 3) {
        // Format: "Street, City, State ZIP"
        const stateAndZip = parts[2];
        // Extract state (2-letter abbreviation)
        const stateMatch = stateAndZip.match(/\b([A-Z]{2})\b/);
        const state = stateMatch ? stateMatch[1] : stateAndZip.replace(/\b\d{5}(?:-\d{4})?\b/, '').trim();
        // Build line2 with city, state, and zip
        const line2Parts = [city, state, zip].filter(Boolean);
        result.line2 = line2Parts.join(' ');
      } else {
        // Format: "Street, City State ZIP"
        const remaining = parts[1];
        // Extract state (2-letter abbreviation before ZIP)
        const stateMatch = remaining.match(/\b([A-Z]{2})\b(?=\s*\d{5})/);
        const state = stateMatch ? stateMatch[1] : '';
        // Remove ZIP and state from remaining to get city
        const cityOnly = remaining.replace(/\b\d{5}(?:-\d{4})?\b/, '').replace(/\b[A-Z]{2}\b/, '').trim();
        // Build line2 with city, state, and zip
        const line2Parts = [cityOnly || city, state, zip].filter(Boolean);
        result.line2 = line2Parts.join(' ');
      }
    } else {
      result.line1 = address.trim();
    }
    return result;
  };

  const formatServicePrice = (service) => {
    const raw =
      service?.pricePaid ??
      service?.price ??
      service?.amount ??
      service?.total ??
      (typeof service?.cost === 'number' ? service.cost : null);
    if (raw == null || Number.isNaN(Number(raw))) return '—';
    return `$${Number(raw).toFixed(2)}`;
  };

  const handleServiceFileClick = (type, customer, service) => {
    // Placeholder action until real files are wired up
    alert(`${type} link for ${service?.type || 'service'} - customer ${customer?.name || customer?.id}`);
  };

  // Load from backend
  useEffect(() => {
    const load = async () => {
      try {
        console.log('Loading data from:', API_URL);
        const [leadsRes, custRes] = await Promise.all([
          fetch(`${API_URL}/api/leads/`),
          fetch(`${API_URL}/api/customers/`)
        ]);
        
        if (!leadsRes.ok || !custRes.ok) {
          console.error('API response error:', { leads: leadsRes.status, customers: custRes.status });
          return;
        }
        
        const leadsJson = await leadsRes.json();
        const customersJson = await custRes.json();
        
        console.log('Loaded leads:', leadsJson.length);
        console.log('Loaded customers:', customersJson.length);
        
        // Normalize fields expected by UI
        const uiLeads = (leadsJson || []).map(l => {
          const firstName = (l.first_name || l.firstName || '').trim();
          const lastName = (l.last_name || l.lastName || '').trim();
          const fullName = (l.name || `${firstName} ${lastName}`).trim();
          return {
            id: l.id,
            firstName,
            lastName,
            name: fullName,
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
          };
        });
        const uiCustomers = (customersJson || []).map(c => {
          const firstName = (c.first_name || c.firstName || '').trim();
          const lastName = (c.last_name || c.lastName || '').trim();
          const fullName = (c.name || `${firstName} ${lastName}`).trim();
          return {
            id: c.id,
            firstName,
            lastName,
            name: fullName,
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
          };
        });
        let hydratedLeads = uiLeads.length ? uiLeads : sampleLeads;
        if (!hydratedLeads.some(lead => String(lead.source || '').toLowerCase().includes('instagram'))) {
          const instaSamples = sampleLeads.filter(lead =>
            String(lead.source || '').toLowerCase().includes('instagram'),
          );
          hydratedLeads = [...instaSamples, ...hydratedLeads];
        }

        const hydratedCustomers = uiCustomers.length ? uiCustomers : sampleCustomers;

        setLeads(hydratedLeads);
        setCustomers(hydratedCustomers);
      } catch (e) {
        // keep UI usable even if backend not available
        console.error('Failed to load data', e);
      }
    };
    load();
    
    // Refresh data every 30 seconds
    const interval = setInterval(load, 30000);
    
    return () => clearInterval(interval);
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
    const firstName = (leadData.firstName || '').trim();
    const lastName = (leadData.lastName || '').trim();
    const fullName = (leadData.name || `${firstName} ${lastName}`).trim();
    const newLead = {
      id: Date.now(),
      ...leadData,
      firstName,
      lastName,
      name: fullName,
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
      const firstName = (customerData.firstName || '').trim();
      const lastName = (customerData.lastName || '').trim();
      const fullName = (customerData.name || `${firstName} ${lastName}`).trim();
      const payload = {
        firstName,
        lastName,
        name: fullName,
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
        firstName: (saved.first_name || saved.firstName || firstName),
        lastName: (saved.last_name || saved.lastName || lastName),
        name: saved.name || fullName,
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
      firstName: lead.firstName || (lead.name ? lead.name.split(' ')[0] : ''),
      lastName: lead.lastName || (lead.name ? lead.name.split(' ').slice(1).join(' ') : ''),
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
        firstName: saved.first_name || saved.firstName || lead.firstName || (lead.name ? lead.name.split(' ')[0] : ''),
        lastName: saved.last_name || saved.lastName || lead.lastName || (lead.name ? lead.name.split(' ').slice(1).join(' ') : ''),
        name: saved.name || lead.name,
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

  // eslint-disable-next-line no-unused-vars
  const deleteLead = (id) => {
    setDeleteConfirm({ show: true, type: 'lead', id: id });
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

  const navigateWeek = (direction) => {
    const currentWeekStart = new Date(selectedWeek);
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    const newWeekStr = newWeekStart.toISOString().split('T')[0];
    setSelectedWeek(newWeekStr);
    // useEffect will handle loading the hours for the new week
  };

  const handleWeekHoursChange = (dayIndex, field, value) => {
    const updatedHours = [...currentWeekHours];
    if (field === 'enabled') {
      updatedHours[dayIndex].enabled = value;
    } else {
      updatedHours[dayIndex][field] = value;
    }
    setCurrentWeekHours(updatedHours);
  };

  const saveWeekHours = () => {
    setWeeklyAvailability(prev => ({
      ...prev,
      [selectedWeek]: [...currentWeekHours]
    }));
    // You could add a toast notification here
    console.log('Week hours saved for', selectedWeek);
  };

  // eslint-disable-next-line no-unused-vars
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

const toggleChatPanelSize = (leadId) => {
  setExpandedChatPanels(prev => ({
    ...prev,
    [leadId]: !prev[leadId]
  }));
};

const toggleChatPanel = (leadId) => {
  toggleChatPanelSize(leadId);
};

const handleEstimateClick = (lead, event) => {
  if (event) {
    event.stopPropagation();
  }
  openEstimateModal(lead);
};

  const toggleLeadExpansion = (leadId, event) => {
    setExpandedLeads(prev => {
      const newSet = new Set(prev);
      const wasExpanded = newSet.has(leadId);
      if (wasExpanded) {
        newSet.delete(leadId);
      } else {
        newSet.add(leadId);
        // If expanding, scroll the row into view to ensure proper expansion direction
        if (event?.currentTarget) {
          setTimeout(() => {
            const rowElement = event.currentTarget;
            rowElement.scrollIntoView({ behavior: 'auto', block: 'nearest' });
            // Also ensure the next sibling (expanded content) is visible
            const nextRow = rowElement.nextElementSibling;
            if (nextRow && nextRow.tagName === 'TR') {
              nextRow.scrollIntoView({ behavior: 'auto', block: 'nearest' });
            }
          }, 50);
        }
      }
      return newSet;
    });
  };

  const toggleCustomerExpansion = (customerId) => {
    setExpandedCustomers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(customerId)) {
        newSet.delete(customerId);
      } else {
        newSet.add(customerId);
      }
      return newSet;
    });
  };

  const addFlowStep = () => {
    const newId = Math.max(...agentFlowSteps.map(s => s.id), 0) + 1;
    const newOrder = agentFlowSteps.length + 1;
    setAgentFlowSteps([...agentFlowSteps, { 
      id: newId, 
      name: 'New Step', 
      principle: 'Enter principle here',
      description: 'Enter description here',
      order: newOrder 
    }]);
    setEditingStepId(newId);
  };

  const removeFlowStep = (stepId) => {
    const updated = agentFlowSteps.filter(s => s.id !== stepId).map((step, index) => ({
      ...step,
      order: index + 1
    }));
    setAgentFlowSteps(updated);
    if (editingStepId === stepId) {
      setEditingStepId(null);
    }
  };

  const updateFlowStep = (stepId, field, value) => {
    setAgentFlowSteps(agentFlowSteps.map(step => 
      step.id === stepId ? { ...step, [field]: value } : step
    ));
  };

  const moveFlowStep = (stepId, direction) => {
    const currentIndex = agentFlowSteps.findIndex(s => s.id === stepId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= agentFlowSteps.length) return;

    const updated = [...agentFlowSteps];
    [updated[currentIndex], updated[newIndex]] = [updated[newIndex], updated[currentIndex]];
    const reordered = updated.map((step, index) => ({ ...step, order: index + 1 }));
    setAgentFlowSteps(reordered);
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

  const filteredLeads = leads.filter(lead => {
    const term = searchTerm.toLowerCase();
    const nameMatch = (lead.name || '').toLowerCase().includes(term);
    const firstMatch = (lead.firstName || '').toLowerCase().includes(term);
    const lastMatch = (lead.lastName || '').toLowerCase().includes(term);
    const emailMatch = (lead.email || '').toLowerCase().includes(term);
    const addressMatch = (lead.address || '').toLowerCase().includes(term);
    return nameMatch || firstMatch || lastMatch || emailMatch || addressMatch;
  });

  // Categorize leads into sections
  const readyJobs = filteredLeads.filter(lead => lead.name === 'Emily Thompson');
  const inProgress = filteredLeads.filter(lead => 
    lead.name !== 'Emily Thompson' && 
    lead.name !== 'Owen Carpenter' && 
    lead.name !== 'Sasha Morales' &&
    lead.status !== 'Rejected'
  );
  const stopped = filteredLeads.filter(lead => 
    lead.name === 'Owen Carpenter' || lead.name === 'Sasha Morales'
  );
  const rejected = filteredLeads.filter(lead => lead.status === 'Rejected');

  const filteredCustomers = customers.filter(customer => {
    const term = searchTerm.toLowerCase();
    const nameMatch = (customer.name || '').toLowerCase().includes(term);
    const firstMatch = (customer.firstName || '').toLowerCase().includes(term);
    const lastMatch = (customer.lastName || '').toLowerCase().includes(term);
    const emailMatch = (customer.email || '').toLowerCase().includes(term);
    const addressMatch = (customer.address || '').toLowerCase().includes(term);
    return nameMatch || firstMatch || lastMatch || emailMatch || addressMatch;
  }).sort((a, b) => {
    let aValue, bValue;
    
    switch (customerSortBy) {
      case 'name':
        aValue = (a.name || `${a.firstName || ''} ${a.lastName || ''}`).trim().toLowerCase();
        bValue = (b.name || `${b.firstName || ''} ${b.lastName || ''}`).trim().toLowerCase();
        break;
      case 'totalSpent':
        aValue = a.totalSpent || 0;
        bValue = b.totalSpent || 0;
        break;
      case 'serviceCount':
        aValue = a.serviceCount || 0;
        bValue = b.serviceCount || 0;
        break;
      case 'lastService':
        aValue = a.lastService ? new Date(a.lastService).getTime() : 0;
        bValue = b.lastService ? new Date(b.lastService).getTime() : 0;
        break;
      case 'rating':
        aValue = a.rating || 0;
        bValue = b.rating || 0;
        break;
      case 'phone':
        aValue = (a.phone || '').toLowerCase();
        bValue = (b.phone || '').toLowerCase();
        break;
      case 'address':
        aValue = (a.address || '').toLowerCase();
        bValue = (b.address || '').toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (typeof aValue === 'string') {
      if (customerSortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    } else {
      if (customerSortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateCustomerReview = async (customerId, reviewStatus, rating) => {
    const previousCustomers = customers;

    // Optimistically update UI
    setCustomers(prev => prev.map(c => (
      c.id === customerId
        ? {
            ...c,
            reviewStatus: reviewStatus ?? c.reviewStatus ?? 'none',
            rating: Number(rating ?? c.rating ?? 5)
          }
        : c
    )));

    try {
      const normalizedBase = API_URL.replace(/\/$/, '');
      const res = await fetch(`${normalizedBase}/api/customers/${customerId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewStatus,
          review_status: reviewStatus,
          rating
        })
      });

      if (!res.ok) {
        throw new Error(`Failed to update review: ${res.status}`);
      }

      let saved = null;
      const contentType = res.headers.get('content-type') || '';
      const hasBody = res.status !== 204 && contentType.includes('application/json');
      if (hasBody) {
        try {
          saved = await res.json();
        } catch (parseErr) {
          console.warn('Could not parse review update response', parseErr);
        }
      }

      if (saved) {
        setCustomers(prev => prev.map(c => {
          if (c.id !== customerId) return c;
          const newReviewStatus = saved.review_status ?? saved.reviewStatus ?? reviewStatus ?? c.reviewStatus ?? 'none';
          const newRating = Number(saved.rating ?? rating ?? c.rating ?? 5);
          return {
            ...c,
            reviewStatus: newReviewStatus,
            rating: newRating
          };
        }));
      }
    } catch (e) {
      console.error('Failed to update customer review', e);
      // Revert optimistic update on failure to keep UI consistent with backend
      setCustomers(previousCustomers);
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

  const handleOAuthLogin = (provider) => {
    console.log(`OAuth login with ${provider}`);
    setIsAuthenticated(true);
    setLoginError('');
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-3xl text-sm">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-3xl transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <button
                onClick={() => handleOAuthLogin('Google')}
                className="w-full inline-flex items-center justify-center gap-3 border border-gray-200 rounded-3xl py-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 10.2v3.6h5.07c-.22 1.17-.9 2.16-1.9 2.82l3.07 2.38c1.78-1.64 2.8-4.07 2.8-6.96 0-.66-.07-1.31-.2-1.94H12z" />
                  <path fill="#34A853" d="M6.54 14.32l-.86.66-2.45 1.9C4.57 19.76 8.02 22 12 22c2.7 0 4.96-.89 6.61-2.43l-3.07-2.38c-.85.58-1.94.92-3.54.92-2.72 0-5.01-1.84-5.82-4.34z" />
                  <path fill="#4A90E2" d="M3.23 7.12c-.72 1.33-1.14 2.86-1.14 4.5s.42 3.17 1.14 4.5l2.46-1.9c-.2-.59-.31-1.22-.31-1.86s.11-1.27.31-1.86z" />
                  <path fill="#FBBC05" d="M12 4.4c1.47 0 2.78.51 3.82 1.5l2.86-2.86C17 1.27 14.74 0.4 12 0.4 8.02 0.4 4.57 2.64 2.23 6.02l2.46 1.9C6.99 6.24 9.28 4.4 12 4.4z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Login with Google</span>
              </button>
              <button
                onClick={() => handleOAuthLogin('Facebook')}
                className="w-full inline-flex items-center justify-center gap-3 border border-gray-200 rounded-3xl py-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.57 9.87v-6.99h-2.5V12h2.5V9.8c0-2.46 1.47-3.83 3.72-3.83 1.08 0 2.21.2 2.21.2v2.44h-1.25c-1.23 0-1.62.77-1.62 1.56V12h2.76l-.44 2.88h-2.32v6.99A10 10 0 0 0 22 12" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Login with Facebook</span>
              </button>
              <button
                onClick={() => handleOAuthLogin('Apple')}
                className="w-full inline-flex items-center justify-center gap-3 border border-gray-200 rounded-3xl py-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.38 1.5c-.95.11-2.03.64-2.7 1.39-.58.64-1.06 1.69-.87 2.68h.08c.98 0 2-.56 2.63-1.3.6-.67 1.05-1.73.86-2.77zM20.88 17.91c-.39.9-.57 1.29-1.07 2.07-.7 1.15-1.68 2.6-2.9 2.61-1.08.01-1.36-.69-2.83-.69-1.47 0-1.78.68-2.86.7-1.22.02-2.15-1.25-2.85-2.4-1.96-3.22-2.17-6.99-.96-9.08.89-1.51 2.47-2.47 4.18-2.49 1.03-.02 2 .74 2.83.74.81 0 2.08-.91 3.51-.78.6.03 2.29.24 3.37 1.88-.09.06-2.01 1.18-1.99 3.5.02 2.77 2.42 3.68 2.45 3.69z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Login with Apple</span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header and Navigation */}
      <div className={`${headerColorClasses[headerColor]} shadow-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                {customHeaderIcon ? (
                  <img 
                    src={customHeaderIcon} 
                    alt="Business logo" 
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-white" />
                )}
              </div>
            <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-md">Holy City Clean Co.</h1>
                <p className="text-blue-100 text-sm font-medium">Customer Relationship Management</p>
            </div>
              </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-right">
                <p className="text-xs text-blue-100 font-medium">Today's Date</p>
                <p className="font-bold text-white text-sm">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-right">
                <p className="text-xs text-blue-100 font-medium">
                  Weather {weather.location ? `(${weather.location})` : ''}
                </p>
                {isWeatherLoading ? (
                  <p className="text-xs text-blue-200">Loading…</p>
                ) : weather.temperature != null ? (
                  <div className="flex items-center justify-end space-x-2">
                    <span className="text-xl" role="img" aria-label={weather.description}>
                      {weather.icon}
                    </span>
                    <span className="font-bold text-white text-sm">{weather.temperature}°F</span>
                    <span className="text-xs text-blue-100">{weather.description}</span>
                  </div>
                ) : (
                  <p className="text-xs text-blue-200">{weatherError || 'Unavailable'}</p>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenHeaderSettings(!openHeaderSettings)}
                  className="text-white hover:text-blue-100 transition-colors p-0 border-0 bg-transparent"
                  aria-label="Header settings"
                >
                  <Settings className="w-9 h-9" />
                </button>
                {openHeaderSettings && (
                  <div className="absolute z-50 right-0 mt-2 w-80 bg-white border border-gray-300 rounded-xl shadow-lg">
                    <div className="p-4 space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Header Color</h3>
                        <div className="grid grid-cols-5 gap-2">
                          {headerColorOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setHeaderColor(option.value);
                              }}
                              className={`w-10 h-10 rounded-lg ${option.color} border-2 transition-all ${
                                headerColor === option.value ? 'border-gray-800 scale-110 ring-2 ring-gray-400' : 'border-transparent hover:border-gray-300'
                              }`}
                              aria-label={`Select ${option.name} color`}
                              title={option.name}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Business Icon</h3>
                        <div className="space-y-3">
                          {customHeaderIcon && (
                            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <img 
                                src={customHeaderIcon} 
                                alt="Current business icon" 
                                className="w-16 h-16 object-contain"
                              />
                            </div>
                          )}
                          <label className="block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setCustomHeaderIcon(reader.result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                            <span className="cursor-pointer inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              <Upload className="w-4 h-4 mr-2" />
                              {customHeaderIcon ? 'Change Icon' : 'Upload Custom Icon'}
                            </span>
                          </label>
                          {customHeaderIcon && (
                            <button
                              type="button"
                              onClick={() => setCustomHeaderIcon(null)}
                              className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              Remove Custom Icon
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-6 px-2 py-3 border-t border-white/20">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'leads', label: 'Leads' },
              { id: 'customers', label: 'Customer Directory' },
              { id: 'aiAgent', label: 'My Agent' },
              { id: 'calendar', label: 'Calendar' },
              { id: 'business', label: 'My Business' },
              { id: 'pricingTool', label: 'Pricing Tool' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-medium text-sm text-white transition-all duration-200 hover:underline ${
                    isActive ? 'underline' : ''
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[1.575rem]">

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Key Metrics Cards */}
            {(() => {
              // Calculate Monthly Revenue
              const currentMonth = new Date().getMonth();
              const currentYear = new Date().getFullYear();
              const monthlyRevenue = customers.reduce((total, customer) => {
                if (Array.isArray(customer.services)) {
                  const monthServices = customer.services.filter(service => {
                    if (!service.date) return false;
                    const serviceDate = new Date(service.date);
                    return serviceDate.getMonth() === currentMonth && serviceDate.getFullYear() === currentYear;
                  });
                  const monthTotal = monthServices.reduce((sum, service) => {
                    const price = parseFloat(service?.pricePaid ?? service?.price ?? service?.amount ?? 0);
                    return sum + (isNaN(price) ? 0 : price);
                  }, 0);
                  return total + monthTotal;
                }
                return total;
              }, 0);

              // Calculate Active Jobs (scheduled this week)
              const today = new Date();
              const currentDay = today.getDay();
              const startOfWeek = new Date(today);
              startOfWeek.setDate(today.getDate() - currentDay);
              startOfWeek.setHours(0, 0, 0, 0);
              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(startOfWeek.getDate() + 6);
              endOfWeek.setHours(23, 59, 59, 999);
              
              const activeJobs = jobs.filter(job => {
                if (!job.date) return false;
                const jobDate = new Date(job.date);
                return jobDate >= startOfWeek && jobDate <= endOfWeek;
              }).length;

              // Calculate New Leads (added this week)
              const newLeads = leads.filter(lead => {
                if (!lead.dateAdded) return false;
                const leadDate = new Date(lead.dateAdded);
                return leadDate >= startOfWeek && leadDate <= endOfWeek;
              }).length;

              // Calculate Conversion Rate
              const totalLeads = leads.length;
              const totalCustomers = customers.length;
              const conversionRate = totalLeads > 0 ? ((totalCustomers / totalLeads) * 100).toFixed(1) : '0.0';

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Monthly Revenue Card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                        </div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Monthly Revenue</h4>
                    <p className="text-2xl font-bold text-gray-900">${monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>

                  {/* Active Jobs Card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-emerald-100 rounded-xl">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Active Jobs</h4>
                    <p className="text-2xl font-bold text-gray-900">{activeJobs}</p>
                    <p className="text-xs text-gray-500 mt-1">Scheduled this week</p>
              </div>

                  {/* New Leads Card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-purple-100 rounded-xl">
                        <Users className="w-5 h-5 text-purple-600" />
                </div>
                        </div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">New Leads</h4>
                    <p className="text-2xl font-bold text-gray-900">{newLeads}</p>
                    <p className="text-xs text-gray-500 mt-1">Added this week</p>
                        </div>

                  {/* Conversion Rate Card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-amber-100 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-amber-600" />
                      </div>
                  </div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</h4>
                    <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
                    <p className="text-xs text-gray-500 mt-1">Lead to customer</p>
                </div>
              </div>
              );
            })()}

            {/* Notifications Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-3xl">
                      <Bell className="w-5 h-5 text-blue-600" />
          </div>
                    <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {notifications.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map(notification => {
                      const typeIcons = {
                        lead: Users,
                        customer: Star,
                        payment: DollarSign,
                        reminder: Calendar
                      };
                      const Icon = typeIcons[notification.type] || Bell;
                      
                      // Get action button based on notification type (matching retracted lead row style)
                      const getNotificationActionButton = (notification) => {
                        if (notification.type === 'lead') {
                          return { label: 'Send Estimate', color: 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100' };
                        } else if (notification.type === 'customer') {
                          return { label: 'Send Invoice', color: 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100' };
                        } else if (notification.type === 'payment') {
                          return { label: 'View Payment', color: 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' };
                        } else if (notification.type === 'reminder') {
                          return { label: 'View Reminder', color: 'bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100' };
                        } else {
                          return { label: 'Follow Up', color: 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' };
                        }
                      };
                      
                      const action = getNotificationActionButton(notification);
                      
                      return (
                        <div
                          key={notification.id}
                          className="flex items-start gap-4 p-4 rounded-3xl border-2 border-slate-200 bg-slate-50/60 transition-all cursor-pointer hover:shadow-md"
                          onClick={() => {
                            setNotifications(notifications.map(n => 
                              n.id === notification.id ? { ...n, read: true } : n
                            ));
                          }}
                        >
                          {/* Green circle icon on far left */}
                          {!notification.read && (
                            <div className="w-3 h-3 rounded-full bg-green-500 shrink-0 mt-2"></div>
                          )}
                          {notification.read && (
                            <div className="w-3 h-3 shrink-0 mt-2"></div>
                          )}
                          
                          <div className={`p-2 rounded-3xl ${
                            notification.read 
                              ? 'bg-slate-200 text-slate-600' 
                              : notification.type === 'lead' 
                                ? 'bg-blue-200 text-blue-700'
                                : notification.type === 'customer'
                                ? 'bg-emerald-200 text-emerald-700'
                                : notification.type === 'payment'
                                ? 'bg-amber-200 text-amber-700'
                                : notification.type === 'reminder'
                                ? 'bg-purple-200 text-purple-700'
                                : 'bg-slate-200 text-slate-600'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          
                          {/* Action button matching retracted lead row style */}
                          {action && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle action button click
                              }}
                              className={`px-3 py-1.5 text-[0.75rem] font-medium rounded-md transition-colors border whitespace-nowrap ${action.color}`}
                              title={action.label}
                              aria-label={action.label}
                            >
                              {action.label}
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            
            {/* Week of Section */}
            {(() => {
              // Get current week (Sunday to Saturday)
              const today = new Date();
              const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
              const startOfWeek = new Date(today);
              startOfWeek.setDate(today.getDate() - currentDay);
              startOfWeek.setHours(0, 0, 0, 0);
              
              const weekDays = [];
              const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              
              for (let i = 0; i < 7; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                const dateStr = date.toISOString().split('T')[0];
                const dayJobs = getJobsForDate(date);
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                
                weekDays.push({
                  date,
                  dateStr,
                  dayName: weekDayNames[i],
                  dayNumber: date.getDate(),
                  jobs: dayJobs,
                  isToday
                });
              }
              
              const weekStartStr = startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const weekEndStr = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              
              return (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-gray-900">Week of {weekStartStr} - {weekEndStr}</h3>
          </div>
                  <div className="p-6">
                    <div className="grid grid-cols-7 gap-3">
                      {weekDays.map((day, index) => (
                        <div
                          key={index}
                          className={`flex flex-col border-2 rounded-xl p-3 min-h-[140px] transition-all ${
                            day.isToday
                              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-md'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="mb-2">
                            <div className={`text-lg font-bold mb-1 ${
                              day.isToday ? 'text-blue-700' : 'text-gray-900'
                            }`}>
                              {day.dayNumber}
                            </div>
                            <div className={`text-xs font-semibold ${
                              day.isToday ? 'text-blue-700' : 'text-gray-500'
                            }`}>
                              {day.dayName}
                            </div>
                          </div>
                          <div className="flex-1 space-y-1.5 overflow-y-auto">
                            {day.jobs.length === 0 ? (
                              <div className="text-xs text-gray-400 text-center py-2">No jobs</div>
                            ) : (
                              day.jobs.slice(0, 3).map(job => (
                                <div
                                  key={job.id}
                                  className={`text-[10px] px-1.5 py-1 rounded-md truncate font-medium ${
                                    job.status === 'completed' 
                                      ? 'bg-green-100 text-green-800' :
                                    job.status === 'in-progress' 
                                      ? 'bg-blue-100 text-blue-800' :
                                    job.status === 'cancelled' 
                                      ? 'bg-red-100 text-red-800' :
                                      'bg-amber-100 text-amber-800'
                                  }`}
                                  title={`${job.customerName} - ${job.service}${job.time ? ` at ${job.time}` : ''}`}
                                >
                                  {job.time && <span className="font-semibold">{job.time} </span>}
                                  {job.customerName}
                                </div>
                              ))
                            )}
                            {day.jobs.length > 3 && (
                              <div className="text-[10px] text-gray-500 font-semibold text-center pt-1">
                                +{day.jobs.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
            
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openModal('addLead')}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-3xl flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead</span>
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
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Ready Jobs Section */}
            {readyJobs.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Ready Jobs</h3>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-32">Status</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Name</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Phone</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Address</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Job Date/Time</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Job Requested</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Lead Source</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Actions</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-50">
                    {readyJobs.map((lead) => {
                      const isChatExpanded = !!expandedChatPanels[lead.id];
                  const chatHeightClass = isChatExpanded ? 'min-h-[360px]' : 'min-h-[260px]';
                  const actionButtons = [
                    { label: 'Estimate', icon: FileText },
                    { label: 'Contract', icon: FileSignature },
                    { label: 'Invoice', icon: Receipt },
                    { label: 'Thank You', icon: HeartHandshake },
                    { label: 'Convert', icon: ArrowRight }
                  ];
                  const chatMediumOptions = ['SMS', 'Facebook', 'Instagram'];
                  const selectedMedium = chatMediumByLead[lead.id] || 'SMS';
                  const leadFirstName = lead.firstName || lead.name?.split(' ')[0] || 'there';
                  const chatScripts = {
                    SMS: [
                      { from: 'assistant', text: `Hi ${leadFirstName}, thanks for texting Holy City Clean Co. Want me to reserve that estimate slot?` },
                      { from: 'lead', text: 'Yes, can we keep Tuesday open?' },
                      { from: 'assistant', text: 'Done! I’ll send a confirmation SMS with prep instructions.' }
                    ],
                    Facebook: [
                      { from: 'assistant', text: `Hey ${leadFirstName}! Saw your Facebook message about the softwash package.` },
                      { from: 'lead', text: 'Appreciate it. Can you send the quote in Messenger?' },
                      { from: 'assistant', text: 'Absolutely—uploading the PDF to this chat in the next minute.' }
                    ],
                    Instagram: [
                      { from: 'assistant', text: `Hi ${leadFirstName}! Thanks for sliding into our Instagram DMs—your exterior refresh is going to pop.` },
                      { from: 'lead', text: 'Love the before/after you posted. How soon can we schedule?' },
                      { from: 'assistant', text: 'Earliest availability is Thursday AM. I’ll send the IG booking button right here.' }
                    ]
                  };
                  const transcript = chatScripts[selectedMedium] || chatScripts.SMS;

                  const isExpanded = expandedLeads.has(lead.id);
                  // Determine current stage for display
                  const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                  let currentStageIndex = 0;
                  if (lead.status === 'New') {
                    currentStageIndex = 0; // Contact
                  } else if (lead.estimateData) {
                    if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                      currentStageIndex = 4; // Follow-Up
                    } else if (lead.status === 'Contract Signed') {
                      currentStageIndex = 5; // Close Sale
                    } else if (lead.status === 'Completed') {
                      currentStageIndex = 6; // Fullfill Job
                    } else {
                      currentStageIndex = 3; // Send Estimate
                    }
                  } else {
                    currentStageIndex = 2; // Assess Needs
                  }
                  const currentStage = salesStages[currentStageIndex];
                  
                  // Format address for display
                  const addressLines = formatAddressLines(lead.address || '');
                  
                  // Get service display
                  const serviceDisplay = (() => {
                    if (Array.isArray(lead.service) && lead.service.length > 0) {
                      return lead.service.map(s => mapServiceLabel(s)).join(', ');
                    } else if (lead.service && typeof lead.service === 'string') {
                      return mapServiceLabel(lead.service);
                    }
                    return 'No service specified';
                  })();
                  
                  return (
                    <React.Fragment key={lead.id}>
                    <tr 
                      onClick={(e) => toggleLeadExpansion(lead.id, e)}
                      className="bg-white border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-[1.575rem] text-center">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          <span className="text-xs font-semibold text-blue-600 underline">Scheduled</span>
                          {lead.dateAdded && (
                            <span className="text-[10px] font-semibold text-blue-600 underline">
                              {new Date(lead.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} {new Date(lead.dateAdded).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                            </span>
                          )}
                            </div>
                      </td>
                      <td className="px-4 py-[1.575rem]">
                        <span className="text-base font-bold text-gray-900">{lead.name}</span>
                      </td>
                      <td className="px-4 py-[1.575rem]">
                        <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{lead.phone || 'No phone'}</span>
                      </td>
                      <td className="px-4 py-[1.575rem]">
                        <div className="flex flex-col max-w-xs">
                          <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line1 || lead.address || 'No address'}</span>
                          {addressLines.line2 && (
                            <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line2}</span>
                          )}
                          </div>
                        </td>
                      <td className="px-4 py-[1.575rem]">
                        <span className="text-sm font-medium text-slate-600">
                          {lead.dateAdded ? new Date(lead.dateAdded).toLocaleDateString() : 'No date'}
                        </span>
                      </td>
                      <td className="px-4 py-[1.575rem]">
                        <span className="text-sm font-medium text-slate-600">{serviceDisplay}</span>
                      </td>
                      <td className="px-4 py-[1.575rem] text-center">
                        <div className="scale-[1.45546875] inline-flex">
                          <SourceBadge source={lead.source} />
                            </div>
                        </td>
                      <td className="px-4 py-[1.575rem] text-center">
                        {(() => {
                          const action = getLeadActionButton(lead);
                          if (!action) return null;
                          return (
                        <button
                          type="button"
                              onClick={(e) => e.stopPropagation()}
                              className={`px-3 py-1.5 text-[0.75rem] font-medium rounded-md transition-colors border whitespace-nowrap ${action.color}`}
                        >
                              {action.label}
                        </button>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-[1.575rem]">
                        <div className="flex items-center justify-center h-full">
                          <ChevronDown 
                            className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                          />
                        </div>
                      </td>
                    </tr>
                      {isExpanded && (
                      <tr>
                        <td colSpan="9" className="px-4 py-[1.575rem] bg-slate-50 border-b-2 border-slate-300">
                          <div className="grid grid-cols-1 lg:grid-cols-[0.25fr,1.35fr,0.4fr] gap-5 items-stretch">
                      <div className="flex flex-col h-full w-full max-w-[140px]">
                        <div className="flex flex-col items-center gap-0 flex-1 justify-center">
                            {(() => {
                            const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                            // Determine current stage based on lead status and data
                            let currentStageIndex = 0;
                            if (lead.status === 'New') {
                              currentStageIndex = 0; // Contact
                            } else if (lead.estimateData) {
                              // If estimate exists, check further stages
                              if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                                currentStageIndex = 4; // Follow-Up
                              } else if (lead.status === 'Contract Signed') {
                                currentStageIndex = 5; // Close Sale
                              } else if (lead.status === 'Completed') {
                                currentStageIndex = 6; // Fullfill Job
                              } else {
                                currentStageIndex = 3; // Send Estimate
                              }
                            } else {
                              currentStageIndex = 2; // Assess Needs
                            }
                              return salesStages.map((stage, index) => {
                              const isActive = index === currentStageIndex;
                              const isCompleted = index < currentStageIndex;
                                return (
                                <div key={stage} className="flex flex-col items-center w-full">
                                  <div className={`w-full py-2 px-3 rounded-full text-center transition-all duration-200 relative ${
                                    isActive 
                                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 text-blue-800 font-bold shadow-md shadow-blue-200/50' 
                                      : isCompleted
                                      ? 'bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-300 text-slate-700 font-semibold shadow-sm'
                                      : 'bg-white border border-slate-300 text-slate-400 font-medium shadow-sm'
                                  }`}>
                                    <div className={`flex items-center justify-center gap-1.5 ${isActive ? 'text-xs' : 'text-[10px]'} leading-tight`}>
                                      {isCompleted && (
                                        <Check className="w-3 h-3 text-blue-600 font-bold shrink-0" strokeWidth={3} />
                                      )}
                                      <span>{stage}</span>
                            </div>
                                  </div>
                                  {index < salesStages.length - 1 && (
                                    <div className={`w-1 h-4 ${isCompleted ? 'bg-gradient-to-b from-blue-400 to-blue-500' : 'bg-gradient-to-b from-slate-300 to-slate-200'}`}></div>
                                  )}
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                      <div className="flex flex-col h-full">
                        <div className="relative bg-white border-2 border-gray-300 rounded-3xl p-4 flex-1 flex flex-col h-full">
                          <div className="flex items-end justify-between mb-3 pb-2 border-b border-gray-200">
                            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-300 shadow-sm">
                              {chatMediumOptions.map(option => {
                                const isActive = option === selectedMedium;
                                return (
                            <button
                                    key={option}
                                    type="button"
                                    onClick={() => setChatMediumByLead(prev => ({ ...prev, [lead.id]: option }))}
                                    className={`px-4 py-2 text-xs font-semibold border-r border-gray-300 last:border-r-0 transition-colors ${isActive ? 'bg-gray-600 text-white shadow-sm' : 'bg-transparent text-slate-600 hover:bg-gray-50 hover:text-slate-700'}`}
                                  >
                                    {option}
                            </button>
                                );
                              })}
                            </div>
                            <div className="text-[11px] uppercase tracking-wide text-slate-600 font-bold pr-1 pb-1 flex items-center gap-2">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center w-[27px] h-[27px] rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-50 text-slate-600 hover:text-slate-700 transition-colors border border-gray-300 shadow-sm"
                                title="Pause AI Agent"
                                aria-label="Pause AI Agent"
                              >
                                <Pause className="w-[16.2px] h-[16.2px]" fill="currentColor" />
                            </button>
                              <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></span>
                              AI Agent
                            </div>
                          </div>
                          <div className={`flex-1 space-y-3 overflow-y-auto pr-2 h-full ${chatHeightClass}`}>
                            {transcript.map((message, idx) => (
                              <div
                                key={`${selectedMedium}-${lead.id}-${idx}`}
                                className={`flex ${message.from === 'assistant' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div
                                  className={`px-4 py-2.5 text-sm max-w-xs ${
                                    message.from === 'assistant'
                                      ? 'bg-blue-600 text-white rounded-3xl rounded-br-sm shadow-lg'
                                      : 'bg-white/90 backdrop-blur-sm text-slate-800 rounded-3xl rounded-bl-sm shadow-md border border-blue-200/50'
                                  }`}
                                >
                                  {message.text}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-slate-600 font-semibold flex items-center gap-2 mt-3 pt-2 border-t border-gray-200">
                            <span className="inline-flex h-2 w-2 rounded-full bg-slate-500 animate-pulse"></span>
                            <span>Typing...</span>
                          </div>
                            <button
                            type="button"
                            onClick={() => toggleChatPanelSize(lead.id)}
                            className="absolute bottom-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-md hover:shadow-lg"
                            aria-label="Toggle chat panel size"
                          >
                            <MoveDiagonal className="w-4 h-4 rotate-180" />
                            </button>
                          </div>
                            </div>

                      <div className="flex flex-col justify-center items-center h-full">
                        <div className="grid grid-cols-2 gap-3 w-full">
                          {actionButtons.filter(action => action.label !== 'Convert').map(action => {
                            const Icon = action.icon;
                            const colorClasses = {
                              'Estimate': 'text-blue-600',
                              'Contract': 'text-purple-600',
                              'Invoice': 'text-amber-600',
                              'Thank You': 'text-rose-500',
                              'Convert': 'text-emerald-600'
                            };
                            const bgClasses = {
                              'Estimate': 'bg-white hover:bg-slate-50',
                              'Contract': 'bg-white hover:bg-slate-50',
                              'Invoice': 'bg-white hover:bg-slate-50',
                              'Thank You': 'bg-white hover:bg-slate-50',
                              'Convert': 'bg-white hover:bg-slate-50'
                            };
                            // Determine form status: received (checkmark) or sent (SENT text)
                            const formStatus = (() => {
                              // Contract and Estimate always show checkmark
                              if (action.label === 'Estimate' || action.label === 'Contract') return 'received';
                              if (action.label === 'Invoice' && lead.status === 'Completed') return 'received';
                              // For now, show "SENT" for forms that have been sent but not confirmed received
                              // This can be updated with actual form tracking data later
                              return 'sent';
                            })();

                            return (
                              <button
                                key={action.label}
                                className={`relative flex flex-col items-center justify-center aspect-[3/4] rounded-none transition-all duration-200 border border-slate-300 ${bgClasses[action.label] || 'bg-white hover:bg-slate-50'} hover:border-slate-400 p-4`}
                                type="button"
                                title={action.label}
                                aria-label={action.label}
                              >
                                {formStatus === 'received' && (
                                  <div className="absolute top-1 right-1 flex items-center justify-center">
                                    <div className="bg-emerald-500 text-white rounded-full p-1 shadow-md">
                                      <Check className="w-3 h-3" strokeWidth={3} />
                                    </div>
                                  </div>
                                )}
                                {formStatus === 'sent' && (
                                  <div className="absolute top-1 right-1">
                                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                      SENT
                                    </span>
                                  </div>
                                )}
                                <Icon className={`w-6 h-6 mb-2 ${colorClasses[action.label] || 'text-slate-600'}`} />
                                <span className={`text-xs font-medium ${colorClasses[action.label] || 'text-slate-600'}`}>{action.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceFileClick('Convert', lead, null);
                          }}
                          className="mt-4 w-full px-6 py-3 bg-blue-50 border-2 border-blue-300 rounded-full text-blue-700 font-bold text-sm hover:bg-blue-100 transition-colors"
                          type="button"
                          title="Convert"
                          aria-label="Convert"
                        >
                          Convert
                        </button>
                      </div>
                        </div>
                        </td>
                    </tr>
                    )}
                    </React.Fragment>
                  );
                })}

                    {readyJobs.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center text-gray-500 py-12">
                          No ready jobs.
                        </td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                            </div>
              </div>
            )}

            {/* In Progress Section */}
            {inProgress.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">In Progress</h3>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-32">Status</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Name</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Phone</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Address</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Contact Date/Time</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Job Requested</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Lead Source</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Actions</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-50">
                    {inProgress.map((lead) => {
                      const isChatExpanded = !!expandedChatPanels[lead.id];
                      const chatHeightClass = isChatExpanded ? 'min-h-[360px]' : 'min-h-[260px]';
                      const actionButtons = [
                        { label: 'Estimate', icon: FileText },
                        { label: 'Contract', icon: FileSignature },
                        { label: 'Invoice', icon: Receipt },
                        { label: 'Thank You', icon: HeartHandshake },
                        { label: 'Convert', icon: ArrowRight }
                      ];
                      const chatMediumOptions = ['SMS', 'Facebook', 'Instagram'];
                      const selectedMedium = chatMediumByLead[lead.id] || 'SMS';
                      const leadFirstName = lead.firstName || lead.name?.split(' ')[0] || 'there';
                      const chatScripts = {
                        SMS: [
                          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for texting Holy City Clean Co. Want me to reserve that estimate slot?` },
                          { from: 'lead', text: 'Yes, can we keep Tuesday open?' },
                          { from: 'assistant', text: "Done! I'll send a confirmation SMS with prep instructions." }
                        ],
                        Facebook: [
                          { from: 'assistant', text: `Hey ${leadFirstName}! Saw your Facebook message about the softwash package.` },
                          { from: 'lead', text: 'Appreciate it. Can you send the quote in Messenger?' },
                          { from: 'assistant', text: 'Absolutely—uploading the PDF to this chat in the next minute.' }
                        ],
                        Instagram: [
                          { from: 'assistant', text: `Hi ${leadFirstName}! Thanks for sliding into our Instagram DMs—your exterior refresh is going to pop.` },
                          { from: 'lead', text: 'Love the before/after you posted. How soon can we schedule?' },
                          { from: 'assistant', text: "Earliest availability is Thursday AM. I'll send the IG booking button right here." }
                        ]
                      };
                      const transcript = chatScripts[selectedMedium] || chatScripts.SMS;

                      const isExpanded = expandedLeads.has(lead.id);
                      const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                      let currentStageIndex = 0;
                      if (lead.status === 'New') {
                        currentStageIndex = 0;
                      } else if (lead.estimateData) {
                        if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                          currentStageIndex = 3;
                        } else if (lead.status === 'Contract Signed') {
                          currentStageIndex = 4;
                        } else if (lead.status === 'Completed') {
                          currentStageIndex = 5;
                        } else {
                          currentStageIndex = 2;
                        }
                      } else {
                        currentStageIndex = 1;
                      }
                      const currentStage = salesStages[currentStageIndex];
                      
                      const addressLines = formatAddressLines(lead.address || '');
                      
                      const serviceDisplay = (() => {
                        if (Array.isArray(lead.service) && lead.service.length > 0) {
                          return lead.service.map(s => mapServiceLabel(s)).join(', ');
                              } else if (lead.service && typeof lead.service === 'string') {
                          return mapServiceLabel(lead.service);
                        }
                        return 'No service specified';
                      })();
                      
                      return (
                        <React.Fragment key={lead.id}>
                        <tr 
                          onClick={(e) => toggleLeadExpansion(lead.id, e)}
                          className="bg-white border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-[1.575rem] text-center">
                            <div className="flex items-center justify-center">
                              <div className="relative scale-150">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-75 animate-ping"></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-base font-bold text-gray-900">{lead.name}</span>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{lead.phone || 'No phone'}</span>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <div className="flex flex-col max-w-xs">
                              <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line1 || lead.address || 'No address'}</span>
                              {addressLines.line2 && (
                                <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line2}</span>
                            )}
                          </div>
                        </td>
                          <td className="px-4 py-[1.575rem]">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-slate-600">
                                {lead.dateAdded ? new Date(lead.dateAdded).toLocaleDateString() : 'No date'}
                              </span>
                              <span className="text-xs font-medium text-slate-500">
                                {lead.dateAdded ? new Date(lead.dateAdded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </span>
                            </div>
                        </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-sm font-medium text-slate-600">{serviceDisplay}</span>
                        </td>
                          <td className="px-4 py-[1.575rem] text-center">
                            <div className="scale-[1.45546875] inline-flex">
                              <SourceBadge source={lead.source} />
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem] text-center">
                            {(() => {
                              const action = getLeadActionButton(lead);
                              if (!action) return null;
                              return (
                            <button
                              type="button"
                                  onClick={(e) => e.stopPropagation()}
                                  className={`px-3 py-1.5 text-[0.75rem] font-medium rounded-md transition-colors border whitespace-nowrap ${action.color}`}
                            >
                                  {action.label}
                            </button>
                              );
                            })()}
                        </td>
                          <td className="px-4 py-[1.575rem]">
                            <ChevronDown 
                              className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                            />
                          </td>
                        </tr>
                        {isExpanded && (
                        <tr>
                          <td colSpan="9" className="px-4 py-[1.575rem] bg-slate-50 border-b-2 border-slate-300">
                            <div className="grid grid-cols-1 lg:grid-cols-[0.25fr,1.35fr,0.4fr] gap-5 items-stretch">
                            <div className="flex flex-col h-full w-full max-w-[140px]">
                              <div className="flex flex-col items-center gap-0 flex-1 justify-center">
                            {(() => {
                                const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                                let currentStageIndex = 0;
                                if (lead.status === 'New') {
                                  currentStageIndex = 0;
                                } else if (lead.estimateData) {
                                  if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                                    currentStageIndex = 3;
                                  } else if (lead.status === 'Contract Signed') {
                                    currentStageIndex = 4;
                                  } else if (lead.status === 'Completed') {
                                    currentStageIndex = 5;
                                  } else {
                                    currentStageIndex = 2;
                                  }
                                } else {
                                  currentStageIndex = 1;
                                }
                                  return salesStages.map((stage, index) => {
                                  const isActive = index === currentStageIndex;
                                  const isCompleted = index < currentStageIndex;
                                  return (
                                    <div key={stage} className="flex flex-col items-center w-full">
                                      <div className={`w-full py-2 px-3 rounded-full text-center transition-all duration-200 relative ${
                                        isActive 
                                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 text-blue-800 font-bold shadow-md shadow-blue-200/50' 
                                          : isCompleted
                                          ? 'bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-300 text-slate-700 font-semibold shadow-sm'
                                          : 'bg-white border border-slate-300 text-slate-400 font-medium shadow-sm'
                                      }`}>
                                        <div className={`flex items-center justify-center gap-1.5 ${isActive ? 'text-xs' : 'text-[10px]'} leading-tight`}>
                                          {isCompleted && (
                                            <Check className="w-3 h-3 text-blue-600 font-bold shrink-0" strokeWidth={3} />
                                          )}
                                          <span>{stage}</span>
                                </div>
                                      </div>
                                      {index < salesStages.length - 1 && (
                                        <div className={`w-1 h-4 ${isCompleted ? 'bg-gradient-to-b from-blue-400 to-blue-500' : 'bg-gradient-to-b from-slate-300 to-slate-200'}`}></div>
                                      )}
                                    </div>
                                  );
                                });
                              })()}
                              </div>
                            </div>

                            <div className="flex flex-col h-full">
                              <div className="relative bg-white border-2 border-gray-300 rounded-3xl p-4 flex-1 flex flex-col h-full">
                                <div className="flex items-end justify-between mb-3 pb-2 border-b border-gray-200">
                                  <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-300 shadow-sm">
                                    {chatMediumOptions.map(option => {
                                      const isActive = option === selectedMedium;
                                      return (
                            <button
                                          key={option}
                                          type="button"
                                          onClick={() => setChatMediumByLead(prev => ({ ...prev, [lead.id]: option }))}
                                          className={`px-4 py-2 text-xs font-semibold border-r border-gray-300 last:border-r-0 transition-colors ${isActive ? 'bg-gray-600 text-white shadow-sm' : 'bg-transparent text-slate-600 hover:bg-gray-50 hover:text-slate-700'}`}
                                        >
                                          {option}
                            </button>
                                      );
                                    })}
                                  </div>
                                  <div className="text-[11px] uppercase tracking-wide text-slate-600 font-bold pr-1 pb-1 flex items-center gap-2">
                            <button
                                      type="button"
                                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-50 text-slate-600 hover:text-slate-700 transition-colors border border-gray-300 shadow-sm"
                                      title="Pause AI Agent"
                                      aria-label="Pause AI Agent"
                                    >
                                      <Pause className="w-3 h-3" fill="currentColor" />
                            </button>
                                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></span>
                                    AI Agent
                                  </div>
                                </div>
                                <div className={`flex-1 space-y-3 overflow-y-auto pr-2 h-full ${chatHeightClass}`}>
                                  {transcript.map((message, idx) => (
                                    <div
                                      key={`${selectedMedium}-${lead.id}-${idx}`}
                                      className={`flex ${message.from === 'assistant' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <div
                                        className={`px-4 py-2.5 text-sm max-w-xs ${
                                          message.from === 'assistant'
                                            ? 'bg-blue-600 text-white rounded-3xl rounded-br-sm shadow-lg'
                                            : 'bg-white/90 backdrop-blur-sm text-slate-800 rounded-3xl rounded-bl-sm shadow-md border border-blue-200/50'
                                        }`}
                                      >
                                        {message.text}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="text-xs text-slate-600 font-semibold flex items-center gap-2 mt-3 pt-2 border-t border-gray-200">
                                  <span className="inline-flex h-2 w-2 rounded-full bg-slate-500 animate-pulse"></span>
                                  <span>Typing...</span>
                                </div>
                            <button
                                  type="button"
                                  onClick={() => toggleChatPanelSize(lead.id)}
                                  className="absolute bottom-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-md hover:shadow-lg"
                                  aria-label="Toggle chat panel size"
                                >
                                  <MoveDiagonal className="w-4 h-4 rotate-180" />
                            </button>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center h-full">
                              <div className="grid grid-cols-2 gap-3 w-full">
                                {actionButtons.filter(action => action.label !== 'Convert').map(action => {
                                  const Icon = action.icon;
                                  const colorClasses = {
                                    'Estimate': 'text-blue-600',
                                    'Contract': 'text-purple-600',
                                    'Invoice': 'text-amber-600',
                                    'Thank You': 'text-rose-500',
                                    'Convert': 'text-emerald-600'
                                  };
                                  const bgClasses = {
                                    'Estimate': 'bg-white hover:bg-slate-50',
                                    'Contract': 'bg-white hover:bg-slate-50',
                                    'Invoice': 'bg-white hover:bg-slate-50',
                                    'Thank You': 'bg-white hover:bg-slate-50',
                                    'Convert': 'bg-white hover:bg-slate-50'
                                  };
                                  // Determine form status: received (checkmark) or sent (SENT text)
                                  const formStatus = (() => {
                                    // Contract and Estimate always show checkmark
                                    if (action.label === 'Estimate' || action.label === 'Contract') return 'received';
                                    if (action.label === 'Invoice' && lead.status === 'Completed') return 'received';
                                    // For now, show "SENT" for forms that have been sent but not confirmed received
                                    // This can be updated with actual form tracking data later
                                    return 'sent';
                                  })();

                                  return (
                            <button
                                      key={action.label}
                                      className={`relative flex flex-col items-center justify-center aspect-[3/4] rounded-none transition-all duration-200 border border-slate-300 ${bgClasses[action.label] || 'bg-white hover:bg-slate-50'} hover:border-slate-400 p-4`}
                                      type="button"
                                      title={action.label}
                                      aria-label={action.label}
                                    >
                                      {formStatus === 'received' && (
                                        <div className="absolute top-1 right-1 flex items-center justify-center">
                                          <div className="bg-emerald-500 text-white rounded-full p-1 shadow-md">
                                            <Check className="w-3 h-3" strokeWidth={3} />
                                          </div>
                                        </div>
                                      )}
                                      {formStatus === 'sent' && (
                                        <div className="absolute top-1 right-1">
                                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                            SENT
                                          </span>
                                        </div>
                                      )}
                                      <Icon className={`w-6 h-6 mb-2 ${colorClasses[action.label] || 'text-slate-600'}`} />
                                      <span className={`text-xs font-medium ${colorClasses[action.label] || 'text-slate-600'}`}>{action.label}</span>
                            </button>
                                  );
                                })}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleServiceFileClick('Convert', lead, null);
                                }}
                                className="mt-4 w-full px-6 py-3 bg-blue-50 border-2 border-blue-300 rounded-full text-blue-700 font-bold text-sm hover:bg-blue-100 transition-colors"
                                type="button"
                                title="Convert"
                                aria-label="Convert"
                              >
                                Convert
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                          )}
                          </React.Fragment>
                        );
                      })}
                    {inProgress.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center text-gray-500 py-12">
                          No in progress leads.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            )}

            {/* Paused Section */}
            {stopped.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Paused</h3>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-32">Status</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Name</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Phone</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Address</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Contact Date/Time</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Job Requested</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Lead Source</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Actions</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-50">
                    {stopped.map((lead) => {
                      const isChatExpanded = !!expandedChatPanels[lead.id];
                      const chatHeightClass = isChatExpanded ? 'min-h-[360px]' : 'min-h-[260px]';
                      const actionButtons = [
                        { label: 'Estimate', icon: FileText },
                        { label: 'Contract', icon: FileSignature },
                        { label: 'Invoice', icon: Receipt },
                        { label: 'Thank You', icon: HeartHandshake },
                        { label: 'Convert', icon: ArrowRight }
                      ];
                      const chatMediumOptions = ['SMS', 'Facebook', 'Instagram'];
                      const selectedMedium = chatMediumByLead[lead.id] || 'SMS';
                      const leadFirstName = lead.firstName || lead.name?.split(' ')[0] || 'there';
                      const chatScripts = {
                        SMS: [
                          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for texting Holy City Clean Co. Want me to reserve that estimate slot?` },
                          { from: 'lead', text: 'Yes, can we keep Tuesday open?' },
                          { from: 'assistant', text: "Done! I'll send a confirmation SMS with prep instructions." }
                        ],
                        Facebook: [
                          { from: 'assistant', text: `Hey ${leadFirstName}! Saw your Facebook message about the softwash package.` },
                          { from: 'lead', text: 'Appreciate it. Can you send the quote in Messenger?' },
                          { from: 'assistant', text: 'Absolutely—uploading the PDF to this chat in the next minute.' }
                        ],
                        Instagram: [
                          { from: 'assistant', text: `Hi ${leadFirstName}! Thanks for sliding into our Instagram DMs—your exterior refresh is going to pop.` },
                          { from: 'lead', text: 'Love the before/after you posted. How soon can we schedule?' },
                          { from: 'assistant', text: "Earliest availability is Thursday AM. I'll send the IG booking button right here." }
                        ]
                      };
                      const transcript = chatScripts[selectedMedium] || chatScripts.SMS;

                      const isExpanded = expandedLeads.has(lead.id);
                      const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                      let currentStageIndex = 0;
                      if (lead.status === 'New') {
                        currentStageIndex = 0;
                      } else if (lead.estimateData) {
                        if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                          currentStageIndex = 3;
                        } else if (lead.status === 'Contract Signed') {
                          currentStageIndex = 4;
                        } else if (lead.status === 'Completed') {
                          currentStageIndex = 5;
                        } else {
                          currentStageIndex = 2;
                        }
                      } else {
                        currentStageIndex = 1;
                      }
                      const currentStage = salesStages[currentStageIndex];
                      
                      const addressLines = formatAddressLines(lead.address || '');
                      
                      const serviceDisplay = (() => {
                        if (Array.isArray(lead.service) && lead.service.length > 0) {
                          return lead.service.map(s => mapServiceLabel(s)).join(', ');
                              } else if (lead.service && typeof lead.service === 'string') {
                          return mapServiceLabel(lead.service);
                        }
                        return 'No service specified';
                      })();
                      
                      return (
                        <React.Fragment key={lead.id}>
                        <tr 
                          onClick={(e) => toggleLeadExpansion(lead.id, e)}
                          className="bg-white border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-[1.575rem] text-center">
                            <div className="flex items-center justify-center">
                              <div className="relative scale-150">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-base font-bold text-gray-900">{lead.name}</span>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{lead.phone || 'No phone'}</span>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <div className="flex flex-col max-w-xs">
                              <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line1 || lead.address || 'No address'}</span>
                              {addressLines.line2 && (
                                <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line2}</span>
                            )}
                          </div>
                        </td>
                          <td className="px-4 py-[1.575rem]">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-slate-600">
                                {lead.dateAdded ? new Date(lead.dateAdded).toLocaleDateString() : 'No date'}
                              </span>
                              <span className="text-xs font-medium text-slate-500">
                                {lead.dateAdded ? new Date(lead.dateAdded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </span>
                            </div>
                        </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-sm font-medium text-slate-600">{serviceDisplay}</span>
                        </td>
                          <td className="px-4 py-[1.575rem] text-center">
                            <div className="scale-[1.45546875] inline-flex">
                              <SourceBadge source={lead.source} />
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem] text-center">
                            {(() => {
                              const action = getLeadActionButton(lead);
                              if (!action) return null;
                              return (
                            <button
                              type="button"
                                  onClick={(e) => e.stopPropagation()}
                                  className={`px-3 py-1.5 text-[0.75rem] font-medium rounded-md transition-colors border whitespace-nowrap ${action.color}`}
                            >
                                  {action.label}
                            </button>
                              );
                            })()}
                        </td>
                          <td className="px-4 py-[1.575rem]">
                            <ChevronDown 
                              className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                            />
                          </td>
                        </tr>
                        {isExpanded && (
                        <tr>
                          <td colSpan="9" className="px-4 py-[1.575rem] bg-slate-50 border-b-2 border-slate-300">
                            <div className="grid grid-cols-1 lg:grid-cols-[0.25fr,1.35fr,0.4fr] gap-5 items-stretch">
                            <div className="flex flex-col h-full w-full max-w-[140px]">
                              <div className="flex flex-col items-center gap-0 flex-1 justify-center">
                            {(() => {
                                const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                                let currentStageIndex = 0;
                                if (lead.status === 'New') {
                                  currentStageIndex = 0;
                                } else if (lead.estimateData) {
                                  if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                                    currentStageIndex = 3;
                                  } else if (lead.status === 'Contract Signed') {
                                    currentStageIndex = 4;
                                  } else if (lead.status === 'Completed') {
                                    currentStageIndex = 5;
                                  } else {
                                    currentStageIndex = 2;
                                  }
                                } else {
                                  currentStageIndex = 1;
                                }
                                  return salesStages.map((stage, index) => {
                                  const isActive = index === currentStageIndex;
                                  const isCompleted = index < currentStageIndex;
                                  return (
                                    <div key={stage} className="flex flex-col items-center w-full">
                                      <div className={`w-full py-2 px-3 rounded-full text-center transition-all duration-200 relative ${
                                        isActive 
                                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 text-blue-800 font-bold shadow-md shadow-blue-200/50' 
                                          : isCompleted
                                          ? 'bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-300 text-slate-700 font-semibold shadow-sm'
                                          : 'bg-white border border-slate-300 text-slate-400 font-medium shadow-sm'
                                      }`}>
                                        <div className={`flex items-center justify-center gap-1.5 ${isActive ? 'text-xs' : 'text-[10px]'} leading-tight`}>
                                          {isCompleted && (
                                            <Check className="w-3 h-3 text-blue-600 font-bold shrink-0" strokeWidth={3} />
                                          )}
                                          <span>{stage}</span>
                                </div>
                                      </div>
                                      {index < salesStages.length - 1 && (
                                        <div className={`w-1 h-4 ${isCompleted ? 'bg-gradient-to-b from-blue-400 to-blue-500' : 'bg-gradient-to-b from-slate-300 to-slate-200'}`}></div>
                                      )}
                                    </div>
                                  );
                                });
                              })()}
                              </div>
                            </div>

                            <div className="flex flex-col h-full">
                              <div className="relative bg-white border-2 border-gray-300 rounded-3xl p-4 flex-1 flex flex-col h-full">
                                <div className="flex items-end justify-between mb-3 pb-2 border-b border-gray-200">
                                  <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-300 shadow-sm">
                                    {chatMediumOptions.map(option => {
                                      const isActive = option === selectedMedium;
                                      return (
                            <button
                                          key={option}
                                          type="button"
                                          onClick={() => setChatMediumByLead(prev => ({ ...prev, [lead.id]: option }))}
                                          className={`px-4 py-2 text-xs font-semibold border-r border-gray-300 last:border-r-0 transition-colors ${isActive ? 'bg-gray-600 text-white shadow-sm' : 'bg-transparent text-slate-600 hover:bg-gray-50 hover:text-slate-700'}`}
                                        >
                                          {option}
                            </button>
                                      );
                                    })}
                                  </div>
                                  <div className="text-[11px] uppercase tracking-wide text-slate-600 font-bold pr-1 pb-1 flex items-center gap-2">
                            <button
                                      type="button"
                                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-50 text-slate-600 hover:text-slate-700 transition-colors border border-gray-300 shadow-sm"
                                      title="Pause AI Agent"
                                      aria-label="Pause AI Agent"
                                    >
                                      <Pause className="w-3 h-3" fill="currentColor" />
                            </button>
                                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></span>
                                    AI Agent
                                  </div>
                                </div>
                                <div className={`flex-1 space-y-3 overflow-y-auto pr-2 h-full ${chatHeightClass}`}>
                                  {transcript.map((message, idx) => (
                                    <div
                                      key={`${selectedMedium}-${lead.id}-${idx}`}
                                      className={`flex ${message.from === 'assistant' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <div
                                        className={`px-4 py-2.5 text-sm max-w-xs ${
                                          message.from === 'assistant'
                                            ? 'bg-blue-600 text-white rounded-3xl rounded-br-sm shadow-lg'
                                            : 'bg-white/90 backdrop-blur-sm text-slate-800 rounded-3xl rounded-bl-sm shadow-md border border-blue-200/50'
                                        }`}
                                      >
                                        {message.text}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="text-xs text-slate-600 font-semibold flex items-center gap-2 mt-3 pt-2 border-t border-gray-200">
                                  <span className="inline-flex h-2 w-2 rounded-full bg-slate-500 animate-pulse"></span>
                                  <span>Typing...</span>
                                </div>
                            <button
                                  type="button"
                                  onClick={() => toggleChatPanelSize(lead.id)}
                                  className="absolute bottom-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-md hover:shadow-lg"
                                  aria-label="Toggle chat panel size"
                                >
                                  <MoveDiagonal className="w-4 h-4 rotate-180" />
                            </button>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center h-full">
                              <div className="grid grid-cols-2 gap-3 w-full">
                                {actionButtons.filter(action => action.label !== 'Convert').map(action => {
                                  const Icon = action.icon;
                                  const colorClasses = {
                                    'Estimate': 'text-blue-600',
                                    'Contract': 'text-purple-600',
                                    'Invoice': 'text-amber-600',
                                    'Thank You': 'text-rose-500',
                                    'Convert': 'text-emerald-600'
                                  };
                                  const bgClasses = {
                                    'Estimate': 'bg-white hover:bg-slate-50',
                                    'Contract': 'bg-white hover:bg-slate-50',
                                    'Invoice': 'bg-white hover:bg-slate-50',
                                    'Thank You': 'bg-white hover:bg-slate-50',
                                    'Convert': 'bg-white hover:bg-slate-50'
                                  };
                                  // Determine form status: received (checkmark) or sent (SENT text)
                                  const formStatus = (() => {
                                    // Contract and Estimate always show checkmark
                                    if (action.label === 'Estimate' || action.label === 'Contract') return 'received';
                                    if (action.label === 'Invoice' && lead.status === 'Completed') return 'received';
                                    // For now, show "SENT" for forms that have been sent but not confirmed received
                                    // This can be updated with actual form tracking data later
                                    return 'sent';
                                  })();

                                  return (
                            <button
                                      key={action.label}
                                      className={`relative flex flex-col items-center justify-center aspect-[3/4] rounded-none transition-all duration-200 border border-slate-300 ${bgClasses[action.label] || 'bg-white hover:bg-slate-50'} hover:border-slate-400 p-4`}
                                      type="button"
                                      title={action.label}
                                      aria-label={action.label}
                                    >
                                      {formStatus === 'received' && (
                                        <div className="absolute top-1 right-1 flex items-center justify-center">
                                          <div className="bg-emerald-500 text-white rounded-full p-1 shadow-md">
                                            <Check className="w-3 h-3" strokeWidth={3} />
                                          </div>
                                        </div>
                                      )}
                                      {formStatus === 'sent' && (
                                        <div className="absolute top-1 right-1">
                                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                            SENT
                                          </span>
                                        </div>
                                      )}
                                      <Icon className={`w-6 h-6 mb-2 ${colorClasses[action.label] || 'text-slate-600'}`} />
                                      <span className={`text-xs font-medium ${colorClasses[action.label] || 'text-slate-600'}`}>{action.label}</span>
                            </button>
                                  );
                                })}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleServiceFileClick('Convert', lead, null);
                                }}
                                className="mt-4 w-full px-6 py-3 bg-blue-50 border-2 border-blue-300 rounded-full text-blue-700 font-bold text-sm hover:bg-blue-100 transition-colors"
                                type="button"
                                title="Convert"
                                aria-label="Convert"
                              >
                                Convert
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                          )}
                          </React.Fragment>
                        );
                      })}
                    {stopped.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center text-gray-500 py-12">
                          No paused leads.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            )}

            {/* Rejected Section */}
            {rejected.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Rejected</h3>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-32">Status</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Name</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Phone</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Address</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Contact Date/Time</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Job Requested</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Lead Source</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Actions</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-50">
                    {rejected.map((lead) => {
                      const isChatExpanded = !!expandedChatPanels[lead.id];
                      const chatHeightClass = isChatExpanded ? 'min-h-[360px]' : 'min-h-[260px]';
                      const actionButtons = []; // Rejected leads have no actions
                      const chatMediumOptions = ['SMS', 'Facebook', 'Instagram'];
                      const selectedMedium = chatMediumByLead[lead.id] || 'SMS';
                      const leadFirstName = lead.firstName || lead.name?.split(' ')[0] || 'there';
                      const chatScripts = {
                        SMS: [
                          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for reaching out to Holy City Clean Co. If your plans change, we're happy to revisit your estimate anytime.` },
                          { from: 'lead', text: "Thanks, I'll keep that in mind." },
                          { from: 'assistant', text: 'No problem at all—have a great day!' }
                        ],
                        Facebook: [
                          { from: 'assistant', text: `Hey ${leadFirstName}, totally understand you're passing for now.` },
                          { from: 'lead', text: 'Appreciate the quick quote though.' },
                          { from: 'assistant', text: 'Anytime—if you revisit the project later, just message us here.' }
                        ],
                        Instagram: [
                          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for letting us know you're not moving forward right now.` },
                          { from: 'lead', text: 'You all were great—just not the right timing.' },
                          { from: 'assistant', text: 'We get it! Our DMs are always open if timing changes.' }
                        ]
                      };
                      const transcript = chatScripts[selectedMedium] || chatScripts.SMS;

                      const isExpanded = expandedLeads.has(lead.id);
                      const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                      let currentStageIndex = 0;
                      if (lead.status === 'New') {
                        currentStageIndex = 0;
                      } else if (lead.estimateData) {
                        if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                          currentStageIndex = 3;
                        } else if (lead.status === 'Contract Signed') {
                          currentStageIndex = 4;
                        } else if (lead.status === 'Completed') {
                          currentStageIndex = 5;
                        } else {
                          currentStageIndex = 2;
                        }
                      } else {
                        currentStageIndex = 1;
                      }
                      const currentStage = salesStages[currentStageIndex];
                      
                      const addressLines = formatAddressLines(lead.address || '');
                      
                      const serviceDisplay = (() => {
                        if (Array.isArray(lead.service) && lead.service.length > 0) {
                          return lead.service.map(s => mapServiceLabel(s)).join(', ');
                        } else if (lead.service && typeof lead.service === 'string') {
                          return mapServiceLabel(lead.service);
                        }
                        return 'No service specified';
                      })();
                      
                      return (
                        <React.Fragment key={lead.id}>
                        <tr 
                          onClick={(e) => toggleLeadExpansion(lead.id, e)}
                          className="bg-white border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-[1.575rem] text-center">
                            <div className="flex items-center justify-center">
                              <X className="w-4 h-4 text-red-500" strokeWidth={3} />
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-base font-bold text-gray-900">{lead.name}</span>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{lead.phone || 'No phone'}</span>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <div className="flex flex-col max-w-xs">
                              <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line1 || lead.address || 'No address'}</span>
                              {addressLines.line2 && (
                                <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line2}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-slate-600">
                                {lead.dateAdded ? new Date(lead.dateAdded).toLocaleDateString() : 'No date'}
                              </span>
                              <span className="text-xs font-medium text-slate-500">
                                {lead.dateAdded ? new Date(lead.dateAdded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-sm font-medium text-slate-600">{serviceDisplay}</span>
                          </td>
                          <td className="px-4 py-[1.575rem] text-center">
                            <div className="scale-[1.45546875] inline-flex">
                              <SourceBadge source={lead.source} />
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem] text-center">
                            {(() => {
                              const action = getLeadActionButton(lead);
                              if (!action) return null;
                              return (
                            <button
                              type="button"
                                  onClick={(e) => e.stopPropagation()}
                                  className={`px-3 py-1.5 text-[0.75rem] font-medium rounded-md transition-colors border whitespace-nowrap ${action.color}`}
                            >
                                  {action.label}
                            </button>
                              );
                            })()}
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <ChevronDown 
                              className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                            />
                          </td>
                        </tr>
                        {isExpanded && (
                        <tr>
                          <td colSpan="9" className="px-4 py-[1.575rem] bg-slate-50 border-b-2 border-slate-300">
                            <div className="grid grid-cols-1 lg:grid-cols-[0.25fr,1.35fr,0.4fr] gap-5 items-stretch">
                            <div className="flex flex-col h-full w-full max-w-[140px]">
                              <div className="flex flex-col items-center gap-0 flex-1 justify-center">
                            {(() => {
                                const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                                let currentStageIndex = 0;
                                if (lead.status === 'New') {
                                  currentStageIndex = 0;
                                } else if (lead.estimateData) {
                                  if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                                    currentStageIndex = 3;
                                  } else if (lead.status === 'Contract Signed') {
                                    currentStageIndex = 4;
                                  } else if (lead.status === 'Completed') {
                                    currentStageIndex = 5;
                                  } else {
                                    currentStageIndex = 2;
                                  }
                                } else {
                                  currentStageIndex = 1;
                                }
                                  return salesStages.map((stage, index) => {
                                  const isActive = index === currentStageIndex;
                                  const isCompleted = index < currentStageIndex;
                                  return (
                                    <div key={stage} className="flex flex-col items-center w-full">
                                      <div className={`w-full py-2 px-3 rounded-full text-center transition-all duration-200 relative ${
                                        isActive 
                                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 text-blue-800 font-bold shadow-md shadow-blue-200/50' 
                                          : isCompleted
                                          ? 'bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-300 text-slate-700 font-semibold shadow-sm'
                                          : 'bg-white border border-slate-300 text-slate-400 font-medium shadow-sm'
                                      }`}>
                                        <div className={`flex items-center justify-center gap-1.5 ${isActive ? 'text-xs' : 'text-[10px]'} leading-tight`}>
                                          {isCompleted && (
                                            <Check className="w-3 h-3 text-blue-600 font-bold shrink-0" strokeWidth={3} />
                                          )}
                                          <span>{stage}</span>
                                </div>
                                      </div>
                                      {index < salesStages.length - 1 && (
                                        <div className={`w-1 h-4 ${isCompleted ? 'bg-gradient-to-b from-blue-400 to-blue-500' : 'bg-gradient-to-b from-slate-300 to-slate-200'}`}></div>
                                      )}
                                    </div>
                                  );
                                });
                              })()}
                              </div>
                            </div>

                            <div className="flex flex-col h-full">
                              <div className="relative bg-white border-2 border-gray-300 rounded-3xl p-4 flex-1 flex flex-col h-full">
                                <div className="flex items-end justify-between mb-3 pb-2 border-b border-gray-200">
                                  <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-300 shadow-sm">
                                    {chatMediumOptions.map(option => {
                                      const isActive = option === selectedMedium;
                                      return (
                            <button
                                          key={option}
                                          type="button"
                                          onClick={() => setChatMediumByLead(prev => ({ ...prev, [lead.id]: option }))}
                                          className={`px-4 py-2 text-xs font-semibold border-r border-gray-300 last:border-r-0 transition-colors ${isActive ? 'bg-gray-600 text-white shadow-sm' : 'bg-transparent text-slate-600 hover:bg-gray-50 hover:text-slate-700'}`}
                                        >
                                          {option}
                            </button>
                                      );
                                    })}
                                  </div>
                                  <div className="text-[11px] uppercase tracking-wide text-blue-700 font-bold pr-1 pb-1 flex items-center gap-2">
                            <button
                                      type="button"
                                      onClick={(e) => handleEstimateClick(lead, e)}
                                      className="inline-flex items-center px-2.5 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-semibold shadow-sm hover:bg-blue-700"
                                    >
                                      <FileText className="w-3 h-3 mr-1" />
                                      Open Estimate
                            </button>
                                  </div>
                                </div>

                                <div className={`relative flex-1 flex flex-col rounded-2xl bg-blue-100/60 border border-blue-200/70 overflow-hidden ${chatHeightClass}`}>
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.7),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(191,219,254,0.7),_transparent_60%)] opacity-60 pointer-events-none" />
                                  <div className="relative flex-1 overflow-y-auto p-3 space-y-2">
                                    {transcript.map((msg, idx) => (
                                      <div
                                        key={idx}
                                        className={`flex ${msg.from === 'lead' ? 'justify-end' : 'justify-start'}`}
                                      >
                                        <div
                                          className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs shadow-sm ${
                                            msg.from === 'lead'
                                              ? 'bg-blue-600 text-white rounded-br-sm'
                                              : 'bg-white/90 backdrop-blur border border-blue-100 text-slate-800 rounded-bl-sm'
                                          }`}
                                        >
                                          {msg.text}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => toggleChatPanel(lead.id)}
                                    className="relative w-full text-center text-[11px] text-blue-700 font-semibold py-1.5 border-t border-blue-200 bg-blue-50/80 hover:bg-blue-100/80 flex items-center justify-center gap-1"
                                  >
                                    <span>{isChatExpanded ? 'Hide full thread' : 'Show full thread'}</span>
                                    <ChevronDown className={`w-3 h-3 transition-transform ${isChatExpanded ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col h-full">
                              <div className="bg-white rounded-3xl border border-slate-200 p-4 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Lead Status</div>
                                    <div className="text-sm font-bold text-slate-900 mt-1">{currentStage}</div>
                                  </div>
                                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-semibold border border-red-200">
                                    <X className="w-3 h-3 mr-1" strokeWidth={3} />
                                    Rejected
                                  </div>
                                </div>
                                <div className="space-y-3 text-xs text-slate-600 flex-1">
                                  <p>
                                    This lead has been marked as <span className="font-semibold text-red-600">Rejected</span>. 
                                    You can still reference the conversation and estimate history if they return in the future.
                                  </p>
                                  <ul className="list-disc list-inside space-y-1">
                                    <li>Keep notes on why the lead was rejected.</li>
                                    <li>Use this for future targeting and campaign exclusions.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            </div>
                          </td>
                        </tr>
                        )}
                        </React.Fragment>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openModal('addCustomer')}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-3xl flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Customer</span>
                </button>
              </div>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                <select
                  value={customerSortBy}
                  onChange={(e) => setCustomerSortBy(e.target.value)}
                    className="px-5 py-2.5 pr-10 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-xs font-medium text-gray-700 appearance-none"
                >
                  <option value="name">Name</option>
                  <option value="totalSpent">Total Spent</option>
                  <option value="serviceCount">Service Count</option>
                  <option value="lastService">Last Service</option>
                </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
                <button
                  onClick={() => setCustomerSortOrder(customerSortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-5 py-2.5 border border-gray-300 rounded-3xl hover:bg-gray-50 transition-colors bg-white text-sm font-medium text-gray-700 flex items-center justify-center gap-2.5"
                  title={customerSortOrder === 'asc' ? 'Ascending' : 'Descending'}
                >
                  {customerSortOrder === 'asc' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{customerSortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
                </button>
              </div>
            </div>

            {/* Customers List */}
            <div className="p-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Name</th>
                    <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Phone</th>
                    <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Address</th>
                    <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Last Service</th>
                    <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Number of Services</th>
                    <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Total Spent</th>
                    <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Lead Source</th>
                    <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-12"></th>
                    </tr>
                  </thead>
                <tbody className="bg-slate-50">
                    {filteredCustomers.map(customer => {
                  const isExpanded = expandedCustomers.has(customer.id);
                  const customerName = (() => {
                                const composed = `${customer.firstName || ''} ${customer.lastName || ''}`.trim();
                                return composed || customer.name || 'Customer';
                  })();
                  
                  // Get most recent service
                  const getMostRecentService = () => {
                    if (!Array.isArray(customer.services) || customer.services.length === 0) {
                      return null;
                    }
                    const servicesWithDates = customer.services
                      .map(s => ({
                        service: s,
                        date: s?.date ? new Date(s.date) : null
                      }))
                      .filter(item => item.date !== null)
                      .sort((a, b) => b.date - a.date);
                    return servicesWithDates.length > 0 ? servicesWithDates[0].service : null;
                  };
                  const mostRecentService = getMostRecentService();
                  const serviceDateText = mostRecentService?.date
                    ? new Date(mostRecentService.date).toLocaleDateString()
                    : 'No services';
                  const mostRecentJobType = mostRecentService
                    ? mapServiceLabel(mostRecentService?.type || mostRecentService?.name || mostRecentService)
                    : null;
                  
                  // Format address for display
                  const addressLines = formatAddressLines(customer.address || '');
                  
                  // Calculate number of services
                  const numberOfServices = customer.serviceCount || (Array.isArray(customer.services) ? customer.services.length : 0);
                  
                  // Calculate total spent
                  const calculateTotalSpent = () => {
                    if (customer.totalSpent !== undefined) {
                      return customer.totalSpent;
                    }
                    if (Array.isArray(customer.services) && customer.services.length > 0) {
                      return customer.services.reduce((total, service) => {
                        const price = parseFloat(
                          service?.pricePaid ?? 
                          service?.price ?? 
                          service?.amount ?? 
                          0
                        );
                        return total + (isNaN(price) ? 0 : price);
                      }, 0);
                    }
                    return 0;
                  };
                  const totalSpent = calculateTotalSpent();
                  
                  return (
                    <React.Fragment key={customer.id}>
                    <tr 
                      onClick={() => toggleCustomerExpansion(customer.id)}
                      className="bg-white border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-[1.575rem]">
                        <span className="text-base font-bold text-gray-900">{customerName}</span>
                      </td>
                      <td className="px-4 py-[1.575rem]">
                        <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{customer.phone || 'No phone'}</span>
                      </td>
                      <td className="px-4 py-[1.575rem]">
                        <div className="flex flex-col max-w-xs">
                          <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line1 || customer.address || 'No address'}</span>
                          {addressLines.line2 && (
                            <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line2}</span>
                          )}
                            </div>
                      </td>
                      <td className="px-4 py-[1.575rem]">
                        <span className="text-sm font-medium text-slate-600">{serviceDateText}</span>
                      </td>
                      <td className="px-4 py-[1.575rem] text-center">
                        <span className="text-sm font-semibold text-gray-900">{numberOfServices}</span>
                      </td>
                      <td className="px-4 py-[1.575rem] text-center">
                        <span className="text-sm font-semibold text-gray-900">
                          {totalSpent > 0 ? `$${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'}
                        </span>
                      </td>
                      <td className="px-4 py-[1.575rem] text-center">
                        <div className="scale-[1.45546875] inline-flex">
                          <SourceBadge source={customer.source} />
                          </div>
                        </td>
                      <td className="px-4 py-[1.575rem]">
                        <div className="flex items-center justify-center h-full">
                          <ChevronDown 
                            className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                          />
                        </div>
                      </td>
                    </tr>
                      {isExpanded && (
                    <tr>
                      <td colSpan="8" className="p-0 bg-slate-50">
                        <div className="h-[400px] overflow-hidden w-full">
                          <div className="h-full w-full flex flex-col min-h-0 min-w-0">
                            <div className="bg-slate-50 border-b border-slate-300 h-full w-full flex flex-col overflow-hidden min-h-0">
                              <div className="flex-1 overflow-y-auto min-h-0 overflow-x-hidden p-4 space-y-3 w-full">
                              {Array.isArray(customer.services) && customer.services.length > 0 ? (
                              customer.services.map((service, idx) => {
                                const type = mapServiceLabel(service?.type || service?.name || service);
                                const date = service?.date ? new Date(service.date).toLocaleDateString() : '—';
                                const price = formatServicePrice(service);
                                const actionButtons = [
                                  { label: 'Estimate', icon: FileText, color: 'text-blue-600 bg-blue-50' },
                                  { label: 'Contract', icon: FileSignature, color: 'text-purple-600 bg-purple-50' },
                                  { label: 'Invoice', icon: Receipt, color: 'text-amber-600 bg-amber-50' }
                                ];
                                const bgClasses = {
                                  'Estimate': 'bg-white hover:bg-slate-50 text-blue-600',
                                  'Contract': 'bg-white hover:bg-slate-50 text-purple-600',
                                  'Invoice': 'bg-white hover:bg-slate-50 text-amber-600'
                                };
                                    return (
                                  <div key={`${customer.id}-service-${idx}`} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
                                    {/* Header Row */}
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-semibold text-gray-900 mb-1">{type}</h4>
                                        <div className="flex items-center gap-4 text-xs text-gray-600">
                                          <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span className="font-medium">{date}</span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-4 shrink-0">
                                        {actionButtons.map(action => {
                                          const Icon = action.icon;
                                          return (
                                            <button
                                              key={action.label}
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleServiceFileClick(action.label, customer, service);
                                              }}
                                              className={`w-12 h-12 flex flex-col items-center justify-center gap-0.5 rounded-none border border-slate-300 text-xs font-medium transition-all ${bgClasses[action.label] || 'bg-white hover:bg-slate-50 border-slate-300 text-slate-600'} hover:border-slate-400`}
                                              title={`${action.label} file`}
                                            >
                                              <Icon className="w-4 h-4" />
                                              <span className="text-[10px] leading-tight font-medium">{action.label}</span>
                                            </button>
                                          );
                                        })}
                                        <div className="bg-emerald-50 rounded-lg px-3 py-2 border border-emerald-200 text-right ml-6">
                                          <p className="text-lg font-bold text-emerald-700">{price}</p>
                                          <p className="text-xs text-emerald-600 font-medium">Price Paid</p>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleServiceFileClick('Edit Service', customer, service);
                                          }}
                                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
                                          title="Edit service entry"
                                        >
                                          <Edit3 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                          ) : (
                              <div className="flex items-center justify-center h-full px-4 py-8 text-sm text-gray-500 bg-white rounded-lg border border-slate-200">
                                No services recorded
                              </div>
                          )}
                              </div>
                              <div className="flex justify-end p-4 border-t border-slate-200 shrink-0">
                                <button
                                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal('addService', customer);
                                  }}
                                  title="Add service"
                                  aria-label="Add service"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add Service</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    )}
                    </React.Fragment>
                  );
                })}

                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-gray-500 py-12">
                      No customers match your search.
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* My Agent Tab */}
        {activeTab === 'aiAgent' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Agent</h2>
              </div>
              <button
                onClick={() => setIsAgentSettingsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
                title="Agent Settings"
              >
                <Settings className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Connect Agent Section */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Connect Agent to Business Accounts:</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Facebook */}
                <button
                  type="button"
                  className="relative flex flex-col items-center justify-center gap-3 p-5 border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all duration-200 group bg-white"
                >
                  {connectedAccounts.facebook && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform shadow-sm bg-white">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">Facebook</span>
                </button>

                {/* Instagram */}
                <button
                  type="button"
                  className="relative flex flex-col items-center justify-center gap-3 p-5 border-2 border-slate-200 rounded-2xl hover:border-pink-500 hover:bg-pink-50 hover:shadow-md transition-all duration-200 group bg-white"
                >
                  {connectedAccounts.instagram && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform shadow-sm bg-white p-1">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#833AB4"/>
                          <stop offset="50%" stopColor="#FD1D1D"/>
                          <stop offset="100%" stopColor="#FCAF45"/>
                        </linearGradient>
                      </defs>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#instagram-gradient)"/>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-pink-700 transition-colors">Instagram</span>
                </button>

                {/* TikTok */}
                <button
                  type="button"
                  className="relative flex flex-col items-center justify-center gap-3 p-5 border-2 border-slate-200 rounded-2xl hover:border-black hover:bg-slate-50 hover:shadow-md transition-all duration-200 group bg-white"
                >
                  {connectedAccounts.tiktok && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform shadow-sm bg-black p-2">
                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#FFFFFF"/>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">TikTok</span>
                </button>

                {/* Website */}
                <button
                  type="button"
                  className="relative flex flex-col items-center justify-center gap-3 p-5 border-2 border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md transition-all duration-200 group bg-white"
                >
                  {connectedAccounts.website && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-600 rounded-xl group-hover:scale-110 transition-transform shadow-sm">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">Website</span>
                </button>

                {/* SMS via Twilio */}
                <button
                  type="button"
                  className="relative flex flex-col items-center justify-center gap-3 p-5 border-2 border-slate-200 rounded-2xl hover:border-red-500 hover:bg-red-50 hover:shadow-md transition-all duration-200 group bg-white"
                >
                  {connectedAccounts.sms && (
                    <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                  <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-xl group-hover:scale-110 transition-transform shadow-sm">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-red-700 transition-colors">SMS via Twilio</span>
                </button>
              </div>
            </div>

            {/* Interactive Sales Flowchart */}
            {/* Sales Flow Hooks Section */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-200">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">Sales Flow Hooks</h3>
              </div>

              <div className="space-y-4">
                {agentFlowSteps
                  .sort((a, b) => a.order - b.order)
                  .map((step, index) => {
                    const isEditing = editingStepId === step.id;
                    const isPersonalGreeting = step.id === 1;
                    const isSalesPitchHooks = step.id === 2;
                    const isReviewsTestimonials = step.id === 3;
                    
                    // Only show step id 1, 2, or 3 in this section
                    if (!isPersonalGreeting && !isSalesPitchHooks && !isReviewsTestimonials) {
                      return null;
                    }
                    
                    // Special handling for Personal Greeting
                    if (isPersonalGreeting) {
                      let mediaItems = step.mediaItems || [];
                      // Ensure exactly one personal greeting slot is shown for display
                      const displayItems = mediaItems.length === 0 
                        ? [{ id: 'temp-' + Date.now(), media: null, description: '', service: '' }]
                        : [mediaItems[0]];
                      
                      const addMediaItem = () => {
                        const currentItems = step.mediaItems || [];
                        // Only allow a single personal greeting item
                        if (currentItems.length >= 1) return;
                        const newItem = { id: Date.now(), media: null, description: '', service: '' };
                        setAgentFlowSteps(agentFlowSteps.map(s => 
                          s.id === step.id 
                            ? { ...s, mediaItems: currentItems.length === 0 ? [newItem] : [currentItems[0] || newItem] }
                            : s
                        ));
                      };
                      
                      const updateMediaItem = (itemId, field, value) => {
                        const currentItems = step.mediaItems || [];
                        // If updating a temp item and mediaItems is empty, initialize it
                        if (currentItems.length === 0 && itemId.toString().startsWith('temp-')) {
                          const newItem = { id: Date.now(), media: null, description: '', service: '' };
                          setAgentFlowSteps(agentFlowSteps.map(s => 
                            s.id === step.id 
                              ? { ...s, mediaItems: [{ ...newItem, [field]: value }] }
                              : s
                          ));
                        } else {
                          setAgentFlowSteps(agentFlowSteps.map(s => 
                            s.id === step.id 
                              ? { 
                                  ...s, 
                                  mediaItems: currentItems.map(item => 
                                    item.id === itemId ? { ...item, [field]: value } : item
                                  )
                                }
                              : s
                          ));
                        }
                      };
                      
                      const removeMediaItem = (itemId) => {
                        const currentItems = step.mediaItems || [];
                        // Clear media instead of removing the only personal greeting item
                        setAgentFlowSteps(agentFlowSteps.map(s => 
                          s.id === step.id 
                            ? { 
                                ...s, 
                                mediaItems: currentItems.length === 0 
                                  ? [{ id: Date.now(), media: null, description: '', service: '' }]
                                  : currentItems.map(item => 
                                      item.id === itemId ? { ...item, media: null, description: '' } : item
                                    )
                              }
                            : s
                        ));
                      };
                      
                      const clearMediaFromItem = (itemId) => {
                        const currentItems = step.mediaItems || [];
                        // Clear media and description but keep the single item
                        setAgentFlowSteps(agentFlowSteps.map(s => 
                          s.id === step.id 
                            ? { 
                                ...s, 
                                mediaItems: currentItems.map(item => 
                                  item.id === itemId ? { ...item, media: null, description: '' } : item
                                )
                              }
                            : s
                        ));
                      };
                      
                      const handleSavePersonalGreeting = () => {
                        const currentItems = step.mediaItems || [];
                        // Save the media items data
                        console.log('Saving Personal Greeting:', currentItems);
                        // Here you can add API call to save the data
                        // For now, we'll just show an alert
                        alert('Personal Greeting saved successfully!');
                      };

                      // PhotoUploadBox component
                      const PhotoUploadBox = ({ onFileSelect, itemId = null, onDelete = null }) => (
                        <div className="relative">
                          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors bg-white">
                            <div className="flex flex-col items-center justify-center">
                              <Upload className="w-6 h-6 text-slate-400 mb-1" />
                              <p className="text-xs text-slate-600 font-medium text-center px-2">Add photo or video</p>
                            </div>
                            <input
                              type="file"
                              accept="image/*,video/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  onFileSelect(file, itemId);
                                }
                              }}
                            />
                          </label>
                          {onDelete && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onDelete();
                              }}
                              className="absolute top-2 right-2 p-1 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-colors z-10"
                              type="button"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                      
                      return (
                        <div key={step.id} className="relative">
                          <div className="bg-slate-50/60 border-2 border-slate-200 rounded-2xl p-5">
                            <div className="space-y-4">
                              <h4 className="text-lg font-bold text-gray-900">{step.name}</h4>
                              
                              <div className="space-y-4">
                                <div className="flex items-start gap-3 flex-wrap">
                                  {displayItems.map((item, itemIndex) => (
                                    <div key={item.id} className="flex flex-col gap-2">
                                      {item.media ? (
                                        <div className="relative">
                                          {item.media instanceof File && item.media.type.startsWith('image/') ? (
                                            <div className="relative rounded-lg overflow-hidden border-2 border-slate-300 w-32 h-32">
                                              <img 
                                                src={URL.createObjectURL(item.media)} 
                                                alt="Uploaded" 
                                                className="w-full h-full object-cover"
                                              />
                                              <button
                                                onClick={() => clearMediaFromItem(item.id)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                type="button"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            </div>
                                          ) : item.media instanceof File && item.media.type.startsWith('video/') ? (
                                            <div className="relative rounded-lg overflow-hidden border-2 border-slate-300 w-32 h-32">
                                              <video 
                                                src={URL.createObjectURL(item.media)} 
                                                controls
                                                className="w-full h-full object-cover"
                                              />
                                              <button
                                                onClick={() => clearMediaFromItem(item.id)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                type="button"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            </div>
                                          ) : null}
                                        </div>
                                      ) : (
                                        <PhotoUploadBox 
                                          onFileSelect={(file) => updateMediaItem(item.id, 'media', file)}
                                          itemId={item.id}
                                          onDelete={displayItems.length > 1 ? () => removeMediaItem(item.id) : null}
                                        />
                                      )}
                                      
                                      {item.media && (
                                        <textarea
                                          value={item.description || ''}
                                          onChange={(e) => updateMediaItem(item.id, 'description', e.target.value)}
                                          rows={2}
                                          className="w-32 px-2 py-1 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 text-xs resize-none"
                                          placeholder="Add description..."
                                        />
                                      )}
                                    </div>
                                  ))}
                                  
                                  {displayItems.length < 1 && (
                                    <button
                                      onClick={addMediaItem}
                                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-300 transition-colors bg-slate-200 mt-[2.75rem] ml-6"
                                      type="button"
                                    >
                                      <Plus className="w-5 h-5 text-slate-600" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    // Special handling for Job Demos (Add Job Demos)
                    if (isSalesPitchHooks) {
                      let mediaItems = step.mediaItems || [];
                      // Ensure at least one media item exists for display
                      const displayItems = mediaItems.length === 0 
                        ? [{ id: 'temp-' + Date.now(), media: null, description: '', service: '' }]
                        : mediaItems;
                      
                      const addMediaItem = () => {
                        const currentItems = step.mediaItems || [];
                        const newItem = { id: Date.now(), media: null, description: '', service: '' };
                        setAgentFlowSteps(agentFlowSteps.map(s => 
                          s.id === step.id 
                            ? { ...s, mediaItems: currentItems.length === 0 ? [newItem] : [...currentItems, newItem] }
                            : s
                        ));
                      };
                      
                      const updateMediaItem = (itemId, field, value) => {
                        const currentItems = step.mediaItems || [];
                        // If updating a temp item and mediaItems is empty, initialize it
                        if (currentItems.length === 0 && itemId.toString().startsWith('temp-')) {
                          const newItem = { id: Date.now(), media: null, description: '', service: '' };
                          setAgentFlowSteps(agentFlowSteps.map(s => 
                            s.id === step.id 
                              ? { ...s, mediaItems: [{ ...newItem, [field]: value }] }
                              : s
                          ));
                        } else {
                          setAgentFlowSteps(agentFlowSteps.map(s => 
                            s.id === step.id 
                              ? { 
                                  ...s, 
                                  mediaItems: currentItems.map(item => 
                                    item.id === itemId ? { ...item, [field]: value } : item
                                  )
                                }
                              : s
                          ));
                        }
                      };
                      
                      const removeMediaItem = (itemId) => {
                        const currentItems = step.mediaItems || [];
                        // If it's the last item, clear the media instead of removing the item
                        if (currentItems.length <= 1) {
                          setAgentFlowSteps(agentFlowSteps.map(s => 
                            s.id === step.id 
                              ? { 
                                  ...s, 
                                  mediaItems: currentItems.length === 0 
                                    ? [{ id: Date.now(), media: null, description: '', service: '' }]
                                    : currentItems.map(item => 
                                        item.id === itemId ? { ...item, media: null, description: '' } : item
                                      )
                                }
                              : s
                          ));
                        } else {
                          // If there are multiple items, remove the item
                          setAgentFlowSteps(agentFlowSteps.map(s => 
                            s.id === step.id 
                              ? { ...s, mediaItems: currentItems.filter(item => item.id !== itemId) }
                              : s
                          ));
                        }
                      };
                      
                      const clearMediaFromItem = (itemId) => {
                        const currentItems = step.mediaItems || [];
                        // Clear media and description but keep the item
                        setAgentFlowSteps(agentFlowSteps.map(s => 
                          s.id === step.id 
                            ? { 
                                ...s, 
                                mediaItems: currentItems.map(item => 
                                  item.id === itemId ? { ...item, media: null, description: '' } : item
                                )
                              }
                            : s
                        ));
                      };
                      
                      const handleSaveSalesPitchHooks = () => {
                        const currentItems = step.mediaItems || [];
                        // Save the media items data
                        console.log('Saving Job Demos:', currentItems);
                        // Here you can add API call to save the data
                        // For now, we'll just show an alert
                        alert('Job Demos saved successfully!');
                      };

                      // Get all services alphabetized
                      const allServices = [
                        ...softWashingServices,
                        ...customSoftWashingServices,
                        ...pressureWashingServices,
                        ...customPressureWashingServices,
                        ...specialtyCleaningServices,
                        ...customSpecialtyCleaningServices
                      ].sort((a, b) => a.localeCompare(b));

                      // ServiceDropdown component
                      const ServiceDropdown = ({ itemId, selectedService, onServiceChange }) => {
                        const [isOpen, setIsOpen] = useState(false);
                        const [searchTerm, setSearchTerm] = useState('');
                        
                        const filteredServices = allServices.filter(service =>
                          service.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        
                        return (
                          <div className="relative w-32">
                            <button
                              type="button"
                              onClick={() => setIsOpen(!isOpen)}
                              className="w-full px-2 py-1.5 text-xs border-2 border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors text-left flex items-center justify-between"
                            >
                              <span className="truncate">
                                {selectedService || 'Select service'}
                              </span>
                              <ChevronDown className={`w-3 h-3 text-slate-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                            </button>
                            
                            {isOpen && (
                              <>
                                <div 
                                  className="fixed inset-0 z-10" 
                                  onClick={() => setIsOpen(false)}
                                />
                                <div className="absolute z-20 mt-1 w-64 bg-white border-2 border-slate-300 rounded-lg shadow-lg max-h-64 overflow-hidden flex flex-col">
                                  <div className="p-2 border-b border-slate-200">
                                    <input
                                      type="text"
                                      placeholder="Search services..."
                                      value={searchTerm}
                                      onChange={(e) => setSearchTerm(e.target.value)}
                                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </div>
                                  <div className="overflow-y-auto max-h-48">
                                    {filteredServices.length > 0 ? (
                                      filteredServices.map((service) => (
                                        <button
                                          key={service}
                                          type="button"
                                          onClick={() => {
                                            onServiceChange(service);
                                            setIsOpen(false);
                                            setSearchTerm('');
                                          }}
                                          className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition-colors ${
                                            selectedService === service ? 'bg-blue-100 font-semibold' : ''
                                          }`}
                                        >
                                          {service}
                                        </button>
                                      ))
                                    ) : (
                                      <div className="px-3 py-2 text-xs text-slate-500">
                                        No services found
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      };

                      // PhotoUploadBox component
                      const PhotoUploadBox = ({ onFileSelect, itemId = null, onDelete = null }) => (
                        <div className="relative">
                          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors bg-white">
                            <div className="flex flex-col items-center justify-center">
                              <Upload className="w-6 h-6 text-slate-400 mb-1" />
                              <p className="text-xs text-slate-600 font-medium text-center px-2">Add photo or video</p>
                            </div>
                            <input
                              type="file"
                              accept="image/*,video/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  onFileSelect(file, itemId);
                                }
                              }}
                            />
                          </label>
                          {onDelete && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onDelete();
                              }}
                              className="absolute top-2 right-2 p-1 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-colors z-10"
                              type="button"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                      
                      return (
                        <div key={step.id} className="relative">
                          <div className="bg-slate-50/60 border-2 border-slate-200 rounded-2xl p-5">
                            <div className="space-y-4">
                              <h4 className="text-lg font-bold text-gray-900">{step.name}</h4>
                              
                              <div className="space-y-4">
                                <div className="flex items-start gap-3 flex-wrap">
                                  {displayItems.map((item, itemIndex) => (
                                    <div key={item.id} className="flex flex-col gap-2">
                                      {item.media ? (
                                        <div className="relative">
                                          {item.media instanceof File && item.media.type.startsWith('image/') ? (
                                            <div className="relative rounded-lg overflow-hidden border-2 border-slate-300 w-32 h-32">
                                              <img 
                                                src={URL.createObjectURL(item.media)} 
                                                alt="Uploaded" 
                                                className="w-full h-full object-cover"
                                              />
                                              <button
                                                onClick={() => clearMediaFromItem(item.id)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                type="button"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            </div>
                                          ) : item.media instanceof File && item.media.type.startsWith('video/') ? (
                                            <div className="relative rounded-lg overflow-hidden border-2 border-slate-300 w-32 h-32">
                                              <video 
                                                src={URL.createObjectURL(item.media)} 
                                                controls
                                                className="w-full h-full object-cover"
                                              />
                                              <button
                                                onClick={() => clearMediaFromItem(item.id)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                type="button"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            </div>
                                          ) : null}
                                        </div>
                                      ) : (
                                        <PhotoUploadBox 
                                          onFileSelect={(file) => updateMediaItem(item.id, 'media', file)}
                                          itemId={item.id}
                                          onDelete={displayItems.length > 1 ? () => removeMediaItem(item.id) : null}
                                        />
                                      )}
                                      
                                      <ServiceDropdown
                                        itemId={item.id}
                                        selectedService={item.service || ''}
                                        onServiceChange={(service) => updateMediaItem(item.id, 'service', service)}
                                      />
                                      
                                      {item.media && (
                                        <textarea
                                          value={item.description || ''}
                                          onChange={(e) => updateMediaItem(item.id, 'description', e.target.value)}
                                          rows={2}
                                          className="w-32 px-2 py-1 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 text-xs resize-none"
                                          placeholder="Add description..."
                                        />
                                      )}
                                    </div>
                                  ))}
                                  
                                  <button
                                    onClick={addMediaItem}
                                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-300 transition-colors bg-slate-200 mt-[2.75rem] ml-6"
                                    type="button"
                                  >
                                    <Plus className="w-5 h-5 text-slate-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    // Special handling for Reviews and Testimonials
                    if (isReviewsTestimonials) {
                      const reviewsData = step.reviewsData || {
                        customerReviews: []
                      };
                      
                      const customerReviews = reviewsData.customerReviews || [];
                      
                      const handleSaveReviewsTestimonials = () => {
                        console.log('Saving Reviews and Testimonials:', reviewsData);
                        // Here you can add API call to save the data
                        // For now, we'll just show an alert
                        alert('Reviews and Testimonials saved successfully!');
                      };
                      
                      return (
                        <div key={step.id} className="relative">
                          <div className="bg-slate-50/60 border-2 border-slate-200 rounded-2xl p-5">
                            <div className="space-y-4">
                              <h4 className="text-lg font-bold text-gray-900">{step.name}</h4>
                              
                              <div className="space-y-4">
                                {/* Customer Reviews Section */}
                                <div className="pt-6 border-t border-slate-200">
                                  <h5 className="text-base font-semibold text-gray-900 mb-4">Customer Reviews</h5>
                                  <div className="space-y-4">
                                    {customerReviews.map((review, index) => (
                                      <div key={index} className="relative">
                                        <textarea
                                          value={review || ''}
                                          onChange={(e) => {
                                            const updatedReviews = [...customerReviews];
                                            updatedReviews[index] = e.target.value;
                                            setAgentFlowSteps(agentFlowSteps.map(s => 
                                              s.id === step.id 
                                                ? { 
                                                    ...s, 
                                                    reviewsData: {
                                                      ...reviewsData,
                                                      customerReviews: updatedReviews
                                                    }
                                                  }
                                                : s
                                            ));
                                          }}
                                          rows={4}
                                          placeholder="Enter a customer review..."
                                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                                        />
                                        <button
                                          onClick={() => {
                                            const updatedReviews = customerReviews.filter((_, i) => i !== index);
                                            setAgentFlowSteps(agentFlowSteps.map(s => 
                                              s.id === step.id 
                                                ? { 
                                                    ...s, 
                                                    reviewsData: {
                                                      ...reviewsData,
                                                      customerReviews: updatedReviews
                                                    }
                                                  }
                                                : s
                                            ));
                                          }}
                                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                          type="button"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    ))}
                                    
                                    {customerReviews.length < 3 && (
                                      <button
                                        onClick={() => {
                                          const updatedReviews = [...customerReviews, ''];
                                          setAgentFlowSteps(agentFlowSteps.map(s => 
                                            s.id === step.id 
                                              ? { 
                                                  ...s, 
                                                  reviewsData: {
                                                    ...reviewsData,
                                                    customerReviews: updatedReviews
                                                  }
                                                }
                                              : s
                                          ));
                                        }}
                                        className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-600 flex items-center justify-center gap-2"
                                        type="button"
                                      >
                                        <Plus className="w-4 h-4" />
                                        Add Review {customerReviews.length > 0 ? `(${customerReviews.length}/3)` : '(0/3)'}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={step.id} className="relative">
                        <div className="bg-slate-50/60 border-2 border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-all">
                          <div className="flex-1 space-y-3">
                              {/* Step Name */}
                              {isEditing ? (
                                <div className="space-y-3">
                                  <input
                                    type="text"
                                    value={step.name}
                                    onChange={(e) => updateFlowStep(step.id, 'name', e.target.value)}
                                    onBlur={() => setEditingStepId(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        setEditingStepId(null);
                                      }
                                    }}
                                    className="w-full px-4 py-2.5 border-2 border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-bold text-lg"
                                    placeholder="Step Name"
                                    autoFocus
                                  />
                                  <input
                                    type="text"
                                    value={step.principle || ''}
                                    onChange={(e) => updateFlowStep(step.id, 'principle', e.target.value)}
                                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 font-medium text-sm"
                                    placeholder="Principle"
                                  />
                                  <textarea
                                    value={step.description || ''}
                                    onChange={(e) => updateFlowStep(step.id, 'description', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 text-sm resize-none"
                                    placeholder="Description"
                                  />
                                  
                                  {/* Photo/Video Upload Section */}
                                  <div className="pt-3 border-t border-slate-200 space-y-3">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Photo/Video</label>
                                    <div className="space-y-3">
                                      {step.media ? (
                                        <div className="relative">
                                          {step.media instanceof File && step.media.type.startsWith('image/') ? (
                                            <div className="relative rounded-lg overflow-hidden border-2 border-slate-300">
                                              <img 
                                                src={URL.createObjectURL(step.media)} 
                                                alt="Uploaded" 
                                                className="w-full max-h-64 object-cover"
                                              />
                                              <button
                                                onClick={() => updateFlowStep(step.id, 'media', null)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                type="button"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            </div>
                                          ) : step.media instanceof File && step.media.type.startsWith('video/') ? (
                                            <div className="relative rounded-lg overflow-hidden border-2 border-slate-300">
                                              <video 
                                                src={URL.createObjectURL(step.media)} 
                                                controls
                                                className="w-full max-h-64"
                                              />
                                              <button
                                                onClick={() => updateFlowStep(step.id, 'media', null)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                type="button"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            </div>
                                          ) : null}
                                        </div>
                                      ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                            <p className="text-sm text-slate-600 font-medium">Click to upload photo or video</p>
                                            <p className="text-xs text-slate-500 mt-1">PNG, JPG, MP4, MOV</p>
                                          </div>
                                          <input
                                            type="file"
                                            accept="image/*,video/*"
                                            className="hidden"
                                            onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                updateFlowStep(step.id, 'media', file);
                                              }
                                            }}
                                          />
                                        </label>
                                      )}
                                      
                                      <textarea
                                        value={step.mediaDescription || ''}
                                        onChange={(e) => updateFlowStep(step.id, 'mediaDescription', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-2 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 text-sm resize-none"
                                        placeholder="Add a description for the photo/video..."
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  onClick={() => setEditingStepId(step.id)}
                                  className="cursor-pointer space-y-2"
                                >
                                  <h4 className="text-lg font-bold text-gray-900">{step.name}</h4>
                                  {step.principle && (
                                    <p className="text-sm font-semibold text-blue-700 italic">"{step.principle}"</p>
                                  )}
                                  {step.description && (
                                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                  )}
                                  
                                  {/* Display Media in View Mode */}
                                  {step.media && (
                                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                                      <div className="rounded-lg overflow-hidden border-2 border-slate-300">
                                        {step.media instanceof File && step.media.type?.startsWith('image/') ? (
                                          <img 
                                            src={URL.createObjectURL(step.media)} 
                                            alt="Step media" 
                                            className="w-full max-h-64 object-cover"
                                          />
                                        ) : step.media instanceof File && step.media.type?.startsWith('video/') ? (
                                          <video 
                                            src={URL.createObjectURL(step.media)} 
                                            controls
                                            className="w-full max-h-64"
                                          />
                                        ) : null}
                                      </div>
                                      {step.mediaDescription && (
                                        <p className="text-sm text-gray-600 italic">{step.mediaDescription}</p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Promotions Section */}
                  {(() => {
                    // Filter live promotions (current date between start and end, or no dates set)
                    const now = new Date();
                    const livePromotions = promotions.filter(promo => {
                      if (!promo.startDate && !promo.endDate) {
                        return true; // Show if no dates set
                      }
                      const startDate = promo.startDate ? new Date(promo.startDate) : null;
                      const endDate = promo.endDate ? new Date(promo.endDate) : null;
                      if (startDate && endDate) {
                        return now >= startDate && now <= endDate;
                      }
                      if (startDate && !endDate) {
                        return now >= startDate;
                      }
                      if (!startDate && endDate) {
                        return now <= endDate;
                      }
                      return false;
                    });
                    
                    const formatPromotionText = (promo) => {
                      const servicesText = promo.services && promo.services.length > 0 
                        ? promo.services.join(', ') 
                        : 'All Services';
                      
                      if (promo.promotionType === 'percentOff' && promo.percentOff) {
                        return `${promo.percentOff}% OFF - ${servicesText}`;
                      } else if (promo.promotionType === 'package') {
                        // Check if packageFormula exists and has data
                        if (promo.packageFormula && promo.packageFormula.initialService) {
                          const initialService = promo.packageFormula.initialService;
                          const additionalServices = promo.packageFormula.additionalServices || [];
                          
                          if (additionalServices.length > 0) {
                            const additionalText = additionalServices.map((addService) => {
                              if (addService.service) {
                                if (addService.discountType === 'free') {
                                  return `${addService.service} (Free)`;
                                } else if (addService.discountType === 'percentOff' && addService.percentOff) {
                                  return `${addService.service} (${addService.percentOff}% off)`;
                                } else {
                                  return addService.service;
                                }
                              }
                              return '';
                            }).filter(Boolean).join(', ');
                            
                            return `Package: ${initialService} + ${additionalText}`;
                          } else {
                            return `Package: ${initialService}`;
                          }
                        }
                        
                        // Fallback to old packageType format
                        const packageText = promo.packageType === 'buyOneGetOne' 
                          ? 'Buy One Get One' 
                          : promo.packageType === 'buyTwoGetOne' 
                          ? 'Buy Two Get One Free' 
                          : 'Bundle Discount';
                        return `${packageText} - ${servicesText}`;
                      }
                      return `Promotion - ${servicesText}`;
                    };
                    
                    return (
                      <div key="promotions" className="relative">
                        <div className="bg-slate-50/60 border-2 border-slate-200 rounded-2xl p-5">
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-gray-900">Live Promotions</h4>
                            
                            <div className="space-y-4">
                              {livePromotions.length > 0 ? (
                                <div className="space-y-3">
                                  {livePromotions.map((promo) => (
                                    <div 
                                      key={promo.id} 
                                      className="relative p-4"
                                    >
                                      <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                                        <div className="flex-1">
                                          <p className="text-sm font-semibold text-gray-900">
                                            {formatPromotionText(promo)}
                                          </p>
                                          {promo.startDate && promo.endDate && (
                                            <p className="text-xs text-gray-600 mt-1">
                                              {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                                            </p>
                                          )}
                                          {promo.startDate && !promo.endDate && (
                                            <p className="text-xs text-gray-600 mt-1">
                                              Starts: {new Date(promo.startDate).toLocaleDateString()}
                                            </p>
                                          )}
                                          {!promo.startDate && promo.endDate && (
                                            <p className="text-xs text-gray-600 mt-1">
                                              Ends: {new Date(promo.endDate).toLocaleDateString()}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                  No live promotions at this time
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
              </div>
            </div>

            {/* Lead Followup Section */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-200">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Lead Followup</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">Enable Followup</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={leadFollowupEnabled}
                      onChange={(e) => setLeadFollowupEnabled(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-14 h-7 rounded-full transition-colors duration-200 flex items-center px-0.5 ${
                        leadFollowupEnabled ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200" />
                    </div>
                  </div>
                </label>
              </div>
              {leadFollowupEnabled && (
                <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 min-w-[120px]">Followup Frequency:</label>
                    <select
                      value={leadFollowupFrequency}
                      onChange={(e) => setLeadFollowupFrequency(e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                    >
                      <option value="">Select frequency...</option>
                      <option value="daily">Daily</option>
                      <option value="intermittent">Every X Days</option>
                    </select>
                    {leadFollowupFrequency === 'intermittent' && (
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Followup every</label>
                        <input
                          type="number"
                          min="1"
                          value={leadFollowupDays}
                          onChange={(e) => setLeadFollowupDays(e.target.value === '' ? '' : parseInt(e.target.value) || '')}
                          placeholder="Number of days"
                          className="w-32 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                        />
                        <span className="text-sm font-medium text-gray-700">days</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <label className={`text-sm font-medium min-w-[120px] ${
                      (!leadFollowupFrequency || (leadFollowupFrequency === 'intermittent' && !leadFollowupDays)) 
                        ? 'text-gray-400' 
                        : 'text-gray-700'
                    }`}>Duration:</label>
                    <select
                      value={leadFollowupDuration}
                      onChange={(e) => setLeadFollowupDuration(e.target.value)}
                      disabled={!leadFollowupFrequency || (leadFollowupFrequency === 'intermittent' && !leadFollowupDays)}
                      className={`px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                        (!leadFollowupFrequency || (leadFollowupFrequency === 'intermittent' && !leadFollowupDays))
                          ? 'bg-slate-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white'
                      }`}
                    >
                      <option value="indefinitely">Indefinitely</option>
                      <option value="limited">For a specific duration</option>
                    </select>
                    {leadFollowupDuration === 'limited' && (
                      <div className="flex items-center gap-2">
                        <label className={`text-sm font-medium ${
                          (!leadFollowupFrequency || (leadFollowupFrequency === 'intermittent' && !leadFollowupDays))
                            ? 'text-gray-400'
                            : 'text-gray-700'
                        }`}>For</label>
                        <input
                          type="number"
                          min="1"
                          value={leadFollowupDurationValue}
                          onChange={(e) => setLeadFollowupDurationValue(e.target.value === '' ? '' : parseInt(e.target.value) || '')}
                          placeholder="Number"
                          disabled={!leadFollowupFrequency || (leadFollowupFrequency === 'intermittent' && !leadFollowupDays)}
                          className={`w-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                            (!leadFollowupFrequency || (leadFollowupFrequency === 'intermittent' && !leadFollowupDays))
                              ? 'bg-slate-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white'
                          }`}
                        />
                        <select
                          value={leadFollowupDurationUnit}
                          onChange={(e) => setLeadFollowupDurationUnit(e.target.value)}
                          disabled={!leadFollowupFrequency || (leadFollowupFrequency === 'intermittent' && !leadFollowupDays)}
                          className={`px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                            (!leadFollowupFrequency || (leadFollowupFrequency === 'intermittent' && !leadFollowupDays))
                              ? 'bg-slate-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white'
                          }`}
                        >
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                          <option value="months">Months</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Weather Section */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-200">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Weather</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">Integrate Weather Data</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={weatherIntegrationEnabled}
                      onChange={(e) => setWeatherIntegrationEnabled(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-14 h-7 rounded-full transition-colors duration-200 flex items-center px-0.5 ${
                        weatherIntegrationEnabled ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200" />
                    </div>
                  </div>
                </label>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Weather data will be integrated into scheduling recommendations to help optimize job scheduling based on weather conditions.
                </p>
              </div>
            </div>

            {/* Before-Job Reminders Section */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-slate-200">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">Before-Job Reminders</h3>
              </div>

              <div className="space-y-6">
                {/* Day Before Job */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dayBeforeJobEnabled}
                      onChange={(e) => setDayBeforeJobEnabled(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Day Before Job</span>
                  </label>
                  
                  {dayBeforeJobEnabled && (
                    <div className="ml-7 bg-slate-50/60 border border-slate-200 rounded-xl p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time of Message
                        </label>
                        <input
                          type="time"
                          value={dayBeforeJobTime}
                          onChange={(e) => setDayBeforeJobTime(e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Customize Prompt
                        </label>
                        <textarea
                          value={dayBeforeJobInstructions}
                          onChange={(e) => setDayBeforeJobInstructions(e.target.value)}
                          rows={4}
                          placeholder="Enter instructions for customers to prepare for the job..."
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Day Of Job */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dayOfJobEnabled}
                      onChange={(e) => setDayOfJobEnabled(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Day of Job</span>
                  </label>
                  
                  {dayOfJobEnabled && (
                    <div className="ml-7 bg-slate-50/60 border border-slate-200 rounded-xl p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time of Message
                        </label>
                        <input
                          type="time"
                          value={dayOfJobTime}
                          onChange={(e) => setDayOfJobTime(e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Customize Prompt
                        </label>
                        <textarea
                          value={dayOfJobInstructions}
                          onChange={(e) => setDayOfJobInstructions(e.target.value)}
                          rows={4}
                          placeholder="Enter instructions for customers for the day of the job..."
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Agent Settings Modal */}
            {isAgentSettingsOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsAgentSettingsOpen(false)}>
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Agent Settings</h3>
                    <button
                      onClick={() => setIsAgentSettingsOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="agentNameSettings" className="block text-sm font-semibold text-gray-700 mb-2">
                        My Agent Name
                      </label>
                      <input
                        type="text"
                        id="agentNameSettings"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="Enter agent name..."
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 bg-white shadow-sm"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        This is how your agent will introduce itself to your customers.
                      </p>
                    </div>

                    {/* Agent Tone Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Agent Tone
                      </label>
                      <div className="space-y-2">
                        {['Friendly & Conversational', 'Professional & Direct', 'Persuasive & High-Energy'].map((tone) => (
                          <label
                            key={tone}
                            className={`flex items-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                              agentTone === tone
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="agentTone"
                              value={tone}
                              checked={agentTone === tone}
                              onChange={(e) => setAgentTone(e.target.value)}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className={`ml-3 text-sm font-medium ${
                              agentTone === tone ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                              {tone}
                            </span>
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Choose how your agent communicates with customers.
                      </p>
                    </div>

                    {/* Emoji Integration Checkbox */}
                    <div>
                      <label className="flex items-center px-4 py-3 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-all">
                        <input
                          type="checkbox"
                          checked={emojiIntegration}
                          onChange={(e) => setEmojiIntegration(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          Emoji Integration into responses
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Enable emojis in agent responses to make communication more engaging.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
                    <button
                      onClick={() => setIsAgentSettingsOpen(false)}
                      className="px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Save agent settings
                        console.log('Saving agent settings:', { agentName, agentTone, emojiIntegration });
                        setIsAgentSettingsOpen(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button for My Agent */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    // Save all agent data
                    const personalGreetingStep = agentFlowSteps.find(s => s.id === 1);
                    const salesPitchHooksStep = agentFlowSteps.find(s => s.id === 2);
                    const reviewsTestimonialsStep = agentFlowSteps.find(s => s.id === 3);
                    
                    console.log('Saving all My Agent data:', {
                      agentName,
                      agentFlowSteps,
                      personalGreeting: personalGreetingStep?.mediaItems || [],
                      salesPitchHooks: salesPitchHooksStep?.mediaItems || [],
                      reviewsTestimonials: reviewsTestimonialsStep?.reviewsData || {},
                      leadFollowupEnabled,
                      leadFollowupFrequency,
                      leadFollowupDays,
                      leadFollowupDuration,
                      leadFollowupDurationValue,
                      leadFollowupDurationUnit,
                      weatherIntegrationEnabled,
                      connectedAccounts
                    });
                    
                    // Here you can add API call to save all the data
                    alert('All agent information saved successfully!');
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                >
                  Save
                </button>
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
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Job Calendar</h2>
              </div>
              <div className="flex items-center justify-end w-full sm:w-auto">
                <button
                  onClick={() => {
                    setModalType('addJob');
                    setIsModalOpen(true);
                  }}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Job</span>
                </button>
              </div>
            </div>

            {/* Calendar Controls */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2.5 hover:bg-gray-50 rounded-xl transition-all hover:shadow-sm border border-transparent hover:border-gray-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2.5 hover:bg-gray-50 rounded-xl transition-all hover:shadow-sm border border-transparent hover:border-gray-200"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-3">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-bold text-gray-500 py-3 text-sm uppercase tracking-wider">
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
                      <div key={`empty-${i}`} className="min-h-[120px] bg-gray-50/50 rounded-xl border border-gray-100"></div>
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
                        className={`min-h-[120px] border rounded-xl p-3 cursor-pointer transition-all duration-200 ${
                          isToday 
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-md ring-2 ring-blue-200/50' : 
                          isSelected 
                            ? 'border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 shadow-md ring-2 ring-slate-200/50' :
                          'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/50 hover:shadow-sm'
                        }`}
                      >
                        <div className={`text-sm font-bold mb-2 ${
                          isToday 
                            ? 'text-blue-700' : 
                          isSelected 
                            ? 'text-slate-700' :
                          'text-gray-700'
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-1.5">
                          {dayJobs.slice(0, 3).map(job => (
                            <div
                              key={job.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                openJobDetailModal(job);
                              }}
                              className={`text-xs px-2 py-1.5 rounded-lg truncate cursor-pointer hover:opacity-90 transition-all shadow-sm hover:shadow-md font-medium ${
                                job.status === 'completed' 
                                  ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200' :
                                job.status === 'in-progress' 
                                  ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200' :
                                job.status === 'cancelled' 
                                  ? 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200' :
                                  'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200'
                              }`}
                              title={`${job.customerName} - ${job.service}`}
                            >
                              <span className="font-semibold">{job.time}</span> {job.customerName}
                            </div>
                          ))}
                          {dayJobs.length > 3 && (
                            <div className="text-xs text-gray-500 font-semibold pt-1">
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

            {/* Calendar Sync Section */}
            <div className="bg-slate-50/60 rounded-3xl shadow-sm p-5 border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Sync your calendar
                </h3>
                <p className="text-sm text-gray-600 mt-1 max-w-md">
                  Connect your job schedule to Google, Microsoft, or Apple Calendar so new jobs show up automatically.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    // TODO: Implement Google Calendar connection
                    console.log('Connect to Google Calendar');
                  }}
                  className="bg-white border-2 border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 font-medium text-sm whitespace-nowrap"
                  title="Connect to Google Calendar"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement Microsoft Calendar connection
                    console.log('Connect to Microsoft Calendar');
                  }}
                  className="bg-white border-2 border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 font-medium text-sm whitespace-nowrap"
                  title="Connect to Microsoft Calendar"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z"/>
                    <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                    <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                    <path fill="#FFB900" d="M13 13h10v10H13z"/>
                  </svg>
                  <span>Microsoft</span>
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement Apple Calendar connection
                    console.log('Connect to Apple Calendar');
                  }}
                  className="bg-white border-2 border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl hover:border-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 font-medium text-sm whitespace-nowrap"
                  title="Connect to Apple Calendar"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.08-.4C1.79 15.25 2.18 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </div>

            {/* Upcoming Jobs List */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">All Upcoming Jobs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {jobs
                      .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))
                      .map(job => (
                        <tr key={job.id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">
                              {new Date(job.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">{job.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">{job.customerName}</div>
                            <div className="text-sm text-gray-500">{job.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {job.service}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {job.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full shadow-sm ${
                              job.status === 'completed' 
                                ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200' :
                              job.status === 'in-progress' 
                                ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200' :
                              job.status === 'cancelled' 
                                ? 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200' :
                                'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border border-amber-200'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => {
                                  setEditingItem(job);
                                  setModalType('editJob');
                                  setIsModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1.5 rounded-lg transition-all"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirm({ show: true, type: 'job', id: job.id });
                                }}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 rounded-lg transition-all"
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

            {/* Availability Settings */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Adjust Availability</h3>
                  <p className="text-xs text-gray-500 mt-1 italic">Note: Default hours are set in the My Business tab</p>
                </div>
                <button
                  onClick={() => setIsAvailabilityCollapsed(!isAvailabilityCollapsed)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label={isAvailabilityCollapsed ? "Expand availability" : "Collapse availability"}
                >
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${isAvailabilityCollapsed ? '' : 'transform rotate-180'}`}
                  />
                </button>
              </div>

              {!isAvailabilityCollapsed && (
              <div className="space-y-6">
                {/* Week Selection with Navigation */}
                <div className="border border-slate-200 rounded-xl p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigateWeek(-1)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300 hover:border-gray-400"
                      title="Previous Week"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-700" />
                    </button>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800">
                        {(() => {
                          const weekStart = new Date(selectedWeek);
                          const weekEnd = new Date(weekStart);
                          weekEnd.setDate(weekStart.getDate() + 6);
                          return `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
                        })()}
                      </p>
                      {(() => {
                        const today = new Date();
                        const currentWeekStart = new Date(today);
                        currentWeekStart.setDate(today.getDate() - today.getDay());
                        const currentWeekStr = currentWeekStart.toISOString().split('T')[0];
                        const isCurrentWeek = selectedWeek === currentWeekStr;
                        return isCurrentWeek ? (
                          <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-md">
                            Current Week
                          </span>
                        ) : null;
                      })()}
                    </div>
                    <button
                      onClick={() => navigateWeek(1)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300 hover:border-gray-400"
                      title="Next Week"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-slate-200 rounded-2xl p-6 space-y-4 bg-slate-50/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                      <div className="w-1 h-5 bg-slate-400 rounded-full"></div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Weekly Hours</h4>
                    </div>
                  <div className="space-y-2">
                    {currentWeekHours.map((dayHours, idx) => (
                      <div key={dayHours.day} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all group">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={dayHours.enabled}
                            onChange={(e) => handleWeekHoursChange(idx, 'enabled', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-slate-600 focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 cursor-pointer" 
                          />
                          <span className="font-semibold text-gray-800 group-hover:text-slate-700 transition-colors">{dayHours.day}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="time" 
                            value={dayHours.startTime}
                            onChange={(e) => handleWeekHoursChange(idx, 'startTime', e.target.value)}
                            disabled={!dayHours.enabled}
                            className="border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 shadow-sm disabled:bg-gray-100 disabled:text-gray-400" 
                          />
                          <span className="text-gray-400 text-xs font-medium">to</span>
                          <input 
                            type="time" 
                            value={dayHours.endTime}
                            onChange={(e) => handleWeekHoursChange(idx, 'endTime', e.target.value)}
                            disabled={!dayHours.enabled}
                            className="border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 shadow-sm disabled:bg-gray-100 disabled:text-gray-400" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={saveWeekHours}
                      className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Save Week
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-6 space-y-5 bg-slate-50/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <div className="w-1 h-5 bg-slate-400 rounded-full"></div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Crew Capacity</h4>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Max jobs per day</label>
                    <input type="number" defaultValue={6} className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Priority window</label>
                    <select className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 shadow-sm">
                      <option>Morning (7 AM - 11 AM)</option>
                      <option>Midday (11 AM - 3 PM)</option>
                      <option>Afternoon (3 PM - 7 PM)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-1">Auto-open cancellations</p>
                      <p className="text-xs text-gray-500">Automatically offer freed slots to waitlisted customers.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-500 peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-500"></div>
                    </label>
                  </div>
                </div>
                </div>
              </div>
              )}
            </div>
          </div>
        )}

        {/* Ad Campaigns Tab - Removed */}
        {false && activeTab === 'campaigns' && (
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
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-3xl flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Campaign</span>
                </button>
                <button
                  onClick={() => exportToCSV('campaigns')}
                  className="bg-white border-2 border-gray-300 text-gray-700 px-5 py-2.5 rounded-3xl flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm font-medium"
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
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Campaign View Toggle */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-3xl w-fit">
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
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
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
                                    <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6">
                                      {campaign.adFiles && campaign.adFiles.length > 0 ? (
                                        <div className="space-y-4">
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {campaign.adFiles.map((file, index) => (
                                              <div key={index} className="relative bg-gray-50 rounded-3xl p-4">
                                                {file.type.startsWith('video/') ? (
                                                  <video
                                                    controls
                                                    className="w-full h-48 rounded-3xl object-cover"
                                                    src={file.url}
                                                  >
                                                    Your browser does not support the video tag.
                                                  </video>
                                                ) : (
                                                  <img
                                                    src={file.url}
                                                    alt={`Ad creative ${index + 1}`}
                                                    className="w-full h-48 rounded-3xl object-cover"
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
                                    <div className="bg-gray-50 rounded-3xl p-4">
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

            {/* Rejected Section */}
            {rejected.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Rejected</h3>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-32">Status</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Name</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Phone</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Address</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Contact Date/Time</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Job Requested</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Lead Source</th>
                        <th className="text-center px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100">Actions</th>
                        <th className="text-left px-4 py-5 text-xs font-bold text-gray-600 uppercase tracking-wider bg-slate-100 w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-50">
                    {rejected.map((lead) => {
                      const isChatExpanded = !!expandedChatPanels[lead.id];
                      const chatHeightClass = isChatExpanded ? 'min-h-[360px]' : 'min-h-[260px]';
                      const actionButtons = []; // Rejected leads have no actions
                      const chatMediumOptions = ['SMS', 'Facebook', 'Instagram'];
                      const selectedMedium = chatMediumByLead[lead.id] || 'SMS';
                      const leadFirstName = lead.firstName || lead.name?.split(' ')[0] || 'there';
                      const chatScripts = {
                        SMS: [
                          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for reaching out to Holy City Clean Co. If your plans change, we’re happy to revisit your estimate anytime.` },
                          { from: 'lead', text: "Thanks, I'll keep that in mind." },
                          { from: 'assistant', text: 'No problem at all—have a great day!' }
                        ],
                        Facebook: [
                          { from: 'assistant', text: `Hey ${leadFirstName}, totally understand you're passing for now.` },
                          { from: 'lead', text: 'Appreciate the quick quote though.' },
                          { from: 'assistant', text: 'Anytime—if you revisit the project later, just message us here.' }
                        ],
                        Instagram: [
                          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for letting us know you’re not moving forward right now.` },
                          { from: 'lead', text: 'You all were great—just not the right timing.' },
                          { from: 'assistant', text: 'We get it! Our DMs are always open if timing changes.' }
                        ]
                      };
                      const transcript = chatScripts[selectedMedium] || chatScripts.SMS;

                      const isExpanded = expandedLeads.has(lead.id);
                      const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                      let currentStageIndex = 0;
                      if (lead.status === 'New') {
                        currentStageIndex = 0;
                      } else if (lead.estimateData) {
                        if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                          currentStageIndex = 3;
                        } else if (lead.status === 'Contract Signed') {
                          currentStageIndex = 4;
                        } else if (lead.status === 'Completed') {
                          currentStageIndex = 5;
                        } else {
                          currentStageIndex = 2;
                        }
                      } else {
                        currentStageIndex = 1;
                      }
                      const currentStage = salesStages[currentStageIndex];
                      
                      const addressLines = formatAddressLines(lead.address || '');
                      
                      const serviceDisplay = (() => {
                        if (Array.isArray(lead.service) && lead.service.length > 0) {
                          return lead.service.map(s => mapServiceLabel(s)).join(', ');
                        } else if (lead.service && typeof lead.service === 'string') {
                          return mapServiceLabel(lead.service);
                        }
                        return 'No service specified';
                      })();
                      
                      return (
                        <React.Fragment key={lead.id}>
                        <tr 
                          onClick={(e) => toggleLeadExpansion(lead.id, e)}
                          className="bg-white border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-[1.575rem] text-center">
                            <div className="flex items-center justify-center">
                              <X className="w-4 h-4 text-red-500" strokeWidth={3} />
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-base font-bold text-gray-900">{lead.name}</span>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{lead.phone || 'No phone'}</span>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <div className="flex flex-col max-w-xs">
                              <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line1 || lead.address || 'No address'}</span>
                              {addressLines.line2 && (
                                <span className="text-sm font-medium text-slate-600 truncate">{addressLines.line2}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-slate-600">
                                {lead.dateAdded ? new Date(lead.dateAdded).toLocaleDateString() : 'No date'}
                              </span>
                              <span className="text-xs font-medium text-slate-500">
                                {lead.dateAdded ? new Date(lead.dateAdded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <span className="text-sm font-medium text-slate-600">{serviceDisplay}</span>
                          </td>
                          <td className="px-4 py-[1.575rem] text-center">
                            <div className="scale-[1.45546875] inline-flex">
                              <SourceBadge source={lead.source} />
                            </div>
                          </td>
                          <td className="px-4 py-[1.575rem] text-center">
                            {(() => {
                              const action = getLeadActionButton(lead);
                              if (!action) return null;
                              return (
                            <button
                              type="button"
                                  onClick={(e) => e.stopPropagation()}
                                  className={`px-3 py-1.5 text-[0.75rem] font-medium rounded-md transition-colors border whitespace-nowrap ${action.color}`}
                            >
                                  {action.label}
                            </button>
                              );
                            })()}
                          </td>
                          <td className="px-4 py-[1.575rem]">
                            <ChevronDown 
                              className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                            />
                          </td>
                        </tr>
                        {isExpanded && (
                        <tr>
                          <td colSpan="9" className="px-4 py-[1.575rem] bg-slate-50 border-b-2 border-slate-300">
                            <div className="grid grid-cols-1 lg:grid-cols-[0.25fr,1.35fr,0.4fr] gap-5 items-stretch">
                            <div className="flex flex-col h-full w-full max-w-[140px]">
                              <div className="flex flex-col items-center gap-0 flex-1 justify-center">
                            {(() => {
                                const salesStages = ['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'];
                                let currentStageIndex = 0;
                                if (lead.status === 'New') {
                                  currentStageIndex = 0;
                                } else if (lead.estimateData) {
                                  if (lead.status === 'Scheduled' || lead.status === 'In Progress') {
                                    currentStageIndex = 3;
                                  } else if (lead.status === 'Contract Signed') {
                                    currentStageIndex = 4;
                                  } else if (lead.status === 'Completed') {
                                    currentStageIndex = 5;
                                  } else {
                                    currentStageIndex = 2;
                                  }
                                } else {
                                  currentStageIndex = 1;
                                }
                                  return salesStages.map((stage, index) => {
                                  const isActive = index === currentStageIndex;
                                  const isCompleted = index < currentStageIndex;
                                  return (
                                    <div key={stage} className="flex flex-col items-center w-full">
                                      <div className={`w-full py-2 px-3 rounded-full text-center transition-all duration-200 relative ${
                                        isActive 
                                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 text-blue-800 font-bold shadow-md shadow-blue-200/50' 
                                          : isCompleted
                                          ? 'bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-300 text-slate-700 font-semibold shadow-sm'
                                          : 'bg-white border border-slate-300 text-slate-400 font-medium shadow-sm'
                                      }`}>
                                        <div className={`flex items-center justify-center gap-1.5 ${isActive ? 'text-xs' : 'text-[10px]'} leading-tight`}>
                                          {isCompleted && (
                                            <Check className="w-3 h-3 text-blue-600 font-bold shrink-0" strokeWidth={3} />
                                          )}
                                          <span>{stage}</span>
                                </div>
                                      </div>
                                      {index < salesStages.length - 1 && (
                                        <div className={`w-1 h-4 ${isCompleted ? 'bg-gradient-to-b from-blue-400 to-blue-500' : 'bg-gradient-to-b from-slate-300 to-slate-200'}`}></div>
                                      )}
                                    </div>
                                  );
                                });
                              })()}
                              </div>
                            </div>

                            <div className="flex flex-col h-full">
                              <div className="relative bg-white border-2 border-gray-300 rounded-3xl p-4 flex-1 flex flex-col h-full">
                                <div className="flex items-end justify-between mb-3 pb-2 border-b border-gray-200">
                                  <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-300 shadow-sm">
                                    {chatMediumOptions.map(option => {
                                      const isActive = option === selectedMedium;
                                      return (
                            <button
                                          key={option}
                                          type="button"
                                          onClick={() => setChatMediumByLead(prev => ({ ...prev, [lead.id]: option }))}
                                          className={`px-4 py-2 text-xs font-semibold border-r border-gray-300 last:border-r-0 transition-colors ${isActive ? 'bg-gray-600 text-white shadow-sm' : 'bg-transparent text-slate-600 hover:bg-gray-50 hover:text-slate-700'}`}
                                        >
                                          {option}
                            </button>
                                      );
                                    })}
                                  </div>
                                  <div className="text-[11px] uppercase tracking-wide text-blue-700 font-bold pr-1 pb-1 flex items-center gap-2">
                            <button
                                      type="button"
                                      onClick={(e) => handleEstimateClick(lead, e)}
                                      className="inline-flex items-center px-2.5 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-semibold shadow-sm hover:bg-blue-700"
                                    >
                                      <FileText className="w-3 h-3 mr-1" />
                                      Open Estimate
                            </button>
                                  </div>
                                </div>

                                <div className={`relative flex-1 flex flex-col rounded-2xl bg-blue-100/60 border border-blue-200/70 overflow-hidden ${chatHeightClass}`}>
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.7),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(191,219,254,0.7),_transparent_60%)] opacity-60 pointer-events-none" />
                                  <div className="relative flex-1 overflow-y-auto p-3 space-y-2">
                                    {transcript.map((msg, idx) => (
                                      <div
                                        key={idx}
                                        className={`flex ${msg.from === 'lead' ? 'justify-end' : 'justify-start'}`}
                                      >
                                        <div
                                          className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs shadow-sm ${
                                            msg.from === 'lead'
                                              ? 'bg-blue-600 text-white rounded-br-sm'
                                              : 'bg-white/90 backdrop-blur border border-blue-100 text-slate-800 rounded-bl-sm'
                                          }`}
                                        >
                                          {msg.text}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => toggleChatPanel(lead.id)}
                                    className="relative w-full text-center text-[11px] text-blue-700 font-semibold py-1.5 border-t border-blue-200 bg-blue-50/80 hover:bg-blue-100/80 flex items-center justify-center gap-1"
                                  >
                                    <span>{isChatExpanded ? 'Hide full thread' : 'Show full thread'}</span>
                                    <ChevronDown className={`w-3 h-3 transition-transform ${isChatExpanded ? 'rotate-180' : ''}`} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col h-full">
                              <div className="bg-white rounded-3xl border border-slate-200 p-4 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Lead Status</div>
                                    <div className="text-sm font-bold text-slate-900 mt-1">{currentStage}</div>
                                  </div>
                                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-semibold border border-red-200">
                                    <X className="w-3 h-3 mr-1" strokeWidth={3} />
                                    Rejected
                                  </div>
                                </div>
                                <div className="space-y-3 text-xs text-slate-600 flex-1">
                                  <p>
                                    This lead has been marked as <span className="font-semibold text-red-600">Rejected</span>. 
                                    You can still reference the conversation and estimate history if they return in the future.
                                  </p>
                                  <ul className="list-disc list-inside space-y-1">
                                    <li>Keep notes on why the lead was rejected.</li>
                                    <li>Use this for future targeting and campaign exclusions.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            </div>
                          </td>
                        </tr>
                        )}
                        </React.Fragment>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Ended Campaigns Table */}
            {campaignView === 'ended' && (
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
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
                                    <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6">
                                      {campaign.adFiles && campaign.adFiles.length > 0 ? (
                                        <div className="space-y-4">
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {campaign.adFiles.map((file, index) => (
                                              <div key={index} className="relative bg-gray-50 rounded-3xl p-4">
                                                {file.type.startsWith('video/') ? (
                                                  <video
                                                    controls
                                                    className="w-full h-48 rounded-3xl object-cover"
                                                    src={file.url}
                                                  >
                                                    Your browser does not support the video tag.
                                                  </video>
                                                ) : (
                                                  <img
                                                    src={file.url}
                                                    alt={`Ad creative ${index + 1}`}
                                                    className="w-full h-48 rounded-3xl object-cover"
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
                                    <div className="bg-gray-50 rounded-3xl p-4">
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
        {activeTab === 'pricingTool' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Pricing Tool</h2>
              </div>
            </div>

            {/* Pricing Format Section */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              {/* Pricing format rows */}
              <div className="space-y-3">
                {pricingFormats.map((format) => (
                    <div
                      key={format.id}
                      className="border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/60 space-y-3 relative"
                    >
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setPricingFormats((prev) => prev.filter((row) => row.id !== format.id))
                        }
                        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        aria-label="Remove pricing format"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {/* Service Header with Plus Button */}
                        <div className="pb-3 border-b border-slate-300">
                        <div className="flex items-center flex-wrap gap-2">
                          {format.services && format.services.length > 0 && (
                            <>
                            {format.services.map((service) => (
                              <span
                                key={service}
                                  className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 text-lg rounded-md border border-blue-200 font-medium"
                              >
                                {service}
                              </span>
                            ))}
                            </>
                          )}
                          <div className="relative pricing-dropdown-container shrink-0">
                            <button
                              type="button"
                              onClick={() => setOpenPricingDropdown(openPricingDropdown === format.id ? null : format.id)}
                              className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-5 h-5 text-blue-700" />
                            </button>
                            {openPricingDropdown === format.id && (
                                <div className="absolute z-50 w-64 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-96 overflow-y-auto pricing-dropdown-container left-0">
                                <div className="p-2 space-y-2">
                                  {/* Soft Washing Group */}
                                  <div>
                                    <div className="px-3 py-2 bg-slate-100 text-sm font-semibold text-gray-700 sticky top-0">
                                      Soft Washing
                                    </div>
                                    <div className="space-y-1">
                                      {[...softWashingServices, ...customSoftWashingServices].map((service) => (
                                        <label
                                          key={service}
                                          className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={format.services && format.services.includes(service)}
                                            onChange={(e) => {
                                              const currentServices = format.services || [];
                                              const newServices = e.target.checked
                                                ? [...currentServices, service]
                                                : currentServices.filter(s => s !== service);
                              setPricingFormats((prev) =>
                                prev.map((row) =>
                                                  row.id === format.id ? { ...row, services: newServices } : row
                                                )
                                              );
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                          <span className="ml-2 text-sm text-gray-700">{service}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Pressure Washing Group */}
                                  <div>
                                    <div className="px-3 py-2 bg-slate-100 text-sm font-semibold text-gray-700 sticky top-0">
                                      Pressure Washing
                                    </div>
                                    <div className="space-y-1">
                                      {[...pressureWashingServices, ...customPressureWashingServices].map((service) => (
                                        <label
                                          key={service}
                                          className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={format.services && format.services.includes(service)}
                                            onChange={(e) => {
                                              const currentServices = format.services || [];
                                              const newServices = e.target.checked
                                                ? [...currentServices, service]
                                                : currentServices.filter(s => s !== service);
                                              setPricingFormats((prev) =>
                                                prev.map((row) =>
                                                  row.id === format.id ? { ...row, services: newServices } : row
                                                )
                                              );
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                          <span className="ml-2 text-sm text-gray-700">{service}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Specialty Cleaning Group */}
                                  <div>
                                    <div className="px-3 py-2 bg-slate-100 text-sm font-semibold text-gray-700 sticky top-0">
                                      Specialty Cleaning
                                    </div>
                                    <div className="space-y-1">
                                      {[...specialtyCleaningServices, ...customSpecialtyCleaningServices].map((service) => (
                                        <label
                                          key={service}
                                          className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={format.services && format.services.includes(service)}
                                            onChange={(e) => {
                                              const currentServices = format.services || [];
                                              const newServices = e.target.checked
                                                ? [...currentServices, service]
                                                : currentServices.filter(s => s !== service);
                                              setPricingFormats((prev) =>
                                                prev.map((row) =>
                                                  row.id === format.id ? { ...row, services: newServices } : row
                                                )
                                              );
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                          <span className="ml-2 text-sm text-gray-700">{service}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                  
                                {/* Window Cleaning Group */}
                                {showWindowCleaning && (
                                  <div>
                                    <div className="px-3 py-2 bg-slate-100 text-sm font-semibold text-gray-700 sticky top-0">
                                      Window Cleaning
                                    </div>
                                    <div className="space-y-1">
                                      {[...windowCleaningServices, ...customWindowCleaningServices].map((service) => (
                                        <label
                                          key={service}
                                          className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={format.services && format.services.includes(service)}
                                            onChange={(e) => {
                                              const currentServices = format.services || [];
                                              const newServices = e.target.checked
                                                ? [...currentServices, service]
                                                : currentServices.filter(s => s !== service);
                                              setPricingFormats((prev) =>
                                                prev.map((row) =>
                                                  row.id === format.id ? { ...row, services: newServices } : row
                                                )
                                              );
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                          <span className="ml-2 text-sm text-gray-700">{service}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                  
                                  {/* Paver Sealing Group */}
                                  {showPaverSealing && (
                                    <div>
                                      <div className="px-3 py-2 bg-slate-100 text-sm font-semibold text-gray-700 sticky top-0">
                                        Paver Sealing
                                      </div>
                                      <div className="space-y-1">
                                        <label className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer">
                                          <input
                                            type="checkbox"
                                            checked={format.services && format.services.includes('Paver Sealing')}
                                            onChange={(e) => {
                                              const currentServices = format.services || [];
                                              const newServices = e.target.checked
                                                ? [...currentServices, 'Paver Sealing']
                                                : currentServices.filter(s => s !== 'Paver Sealing');
                                              setPricingFormats((prev) =>
                                                prev.map((row) =>
                                                  row.id === format.id ? { ...row, services: newServices } : row
                                                )
                                              );
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                          <span className="ml-2 text-sm text-gray-700">Paver Sealing</span>
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Pricing Structure Diagram */}
                      <div className="pt-3">
                        <div className="space-y-6">
                          {/* Collapsible Header */}
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-800">Pricing Variables</h3>
                            <button
                              type="button"
                              onClick={() => {
                                setPricingFormats((prev) =>
                                  prev.map((row) =>
                                    row.id === format.id
                                      ? { ...row, isPricingPanelsCollapsed: !row.isPricingPanelsCollapsed }
                                      : row
                                  )
                                );
                              }}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform ${format.isPricingPanelsCollapsed ? '' : 'rotate-180'}`} />
                            </button>
                          </div>
                          
                          {/* Four Sections in Two Rows - Collapsible */}
                          {!format.isPricingPanelsCollapsed && (
                            <>
                          {/* First Row: Rates and Expenses */}
                          <div className="flex items-center gap-4 mb-4 min-w-0 max-w-full overflow-hidden">
                            {['rates', 'expenses'].map((sectionType, sectionIndex) => {
                              const sectionLabel = sectionType.charAt(0).toUpperCase() + sectionType.slice(1);
                              const sectionOptions = pricingStructureOptions[sectionType];
                              const selectedItems = format.pricingStructure?.[sectionType] || [];
                              const dropdownKey = `${format.id}-${sectionType}`;
                              const isDropdownOpen = openPricingStructureDropdown[dropdownKey];
                              
                              return (
                                <React.Fragment key={sectionType}>
                                  <div className="flex-1 relative min-w-0 max-w-full overflow-hidden">
                                    {/* Section Label */}
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{sectionLabel}</label>
                                    
                                    {/* Section Dropdown */}
                                    <div className="relative mb-2 pricing-structure-dropdown-container">
                                      <button
                                        type="button"
                                        onClick={() => setOpenPricingStructureDropdown(prev => ({
                                          ...prev,
                                          [dropdownKey]: !prev[dropdownKey]
                                        }))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                                      >
                                        <span className={selectedItems.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                                          {selectedItems.length > 0
                                            ? `${selectedItems.length} selected`
                                            : `Select...`}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                                      </button>
                                      {isDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto pricing-structure-dropdown-container">
                                          <div className="p-2 space-y-1">
                                            {sectionOptions.map((option) => {
                                              // For rates, expenses, multipliers, and fees, check if option exists as object
                                              const needsValue = sectionType === 'rates' || sectionType === 'expenses' || sectionType === 'multipliers' || sectionType === 'fees';
                                              const isSelected = needsValue
                                                ? selectedItems.some(item => (typeof item === 'object' ? item.option : item) === option)
                                                : selectedItems.includes(option);
                                              return (
                                                <label
                                                  key={option}
                                                  className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                >
                                                  <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={(e) => {
                                                      const currentItems = format.pricingStructure?.[sectionType] || [];
                                                      if (needsValue) {
                                                        // For rates, expenses, multipliers, and fees, store as objects with value
                                                        if (sectionType === 'expenses') {
                                                          // For expenses, include perUnit
                                                          const newItems = e.target.checked
                                                            ? [...currentItems, { option, value: 0, perUnit: unitOptions[0] || 'Square Foot' }]
                                                            : currentItems.filter(item => (typeof item === 'object' ? item.option : item) !== option);
                                                          setPricingFormats((prev) =>
                                                            prev.map((row) =>
                                                              row.id === format.id
                                                                ? {
                                                                    ...row,
                                                                    pricingStructure: {
                                                                      ...row.pricingStructure,
                                                                      [sectionType]: newItems
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        } else {
                                                          // For rates, multipliers, and fees
                                                          const newItems = e.target.checked
                                                            ? [...currentItems, { option, value: 0 }]
                                                            : currentItems.filter(item => (typeof item === 'object' ? item.option : item) !== option);
                                                          setPricingFormats((prev) =>
                                                            prev.map((row) =>
                                                              row.id === format.id
                                                                ? {
                                                                    ...row,
                                                                    pricingStructure: {
                                                                      ...row.pricingStructure,
                                                                      [sectionType]: newItems
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        }
                                                      } else {
                                                        // This shouldn't happen now, but keep for safety
                                                        const newItems = e.target.checked
                                                          ? [...currentItems, option]
                                                          : currentItems.filter(item => item !== option);
                                                        setPricingFormats((prev) =>
                                                          prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }
                                                    }}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    onClick={(e) => e.stopPropagation()}
                                                  />
                                                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                                                </label>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Selected Items Panel */}
                                    <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm min-h-[240px] min-w-0 max-w-full overflow-x-auto">
                                      {selectedItems.length > 0 ? (
                                        <div className="space-y-3">
                                          {selectedItems.map((item, index) => {
                                            // For rates, expenses, multipliers, and fees, item is an object
                                            const needsValue = sectionType === 'rates' || sectionType === 'expenses' || sectionType === 'multipliers' || sectionType === 'fees';
                                            const itemOption = needsValue && typeof item === 'object' ? item.option : item;
                                            const itemValue = needsValue && typeof item === 'object' ? (item.value || 0) : null;
                                            const itemPerUnit = sectionType === 'expenses' && typeof item === 'object' ? (item.perUnit || unitOptions[0] || 'Square Foot') : null;
                                            const itemKey = needsValue ? `${itemOption}-${index}` : item;
                                            
                                            return (
                                              <div
                                                key={itemKey}
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow min-w-0 max-w-full overflow-hidden"
                                              >
                                                <span className="text-sm font-medium min-w-[80px] sm:min-w-[100px] max-w-[100px] sm:max-w-[120px] truncate shrink-0">{itemOption}</span>
                                                {sectionType === 'rates' && (
                                                  <div className="flex items-center gap-1 flex-1">
                                                    <span className="text-sm text-gray-500">$</span>
                            <input
                              type="number"
                              step="0.01"
                                                      min="0"
                                                      value={itemValue === 0 ? '' : itemValue}
                                                      onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const newValue = inputValue === '' ? 0 : (parseFloat(inputValue) || 0);
                                                        const newItems = selectedItems.map(i => {
                                                          if (typeof i === 'object' && i.option === itemOption) {
                                                            return { ...i, value: newValue };
                                                          }
                                                          return i;
                                                        });
                                setPricingFormats((prev) =>
                                  prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      onBlur={(e) => {
                                                        if (e.target.value === '') {
                                                          const newItems = selectedItems.map(i => {
                                                            if (typeof i === 'object' && i.option === itemOption) {
                                                              return { ...i, value: 0 };
                                                            }
                                                            return i;
                                                          });
                                                          setPricingFormats((prev) =>
                                                            prev.map((row) =>
                                                              row.id === format.id
                                                                ? {
                                                                    ...row,
                                                                    pricingStructure: {
                                                                      ...row.pricingStructure,
                                                                      [sectionType]: newItems
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        }
                                                      }}
                                                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                      placeholder="0.00"
                            />
                          </div>
                                                )}
                                                {sectionType === 'multipliers' && (
                                                  <div className="flex items-center gap-1 flex-1">
                                                    <input
                                                      type="number"
                                                      step="0.1"
                                                      min="0"
                                                      max="100"
                                                      value={itemValue === 0 ? '' : itemValue}
                                                      onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const newValue = inputValue === '' ? 0 : (parseFloat(inputValue) || 0);
                                                        const newItems = selectedItems.map(i => {
                                                          if (typeof i === 'object' && i.option === itemOption) {
                                                            return { ...i, value: newValue };
                                                          }
                                                          return i;
                                                        });
                              setPricingFormats((prev) =>
                                prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      onBlur={(e) => {
                                                        if (e.target.value === '') {
                                                          const newItems = selectedItems.map(i => {
                                                            if (typeof i === 'object' && i.option === itemOption) {
                                                              return { ...i, value: 0 };
                                                            }
                                                            return i;
                                                          });
                                                          setPricingFormats((prev) =>
                                                            prev.map((row) =>
                                                              row.id === format.id
                                                                ? {
                                                                    ...row,
                                                                    pricingStructure: {
                                                                      ...row.pricingStructure,
                                                                      [sectionType]: newItems
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        }
                                                      }}
                                                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                      placeholder="0"
                                                    />
                                                    <span className="text-sm text-gray-500">%</span>
                                                  </div>
                                                )}
                                                {sectionType === 'expenses' && (
                                                  <div className="flex items-center gap-1.5 flex-1 min-w-0 max-w-full overflow-hidden">
                                                    <span className="text-sm text-gray-500 shrink-0">$</span>
                                                    <input
                                                      type="number"
                                                      step="0.01"
                                                      min="0"
                                                      value={itemValue === 0 ? '' : itemValue}
                                                      onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const newValue = inputValue === '' ? 0 : (parseFloat(inputValue) || 0);
                                                        const newItems = selectedItems.map(i => {
                                                          if (typeof i === 'object' && i.option === itemOption) {
                                                            return { ...i, value: newValue };
                                                          }
                                                          return i;
                                                        });
                                                        setPricingFormats((prev) =>
                                                          prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      className="w-16 sm:w-20 px-1.5 sm:px-2 py-1.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shrink-0"
                                                      placeholder="0.00"
                                                    />
                                                    <span className="text-xs text-gray-600 shrink-0 whitespace-nowrap">Per</span>
                                                    <select
                                                      value={itemPerUnit}
                                                      onChange={(e) => {
                                                        const newPerUnit = e.target.value;
                                                        const newItems = selectedItems.map(i => {
                                                          if (typeof i === 'object' && i.option === itemOption) {
                                                            return { ...i, perUnit: newPerUnit };
                                                          }
                                                          return i;
                                                        });
                                                        setPricingFormats((prev) =>
                                                          prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      className="flex-1 min-w-0 max-w-full px-1.5 sm:px-2 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                                    >
                                                      {unitOptions.map(unit => (
                                                        <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                        </div>
                                                )}
                                                {sectionType === 'fees' && (
                                                  <div className="flex items-center gap-1 flex-1">
                                                    <span className="text-sm text-gray-500">$</span>
                            <input
                              type="number"
                              step="0.01"
                                                      min="0"
                                                      value={itemValue === 0 ? '' : itemValue}
                                                      onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const newValue = inputValue === '' ? 0 : (parseFloat(inputValue) || 0);
                                                        const newItems = selectedItems.map(i => {
                                                          if (typeof i === 'object' && i.option === itemOption) {
                                                            return { ...i, value: newValue };
                                                          }
                                                          return i;
                                                        });
                                setPricingFormats((prev) =>
                                  prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      onBlur={(e) => {
                                                        if (e.target.value === '') {
                                                          const newItems = selectedItems.map(i => {
                                                            if (typeof i === 'object' && i.option === itemOption) {
                                                              return { ...i, value: 0 };
                                                            }
                                                            return i;
                                                          });
                                                          setPricingFormats((prev) =>
                                                            prev.map((row) =>
                                                              row.id === format.id
                                                                ? {
                                                                    ...row,
                                                                    pricingStructure: {
                                                                      ...row.pricingStructure,
                                                                      [sectionType]: newItems
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        }
                                                      }}
                                                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0.00"
                            />
                          </div>
                                                )}
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const newItems = needsValue
                                                      ? selectedItems.filter(i => (typeof i === 'object' ? i.option : i) !== itemOption)
                                                      : selectedItems.filter(i => i !== item);
                                                    setPricingFormats((prev) =>
                                                      prev.map((row) =>
                                                        row.id === format.id
                                                          ? {
                                                              ...row,
                                                              pricingStructure: {
                                                                ...row.pricingStructure,
                                                                [sectionType]: newItems
                                                              }
                                                            }
                                                          : row
                                                      )
                                                    );
                                                  }}
                                                  className="p-1 text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors ml-1 shrink-0"
                                                  aria-label="Remove item"
                                                >
                                                  <Trash2 className="w-4 h-4" />
                                                </button>
                        </div>
                                            );
                                          })}
                                        </div>
                                      ) : (
                                        <div className="text-xs text-gray-400 text-center py-4">No items selected</div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Plus Sign Between Rates and Expenses */}
                                  {sectionIndex === 0 && (
                                    <div className="flex items-center justify-center">
                                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center shrink-0">
                                        <Plus className="w-5 h-5 text-gray-500" />
                                      </div>
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                          
                          {/* Second Row: Multipliers and Fees */}
                          <div className="flex items-center gap-4 min-w-0 max-w-full overflow-hidden">
                            {['multipliers', 'fees'].map((sectionType, sectionIndex) => {
                              const sectionLabel = sectionType.charAt(0).toUpperCase() + sectionType.slice(1);
                              const sectionOptions = pricingStructureOptions[sectionType];
                              const selectedItems = format.pricingStructure?.[sectionType] || [];
                              const dropdownKey = `${format.id}-${sectionType}`;
                              const isDropdownOpen = openPricingStructureDropdown[dropdownKey];
                              
                              return (
                                <React.Fragment key={sectionType}>
                                  <div className="flex-1 relative min-w-0 max-w-full overflow-hidden">
                                    {/* Section Label */}
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{sectionLabel}</label>
                                    
                                    {/* Section Dropdown */}
                                    <div className="relative mb-2 pricing-structure-dropdown-container">
                                      <button
                                        type="button"
                                        onClick={() => setOpenPricingStructureDropdown(prev => ({
                                          ...prev,
                                          [dropdownKey]: !prev[dropdownKey]
                                        }))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                                      >
                                        <span className={selectedItems.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                                          {selectedItems.length > 0
                                            ? `${selectedItems.length} selected`
                                            : `Select...`}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                                      </button>
                                      {isDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto pricing-structure-dropdown-container">
                                          <div className="p-2 space-y-1">
                                            {sectionOptions.map((option) => {
                                              const needsValue = sectionType === 'multipliers' || sectionType === 'fees';
                                              const isSelected = needsValue
                                                ? selectedItems.some(item => (typeof item === 'object' ? item.option : item) === option)
                                                : selectedItems.includes(option);
                                              return (
                                                <label
                                                  key={option}
                                                  className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                >
                                                  <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={(e) => {
                                                      const currentItems = format.pricingStructure?.[sectionType] || [];
                                                      if (needsValue) {
                                                        const newItems = e.target.checked
                                                          ? [...currentItems, { option, value: 0 }]
                                                          : currentItems.filter(item => (typeof item === 'object' ? item.option : item) !== option);
                                                        setPricingFormats((prev) =>
                                                          prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      } else {
                                                        const newItems = e.target.checked
                                                          ? [...currentItems, option]
                                                          : currentItems.filter(item => item !== option);
                                                        setPricingFormats((prev) =>
                                                          prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }
                                                    }}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    onClick={(e) => e.stopPropagation()}
                                                  />
                                                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                                                </label>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Selected Items Panel */}
                                    <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm min-h-[240px] min-w-0 max-w-full overflow-x-auto">
                                      {selectedItems.length > 0 ? (
                                        <div className="space-y-3">
                                          {selectedItems.map((item, index) => {
                                            const needsValue = sectionType === 'multipliers' || sectionType === 'fees';
                                            const itemOption = needsValue && typeof item === 'object' ? item.option : item;
                                            const itemValue = needsValue && typeof item === 'object' ? (item.value || 0) : null;
                                            const itemPerUnit = sectionType === 'expenses' && typeof item === 'object' ? (item.perUnit || unitOptions[0] || 'Square Foot') : null;
                                            const itemKey = needsValue ? `${itemOption}-${index}` : item;
                                            
                                            return (
                                              <div
                                                key={itemKey}
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow min-w-0 max-w-full overflow-hidden"
                                              >
                                                <span className="text-sm font-medium min-w-[80px] sm:min-w-[100px] max-w-[100px] sm:max-w-[120px] truncate shrink-0">{itemOption}</span>
                                                {sectionType === 'multipliers' && (
                                                  <div className="flex items-center gap-1 flex-1">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="100"
                                                      value={itemValue === 0 ? '' : itemValue}
                                                      onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const newValue = inputValue === '' ? 0 : (parseFloat(inputValue) || 0);
                                                        const newItems = selectedItems.map(i => {
                                                          if (typeof i === 'object' && i.option === itemOption) {
                                                            return { ...i, value: newValue };
                                                          }
                                                          return i;
                                                        });
                                setPricingFormats((prev) =>
                                  prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      onBlur={(e) => {
                                                        if (e.target.value === '') {
                                                          const newItems = selectedItems.map(i => {
                                                            if (typeof i === 'object' && i.option === itemOption) {
                                                              return { ...i, value: 0 };
                                                            }
                                                            return i;
                                                          });
                                                          setPricingFormats((prev) =>
                                                            prev.map((row) =>
                                                              row.id === format.id
                                                                ? {
                                                                    ...row,
                                                                    pricingStructure: {
                                                                      ...row.pricingStructure,
                                                                      [sectionType]: newItems
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        }
                                                      }}
                                                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="0"
                            />
                                                    <span className="text-sm text-gray-500">%</span>
                          </div>
                                                )}
                                                {sectionType === 'expenses' && (
                                                  <div className="flex items-center gap-1.5 flex-1 min-w-0 max-w-full overflow-hidden">
                                                    <span className="text-sm text-gray-500 shrink-0">$</span>
                                                    <input
                                                      type="number"
                                                      step="0.01"
                                                      min="0"
                                                      value={itemValue === 0 ? '' : itemValue}
                                                      onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const newValue = inputValue === '' ? 0 : (parseFloat(inputValue) || 0);
                                                        const newItems = selectedItems.map(i => {
                                                          if (typeof i === 'object' && i.option === itemOption) {
                                                            return { ...i, value: newValue };
                                                          }
                                                          return i;
                                                        });
                                                        setPricingFormats((prev) =>
                                                          prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      className="w-16 sm:w-20 px-1.5 sm:px-2 py-1.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shrink-0"
                                                      placeholder="0.00"
                                                    />
                                                    <span className="text-xs text-gray-600 shrink-0 whitespace-nowrap">Per</span>
                                                    <select
                                                      value={itemPerUnit}
                                                      onChange={(e) => {
                                                        const newPerUnit = e.target.value;
                                                        const newItems = selectedItems.map(i => {
                                                          if (typeof i === 'object' && i.option === itemOption) {
                                                            return { ...i, perUnit: newPerUnit };
                                                          }
                                                          return i;
                                                        });
                                                        setPricingFormats((prev) =>
                                                          prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      className="flex-1 min-w-0 max-w-full px-1.5 sm:px-2 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                                    >
                                                      {unitOptions.map(unit => (
                                                        <option key={unit} value={unit}>{unit}</option>
                                                      ))}
                                                    </select>
                        </div>
                                                )}
                                                {sectionType === 'fees' && (
                                                  <div className="flex items-center gap-1 flex-1">
                                                    <span className="text-sm text-gray-500">$</span>
                            <input
                              type="number"
                                                      step="0.01"
                              min="0"
                                                      value={itemValue === 0 ? '' : itemValue}
                                                      onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        const newValue = inputValue === '' ? 0 : (parseFloat(inputValue) || 0);
                                                        const newItems = selectedItems.map(i => {
                                                          if (typeof i === 'object' && i.option === itemOption) {
                                                            return { ...i, value: newValue };
                                                          }
                                                          return i;
                                                        });
                                setPricingFormats((prev) =>
                                  prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                                                  pricingStructure: {
                                                                    ...row.pricingStructure,
                                                                    [sectionType]: newItems
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      onBlur={(e) => {
                                                        if (e.target.value === '') {
                                                          const newItems = selectedItems.map(i => {
                                                            if (typeof i === 'object' && i.option === itemOption) {
                                                              return { ...i, value: 0 };
                                                            }
                                                            return i;
                                                          });
                                                          setPricingFormats((prev) =>
                                                            prev.map((row) =>
                                                              row.id === format.id
                                                                ? {
                                                                    ...row,
                                                                    pricingStructure: {
                                                                      ...row.pricingStructure,
                                                                      [sectionType]: newItems
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        }
                                                      }}
                                                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                      placeholder="0.00"
                                                    />
                          </div>
                        )}
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    const newItems = needsValue
                                                      ? selectedItems.filter(i => (typeof i === 'object' ? i.option : i) !== itemOption)
                                                      : selectedItems.filter(i => i !== item);
                                                    setPricingFormats((prev) =>
                                                      prev.map((row) =>
                                                        row.id === format.id
                                                          ? {
                                                              ...row,
                                                              pricingStructure: {
                                                                ...row.pricingStructure,
                                                                [sectionType]: newItems
                                                              }
                                                            }
                                                          : row
                                                      )
                                                    );
                                                  }}
                                                  className="p-1 text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors ml-1 shrink-0"
                                                  aria-label="Remove item"
                                                >
                                                  <Trash2 className="w-4 h-4" />
                                                </button>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      ) : (
                                        <div className="text-xs text-gray-400 text-center py-4">No items selected</div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Plus Sign Between Multipliers and Fees */}
                                  {sectionIndex === 0 && (
                                    <div className="flex items-center justify-center">
                                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center shrink-0">
                                        <Plus className="w-5 h-5 text-gray-500" />
                                      </div>
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                          </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              
              {/* Add Item Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setPricingFormats((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        services: [],
                        price: '',
                        unit: '',
                        basePrice: '',
                        jobDifficultyMultiplier: '',
                        storyMultiplier: '',
                        isPricingPanelsCollapsed: false,
                        pricingStructure: {
                          rates: [], // Array of objects: { option: string, value: number }
                          expenses: [], // Array of objects: { option: string, value: number, perUnit: string }
                          multipliers: [], // Array of objects: { option: string, value: number } (percentage)
                          fees: [] // Array of objects: { option: string, value: number } (one-time dollar value)
                        },
                      },
                    ]);
                  }}
                  className="px-4 py-2 flex items-center justify-center gap-2 rounded-lg bg-slate-50/60 border border-slate-200 text-slate-700 hover:bg-slate-100/60 shadow-sm text-sm font-medium"
                  aria-label="Add Item"
                >
                  <span className="text-lg font-bold leading-none">+</span>
                  <span>Add Item</span>
                </button>
              </div>
              
              {/* Save Button */}
              <div className="flex justify-end items-center mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={() => {
                    console.log('Saving pricing formats:', pricingFormats);
                    // Here you can add API call to save the pricing formats
                    alert('Pricing formats saved successfully!');
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm h-[2.5rem]"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Run Promotion Section */}
              <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Run Promotion</h2>
              </div>
            <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
              {/* Promotion rows */}
              <div className="space-y-3">
                {promotions.map((promotion) => (
                  <div
                    key={promotion.id}
                    className="border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/60 space-y-3 relative"
                  >
                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setPromotions((prev) => prev.filter((row) => row.id !== promotion.id))
                      }
                      className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                      aria-label="Remove promotion"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {/* First Row - Promotion Type */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="w-full md:w-1/3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Promotion Type</label>
                        <select
                          value={promotion.promotionType}
                          onChange={(e) =>
                            setPromotions((prev) =>
                              prev.map((row) =>
                                row.id === promotion.id ? { ...row, promotionType: e.target.value } : row
                              )
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="percentOff">Percent Off</option>
                          <option value="package">Package Deal</option>
                          <option value="buyGet">Buy/Get</option>
                        </select>
                      </div>
                    </div>

                    {/* Second Row - Promotion Details */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      {promotion.promotionType === 'percentOff' ? (
                        <div className="w-full">
                          <label className="block text-xs font-medium text-gray-600 mb-2">Percent Off</label>
                          <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex gap-8 items-start">
                              {/* Service Selection - Multiple Services Stacked */}
                              <div className="flex flex-col items-start gap-3 flex-1">
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                      <Wrench className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-semibold text-gray-800 block">Service</span>
                                      <span className="text-xs text-gray-500">Select services to discount</span>
                                    </div>
                                  </div>
                                  <div className="relative">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const dropdownKey = `${promotion.id}-percent-service`;
                                        setOpenPackageFormulaDropdown(openPackageFormulaDropdown === dropdownKey ? null : dropdownKey);
                                      }}
                                      className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200 transition-colors"
                                      aria-label="Add service"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                    {openPackageFormulaDropdown === `${promotion.id}-percent-service` && (
                                      <div className="absolute z-50 mt-1 right-0 w-64 bg-white border border-gray-300 rounded-xl shadow-lg max-h-96 overflow-y-auto">
                                        <div className="p-2 space-y-1">
                                          {[...softWashingServices, ...customSoftWashingServices, ...pressureWashingServices, ...customPressureWashingServices, ...specialtyCleaningServices, ...customSpecialtyCleaningServices, ...(showWindowCleaning ? [...windowCleaningServices, ...customWindowCleaningServices] : []), ...(showPaverSealing ? ['Paver Sealing'] : [])].filter(service => !(promotion.percentOffServices || []).includes(service)).map((service) => (
                                            <button
                                              key={service}
                                              type="button"
                                              onClick={() => {
                                                const currentServices = promotion.percentOffServices || [];
                                                setPromotions((prev) =>
                                                  prev.map((row) =>
                                                    row.id === promotion.id ? { ...row, percentOffServices: [...currentServices, service] } : row
                                                  )
                                                );
                                                setOpenPackageFormulaDropdown(null);
                                              }}
                                              className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50 text-gray-700"
                                            >
                                              {service}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                  {(promotion.percentOffServices || []).length === 0 && (
                                    <div className="text-xs text-gray-400 italic py-2 px-3 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                      Click + to add services
                                    </div>
                                  )}
                                  {(promotion.percentOffServices || []).map((service, index) => (
                                    <div key={index} className="flex items-center gap-2" data-service-index={index}>
                                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                                        <span>{service}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updatedServices = (promotion.percentOffServices || []).filter((_, i) => i !== index);
                                            setPromotions((prev) =>
                                              prev.map((row) =>
                                                row.id === promotion.id ? { ...row, percentOffServices: updatedServices } : row
                                              )
                                            );
                                          }}
                                          className="p-0.5 text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                                          aria-label="Remove service"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Vertical Divider with Arrow - Always show */}
                              <div className="flex items-center self-stretch px-4">
                                <div className="flex flex-col items-center gap-2">
                                  <div className="w-px h-full min-h-[2rem] bg-gray-300"></div>
                                  <ArrowRight className="w-5 h-5 text-gray-400" />
                                  <div className="w-px h-full min-h-[2rem] bg-gray-300"></div>
                                </div>
                              </div>

                              {/* Percent Off Selection - Always show */}
                              <div className="flex flex-col items-start gap-3 flex-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <Percent className="w-4 h-4 text-gray-600" />
                                  </div>
                                  <div>
                                    <span className="text-sm font-semibold text-gray-800 block">Discount</span>
                                    <span className="text-xs text-gray-500">Set discount percentage</span>
                                  </div>
                                </div>
                                <div className="relative w-full percent-dropdown-container">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const dropdownKey = `${promotion.id}-percent-main`;
                                          setOpenPercentDropdown(openPercentDropdown === dropdownKey ? null : dropdownKey);
                                        }}
                                        className="px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center gap-2 w-full"
                                      >
                                        <span>{promotion.percentOff === '100' || promotion.percentOff === 100 ? 'Free' : `${promotion.percentOff || 5}% off`}</span>
                                        <ChevronDown className="w-4 h-4 text-blue-600 ml-auto" />
                                      </button>
                                      {openPercentDropdown === `${promotion.id}-percent-main` && (
                                        <div className="absolute z-50 mt-1 top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                                          <div className="py-1">
                                            {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95].map((percent) => (
                                              <button
                                                key={percent}
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setPromotions((prev) =>
                                                    prev.map((row) =>
                                                      row.id === promotion.id ? { ...row, percentOff: percent.toString() } : row
                                                    )
                                                  );
                                                  setOpenPercentDropdown(null);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                                                  (promotion.percentOff || '5') === percent.toString() ? 'bg-blue-50 text-blue-700' : ''
                                                }`}
                                              >
                                                {percent}% off
                                              </button>
                                            ))}
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setPromotions((prev) =>
                                                  prev.map((row) =>
                                                    row.id === promotion.id ? { ...row, percentOff: '100' } : row
                                                  )
                                                );
                                                setOpenPercentDropdown(null);
                                              }}
                                              className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                                                promotion.percentOff === '100' || promotion.percentOff === 100 ? 'bg-blue-50 text-blue-700' : ''
                                              }`}
                                            >
                                              Free
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      ) : (promotion.promotionType === 'package' || promotion.promotionType === 'buyGet') ? (
                        <div className="w-full">
                          <label className="block text-xs font-medium text-gray-600 mb-2">
                            {promotion.promotionType === 'buyGet' ? 'Buy/Get Formula' : 'Package Formula'}
                          </label>
                          <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                            {promotion.promotionType === 'package' ? (
                              <div className="space-y-4">
                                {/* Package Deal - Service Selection */}
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-2">
                                    Select Services for Package
                                  </label>
                                  <div className="relative">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const dropdownKey = `${promotion.id}-package-services`;
                                        setOpenPackageFormulaDropdown(openPackageFormulaDropdown === dropdownKey ? null : dropdownKey);
                                      }}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                                    >
                                      <span className={promotion.packageServices && promotion.packageServices.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                                        {promotion.packageServices && promotion.packageServices.length > 0
                                          ? `${promotion.packageServices.length} service${promotion.packageServices.length > 1 ? 's' : ''} selected`
                                          : 'Select services...'}
                                      </span>
                                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openPackageFormulaDropdown === `${promotion.id}-package-services` ? 'transform rotate-180' : ''}`} />
                                    </button>
                                    {openPackageFormulaDropdown === `${promotion.id}-package-services` && (
                                      <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-96 overflow-y-auto">
                                        <div className="p-2 space-y-1">
                                          {[...softWashingServices, ...customSoftWashingServices, ...pressureWashingServices, ...customPressureWashingServices, ...specialtyCleaningServices, ...customSpecialtyCleaningServices, ...(showWindowCleaning ? [...windowCleaningServices, ...customWindowCleaningServices] : []), ...(showPaverSealing ? ['Paver Sealing'] : [])].filter(service => !(promotion.packageServices || []).includes(service)).map((service) => (
                                            <button
                                              key={service}
                                              type="button"
                                              onClick={() => {
                                                const currentServices = promotion.packageServices || [];
                                                setPromotions((prev) =>
                                                  prev.map((row) =>
                                                    row.id === promotion.id
                                                      ? {
                                                          ...row,
                                                          packageServices: [...currentServices, service]
                                                        }
                                                      : row
                                                  )
                                                );
                                                setOpenPackageFormulaDropdown(null);
                                              }}
                                              className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50 text-gray-700"
                                            >
                                              {service}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  {/* Selected Services Display */}
                                  {(promotion.packageServices || []).length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {(promotion.packageServices || []).map((service, index) => (
                                        <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm">
                                          <span>{service}</span>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const updatedServices = (promotion.packageServices || []).filter((_, i) => i !== index);
                                              setPromotions((prev) =>
                                                prev.map((row) =>
                                                  row.id === promotion.id
                                                    ? {
                                                        ...row,
                                                        packageServices: updatedServices
                                                      }
                                                    : row
                                                )
                                              );
                                            }}
                                            className="p-0.5 text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                                            aria-label="Remove service"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                {/* Package Price Input */}
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-2">
                                    Package Price
                                  </label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                                    <input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={promotion.packagePrice || ''}
                                      onChange={(e) => {
                                        setPromotions((prev) =>
                                          prev.map((row) =>
                                            row.id === promotion.id
                                              ? { ...row, packagePrice: e.target.value }
                                              : row
                                          )
                                        );
                                      }}
                                      placeholder="0.00"
                                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Total price for all selected services in this package
                                  </p>
                                </div>
                              </div>
                            ) : (
                            <div className="flex gap-8 items-start">
                              {/* Buy Label and Initial Services - Multiple Services Stacked */}
                              <div className="flex flex-col items-start gap-3 flex-1">
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                      <ShoppingCart className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-semibold text-gray-800 block">Buy</span>
                                      <span className="text-xs text-gray-500">Services customer purchases</span>
                                    </div>
                                  </div>
                                  <div className="relative">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const dropdownKey = `${promotion.id}-initial`;
                                        setOpenPackageFormulaDropdown(openPackageFormulaDropdown === dropdownKey ? null : dropdownKey);
                                      }}
                                      className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200 transition-colors"
                                      aria-label="Add service"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                    {openPackageFormulaDropdown === `${promotion.id}-initial` && (
                                      <div className="absolute z-50 mt-1 right-0 w-64 bg-white border border-gray-300 rounded-xl shadow-lg max-h-96 overflow-y-auto">
                                        <div className="p-2 space-y-1">
                                          {[...softWashingServices, ...customSoftWashingServices, ...pressureWashingServices, ...customPressureWashingServices, ...specialtyCleaningServices, ...customSpecialtyCleaningServices, ...(showWindowCleaning ? [...windowCleaningServices, ...customWindowCleaningServices] : []), ...(showPaverSealing ? ['Paver Sealing'] : [])].filter(service => !(promotion.packageFormula?.initialServices || []).includes(service)).map((service) => (
                                            <button
                                              key={service}
                                              type="button"
                                              onClick={() => {
                                                const currentServices = promotion.packageFormula?.initialServices || [];
                                                setPromotions((prev) =>
                                                  prev.map((row) =>
                                                    row.id === promotion.id
                                                      ? {
                                                          ...row,
                                                          packageFormula: {
                                                            ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                            initialServices: [...currentServices, service]
                                                          }
                                                        }
                                                      : row
                                                  )
                                                );
                                                setOpenPackageFormulaDropdown(null);
                                              }}
                                              className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50 text-gray-700"
                                            >
                                              {service}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                  {(promotion.packageFormula?.initialServices || []).length === 0 && (
                                    <div className="text-xs text-gray-400 italic py-2 px-3 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                      Click + to add services
                                    </div>
                                  )}
                                  {(promotion.packageFormula?.initialServices || []).map((service, index) => (
                                    <div key={index} className="flex items-center gap-2" data-service-index={index}>
                                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                                        <span>{service}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updatedServices = (promotion.packageFormula?.initialServices || []).filter((_, i) => i !== index);
                                            setPromotions((prev) =>
                                              prev.map((row) =>
                                                row.id === promotion.id
                                                  ? {
                                                      ...row,
                                                      packageFormula: {
                                                        ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                        initialServices: updatedServices
                                                      }
                                                    }
                                                  : row
                                              )
                                            );
                                          }}
                                          className="p-0.5 text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                                          aria-label="Remove service"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Vertical Divider with Arrow - Always show */}
                              <div className="flex items-center self-stretch px-4">
                                <div className="flex flex-col items-center gap-2">
                                  <div className="w-px h-full min-h-[2rem] bg-gray-300"></div>
                                  <ArrowRight className="w-5 h-5 text-gray-400" />
                                  <div className="w-px h-full min-h-[2rem] bg-gray-300"></div>
                                </div>
                              </div>

                              {/* Get Label and Additional Services - Always show */}
                              <div className="flex flex-col items-start gap-3 flex-1">
                                  <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                        <Gift className="w-4 h-4 text-gray-600" />
                                      </div>
                                      <div>
                                        <span className="text-sm font-semibold text-gray-800 block">Get</span>
                                        <span className="text-xs text-gray-500">Bonus services with discount</span>
                                      </div>
                                    </div>
                                    <div className="relative">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const dropdownKey = `${promotion.id}-add-service`;
                                          setOpenPackageFormulaDropdown(openPackageFormulaDropdown === dropdownKey ? null : dropdownKey);
                                        }}
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200 transition-colors"
                                        aria-label="Add discount service"
                                      >
                                        <Plus className="w-4 h-4" />
                                      </button>
                                      {openPackageFormulaDropdown === `${promotion.id}-add-service` && (
                                        <div className="absolute z-50 mt-1 right-0 w-64 bg-white border border-gray-300 rounded-xl shadow-lg max-h-96 overflow-y-auto">
                                          <div className="p-2 space-y-1">
                                            {[...softWashingServices, ...customSoftWashingServices, ...pressureWashingServices, ...customPressureWashingServices, ...specialtyCleaningServices, ...customSpecialtyCleaningServices, ...(showWindowCleaning ? [...windowCleaningServices, ...customWindowCleaningServices] : []), ...(showPaverSealing ? ['Paver Sealing'] : [])].filter(service => !(promotion.packageFormula?.additionalServices || []).some(as => as.service === service)).map((service) => (
                                              <button
                                                key={service}
                                                type="button"
                                                onClick={() => {
                                                  const currentAdditional = promotion.packageFormula?.additionalServices || [];
                                                  setPromotions((prev) =>
                                                    prev.map((row) =>
                                                      row.id === promotion.id
                                                        ? {
                                                            ...row,
                                                            packageFormula: {
                                                              ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                              additionalServices: [...currentAdditional, { service: service, percentOff: 5 }]
                                                            }
                                                          }
                                                        : row
                                                    )
                                                  );
                                                  setOpenPackageFormulaDropdown(null);
                                                }}
                                                className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-50 text-gray-700"
                                              >
                                                {service}
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2 w-full">
                                    {(promotion.packageFormula?.additionalServices || []).length === 0 && (
                                      <div className="text-xs text-gray-400 italic py-2 px-3 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                        Click + to add bonus services
                                      </div>
                                    )}
                                    {(promotion.packageFormula?.additionalServices || []).map((additionalService, index) => (
                                      <div key={index} className="flex items-center gap-2">
                                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                                          <span className="text-sm font-medium">{additionalService.service}</span>
                                          <div className="relative percent-dropdown-container">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const dropdownKey = `${promotion.id}-percent-${index}`;
                                                setOpenPercentDropdown(openPercentDropdown === dropdownKey ? null : dropdownKey);
                                              }}
                                              className="text-sm font-medium bg-blue-50 border-2 border-blue-200 rounded-md px-3 py-1 pr-8 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center gap-2"
                                            >
                                              <span>{additionalService.percentOff === 100 ? 'Free' : `${additionalService.percentOff}% off`}</span>
                                              <ChevronDown className="w-4 h-4 text-blue-600" />
                                            </button>
                                            {openPercentDropdown === `${promotion.id}-percent-${index}` && (
                                              <div className="absolute z-50 mt-1 top-full left-0 w-32 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                                                <div className="py-1">
                                                  {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95].map((percent) => (
                                                    <button
                                                      key={percent}
                                                      type="button"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        const updatedAdditional = [...(promotion.packageFormula?.additionalServices || [])];
                                                        updatedAdditional[index] = { ...updatedAdditional[index], percentOff: percent };
                                                        setPromotions((prev) =>
                                                          prev.map((row) =>
                                                            row.id === promotion.id
                                                              ? {
                                                                  ...row,
                                                                  packageFormula: {
                                                                    ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                    additionalServices: updatedAdditional
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                        setOpenPercentDropdown(null);
                                                      }}
                                                      className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                                                        additionalService.percentOff === percent ? 'bg-blue-50 text-blue-700' : ''
                                                      }`}
                                                    >
                                                      {percent}% off
                                                    </button>
                                                  ))}
                                                  <button
                                                    type="button"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      const updatedAdditional = [...(promotion.packageFormula?.additionalServices || [])];
                                                      updatedAdditional[index] = { ...updatedAdditional[index], percentOff: 100 };
                                                      setPromotions((prev) =>
                                                        prev.map((row) =>
                                                          row.id === promotion.id
                                                            ? {
                                                                ...row,
                                                                packageFormula: {
                                                                  ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                  additionalServices: updatedAdditional
                                                                }
                                                              }
                                                            : row
                                                        )
                                                      );
                                                      setOpenPercentDropdown(null);
                                                    }}
                                                    className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                                                      additionalService.percentOff === 100 ? 'bg-blue-50 text-blue-700' : ''
                                                    }`}
                                                  >
                                                    Free
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const updatedAdditional = (promotion.packageFormula?.additionalServices || []).filter((_, i) => i !== index);
                                              setPromotions((prev) =>
                                                prev.map((row) =>
                                                  row.id === promotion.id
                                                    ? {
                                                        ...row,
                                                        packageFormula: {
                                                          ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                          additionalServices: updatedAdditional
                                                        }
                                                      }
                                                    : row
                                                )
                                              );
                                            }}
                                            className="p-1 text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors ml-1"
                                            aria-label="Remove service"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                            </div>
                          </div>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Third Row - Date Range */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="w-full md:w-1/2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                        <input
                          type="date"
                          value={promotion.startDate}
                          onChange={(e) =>
                            setPromotions((prev) =>
                              prev.map((row) =>
                                row.id === promotion.id ? { ...row, startDate: e.target.value } : row
                              )
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                        <input
                          type="date"
                          value={promotion.endDate}
                          onChange={(e) =>
                            setPromotions((prev) =>
                              prev.map((row) =>
                                row.id === promotion.id ? { ...row, endDate: e.target.value } : row
                              )
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add Item Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setPromotions((prev) => [
                      ...prev,
                      {
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
                      },
                    ]);
                  }}
                  className="px-4 py-2 flex items-center justify-center gap-2 rounded-lg bg-slate-50/60 border border-slate-200 text-slate-700 hover:bg-slate-100/60 shadow-sm text-sm font-medium"
                  aria-label="Add Item"
                >
                  <span className="text-lg font-bold leading-none">+</span>
                  <span>Add Item</span>
                </button>
              </div>
              
              {/* Save Button */}
              <div className="flex justify-end items-center mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={() => {
                    console.log('Saving promotions:', promotions);
                    alert('Promotions saved successfully!');
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm h-[2.5rem]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Lead-to-Customer Rate', value: `${((customers.length / Math.max(leads.length, 1)) * 100).toFixed(1)}%`, sub: 'Past 30 days' },
                { label: 'Avg. Response Time', value: '1h 18m', sub: 'Across channels' },
                { label: 'Estimated Revenue', value: `$${stats.totalRevenue.toFixed(0)}`, sub: 'Projected this quarter' },
                { label: 'Campaign ROI', value: '3.4x', sub: 'Google + Meta' },
              ].map((metric) => (
                <div key={metric.label} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{metric.sub}</p>
              </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
              <div>
                    <h3 className="text-lg font-medium text-gray-900">Lead Funnel</h3>
                    <p className="text-sm text-gray-500">Conversion performance across stages</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {['New', 'Contacted', 'Estimate Sent', 'Scheduled', 'Completed'].map((stage, index) => {
                    const stageCount = leads.filter((lead) => lead.status === stage).length;
                    const percentage = Math.round((stageCount / Math.max(leads.length, 1)) * 100);
                    return (
                      <div key={stage}>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">{stage}</span>
                          <span className="text-gray-500">{stageCount} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: ['#93c5fd', '#a5b4fc', '#c4b5fd', '#fcd34d', '#86efac'][index],
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Channel Performance</h3>
                <div className="space-y-4 text-sm">
                  {campaignPlatforms.slice(0, 4).map((platform) => (
                    <div key={platform} className="flex justify-between items-center">
                <div>
                        <p className="font-medium text-gray-800">{platform}</p>
                        <p className="text-gray-500">Leads this month</p>
                </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{Math.floor(Math.random() * 30) + 10}</p>
                        <p className="text-green-500">+{Math.floor(Math.random() * 15)}%</p>
                  </div>
                </div>
                  ))}
              </div>
            </div>
            </div>
          </div>
        )}


        {/* Smart Chat Tab */}
        {activeTab === 'smartChat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Smart Chat</h2>
                  <p className="text-gray-600">AI assistant that drafts replies, summaries, and outreach ideas for you.</p>
                </div>
              </div>
              <div className="px-6 py-3 border-b border-gray-100 flex flex-wrap items-center gap-3 bg-slate-50">
                {[
                  { label: 'Facebook', color: 'bg-blue-600' },
                  { label: 'Instagram', color: 'bg-gradient-to-r from-pink-500 to-yellow-500' },
                  { label: 'Angie\'s List', color: 'bg-green-600' },
                  { label: 'Nextdoor', color: 'bg-emerald-600' },
                  { label: 'Email', color: 'bg-slate-700' },
                  { label: 'SMS', color: 'bg-indigo-500' },
                ].map((channel) => (
                <button
                    key={channel.label}
                    type="button"
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity ${channel.color}`}
                    onClick={() => handleSmartChatSend(null, `Draft a ${channel.label} message for:`)}
                  >
                    {channel.label}
                </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-white">
                {smartChatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-lg rounded-3xl px-4 py-3 text-sm shadow-sm whitespace-pre-line ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      {message.text}
                      <div
                        className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                        }`}
                      >
                        {message.timestamp}
              </div>
                    </div>
                  </div>
                ))}
                {smartChatIsTyping && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Bot className="w-4 h-4 text-gray-400" />
                    <span>Smart Chat is drafting a response…</span>
                  </div>
                )}
              </div>
              <form onSubmit={handleSmartChatSend} className="border-t border-gray-200 p-4 flex items-center space-x-3 bg-white">
                <textarea
                  value={smartChatInput}
                  onChange={(e) => setSmartChatInput(e.target.value)}
                  rows={2}
                  className="flex-1 resize-none px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ask Smart Chat to draft a reply, summarize jobs, or plan outreach…"
                />
                <button
                  type="submit"
                  disabled={!smartChatInput.trim()}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-3xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </button>
              </form>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 space-y-6">
                <div>
                <h3 className="text-lg font-medium text-gray-900">Quick Prompts</h3>
                <p className="text-sm text-gray-600">Start a conversation with a single tap.</p>
                <div className="mt-4 space-y-3">
                  {smartChatPrompts.map((prompt) => (
                <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSmartChatSend(null, prompt)}
                      className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-3xl text-sm text-gray-700 transition-colors"
                    >
                      {prompt}
                </button>
                  ))}
                </div>
                  </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Smart Chat can help you:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Draft personalized replies to leads</li>
                  <li>• Summarize upcoming jobs or campaign performance</li>
                  <li>• Brainstorm SMS/email scripts in seconds</li>
                  <li>• Keep conversations consistent across channels</li>
                </ul>
                </div>
              </div>
            </div>
        )}


        {/* My Business Tab */}
        {activeTab === 'business' && (
          <div className="space-y-6">
            {/* Quote Section */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold text-blue-900">Note:</span> The details you enter in the My Business section will be used to train your AI Sales Agent. Please provide complete and accurate information for the best performance.
                </p>
              </div>
            </div>

            {/* Company Information Section */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
              </div>
              
              <div className="space-y-6">
                {/* Contact Details */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => setCollapsedContactDetails(!collapsedContactDetails)}
                >
                  <div className={`flex items-center gap-3 ${!collapsedContactDetails ? 'mb-6' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Contact Details</h3>
                    {(() => {
                      const { completed, total } = getContactDetailsCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedContactDetails ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedContactDetails && (
                    <div className="space-y-5" onClick={(e) => e.stopPropagation()}>
                      {/* Company Details Section */}
                      <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4">
                        <h4 className="text-base font-semibold text-gray-900 mb-4">Company Details</h4>
                        <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={companyInfo.companyName}
                          onChange={(e) => updateCompanyInfo('companyName', e.target.value)}
                          placeholder="Enter company name"
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={companyInfo.phone}
                          onChange={(e) => updateCompanyInfo('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={companyInfo.email}
                          onChange={(e) => updateCompanyInfo('email', e.target.value)}
                          placeholder="contact@company.com"
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          value={companyInfo.website}
                          onChange={(e) => updateCompanyInfo('website', e.target.value)}
                          placeholder="https://www.yourcompany.com"
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                        />
                          </div>
                        </div>
                      </div>

                      {/* Address Section */}
                      <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4">
                        <h4 className="text-base font-semibold text-gray-900 mb-4">Address</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                            <input
                              type="text"
                              value={companyInfo.street}
                              onChange={(e) => updateCompanyInfo('street', e.target.value)}
                              placeholder="123 Main Street"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address Line 2 (Optional)</label>
                            <input
                              type="text"
                              value={companyInfo.street2}
                              onChange={(e) => updateCompanyInfo('street2', e.target.value)}
                              placeholder="Apartment, suite, unit, building, floor, etc."
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                              <input
                                type="text"
                                value={companyInfo.city}
                                onChange={(e) => updateCompanyInfo('city', e.target.value)}
                                placeholder="City"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                              <input
                                type="text"
                                value={companyInfo.state}
                                onChange={(e) => updateCompanyInfo('state', e.target.value)}
                                placeholder="State"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                            <input
                              type="text"
                              value={companyInfo.zip}
                              onChange={(e) => updateCompanyInfo('zip', e.target.value)}
                              placeholder="12345"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Social Media Section */}
                      <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-4">
                        <h4 className="text-base font-semibold text-gray-900 mb-4">Social Media</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                            <input
                              type="url"
                              value={companyInfo.facebook}
                              onChange={(e) => updateCompanyInfo('facebook', e.target.value)}
                              placeholder="https://www.facebook.com/yourpage"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                            <input
                              type="url"
                              value={companyInfo.instagram}
                              onChange={(e) => updateCompanyInfo('instagram', e.target.value)}
                              placeholder="https://www.instagram.com/yourhandle"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nextdoor</label>
                            <input
                              type="url"
                              value={companyInfo.nextdoor}
                              onChange={(e) => updateCompanyInfo('nextdoor', e.target.value)}
                              placeholder="Nextdoor profile URL"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Angie's List</label>
                            <input
                              type="url"
                              value={companyInfo.angiesList}
                              onChange={(e) => updateCompanyInfo('angiesList', e.target.value)}
                              placeholder="Angie's List profile URL"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                            <input
                              type="url"
                              value={companyInfo.twitter}
                              onChange={(e) => updateCompanyInfo('twitter', e.target.value)}
                              placeholder="https://twitter.com/yourhandle"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Brand Identity */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => setCollapsedBrandIdentity(!collapsedBrandIdentity)}
                >
                  <div className={`flex items-center gap-3 ${!collapsedBrandIdentity ? 'mb-6' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Brand Identity</h3>
                    {(() => {
                      const { completed, total } = getBrandIdentityCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedBrandIdentity ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedBrandIdentity && (
                    <div className="space-y-5" onClick={(e) => e.stopPropagation()}>
                      {/* Brand Identity Content - Gray Box */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Slogan</label>
                        <input
                          type="text"
                          value={companyInfo.companySlogan}
                          onChange={(e) => updateCompanyInfo('companySlogan', e.target.value)}
                          placeholder="Enter your company slogan"
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Years</label>
                            <input
                              type="number"
                              min="0"
                              value={companyInfo.experienceYears}
                              onChange={(e) => updateCompanyInfo('experienceYears', e.target.value)}
                              placeholder="0"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Months</label>
                            <input
                              type="number"
                              min="0"
                              max="11"
                              value={companyInfo.experienceMonths}
                              onChange={(e) => updateCompanyInfo('experienceMonths', e.target.value)}
                              placeholder="0"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Jobs Completed</label>
                            <input
                              type="number"
                              min="0"
                              value={companyInfo.jobsCompleted}
                              onChange={(e) => updateCompanyInfo('jobsCompleted', e.target.value)}
                              placeholder="0"
                              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                            />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Company Qualities - NOT wrapped in gray box */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Company Qualities (select 3)</label>
                        <div className="flex flex-wrap gap-3">
                          {[...companyQualities, ...customCompanyQualities].map((quality) => {
                            const isSelected = companyInfo.whatMakesDifferent.includes(quality);
                            const isDisabled = !isSelected && companyInfo.whatMakesDifferent.length >= 3;
                            return (
                              <button
                                key={quality}
                                type="button"
                                onClick={() => toggleCompanyQuality(quality)}
                                disabled={isDisabled}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                                  isSelected
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                    : isDisabled
                                    ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                } shadow-sm hover:shadow-md`}
                              >
                                <span>{quality}</span>
                              </button>
                            );
                          })}
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all">
                            <input
                              type="text"
                              value={newCompanyQuality}
                              onChange={(e) => setNewCompanyQuality(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addCustomCompanyQuality()}
                              placeholder="Add quality..."
                              className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm w-32"
                            />
                            <button
                              type="button"
                              onClick={addCustomCompanyQuality}
                              className="text-blue-600 hover:text-blue-700"
                              disabled={!newCompanyQuality.trim()}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {companyInfo.whatMakesDifferent.length > 0 && (
                          <p className="mt-3 text-xs text-slate-500">
                            Selected: {companyInfo.whatMakesDifferent.length} of 3
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Areas Served */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => setCollapsedAreasServed(!collapsedAreasServed)}
                >
                  <div className={`flex items-center gap-3 ${!collapsedAreasServed ? 'mb-6' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Areas Served</h3>
                    {(() => {
                      const { completed, total } = getAreasServedCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedAreasServed ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedAreasServed && (
                    <div className="space-y-5" onClick={(e) => e.stopPropagation()}>
                      {/* Areas Served Content - Gray Box */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search and Add Cities</label>
                        <div className="relative city-search-container">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                          <input
                            type="text"
                            value={citySearchTerm}
                            onChange={handleCitySearchChange}
                            onFocus={() => {
                              if (citySearchTerm.length >= 2 && citySearchResults.length > 0) {
                                setIsCitySearchOpen(true);
                              }
                            }}
                            placeholder="Search for a US city..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                          />
                          {isLoadingCities && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                            </div>
                          )}
                          {isCitySearchOpen && citySearchResults.length > 0 && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                              {citySearchResults.map((city, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => selectCity(city)}
                                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors text-sm text-gray-700 border-b border-slate-100 last:border-b-0"
                                >
                                  <div className="font-medium">{city.name}</div>
                                  <div className="text-xs text-gray-500">{city.state}</div>
                                </button>
                              ))}
                            </div>
                          )}
                          {isCitySearchOpen && !isLoadingCities && citySearchTerm.length >= 2 && citySearchResults.length === 0 && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-xl p-4">
                              {citySearchError ? (
                                <p className="text-sm text-gray-400 text-center">Connection Error</p>
                              ) : (
                                <p className="text-sm text-gray-500 text-center">No cities found. Try a different search term.</p>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          Start typing to see city recommendations
                        </p>
                      </div>

                      {companyInfo.areasServed.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Selected Areas</label>
                          <div className="flex flex-wrap gap-3">
                            {companyInfo.areasServed.map((area) => (
                              <div
                                key={area}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                              >
                                <span>{area}</span>
                                <button
                                  type="button"
                                  onClick={() => removeArea(area)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Operating Hours */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => setCollapsedOperatingHours(!collapsedOperatingHours)}
                >
                  <div className={`flex items-center gap-3 ${!collapsedOperatingHours ? 'mb-6' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Operating Hours</h3>
                    {(() => {
                      const { completed, total } = getOperatingHoursCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedOperatingHours ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedOperatingHours && (
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                      <p className="text-sm text-gray-600 mb-4">
                        Set your default hours of operation
                      </p>
                      <div className="space-y-3">
                        {companyInfo.operatingHours.map((hours, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="w-24 font-medium text-gray-900 text-sm">
                              {hours.day}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={hours.closed}
                                onChange={(e) => {
                                  const updatedHours = [...companyInfo.operatingHours];
                                  updatedHours[index] = {
                                    ...updatedHours[index],
                                    closed: e.target.checked,
                                    open: e.target.checked ? 'Closed' : updatedHours[index].open || '8:00 AM',
                                    close: e.target.checked ? 'Closed' : updatedHours[index].close || '6:00 PM'
                                  };
                                  updateCompanyInfo('operatingHours', updatedHours);
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <label className="text-sm text-gray-700">Closed</label>
                            </div>
                            {!hours.closed && (
                              <>
                                <div className="flex items-center gap-2">
                                  <label className="text-xs text-gray-600">Open:</label>
                                  <input
                                    type="text"
                                    value={hours.open}
                                    onChange={(e) => {
                                      const updatedHours = [...companyInfo.operatingHours];
                                      updatedHours[index] = { ...updatedHours[index], open: e.target.value };
                                      updateCompanyInfo('operatingHours', updatedHours);
                                    }}
                                    placeholder="8:00 AM"
                                    className="w-24 px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                  />
                                </div>
                                <span className="text-gray-400">-</span>
                                <div className="flex items-center gap-2">
                                  <label className="text-xs text-gray-600">Close:</label>
                                  <input
                                    type="text"
                                    value={hours.close}
                                    onChange={(e) => {
                                      const updatedHours = [...companyInfo.operatingHours];
                                      updatedHours[index] = { ...updatedHours[index], close: e.target.value };
                                      updateCompanyInfo('operatingHours', updatedHours);
                                    }}
                                    placeholder="6:00 PM"
                                    className="w-24 px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                  />
                                </div>
                              </>
                            )}
                            {hours.closed && (
                              <span className="text-sm text-gray-500 italic">Closed</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Certifications */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => setCollapsedCertifications(!collapsedCertifications)}
                >
                  <div className={`flex items-center gap-3 ${!collapsedCertifications ? 'mb-6' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Certifications</h3>
                    {(() => {
                      const { completed, total } = getCertificationsCompletion();
                      const isComplete = completed === total && total > 0;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedCertifications ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedCertifications && (
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                      {companyInfo.certificationsList.length > 0 && companyInfo.certificationsList.map((cert, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="font-semibold text-gray-900">
                            Certification {index + 1}
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                            <input
                              type="text"
                              value={cert.certificationName}
                              onChange={(e) => {
                                const updated = [...companyInfo.certificationsList];
                                updated[index].certificationName = e.target.value;
                                updateCompanyInfo('certificationsList', updated);
                              }}
                              placeholder="Enter certification name"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Organization</label>
                            <input
                              type="text"
                              value={cert.certifyingOrganization}
                              onChange={(e) => {
                                const updated = [...companyInfo.certificationsList];
                                updated[index].certifyingOrganization = e.target.value;
                                updateCompanyInfo('certificationsList', updated);
                              }}
                              placeholder="Enter organization"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                            />
                          </div>

                          <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = companyInfo.certificationsList.filter((_, i) => i !== index);
                                  updateCompanyInfo('certificationsList', updated);
                                }}
                                className="px-2 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                title="Remove certification"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          updateCompanyInfo('certificationsList', [
                            ...companyInfo.certificationsList,
                            { certificationName: '', certifyingOrganization: '' }
                          ]);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all border border-dashed border-blue-300"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">Add Certification</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Insurance */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => setCollapsedInsurance(!collapsedInsurance)}
                >
                  <div className={`flex items-center gap-3 ${!collapsedInsurance ? 'mb-6' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Insurance</h3>
                    {(() => {
                      const { completed, total } = getInsuranceCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedInsurance ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedInsurance && (
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            value={companyInfo.insuranceStatus}
                            onChange={(e) => updateCompanyInfo('insuranceStatus', e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white shadow-sm"
                          >
                            <option value="">Select status...</option>
                            <option value="Insured">Insured</option>
                            <option value="Uninsured">Uninsured</option>
                          </select>
                        </div>

                        <div className="pt-4 border-t border-slate-200 mt-4">
                          <h4 className="text-base font-semibold text-gray-900 mb-4">Add Coverage</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                              <input
                                type="text"
                                value={companyInfo.insuranceCompany}
                                onChange={(e) => updateCompanyInfo('insuranceCompany', e.target.value)}
                                placeholder="Enter company name"
                                disabled={!companyInfo.insuranceStatus || companyInfo.insuranceStatus === 'Uninsured'}
                                className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                  !companyInfo.insuranceStatus || companyInfo.insuranceStatus === 'Uninsured' 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-white shadow-sm'
                                }`}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
                              <input
                                type="text"
                                value={companyInfo.insurancePolicyNumber}
                                onChange={(e) => updateCompanyInfo('insurancePolicyNumber', e.target.value)}
                                placeholder="Enter policy number"
                                disabled={!companyInfo.insuranceStatus || companyInfo.insuranceStatus === 'Uninsured'}
                                className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                  !companyInfo.insuranceStatus || companyInfo.insuranceStatus === 'Uninsured' 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-white shadow-sm'
                                }`}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Limits ($)</label>
                              <input
                                type="text"
                                value={companyInfo.insuranceCoverageLimits}
                                onChange={(e) => updateCompanyInfo('insuranceCoverageLimits', e.target.value)}
                                placeholder="Enter coverage limits"
                                disabled={!companyInfo.insuranceStatus || companyInfo.insuranceStatus === 'Uninsured'}
                                className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                  !companyInfo.insuranceStatus || companyInfo.insuranceStatus === 'Uninsured' 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : 'bg-white shadow-sm'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Guarantee/Warranty */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => setCollapsedGuaranteeWarranty(!collapsedGuaranteeWarranty)}
                >
                  <div className={`flex items-center gap-3 ${!collapsedGuaranteeWarranty ? 'mb-6' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Guarantee/Warranty</h3>
                    {(() => {
                      const { completed, total } = getGuaranteeWarrantyCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedGuaranteeWarranty ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedGuaranteeWarranty && (
                    <div className="space-y-5" onClick={(e) => e.stopPropagation()}>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                        <div>
                          <textarea
                            rows={2}
                            value={companyInfo.guaranteeWarranty}
                            onChange={(e) => updateCompanyInfo('guaranteeWarranty', e.target.value)}
                            placeholder="Describe your guarantee or warranty policy..."
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm resize-y bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Online Reviews */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => setCollapsedOnlineReviews(!collapsedOnlineReviews)}
                >
                  <div className={`flex items-center gap-3 ${!collapsedOnlineReviews ? 'mb-6' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Online Reviews</h3>
                    {(() => {
                      const { completed, total } = getOnlineReviewsCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedOnlineReviews ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedOnlineReviews && (
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                      {[
                        { key: 'google', label: 'Google' },
                        { key: 'facebook', label: 'Facebook' },
                        { key: 'nextdoor', label: 'Nextdoor' },
                        { key: 'yelp', label: 'Yelp' },
                        { key: 'homeadvisor', label: 'HomeAdvisor' }
                      ].map((platform) => (
                        <div key={platform.key} className="grid grid-cols-4 gap-4 items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="font-semibold text-gray-900 min-w-[120px]">
                            {platform.label}
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Avg Rating (out of 5)</label>
                            <input
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              value={companyInfo.onlineReviews?.[platform.key]?.averageRating || ''}
                              onChange={(e) => {
                                const updatedReviews = {
                                  ...companyInfo.onlineReviews,
                                  [platform.key]: {
                                    ...companyInfo.onlineReviews[platform.key],
                                    averageRating: e.target.value
                                  }
                                };
                                updateCompanyInfo('onlineReviews', updatedReviews);
                              }}
                              placeholder="0.0"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Total Reviews</label>
                            <input
                              type="number"
                              min="0"
                              value={companyInfo.onlineReviews?.[platform.key]?.totalReviews || ''}
                              onChange={(e) => {
                                const updatedReviews = {
                                  ...companyInfo.onlineReviews,
                                  [platform.key]: {
                                    ...companyInfo.onlineReviews[platform.key],
                                    totalReviews: e.target.value
                                  }
                                };
                                updateCompanyInfo('onlineReviews', updatedReviews);
                              }}
                              placeholder="0"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">5-Star Reviews</label>
                            <input
                              type="number"
                              min="0"
                              value={companyInfo.onlineReviews?.[platform.key]?.fiveStarReviews || ''}
                              onChange={(e) => {
                                const updatedReviews = {
                                  ...companyInfo.onlineReviews,
                                  [platform.key]: {
                                    ...companyInfo.onlineReviews[platform.key],
                                    fiveStarReviews: e.target.value
                                  }
                                };
                                updateCompanyInfo('onlineReviews', updatedReviews);
                              }}
                              placeholder="0"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Save Button for Company Information */}
              <div className="flex justify-end mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={() => {
                    handleSaveCompanyInfo();
                    console.log('Saving company information:', companyInfo);
                    alert('Company information saved successfully!');
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Services Offered Section */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
              
              <div className="space-y-4">
                {/* Soft Washing */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => {
                    if (showSoftWashing) {
                      setCollapsedSoftWashing(!collapsedSoftWashing);
                    } else {
                      setShowSoftWashing(true);
                      setCollapsedSoftWashing(false);
                    }
                  }}
                >
                  <div className={`flex items-center gap-3 ${showSoftWashing && !collapsedSoftWashing ? 'mb-4' : ''}`}>
                    <input
                      type="checkbox"
                      checked={showSoftWashing}
                      onChange={(e) => {
                        e.stopPropagation();
                        setShowSoftWashing(e.target.checked);
                        if (e.target.checked) {
                          setCollapsedSoftWashing(false);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="text-lg font-semibold text-gray-900 flex-1">
                      Soft Washing
                    </label>
                    {showSoftWashing && (
                      <div className="flex items-center justify-center">
                        <ChevronDown 
                          className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedSoftWashing ? 'transform rotate-180' : ''}`}
                        />
                      </div>
                    )}
                  </div>
                  {showSoftWashing && !collapsedSoftWashing && (
                    <div className="mt-4 space-y-6" onClick={(e) => e.stopPropagation()}>
                      {/* Services as Cards */}
                      <div>
                        <label className="block text-base font-semibold text-gray-900 mb-3">Services</label>
                        <div className="flex flex-col md:flex-row gap-4">
                          {[0, 1].map(columnIndex => (
                            <div key={columnIndex} className="flex-1 space-y-4">
                              {[...softWashingServices, ...customSoftWashingServices]
                                .filter((_, index) => index % 2 === columnIndex)
                                .map((service) => {
                                  const isSelected = selectedSoftWashing.includes(service);
                                  const serviceChemList = serviceChemicals[service] || [];
                                  return (
                                    <div
                                      key={service}
                                      className={`border-2 rounded-lg p-4 transition-all shadow-sm hover:shadow-md ${
                                        isSelected
                                          ? 'border-blue-400 bg-blue-50 shadow-md'
                                          : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 mb-3">
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => toggleService(service, 'softWashing')}
                                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label className="text-sm font-semibold text-gray-900 cursor-pointer flex-1">
                                          {service}
                                        </label>
                                      </div>
                                      {isSelected && (
                                        <div className="mt-3 space-y-2">
                                          <label className="block text-xs font-medium text-gray-700 mb-2">Chemicals Used:</label>
                                          {serviceChemList.length > 0 && (
                                            <div className="space-y-2 mb-3">
                                              {serviceChemList.map((chem, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs bg-white p-2 rounded border border-slate-200">
                                                  <span className="flex-1">{chem.chemical}</span>
                                                  <select
                                                    value={chem.concentration}
                                                    onChange={(e) => updateChemicalConcentration(service, chem.chemical, e.target.value)}
                                                    className="px-2 py-1 border border-gray-300 rounded text-xs w-20"
                                                    onClick={(e) => e.stopPropagation()}
                                                  >
                                                    {['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '12.5%', '15%', '20%', '25%', '50%'].map(pct => (
                                                      <option key={pct} value={pct}>{pct}</option>
                                                    ))}
                                                  </select>
                                                  <button
                                                    type="button"
                                                    onClick={() => removeChemicalFromService(service, chem.chemical)}
                                                    className="text-red-600 hover:text-red-800"
                                                  >
                                                    <X className="w-3 h-3" />
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">Add Chemical:</label>
                                            <select
                                              onChange={(e) => {
                                                if (e.target.value) {
                                                  addChemicalToService(service, e.target.value);
                                                  e.target.value = '';
                                                }
                                              }}
                                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                              defaultValue=""
                                            >
                                              <option value="">Select a chemical...</option>
                                              {allChemicals
                                                .filter(chem => !serviceChemList.find(c => c.chemical === chem))
                                                .map(chemical => (
                                                  <option key={chemical} value={chemical}>{chemical}</option>
                                                ))}
                                            </select>
                                          </div>
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">PSI:</label>
                                            <input
                                              type="text"
                                              value={servicePSI[service] || ''}
                                              onChange={(e) => updateServicePSI(service, e.target.value)}
                                              placeholder="Enter PSI (e.g., 1500)"
                                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              {/* Add Service Button for this column */}
                              {columnIndex === 0 && (
                                <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 hover:bg-slate-100 transition-all">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={newSoftWashingService}
                                      onChange={(e) => setNewSoftWashingService(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && addCustomSoftWashingService()}
                                      placeholder="Add service..."
                                      className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-slate-400"
                                    />
                                    <button
                                      type="button"
                                      onClick={addCustomSoftWashingService}
                                      className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                                      disabled={!newSoftWashingService.trim()}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Surfaces Section */}
                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-base font-semibold text-gray-900">Surfaces</label>
                          <button
                            type="button"
                            onClick={() => {
                              const allSurfaces = [...softWashingSurfaces, ...customSoftWashingSurfaces];
                              const allSelected = allSurfaces.every(s => selectedSoftWashingSurfaces.includes(s));
                              if (allSelected) {
                                setSelectedSoftWashingSurfaces([]);
                              } else {
                                setSelectedSoftWashingSurfaces(allSurfaces);
                              }
                            }}
                            className="text-xs text-gray-500 hover:text-blue-600 underline transition-colors"
                          >
                            Select All
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {[...softWashingSurfaces, ...customSoftWashingSurfaces].map((surface) => {
                            const isSelected = selectedSoftWashingSurfaces.includes(surface);
                            return (
                              <button
                                key={surface}
                                type="button"
                                onClick={() => toggleSoftWashingSurface(surface)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                                  isSelected
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                } shadow-sm hover:shadow-md`}
                              >
                                {isSelected && <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />}
                                <span>{surface}</span>
                              </button>
                            );
                          })}
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all">
                            <input
                              type="text"
                              value={newSoftWashingSurface}
                              onChange={(e) => setNewSoftWashingSurface(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addCustomSoftWashingSurface()}
                              placeholder="Add surface..."
                              className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm w-32"
                            />
                            <button
                              type="button"
                              onClick={addCustomSoftWashingSurface}
                              className="text-blue-600 hover:text-blue-700"
                              disabled={!newSoftWashingSurface.trim()}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Safety and Preventative Measures Section */}
                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-base font-semibold text-gray-900">Safety and Preventative Measures</label>
                          <button
                            type="button"
                            onClick={() => {
                              const allMeasures = [...safetyMeasures, ...customSoftWashingSafetyMeasures];
                              const allSelected = allMeasures.every(m => selectedSafetyMeasures.includes(m));
                              if (allSelected) {
                                setSelectedSafetyMeasures([]);
                              } else {
                                setSelectedSafetyMeasures(allMeasures);
                              }
                            }}
                            className="text-xs text-gray-500 hover:text-blue-600 underline transition-colors"
                          >
                            Select All
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {[...safetyMeasures, ...customSoftWashingSafetyMeasures].map((measure) => {
                            const isSelected = selectedSafetyMeasures.includes(measure);
                            return (
                              <button
                                key={measure}
                                type="button"
                                onClick={() => toggleSafetyMeasure(measure)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                                  isSelected
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                } shadow-sm hover:shadow-md`}
                              >
                                {isSelected && <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />}
                                <span>{measure}</span>
                              </button>
                            );
                          })}
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all">
                            <input
                              type="text"
                              value={newSoftWashingSafetyMeasure}
                              onChange={(e) => setNewSoftWashingSafetyMeasure(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addCustomSoftWashingSafetyMeasure()}
                              placeholder="Add measure..."
                              className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm w-40"
                            />
                            <button
                              type="button"
                              onClick={addCustomSoftWashingSafetyMeasure}
                              className="text-blue-600 hover:text-blue-700"
                              disabled={!newSoftWashingSafetyMeasure.trim()}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pressure Washing */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => {
                    if (showPressureWashing) {
                      setCollapsedPressureWashing(!collapsedPressureWashing);
                    } else {
                      setShowPressureWashing(true);
                      setCollapsedPressureWashing(false);
                    }
                  }}
                >
                  <div className={`flex items-center gap-3 ${showPressureWashing && !collapsedPressureWashing ? 'mb-4' : ''}`}>
                    <input
                      type="checkbox"
                      checked={showPressureWashing}
                      onChange={(e) => {
                        e.stopPropagation();
                        setShowPressureWashing(e.target.checked);
                        if (e.target.checked) {
                          setCollapsedPressureWashing(false);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="text-lg font-semibold text-gray-900 flex-1">
                      Pressure Washing
                    </label>
                    {showPressureWashing && (
                      <div className="flex items-center justify-center">
                        <ChevronDown 
                          className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedPressureWashing ? 'transform rotate-180' : ''}`}
                        />
                      </div>
                    )}
                  </div>
                  {showPressureWashing && !collapsedPressureWashing && (
                    <div className="mt-4 space-y-6" onClick={(e) => e.stopPropagation()}>
                      {/* Services as Cards */}
                      <div>
                        <label className="block text-base font-semibold text-gray-900 mb-3">Services</label>
                        <div className="flex flex-col md:flex-row gap-4">
                          {[0, 1].map(columnIndex => (
                            <div key={columnIndex} className="flex-1 space-y-4">
                              {[...pressureWashingServices, ...customPressureWashingServices]
                                .filter((_, index) => index % 2 === columnIndex)
                                .map((service) => {
                                  const isSelected = selectedPressureWashing.includes(service);
                                  const serviceChemList = serviceChemicals[service] || [];
                                  return (
                                    <div
                                      key={service}
                                      className={`border-2 rounded-lg p-4 transition-all shadow-sm hover:shadow-md ${
                                        isSelected
                                          ? 'border-blue-400 bg-blue-50 shadow-md'
                                          : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 mb-3">
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => toggleService(service, 'pressureWashing')}
                                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label className="text-sm font-semibold text-gray-900 cursor-pointer flex-1">
                                          {service}
                                        </label>
                                      </div>
                                      {isSelected && (
                                        <div className="mt-3 space-y-2">
                                          <label className="block text-xs font-medium text-gray-700 mb-2">Chemicals Used:</label>
                                          {serviceChemList.length > 0 && (
                                            <div className="space-y-2 mb-3">
                                              {serviceChemList.map((chem, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs bg-white p-2 rounded border border-slate-200">
                                                  <span className="flex-1">{chem.chemical}</span>
                                                  <select
                                                    value={chem.concentration}
                                                    onChange={(e) => updateChemicalConcentration(service, chem.chemical, e.target.value)}
                                                    className="px-2 py-1 border border-gray-300 rounded text-xs w-20"
                                                    onClick={(e) => e.stopPropagation()}
                                                  >
                                                    {['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '12.5%', '15%', '20%', '25%', '50%'].map(pct => (
                                                      <option key={pct} value={pct}>{pct}</option>
                                                    ))}
                                                  </select>
                                                  <button
                                                    type="button"
                                                    onClick={() => removeChemicalFromService(service, chem.chemical)}
                                                    className="text-red-600 hover:text-red-800"
                                                  >
                                                    <X className="w-3 h-3" />
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">Add Chemical:</label>
                                            <select
                                              onChange={(e) => {
                                                if (e.target.value) {
                                                  addChemicalToService(service, e.target.value);
                                                  e.target.value = '';
                                                }
                                              }}
                                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                              defaultValue=""
                                            >
                                              <option value="">Select a chemical...</option>
                                              {allChemicals
                                                .filter(chem => !serviceChemList.find(c => c.chemical === chem))
                                                .map(chemical => (
                                                  <option key={chemical} value={chemical}>{chemical}</option>
                                                ))}
                                            </select>
                                          </div>
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">PSI:</label>
                                            <input
                                              type="text"
                                              value={servicePSI[service] || ''}
                                              onChange={(e) => updateServicePSI(service, e.target.value)}
                                              placeholder="Enter PSI (e.g., 1500)"
                                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              {/* Add Service Button for this column */}
                              {columnIndex === 0 && (
                                <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 hover:bg-slate-100 transition-all">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={newPressureWashingService}
                                      onChange={(e) => setNewPressureWashingService(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && addCustomPressureWashingService()}
                                      placeholder="Add service..."
                                      className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-slate-400"
                                    />
                                    <button
                                      type="button"
                                      onClick={addCustomPressureWashingService}
                                      className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                                      disabled={!newPressureWashingService.trim()}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Safety and Preventative Measures Section */}
                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-base font-semibold text-gray-900">Safety and Preventative Measures</label>
                          <button
                            type="button"
                            onClick={() => {
                              const allMeasures = [...pressureWashingSafetyMeasures, ...customPressureWashingSafetyMeasures];
                              const allSelected = allMeasures.every(m => selectedPressureWashingSafetyMeasures.includes(m));
                              if (allSelected) {
                                setSelectedPressureWashingSafetyMeasures([]);
                              } else {
                                setSelectedPressureWashingSafetyMeasures(allMeasures);
                              }
                            }}
                            className="text-xs text-gray-500 hover:text-blue-600 underline transition-colors"
                          >
                            Select All
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {[...pressureWashingSafetyMeasures, ...customPressureWashingSafetyMeasures].map((measure) => {
                            const isSelected = selectedPressureWashingSafetyMeasures.includes(measure);
                            return (
                              <button
                                key={measure}
                                type="button"
                                onClick={() => togglePressureWashingSafetyMeasure(measure)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                                  isSelected
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                } shadow-sm hover:shadow-md`}
                              >
                                {isSelected && <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />}
                                <span>{measure}</span>
                              </button>
                            );
                          })}
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all">
                            <input
                              type="text"
                              value={newPressureWashingSafetyMeasure}
                              onChange={(e) => setNewPressureWashingSafetyMeasure(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addCustomPressureWashingSafetyMeasure()}
                              placeholder="Add measure..."
                              className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm w-40"
                            />
                            <button
                              type="button"
                              onClick={addCustomPressureWashingSafetyMeasure}
                              className="text-blue-600 hover:text-blue-700"
                              disabled={!newPressureWashingSafetyMeasure.trim()}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Specialty Cleaning */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => {
                    if (showSpecialtyCleaning) {
                      setCollapsedSpecialtyCleaning(!collapsedSpecialtyCleaning);
                    } else {
                      setShowSpecialtyCleaning(true);
                      setCollapsedSpecialtyCleaning(false);
                    }
                  }}
                >
                  <div className={`flex items-center gap-3 ${showSpecialtyCleaning && !collapsedSpecialtyCleaning ? 'mb-4' : ''}`}>
                    <input
                      type="checkbox"
                      checked={showSpecialtyCleaning}
                      onChange={(e) => {
                        e.stopPropagation();
                        setShowSpecialtyCleaning(e.target.checked);
                        if (e.target.checked) {
                          setCollapsedSpecialtyCleaning(false);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="text-lg font-semibold text-gray-900 flex-1">
                      Specialty Cleaning
                    </label>
                    {showSpecialtyCleaning && (
                      <div className="flex items-center justify-center">
                        <ChevronDown 
                          className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedSpecialtyCleaning ? 'transform rotate-180' : ''}`}
                        />
                      </div>
                    )}
                  </div>
                  {showSpecialtyCleaning && !collapsedSpecialtyCleaning && (
                    <div className="mt-4 space-y-6" onClick={(e) => e.stopPropagation()}>
                      {/* Services as Cards */}
                      <div>
                        <label className="block text-base font-semibold text-gray-900 mb-3">Services</label>
                        <div className="flex flex-col md:flex-row gap-4">
                          {[0, 1].map(columnIndex => (
                            <div key={columnIndex} className="flex-1 space-y-4">
                              {[...specialtyCleaningServices, ...customSpecialtyCleaningServices]
                                .filter((_, index) => index % 2 === columnIndex)
                                .map((service) => {
                                  const isSelected = selectedSpecialtyCleaning.includes(service);
                                  const serviceChemList = serviceChemicals[service] || [];
                                  return (
                                    <div
                                      key={service}
                                      className={`border-2 rounded-lg p-4 transition-all shadow-sm hover:shadow-md ${
                                        isSelected
                                          ? 'border-blue-400 bg-blue-50 shadow-md'
                                          : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 mb-3">
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => toggleService(service, 'specialtyCleaning')}
                                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label className="text-sm font-semibold text-gray-900 cursor-pointer flex-1">
                                          {service}
                                        </label>
                                      </div>
                                      {isSelected && (
                                        <div className="mt-3 space-y-2">
                                          <label className="block text-xs font-medium text-gray-700 mb-2">Chemicals Used:</label>
                                          {serviceChemList.length > 0 && (
                                            <div className="space-y-2 mb-3">
                                              {serviceChemList.map((chem, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs bg-white p-2 rounded border border-slate-200">
                                                  <span className="flex-1">{chem.chemical}</span>
                                                  <select
                                                    value={chem.concentration}
                                                    onChange={(e) => updateChemicalConcentration(service, chem.chemical, e.target.value)}
                                                    className="px-2 py-1 border border-gray-300 rounded text-xs w-20"
                                                    onClick={(e) => e.stopPropagation()}
                                                  >
                                                    {['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '12.5%', '15%', '20%', '25%', '50%'].map(pct => (
                                                      <option key={pct} value={pct}>{pct}</option>
                                                    ))}
                                                  </select>
                                                  <button
                                                    type="button"
                                                    onClick={() => removeChemicalFromService(service, chem.chemical)}
                                                    className="text-red-600 hover:text-red-800"
                                                  >
                                                    <X className="w-3 h-3" />
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">Add Chemical:</label>
                                            <select
                                              onChange={(e) => {
                                                if (e.target.value) {
                                                  addChemicalToService(service, e.target.value);
                                                  e.target.value = '';
                                                }
                                              }}
                                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                              defaultValue=""
                                            >
                                              <option value="">Select a chemical...</option>
                                              {allChemicals
                                                .filter(chem => !serviceChemList.find(c => c.chemical === chem))
                                                .map(chemical => (
                                                  <option key={chemical} value={chemical}>{chemical}</option>
                                                ))}
                                            </select>
                                          </div>
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">PSI:</label>
                                            <input
                                              type="text"
                                              value={servicePSI[service] || ''}
                                              onChange={(e) => updateServicePSI(service, e.target.value)}
                                              placeholder="Enter PSI (e.g., 1500)"
                                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              {/* Add Service Button for this column */}
                              {columnIndex === 0 && (
                                <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 hover:bg-slate-100 transition-all">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={newSpecialtyCleaningService}
                                      onChange={(e) => setNewSpecialtyCleaningService(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && addCustomSpecialtyCleaningService()}
                                      placeholder="Add service..."
                                      className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-slate-400"
                                    />
                                    <button
                                      type="button"
                                      onClick={addCustomSpecialtyCleaningService}
                                      className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                                      disabled={!newSpecialtyCleaningService.trim()}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Safety and Preventative Measures Section */}
                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-base font-semibold text-gray-900">Safety and Preventative Measures</label>
                          <button
                            type="button"
                            onClick={() => {
                              const allMeasures = [...specialtyCleaningSafetyMeasures, ...customSpecialtyCleaningSafetyMeasures];
                              const allSelected = allMeasures.every(m => selectedSpecialtyCleaningSafetyMeasures.includes(m));
                              if (allSelected) {
                                setSelectedSpecialtyCleaningSafetyMeasures([]);
                              } else {
                                setSelectedSpecialtyCleaningSafetyMeasures(allMeasures);
                              }
                            }}
                            className="text-xs text-gray-500 hover:text-blue-600 underline transition-colors"
                          >
                            Select All
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {[...specialtyCleaningSafetyMeasures, ...customSpecialtyCleaningSafetyMeasures].map((measure) => {
                            const isSelected = selectedSpecialtyCleaningSafetyMeasures.includes(measure);
                            return (
                              <button
                                key={measure}
                                type="button"
                                onClick={() => toggleSpecialtyCleaningSafetyMeasure(measure)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                                  isSelected
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                } shadow-sm hover:shadow-md`}
                              >
                                {isSelected && <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />}
                                <span>{measure}</span>
                              </button>
                            );
                          })}
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all">
                            <input
                              type="text"
                              value={newSpecialtyCleaningSafetyMeasure}
                              onChange={(e) => setNewSpecialtyCleaningSafetyMeasure(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addCustomSpecialtyCleaningSafetyMeasure()}
                              placeholder="Add measure..."
                              className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm w-40"
                            />
                            <button
                              type="button"
                              onClick={addCustomSpecialtyCleaningSafetyMeasure}
                              className="text-blue-600 hover:text-blue-700"
                              disabled={!newSpecialtyCleaningSafetyMeasure.trim()}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Window Cleaning */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => {
                    if (showWindowCleaning) {
                      setCollapsedWindowCleaning(!collapsedWindowCleaning);
                    } else {
                      setShowWindowCleaning(true);
                      setCollapsedWindowCleaning(false);
                    }
                  }}
                >
                  <div className={`flex items-center gap-3 ${showWindowCleaning && !collapsedWindowCleaning ? 'mb-4' : ''}`}>
                    <input
                      type="checkbox"
                      checked={showWindowCleaning}
                      onChange={(e) => {
                        e.stopPropagation();
                        setShowWindowCleaning(e.target.checked);
                        if (e.target.checked) {
                          setCollapsedWindowCleaning(false);
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="text-lg font-semibold text-gray-900 flex-1">
                      Window Cleaning
                    </label>
                    {showWindowCleaning && (
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                          className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedWindowCleaning ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                    )}
                  </div>
                  {showWindowCleaning && !collapsedWindowCleaning && (
                    <div className="mt-4 space-y-6" onClick={(e) => e.stopPropagation()}>
                      {/* Services as Cards */}
                          <div>
                        <label className="block text-base font-semibold text-gray-900 mb-3">Services</label>
                        <div className="flex flex-col md:flex-row gap-4">
                          {[0, 1].map(columnIndex => (
                            <div key={columnIndex} className="flex-1 space-y-4">
                              {[...windowCleaningServices, ...customWindowCleaningServices]
                                .filter((_, index) => index % 2 === columnIndex)
                                .map((service) => {
                                  const isSelected = selectedWindowCleaning.includes(service);
                                  const serviceChemList = serviceChemicals[service] || [];
                                  return (
                                    <div
                                      key={service}
                                      className={`border-2 rounded-lg p-4 transition-all shadow-sm hover:shadow-md ${
                                        isSelected
                                          ? 'border-blue-400 bg-blue-50 shadow-md'
                                          : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 mb-3">
                            <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={() => toggleService(service, 'windowCleaning')}
                                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label className="text-sm font-semibold text-gray-900 cursor-pointer flex-1">
                                          {service}
                                        </label>
                          </div>
                                      {isSelected && (
                                        <div className="mt-3 space-y-2">
                                          <label className="block text-xs font-medium text-gray-700 mb-2">Chemicals Used:</label>
                                          {serviceChemList.length > 0 && (
                                            <div className="space-y-2 mb-3">
                                              {serviceChemList.map((chem, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs bg-white p-2 rounded border border-slate-200">
                                                  <span className="flex-1">{chem.chemical}</span>
                                                  <select
                                                    value={chem.concentration}
                                                    onChange={(e) => updateChemicalConcentration(service, chem.chemical, e.target.value)}
                                                    className="px-2 py-1 border border-gray-300 rounded text-xs w-20"
                                                    onClick={(e) => e.stopPropagation()}
                                                  >
                                                    {['1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '12.5%', '15%', '20%', '25%', '50%'].map(pct => (
                                                      <option key={pct} value={pct}>{pct}</option>
                                                    ))}
                                                  </select>
                                                  <button
                                                    type="button"
                                                    onClick={() => removeChemicalFromService(service, chem.chemical)}
                                                    className="text-red-600 hover:text-red-800"
                                                  >
                                                    <X className="w-3 h-3" />
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">Add Chemical:</label>
                                            <select
                                              onChange={(e) => {
                                                if (e.target.value) {
                                                  addChemicalToService(service, e.target.value);
                                                  e.target.value = '';
                                                }
                                              }}
                                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                              defaultValue=""
                                            >
                                              <option value="">Select a chemical...</option>
                                              {windowCleaningChemicals
                                                .filter(chem => !serviceChemList.find(c => c.chemical === chem))
                                                .map(chemical => (
                                                  <option key={chemical} value={chemical}>{chemical}</option>
                                                ))}
                                            </select>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              {/* Add Service Button for this column */}
                              {columnIndex === 0 && (
                                <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 hover:bg-slate-100 transition-all">
                                  <div className="flex items-center gap-2">
                            <input
                              type="text"
                                      value={newWindowCleaningService}
                                      onChange={(e) => setNewWindowCleaningService(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && addCustomWindowCleaningService()}
                                      placeholder="Add service..."
                                      className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-slate-400"
                                    />
                                    <button
                                      type="button"
                                      onClick={addCustomWindowCleaningService}
                                      className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                                      disabled={!newWindowCleaningService.trim()}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                          </div>
                          
                      {/* Safety and Preventative Measures Section */}
                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-base font-semibold text-gray-900">Safety and Preventative Measures</label>
                          <button
                            type="button"
                            onClick={() => {
                              const allMeasures = [...windowCleaningSafetyMeasures, ...customWindowCleaningSafetyMeasures];
                              const allSelected = allMeasures.every(m => selectedWindowCleaningSafetyMeasures.includes(m));
                              if (allSelected) {
                                setSelectedWindowCleaningSafetyMeasures([]);
                              } else {
                                setSelectedWindowCleaningSafetyMeasures(allMeasures);
                              }
                            }}
                            className="text-xs text-gray-500 hover:text-blue-600 underline transition-colors"
                          >
                            Select All
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {[...windowCleaningSafetyMeasures, ...customWindowCleaningSafetyMeasures].map((measure) => {
                            const isSelected = selectedWindowCleaningSafetyMeasures.includes(measure);
                            return (
                              <button
                                key={measure}
                                type="button"
                                onClick={() => toggleWindowCleaningSafetyMeasure(measure)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                                  isSelected
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                } shadow-sm hover:shadow-md`}
                              >
                                {isSelected && <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />}
                                <span>{measure}</span>
                              </button>
                            );
                          })}
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all">
                            <input
                              type="text"
                              value={newWindowCleaningSafetyMeasure}
                              onChange={(e) => setNewWindowCleaningSafetyMeasure(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addCustomWindowCleaningSafetyMeasure()}
                              placeholder="Add measure..."
                              className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm w-40"
                            />
                            <button
                              type="button"
                              onClick={addCustomWindowCleaningSafetyMeasure}
                              className="text-blue-600 hover:text-blue-700"
                              disabled={!newWindowCleaningSafetyMeasure.trim()}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Save Button for Services Offered */}
              <div className="flex justify-end mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={() => {
                    handleSaveServicesOffered();
                    console.log('Saving services offered:', {
                      selectedSoftWashing,
                      selectedPressureWashing,
                      selectedSpecialtyCleaning,
                      serviceChemicals,
                      servicePSI
                    });
                    alert('Services offered saved successfully!');
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Forms Section */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Forms</h2>
              
              {/* Paper-shaped buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg max-w-[182px] mx-auto shadow-md">
                  <FileText className="w-6 h-6 mb-2 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <span className="text-sm font-medium text-gray-900 text-center leading-tight">Customize Estimate</span>
                </button>

                <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-emerald-50 hover:border-emerald-400 hover:shadow-lg max-w-[182px] mx-auto shadow-md">
                  <FileSignature className="w-6 h-6 mb-2 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                  <span className="text-sm font-medium text-gray-900 text-center leading-tight">Customize Contract</span>
                </button>

                <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-purple-50 hover:border-purple-400 hover:shadow-lg max-w-[182px] mx-auto shadow-md">
                  <Receipt className="w-6 h-6 mb-2 text-purple-600 group-hover:text-purple-700 transition-colors" />
                  <span className="text-sm font-medium text-gray-900 text-center leading-tight">Customize Invoice</span>
                </button>

                <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-pink-50 hover:border-pink-400 hover:shadow-lg max-w-[182px] mx-auto shadow-md">
                  <HeartHandshake className="w-6 h-6 mb-2 text-pink-600 group-hover:text-pink-700 transition-colors" />
                  <span className="text-sm font-medium text-gray-900 text-center leading-tight">Thank You Note</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* (Legacy) Pricing Tab placeholder removed – merged into Pricing Tool */}
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
          <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
                <div className="bg-gray-50 p-4 rounded-3xl">
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
                <div className="bg-gray-50 p-4 rounded-3xl">
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
                <div className="bg-gray-50 p-4 rounded-3xl">
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
                <div className="bg-gray-50 p-4 rounded-3xl">
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
                <div className="bg-gray-50 p-4 rounded-3xl">
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
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this {deleteConfirm.type === 'lead' ? 'lead' : 'customer'}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-3xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition-colors"
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

  const isLeadModal = type === 'addLead' || type === 'editLead';
  const isCustomerModal = type === 'addCustomer' || type === 'editCustomer';

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
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
            {(isLeadModal || isCustomerModal) && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData(prev => {
                      const value = e.target.value;
                      const updated = { ...prev, firstName: value };
                      const last = updated.lastName || '';
                      updated.name = `${value} ${last}`.trim();
                      return updated;
                    })}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData(prev => {
                      const value = e.target.value;
                      const updated = { ...prev, lastName: value };
                      const first = updated.firstName || '';
                      updated.name = `${first} ${value}`.trim();
                      return updated;
                    })}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select
                    value={formData.source || ''}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {(type === 'editCustomer') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Review Status</label>
                      <select
                        value={formData.reviewStatus || 'none'}
                        onChange={(e) => setFormData({...formData, reviewStatus: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Status</label>
                  <select
                    value={formData.reviewStatus || 'none'}
                    onChange={(e) => setFormData({...formData, reviewStatus: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select
                    value={formData.service || ''}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={formData.time || ''}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select
                    value={formData.platform || campaignPlatforms[0]}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    value={formData.duration || 0}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-3xl bg-gray-50 text-gray-600"
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
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Views</label>
                  <input
                    type="number"
                    value={formData.views || ''}
                    onChange={(e) => setFormData({...formData, views: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clicks</label>
                  <input
                    type="number"
                    value={formData.clicks || ''}
                    onChange={(e) => setFormData({...formData, clicks: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conversions</label>
                  <input
                    type="number"
                    value={formData.conversions || ''}
                    onChange={(e) => setFormData({...formData, conversions: Number(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-3xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition-colors"
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
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
              <div className="bg-gray-50 rounded-3xl p-4 space-y-2">
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
              <div className="bg-blue-50 rounded-3xl p-4">
                <div className="text-gray-900 font-medium">{job.service}</div>
              </div>
            </div>

            {/* Notes */}
            {job.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
                <div className="bg-gray-50 rounded-3xl p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{job.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Job</span>
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition-colors flex items-center space-x-2"
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