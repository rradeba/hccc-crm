import React from 'react';
import { Bot, Phone, ChevronDown, Plus, X, Check, FileText, FileSignature, Receipt, HeartHandshake, Clock, Award, Shield, ShieldCheck, MapPin, Star } from 'lucide-react';
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
  return (<div className="my-business-container">
            {/* Quote Section */}
            <div className="quote-section">
              <div className="quote-content">
                <div className="quote-icon-wrapper">
                  <Bot className="quote-icon" />
                </div>
                <p className="quote-text">
                  <span className="quote-bold">Note:</span> The details you enter in the My Business section will be used to train your AI Sales Agent. Please provide complete and accurate information for the best performance.
                </p>
              </div>
            </div>

            {/* Company Information Section */}
            <div className="company-info-section">
              <div className="company-info-header">
                <h2 className="company-info-title">Company Information</h2>
              </div>
              
              <div className="space-y-6">
                {/* Contact Details */}
                <div 
                  className="collapsible-section"
                  onClick={() => setCollapsedContactDetails(!collapsedContactDetails)}
                >
                  <div className={`collapsible-header ${!collapsedContactDetails ? 'collapsible-header-expanded' : ''}`}>
                    <div className="section-icon-wrapper">
                      <Phone className="section-icon" />
                    </div>
                    <h3 className="section-title">Contact Details</h3>
                    {(() => {
                      const { completed, total } = getContactDetailsCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`completion-badge ${isComplete ? 'completion-badge-complete' : 'completion-badge-incomplete'}`}>
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
                      {/* Company Details Section */}
                      <div className="content-box">
                        <h4 className="content-box-title">Company Details</h4>
                        <div className="section-content">
                      <div className="form-field">
                        <label className="form-label">Company Name</label>
                        <input
                          type="text"
                          value={companyInfo.companyName}
                          onChange={(e) => updateCompanyInfo('companyName', e.target.value)}
                          placeholder="Enter company name"
                          className="form-input"
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          value={companyInfo.phone}
                          onChange={(e) => updateCompanyInfo('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="form-input"
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          value={companyInfo.email}
                          onChange={(e) => updateCompanyInfo('email', e.target.value)}
                          placeholder="contact@company.com"
                          className="form-input"
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label">Website</label>
                        <input
                          type="url"
                          value={companyInfo.website}
                          onChange={(e) => updateCompanyInfo('website', e.target.value)}
                          placeholder="https://www.yourcompany.com"
                          className="form-input"
                        />
                          </div>
                        </div>
                      </div>

                      {/* Address Section */}
                      <div className="content-box">
                        <h4 className="content-box-title">Address</h4>
                        <div className="section-content">
                          <div className="form-field">
                            <label className="form-label">Street Address</label>
                            <input
                              type="text"
                              value={companyInfo.street}
                              onChange={(e) => updateCompanyInfo('street', e.target.value)}
                              placeholder="123 Main Street"
                              className="form-input"
                            />
                          </div>

                          <div className="form-field">
                            <label className="form-label">Street Address Line 2 (Optional)</label>
                            <input
                              type="text"
                              value={companyInfo.street2}
                              onChange={(e) => updateCompanyInfo('street2', e.target.value)}
                              placeholder="Apartment, suite, unit, building, floor, etc."
                              className="form-input"
                            />
                          </div>

                          <div className="form-grid-2">
                            <div className="form-field">
                              <label className="form-label">City</label>
                              <input
                                type="text"
                                value={companyInfo.city}
                                onChange={(e) => updateCompanyInfo('city', e.target.value)}
                                placeholder="City"
                                className="form-input"
                              />
                            </div>

                            <div className="form-field">
                              <label className="form-label">State</label>
                              <input
                                type="text"
                                value={companyInfo.state}
                                onChange={(e) => updateCompanyInfo('state', e.target.value)}
                                placeholder="State"
                                className="form-input"
                              />
                            </div>
                          </div>

                          <div className="form-field">
                            <label className="form-label">ZIP Code</label>
                            <input
                              type="text"
                              value={companyInfo.zip}
                              onChange={(e) => updateCompanyInfo('zip', e.target.value)}
                              placeholder="12345"
                              className="form-input"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Social Media Section */}
                      <div className="content-box">
                        <h4 className="content-box-title">Social Media</h4>
                        <div className="section-content">
                          <div className="form-field">
                            <label className="form-label">Facebook</label>
                            <input
                              type="url"
                              value={companyInfo.facebook}
                              onChange={(e) => updateCompanyInfo('facebook', e.target.value)}
                              placeholder="https://www.facebook.com/yourpage"
                              className="form-input"
                            />
                          </div>

                          <div className="form-field">
                            <label className="form-label">Instagram</label>
                            <input
                              type="url"
                              value={companyInfo.instagram}
                              onChange={(e) => updateCompanyInfo('instagram', e.target.value)}
                              placeholder="https://www.instagram.com/yourhandle"
                              className="form-input"
                            />
                          </div>

                          <div className="form-field">
                            <label className="form-label">TikTok</label>
                            <input
                              type="url"
                              value={companyInfo.tiktok}
                              onChange={(e) => updateCompanyInfo('tiktok', e.target.value)}
                              placeholder="https://www.tiktok.com/@yourhandle"
                              className="form-input"
                            />
                          </div>

                          <div className="form-field">
                            <label className="form-label">Nextdoor</label>
                            <input
                              type="url"
                              value={companyInfo.nextdoor}
                              onChange={(e) => updateCompanyInfo('nextdoor', e.target.value)}
                              placeholder="Nextdoor profile URL"
                              className="form-input"
                            />
                          </div>

                          <div className="form-field">
                            <label className="form-label">Angie's List</label>
                            <input
                              type="url"
                              value={companyInfo.angiesList}
                              onChange={(e) => updateCompanyInfo('angiesList', e.target.value)}
                              placeholder="Angie's List profile URL"
                              className="form-input"
                            />
                          </div>

                          <div className="form-field">
                            <label className="form-label">Twitter</label>
                            <input
                              type="url"
                              value={companyInfo.twitter}
                              onChange={(e) => updateCompanyInfo('twitter', e.target.value)}
                              placeholder="https://twitter.com/yourhandle"
                              className="form-input"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Brand Identity */}
                <div 
                  className="collapsible-section"
                  onClick={() => setCollapsedBrandIdentity(!collapsedBrandIdentity)}
                >
                  <div className={`collapsible-header ${!collapsedBrandIdentity ? 'collapsible-header-expanded' : ''}`}>
                    <div className="section-icon-wrapper">
                      <Star className="section-icon" />
                    </div>
                    <h3 className="section-title">Brand Identity</h3>
                    {(() => {
                      const { completed, total } = getBrandIdentityCompletion();
                      const isComplete = completed === total;
                      return (
                        <div className={`completion-badge ${isComplete ? 'completion-badge-complete' : 'completion-badge-incomplete'}`}>
                          <span>{completed}/{total}</span>
                        </div>
                      );
                    })()}
                    <div className="collapsible-chevron-wrapper">
                      <ChevronDown 
                        className={`collapsible-chevron ${!collapsedBrandIdentity ? 'collapsible-chevron-expanded' : ''}`}
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

export default MyBusiness;