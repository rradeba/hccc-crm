import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, X, Wrench, ArrowRight, Percent, ShoppingCart, Gift, DollarSign, Bot, Send, FileText, FileSignature, Receipt, HeartHandshake, Phone, Star, MapPin, Clock, Award, Shield, ShieldCheck, Search, Pencil } from 'lucide-react';
import './pricingTool.css';

const PricingTool = ({
  pricingFormats,
  setPricingFormats,
  openPricingDropdown,
  setOpenPricingDropdown,
  openPricingStructureDropdown,
  setOpenPricingStructureDropdown,
  pricingStructureOptions,
  customPricingStructureOptions,
  setCustomPricingStructureOptions,
  softWashingServices,
  customSoftWashingServices,
  pressureWashingServices,
  customPressureWashingServices,
  specialtyCleaningServices,
  customSpecialtyCleaningServices,
  unitOptions,
  promotions: promotionsProp,
  setPromotions: setPromotionsProp,
}) => {
  // State for custom input values
  const [customInputValues, setCustomInputValues] = useState({
    rates: '',
    expenses: '',
    multipliers: '',
    fees: ''
  });
  // State for custom perUnit options
  const [customPerUnitOptions, setCustomPerUnitOptions] = useState([]);
  const [customPerUnitInput, setCustomPerUnitInput] = useState('');
  // Additional state variables needed by the component
  const [showPaverSealing] = useState(false);
  const windowCleaningServices = [];
  const customWindowCleaningServices = [];
  
  // Use prop if provided, otherwise use local state
  const [promotionsLocal, setPromotionsLocal] = useState([]);
  const promotions = promotionsProp !== undefined ? promotionsProp : promotionsLocal;
  const setPromotions = setPromotionsProp !== undefined ? setPromotionsProp : setPromotionsLocal;
  
  // State for saved promotions (separate from active promotions being edited)
  const [savedPromotions, setSavedPromotions] = useState([]);
  const [promotionErrors, setPromotionErrors] = useState({}); // Track validation errors by promotion ID
  const [priceErrors, setPriceErrors] = useState({}); // Track validation errors by price format ID
  const [expiredPromotions, setExpiredPromotions] = useState([
    // Sample expired promotions
    {
      id: 'expired-1',
      title: 'Summer Sale',
      promotionType: 'percentOff',
      percentOff: '20',
      percentOffServices: ['House Washing', 'Driveway Cleaning'],
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      isIndefinite: false,
      savedAt: '2024-06-01T00:00:00.000Z'
    },
    {
      id: 'expired-2',
      title: 'Holiday Package Deal',
      promotionType: 'package',
      packageServices: ['Gutter Cleaning', 'Window Cleaning', 'Pressure Washing'],
      packagePrice: '299.99',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      isIndefinite: false,
      savedAt: '2024-11-01T00:00:00.000Z'
    },
    {
      id: 'expired-3',
      title: 'Buy One Get One',
      promotionType: 'buyGet',
      packageFormula: {
        initialServices: ['House Washing'],
        additionalServices: [
          { service: 'Driveway Cleaning', percentOff: 50 }
        ]
      },
      startDate: '2024-09-01',
      endDate: '2024-10-31',
      isIndefinite: false,
      savedAt: '2024-09-01T00:00:00.000Z'
    }
  ]);
  const [editingPromotionId, setEditingPromotionId] = useState(null);
  
  // State for saved prices (separate from active prices being edited)
  const [activePrices, setActivePrices] = useState([]);
  const [editingPriceId, setEditingPriceId] = useState(null);
  
  const [openPercentDropdown, setOpenPercentDropdown] = useState(null);
  const [openPackageFormulaDropdown, setOpenPackageFormulaDropdown] = useState(null);
  const [openPerUnitDropdown, setOpenPerUnitDropdown] = useState({});
  
  // Get all services that are already used in saved prices
  const getUsedServices = () => {
    const usedServices = new Set();
    // Get IDs of prices currently being edited (have savedAt property, indicating they came from activePrices)
    const editingIds = new Set(pricingFormats
      .filter(f => f.savedAt) // Items with savedAt are being edited
      .map(f => f.id)
    );
    
    activePrices.forEach(price => {
      // Exclude services from prices that are currently being edited
      if (!editingIds.has(price.id) && price.services && Array.isArray(price.services)) {
        price.services.forEach(service => usedServices.add(service));
      }
    });
    return usedServices;
  };
  
  // Check for expired promotions and move them to expired section
  useEffect(() => {
    const checkExpiredPromotions = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      setSavedPromotions((prev) => {
        const active = [];
        const expired = [];
        
        prev.forEach((promotion) => {
          // Skip if indefinite or no end date
          if (promotion.isIndefinite || !promotion.endDate) {
            active.push(promotion);
            return;
          }
          
          const endDate = new Date(promotion.endDate);
          endDate.setHours(0, 0, 0, 0);
          
          // If end date is before today, it's expired
          if (endDate < today) {
            expired.push(promotion);
          } else {
            active.push(promotion);
          }
        });
        
        // Update expired promotions
        if (expired.length > 0) {
          setExpiredPromotions((prevExpired) => {
            // Merge with existing expired, avoiding duplicates
            const existingIds = new Set(prevExpired.map(p => p.id));
            const newExpired = expired.filter(p => !existingIds.has(p.id));
            return [...prevExpired, ...newExpired];
          });
        }
        
        return active;
      });
    };
    
    // Check immediately and then daily
    checkExpiredPromotions();
    const interval = setInterval(checkExpiredPromotions, 24 * 60 * 60 * 1000); // Check daily
    
    return () => clearInterval(interval);
  }, []);

  // Ensure there's always at least one blank promotion
  useEffect(() => {
    if (promotions.length === 0) {
      setPromotions([{
        id: Date.now(),
        title: '',
        services: [],
        promotionType: '',
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
        isIndefinite: false,
      }]);
    }
  }, [promotions.length, setPromotions]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close pricing structure dropdowns when clicking outside
      if (Object.keys(openPricingStructureDropdown || {}).length > 0) {
        const clickedInside = event.target.closest('.pricing-structure-dropdown-container');
        if (!clickedInside) {
          setOpenPricingStructureDropdown({});
        }
      }
      // Close service dropdown when clicking outside
      if (openPricingDropdown !== null) {
        const clickedInside = event.target.closest('.add-service-button-container') || 
                              event.target.closest('.pricing-dropdown');
        if (!clickedInside) {
          setOpenPricingDropdown(null);
        }
      }
      // Close promotion dropdowns when clicking outside
      if (openPackageFormulaDropdown !== null) {
        const clickedInside = event.target.closest('[data-promotion-dropdown]');
        if (!clickedInside) {
          setOpenPackageFormulaDropdown(null);
        }
      }
      if (openPercentDropdown !== null) {
        const clickedInside = event.target.closest('[data-percent-dropdown]');
        if (!clickedInside) {
          setOpenPercentDropdown(null);
        }
      }
      // Close perUnit dropdowns when clicking outside
      if (Object.keys(openPerUnitDropdown || {}).length > 0) {
        const clickedInside = event.target.closest('.pricing-structure-dropdown-container');
        if (!clickedInside) {
          setOpenPerUnitDropdown({});
        }
      }
    };

    if (Object.keys(openPricingStructureDropdown || {}).length > 0 || openPricingDropdown !== null || openPackageFormulaDropdown !== null || openPercentDropdown !== null || Object.keys(openPerUnitDropdown || {}).length > 0) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openPricingStructureDropdown, setOpenPricingStructureDropdown, openPricingDropdown, setOpenPricingDropdown, openPackageFormulaDropdown, openPercentDropdown, openPerUnitDropdown]);

  // Stub variables for sections that shouldn't be in PricingTool but are referenced
  // These are defined here to prevent compilation errors, but the code using them should be removed
  const activeTab = 'pricingTool';
  const customers = [];
  const leads = [];
  const stats = { totalRevenue: 0 };
  const campaignPlatforms = [];
  const smartChatMessages = [];
  const [smartChatInput, setSmartChatInput] = useState('');
  const smartChatIsTyping = false;
  const smartChatPrompts = [];
  const handleSmartChatSend = () => {};
  const [collapsedContactDetails, setCollapsedContactDetails] = useState(true);
  const getContactDetailsCompletion = () => ({ completed: 0, total: 0 });
  const getBrandIdentityCompletion = () => ({ completed: 0, total: 0 });
  const getAreasServedCompletion = () => ({ completed: 0, total: 0 });
  const getOperatingHoursCompletion = () => ({ completed: 0, total: 0 });
  const getCertificationsCompletion = () => ({ completed: 0, total: 0 });
  const getInsuranceCompletion = () => ({ completed: 0, total: 0 });
  const getGuaranteeWarrantyCompletion = () => ({ completed: 0, total: 0 });
  const getOnlineReviewsCompletion = () => ({ completed: 0, total: 0 });
  const companyInfo = {};
  const updateCompanyInfo = () => {};
  const [collapsedBrandIdentity, setCollapsedBrandIdentity] = useState(true);
  const companyQualities = [];
  const customCompanyQualities = [];
  const toggleCompanyQuality = () => {};
  const [newCompanyQuality, setNewCompanyQuality] = useState('');
  const addCustomCompanyQuality = () => {};
  const [collapsedAreasServed, setCollapsedAreasServed] = useState(true);
  const [citySearchTerm] = useState('');
  const handleCitySearchChange = () => {};
  const [citySearchResults] = useState([]);
  const setIsCitySearchOpen = () => {};
  const isLoadingCities = false;
  const isCitySearchOpen = false;
  const selectCity = () => {};
  const citySearchError = null;
  const removeArea = () => {};
  const [collapsedOperatingHours, setCollapsedOperatingHours] = useState(true);
  const [collapsedCertifications, setCollapsedCertifications] = useState(true);
  const [collapsedInsurance, setCollapsedInsurance] = useState(true);
  const [collapsedGuaranteeWarranty, setCollapsedGuaranteeWarranty] = useState(true);
  const [collapsedOnlineReviews, setCollapsedOnlineReviews] = useState(true);
  const handleSaveCompanyInfo = () => {};
  const [showSoftWashing, setShowSoftWashing] = useState(false);
  const [collapsedSoftWashing, setCollapsedSoftWashing] = useState(true);
  const [selectedSoftWashing, setSelectedSoftWashing] = useState([]);
  const [serviceChemicals, setServiceChemicals] = useState({});
  const toggleService = () => {};
  const updateChemicalConcentration = () => {};
  const removeChemicalFromService = () => {};
  const [chemicalDropdownOpen, setChemicalDropdownOpen] = useState({});
  const [chemicalSearchTerm, setChemicalSearchTerm] = useState({});
  const allChemicals = [];
  const customChemicals = [];
  const addChemicalToService = () => {};
  const addCustomChemical = () => {};
  const [servicePSI, setServicePSI] = useState({});
  const updateServicePSI = () => {};
  const [surfacesDropdownOpen, setSurfacesDropdownOpen] = useState({});
  const [serviceSurfaces, setServiceSurfaces] = useState({});
  const softWashingSurfaces = [];
  const customSoftWashingSurfaces = [];
  const addSurfaceToService = () => {};
  const removeSurfaceFromService = () => {};
  const [newSoftWashingService, setNewSoftWashingService] = useState('');
  const addCustomSoftWashingService = () => {};
  const [showPressureWashing, setShowPressureWashing] = useState(false);
  const [collapsedPressureWashing, setCollapsedPressureWashing] = useState(true);
  const [selectedPressureWashing, setSelectedPressureWashing] = useState([]);
  const [newPressureWashingService, setNewPressureWashingService] = useState('');
  const addCustomPressureWashingService = () => {};
  const [showSpecialtyCleaning, setShowSpecialtyCleaning] = useState(false);
  const [collapsedSpecialtyCleaning, setCollapsedSpecialtyCleaning] = useState(true);
  const [selectedSpecialtyCleaning, setSelectedSpecialtyCleaning] = useState([]);
  const specialtyCleaningSurfaces = [];
  const [newSpecialtyCleaningService, setNewSpecialtyCleaningService] = useState('');
  const addCustomSpecialtyCleaningService = () => {};
  const [showWindowCleaning, setShowWindowCleaning] = useState(false);
  const [collapsedWindowCleaning, setCollapsedWindowCleaning] = useState(true);
  const [selectedWindowCleaning, setSelectedWindowCleaning] = useState([]);
  const windowCleaningChemicals = [];
  const addChemicalToService2 = () => {};
  const [newWindowCleaningService, setNewWindowCleaningService] = useState('');
  const addCustomWindowCleaningService = () => {};
  const [safetyMeasuresDropdownOpen, setSafetyMeasuresDropdownOpen] = useState(false);
  const [allSafetyMeasures, setAllSafetyMeasures] = useState([]);
  
  // Safety measures arrays
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

  const [customSoftWashingSafetyMeasures, setCustomSoftWashingSafetyMeasures] = useState([]);
  const [customPressureWashingSafetyMeasures, setCustomPressureWashingSafetyMeasures] = useState([]);
  const [customSpecialtyCleaningSafetyMeasures, setCustomSpecialtyCleaningSafetyMeasures] = useState([]);
  const [customWindowCleaningSafetyMeasures, setCustomWindowCleaningSafetyMeasures] = useState([]);
  const [customAllSafetyMeasures, setCustomAllSafetyMeasures] = useState([]);
  const [newAllSafetyMeasure, setNewAllSafetyMeasure] = useState('');

  const toggleAllSafetyMeasure = (measure) => {
    if (allSafetyMeasures.includes(measure)) {
      setAllSafetyMeasures((prev) => prev.filter((m) => m !== measure));
    } else {
      setAllSafetyMeasures((prev) => [...prev, measure]);
    }
  };

  const addCustomAllSafetyMeasure = () => {
    if (newAllSafetyMeasure.trim()) {
      // Combine all base safety measures
      const allBaseMeasures = [
        ...safetyMeasures,
        ...pressureWashingSafetyMeasures,
        ...specialtyCleaningSafetyMeasures,
        ...windowCleaningSafetyMeasures
      ];
      // Combine all custom safety measures
      const allCustomMeasures = [
        ...customSoftWashingSafetyMeasures,
        ...customPressureWashingSafetyMeasures,
        ...customSpecialtyCleaningSafetyMeasures,
        ...customWindowCleaningSafetyMeasures,
        ...customAllSafetyMeasures
      ];
      
      if (!allBaseMeasures.includes(newAllSafetyMeasure.trim()) && !allCustomMeasures.includes(newAllSafetyMeasure.trim())) {
        setCustomAllSafetyMeasures([...customAllSafetyMeasures, newAllSafetyMeasure.trim()]);
        setNewAllSafetyMeasure('');
      }
    }
  };
  const handleSaveServicesOffered = () => {};

  // NOTE: The sections below (analytics, smartChat, business) contain leftover code
  // that shouldn't be in PricingTool. Variables are stubbed to prevent compilation errors.

  return (
    <div className="pricing-tool-container">
      {/* Header */}
            <div className="pricing-tool-header">
              <div>
                <h2 className="pricing-tool-title">Pricing Tool</h2>
              </div>
            </div>

            {/* Pricing Format Section */}
            <div className="pricing-format-section">
              {/* Add Price Subsection */}
              <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Price</h3>
              <div className="section-spacing">
                  {pricingFormats.map((format) => {
                    const usedServices = getUsedServices();
                    const isBlank = (!format.services || format.services.length === 0) && 
                      (!format.pricingStructure?.rates || format.pricingStructure.rates.length === 0) &&
                      (!format.pricingStructure?.expenses || format.pricingStructure.expenses.length === 0) &&
                      (!format.pricingStructure?.multipliers || format.pricingStructure.multipliers.length === 0) &&
                      (!format.pricingStructure?.fees || format.pricingStructure.fees.length === 0);
                    
                    return (
                    <div
                      key={format.id}
                      className="format-row"
                    >
                      {/* Service Header with Plus Button */}
                        <div className="service-header">
                        <div className="service-tags-container">
                          {format.services && format.services.length > 0 && (
                            <>
                            {format.services.map((service) => (
                              <span
                                key={service}
                                  className="service-tag"
                              >
                                {service}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPricingFormats((prev) =>
                                      prev.map((row) =>
                                        row.id === format.id
                                          ? { ...row, services: (row.services || []).filter(s => s !== service) }
                                          : row
                                      )
                                    );
                                  }}
                                  className="service-tag-delete"
                                  aria-label={`Remove ${service}`}
                                >
                                  <X className="service-tag-delete-icon" />
                                </button>
                              </span>
                            ))}
                            </>
                          )}
                          <div className="add-service-button-container">
                            <button
                              type="button"
                              onClick={() => setOpenPricingDropdown(openPricingDropdown === format.id ? null : format.id)}
                              className="add-service-button"
                            >
                              <Plus className="add-service-icon" />
                            </button>
                            {(!format.services || format.services.length === 0) && (
                              <span className="add-service-placeholder">Add Services</span>
                            )}
                          </div>
                        </div>
                        {/* Caret to expand/collapse Pricing Components and Formula - Far Right */}
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
                          className="text-gray-600 hover:text-gray-800 flex-shrink-0 ml-auto"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform ${format.isPricingPanelsCollapsed ? '' : 'rotate-180'}`} />
                        </button>
                        </div>
                            {openPricingDropdown === format.id && (
                                <div className="pricing-dropdown pricing-dropdown-container">
                                <div className="dropdown-content">
                                  {/* Soft Washing Group */}
                                  <div className="service-group">
                                    <div className="service-group-header">
                                      Soft Washing
                                    </div>
                                    <div className="service-list">
                                      {[...softWashingServices, ...customSoftWashingServices]
                                        .filter(service => {
                                          // Allow if already in current format, or if not used in saved prices
                                          const isInCurrentFormat = format.services && format.services.includes(service);
                                          const isUsedInSaved = usedServices.has(service);
                                          return isInCurrentFormat || !isUsedInSaved;
                                        })
                                        .map((service) => (
                                        <label
                                          key={service}
                                          className="service-item-label"
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
                                                  row.id === format.id 
                                                    ? { 
                                                        ...row, 
                                                        services: newServices,
                                                        // Expand when a service is added
                                                        isPricingPanelsCollapsed: newServices.length > 0 ? false : row.isPricingPanelsCollapsed
                                                      } 
                                                    : row
                                                )
                                              );
                                            }}
                                            className="service-checkbox"
                                            onClick={(e) => e.stopPropagation()}
                                            disabled={!format.services?.includes(service) && usedServices.has(service)}
                                          />
                                          <span className={`service-label-text ${!format.services?.includes(service) && usedServices.has(service) ? 'opacity-50' : ''}`}>
                                            {service}
                                            {!format.services?.includes(service) && usedServices.has(service) && (
                                              <span className="text-xs text-gray-400 ml-1">(already used)</span>
                                            )}
                                          </span>
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
                                      {[...pressureWashingServices, ...customPressureWashingServices]
                                        .filter(service => {
                                          const isInCurrentFormat = format.services && format.services.includes(service);
                                          const isUsedInSaved = usedServices.has(service);
                                          return isInCurrentFormat || !isUsedInSaved;
                                        })
                                        .map((service) => (
                                        <label
                                          key={service}
                                          className={`flex items-center px-3 py-2 hover:bg-slate-50 ${!format.services?.includes(service) && usedServices.has(service) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
                                                  row.id === format.id 
                                                    ? { 
                                                        ...row, 
                                                        services: newServices,
                                                        // Expand when a service is added
                                                        isPricingPanelsCollapsed: newServices.length > 0 ? false : row.isPricingPanelsCollapsed
                                                      } 
                                                    : row
                                                )
                                              );
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                            disabled={!format.services?.includes(service) && usedServices.has(service)}
                                          />
                                          <span className={`ml-2 text-sm ${!format.services?.includes(service) && usedServices.has(service) ? 'text-gray-400' : 'text-gray-700'}`}>
                                            {service}
                                            {!format.services?.includes(service) && usedServices.has(service) && (
                                              <span className="text-xs text-gray-400 ml-1">(already used)</span>
                                            )}
                                          </span>
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
                                      {[...specialtyCleaningServices, ...customSpecialtyCleaningServices]
                                        .filter(service => {
                                          const isInCurrentFormat = format.services && format.services.includes(service);
                                          const isUsedInSaved = usedServices.has(service);
                                          return isInCurrentFormat || !isUsedInSaved;
                                        })
                                        .map((service) => (
                                        <label
                                          key={service}
                                          className={`flex items-center px-3 py-2 hover:bg-slate-50 ${!format.services?.includes(service) && usedServices.has(service) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
                                                  row.id === format.id 
                                                    ? { 
                                                        ...row, 
                                                        services: newServices,
                                                        // Expand when a service is added
                                                        isPricingPanelsCollapsed: newServices.length > 0 ? false : row.isPricingPanelsCollapsed
                                                      } 
                                                    : row
                                                )
                                              );
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                            disabled={!format.services?.includes(service) && usedServices.has(service)}
                                          />
                                          <span className={`ml-2 text-sm ${!format.services?.includes(service) && usedServices.has(service) ? 'text-gray-400' : 'text-gray-700'}`}>
                                            {service}
                                            {!format.services?.includes(service) && usedServices.has(service) && (
                                              <span className="text-xs text-gray-400 ml-1">(already used)</span>
                                            )}
                                          </span>
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
                                      {[...windowCleaningServices, ...customWindowCleaningServices]
                                        .filter(service => {
                                          const isInCurrentFormat = format.services && format.services.includes(service);
                                          const isUsedInSaved = usedServices.has(service);
                                          return isInCurrentFormat || !isUsedInSaved;
                                        })
                                        .map((service) => (
                                        <label
                                          key={service}
                                          className={`flex items-center px-3 py-2 hover:bg-slate-50 ${!format.services?.includes(service) && usedServices.has(service) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
                                                  row.id === format.id 
                                                    ? { 
                                                        ...row, 
                                                        services: newServices,
                                                        // Expand when a service is added
                                                        isPricingPanelsCollapsed: newServices.length > 0 ? false : row.isPricingPanelsCollapsed
                                                      } 
                                                    : row
                                                )
                                              );
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                            disabled={!format.services?.includes(service) && usedServices.has(service)}
                                          />
                                          <span className={`ml-2 text-sm ${!format.services?.includes(service) && usedServices.has(service) ? 'text-gray-400' : 'text-gray-700'}`}>
                                            {service}
                                            {!format.services?.includes(service) && usedServices.has(service) && (
                                              <span className="text-xs text-gray-400 ml-1">(already used)</span>
                                            )}
                                          </span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                  
                                  {/* Paver Sealing Group */}
                                  {showPaverSealing && (() => {
                                    const isInCurrentFormat = format.services && format.services.includes('Paver Sealing');
                                    const isUsedInSaved = usedServices.has('Paver Sealing');
                                    const canUse = isInCurrentFormat || !isUsedInSaved;
                                    
                                    return canUse ? (
                                    <div>
                                      <div className="px-3 py-2 bg-slate-100 text-sm font-semibold text-gray-700 sticky top-0">
                                        Paver Sealing
                                      </div>
                                      <div className="space-y-1">
                                          <label className={`flex items-center px-3 py-2 hover:bg-slate-50 ${!isInCurrentFormat && isUsedInSaved ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                                          <input
                                            type="checkbox"
                                              checked={isInCurrentFormat}
                                            onChange={(e) => {
                                              const currentServices = format.services || [];
                                              const newServices = e.target.checked
                                                ? [...currentServices, 'Paver Sealing']
                                                : currentServices.filter(s => s !== 'Paver Sealing');
                                              setPricingFormats((prev) =>
                                                prev.map((row) =>
                                                    row.id === format.id 
                                                      ? { 
                                                          ...row, 
                                                          services: newServices,
                                                          // Expand when a service is added
                                                          isPricingPanelsCollapsed: newServices.length > 0 ? false : row.isPricingPanelsCollapsed
                                                        } 
                                                      : row
                                                )
                                              );
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            onClick={(e) => e.stopPropagation()}
                                              disabled={!isInCurrentFormat && isUsedInSaved}
                                            />
                                            <span className={`ml-2 text-sm ${!isInCurrentFormat && isUsedInSaved ? 'text-gray-400' : 'text-gray-700'}`}>
                                              Paver Sealing
                                              {!isInCurrentFormat && isUsedInSaved && (
                                                <span className="text-xs text-gray-400 ml-1">(already used)</span>
                                              )}
                                            </span>
                                        </label>
                                      </div>
                                    </div>
                                    ) : null;
                                  })()}
                                </div>
                              </div>
                            )}
                      
                      {/* Pricing Structure Diagram */}
                      {!format.isPricingPanelsCollapsed && (
                      <div>
                        {/* Divider above Pricing Components */}
                        <div className="pricing-formula-divider" style={{ marginTop: '0.25rem', marginBottom: '0.5rem' }}></div>
                        
                        {/* Pricing Components Title */}
                        <div className="flex items-center justify-between py-1">
                          <h4 className="text-sm font-semibold text-gray-700">Pricing Components</h4>
                          </div>
                        
                        <div className="space-y-6">
                          
                          {/* Four Sections in Two Rows - Collapsible */}
                          {(
                            <>
                          {/* Four Columns Side by Side - Responsive: 2x2 grid on small screens */}
                          <div className="relative pricing-structure-container">
                            {/* All Four Sections: Rates, Expenses, Fees, Multipliers */}
                            {['rates', 'expenses', 'fees', 'multipliers'].map((sectionType, sectionIndex) => {
                              const sectionLabel = sectionType.charAt(0).toUpperCase() + sectionType.slice(1);
                              const baseOptions = pricingStructureOptions[sectionType] || [];
                              const customOptions = customPricingStructureOptions?.[sectionType] || [];
                              const sectionOptions = [...baseOptions, ...customOptions].sort();
                              const selectedItems = format.pricingStructure?.[sectionType] || [];
                              const dropdownKey = `${format.id}-${sectionType}`;
                              const isDropdownOpen = openPricingStructureDropdown?.[dropdownKey] || false;
                              
                              return (
                                <React.Fragment key={sectionType}>
                                  {/* Plus Sign Between Columns - Hidden on small screens */}
                                  {sectionIndex > 0 && (
                                    <div className="flex items-center justify-center flex-shrink-0 pricing-plus-sign">
                                      <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                                        <Plus className="w-3 h-3 text-gray-600" />
                                      </div>
                                    </div>
                                  )}
                                  <div className="relative flex-1 min-w-0 border-2 border-gray-300 rounded-2xl px-4 py-3 bg-slate-50/60 flex flex-col" style={{ minHeight: '280px' }}>
                                    {/* Section Label */}
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex-shrink-0">{sectionLabel}</label>
                                    
                                    {/* Section Dropdown */}
                                    <div className="relative mb-2 pricing-structure-dropdown-container flex-shrink-0">
                                        <button
                                          type="button"
                                          onClick={() => setOpenPricingStructureDropdown(prev => ({
                                            ...prev,
                                            [dropdownKey]: !prev[dropdownKey]
                                          }))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                                      >
                                        <span className="text-gray-500">
                                          Select...
                                          </span>
                                          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                                        </button>
                                      {isDropdownOpen && (
                                        <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto pricing-structure-dropdown-container">
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
                                                  className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer group"
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
                                                  <span className="ml-2 text-sm text-gray-700 flex-1">{option}</span>
                                                  {customOptions.includes(option) && (
                                                    <button
                                                      type="button"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        // Remove from custom options
                                                        setCustomPricingStructureOptions(prev => ({
                                                          ...prev,
                                                          [sectionType]: (prev[sectionType] || []).filter(opt => opt !== option)
                                                        }));
                                                        // Also remove from selected items if it's selected
                                                        const currentItems = format.pricingStructure?.[sectionType] || [];
                                                        const newItems = needsValue
                                                          ? currentItems.filter(item => (typeof item === 'object' ? item.option : item) !== option)
                                                          : currentItems.filter(item => item !== option);
                                                        if (newItems.length !== currentItems.length) {
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
                                                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                                                      aria-label="Delete custom item"
                                                    >
                                                      <X className="w-3.5 h-3.5" />
                                                    </button>
                                                  )}
                                                </label>
                                              );
                                            })}
                                            {/* Add Custom Item Input */}
                                            <div className="border-t border-gray-200 mt-2 pt-2 px-2">
                                              <div className="flex items-center gap-2">
                                                <input
                                                  type="text"
                                                  value={customInputValues[sectionType] || ''}
                                                  onChange={(e) => {
                                                    setCustomInputValues(prev => ({
                                                      ...prev,
                                                      [sectionType]: e.target.value
                                                    }));
                                                  }}
                                                  onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                      e.preventDefault();
                                                      const customValue = customInputValues[sectionType]?.trim();
                                                      if (customValue && !sectionOptions.includes(customValue)) {
                                                        setCustomPricingStructureOptions(prev => ({
                                                          ...prev,
                                                          [sectionType]: [...(prev[sectionType] || []), customValue]
                                                        }));
                                                        setCustomInputValues(prev => ({
                                                          ...prev,
                                                          [sectionType]: ''
                                                        }));
                                                      }
                                                    }
                                                  }}
                                                  placeholder={`Add custom ${sectionLabel.toLowerCase()}...`}
                                                  className="flex-1 max-w-[100px] px-2 py-1.5 border border-gray-300 rounded text-xs"
                                                  onClick={(e) => e.stopPropagation()}
                                                />
                                                <button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    const customValue = customInputValues[sectionType]?.trim();
                                                    if (customValue && !sectionOptions.includes(customValue)) {
                                                      setCustomPricingStructureOptions(prev => ({
                                                        ...prev,
                                                        [sectionType]: [...(prev[sectionType] || []), customValue]
                                                      }));
                                                      setCustomInputValues(prev => ({
                                                        ...prev,
                                                        [sectionType]: ''
                                                      }));
                                                    }
                                                  }}
                                                  className="px-2 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex-shrink-0"
                                                  disabled={!customInputValues[sectionType]?.trim()}
                                                >
                                                  <Plus className="w-3 h-3" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Selected Items Panel */}
                                    <div className="flex-shrink-0 selected-items-panel" style={{ height: '200px', maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' }}>
                                      {selectedItems.length > 0 ? (
                                        <div className="space-y-1.5">
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
                                                className="flex flex-col gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-slate-200 min-w-0 w-full overflow-hidden selected-item-row"
                                                style={{ maxWidth: '100%', boxSizing: 'border-box' }}
                                              >
                                                {/* Title and trashcan at top */}
                                                <div className="flex items-start justify-between w-full gap-2">
                                                  <div className="text-xs font-medium break-words selected-item-title flex-1" style={{ wordBreak: 'break-word', lineHeight: '1.2' }}>{itemOption}</div>
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
                                                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors shrink-0"
                                                    aria-label="Remove item"
                                                    style={{ width: '24px', minWidth: '24px', padding: '3px' }}
                                                  >
                                                    <Trash2 className="w-4 h-4" />
                                                  </button>
                                                </div>
                                                
                                                {/* Pricing inputs section */}
                                                <div className="flex flex-col gap-2 w-full">
                                                {sectionType === 'rates' && (
                                                    <div className="flex items-center gap-1 w-full">
                                                      <span className="text-xs text-blue-600 shrink-0 w-3">$</span>
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
                                                        className="flex-1 min-w-0 px-2 py-1 border border-blue-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-700"
                                                      placeholder="0.00"
                                                        style={{ maxWidth: '100%', width: '100%', boxSizing: 'border-box' }}
                            />
                          </div>
                                                )}
                                                {sectionType === 'multipliers' && (
                                                    <div className="flex items-center gap-1 w-full relative">
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
                                                      className="flex-1 min-w-0 w-full px-2 pr-6 py-1 border border-blue-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-700"
                                                      placeholder="0"
                                                      style={{ maxWidth: '100%', width: '100%' }}
                                                    />
                                                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-600 pointer-events-none">%</span>
                                                  </div>
                                                )}
                                                {sectionType === 'expenses' && (
                                                    <>
                                                      <div className="flex items-center gap-1 w-full">
                                                        <span className="text-xs text-blue-600 shrink-0 w-3">$</span>
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
                                                          className="flex-1 min-w-0 px-2 py-1 border border-blue-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-700"
                                                      placeholder="0.00"
                                                          style={{ maxWidth: '100%', width: '100%', boxSizing: 'border-box' }}
                                                        />
                                                      </div>
                                                      <div className="flex items-center gap-1 w-full">
                                                        <span className="text-xs text-blue-600 shrink-0" style={{ minWidth: '28px', width: '28px' }}>Per</span>
                                                        <div className="relative flex-1 min-w-0 pricing-structure-dropdown-container">
                                                          <button
                                                            type="button"
                                                            onClick={() => {
                                                              const perUnitDropdownKey = `${format.id}-expenses-${index}-perUnit`;
                                                              setOpenPerUnitDropdown(prev => ({
                                                                ...prev,
                                                                [perUnitDropdownKey]: !prev[perUnitDropdownKey]
                                                              }));
                                                            }}
                                                            className="flex-1 min-w-0 px-2 py-1 border border-blue-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-700 flex items-center justify-between w-full"
                                                            style={{ maxWidth: '100%', boxSizing: 'border-box' }}
                                                          >
                                                            <span className="truncate">{itemPerUnit || 'Select...'}</span>
                                                            <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform flex-shrink-0 ${openPerUnitDropdown[`${format.id}-expenses-${index}-perUnit`] ? 'transform rotate-180' : ''}`} />
                                                          </button>
                                                          {openPerUnitDropdown[`${format.id}-expenses-${index}-perUnit`] && (
                                                            <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto pricing-structure-dropdown-container">
                                                              <div className="p-2 space-y-1">
                                                                {[...unitOptions, ...customPerUnitOptions].map((unit) => (
                                                                  <button
                                                                    key={unit}
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                      e.stopPropagation();
                                                                      const newPerUnit = unit;
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
                                                                      setOpenPerUnitDropdown(prev => ({
                                                                        ...prev,
                                                                        [`${format.id}-expenses-${index}-perUnit`]: false
                                                                      }));
                                                                    }}
                                                                    className={`w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors ${
                                                                      itemPerUnit === unit ? 'bg-blue-50 text-blue-700' : ''
                                                                    }`}
                                                                  >
                                                                    {unit}
                                                                  </button>
                                                                ))}
                                                                {/* Add Custom Per Unit Input */}
                                                                <div className="border-t border-gray-200 mt-2 pt-2 px-2">
                                                                  <div className="flex items-center gap-2">
                            <input
                                                                      type="text"
                                                                      value={customPerUnitInput}
                                                      onChange={(e) => {
                                                                        setCustomPerUnitInput(e.target.value);
                                                                      }}
                                                                      onKeyPress={(e) => {
                                                                        if (e.key === 'Enter') {
                                                                          e.preventDefault();
                                                                          const customValue = customPerUnitInput?.trim();
                                                                          if (customValue && !unitOptions.includes(customValue) && !customPerUnitOptions.includes(customValue)) {
                                                                            setCustomPerUnitOptions(prev => [...prev, customValue]);
                                                          const newItems = selectedItems.map(i => {
                                                            if (typeof i === 'object' && i.option === itemOption) {
                                                                                return { ...i, perUnit: customValue };
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
                                                                            setCustomPerUnitInput('');
                                                                            setOpenPerUnitDropdown(prev => ({
                                                                              ...prev,
                                                                              [`${format.id}-expenses-${index}-perUnit`]: false
                                                                            }));
                                                                          }
                                                                        }
                                                                      }}
                                                                      placeholder="Add custom per unit..."
                                                                      className="flex-1 max-w-[100px] px-2 py-1.5 border border-gray-300 rounded text-xs"
                                                                      onClick={(e) => e.stopPropagation()}
                                                                    />
                                                <button
                                                  type="button"
                                                                      onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        const customValue = customPerUnitInput?.trim();
                                                                        if (customValue && !unitOptions.includes(customValue) && !customPerUnitOptions.includes(customValue)) {
                                                                          setCustomPerUnitOptions(prev => [...prev, customValue]);
                                                                          const newItems = selectedItems.map(i => {
                                                                            if (typeof i === 'object' && i.option === itemOption) {
                                                                              return { ...i, perUnit: customValue };
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
                                                                          setCustomPerUnitInput('');
                                                                          setOpenPerUnitDropdown(prev => ({
                                                      ...prev,
                                                                            [`${format.id}-expenses-${index}-perUnit`]: false
                                                                          }));
                                                                        }
                                                                      }}
                                                                      disabled={!customPerUnitInput?.trim()}
                                                                      className="px-2 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex-shrink-0"
                                                >
                                                  <Plus className="w-3 h-3" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                                      </div>
                                                    </>
                                                  )}
                                                  {sectionType === 'fees' && (
                                                    <div className="flex items-center gap-1 w-full">
                                                      <span className="text-xs text-blue-600 shrink-0 w-3">$</span>
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
                                                        className="flex-1 min-w-0 px-2 py-1 border border-blue-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-700"
                                                        placeholder="0.00"
                                                        style={{ maxWidth: '100%', width: '100%', boxSizing: 'border-box' }}
                            />
                          </div>
                                                )}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      ) : (
                                        <div className="text-xs text-gray-400 text-center py-4">No items selected</div>
                                      )}
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })}
                          </div>
                          </>
                          )}
                        </div>

                        {/* Divider Line - Always show between Pricing Components and Pricing Formula */}
                        <div className="pricing-formula-divider" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}></div>

                        {/* Formula Summary */}
                        <>
                          <h4 className="pricing-formula-title">Pricing Formula</h4>
                        {(() => {
                        const structure = format.pricingStructure || {};
                        const rates = Array.isArray(structure.rates) ? structure.rates : [];
                        const expenses = Array.isArray(structure.expenses) ? structure.expenses : [];
                        const multipliers = Array.isArray(structure.multipliers) ? structure.multipliers : [];
                        const fees = Array.isArray(structure.fees) ? structure.fees : [];

                      // Calculate totals and build formula display
                      const rateValues = rates
                        .filter(r => r && typeof r === 'object' && r.value)
                        .map(r => parseFloat(r.value) || 0);
                      const rateTotal = rateValues.reduce((sum, val) => sum + val, 0);

                      const expenseValues = expenses
                        .filter(e => e && typeof e === 'object' && e.value)
                        .map(e => parseFloat(e.value) || 0);
                      const expenseTotal = expenseValues.reduce((sum, val) => sum + val, 0);

                      const multiplierValues = multipliers
                        .filter(m => m && typeof m === 'object' && m.value)
                        .map(m => parseFloat(m.value) || 0);
                      const multiplierTotal = multiplierValues.reduce((sum, val) => sum + val, 0);
                      const multiplierFactor = multiplierTotal > 0 ? (1 + multiplierTotal / 100) : 1;

                      const feeValues = fees
                        .filter(f => f && typeof f === 'object' && f.value)
                        .map(f => parseFloat(f.value) || 0);
                      const feeTotal = feeValues.reduce((sum, val) => sum + val, 0);

                      const baseTotal = rateTotal + expenseTotal;
                      const adjustedTotal = baseTotal * multiplierFactor;
                      const finalPrice = adjustedTotal + feeTotal;

                      // Build all formula elements - only include items with values
                      const allFormulaElements = [];
                      
                      // Add rates - only if they have a value
                      rates.forEach((r) => {
                        const rateObj = r && typeof r === 'object' ? r : { option: r, value: null };
                        if (rateObj.value && parseFloat(rateObj.value) > 0) {
                          allFormulaElements.push({
                            type: 'rate',
                            label: rateObj.option,
                            value: parseFloat(rateObj.value),
                            display: `$${parseFloat(rateObj.value).toFixed(2)}`,
                            hasValue: true,
                            inputValue: parseFloat(rateObj.value),
                            inputUnit: null
                          });
                        }
                      });

                      // Add expenses - only if they have a value
                      expenses.forEach((e) => {
                        const expObj = e && typeof e === 'object' ? e : { option: e, value: null, perUnit: null };
                        if (expObj.value && parseFloat(expObj.value) > 0) {
                          allFormulaElements.push({
                            type: 'expense',
                            label: expObj.option,
                            value: parseFloat(expObj.value),
                            display: `$${parseFloat(expObj.value).toFixed(2)}${expObj.perUnit ? `/${expObj.perUnit}` : ''}`,
                            perUnit: expObj.perUnit,
                            hasValue: true,
                            inputValue: parseFloat(expObj.value),
                            inputUnit: expObj.perUnit || null
                          });
                        }
                      });

                      // Add multipliers - only if they have a value
                      multipliers.forEach((m) => {
                        const multObj = m && typeof m === 'object' ? m : { option: m, value: null };
                        const multValue = multObj.value ? parseFloat(multObj.value) : 0;
                        if (multValue > 0) {
                          const multAmount = baseTotal > 0 ? (baseTotal * multValue / 100) : 0;
                          allFormulaElements.push({
                            type: 'multiplier',
                            label: multObj.option,
                            value: multAmount,
                            display: `$${multAmount.toFixed(2)}`,
                            percentage: multValue,
                            hasValue: true,
                            inputValue: multValue
                          });
                        }
                      });

                      // Add fees - only if they have a value
                      fees.forEach((f) => {
                        const feeObj = f && typeof f === 'object' ? f : { option: f, value: null };
                        if (feeObj.value && parseFloat(feeObj.value) > 0) {
                          allFormulaElements.push({
                            type: 'fee',
                            label: feeObj.option,
                            value: parseFloat(feeObj.value),
                            display: `$${parseFloat(feeObj.value).toFixed(2)}`,
                            hasValue: true,
                            inputValue: parseFloat(feeObj.value)
                          });
                        }
                      });

                      return (
                          <div className="-mt-2 mb-12">
                            {/* Single Unified Formula */}
                            <div className="flex flex-wrap items-center gap-3 text-sm min-h-[2rem]">
                              {allFormulaElements.length > 0 ? (
                                allFormulaElements.map((element, idx) => {
                                const typeLabel = {
                                  rate: 'Rate',
                                  expense: 'Expense',
                                  multiplier: 'Multiplier',
                                  fee: 'Fee'
                                }[element.type] || '';
                                
                                // Build input display string
                                let inputDisplay = '';
                                if (element.inputValue !== null && element.inputValue !== undefined) {
                                  if (element.type === 'multiplier' && element.percentage !== undefined) {
                                    inputDisplay = `(${element.percentage}%)`;
                                  } else if (element.inputUnit) {
                                    inputDisplay = `($${element.inputValue.toFixed(2)}/${element.inputUnit})`;
                                  } else if (element.type === 'rate' || element.type === 'fee') {
                                    inputDisplay = `($${element.inputValue.toFixed(2)})`;
                                  } else {
                                    inputDisplay = `($${element.inputValue.toFixed(2)})`;
                                  }
                                }
                                
                                // Build display value without parentheses
                                let displayValue = '';
                                if (element.inputValue !== null && element.inputValue !== undefined) {
                                  if (element.type === 'multiplier' && element.percentage !== undefined) {
                                    displayValue = `${element.percentage}%`;
                                  } else if (element.inputUnit) {
                                    displayValue = `$${element.inputValue.toFixed(2)}/${element.inputUnit}`;
                                  } else if (element.type === 'rate' || element.type === 'fee') {
                                    displayValue = `$${element.inputValue.toFixed(2)}`;
                                  } else {
                                    displayValue = `$${element.inputValue.toFixed(2)}`;
                                  }
                                }
                                
                                return (
                                  <span key={idx} className="flex items-center gap-3">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-gray-200 shadow-xs">
                                      <span className="font-medium text-gray-800">
                                        {displayValue && (
                                          <span className="font-semibold text-blue-600 mr-1.5">{displayValue}</span>
                                        )}
                                        {element.label}
                                        {typeLabel && element.type !== 'rate' && <span className="ml-1.5 text-xs font-normal text-gray-500">{typeLabel}</span>}
                                      </span>
                                    </span>
                                    {idx < allFormulaElements.length - 1 && (
                                      <span className="text-xl font-semibold text-gray-500 mx-1">+</span>
                                    )}
                                  </span>
                                );
                              }))
                              : (
                                <span className="text-gray-400 text-sm italic">No pricing components added yet</span>
                              )}
                            </div>
                          </div>
                      );
                    })()}
                      </>
                        </div>
                                                )}
                    {/* Save Button and Delete Button for this price */}
                    {!isBlank && (format.services && format.services.length > 0) && (
                      <div className="flex justify-end items-center gap-2 pt-2 border-t border-gray-200 mt-4">
                        {/* Delete Button - Show when services are added */}
                        <button
                          type="button"
                          onClick={() => {
                            // Check if this is an edited price (has savedAt property or editingPriceId matches)
                            const isEditedPrice = format.savedAt || editingPriceId === format.id;
                            
                            if (isEditedPrice) {
                              // If it's an edited price, remove it completely (don't restore to activePrices)
                              setPricingFormats((prev) => prev.filter((row) => row.id !== format.id));
                              // Clear editing state
                              if (editingPriceId === format.id) {
                                setEditingPriceId(null);
                              }
                              // Note: The price was already removed from activePrices when editing started,
                              // so deleting it here means it's permanently deleted
                            } else {
                              // If it's a new price, clear the services (titles) and reset
                                setPricingFormats((prev) =>
                                  prev.map((row) =>
                                                            row.id === format.id
                                                              ? {
                                                                  ...row,
                                        services: [],
                                        isPricingPanelsCollapsed: true,
                                                                  pricingStructure: {
                                          rates: [],
                                          expenses: [],
                                          multipliers: [],
                                          fees: []
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        }
                                                      }}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Delete title"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        {priceErrors[format.id] && (
                          <span className="text-red-600 text-sm">* {priceErrors[format.id]}</span>
                        )}
                                                <button
                                                  type="button"
                                                  onClick={() => {
                            // Clear any previous errors
                            setPriceErrors((prev) => {
                              const updated = { ...prev };
                              delete updated[format.id];
                              return updated;
                            });
                            
                            // Check if any service is already used in saved prices
                            const formatServices = format.services || [];
                            const alreadyUsed = formatServices.filter(service => usedServices.has(service));
                            
                            if (alreadyUsed.length > 0) {
                              setPriceErrors((prev) => ({ ...prev, [format.id]: 'Please fill in all required fields' }));
                              return;
                            }
                            
                            // Check if price has at least one service
                            if (formatServices.length === 0) {
                              setPriceErrors((prev) => ({ ...prev, [format.id]: 'Please fill in all required fields' }));
                              return;
                            }
                            
                            // Check if at least one price component has a value filled in
                            const structure = format.pricingStructure || {};
                            const rates = Array.isArray(structure.rates) ? structure.rates : [];
                            const expenses = Array.isArray(structure.expenses) ? structure.expenses : [];
                            const multipliers = Array.isArray(structure.multipliers) ? structure.multipliers : [];
                            const fees = Array.isArray(structure.fees) ? structure.fees : [];
                            
                            const hasRateValue = rates.some(r => r && typeof r === 'object' && r.value && parseFloat(r.value) > 0);
                            const hasExpenseValue = expenses.some(e => e && typeof e === 'object' && e.value && parseFloat(e.value) > 0);
                            const hasMultiplierValue = multipliers.some(m => m && typeof m === 'object' && m.value && parseFloat(m.value) > 0);
                            const hasFeeValue = fees.some(f => f && typeof f === 'object' && f.value && parseFloat(f.value) > 0);
                            
                            if (!hasRateValue && !hasExpenseValue && !hasMultiplierValue && !hasFeeValue) {
                              setPriceErrors((prev) => ({ ...prev, [format.id]: 'Please fill in all required fields' }));
                              return;
                            }
                            
                            // Check if this is editing an existing price (has savedAt property or editingPriceId matches)
                            const isEditing = format.savedAt || editingPriceId === format.id;
                            
                            if (isEditing) {
                              // Update existing price in activePrices (restore it with updated data)
                              const savedAt = format.savedAt || new Date().toISOString();
                              setActivePrices((prev) => {
                                // Check if it already exists (shouldn't, but just in case)
                                const exists = prev.some(p => p.id === format.id);
                                if (exists) {
                                  return prev.map((p) =>
                                    p.id === format.id
                                      ? { ...format, savedAt }
                                      : p
                                  );
                                } else {
                                  // Add it back with updated data
                                  return [...prev, { ...format, savedAt }];
                                }
                              });
                            } else {
                              // Save new price to activePrices
                              const priceToSave = { ...format, savedAt: new Date().toISOString() };
                              setActivePrices((prev) => [...prev, priceToSave]);
                            }
                            
                            // Remove from active pricing formats
                            setPricingFormats((prev) => {
                              const filtered = prev.filter((row) => row.id !== format.id);
                              // Add a new blank collapsed price if none exist
                              if (filtered.length === 0) {
                                return [{
                                  id: Date.now(),
                                  services: [],
                                  price: '',
                                  unit: '',
                                  basePrice: '',
                                  jobDifficultyMultiplier: '',
                                  storyMultiplier: '',
                                  isPricingPanelsCollapsed: true, // Collapsed by default
                                  pricingStructure: {
                                    rates: [],
                                    expenses: [],
                                    multipliers: [],
                                    fees: []
                                  },
                                }];
                              }
                              return filtered;
                            });
                            
                            // Clear editing state
                            if (isEditing) {
                              setEditingPriceId(null);
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        >
                          Save Price
                                                </button>
                                              </div>
                                      )}
                                    </div>
                              );
                            })}
                        </div>
                      </div>

              {/* Active Prices Subsection */}
              <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Prices</h3>
                {activePrices.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="italic">No saved prices yet. Create and save a price above to see it here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activePrices.map((savedPrice) => {
                      // Calculate pricing formula (same logic as Add Price section)
                      const structure = savedPrice.pricingStructure || {};
                        const rates = Array.isArray(structure.rates) ? structure.rates : [];
                        const expenses = Array.isArray(structure.expenses) ? structure.expenses : [];
                        const multipliers = Array.isArray(structure.multipliers) ? structure.multipliers : [];
                        const fees = Array.isArray(structure.fees) ? structure.fees : [];

                      // Calculate totals and build formula display
                      const rateValues = rates
                        .filter(r => r && typeof r === 'object' && r.value)
                        .map(r => parseFloat(r.value) || 0);
                      const rateTotal = rateValues.reduce((sum, val) => sum + val, 0);

                      const expenseValues = expenses
                        .filter(e => e && typeof e === 'object' && e.value)
                        .map(e => parseFloat(e.value) || 0);
                      const expenseTotal = expenseValues.reduce((sum, val) => sum + val, 0);

                      const multiplierValues = multipliers
                        .filter(m => m && typeof m === 'object' && m.value)
                        .map(m => parseFloat(m.value) || 0);
                      const multiplierTotal = multiplierValues.reduce((sum, val) => sum + val, 0);
                      const multiplierFactor = multiplierTotal > 0 ? (1 + multiplierTotal / 100) : 1;

                      const feeValues = fees
                        .filter(f => f && typeof f === 'object' && f.value)
                        .map(f => parseFloat(f.value) || 0);
                      const feeTotal = feeValues.reduce((sum, val) => sum + val, 0);

                      const baseTotal = rateTotal + expenseTotal;
                      const adjustedTotal = baseTotal * multiplierFactor;
                      const finalPrice = adjustedTotal + feeTotal;

                      // Build all formula elements - only include items with values
                      const allFormulaElements = [];
                      
                      // Add rates - only if they have a value
                      rates.forEach((r) => {
                        const rateObj = r && typeof r === 'object' ? r : { option: r, value: null };
                        if (rateObj.value && parseFloat(rateObj.value) > 0) {
                        allFormulaElements.push({
                          type: 'rate',
                          label: rateObj.option,
                            value: parseFloat(rateObj.value),
                            display: `$${parseFloat(rateObj.value).toFixed(2)}`,
                            hasValue: true,
                            inputValue: parseFloat(rateObj.value),
                          inputUnit: null
                        });
                        }
                      });

                      // Add expenses - only if they have a value
                      expenses.forEach((e) => {
                        const expObj = e && typeof e === 'object' ? e : { option: e, value: null, perUnit: null };
                        if (expObj.value && parseFloat(expObj.value) > 0) {
                        allFormulaElements.push({
                          type: 'expense',
                          label: expObj.option,
                            value: parseFloat(expObj.value),
                            display: `$${parseFloat(expObj.value).toFixed(2)}${expObj.perUnit ? `/${expObj.perUnit}` : ''}`,
                          perUnit: expObj.perUnit,
                            hasValue: true,
                            inputValue: parseFloat(expObj.value),
                          inputUnit: expObj.perUnit || null
                        });
                        }
                      });

                      // Add multipliers - only if they have a value
                      multipliers.forEach((m) => {
                        const multObj = m && typeof m === 'object' ? m : { option: m, value: null };
                        const multValue = multObj.value ? parseFloat(multObj.value) : 0;
                        if (multValue > 0) {
                        const multAmount = baseTotal > 0 ? (baseTotal * multValue / 100) : 0;
                        allFormulaElements.push({
                          type: 'multiplier',
                          label: multObj.option,
                          value: multAmount,
                            display: `$${multAmount.toFixed(2)}`,
                          percentage: multValue,
                            hasValue: true,
                            inputValue: multValue
                        });
                        }
                      });

                      // Add fees - only if they have a value
                      fees.forEach((f) => {
                        const feeObj = f && typeof f === 'object' ? f : { option: f, value: null };
                        if (feeObj.value && parseFloat(feeObj.value) > 0) {
                        allFormulaElements.push({
                          type: 'fee',
                          label: feeObj.option,
                            value: parseFloat(feeObj.value),
                            display: `$${parseFloat(feeObj.value).toFixed(2)}`,
                            hasValue: true,
                            inputValue: parseFloat(feeObj.value)
                          });
                        }
                      });

                      return (
                        <div
                          key={savedPrice.id}
                          className="border-2 border-gray-300 rounded-2xl px-4 py-4 bg-slate-50/60 relative shadow-md"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-base font-semibold text-gray-900">
                                  {(savedPrice.services || []).length > 0 
                                    ? (savedPrice.services || []).join(', ')
                                    : 'Untitled Price'}
                                </h4>
                              </div>
                              
                              {/* Pricing Formula Display */}
                              {allFormulaElements.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Pricing Formula</h5>
                                  <div className="flex flex-wrap items-center gap-3 text-sm min-h-[2rem]">
                                  {allFormulaElements.map((element, idx) => {
                                    const typeLabel = {
                                      rate: 'Rate',
                                      expense: 'Expense',
                                      multiplier: 'Multiplier',
                                      fee: 'Fee'
                                    }[element.type] || '';
                                    
                                    // Build input display string
                                    let inputDisplay = '';
                                    if (element.inputValue !== null && element.inputValue !== undefined) {
                                      if (element.type === 'multiplier' && element.percentage !== undefined) {
                                        inputDisplay = `(${element.percentage}%)`;
                                      } else if (element.inputUnit) {
                                        inputDisplay = `($${element.inputValue.toFixed(2)}/${element.inputUnit})`;
                                      } else if (element.type === 'rate' || element.type === 'fee') {
                                        inputDisplay = `($${element.inputValue.toFixed(2)})`;
                                      } else {
                                        inputDisplay = `($${element.inputValue.toFixed(2)})`;
                                      }
                                    }
                                      
                                      // Build display value without parentheses
                                      let displayValue = '';
                                      if (element.inputValue !== null && element.inputValue !== undefined) {
                                        if (element.type === 'multiplier' && element.percentage !== undefined) {
                                          displayValue = `${element.percentage}%`;
                                        } else if (element.inputUnit) {
                                          displayValue = `$${element.inputValue.toFixed(2)}/${element.inputUnit}`;
                                        } else if (element.type === 'rate' || element.type === 'fee') {
                                          displayValue = `$${element.inputValue.toFixed(2)}`;
                                        } else {
                                          displayValue = `$${element.inputValue.toFixed(2)}`;
                                        }
                                      }
                                    
                                    return (
                                        <span key={idx} className="flex items-center gap-3">
                                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-gray-200 shadow-xs">
                                            <span className="font-medium text-gray-800">
                                              {displayValue && (
                                                <span className="font-semibold text-blue-600 mr-1.5">{displayValue}</span>
                                              )}
                                              {element.label}
                                              {typeLabel && element.type !== 'rate' && <span className="ml-1.5 text-xs font-normal text-gray-500">{typeLabel}</span>}
                                            </span>
                                        </span>
                                        {idx < allFormulaElements.length - 1 && (
                                            <span className="text-xl font-semibold text-gray-500 mx-1">+</span>
                                        )}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                <button
                  type="button"
                  onClick={() => {
                                  // Move price to Add Price section below blank prices
                                  setPricingFormats((prev) => {
                                    // Separate blank prices from non-blank ones
                                    const blankPrices = prev.filter(f => 
                                      (!f.services || f.services.length === 0) && 
                                      (!f.pricingStructure?.rates || f.pricingStructure.rates.length === 0) &&
                                      (!f.pricingStructure?.expenses || f.pricingStructure.expenses.length === 0) &&
                                      (!f.pricingStructure?.multipliers || f.pricingStructure.multipliers.length === 0) &&
                                      (!f.pricingStructure?.fees || f.pricingStructure.fees.length === 0)
                                    );
                                    const nonBlankPrices = prev.filter(f => 
                                      !blankPrices.includes(f) && f.id !== savedPrice.id
                                    );
                                    // Insert edited price below blank prices, above other non-blank prices
                                    // Mark it as being edited by preserving savedAt
                                    return [...blankPrices, { ...savedPrice, isPricingPanelsCollapsed: false }, ...nonBlankPrices];
                                  });
                                  // Remove from active prices temporarily (we'll restore on save)
                                  setActivePrices((prev) => prev.filter((p) => p.id !== savedPrice.id));
                                  setEditingPriceId(savedPrice.id);
                                }}
                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                aria-label="Edit price"
                              >
                                <Pencil className="w-4 h-4" />
                </button>
                <button
                                type="button"
                  onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this price?')) {
                                    setActivePrices((prev) => prev.filter((p) => p.id !== savedPrice.id));
                                  }
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                                aria-label="Delete price"
                              >
                                <Trash2 className="w-4 h-4" />
                </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Divider separating Pricing Tool from Run Promotion */}
            <div className="pricing-formula-divider" style={{ marginTop: '2rem', marginBottom: '2rem' }}></div>

            {/* Run Promotion Section */}
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Run Promotion</h2>
              </div>
              
              {/* Add Promotions Subsection */}
              <div className="bg-white rounded-3xl shadow-sm p-6 mt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Promotions</h3>
              <div className="space-y-3">
                  {promotions.map((promotion) => {
                    // Check if promotion is blank (no saved data)
                    const isBlank = !promotion.title && !promotion.promotionType && !promotion.startDate && !promotion.endDate && !promotion.isIndefinite &&
                      (!promotion.percentOffServices || promotion.percentOffServices.length === 0) &&
                      (!promotion.packageServices || promotion.packageServices.length === 0) &&
                      (!promotion.packageFormula?.initialServices || promotion.packageFormula.initialServices.length === 0);
                    
                    return (
                  <div
                    key={promotion.id}
                      className="border-2 border-gray-300 rounded-2xl px-4 py-3 bg-slate-50/60 space-y-3 relative"
                    >
                    {/* First Row - Promotion Type and Title */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="w-full md:w-1/3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Promotion Type</label>
                        <select
                          value={promotion.promotionType || ''}
                          onChange={(e) =>
                            setPromotions((prev) =>
                              prev.map((row) =>
                                row.id === promotion.id ? { ...row, promotionType: e.target.value } : row
                              )
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ color: promotion.promotionType ? 'rgb(75 85 99)' : 'rgb(156 163 175)', paddingRight: '2.5rem' }}
                        >
                          <option value="" style={{ color: 'rgb(156 163 175)' }}>Select...</option>
                          <option value="percentOff" style={{ color: 'rgb(75 85 99)' }}>Percent Off</option>
                          <option value="package" style={{ color: 'rgb(75 85 99)' }}>Package Deal</option>
                          <option value="buyGet" style={{ color: 'rgb(75 85 99)' }}>Buy/Get</option>
                        </select>
                      </div>
                      <div className="w-full md:w-1/3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Promotion Title</label>
                        <input
                          type="text"
                          value={promotion.title || ''}
                          onChange={(e) =>
                            setPromotions((prev) =>
                              prev.map((row) =>
                                row.id === promotion.id ? { ...row, title: e.target.value } : row
                              )
                            )
                          }
                          placeholder="ex. Summer Sale"
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{ color: 'rgb(75 85 99)' }}
                        />
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
                              </div>
                                <div className="flex flex-col gap-2 w-full">
                                  <div className="relative w-full" data-promotion-dropdown>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const dropdownKey = `${promotion.id}-percent-service`;
                                        setOpenPackageFormulaDropdown(openPackageFormulaDropdown === dropdownKey ? null : dropdownKey);
                                      }}
                                      className="px-4 py-2.5 rounded-lg text-sm font-medium border-2 border-gray-300 bg-white text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center gap-2 w-full"
                                      data-promotion-dropdown
                                    >
                                      <span>Select...</span>
                                      <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
                                    </button>
                                    {openPackageFormulaDropdown === `${promotion.id}-percent-service` && (
                                      <div className="absolute z-50 mt-1 top-full left-0 w-full pricing-dropdown pricing-dropdown-container" data-promotion-dropdown>
                                        <div className="dropdown-content">
                                          {/* Soft Washing Group */}
                                          <div className="service-group">
                                            <div className="service-group-header">
                                              Soft Washing
                                            </div>
                                            <div className="service-list">
                                              {[...softWashingServices, ...customSoftWashingServices].map((service) => (
                                                <label
                                              key={service}
                                                  className="service-item-label"
                                                >
                                                  <input
                                                    type="checkbox"
                                                    checked={(promotion.percentOffServices || []).includes(service)}
                                                    onChange={(e) => {
                                                const currentServices = promotion.percentOffServices || [];
                                                      const newServices = e.target.checked
                                                        ? [...currentServices, service]
                                                        : currentServices.filter(s => s !== service);
                                                setPromotions((prev) =>
                                                  prev.map((row) =>
                                                          row.id === promotion.id ? { ...row, percentOffServices: newServices } : row
                                                        )
                                                      );
                                                    }}
                                                    className="service-checkbox"
                                                    onClick={(e) => e.stopPropagation()}
                                                  />
                                                  <span className="service-label-text">{service}</span>
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
                                                    checked={(promotion.percentOffServices || []).includes(service)}
                                                    onChange={(e) => {
                                                      const currentServices = promotion.percentOffServices || [];
                                                      const newServices = e.target.checked
                                                        ? [...currentServices, service]
                                                        : currentServices.filter(s => s !== service);
                                                      setPromotions((prev) =>
                                                        prev.map((row) =>
                                                          row.id === promotion.id ? { ...row, percentOffServices: newServices } : row
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
                                                    checked={(promotion.percentOffServices || []).includes(service)}
                                                    onChange={(e) => {
                                                      const currentServices = promotion.percentOffServices || [];
                                                      const newServices = e.target.checked
                                                        ? [...currentServices, service]
                                                        : currentServices.filter(s => s !== service);
                                                      setPromotions((prev) =>
                                                        prev.map((row) =>
                                                          row.id === promotion.id ? { ...row, percentOffServices: newServices } : row
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
                                                      checked={(promotion.percentOffServices || []).includes(service)}
                                                      onChange={(e) => {
                                                        const currentServices = promotion.percentOffServices || [];
                                                        const newServices = e.target.checked
                                                          ? [...currentServices, service]
                                                          : currentServices.filter(s => s !== service);
                                                        setPromotions((prev) =>
                                                          prev.map((row) =>
                                                            row.id === promotion.id ? { ...row, percentOffServices: newServices } : row
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
                                                    checked={(promotion.percentOffServices || []).includes('Paver Sealing')}
                                                    onChange={(e) => {
                                                      const currentServices = promotion.percentOffServices || [];
                                                      const newServices = e.target.checked
                                                        ? [...currentServices, 'Paver Sealing']
                                                        : currentServices.filter(s => s !== 'Paver Sealing');
                                                      setPromotions((prev) =>
                                                        prev.map((row) =>
                                                          row.id === promotion.id ? { ...row, percentOffServices: newServices } : row
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
                                  {/* Services Grid Layout */}
                                  <div className="flex flex-wrap gap-1 w-full">
                                  {(promotion.percentOffServices || []).map((service, index) => (
                                      <div key={index} className="flex items-center" data-service-index={index}>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm">
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
                                <div className="relative w-full percent-dropdown-container" data-percent-dropdown>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const dropdownKey = `${promotion.id}-percent-main`;
                                          setOpenPercentDropdown(openPercentDropdown === dropdownKey ? null : dropdownKey);
                                        }}
                                        className="px-4 py-2.5 rounded-lg text-sm font-medium border-2 border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center gap-2 w-full"
                                        data-percent-dropdown
                                      >
                                        <span>{promotion.percentOff ? `${promotion.percentOff}% off` : 'Select...'}</span>
                                        <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
                                      </button>
                                      {openPercentDropdown === `${promotion.id}-percent-main` && (
                                        <div className="absolute z-50 mt-1 top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto" data-percent-dropdown>
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
                                                  promotion.percentOff === percent.toString() ? 'bg-gray-100 text-gray-700' : ''
                                                }`}
                                              >
                                                {percent}% off
                                              </button>
                                            ))}
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
                              <div className="flex gap-8 items-start">
                                {/* Package Deal - Service Selection */}
                                <div className="flex flex-col items-start gap-3 flex-1">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                        <ShoppingCart className="w-4 h-4 text-gray-600" />
                                      </div>
                                      <div>
                                      <span className="text-sm font-semibold text-gray-800 block">Service</span>
                                      <span className="text-xs text-gray-500">Select services to include</span>
                                      </div>
                                    </div>
                                  <div className="relative pricing-structure-dropdown-container w-full" data-promotion-dropdown>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const dropdownKey = `${promotion.id}-package-services`;
                                        setOpenPackageFormulaDropdown(openPackageFormulaDropdown === dropdownKey ? null : dropdownKey);
                                      }}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                                      data-promotion-dropdown
                                    >
                                      <span>Select...</span>
                                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openPackageFormulaDropdown === `${promotion.id}-package-services` ? 'transform rotate-180' : ''}`} />
                                    </button>
                                    {openPackageFormulaDropdown === `${promotion.id}-package-services` && (
                                      <div className="absolute z-50 mt-1 top-full left-0 w-full pricing-dropdown pricing-dropdown-container" data-promotion-dropdown>
                                        <div className="dropdown-content">
                                          {/* Soft Washing Group */}
                                          <div className="service-group">
                                            <div className="service-group-header">
                                              Soft Washing
                                            </div>
                                            <div className="service-list">
                                              {[...softWashingServices, ...customSoftWashingServices].map((service) => (
                                                <label
                                              key={service}
                                                  className="service-item-label"
                                                >
                                                  <input
                                                    type="checkbox"
                                                    checked={(promotion.packageServices || []).includes(service)}
                                                    onChange={(e) => {
                                                const currentServices = promotion.packageServices || [];
                                                      const newServices = e.target.checked
                                                        ? [...currentServices, service]
                                                        : currentServices.filter(s => s !== service);
                                                setPromotions((prev) =>
                                                  prev.map((row) =>
                                                    row.id === promotion.id
                                                            ? { ...row, packageServices: newServices }
                                                      : row
                                                  )
                                                );
                                                    }}
                                                    className="service-checkbox"
                                                    onClick={(e) => e.stopPropagation()}
                                                  />
                                                  <span className="service-label-text">{service}</span>
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
                                                    checked={(promotion.packageServices || []).includes(service)}
                                                    onChange={(e) => {
                                                      const currentServices = promotion.packageServices || [];
                                                      const newServices = e.target.checked
                                                        ? [...currentServices, service]
                                                        : currentServices.filter(s => s !== service);
                                                      setPromotions((prev) =>
                                                        prev.map((row) =>
                                                          row.id === promotion.id
                                                            ? { ...row, packageServices: newServices }
                                                            : row
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
                                                    checked={(promotion.packageServices || []).includes(service)}
                                                    onChange={(e) => {
                                                      const currentServices = promotion.packageServices || [];
                                                      const newServices = e.target.checked
                                                        ? [...currentServices, service]
                                                        : currentServices.filter(s => s !== service);
                                                      setPromotions((prev) =>
                                                        prev.map((row) =>
                                                          row.id === promotion.id
                                                            ? { ...row, packageServices: newServices }
                                                            : row
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
                                                      checked={(promotion.packageServices || []).includes(service)}
                                                      onChange={(e) => {
                                                        const currentServices = promotion.packageServices || [];
                                                        const newServices = e.target.checked
                                                          ? [...currentServices, service]
                                                          : currentServices.filter(s => s !== service);
                                                        setPromotions((prev) =>
                                                          prev.map((row) =>
                                                            row.id === promotion.id
                                                              ? { ...row, packageServices: newServices }
                                                              : row
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
                                                    checked={(promotion.packageServices || []).includes('Paver Sealing')}
                                                    onChange={(e) => {
                                                      const currentServices = promotion.packageServices || [];
                                                      const newServices = e.target.checked
                                                        ? [...currentServices, 'Paver Sealing']
                                                        : currentServices.filter(s => s !== 'Paver Sealing');
                                                      setPromotions((prev) =>
                                                        prev.map((row) =>
                                                          row.id === promotion.id
                                                            ? { ...row, packageServices: newServices }
                                                            : row
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
                                  {/* Selected Services Display */}
                                  {(promotion.packageServices || []).length > 0 && (
                                    <div className="flex flex-wrap gap-1 w-full mt-2">
                                      {(promotion.packageServices || []).map((service, index) => (
                                        <div key={index} className="flex items-center gap-2" data-service-index={index}>
                                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm">
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
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                {/* Vertical Divider with Arrow - Always show */}
                                <div className="flex items-center self-stretch px-4">
                                  <div className="flex flex-col items-center gap-2">
                                    <div className="w-px h-full min-h-[2rem] bg-gray-300"></div>
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                    <div className="w-px h-full min-h-[2rem] bg-gray-300"></div>
                                  </div>
                                </div>
                                {/* Package Price Input */}
                                <div className="flex flex-col items-start gap-3 flex-1">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                      <DollarSign className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-semibold text-gray-800 block">Package Price</span>
                                      <span className="text-xs text-gray-500">Set package price</span>
                                    </div>
                                  </div>
                                  <div className="relative w-full">
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
                                    <div className="relative w-full" data-promotion-dropdown>
                                      {openPackageFormulaDropdown === `${promotion.id}-initial` && (
                                        <div className="absolute z-50 mt-1 top-full left-0 w-full pricing-dropdown pricing-dropdown-container" data-promotion-dropdown>
                                          <div className="dropdown-content">
                                            {/* Soft Washing Group */}
                                            <div className="service-group">
                                              <div className="service-group-header">
                                                Soft Washing
                                              </div>
                                              <div className="service-list">
                                                {[...softWashingServices, ...customSoftWashingServices].filter(service => !(promotion.packageFormula?.initialServices || []).includes(service)).map((service) => (
                                                  <label
                                                    key={service}
                                                    className="service-item-label"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      checked={(promotion.packageFormula?.initialServices || []).includes(service)}
                                                      onChange={(e) => {
                                                        const currentServices = promotion.packageFormula?.initialServices || [];
                                                        const newServices = e.target.checked
                                                          ? [...currentServices, service]
                                                          : currentServices.filter(s => s !== service);
                                                        setPromotions((prev) =>
                                                          prev.map((row) =>
                                                            row.id === promotion.id
                                                              ? {
                                                                  ...row,
                                                                  packageFormula: {
                                                                    ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                    initialServices: newServices
                                                                  }
                                                                }
                                                              : row
                                                          )
                                                        );
                                                      }}
                                                      className="service-checkbox"
                                                      onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <span className="service-label-text">{service}</span>
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
                                                {[...pressureWashingServices, ...customPressureWashingServices].filter(service => !(promotion.packageFormula?.initialServices || []).includes(service)).map((service) => (
                                                  <label
                                                    key={service}
                                                    className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      checked={(promotion.packageFormula?.initialServices || []).includes(service)}
                                                      onChange={(e) => {
                                                        const currentServices = promotion.packageFormula?.initialServices || [];
                                                        const newServices = e.target.checked
                                                          ? [...currentServices, service]
                                                          : currentServices.filter(s => s !== service);
                                                        setPromotions((prev) =>
                                                          prev.map((row) =>
                                                            row.id === promotion.id
                                                              ? {
                                                                  ...row,
                                                                  packageFormula: {
                                                                    ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                    initialServices: newServices
                                                                  }
                                                                }
                                                              : row
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
                                                {[...specialtyCleaningServices, ...customSpecialtyCleaningServices].filter(service => !(promotion.packageFormula?.initialServices || []).includes(service)).map((service) => (
                                                  <label
                                              key={service}
                                                    className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      checked={(promotion.packageFormula?.initialServices || []).includes(service)}
                                                      onChange={(e) => {
                                                const currentServices = promotion.packageFormula?.initialServices || [];
                                                        const newServices = e.target.checked
                                                          ? [...currentServices, service]
                                                          : currentServices.filter(s => s !== service);
                                                setPromotions((prev) =>
                                                  prev.map((row) =>
                                                    row.id === promotion.id
                                                      ? {
                                                          ...row,
                                                          packageFormula: {
                                                            ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                    initialServices: newServices
                                                          }
                                                        }
                                                      : row
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
                                                  {[...windowCleaningServices, ...customWindowCleaningServices].filter(service => !(promotion.packageFormula?.initialServices || []).includes(service)).map((service) => (
                                                    <label
                                                      key={service}
                                                      className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        checked={(promotion.packageFormula?.initialServices || []).includes(service)}
                                                        onChange={(e) => {
                                                          const currentServices = promotion.packageFormula?.initialServices || [];
                                                          const newServices = e.target.checked
                                                            ? [...currentServices, service]
                                                            : currentServices.filter(s => s !== service);
                                                          setPromotions((prev) =>
                                                            prev.map((row) =>
                                                              row.id === promotion.id
                                                                ? {
                                                                    ...row,
                                                                    packageFormula: {
                                                                      ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                      initialServices: newServices
                                                                    }
                                                                  }
                                                                : row
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
                                                      checked={(promotion.packageFormula?.initialServices || []).includes('Paver Sealing')}
                                                      onChange={(e) => {
                                                        const currentServices = promotion.packageFormula?.initialServices || [];
                                                        const newServices = e.target.checked
                                                          ? [...currentServices, 'Paver Sealing']
                                                          : currentServices.filter(s => s !== 'Paver Sealing');
                                                        setPromotions((prev) =>
                                                          prev.map((row) =>
                                                            row.id === promotion.id
                                                              ? {
                                                                  ...row,
                                                                  packageFormula: {
                                                                    ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                    initialServices: newServices
                                                                  }
                                                                }
                                                              : row
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
                                <div className="flex flex-col gap-2 w-full">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const dropdownKey = `${promotion.id}-initial`;
                                      setOpenPackageFormulaDropdown(openPackageFormulaDropdown === dropdownKey ? null : dropdownKey);
                                    }}
                                    className="text-sm text-gray-600 py-2 px-4 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
                                    data-promotion-dropdown
                                  >
                                    <span>Add Services</span>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openPackageFormulaDropdown === `${promotion.id}-initial` ? 'transform rotate-180' : ''}`} />
                                  </button>
                                  <div className="flex flex-wrap gap-1 w-full">
                                  {(promotion.packageFormula?.initialServices || []).map((service, index) => (
                                      <div key={index} className="flex items-center" data-service-index={index}>
                                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm">
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
                                    <div className="relative w-full" data-promotion-dropdown>
                                      {openPackageFormulaDropdown === `${promotion.id}-add-service` && (
                                        <div className="absolute z-50 mt-1 top-full left-0 w-full pricing-dropdown pricing-dropdown-container" data-promotion-dropdown>
                                          <div className="dropdown-content">
                                            {/* Soft Washing Group */}
                                            <div className="service-group">
                                              <div className="service-group-header">
                                                Soft Washing
                                              </div>
                                              <div className="service-list">
                                                {[...softWashingServices, ...customSoftWashingServices].filter(service => !(promotion.packageFormula?.additionalServices || []).some(as => as.service === service)).map((service) => (
                                                  <label
                                                    key={service}
                                                    className="service-item-label"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      checked={(promotion.packageFormula?.additionalServices || []).some(as => as.service === service)}
                                                      onChange={(e) => {
                                                        const currentAdditional = promotion.packageFormula?.additionalServices || [];
                                                        if (e.target.checked) {
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
                                                        } else {
                                                          setPromotions((prev) =>
                                                            prev.map((row) =>
                                                              row.id === promotion.id
                                                                ? {
                                                                    ...row,
                                                                    packageFormula: {
                                                                      ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                      additionalServices: currentAdditional.filter(as => as.service !== service)
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        }
                                                      }}
                                                      className="service-checkbox"
                                                      onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <span className="service-label-text">{service}</span>
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
                                                {[...pressureWashingServices, ...customPressureWashingServices].filter(service => !(promotion.packageFormula?.additionalServices || []).some(as => as.service === service)).map((service) => (
                                                  <label
                                                    key={service}
                                                    className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      checked={(promotion.packageFormula?.additionalServices || []).some(as => as.service === service)}
                                                      onChange={(e) => {
                                                        const currentAdditional = promotion.packageFormula?.additionalServices || [];
                                                        if (e.target.checked) {
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
                                                        } else {
                                                          setPromotions((prev) =>
                                                            prev.map((row) =>
                                                              row.id === promotion.id
                                                                ? {
                                                                    ...row,
                                                                    packageFormula: {
                                                                      ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                      additionalServices: currentAdditional.filter(as => as.service !== service)
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
                                                {[...specialtyCleaningServices, ...customSpecialtyCleaningServices].filter(service => !(promotion.packageFormula?.additionalServices || []).some(as => as.service === service)).map((service) => (
                                                  <label
                                                key={service}
                                                    className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      checked={(promotion.packageFormula?.additionalServices || []).some(as => as.service === service)}
                                                      onChange={(e) => {
                                                  const currentAdditional = promotion.packageFormula?.additionalServices || [];
                                                        if (e.target.checked) {
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
                                                        } else {
                                                          setPromotions((prev) =>
                                                            prev.map((row) =>
                                                              row.id === promotion.id
                                                                ? {
                                                                    ...row,
                                                                    packageFormula: {
                                                                      ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                      additionalServices: currentAdditional.filter(as => as.service !== service)
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
                                                  {[...windowCleaningServices, ...customWindowCleaningServices].filter(service => !(promotion.packageFormula?.additionalServices || []).some(as => as.service === service)).map((service) => (
                                                    <label
                                                      key={service}
                                                      className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        checked={(promotion.packageFormula?.additionalServices || []).some(as => as.service === service)}
                                                        onChange={(e) => {
                                                          const currentAdditional = promotion.packageFormula?.additionalServices || [];
                                                          if (e.target.checked) {
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
                                                          } else {
                                                            setPromotions((prev) =>
                                                              prev.map((row) =>
                                                                row.id === promotion.id
                                                                  ? {
                                                                      ...row,
                                                                      packageFormula: {
                                                                        ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                        additionalServices: currentAdditional.filter(as => as.service !== service)
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
                                                      checked={(promotion.packageFormula?.additionalServices || []).some(as => as.service === 'Paver Sealing')}
                                                      onChange={(e) => {
                                                        const currentAdditional = promotion.packageFormula?.additionalServices || [];
                                                        if (e.target.checked) {
                                                          setPromotions((prev) =>
                                                            prev.map((row) =>
                                                              row.id === promotion.id
                                                                ? {
                                                                    ...row,
                                                                    packageFormula: {
                                                                      ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                      additionalServices: [...currentAdditional, { service: 'Paver Sealing', percentOff: 5 }]
                                                                    }
                                                                  }
                                                                : row
                                                            )
                                                          );
                                                        } else {
                                                          setPromotions((prev) =>
                                                            prev.map((row) =>
                                                              row.id === promotion.id
                                                                ? {
                                                                    ...row,
                                                                    packageFormula: {
                                                                      ...(row.packageFormula || { initialServices: [], additionalServices: [] }),
                                                                      additionalServices: currentAdditional.filter(as => as.service !== 'Paver Sealing')
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
                                  <div className="flex flex-col gap-2 w-full">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const dropdownKey = `${promotion.id}-add-service`;
                                        setOpenPackageFormulaDropdown(openPackageFormulaDropdown === dropdownKey ? null : dropdownKey);
                                      }}
                                      className="text-sm text-gray-600 py-2 px-4 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
                                      data-promotion-dropdown
                                    >
                                      <span>Add Services</span>
                                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openPackageFormulaDropdown === `${promotion.id}-add-service` ? 'transform rotate-180' : ''}`} />
                                    </button>
                                    <div className="flex flex-wrap gap-1 w-full">
                                    {(promotion.packageFormula?.additionalServices || []).map((additionalService, index) => (
                                        <div key={index} className="flex items-center">
                                          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm">
                                          <span className="text-sm font-medium">{additionalService.service}</span>
                                          <div className="relative percent-dropdown-container">
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const dropdownKey = `${promotion.id}-percent-${index}`;
                                                setOpenPercentDropdown(openPercentDropdown === dropdownKey ? null : dropdownKey);
                                              }}
                                                className="text-sm font-medium border-2 border-gray-300 rounded-md px-3 py-1 pr-8 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center gap-2"
                                            >
                                                <span>{additionalService.percentOff === 100 ? 'FREE' : additionalService.percentOff ? `${additionalService.percentOff}% off` : 'Select...'}</span>
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            </button>
                                            {openPercentDropdown === `${promotion.id}-percent-${index}` && (
                                                <div className="absolute z-50 mt-1 top-full left-0 w-32 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto" data-percent-dropdown>
                                                <div className="py-1">
                                                    {/* FREE option (100% off) */}
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
                                                        additionalService.percentOff === 100 ? 'bg-gray-100 text-gray-700' : ''
                                                      }`}
                                                    >
                                                      FREE
                                                    </button>
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
                                                          additionalService.percentOff === percent ? 'bg-gray-100 text-gray-700' : ''
                                                    }`}
                                                  >
                                                        {percent}% off
                                                  </button>
                                                    ))}
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

                    {/* Third Row - Date Range - Only show if promotion type is selected */}
                    {promotion.promotionType && (
                      <div className="flex flex-col gap-3">
                        {/* Indefinite Checkbox */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`indefinite-${promotion.id}`}
                            checked={promotion.isIndefinite || false}
                            onChange={(e) => {
                              setPromotions((prev) =>
                                prev.map((row) =>
                                  row.id === promotion.id
                                    ? {
                                        ...row,
                                        isIndefinite: e.target.checked,
                                        startDate: e.target.checked ? '' : row.startDate,
                                        endDate: e.target.checked ? '' : row.endDate,
                                      }
                                    : row
                                )
                              );
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={`indefinite-${promotion.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                            Run promotion indefinitely
                          </label>
                        </div>
                        
                        {/* Date Inputs - Disabled when indefinite */}
                        {!promotion.isIndefinite && (
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="w-full md:w-1/2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                        <input
                          type="date"
                                value={promotion.startDate || ''}
                          onChange={(e) =>
                            setPromotions((prev) =>
                              prev.map((row) =>
                                row.id === promotion.id ? { ...row, startDate: e.target.value } : row
                              )
                            )
                          }
                                min={new Date().toISOString().split('T')[0]}
                                onKeyDown={(e) => e.preventDefault()}
                                onFocus={(e) => {
                                  e.target.showPicker?.();
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                style={{ color: 'rgb(75 85 99)' }}
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                        <input
                          type="date"
                                value={promotion.endDate || ''}
                          onChange={(e) =>
                            setPromotions((prev) =>
                              prev.map((row) =>
                                row.id === promotion.id ? { ...row, endDate: e.target.value } : row
                              )
                            )
                          }
                                min={promotion.startDate || new Date().toISOString().split('T')[0]}
                                onKeyDown={(e) => e.preventDefault()}
                                onFocus={(e) => {
                                  e.target.showPicker?.();
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                style={{ color: 'rgb(75 85 99)' }}
                        />
                      </div>
                    </div>
                        )}
                  </div>
                    )}
                    
                    {/* Save Button and Delete Button for this promotion */}
                    {!isBlank && (
                      <div className="flex justify-end items-center gap-2 pt-2 border-t border-gray-200 mt-4">
                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setPromotions((prev) => prev.filter((row) => row.id !== promotion.id))
                          }
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                          aria-label="Delete promotion"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        {promotionErrors[promotion.id] && (
                          <span className="text-red-600 text-sm">* {promotionErrors[promotion.id]}</span>
                        )}
                <button
                  type="button"
                  onClick={() => {
                            // Clear any previous errors
                            setPromotionErrors((prev) => {
                              const updated = { ...prev };
                              delete updated[promotion.id];
                              return updated;
                            });
                            
                            // Validate all required fields
                            if (!promotion.title || !promotion.title.trim()) {
                              setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                              return;
                            }
                            
                            if (!promotion.promotionType) {
                              setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                              return;
                            }
                            
                            // Validate fields based on promotion type
                            if (promotion.promotionType === 'percentOff') {
                              if (!promotion.percentOff) {
                                setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                                return;
                              }
                              if (!promotion.percentOffServices || promotion.percentOffServices.length === 0) {
                                setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                                return;
                              }
                            } else if (promotion.promotionType === 'package') {
                              if (!promotion.packagePrice || promotion.packagePrice.trim() === '') {
                                setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                                return;
                              }
                              if (!promotion.packageServices || promotion.packageServices.length === 0) {
                                setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                                return;
                              }
                            } else if (promotion.promotionType === 'buyGet') {
                              if (!promotion.packageFormula?.initialServices || promotion.packageFormula.initialServices.length === 0) {
                                setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                                return;
                              }
                              if (!promotion.packageFormula?.additionalServices || promotion.packageFormula.additionalServices.length === 0) {
                                setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                                return;
                              }
                              // Check that all "Get" services have a percent off selected
                              const hasAllPercentOff = promotion.packageFormula.additionalServices.every(
                                (as) => as.percentOff !== undefined && as.percentOff !== null && as.percentOff !== ''
                              );
                              if (!hasAllPercentOff) {
                                setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                                return;
                              }
                            }
                            
                            // Validate dates
                            if (!promotion.isIndefinite) {
                              if (!promotion.startDate) {
                                setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                                return;
                              }
                              if (!promotion.endDate) {
                                setPromotionErrors((prev) => ({ ...prev, [promotion.id]: 'Please fill in all required fields' }));
                                return;
                              }
                            }
                            
                            // Save promotion to savedPromotions or expiredPromotions based on end date
                            const promotionToSave = { ...promotion, savedAt: new Date().toISOString() };
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            
                            // Check if expired
                            if (!promotionToSave.isIndefinite && promotionToSave.endDate) {
                              const endDate = new Date(promotionToSave.endDate);
                              endDate.setHours(0, 0, 0, 0);
                              
                              if (endDate < today) {
                                // Add to expired promotions
                                setExpiredPromotions((prev) => [...prev, promotionToSave]);
                              } else {
                                // Add to active promotions
                                setSavedPromotions((prev) => [...prev, promotionToSave]);
                              }
                            } else {
                              // No end date or indefinite - add to active promotions
                              setSavedPromotions((prev) => [...prev, promotionToSave]);
                            }
                            
                            // Remove from active promotions
                            setPromotions((prev) => {
                              const filtered = prev.filter((row) => row.id !== promotion.id);
                              // Ensure there's always at least one blank promotion
                              if (filtered.length === 0) {
                                return [{
                        id: Date.now(),
                                  title: '',
                        services: [],
                                  promotionType: '',
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
                                  isIndefinite: false,
                                }];
                              }
                              return filtered;
                            });
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        >
                          Save Promotion
                </button>
                      </div>
                    )}
                  </div>
                  );
                })}
                </div>
              </div>
              
              {/* Saved Promotions Subsection */}
              <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Promotions</h3>
                {savedPromotions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="italic">No active promotions yet. Create and save a promotion above to see it here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedPromotions.map((savedPromotion) => {
                      const getPromotionTypeLabel = (type) => {
                        switch(type) {
                          case 'percentOff': return 'Percent Off';
                          case 'package': return 'Package Deal';
                          case 'buyGet': return 'Buy/Get';
                          default: return type;
                        }
                      };
                      
                      const getPromotionDetails = () => {
                        if (savedPromotion.promotionType === 'percentOff') {
                          const services = savedPromotion.percentOffServices || [];
                          const serviceList = services.length > 0 ? services.join(', ') : 'No services';
                          return `${savedPromotion.percentOff || 'N/A'}% off - ${serviceList}`;
                        } else if (savedPromotion.promotionType === 'package') {
                          const services = savedPromotion.packageServices || [];
                          const serviceList = services.length > 0 ? services.join(', ') : 'No services';
                          return `$${savedPromotion.packagePrice || '0.00'} - ${serviceList}`;
                        } else if (savedPromotion.promotionType === 'buyGet') {
                          const buyServices = savedPromotion.packageFormula?.initialServices || [];
                          const getServices = savedPromotion.packageFormula?.additionalServices || [];
                          const buyList = buyServices.length > 0 ? buyServices.join(', ') : 'No services';
                          const getList = getServices.length > 0 ? getServices.map(s => typeof s === 'object' ? s.service : s).join(', ') : 'No services';
                          return `Buy: ${buyList} | Get: ${getList}`;
                        }
                        return 'N/A';
                      };
                      
                      return (
                        <div
                          key={savedPromotion.id}
                          className="border-2 border-gray-300 rounded-2xl px-4 py-4 bg-slate-50/60 relative shadow-md"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-base font-semibold text-gray-900">{savedPromotion.title || 'Untitled Promotion'}</h4>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                                  {getPromotionTypeLabel(savedPromotion.promotionType)}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                {savedPromotion.promotionType === 'buyGet' ? (
                                  <>
                                    {(savedPromotion.packageFormula?.initialServices || []).length > 0 && (
                                      <p className="text-sm font-medium text-gray-600 mb-1">Buy: {(savedPromotion.packageFormula.initialServices || []).join(', ')}</p>
                                    )}
                                    {(savedPromotion.packageFormula?.additionalServices || []).length > 0 && (
                                      <p className="text-sm font-medium text-gray-600 mb-1">
                                        Get: {(savedPromotion.packageFormula.additionalServices || []).map(s => {
                                          const service = typeof s === 'object' ? s.service : s;
                                          const percentOff = typeof s === 'object' ? s.percentOff : null;
                                          if (percentOff === 100) {
                                            return `${service} (FREE)`;
                                          } else if (percentOff) {
                                            return `${service} (${percentOff}% off)`;
                                          }
                                          return service;
                                        }).join(', ')}
                                      </p>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <p className="font-medium mb-1">{getPromotionDetails().split(' - ')[0] || getPromotionDetails()}</p>
                                    {savedPromotion.promotionType === 'percentOff' && (savedPromotion.percentOffServices || []).length > 0 && (
                                      <p className="text-xs text-gray-500 mt-1">Services: {(savedPromotion.percentOffServices || []).join(', ')}</p>
                                    )}
                                    {savedPromotion.promotionType === 'package' && (savedPromotion.packageServices || []).length > 0 && (
                                      <p className="text-xs text-gray-500 mt-1">Services: {(savedPromotion.packageServices || []).join(', ')}</p>
                                    )}
                                  </>
                                )}
                              </div>
                              {(savedPromotion.startDate || savedPromotion.endDate || savedPromotion.isIndefinite) && (
                                <p className="text-xs text-gray-500">
                                  {savedPromotion.isIndefinite ? (
                                    'Running indefinitely'
                                  ) : (
                                    <>
                                      {savedPromotion.startDate && `Start: ${new Date(savedPromotion.startDate).toLocaleDateString()}`}
                                      {savedPromotion.startDate && savedPromotion.endDate && ' • '}
                                      {savedPromotion.endDate && `End: ${new Date(savedPromotion.endDate).toLocaleDateString()}`}
                                    </>
                                  )}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                <button
                                type="button"
                  onClick={() => {
                                  // Move promotion back to active promotions for editing
                                  setPromotions((prev) => [...prev, { ...savedPromotion }]);
                                  // Remove from saved promotions
                                  setSavedPromotions((prev) => prev.filter((p) => p.id !== savedPromotion.id));
                                  setEditingPromotionId(savedPromotion.id);
                                }}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this promotion?')) {
                                    setSavedPromotions((prev) => prev.filter((p) => p.id !== savedPromotion.id));
                                  }
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                                aria-label="Delete promotion"
                              >
                                <Trash2 className="w-4 h-4" />
                </button>
              </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Expired Promotions Subsection */}
              <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Expired Promotions</h3>
                {expiredPromotions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No expired promotions.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {expiredPromotions.map((expiredPromotion) => {
                      const getPromotionTypeLabel = (type) => {
                        switch(type) {
                          case 'percentOff': return 'Percent Off';
                          case 'package': return 'Package Deal';
                          case 'buyGet': return 'Buy/Get';
                          default: return type;
                        }
                      };
                      
                      return (
                        <div
                          key={expiredPromotion.id}
                          className="border-2 border-gray-300 rounded-2xl px-4 py-4 bg-slate-50/60 relative shadow-md opacity-75"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-base font-semibold text-gray-900">{expiredPromotion.title || 'Untitled Promotion'}</h4>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                                  {getPromotionTypeLabel(expiredPromotion.promotionType)}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                {expiredPromotion.promotionType === 'buyGet' ? (
                                  <>
                                    {(expiredPromotion.packageFormula?.initialServices || []).length > 0 && (
                                      <p className="text-sm font-medium text-gray-600 mb-1">Buy: {(expiredPromotion.packageFormula.initialServices || []).join(', ')}</p>
                                    )}
                                    {(expiredPromotion.packageFormula?.additionalServices || []).length > 0 && (
                                      <p className="text-sm font-medium text-gray-600 mb-1">Get: {(expiredPromotion.packageFormula.additionalServices || []).map(s => typeof s === 'object' ? s.service : s).join(', ')}</p>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <p className="text-sm font-medium mb-1">
                                      {expiredPromotion.promotionType === 'percentOff' 
                                        ? `${expiredPromotion.percentOff || 'N/A'}% off`
                                        : `$${expiredPromotion.packagePrice || '0.00'}`}
                                    </p>
                                    {expiredPromotion.promotionType === 'percentOff' && (expiredPromotion.percentOffServices || []).length > 0 && (
                                      <p className="text-sm font-medium mt-1">Services: {(expiredPromotion.percentOffServices || []).join(', ')}</p>
                                    )}
                                    {expiredPromotion.promotionType === 'package' && (expiredPromotion.packageServices || []).length > 0 && (
                                      <p className="text-sm font-medium mt-1">Services: {(expiredPromotion.packageServices || []).join(', ')}</p>
                                    )}
                                  </>
                                )}
                              </div>
                              {expiredPromotion.endDate && (
                                <p className="text-xs text-gray-500">
                                  Expired: {new Date(expiredPromotion.endDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this expired promotion?')) {
                                    setExpiredPromotions((prev) => prev.filter((p) => p.id !== expiredPromotion.id));
                                  }
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                                aria-label="Delete promotion"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
    </div>
  );
};

export default PricingTool;
