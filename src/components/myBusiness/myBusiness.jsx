import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown, ChevronUp, Plus, X, Check, FileText, FileSignature, Receipt, HeartHandshake, Clock, Award, Shield, ShieldCheck, MapPin, Star, Search, Trash2, Pencil, Briefcase, User, Globe, GripVertical, Settings, Eye, Type, Mail, AlignLeft, Calendar, PenTool, CheckSquare } from 'lucide-react';
import { cityService } from '../../services';
import './myBusiness.css';

const MyBusiness = ({
  companyInfo,
  updateCompanyInfo,
  collapsedContactDetails,
  setCollapsedContactDetails,
  getContactDetailsCompletion,
  getBrandIdentityCompletion,
  getAreasServedCompletion,
  getOperatingHoursCompletion,
  getCertificationsCompletion,
  getInsuranceCompletion,
  getGuaranteeWarrantyCompletion,
  getOnlineReviewsCompletion,
}) => {
  // Company qualities constant array
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

  // Selected tab state for main navigation
  const [selectedTab, setSelectedTab] = useState('Contact Details');
  
  // Collapsed section states (kept for compatibility but may not be used with tab layout)
  const [collapsedCustomerReviews, setCollapsedCustomerReviews] = useState(true);
  const [collapsedOnlineReviews, setCollapsedOnlineReviews] = useState(true);
  const [collapsedBrandIdentity, setCollapsedBrandIdentity] = useState(true);
  const [collapsedAreasServed, setCollapsedAreasServed] = useState(true);
  const [collapsedOperatingHours, setCollapsedOperatingHours] = useState(true);
  const [collapsedCertifications, setCollapsedCertifications] = useState(true);
  const [collapsedInsurance, setCollapsedInsurance] = useState(true);
  const [collapsedGuaranteeWarranty, setCollapsedGuaranteeWarranty] = useState(true);
  const [collapsedServicesOffered, setCollapsedServicesOffered] = useState(true);
  const [servicesOfferedSaveAttempted, setServicesOfferedSaveAttempted] = useState(false);
  const [savedGuaranteeWarranty, setSavedGuaranteeWarranty] = useState('');
  const [savedCertifications, setSavedCertifications] = useState([]);
  const [savedInsurance, setSavedInsurance] = useState([]);
  const [savedOperatingHours, setSavedOperatingHours] = useState([]);
  const [editingOperatingHours, setEditingOperatingHours] = useState(true); // Start in edit mode
  const [operatingHoursTimeErrors, setOperatingHoursTimeErrors] = useState({}); // Track time format errors
  const [editingCertifications, setEditingCertifications] = useState(false);
  const [certificationErrors, setCertificationErrors] = useState({}); // Track validation errors by cert id
  const [editingInsurance, setEditingInsurance] = useState(false);
  const [insuranceErrors, setInsuranceErrors] = useState({}); // Track validation errors by insurance id
  const [editingGuaranteeWarranty, setEditingGuaranteeWarranty] = useState(false);
  const [contactDetailsSaveAttempted, setContactDetailsSaveAttempted] = useState(false);
  const [contactDetailsErrors, setContactDetailsErrors] = useState({});
  const [savedContactDetails, setSavedContactDetails] = useState(null);
  const [editingContactDetails, setEditingContactDetails] = useState(true); // Start in edit mode
  const [savedAreasServed, setSavedAreasServed] = useState([]);
  const [editingAreasServed, setEditingAreasServed] = useState(true); // Start in edit mode
  const [areasServedSaveAttempted, setAreasServedSaveAttempted] = useState(false);
  const [operatingHoursSaveAttempted, setOperatingHoursSaveAttempted] = useState(false);
  const [guaranteeWarrantySaveAttempted, setGuaranteeWarrantySaveAttempted] = useState(false);
  const [savedBrandIdentity, setSavedBrandIdentity] = useState(null);
  const [editingBrandIdentity, setEditingBrandIdentity] = useState(false);
  const [brandIdentitySaveAttempted, setBrandIdentitySaveAttempted] = useState(false);
  const [savedCustomerReviews, setSavedCustomerReviews] = useState([]);
  const [customerReviewErrors, setCustomerReviewErrors] = useState({}); // Track validation errors by review id
  const [savedOnlineReviews, setSavedOnlineReviews] = useState(null);
  const [editingOnlineReviews, setEditingOnlineReviews] = useState(false);
  const [onlineReviewsSaveAttempted, setOnlineReviewsSaveAttempted] = useState(false);
  
  // Services Offered state
  const [savedServices, setSavedServices] = useState([]); // Array of saved service configurations
  const [editingServices, setEditingServices] = useState([]); // Array of services currently being edited

  // Company qualities state
  const [customCompanyQualities, setCustomCompanyQualities] = useState([]);
  const [newCompanyQuality, setNewCompanyQuality] = useState('');

  // City search state
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [isCitySearchOpen, setIsCitySearchOpen] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [citySearchError, setCitySearchError] = useState(null);
  const [citySearchTimeout, setCitySearchTimeout] = useState(null);

  // Services state
  const [showSoftWashing, setShowSoftWashing] = useState(false);
  const [showPressureWashing, setShowPressureWashing] = useState(false);
  const [showSpecialtyCleaning, setShowSpecialtyCleaning] = useState(false);
  const [showWindowCleaning, setShowWindowCleaning] = useState(false);
  const [collapsedSoftWashing, setCollapsedSoftWashing] = useState(true);
  const [collapsedPressureWashing, setCollapsedPressureWashing] = useState(true);
  const [collapsedSpecialtyCleaning, setCollapsedSpecialtyCleaning] = useState(true);
  const [collapsedWindowCleaning, setCollapsedWindowCleaning] = useState(true);

  // Service selection state
  const [selectedSoftWashing, setSelectedSoftWashing] = useState([]);
  const [selectedPressureWashing, setSelectedPressureWashing] = useState([]);
  const [selectedSpecialtyCleaning, setSelectedSpecialtyCleaning] = useState([]);
  const [selectedWindowCleaning, setSelectedWindowCleaning] = useState([]);

  // Service configuration state
  const [serviceChemicals, setServiceChemicals] = useState({});
  const [servicePSI, setServicePSI] = useState({});
  const [serviceSurfaces, setServiceSurfaces] = useState({});
  const [serviceSafetyMeasures, setServiceSafetyMeasures] = useState({});

  // Chemical dropdown state
  const [chemicalDropdownOpen, setChemicalDropdownOpen] = useState({});
  const [chemicalSearchTerm, setChemicalSearchTerm] = useState({});
  const [safetySearchTerm, setSafetySearchTerm] = useState({});
  
  // Safety measures dropdown state for services
  const [safetyDropdownOpen, setSafetyDropdownOpen] = useState({});
  const [newCustomSafetyMeasure, setNewCustomSafetyMeasure] = useState({});

  // Surface dropdown state
  const [surfacesDropdownOpen, setSurfacesDropdownOpen] = useState({});

  
  // Services dropdown state
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [customServices, setCustomServices] = useState([]);
  const [newService, setNewService] = useState('');
  
  // Custom chemical input state for each service
  const [newCustomChemical, setNewCustomChemical] = useState({});

  // Form builder modal state
  const [formBuilderOpen, setFormBuilderOpen] = useState(false);
  const [activeFormType, setActiveFormType] = useState(null); // 'estimate' | 'contract' | 'invoice' | 'thankYou'
  const [formTemplates, setFormTemplates] = useState({
    estimate: {
      name: 'Estimate Form',
      fields: [
        { id: 'customer_name', type: 'text', label: 'Customer Name', required: true, prefilled: true },
        { id: 'customer_email', type: 'email', label: 'Email Address', required: true, prefilled: true },
        { id: 'customer_phone', type: 'phone', label: 'Phone Number', required: false, prefilled: true },
        { id: 'service_address', type: 'address', label: 'Service Address', required: true, prefilled: true },
        { id: 'service_type', type: 'dropdown', label: 'Service Type', required: true, options: ['Soft Washing', 'Pressure Washing', 'Window Cleaning', 'Other'] },
        { id: 'project_description', type: 'textarea', label: 'Project Description', required: false },
        { id: 'preferred_date', type: 'date', label: 'Preferred Service Date', required: false },
      ],
      settings: { showLogo: true, primaryColor: '#3B82F6' }
    },
    contract: {
      name: 'Service Contract',
      fields: [
        { id: 'customer_name', type: 'text', label: 'Customer Name', required: true, prefilled: true },
        { id: 'customer_email', type: 'email', label: 'Email Address', required: true, prefilled: true },
        { id: 'service_address', type: 'address', label: 'Service Address', required: true, prefilled: true },
        { id: 'terms_agreement', type: 'checkbox', label: 'I agree to the terms and conditions', required: true },
        { id: 'customer_signature', type: 'signature', label: 'Customer Signature', required: true },
        { id: 'signed_date', type: 'date', label: 'Date', required: true },
      ],
      settings: { showLogo: true, primaryColor: '#8B5CF6' }
    },
    invoice: {
      name: 'Invoice',
      fields: [
        { id: 'customer_name', type: 'text', label: 'Customer Name', required: true, prefilled: true },
        { id: 'customer_email', type: 'email', label: 'Email Address', required: true, prefilled: true },
        { id: 'billing_address', type: 'address', label: 'Billing Address', required: true, prefilled: true },
        { id: 'payment_method', type: 'dropdown', label: 'Payment Method', required: true, options: ['Credit Card', 'Bank Transfer', 'Check', 'Cash'] },
        { id: 'notes', type: 'textarea', label: 'Additional Notes', required: false },
      ],
      settings: { showLogo: true, primaryColor: '#F59E0B' }
    },
    thankYou: {
      name: 'Thank You Note',
      fields: [
        { id: 'customer_name', type: 'text', label: 'Customer Name', required: true, prefilled: true },
        { id: 'feedback', type: 'textarea', label: 'How was your experience?', required: false },
        { id: 'rating', type: 'rating', label: 'Rate our service', required: false },
        { id: 'referral', type: 'checkbox', label: 'I would refer you to friends and family', required: false },
        { id: 'review_permission', type: 'checkbox', label: 'You may use my feedback as a testimonial', required: false },
      ],
      settings: { showLogo: true, primaryColor: '#EC4899' }
    }
  });
  const [editingField, setEditingField] = useState(null);
  const [newFieldType, setNewFieldType] = useState('text');

  // Available field types for the form builder
  const fieldTypes = [
    { value: 'text', label: 'Text Input', icon: 'Type' },
    { value: 'email', label: 'Email', icon: 'Mail' },
    { value: 'phone', label: 'Phone Number', icon: 'Phone' },
    { value: 'address', label: 'Address', icon: 'MapPin' },
    { value: 'textarea', label: 'Text Area', icon: 'AlignLeft' },
    { value: 'dropdown', label: 'Dropdown', icon: 'ChevronDown' },
    { value: 'checkbox', label: 'Checkbox', icon: 'CheckSquare' },
    { value: 'date', label: 'Date Picker', icon: 'Calendar' },
    { value: 'signature', label: 'Signature', icon: 'PenTool' },
    { value: 'rating', label: 'Star Rating', icon: 'Star' },
  ];

  // Form builder helper functions
  const openFormBuilder = (formType) => {
    setActiveFormType(formType);
    setFormBuilderOpen(true);
    setEditingField(null);
  };

  const closeFormBuilder = () => {
    setFormBuilderOpen(false);
    setActiveFormType(null);
    setEditingField(null);
  };

  const addFieldToForm = () => {
    if (!activeFormType) return;
    const newField = {
      id: `field_${Date.now()}`,
      type: newFieldType,
      label: `New ${fieldTypes.find(f => f.value === newFieldType)?.label || 'Field'}`,
      required: false,
      prefilled: false,
      ...(newFieldType === 'dropdown' ? { options: ['Option 1', 'Option 2'] } : {})
    };
    setFormTemplates(prev => ({
      ...prev,
      [activeFormType]: {
        ...prev[activeFormType],
        fields: [...prev[activeFormType].fields, newField]
      }
    }));
    setEditingField(newField.id);
  };

  const updateField = (fieldId, updates) => {
    if (!activeFormType) return;
    setFormTemplates(prev => ({
      ...prev,
      [activeFormType]: {
        ...prev[activeFormType],
        fields: prev[activeFormType].fields.map(field =>
          field.id === fieldId ? { ...field, ...updates } : field
        )
      }
    }));
  };

  const removeField = (fieldId) => {
    if (!activeFormType) return;
    setFormTemplates(prev => ({
      ...prev,
      [activeFormType]: {
        ...prev[activeFormType],
        fields: prev[activeFormType].fields.filter(field => field.id !== fieldId)
      }
    }));
    if (editingField === fieldId) setEditingField(null);
  };

  const moveField = (fieldId, direction) => {
    if (!activeFormType) return;
    const fields = [...formTemplates[activeFormType].fields];
    const index = fields.findIndex(f => f.id === fieldId);
    if (direction === 'up' && index > 0) {
      [fields[index - 1], fields[index]] = [fields[index], fields[index - 1]];
    } else if (direction === 'down' && index < fields.length - 1) {
      [fields[index], fields[index + 1]] = [fields[index + 1], fields[index]];
    }
    setFormTemplates(prev => ({
      ...prev,
      [activeFormType]: { ...prev[activeFormType], fields }
    }));
  };

  const updateFormSettings = (key, value) => {
    if (!activeFormType) return;
    setFormTemplates(prev => ({
      ...prev,
      [activeFormType]: {
        ...prev[activeFormType],
        settings: { ...prev[activeFormType].settings, [key]: value }
      }
    }));
  };

  // Safety measures arrays - 15 most important measures
  const safetyMeasures = [
    'Pre-inspect all surfaces',
    'Use safe pressure settings',
    'Pre-wet plants and soil',
    'Cover outlets and fixtures',
    'Test spots before washing',
    'Use proper chemical ratios',
    'Control hose placement',
    'Avoid spraying under siding',
    'Protect windows and seals',
    'Rinse thoroughly after cleaning',
    'Direct runoff safely away',
    'Avoid aged or damaged surfaces',
    'Softwash home sidings',
    'Secure ladders and equipment',
    'Perform final walkthrough inspection'
  ];
  const pressureWashingSafetyMeasures = [];
  const specialtyCleaningSafetyMeasures = [];
  const windowCleaningSafetyMeasures = [];
  const customSoftWashingSafetyMeasures = [];
  const customPressureWashingSafetyMeasures = [];
  const customSpecialtyCleaningSafetyMeasures = [];
  const customWindowCleaningSafetyMeasures = [];

  // Custom services state
  const [newSoftWashingService, setNewSoftWashingService] = useState('');
  const [newPressureWashingService, setNewPressureWashingService] = useState('');
  const [newSpecialtyCleaningService, setNewSpecialtyCleaningService] = useState('');
  const [newWindowCleaningService, setNewWindowCleaningService] = useState('');

  // Service arrays (these should ideally come from props or a config)
  const softWashingServices = [
    'Residential washing',
    'Roof washing (asphalt, metal, tile)',
    'Commercial washing',
    'Fence cleaning (wood, vinyl)',
    'Deck cleaning (wood or composite)'
  ];
  const customSoftWashingServices = [];
  const pressureWashingServices = [
    'Residential washing',
    'Commercial washing',
    'Patio and porch cleaning',
    'Pool deck cleaning',
    'Garage floor cleaning'
  ];
  const customPressureWashingServices = [];
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
  const customSpecialtyCleaningServices = [];
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
  const customWindowCleaningServices = [];
  const softWashingSurfaces = [];
  const customSoftWashingSurfaces = [];
  const specialtyCleaningSurfaces = [];
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
  const [customChemicals, setCustomChemicals] = useState([]);
  const windowCleaningChemicals = [];

  // Handler functions
  const getCompanyDetailsCompletion = () => {
    let completed = 0;
    const total = 7;
    
    // 1. Company Name
    if (companyInfo.companyName && companyInfo.companyName.trim()) {
      completed++;
    }
    
    // 2. Phone
    if (companyInfo.phone && companyInfo.phone.trim()) {
      completed++;
    }
    
    // 3. Email
    if (companyInfo.email && companyInfo.email.trim()) {
      completed++;
    }
    
    // 4. Street
    if (companyInfo.street && companyInfo.street.trim()) {
      completed++;
    }
    
    // 5. City
    if (companyInfo.city && companyInfo.city.trim()) {
      completed++;
    }
    
    // 6. State
    if (companyInfo.state && companyInfo.state.trim()) {
      completed++;
    }
    
    // 7. ZIP Code
    if (companyInfo.zip && companyInfo.zip.trim()) {
      completed++;
    }
    
    return { completed, total };
  };

  const getBrandIdentityCompletionLocal = () => {
    // Check if brand identity has been saved
    const completed = savedBrandIdentity ? 1 : 0;
    const total = 1;
    return { completed, total };
  };

  const getAreasServedCompletionLocal = () => {
    // Track 1 category: at least one area selected and saved
    const completed = savedAreasServed.length > 0 ? 1 : 0;
    const total = 1;
    return { completed, total };
  };

  const getServicesOfferedCompletionLocal = () => {
    // Track 1 category: at least one service saved
    const completed = savedServices.length > 0 ? 1 : 0;
    const total = 1;
    return { completed, total };
  };

  const getOperatingHoursCompletionLocal = () => {
    // Track 7 days - each day must have either:
    // 1. closed: true, OR
    // 2. open24hr: true, OR
    // 3. open and close times filled
    const total = 7;
    let completed = 0;
    
    companyInfo.operatingHours.forEach((hours) => {
      const isComplete = 
        hours.closed === true ||
        hours.open24hr === true ||
        (hours.open && hours.open.trim() !== '' && hours.close && hours.close.trim() !== '');
      
      if (isComplete) {
        completed++;
      }
    });
    
    return { completed, total };
  };

  const getCertificationsCompletionLocal = () => {
    // Track saved certifications: at least one certification with both name and organization
    const hasCompleteCertification = savedCertifications.length > 0 || 
      companyInfo.certificationsList.some(cert => 
      cert.certificationName && cert.certificationName.trim() !== '' &&
      cert.certifyingOrganization && cert.certifyingOrganization.trim() !== ''
    );
    
    const completed = hasCompleteCertification ? 1 : 0;
    const total = 1;
    return { completed, total };
  };

  const getInsuranceCompletionLocal = () => {
    // Track saved insurance entries
    const total = savedInsurance.length > 0 ? savedInsurance.length : 1;
    const completed = savedInsurance.length;
    
    return { completed, total };
  };

  const getGuaranteeWarrantyCompletionLocal = () => {
    // Track 1 category: guarantee/warranty text has been saved
    const completed = savedGuaranteeWarranty && savedGuaranteeWarranty.trim() !== '' ? 1 : 0;
    const total = 1;
    return { completed, total };
  };

  const handleSaveGuaranteeWarranty = () => {
    setGuaranteeWarrantySaveAttempted(true);
    if (companyInfo.guaranteeWarranty && companyInfo.guaranteeWarranty.trim() !== '') {
      setSavedGuaranteeWarranty(companyInfo.guaranteeWarranty);
      setEditingGuaranteeWarranty(false);
      setGuaranteeWarrantySaveAttempted(false);
    }
  };

  const handleSaveBrandIdentity = () => {
    setBrandIdentitySaveAttempted(true);
    
    // Check if at least one field is filled
    const hasSlogan = companyInfo.companySlogan && companyInfo.companySlogan.trim() !== '';
    const hasExperienceYears = companyInfo.experienceYears && companyInfo.experienceYears.toString().trim() !== '';
    const hasJobsCompleted = companyInfo.jobsCompleted && companyInfo.jobsCompleted.toString().trim() !== '';
    const hasQualities = companyInfo.whatMakesDifferent && companyInfo.whatMakesDifferent.length > 0;
    
    if (hasSlogan || hasExperienceYears || hasJobsCompleted || hasQualities) {
      // Save the brand identity
      setSavedBrandIdentity({
        companySlogan: companyInfo.companySlogan || '',
        experienceYears: companyInfo.experienceYears || '',
        jobsCompleted: companyInfo.jobsCompleted || '',
        whatMakesDifferent: companyInfo.whatMakesDifferent || []
      });
      setEditingBrandIdentity(false);
      setBrandIdentitySaveAttempted(false);
    }
  };

  const handleSaveOnlineReviews = () => {
    setOnlineReviewsSaveAttempted(true);
    
    // Check if at least one platform has data
    const hasData = companyInfo.onlineReviews && Object.keys(companyInfo.onlineReviews).some(platform => {
      const review = companyInfo.onlineReviews[platform];
      return (review.averageRating && review.averageRating !== '') ||
             (review.totalReviews && review.totalReviews !== '') ||
             (review.fiveStarReviews && review.fiveStarReviews !== '');
    });
    
    if (hasData) {
      // Save the online reviews
      setSavedOnlineReviews(companyInfo.onlineReviews);
      setEditingOnlineReviews(false);
      setOnlineReviewsSaveAttempted(false);
    }
  };

  const handleSaveCertifications = () => {
    // Only save certifications that have both name and organization filled
    const validCertifications = companyInfo.certificationsList.filter(
      cert => cert.certificationName && cert.certificationName.trim() !== '' &&
              cert.certifyingOrganization && cert.certifyingOrganization.trim() !== ''
    ).map(cert => ({
      id: cert.id || Date.now() + Math.random(), // Generate unique ID if not exists
      certificationName: cert.certificationName,
      certifyingOrganization: cert.certifyingOrganization,
      dateReceived: cert.dateReceived || '',
      savedAt: cert.savedAt || new Date().toISOString() // Add savedAt timestamp
    }));

    // Add new certifications to existing saved ones, avoiding duplicates by ID
    // Enforce maximum of 10 certifications
    setSavedCertifications((prev) => {
      const existingIds = new Set(prev.map(c => c.id));
      const newCerts = validCertifications.filter(c => !existingIds.has(c.id));
      const combined = [...prev, ...newCerts];
      // Limit to 10 certifications max
      if (combined.length > 10) {
        return combined.slice(0, 10);
      }
      return combined;
    });

    setEditingCertifications(false);
    // Clear the editable list after saving
    updateCompanyInfo('certificationsList', []);
  };


  const getOnlineReviewsCompletionLocal = () => {
    // Track 5 platforms - each row is complete when all 3 inputs are filled:
    // 1. Avg Rating (averageRating)
    // 2. Total Reviews (totalReviews)
    // 3. 5-Star Reviews (fiveStarReviews)
    const platforms = ['google', 'facebook', 'nextdoor', 'yelp', 'homeadvisor'];
    const total = 5;
    let completed = 0;
    
    platforms.forEach((platform) => {
      const review = companyInfo.onlineReviews?.[platform];
      if (review) {
        const hasRating = review.averageRating && review.averageRating.toString().trim() !== '';
        const hasTotalReviews = review.totalReviews && review.totalReviews.toString().trim() !== '';
        const hasFiveStarReviews = review.fiveStarReviews && review.fiveStarReviews.toString().trim() !== '';
        
        if (hasRating && hasTotalReviews && hasFiveStarReviews) {
          completed++;
        }
      }
    });
    
    return { completed, total };
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

  const handleCitySearchChange = (e) => {
    const value = e.target.value;
    setCitySearchTerm(value);
    console.log('Search input:', value);

    // Clear any existing timeout (debounce)
    if (citySearchTimeout) {
      clearTimeout(citySearchTimeout);
    }

    if (value.length >= 2) {
      setIsLoadingCities(true);
      setCitySearchError(null);
      setIsCitySearchOpen(true);
      console.log('Starting search for:', value);

      // Debounce the API call by 350ms
      const timeout = setTimeout(async () => {
        try {
          console.log('Calling cityService.search...');
          const cities = await cityService.search(value);
          console.log('Search results:', cities);

          setCitySearchResults(cities || []);
          if (!cities || cities.length === 0) {
            setCitySearchError('No results found. Try a more specific search.');
          } else {
            setCitySearchError(null);
          }
        } catch (error) {
          console.error('City search error:', error);
          setCitySearchError('Unable to search. Please try again.');
          setCitySearchResults([]);
        } finally {
          setIsLoadingCities(false);
        }
      }, 350);

      setCitySearchTimeout(timeout);
    } else {
      setIsCitySearchOpen(false);
      setCitySearchResults([]);
      setIsLoadingCities(false);
    }
  };

  const selectCity = (city) => {
    const cityString = `${city.name}, ${city.state}`;
    if (city && !companyInfo.areasServed.includes(cityString)) {
      updateCompanyInfo('areasServed', [...companyInfo.areasServed, cityString]);
    }
    setCitySearchTerm('');
    setIsCitySearchOpen(false);
    setCitySearchResults([]);
  };

  const removeArea = (area) => {
    updateCompanyInfo('areasServed', companyInfo.areasServed.filter(a => a !== area));
  };

  // Service arrays - combined list
  // Helper function to validate if a service has at least one section completed
  const validateServiceCompletion = (service) => {
    const hasPSI = servicePSI[service] && servicePSI[service].trim() !== '';
    const hasChemicals = serviceChemicals[service] && serviceChemicals[service].length > 0;
    const hasSafety = serviceSafetyMeasures[service] && serviceSafetyMeasures[service].length > 0;
    return hasPSI || hasChemicals || hasSafety;
  };

  // Save a service (move from editing to saved)
  const saveService = (service) => {
    if (!validateServiceCompletion(service)) {
      alert('Please complete at least one section (PSI, Chemical, or Safety & Prevention) before saving.');
      return;
    }
    
    // Create saved service object
    const savedService = {
      name: service,
      psi: servicePSI[service] || '',
      chemicals: serviceChemicals[service] || [],
      safetyMeasures: serviceSafetyMeasures[service] || []
    };
    
    // Add to saved services
    setSavedServices(prev => [...prev, savedService]);
    
    // Remove from editing services
    setEditingServices(prev => prev.filter(s => s !== service));
    
    // Remove from selected services
    setSelectedServices(prev => prev.filter(s => s !== service));
  };

  // Delete a saved service
  const deleteSavedService = (serviceName) => {
    setSavedServices(prev => prev.filter(s => s.name !== serviceName));
    
    // Clean up any related state
    setServiceChemicals((prev) => {
      const newChemicals = { ...prev };
      delete newChemicals[serviceName];
      return newChemicals;
    });
    setServicePSI((prev) => {
      const newPSI = { ...prev };
      delete newPSI[serviceName];
      return newPSI;
    });
    setServiceSafetyMeasures((prev) => {
      const newSafetyMeasures = { ...prev };
      delete newSafetyMeasures[serviceName];
      return newSafetyMeasures;
    });
  };

  // Edit a saved service (move from saved to editing)
  const editSavedService = (serviceName) => {
    const savedService = savedServices.find(s => s.name === serviceName);
    if (!savedService) return;
    
    // Add to editing services
    setEditingServices(prev => [...prev, serviceName]);
    setSelectedServices(prev => [...prev, serviceName]);
    
    // Restore data to state
    setServicePSI(prev => ({ ...prev, [serviceName]: savedService.psi }));
    setServiceChemicals(prev => ({ ...prev, [serviceName]: savedService.chemicals }));
    setServiceSafetyMeasures(prev => ({ ...prev, [serviceName]: savedService.safetyMeasures }));
    
    // Remove from saved services
    setSavedServices(prev => prev.filter(s => s.name !== serviceName));
  };

  const toggleService = (service) => {
    const isSelected = selectedServices.includes(service);
    
    if (isSelected) {
      // Remove service from editing
      setEditingServices(prev => prev.filter(s => s !== service));
      setSelectedServices((prev) => prev.filter(s => s !== service));
      // Remove service chemicals
      setServiceChemicals((prev) => {
        const newChemicals = { ...prev };
        delete newChemicals[service];
        return newChemicals;
      });
      // Remove service PSI
      setServicePSI((prev) => {
        const newPSI = { ...prev };
        delete newPSI[service];
        return newPSI;
      });
      // Remove service safety measures
      setServiceSafetyMeasures((prev) => {
        const newSafetyMeasures = { ...prev };
        delete newSafetyMeasures[service];
        return newSafetyMeasures;
      });
      // Remove safety dropdown state
      setSafetyDropdownOpen((prev) => {
        const newDropdownState = { ...prev };
        delete newDropdownState[service];
        return newDropdownState;
      });
      // Remove chemical dropdown state for this service
      setChemicalDropdownOpen((prev) => {
        const newDropdownState = { ...prev };
        delete newDropdownState[`${service}-chemical`];
        return newDropdownState;
      });
    } else {
      // Add service to editing
      setSelectedServices((prev) => [...prev, service]);
      setEditingServices((prev) => [...prev, service]);
      // Initialize service chemicals if it doesn't exist
      setServiceChemicals((prev) => ({
        ...prev,
        [service]: prev[service] || [],
      }));
      // Initialize service PSI if it doesn't exist
      setServicePSI((prev) => ({
        ...prev,
        [service]: prev[service] || '',
      }));
      // Initialize safety dropdown as closed
      setSafetyDropdownOpen((prev) => ({
        ...prev,
        [service]: false,
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

  // Safety measures functions for services
  const toggleServiceSafetyMeasure = (service, measure) => {
    setServiceSafetyMeasures((prev) => {
      const currentMeasures = prev[service] || [];
      if (currentMeasures.includes(measure)) {
        return {
          ...prev,
          [service]: currentMeasures.filter(m => m !== measure)
        };
      } else {
        return {
          ...prev,
          [service]: [...currentMeasures, measure]
        };
      }
    });
  };

  const addCustomSafetyMeasureToService = (service, measure) => {
    const trimmedMeasure = measure.trim();
    if (trimmedMeasure && !(serviceSafetyMeasures[service] || []).includes(trimmedMeasure)) {
      toggleServiceSafetyMeasure(service, trimmedMeasure);
    }
  };

  const selectAllSafetyMeasures = (service, allMeasures) => {
    setServiceSafetyMeasures((prev) => ({
      ...prev,
      [service]: [...allMeasures]
    }));
  };

  const deselectAllSafetyMeasures = (service) => {
    setServiceSafetyMeasures((prev) => ({
      ...prev,
      [service]: []
    }));
  };

  const addCustomChemical = (chemicalName) => {
    if (chemicalName.trim() && !allChemicals.includes(chemicalName.trim()) && !customChemicals.includes(chemicalName.trim())) {
      setCustomChemicals([...customChemicals, chemicalName.trim()]);
      return true;
    }
    return false;
  };

  const addCustomService = () => {
    const trimmedService = newService.trim();
    if (trimmedService) {
      // Check if it doesn't exist in any of the service arrays
      const allBaseServices = [
        ...softWashingServices,
        ...pressureWashingServices,
        ...specialtyCleaningServices,
        ...windowCleaningServices
      ];
      const allCustomServices = [
        ...customSoftWashingServices,
        ...customPressureWashingServices,
        ...customSpecialtyCleaningServices,
        ...customWindowCleaningServices,
        ...customServices
      ];
      
      if (!allBaseServices.includes(trimmedService) && !allCustomServices.includes(trimmedService)) {
        // Determine which category to add it to based on user input or default to specialty cleaning
        // For now, we'll add it to customServices and let the user see it in the appropriate section
        setCustomServices((prev) => [...prev, trimmedService]);
        setSelectedServices((prev) => {
          if (!prev.includes(trimmedService)) {
            return [...prev, trimmedService];
          }
          return prev;
        });
        setNewService('');
      }
    }
  };

  const removeCustomService = (service) => {
    setCustomServices((prev) => prev.filter(s => s !== service));
    setSelectedServices((prev) => prev.filter(s => s !== service));
  };


  // Cleanup city search timeout on unmount
  useEffect(() => {
    return () => {
      if (citySearchTimeout) {
        clearTimeout(citySearchTimeout);
      }
    };
  }, [citySearchTimeout]);

  // Close city search dropdown when clicking outside
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

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownOpen && !event.target.closest('.services-dropdown-container')) {
        setServicesDropdownOpen(false);
      }
    };

    if (servicesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [servicesDropdownOpen]);

  // Close chemical dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if any chemical dropdown is open
      const hasOpenDropdown = Object.values(chemicalDropdownOpen).some(isOpen => isOpen);
      
      if (hasOpenDropdown) {
        // Check if click is outside any chemical dropdown
        const clickedInsideDropdown = event.target.closest('.chemical-dropdown-container');
        if (!clickedInsideDropdown) {
          // Close all open chemical dropdowns
          setChemicalDropdownOpen({});
        }
      }
    };

    const hasOpenDropdown = Object.values(chemicalDropdownOpen).some(isOpen => isOpen);
    if (hasOpenDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [chemicalDropdownOpen]);

  // Click outside handler for safety dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if any safety dropdown is open
      const hasOpenDropdown = Object.values(safetyDropdownOpen).some(isOpen => isOpen);
      
      if (hasOpenDropdown) {
        // Check if click is outside any safety dropdown
        const clickedInsideDropdown = event.target.closest('.safety-dropdown-container');
        if (!clickedInsideDropdown) {
          // Close all open safety dropdowns
          setSafetyDropdownOpen({});
        }
      }
    };

    const hasOpenDropdown = Object.values(safetyDropdownOpen).some(isOpen => isOpen);
    if (hasOpenDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [safetyDropdownOpen]);

  const handleSaveCompanyInfo = () => {
    // Implementation would go here
  };

  const handleSaveServicesOffered = () => {
    // Implementation would go here
  };

  // Helper function to parse time string (e.g., "8:00 AM" -> {time: "8:00", period: "AM"})
  const parseTimeString = (timeStr) => {
    if (!timeStr || typeof timeStr !== 'string') {
      return { time: '', period: 'AM' };
    }
    // First, try to extract AM/PM if present
    const periodMatch = timeStr.match(/\s*(AM|PM)\s*$/i);
    const period = periodMatch ? periodMatch[1].toUpperCase() : 'AM';
    
    // Remove AM/PM and get just the time part
    const timeOnly = timeStr.replace(/\s*(AM|PM)\s*$/i, '').trim();
    
    return { time: timeOnly, period: period };
  };

  // Helper function to validate time format (HH:MM or H:MM)
  const validateTimeFormat = (timeStr) => {
    if (!timeStr || timeStr.trim() === '') {
      return true; // Empty is valid (will be caught by completion check)
    }
    
    // Allow partial input during typing (e.g., "8", "8:", "8:0")
    // Only validate if it looks like a complete time (has colon and 2 digits after it)
    if (!timeStr.match(/^\d{1,2}:\d{2}$/)) {
      return true; // Don't mark as invalid while user is still typing
    }
    
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) {
      return false;
    }
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59;
  };

  // Helper function to combine time and period (e.g., "8:00" + "AM" -> "8:00 AM")
  const combineTimeAndPeriod = (time, period) => {
    if (!time || time.trim() === '') {
      return '';
    }
    // Only add period if time has proper format or partial format
    // This allows typing partial times like "8" or "8:"
    return `${time.trim()} ${period}`;
  };

  // Helper function to auto-complete time format (e.g., "4" -> "4:00", "8:" -> "8:00")
  const autoCompleteTime = (timeStr) => {
    if (!timeStr || timeStr.trim() === '') {
      return '';
    }
    
    const trimmed = timeStr.trim();
    
    // If it's already in correct format, return as is
    if (trimmed.match(/^\d{1,2}:\d{2}$/)) {
      return trimmed;
    }
    
    // If it's just a number (e.g., "4"), add ":00"
    if (trimmed.match(/^\d{1,2}$/)) {
      return `${trimmed}:00`;
    }
    
    // If it's number with colon but no/incomplete minutes (e.g., "8:", "8:0"), complete minutes
    if (trimmed.match(/^\d{1,2}:(\d?)$/)) {
      const parts = trimmed.split(':');
      const minutes = parts[1] || '0';
      return `${parts[0]}:${minutes.padStart(2, '0')}`;
    }
    
    // Return as is if we can't parse it
    return trimmed;
  };

  // Helper function to validate completed time (stricter validation for final value)
  const validateCompletedTime = (timeStr) => {
    if (!timeStr || timeStr.trim() === '') {
      return { valid: true, error: '' };
    }
    
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) {
      return { valid: false, error: 'Invalid format' };
    }
    
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    
    if (hours < 1 || hours > 12) {
      return { valid: false, error: 'Hours must be 1-12' };
    }
    
    if (minutes < 0 || minutes > 59) {
      return { valid: false, error: 'Minutes must be 0-59' };
    }
    
    return { valid: true, error: '' };
  };

  return (<div className="my-business-container">
            {/* Quote Section */}
            {/* Company Information Section */}
            <div className="company-info-section">
              <div className="company-info-header">
                <h2 className="company-info-title">Company Information</h2>
              </div>
              
              {/* Two Column Layout: 20% Tabs | 80% Content */}
              <div className="flex gap-4 mt-6">
                {/* Left Column - Tabs (min-width to show full titles) */}
                <div className="min-w-[200px] w-1/5 flex flex-col gap-4">
                  {/* Basic Information Section */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Basic Information</h4>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Contact Details')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Contact Details' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 flex-1">Contact Details</span>
                    {(() => {
                      const { completed, total } = getCompanyDetailsCompletion();
                      const isComplete = completed === total;
                      return (
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Areas Served')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Areas Served' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 flex-1">Areas Served</span>
                        {(() => {
                          const { completed, total } = getAreasServedCompletionLocal();
                          const isComplete = completed === total;
                          return (
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              <span>{completed}/{total}</span>
                    </div>
                          );
                        })()}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Operating Hours')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Operating Hours' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <Clock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 flex-1">Operating Hours</span>
                        {(() => {
                          const { completed, total } = getOperatingHoursCompletionLocal();
                          const isComplete = completed === total;
                          return (
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              <span>{completed}/{total}</span>
                  </div>
                          );
                        })()}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Services Offered')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Services Offered' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <Briefcase className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 flex-1">Services Offered</span>
                        {(() => {
                          const { completed, total } = getServicesOfferedCompletionLocal();
                          const isComplete = completed === total;
                          return (
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              <span>{completed}/{total}</span>
                            </div>
                          );
                        })()}
                      </button>
                    </div>
                  </div>
                  
                  {/* Credentials & Protection Section */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Credentials & Protection</h4>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Certifications')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Certifications' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 truncate">Certifications</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Insurance')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Insurance' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 truncate">Insurance</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Guarantee/Warranty')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Guarantee/Warranty' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 truncate">Guarantee/Warranty</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Customize Forms Section */}
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Customize Forms</h4>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Forms')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Forms' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <FileText className="w-5 h-5 text-fuchsia-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 truncate">Forms</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Content (80%) */}
                <div className="flex-1">
                  <div className="bg-slate-50 rounded-2xl p-6 min-h-[400px]">
                    {/* Contact Details Content */}
                    {selectedTab === 'Contact Details' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 flex-1">Contact Details</h3>
                      {savedContactDetails && !editingContactDetails && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingContactDetails(true);
                            updateCompanyInfo('companyName', savedContactDetails.companyName);
                            updateCompanyInfo('phone', savedContactDetails.phone);
                            updateCompanyInfo('email', savedContactDetails.email);
                            updateCompanyInfo('website', savedContactDetails.website);
                            updateCompanyInfo('street', savedContactDetails.street);
                            updateCompanyInfo('street2', savedContactDetails.street2);
                            updateCompanyInfo('city', savedContactDetails.city);
                            updateCompanyInfo('state', savedContactDetails.state);
                            updateCompanyInfo('zip', savedContactDetails.zip);
                          }}
                          className="group p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                        </button>
                      )}
                  </div>

                    <div className="bg-slate-50 rounded-xl p-4 flex flex-col min-h-[300px]">
                      <div className="flex-1">
                      {savedContactDetails && !editingContactDetails ? (
                        // Display Mode
                        <div className="space-y-6">
                          {/* Company Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <p className="text-sm italic text-gray-600">{savedContactDetails.companyName}</p>
                          </div>

                          {/* Contact Info */}
                          <div className="pt-6 border-t border-slate-300">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                                <p className="text-sm italic text-gray-600">{savedContactDetails.phone}</p>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                                <p className="text-sm italic text-gray-600">{savedContactDetails.email}</p>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
                                <p className="text-sm italic text-gray-600">{savedContactDetails.website || '—'}</p>
                              </div>
                            </div>
                          </div>

                          {/* Address */}
                          <div className="pt-6 border-t border-slate-300">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Street Address</label>
                                <p className="text-sm italic text-gray-600">{savedContactDetails.street}</p>
                              </div>
                              {savedContactDetails.street2 && (
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Street Address Line 2</label>
                                  <p className="text-sm italic text-gray-600">{savedContactDetails.street2}</p>
                                </div>
                              )}
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                                  <p className="text-sm italic text-gray-600">{savedContactDetails.city}</p>
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
                                  <p className="text-sm italic text-gray-600">{savedContactDetails.state}</p>
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">ZIP Code</label>
                                  <p className="text-sm italic text-gray-600">{savedContactDetails.zip}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Edit Mode
                        <div className="space-y-4">
                      <div className="form-field">
                        <label className="form-label flex items-center gap-1">
                          Company Name
                          {contactDetailsSaveAttempted && (!companyInfo.companyName || companyInfo.companyName.trim() === '') && (
                          <span className="text-red-500 text-sm">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          value={companyInfo.companyName || ''}
                          onChange={(e) => updateCompanyInfo('companyName', e.target.value)}
                          placeholder="Enter company name"
                          className="form-input"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label flex items-center gap-1">
                          Phone Number
                          {contactDetailsSaveAttempted && (!companyInfo.phone || companyInfo.phone.trim() === '') && (
                          <span className="text-red-500 text-sm">*</span>
                          )}
                        </label>
                        <input
                          type="tel"
                          value={companyInfo.phone || ''}
                          onKeyDown={(e) => {
                            // Handle backspace to delete through formatting characters
                            if (e.key === 'Backspace') {
                              const input = e.target;
                              const cursorPos = input.selectionStart;
                              const value = input.value;
                              
                              // If cursor is right after a formatting character, delete the digit before it
                              if (cursorPos > 0) {
                                const charBefore = value[cursorPos - 1];
                                if (charBefore === ')' || charBefore === ' ' || charBefore === '-') {
                                  e.preventDefault();
                                  // Remove all non-digits and delete the last digit
                                  const cleaned = value.replace(/\D/g, '');
                                  const newCleaned = cleaned.slice(0, -1);
                                  
                                  // Re-format
                                  let formatted = newCleaned;
                                  if (newCleaned.length >= 6) {
                                    formatted = `(${newCleaned.slice(0, 3)}) ${newCleaned.slice(3, 6)}-${newCleaned.slice(6, 10)}`;
                                  } else if (newCleaned.length >= 3) {
                                    formatted = `(${newCleaned.slice(0, 3)}) ${newCleaned.slice(3)}`;
                                  }
                                  
                                  updateCompanyInfo('phone', formatted);
                                  
                                  // Clear error when user types
                                  if (contactDetailsErrors.phone) {
                                    setContactDetailsErrors(prev => ({ ...prev, phone: null }));
                                  }
                                }
                              }
                            }
                          }}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Auto-format phone number
                            const cleaned = value.replace(/\D/g, '');
                            let formatted = cleaned;
                            if (cleaned.length >= 6) {
                              formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
                            } else if (cleaned.length >= 3) {
                              formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
                            }
                            updateCompanyInfo('phone', formatted);
                            // Clear error when user types
                            if (contactDetailsErrors.phone) {
                              setContactDetailsErrors(prev => ({ ...prev, phone: null }));
                            }
                          }}
                          placeholder="(555) 123-4567"
                          className={`form-input ${contactDetailsErrors.phone ? 'border-red-500' : ''}`}
                          required
                        />
                        {contactDetailsErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{contactDetailsErrors.phone}</p>
                        )}
                      </div>

                      <div className="form-field">
                        <label className="form-label flex items-center gap-1">
                          Email
                          {contactDetailsSaveAttempted && (!companyInfo.email || companyInfo.email.trim() === '') && (
                          <span className="text-red-500 text-sm">*</span>
                          )}
                        </label>
                        <input
                          type="email"
                          value={companyInfo.email || ''}
                          onChange={(e) => {
                            updateCompanyInfo('email', e.target.value);
                            // Clear error when user types
                            if (contactDetailsErrors.email) {
                              setContactDetailsErrors(prev => ({ ...prev, email: null }));
                            }
                          }}
                          placeholder="contact@company.com"
                          className={`form-input ${contactDetailsErrors.email ? 'border-red-500' : ''}`}
                          required
                        />
                        {contactDetailsErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{contactDetailsErrors.email}</p>
                        )}
                      </div>

                      <div className="form-field">
                        <label className="form-label">Website (Optional)</label>
                        <input
                          type="url"
                          value={companyInfo.website || ''}
                          onChange={(e) => {
                            updateCompanyInfo('website', e.target.value);
                            // Clear error when user types
                            if (contactDetailsErrors.website) {
                              setContactDetailsErrors(prev => ({ ...prev, website: null }));
                            }
                          }}
                          placeholder="https://www.yourcompany.com"
                          className={`form-input ${contactDetailsErrors.website ? 'border-red-500' : ''}`}
                        />
                        {contactDetailsErrors.website && (
                          <p className="text-red-500 text-xs mt-1">{contactDetailsErrors.website}</p>
                        )}
                      </div>

                          <div className="form-field">
                            <label className="form-label flex items-center gap-1">
                              Street Address
                              {contactDetailsSaveAttempted && (!companyInfo.street || companyInfo.street.trim() === '') && (
                              <span className="text-red-500 text-sm">*</span>
                              )}
                            </label>
                            <input
                              type="text"
                              value={companyInfo.street || ''}
                              onChange={(e) => updateCompanyInfo('street', e.target.value)}
                              placeholder="123 Main Street"
                              className="form-input"
                              required
                            />
                          </div>

                          <div className="form-field">
                            <label className="form-label">Street Address Line 2 (Optional)</label>
                            <input
                              type="text"
                              value={companyInfo.street2 || ''}
                              onChange={(e) => updateCompanyInfo('street2', e.target.value)}
                              placeholder="Apartment, suite, unit, building, floor, etc."
                              className="form-input"
                            />
                          </div>

                          <div className="form-grid-2">
                            <div className="form-field">
                              <label className="form-label flex items-center gap-1">
                                City
                                {contactDetailsSaveAttempted && (!companyInfo.city || companyInfo.city.trim() === '') && (
                                <span className="text-red-500 text-sm">*</span>
                                )}
                              </label>
                              <input
                                type="text"
                                value={companyInfo.city || ''}
                                onChange={(e) => updateCompanyInfo('city', e.target.value)}
                                placeholder="City"
                                className="form-input"
                                required
                              />
                            </div>

                            <div className="form-field">
                              <label className="form-label flex items-center gap-1">
                                State
                                {contactDetailsSaveAttempted && (!companyInfo.state || companyInfo.state.trim() === '') && (
                                <span className="text-red-500 text-sm">*</span>
                                )}
                              </label>
                          <select
                            value={companyInfo.state || ''}
                                onChange={(e) => updateCompanyInfo('state', e.target.value)}
                                className="form-input"
                                required
                          >
                            <option value="">Select State</option>
                            <option value="AL">AL - Alabama</option>
                            <option value="AK">AK - Alaska</option>
                            <option value="AZ">AZ - Arizona</option>
                            <option value="AR">AR - Arkansas</option>
                            <option value="CA">CA - California</option>
                            <option value="CO">CO - Colorado</option>
                            <option value="CT">CT - Connecticut</option>
                            <option value="DE">DE - Delaware</option>
                            <option value="FL">FL - Florida</option>
                            <option value="GA">GA - Georgia</option>
                            <option value="HI">HI - Hawaii</option>
                            <option value="ID">ID - Idaho</option>
                            <option value="IL">IL - Illinois</option>
                            <option value="IN">IN - Indiana</option>
                            <option value="IA">IA - Iowa</option>
                            <option value="KS">KS - Kansas</option>
                            <option value="KY">KY - Kentucky</option>
                            <option value="LA">LA - Louisiana</option>
                            <option value="ME">ME - Maine</option>
                            <option value="MD">MD - Maryland</option>
                            <option value="MA">MA - Massachusetts</option>
                            <option value="MI">MI - Michigan</option>
                            <option value="MN">MN - Minnesota</option>
                            <option value="MS">MS - Mississippi</option>
                            <option value="MO">MO - Missouri</option>
                            <option value="MT">MT - Montana</option>
                            <option value="NE">NE - Nebraska</option>
                            <option value="NV">NV - Nevada</option>
                            <option value="NH">NH - New Hampshire</option>
                            <option value="NJ">NJ - New Jersey</option>
                            <option value="NM">NM - New Mexico</option>
                            <option value="NY">NY - New York</option>
                            <option value="NC">NC - North Carolina</option>
                            <option value="ND">ND - North Dakota</option>
                            <option value="OH">OH - Ohio</option>
                            <option value="OK">OK - Oklahoma</option>
                            <option value="OR">OR - Oregon</option>
                            <option value="PA">PA - Pennsylvania</option>
                            <option value="RI">RI - Rhode Island</option>
                            <option value="SC">SC - South Carolina</option>
                            <option value="SD">SD - South Dakota</option>
                            <option value="TN">TN - Tennessee</option>
                            <option value="TX">TX - Texas</option>
                            <option value="UT">UT - Utah</option>
                            <option value="VT">VT - Vermont</option>
                            <option value="VA">VA - Virginia</option>
                            <option value="WA">WA - Washington</option>
                            <option value="WV">WV - West Virginia</option>
                            <option value="WI">WI - Wisconsin</option>
                            <option value="WY">WY - Wyoming</option>
                            <option value="DC">DC - District of Columbia</option>
                          </select>
                            </div>
                          </div>

                          <div className="form-field">
                            <label className="form-label flex items-center gap-1">
                              ZIP Code
                              {contactDetailsSaveAttempted && (!companyInfo.zip || companyInfo.zip.trim() === '') && (
                              <span className="text-red-500 text-sm">*</span>
                              )}
                            </label>
                            <input
                              type="text"
                              value={companyInfo.zip || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Only allow numbers and hyphen, limit to 10 characters (12345-6789)
                                const cleaned = value.replace(/[^\d-]/g, '');
                                if (cleaned.length <= 10) {
                                  updateCompanyInfo('zip', cleaned);
                                }
                                // Clear error when user types
                                if (contactDetailsErrors.zip) {
                                  setContactDetailsErrors(prev => ({ ...prev, zip: null }));
                                }
                              }}
                              placeholder="12345 or 12345-6789"
                              className={`form-input ${contactDetailsErrors.zip ? 'border-red-500' : ''}`}
                              required
                            />
                            {contactDetailsErrors.zip && (
                              <p className="text-red-500 text-xs mt-1">{contactDetailsErrors.zip}</p>
                            )}
                          </div>

                        </div>
                      )}
                      </div>

                      {/* Save button - only shown in edit mode */}
                      {editingContactDetails && (
                        <div className="flex items-center justify-end gap-3 mt-auto pt-4">
                          {contactDetailsSaveAttempted && (() => {
                            const { completed, total } = getCompanyDetailsCompletion();
                            const isComplete = completed === total;
                            const hasFormatErrors = Object.keys(contactDetailsErrors).length > 0;
                            
                            if (!isComplete) {
                              return (
                                <span className="text-red-600 text-sm font-medium">
                                  <span className="text-red-500">*</span> Please complete all required fields
                                </span>
                              );
                            } else if (hasFormatErrors) {
                              return (
                                <span className="text-red-600 text-sm font-medium">
                                  <span className="text-red-500">*</span> Please correct formatting errors
                                </span>
                              );
                            }
                            return null;
                          })()}
                          <button
                            type="button"
                            onClick={() => {
                              setContactDetailsSaveAttempted(true);
                              const { completed, total } = getCompanyDetailsCompletion();
                              const isComplete = completed === total;
                              
                              // Validate formats
                              const errors = {};
                              
                              // Phone validation - must be 10 digits
                              if (companyInfo.phone) {
                                const phoneDigits = companyInfo.phone.replace(/\D/g, '');
                                if (phoneDigits.length !== 10) {
                                  errors.phone = 'Phone number must be 10 digits';
                                }
                              }
                              
                              // Email validation
                              if (companyInfo.email) {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(companyInfo.email)) {
                                  errors.email = 'Please enter a valid email address';
                                }
                              }
                              
                              // Website validation (if provided)
                              if (companyInfo.website && companyInfo.website.trim() !== '') {
                                const urlRegex = /^https?:\/\/.+\..+/i;
                                if (!urlRegex.test(companyInfo.website)) {
                                  errors.website = 'Please enter a valid URL (e.g., https://www.example.com)';
                                }
                              }
                              
                              // ZIP code validation - must be 5 digits or 5+4 format
                              if (companyInfo.zip) {
                                const zipRegex = /^\d{5}(-\d{4})?$/;
                                if (!zipRegex.test(companyInfo.zip)) {
                                  errors.zip = 'ZIP code must be 5 digits or 5+4 format (e.g., 12345 or 12345-6789)';
                                }
                              }
                              
                              setContactDetailsErrors(errors);
                              
                              if (isComplete && Object.keys(errors).length === 0) {
                                // Save contact details
                                setSavedContactDetails({
                                  companyName: companyInfo.companyName,
                                  phone: companyInfo.phone,
                                  email: companyInfo.email,
                                  website: companyInfo.website,
                                  street: companyInfo.street,
                                  street2: companyInfo.street2,
                                  city: companyInfo.city,
                                  state: companyInfo.state,
                                  zip: companyInfo.zip
                                });
                                setEditingContactDetails(false);
                                setContactDetailsSaveAttempted(false);
                                setContactDetailsErrors({});
                                alert('Contact details saved successfully!');
                              }
                            }}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          >
                            Save
                          </button>
                          </div>
                      )}
                      </div>
                    </div>
                  )}

                    {/* Areas Served Content */}
                    {selectedTab === 'Areas Served' && (
                      <div>
                {/* Areas Served */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Areas Served</h3>
                    {savedAreasServed.length > 0 && !editingAreasServed && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAreasServed(true);
                          updateCompanyInfo('areasServed', savedAreasServed);
                        }}
                        className="group p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                      </button>
                    )}
                  </div>

                    <div className="space-y-5">
                      {/* Areas Served Content - Gray Box */}
                      <div className="bg-slate-50 rounded-xl p-4 flex flex-col min-h-[300px]">
                      <div className="flex-1">
                      {savedAreasServed.length > 0 && !editingAreasServed ? (
                        // Display Mode
                        <div>
                          <div className="flex flex-wrap gap-3">
                              {savedAreasServed.map((area) => (
                                <div
                                  key={area}
                                  className="px-4 py-2 rounded-lg text-sm font-semibold italic bg-white text-gray-900 border border-slate-200 shadow-sm"
                                >
                                  {area}
                    </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        // Edit Mode
                        <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          Search and Add Cities
                          {areasServedSaveAttempted && companyInfo.areasServed.length === 0 && (
                            <span className="text-red-500 text-sm">*</span>
                          )}
                        </label>
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
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-sm bg-white shadow-sm"
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
                                  key={`${city.name}-${city.state}-${index}`}
                                  type="button"
                                  onClick={() => selectCity(city)}
                                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors text-sm text-gray-700 border-b border-slate-100 last:border-b-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <div>
                                      <div className="font-medium">{city.name}, {city.state}</div>
                                      {city.county && (
                                        <div className="text-xs text-gray-400">{city.county}</div>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                          {isCitySearchOpen && !isLoadingCities && citySearchTerm.length >= 2 && citySearchResults.length === 0 && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-xl p-4">
                              <p className="text-sm text-gray-500 text-center">{citySearchError || 'No cities found. Try a different search term.'}</p>
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
                  )}
                </div>

                      {/* Save button - only shown in edit mode */}
                      {editingAreasServed && (
                      <div className="flex items-center justify-end gap-3 mt-auto pt-4">
                        {areasServedSaveAttempted && companyInfo.areasServed.length === 0 && (
                          <span className="text-red-600 text-sm font-medium">
                            <span className="text-red-500">*</span> Please add at least one city
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setAreasServedSaveAttempted(true);
                            if (companyInfo.areasServed.length > 0) {
                              setSavedAreasServed(companyInfo.areasServed);
                              setEditingAreasServed(false);
                              setAreasServedSaveAttempted(false);
                            }
                          }}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        >
                          Save
                        </button>
                    </div>
                      )}
                        </div>
                    </div>
                  </div>
                      </div>
                    )}

                    {/* Operating Hours Content */}
                    {selectedTab === 'Operating Hours' && (
                      <div>
                {/* Operating Hours */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Operating Hours</h3>
                    {savedOperatingHours.length > 0 && !editingOperatingHours && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingOperatingHours(true);
                          // Restore saved values to edit
                          updateCompanyInfo('operatingHours', savedOperatingHours);
                        }}
                        className="group p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                    <div className="bg-slate-50 rounded-xl p-4 flex flex-col min-h-[300px]">
                      <div className="flex-1">
                      {savedOperatingHours.length > 0 && !editingOperatingHours ? (
                        // Display Mode
                        <div>
                          <div className="space-y-3">
                          {savedOperatingHours.map((hours, index) => (
                            <div key={index} className="flex items-start justify-between py-2 border-b border-slate-200 last:border-b-0">
                              <span className="text-sm font-medium text-gray-700 w-24 pt-0.5">{hours.day}</span>
                              <div className="flex flex-col items-end gap-1">
                                {hours.closed ? (
                                  <span className="text-sm italic text-gray-600">Closed</span>
                                ) : hours.open24hr ? (
                                  <span className="text-sm italic text-gray-600">Open 24 Hours</span>
                                ) : hours.segments && hours.segments.length > 0 ? (
                                  hours.segments.map((segment, segIdx) => (
                                    <span key={segIdx} className="text-sm italic text-gray-600">
                                      {segment.open} - {segment.close}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-sm italic text-gray-600">
                                    {hours.open} - {hours.close}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                          </div>
                        </div>
                      ) : (
                        // Edit Mode
                        <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Set your default hours of operation. You can add multiple time slots per day.
                      </p>
                      <div className="space-y-3">
                        {companyInfo.operatingHours.map((hours, index) => {
                          // Get segments or create from legacy open/close
                          const segments = hours.segments || (hours.open || hours.close ? [{ open: hours.open || '', close: hours.close || '' }] : [{ open: '', close: '' }]);

                          const isDayComplete =
                            hours.closed === true ||
                            hours.open24hr === true ||
                            segments.every(seg => {
                              const openTime = parseTimeString(seg.open).time;
                              const closeTime = parseTimeString(seg.close).time;
                              return openTime && openTime.trim() !== '' && closeTime && closeTime.trim() !== '' &&
                                     validateTimeFormat(openTime) && validateTimeFormat(closeTime);
                            });
                          const isDayIncomplete = !isDayComplete;

                          return (
                          <div key={index} className="p-3 bg-white rounded-lg border border-slate-200">
                            <div className="flex items-center gap-4 mb-2">
                              <div className="w-24 font-medium text-gray-900 text-sm flex items-center gap-1 flex-shrink-0">
                                {hours.day}
                                {operatingHoursSaveAttempted && isDayIncomplete && (
                                  <span className="text-red-500 text-sm">*</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <input
                                  type="checkbox"
                                  checked={hours.closed || false}
                                  onChange={(e) => {
                                    const updatedHours = [...companyInfo.operatingHours];
                                    updatedHours[index] = {
                                      ...updatedHours[index],
                                      closed: e.target.checked,
                                      open24hr: false,
                                      segments: [{ open: '', close: '' }]
                                    };
                                    updateCompanyInfo('operatingHours', updatedHours);
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 accent-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <label className="text-sm text-gray-700">Closed</label>
                              </div>
                              <div className={`flex items-center gap-2 flex-shrink-0 ${hours.closed ? 'opacity-50' : ''}`}>
                                <input
                                  type="checkbox"
                                  checked={hours.open24hr || false}
                                  onChange={(e) => {
                                    const updatedHours = [...companyInfo.operatingHours];
                                    updatedHours[index] = {
                                      ...updatedHours[index],
                                      open24hr: e.target.checked,
                                      closed: false,
                                      segments: [{ open: '', close: '' }]
                                    };
                                    updateCompanyInfo('operatingHours', updatedHours);
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 accent-blue-600 focus:ring-blue-500 focus:ring-2"
                                  disabled={hours.closed}
                                />
                                <label className="text-sm text-gray-700">Open 24hr</label>
                              </div>
                            </div>

                            {/* Time segments */}
                            {!hours.closed && !hours.open24hr && (
                              <div className="ml-28 space-y-2">
                                {segments.map((segment, segIndex) => (
                                  <div key={segIndex} className="flex items-center gap-2">
                                    <label className="text-xs text-gray-600 w-10">Open:</label>
                                    <input
                                      type="text"
                                      value={parseTimeString(segment.open).time}
                                      onChange={(e) => {
                                        const timeValue = e.target.value;
                                        const period = parseTimeString(segment.open).period;
                                        const updatedHours = [...companyInfo.operatingHours];
                                        const newSegments = [...segments];
                                        newSegments[segIndex] = { ...newSegments[segIndex], open: combineTimeAndPeriod(timeValue, period) };
                                        updatedHours[index] = { ...updatedHours[index], segments: newSegments };
                                        updateCompanyInfo('operatingHours', updatedHours);

                                        const errors = {...operatingHoursTimeErrors};
                                        delete errors[`${index}-${segIndex}-open`];
                                        setOperatingHoursTimeErrors(errors);
                                      }}
                                      onBlur={(e) => {
                                        const timeValue = e.target.value;
                                        if (!timeValue || timeValue.trim() === '') return;

                                        const completedTime = autoCompleteTime(timeValue);
                                        const period = parseTimeString(segment.open).period;
                                        const validation = validateCompletedTime(completedTime);
                                        const errors = {...operatingHoursTimeErrors};

                                        if (!validation.valid) {
                                          errors[`${index}-${segIndex}-open`] = validation.error;
                                        } else {
                                          delete errors[`${index}-${segIndex}-open`];
                                        }
                                        setOperatingHoursTimeErrors(errors);

                                        const updatedHours = [...companyInfo.operatingHours];
                                        const newSegments = [...segments];
                                        newSegments[segIndex] = { ...newSegments[segIndex], open: combineTimeAndPeriod(completedTime, period) };
                                        updatedHours[index] = { ...updatedHours[index], segments: newSegments };
                                        updateCompanyInfo('operatingHours', updatedHours);
                                      }}
                                      placeholder="8:00"
                                      className={`w-16 px-2 py-1.5 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white ${
                                        operatingHoursTimeErrors[`${index}-${segIndex}-open`] ? 'border-red-500' : 'border-slate-300'
                                      }`}
                                    />
                                    <select
                                      value={parseTimeString(segment.open).period}
                                      onChange={(e) => {
                                        const time = parseTimeString(segment.open).time;
                                        const updatedHours = [...companyInfo.operatingHours];
                                        const newSegments = [...segments];
                                        newSegments[segIndex] = { ...newSegments[segIndex], open: combineTimeAndPeriod(time, e.target.value) };
                                        updatedHours[index] = { ...updatedHours[index], segments: newSegments };
                                        updateCompanyInfo('operatingHours', updatedHours);
                                      }}
                                      className="px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                    >
                                      <option value="AM">AM</option>
                                      <option value="PM">PM</option>
                                    </select>

                                    <span className="text-gray-400">-</span>

                                    <label className="text-xs text-gray-600 w-10">Close:</label>
                                    <input
                                      type="text"
                                      value={parseTimeString(segment.close).time}
                                      onChange={(e) => {
                                        const timeValue = e.target.value;
                                        const period = parseTimeString(segment.close).period;
                                        const updatedHours = [...companyInfo.operatingHours];
                                        const newSegments = [...segments];
                                        newSegments[segIndex] = { ...newSegments[segIndex], close: combineTimeAndPeriod(timeValue, period) };
                                        updatedHours[index] = { ...updatedHours[index], segments: newSegments };
                                        updateCompanyInfo('operatingHours', updatedHours);

                                        const errors = {...operatingHoursTimeErrors};
                                        delete errors[`${index}-${segIndex}-close`];
                                        setOperatingHoursTimeErrors(errors);
                                      }}
                                      onBlur={(e) => {
                                        const timeValue = e.target.value;
                                        if (!timeValue || timeValue.trim() === '') return;

                                        const completedTime = autoCompleteTime(timeValue);
                                        const period = parseTimeString(segment.close).period;
                                        const validation = validateCompletedTime(completedTime);
                                        const errors = {...operatingHoursTimeErrors};

                                        if (!validation.valid) {
                                          errors[`${index}-${segIndex}-close`] = validation.error;
                                        } else {
                                          delete errors[`${index}-${segIndex}-close`];
                                        }
                                        setOperatingHoursTimeErrors(errors);

                                        const updatedHours = [...companyInfo.operatingHours];
                                        const newSegments = [...segments];
                                        newSegments[segIndex] = { ...newSegments[segIndex], close: combineTimeAndPeriod(completedTime, period) };
                                        updatedHours[index] = { ...updatedHours[index], segments: newSegments };
                                        updateCompanyInfo('operatingHours', updatedHours);
                                      }}
                                      placeholder="6:00"
                                      className={`w-16 px-2 py-1.5 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white ${
                                        operatingHoursTimeErrors[`${index}-${segIndex}-close`] ? 'border-red-500' : 'border-slate-300'
                                      }`}
                                    />
                                    <select
                                      value={parseTimeString(segment.close).period}
                                      onChange={(e) => {
                                        const time = parseTimeString(segment.close).time;
                                        const updatedHours = [...companyInfo.operatingHours];
                                        const newSegments = [...segments];
                                        newSegments[segIndex] = { ...newSegments[segIndex], close: combineTimeAndPeriod(time, e.target.value) };
                                        updatedHours[index] = { ...updatedHours[index], segments: newSegments };
                                        updateCompanyInfo('operatingHours', updatedHours);
                                      }}
                                      className="px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                    >
                                      <option value="AM">AM</option>
                                      <option value="PM">PM</option>
                                    </select>

                                    {/* Remove segment button (only show if more than 1 segment) */}
                                    {segments.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updatedHours = [...companyInfo.operatingHours];
                                          const newSegments = segments.filter((_, i) => i !== segIndex);
                                          updatedHours[index] = { ...updatedHours[index], segments: newSegments };
                                          updateCompanyInfo('operatingHours', updatedHours);
                                        }}
                                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                        title="Remove time slot"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                ))}

                                {/* Add segment button */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedHours = [...companyInfo.operatingHours];
                                    const newSegments = [...segments, { open: '', close: '' }];
                                    updatedHours[index] = { ...updatedHours[index], segments: newSegments };
                                    updateCompanyInfo('operatingHours', updatedHours);
                                  }}
                                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-1"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add time slot
                                </button>
                              </div>
                            )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                      {/* Save button (only in edit mode) */}
                      {editingOperatingHours && (
                        <div className="flex items-center justify-end gap-3 mt-auto pt-4">
                          {operatingHoursSaveAttempted && (() => {
                            const { completed, total } = getOperatingHoursCompletionLocal();
                      const isComplete = completed === total;
                            const hasTimeErrors = Object.keys(operatingHoursTimeErrors).length > 0;
                            if (!isComplete) {
                      return (
                                <span className="text-red-600 text-sm font-medium">
                                  <span className="text-red-500">*</span> Please fill in all days
                                </span>
                              );
                            } else if (hasTimeErrors) {
                              return (
                                <span className="text-red-600 text-sm font-medium">
                                  <span className="text-red-500">*</span> Please fix invalid time formats
                                </span>
                              );
                            }
                            return null;
                    })()}
                            <button
                              type="button"
                                  onClick={() => {
                              setOperatingHoursSaveAttempted(true);

                              // Validate all times with auto-completion (supports segments)
                              const errors = {};
                              const updatedHours = companyInfo.operatingHours.map((hours, index) => {
                                if (!hours.closed && !hours.open24hr) {
                                  // Get segments or create from legacy
                                  const segments = hours.segments || (hours.open || hours.close ? [{ open: hours.open || '', close: hours.close || '' }] : [{ open: '', close: '' }]);

                                  const updatedSegments = segments.map((segment, segIndex) => {
                                    const openTime = parseTimeString(segment.open).time;
                                    const closeTime = parseTimeString(segment.close).time;

                                    const completedOpen = autoCompleteTime(openTime);
                                    const completedClose = autoCompleteTime(closeTime);

                                    const openValidation = validateCompletedTime(completedOpen);
                                    const closeValidation = validateCompletedTime(completedClose);

                                    if (!openValidation.valid) {
                                      errors[`${index}-${segIndex}-open`] = openValidation.error;
                                    }
                                    if (!closeValidation.valid) {
                                      errors[`${index}-${segIndex}-close`] = closeValidation.error;
                                    }

                                    const period = parseTimeString(segment.open).period;
                                    const closePeriod = parseTimeString(segment.close).period;
                                    return {
                                      open: combineTimeAndPeriod(completedOpen, period),
                                      close: combineTimeAndPeriod(completedClose, closePeriod)
                                    };
                                  });

                                  return { ...hours, segments: updatedSegments };
                                }
                                return hours;
                              });

                              updateCompanyInfo('operatingHours', updatedHours);
                              setOperatingHoursTimeErrors(errors);

                              const { completed, total } = getOperatingHoursCompletionLocal();
                              const isComplete = completed === total;
                              const hasTimeErrors = Object.keys(errors).length > 0;

                              if (isComplete && !hasTimeErrors) {
                                setSavedOperatingHours([...updatedHours]);
                                setEditingOperatingHours(false);
                                setOperatingHoursSaveAttempted(false);
                                setOperatingHoursTimeErrors({});
                              }
                            }}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          >
                            Save
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                    {/* Services Offered Content */}
                    {selectedTab === 'Services Offered' && (
                              <div>
                {/* Services Offered */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">
                      Services Offered
                    </h3>
            </div>

                    <div className="space-y-5">
                      {/* Services Offered Content - Gray Box */}
                      <div className="bg-slate-50 rounded-xl p-4 flex flex-col min-h-[300px]">
                      <div className="flex-1 space-y-4">
              <div className="relative services-dropdown-container">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setServicesDropdownOpen(!servicesDropdownOpen);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                >
                  <span className="text-gray-500">
                    Add service...
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${servicesDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto services-dropdown-container">
                    <div className="p-3 space-y-4" onClick={(e) => e.stopPropagation()}>
                      {/* Soft Washing Section */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Soft Washing</h4>
                        <div className="space-y-1">
                          {[...softWashingServices, ...customSoftWashingServices].map((service) => {
                            const isSelected = selectedServices.includes(service);
                            const isCustom = customServices.includes(service);
                            return (
                              <label
                                key={service}
                                className="flex items-center px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleService(service)}
                                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-gray-700 flex-1">{service}</span>
                                {isCustom && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeCustomService(service);
                                    }}
                                    className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                                    title="Remove custom service"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Pressure Washing Section */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Pressure Washing</h4>
                        <div className="space-y-1">
                          {[...pressureWashingServices, ...customPressureWashingServices].map((service) => {
                            const isSelected = selectedServices.includes(service);
                            const isCustom = customServices.includes(service);
                            return (
                              <label
                                key={service}
                                className="flex items-center px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleService(service)}
                                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-gray-700 flex-1">{service}</span>
                                {isCustom && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeCustomService(service);
                                    }}
                                    className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                                    title="Remove custom service"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Specialty Cleaning Section */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Specialty Cleaning</h4>
                        <div className="space-y-1">
                          {[...specialtyCleaningServices, ...customSpecialtyCleaningServices, ...customServices].map((service) => {
                            const isSelected = selectedServices.includes(service);
                            const isCustom = customServices.includes(service) || customSpecialtyCleaningServices.includes(service);
                            return (
                              <label
                                key={service}
                                className="flex items-center px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleService(service)}
                                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-gray-700 flex-1">{service}</span>
                                {isCustom && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeCustomService(service);
                                    }}
                                    className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                                    title="Remove custom service"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Window Cleaning Section */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Window Cleaning</h4>
                        <div className="space-y-1">
                          {[...windowCleaningServices, ...customWindowCleaningServices].map((service) => {
                            const isSelected = selectedServices.includes(service);
                            const isCustom = customServices.includes(service);
                            return (
                              <label
                                key={service}
                                className="flex items-center px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleService(service)}
                                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-gray-700 flex-1">{service}</span>
                                {isCustom && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeCustomService(service);
                                    }}
                                    className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                                    title="Remove custom service"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Add custom service */}
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all">
                          <input
                            type="text"
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addCustomService();
                              }
                            }}
                            placeholder="Add custom service..."
                            className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm flex-1"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addCustomService();
                            }}
                            className="text-blue-600 hover:text-blue-700"
                            disabled={!newService.trim()}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {(savedServices.length > 0 || selectedServices.length > 0) ? (
                <div className="mt-4 pr-2 max-h-[650px] overflow-y-auto">
                  {/* Service cards with chemicals and PSI */}
                  <div className="space-y-4">
                    
                    {/* Saved Services (Display Mode) */}
                    {savedServices.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Saved Services</h4>
                        {savedServices.map((savedService) => (
                          <div
                            key={savedService.name}
                            className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                          >
                            {/* Header with service name and action buttons */}
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-base font-semibold text-gray-900">{savedService.name}</h3>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => editSavedService(savedService.name)}
                                  className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteSavedService(savedService.name)}
                                  className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                </button>
                              </div>
                            </div>

                            {/* Three Column Layout for Sections */}
                            <div className="grid grid-cols-3 gap-4">
                              {/* Chemicals Section */}
                              <div className="flex flex-col">
                                <label className="block text-xs font-medium text-gray-700 mb-2">Chemicals</label>
                                {savedService.chemicals.length > 0 ? (
                                  <div className={`flex flex-wrap gap-2 ${savedService.chemicals.length > 3 ? 'max-h-[100px] overflow-y-auto pr-1' : ''}`}>
                                    {savedService.chemicals.map((chem, idx) => (
                                      <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-medium">
                                        {chem.chemical} <span className="text-gray-500">({chem.concentration})</span>
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm italic text-gray-400">None added</p>
                                )}
                              </div>

                              {/* Safety Section */}
                              <div className="flex flex-col">
                                <label className="block text-xs font-medium text-gray-700 mb-2">Safety & Prevention</label>
                                {savedService.safetyMeasures.length > 0 ? (
                                  <div className={`flex flex-wrap gap-2 ${savedService.safetyMeasures.length > 3 ? 'max-h-[100px] overflow-y-auto pr-1' : ''}`}>
                                    {savedService.safetyMeasures.map((measure, idx) => (
                                      <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-medium">
                                        {measure}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm italic text-gray-400">None selected</p>
                                )}
                              </div>

                              {/* PSI Section */}
                              <div className="flex flex-col">
                                <label className="block text-xs font-medium text-gray-700 mb-2">PSI</label>
                                {savedService.psi ? (
                                  <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-medium">
                                    {savedService.psi}
                                  </span>
                                ) : (
                                  <p className="text-sm italic text-gray-400">Not specified</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Divider between saved and editing services */}
                    {savedServices.length > 0 && selectedServices.length > 0 && (
                      <div className="border-t-2 border-slate-300 my-6"></div>
                    )}
                    
                    {/* Editing Services (Edit Mode) */}
                    {selectedServices.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Edit Services</h4>
                    {selectedServices.map((service) => {
                      const serviceChemList = serviceChemicals[service] || [];
                      return (
                        <div
                          key={service}
                              className="border rounded-lg p-4 bg-white border-gray-300 relative w-full"
                        >
                          {/* Trash icon in upper right corner */}
                          <button
                            type="button"
                            onClick={() => toggleService(service)}
                                className="group absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Remove service"
                          >
                                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                          </button>
                          <h3 className="text-base font-semibold text-gray-900 mb-4 pr-6">{service}</h3>
                        
                              {/* Horizontal Layout for Sections */}
                              <div className="grid grid-cols-3 gap-4 mb-4">
                        {/* Chemicals Used Section */}
                                <div className="flex flex-col">
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-700 mb-2">Add Chemical:</label>
                            <div className="relative chemical-dropdown-container">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const dropdownKey = `${service}-chemical`;
                                  setChemicalDropdownOpen(prev => ({
                                    ...prev,
                                    [dropdownKey]: !prev[dropdownKey]
                                  }));
                                  if (!chemicalDropdownOpen[dropdownKey]) {
                                    setChemicalSearchTerm(prev => ({ ...prev, [dropdownKey]: '' }));
                                    setNewCustomChemical(prev => ({ ...prev, [dropdownKey]: '' }));
                                  }
                                }}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-left bg-white flex items-center justify-between focus:outline-none focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <span className="text-gray-500">Select or search a chemical...</span>
                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${chemicalDropdownOpen[`${service}-chemical`] ? 'transform rotate-180' : ''}`} />
                              </button>
                              {chemicalDropdownOpen[`${service}-chemical`] && (
                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden chemical-dropdown-container">
                                  <div className="p-2 border-b border-gray-200">
                                    <input
                                      type="text"
                                      value={chemicalSearchTerm[`${service}-chemical`] || ''}
                                      onChange={(e) => setChemicalSearchTerm(prev => ({ ...prev, [`${service}-chemical`]: e.target.value }))}
                                      placeholder="Search chemicals..."
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      onClick={(e) => e.stopPropagation()}
                                      autoFocus
                                    />
                                  </div>
                                  <div className="overflow-y-auto max-h-48">
                                    {(() => {
                                      const searchTerm = (chemicalSearchTerm[`${service}-chemical`] || '').toLowerCase();
                                      const availableChemicals = [...allChemicals, ...customChemicals]
                                        .filter(chem => !serviceChemList.find(c => c.chemical === chem))
                                        .filter(chem => chem.toLowerCase().includes(searchTerm));
                                      return availableChemicals.length > 0 ? (
                                        <>
                                          {availableChemicals.map(chemical => (
                                            <button
                                              key={chemical}
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                addChemicalToService(service, chemical);
                                                setChemicalDropdownOpen(prev => ({ ...prev, [`${service}-chemical`]: false }));
                                                setChemicalSearchTerm(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                              }}
                                              className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors text-gray-700"
                                            >
                                              {chemical}
                                            </button>
                                          ))}
                                          {/* Add custom chemical option */}
                                          <div className="border-t border-gray-200 mt-1 pt-1">
                                            <div className="px-3 py-2 flex items-center gap-2">
                                              <input
                                                type="text"
                                                value={newCustomChemical[`${service}-chemical`] || ''}
                                                onChange={(e) => setNewCustomChemical(prev => ({ ...prev, [`${service}-chemical`]: e.target.value }))}
                                                placeholder="Add custom chemical..."
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                onClick={(e) => e.stopPropagation()}
                                                onKeyPress={(e) => {
                                                  if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const customChem = (newCustomChemical[`${service}-chemical`] || '').trim();
                                                    if (customChem) {
                                                      if (addCustomChemical(customChem)) {
                                                        addChemicalToService(service, customChem);
                                                      }
                                                      setNewCustomChemical(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                                      setChemicalDropdownOpen(prev => ({ ...prev, [`${service}-chemical`]: false }));
                                                      setChemicalSearchTerm(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                                    }
                                                  }
                                                }}
                                              />
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const customChem = (newCustomChemical[`${service}-chemical`] || '').trim();
                                                  if (customChem) {
                                                    if (addCustomChemical(customChem)) {
                                                      addChemicalToService(service, customChem);
                                                    }
                                                    setNewCustomChemical(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                                    setChemicalDropdownOpen(prev => ({ ...prev, [`${service}-chemical`]: false }));
                                                    setChemicalSearchTerm(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                                  }
                                                }}
                                                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                                disabled={!newCustomChemical[`${service}-chemical`]?.trim()}
                                              >
                                                <Plus className="w-3 h-3" />
                                              </button>
                                            </div>
                                          </div>
                                        </>
                                      ) : searchTerm ? (
                                        <div className="px-3 py-2">
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (addCustomChemical(searchTerm)) {
                                                addChemicalToService(service, searchTerm);
                                              }
                                              setChemicalDropdownOpen(prev => ({ ...prev, [`${service}-chemical`]: false }));
                                              setChemicalSearchTerm(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                            }}
                                            className="w-full text-left px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded border border-blue-200"
                                          >
                                            + Add "{searchTerm}"
                                          </button>
                                        </div>
                                      ) : (
                                        <>
                                          <div className="px-3 py-2 text-xs text-gray-500">No chemicals found</div>
                                          {/* Add custom chemical option when no search term */}
                                          <div className="border-t border-gray-200 mt-1 pt-1 px-3 pb-2">
                                            <div className="flex items-center gap-2">
                                              <input
                                                type="text"
                                                value={newCustomChemical[`${service}-chemical`] || ''}
                                                onChange={(e) => setNewCustomChemical(prev => ({ ...prev, [`${service}-chemical`]: e.target.value }))}
                                                placeholder="Add custom chemical..."
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                onClick={(e) => e.stopPropagation()}
                                                onKeyPress={(e) => {
                                                  if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const customChem = (newCustomChemical[`${service}-chemical`] || '').trim();
                                                    if (customChem) {
                                                      if (addCustomChemical(customChem)) {
                                                        addChemicalToService(service, customChem);
                                                      }
                                                      setNewCustomChemical(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                                      setChemicalDropdownOpen(prev => ({ ...prev, [`${service}-chemical`]: false }));
                                                      setChemicalSearchTerm(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                                    }
                                                  }
                                                }}
                                              />
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const customChem = (newCustomChemical[`${service}-chemical`] || '').trim();
                                                  if (customChem) {
                                                    if (addCustomChemical(customChem)) {
                                                      addChemicalToService(service, customChem);
                                                    }
                                                    setNewCustomChemical(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                                    setChemicalDropdownOpen(prev => ({ ...prev, [`${service}-chemical`]: false }));
                                                    setChemicalSearchTerm(prev => ({ ...prev, [`${service}-chemical`]: '' }));
                                                  }
                                                }}
                                                className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                                disabled={!newCustomChemical[`${service}-chemical`]?.trim()}
                                              >
                                                <Plus className="w-3 h-3" />
                                              </button>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })()}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Chemicals List Container */}
                          <div className="space-y-2 h-[120px] overflow-y-auto">
                            {serviceChemList.length > 0 ? (
                              serviceChemList.map((chem, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs bg-slate-50 p-2 rounded border border-slate-200">
                                  <span className="flex-1">{chem.chemical}</span>
                                  <select
                                    value={chem.concentration}
                                    onChange={(e) => updateChemicalConcentration(service, chem.chemical, e.target.value)}
                                    className="px-2 py-1 border border-gray-300 rounded text-xs w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                              ))
                            ) : (
                              <div className="h-full flex items-center justify-center text-xs text-gray-400">
                                No chemicals added
                              </div>
                            )}
                          </div>
                        </div>

                                {/* Safety & Prevention Section */}
                                <div className="flex flex-col">
                                  <label className="block text-xs font-medium text-gray-700 mb-2">Safety & Prevention:</label>
                          <div className="relative safety-dropdown-container">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                                setSafetyDropdownOpen(prev => ({
                                  ...prev,
                                  [service]: !prev[service]
                                }));
                                if (!safetyDropdownOpen[service]) {
                                  setSafetySearchTerm(prev => ({ ...prev, [service]: '' }));
                                }
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <span className="text-gray-500">Select safety measures...</span>
                              <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${safetyDropdownOpen[service] ? 'transform rotate-180' : ''}`} />
                </button>
                            {safetyDropdownOpen[service] && (
                              <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden safety-dropdown-container">
                                {/* Search box */}
                                <div className="p-2 border-b border-gray-200">
                                  <input
                                    type="text"
                                    value={safetySearchTerm[service] || ''}
                                    onChange={(e) => setSafetySearchTerm(prev => ({ ...prev, [service]: e.target.value }))}
                                    placeholder="Search safety measures..."
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onClick={(e) => e.stopPropagation()}
                                    autoFocus
                                  />
                                </div>
                                <div className="overflow-y-auto max-h-48 rounded-lg">
                        {(() => {
                                    // Get all safety measures from Safety and Preventive Measures section
                          const baseMeasures = [
                            ...safetyMeasures,
                            ...pressureWashingSafetyMeasures,
                            ...specialtyCleaningSafetyMeasures,
                            ...windowCleaningSafetyMeasures,
                            ...customSoftWashingSafetyMeasures,
                            ...customPressureWashingSafetyMeasures,
                            ...customSpecialtyCleaningSafetyMeasures,
                            ...customWindowCleaningSafetyMeasures
                          ];
                          const uniqueBaseMeasures = [...new Set(baseMeasures)].sort((a, b) => 
                            a.localeCompare(b, undefined, { sensitivity: 'base' })
                          );
                                    const filteredCustomMeasures = [].filter(
                            m => m.toLowerCase() !== 'bed' && m.toLowerCase() !== 'test'
                          );
                          const allMeasures = [...uniqueBaseMeasures, ...filteredCustomMeasures];
                          
                          // Filter measures based on search term
                          const searchTerm = (safetySearchTerm[service] || '').toLowerCase();
                          const filteredMeasures = searchTerm 
                            ? allMeasures.filter(m => m.toLowerCase().includes(searchTerm))
                            : allMeasures;
                          
                                    const serviceMeasures = serviceSafetyMeasures[service] || [];
                                    const allSelected = serviceMeasures.length === filteredMeasures.length && filteredMeasures.length > 0;
                            
                          return (
                                      <>
                                        {/* Select All / Deselect All */}
                                        {filteredMeasures.length > 0 && (
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (allSelected) {
                                                deselectAllSafetyMeasures(service);
                                              } else {
                                                selectAllSafetyMeasures(service, filteredMeasures);
                                              }
                                            }}
                                            className="w-full px-3 py-2 text-xs font-semibold text-left bg-gray-50 hover:bg-gray-100 transition-colors border-b-2 border-gray-200 text-gray-700"
                                          >
                                            {allSelected ? 'Deselect All' : 'Select All'}
                                          </button>
                                        )}
                                        {filteredMeasures.length > 0 ? filteredMeasures.map((measure) => {
                                          const isSelected = serviceMeasures.includes(measure);
                                          return (
                                            <label
                              key={measure}
                                              className="flex items-center px-3 py-2 text-xs hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => toggleServiceSafetyMeasure(service, measure)}
                                                className="mr-2 w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                onClick={(e) => e.stopPropagation()}
                                              />
                                              <span className="text-gray-700 flex-1">{measure}</span>
                                            </label>
                                          );
                                        }) : (
                                          <div className="px-3 py-2 text-xs text-gray-500">No safety measures found</div>
                                        )}
                                        {/* Add custom safety measure option */}
                                        <div className="border-t border-gray-200 mt-1 pt-1 px-3 pb-2">
                                          <div className="flex items-center gap-2">
                        <input
                          type="text"
                                              value={newCustomSafetyMeasure[service] || ''}
                                              onChange={(e) => setNewCustomSafetyMeasure(prev => ({ ...prev, [service]: e.target.value }))}
                                              placeholder="Add custom measure..."
                                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                              onClick={(e) => e.stopPropagation()}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                                  const customMeasure = (newCustomSafetyMeasure[service] || '').trim();
                                                  if (customMeasure) {
                                                    addCustomSafetyMeasureToService(service, customMeasure);
                                                    setNewCustomSafetyMeasure(prev => ({ ...prev, [service]: '' }));
                                                  }
                                                }
                                              }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                                                const customMeasure = (newCustomSafetyMeasure[service] || '').trim();
                                                if (customMeasure) {
                                                  addCustomSafetyMeasureToService(service, customMeasure);
                                                  setNewCustomSafetyMeasure(prev => ({ ...prev, [service]: '' }));
                                                }
                                              }}
                                              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                              disabled={!newCustomSafetyMeasure[service]?.trim()}
                                            >
                                              <Plus className="w-3 h-3" />
                        </button>
                        </div>
                      </div>
                                      </>
                                    );
                                  })()}
                    </div>
                  </div>
                )}
              </div>
                          {/* Display selected safety measures */}
                          <div className="space-y-2 mt-2 h-[90px] overflow-y-auto">
                            {serviceSafetyMeasures[service] && serviceSafetyMeasures[service].length > 0 ? (
                              serviceSafetyMeasures[service].map((measure) => (
                                <div
                                  key={measure}
                                  className="flex items-center gap-2 text-xs bg-slate-50 p-2 rounded border border-slate-200"
                                >
                                  <span className="flex-1">{measure}</span>
                      <button
                        type="button"
                                    onClick={() => toggleServiceSafetyMeasure(service, measure)}
                                    className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                                </div>
                  ))
                            ) : (
                              <div className="h-full flex items-center justify-center text-xs text-gray-400">No safety measures selected</div>
                            )}
                                  </div>
                                </div>
                        
                        {/* PSI Section */}
                                <div className="flex flex-col">
                          <label className="block text-xs font-medium text-gray-700 mb-2">PSI:</label>
                          <input
                            type="text"
                            value={servicePSI[service] || ''}
                            onChange={(e) => updateServicePSI(service, e.target.value)}
                            placeholder="Enter PSI (e.g., 1500)"
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                              </div>
                              
                              {/* Save Button */}
                              <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => saveService(service)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium shadow-sm"
                                >
                                  Save
                                </button>
                        </div>
                        </div>
                      );
                    })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-center py-8">
                  <p className="text-sm text-gray-500">
                    No services selected. Use the dropdown above to add services.
                  </p>
                </div>
              )}
            </div>
                      </div>
                    </div>
                </div>
                              </div>
                    )}

                    {/* Certifications Content */}
                    {selectedTab === 'Certifications' && (
                      <div>
                {/* Certifications */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Certifications</h3>
                    <span className="text-sm text-gray-500 bg-slate-100 px-3 py-1 rounded-full">
                      {savedCertifications.length}/10
                    </span>
                  </div>
                  
                    <div>
                      {/* Certifications Content - Gray Box */}
                      <div className="bg-slate-50 rounded-xl p-4 flex flex-col min-h-[300px]">
                      <div className="flex-1 space-y-4">
                      {/* Saved Certifications - Always shown if they exist */}
                      {savedCertifications.length > 0 && (
                        <div>
                          {/* Title row - shown only once */}
                          <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center pb-3">
                            <p className="text-xs font-medium text-gray-700">
                              Certification Name
                              {companyInfo.certificationsList.length > 0 && Object.values(certificationErrors).some(err => err.missingName) && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </p>
                            <p className="text-xs font-medium text-gray-700">
                              Certifying Organization
                              {companyInfo.certificationsList.length > 0 && Object.values(certificationErrors).some(err => err.missingOrganization) && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </p>
                            <p className="text-xs font-medium text-gray-700">
                              Date Received
                              {companyInfo.certificationsList.length > 0 && Object.values(certificationErrors).some(err => err.missingDate) && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </p>
                            <div className="flex gap-2">
                              <div className="w-[28px]"></div>
                              <div className="w-[28px]"></div>
                            </div>
                          </div>
                          {/* Divider line between title and first item */}
                          <div className="border-b border-slate-300"></div>

                          {/* Saved certification values */}
                          {savedCertifications.map((cert, index) => (
                            <div key={cert.id}>
                              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center py-3">
                                <p className="text-sm font-bold italic text-gray-900">{cert.certificationName}</p>
                                <p className="text-sm font-bold italic text-gray-900">{cert.certifyingOrganization}</p>
                                <p className="text-sm font-bold italic text-gray-900">
                                  {cert.dateReceived ? new Date(cert.dateReceived).toLocaleDateString() : '—'}
                                </p>

                                {/* Edit and Delete buttons */}
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      // Move certification to editable section
                                      const updatedSaved = savedCertifications.filter(c => c.id !== cert.id);
                                      setSavedCertifications(updatedSaved);
                                      setEditingCertifications(true);
                                      updateCompanyInfo('certificationsList', [
                                        ...companyInfo.certificationsList,
                                        { ...cert }
                                      ]);
                                    }}
                                    className="group p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                    aria-label="Edit certification"
                                  >
                                    <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = savedCertifications.filter(c => c.id !== cert.id);
                                      setSavedCertifications(updated);
                                    }}
                                    className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    aria-label="Delete certification"
                                  >
                                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                  </button>
                                </div>
                              </div>
                              {/* Divider line after each entry */}
                              <div className="border-b border-slate-300"></div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Divider line - shown between saved and editable certifications */}
                      {savedCertifications.length > 0 && companyInfo.certificationsList.length > 0 && (
                        <div className="border-t border-slate-300 mt-4 mb-4"></div>
                      )}

                      {/* Editable Certifications - Only shown if there are editable items */}
                      {companyInfo.certificationsList.length > 0 && (
                        <div className="space-y-4">
                          {/* Show title row only if no saved certifications */}
                          {savedCertifications.length === 0 && (
                            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center mb-3">
                              <p className="text-xs font-medium text-gray-700">
                                Certification Name
                                {Object.values(certificationErrors).some(err => err.missingName) && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </p>
                              <p className="text-xs font-medium text-gray-700">
                                Certifying Organization
                                {Object.values(certificationErrors).some(err => err.missingOrganization) && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </p>
                              <p className="text-xs font-medium text-gray-700">
                                Date Received
                                {Object.values(certificationErrors).some(err => err.missingDate) && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </p>
                              <div className="w-[28px]"></div>
                            </div>
                          )}
                          
                          {companyInfo.certificationsList.map((cert, index) => (
                            <div key={cert.id || index} className="rounded-lg">
                              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center">
                          <input
                              type="text"
                              value={cert.certificationName || ''}
                              onChange={(e) => {
                                const updated = [...companyInfo.certificationsList];
                                updated[index].certificationName = e.target.value;
                                updateCompanyInfo('certificationsList', updated);
                                // Clear error when user starts typing
                                if (certificationErrors[cert.id]?.missingName) {
                                  setCertificationErrors(prev => {
                                    const newErrors = { ...prev };
                                    if (newErrors[cert.id]) {
                                      delete newErrors[cert.id].missingName;
                                      if (Object.keys(newErrors[cert.id]).length === 0) {
                                        delete newErrors[cert.id];
                                      }
                                    }
                                    return newErrors;
                                  });
                                }
                              }}
                              placeholder="Enter certification name"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-700 focus:outline-none placeholder:text-gray-400"
                            />

                            <input
                              type="text"
                                  value={cert.certifyingOrganization || ''}
                              onChange={(e) => {
                                const updated = [...companyInfo.certificationsList];
                                updated[index].certifyingOrganization = e.target.value;
                                updateCompanyInfo('certificationsList', updated);
                                    // Clear error when user starts typing
                                    if (certificationErrors[cert.id]?.missingOrganization) {
                                      setCertificationErrors(prev => {
                                        const newErrors = { ...prev };
                                        if (newErrors[cert.id]) {
                                          delete newErrors[cert.id].missingOrganization;
                                          if (Object.keys(newErrors[cert.id]).length === 0) {
                                            delete newErrors[cert.id];
                                          }
                                        }
                                        return newErrors;
                                      });
                                    }
                              }}
                              placeholder="Enter organization"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-700 focus:outline-none placeholder:text-gray-400"
                            />

                                <input
                                  type="date"
                                  value={cert.dateReceived || ''}
                                  max={new Date().toISOString().split('T')[0]}
                                  onChange={(e) => {
                                    const updated = [...companyInfo.certificationsList];
                                    updated[index].dateReceived = e.target.value;
                                    updateCompanyInfo('certificationsList', updated);
                                    // Clear error when user selects a date
                                    if (certificationErrors[cert.id]?.missingDate) {
                                      setCertificationErrors(prev => {
                                        const newErrors = { ...prev };
                                        if (newErrors[cert.id]) {
                                          delete newErrors[cert.id].missingDate;
                                          if (Object.keys(newErrors[cert.id]).length === 0) {
                                            delete newErrors[cert.id];
                                          }
                                        }
                                        return newErrors;
                                      });
                                    }
                                  }}
                                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white focus:outline-none ${cert.dateReceived ? 'text-gray-700' : 'text-gray-400'}`}
                                />
                              
                              {/* Trashcan button - aligned with inputs */}
                              <div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                                    const updated = companyInfo.certificationsList.filter((_, i) => i !== index);
                                    updateCompanyInfo('certificationsList', updated);
                          }}
                                  className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  aria-label="Delete certification"
                        >
                                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                        </button>
                      </div>
                              </div>
                        </div>
                      ))}
                        </div>
                      )}
                      
                      {/* Add Certification button - only shown when there's at least one saved certification and no editable ones */}
                      {savedCertifications.length > 0 && companyInfo.certificationsList.length === 0 && (
                        <>
                          <div className="mt-4">
                            <button
                              type="button"
                              onClick={() => {
                                if (savedCertifications.length >= 10) {
                                  alert('Maximum of 10 certifications allowed');
                                  return;
                                }
                                updateCompanyInfo('certificationsList', [
                                  { id: Date.now() + Math.random(), certificationName: '', certifyingOrganization: '', dateReceived: '' }
                                ]);
                              }}
                              disabled={savedCertifications.length >= 10}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">Add Certification</span>
                            </button>
                          </div>
                        </>
                      )}
                      
                      {/* Initialize with one empty certification if none exist at all */}
                        {(() => {
                        if (savedCertifications.length === 0 && companyInfo.certificationsList.length === 0) {
                          updateCompanyInfo('certificationsList', [
                            { id: Date.now() + Math.random(), certificationName: '', certifyingOrganization: '', dateReceived: '' }
                          ]);
                        }
                        return null;
                      })()}
                      </div>
                      
                      {/* Save button at bottom right of gray wrapper - only shown when there are editable certifications */}
                      {companyInfo.certificationsList.length > 0 && (
                      <div className="flex items-center justify-end gap-3 mt-auto pt-4">
                        {(() => {
                          const errors = [];
                          companyInfo.certificationsList.forEach((cert) => {
                            if (!cert.certificationName || cert.certificationName.trim() === '' ||
                                !cert.certifyingOrganization || cert.certifyingOrganization.trim() === '' ||
                                !cert.dateReceived || cert.dateReceived.trim() === '') {
                              errors.push(cert.id);
                            }
                          });
                          return errors.length > 0 && Object.keys(certificationErrors).length > 0 ? (
                            <span className="text-red-600 text-sm font-medium flex items-center">
                              <span className="text-red-500">*</span> Please fill in all required fields
                            </span>
                          ) : null;
                        })()}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Validate all certifications
                            const allErrors = {};
                            let hasErrors = false;
                            
                            companyInfo.certificationsList.forEach((cert) => {
                              const errors = {};
                              
                              if (!cert.certificationName || cert.certificationName.trim() === '') {
                                errors.missingName = true;
                                hasErrors = true;
                              }
                              
                              if (!cert.certifyingOrganization || cert.certifyingOrganization.trim() === '') {
                                errors.missingOrganization = true;
                                hasErrors = true;
                              }
                              
                              if (!cert.dateReceived || cert.dateReceived.trim() === '') {
                                errors.missingDate = true;
                                hasErrors = true;
                              }
                              
                              if (Object.keys(errors).length > 0) {
                                allErrors[cert.id] = errors;
                              }
                            });
                            
                            if (hasErrors) {
                              setCertificationErrors(allErrors);
                              return;
                            }
                            
                            // Clear all errors
                            setCertificationErrors({});
                            
                            // Save all certifications
                            const newCerts = companyInfo.certificationsList.map(cert => ({
                              ...cert,
                              id: cert.id || Date.now() + Math.random(),
                              savedAt: new Date().toISOString()
                            }));
                            
                            setSavedCertifications((prev) => {
                              const combined = [...prev];
                              newCerts.forEach(newCert => {
                                const existingIndex = combined.findIndex(c => c.id === newCert.id);
                                if (existingIndex >= 0) {
                                  combined[existingIndex] = newCert;
                                } else if (combined.length < 10) {
                                  combined.push(newCert);
                                }
                              });
                              return combined;
                            });
                            
                            // Clear editable list
                            updateCompanyInfo('certificationsList', []);
                            alert('Certifications saved successfully!');
                          }}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        >
                          Save
                        </button>
                      </div>
                      )}
                      </div>
                    </div>
                </div>
                      </div>
                    )}

                    {/* Insurance Content */}
                    {selectedTab === 'Insurance' && (
                      <div>
                {/* Insurance */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Insurance</h3>
                  </div>
                  
                    <div>
                      {/* Insurance Content - Gray Box */}
                      <div className="bg-slate-50 rounded-xl p-4 flex flex-col min-h-[300px]">
                      <div className="flex-1 space-y-4">
                      {/* Check if Uninsured is selected */}
                      {(() => {
                        // Store in a ref or state that's accessible outside
                        window._tempIsUninsured = savedInsurance.some(ins => ins.status === 'Uninsured') || 
                                          (companyInfo.insuranceList || []).some(ins => ins.status === 'Uninsured');
                        const isUninsured = window._tempIsUninsured;
                            
                          return (
                          <>
                            {/* Saved Insurance - Hidden if Uninsured is checked */}
                            {savedInsurance.length > 0 && !isUninsured && (
                              <div>
                                {/* Title row - shown only once */}
                                <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center pb-3">
                                  <p className="text-xs font-medium text-gray-700">
                                    Company
                                    {(companyInfo.insuranceList || []).length > 0 && Object.values(insuranceErrors).some(err => err.missingCompany) && (
                                      <span className="text-red-500 ml-1">*</span>
                                    )}
                                  </p>
                                  <p className="text-xs font-medium text-gray-700">
                                    Policy Number
                                    {(companyInfo.insuranceList || []).length > 0 && Object.values(insuranceErrors).some(err => err.missingPolicyNumber) && (
                                      <span className="text-red-500 ml-1">*</span>
                                    )}
                                  </p>
                                  <p className="text-xs font-medium text-gray-700">
                                    Coverage Limits ($)
                                    {(companyInfo.insuranceList || []).length > 0 && Object.values(insuranceErrors).some(err => err.missingCoverageLimits) && (
                                      <span className="text-red-500 ml-1">*</span>
                                    )}
                                  </p>
                                  <div className="flex gap-2">
                                    <div className="w-[28px]"></div>
                                    <div className="w-[28px]"></div>
                                  </div>
                                </div>
                                {/* Divider line between title and first item */}
                                <div className="border-b border-slate-300"></div>

                                {/* Saved insurance values */}
                                {savedInsurance.map((ins) => (
                                  <div key={ins.id}>
                                    <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center py-3">
                                      <p className="text-sm font-bold italic text-gray-900">{ins.company || '—'}</p>
                                      <p className="text-sm font-bold italic text-gray-900">{ins.policyNumber || '—'}</p>
                                      <p className="text-sm font-bold italic text-gray-900">{ins.coverageLimits ? `$${parseFloat(ins.coverageLimits.replace(/[^0-9.]/g, '') || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '—'}</p>

                                      {/* Edit and Delete buttons */}
                                      <div className="flex gap-2">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            // Move insurance to editable section
                                            const updatedSaved = savedInsurance.filter(i => i.id !== ins.id);
                                            setSavedInsurance(updatedSaved);
                                            setEditingInsurance(true);
                                            updateCompanyInfo('insuranceList', [
                                              ...(companyInfo.insuranceList || []),
                                              { ...ins }
                                            ]);
                                          }}
                                          className="group p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                          aria-label="Edit insurance"
                                        >
                                          <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = savedInsurance.filter(i => i.id !== ins.id);
                                            setSavedInsurance(updated);
                                          }}
                                          className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                          aria-label="Delete insurance"
                                        >
                                          <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                        </button>
                                      </div>
                                    </div>
                                    {/* Divider line after each entry */}
                                    <div className="border-b border-slate-300"></div>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Divider line - shown between saved and editable insurance */}
                            {savedInsurance.length > 0 && (companyInfo.insuranceList || []).length > 0 && !isUninsured && (
                              <div className="border-t border-slate-300 mt-4 mb-4"></div>
                            )}

                            {/* Editable Insurance - Always shown */}
                            <div className="space-y-4">
                        {(() => {
                          // Initialize with one empty insurance if none exist and not uninsured
                          if ((companyInfo.insuranceList || []).length === 0 && savedInsurance.length === 0 && !isUninsured) {
                            updateCompanyInfo('insuranceList', [
                              { id: Date.now() + Math.random(), company: '', policyNumber: '', coverageLimits: '', status: 'Insured' }
                            ]);
                          }
                          return null;
                        })()}
                        
                          {/* Show title row only if no saved insurance */}
                          {savedInsurance.length === 0 && (companyInfo.insuranceList || []).length > 0 && (
                            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center mb-3">
                              <p className="text-xs font-medium text-gray-700">
                                Company
                                {Object.values(insuranceErrors).some(err => err.missingCompany) && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </p>
                              <p className="text-xs font-medium text-gray-700">
                                Policy Number
                                {Object.values(insuranceErrors).some(err => err.missingPolicyNumber) && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </p>
                              <p className="text-xs font-medium text-gray-700">
                                Coverage Limits ($)
                                {Object.values(insuranceErrors).some(err => err.missingCoverageLimits) && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </p>
                              <div className="w-[28px]"></div>
                            </div>
                          )}
                          
                                {(companyInfo.insuranceList || []).length > 0 && (() => {
                                  // Show all insurance entries (including uninsured)
                                  const displayList = companyInfo.insuranceList || [];
                                  return displayList.map((ins, originalIndex) => {
                                    return (
                            <div key={ins.id || originalIndex} className="rounded-lg">
                              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center">
                              <input
                                type="text"
                                  value={ins.company || ''}
                                  onChange={(e) => {
                                    const updated = [...(companyInfo.insuranceList || [])];
                                    updated[originalIndex].company = e.target.value;
                                    updateCompanyInfo('insuranceList', updated);
                                    if (insuranceErrors[ins.id]?.missingCompany) {
                                      setInsuranceErrors(prev => {
                                        const newErrors = { ...prev };
                                        if (newErrors[ins.id]) {
                                          delete newErrors[ins.id].missingCompany;
                                          if (Object.keys(newErrors[ins.id]).length === 0) {
                                            delete newErrors[ins.id];
                                          }
                                        }
                                        return newErrors;
                                      });
                                    }
                                  }}
                                placeholder="Enter company name"
                                  disabled={isUninsured}
                                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 focus:outline-none placeholder:text-gray-400 ${
                                    isUninsured ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white'
                                }`}
                              />

                              <input
                                type="text"
                                  value={ins.policyNumber || ''}
                                  onChange={(e) => {
                                    const updated = [...(companyInfo.insuranceList || [])];
                                    updated[originalIndex].policyNumber = e.target.value;
                                    updateCompanyInfo('insuranceList', updated);
                                    if (insuranceErrors[ins.id]?.missingPolicyNumber) {
                                      setInsuranceErrors(prev => {
                                        const newErrors = { ...prev };
                                        if (newErrors[ins.id]) {
                                          delete newErrors[ins.id].missingPolicyNumber;
                                          if (Object.keys(newErrors[ins.id]).length === 0) {
                                            delete newErrors[ins.id];
                                          }
                                        }
                                        return newErrors;
                                      });
                                    }
                                  }}
                                placeholder="Enter policy number"
                                  disabled={isUninsured}
                                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 focus:outline-none placeholder:text-gray-400 ${
                                    isUninsured ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white'
                                }`}
                              />

                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                              <input
                                type="text"
                                    value={ins.coverageLimits ? ins.coverageLimits.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                                    onChange={(e) => {
                                      // Remove all non-numeric characters except commas
                                      const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                      const updated = [...(companyInfo.insuranceList || [])];
                                      updated[originalIndex].coverageLimits = numericValue;
                                      updateCompanyInfo('insuranceList', updated);
                                    if (insuranceErrors[ins.id]?.missingCoverageLimits) {
                                      setInsuranceErrors(prev => {
                                        const newErrors = { ...prev };
                                        if (newErrors[ins.id]) {
                                          delete newErrors[ins.id].missingCoverageLimits;
                                          if (Object.keys(newErrors[ins.id]).length === 0) {
                                            delete newErrors[ins.id];
                                          }
                                        }
                                        return newErrors;
                                      });
                                    }
                                  }}
                                placeholder="0"
                                  disabled={isUninsured}
                                  className={`w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 focus:outline-none placeholder:text-gray-400 ${
                                    isUninsured ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white'
                                }`}
                              />
                                </div>
                          
                          {/* Trashcan button - aligned with inputs */}
                          <div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                if (isUninsured) return; // Do nothing if uninsured
                                const updated = (companyInfo.insuranceList || []).filter(item => {
                                  // Keep items that are Uninsured or don't match the deleted insurance
                                  if (item.status === 'Uninsured') return true;
                                  // Remove the item that matches by id or object reference
                                  if (ins.id && item.id === ins.id) return false;
                                  return item !== ins;
                                });
                                updateCompanyInfo('insuranceList', updated);
                              }}
                              disabled={isUninsured}
                              className={`group p-1.5 rounded-md transition-colors ${
                                isUninsured 
                                  ? 'text-gray-300 cursor-not-allowed' 
                                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                              }`}
                              aria-label="Delete insurance"
                            >
                              <Trash2 className={`w-4 h-4 ${isUninsured ? 'text-gray-300' : 'text-gray-400 group-hover:text-red-600'}`} />
                                  </button>
                          </div>
                              </div>
                              </div>
                          );
                        });
                      })()}
                              </div>
                              
                              {/* Add Insurance button - only shown when there's at least one saved insurance and no editable ones */}
                              {savedInsurance.length > 0 && (companyInfo.insuranceList || []).length === 0 && !window._tempIsUninsured && (
                                <>
                                  <div className="mt-4">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (savedInsurance.length >= 10) {
                                          alert('Maximum of 10 insurance policies allowed');
                                          return;
                                        }
                                        updateCompanyInfo('insuranceList', [
                                          { id: Date.now() + Math.random(), company: '', policyNumber: '', coverageLimits: '', status: 'Insured' }
                                        ]);
                                      }}
                                      disabled={savedInsurance.length >= 10}
                                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <Plus className="w-4 h-4" />
                                      <span className="text-sm font-medium">Add Insurance</span>
                                    </button>
                                  </div>
                                </>
                              )}
                          </>
                        );
                      })()}
                      
                      {/* Uninsured checkbox - immediately below inputs */}
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={window._tempIsUninsured}
                            onChange={(e) => {
                              if (e.target.checked) {
                                // Clear all insurance entries and add uninsured entry
                                setSavedInsurance([]);
                                updateCompanyInfo('insuranceList', [
                                  { id: Date.now() + Math.random(), company: '', policyNumber: '', coverageLimits: '', status: 'Uninsured' }
                                ]);
                                setEditingInsurance(true);
                              } else {
                                // Remove uninsured entries and restore default entry
                                const updated = (companyInfo.insuranceList || []).filter(ins => ins.status !== 'Uninsured');
                                if (updated.length === 0) {
                                  updateCompanyInfo('insuranceList', [
                                    { id: Date.now() + Math.random(), company: '', policyNumber: '', coverageLimits: '', status: 'Insured' }
                                  ]);
                                } else {
                                  updateCompanyInfo('insuranceList', updated);
                                }
                                setEditingInsurance(false);
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 accent-blue-600 focus:ring-blue-500 focus:ring-2"
                          />
                          <label className="text-sm text-gray-700">Uninsured</label>
                        </div>
                      </div>
                      </div>
                      
                      {/* Save button at bottom right of gray wrapper */}
                      <div className="flex items-center justify-end gap-3 mt-auto pt-4">
                        {(() => {
                          const errors = [];
                          (companyInfo.insuranceList || []).forEach((ins) => {
                            if (ins.status !== 'Uninsured') {
                              if (!ins.company || ins.company.trim() === '' ||
                                  !ins.policyNumber || ins.policyNumber.trim() === '' ||
                                  !ins.coverageLimits || ins.coverageLimits.trim() === '') {
                                errors.push(ins.id);
                              }
                            }
                          });
                          return errors.length > 0 && Object.keys(insuranceErrors).length > 0 ? (
                            <span className="text-red-600 text-sm font-medium flex items-center">
                              <span className="text-red-500">*</span> Please fill in all required fields
                            </span>
                          ) : null;
                        })()}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Validate all insurance entries
                            const allErrors = {};
                            let hasErrors = false;
                            
                            (companyInfo.insuranceList || []).forEach((ins) => {
                              if (ins.status !== 'Uninsured') {
                                const errors = {};
                                
                                if (!ins.company || ins.company.trim() === '') {
                                  errors.missingCompany = true;
                                  hasErrors = true;
                                }
                                
                                if (!ins.policyNumber || ins.policyNumber.trim() === '') {
                                  errors.missingPolicyNumber = true;
                                  hasErrors = true;
                                }
                                
                                if (!ins.coverageLimits || ins.coverageLimits.trim() === '') {
                                  errors.missingCoverageLimits = true;
                                  hasErrors = true;
                                }
                                
                                if (Object.keys(errors).length > 0) {
                                  allErrors[ins.id] = errors;
                                }
                              }
                            });
                            
                            if (hasErrors) {
                              setInsuranceErrors(allErrors);
                              return;
                            }
                            
                            // Clear all errors
                            setInsuranceErrors({});
                            
                            // Save all insurance entries
                            const newInsurances = (companyInfo.insuranceList || []).map(ins => ({
                              ...ins,
                              id: ins.id || Date.now() + Math.random(),
                              savedAt: new Date().toISOString()
                            }));
                            
                            setSavedInsurance((prev) => {
                              const combined = [...prev];
                              newInsurances.forEach(newIns => {
                                const existingIndex = combined.findIndex(i => i.id === newIns.id);
                                if (existingIndex >= 0) {
                                  combined[existingIndex] = newIns;
                                } else if (combined.length < 10) {
                                  combined.push(newIns);
                                }
                              });
                              return combined;
                            });
                            
                            // Clear editable list
                            updateCompanyInfo('insuranceList', []);
                            alert('Insurance information saved successfully!');
                          }}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        >
                          Save
                                  </button>
                      </div>
                      </div>
                  </div>
                </div>
                      </div>
                    )}

                    {/* Guarantee/Warranty Content */}
                    {selectedTab === 'Guarantee/Warranty' && (
                      <div>
                {/* Guarantee/Warranty */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Guarantee/Warranty</h3>
                  </div>
                  
                    <div>
                      {/* Guarantee/Warranty Content - Gray Box */}
                      <div className="bg-slate-50 rounded-xl p-4 flex flex-col min-h-[300px]">
                        <div className="flex-1">
                          {savedGuaranteeWarranty && savedGuaranteeWarranty.trim() !== '' && !editingGuaranteeWarranty ? (
                            // View Mode
                            <div className="p-4 bg-white rounded-2xl relative">
                              {/* Edit and Delete buttons - upper right */}
                              <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingGuaranteeWarranty(true);
                                    // Load saved guarantee/warranty into editing state
                                    updateCompanyInfo('guaranteeWarranty', savedGuaranteeWarranty);
                                  }}
                                  className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                  title="Edit guarantee/warranty"
                                >
                                  <Pencil className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSavedGuaranteeWarranty('');
                                    updateCompanyInfo('guaranteeWarranty', '');
                                  }}
                                  className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Delete guarantee/warranty"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                </button>
                              </div>
                              <div className="pr-20">
                                <p className="text-sm italic text-gray-600">{savedGuaranteeWarranty}</p>
                              </div>
                            </div>
                          ) : (
                            // Edit Mode - Show textarea when section is opened
                            <div className="rounded-lg relative">
                              {guaranteeWarrantySaveAttempted && (!companyInfo.guaranteeWarranty || companyInfo.guaranteeWarranty.trim() === '') && (
                                <span className="absolute top-2 left-2 text-red-500 text-sm font-medium z-10">*</span>
                              )}
                              {/* Delete button in upper right corner */}
                              <button
                                type="button"
                                onClick={() => {
                                  updateCompanyInfo('guaranteeWarranty', '');
                                  setGuaranteeWarrantySaveAttempted(false);
                                }}
                                className="group absolute top-2 right-2 z-10 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Clear"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <textarea
                                rows={5}
                                value={companyInfo.guaranteeWarranty || ''}
                                onChange={(e) => {
                                  updateCompanyInfo('guaranteeWarranty', e.target.value);
                                  // Clear error when user starts typing
                                  if (guaranteeWarrantySaveAttempted && e.target.value.trim() !== '') {
                                    setGuaranteeWarrantySaveAttempted(false);
                                  }
                                }}
                                placeholder="Describe your guarantee or warranty policy..."
                                className="w-full px-4 py-2.5 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm resize-none bg-white shadow-sm focus:outline-none overflow-y-auto"
                              />
                            </div>
                          )}
                        </div>
                        
                        {/* Save button at bottom right of gray wrapper */}
                        <div className="flex items-center justify-end gap-3 mt-auto pt-4">
                          {guaranteeWarrantySaveAttempted && (!companyInfo.guaranteeWarranty || companyInfo.guaranteeWarranty.trim() === '') && (
                            <span className="text-red-600 text-sm font-medium flex items-center">
                              <span className="text-red-500">*</span> Please enter guarantee/warranty information
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={handleSaveGuaranteeWarranty}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                    )}

                    {/* Brand Identity Content - MOVED TO MY AGENT */}
                    {false && selectedTab === 'Brand Identity' && (
                      <div>
                {/* Brand Identity */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-lime-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Brand Identity</h3>
                    {savedBrandIdentity && !editingBrandIdentity && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBrandIdentity(true);
                          updateCompanyInfo('companySlogan', savedBrandIdentity.companySlogan);
                          updateCompanyInfo('experienceYears', savedBrandIdentity.experienceYears);
                          updateCompanyInfo('jobsCompleted', savedBrandIdentity.jobsCompleted);
                          updateCompanyInfo('whatMakesDifferent', savedBrandIdentity.whatMakesDifferent);
                        }}
                        className="group p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                      </button>
                    )}
                  </div>

                    <div className="space-y-5">
                      {savedBrandIdentity && !editingBrandIdentity ? (
                        // Display Mode
                        <div className="bg-slate-50 rounded-xl p-4 space-y-6">
                          {savedBrandIdentity.companySlogan && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Company Slogan</label>
                              <p className="text-base text-gray-900 font-bold italic">{savedBrandIdentity.companySlogan}</p>
                    </div>
                  )}

                          {(savedBrandIdentity.experienceYears || savedBrandIdentity.jobsCompleted) && (
                            <div className={savedBrandIdentity.companySlogan ? "pt-6 border-t border-slate-300" : ""}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                              <div className="flex gap-2">
                                {savedBrandIdentity.experienceYears && (
                                  <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Years in Business</label>
                                    <p className="text-base font-bold italic text-gray-900">{savedBrandIdentity.experienceYears}</p>
                                  </div>
                                )}
                                {savedBrandIdentity.jobsCompleted && (
                                  <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Jobs Completed (Estimate)</label>
                                    <p className="text-base font-bold italic text-gray-900">{savedBrandIdentity.jobsCompleted}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {savedBrandIdentity.whatMakesDifferent && savedBrandIdentity.whatMakesDifferent.length > 0 && (
                            <div className={(savedBrandIdentity.companySlogan || savedBrandIdentity.experienceYears || savedBrandIdentity.jobsCompleted) ? "pt-6 border-t border-slate-300" : ""}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Company Qualities</label>
                              <div className="flex flex-wrap gap-2">
                                {savedBrandIdentity.whatMakesDifferent.map((quality) => (
                                  <span
                                    key={quality}
                                    className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium"
                                  >
                                    {quality}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Edit Mode
                        <div className="space-y-4">
                      <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company Slogan</label>
                        <input
                          type="text"
                            value={companyInfo.companySlogan || ''}
                            onChange={(e) => updateCompanyInfo('companySlogan', e.target.value)}
                            placeholder="Enter your company slogan"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                          />
                        </div>

                        <div className="pt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                          <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Years in Business</label>
                              <input
                                type="number"
                                min="0"
                                value={companyInfo.experienceYears || ''}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Only allow numbers
                                  if (value === '' || /^\d+$/.test(value)) {
                                    updateCompanyInfo('experienceYears', value);
                                  }
                                }}
                                placeholder="0"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                              />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Jobs Completed (Estimate)</label>
                              <input
                                type="number"
                                min="0"
                                  value={companyInfo.jobsCompleted || ''}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Only allow numbers
                                    if (value === '' || /^\d+$/.test(value)) {
                                      updateCompanyInfo('jobsCompleted', value);
                                    }
                                  }}
                                placeholder="0"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-3">Company Qualities (select 3)</label>
                          <div className="flex flex-wrap gap-3">
                            {[...companyQualities, ...customCompanyQualities].map((quality) => {
                              const isSelected = (companyInfo.whatMakesDifferent || []).includes(quality);
                              const isDisabled = !isSelected && (companyInfo.whatMakesDifferent || []).length >= 3;
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
                                      ? 'bg-white text-slate-400 border-slate-200 cursor-not-allowed'
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                                  } shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                    </div>
                  </div>

                        {/* Save Button */}
                        <div className="flex justify-end gap-2">
                          {brandIdentitySaveAttempted && (
                            !companyInfo.companySlogan?.trim() &&
                            !companyInfo.experienceYears?.toString().trim() &&
                            !companyInfo.jobsCompleted?.toString().trim() &&
                            (!companyInfo.whatMakesDifferent || companyInfo.whatMakesDifferent.length === 0)
                          ) && (
                            <span className="text-red-600 text-sm font-medium flex items-center">
                              <span className="text-red-500">*</span> Please enter at least one field
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={handleSaveBrandIdentity}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          >
                            Save
                          </button>
              </div>
                        </div>
                      )}
                    </div>
                </div>
                      </div>
                    )}
                
                    {/* Customer Reviews Content - MOVED TO MY AGENT */}
                    {false && selectedTab === 'Customer Reviews' && (
                      <div>
                {/* Customer Reviews */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-rose-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Customer Reviews <span className="text-lg font-normal text-gray-600">(add up to three reviews)</span></h3>
                  </div>
                  
                    {/* Gray container wrapper */}
                      <div className="bg-slate-50 rounded-xl p-4 flex flex-col min-h-[300px]">
                      <div className="flex-1 space-y-4">
                      {/* Saved Customer Reviews - Always shown if they exist */}
                      {savedCustomerReviews.length > 0 && (
                        <div className="space-y-3">
                          {/* Saved review values */}
                          {savedCustomerReviews.map((review) => (
                            <div key={review.id} className="p-4 bg-white rounded-2xl relative">
                              {/* Edit and Delete buttons - upper right */}
                              <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Move review to editable section
                                    const updatedSaved = savedCustomerReviews.filter(r => r.id !== review.id);
                                    setSavedCustomerReviews(updatedSaved);

                                    updateCompanyInfo('customerReviewsList', [
                                      ...(companyInfo.customerReviewsList || []),
                                      { ...review }
                                    ]);
                                  }}
                                  className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = savedCustomerReviews.filter(r => r.id !== review.id);
                                    setSavedCustomerReviews(updated);
                                  }}
                                  className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                </button>
                              </div>
                              <div className="pr-20">
                                <p className="text-sm italic text-gray-600">{review.reviewText}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Editable Customer Reviews */}
                      {(companyInfo.customerReviewsList || []).length > 0 && (
                        <div className="space-y-4">
                          {(companyInfo.customerReviewsList || []).map((review, index) => (
                            <div key={review.id} className="relative">
                              <textarea
                                value={review.reviewText || ''}
                                onChange={(e) => {
                                  const updated = (companyInfo.customerReviewsList || []).map(r =>
                                    r.id === review.id ? { ...r, reviewText: e.target.value } : r
                                  );
                                  updateCompanyInfo('customerReviewsList', updated);
                                  // Clear error when user types
                                  if (customerReviewErrors[`review-${review.id}`]) {
                                    const newErrors = { ...customerReviewErrors };
                                    delete newErrors[`review-${review.id}`];
                                    setCustomerReviewErrors(newErrors);
                                  }
                                }}
                                rows={5}
                                placeholder="Enter a customer review..."
                                className={`w-full px-4 py-2.5 pr-12 bg-white border ${
                                  customerReviewErrors[`review-${review.id}`] ? 'border-red-300' : 'border-slate-300'
                                } rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm overflow-y-auto`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = (companyInfo.customerReviewsList || []).filter(r => r.id !== review.id);
                                  updateCompanyInfo('customerReviewsList', updated);
                                  const newErrors = { ...customerReviewErrors };
                                  delete newErrors[`review-${review.id}`];
                                  setCustomerReviewErrors(newErrors);
                                }}
                                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              {customerReviewErrors[`review-${review.id}`] && (
                                <p className="text-xs text-red-500">{customerReviewErrors[`review-${review.id}`]}</p>
                              )}
                            </div>
                          ))}

                          {/* Add Review button - shown when editing and total reviews < 3 */}
                          {(savedCustomerReviews.length + (companyInfo.customerReviewsList || []).length) < 3 && (
                            <div className="pt-2">
                              <button
                                type="button"
                                onClick={() => {
                                  updateCompanyInfo('customerReviewsList', [
                                    ...(companyInfo.customerReviewsList || []),
                                    { id: Date.now() + Math.random(), reviewText: '' }
                                  ]);
                                }}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                                <span className="text-sm font-medium">Add Another Review</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Divider and Add Review button - only shown when there's at least one saved review and no editable ones */}
                      {savedCustomerReviews.length > 0 && (companyInfo.customerReviewsList || []).length === 0 && savedCustomerReviews.length < 3 && (
                        <>
                          <div className="border-t border-slate-300 mt-6"></div>
                          <div className="mt-6">
                            <button
                              type="button"
                              onClick={() => {
                                updateCompanyInfo('customerReviewsList', [
                                  { id: Date.now() + Math.random(), reviewText: '' }
                                ]);
                              }}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">Add Customer Review</span>
                            </button>
                          </div>
                        </>
                      )}
                      
                      {/* Initialize with one empty review if none exist at all */}
                      {(() => {
                        if (savedCustomerReviews.length === 0 && (companyInfo.customerReviewsList || []).length === 0) {
                          updateCompanyInfo('customerReviewsList', [
                            { id: Date.now() + Math.random(), reviewText: '' }
                          ]);
                        }
                        return null;
                      })()}
                      </div>

                      {/* Save button at bottom right - only shown when there are editable reviews */}
                      {(companyInfo.customerReviewsList || []).length > 0 && (
                        <div className="flex justify-end pt-4">
                          <button
                            onClick={() => {
                              // Validate all reviews
                              const errors = {};
                              let hasError = false;
                              
                              (companyInfo.customerReviewsList || []).forEach(review => {
                                if (!review.reviewText || review.reviewText.trim() === '') {
                                  errors[`review-${review.id}`] = 'Review text is required';
                                  hasError = true;
                                }
                              });
                              
                              if (hasError) {
                                setCustomerReviewErrors(errors);
                                return;
                              }
                              
                              // Check if we're at limit
                              if (savedCustomerReviews.length + (companyInfo.customerReviewsList || []).length > 3) {
                                alert('Maximum of 3 customer reviews allowed');
                                return;
                              }
                              
                              // Save all editable reviews
                              const newSavedReviews = [...savedCustomerReviews, ...(companyInfo.customerReviewsList || [])];
                              setSavedCustomerReviews(newSavedReviews);
                              
                              // Clear editable list
                              updateCompanyInfo('customerReviewsList', []);
                              setCustomerReviewErrors({});
                            }}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          >
                            Save
                            {Object.keys(customerReviewErrors).length > 0 && (
                              <span className="ml-2 text-xs text-red-200">
                                {Object.keys(customerReviewErrors).filter(k => k.startsWith('review-')).length} error(s)
                              </span>
                            )}
                </button>
                        </div>
                      )}
                    </div>
                </div>
                </div>
              )}
                
                    {/* Online Reviews Content - MOVED TO MY AGENT */}
                    {false && selectedTab === 'Online Reviews' && (
                      <div>
                {/* Online Reviews */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Online Reviews</h3>
                    {savedOnlineReviews && !editingOnlineReviews && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingOnlineReviews(true);
                          updateCompanyInfo('onlineReviews', savedOnlineReviews);
                        }}
                        className="group p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
            </div>

                    <div className="section-spacing">
                      {/* Display Mode */}
                      {savedOnlineReviews && !editingOnlineReviews ? (
                        <div className="space-y-3">
                          {/* Title row */}
                          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center px-2 mb-3">
                            <p className="text-xs font-medium text-gray-700">Platform</p>
                            <p className="text-xs font-medium text-gray-700">Avg Rating</p>
                            <p className="text-xs font-medium text-gray-700">Total Reviews</p>
                            <p className="text-xs font-medium text-gray-700">5-Star Reviews</p>
                            {/* Invisible placeholder for delete button alignment */}
                            <div className="w-[28px]"></div>
                          </div>
                          <div className="border-t border-slate-300"></div>

                          {[
                            { key: 'google', label: 'Google' },
                            { key: 'facebook', label: 'Facebook' },
                            { key: 'nextdoor', label: 'Nextdoor' },
                            { key: 'yelp', label: 'Yelp' },
                            { key: 'homeadvisor', label: 'HomeAdvisor' }
                          ].filter(platform => {
                            const review = savedOnlineReviews[platform.key];
                            return review && (review.averageRating || review.totalReviews || review.fiveStarReviews);
                          }).map((platform, index, filteredArray) => {
                            const review = savedOnlineReviews[platform.key];
                            return (
                              <React.Fragment key={platform.key}>
                                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center px-2 py-3">
                                  <p className="text-sm text-gray-700">
                                    {platform.label}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <p className="text-sm font-bold italic text-gray-900">
                                      {review.averageRating || '-'}
                                    </p>
                                  </div>
                                  <p className="text-sm font-bold italic text-gray-900">
                                    {review.totalReviews || '-'}
                                  </p>
                                  <p className="text-sm font-bold italic text-gray-900">
                                    {review.fiveStarReviews || '-'}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedReviews = { ...savedOnlineReviews };
                                      delete updatedReviews[platform.key];
                                      setSavedOnlineReviews(updatedReviews);
                                    }}
                                    className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    aria-label="Delete online review"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                {/* Divider line between rows (not after the last one) */}
                                {index < filteredArray.length - 1 && (
                                  <div className="border-t border-slate-300 my-2"></div>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      ) : (
                        /* Edit Mode */
                        <div>
                        <div className="space-y-4 mt-4">
                          {[
                            { key: 'google', label: 'Google' },
                            { key: 'facebook', label: 'Facebook' },
                            { key: 'nextdoor', label: 'Nextdoor' },
                            { key: 'yelp', label: 'Yelp' },
                            { key: 'homeadvisor', label: 'HomeAdvisor' }
                          ].map((platform) => (
                            <div key={platform.key} className="grid grid-cols-4 gap-4 items-center p-4 bg-slate-50 rounded-lg">
                              <div className="font-semibold text-gray-900 min-w-[120px]">
                                {platform.label}
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Avg Rating (out of 5)</label>
                                <div className="relative">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                  <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.01"
                                    value={companyInfo.onlineReviews?.[platform.key]?.averageRating || ''}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      
                                      // Allow empty value
                                      if (value === '') {
                                        const updatedReviews = {
                                          ...(companyInfo.onlineReviews || {}),
                                          [platform.key]: {
                                            ...(companyInfo.onlineReviews?.[platform.key] || {}),
                                            averageRating: ''
                                          }
                                        };
                                        updateCompanyInfo('onlineReviews', updatedReviews);
                                        return;
                                      }
                                      
                                      // Parse as float
                                      const numValue = parseFloat(value);
                                      
                                      // Check if valid number and not greater than 5
                                      if (!isNaN(numValue)) {
                                        // Limit to 5.0
                                        if (numValue > 5) {
                                          value = '5.00';
                                        } else if (numValue < 0) {
                                          value = '0';
                                        } else {
                                          // Limit to 2 decimal places
                                          const parts = value.split('.');
                                          if (parts[1] && parts[1].length > 2) {
                                            value = numValue.toFixed(2);
                                          }
                                        }
                                      }
                                      
                                      const updatedReviews = {
                                        ...(companyInfo.onlineReviews || {}),
                                        [platform.key]: {
                                          ...(companyInfo.onlineReviews?.[platform.key] || {}),
                                          averageRating: value
                                        }
                                      };
                                      updateCompanyInfo('onlineReviews', updatedReviews);
                                    }}
                                    placeholder="0.0"
                                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Total Reviews</label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100000"
                                  value={companyInfo.onlineReviews?.[platform.key]?.totalReviews || ''}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    
                                    // Allow empty value
                                    if (value === '') {
                                      const updatedReviews = {
                                        ...(companyInfo.onlineReviews || {}),
                                        [platform.key]: {
                                          ...(companyInfo.onlineReviews?.[platform.key] || {}),
                                          totalReviews: ''
                                        }
                                      };
                                      updateCompanyInfo('onlineReviews', updatedReviews);
                                      return;
                                    }
                                    
                                    // Parse as integer
                                    const numValue = parseInt(value, 10);
                                    
                                    // Check if valid number and cap at 100,000
                                    if (!isNaN(numValue)) {
                                      if (numValue > 100000) {
                                        value = '100000';
                                      } else if (numValue < 0) {
                                        value = '0';
                                      }
                                    }
                                    
                                    const updatedReviews = {
                                      ...(companyInfo.onlineReviews || {}),
                                      [platform.key]: {
                                        ...(companyInfo.onlineReviews?.[platform.key] || {}),
                                        totalReviews: value
                                      }
                                    };
                                    updateCompanyInfo('onlineReviews', updatedReviews);
                                  }}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">5-Star Reviews</label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100000"
                                  value={companyInfo.onlineReviews?.[platform.key]?.fiveStarReviews || ''}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    
                                    // Allow empty value
                                    if (value === '') {
                                      const updatedReviews = {
                                        ...(companyInfo.onlineReviews || {}),
                                        [platform.key]: {
                                          ...(companyInfo.onlineReviews?.[platform.key] || {}),
                                          fiveStarReviews: ''
                                        }
                                      };
                                      updateCompanyInfo('onlineReviews', updatedReviews);
                                      return;
                                    }
                                    
                                    // Parse as integer
                                    const numValue = parseInt(value, 10);
                                    
                                    // Check if valid number and cap at 100,000
                                    if (!isNaN(numValue)) {
                                      if (numValue > 100000) {
                                        value = '100000';
                                      } else if (numValue < 0) {
                                        value = '0';
                                      }
                                    }
                                    
                                    const updatedReviews = {
                                      ...(companyInfo.onlineReviews || {}),
                                      [platform.key]: {
                                        ...(companyInfo.onlineReviews?.[platform.key] || {}),
                                        fiveStarReviews: value
                                      }
                                    };
                                    updateCompanyInfo('onlineReviews', updatedReviews);
                                  }}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end gap-2 mt-6">
                          {onlineReviewsSaveAttempted && (!companyInfo.onlineReviews || !Object.keys(companyInfo.onlineReviews || {}).some(platform => {
                            const review = companyInfo.onlineReviews[platform];
                            return (review.averageRating && review.averageRating !== '') ||
                                   (review.totalReviews && review.totalReviews !== '') ||
                                   (review.fiveStarReviews && review.fiveStarReviews !== '');
                          })) && (
                            <span className="text-red-600 text-sm font-medium flex items-center">
                              <span className="text-red-500">*</span> Please enter at least one review
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={handleSaveOnlineReviews}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          >
                            Save
                </button>
                        </div>
                        </div>
                      )}
                    </div>
                </div>
                      </div>
                    )}
                    
                    {/* Forms Content */}
                    {selectedTab === 'Forms' && (
                      <div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-fuchsia-100 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-fuchsia-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 flex-1">Forms</h3>
                          </div>
                          
                          {/* Forms Grid - 1x4 */}
                          <div className="grid grid-cols-4 gap-6">
                            <button
                              onClick={() => openFormBuilder('estimate')}
                              className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-6 cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg shadow-md"
                            >
                              <FileText className="w-8 h-8 mb-3 text-blue-600 group-hover:text-blue-700 transition-colors" />
                              <span className="text-base font-medium text-gray-900 text-center leading-tight">Customize Estimate</span>
                              {formTemplates.estimate.fields.length > 0 && (
                                <span className="absolute top-2 right-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                                  {formTemplates.estimate.fields.length} fields
                                </span>
                              )}
                            </button>

                            <button
                              onClick={() => openFormBuilder('contract')}
                              className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-6 cursor-pointer transition-all hover:bg-purple-50 hover:border-purple-400 hover:shadow-lg shadow-md"
                            >
                              <FileSignature className="w-8 h-8 mb-3 text-purple-600 group-hover:text-purple-700 transition-colors" />
                              <span className="text-base font-medium text-gray-900 text-center leading-tight">Customize Contract</span>
                              {formTemplates.contract.fields.length > 0 && (
                                <span className="absolute top-2 right-2 bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                                  {formTemplates.contract.fields.length} fields
                                </span>
                              )}
                            </button>

                            <button
                              onClick={() => openFormBuilder('invoice')}
                              className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-6 cursor-pointer transition-all hover:bg-amber-50 hover:border-amber-400 hover:shadow-lg shadow-md"
                            >
                              <Receipt className="w-8 h-8 mb-3 text-amber-600 group-hover:text-amber-700 transition-colors" />
                              <span className="text-base font-medium text-gray-900 text-center leading-tight">Customize Invoice</span>
                              {formTemplates.invoice.fields.length > 0 && (
                                <span className="absolute top-2 right-2 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                                  {formTemplates.invoice.fields.length} fields
                                </span>
                              )}
                            </button>

                            <button
                              onClick={() => openFormBuilder('thankYou')}
                              className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-6 cursor-pointer transition-all hover:bg-rose-50 hover:border-rose-400 hover:shadow-lg shadow-md"
                            >
                              <HeartHandshake className="w-8 h-8 mb-3 text-rose-500 group-hover:text-rose-600 transition-colors" />
                              <span className="text-base font-medium text-gray-900 text-center leading-tight">Thank You Note</span>
                              {formTemplates.thankYou.fields.length > 0 && (
                                <span className="absolute top-2 right-2 bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full">
                                  {formTemplates.thankYou.fields.length} fields
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Builder Modal */}
            {formBuilderOpen && activeFormType && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl w-[90vw] max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200" style={{ backgroundColor: formTemplates[activeFormType]?.settings?.primaryColor + '10' }}>
                    <div className="flex items-center gap-3">
                      {activeFormType === 'estimate' && <FileText className="w-6 h-6 text-blue-600" />}
                      {activeFormType === 'contract' && <FileSignature className="w-6 h-6 text-purple-600" />}
                      {activeFormType === 'invoice' && <Receipt className="w-6 h-6 text-amber-600" />}
                      {activeFormType === 'thankYou' && <HeartHandshake className="w-6 h-6 text-rose-500" />}
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {formTemplates[activeFormType]?.name || 'Form Builder'}
                        </h2>
                        <p className="text-sm text-gray-500">Customize the fields customers will see</p>
                      </div>
                    </div>
                    <button
                      onClick={closeFormBuilder}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="flex-1 overflow-hidden flex">
                    {/* Left Panel - Field List */}
                    <div className="w-1/2 border-r border-gray-200 flex flex-col">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-700">Form Fields</h3>
                        <span className="text-sm text-gray-500">{formTemplates[activeFormType]?.fields?.length || 0} fields</span>
                      </div>

                      {/* Fields List */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {formTemplates[activeFormType]?.fields?.map((field, index) => (
                          <div
                            key={field.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${
                              editingField === field.id
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                            }`}
                            onClick={() => setEditingField(field.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col gap-0.5">
                                <button
                                  onClick={(e) => { e.stopPropagation(); moveField(field.id, 'up'); }}
                                  disabled={index === 0}
                                  className={`p-0.5 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                                >
                                  <ChevronUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); moveField(field.id, 'down'); }}
                                  disabled={index === formTemplates[activeFormType].fields.length - 1}
                                  className={`p-0.5 rounded ${index === formTemplates[activeFormType].fields.length - 1 ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                                >
                                  <ChevronDown className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-800 truncate">{field.label}</span>
                                  {field.required && <span className="text-red-500 text-xs">*</span>}
                                  {field.prefilled && (
                                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Auto-fill</span>
                                  )}
                                </div>
                                <span className="text-xs text-gray-500 capitalize">{field.type}</span>
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {(!formTemplates[activeFormType]?.fields || formTemplates[activeFormType].fields.length === 0) && (
                          <div className="text-center py-8 text-gray-500">
                            <p>No fields yet. Add your first field below.</p>
                          </div>
                        )}
                      </div>

                      {/* Add Field Section */}
                      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                        <div className="flex gap-2">
                          <select
                            value={newFieldType}
                            onChange={(e) => setNewFieldType(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {fieldTypes.map(ft => (
                              <option key={ft.value} value={ft.value}>{ft.label}</option>
                            ))}
                          </select>
                          <button
                            onClick={addFieldToForm}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel - Field Editor / Preview */}
                    <div className="w-1/2 flex flex-col">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-700">
                          {editingField ? 'Edit Field' : 'Field Settings'}
                        </h3>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4">
                        {editingField ? (
                          (() => {
                            const field = formTemplates[activeFormType]?.fields?.find(f => f.id === editingField);
                            if (!field) return null;
                            return (
                              <div className="space-y-4">
                                {/* Field Label */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Field Label</label>
                                  <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>

                                {/* Field Type (read-only) */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                                  <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 capitalize">
                                    {fieldTypes.find(ft => ft.value === field.type)?.label || field.type}
                                  </div>
                                </div>

                                {/* Placeholder (for text-like fields) */}
                                {['text', 'email', 'phone', 'textarea', 'address'].includes(field.type) && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder Text</label>
                                    <input
                                      type="text"
                                      value={field.placeholder || ''}
                                      onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      placeholder="Enter placeholder..."
                                    />
                                  </div>
                                )}

                                {/* Dropdown Options */}
                                {field.type === 'dropdown' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Options (one per line)</label>
                                    <textarea
                                      value={(field.options || []).join('\n')}
                                      onChange={(e) => updateField(field.id, { options: e.target.value.split('\n').filter(o => o.trim()) })}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      rows={4}
                                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                                    />
                                  </div>
                                )}

                                {/* Checkboxes */}
                                <div className="space-y-3 pt-2">
                                  <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={field.required || false}
                                      onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Required field</span>
                                  </label>

                                  <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={field.prefilled || false}
                                      onChange={(e) => updateField(field.id, { prefilled: e.target.checked })}
                                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <div>
                                      <span className="text-sm text-gray-700">Auto-fill from customer data</span>
                                      <p className="text-xs text-gray-500">Field will be pre-populated with customer info when sending</p>
                                    </div>
                                  </label>
                                </div>

                                {/* Preview */}
                                <div className="pt-4 border-t border-gray-200">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      {field.label}
                                      {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    {field.type === 'text' && (
                                      <input type="text" disabled placeholder={field.placeholder || 'Enter text...'} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" />
                                    )}
                                    {field.type === 'email' && (
                                      <input type="email" disabled placeholder={field.placeholder || 'email@example.com'} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" />
                                    )}
                                    {field.type === 'phone' && (
                                      <input type="tel" disabled placeholder={field.placeholder || '(555) 123-4567'} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" />
                                    )}
                                    {field.type === 'address' && (
                                      <input type="text" disabled placeholder={field.placeholder || '123 Main St, City, State'} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" />
                                    )}
                                    {field.type === 'textarea' && (
                                      <textarea disabled placeholder={field.placeholder || 'Enter details...'} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" rows={3} />
                                    )}
                                    {field.type === 'dropdown' && (
                                      <select disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                                        <option>Select an option...</option>
                                        {(field.options || []).map((opt, i) => (
                                          <option key={i}>{opt}</option>
                                        ))}
                                      </select>
                                    )}
                                    {field.type === 'checkbox' && (
                                      <label className="flex items-center gap-2">
                                        <input type="checkbox" disabled className="w-4 h-4" />
                                        <span className="text-sm text-gray-600">{field.label}</span>
                                      </label>
                                    )}
                                    {field.type === 'date' && (
                                      <input type="date" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" />
                                    )}
                                    {field.type === 'signature' && (
                                      <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg bg-white flex items-center justify-center text-gray-400">
                                        <PenTool className="w-5 h-5 mr-2" />
                                        Signature field
                                      </div>
                                    )}
                                    {field.type === 'rating' && (
                                      <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                          <Star key={star} className="w-6 h-6 text-gray-300" />
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })()
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <Settings className="w-12 h-12 mb-3 text-gray-300" />
                            <p>Select a field to edit its settings</p>
                            <p className="text-sm mt-1">or add a new field below</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={formTemplates[activeFormType]?.settings?.showLogo || false}
                          onChange={(e) => updateFormSettings('showLogo', e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        Show company logo
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Theme color:</span>
                        <input
                          type="color"
                          value={formTemplates[activeFormType]?.settings?.primaryColor || '#3B82F6'}
                          onChange={(e) => updateFormSettings('primaryColor', e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={closeFormBuilder}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // Preview functionality will go here
                        }}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Preview Form
                      </button>
                      <button
                        onClick={() => {
                          // Save to backend would go here
                          closeFormBuilder();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Save Form
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>);
};

export default MyBusiness;
