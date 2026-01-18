import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown, Plus, X, Check, FileText, FileSignature, Receipt, HeartHandshake, Clock, Award, Shield, ShieldCheck, MapPin, Star, Search, Trash2, Pencil, Briefcase, User, Globe } from 'lucide-react';
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
  const [editingCertifications, setEditingCertifications] = useState(false);
  const [certificationErrors, setCertificationErrors] = useState({}); // Track validation errors by cert id
  const [editingInsurance, setEditingInsurance] = useState(false);
  const [insuranceErrors, setInsuranceErrors] = useState({}); // Track validation errors by insurance id
  const [editingGuaranteeWarranty, setEditingGuaranteeWarranty] = useState(false);
  const [contactDetailsSaveAttempted, setContactDetailsSaveAttempted] = useState(false);
  const [areasServedSaveAttempted, setAreasServedSaveAttempted] = useState(false);
  const [operatingHoursSaveAttempted, setOperatingHoursSaveAttempted] = useState(false);
  const [guaranteeWarrantySaveAttempted, setGuaranteeWarrantySaveAttempted] = useState(false);
  const [savedBrandIdentity, setSavedBrandIdentity] = useState(null);
  const [editingBrandIdentity, setEditingBrandIdentity] = useState(false);
  const [brandIdentitySaveAttempted, setBrandIdentitySaveAttempted] = useState(false);
  const [savedCustomerReviews, setSavedCustomerReviews] = useState([]);
  const [editingReviewIndex, setEditingReviewIndex] = useState(null);
  const [savedOnlineReviews, setSavedOnlineReviews] = useState(null);
  const [editingOnlineReviews, setEditingOnlineReviews] = useState(false);
  const [onlineReviewsSaveAttempted, setOnlineReviewsSaveAttempted] = useState(false);

  // Company qualities state
  const [customCompanyQualities, setCustomCompanyQualities] = useState([]);
  const [newCompanyQuality, setNewCompanyQuality] = useState('');

  // City search state
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [isCitySearchOpen, setIsCitySearchOpen] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [citySearchError, setCitySearchError] = useState(null);

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
    // Track 1 category: at least one area selected
    const completed = companyInfo.areasServed.length > 0 ? 1 : 0;
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
    setSavedCertifications((prev) => {
      const existingIds = new Set(prev.map(c => c.id));
      const newCerts = validCertifications.filter(c => !existingIds.has(c.id));
      return [...prev, ...newCerts];
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

  const handleCitySearchChange = async (e) => {
    const value = e.target.value;
    setCitySearchTerm(value);
    
    if (value.length >= 2) {
      setIsLoadingCities(true);
      setCitySearchError(null);
      setIsCitySearchOpen(true);
      
      try {
        // Call backend API for city search
        const cities = await cityService.search(value);
        setCitySearchResults(cities);
      } catch (error) {
        console.error('City search error:', error);
        setCitySearchError('Unable to search cities. Please try again.');
        setCitySearchResults([]);
      } finally {
        setIsLoadingCities(false);
      }
    } else {
      setIsCitySearchOpen(false);
      setCitySearchResults([]);
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
  const toggleService = (service) => {
    const isSelected = selectedServices.includes(service);
    
    if (isSelected) {
      // Remove service
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
      // Add service
      setSelectedServices((prev) => [...prev, service]);
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

  return (<div className="my-business-container">
            {/* Quote Section */}
            {/* Company Information Section */}
            <div className="company-info-section">
              <div className="company-info-header">
                <h2 className="company-info-title">Company Information</h2>
              </div>
              
              {/* Two Column Layout: 20% Tabs | 80% Content */}
              <div className="flex gap-4 mt-6">
                {/* Left Column - Tabs (20%) */}
                <div className="w-1/5 flex flex-col gap-4">
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
                        <span className="text-sm font-medium text-gray-700 truncate">Contact Details</span>
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
                        <span className="text-sm font-medium text-gray-700 truncate">Areas Served</span>
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
                        <span className="text-sm font-medium text-gray-700 truncate">Operating Hours</span>
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
                        <span className="text-sm font-medium text-gray-700 truncate">Services Offered</span>
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
                  
                  {/* Brand & Reputation Section */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">Brand & Reputation</h4>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Brand Identity')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Brand Identity' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <Star className="w-5 h-5 text-lime-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 truncate">Brand Identity</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Customer Reviews')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Customer Reviews' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <User className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 truncate">Customer Reviews</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedTab('Online Reviews')}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left active:bg-slate-200 ${
                          selectedTab === 'Online Reviews' 
                            ? 'bg-slate-100 shadow-sm' 
                            : 'bg-white hover:bg-slate-100'
                        }`}
                      >
                        <Globe className="w-5 h-5 text-violet-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 truncate">Online Reviews</span>
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
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 min-h-[400px]">
                    {/* Contact Details Content */}
                    {selectedTab === 'Contact Details' && (
                      <div>
                {/* Contact Details */}
                <div className="bg-slate-100 border border-slate-300 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">
                      Contact Details 
                      {contactDetailsSaveAttempted && (() => {
                        const { completed, total } = getCompanyDetailsCompletion();
                        const isComplete = completed === total;
                        return !isComplete ? (
                          <span className="text-red-500 text-sm ml-0.5">*</span>
                        ) : null;
                      })()}
                    </h3>
                    {(() => {
                      const { completed, total } = getCompanyDetailsCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                  </div>
                  
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
                          onChange={(e) => updateCompanyInfo('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="form-input"
                          required
                        />
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
                          onChange={(e) => updateCompanyInfo('email', e.target.value)}
                          placeholder="contact@company.com"
                          className="form-input"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label">Website</label>
                        <input
                          type="url"
                          value={companyInfo.website || ''}
                          onChange={(e) => updateCompanyInfo('website', e.target.value)}
                          placeholder="https://www.yourcompany.com"
                          className="form-input"
                        />
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
                              onChange={(e) => updateCompanyInfo('zip', e.target.value)}
                              placeholder="12345"
                              className="form-input"
                              required
                            />
                          </div>
                        </div>
                      </div>

                    <div className="flex items-center justify-end gap-3 mt-4">
                      {contactDetailsSaveAttempted && (() => {
                        const { completed, total } = getCompanyDetailsCompletion();
                        const isComplete = completed === total;
                        return !isComplete ? (
                          <span className="text-red-600 text-sm font-medium">
                            <span className="text-red-500">*</span> Please complete all required fields
                          </span>
                        ) : null;
                      })()}
                      <button
                        type="button"
                        onClick={() => {
                          setContactDetailsSaveAttempted(true);
                          const { completed, total } = getCompanyDetailsCompletion();
                          const isComplete = completed === total;
                          if (isComplete) {
                            // Save logic here if needed
                            setContactDetailsSaveAttempted(false);
                          }
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>
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
                    {(() => {
                      const { completed, total } = getAreasServedCompletionLocal();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                  </div>
                  
                    <div className="space-y-5">
                      {/* Areas Served Content - Gray Box */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
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
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all text-sm bg-white shadow-sm"
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
                    
                    <div className="flex items-center justify-end gap-3 mt-4">
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
                            // Save logic here if needed
                            setAreasServedSaveAttempted(false);
                          }
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                      >
                        Save
                      </button>
                </div>
                </div>
                      </div>
                    )}

                    {/* Operating Hours Content */}
                    {selectedTab === 'Operating Hours' && (
                      <div>
                {/* Operating Hours */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Operating Hours</h3>
                    {(() => {
                      const { completed, total } = getOperatingHoursCompletionLocal();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                  </div>
                  
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Set your default hours of operation
                      </p>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                        {companyInfo.operatingHours.map((hours, index) => {
                          const isDayComplete = 
                            hours.closed === true ||
                            hours.open24hr === true ||
                            (hours.open && hours.open.trim() !== '' && hours.close && hours.close.trim() !== '');
                          const isDayIncomplete = !isDayComplete;
                          
                          return (
                          <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-slate-200">
                            <div className="w-24 font-medium text-gray-900 text-sm flex items-center gap-1">
                              {hours.day}
                              {operatingHoursSaveAttempted && isDayIncomplete && (
                                <span className="text-red-500 text-sm">*</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={hours.closed || false}
                                onChange={(e) => {
                                  const updatedHours = [...companyInfo.operatingHours];
                                  updatedHours[index] = {
                                    ...updatedHours[index],
                                    closed: e.target.checked,
                                    open24hr: e.target.checked ? false : updatedHours[index].open24hr || false,
                                    open: e.target.checked ? '' : (updatedHours[index].open || ''),
                                    close: e.target.checked ? '' : (updatedHours[index].close || '')
                                  };
                                  updateCompanyInfo('operatingHours', updatedHours);
                                }}
                                className="w-4 h-4 rounded border-gray-300 accent-blue-600 focus:ring-blue-500 focus:ring-2"
                              />
                              <label className="text-sm text-gray-700">Closed</label>
                            </div>
                            {!hours.closed && (
                              <>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={hours.open24hr || false}
                                    onChange={(e) => {
                                      const updatedHours = [...companyInfo.operatingHours];
                                      updatedHours[index] = {
                                        ...updatedHours[index],
                                        open24hr: e.target.checked,
                                        open: e.target.checked ? '' : (updatedHours[index].open || ''),
                                        close: e.target.checked ? '' : (updatedHours[index].close || '')
                                      };
                                      updateCompanyInfo('operatingHours', updatedHours);
                                    }}
                                    className="w-4 h-4 rounded border-gray-300 accent-blue-600 focus:ring-blue-500 focus:ring-2"
                                  />
                                  <label className="text-sm text-gray-700">Open 24hr</label>
                                </div>
                                {!hours.open24hr && (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <label className="text-xs text-gray-600">Open:</label>
                                      <input
                                        type="text"
                                        value={hours.open || ''}
                                        onChange={(e) => {
                                          const updatedHours = [...companyInfo.operatingHours];
                                          updatedHours[index] = { 
                                            ...updatedHours[index], 
                                            open: e.target.value,
                                            open24hr: false
                                          };
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
                                        value={hours.close || ''}
                                        onChange={(e) => {
                                          const updatedHours = [...companyInfo.operatingHours];
                                          updatedHours[index] = { 
                                            ...updatedHours[index], 
                                            close: e.target.value,
                                            open24hr: false
                                          };
                                          updateCompanyInfo('operatingHours', updatedHours);
                                        }}
                                        placeholder="6:00 PM"
                                        className="w-24 px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                      />
                                    </div>
                                  </>
                                )}
                                {hours.open24hr && (
                                  <span className="text-sm text-gray-500 italic">Open 24 Hours</span>
                                )}
                              </>
                            )}
                            {hours.closed && (
                              <span className="text-sm text-gray-500 italic">Closed</span>
                            )}
                          </div>
                          );
                        })}
                      </div>
                </div>

                    <div className="flex items-center justify-end gap-3 mt-4">
                      {operatingHoursSaveAttempted && (() => {
                        const { completed, total } = getOperatingHoursCompletionLocal();
                      const isComplete = completed === total;
                        return !isComplete ? (
                          <span className="text-red-600 text-sm font-medium">
                            <span className="text-red-500">*</span> Please fill in all days
                          </span>
                        ) : null;
                    })()}
                              <button
                                type="button"
                                onClick={() => {
                          setOperatingHoursSaveAttempted(true);
                          const { completed, total } = getOperatingHoursCompletionLocal();
                      const isComplete = completed === total;
                          if (isComplete) {
                            // Save current operating hours
                            setSavedOperatingHours([...companyInfo.operatingHours]);
                            setOperatingHoursSaveAttempted(false);
                          }
                        }}
                              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                            >
                              Save
                            </button>
                          </div>
                      </div>
                    </div>
                  )}

                    {/* Services Offered Content */}
                    {selectedTab === 'Services Offered' && (
                              <div>
            {/* Services Offered Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">
                      Services Offered
                    </h3>
                    {servicesOfferedSaveAttempted && selectedServices.length === 0 && (
                      <span className="text-red-600 text-sm font-medium flex items-center">
                        <span className="text-red-500">*</span> One service required
                  </span>
                )}
              </div>
              
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
                                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
                                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
              {selectedServices.length > 0 ? (
                <div className={`mt-4 pr-2 ${selectedServices.length > 3 ? 'max-h-[650px] overflow-y-auto' : ''}`}>
                  {/* Service cards with chemicals and PSI */}
                  <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${selectedServices.length > 3 ? 'pb-4' : ''}`}>
                    {selectedServices.map((service) => {
                      const serviceChemList = serviceChemicals[service] || [];
                      return (
                        <div
                          key={service}
                          className="border rounded-lg p-4 bg-slate-50 border-gray-300 relative min-w-0"
                          style={{width: '100%'}}
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
                        
                        {/* Chemicals Used Section */}
                        <div className="mb-4">
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
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-left bg-white flex items-center justify-between"
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
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:ring-blue-500 focus:border-blue-500"
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
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:ring-blue-500 focus:border-blue-500"
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
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:ring-blue-500 focus:border-blue-500"
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
                                    className="px-2 py-1 border border-gray-300 rounded text-xs w-20 focus:ring-blue-500 focus:border-blue-500"
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
                        
                        {/* PSI Section */}
                        <div className="pt-2 border-t border-slate-200">
                          <label className="block text-xs font-medium text-gray-700 mb-2">PSI:</label>
                          <input
                            type="text"
                            value={servicePSI[service] || ''}
                            onChange={(e) => updateServicePSI(service, e.target.value)}
                            placeholder="Enter PSI (e.g., 1500)"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Safety & Prevention Section */}
                        <div className="pt-3 mt-2 border-t border-gray-300">
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
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white text-left flex items-center justify-between hover:bg-gray-50"
                            >
                              <span className="text-gray-500">Select safety measures...</span>
                              <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${safetyDropdownOpen[service] ? 'transform rotate-180' : ''}`} />
                </button>
                            {safetyDropdownOpen[service] && (
                              <div className="absolute z-[100] w-full bottom-full mb-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                <div className="overflow-y-auto max-h-56 rounded-lg">
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
                                    const serviceMeasures = serviceSafetyMeasures[service] || [];
                                    const allSelected = serviceMeasures.length === allMeasures.length && allMeasures.length > 0;
                            
                          return (
                                      <>
                                        {/* Select All / Deselect All */}
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (allSelected) {
                                              deselectAllSafetyMeasures(service);
                                            } else {
                                              selectAllSafetyMeasures(service, allMeasures);
                                            }
                                          }}
                                          className="w-full px-3 py-2 text-xs font-semibold text-left bg-gray-50 hover:bg-gray-100 transition-colors border-b-2 border-gray-200 text-gray-700"
                                        >
                                          {allSelected ? 'Deselect All' : 'Select All'}
                                        </button>
                                        {allMeasures.map((measure) => {
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
                                                className="mr-2 w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                onClick={(e) => e.stopPropagation()}
                                              />
                                              <span className="text-gray-700 flex-1">{measure}</span>
                                            </label>
                                          );
                                        })}
                                        {/* Add custom safety measure option */}
                                        <div className="border-t border-gray-200 mt-1 pt-1 px-3 pb-2">
                                          <div className="flex items-center gap-2">
                        <input
                          type="text"
                                              value={newCustomSafetyMeasure[service] || ''}
                                              onChange={(e) => setNewCustomSafetyMeasure(prev => ({ ...prev, [service]: e.target.value }))}
                                              placeholder="Add custom measure..."
                                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:ring-blue-500 focus:border-blue-500"
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
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-center py-8">
                  <p className="text-sm text-gray-500">
                    No services selected. Use the dropdown above to add services.
                  </p>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-6 flex items-center justify-end gap-4">
                {servicesOfferedSaveAttempted && selectedServices.length === 0 && (
                  <span className="text-red-600 text-sm font-medium">
                    <span className="text-red-500">*</span> One service required
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setServicesOfferedSaveAttempted(true);
                    if (selectedServices.length > 0) {
                      // Services are valid, reset error state
                      setServicesOfferedSaveAttempted(false);
                      // You can add additional save logic here if needed
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                >
                  Save
                </button>
            </div>
                </div>
                      </div>
                    )}

                    {/* Certifications Content */}
                    {selectedTab === 'Certifications' && (
                      <div>
                {/* Certifications */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Certifications</h3>
                    {(() => {
                      const { completed, total } = getCertificationsCompletionLocal();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                  </div>
                  
                    <div className="space-y-4">
                      {/* Saved Certifications - Always shown if they exist */}
                      {savedCertifications.length > 0 && (
                        <div className="space-y-3">
                          {savedCertifications.map((cert) => (
                            // Display format
                            <div
                              key={cert.id}
                              className="border border-gray-200 rounded-2xl px-5 py-4 bg-slate-50/60 relative"
                            >
                              {/* Pencil and Trashcan buttons - upper right */}
                              <div className="absolute top-4 right-4 flex gap-2">
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
                                  className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                  aria-label="Edit certification"
                                >
                                  <Pencil className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
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
                              
                              <div className="grid grid-cols-3 gap-6 pr-20">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                                  <p className="text-base font-medium text-gray-900">{cert.certificationName}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-1">Certifying Organization</label>
                                  <p className="text-base text-gray-800">{cert.certifyingOrganization}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date Received</label>
                                  <p className="text-base text-gray-800">
                                    {cert.dateReceived ? new Date(cert.dateReceived).toLocaleDateString() : '—'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Editable Certifications - Shown when editing or when no saved certifications */}
                      {(editingCertifications || savedCertifications.length === 0) && (
                        <div className="space-y-4">
                          {companyInfo.certificationsList.length > 0 && companyInfo.certificationsList.map((cert, index) => (
                            <div key={cert.id || index} className="bg-slate-50/60 border border-slate-200 rounded-lg p-4 relative">
                              {/* Trashcan button - upper right */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = companyInfo.certificationsList.filter((_, i) => i !== index);
                                  updateCompanyInfo('certificationsList', updated);
                                }}
                                className="absolute top-4 right-4 group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                aria-label="Delete certification"
                              >
                                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                              </button>
                              
                              <div className="grid grid-cols-3 gap-4 pr-10">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Certification Name
                              {certificationErrors[cert.id]?.missingName && (
                                <span className="text-red-500 text-sm ml-0.5">*</span>
                              )}
                            </label>
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
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-700 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Certifying Organization
                              {certificationErrors[cert.id]?.missingOrganization && (
                                <span className="text-red-500 text-sm ml-0.5">*</span>
                              )}
                            </label>
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
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-700 focus:outline-none"
                            />
                          </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Date Received
                                  {certificationErrors[cert.id]?.missingDate && (
                                    <span className="text-red-500 text-sm ml-0.5">*</span>
                                  )}
                                </label>
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
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-700 focus:outline-none"
                                />
                              </div>
                              </div>
                              
                              {/* Save button at bottom right */}
                              <div className="flex items-center justify-end gap-3 mt-4">
                                {(() => {
                                  const errors = {};
                                  let hasErrors = false;
                                  
                                  if (!cert.certificationName || cert.certificationName.trim() === '') {
                                    hasErrors = true;
                                  }
                                  
                                  if (!cert.certifyingOrganization || cert.certifyingOrganization.trim() === '') {
                                    hasErrors = true;
                                  }
                                  
                                  if (!cert.dateReceived || cert.dateReceived.trim() === '') {
                                    hasErrors = true;
                                  }
                                  
                                  return hasErrors && certificationErrors[cert.id] && Object.keys(certificationErrors[cert.id]).length > 0 ? (
                                    <span className="text-red-600 text-sm font-medium flex items-center">
                                      <span className="text-red-500">*</span> Please fill in all required fields
                                    </span>
                                  ) : null;
                                })()}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Save this individual certification
                                    const certToSave = cert;
                                    const errors = {};
                                    let hasErrors = false;
                                    
                                    if (!certToSave.certificationName || certToSave.certificationName.trim() === '') {
                                      errors.missingName = true;
                                      hasErrors = true;
                                    }
                                    
                                    if (!certToSave.certifyingOrganization || certToSave.certifyingOrganization.trim() === '') {
                                      errors.missingOrganization = true;
                                      hasErrors = true;
                                    }
                                    
                                    if (!certToSave.dateReceived || certToSave.dateReceived.trim() === '') {
                                      errors.missingDate = true;
                                      hasErrors = true;
                                    }
                                    
                                    if (hasErrors) {
                                      // Set errors for this certification
                                      setCertificationErrors(prev => ({
                                        ...prev,
                                        [cert.id]: errors
                                      }));
                                      return;
                                    }
                                    
                                    // Clear any errors for this certification
                                    setCertificationErrors(prev => {
                                      const newErrors = { ...prev };
                                      delete newErrors[cert.id];
                                      return newErrors;
                                    });
                                    
                                    const newCert = {
                                      ...certToSave,
                                      id: certToSave.id || Date.now() + Math.random(),
                                      savedAt: new Date().toISOString()
                                    };
                                    setSavedCertifications((prev) => {
                                      const existingIds = new Set(prev.map(c => c.id));
                                      if (existingIds.has(newCert.id)) {
                                        return prev.map(c => c.id === newCert.id ? newCert : c);
                                      }
                                      if (prev.length >= 10) {
                                        alert('Maximum of 10 certifications allowed');
                                        return prev;
                                      }
                                      return [...prev, newCert];
                                    });
                                    // Remove from editable list
                                    const updated = companyInfo.certificationsList.filter((_, i) => i !== index);
                                    updateCompanyInfo('certificationsList', updated);
                                  }}
                                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                                >
                                  Save
                                </button>
                              </div>
                        </div>
                      ))}
                      
                      {/* Add Certification Button - Only shown when no certifications are being edited */}
                      {companyInfo.certificationsList.length === 0 && (
                      <button
                        type="button"
                        onClick={() => {
                                const totalCertifications = savedCertifications.length + companyInfo.certificationsList.length;
                                if (totalCertifications >= 10) {
                                  alert('Maximum of 10 certifications allowed');
                                  return;
                                }
                          updateCompanyInfo('certificationsList', [
                            ...companyInfo.certificationsList,
                                  { id: Date.now() + Math.random(), certificationName: '', certifyingOrganization: '', dateReceived: '' }
                          ]);
                        }}
                              disabled={savedCertifications.length + companyInfo.certificationsList.length >= 10}
                              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all border border-dashed border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">Add Certification</span>
                      </button>
                      )}

                        </div>
                      )}

                      {/* Add Certification Button - Only shown when not editing and there are saved certifications */}
                      {!editingCertifications && savedCertifications.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (savedCertifications.length >= 10) {
                              alert('Maximum of 10 certifications allowed');
                              return;
                            }
                            setEditingCertifications(true);
                            // Only add a new empty certification, don't load saved ones
                            updateCompanyInfo('certificationsList', [
                              { id: Date.now() + Math.random(), certificationName: '', certifyingOrganization: '', dateReceived: '' }
                            ]);
                          }}
                          disabled={savedCertifications.length >= 10}
                          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all border border-dashed border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-sm font-medium">Add Certification</span>
                        </button>
                      )}
                    </div>
                </div>
                      </div>
                    )}

                    {/* Insurance Content */}
                    {selectedTab === 'Insurance' && (
                      <div>
                {/* Insurance */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Insurance</h3>
                    {(() => {
                      const { completed, total } = getInsuranceCompletionLocal();
                      const isComplete = completed === total;
                          return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                  </div>
                  
                    <div className="space-y-4">
                      {/* Check if Uninsured is selected */}
                      {(() => {
                        const isUninsured = savedInsurance.some(ins => ins.status === 'Uninsured') || 
                                          (companyInfo.insuranceList || []).some(ins => ins.status === 'Uninsured');
                        
                        return (
                          <>
                            {/* Saved Insurance - Hidden if Uninsured is checked */}
                            {savedInsurance.length > 0 && !isUninsured && (
                              <div className="space-y-3">
                                {savedInsurance.map((ins) => (
                            // Display format
                            <div
                              key={ins.id}
                              className="border border-gray-200 rounded-2xl px-5 py-4 bg-slate-50/60 relative flex items-center"
                            >
                              <div className="flex-1 grid grid-cols-3 gap-6 items-center">
                        <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                  <p className="text-base font-medium text-gray-900">{ins.company || '—'}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-1">Policy Number</label>
                                  <p className="text-base text-gray-800">{ins.policyNumber || '—'}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-1">Coverage Limits ($)</label>
                                  <p className="text-base text-gray-800">
                                    {ins.coverageLimits ? `$${parseFloat(ins.coverageLimits.replace(/[^0-9.]/g, '') || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '—'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-end gap-2 ml-4">
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
                                  className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                  aria-label="Edit insurance"
                                >
                                  <Pencil className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = savedInsurance.filter(i => i.id !== ins.id);
                                    setSavedInsurance(updated);
                                  }}
                                  className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                                  aria-label="Delete insurance"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                </button>
                        </div>
                            </div>
                          ))}
                        </div>
                      )}

                            {/* Editable Insurance - Hidden if Uninsured is checked */}
                            {(editingInsurance || savedInsurance.length === 0) && !isUninsured && (
                              <div className="space-y-4">
                                {(companyInfo.insuranceList || []).length > 0 && (() => {
                                  const filteredList = (companyInfo.insuranceList || []).filter(ins => ins.status !== 'Uninsured');
                                  return filteredList.map((ins) => {
                                    // Find the original index in the unfiltered array by id or by matching the object
                                    const originalIndex = (companyInfo.insuranceList || []).findIndex(item => {
                                      if (item.status === 'Uninsured') return false;
                                      if (ins.id && item.id === ins.id) return true;
                                      // Match by object reference as fallback
                                      return item === ins;
                                    });
                                    return (
                            <div key={ins.id || originalIndex} className="grid grid-cols-4 gap-4 items-end p-4 bg-slate-50/60 border border-slate-200 rounded-lg">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Company
                                  {insuranceErrors[ins.id]?.missingCompany && (
                                    <span className="text-red-500 text-sm ml-0.5">*</span>
                                  )}
                                </label>
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
                                  disabled={ins.status === 'Uninsured'}
                                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-700 focus:outline-none ${
                                    ins.status === 'Uninsured' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''
                                }`}
                              />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Policy Number
                                  {insuranceErrors[ins.id]?.missingPolicyNumber && (
                                    <span className="text-red-500 text-sm ml-0.5">*</span>
                                  )}
                                </label>
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
                                  disabled={ins.status === 'Uninsured'}
                                  className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-700 focus:outline-none ${
                                    ins.status === 'Uninsured' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''
                                }`}
                              />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Coverage Limits ($)
                                  {insuranceErrors[ins.id]?.missingCoverageLimits && (
                                    <span className="text-red-500 text-sm ml-0.5">*</span>
                                  )}
                                </label>
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
                                  disabled={ins.status === 'Uninsured'}
                                  className={`w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-700 focus:outline-none ${
                                    ins.status === 'Uninsured' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''
                                }`}
                              />
                            </div>
                          </div>

                              <div className="flex justify-end gap-2 items-center">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Save this individual insurance
                                    const insToSave = ins;
                                    const errors = {};
                                    let hasErrors = false;
                                    
                                    if (insToSave.status !== 'Uninsured') {
                                      if (!insToSave.company || insToSave.company.trim() === '') {
                                        errors.missingCompany = true;
                                        hasErrors = true;
                                      }
                                      
                                      if (!insToSave.policyNumber || insToSave.policyNumber.trim() === '') {
                                        errors.missingPolicyNumber = true;
                                        hasErrors = true;
                                      }
                                      
                                      if (!insToSave.coverageLimits || insToSave.coverageLimits.trim() === '') {
                                        errors.missingCoverageLimits = true;
                                        hasErrors = true;
                                      }
                                    }
                                    
                                    if (hasErrors) {
                                      setInsuranceErrors(prev => ({
                                        ...prev,
                                        [ins.id]: errors
                                      }));
                                      return;
                                    }
                                    
                                    setInsuranceErrors(prev => {
                                      const newErrors = { ...prev };
                                      delete newErrors[ins.id];
                                      return newErrors;
                                    });
                                    
                                    const newIns = {
                                      ...insToSave,
                                      id: insToSave.id || Date.now() + Math.random(),
                                      savedAt: new Date().toISOString()
                                    };
                                    setSavedInsurance((prev) => {
                                      const existingIds = new Set(prev.map(i => i.id));
                                      if (existingIds.has(newIns.id)) {
                                        return prev.map(i => i.id === newIns.id ? newIns : i);
                                      }
                                      if (prev.length >= 10) {
                                        alert('Maximum of 10 insurance policies allowed');
                                        return prev;
                                      }
                                      return [...prev, newIns];
                                    });
                                    // Remove from editable list
                                    const updated = (companyInfo.insuranceList || []).filter(item => {
                                      // Keep items that are Uninsured or don't match the saved insurance
                                      if (item.status === 'Uninsured') return true;
                                      // Remove the item that matches by id or object reference
                                      if (ins.id && item.id === ins.id) return false;
                                      return item !== ins;
                                    });
                                    updateCompanyInfo('insuranceList', updated);
                                  }}
                                  className="group p-2 rounded-lg border border-transparent hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                  aria-label="Save insurance"
                                >
                                  <Check className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                                </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    const updated = (companyInfo.insuranceList || []).filter(item => {
                                      // Keep items that are Uninsured or don't match the deleted insurance
                                      if (item.status === 'Uninsured') return true;
                                      // Remove the item that matches by id or object reference
                                      if (ins.id && item.id === ins.id) return false;
                                      return item !== ins;
                                    });
                                    updateCompanyInfo('insuranceList', updated);
                                  }}
                                  className="group p-2 rounded-lg border border-transparent hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                  aria-label="Delete insurance"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                                  </button>
                        </div>
                              </div>
                          );
                        });
                      })()}
                              </div>
                            )}

                            {/* Add Insurance Button and Uninsured checkbox */}
                            <div className="flex items-center gap-4">
                              {/* Add Insurance Button - Only shown when no insurance items are being edited */}
                              {(() => {
                                const filteredList = (companyInfo.insuranceList || []).filter(ins => ins.status !== 'Uninsured');
                                return filteredList.length === 0 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (savedInsurance.length >= 10) {
                                        alert('Maximum of 10 insurance policies allowed');
                                        return;
                                      }
                                      setEditingInsurance(true);
                                      updateCompanyInfo('insuranceList', [
                                        { id: Date.now() + Math.random(), company: '', policyNumber: '', coverageLimits: '', status: 'Insured' }
                                      ]);
                                    }}
                                    disabled={isUninsured}
                                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all border border-dashed border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <Plus className="w-4 h-4" />
                                    <span className="text-sm font-medium">Add Insurance</span>
                                  </button>
                                );
                              })()}
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isUninsured}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      // Clear all insurance entries and add uninsured entry
                                      setSavedInsurance([]);
                                      updateCompanyInfo('insuranceList', [
                                        { id: Date.now() + Math.random(), company: '', policyNumber: '', coverageLimits: '', status: 'Uninsured' }
                                      ]);
                                      setEditingInsurance(true);
                                    } else {
                                      // Remove uninsured entries
                                      const updated = (companyInfo.insuranceList || []).filter(ins => ins.status !== 'Uninsured');
                                      updateCompanyInfo('insuranceList', updated);
                                      if (updated.length === 0) {
                                        setEditingInsurance(false);
                                      }
                                    }
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 accent-blue-600 focus:ring-blue-500 focus:ring-2"
                                />
                                <label className="text-sm text-gray-700">Uninsured</label>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                </div>
                      </div>
                    )}

                    {/* Guarantee/Warranty Content */}
                    {selectedTab === 'Guarantee/Warranty' && (
                      <div>
                {/* Guarantee/Warranty */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Guarantee/Warranty</h3>
                    {(() => {
                      const { completed, total } = getGuaranteeWarrantyCompletionLocal();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                  </div>
                  
                    <div className="space-y-5">
                      {savedGuaranteeWarranty && savedGuaranteeWarranty.trim() !== '' && !editingGuaranteeWarranty ? (
                        // View Mode
                        <div className="p-4 bg-slate-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm italic text-gray-600">{savedGuaranteeWarranty}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
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
                          </div>
                        </div>
                      ) : (
                        // Edit Mode - Show textarea when section is opened
                        <div className="space-y-4">
                      <div className="relative p-4 bg-slate-50 border border-slate-200 rounded-lg">
                        {guaranteeWarrantySaveAttempted && (!companyInfo.guaranteeWarranty || companyInfo.guaranteeWarranty.trim() === '') && (
                          <span className="absolute top-2 left-2 text-red-500 text-sm font-medium">*</span>
                        )}
                          <textarea
                            rows={4}
                              value={companyInfo.guaranteeWarranty || ''}
                            onChange={(e) => {
                              updateCompanyInfo('guaranteeWarranty', e.target.value);
                              // Clear error when user starts typing
                              if (guaranteeWarrantySaveAttempted && e.target.value.trim() !== '') {
                                setGuaranteeWarrantySaveAttempted(false);
                              }
                            }}
                            placeholder="Describe your guarantee or warranty policy..."
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm resize-y bg-white shadow-sm focus:outline-none"
                          />
                            </div>
                            <div className="flex justify-end gap-2">
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
                          )}
                        </div>
                      </div>
                </div>
                    )}

                    {/* Brand Identity Content */}
                    {selectedTab === 'Brand Identity' && (
                      <div>
                {/* Brand Identity */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-lime-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Brand Identity</h3>
                    {(() => {
                      const { completed, total } = getBrandIdentityCompletionLocal();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                  </div>
                  
                    <div className="space-y-5">
                      {savedBrandIdentity && !editingBrandIdentity ? (
                        // Display Mode
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 relative">
                          {/* Edit Icon */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingBrandIdentity(true);
                              // Restore saved values to edit
                              updateCompanyInfo('companySlogan', savedBrandIdentity.companySlogan);
                              updateCompanyInfo('experienceYears', savedBrandIdentity.experienceYears);
                              updateCompanyInfo('jobsCompleted', savedBrandIdentity.jobsCompleted);
                              updateCompanyInfo('whatMakesDifferent', savedBrandIdentity.whatMakesDifferent);
                            }}
                            className="group absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                          </button>

                          {savedBrandIdentity.companySlogan && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Company Slogan</label>
                              <p className="text-base text-gray-900 italic">{savedBrandIdentity.companySlogan}</p>
                    </div>
                  )}

                          {(savedBrandIdentity.experienceYears || savedBrandIdentity.jobsCompleted) && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                              <div className="flex gap-3">
                                {savedBrandIdentity.experienceYears && (
                                  <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3">
                                    <label className="block text-xs text-gray-600 mb-1 text-center">Years in Business</label>
                                    <p className="text-2xl text-gray-900 font-semibold text-center">{savedBrandIdentity.experienceYears}</p>
                                  </div>
                                )}
                                {savedBrandIdentity.jobsCompleted && (
                                  <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3">
                                    <label className="block text-xs text-gray-600 mb-1 text-center">Jobs Completed (Estimate)</label>
                                    <p className="text-2xl text-gray-900 font-semibold text-center">{savedBrandIdentity.jobsCompleted}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {savedBrandIdentity.whatMakesDifferent && savedBrandIdentity.whatMakesDifferent.length > 0 && (
                            <div>
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
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company Slogan</label>
                        <input
                          type="text"
                            value={companyInfo.companySlogan || ''}
                            onChange={(e) => updateCompanyInfo('companySlogan', e.target.value)}
                            placeholder="Enter your company slogan"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                          <div className="flex gap-3">
                            <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 flex-1">
                                <label className="block text-xs text-gray-600 mb-1">Years in Business</label>
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
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                              />
                            </div>
                            <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 flex-1">
                                <label className="block text-xs text-gray-600 mb-1">Jobs Completed (Estimate)</label>
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
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
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
                
                    {/* Customer Reviews Content */}
                    {selectedTab === 'Customer Reviews' && (
                      <div>
                {/* Customer Reviews */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-rose-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Customer Reviews</h3>
                  </div>
                  
                    <div className="section-spacing">
                      {/* Customer Reviews Section */}
                      <div className="reviews-section">
                        <div className="section-spacing">
                            {/* Saved Reviews - Display Mode or Edit Mode */}
                            {savedCustomerReviews.map((review, index) => (
                              editingReviewIndex === index ? (
                                // Edit Mode - Show textarea in place
                                <div key={`edit-${index}`} className="review-item relative mb-4">
                                  <textarea
                                    value={companyInfo.customerReviews?.[0] || review}
                                    onChange={(e) => {
                                      updateCompanyInfo('customerReviews', [e.target.value]);
                                    }}
                                    rows={4}
                                    placeholder="Enter a customer review..."
                                    className="review-textarea review-textarea-md"
                                  />
                                  <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                                      onClick={() => {
                                        // Save edited review
                                        const editedReview = companyInfo.customerReviews?.[0] || review;
                                        if (editedReview && editedReview.trim() !== '') {
                                          const updatedSavedReviews = [...savedCustomerReviews];
                                          updatedSavedReviews[index] = editedReview;
                                          setSavedCustomerReviews(updatedSavedReviews);
                                          setEditingReviewIndex(null);
                                          updateCompanyInfo('customerReviews', []);
                                        }
                                      }}
                                      className="group p-2 rounded-lg border border-transparent hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                    >
                                      <Check className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        // Cancel editing
                                        setEditingReviewIndex(null);
                                        updateCompanyInfo('customerReviews', []);
                                      }}
                                      className="group p-2 rounded-lg border border-transparent hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                      type="button"
                                    >
                                      <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                      </button>
                    </div>
                                </div>
                              ) : (
                                // Display Mode
                                <div key={`saved-${index}`} className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 relative">
                                  <p className="text-gray-700 italic text-sm leading-relaxed pr-20">{review}</p>
                                  <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        // Enter edit mode for this review
                                        setEditingReviewIndex(index);
                                        updateCompanyInfo('customerReviews', [review]);
                                      }}
                                      className="group p-2 rounded-lg border border-transparent hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                    >
                                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        const updatedSavedReviews = savedCustomerReviews.filter((_, i) => i !== index);
                                        setSavedCustomerReviews(updatedSavedReviews);
                                      }}
                                      className="group p-2 rounded-lg border border-transparent hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                      type="button"
                                    >
                                      <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                                    </button>
                                  </div>
                                </div>
                              )
                            ))}

                            {/* New Reviews - Skip first item if editing a saved review */}
                            {(companyInfo.customerReviews || [])
                              .filter((_, index) => editingReviewIndex === null || index > 0)
                              .map((review, displayIndex) => {
                                // Calculate actual index in the array
                                const actualIndex = editingReviewIndex === null ? displayIndex : displayIndex + 1;
                                return (
                              <div key={actualIndex} className="review-item relative">
                                <textarea
                                  value={review || ''}
                                  onChange={(e) => {
                                    const updatedReviews = [...(companyInfo.customerReviews || [])];
                                    updatedReviews[actualIndex] = e.target.value;
                                    updateCompanyInfo('customerReviews', updatedReviews);
                                  }}
                                  rows={4}
                                  placeholder="Enter a customer review..."
                                  className="review-textarea review-textarea-md"
                                />
                                <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    type="button"
                                  onClick={() => {
                                      // Save this review
                                      if (review && review.trim() !== '') {
                                        setSavedCustomerReviews([...savedCustomerReviews, review]);
                                        // Remove from editable list
                                    const updatedReviews = (companyInfo.customerReviews || []).filter((_, i) => i !== actualIndex);
                                    updateCompanyInfo('customerReviews', updatedReviews);
                                      }
                                    }}
                                    className="group p-2 rounded-lg border border-transparent hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                  >
                                    <Check className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      const updatedReviews = (companyInfo.customerReviews || []).filter((_, i) => i !== actualIndex);
                                      updateCompanyInfo('customerReviews', updatedReviews);
                                    }}
                                    className="group p-2 rounded-lg border border-transparent hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                  type="button"
                                >
                                    <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                                </button>
                                </div>
                              </div>
                                );
                              })}
                            
                            {/* Add Review Button - Show when total reviews (saved + being added) is less than 3 */}
                            {(() => {
                              // Calculate new reviews count (exclude first item if editing a saved review)
                              const newReviewsCount = editingReviewIndex !== null && (companyInfo.customerReviews || []).length > 0 
                                ? (companyInfo.customerReviews || []).length - 1 
                                : (companyInfo.customerReviews || []).length;
                              const totalCount = savedCustomerReviews.length + newReviewsCount;
                              return totalCount < 3 && (
                                <button
                                  onClick={() => {
                                    const updatedReviews = [...(companyInfo.customerReviews || []), ''];
                                    updateCompanyInfo('customerReviews', updatedReviews);
                                  }}
                                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all border border-dashed border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                  type="button"
                                  disabled={totalCount >= 3}
                                >
                                  <Plus className="w-4 h-4" />
                                  <span className="text-sm font-medium">Add Review ({totalCount}/3)</span>
                                </button>
                              );
                            })()}
                          </div>
                        </div>
                    </div>
                </div>
                </div>
              )}
                
                    {/* Online Reviews Content */}
                    {selectedTab === 'Online Reviews' && (
                      <div>
                {/* Online Reviews */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Online Reviews</h3>
                    {(() => {
                      const { completed, total } = getOnlineReviewsCompletionLocal();
                      const isComplete = completed === total;
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
            </div>

                    <div className="section-spacing">
                      {/* Display Mode */}
                      {savedOnlineReviews && !editingOnlineReviews ? (
                        <div className="space-y-3">
                          {[
                            { key: 'google', label: 'Google' },
                            { key: 'facebook', label: 'Facebook' },
                            { key: 'nextdoor', label: 'Nextdoor' },
                            { key: 'yelp', label: 'Yelp' },
                            { key: 'homeadvisor', label: 'HomeAdvisor' }
                          ].filter(platform => {
                            const review = savedOnlineReviews[platform.key];
                            return review && (review.averageRating || review.totalReviews || review.fiveStarReviews);
                          }).map((platform) => {
                            const review = savedOnlineReviews[platform.key];
                            return (
                              <div key={platform.key} className="border border-gray-200 rounded-2xl px-5 py-4 bg-slate-50/60 relative flex items-center">
                                  <div className="flex-1 grid grid-cols-4 gap-6 items-center">
                                    <div className="font-semibold text-gray-900">
                                      {platform.label}
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">Avg Rating</label>
                                      <p className="text-sm text-gray-900">{review.averageRating || '-'}</p>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">Total Reviews</label>
                                      <p className="text-sm text-gray-900">{review.totalReviews || '-'}</p>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">5-Star Reviews</label>
                                      <p className="text-sm text-gray-900">{review.fiveStarReviews || '-'}</p>
                                    </div>
                                  </div>
                                  <div className="flex justify-end gap-2 ml-4">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingOnlineReviews(true);
                                        updateCompanyInfo('onlineReviews', savedOnlineReviews);
                                      }}
                                      className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                      aria-label="Edit online review"
                                    >
                                      <Pencil className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updatedReviews = { ...savedOnlineReviews };
                                        delete updatedReviews[platform.key];
                                        setSavedOnlineReviews(updatedReviews);
                                      }}
                                      className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                                      aria-label="Delete online review"
                                    >
                                      <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                                    </button>
                                  </div>
                                </div>
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
                                      ...(companyInfo.onlineReviews || {}),
                                      [platform.key]: {
                                        ...(companyInfo.onlineReviews?.[platform.key] || {}),
                                        averageRating: e.target.value
                                      }
                                    };
                                    updateCompanyInfo('onlineReviews', updatedReviews);
                                  }}
                                  placeholder="0.0"
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
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
                                      ...(companyInfo.onlineReviews || {}),
                                      [platform.key]: {
                                        ...(companyInfo.onlineReviews?.[platform.key] || {}),
                                        totalReviews: e.target.value
                                      }
                                    };
                                    updateCompanyInfo('onlineReviews', updatedReviews);
                                  }}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
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
                                      ...(companyInfo.onlineReviews || {}),
                                      [platform.key]: {
                                        ...(companyInfo.onlineReviews?.[platform.key] || {}),
                                        fiveStarReviews: e.target.value
                                      }
                                    };
                                    updateCompanyInfo('onlineReviews', updatedReviews);
                                  }}
                                  placeholder="0"
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
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
                          
                          {/* Forms Grid - 2x2 */}
                          <div className="grid grid-cols-2 gap-6">
                            <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-6 cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg shadow-md">
                              <FileText className="w-8 h-8 mb-3 text-blue-600 group-hover:text-blue-700 transition-colors" />
                              <span className="text-base font-medium text-gray-900 text-center leading-tight">Customize Estimate</span>
                </button>

                            <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-6 cursor-pointer transition-all hover:bg-purple-50 hover:border-purple-400 hover:shadow-lg shadow-md">
                              <FileSignature className="w-8 h-8 mb-3 text-purple-600 group-hover:text-purple-700 transition-colors" />
                              <span className="text-base font-medium text-gray-900 text-center leading-tight">Customize Contract</span>
                </button>

                            <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-6 cursor-pointer transition-all hover:bg-amber-50 hover:border-amber-400 hover:shadow-lg shadow-md">
                              <Receipt className="w-8 h-8 mb-3 text-amber-600 group-hover:text-amber-700 transition-colors" />
                              <span className="text-base font-medium text-gray-900 text-center leading-tight">Customize Invoice</span>
                            </button>

                            <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-6 cursor-pointer transition-all hover:bg-rose-50 hover:border-rose-400 hover:shadow-lg shadow-md">
                              <HeartHandshake className="w-8 h-8 mb-3 text-rose-500 group-hover:text-rose-600 transition-colors" />
                              <span className="text-base font-medium text-gray-900 text-center leading-tight">Thank You Note</span>
                </button>
              </div>
            </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>);
};

export default MyBusiness;
