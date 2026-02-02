import React, { useState, useEffect, useRef } from 'react';
import { Settings, Check, Building2, Phone, Upload, Trash2, Plus, ChevronDown, ChevronUp, X, ArrowRight, Star, MessageSquare, Mail, AlertCircle, Pencil, Sparkles, HandHeart, Images, Briefcase, Globe, User, Tag } from 'lucide-react';
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
  editingStepId,
  setEditingStepId,
  promotions,
  softWashingServices,
  customSoftWashingServices,
  pressureWashingServices,
  customPressureWashingServices,
  specialtyCleaningServices,
  customSpecialtyCleaningServices,
  updateFlowStep,
  companyInfo,
  updateCompanyInfo,
  savedBrandIdentity,
  setSavedBrandIdentity,
  editingBrandIdentity,
  setEditingBrandIdentity,
  brandIdentitySaveAttempted,
  setBrandIdentitySaveAttempted,
  companyQualities,
  customCompanyQualities,
  setCustomCompanyQualities,
  newCompanyQuality,
  setNewCompanyQuality,
  toggleCompanyQuality,
  addCustomCompanyQuality,
  handleSaveBrandIdentity,
  savedCustomerReviews,
  setSavedCustomerReviews,
  customerReviewErrors,
  setCustomerReviewErrors,
  savedSalesFlowPromotions,
  setSavedSalesFlowPromotions,
  promotionErrors,
  setPromotionErrors,
  savedOnlineReviews,
  setSavedOnlineReviews,
  editingOnlineReviews,
  setEditingOnlineReviews,
  onlineReviewsSaveAttempted,
  setOnlineReviewsSaveAttempted,
  handleSaveOnlineReviews
}) => {
  // State for selected business account tab
  const [selectedAccountTab, setSelectedAccountTab] = useState('sms');
  
  // State for selected sales flow stage
  const [selectedSalesFlowStage, setSelectedSalesFlowStage] = useState('Contact Lead');
  
  // State for selected sales flow hook tab
  const [selectedSalesFlowHook, setSelectedSalesFlowHook] = useState('Personal Greeting');
  
  // State for forward calls and texts toggle
  const [forwardToPersonalPhone, setForwardToPersonalPhone] = useState(false);

  // State for Send Estimate - Request in person estimate toggle
  const [requestInPersonEstimate, setRequestInPersonEstimate] = useState(false);
  const [scheduleEstimateCall, setScheduleEstimateCall] = useState(false);

  // State for Lead Discovery - Schedule call if AI can't answer
  const [scheduleCallIfCantAnswer, setScheduleCallIfCantAnswer] = useState(true);
  const [allowCustomerCallback, setAllowCustomerCallback] = useState(false);
  const [offerCallback, setOfferCallback] = useState({ enabled: false, collectAvailability: true, collectPreferredTime: true, collectCallReason: true, callbackWindow: '24 hours' });

  // State for Lead Discovery followup
  const [leadDiscoveryFollowup, setLeadDiscoveryFollowup] = useState({ enabled: false, method: 'text', schedule: 'Daily', scheduleValue: '', times: ['9:00 AM'], day: 'Monday', dayOfMonth: '1st', duration: '', durationUnit: 'Days' });

  // State for Send Estimate followup
  const [sendEstimateFollowup, setSendEstimateFollowup] = useState({ enabled: false, method: 'text', schedule: 'Daily', scheduleValue: '', times: ['9:00 AM'], day: 'Monday', dayOfMonth: '1st', duration: '', durationUnit: 'Days' });

  // State for Send Contract followup
  const [sendContractFollowup, setSendContractFollowup] = useState({ enabled: false, method: 'text', schedule: 'Daily', scheduleValue: '', times: ['9:00 AM'], day: 'Monday', dayOfMonth: '1st', duration: '', durationUnit: 'Days' });
  const [autoSendContract, setAutoSendContract] = useState(false);
  const [autoRemindJob, setAutoRemindJob] = useState({ enabled: false, dayOf: true, dayBefore: true, time: '9:00 AM' });
  const [sendInvoiceFollowup, setSendInvoiceFollowup] = useState({ enabled: false, method: 'text', schedule: 'Daily', scheduleValue: '', times: ['9:00 AM'], day: 'Monday', dayOfMonth: '1st', duration: '', durationUnit: 'Days' });
  const [autoSendInvoice, setAutoSendInvoice] = useState(false);
  const [autoSendThankYou, setAutoSendThankYou] = useState(false);
  const [autoSendJobReview, setAutoSendJobReview] = useState(false);

  // State for OAuth modals
  const [showFacebookOAuthModal, setShowFacebookOAuthModal] = useState(false);
  const [showInstagramOAuthModal, setShowInstagramOAuthModal] = useState(false);
  const [showTikTokOAuthModal, setShowTikTokOAuthModal] = useState(false);
  const [showGmailOAuthModal, setShowGmailOAuthModal] = useState(false);
  const [showOutlookOAuthModal, setShowOutlookOAuthModal] = useState(false);

  // State for Contact Lead - Lead Response
  const [leadResponseContent, setLeadResponseContent] = useState('');
  const [savedLeadResponse, setSavedLeadResponse] = useState('');
  const [editingLeadResponse, setEditingLeadResponse] = useState(false);
  const [leadResponseSaveAttempted, setLeadResponseSaveAttempted] = useState(false);
  const [leadResponseHooks, setLeadResponseHooks] = useState([]);
  const [leadResponseHooksOpen, setLeadResponseHooksOpen] = useState(false);
  const [leadResponseAICustomized, setLeadResponseAICustomized] = useState(true);

  // State for outreach method preferences
  const [initialOutreach, setInitialOutreach] = useState({ method: 'text', contactWithin: 'Immediately', contactWithinValue: '', followupEnabled: false, followupSchedule: 'Daily', followupScheduleValue: '', followupTime: '9:00 AM', followupDay: 'Monday', followupDayOfMonth: '1st', followupDuration: '', followupDurationUnit: 'Days', hooks: [] });
  const [secondFallback, setSecondFallback] = useState({ method: 'call', contactWithin: 'Minutes', contactWithinValue: '5', followupEnabled: false, followupSchedule: 'Daily', followupScheduleValue: '', followupTime: '9:00 AM', followupDay: 'Monday', followupDayOfMonth: '1st', followupDuration: '', followupDurationUnit: 'Days', hooks: [] });
  const [thirdFallback, setThirdFallback] = useState({ method: 'email', contactWithin: 'Minutes', contactWithinValue: '10', followupEnabled: false, followupSchedule: 'Daily', followupScheduleValue: '', followupTime: '9:00 AM', followupDay: 'Monday', followupDayOfMonth: '1st', followupDuration: '', followupDurationUnit: 'Days', hooks: [] });
  const [showSecondFallback, setShowSecondFallback] = useState(false);
  const [showThirdFallback, setShowThirdFallback] = useState(false);

  // State for hooks dropdown
  const [initialHooksDropdownOpen, setInitialHooksDropdownOpen] = useState(false);
  const [secondHooksDropdownOpen, setSecondHooksDropdownOpen] = useState(false);
  const [thirdHooksDropdownOpen, setThirdHooksDropdownOpen] = useState(false);

  // Refs for hooks dropdowns (click outside to close)
  const initialHooksDropdownRef = useRef(null);
  const secondHooksDropdownRef = useRef(null);
  const thirdHooksDropdownRef = useRef(null);

  // Click outside handler for hooks dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (initialHooksDropdownRef.current && !initialHooksDropdownRef.current.contains(event.target)) {
        setInitialHooksDropdownOpen(false);
      }
      if (secondHooksDropdownRef.current && !secondHooksDropdownRef.current.contains(event.target)) {
        setSecondHooksDropdownOpen(false);
      }
      if (thirdHooksDropdownRef.current && !thirdHooksDropdownRef.current.contains(event.target)) {
        setThirdHooksDropdownOpen(false);
      }
      // Close services dropdown if click is outside
      const servicesDropdown = document.querySelector('[data-services-dropdown="true"]');
      if (servicesDropdown && !servicesDropdown.contains(event.target)) {
        setOpenServicesDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Available contact methods
  const contactMethodOptions = [
    { id: 'text', label: 'Text' },
    { id: 'call', label: 'Call' },
    { id: 'email', label: 'Email' }
  ];

  // Contact within timing options
  const contactWithinOptions = ['Immediately', 'Minutes', 'Hours', 'Days'];

  // Followup schedule options
  const followupScheduleOptions = ['Daily', 'Days', 'Weekly', 'Weeks', 'Monthly', 'Months'];
  const followupTimeOptions = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
  const followupDayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const followupDayOfMonthOptions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th'];
  const followupDurationUnitOptions = ['Days', 'Weeks', 'Months'];

  // State for Contact Lead - Cold Outreach
  const [coldOutreachContent, setColdOutreachContent] = useState('');
  const [savedColdOutreach, setSavedColdOutreach] = useState('');
  const [editingColdOutreach, setEditingColdOutreach] = useState(false);
  const [coldOutreachSaveAttempted, setColdOutreachSaveAttempted] = useState(false);
  const [coldOutreachHooks, setColdOutreachHooks] = useState([]);

  // State for Promotions and Customer Reviews save attempts
  const [promotionsSaveAttempted, setPromotionsSaveAttempted] = useState(false);
  const [customerReviewsSaveAttempted, setCustomerReviewsSaveAttempted] = useState(false);
  const [openServicesDropdownId, setOpenServicesDropdownId] = useState(null);
  const [coldOutreachHooksOpen, setColdOutreachHooksOpen] = useState(false);
  const [coldOutreachAICustomized, setColdOutreachAICustomized] = useState(true);

  // Lead Engagement Hooks options with icons and colors
  const salesFlowHookOptions = [
    { name: 'Personal Greeting', icon: MessageSquare, color: 'text-blue-600' },
    { name: 'Job Demos', icon: Star, color: 'text-purple-600' },
    { name: 'Before & After', icon: ArrowRight, color: 'text-green-600' },
    { name: 'Company Slogan', icon: MessageSquare, color: 'text-lime-600' },
    { name: 'Experience', icon: Briefcase, color: 'text-amber-600' },
    { name: 'Company Qualities', icon: Star, color: 'text-cyan-600' },
    { name: 'Customer Reviews', icon: User, color: 'text-rose-600' },
    { name: 'Online Reviews', icon: Globe, color: 'text-violet-600' }
  ];
  

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
        
        {/* Two Column Layout: 20% Tabs | 80% Content */}
        <div className="flex gap-4">
          {/* Left Column - Tabs (20%) */}
          <div className="min-w-[160px] flex flex-col flex-shrink-0">
            {/* SMS and Call Tab */}
          <button
            type="button"
              onClick={() => setSelectedAccountTab('sms')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all active:bg-slate-200 ${
                selectedAccountTab === 'sms'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">SMS & Call</span>
            </button>

            {/* Email Tab */}
            <button
              type="button"
              onClick={() => setSelectedAccountTab('email')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all active:bg-slate-200 ${
                selectedAccountTab === 'email'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
            </div>
              <span className="text-sm font-medium text-gray-700">Email</span>
          </button>

            {/* Facebook Tab */}
            <button
              type="button"
              onClick={() => setSelectedAccountTab('facebook')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all active:bg-slate-200 ${
                selectedAccountTab === 'facebook'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
            </div>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>

            {/* Instagram Tab */}
          <button
            type="button"
              onClick={() => setSelectedAccountTab('instagram')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all active:bg-slate-200 ${
                selectedAccountTab === 'instagram'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Instagram</span>
            </button>

            {/* TikTok Tab */}
            <button
              type="button"
              onClick={() => setSelectedAccountTab('tiktok')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all active:bg-slate-200 ${
                selectedAccountTab === 'tiktok'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#FFFFFF"/>
              </svg>
            </div>
              <span className="text-sm font-medium text-gray-700">TikTok</span>
          </button>
          </div>

          {/* Right Column - Content (80%) */}
          <div className="flex-1 bg-slate-50 rounded-2xl p-6 h-full relative">
            {selectedAccountTab === 'facebook' ? (
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Connect Facebook Account</h4>
                <p className="text-sm text-gray-600 mb-6">
                  Connect your Facebook business page to allow your AI agent to interact with customers on Facebook.
                </p>
          <button
                  onClick={() => setShowFacebookOAuthModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Connect Facebook
                </button>

                {/* Facebook OAuth Modal */}
                {showFacebookOAuthModal && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl z-10">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Connect to Facebook</h3>
                        <button
                          onClick={() => setShowFacebookOAuthModal(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          You will be redirected to Facebook to authorize access to your business page. 
                          This allows your AI agent to:
                        </p>
                        
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                          <li>Read and respond to messages</li>
                          <li>Post updates and content</li>
                          <li>Access page insights</li>
                          <li>Manage comments and reviews</li>
                        </ul>
                        
                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={() => {
                              // Facebook OAuth redirect
                              const facebookOAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/facebook/callback')}&scope=pages_manage_posts,pages_read_engagement,pages_messaging,pages_manage_metadata&response_type=code`;
                              window.location.href = facebookOAuthUrl;
                            }}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            Continue to Facebook
                          </button>
                          <button
                            onClick={() => setShowFacebookOAuthModal(false)}
                            className="px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
              </div>
            )}
            </div>
            ) : selectedAccountTab === 'instagram' ? (
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Connect Instagram Account</h4>
                <p className="text-sm text-gray-600 mb-6">
                  Connect your Instagram business account to allow your AI agent to interact with customers on Instagram.
                </p>
                <button
                  onClick={() => setShowInstagramOAuthModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-lg hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Connect Instagram
          </button>

                {/* Instagram OAuth Modal */}
                {showInstagramOAuthModal && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl z-10">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Connect to Instagram</h3>
          <button
                          onClick={() => setShowInstagramOAuthModal(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          You will be redirected to Instagram to authorize access to your business account. 
                          This allows your AI agent to:
                        </p>
                        
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                          <li>Read and respond to direct messages</li>
                          <li>Post photos and stories</li>
                          <li>Access insights and analytics</li>
                          <li>Manage comments on posts</li>
                        </ul>
                        
                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={() => {
                              // Instagram OAuth redirect (uses Facebook OAuth as Instagram is owned by Meta)
                              const instagramOAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/instagram/callback')}&scope=instagram_basic,instagram_manage_messages,instagram_manage_comments,instagram_content_publish&response_type=code`;
                              window.location.href = instagramOAuthUrl;
                            }}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-lg hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-colors font-medium"
                          >
                            Continue to Instagram
                          </button>
                          <button
                            onClick={() => setShowInstagramOAuthModal(false)}
                            className="px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
              </div>
            )}
            </div>
            ) : selectedAccountTab === 'tiktok' ? (
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Connect TikTok Account</h4>
                <p className="text-sm text-gray-600 mb-6">
                  Connect your TikTok business account to allow your AI agent to interact with customers on TikTok.
                </p>
                <button
                  onClick={() => setShowTikTokOAuthModal(true)}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  Connect TikTok
          </button>

                {/* TikTok OAuth Modal */}
                {showTikTokOAuthModal && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl z-10">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Connect to TikTok</h3>
          <button
                          onClick={() => setShowTikTokOAuthModal(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          You will be redirected to TikTok to authorize access to your business account. 
                          This allows your AI agent to:
                        </p>
                        
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                          <li>Read and respond to comments</li>
                          <li>Post videos and content</li>
                          <li>Access video analytics</li>
                          <li>Manage direct messages</li>
                        </ul>
                        
                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={() => {
                              // TikTok OAuth redirect
                              const tiktokOAuthUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=YOUR_CLIENT_KEY&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/tiktok/callback')}&scope=user.info.basic,video.list,video.upload&response_type=code`;
                              window.location.href = tiktokOAuthUrl;
                            }}
                            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                          >
                            Continue to TikTok
                          </button>
                          <button
                            onClick={() => setShowTikTokOAuthModal(false)}
                            className="px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
              </div>
            )}
            </div>
            ) : selectedAccountTab === 'email' ? (
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Connect Email Accounts</h4>
                <p className="text-sm text-gray-600 mb-6">
                  Connect your email accounts to allow your AI agent to interact with customers via email.
                </p>
                
                <div className="space-y-4">
                  {/* Gmail Button */}
                  <button
                    onClick={() => setShowGmailOAuthModal(true)}
                    className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-3"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
                      <path d="M0 5.457v.728l12 9 12-9v-.728c0-.8-.291-1.455-.818-1.964L12 9.548 0.818 3.493C.291 4.002 0 4.657 0 5.457z" fill="#FBBC05"/>
                      <path d="M12 16.64l-6.545-4.91v9.273h13.09V11.73z" fill="#34A853"/>
                      <path d="M18.545 11.73L12 16.64V9.548l6.545-4.91 1.528-1.145c.527.51.818 1.164.818 1.964v.728z" fill="#4285F4"/>
                      <path d="M5.455 4.64L12 9.548V16.64l-6.545-4.91V5.457c0-.8.291-1.455.818-1.964z" fill="#C5221F"/>
                    </svg>
                    <span className="text-gray-700">Connect Gmail</span>
                  </button>

                  {/* Outlook Button */}
                  <button
                    onClick={() => setShowOutlookOAuthModal(true)}
                    className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-3"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M24 7.875v8.25A2.625 2.625 0 0 1 21.375 18.75h-5.625v-13.5h5.625A2.625 2.625 0 0 1 24 7.875z" fill="#0364B8"/>
                      <path d="M21.375 5.25h-5.625v6.75H24v-4.125a2.625 2.625 0 0 0-2.625-2.625z" fill="#0078D4"/>
                      <path d="M15.75 12h8.25v6.75h-8.25z" fill="#28A8EA"/>
                      <path d="M15.75 18.75h5.625A2.625 2.625 0 0 0 24 16.125V12h-8.25v6.75z" fill="#0078D4"/>
                      <path d="M15.75 5.25h-4.5v13.5h4.5v-13.5z" fill="#0364B8"/>
                      <path d="M11.25 5.25H2.625A2.625 2.625 0 0 0 0 7.875v8.25a2.625 2.625 0 0 0 2.625 2.625h8.625v-13.5z" fill="#14447D"/>
                      <path d="M6.9375 8.4375c-1.7227 0-3.1172 1.3945-3.1172 3.1172 0 1.7227 1.3945 3.1172 3.1172 3.1172 1.7227 0 3.1172-1.3945 3.1172-3.1172 0-1.7227-1.3945-3.1172-3.1172-3.1172zm0 5.0859c-.9844 0-1.7812-.7969-1.7812-1.7812 0-.9844.7969-1.7812 1.7812-1.7812.9844 0 1.7812.7969 1.7812 1.7812 0 .9844-.7969 1.7812-1.7812 1.7812z" fill="white"/>
                    </svg>
                    <span className="text-gray-700">Connect Outlook</span>
          </button>
                </div>

                {/* Gmail OAuth Modal */}
                {showGmailOAuthModal && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl z-10">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Connect to Gmail</h3>
                        <button
                          onClick={() => setShowGmailOAuthModal(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          You will be redirected to Google to authorize access to your Gmail account. 
                          This allows your AI agent to:
                        </p>
                        
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                          <li>Read and send emails</li>
                          <li>Manage drafts and labels</li>
                          <li>Access email metadata</li>
                          <li>Respond to customer inquiries</li>
                        </ul>
                        
                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={() => {
                              // Gmail OAuth redirect
                              const gmailOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/gmail/callback')}&scope=https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send&response_type=code&access_type=offline`;
                              window.location.href = gmailOAuthUrl;
                            }}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            Continue to Gmail
                          </button>
                          <button
                            onClick={() => setShowGmailOAuthModal(false)}
                            className="px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Outlook OAuth Modal */}
                {showOutlookOAuthModal && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl z-10">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Connect to Outlook</h3>
                        <button
                          onClick={() => setShowOutlookOAuthModal(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          You will be redirected to Microsoft to authorize access to your Outlook account. 
                          This allows your AI agent to:
                        </p>
                        
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                          <li>Read and send emails</li>
                          <li>Manage folders and categories</li>
                          <li>Access calendar and contacts</li>
                          <li>Respond to customer inquiries</li>
                        </ul>
                        
                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={() => {
                              // Outlook OAuth redirect
                              const outlookOAuthUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/outlook/callback')}&scope=https://graph.microsoft.com/Mail.ReadWrite https://graph.microsoft.com/Mail.Send&response_type=code&response_mode=query`;
                              window.location.href = outlookOAuthUrl;
                            }}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            Continue to Outlook
                          </button>
                          <button
                            onClick={() => setShowOutlookOAuthModal(false)}
                            className="px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : selectedAccountTab === 'sms' ? (
              <div className="space-y-6">
                {/* Agent Phone Number */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Your Agent Phone #</h4>
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-2xl font-mono font-semibold text-gray-700">+1 843-212-6173</p>
                  </div>
                </div>

                {/* Forward to Personal Phone Toggle */}
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Forward Calls & Texts to Personal Phone</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => companyInfo.phone && setForwardToPersonalPhone(!forwardToPersonalPhone)}
                      disabled={!companyInfo.phone}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        !companyInfo.phone
                          ? 'bg-gray-300 cursor-not-allowed opacity-50'
                          : forwardToPersonalPhone
                            ? 'bg-blue-600'
                            : 'bg-gray-400 shadow-inner'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          forwardToPersonalPhone ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Error message when no phone number is set */}
                  {!companyInfo.phone && (
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="text-sm text-red-600">
                        No personal phone number found. Please add your phone number in the <span className="font-semibold">My Business</span> → <span className="font-semibold">Contact Details</span> section to enable this feature.
                      </span>
                    </div>
                  )}

                  {/* Personal Phone Number Display - Only show when toggle is on and phone exists */}
                  {forwardToPersonalPhone && companyInfo.phone && (
                    <div className="mb-3">
                      <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Personal Phone:</span>
                          <span className="text-lg font-mono font-semibold text-gray-700">{companyInfo.phone}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Note about Contact Details - Only show when toggle is on */}
                  {forwardToPersonalPhone && companyInfo.phone && (
                    <p className="text-sm text-gray-500 italic">
                      Business phone number is listed in Contact Details section of My Business tab
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <p className="text-sm">Content for {selectedAccountTab} will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sales Flow Section */}
      <div className="sales-flow-display-section">
        <div className="sales-flow-display-title">
          <h3 className="sales-flow-display-title-text">Sales Flow:</h3>
        </div>
        
        {/* Two Column Layout: 20% Tabs | 80% Content */}
        <div className="flex gap-4" style={{ height: '500px' }}>
          {/* Left Column - Tabs (20%) */}
          <div className="min-w-[180px] flex flex-col flex-shrink-0 overflow-y-auto">
            {['Contact Lead', 'Lead Discovery', 'Schedule Call', 'Send Estimate', 'Send Contract', /* 'Complete Job', */ 'Send Invoice' /* , 'Job Followup' */].map((stage, index) => {
              const colors = [
                'bg-blue-600',      // 1 - Contact Lead
                'bg-indigo-600',    // 2 - Lead Discovery
                'bg-teal-600',      // 3 - Schedule Call
                'bg-purple-600',    // 4 - Send Estimate
                'bg-cyan-600',      // 5 - Send Contract
                // 'bg-green-600',  // Complete Job (commented out)
                'bg-amber-600'      // 6 - Send Invoice
                // 'bg-pink-600'    // Job Followup (commented out)
              ];
              const color = colors[index];

              return (
                <button
              key={stage}
                  type="button"
                  onClick={() => setSelectedSalesFlowStage(stage)}
                  className={`flex items-center gap-3 p-4 rounded-lg transition-all active:bg-slate-200 ${
                    selectedSalesFlowStage === stage
                      ? 'bg-slate-100 shadow-sm'
                      : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm font-semibold text-white">{index + 1}</span>
                </div>
                  <span className="text-sm font-medium text-gray-700 text-left">{stage}</span>
                </button>
              );
            })}
                </div>

          {/* Right Column - Content (80%) */}
          <div className="flex-1 bg-slate-50 rounded-2xl p-6 flex flex-col">
            {selectedSalesFlowStage === 'Contact Lead' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* Lead Outreach */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Lead Outreach</h4>

                  <div className="space-y-4">
                    {/* Initial Contact Method */}
                    {(() => {
                      const icons = { text: MessageSquare, call: Phone, email: Mail };
                      const InitialIcon = initialOutreach.method ? icons[initialOutreach.method] : null;
                      const usedMethods = [
                        showSecondFallback ? secondFallback.method : null,
                        showThirdFallback ? thirdFallback.method : null
                      ].filter(Boolean);
                      const availableForInitial = contactMethodOptions.filter(
                        opt => !usedMethods.includes(opt.id) || opt.id === initialOutreach.method
                      );

                      return (
                        <div className="bg-white border border-slate-200 rounded-lg p-4">
                          <p className="text-xs font-medium text-gray-500 mb-2">Add contact method</p>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                              {InitialIcon && <InitialIcon className="w-4 h-4 text-gray-500" />}
                              <select
                                value={initialOutreach.method || ''}
                                onChange={(e) => setInitialOutreach({ ...initialOutreach, method: e.target.value || null })}
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none min-w-[120px]"
                              >
                                <option value="">None</option>
                                {availableForInitial.map(opt => (
                                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                                ))}
                              </select>
                            </div>

                            {initialOutreach.method && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Contact Lead in</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={initialOutreach.contactWithinValue}
                                  onChange={(e) => setInitialOutreach({ ...initialOutreach, contactWithinValue: e.target.value })}
                                  disabled={initialOutreach.contactWithin === 'Immediately'}
                                  className={`w-16 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none ${initialOutreach.contactWithin === 'Immediately' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                                  placeholder="#"
                                />
                                <select
                                  value={initialOutreach.contactWithin}
                                  onChange={(e) => setInitialOutreach({ ...initialOutreach, contactWithin: e.target.value, contactWithinValue: e.target.value === 'Immediately' ? '' : initialOutreach.contactWithinValue })}
                                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                >
                                  {contactWithinOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {(initialOutreach.method === 'text' || initialOutreach.method === 'email') && (
                              <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 underline ml-2"
                              >
                                Show AI Example
                              </button>
                            )}
                          </div>

                          {/* Hooks dropdown for text/email */}
                          {(initialOutreach.method === 'text' || initialOutreach.method === 'email') && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-500 mb-2">Lead Engagement Hooks:</p>
                              <div className="relative" ref={initialHooksDropdownRef}>
                                <button
                                  type="button"
                                  onClick={() => setInitialHooksDropdownOpen(!initialHooksDropdownOpen)}
                                  className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                  <div className="flex flex-wrap gap-1.5 flex-1">
                                    {(initialOutreach.hooks || []).length === 0 ? (
                                      <span className="text-sm text-gray-400">Select...</span>
                                    ) : (
                                      (initialOutreach.hooks || []).map((hookName) => {
                                        const hook = salesFlowHookOptions.find(h => h.name === hookName);
                                        const HookIcon = hook?.icon || MessageSquare;
                                        return (
                                          <span
                                            key={hookName}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
                                          >
                                            <HookIcon className="w-3 h-3" />
                                            {hookName}
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const newHooks = initialOutreach.hooks.filter(h => h !== hookName);
                                                setInitialOutreach({ ...initialOutreach, hooks: newHooks });
                                              }}
                                              className="ml-0.5 text-blue-400 hover:text-blue-600"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </span>
                                        );
                                      })
                                    )}
                                  </div>
                                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${initialHooksDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {initialHooksDropdownOpen && (
                                  <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {salesFlowHookOptions.map((hook) => {
                                      const isSelected = initialOutreach.hooks?.includes(hook.name);
                                      const HookIcon = hook.icon;
                                      return (
                                        <button
                                          key={hook.name}
                                          type="button"
                                          onClick={() => {
                                            const newHooks = isSelected
                                              ? initialOutreach.hooks.filter(h => h !== hook.name)
                                              : [...(initialOutreach.hooks || []), hook.name];
                                            setInitialOutreach({ ...initialOutreach, hooks: newHooks });
                                          }}
                                          className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                                            isSelected
                                              ? 'bg-blue-50 text-blue-700'
                                              : 'text-gray-700 hover:bg-slate-50'
                                          }`}
                                        >
                                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                            isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                                          }`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                          </div>
                                          <HookIcon className={`w-4 h-4 ${hook.color}`} />
                                          <span>{hook.name}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Followup section */}
                          {initialOutreach.method && (
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">Enable Followup</span>
                                  <button
                                    type="button"
                                    onClick={() => setInitialOutreach({ ...initialOutreach, followupEnabled: !initialOutreach.followupEnabled })}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                      initialOutreach.followupEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                                    }`}
                                  >
                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                      initialOutreach.followupEnabled ? 'translate-x-5' : 'translate-x-1'
                                    }`} />
                                  </button>
                                  <span className="text-xs text-gray-500 italic">if customer doesn't respond</span>
                                </div>

                                {initialOutreach.followupEnabled && (
                                  <div className="flex items-center gap-3 flex-wrap">
                                    {['Days', 'Weeks', 'Months'].includes(initialOutreach.followupSchedule) && (
                                      <>
                                        <span className="text-sm text-gray-600">Every</span>
                                        <input
                                          type="number"
                                          min="2"
                                          value={initialOutreach.followupScheduleValue}
                                          onChange={(e) => setInitialOutreach({ ...initialOutreach, followupScheduleValue: e.target.value })}
                                          className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                          placeholder="#"
                                        />
                                      </>
                                    )}
                                    <select
                                      value={initialOutreach.followupSchedule}
                                      onChange={(e) => setInitialOutreach({ ...initialOutreach, followupSchedule: e.target.value, followupScheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? initialOutreach.followupScheduleValue : '' })}
                                      className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                    >
                                      {followupScheduleOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                    </select>
                                    {(initialOutreach.followupSchedule === 'Weekly' || initialOutreach.followupSchedule === 'Weeks') && (
                                      <>
                                        <span className="text-sm text-gray-600">on</span>
                                        <select
                                          value={initialOutreach.followupDay}
                                          onChange={(e) => setInitialOutreach({ ...initialOutreach, followupDay: e.target.value })}
                                          className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                        >
                                          {followupDayOptions.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                          ))}
                                        </select>
                                      </>
                                    )}
                                    {(initialOutreach.followupSchedule === 'Monthly' || initialOutreach.followupSchedule === 'Months') && (
                                      <>
                                        <span className="text-sm text-gray-600">on the</span>
                                        <select
                                          value={initialOutreach.followupDayOfMonth}
                                          onChange={(e) => setInitialOutreach({ ...initialOutreach, followupDayOfMonth: e.target.value })}
                                          className="w-16 px-1 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                        >
                                          {followupDayOfMonthOptions.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                          ))}
                                        </select>
                                      </>
                                    )}
                                    <span className="text-sm text-gray-600">at</span>
                                    <div className="flex items-center gap-1 flex-wrap">
                                      {(initialOutreach.followupTimes || ['9:00 AM']).map((time, index) => (
                                        <div key={index} className="flex items-center gap-1">
                                          <select
                                            value={time}
                                            onChange={(e) => {
                                              const newTimes = [...(initialOutreach.followupTimes || ['9:00 AM'])];
                                              newTimes[index] = e.target.value;
                                              setInitialOutreach({ ...initialOutreach, followupTimes: newTimes });
                                            }}
                                            className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                          >
                                            {followupTimeOptions.map(t => (
                                              <option key={t} value={t}>{t}</option>
                                            ))}
                                          </select>
                                          {(initialOutreach.followupTimes || ['9:00 AM']).length > 1 && (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const newTimes = (initialOutreach.followupTimes || ['9:00 AM']).filter((_, i) => i !== index);
                                                setInitialOutreach({ ...initialOutreach, followupTimes: newTimes });
                                              }}
                                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          )}
                                          {index < (initialOutreach.followupTimes || ['9:00 AM']).length - 1 && (
                                            <span className="text-sm text-gray-400">,</span>
                                          )}
                                        </div>
                                      ))}
                                      {(initialOutreach.followupTimes || ['9:00 AM']).length < 5 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newTimes = [...(initialOutreach.followupTimes || ['9:00 AM']), '12:00 PM'];
                                            setInitialOutreach({ ...initialOutreach, followupTimes: newTimes });
                                          }}
                                          className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>
                                    <span className="text-sm text-gray-600">for</span>
                                    <input
                                      type="number"
                                      min="1"
                                      value={initialOutreach.followupDuration}
                                      onChange={(e) => setInitialOutreach({ ...initialOutreach, followupDuration: e.target.value })}
                                      className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                      placeholder="#"
                                    />
                                    <select
                                      value={initialOutreach.followupDurationUnit}
                                      onChange={(e) => setInitialOutreach({ ...initialOutreach, followupDurationUnit: e.target.value })}
                                      className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                    >
                                      {followupDurationUnitOptions.map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Add Second Fallback Button - show only when second fallback is not added */}
                    {!showSecondFallback && (
                      <button
                        type="button"
                        onClick={() => setShowSecondFallback(true)}
                        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Contact Method
                      </button>
                    )}

                    {/* Second Fallback Contact Method */}
                    {showSecondFallback && (() => {
                      const icons = { text: MessageSquare, call: Phone, email: Mail };
                      const SecondIcon = secondFallback.method ? icons[secondFallback.method] : null;
                      const usedMethods = [
                        initialOutreach.method,
                        showThirdFallback ? thirdFallback.method : null
                      ].filter(Boolean);
                      const availableForSecond = contactMethodOptions.filter(
                        opt => !usedMethods.includes(opt.id) || opt.id === secondFallback.method
                      );

                      return (
                        <div className="bg-white border border-slate-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-500">Add contact method</p>
                            <button
                              type="button"
                              onClick={() => {
                                if (showThirdFallback) {
                                  // Shift third up to second
                                  setSecondFallback({ ...thirdFallback });
                                  setThirdFallback({ method: 'email', contactWithin: 'Minutes', contactWithinValue: '10', followupEnabled: false, followupSchedule: 'Daily', followupScheduleValue: '', followupTime: '9:00 AM', followupDay: 'Monday', followupDayOfMonth: '1st', followupDuration: '', followupDurationUnit: 'Days', hooks: [] });
                                  setShowThirdFallback(false);
                                } else {
                                  setShowSecondFallback(false);
                                }
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                              {SecondIcon && <SecondIcon className="w-4 h-4 text-gray-500" />}
                              <select
                                value={secondFallback.method || ''}
                                onChange={(e) => setSecondFallback({ ...secondFallback, method: e.target.value || null })}
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none min-w-[120px]"
                              >
                                <option value="">None</option>
                                {availableForSecond.map(opt => (
                                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                                ))}
                              </select>
                            </div>

                            {secondFallback.method && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Contact Lead in</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={secondFallback.contactWithinValue}
                                  onChange={(e) => setSecondFallback({ ...secondFallback, contactWithinValue: e.target.value })}
                                  disabled={secondFallback.contactWithin === 'Immediately'}
                                  className={`w-16 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none ${secondFallback.contactWithin === 'Immediately' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                                  placeholder="#"
                                />
                                <select
                                  value={secondFallback.contactWithin}
                                  onChange={(e) => setSecondFallback({ ...secondFallback, contactWithin: e.target.value, contactWithinValue: e.target.value === 'Immediately' ? '' : secondFallback.contactWithinValue })}
                                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                >
                                  {contactWithinOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {(secondFallback.method === 'text' || secondFallback.method === 'email') && (
                              <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 underline ml-2"
                              >
                                Show AI Example
                              </button>
                            )}
                          </div>

                          {/* Hooks dropdown for text/email */}
                          {(secondFallback.method === 'text' || secondFallback.method === 'email') && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-500 mb-2">Lead Engagement Hooks:</p>
                              <div className="relative" ref={secondHooksDropdownRef}>
                                <button
                                  type="button"
                                  onClick={() => setSecondHooksDropdownOpen(!secondHooksDropdownOpen)}
                                  className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                  <div className="flex flex-wrap gap-1.5 flex-1">
                                    {(secondFallback.hooks || []).length === 0 ? (
                                      <span className="text-sm text-gray-400">Select...</span>
                                    ) : (
                                      (secondFallback.hooks || []).map((hookName) => {
                                        const hook = salesFlowHookOptions.find(h => h.name === hookName);
                                        const HookIcon = hook?.icon || MessageSquare;
                                        return (
                                          <span
                                            key={hookName}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
                                          >
                                            <HookIcon className="w-3 h-3" />
                                            {hookName}
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const newHooks = secondFallback.hooks.filter(h => h !== hookName);
                                                setSecondFallback({ ...secondFallback, hooks: newHooks });
                                              }}
                                              className="ml-0.5 text-blue-400 hover:text-blue-600"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </span>
                                        );
                                      })
                                    )}
                                  </div>
                                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${secondHooksDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {secondHooksDropdownOpen && (
                                  <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {salesFlowHookOptions.map((hook) => {
                                      const isSelected = secondFallback.hooks?.includes(hook.name);
                                      const HookIcon = hook.icon;
                                      return (
                                        <button
                                          key={hook.name}
                                          type="button"
                                          onClick={() => {
                                            const newHooks = isSelected
                                              ? secondFallback.hooks.filter(h => h !== hook.name)
                                              : [...(secondFallback.hooks || []), hook.name];
                                            setSecondFallback({ ...secondFallback, hooks: newHooks });
                                          }}
                                          className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                                            isSelected
                                              ? 'bg-blue-50 text-blue-700'
                                              : 'text-gray-700 hover:bg-slate-50'
                                          }`}
                                        >
                                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                            isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                                          }`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                          </div>
                                          <HookIcon className={`w-4 h-4 ${hook.color}`} />
                                          <span>{hook.name}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Followup section */}
                          {secondFallback.method && (
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">Enable Followup</span>
                                  <button
                                    type="button"
                                    onClick={() => setSecondFallback({ ...secondFallback, followupEnabled: !secondFallback.followupEnabled })}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                      secondFallback.followupEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                                    }`}
                                  >
                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                      secondFallback.followupEnabled ? 'translate-x-5' : 'translate-x-1'
                                    }`} />
                                  </button>
                                  <span className="text-xs text-gray-500 italic">if customer doesn't respond</span>
                                </div>

                                {secondFallback.followupEnabled && (
                                  <div className="flex items-center gap-3 flex-wrap">
                                    {['Days', 'Weeks', 'Months'].includes(secondFallback.followupSchedule) && (
                                      <>
                                        <span className="text-sm text-gray-600">Every</span>
                                        <input
                                          type="number"
                                          min="2"
                                          value={secondFallback.followupScheduleValue}
                                          onChange={(e) => setSecondFallback({ ...secondFallback, followupScheduleValue: e.target.value })}
                                          className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                          placeholder="#"
                                        />
                                      </>
                                    )}
                                    <select
                                      value={secondFallback.followupSchedule}
                                      onChange={(e) => setSecondFallback({ ...secondFallback, followupSchedule: e.target.value, followupScheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? secondFallback.followupScheduleValue : '' })}
                                      className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                    >
                                      {followupScheduleOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                    </select>
                                    {(secondFallback.followupSchedule === 'Weekly' || secondFallback.followupSchedule === 'Weeks') && (
                                      <>
                                        <span className="text-sm text-gray-600">on</span>
                                        <select
                                          value={secondFallback.followupDay}
                                          onChange={(e) => setSecondFallback({ ...secondFallback, followupDay: e.target.value })}
                                          className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                        >
                                          {followupDayOptions.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                          ))}
                                        </select>
                                      </>
                                    )}
                                    {(secondFallback.followupSchedule === 'Monthly' || secondFallback.followupSchedule === 'Months') && (
                                      <>
                                        <span className="text-sm text-gray-600">on the</span>
                                        <select
                                          value={secondFallback.followupDayOfMonth}
                                          onChange={(e) => setSecondFallback({ ...secondFallback, followupDayOfMonth: e.target.value })}
                                          className="w-16 px-1 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                        >
                                          {followupDayOfMonthOptions.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                          ))}
                                        </select>
                                      </>
                                    )}
                                    <span className="text-sm text-gray-600">at</span>
                                    <div className="flex items-center gap-1 flex-wrap">
                                      {(secondFallback.followupTimes || ['9:00 AM']).map((time, index) => (
                                        <div key={index} className="flex items-center gap-1">
                                          <select
                                            value={time}
                                            onChange={(e) => {
                                              const newTimes = [...(secondFallback.followupTimes || ['9:00 AM'])];
                                              newTimes[index] = e.target.value;
                                              setSecondFallback({ ...secondFallback, followupTimes: newTimes });
                                            }}
                                            className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                          >
                                            {followupTimeOptions.map(t => (
                                              <option key={t} value={t}>{t}</option>
                                            ))}
                                          </select>
                                          {(secondFallback.followupTimes || ['9:00 AM']).length > 1 && (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const newTimes = (secondFallback.followupTimes || ['9:00 AM']).filter((_, i) => i !== index);
                                                setSecondFallback({ ...secondFallback, followupTimes: newTimes });
                                              }}
                                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          )}
                                          {index < (secondFallback.followupTimes || ['9:00 AM']).length - 1 && (
                                            <span className="text-sm text-gray-400">,</span>
                                          )}
                                        </div>
                                      ))}
                                      {(secondFallback.followupTimes || ['9:00 AM']).length < 5 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newTimes = [...(secondFallback.followupTimes || ['9:00 AM']), '12:00 PM'];
                                            setSecondFallback({ ...secondFallback, followupTimes: newTimes });
                                          }}
                                          className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>
                                    <span className="text-sm text-gray-600">for</span>
                                    <input
                                      type="number"
                                      min="1"
                                      value={secondFallback.followupDuration}
                                      onChange={(e) => setSecondFallback({ ...secondFallback, followupDuration: e.target.value })}
                                      className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                      placeholder="#"
                                    />
                                    <select
                                      value={secondFallback.followupDurationUnit}
                                      onChange={(e) => setSecondFallback({ ...secondFallback, followupDurationUnit: e.target.value })}
                                      className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                    >
                                      {followupDurationUnitOptions.map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Add Third Fallback Button - show only when second is added but third is not */}
                    {showSecondFallback && !showThirdFallback && (
                      <button
                        type="button"
                        onClick={() => setShowThirdFallback(true)}
                        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Contact Method
                      </button>
                    )}

                    {/* Third Fallback Contact Method */}
                    {showThirdFallback && (() => {
                      const icons = { text: MessageSquare, call: Phone, email: Mail };
                      const ThirdIcon = thirdFallback.method ? icons[thirdFallback.method] : null;
                      const usedMethods = [initialOutreach.method, secondFallback.method].filter(Boolean);
                      const availableForThird = contactMethodOptions.filter(
                        opt => !usedMethods.includes(opt.id) || opt.id === thirdFallback.method
                      );

                      return (
                        <div className="bg-white border border-slate-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-500">Add contact method</p>
                            <button
                              type="button"
                              onClick={() => setShowThirdFallback(false)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                              {ThirdIcon && <ThirdIcon className="w-4 h-4 text-gray-500" />}
                              <select
                                value={thirdFallback.method || ''}
                                onChange={(e) => setThirdFallback({ ...thirdFallback, method: e.target.value || null })}
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none min-w-[120px]"
                              >
                                <option value="">None</option>
                                {availableForThird.map(opt => (
                                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                                ))}
                              </select>
                            </div>

                            {thirdFallback.method && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Contact Lead in</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={thirdFallback.contactWithinValue}
                                  onChange={(e) => setThirdFallback({ ...thirdFallback, contactWithinValue: e.target.value })}
                                  disabled={thirdFallback.contactWithin === 'Immediately'}
                                  className={`w-16 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none ${thirdFallback.contactWithin === 'Immediately' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                                  placeholder="#"
                                />
                                <select
                                  value={thirdFallback.contactWithin}
                                  onChange={(e) => setThirdFallback({ ...thirdFallback, contactWithin: e.target.value, contactWithinValue: e.target.value === 'Immediately' ? '' : thirdFallback.contactWithinValue })}
                                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                >
                                  {contactWithinOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {(thirdFallback.method === 'text' || thirdFallback.method === 'email') && (
                              <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 underline ml-2"
                              >
                                Show AI Example
                              </button>
                            )}
                          </div>

                          {/* Hooks dropdown for text/email */}
                          {(thirdFallback.method === 'text' || thirdFallback.method === 'email') && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-500 mb-2">Lead Engagement Hooks:</p>
                              <div className="relative" ref={thirdHooksDropdownRef}>
                                <button
                                  type="button"
                                  onClick={() => setThirdHooksDropdownOpen(!thirdHooksDropdownOpen)}
                                  className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                  <div className="flex flex-wrap gap-1.5 flex-1">
                                    {(thirdFallback.hooks || []).length === 0 ? (
                                      <span className="text-sm text-gray-400">Select...</span>
                                    ) : (
                                      (thirdFallback.hooks || []).map((hookName) => {
                                        const hook = salesFlowHookOptions.find(h => h.name === hookName);
                                        const HookIcon = hook?.icon || MessageSquare;
                                        return (
                                          <span
                                            key={hookName}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
                                          >
                                            <HookIcon className="w-3 h-3" />
                                            {hookName}
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const newHooks = thirdFallback.hooks.filter(h => h !== hookName);
                                                setThirdFallback({ ...thirdFallback, hooks: newHooks });
                                              }}
                                              className="ml-0.5 text-blue-400 hover:text-blue-600"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </span>
                                        );
                                      })
                                    )}
                                  </div>
                                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${thirdHooksDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {thirdHooksDropdownOpen && (
                                  <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {salesFlowHookOptions.map((hook) => {
                                      const isSelected = thirdFallback.hooks?.includes(hook.name);
                                      const HookIcon = hook.icon;
                                      return (
                                        <button
                                          key={hook.name}
                                          type="button"
                                          onClick={() => {
                                            const newHooks = isSelected
                                              ? thirdFallback.hooks.filter(h => h !== hook.name)
                                              : [...(thirdFallback.hooks || []), hook.name];
                                            setThirdFallback({ ...thirdFallback, hooks: newHooks });
                                          }}
                                          className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                                            isSelected
                                              ? 'bg-blue-50 text-blue-700'
                                              : 'text-gray-700 hover:bg-slate-50'
                                          }`}
                                        >
                                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                            isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                                          }`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                          </div>
                                          <HookIcon className={`w-4 h-4 ${hook.color}`} />
                                          <span>{hook.name}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Followup section */}
                          {thirdFallback.method && (
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">Enable Followup</span>
                                  <button
                                    type="button"
                                    onClick={() => setThirdFallback({ ...thirdFallback, followupEnabled: !thirdFallback.followupEnabled })}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                      thirdFallback.followupEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                                    }`}
                                  >
                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                      thirdFallback.followupEnabled ? 'translate-x-5' : 'translate-x-1'
                                    }`} />
                                  </button>
                                  <span className="text-xs text-gray-500 italic">if customer doesn't respond</span>
                                </div>

                                {thirdFallback.followupEnabled && (
                                  <div className="flex items-center gap-3 flex-wrap">
                                    {['Days', 'Weeks', 'Months'].includes(thirdFallback.followupSchedule) && (
                                      <>
                                        <span className="text-sm text-gray-600">Every</span>
                                        <input
                                          type="number"
                                          min="2"
                                          value={thirdFallback.followupScheduleValue}
                                          onChange={(e) => setThirdFallback({ ...thirdFallback, followupScheduleValue: e.target.value })}
                                          className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                          placeholder="#"
                                        />
                                      </>
                                    )}
                                    <select
                                      value={thirdFallback.followupSchedule}
                                      onChange={(e) => setThirdFallback({ ...thirdFallback, followupSchedule: e.target.value, followupScheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? thirdFallback.followupScheduleValue : '' })}
                                      className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                    >
                                      {followupScheduleOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                    </select>
                                    {(thirdFallback.followupSchedule === 'Weekly' || thirdFallback.followupSchedule === 'Weeks') && (
                                      <>
                                        <span className="text-sm text-gray-600">on</span>
                                        <select
                                          value={thirdFallback.followupDay}
                                          onChange={(e) => setThirdFallback({ ...thirdFallback, followupDay: e.target.value })}
                                          className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                        >
                                          {followupDayOptions.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                          ))}
                                        </select>
                                      </>
                                    )}
                                    {(thirdFallback.followupSchedule === 'Monthly' || thirdFallback.followupSchedule === 'Months') && (
                                      <>
                                        <span className="text-sm text-gray-600">on the</span>
                                        <select
                                          value={thirdFallback.followupDayOfMonth}
                                          onChange={(e) => setThirdFallback({ ...thirdFallback, followupDayOfMonth: e.target.value })}
                                          className="w-16 px-1 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                        >
                                          {followupDayOfMonthOptions.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                          ))}
                                        </select>
                                      </>
                                    )}
                                    <span className="text-sm text-gray-600">at</span>
                                    <div className="flex items-center gap-1 flex-wrap">
                                      {(thirdFallback.followupTimes || ['9:00 AM']).map((time, index) => (
                                        <div key={index} className="flex items-center gap-1">
                                          <select
                                            value={time}
                                            onChange={(e) => {
                                              const newTimes = [...(thirdFallback.followupTimes || ['9:00 AM'])];
                                              newTimes[index] = e.target.value;
                                              setThirdFallback({ ...thirdFallback, followupTimes: newTimes });
                                            }}
                                            className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                          >
                                            {followupTimeOptions.map(t => (
                                              <option key={t} value={t}>{t}</option>
                                            ))}
                                          </select>
                                          {(thirdFallback.followupTimes || ['9:00 AM']).length > 1 && (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const newTimes = (thirdFallback.followupTimes || ['9:00 AM']).filter((_, i) => i !== index);
                                                setThirdFallback({ ...thirdFallback, followupTimes: newTimes });
                                              }}
                                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          )}
                                          {index < (thirdFallback.followupTimes || ['9:00 AM']).length - 1 && (
                                            <span className="text-sm text-gray-400">,</span>
                                          )}
                                        </div>
                                      ))}
                                      {(thirdFallback.followupTimes || ['9:00 AM']).length < 5 && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newTimes = [...(thirdFallback.followupTimes || ['9:00 AM']), '12:00 PM'];
                                            setThirdFallback({ ...thirdFallback, followupTimes: newTimes });
                                          }}
                                          className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>
                                    <span className="text-sm text-gray-600">for</span>
                                    <input
                                      type="number"
                                      min="1"
                                      value={thirdFallback.followupDuration}
                                      onChange={(e) => setThirdFallback({ ...thirdFallback, followupDuration: e.target.value })}
                                      className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                      placeholder="#"
                                    />
                                    <select
                                      value={thirdFallback.followupDurationUnit}
                                      onChange={(e) => setThirdFallback({ ...thirdFallback, followupDurationUnit: e.target.value })}
                                      className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                    >
                                      {followupDurationUnitOptions.map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : selectedSalesFlowStage === 'Lead Discovery' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* Lead Discovery Explanation */}
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Your AI Agent conducts Lead Discovery by engaging with potential customers through natural conversation. It asks qualifying questions to understand their needs, budget, timeline, and project scope. The agent gathers essential information like property details, service requirements, and contact preferences to help you prepare accurate estimates and prioritize leads effectively.
                  </p>
                </div>

                {/* Escalate Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">Escalate unanswered questions to you</span>
                  <button
                    type="button"
                    onClick={() => setScheduleCallIfCantAnswer(!scheduleCallIfCantAnswer)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      scheduleCallIfCantAnswer ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        scheduleCallIfCantAnswer ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Allow Customer Callback Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">Allow customer to request callback</span>
                  <button
                    type="button"
                    onClick={() => setAllowCustomerCallback(!allowCustomerCallback)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      allowCustomerCallback ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        allowCustomerCallback ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Followup Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Enable Followup</span>
                    <button
                      type="button"
                      onClick={() => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, enabled: !leadDiscoveryFollowup.enabled })}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        leadDiscoveryFollowup.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                      }`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        leadDiscoveryFollowup.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                    <span className="text-xs text-gray-500 italic">if customer doesn't respond</span>
                  </div>

                  {leadDiscoveryFollowup.enabled && (
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-gray-600">via</span>
                      <select
                        value={leadDiscoveryFollowup.method}
                        onChange={(e) => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, method: e.target.value })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                      {['Days', 'Weeks', 'Months'].includes(leadDiscoveryFollowup.schedule) && (
                        <>
                          <span className="text-sm text-gray-600">Every</span>
                          <input
                            type="number"
                            min="2"
                            value={leadDiscoveryFollowup.scheduleValue}
                            onChange={(e) => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, scheduleValue: e.target.value })}
                            className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            placeholder="#"
                          />
                        </>
                      )}
                      <select
                        value={leadDiscoveryFollowup.schedule}
                        onChange={(e) => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, schedule: e.target.value, scheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? leadDiscoveryFollowup.scheduleValue : '' })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        {followupScheduleOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {(leadDiscoveryFollowup.schedule === 'Weekly' || leadDiscoveryFollowup.schedule === 'Weeks') && (
                        <>
                          <span className="text-sm text-gray-600">on</span>
                          <select
                            value={leadDiscoveryFollowup.day}
                            onChange={(e) => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, day: e.target.value })}
                            className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                          >
                            {followupDayOptions.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </>
                      )}
                      {(leadDiscoveryFollowup.schedule === 'Monthly' || leadDiscoveryFollowup.schedule === 'Months') && (
                        <>
                          <span className="text-sm text-gray-600">on the</span>
                          <select
                            value={leadDiscoveryFollowup.dayOfMonth}
                            onChange={(e) => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, dayOfMonth: e.target.value })}
                            className="w-16 px-1 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                          >
                            {followupDayOfMonthOptions.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </>
                      )}
                      <span className="text-sm text-gray-600">at</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {(leadDiscoveryFollowup.times || ['9:00 AM']).map((time, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <select
                              value={time}
                              onChange={(e) => {
                                const newTimes = [...(leadDiscoveryFollowup.times || ['9:00 AM'])];
                                newTimes[index] = e.target.value;
                                setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, times: newTimes });
                              }}
                              className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            >
                              {followupTimeOptions.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            {(leadDiscoveryFollowup.times || ['9:00 AM']).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newTimes = (leadDiscoveryFollowup.times || ['9:00 AM']).filter((_, i) => i !== index);
                                  setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, times: newTimes });
                                }}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                            {index < (leadDiscoveryFollowup.times || ['9:00 AM']).length - 1 && (
                              <span className="text-sm text-gray-400">,</span>
                            )}
                          </div>
                        ))}
                        {(leadDiscoveryFollowup.times || ['9:00 AM']).length < 5 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newTimes = [...(leadDiscoveryFollowup.times || ['9:00 AM']), '12:00 PM'];
                              setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, times: newTimes });
                            }}
                            className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">for</span>
                      <input
                        type="number"
                        min="1"
                        value={leadDiscoveryFollowup.duration}
                        onChange={(e) => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, duration: e.target.value })}
                        className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        placeholder="#"
                      />
                      <select
                        value={leadDiscoveryFollowup.durationUnit}
                        onChange={(e) => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, durationUnit: e.target.value })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        {followupDurationUnitOptions.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : selectedSalesFlowStage === 'Schedule Call' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* Schedule Call Explanation */}
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Your AI Agent can schedule calls with leads who request to speak with you directly or need more personalized assistance before receiving an estimate.
                  </p>
                </div>

                {/* Schedule Phone Call Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">Request scheduled phone call with customer</span>
                  <button
                    type="button"
                    onClick={() => setOfferCallback({ ...offerCallback, enabled: !offerCallback.enabled })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      offerCallback.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        offerCallback.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : selectedSalesFlowStage === 'Send Estimate' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* Send Estimate Explanation */}
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    When enabled, your AI agent will ask leads if they would like to schedule an in-person estimate before sending a quote. This is recommended for jobs that require on-site assessment, such as large projects, custom work, or services where accurate pricing depends on seeing the property or space in person.
                  </p>
                </div>

                {/* Followup Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Enable Followup</span>
                    <button
                      type="button"
                      onClick={() => setSendEstimateFollowup({ ...sendEstimateFollowup, enabled: !sendEstimateFollowup.enabled })}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        sendEstimateFollowup.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                      }`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        sendEstimateFollowup.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                    <span className="text-xs text-gray-500 italic">if no response to estimate</span>
                  </div>

                  {sendEstimateFollowup.enabled && (
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-gray-600">via</span>
                      <select
                        value={sendEstimateFollowup.method}
                        onChange={(e) => setSendEstimateFollowup({ ...sendEstimateFollowup, method: e.target.value })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                      {['Days', 'Weeks', 'Months'].includes(sendEstimateFollowup.schedule) && (
                        <>
                          <span className="text-sm text-gray-600">Every</span>
                          <input
                            type="number"
                            min="2"
                            value={sendEstimateFollowup.scheduleValue}
                            onChange={(e) => setSendEstimateFollowup({ ...sendEstimateFollowup, scheduleValue: e.target.value })}
                            className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            placeholder="#"
                          />
                        </>
                      )}
                      <select
                        value={sendEstimateFollowup.schedule}
                        onChange={(e) => setSendEstimateFollowup({ ...sendEstimateFollowup, schedule: e.target.value, scheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? sendEstimateFollowup.scheduleValue : '' })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        {followupScheduleOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {(sendEstimateFollowup.schedule === 'Weekly' || sendEstimateFollowup.schedule === 'Weeks') && (
                        <>
                          <span className="text-sm text-gray-600">on</span>
                          <select
                            value={sendEstimateFollowup.day}
                            onChange={(e) => setSendEstimateFollowup({ ...sendEstimateFollowup, day: e.target.value })}
                            className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                          >
                            {followupDayOptions.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </>
                      )}
                      {(sendEstimateFollowup.schedule === 'Monthly' || sendEstimateFollowup.schedule === 'Months') && (
                        <>
                          <span className="text-sm text-gray-600">on the</span>
                          <select
                            value={sendEstimateFollowup.dayOfMonth}
                            onChange={(e) => setSendEstimateFollowup({ ...sendEstimateFollowup, dayOfMonth: e.target.value })}
                            className="w-16 px-1 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                          >
                            {followupDayOfMonthOptions.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </>
                      )}
                      <span className="text-sm text-gray-600">at</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {(sendEstimateFollowup.times || ['9:00 AM']).map((time, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <select
                              value={time}
                              onChange={(e) => {
                                const newTimes = [...(sendEstimateFollowup.times || ['9:00 AM'])];
                                newTimes[index] = e.target.value;
                                setSendEstimateFollowup({ ...sendEstimateFollowup, times: newTimes });
                              }}
                              className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            >
                              {followupTimeOptions.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            {(sendEstimateFollowup.times || ['9:00 AM']).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newTimes = (sendEstimateFollowup.times || ['9:00 AM']).filter((_, i) => i !== index);
                                  setSendEstimateFollowup({ ...sendEstimateFollowup, times: newTimes });
                                }}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                            {index < (sendEstimateFollowup.times || ['9:00 AM']).length - 1 && (
                              <span className="text-sm text-gray-400">,</span>
                            )}
                          </div>
                        ))}
                        {(sendEstimateFollowup.times || ['9:00 AM']).length < 5 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newTimes = [...(sendEstimateFollowup.times || ['9:00 AM']), '12:00 PM'];
                              setSendEstimateFollowup({ ...sendEstimateFollowup, times: newTimes });
                            }}
                            className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">for</span>
                      <input
                        type="number"
                        min="1"
                        value={sendEstimateFollowup.duration}
                        onChange={(e) => setSendEstimateFollowup({ ...sendEstimateFollowup, duration: e.target.value })}
                        className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        placeholder="#"
                      />
                      <select
                        value={sendEstimateFollowup.durationUnit}
                        onChange={(e) => setSendEstimateFollowup({ ...sendEstimateFollowup, durationUnit: e.target.value })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        {followupDurationUnitOptions.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : selectedSalesFlowStage === 'Send Contract' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* Send Contract Explanation */}
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Your AI Agent handles contract delivery by sending contracts to customers and tracking their status. It can send reminders for unsigned contracts and notify you when contracts are signed, ensuring a smooth transition from estimate approval to job scheduling.
                  </p>
                </div>

                {/* Followup Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Enable Followup</span>
                    <button
                      type="button"
                      onClick={() => setSendContractFollowup({ ...sendContractFollowup, enabled: !sendContractFollowup.enabled })}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        sendContractFollowup.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                      }`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        sendContractFollowup.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                    <span className="text-xs text-gray-500 italic">if no response to contract</span>
                  </div>

                  {sendContractFollowup.enabled && (
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-gray-600">via</span>
                      <select
                        value={sendContractFollowup.method}
                        onChange={(e) => setSendContractFollowup({ ...sendContractFollowup, method: e.target.value })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                      {['Days', 'Weeks', 'Months'].includes(sendContractFollowup.schedule) && (
                        <>
                          <span className="text-sm text-gray-600">Every</span>
                          <input
                            type="number"
                            min="2"
                            value={sendContractFollowup.scheduleValue}
                            onChange={(e) => setSendContractFollowup({ ...sendContractFollowup, scheduleValue: e.target.value })}
                            className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            placeholder="#"
                          />
                        </>
                      )}
                      <select
                        value={sendContractFollowup.schedule}
                        onChange={(e) => setSendContractFollowup({ ...sendContractFollowup, schedule: e.target.value, scheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? sendContractFollowup.scheduleValue : '' })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        {followupScheduleOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {(sendContractFollowup.schedule === 'Weekly' || sendContractFollowup.schedule === 'Weeks') && (
                        <>
                          <span className="text-sm text-gray-600">on</span>
                          <select
                            value={sendContractFollowup.day}
                            onChange={(e) => setSendContractFollowup({ ...sendContractFollowup, day: e.target.value })}
                            className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                          >
                            {followupDayOptions.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </>
                      )}
                      {(sendContractFollowup.schedule === 'Monthly' || sendContractFollowup.schedule === 'Months') && (
                        <>
                          <span className="text-sm text-gray-600">on the</span>
                          <select
                            value={sendContractFollowup.dayOfMonth}
                            onChange={(e) => setSendContractFollowup({ ...sendContractFollowup, dayOfMonth: e.target.value })}
                            className="w-16 px-1 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                          >
                            {followupDayOfMonthOptions.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </>
                      )}
                      <span className="text-sm text-gray-600">at</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {(sendContractFollowup.times || ['9:00 AM']).map((time, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <select
                              value={time}
                              onChange={(e) => {
                                const newTimes = [...(sendContractFollowup.times || ['9:00 AM'])];
                                newTimes[index] = e.target.value;
                                setSendContractFollowup({ ...sendContractFollowup, times: newTimes });
                              }}
                              className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            >
                              {followupTimeOptions.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            {(sendContractFollowup.times || ['9:00 AM']).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newTimes = (sendContractFollowup.times || ['9:00 AM']).filter((_, i) => i !== index);
                                  setSendContractFollowup({ ...sendContractFollowup, times: newTimes });
                                }}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                            {index < (sendContractFollowup.times || ['9:00 AM']).length - 1 && (
                              <span className="text-sm text-gray-400">,</span>
                            )}
                          </div>
                        ))}
                        {(sendContractFollowup.times || ['9:00 AM']).length < 5 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newTimes = [...(sendContractFollowup.times || ['9:00 AM']), '12:00 PM'];
                              setSendContractFollowup({ ...sendContractFollowup, times: newTimes });
                            }}
                            className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">for</span>
                      <input
                        type="number"
                        min="1"
                        value={sendContractFollowup.duration}
                        onChange={(e) => setSendContractFollowup({ ...sendContractFollowup, duration: e.target.value })}
                        className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        placeholder="#"
                      />
                      <select
                        value={sendContractFollowup.durationUnit}
                        onChange={(e) => setSendContractFollowup({ ...sendContractFollowup, durationUnit: e.target.value })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        {followupDurationUnitOptions.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : selectedSalesFlowStage === 'Send Invoice' ? (
              /* COMPLETE JOB SECTION - COMMENTED OUT
            ) : selectedSalesFlowStage === 'Complete Job' ? (
              <div className="space-y-6">
                {/* Complete Job Explanation *//*}
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Your AI Agent can automatically remind customers about their upcoming scheduled jobs, helping reduce no-shows and ensuring customers are prepared for service.
                  </p>
                </div>

                {/* Auto Remind Customer Toggle *//*}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">Automatically remind customer of job</span>
                  <button
                    type="button"
                    onClick={() => setAutoRemindJob({ ...autoRemindJob, enabled: !autoRemindJob.enabled })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      autoRemindJob.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        autoRemindJob.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Reminder Options - only show when enabled *//*}
                {autoRemindJob.enabled && (
                  <div className="ml-4 space-y-3 border-l-2 border-slate-200 pl-4">
                    {/* Day Before Checkbox *//*}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoRemindJob.dayBefore}
                        onChange={(e) => setAutoRemindJob({ ...autoRemindJob, dayBefore: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Day before the job</span>
                    </label>

                    {/* Day Of Checkbox *//*}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoRemindJob.dayOf}
                        onChange={(e) => setAutoRemindJob({ ...autoRemindJob, dayOf: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Day of the job</span>
                    </label>

                    {/* Time Selector *//*}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Send reminder at</span>
                      <select
                        value={autoRemindJob.time}
                        onChange={(e) => setAutoRemindJob({ ...autoRemindJob, time: e.target.value })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        {followupTimeOptions.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
              END COMPLETE JOB SECTION */
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* Send Invoice Explanation */}
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Your AI Agent handles invoice delivery and payment reminders. It can automatically follow up with customers who haven't paid, ensuring timely payments while maintaining professional communication.
                  </p>
                </div>

                {/* Followup Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Enable Followup</span>
                    <button
                      type="button"
                      onClick={() => setSendInvoiceFollowup({ ...sendInvoiceFollowup, enabled: !sendInvoiceFollowup.enabled })}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        sendInvoiceFollowup.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                      }`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        sendInvoiceFollowup.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                    <span className="text-xs text-gray-500 italic">if payment not received</span>
                  </div>

                  {sendInvoiceFollowup.enabled && (
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-gray-600">via</span>
                      <select
                        value={sendInvoiceFollowup.method}
                        onChange={(e) => setSendInvoiceFollowup({ ...sendInvoiceFollowup, method: e.target.value })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                      {['Days', 'Weeks', 'Months'].includes(sendInvoiceFollowup.schedule) && (
                        <>
                          <span className="text-sm text-gray-600">Every</span>
                          <input
                            type="number"
                            min="2"
                            value={sendInvoiceFollowup.scheduleValue}
                            onChange={(e) => setSendInvoiceFollowup({ ...sendInvoiceFollowup, scheduleValue: e.target.value })}
                            className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            placeholder="#"
                          />
                        </>
                      )}
                      <select
                        value={sendInvoiceFollowup.schedule}
                        onChange={(e) => setSendInvoiceFollowup({ ...sendInvoiceFollowup, schedule: e.target.value, scheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? sendInvoiceFollowup.scheduleValue : '' })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        {followupScheduleOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {(sendInvoiceFollowup.schedule === 'Weekly' || sendInvoiceFollowup.schedule === 'Weeks') && (
                        <>
                          <span className="text-sm text-gray-600">on</span>
                          <select
                            value={sendInvoiceFollowup.day}
                            onChange={(e) => setSendInvoiceFollowup({ ...sendInvoiceFollowup, day: e.target.value })}
                            className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                          >
                            {followupDayOptions.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </>
                      )}
                      {(sendInvoiceFollowup.schedule === 'Monthly' || sendInvoiceFollowup.schedule === 'Months') && (
                        <>
                          <span className="text-sm text-gray-600">on the</span>
                          <select
                            value={sendInvoiceFollowup.dayOfMonth}
                            onChange={(e) => setSendInvoiceFollowup({ ...sendInvoiceFollowup, dayOfMonth: e.target.value })}
                            className="w-16 px-1 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                          >
                            {followupDayOfMonthOptions.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </>
                      )}
                      <span className="text-sm text-gray-600">at</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {(sendInvoiceFollowup.times || ['9:00 AM']).map((time, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <select
                              value={time}
                              onChange={(e) => {
                                const newTimes = [...(sendInvoiceFollowup.times || ['9:00 AM'])];
                                newTimes[index] = e.target.value;
                                setSendInvoiceFollowup({ ...sendInvoiceFollowup, times: newTimes });
                              }}
                              className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            >
                              {followupTimeOptions.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            {(sendInvoiceFollowup.times || ['9:00 AM']).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newTimes = (sendInvoiceFollowup.times || ['9:00 AM']).filter((_, i) => i !== index);
                                  setSendInvoiceFollowup({ ...sendInvoiceFollowup, times: newTimes });
                                }}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                            {index < (sendInvoiceFollowup.times || ['9:00 AM']).length - 1 && (
                              <span className="text-sm text-gray-400">,</span>
                            )}
                          </div>
                        ))}
                        {(sendInvoiceFollowup.times || ['9:00 AM']).length < 5 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newTimes = [...(sendInvoiceFollowup.times || ['9:00 AM']), '12:00 PM'];
                              setSendInvoiceFollowup({ ...sendInvoiceFollowup, times: newTimes });
                            }}
                            className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">for</span>
                      <input
                        type="number"
                        min="1"
                        value={sendInvoiceFollowup.duration}
                        onChange={(e) => setSendInvoiceFollowup({ ...sendInvoiceFollowup, duration: e.target.value })}
                        className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        placeholder="#"
                      />
                      <select
                        value={sendInvoiceFollowup.durationUnit}
                        onChange={(e) => setSendInvoiceFollowup({ ...sendInvoiceFollowup, durationUnit: e.target.value })}
                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      >
                        {followupDurationUnitOptions.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              /* JOB FOLLOWUP SECTION - COMMENTED OUT
            ) : selectedSalesFlowStage === 'Job Followup' ? (
              <div className="space-y-6">
                {/* Job Followup Explanation *//*}
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Your AI Agent can automatically follow up with customers after job completion and payment, helping build relationships and gather valuable reviews for your business.
                  </p>
                </div>

                {/* Auto Send Thank You Toggle *//*}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">Automatically send thank you note after payment received</span>
                  <button
                    type="button"
                    onClick={() => setAutoSendThankYou(!autoSendThankYou)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      autoSendThankYou ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        autoSendThankYou ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Auto Send Job Review Toggle *//*}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">Automatically send job review request after payment received</span>
                  <button
                    type="button"
                    onClick={() => setAutoSendJobReview(!autoSendJobReview)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      autoSendJobReview ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        autoSendJobReview ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              END JOB FOLLOWUP SECTION */
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <p className="text-sm">Content for {selectedSalesFlowStage} will appear here</p>
              </div>
            )}
            </div>
        </div>
      </div>

      {/* Interactive Sales Flowchart */}
      {/* Lead Engagement Hooks Section */}
      <div className="sales-flow-section">
        <div className="sales-flow-title">
          <h3 className="sales-flow-title-text">Lead Engagement Hooks</h3>
        </div>

        {/* Two Column Layout: 20% Tabs | 80% Content */}
        <div className="flex gap-4">
          {/* Left Column - Tabs (20%) */}
          <div className="min-w-[200px] max-h-[600px] overflow-y-auto flex flex-col flex-shrink-0 gap-1 pr-2 sales-flow-hooks-scrollbar">
            {/* Video Section */}
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 mt-2 px-2">Video</h4>
            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Personal Greeting')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Personal Greeting'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Personal Greeting</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Job Demos')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Job Demos'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Star className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Job Demos</span>
            </button>

            {/* Photos and Graphics Section */}
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 mt-4 px-2">Photos and Graphics</h4>
            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Job Highlight')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Job Highlight'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Star className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Job Highlight</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Before & After')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Before & After'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Before & After</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Infographics')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Infographics'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Images className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Infographics</span>
            </button>

            {/* Reviews Section */}
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 mt-4 px-2">Reviews</h4>
            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Customer Reviews')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Customer Reviews'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <User className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Customer Reviews</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Online Reviews')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Online Reviews'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Globe className="w-5 h-5 text-violet-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Online Reviews</span>
            </button>

            {/* Miscellaneous Section */}
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 mt-4 px-2">Miscellaneous</h4>
            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Promotions')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Promotions'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Tag className="w-5 h-5 text-pink-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Promotions</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Experience')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Experience'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Experience</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Company Slogan')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Company Slogan'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-5 h-5 text-lime-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Company Slogan</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Company Qualities')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Company Qualities'
                  ? 'bg-slate-100 shadow-sm'
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Star className="w-5 h-5 text-cyan-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Company Qualities</span>
            </button>
          </div>

          {/* Right Column - Content (80%) */}
          <div className="flex-1 min-h-[600px] max-h-[600px] overflow-y-auto">
          {agentFlowSteps
            .sort((a, b) => a.order - b.order)
            .map((step, index) => {
              const isEditing = editingStepId === step.id;
              const isPersonalGreeting = step.id === 1;
              const isSalesPitchHooks = step.id === 2;
              const isBeforeAfter = step.id === 4;
              const isInfographics = step.id === 5;
              const isJobHighlight = step.id === 6;

              // Only show step id 1, 2, 4, 5, or 6 in this section
              if (!isPersonalGreeting && !isSalesPitchHooks && !isBeforeAfter && !isInfographics && !isJobHighlight) {
                return null;
              }
              
              // Special handling for Personal Greeting
              if (isPersonalGreeting && selectedSalesFlowHook === 'Personal Greeting') {
                const step = agentFlowSteps.find(s => s.id === 1);
                if (!step) return null;
                let mediaItems = step.mediaItems || [];
                // Ensure exactly one personal greeting slot is shown for display
                const displayItems = mediaItems.length === 0 
                  ? [{ id: 'temp-' + Date.now(), media: null, description: '', service: '' }]
                  : [mediaItems[0]];
                
                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
                  // Only allow a single personal greeting item
                  if (currentItems.length >= 1) return;
                  const newItem = { id: Date.now(), media: null, description: '', service: '', beforeAfter: '' };
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
                    const newItem = { id: Date.now(), media: null, description: '', service: '', beforeAfter: '' };
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
                            ? [{ id: Date.now(), media: null, description: '', service: '', beforeAfter: '' }]
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

                // VideoUploadBox component
                const VideoUploadBox = ({ onFileSelect, itemId = null, onDelete = null }) => (
                  <div className="relative">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors bg-white">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-6 h-6 text-slate-400 mb-1" />
                        <p className="text-xs text-slate-600 font-medium text-center px-2">Add video</p>
                      </div>
                      <input
                        type="file"
                        accept="video/mp4"
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
                  <div
                    key={step.id}
                    className="bg-slate-50 rounded-2xl p-5 min-h-[400px] flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                    </div>

                    {/* Personal Greeting Note */}
                    <div className="bg-slate-100 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">
                        Upload a short video introducing yourself and your business. (Must be MP4 video format, up to 60 seconds long, max 50 MB.)
                      </p>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
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
                                <VideoUploadBox
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

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                      <button
                        onClick={handleSavePersonalGreeting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        type="button"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                );
              }
              
              // If Personal Greeting step but not selected, don't render
              if (isPersonalGreeting) return null;
              
              // Special handling for Job Demos (Job Demos)
              if (isSalesPitchHooks && selectedSalesFlowHook === 'Job Demos') {
                const step = agentFlowSteps.find(s => s.id === 2);
                if (!step) return null;
                let mediaItems = step.mediaItems || [];
                // Ensure at least one media item exists for display
                const displayItems = mediaItems.length === 0
                  ? [{ id: 'temp-' + Date.now(), media: null, description: '', service: '', beforeAfter: '' }]
                  : mediaItems;

                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
                  // Limit to 10 items
                  if (currentItems.length >= 10) return;
                  const newItem = { id: Date.now(), media: null, description: '', service: '', beforeAfter: '' };
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
                    const newItem = { id: Date.now(), media: null, description: '', service: '', beforeAfter: '' };
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
                              ? [{ id: Date.now(), media: null, description: '', service: '', beforeAfter: '' }]
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
                  // Validate that all items with media have services and description
                  const itemsWithMedia = currentItems.filter(item => item.media);
                  const invalidItems = itemsWithMedia.filter(item => !item.services || item.services.length === 0 || !item.description || item.description.trim() === '');
                  if (invalidItems.length > 0) {
                    alert('Please fill in at least one service and description for all uploaded media.');
                    return;
                  }
                  // Save the media items data
                  console.log('Saving Job Demos:', currentItems);
                  // Here you can add API call to save the data
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

                // ServiceDropdown component (multi-select)
                const ServiceDropdown = ({ itemId, selectedServices = [], onServicesChange }) => {
                  const [isOpen, setIsOpen] = useState(false);
                  const [searchTerm, setSearchTerm] = useState('');

                  const filteredServices = allServices.filter(service =>
                    service.toLowerCase().includes(searchTerm.toLowerCase())
                  );

                  const toggleService = (service) => {
                    const services = selectedServices || [];
                    if (services.includes(service)) {
                      onServicesChange(services.filter(s => s !== service));
                    } else {
                      onServicesChange([...services, service]);
                    }
                  };

                  const removeService = (e, service) => {
                    e.stopPropagation();
                    const services = selectedServices || [];
                    onServicesChange(services.filter(s => s !== service));
                  };

                  return (
                    <div className="service-dropdown-multi">
                      <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={`service-dropdown-button ${isOpen ? 'service-dropdown-button-open' : ''}`}
                      >
                        <span className="service-dropdown-text">
                          {(selectedServices || []).length === 0 ? 'Select services' : `${selectedServices.length} selected`}
                        </span>
                        <ChevronDown className={`service-dropdown-chevron ${isOpen ? 'service-dropdown-chevron-open' : ''}`} />
                      </button>

                      {(selectedServices || []).length > 0 && (
                        <div className="service-pills">
                          {selectedServices.map((service) => (
                            <span key={service} className="service-pill">
                              {service}
                              <button
                                type="button"
                                onClick={(e) => removeService(e, service)}
                                className="service-pill-remove"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

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
                                filteredServices.map((service) => {
                                  const isSelected = (selectedServices || []).includes(service);
                                  return (
                                    <button
                                      key={service}
                                      type="button"
                                      onClick={() => toggleService(service)}
                                      className={`service-dropdown-item-multi ${isSelected ? 'service-dropdown-item-selected' : ''}`}
                                    >
                                      <div className={`w-4 h-4 rounded border flex items-center justify-center mr-2 ${
                                        isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                                      }`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                      </div>
                                      {service}
                                    </button>
                                  );
                                })
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

                // VideoUploadBox component
                const VideoUploadBox = ({ onFileSelect, itemId = null, onDelete = null }) => (
                  <div className="photo-upload-box">
                    <label className="photo-upload-label">
                      <div className="photo-upload-content">
                        <Upload className="photo-upload-icon" />
                        <p className="photo-upload-text">Add video</p>
                      </div>
                      <input
                        type="file"
                        accept="video/mp4"
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
                  <div
                    key={step.id}
                    className="bg-slate-50 rounded-2xl p-5 min-h-[400px] flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                    </div>

                    {/* Job Demos Note */}
                    <div className="bg-slate-100 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">
                        Upload videos showcasing your work. Select the service type for each video to help match demos with customer inquiries. (Must be MP4 video format, up to 60 seconds long, max 50 MB.)
                      </p>
                    </div>

                    <div className="flex-1 section-spacing overflow-y-auto mb-4">
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
                                <VideoUploadBox
                                  onFileSelect={(file) => updateMediaItem(item.id, 'media', file)}
                                  itemId={item.id}
                                  onDelete={displayItems.length > 1 ? () => removeMediaItem(item.id) : null}
                                />
                              )}

                              <div className="media-item-fields">
                                <ServiceDropdown
                                  itemId={item.id}
                                  selectedServices={item.services || []}
                                  onServicesChange={(services) => updateMediaItem(item.id, 'services', services)}
                                />
                                <div className="media-description-wrapper">
                                  <textarea
                                    value={item.description || ''}
                                    onChange={(e) => updateMediaItem(item.id, 'description', e.target.value)}
                                    className="media-description-input"
                                    placeholder="Add short description"
                                    maxLength={150}
                                  />
                                  <span className="media-description-counter">{(item.description || '').length}/150</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {(step.mediaItems || []).length < 10 && (
                          <div className="mt-3">
                            <button
                              onClick={addMediaItem}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                              type="button"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">Add Another Video</span>
                            </button>
                          </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                      <button
                        onClick={handleSaveSalesPitchHooks}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        type="button"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                );
              }
              
              // If Job Demos step but not selected, don't render
              if (isSalesPitchHooks) return null;
              
              // Special handling for Before & After
              if (isBeforeAfter && selectedSalesFlowHook === 'Before & After') {
                const step = agentFlowSteps.find(s => s.id === 4);
                if (!step) return null;
                let mediaItems = step.mediaItems || [];
                // Ensure at least one media item exists for display
                const displayItems = mediaItems.length === 0
                  ? [{ id: 'temp-' + Date.now(), media: null, description: '', service: '', beforeAfter: '' }]
                  : mediaItems;

                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
                  // Limit to 10 items
                  if (currentItems.length >= 10) return;
                  const newItem = { id: Date.now(), media: null, description: '', service: '', beforeAfter: '' };
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
                    const newItem = { id: Date.now(), media: null, description: '', service: '', beforeAfter: '' };
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
                              ? [{ id: Date.now(), media: null, description: '', service: '', beforeAfter: '' }]
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
                
                const handleSaveBeforeAfter = () => {
                  const currentItems = step.mediaItems || [];
                  // Validate that all items with media have service and description
                  const itemsWithMedia = currentItems.filter(item => item.media);
                  const invalidItems = itemsWithMedia.filter(item => !item.service || !item.description || item.description.trim() === '');
                  if (invalidItems.length > 0) {
                    alert('Please fill in service and description for all uploaded media.');
                    return;
                  }
                  // Save the media items data
                  console.log('Saving Before & After:', currentItems);
                  // Here you can add API call to save the data
                  alert('Before & After saved successfully!');
                };

                // Title header for Before & After
                const BeforeAfterTitle = () => (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                  </div>
                );

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
                        className={`service-dropdown-button ${isOpen ? 'service-dropdown-button-open' : ''}`}
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
                  <div
                    key={step.id}
                    className="bg-slate-50 rounded-2xl p-5 min-h-[400px] flex flex-col"
                  >
                    <BeforeAfterTitle />

                    {/* Before & After Note */}
                    <div className="bg-slate-100 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">
                        Upload before and after photos to showcase the transformation and quality of your work. (Upload JPG/PNG (≤5MB). Images auto-resized for fast delivery.)
                      </p>
                    </div>

                    <div className="flex-1 section-spacing overflow-y-auto mb-4">
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

                              <div className="media-item-fields">
                                <ServiceDropdown
                                  itemId={item.id}
                                  selectedService={item.service || ''}
                                  onServiceChange={(service) => updateMediaItem(item.id, 'service', service)}
                                />
                                <div className="media-description-wrapper">
                                  <textarea
                                    value={item.description || ''}
                                    onChange={(e) => updateMediaItem(item.id, 'description', e.target.value)}
                                    className="media-description-input"
                                    placeholder="Add short description"
                                    maxLength={150}
                                  />
                                  <span className="media-description-counter">{(item.description || '').length}/150</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {(step.mediaItems || []).length < 10 && (
                          <div className="mt-3">
                            <button
                              onClick={addMediaItem}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                              type="button"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">Add Another Photo</span>
                            </button>
                          </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                      <button
                        onClick={handleSaveBeforeAfter}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        type="button"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                );
              }
              
              // If Before & After step but not selected, don't render
              if (isBeforeAfter) return null;

              // Special handling for Infographics
              if (isInfographics && selectedSalesFlowHook === 'Infographics') {
                const step = agentFlowSteps.find(s => s.id === 5);
                if (!step) return null;
                let mediaItems = step.mediaItems || [];
                // Ensure at least one media item exists for display
                const displayItems = mediaItems.length === 0
                  ? [{ id: 'temp-' + Date.now(), media: null, description: '', service: '' }]
                  : mediaItems;

                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
                  // Limit to 10 items
                  if (currentItems.length >= 10) return;
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

                const handleSaveInfographics = () => {
                  const currentItems = step.mediaItems || [];
                  // Validate that all items with media have service and description
                  const itemsWithMedia = currentItems.filter(item => item.media);
                  const invalidItems = itemsWithMedia.filter(item => !item.service || !item.description || item.description.trim() === '');
                  if (invalidItems.length > 0) {
                    alert('Please fill in service and description for all uploaded media.');
                    return;
                  }
                  // Save the media items data
                  console.log('Saving Infographics:', currentItems);
                  // Here you can add API call to save the data
                  alert('Infographics saved successfully!');
                };

                // Title header for Infographics
                const InfographicsTitle = () => (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Images className="w-5 h-5 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                  </div>
                );

                // Get all services alphabetized
                const allServices = [
                  ...softWashingServices,
                  ...customSoftWashingServices,
                  ...pressureWashingServices,
                  ...customPressureWashingServices,
                  ...specialtyCleaningServices,
                  ...customSpecialtyCleaningServices
                ].sort((a, b) => a.localeCompare(b));

                // ServiceDropdown component for Infographics
                const InfographicsServiceDropdown = ({ itemId, selectedService, onServiceChange }) => {
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
                        className={`service-dropdown-button ${isOpen ? 'service-dropdown-button-open' : ''}`}
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

                // PhotoUploadBox component for Infographics
                const InfographicsUploadBox = ({ onFileSelect, itemId = null, onDelete = null }) => (
                  <div className="photo-upload-box">
                    <label className="photo-upload-label">
                      <div className="photo-upload-content">
                        <Upload className="photo-upload-icon" />
                        <p className="photo-upload-text">Add infographic</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
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
                  <div
                    key={step.id}
                    className="bg-slate-50 rounded-2xl p-5 min-h-[400px] flex flex-col"
                  >
                    <InfographicsTitle />

                    {/* Infographics Note */}
                    <div className="bg-slate-100 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">
                        Upload infographics to educate customers about your services, processes, or industry tips. (Upload JPG/PNG (≤5MB). Images auto-resized for fast delivery.)
                      </p>
                    </div>

                    <div className="flex-1 section-spacing overflow-y-auto mb-4">
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
                                  ) : null}
                                </div>
                              ) : (
                                <InfographicsUploadBox
                                  onFileSelect={(file) => updateMediaItem(item.id, 'media', file)}
                                  itemId={item.id}
                                  onDelete={displayItems.length > 1 ? () => removeMediaItem(item.id) : null}
                                />
                              )}

                              <div className="media-item-fields">
                                <InfographicsServiceDropdown
                                  itemId={item.id}
                                  selectedService={item.service || ''}
                                  onServiceChange={(service) => updateMediaItem(item.id, 'service', service)}
                                />
                                <div className="media-description-wrapper">
                                  <textarea
                                    value={item.description || ''}
                                    onChange={(e) => updateMediaItem(item.id, 'description', e.target.value)}
                                    className="media-description-input"
                                    placeholder="Add short description"
                                    maxLength={150}
                                  />
                                  <span className="media-description-counter">{(item.description || '').length}/150</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {(step.mediaItems || []).length < 10 && (
                          <div className="mt-3">
                            <button
                              onClick={addMediaItem}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                              type="button"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">Add Another Infographic</span>
                            </button>
                          </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                      <button
                        onClick={handleSaveInfographics}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        type="button"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                );
              }

              // If Infographics step but not selected, don't render
              if (isInfographics) return null;

              // Special handling for Job Highlight
              if (isJobHighlight && selectedSalesFlowHook === 'Job Highlight') {
                const step = agentFlowSteps.find(s => s.id === 6);
                if (!step) return null;
                let mediaItems = step.mediaItems || [];
                // Ensure at least one media item exists for display
                const displayItems = mediaItems.length === 0
                  ? [{ id: 'temp-' + Date.now(), media: null, description: '', service: '' }]
                  : mediaItems;

                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
                  // Limit to 10 items
                  if (currentItems.length >= 10) return;
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

                const handleSaveJobHighlight = () => {
                  const currentItems = step.mediaItems || [];
                  // Validate that all items with media have service and description
                  const itemsWithMedia = currentItems.filter(item => item.media);
                  const invalidItems = itemsWithMedia.filter(item => !item.service || !item.description || item.description.trim() === '');
                  if (invalidItems.length > 0) {
                    alert('Please fill in service and description for all uploaded media.');
                    return;
                  }
                  // Save the media items data
                  console.log('Saving Job Highlight:', currentItems);
                  alert('Job Highlight saved successfully!');
                };

                // Title header for Job Highlight
                const JobHighlightTitle = () => (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                  </div>
                );

                // Get all services alphabetized
                const allServices = [
                  ...softWashingServices,
                  ...customSoftWashingServices,
                  ...pressureWashingServices,
                  ...customPressureWashingServices,
                  ...specialtyCleaningServices,
                  ...customSpecialtyCleaningServices
                ].sort((a, b) => a.localeCompare(b));

                // ServiceDropdown component for Job Highlight
                const JobHighlightServiceDropdown = ({ itemId, selectedService, onServiceChange }) => {
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
                        className={`service-dropdown-button ${isOpen ? 'service-dropdown-button-open' : ''}`}
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

                // PhotoUploadBox component for Job Highlight
                const JobHighlightUploadBox = ({ onFileSelect, itemId = null, onDelete = null }) => (
                  <div className="photo-upload-box">
                    <label className="photo-upload-label">
                      <div className="photo-upload-content">
                        <Upload className="photo-upload-icon" />
                        <p className="photo-upload-text">Add photo</p>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
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
                  <div
                    key={step.id}
                    className="bg-slate-50 rounded-2xl p-5 min-h-[400px] flex flex-col"
                  >
                    <JobHighlightTitle />

                    {/* Job Highlight Note */}
                    <div className="bg-slate-100 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">
                        Showcase your best work by adding photos of exceptional jobs you want to highlight. (Upload JPG/PNG (≤5MB). Images auto-resized for fast delivery.)
                      </p>
                    </div>

                    <div className="flex-1 section-spacing overflow-y-auto mb-4">
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
                                  ) : null}
                                </div>
                              ) : (
                                <JobHighlightUploadBox
                                  onFileSelect={(file) => updateMediaItem(item.id, 'media', file)}
                                  itemId={item.id}
                                  onDelete={displayItems.length > 1 ? () => removeMediaItem(item.id) : null}
                                />
                              )}

                              <div className="media-item-fields">
                                <JobHighlightServiceDropdown
                                  itemId={item.id}
                                  selectedService={item.service || ''}
                                  onServiceChange={(service) => updateMediaItem(item.id, 'service', service)}
                                />
                                <div className="media-description-wrapper">
                                  <textarea
                                    value={item.description || ''}
                                    onChange={(e) => updateMediaItem(item.id, 'description', e.target.value)}
                                    className="media-description-input"
                                    placeholder="Add short description"
                                    maxLength={150}
                                  />
                                  <span className="media-description-counter">{(item.description || '').length}/150</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {(step.mediaItems || []).length < 10 && (
                          <div className="mt-3">
                            <button
                              onClick={addMediaItem}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                              type="button"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">Add Another Photo</span>
                            </button>
                          </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-200 flex-shrink-0">
                      <button
                        onClick={handleSaveJobHighlight}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        type="button"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                );
              }

              // If Job Highlight step but not selected, don't render
              if (isJobHighlight) return null;

              return (
                <div key={step.id} className="step-container">
                  <div className={`step-box ${!isPersonalGreeting && !isSalesPitchHooks && !isBeforeAfter && !isInfographics && !isJobHighlight ? 'step-box-editable' : ''}`}>
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

            {/* Company Slogan Content */}
            {selectedSalesFlowHook === 'Company Slogan' && (
              <div className="bg-slate-50 rounded-2xl p-6 h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-lime-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Company Slogan</h3>
                    {savedBrandIdentity?.companySlogan && !editingBrandIdentity && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBrandIdentity(true);
                          updateCompanyInfo('companySlogan', savedBrandIdentity.companySlogan);
                        }}
                        className="group p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                      </button>
                    )}
                  </div>

                  {/* Company Slogan Note */}
                  <div className="bg-slate-100 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">
                      A memorable slogan helps customers remember your brand and what you stand for.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {savedBrandIdentity?.companySlogan && !editingBrandIdentity ? (
                      <div className="bg-white rounded-xl p-4 border border-slate-200">
                        <p className="text-sm italic text-gray-600">{savedBrandIdentity.companySlogan}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Enter your company slogan</label>
                          <input
                            type="text"
                            value={companyInfo.companySlogan || ''}
                            onChange={(e) => updateCompanyInfo('companySlogan', e.target.value)}
                            placeholder="e.g., Quality service you can trust"
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                          />
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={() => {
                              if (companyInfo.companySlogan?.trim()) {
                                setSavedBrandIdentity({
                                  ...savedBrandIdentity,
                                  companySlogan: companyInfo.companySlogan
                                });
                                setEditingBrandIdentity(false);
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
              </div>
            )}

            {/* Experience Content */}
            {selectedSalesFlowHook === 'Experience' && (
              <div className="bg-slate-50 rounded-2xl p-6 h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Experience</h3>
                    {(savedBrandIdentity?.experienceYears || savedBrandIdentity?.jobsCompleted) && !editingBrandIdentity && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBrandIdentity(true);
                          updateCompanyInfo('experienceYears', savedBrandIdentity.experienceYears);
                          updateCompanyInfo('jobsCompleted', savedBrandIdentity.jobsCompleted);
                        }}
                        className="group p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                      </button>
                    )}
                  </div>

                  {/* Experience Note */}
                  <div className="bg-slate-100 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">
                      Highlight your experience to build credibility. Share how long you've been in business and the number of jobs you've completed.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {(savedBrandIdentity?.experienceYears || savedBrandIdentity?.jobsCompleted) && !editingBrandIdentity ? (
                      <div className="flex gap-4">
                        {savedBrandIdentity.experienceYears && (
                          <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Years in Business</label>
                            <p className="text-2xl font-bold italic text-gray-900">{savedBrandIdentity.experienceYears}</p>
                          </div>
                        )}
                        {savedBrandIdentity.jobsCompleted && (
                          <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Jobs Completed</label>
                            <p className="text-2xl font-bold italic text-gray-900">{savedBrandIdentity.jobsCompleted}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
                            <input
                              type="number"
                              min="0"
                              value={companyInfo.experienceYears || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d+$/.test(value)) {
                                  updateCompanyInfo('experienceYears', value);
                                }
                              }}
                              placeholder="0"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                            />
                          </div>
                          <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Jobs Completed (Estimate)</label>
                            <input
                              type="number"
                              min="0"
                              value={companyInfo.jobsCompleted || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d+$/.test(value)) {
                                  updateCompanyInfo('jobsCompleted', value);
                                }
                              }}
                              placeholder="0"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={() => {
                              if (companyInfo.experienceYears?.toString().trim() || companyInfo.jobsCompleted?.toString().trim()) {
                                setSavedBrandIdentity({
                                  ...savedBrandIdentity,
                                  experienceYears: companyInfo.experienceYears,
                                  jobsCompleted: companyInfo.jobsCompleted
                                });
                                setEditingBrandIdentity(false);
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
              </div>
            )}

            {/* Company Qualities Content */}
            {selectedSalesFlowHook === 'Company Qualities' && (
              <div className="bg-slate-50 rounded-2xl p-6 h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Company Qualities</h3>
                    {savedBrandIdentity?.whatMakesDifferent?.length > 0 && !editingBrandIdentity && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBrandIdentity(true);
                          updateCompanyInfo('whatMakesDifferent', savedBrandIdentity.whatMakesDifferent);
                        }}
                        className="group p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                      </button>
                    )}
                  </div>

                  {/* Company Qualities Note */}
                  <div className="bg-slate-100 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">
                      Select the qualities that best describe what sets your company apart from competitors.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {savedBrandIdentity?.whatMakesDifferent?.length > 0 && !editingBrandIdentity ? (
                      <div className="bg-white rounded-xl p-4">
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
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4">
                          <label className="block text-sm font-medium text-gray-700 mb-3">Select up to 3 qualities that define your company</label>
                          <div className="flex flex-wrap gap-3">
                            {[...(companyQualities || []), ...(customCompanyQualities || [])].map((quality) => {
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
                                value={newCompanyQuality || ''}
                                onChange={(e) => setNewCompanyQuality(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addCustomCompanyQuality()}
                                placeholder="Add quality..."
                                className="bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm w-32"
                              />
                              <button
                                type="button"
                                onClick={addCustomCompanyQuality}
                                className="text-blue-600 hover:text-blue-700"
                                disabled={!newCompanyQuality?.trim()}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={() => {
                              if (companyInfo.whatMakesDifferent?.length > 0) {
                                setSavedBrandIdentity({
                                  ...savedBrandIdentity,
                                  whatMakesDifferent: companyInfo.whatMakesDifferent
                                });
                                setEditingBrandIdentity(false);
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
              </div>
            )}

            {/* Promotions Content */}
            {selectedSalesFlowHook === 'Promotions' && (
              <div className="bg-slate-50 rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-5 h-5 text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 flex-1">Promotions <span className="text-lg font-normal text-gray-600">(add up to 10 promotions)</span></h3>
                  {savedSalesFlowPromotions.length > 0 && (companyInfo.promotionsList || []).length === 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        // Move all saved promotions back to editable
                        updateCompanyInfo('promotionsList', [...savedSalesFlowPromotions]);
                        setSavedSalesFlowPromotions([]);
                      }}
                      className="group p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                    </button>
                  )}
                </div>

                {/* Promotions Note */}
                <div className="bg-slate-100 rounded-lg p-4 mb-4 flex-shrink-0">
                  <p className="text-sm text-gray-600">
                    Add promotions and special offers to share with potential customers during conversations.
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(100vh - 400px)' }}>
                  {/* Saved Promotions - Display Mode */}
                  {savedSalesFlowPromotions.length > 0 && (companyInfo.promotionsList || []).length === 0 && (
                    <div className="space-y-3">
                      {savedSalesFlowPromotions.map((promotion) => (
                        <div key={promotion.id} className="p-4 bg-white rounded-xl border border-slate-200 relative">
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                // Move this promotion to editable
                                const updatedSaved = savedSalesFlowPromotions.filter(p => p.id !== promotion.id);
                                setSavedSalesFlowPromotions(updatedSaved);
                                updateCompanyInfo('promotionsList', [
                                  ...(companyInfo.promotionsList || []),
                                  { ...promotion }
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
                                const updated = savedSalesFlowPromotions.filter(p => p.id !== promotion.id);
                                setSavedSalesFlowPromotions(updated);
                              }}
                              className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                            </button>
                          </div>
                          <div className="pr-20 space-y-2">
                            <p className="text-sm font-semibold text-gray-900">{promotion.title || 'Untitled Promotion'}</p>
                            {promotion.services && promotion.services.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {promotion.services.map((service, idx) => (
                                  <span key={idx} className="px-2 py-0.5 bg-pink-50 text-pink-700 text-xs rounded-full">{service}</span>
                                ))}
                              </div>
                            )}
                            {promotion.terms && <p className="text-sm text-gray-600 mt-2">{promotion.terms}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Editable Promotions */}
                  {((companyInfo.promotionsList || []).length > 0 || savedSalesFlowPromotions.length === 0) && (
                    <div className="space-y-4">
                      {(companyInfo.promotionsList || []).length === 0 && savedSalesFlowPromotions.length === 0 && (
                        <div className="bg-white rounded-xl p-4 border border-slate-200 relative">
                          <div className="space-y-3 pr-8">
                            {/* Promotion Title */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Promotion Title</label>
                              <input
                                type="text"
                                placeholder="e.g., Summer Special 20% Off"
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                                onBlur={(e) => {
                                  if (e.target.value.trim()) {
                                    updateCompanyInfo('promotionsList', [
                                      { id: Date.now() + Math.random(), title: e.target.value, services: [], terms: '' }
                                    ]);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && e.target.value.trim()) {
                                    updateCompanyInfo('promotionsList', [
                                      { id: Date.now() + Math.random(), title: e.target.value, services: [], terms: '' }
                                    ]);
                                  }
                                }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 italic">Type a title and press Enter or click outside to add promotion</p>
                          </div>
                        </div>
                      )}
                      {(companyInfo.promotionsList || []).map((promotion, index) => {
                        // Build services list from props
                        const allServices = [
                          ...(softWashingServices || []).filter(s => s.selected).map(s => s.name),
                          ...(customSoftWashingServices || []),
                          ...(pressureWashingServices || []).filter(s => s.selected).map(s => s.name),
                          ...(customPressureWashingServices || []),
                          ...(specialtyCleaningServices || []).filter(s => s.selected).map(s => s.name),
                          ...(customSpecialtyCleaningServices || [])
                        ];

                        return (
                          <div key={promotion.id} className="bg-white rounded-xl p-4 border border-slate-200 relative">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (companyInfo.promotionsList || []).filter(p => p.id !== promotion.id);
                                updateCompanyInfo('promotionsList', updated);
                              }}
                              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <div className="space-y-3 pr-8">
                              {/* Promotion Title */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Promotion Title</label>
                                <input
                                  type="text"
                                  value={promotion.title || ''}
                                  onChange={(e) => {
                                    const updated = (companyInfo.promotionsList || []).map(p =>
                                      p.id === promotion.id ? { ...p, title: e.target.value } : p
                                    );
                                    updateCompanyInfo('promotionsList', updated);
                                  }}
                                  placeholder="e.g., Summer Special 20% Off"
                                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                                />
                              </div>

                              {/* Services Covered */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Services Covered</label>
                                <div className="relative" data-services-dropdown={openServicesDropdownId === promotion.id ? "true" : undefined}>
                                  <button
                                    type="button"
                                    onClick={() => setOpenServicesDropdownId(openServicesDropdownId === promotion.id ? null : promotion.id)}
                                    className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                  >
                                    <div className="flex flex-wrap gap-1.5 flex-1">
                                      {(promotion.services || []).length === 0 ? (
                                        <span className="text-sm text-gray-400">Select services...</span>
                                      ) : (
                                        (promotion.services || []).map((serviceName) => (
                                          <span
                                            key={serviceName}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
                                          >
                                            {serviceName}
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                const newServices = (promotion.services || []).filter(s => s !== serviceName);
                                                const updated = (companyInfo.promotionsList || []).map(p =>
                                                  p.id === promotion.id ? { ...p, services: newServices } : p
                                                );
                                                updateCompanyInfo('promotionsList', updated);
                                              }}
                                              className="ml-0.5 text-blue-400 hover:text-blue-600"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </span>
                                        ))
                                      )}
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openServicesDropdownId === promotion.id ? 'rotate-180' : ''}`} />
                                  </button>
                                  {openServicesDropdownId === promotion.id && (
                                    <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                      {(allServices.length > 0 ? allServices : ['Roof Cleaning', 'House Washing', 'Driveway Cleaning']).map((service) => {
                                        const isSelected = (promotion.services || []).includes(service);
                                        return (
                                          <button
                                            key={service}
                                            type="button"
                                            onClick={() => {
                                              const newServices = isSelected
                                                ? (promotion.services || []).filter(s => s !== service)
                                                : [...(promotion.services || []), service];
                                              const updated = (companyInfo.promotionsList || []).map(p =>
                                                p.id === promotion.id ? { ...p, services: newServices } : p
                                              );
                                              updateCompanyInfo('promotionsList', updated);
                                            }}
                                            className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                                              isSelected
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-700 hover:bg-slate-50'
                                            }`}
                                          >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                              isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                                            }`}>
                                              {isSelected && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <span>{service}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Promotion Terms */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Promotion Terms</label>
                                <textarea
                                  value={promotion.terms || ''}
                                  onChange={(e) => {
                                    // Handle temp item - create new item in list
                                    if (promotion.id.toString().startsWith('temp-')) {
                                      updateCompanyInfo('promotionsList', [
                                        { id: Date.now() + Math.random(), title: '', services: [], terms: e.target.value }
                                      ]);
                                      return;
                                    }
                                    const updated = (companyInfo.promotionsList || []).map(p =>
                                      p.id === promotion.id ? { ...p, terms: e.target.value } : p
                                    );
                                    updateCompanyInfo('promotionsList', updated);
                                  }}
                                  rows={3}
                                  placeholder="Enter promotion details and terms..."
                                  className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Add Promotion button - shown when editing and total promotions < 10 */}
                      {(savedSalesFlowPromotions.length + (companyInfo.promotionsList || []).length) < 10 && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              updateCompanyInfo('promotionsList', [
                                ...(companyInfo.promotionsList || []),
                                { id: Date.now() + Math.random(), title: '', services: [], terms: '' }
                              ]);
                            }}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            <span className="text-sm font-medium">{(companyInfo.promotionsList || []).length > 0 ? 'Add Another Promotion' : 'Add Promotion'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Divider and Add Promotion button - only shown when there's at least one saved promotion and no editable ones */}
                  {savedSalesFlowPromotions.length > 0 && (companyInfo.promotionsList || []).length === 0 && savedSalesFlowPromotions.length < 10 && (
                    <>
                      <div className="border-t border-slate-300 mt-4"></div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            updateCompanyInfo('promotionsList', [
                              { id: Date.now() + Math.random(), title: '', services: [], terms: '' }
                            ]);
                          }}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-sm font-medium">Add Promotion</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Save button at bottom right - always visible */}
                <div className="flex justify-end items-center gap-3 pt-4 flex-shrink-0 border-t border-slate-200 mt-4">
                  {promotionsSaveAttempted && (
                    (companyInfo.promotionsList || []).length === 0 ||
                    (companyInfo.promotionsList || []).some(p =>
                      !p.title || p.title.trim() === '' ||
                      !p.services || p.services.length === 0 ||
                      !p.terms || p.terms.trim() === ''
                    )
                  ) && (
                    <span className="text-red-600 text-sm font-medium flex items-center">
                      <span className="text-red-500 mr-1">*</span> All fields must be present to save
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setPromotionsSaveAttempted(true);

                      // Check if there are any promotions to save
                      const promotionsList = companyInfo.promotionsList || [];
                      if (promotionsList.length === 0) {
                        return;
                      }

                      // Validate all promotions - check if any promotion is missing required fields
                      const hasError = promotionsList.some(promotion =>
                        !promotion.title || promotion.title.trim() === '' ||
                        !promotion.services || promotion.services.length === 0 ||
                        !promotion.terms || promotion.terms.trim() === ''
                      );

                      if (hasError) {
                        return;
                      }

                      // Check if we're at limit
                      if (savedSalesFlowPromotions.length + promotionsList.length > 10) {
                        alert('Maximum of 10 promotions allowed');
                        return;
                      }

                      // Save all editable promotions
                      const newSavedPromotions = [...savedSalesFlowPromotions, ...promotionsList];
                      setSavedSalesFlowPromotions(newSavedPromotions);

                      // Clear editable list and reset states
                      updateCompanyInfo('promotionsList', []);
                      setPromotionsSaveAttempted(false);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Customer Reviews Content */}
            {selectedSalesFlowHook === 'Customer Reviews' && (
              <div className="bg-slate-50 rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-rose-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 flex-1">Customer Reviews <span className="text-lg font-normal text-gray-600">(add up to 10 reviews)</span></h3>
                  {savedCustomerReviews.length > 0 && (companyInfo.customerReviewsList || []).length === 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        // Move all saved reviews back to editable
                        updateCompanyInfo('customerReviewsList', [...savedCustomerReviews]);
                        setSavedCustomerReviews([]);
                      }}
                      className="group p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                    </button>
                  )}
                </div>

                {/* Customer Reviews Note */}
                <div className="bg-slate-100 rounded-lg p-4 mb-4 flex-shrink-0">
                  <p className="text-sm text-gray-600">
                    Add testimonials from satisfied customers to build trust and credibility with potential clients.
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(100vh - 400px)' }}>
                  {/* Saved Customer Reviews - Display Mode */}
                  {savedCustomerReviews.length > 0 && (companyInfo.customerReviewsList || []).length === 0 && (
                    <div className="space-y-3">
                      {savedCustomerReviews.map((review) => (
                        <div key={review.id} className="p-4 bg-white rounded-xl border border-slate-200 relative">
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                // Move this review to editable
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
                          <div className="pr-20 space-y-1">
                            <p className="text-sm font-medium text-gray-900">{review.customerName || 'Anonymous'}</p>
                            {review.service && <p className="text-xs text-blue-600">{review.service}</p>}
                            <p className="text-sm italic text-gray-600 mt-2">{review.reviewText}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Editable Customer Reviews */}
                  {((companyInfo.customerReviewsList || []).length > 0 || savedCustomerReviews.length === 0) && (
                    <div className="space-y-4">
                      {((companyInfo.customerReviewsList || []).length === 0 && savedCustomerReviews.length === 0
                        ? [{ id: 'temp-' + Date.now(), customerName: '', service: '', reviewText: '' }]
                        : (companyInfo.customerReviewsList || [])
                      ).map((review, index) => {
                        // Build services list from props
                        const allServices = [
                          ...(softWashingServices || []).filter(s => s.selected).map(s => s.name),
                          ...(customSoftWashingServices || []),
                          ...(pressureWashingServices || []).filter(s => s.selected).map(s => s.name),
                          ...(customPressureWashingServices || []),
                          ...(specialtyCleaningServices || []).filter(s => s.selected).map(s => s.name),
                          ...(customSpecialtyCleaningServices || [])
                        ];

                        return (
                          <div key={review.id} className="bg-white rounded-xl p-4 border border-slate-200 relative">
                            {/* Hide delete button for temp items (initial empty form) */}
                            {!review.id.toString().startsWith('temp-') && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = (companyInfo.customerReviewsList || []).filter(r => r.id !== review.id);
                                  updateCompanyInfo('customerReviewsList', updated);
                                }}
                                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <div className="space-y-3 pr-8">
                              {/* Customer Name */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name</label>
                                <input
                                  type="text"
                                  value={review.customerName || ''}
                                  onChange={(e) => {
                                    // Handle temp item - create new item in list
                                    if (review.id.toString().startsWith('temp-')) {
                                      updateCompanyInfo('customerReviewsList', [
                                        { id: Date.now() + Math.random(), customerName: e.target.value, service: '', reviewText: '' }
                                      ]);
                                      return;
                                    }
                                    const updated = (companyInfo.customerReviewsList || []).map(r =>
                                      r.id === review.id ? { ...r, customerName: e.target.value } : r
                                    );
                                    updateCompanyInfo('customerReviewsList', updated);
                                  }}
                                  placeholder="e.g., John D."
                                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                                />
                              </div>

                              {/* Service Dropdown */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Service (optional)</label>
                                <select
                                  value={review.service || ''}
                                  onChange={(e) => {
                                    // Handle temp item - create new item in list
                                    if (review.id.toString().startsWith('temp-')) {
                                      updateCompanyInfo('customerReviewsList', [
                                        { id: Date.now() + Math.random(), customerName: '', service: e.target.value, reviewText: '' }
                                      ]);
                                      return;
                                    }
                                    const updated = (companyInfo.customerReviewsList || []).map(r =>
                                      r.id === review.id ? { ...r, service: e.target.value } : r
                                    );
                                    updateCompanyInfo('customerReviewsList', updated);
                                  }}
                                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm bg-white shadow-sm focus:outline-none"
                                >
                                  <option value="">Select a service...</option>
                                  {(allServices.length > 0 ? allServices : ['Roof Cleaning', 'House Washing', 'Driveway Cleaning']).map((service, idx) => (
                                    <option key={idx} value={service}>{service}</option>
                                  ))}
                                </select>
                              </div>

                              {/* Review Text */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Review</label>
                                <textarea
                                  value={review.reviewText || ''}
                                  onChange={(e) => {
                                    // Handle temp item - create new item in list
                                    if (review.id.toString().startsWith('temp-')) {
                                      updateCompanyInfo('customerReviewsList', [
                                        { id: Date.now() + Math.random(), customerName: '', service: '', reviewText: e.target.value }
                                      ]);
                                      return;
                                    }
                                    const updated = (companyInfo.customerReviewsList || []).map(r =>
                                      r.id === review.id ? { ...r, reviewText: e.target.value } : r
                                    );
                                    updateCompanyInfo('customerReviewsList', updated);
                                  }}
                                  rows={3}
                                  placeholder="Enter a customer review..."
                                  className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Add Review button - shown when editing and total reviews < 10 */}
                      {(savedCustomerReviews.length + (companyInfo.customerReviewsList || []).length) < 10 && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              updateCompanyInfo('customerReviewsList', [
                                ...(companyInfo.customerReviewsList || []),
                                { id: Date.now() + Math.random(), customerName: '', service: '', reviewText: '' }
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
                  {savedCustomerReviews.length > 0 && (companyInfo.customerReviewsList || []).length === 0 && savedCustomerReviews.length < 10 && (
                    <>
                      <div className="border-t border-slate-300 mt-4"></div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            updateCompanyInfo('customerReviewsList', [
                              { id: Date.now() + Math.random(), customerName: '', service: '', reviewText: '' }
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

                </div>

                {/* Save button at bottom right - always visible */}
                <div className="flex justify-end items-center gap-3 pt-4 flex-shrink-0 border-t border-slate-200 mt-4">
                  {customerReviewsSaveAttempted && (
                    (companyInfo.customerReviewsList || []).length === 0 ||
                    (companyInfo.customerReviewsList || []).some(r => !r.reviewText || r.reviewText.trim() === '')
                  ) && (
                    <span className="text-red-600 text-sm font-medium flex items-center">
                      <span className="text-red-500 mr-1">*</span> All fields must be present to save
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setCustomerReviewsSaveAttempted(true);

                      // Check if there are any reviews to save
                      const reviewsList = companyInfo.customerReviewsList || [];
                      if (reviewsList.length === 0) {
                        return;
                      }

                      // Validate all reviews - check if any review is missing required text
                      const hasError = reviewsList.some(review => !review.reviewText || review.reviewText.trim() === '');

                      if (hasError) {
                        return;
                      }

                      // Check if we're at limit
                      if (savedCustomerReviews.length + reviewsList.length > 10) {
                        alert('Maximum of 10 customer reviews allowed');
                        return;
                      }

                      // Save all editable reviews
                      const newSavedReviews = [...savedCustomerReviews, ...reviewsList];
                      setSavedCustomerReviews(newSavedReviews);

                      // Clear editable list and reset states
                      updateCompanyInfo('customerReviewsList', []);
                      setCustomerReviewsSaveAttempted(false);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Online Reviews Content */}
            {selectedSalesFlowHook === 'Online Reviews' && (
              <div className="bg-slate-50 rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6 flex-shrink-0">
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

                {/* Online Reviews Note */}
                <div className="bg-slate-100 rounded-lg p-4 mb-4 flex-shrink-0">
                  <p className="text-sm text-gray-600">
                    Enter your ratings and review counts from popular platforms to highlight your online reputation.
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto mb-4">
                    {/* Display Mode */}
                    {savedOnlineReviews && !editingOnlineReviews ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center px-2 mb-3">
                          <p className="text-xs font-medium text-gray-700">Platform</p>
                          <p className="text-xs font-medium text-gray-700">Avg Rating</p>
                          <p className="text-xs font-medium text-gray-700">Total Reviews</p>
                          <p className="text-xs font-medium text-gray-700">5-Star Reviews</p>
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
                                <p className="text-sm text-gray-700">{platform.label}</p>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <p className="text-sm font-bold italic text-gray-900">{review.averageRating || '-'}</p>
                                </div>
                                <p className="text-sm font-bold italic text-gray-900">{review.totalReviews || '-'}</p>
                                <p className="text-sm font-bold italic text-gray-900">{review.fiveStarReviews || '-'}</p>
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
                            <div key={platform.key} className="grid grid-cols-4 gap-4 items-center p-4 bg-white rounded-lg">
                              <div className="font-semibold text-gray-900 min-w-[120px]">{platform.label}</div>

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
                                      const numValue = parseFloat(value);
                                      if (!isNaN(numValue)) {
                                        if (numValue > 5) value = '5.00';
                                        else if (numValue < 0) value = '0';
                                        else {
                                          const parts = value.split('.');
                                          if (parts[1] && parts[1].length > 2) value = numValue.toFixed(2);
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
                                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
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
                                    const numValue = parseInt(value, 10);
                                    if (!isNaN(numValue)) {
                                      if (numValue > 100000) value = '100000';
                                      else if (numValue < 0) value = '0';
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
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
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
                                    const numValue = parseInt(value, 10);
                                    if (!isNaN(numValue)) {
                                      if (numValue > 100000) value = '100000';
                                      else if (numValue < 0) value = '0';
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
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    )}
                  </div>

                {/* Save Button - always visible */}
                <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 flex-shrink-0">
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
      
    </div>
  );
};

export default MyAgent;