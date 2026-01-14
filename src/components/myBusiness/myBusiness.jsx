import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown, Plus, X, Check, FileText, FileSignature, Receipt, HeartHandshake, Clock, Award, Shield, ShieldCheck, MapPin, Star, Search, Trash2, Pencil } from 'lucide-react';
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

  // Collapsed section states
  const [collapsedReviewsTestimonials, setCollapsedReviewsTestimonials] = useState(true);
  const [collapsedBrandIdentity, setCollapsedBrandIdentity] = useState(true);
  const [collapsedAreasServed, setCollapsedAreasServed] = useState(true);
  const [collapsedOperatingHours, setCollapsedOperatingHours] = useState(true);
  const [collapsedCertifications, setCollapsedCertifications] = useState(true);
  const [collapsedInsurance, setCollapsedInsurance] = useState(true);
  const [collapsedGuaranteeWarranty, setCollapsedGuaranteeWarranty] = useState(true);
  const [collapsedOnlineReviews, setCollapsedOnlineReviews] = useState(true);
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
    // Track 3 categories:
    // 1. Company slogan
    const hasSlogan =
      companyInfo.companySlogan && companyInfo.companySlogan.trim() !== '';

    // 2. At least one experience input (years, months, or jobsCompleted)
    const hasExperience =
      (companyInfo.experienceYears && companyInfo.experienceYears.trim() !== '') ||
      (companyInfo.experienceMonths && companyInfo.experienceMonths.trim() !== '') ||
      (companyInfo.jobsCompleted && companyInfo.jobsCompleted.trim() !== '');

    // 3. 3 company qualities selected
    const hasQualities = companyInfo.whatMakesDifferent.length >= 3;

    const completed = [hasSlogan, hasExperience, hasQualities].filter(Boolean).length;
    const total = 3;

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
    // Track 1 category: at least one certification with both name and organization
    const hasCompleteCertification = companyInfo.certificationsList.some(cert => 
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
    setSavedGuaranteeWarranty(companyInfo.guaranteeWarranty || '');
    setEditingGuaranteeWarranty(false);
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
              
              <div className="space-y-8">
                {/* Section 1: Contact Details, Areas Served, Operating Hours, Staff */}
              <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Basic Information</h3>
                {/* Contact Details */}
                <div 
                  className="collapsible-section"
                  onClick={() => setCollapsedContactDetails(!collapsedContactDetails)}
                >
                  <div className={`collapsible-header ${!collapsedContactDetails ? 'collapsible-header-expanded' : ''}`}>
                    <div className="section-icon-wrapper">
                      <Phone className="section-icon" />
                    </div>
                    <h3 className="section-title">
                      Contact Details 
                      {contactDetailsSaveAttempted && (() => {
                        const { completed, total } = getCompanyDetailsCompletion();
                        const isComplete = completed === total;
                        return !isComplete ? (
                          <span className="text-red-500 text-sm">*</span>
                        ) : null;
                      })()}
                    </h3>
                    {(() => {
                      const { completed, total } = getCompanyDetailsCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`completion-badge ${isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="collapsible-chevron-wrapper">
                      <ChevronDown 
                        className={`collapsible-chevron ${!collapsedContactDetails ? 'collapsible-chevron-expanded' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedContactDetails && (
                    <div className="section-content" onClick={(e) => e.stopPropagation()}>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
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

                      <div className="flex items-center justify-end gap-3 mt-6">
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
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Areas Served <span className="text-gray-500 text-sm">*</span></h3>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                          {areasServedSaveAttempted && companyInfo.areasServed.length === 0 && (
                            <span className="text-red-500 text-sm">*</span>
                          )}
                          Search and Add Cities
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
                      
                      <div className="flex items-center justify-end gap-3 mt-6">
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
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Operating Hours <span className="text-gray-500 text-sm">*</span></h3>
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
                      
                      {/* Save button */}
                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
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
                  )}
                </div>

                </div>

                {/* Section 2: Certifications, Insurance, Guarantee/Warranty */}
                <div className="space-y-6 pt-6 border-t-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Credentials & Protection</h3>
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
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedCertifications ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedCertifications && (
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                      {/* Saved Certifications - Always shown if they exist */}
                      {savedCertifications.length > 0 && (
                        <div className="space-y-3">
                          {savedCertifications.map((cert) => (
                            // Display format
                            <div
                              key={cert.id}
                              className="border border-gray-200 rounded-2xl px-5 py-4 bg-slate-50/60 relative flex items-center"
                            >
                              <div className="flex-1 grid grid-cols-3 gap-6 items-center">
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-1">Certification Name</label>
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
                              <div className="flex justify-end gap-2 ml-4">
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
                                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                  aria-label="Edit certification"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = savedCertifications.filter(c => c.id !== cert.id);
                                    setSavedCertifications(updated);
                                  }}
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                                  aria-label="Delete certification"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Editable Certifications - Shown when editing or when no saved certifications */}
                      {(editingCertifications || savedCertifications.length === 0) && (
                        <div className="space-y-4">
                          {companyInfo.certificationsList.length > 0 && companyInfo.certificationsList.map((cert, index) => (
                            <div key={cert.id || index} className="grid grid-cols-4 gap-4 items-end p-4 bg-slate-50/60 border border-slate-200 rounded-lg">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                              Certification Name
                              {certificationErrors[cert.id]?.missingName && (
                                <span className="text-red-500 text-sm">*</span>
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
                            <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                              Certifying Organization
                              {certificationErrors[cert.id]?.missingOrganization && (
                                <span className="text-red-500 text-sm">*</span>
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
                                <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                                  Date Received
                                  {certificationErrors[cert.id]?.missingDate && (
                                    <span className="text-red-500 text-sm">*</span>
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

                              <div className="flex justify-end gap-2 items-center">
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
                                    className="p-2.5 text-green-600 hover:text-green-700 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-lg transition-all duration-200"
                                    aria-label="Save certification"
                                  >
                                    <Check className="w-6 h-6" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const updated = companyInfo.certificationsList.filter((_, i) => i !== index);
                                      updateCompanyInfo('certificationsList', updated);
                                    }}
                                    className="p-2.5 text-red-600 hover:text-red-700 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-lg transition-all duration-200"
                                    aria-label="Delete certification"
                                  >
                                    <Trash2 className="w-6 h-6" />
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
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedInsurance ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedInsurance && (
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
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
                                  <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
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
                                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                  aria-label="Edit insurance"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = savedInsurance.filter(i => i.id !== ins.id);
                                    setSavedInsurance(updated);
                                  }}
                                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                                  aria-label="Delete insurance"
                                >
                                  <Trash2 className="w-4 h-4" />
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
                                <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                                  Company
                                  {insuranceErrors[ins.id]?.missingCompany && (
                                    <span className="text-red-500 text-sm">*</span>
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
                                <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                                  Policy Number
                                  {insuranceErrors[ins.id]?.missingPolicyNumber && (
                                    <span className="text-red-500 text-sm">*</span>
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
                                <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                                  Coverage Limits ($)
                                  {insuranceErrors[ins.id]?.missingCoverageLimits && (
                                    <span className="text-red-500 text-sm">*</span>
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
                                  className="p-2.5 text-green-600 hover:text-green-700 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-lg transition-all duration-200"
                                  aria-label="Save insurance"
                                >
                                  <Check className="w-6 h-6" />
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
                                  className="p-2.5 text-red-600 hover:text-red-700 hover:bg-gray-100 border border-transparent hover:border-gray-300 rounded-lg transition-all duration-200"
                                  aria-label="Delete insurance"
                                >
                                  <Trash2 className="w-6 h-6" />
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
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedGuaranteeWarranty ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedGuaranteeWarranty && (
                    <div className="space-y-5" onClick={(e) => e.stopPropagation()}>
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
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                title="Edit guarantee/warranty"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSavedGuaranteeWarranty('');
                                  updateCompanyInfo('guaranteeWarranty', '');
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Delete guarantee/warranty"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Edit Mode - Show textarea when section is opened
                      <div className="relative p-4 bg-slate-50 border border-slate-200 rounded-lg">
                        {(!companyInfo.guaranteeWarranty || companyInfo.guaranteeWarranty.trim() === '') && (
                          <span className="absolute top-2 left-2 text-red-500 text-sm font-medium">*</span>
                        )}
                        <div className="space-y-4">
                          <textarea
                            rows={4}
                              value={companyInfo.guaranteeWarranty || ''}
                            onChange={(e) => updateCompanyInfo('guaranteeWarranty', e.target.value)}
                            placeholder="Describe your guarantee or warranty policy..."
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm resize-y bg-white shadow-sm"
                          />
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingGuaranteeWarranty(false);
                                  // Reset to saved state if canceling
                                  if (savedGuaranteeWarranty) {
                                    updateCompanyInfo('guaranteeWarranty', savedGuaranteeWarranty);
                                  } else {
                                    updateCompanyInfo('guaranteeWarranty', '');
                                  }
                                }}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                              >
                                Cancel
                              </button>
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
                          )}
                    </div>
                  )}
                </div>
                
                
                {/* Section 3: Brand Identity, Reviews and Testimonials */}
                <div className="space-y-6 pt-6 border-t-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Brand & Reputation</h3>
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
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedBrandIdentity ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedBrandIdentity && (
                    <div className="space-y-5" onClick={(e) => e.stopPropagation()}>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company Slogan</label>
                          <input
                            type="text"
                            value={companyInfo.companySlogan || ''}
                            onChange={(e) => updateCompanyInfo('companySlogan', e.target.value)}
                            placeholder="Enter your company slogan"
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Years</label>
                              <input
                                type="number"
                                min="0"
                                value={companyInfo.experienceYears || ''}
                                onChange={(e) => updateCompanyInfo('experienceYears', e.target.value)}
                                placeholder="0"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                              />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Jobs Completed</label>
                              <input
                                type="number"
                                min="0"
                                  value={companyInfo.jobsCompleted || ''}
                                  onChange={(e) => updateCompanyInfo('jobsCompleted', e.target.value)}
                                placeholder="0"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
                              />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Satisfied Customers</label>
                              <input
                                type="number"
                                min="0"
                                  value={companyInfo.satisfiedCustomers || ''}
                                  onChange={(e) => updateCompanyInfo('satisfiedCustomers', e.target.value)}
                                placeholder="0"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm"
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
                          {(companyInfo.whatMakesDifferent || []).length > 0 && (
                            <p className="mt-3 text-xs text-slate-500">
                              Selected: {(companyInfo.whatMakesDifferent || []).length} of 3
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                
                  {/* Reviews and Testimonials */}
                <div 
                  className="bg-white border-2 border-slate-200 rounded-2xl p-5 cursor-pointer"
                  onClick={() => setCollapsedReviewsTestimonials(!collapsedReviewsTestimonials)}
                >
                  <div className={`flex items-center gap-3 ${!collapsedReviewsTestimonials ? 'mb-6' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">Reviews and Testimonials</h3>
                    <div className="flex items-center justify-center">
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${!collapsedReviewsTestimonials ? 'transform rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                  
                  {!collapsedReviewsTestimonials && (
                    <div className="section-spacing" onClick={(e) => e.stopPropagation()}>
                      {/* Customer Reviews Section */}
                      <div className="reviews-section">
                        <h5 className="reviews-title">Customer Reviews</h5>
                        <div className="section-spacing">
                            {(companyInfo.customerReviews || []).map((review, index) => (
                              <div key={index} className="review-item">
                                <textarea
                                  value={review || ''}
                                  onChange={(e) => {
                                    const updatedReviews = [...(companyInfo.customerReviews || [])];
                                    updatedReviews[index] = e.target.value;
                                    updateCompanyInfo('customerReviews', updatedReviews);
                                  }}
                                  rows={4}
                                  placeholder="Enter a customer review..."
                                  className="review-textarea review-textarea-md"
                                />
                                <button
                                  onClick={() => {
                                    const updatedReviews = (companyInfo.customerReviews || []).filter((_, i) => i !== index);
                                    updateCompanyInfo('customerReviews', updatedReviews);
                                  }}
                                  className="review-remove-button"
                                  type="button"
                                >
                                  <X className="review-remove-icon" />
                                </button>
                              </div>
                            ))}
                            
                            {(companyInfo.customerReviews || []).length < 3 && (
                              <button
                                onClick={() => {
                                  const updatedReviews = [...(companyInfo.customerReviews || []), ''];
                                  updateCompanyInfo('customerReviews', updatedReviews);
                                }}
                                className="add-review-button"
                                type="button"
                              >
                                <Plus className="add-review-icon" />
                                Add Review {(companyInfo.customerReviews || []).length > 0 ? `(${(companyInfo.customerReviews || []).length}/3)` : '(0/3)'}
                              </button>
                            )}
                          </div>
                        </div>
                      
                      {/* Online Reviews Section */}
                      <div className="reviews-section mt-6 pt-6 border-t border-slate-200">
                        <h5 className="reviews-title">Online Reviews</h5>
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
                                      ...(companyInfo.onlineReviews || {}),
                                      [platform.key]: {
                                        ...(companyInfo.onlineReviews?.[platform.key] || {}),
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
                                      ...(companyInfo.onlineReviews || {}),
                                      [platform.key]: {
                                        ...(companyInfo.onlineReviews?.[platform.key] || {}),
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
                      </div>
                    </div>
                  )}
                </div>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Services Offered</h2>
                {selectedServices.length === 0 && (
                  <span className="text-sm text-red-600 font-medium">
                    * At least one service required
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
                <div className="mt-4">
                  {/* Service cards with chemicals and PSI */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[450px] overflow-y-auto pr-2">
                    {selectedServices.map((service) => {
                      const serviceChemList = serviceChemicals[service] || [];
                      return (
                        <div
                          key={service}
                          className="border rounded-lg p-4 bg-slate-50 border-gray-300 shadow-sm relative"
                        >
                          {/* Trash icon in upper right corner */}
                          <button
                            type="button"
                            onClick={() => toggleService(service)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Remove service"
                          >
                            <Trash2 className="w-4 h-4" />
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
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
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
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
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
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
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
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          />
                        </div>

                        {/* Safety & Prevention Section */}
                        <div className="pt-2 border-t border-slate-200">
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
                              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden safety-dropdown-container">
                                <div className="overflow-y-auto max-h-56">
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
                                    
                                    return (
                                      <>
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
                                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
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
                          {serviceSafetyMeasures[service] && serviceSafetyMeasures[service].length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {serviceSafetyMeasures[service].map((measure) => (
                                <span
                                  key={measure}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200"
                                >
                                  {measure}
                                  <button
                                    type="button"
                                    onClick={() => toggleServiceSafetyMeasure(service, measure)}
                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
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

                <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-purple-50 hover:border-purple-400 hover:shadow-lg max-w-[182px] mx-auto shadow-md">
                  <FileSignature className="w-6 h-6 mb-2 text-purple-600 group-hover:text-purple-700 transition-colors" />
                  <span className="text-sm font-medium text-gray-900 text-center leading-tight">Customize Contract</span>
                </button>

                <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-amber-50 hover:border-amber-400 hover:shadow-lg max-w-[182px] mx-auto shadow-md">
                  <Receipt className="w-6 h-6 mb-2 text-amber-600 group-hover:text-amber-700 transition-colors" />
                  <span className="text-sm font-medium text-gray-900 text-center leading-tight">Customize Invoice</span>
                </button>

                <button className="group relative flex flex-col items-center justify-center aspect-[3/4] bg-white border-2 border-slate-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-rose-50 hover:border-rose-400 hover:shadow-lg max-w-[182px] mx-auto shadow-md">
                  <HeartHandshake className="w-6 h-6 mb-2 text-rose-500 group-hover:text-rose-600 transition-colors" />
                  <span className="text-sm font-medium text-gray-900 text-center leading-tight">Thank You Note</span>
                </button>
              </div>
            </div>
          </div>);
};

export default MyBusiness;