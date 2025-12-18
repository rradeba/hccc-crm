import React from 'react';
import { Plus, Trash2, ChevronDown, X } from 'lucide-react';
import './pricingTool.css';

const PricingTool = ({
  pricingFormats,
  setPricingFormats,
  openPricingDropdown,
  setOpenPricingDropdown,
  openPricingStructureDropdown,
  setOpenPricingStructureDropdown,
  pricingStructureOptions,
  softWashingServices,
  customSoftWashingServices,
  pressureWashingServices,
  customPressureWashingServices,
  specialtyCleaningServices,
  customSpecialtyCleaningServices,
  unitOptions,
}) => {
  return (<div className="pricing-tool-container">
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
                            {openPricingDropdown === format.id && (
                                <div className="pricing-dropdown">
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
                            <h3 className="text-lg font-semibold text-gray-800">Pricing Formula</h3>
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
                          <div className="flex items-center gap-4 mb-4 min-w-0 max-w-full">
                            {['rates', 'expenses'].map((sectionType, sectionIndex) => {
                              const sectionLabel = sectionType.charAt(0).toUpperCase() + sectionType.slice(1);
                              const sectionOptions = pricingStructureOptions[sectionType];
                              const selectedItems = format.pricingStructure?.[sectionType] || [];
                              const dropdownKey = `${format.id}-${sectionType}`;
                              const isDropdownOpen = openPricingStructureDropdown[dropdownKey];
                              
                              return (
                                <React.Fragment key={sectionType}>
                                  <div className="flex-1 relative min-w-0 max-w-full">
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
                          <div className="flex items-center gap-4 min-w-0 max-w-full">
                            {['multipliers', 'fees'].map((sectionType, sectionIndex) => {
                              const sectionLabel = sectionType.charAt(0).toUpperCase() + sectionType.slice(1);
                              const sectionOptions = pricingStructureOptions[sectionType];
                              const selectedItems = format.pricingStructure?.[sectionType] || [];
                              const dropdownKey = `${format.id}-${sectionType}`;
                              const isDropdownOpen = openPricingStructureDropdown[dropdownKey];
                              
                              return (
                                <React.Fragment key={sectionType}>
                                  <div className="flex-1 relative min-w-0 max-w-full">
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

                      const rateText = rates
                        .map((r) =>
                          r && typeof r === 'object'
                            ? `${r.option}${r.value ? ` = $${r.value}` : ''}`
                            : r
                        )
                        .join('  +  ');

                      const expenseText = expenses
                        .map((e) =>
                          e && typeof e === 'object'
                            ? `${e.option}${e.value ? ` = $${e.value}` : ''}${
                                e.perUnit ? ` / ${e.perUnit}` : ''
                              }`
                            : e
                        )
                        .join('  +  ');

                      const multiplierText = multipliers
                        .map((m) =>
                          m && typeof m === 'object'
                            ? `${m.option}${m.value ? ` = ${m.value}%` : ''}`
                            : m
                        )
                        .join('  +  ');

                      const feeText = fees
                        .map((f) =>
                          f && typeof f === 'object'
                            ? `${f.option}${f.value ? ` = $${f.value}` : ''}`
                            : f
                        )
                        .join('  +  ');

                      return (
                        <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
                          <div className="text-sm font-semibold text-slate-900 mb-1">
                            Formula Overview
                            </div>
                          {rateText && (
                            <div>
                              <span className="font-medium">Rates:</span>{' '}
                              <span>{rateText}</span>
                          </div>
                          )}
                          {expenseText && (
                            <div>
                              <span className="font-medium">Expenses:</span>{' '}
                              <span>{expenseText}</span>
                        </div>
                          )}
                          {multiplierText && (
                            <div>
                              <span className="font-medium">Multipliers:</span>{' '}
                              <span>{multiplierText}</span>
                      </div>
                          )}
                          {feeText && (
                            <div>
                              <span className="font-medium">Fees:</span>{' '}
                              <span>{feeText}</span>
                    </div>
                          )}
                        </div>
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
                    <span>Smart Chat is drafting a responseâ€¦</span>
                  </div>
                )}
              </div>
              <form onSubmit={handleSmartChatSend} className="border-t border-gray-200 p-4 flex items-center space-x-3 bg-white">
                <textarea
                  value={smartChatInput}
                  onChange={(e) => setSmartChatInput(e.target.value)}
                  rows={2}
                  className="flex-1 resize-none px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ask Smart Chat to draft a reply, summarize jobs, or plan outreachâ€¦"
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
                  <li>â€¢ Draft personalized replies to leads</li>
                  <li>â€¢ Summarize upcoming jobs or campaign performance</li>
                  <li>â€¢ Brainstorm SMS/email scripts in seconds</li>
                  <li>â€¢ Keep conversations consistent across channels</li>
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">TikTok</label>
                            <input
                              type="url"
                              value={companyInfo.tiktok}
                              onChange={(e) => updateCompanyInfo('tiktok', e.target.value)}
                              placeholder="https://www.tiktok.com/@yourhandle"
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
                          <span>{completed}/1</span>
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
                          <span>{completed}/15</span>
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
                                            <div className="relative">
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
                                                  }
                                                }}
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-left bg-white flex items-center justify-between"
                                              >
                                                <span className="text-gray-500">Select or search a chemical...</span>
                                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${chemicalDropdownOpen[`${service}-chemical`] ? 'transform rotate-180' : ''}`} />
                                              </button>
                                              {chemicalDropdownOpen[`${service}-chemical`] && (
                                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
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
                                                        availableChemicals.map(chemical => (
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
                                                        ))
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
                                                        <div className="px-3 py-2 text-xs text-gray-500">No chemicals found</div>
                                                      );
                                                    })()}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
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
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">Surfaces:</label>
                                            <div className="relative">
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const dropdownKey = `${service}-surfaces`;
                                                  setSurfacesDropdownOpen(prev => ({
                                                    ...prev,
                                                    [dropdownKey]: !prev[dropdownKey]
                                                  }));
                                                }}
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-left bg-white flex items-center justify-between"
                                              >
                                                <span className="text-gray-500">
                                                  {(serviceSurfaces[service] || []).length > 0 
                                                    ? `${(serviceSurfaces[service] || []).length} selected`
                                                    : 'Select surfaces...'}
                                                </span>
                                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${surfacesDropdownOpen[`${service}-surfaces`] ? 'transform rotate-180' : ''}`} />
                                              </button>
                                              {surfacesDropdownOpen[`${service}-surfaces`] && (
                                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                                                  <div className="p-2 space-y-1">
                                                    {[...softWashingSurfaces, ...customSoftWashingSurfaces].map((surface) => {
                                                      const isSelected = (serviceSurfaces[service] || []).includes(surface);
                                                      return (
                                                        <label
                                                          key={surface}
                                                          className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                        >
                                                          <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={(e) => {
                                                              if (e.target.checked) {
                                                                addSurfaceToService(service, surface);
                                                              } else {
                                                                removeSurfaceFromService(service, surface);
                                                              }
                                                            }}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                          />
                                                          <span className="ml-2 text-sm text-gray-700">{surface}</span>
                                                        </label>
                                                      );
                                                    })}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            {(serviceSurfaces[service] || []).length > 0 && (
                                              <div className="mt-2 flex flex-wrap gap-1">
                                                {(serviceSurfaces[service] || []).map((surface) => (
                                                  <div key={surface} className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded">
                                                    <span>{surface}</span>
                                                    <button
                                                      type="button"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeSurfaceFromService(service, surface);
                                                      }}
                                                      className="text-blue-600 hover:text-blue-800"
                                                    >
                                                      <X className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
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
                                            <div className="relative">
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
                                                  }
                                                }}
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-left bg-white flex items-center justify-between"
                                              >
                                                <span className="text-gray-500">Select or search a chemical...</span>
                                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${chemicalDropdownOpen[`${service}-chemical`] ? 'transform rotate-180' : ''}`} />
                                              </button>
                                              {chemicalDropdownOpen[`${service}-chemical`] && (
                                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
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
                                                        availableChemicals.map(chemical => (
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
                                                        ))
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
                                                        <div className="px-3 py-2 text-xs text-gray-500">No chemicals found</div>
                                                      );
                                                    })()}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
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
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">Surfaces:</label>
                                            <div className="relative">
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const dropdownKey = `${service}-surfaces`;
                                                  setSurfacesDropdownOpen(prev => ({
                                                    ...prev,
                                                    [dropdownKey]: !prev[dropdownKey]
                                                  }));
                                                }}
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-left bg-white flex items-center justify-between"
                                              >
                                                <span className="text-gray-500">
                                                  {(serviceSurfaces[service] || []).length > 0 
                                                    ? `${(serviceSurfaces[service] || []).length} selected`
                                                    : 'Select surfaces...'}
                                                </span>
                                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${surfacesDropdownOpen[`${service}-surfaces`] ? 'transform rotate-180' : ''}`} />
                                              </button>
                                              {surfacesDropdownOpen[`${service}-surfaces`] && (
                                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                                                  <div className="p-2 space-y-1">
                                                    {[...softWashingSurfaces, ...customSoftWashingSurfaces].map((surface) => {
                                                      const isSelected = (serviceSurfaces[service] || []).includes(surface);
                                                      return (
                                                        <label
                                                          key={surface}
                                                          className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                        >
                                                          <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={(e) => {
                                                              if (e.target.checked) {
                                                                addSurfaceToService(service, surface);
                                                              } else {
                                                                removeSurfaceFromService(service, surface);
                                                              }
                                                            }}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                          />
                                                          <span className="ml-2 text-sm text-gray-700">{surface}</span>
                                                        </label>
                                                      );
                                                    })}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            {(serviceSurfaces[service] || []).length > 0 && (
                                              <div className="mt-2 flex flex-wrap gap-1">
                                                {(serviceSurfaces[service] || []).map((surface) => (
                                                  <div key={surface} className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded">
                                                    <span>{surface}</span>
                                                    <button
                                                      type="button"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeSurfaceFromService(service, surface);
                                                      }}
                                                      className="text-blue-600 hover:text-blue-800"
                                                    >
                                                      <X className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
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
                                            <div className="relative">
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
                                                  }
                                                }}
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-left bg-white flex items-center justify-between"
                                              >
                                                <span className="text-gray-500">Select or search a chemical...</span>
                                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${chemicalDropdownOpen[`${service}-chemical`] ? 'transform rotate-180' : ''}`} />
                                              </button>
                                              {chemicalDropdownOpen[`${service}-chemical`] && (
                                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
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
                                                        availableChemicals.map(chemical => (
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
                                                        ))
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
                                                        <div className="px-3 py-2 text-xs text-gray-500">No chemicals found</div>
                                                      );
                                                    })()}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
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
                                          <div className="pt-2 border-t border-slate-200">
                                            <label className="block text-xs font-medium text-gray-700 mb-2">Surfaces:</label>
                                            <div className="relative">
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const dropdownKey = `${service}-surfaces`;
                                                  setSurfacesDropdownOpen(prev => ({
                                                    ...prev,
                                                    [dropdownKey]: !prev[dropdownKey]
                                                  }));
                                                }}
                                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-left bg-white flex items-center justify-between"
                                              >
                                                <span className="text-gray-500">
                                                  {(serviceSurfaces[service] || []).length > 0 
                                                    ? `${(serviceSurfaces[service] || []).length} selected`
                                                    : 'Select surfaces...'}
                                                </span>
                                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${surfacesDropdownOpen[`${service}-surfaces`] ? 'transform rotate-180' : ''}`} />
                                              </button>
                                              {surfacesDropdownOpen[`${service}-surfaces`] && (
                                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                                                  <div className="p-2 space-y-1">
                                                    {[...specialtyCleaningSurfaces].map((surface) => {
                                                      const isSelected = (serviceSurfaces[service] || []).includes(surface);
                                                      return (
                                                        <label
                                                          key={surface}
                                                          className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                                        >
                                                          <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={(e) => {
                                                              if (e.target.checked) {
                                                                addSurfaceToService(service, surface);
                                                              } else {
                                                                removeSurfaceFromService(service, surface);
                                                              }
                                                            }}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                          />
                                                          <span className="ml-2 text-sm text-gray-700">{surface}</span>
                                                        </label>
                                                      );
                                                    })}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            {(serviceSurfaces[service] || []).length > 0 && (
                                              <div className="mt-2 flex flex-wrap gap-1">
                                                {(serviceSurfaces[service] || []).map((surface) => (
                                                  <div key={surface} className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded">
                                                    <span>{surface}</span>
                                                    <button
                                                      type="button"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeSurfaceFromService(service, surface);
                                                      }}
                                                      className="text-blue-600 hover:text-blue-800"
                                                    >
                                                      <X className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
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
                          
                    </div>
                  )}
                </div>
              </div>

              {/* Safety and Preventative Measures Section */}
              <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-200 p-6 mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety and Preventative Measures</h2>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSafetyMeasuresDropdownOpen(!safetyMeasuresDropdownOpen)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
                  >
                    <span className={allSafetyMeasures.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                      {allSafetyMeasures.length > 0
                        ? `${allSafetyMeasures.length} selected`
                        : 'Select safety and preventative measures...'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${safetyMeasuresDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  {safetyMeasuresDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                      <div className="p-2 space-y-1">
                        {(() => {
                          // Combine all safety measures from all categories
                          const combinedMeasures = [
                            ...safetyMeasures,
                            ...pressureWashingSafetyMeasures,
                            ...specialtyCleaningSafetyMeasures,
                            ...windowCleaningSafetyMeasures,
                            ...customSoftWashingSafetyMeasures,
                            ...customPressureWashingSafetyMeasures,
                            ...customSpecialtyCleaningSafetyMeasures,
                            ...customWindowCleaningSafetyMeasures,
                            ...customAllSafetyMeasures
                          ];
                          // Remove duplicates
                          const uniqueMeasures = [...new Set(combinedMeasures)];
                          
                          return uniqueMeasures.map((measure) => {
                            const isSelected = allSafetyMeasures.includes(measure);
                            return (
                              <label
                                key={measure}
                                className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    toggleAllSafetyMeasure(measure);
                                  }}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <span className="ml-2 text-sm text-gray-700">{measure}</span>
                              </label>
                            );
                          });
                        })()}
                      </div>
                      <div className="p-2 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newAllSafetyMeasure}
                            onChange={(e) => setNewAllSafetyMeasure(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addCustomAllSafetyMeasure()}
                            placeholder="Add custom measure..."
                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addCustomAllSafetyMeasure();
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                            disabled={!newAllSafetyMeasure.trim()}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {allSafetyMeasures.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {allSafetyMeasures.map((measure) => (
                      <div key={measure} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-lg">
                        <span>{measure}</span>
                        <button
                          type="button"
                          onClick={() => toggleAllSafetyMeasure(measure)}
                          className="text-blue-600 hover:text-blue-800 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
          </div>  );
};

export default PricingTool;