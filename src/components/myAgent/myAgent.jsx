import React, { useState } from 'react';
import { Settings, Check, Building2, Phone, Upload, Trash2, Plus, ChevronDown, X, ArrowRight } from 'lucide-react';
import './myAgent.css';

const MyAgent = ({
  agentFlowSteps,
  setAgentFlowSteps,
  connectedAccounts,
  setConnectedAccounts,
  isAgentSettingsOpen,
  setIsAgentSettingsOpen,
  agentName,
  setAgentName,
  agentTone,
  setAgentTone,
  emojiIntegration,
  setEmojiIntegration,
  leadFollowupEnabled,
  setLeadFollowupEnabled,
  leadFollowupFrequency,
  setLeadFollowupFrequency,
  leadFollowupDays,
  setLeadFollowupDays,
  leadFollowupDuration,
  setLeadFollowupDuration,
  leadFollowupDurationValue,
  setLeadFollowupDurationValue,
  leadFollowupDurationUnit,
  setLeadFollowupDurationUnit,
  weatherIntegrationEnabled,
  setWeatherIntegrationEnabled,
  dayBeforeJobEnabled,
  setDayBeforeJobEnabled,
  dayBeforeJobTime,
  setDayBeforeJobTime,
  dayBeforeJobInstructions,
  setDayBeforeJobInstructions,
  dayOfJobEnabled,
  setDayOfJobEnabled,
  dayOfJobTime,
  setDayOfJobTime,
  dayOfJobInstructions,
  setDayOfJobInstructions,
  editingStepId,
  setEditingStepId,
  promotions,
  softWashingServices,
  customSoftWashingServices,
  pressureWashingServices,
  customPressureWashingServices,
  specialtyCleaningServices,
  customSpecialtyCleaningServices,
  updateFlowStep
}) => {
  return (
    <div className="my-agent-container">
      {/* Header */}
      <div className="my-agent-header">
        <div>
          <h2 className="my-agent-title">My Agent</h2>
        </div>
        <button
          onClick={() => setIsAgentSettingsOpen(true)}
          className="settings-button"
          title="Agent Settings"
        >
          <Settings className="settings-icon" />
        </button>
      </div>

      {/* Connect Agent Section */}
      <div className="connect-agent-section">
        <div className="connect-agent-title">
          <h3 className="connect-agent-title-text">Connect Agent to Business Accounts:</h3>
        </div>
        <div className="connect-agent-grid">
          {/* Facebook */}
          <button
            type="button"
            className="account-button account-button-blue"
          >
            {connectedAccounts.facebook && (
              <div className="connected-badge">
                <Check className="connected-check" strokeWidth={3} />
              </div>
            )}
            <div className="account-icon-container">
              <svg className="account-icon-svg" viewBox="0 0 24 24" fill="none">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
            </div>
            <span className="account-label">Facebook</span>
          </button>

          {/* Instagram */}
          <button
            type="button"
            className="account-button account-button-pink"
          >
            {connectedAccounts.instagram && (
              <div className="connected-badge">
                <Check className="connected-check" strokeWidth={3} />
              </div>
            )}
            <div className="account-icon-container" style={{ padding: '0.25rem' }}>
              <svg className="account-icon-svg" viewBox="0 0 24 24" fill="none">
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
            <span className="account-label">Instagram</span>
          </button>

          {/* TikTok */}
          <button
            type="button"
            className="account-button account-button-black"
          >
            {connectedAccounts.tiktok && (
              <div className="connected-badge">
                <Check className="connected-check" strokeWidth={3} />
              </div>
            )}
            <div className="account-icon-container account-icon-container-black">
              <svg className="account-icon-svg" viewBox="0 0 24 24" fill="none">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#FFFFFF"/>
              </svg>
            </div>
            <span className="account-label">TikTok</span>
          </button>

          {/* Website */}
          <button
            type="button"
            className="account-button account-button-emerald"
          >
            {connectedAccounts.website && (
              <div className="connected-badge">
                <Check className="connected-check" strokeWidth={3} />
              </div>
            )}
            <div className="account-icon-container account-icon-container-emerald">
              <Building2 className="account-icon" />
            </div>
            <span className="account-label">Website</span>
          </button>

          {/* SMS and Call */}
          <button
            type="button"
            className="account-button account-button-red"
          >
            {connectedAccounts.sms && (
              <div className="connected-badge">
                <Check className="connected-check" strokeWidth={3} />
              </div>
            )}
            <div className="account-icon-container account-icon-container-red">
              <Phone className="account-icon" />
            </div>
            <span className="account-label">SMS and Call</span>
          </button>
        </div>
      </div>

      {/* Sales Flow Section */}
      <div className="sales-flow-display-section">
        <div className="sales-flow-display-title">
          <h3 className="sales-flow-display-title-text">Sales Flow:</h3>
        </div>
        <div className="sales-flow-stages-container">
          {['Contact', 'Qualify Lead', 'Assess Needs', 'Send Estimate', 'Follow-Up', 'Close Sale', 'Fullfill Job', 'Post-Sale'].map((stage, index) => (
            <div key={stage} className="sales-flow-stage-item">
              <div className="sales-flow-stage-box">
                <span className="sales-flow-stage-number">{index + 1}</span>
                <span className="sales-flow-stage-text">{stage}</span>
                <ChevronDown className="sales-flow-stage-caret" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Sales Flowchart */}
      {/* Sales Flow Hooks Section */}
      <div className="sales-flow-section">
        <div className="sales-flow-title">
          <h3 className="sales-flow-title-text">Sales Flow Hooks</h3>
        </div>

        <div className="section-spacing">
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
                              <div key={item.id} className="media-item">
                                {item.media ? (
                                  <div className="media-preview">
                                    {item.media instanceof File && item.media.type.startsWith('image/') ? (
                                      <div className="media-preview-container">
                                        <img 
                                          src={URL.createObjectURL(item.media)} 
                                          alt="Uploaded" 
                                          className="media-preview-image"
                                        />
                                        <button
                                          onClick={() => clearMediaFromItem(item.id)}
                                          className="media-remove-button"
                                          type="button"
                                        >
                                          <X className="media-remove-icon" />
                                        </button>
                                      </div>
                                    ) : item.media instanceof File && item.media.type.startsWith('video/') ? (
                                      <div className="media-preview-container">
                                        <video 
                                          src={URL.createObjectURL(item.media)} 
                                          controls
                                          className="media-preview-video"
                                        />
                                        <button
                                          onClick={() => clearMediaFromItem(item.id)}
                                          className="media-remove-button"
                                          type="button"
                                        >
                                          <X className="media-remove-icon" />
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
                                    className="description-textarea description-textarea-sm"
                                    placeholder="Add description..."
                                  />
                                )}
                              </div>
                            ))}
                            
                            {displayItems.length < 1 && (
                              <button
                                onClick={addMediaItem}
                                className="add-media-button"
                                type="button"
                              >
                                <Plus className="add-media-icon" />
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
                    <div className="service-dropdown">
                      <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="service-dropdown-button"
                      >
                        <span className="service-dropdown-text">
                          {selectedService || 'Select service'}
                        </span>
                        <ChevronDown className={`service-dropdown-chevron ${isOpen ? 'service-dropdown-chevron-open' : ''}`} />
                      </button>
                      
                      {isOpen && (
                        <>
                          <div 
                            className="service-dropdown-overlay" 
                            onClick={() => setIsOpen(false)}
                          />
                          <div className="service-dropdown-menu">
                            <div className="service-dropdown-search">
                              <input
                                type="text"
                                placeholder="Search services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="service-dropdown-search-input"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div className="service-dropdown-list">
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
                                    className={`service-dropdown-item ${selectedService === service ? 'service-dropdown-item-selected' : ''}`}
                                  >
                                    {service}
                                  </button>
                                ))
                              ) : (
                                <div className="service-dropdown-empty">
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
                  <div className="photo-upload-box">
                    <label className="photo-upload-label">
                      <div className="photo-upload-content">
                        <Upload className="photo-upload-icon" />
                        <p className="photo-upload-text">Add photo or video</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="photo-upload-input"
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
                        className="photo-delete-button"
                        type="button"
                      >
                        <Trash2 className="photo-delete-icon" />
                      </button>
                    )}
                  </div>
                );
                
                return (
                  <div key={step.id} className="step-container">
                    <div className="step-box">
                      <div className="step-content">
                        <h4 className="step-name">{step.name}</h4>
                        
                        <div className="section-spacing">
                          <div className="media-items-container">
                            {displayItems.map((item, itemIndex) => (
                              <div key={item.id} className="media-item">
                                {item.media ? (
                                  <div className="media-preview">
                                    {item.media instanceof File && item.media.type.startsWith('image/') ? (
                                      <div className="media-preview-container">
                                        <img 
                                          src={URL.createObjectURL(item.media)} 
                                          alt="Uploaded" 
                                          className="media-preview-image"
                                        />
                                        <button
                                          onClick={() => clearMediaFromItem(item.id)}
                                          className="media-remove-button"
                                          type="button"
                                        >
                                          <X className="media-remove-icon" />
                                        </button>
                                      </div>
                                    ) : item.media instanceof File && item.media.type.startsWith('video/') ? (
                                      <div className="media-preview-container">
                                        <video 
                                          src={URL.createObjectURL(item.media)} 
                                          controls
                                          className="media-preview-video"
                                        />
                                        <button
                                          onClick={() => clearMediaFromItem(item.id)}
                                          className="media-remove-button"
                                          type="button"
                                        >
                                          <X className="media-remove-icon" />
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
                                    className="description-textarea description-textarea-sm"
                                    placeholder="Add description..."
                                  />
                                )}
                              </div>
                            ))}
                            
                            <button
                              onClick={addMediaItem}
                              className="add-media-button"
                              type="button"
                            >
                              <Plus className="add-media-icon" />
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
                  <div key={step.id} className="step-container">
                    <div className="step-box">
                      <div className="step-content">
                        <h4 className="step-name">{step.name}</h4>
                        
                        <div className="section-spacing">
                          {/* Customer Reviews Section */}
                          <div className="reviews-section">
                            <h5 className="reviews-title">Customer Reviews</h5>
                            <div className="section-spacing">
                              {customerReviews.map((review, index) => (
                                <div key={index} className="review-item">
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
                                    className="review-textarea review-textarea-md"
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
                                    className="review-remove-button"
                                    type="button"
                                  >
                                    <X className="review-remove-icon" />
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
                                  className="add-review-button"
                                  type="button"
                                >
                                  <Plus className="add-review-icon" />
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
                <div key={step.id} className="step-container">
                  <div className={`step-box ${!isPersonalGreeting && !isSalesPitchHooks && !isReviewsTestimonials ? 'step-box-editable' : ''}`}>
                    <div className="step-content">
                        {/* Step Name */}
                        {isEditing ? (
                          <div className="editing-step">
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
                              className="step-edit-input step-edit-input-lg"
                              placeholder="Step Name"
                              autoFocus
                            />
                            <input
                              type="text"
                              value={step.principle || ''}
                              onChange={(e) => updateFlowStep(step.id, 'principle', e.target.value)}
                              className="step-edit-input step-edit-input-md"
                              placeholder="Principle"
                            />
                            <textarea
                              value={step.description || ''}
                              onChange={(e) => updateFlowStep(step.id, 'description', e.target.value)}
                              rows={2}
                              className="step-edit-textarea step-edit-textarea-sm"
                              placeholder="Description"
                            />
                            
                            {/* Photo/Video Upload Section */}
                            <div className="media-upload-section">
                              <label className="media-upload-label">Photo/Video</label>
                              <div className="section-spacing">
                                {step.media ? (
                                  <div className="media-preview">
                                    {step.media instanceof File && step.media.type.startsWith('image/') ? (
                                      <div className="media-preview-large">
                                        <img 
                                          src={URL.createObjectURL(step.media)} 
                                          alt="Uploaded" 
                                          className="media-preview-image-large"
                                        />
                                        <button
                                          onClick={() => updateFlowStep(step.id, 'media', null)}
                                          className="media-remove-button"
                                          type="button"
                                        >
                                          <X className="media-remove-icon" />
                                        </button>
                                      </div>
                                    ) : step.media instanceof File && step.media.type.startsWith('video/') ? (
                                      <div className="media-preview-large">
                                        <video 
                                          src={URL.createObjectURL(step.media)} 
                                          controls
                                          className="media-preview-video-large"
                                        />
                                        <button
                                          onClick={() => updateFlowStep(step.id, 'media', null)}
                                          className="media-remove-button"
                                          type="button"
                                        >
                                          <X className="media-remove-icon" />
                                        </button>
                                      </div>
                                    ) : null}
                                  </div>
                                ) : (
                                  <label className="media-upload-box">
                                    <div className="media-upload-content">
                                      <Upload className="media-upload-icon-lg" />
                                      <p className="media-upload-text-lg">Click to upload photo or video</p>
                                      <p className="media-upload-hint">PNG, JPG, MP4, MOV</p>
                                    </div>
                                    <input
                                      type="file"
                                      accept="image/*,video/*"
                                      className="photo-upload-input"
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
                                  className="step-edit-textarea step-edit-textarea-sm"
                                  placeholder="Add a description for the photo/video..."
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => setEditingStepId(step.id)}
                            className="view-mode"
                          >
                            <h4 className="step-name">{step.name}</h4>
                            {step.principle && (
                              <p className="step-principle">"{step.principle}"</p>
                            )}
                            {step.description && (
                              <p className="step-description">{step.description}</p>
                            )}
                            
                            {/* Display Media in View Mode */}
                            {step.media && (
                              <div className="view-media-section">
                                <div className="view-media-container">
                                  {step.media instanceof File && step.media.type?.startsWith('image/') ? (
                                    <img 
                                      src={URL.createObjectURL(step.media)} 
                                      alt="Step media" 
                                      className="view-media-image"
                                    />
                                  ) : step.media instanceof File && step.media.type?.startsWith('video/') ? (
                                    <video 
                                      src={URL.createObjectURL(step.media)} 
                                      controls
                                      className="view-media-video"
                                    />
                                  ) : null}
                                </div>
                                {step.mediaDescription && (
                                  <p className="view-media-description">{step.mediaDescription}</p>
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
              <div key="promotions" className="step-container">
                <div className="step-box">
                  <div className="step-content">
                    <h4 className="promotions-title">Live Promotions</h4>
                    
                    <div className="section-spacing">
                      {livePromotions.length > 0 ? (
                        <div className="section-spacing">
                          {livePromotions.map((promo) => (
                            <div 
                              key={promo.id} 
                              className="promotion-item"
                            >
                              <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: 'rgb(34 197 94)', marginTop: '0.375rem', flexShrink: 0 }}></div>
                              <div className="promotion-content">
                                <p className="promotion-text">
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
      <div className="lead-followup-section">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="lead-followup-title">Lead Followup</h3>
          <label className="toggle-container" style={{ cursor: 'pointer' }}>
            <span className="toggle-label">Enable Followup</span>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={leadFollowupEnabled}
                onChange={(e) => setLeadFollowupEnabled(e.target.checked)}
                className="toggle-input"
              />
              <div className="toggle-slider"></div>
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
      <div className="weather-section">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="weather-title">Weather</h3>
          <label className="toggle-container" style={{ cursor: 'pointer' }}>
            <span className="toggle-label">Integrate Weather Data</span>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={weatherIntegrationEnabled}
                onChange={(e) => setWeatherIntegrationEnabled(e.target.checked)}
                className="toggle-input"
              />
              <div className="toggle-slider"></div>
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
      <div className="job-reminders-section">
        <div className="mb-6">
          <h3 className="job-reminders-title">Before-Job Reminders</h3>
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
        <div className="modal-overlay" onClick={() => setIsAgentSettingsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Agent Settings</h3>
              <button
                onClick={() => setIsAgentSettingsOpen(false)}
                className="modal-close"
              >
                <X className="modal-close-icon" />
              </button>
            </div>
            
            <div className="space-y-6">
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
                  console.log('Saving agent settings:', { agentTone, emojiIntegration });
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
            className="save-button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAgent;