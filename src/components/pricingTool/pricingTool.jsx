import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, X, Wrench, ArrowRight, Percent, ShoppingCart, Gift, DollarSign, Bot, Send, FileText, FileSignature, Receipt, HeartHandshake, Phone, Star, MapPin, Clock, Award, Shield, ShieldCheck, Search } from 'lucide-react';
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
}) => {
  // State for custom input values
  const [customInputValues, setCustomInputValues] = useState({
    rates: '',
    expenses: '',
    multipliers: '',
    fees: ''
  });
  // Additional state variables needed by the component
  const [showPaverSealing] = useState(false);
  const windowCleaningServices = [];
  const customWindowCleaningServices = [];
  const [promotions, setPromotions] = useState([]);
  const [openPercentDropdown, setOpenPercentDropdown] = useState(null);
  const [openPackageFormulaDropdown, setOpenPackageFormulaDropdown] = useState(null);

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
    };

    if (Object.keys(openPricingStructureDropdown || {}).length > 0 || openPricingDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openPricingStructureDropdown, setOpenPricingStructureDropdown, openPricingDropdown, setOpenPricingDropdown]);

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
              {/* Pricing format rows */}
              <div className="section-spacing">
                {pricingFormats.map((format) => (
                    <div
                      key={format.id}
                      className="format-row"
                    >
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setPricingFormats((prev) => prev.filter((row) => row.id !== format.id))
                        }
                        className="format-delete-button"
                        aria-label="Remove pricing format"
                      >
                        <Trash2 className="format-delete-icon" />
                      </button>
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
                            {openPricingDropdown === format.id && (
                                <div className="pricing-dropdown pricing-dropdown-container">
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
                            <h3 className="text-lg font-semibold text-gray-800">Pricing Inputs</h3>
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
                              <ChevronDown className={`w-6 h-6 transition-transform ${format.isPricingPanelsCollapsed ? '' : 'rotate-180'}`} />
                            </button>
                          </div>
                          
                          {/* Four Sections in Two Rows - Collapsible */}
                          {!format.isPricingPanelsCollapsed && (
                            <>
                          {/* Grid Container with Centered Plus */}
                          <div className="relative grid grid-cols-2 gap-8">
                            {/* First Row: Rates and Expenses */}
                            {['rates', 'expenses'].map((sectionType, sectionIndex) => {
                              const sectionLabel = sectionType.charAt(0).toUpperCase() + sectionType.slice(1);
                              const baseOptions = pricingStructureOptions[sectionType] || [];
                              const customOptions = customPricingStructureOptions?.[sectionType] || [];
                              const sectionOptions = [...baseOptions, ...customOptions].sort();
                              const selectedItems = format.pricingStructure?.[sectionType] || [];
                              const dropdownKey = `${format.id}-${sectionType}`;
                              const isDropdownOpen = openPricingStructureDropdown?.[dropdownKey] || false;
                              
                              return (
                                <React.Fragment key={sectionType}>
                                  <div className="relative min-w-0 max-w-full border-2 border-gray-300 rounded-2xl px-4 py-3 bg-slate-50/60 shadow-md flex flex-col">
                                    {/* Section Label */}
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex-shrink-0">{sectionLabel}</label>
                                    
                                    {/* Section Dropdown */}
                                    <div className="relative mb-2 pricing-structure-dropdown-container flex-shrink-0">
                                      <div className="flex items-center gap-2">
                                        <button
                                          type="button"
                                          onClick={() => setOpenPricingStructureDropdown(prev => ({
                                            ...prev,
                                            [dropdownKey]: !prev[dropdownKey]
                                          }))}
                                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                                        >
                                          <span className={selectedItems.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                                            {selectedItems.length > 0
                                              ? `${selectedItems.length} selected`
                                              : `Select...`}
                                          </span>
                                          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setOpenPricingStructureDropdown(prev => ({
                                            ...prev,
                                            [dropdownKey]: !prev[dropdownKey]
                                          }))}
                                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                                          title="Add item"
                                        >
                                          <Plus className="w-4 h-4 text-gray-600" />
                                        </button>
                                      </div>
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
                                                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"
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
                                                  className="px-2 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
                                    <div className="flex-shrink-0 p-5 bg-white rounded-xl border border-gray-200 shadow-sm" style={{ height: '200px', maxHeight: '200px', overflowY: 'auto', overflowX: 'auto' }}>
                                      {selectedItems.length > 0 ? (
                                        <div className="space-y-2">
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
                                                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow min-w-0 max-w-full overflow-hidden"
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
                                </React.Fragment>
                              );
                            })}
                            
                            {/* Second Row: Multipliers and Fees */}
                            {['multipliers', 'fees'].map((sectionType, sectionIndex) => {
                              const sectionLabel = sectionType.charAt(0).toUpperCase() + sectionType.slice(1);
                              const baseOptions = pricingStructureOptions[sectionType] || [];
                              const customOptions = customPricingStructureOptions?.[sectionType] || [];
                              const sectionOptions = [...baseOptions, ...customOptions].sort();
                              const selectedItems = format.pricingStructure?.[sectionType] || [];
                              const dropdownKey = `${format.id}-${sectionType}`;
                              const isDropdownOpen = openPricingStructureDropdown?.[dropdownKey] || false;
                              
                              return (
                                <React.Fragment key={sectionType}>
                                  <div className="relative min-w-0 max-w-full border-2 border-gray-300 rounded-2xl px-4 py-3 bg-slate-50/60 shadow-md flex flex-col">
                                    {/* Section Label */}
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex-shrink-0">{sectionLabel}</label>
                                    
                                    {/* Section Dropdown */}
                                    <div className="relative mb-2 pricing-structure-dropdown-container flex-shrink-0">
                                      <div className="flex items-center gap-2">
                                        <button
                                          type="button"
                                          onClick={() => setOpenPricingStructureDropdown(prev => ({
                                            ...prev,
                                            [dropdownKey]: !prev[dropdownKey]
                                          }))}
                                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                                        >
                                          <span className={selectedItems.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                                            {selectedItems.length > 0
                                              ? `${selectedItems.length} selected`
                                              : `Select...`}
                                          </span>
                                          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setOpenPricingStructureDropdown(prev => ({
                                            ...prev,
                                            [dropdownKey]: !prev[dropdownKey]
                                          }))}
                                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                                          title="Add item"
                                        >
                                          <Plus className="w-4 h-4 text-gray-600" />
                                        </button>
                                      </div>
                                      {isDropdownOpen && (
                                        <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto pricing-structure-dropdown-container">
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
                                                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"
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
                                                  className="px-2 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
                                    <div className="flex-shrink-0 p-5 bg-white rounded-xl border border-gray-200 shadow-sm" style={{ height: '200px', maxHeight: '200px', overflowY: 'auto', overflowX: 'auto' }}>
                                      {selectedItems.length > 0 ? (
                                        <div className="space-y-2">
                                          {selectedItems.map((item, index) => {
                                            const needsValue = sectionType === 'multipliers' || sectionType === 'fees';
                                            const itemOption = needsValue && typeof item === 'object' ? item.option : item;
                                            const itemValue = needsValue && typeof item === 'object' ? (item.value || 0) : null;
                                            const itemPerUnit = sectionType === 'expenses' && typeof item === 'object' ? (item.perUnit || unitOptions[0] || 'Square Foot') : null;
                                            const itemKey = needsValue ? `${itemOption}-${index}` : item;
                                            
                                            return (
                                              <div
                                                key={itemKey}
                                                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow min-w-0 max-w-full overflow-hidden"
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
                                </React.Fragment>
                              );
                            })}
                            
                            {/* Plus Sign in Center - All Four Boxes Added Together */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center shrink-0">
                                <Plus className="w-6 h-6 text-gray-600" />
                              </div>
                            </div>
                          </div>
                          </>
                          )}
                        </div>
                      </div>

                      {/* Formula Summary */}
                      {(() => {
                        const structure = format.pricingStructure || {};
                        const rates = Array.isArray(structure.rates) ? structure.rates : [];
                        const expenses = Array.isArray(structure.expenses) ? structure.expenses : [];
                        const multipliers = Array.isArray(structure.multipliers) ? structure.multipliers : [];
                        const fees = Array.isArray(structure.fees) ? structure.fees : [];

                      const hasAny =
                        rates.length > 0 ||
                        expenses.length > 0 ||
                        multipliers.length > 0 ||
                        fees.length > 0;

                      if (!hasAny) return null;

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

                      // Build all formula elements
                      const allFormulaElements = [];
                      
                      // Add rates
                      rates.forEach((r) => {
                        const rateObj = r && typeof r === 'object' ? r : { option: r, value: null };
                        allFormulaElements.push({
                          type: 'rate',
                          label: rateObj.option,
                          value: rateObj.value ? parseFloat(rateObj.value) : 0,
                          display: rateObj.value ? `$${parseFloat(rateObj.value).toFixed(2)}` : '$0.00',
                          hasValue: !!rateObj.value,
                          inputValue: rateObj.value ? parseFloat(rateObj.value) : null,
                          inputUnit: null
                        });
                      });

                      // Add expenses
                      expenses.forEach((e) => {
                        const expObj = e && typeof e === 'object' ? e : { option: e, value: null, perUnit: null };
                        allFormulaElements.push({
                          type: 'expense',
                          label: expObj.option,
                          value: expObj.value ? parseFloat(expObj.value) : 0,
                          display: expObj.value ? `$${parseFloat(expObj.value).toFixed(2)}${expObj.perUnit ? `/${expObj.perUnit}` : ''}` : '$0.00',
                          perUnit: expObj.perUnit,
                          hasValue: !!expObj.value,
                          inputValue: expObj.value ? parseFloat(expObj.value) : null,
                          inputUnit: expObj.perUnit || null
                        });
                      });

                      // Add multipliers (as percentage additions)
                      multipliers.forEach((m) => {
                        const multObj = m && typeof m === 'object' ? m : { option: m, value: null };
                        const multValue = multObj.value ? parseFloat(multObj.value) : 0;
                        const multAmount = baseTotal > 0 ? (baseTotal * multValue / 100) : 0;
                        allFormulaElements.push({
                          type: 'multiplier',
                          label: multObj.option,
                          value: multAmount,
                          display: multObj.value ? `$${multAmount.toFixed(2)}` : '$0.00',
                          percentage: multValue,
                          hasValue: !!multObj.value,
                          inputValue: multValue > 0 ? multValue : null
                        });
                      });

                      // Add fees
                      fees.forEach((f) => {
                        const feeObj = f && typeof f === 'object' ? f : { option: f, value: null };
                        allFormulaElements.push({
                          type: 'fee',
                          label: feeObj.option,
                          value: feeObj.value ? parseFloat(feeObj.value) : 0,
                          display: feeObj.value ? `$${parseFloat(feeObj.value).toFixed(2)}` : '$0.00',
                          hasValue: !!feeObj.value,
                          inputValue: feeObj.value ? parseFloat(feeObj.value) : null
                        });
                      });

                      return (
                        allFormulaElements.length > 0 ? (
                          <div className="mt-4">
                            {/* Single Unified Formula */}
                            <div className="bg-white rounded-md p-4 border border-gray-200">
                                <div className="text-base font-bold text-gray-900 mb-3">Formula</div>
                                <div className="flex flex-wrap items-center gap-2 text-sm">
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
                                    
                                    return (
                                      <span key={idx} className="flex items-center gap-1.5">
                                        <span className="font-bold text-gray-900">
                                          {element.label}
                                          {typeLabel && ` ${typeLabel}`}
                                          {inputDisplay && (
                                            <span className="ml-1 font-normal text-gray-600">{inputDisplay}</span>
                                          )}
                                        </span>
                                        {idx < allFormulaElements.length - 1 && (
                                          <span className="text-lg font-medium text-gray-400 mx-1">+</span>
                                        )}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          ) : null
                      );
                    })()}
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
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Run Promotion</h2>
              </div>
              <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
              {/* Promotion rows */}
              <div className="space-y-3">
                {promotions.map((promotion) => (
                  <div
                    key={promotion.id}
                    className="border-2 border-gray-300 rounded-2xl px-4 py-3 bg-slate-50/60 space-y-3 relative shadow-md"
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
                                  <div className="flex items-center justify-between w-full mb-2">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                        <ShoppingCart className="w-4 h-4 text-gray-600" />
                                      </div>
                                      <div>
                                        <span className="text-sm font-semibold text-gray-800 block">Package Services</span>
                                        <span className="text-xs text-gray-500">Services included in this package</span>
                                      </div>
                                    </div>
                                  </div>
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
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                      <DollarSign className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-semibold text-gray-800 block">Package Price</span>
                                      <span className="text-xs text-gray-500">Flat price for all selected services</span>
                                    </div>
                                  </div>
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
    </div>
  );
};

export default PricingTool;
