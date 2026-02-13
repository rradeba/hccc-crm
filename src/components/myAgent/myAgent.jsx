import React, { useState, useEffect, useRef } from 'react';
import { Settings, Check, Building2, Phone, Upload, Trash2, Plus, ChevronDown, ChevronUp, X, ArrowRight, Star, MessageSquare, Mail, AlertCircle, Pencil, Sparkles, HandHeart, Images, Briefcase, Globe, User, Tag, HelpCircle, Play, Pause, MoreVertical, Volume2, VolumeX, Maximize, Calendar } from 'lucide-react';
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

  // State for number type selection (business vs assigned)
  const [useAssignedNumber, setUseAssignedNumber] = useState(true);
  const [phoneNumberDropdownOpen, setPhoneNumberDropdownOpen] = useState(false);

  // State for pause agent emailing
  const [pauseAgentEmailing, setPauseAgentEmailing] = useState(false);

  // State for Send Estimate - Request in person estimate toggle
  const [requestInPersonEstimate, setRequestInPersonEstimate] = useState(false);
  const [scheduleEstimateCall, setScheduleEstimateCall] = useState(false);
  const [preferredCallTime, setPreferredCallTime] = useState([]);
  const [preferredInPersonTime, setPreferredInPersonTime] = useState([]);
  const [estimateContactMethods, setEstimateContactMethods] = useState({ call: true, text: true, email: false, inPerson: false });
  const [showEstimateContactTooltip, setShowEstimateContactTooltip] = useState(false);

  // State for Lead Discovery - Schedule call if AI can't answer
  const [scheduleCallIfCantAnswer, setScheduleCallIfCantAnswer] = useState(true);
  const [allowCustomerCallback, setAllowCustomerCallback] = useState(false);
  const [preferredCallbackTime, setPreferredCallbackTime] = useState([]);
  const [showEscalateTooltip, setShowEscalateTooltip] = useState(false);
  const [showCallbackTooltip, setShowCallbackTooltip] = useState(false);
  const [offerCallback, setOfferCallback] = useState({ enabled: false, collectAvailability: true, collectPreferredTime: true, collectCallReason: true, callbackWindow: '24 hours' });

  // State for Lead Discovery followup
  const [leadDiscoveryFollowup, setLeadDiscoveryFollowup] = useState({ aiEnabled: false, enabled: false, method: 'text', waitTime: '24 hours', schedule: 'Day', scheduleValue: '', times: ['Morning'], days: ['Monday'], daysOfMonth: ['1st'], duration: '', durationUnit: 'Days' });

  // State for Send Estimate followup
  const [sendEstimateFollowup, setSendEstimateFollowup] = useState({ aiEnabled: false, enabled: false, method: 'text', schedule: 'Day', scheduleValue: '', times: ['Morning'], days: ['Monday'], daysOfMonth: ['1st'], duration: '', durationUnit: 'Days' });

  // State for Send Contract followup
  const [sendContractFollowup, setSendContractFollowup] = useState({ aiEnabled: false, enabled: false, method: 'text', schedule: 'Day', scheduleValue: '', times: ['Morning'], days: ['Monday'], daysOfMonth: ['1st'], duration: '', durationUnit: 'Days' });
  const [autoSendContract, setAutoSendContract] = useState(false);
  const [autoRemindJob, setAutoRemindJob] = useState({ enabled: false, dayOf: true, dayBefore: true, time: '9:00 AM' });
  const [sendInvoiceFollowup, setSendInvoiceFollowup] = useState({ aiEnabled: false, enabled: false, method: 'text', schedule: 'Day', scheduleValue: '', times: ['Morning'], days: ['Monday'], daysOfMonth: ['1st'], duration: '', durationUnit: 'Days' });
  const [autoSendInvoice, setAutoSendInvoice] = useState(false);
  const [autoSendThankYou, setAutoSendThankYou] = useState(false);
  const [autoSendJobReview, setAutoSendJobReview] = useState(false);
  const [enableReviewRequest, setEnableReviewRequest] = useState(false);
  const [selectedReviewPlatforms, setSelectedReviewPlatforms] = useState([]);
  const [reviewPlatformLinks, setReviewPlatformLinks] = useState({});
  const [reviewPlatformDropdownOpen, setReviewPlatformDropdownOpen] = useState(false);
  const [savedReviewPlatforms, setSavedReviewPlatforms] = useState([]);
  const [savedReviewLinks, setSavedReviewLinks] = useState({});
  const [isEditingReviewPlatforms, setIsEditingReviewPlatforms] = useState(true);
  const [afterJobSaveError, setAfterJobSaveError] = useState('');
  const reviewPlatformOptions = [
    { id: 'google', name: 'Google', icon: 'G' },
    { id: 'facebook', name: 'Facebook', icon: 'f' },
    { id: 'yelp', name: 'Yelp', icon: 'Y' },
    { id: 'nextdoor', name: 'Nextdoor', icon: 'N' },
    { id: 'angies_list', name: "Angi", icon: 'A' },
    { id: 'bbb', name: 'BBB', icon: 'B' },
    { id: 'thumbtack', name: 'Thumbtack', icon: 'T' },
  ];

  // State for OAuth modals
  const [showFacebookOAuthModal, setShowFacebookOAuthModal] = useState(false);
  const [showInstagramOAuthModal, setShowInstagramOAuthModal] = useState(false);
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
  const [contactLeadMode, setContactLeadMode] = useState('ai'); // 'ai' or 'customize'

  // State for outreach method preferences
  const [initialOutreach, setInitialOutreach] = useState({ method: 'text', contactWithin: 'Immediately', contactWithinValue: '', aiFollowupEnabled: false, followupEnabled: false, followupWaitTime: '24 hours', followupSchedule: 'Day', followupScheduleValue: '', followupTime: '9:00 AM', followupDay: 'Monday', followupDaysOfMonth: ['1st'], followupDuration: '', followupDurationUnit: 'Days', hooks: [] });
  const [secondFallback, setSecondFallback] = useState({ method: 'call', contactWithin: 'Minutes', contactWithinValue: '5', aiFollowupEnabled: false, followupEnabled: false, followupWaitTime: '24 hours', followupSchedule: 'Day', followupScheduleValue: '', followupTime: '9:00 AM', followupDay: 'Monday', followupDaysOfMonth: ['1st'], followupDuration: '', followupDurationUnit: 'Days', hooks: [] });
  const [thirdFallback, setThirdFallback] = useState({ method: 'email', contactWithin: 'Minutes', contactWithinValue: '10', aiFollowupEnabled: false, followupEnabled: false, followupWaitTime: '24 hours', followupSchedule: 'Day', followupScheduleValue: '', followupTime: '9:00 AM', followupDay: 'Monday', followupDaysOfMonth: ['1st'], followupDuration: '', followupDurationUnit: 'Days', hooks: [] });
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
  const contactLeadTooltipRef = useRef(null);

  // Click outside handler for hooks dropdowns and tooltips
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
      // Close tooltips if click is outside
      const escalateTooltip = document.querySelector('[data-tooltip="escalate"]');
      const callbackTooltip = document.querySelector('[data-tooltip="callback"]');
      const estimateContactTooltip = document.querySelector('[data-tooltip="estimate-contact"]');
      if (escalateTooltip && !escalateTooltip.contains(event.target)) {
        setShowEscalateTooltip(false);
      }
      if (callbackTooltip && !callbackTooltip.contains(event.target)) {
        setShowCallbackTooltip(false);
      }
      if (estimateContactTooltip && !estimateContactTooltip.contains(event.target)) {
        setShowEstimateContactTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Listen for fullscreen exit to reset fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenVideoId(null);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Available contact methods
  const contactMethodOptions = [
    { id: 'text', label: 'Text' },
    { id: 'email', label: 'Email' }
  ];

  // Contact within timing options
  const contactWithinOptions = ['Immediately', 'Minutes', 'Hours', 'Days'];

  // Followup schedule options
  const followupScheduleOptions = ['Day', 'Days', 'Week', 'Weeks', 'Month', 'Months'];
  const followupWaitTimeOptions = ['12 hours', '24 hours', '2 days', '3 days', '5 days', '7 days'];
  const followupTimeOptions = ['Morning', 'Noon', 'Afternoon', 'Evening'];
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

  // State for saved Job Demos
  const [savedJobDemos, setSavedJobDemos] = useState([]);
  // State for pending media items (hidden while editing a saved demo)
  const [pendingJobDemoItems, setPendingJobDemoItems] = useState([]);
  // State for video menu in saved demos
  const [openVideoMenuId, setOpenVideoMenuId] = useState(null);
  // State for video playing status
  const [playingVideoId, setPlayingVideoId] = useState(null);
  // State for video muted status
  const [mutedVideoIds, setMutedVideoIds] = useState([]);
  // State for fullscreen video
  const [fullscreenVideoId, setFullscreenVideoId] = useState(null);
  // State for job demo validation errors (keyed by item id)
  const [jobDemoErrors, setJobDemoErrors] = useState({});
  // State for saved Personal Greeting video
  const [savedPersonalGreeting, setSavedPersonalGreeting] = useState(null);
  // State for Personal Greeting save error
  const [personalGreetingError, setPersonalGreetingError] = useState(false);
  // State for saved Before & After
  const [savedBeforeAfter, setSavedBeforeAfter] = useState([]);
  // State for pending Before & After items (hidden while editing a saved item)
  const [pendingBeforeAfterItems, setPendingBeforeAfterItems] = useState([]);
  // State for Before & After validation errors
  const [beforeAfterErrors, setBeforeAfterErrors] = useState({});
  // State for expanded photo in Before & After
  const [expandedBeforeAfterPhotoId, setExpandedBeforeAfterPhotoId] = useState(null);
  // State for Before & After services dropdown
  const [openBeforeAfterServicesDropdownId, setOpenBeforeAfterServicesDropdownId] = useState(null);
  // State for saved Infographics
  const [savedInfographics, setSavedInfographics] = useState([]);
  // State for pending Infographics items (hidden while editing a saved item)
  const [pendingInfographicsItems, setPendingInfographicsItems] = useState([]);
  // State for Infographics validation errors
  const [infographicsErrors, setInfographicsErrors] = useState({});
  // State for expanded photo in Infographics
  const [expandedInfographicsPhotoId, setExpandedInfographicsPhotoId] = useState(null);
  // State for Infographics services dropdown
  const [openInfographicsServicesDropdownId, setOpenInfographicsServicesDropdownId] = useState(null);
  // State for saved Job Highlight
  const [savedJobHighlight, setSavedJobHighlight] = useState([]);
  // State for pending Job Highlight items (hidden while editing a saved item)
  const [pendingJobHighlightItems, setPendingJobHighlightItems] = useState([]);
  // State for Job Highlight validation errors
  const [jobHighlightErrors, setJobHighlightErrors] = useState({});
  // State for expanded photo in Job Highlight
  const [expandedPhotoId, setExpandedPhotoId] = useState(null);
  // State for Job Highlight services dropdown
  const [openJobHighlightServicesDropdownId, setOpenJobHighlightServicesDropdownId] = useState(null);
  // Refs for dropdown scroll positions (at component level to persist across re-renders)
  const jobDemosDropdownScrollRef = useRef(0);
  const jobHighlightDropdownScrollRef = useRef(0);
  const beforeAfterDropdownScrollRef = useRef(0);
  const infographicsDropdownScrollRef = useRef(0);
  const customerReviewDropdownScrollRef = useRef(0);
  // State for Customer Reviews services dropdown
  const [openCustomerReviewServicesDropdownId, setOpenCustomerReviewServicesDropdownId] = useState(null);
  const [coldOutreachHooksOpen, setColdOutreachHooksOpen] = useState(false);
  const [coldOutreachAICustomized, setColdOutreachAICustomized] = useState(true);
  // State for Lead Engagement Hooks tooltips
  const [openHookTooltip, setOpenHookTooltip] = useState(null);

  // Dedicated click outside handler for contact lead tooltip
  useEffect(() => {
    const handleClickOutsideTooltip = (event) => {
      if (openHookTooltip === 'contact-lead' && contactLeadTooltipRef.current && !contactLeadTooltipRef.current.contains(event.target)) {
        setOpenHookTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideTooltip);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideTooltip);
    };
  }, [openHookTooltip]);

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

  // DescriptionInput component - uses local state to prevent media flickering
  const DescriptionInput = ({ value, onChange, maxLength = 150, variant = 'default' }) => {
    const [localValue, setLocalValue] = useState(value || '');
    const inputRef = useRef(null);

    // Update local value when parent value changes (e.g., on initial load)
    useEffect(() => {
      setLocalValue(value || '');
    }, [value]);

    const wrapperClass = variant === 'short' ? 'media-description-wrapper-short' : 'media-description-wrapper';

    return (
      <div className={wrapperClass}>
        <textarea
          ref={inputRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={() => {
            if (localValue !== value) {
              onChange(localValue);
            }
          }}
          className="media-description-input"
          placeholder="Add short description"
          maxLength={maxLength}
        />
        <span className="media-description-counter">{localValue.length}/{maxLength}</span>
      </div>
    );
  };

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
              <span className="text-sm font-medium text-gray-700">SMS</span>
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
          </div>

          {/* Right Column - Content (80%) */}
          <div className="flex-1 bg-slate-50 rounded-2xl p-6 relative" style={{ minHeight: '420px', maxHeight: '420px', overflowY: 'auto' }}>
            {selectedAccountTab === 'facebook' ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">Connect Facebook Account</h4>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'facebook-account' ? null : 'facebook-account')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'facebook-account' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Connect your Facebook business page to allow your AI agent to interact with customers on Facebook.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
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
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">Connect Instagram Account</h4>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'instagram-account' ? null : 'instagram-account')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'instagram-account' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Connect your Instagram business account to allow your AI agent to interact with customers on Instagram.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
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
            ) : selectedAccountTab === 'email' ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">Connect Email Accounts</h4>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'email-account' ? null : 'email-account')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'email-account' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Connect your email accounts to allow your AI agent to interact with customers via email.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
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

                {/* Pause All Agent Emailing Toggle */}
                <div className="border-t border-slate-200 pt-6 mt-6" style={{ minHeight: '5rem' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Pause All Agent Emailing</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPauseAgentEmailing(!pauseAgentEmailing)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        pauseAgentEmailing
                          ? 'bg-amber-500'
                          : 'bg-gray-400 shadow-inner'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pauseAgentEmailing ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Warning message when emailing is paused */}
                  {pauseAgentEmailing && (
                    <div className="flex items-center gap-2 mt-3">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-sm text-amber-700">
                        AI agent emailing is currently paused. Your agent will not send any automated emails to customers.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : selectedAccountTab === 'sms' ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold text-gray-700">Connect SMS Account</h4>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'sms-account' ? null : 'sms-account')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'sms-account' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Configure your phone number for AI-powered SMS communications with customers.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Phone Number Selection Dropdown */}
                <div className="relative">
                  <p className="text-xs text-gray-500 mb-2">Select Phone Number</p>
                  {/* Selected Phone Number Display */}
                  <button
                    type="button"
                    onClick={() => setPhoneNumberDropdownOpen(!phoneNumberDropdownOpen)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-4 text-left hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-500">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {useAssignedNumber ? 'Use Assigned Phone Number:' : 'Use Business Phone Number:'}
                        </span>
                        <span className="text-xl font-mono font-semibold text-gray-700">
                          {useAssignedNumber ? '+1 843-212-6173' : '+1 843-555-0147'}
                        </span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${phoneNumberDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Dropdown Options */}
                  {phoneNumberDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setPhoneNumberDropdownOpen(false)}
                      />
                      <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => {
                            setUseAssignedNumber(!useAssignedNumber);
                            setPhoneNumberDropdownOpen(false);
                          }}
                          className="w-full p-4 text-left hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-slate-200">
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                              {useAssignedNumber ? 'Use Business Phone Number:' : 'Use Assigned Phone Number:'}
                            </span>
                            <span className="text-xl font-mono font-semibold text-gray-700">
                              {useAssignedNumber ? '+1 843-555-0147' : '+1 843-212-6173'}
                            </span>
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Pause Agent Texting Toggle */}
                <div className="border-t border-slate-200 pt-6" style={{ minHeight: '5rem' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Pause All Agent Texting</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForwardToPersonalPhone(!forwardToPersonalPhone)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        forwardToPersonalPhone
                          ? 'bg-amber-500'
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

                  {/* Warning message when texting is paused */}
                  {forwardToPersonalPhone && (
                    <div className="flex items-center gap-2 mt-3">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-sm text-amber-700">
                        AI agent messaging is currently paused. Your agent will not send any automated texts to customers.
                      </span>
                    </div>
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
            {['Contact Lead', 'Lead Discovery', 'Schedule Estimate', 'Send Estimate', 'Send Contract', 'Send Invoice', 'After Job'].map((stage, index) => {
              const colors = [
                'bg-blue-600',      // 1 - Contact Lead
                'bg-indigo-600',    // 2 - Lead Discovery
                'bg-teal-600',      // 3 - Schedule Estimate
                'bg-purple-600',    // 4 - Send Estimate
                'bg-cyan-600',      // 5 - Send Contract
                'bg-amber-600',     // 6 - Send Invoice
                'bg-green-600'      // 7 - After Job
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
                {/* Contact Lead Title */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">Contact Lead</h3>
                  <div className="relative" ref={contactLeadTooltipRef}>
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'contact-lead' ? null : 'contact-lead')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'contact-lead' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Configure how your AI Agent initiates contact with new leads. Set up to three contact methods with customizable timing, and enable automated follow-ups to re-engage unresponsive leads throughout the sales process.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Enable AI Lead Contact Toggle */}
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Enable AI Lead Contact</span>
                    <button
                      type="button"
                      onClick={() => setContactLeadMode(contactLeadMode === 'ai' ? 'customize' : 'ai')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        contactLeadMode === 'ai' ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          contactLeadMode === 'ai' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Customize Lead Contact Toggle */}
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Customize Lead Contact</span>
                    <button
                      type="button"
                      onClick={() => setContactLeadMode(contactLeadMode === 'customize' ? 'ai' : 'customize')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        contactLeadMode === 'customize' ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          contactLeadMode === 'customize' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                {/* Contact Method Inputs - Only show when Customize is selected */}
                {contactLeadMode === 'customize' && (
                <div className="pt-4 space-y-4">
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
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Add primary contact method</p>
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
                                <span className="text-sm text-gray-600">Time until contact</span>
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
                                Generate AI Example
                              </button>
                            )}
                          </div>

                          {/* Hooks dropdown for text/email */}
                          {(initialOutreach.method === 'text' || initialOutreach.method === 'email') && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-500 mb-2">Add Engagement Hooks:</p>
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
                                <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                                  <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-gray-700">Enable AI Followup</span>
                                      <button
                                        type="button"
                                        onClick={() => setInitialOutreach({ ...initialOutreach, aiFollowupEnabled: !initialOutreach.aiFollowupEnabled, followupEnabled: false })}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                          initialOutreach.aiFollowupEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                                        }`}
                                      >
                                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                          initialOutreach.aiFollowupEnabled ? 'translate-x-5' : 'translate-x-1'
                                        }`} />
                                      </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-gray-700">Enable Custom Followup</span>
                                      <button
                                        type="button"
                                        onClick={() => setInitialOutreach({ ...initialOutreach, followupEnabled: !initialOutreach.followupEnabled, aiFollowupEnabled: false })}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                          initialOutreach.followupEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                                        }`}
                                      >
                                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                          initialOutreach.followupEnabled ? 'translate-x-5' : 'translate-x-1'
                                        }`} />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {initialOutreach.aiFollowupEnabled && (
                                  <p className="text-xs text-gray-500 italic">
                                    Your AI agent will periodically re-engage unresponsive leads to guide them back into the sales process. Leads can opt out of further contact at any time.
                                  </p>
                                )}

                                {initialOutreach.followupEnabled && (
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm text-gray-600">If no response, reach back out following day at:</span>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      {followupTimeOptions.map(timeOption => (
                                        <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                                          <input
                                            type="checkbox"
                                            checked={(initialOutreach.followupFirstDayTimes || ['Morning']).includes(timeOption)}
                                            onChange={(e) => {
                                              const currentTimes = initialOutreach.followupFirstDayTimes || ['Morning'];
                                              const newTimes = e.target.checked
                                                ? [...currentTimes, timeOption]
                                                : currentTimes.filter(t => t !== timeOption);
                                              setInitialOutreach({ ...initialOutreach, followupFirstDayTimes: newTimes.length > 0 ? newTimes : ['Morning'] });
                                            }}
                                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                          />
                                          <span className="text-sm text-gray-700">{timeOption}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {initialOutreach.followupEnabled && (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                                      <span className="text-sm text-gray-600">If still no response, reach out every:</span>
                                      <input
                                        type="number"
                                        min="2"
                                        value={initialOutreach.followupScheduleValue}
                                        onChange={(e) => setInitialOutreach({ ...initialOutreach, followupScheduleValue: e.target.value })}
                                        disabled={['Day', 'Week', 'Month'].includes(initialOutreach.followupSchedule)}
                                        className={`w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${
                                          ['Day', 'Week', 'Month'].includes(initialOutreach.followupSchedule) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'
                                        }`}
                                        placeholder="#"
                                      />
                                      <select
                                        value={initialOutreach.followupSchedule}
                                        onChange={(e) => setInitialOutreach({ ...initialOutreach, followupSchedule: e.target.value, followupScheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? initialOutreach.followupScheduleValue : '' })}
                                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                      >
                                        {followupScheduleOptions.map(opt => (
                                          <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                      </select>
                                      {(initialOutreach.followupSchedule === 'Week' || initialOutreach.followupSchedule === 'Weeks') && (
                                        <>
                                          <span className="text-sm text-gray-600">on</span>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            {followupDayOptions.map(day => (
                                              <label key={day} className="flex items-center gap-1 cursor-pointer">
                                                <input
                                                  type="checkbox"
                                                  checked={(initialOutreach.followupDays || ['Monday']).includes(day)}
                                                  onChange={(e) => {
                                                    const currentDays = initialOutreach.followupDays || ['Monday'];
                                                    const newDays = e.target.checked
                                                      ? [...currentDays, day]
                                                      : currentDays.filter(d => d !== day);
                                                    setInitialOutreach({ ...initialOutreach, followupDays: newDays.length > 0 ? newDays : ['Monday'] });
                                                  }}
                                                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{day.slice(0, 3)}</span>
                                              </label>
                                            ))}
                                          </div>
                                        </>
                                      )}
                                      {(initialOutreach.followupSchedule === 'Month' || initialOutreach.followupSchedule === 'Months') && (
                                        <>
                                          <span className="text-sm text-gray-600 flex-shrink-0">on the</span>
                                          <div className="flex items-center gap-2 overflow-x-auto flex-nowrap max-w-xs py-1" style={{ scrollbarWidth: 'thin' }}>
                                            {followupDayOfMonthOptions.map(day => (
                                              <label key={day} className="flex items-center gap-1 cursor-pointer flex-shrink-0">
                                                <input
                                                  type="checkbox"
                                                  checked={(initialOutreach.followupDaysOfMonth || ['1st']).includes(day)}
                                                  onChange={(e) => {
                                                    const currentDays = initialOutreach.followupDaysOfMonth || ['1st'];
                                                    const newDays = e.target.checked
                                                      ? [...currentDays, day]
                                                      : currentDays.filter(d => d !== day);
                                                    setInitialOutreach({ ...initialOutreach, followupDaysOfMonth: newDays.length > 0 ? newDays : ['1st'] });
                                                  }}
                                                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{day}</span>
                                              </label>
                                            ))}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                      <span className="text-sm text-gray-600">at</span>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        {followupTimeOptions.map(timeOption => (
                                          <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={(initialOutreach.followupTimes || ['Morning']).includes(timeOption)}
                                              onChange={(e) => {
                                                const currentTimes = initialOutreach.followupTimes || ['Morning'];
                                                const newTimes = e.target.checked
                                                  ? [...currentTimes, timeOption]
                                                  : currentTimes.filter(t => t !== timeOption);
                                                setInitialOutreach({ ...initialOutreach, followupTimes: newTimes.length > 0 ? newTimes : ['Morning'] });
                                              }}
                                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{timeOption}</span>
                                          </label>
                                        ))}
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
                        Add Secondary Contact Method
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
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-700">Add secondary contact method</p>
                            <button
                              type="button"
                              onClick={() => {
                                if (showThirdFallback) {
                                  // Shift third up to second
                                  setSecondFallback({ ...thirdFallback });
                                  setThirdFallback({ method: 'email', contactWithin: 'Minutes', contactWithinValue: '10', aiFollowupEnabled: false, followupEnabled: false, followupSchedule: 'Day', followupScheduleValue: '', followupTime: '9:00 AM', followupDay: 'Monday', followupDaysOfMonth: ['1st'], followupDuration: '', followupDurationUnit: 'Days', hooks: [] });
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
                                <span className="text-sm text-gray-600">Time until contact</span>
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
                                Generate AI Example
                              </button>
                            )}
                          </div>

                          {/* Hooks dropdown for text/email */}
                          {(secondFallback.method === 'text' || secondFallback.method === 'email') && (
                            <div className="mt-3">
                              <p className="text-xs font-medium text-gray-500 mb-2">Add Engagement Hooks:</p>
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
                                <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                                  <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-gray-700">Enable AI Followup</span>
                                      <button
                                        type="button"
                                        onClick={() => setSecondFallback({ ...secondFallback, aiFollowupEnabled: !secondFallback.aiFollowupEnabled, followupEnabled: false })}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                          secondFallback.aiFollowupEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                                        }`}
                                      >
                                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                          secondFallback.aiFollowupEnabled ? 'translate-x-5' : 'translate-x-1'
                                        }`} />
                                      </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-gray-700">Enable Custom Followup</span>
                                      <button
                                        type="button"
                                        onClick={() => setSecondFallback({ ...secondFallback, followupEnabled: !secondFallback.followupEnabled, aiFollowupEnabled: false })}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                          secondFallback.followupEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                                        }`}
                                      >
                                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                                          secondFallback.followupEnabled ? 'translate-x-5' : 'translate-x-1'
                                        }`} />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {secondFallback.aiFollowupEnabled && (
                                  <p className="text-xs text-gray-500 italic">
                                    Your AI agent will periodically re-engage unresponsive leads to guide them back into the sales process. Leads can opt out of further contact at any time.
                                  </p>
                                )}

                                {secondFallback.followupEnabled && (
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm text-gray-600">If no response, reach back out following day at:</span>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      {followupTimeOptions.map(timeOption => (
                                        <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                                          <input
                                            type="checkbox"
                                            checked={(secondFallback.followupFirstDayTimes || ['Morning']).includes(timeOption)}
                                            onChange={(e) => {
                                              const currentTimes = secondFallback.followupFirstDayTimes || ['Morning'];
                                              const newTimes = e.target.checked
                                                ? [...currentTimes, timeOption]
                                                : currentTimes.filter(t => t !== timeOption);
                                              setSecondFallback({ ...secondFallback, followupFirstDayTimes: newTimes.length > 0 ? newTimes : ['Morning'] });
                                            }}
                                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                          />
                                          <span className="text-sm text-gray-700">{timeOption}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {secondFallback.followupEnabled && (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-3 flex-wrap">
                                      <span className="text-sm text-gray-600">If still no response, reach out every:</span>
                                      <input
                                        type="number"
                                        min="2"
                                        value={secondFallback.followupScheduleValue}
                                        onChange={(e) => setSecondFallback({ ...secondFallback, followupScheduleValue: e.target.value })}
                                        disabled={['Day', 'Week', 'Month'].includes(secondFallback.followupSchedule)}
                                        className={`w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${
                                          ['Day', 'Week', 'Month'].includes(secondFallback.followupSchedule) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'
                                        }`}
                                        placeholder="#"
                                      />
                                      <select
                                        value={secondFallback.followupSchedule}
                                        onChange={(e) => setSecondFallback({ ...secondFallback, followupSchedule: e.target.value, followupScheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? secondFallback.followupScheduleValue : '' })}
                                        className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                      >
                                        {followupScheduleOptions.map(opt => (
                                          <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                      </select>
                                      {(secondFallback.followupSchedule === 'Week' || secondFallback.followupSchedule === 'Weeks') && (
                                        <>
                                          <span className="text-sm text-gray-600">on</span>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            {followupDayOptions.map(day => (
                                              <label key={day} className="flex items-center gap-1 cursor-pointer">
                                                <input
                                                  type="checkbox"
                                                  checked={(secondFallback.followupDays || ['Monday']).includes(day)}
                                                  onChange={(e) => {
                                                    const currentDays = secondFallback.followupDays || ['Monday'];
                                                    const newDays = e.target.checked
                                                      ? [...currentDays, day]
                                                      : currentDays.filter(d => d !== day);
                                                    setSecondFallback({ ...secondFallback, followupDays: newDays.length > 0 ? newDays : ['Monday'] });
                                                  }}
                                                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{day.slice(0, 3)}</span>
                                              </label>
                                            ))}
                                          </div>
                                        </>
                                      )}
                                      {(secondFallback.followupSchedule === 'Month' || secondFallback.followupSchedule === 'Months') && (
                                        <>
                                          <span className="text-sm text-gray-600 flex-shrink-0">on the</span>
                                          <div className="flex items-center gap-2 overflow-x-auto flex-nowrap max-w-xs py-1" style={{ scrollbarWidth: 'thin' }}>
                                            {followupDayOfMonthOptions.map(day => (
                                              <label key={day} className="flex items-center gap-1 cursor-pointer flex-shrink-0">
                                                <input
                                                  type="checkbox"
                                                  checked={(secondFallback.followupDaysOfMonth || ['1st']).includes(day)}
                                                  onChange={(e) => {
                                                    const currentDays = secondFallback.followupDaysOfMonth || ['1st'];
                                                    const newDays = e.target.checked
                                                      ? [...currentDays, day]
                                                      : currentDays.filter(d => d !== day);
                                                    setSecondFallback({ ...secondFallback, followupDaysOfMonth: newDays.length > 0 ? newDays : ['1st'] });
                                                  }}
                                                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{day}</span>
                                              </label>
                                            ))}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                      <span className="text-sm text-gray-600">at</span>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        {followupTimeOptions.map(timeOption => (
                                          <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={(secondFallback.followupTimes || ['Morning']).includes(timeOption)}
                                              onChange={(e) => {
                                                const currentTimes = secondFallback.followupTimes || ['Morning'];
                                                const newTimes = e.target.checked
                                                  ? [...currentTimes, timeOption]
                                                  : currentTimes.filter(t => t !== timeOption);
                                                setSecondFallback({ ...secondFallback, followupTimes: newTimes.length > 0 ? newTimes : ['Morning'] });
                                              }}
                                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{timeOption}</span>
                                          </label>
                                        ))}
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
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
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
            ) : selectedSalesFlowStage === 'Lead Discovery' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* Lead Discovery Title */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">Lead Discovery</h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'lead-discovery' ? null : 'lead-discovery')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'lead-discovery' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Your AI Agent qualifies leads through natural conversation, gathering details on needs, budget, timeline, and project scope.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Escalate Toggle */}
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-gray-700">Escalate unanswered questions to you</span>
                      <p className="text-xs text-gray-500 italic">
                        If Agent cannot answer a lead question, you will be notified of the question so you can reach out to them directly.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
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
                      <div className="relative" data-tooltip="escalate">
                        <button
                          type="button"
                          onClick={() => {
                            setShowEscalateTooltip(!showEscalateTooltip);
                            setShowCallbackTooltip(false);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                        {showEscalateTooltip && (
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-72 p-3 bg-white text-gray-700 text-xs rounded-lg shadow-lg border border-slate-200">
                            <p>If AI chat bot is unable to answer a question related to your services, policies, or company information; you will be notified of that question, and will be able to instruct the chatbot how to answer in the "Leads" tab.</p>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white border-l border-b border-slate-200 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Allow Customer Callback Toggle */}
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-gray-700">Allow customer to request callback</span>
                      <p className="text-xs text-gray-500 italic">
                        Enable lead to request a call at any time in the sales flow process. Agent will coordinate call according to your availability in the Calendar tab.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
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
                      <div className="relative" data-tooltip="callback">
                        <button
                          type="button"
                          onClick={() => {
                            setShowCallbackTooltip(!showCallbackTooltip);
                            setShowEscalateTooltip(false);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                        {showCallbackTooltip && (
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-72 p-3 bg-white text-gray-700 text-xs rounded-lg shadow-lg border border-slate-200">
                            <p>If switched on, the customer will be allowed to request a personal call from you or one of your staff at any time during the chat.</p>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white border-l border-b border-slate-200 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {allowCustomerCallback && (
                    <div className="mt-3 space-y-2">
                      <label className="text-sm font-medium text-gray-600">Preferred time for callback:</label>
                      <div className="flex flex-wrap gap-2">
                        {['Morning', 'Noon', 'Afternoon', 'Evening'].map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => {
                              if (preferredCallbackTime.includes(time)) {
                                setPreferredCallbackTime(preferredCallbackTime.filter(t => t !== time));
                              } else {
                                setPreferredCallbackTime([...preferredCallbackTime, time]);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              preferredCallbackTime.includes(time)
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Followup Section */}
                <div className="space-y-3">
                  <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Enable AI Followup</span>
                        <button
                          type="button"
                          onClick={() => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, aiEnabled: !leadDiscoveryFollowup.aiEnabled, enabled: false })}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            leadDiscoveryFollowup.aiEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                          }`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            leadDiscoveryFollowup.aiEnabled ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Enable Custom Followup</span>
                        <button
                          type="button"
                          onClick={() => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, enabled: !leadDiscoveryFollowup.enabled, aiEnabled: false })}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            leadDiscoveryFollowup.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                          }`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            leadDiscoveryFollowup.enabled ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {leadDiscoveryFollowup.aiEnabled && (
                    <p className="text-xs text-gray-500 italic">
                      Your AI agent will periodically re-engage unresponsive leads to guide them back into the sales process. Leads can opt out of further contact at any time.
                    </p>
                  )}

                  {leadDiscoveryFollowup.enabled && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-600">If no lead response, reach back out the next day at:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {followupTimeOptions.map(timeOption => (
                          <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(leadDiscoveryFollowup.nextDayTimes || ['Morning']).includes(timeOption)}
                              onChange={(e) => {
                                const currentTimes = leadDiscoveryFollowup.nextDayTimes || ['Morning'];
                                const newTimes = e.target.checked
                                  ? [...currentTimes, timeOption]
                                  : currentTimes.filter(t => t !== timeOption);
                                setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, nextDayTimes: newTimes.length > 0 ? newTimes : ['Morning'] });
                              }}
                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{timeOption}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {leadDiscoveryFollowup.enabled && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-600">If still no response, reach out every:</span>
                        <input
                          type="number"
                          min="2"
                          value={leadDiscoveryFollowup.scheduleValue}
                          onChange={(e) => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, scheduleValue: e.target.value })}
                          disabled={['Day', 'Week', 'Month'].includes(leadDiscoveryFollowup.schedule)}
                          className={`w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${
                            ['Day', 'Week', 'Month'].includes(leadDiscoveryFollowup.schedule) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'
                          }`}
                          placeholder="#"
                        />
                        <select
                          value={leadDiscoveryFollowup.schedule}
                          onChange={(e) => setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, schedule: e.target.value, scheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? leadDiscoveryFollowup.scheduleValue : '' })}
                          className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        >
                          {followupScheduleOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {(leadDiscoveryFollowup.schedule === 'Week' || leadDiscoveryFollowup.schedule === 'Weeks') && (
                          <>
                            <span className="text-sm text-gray-600">on</span>
                            <div className="flex items-center gap-2 flex-wrap">
                              {followupDayOptions.map(day => (
                                <label key={day} className="flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={(leadDiscoveryFollowup.days || ['Monday']).includes(day)}
                                    onChange={(e) => {
                                      const currentDays = leadDiscoveryFollowup.days || ['Monday'];
                                      const newDays = e.target.checked
                                        ? [...currentDays, day]
                                        : currentDays.filter(d => d !== day);
                                      setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, days: newDays.length > 0 ? newDays : ['Monday'] });
                                    }}
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{day.slice(0, 3)}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                        {(leadDiscoveryFollowup.schedule === 'Month' || leadDiscoveryFollowup.schedule === 'Months') && (
                          <>
                            <span className="text-sm text-gray-600 flex-shrink-0">on the</span>
                            <div className="flex items-center gap-2 overflow-x-auto flex-nowrap max-w-xs py-1" style={{ scrollbarWidth: 'thin' }}>
                              {followupDayOfMonthOptions.map(day => (
                                <label key={day} className="flex items-center gap-1 cursor-pointer flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    checked={(leadDiscoveryFollowup.daysOfMonth || ['1st']).includes(day)}
                                    onChange={(e) => {
                                      const currentDays = leadDiscoveryFollowup.daysOfMonth || ['1st'];
                                      const newDays = e.target.checked
                                        ? [...currentDays, day]
                                        : currentDays.filter(d => d !== day);
                                      setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, daysOfMonth: newDays.length > 0 ? newDays : ['1st'] });
                                    }}
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{day}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-600">at</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {followupTimeOptions.map(timeOption => (
                            <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={(leadDiscoveryFollowup.times || ['Morning']).includes(timeOption)}
                                onChange={(e) => {
                                  const currentTimes = leadDiscoveryFollowup.times || ['Morning'];
                                  const newTimes = e.target.checked
                                    ? [...currentTimes, timeOption]
                                    : currentTimes.filter(t => t !== timeOption);
                                  setLeadDiscoveryFollowup({ ...leadDiscoveryFollowup, times: newTimes.length > 0 ? newTimes : ['Morning'] });
                                }}
                                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{timeOption}</span>
                            </label>
                          ))}
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
            ) : selectedSalesFlowStage === 'Schedule Estimate' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* Schedule Estimate Title */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">Schedule Estimate</h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'schedule-estimate' ? null : 'schedule-estimate')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'schedule-estimate' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            It is required you contact leads directly regarding estimate once they have been qualified. The agent will coordinate lead contact based on your selected communication methods in this section, and then notify you about the lead's preferences.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Schedule Options */}
                <div className="space-y-4">
                  {/* Schedule Customer Call Toggle */}
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Schedule Customer Call</span>
                      <button
                        type="button"
                        onClick={() => setScheduleEstimateCall(!scheduleEstimateCall)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          scheduleEstimateCall ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            scheduleEstimateCall ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    {scheduleEstimateCall && (
                      <div className="mt-3 space-y-3">
                        <p className="text-xs text-gray-500 italic">
                          Agent will coordinate call with Lead according to your availability in the Calendar tab.
                        </p>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Preferred time for customer calls:</label>
                          <div className="flex flex-wrap gap-2">
                            {['Morning', 'Noon', 'Afternoon', 'Evening'].map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => {
                                  if (preferredCallTime.includes(time)) {
                                    setPreferredCallTime(preferredCallTime.filter(t => t !== time));
                                  } else {
                                    setPreferredCallTime([...preferredCallTime, time]);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  preferredCallTime.includes(time)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Schedule In Person Estimate Toggle */}
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Schedule In Person Estimate</span>
                      <button
                        type="button"
                        onClick={() => setRequestInPersonEstimate(!requestInPersonEstimate)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          requestInPersonEstimate ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            requestInPersonEstimate ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    {requestInPersonEstimate && (
                      <div className="mt-3 space-y-3">
                        <p className="text-xs text-gray-500 italic">
                          Agent will coordinate in-person visit with Lead according to your availability in the Calendar tab.
                        </p>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Preferred time for in-person estimates:</label>
                          <div className="flex flex-wrap gap-2">
                            {['Morning', 'Noon', 'Afternoon', 'Evening'].map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => {
                                  if (preferredInPersonTime.includes(time)) {
                                    setPreferredInPersonTime(preferredInPersonTime.filter(t => t !== time));
                                  } else {
                                    setPreferredInPersonTime([...preferredInPersonTime, time]);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  preferredInPersonTime.includes(time)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
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
            ) : selectedSalesFlowStage === 'Send Estimate' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* Send Estimate Title */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">Send Estimate</h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'send-estimate' ? null : 'send-estimate')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'send-estimate' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            You will have the option to send an estimate via text and/or email once you select "Lead Contacted" button, in the leads tab. You will be notified once the lead has filled out the estimate form. Enable the followup feature to periodically remind the lead that the estimate form has been sent.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Followup Section */}
                <div className="space-y-3">
                  <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Enable AI Followup</span>
                        <button
                          type="button"
                          onClick={() => setSendEstimateFollowup({ ...sendEstimateFollowup, aiEnabled: !sendEstimateFollowup.aiEnabled, enabled: false })}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            sendEstimateFollowup.aiEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                          }`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            sendEstimateFollowup.aiEnabled ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Enable Custom Followup</span>
                        <button
                          type="button"
                          onClick={() => setSendEstimateFollowup({ ...sendEstimateFollowup, enabled: !sendEstimateFollowup.enabled, aiEnabled: false })}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            sendEstimateFollowup.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                          }`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            sendEstimateFollowup.enabled ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {sendEstimateFollowup.aiEnabled && (
                    <p className="text-xs text-gray-500 italic">
                      Your AI agent will periodically re-engage unresponsive leads to guide them back into the sales process. Leads can opt out of further contact at any time.
                    </p>
                  )}

                  {sendEstimateFollowup.enabled && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-600">If no lead response, reach back out the next day at:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {followupTimeOptions.map(timeOption => (
                          <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(sendEstimateFollowup.nextDayTimes || ['Morning']).includes(timeOption)}
                              onChange={(e) => {
                                const currentTimes = sendEstimateFollowup.nextDayTimes || ['Morning'];
                                const newTimes = e.target.checked
                                  ? [...currentTimes, timeOption]
                                  : currentTimes.filter(t => t !== timeOption);
                                setSendEstimateFollowup({ ...sendEstimateFollowup, nextDayTimes: newTimes.length > 0 ? newTimes : ['Morning'] });
                              }}
                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{timeOption}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {sendEstimateFollowup.enabled && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-600">If still no response, reach out every:</span>
                        <input
                          type="number"
                          min="2"
                          value={sendEstimateFollowup.scheduleValue}
                          onChange={(e) => setSendEstimateFollowup({ ...sendEstimateFollowup, scheduleValue: e.target.value })}
                          disabled={['Day', 'Week', 'Month'].includes(sendEstimateFollowup.schedule)}
                          className={`w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${
                            ['Day', 'Week', 'Month'].includes(sendEstimateFollowup.schedule) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'
                          }`}
                          placeholder="#"
                        />
                        <select
                          value={sendEstimateFollowup.schedule}
                          onChange={(e) => setSendEstimateFollowup({ ...sendEstimateFollowup, schedule: e.target.value, scheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? sendEstimateFollowup.scheduleValue : '' })}
                          className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        >
                          {followupScheduleOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {(sendEstimateFollowup.schedule === 'Week' || sendEstimateFollowup.schedule === 'Weeks') && (
                          <>
                            <span className="text-sm text-gray-600">on</span>
                            <div className="flex items-center gap-2 flex-wrap">
                              {followupDayOptions.map(day => (
                                <label key={day} className="flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={(sendEstimateFollowup.days || ['Monday']).includes(day)}
                                    onChange={(e) => {
                                      const currentDays = sendEstimateFollowup.days || ['Monday'];
                                      const newDays = e.target.checked
                                        ? [...currentDays, day]
                                        : currentDays.filter(d => d !== day);
                                      setSendEstimateFollowup({ ...sendEstimateFollowup, days: newDays.length > 0 ? newDays : ['Monday'] });
                                    }}
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{day.slice(0, 3)}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                        {(sendEstimateFollowup.schedule === 'Month' || sendEstimateFollowup.schedule === 'Months') && (
                          <>
                            <span className="text-sm text-gray-600 flex-shrink-0">on the</span>
                            <div className="flex items-center gap-2 overflow-x-auto flex-nowrap max-w-xs py-1" style={{ scrollbarWidth: 'thin' }}>
                              {followupDayOfMonthOptions.map(day => (
                                <label key={day} className="flex items-center gap-1 cursor-pointer flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    checked={(sendEstimateFollowup.daysOfMonth || ['1st']).includes(day)}
                                    onChange={(e) => {
                                      const currentDays = sendEstimateFollowup.daysOfMonth || ['1st'];
                                      const newDays = e.target.checked
                                        ? [...currentDays, day]
                                        : currentDays.filter(d => d !== day);
                                      setSendEstimateFollowup({ ...sendEstimateFollowup, daysOfMonth: newDays.length > 0 ? newDays : ['1st'] });
                                    }}
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{day}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-600">at</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {followupTimeOptions.map(timeOption => (
                            <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={(sendEstimateFollowup.times || ['Morning']).includes(timeOption)}
                                onChange={(e) => {
                                  const currentTimes = sendEstimateFollowup.times || ['Morning'];
                                  const newTimes = e.target.checked
                                    ? [...currentTimes, timeOption]
                                    : currentTimes.filter(t => t !== timeOption);
                                  setSendEstimateFollowup({ ...sendEstimateFollowup, times: newTimes.length > 0 ? newTimes : ['Morning'] });
                                }}
                                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{timeOption}</span>
                            </label>
                          ))}
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
                {/* Send Contract Title */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">Send Contract</h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'send-contract' ? null : 'send-contract')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'send-contract' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Once the estimate has been accepted you will be notified, and a contract will automatically be created using the estimate information. In the leads tab you may edit and send the contract. You will be notified once the lead has filled out the contract form. Enable the followup feature to periodically remind the lead that the contract form has been sent.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Followup Section */}
                <div className="space-y-3">
                  <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Enable AI Followup</span>
                        <button
                          type="button"
                          onClick={() => setSendContractFollowup({ ...sendContractFollowup, aiEnabled: !sendContractFollowup.aiEnabled, enabled: false })}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            sendContractFollowup.aiEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                          }`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            sendContractFollowup.aiEnabled ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Enable Custom Followup</span>
                        <button
                          type="button"
                          onClick={() => setSendContractFollowup({ ...sendContractFollowup, enabled: !sendContractFollowup.enabled, aiEnabled: false })}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            sendContractFollowup.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                          }`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            sendContractFollowup.enabled ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {sendContractFollowup.aiEnabled && (
                    <p className="text-xs text-gray-500 italic">
                      Your AI agent will periodically re-engage unresponsive leads to guide them back into the sales process. Leads can opt out of further contact at any time.
                    </p>
                  )}

                  {sendContractFollowup.enabled && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-600">If no lead response, reach back out the next day at:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {followupTimeOptions.map(timeOption => (
                          <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(sendContractFollowup.nextDayTimes || ['Morning']).includes(timeOption)}
                              onChange={(e) => {
                                const currentTimes = sendContractFollowup.nextDayTimes || ['Morning'];
                                const newTimes = e.target.checked
                                  ? [...currentTimes, timeOption]
                                  : currentTimes.filter(t => t !== timeOption);
                                setSendContractFollowup({ ...sendContractFollowup, nextDayTimes: newTimes.length > 0 ? newTimes : ['Morning'] });
                              }}
                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{timeOption}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {sendContractFollowup.enabled && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-600">If still no response, reach out every:</span>
                        <input
                          type="number"
                          min="2"
                          value={sendContractFollowup.scheduleValue}
                          onChange={(e) => setSendContractFollowup({ ...sendContractFollowup, scheduleValue: e.target.value })}
                          disabled={['Day', 'Week', 'Month'].includes(sendContractFollowup.schedule)}
                          className={`w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${
                            ['Day', 'Week', 'Month'].includes(sendContractFollowup.schedule) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'
                          }`}
                          placeholder="#"
                        />
                        <select
                          value={sendContractFollowup.schedule}
                          onChange={(e) => setSendContractFollowup({ ...sendContractFollowup, schedule: e.target.value, scheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? sendContractFollowup.scheduleValue : '' })}
                          className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        >
                          {followupScheduleOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {(sendContractFollowup.schedule === 'Week' || sendContractFollowup.schedule === 'Weeks') && (
                          <>
                            <span className="text-sm text-gray-600">on</span>
                            <div className="flex items-center gap-2 flex-wrap">
                              {followupDayOptions.map(day => (
                                <label key={day} className="flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={(sendContractFollowup.days || ['Monday']).includes(day)}
                                    onChange={(e) => {
                                      const currentDays = sendContractFollowup.days || ['Monday'];
                                      const newDays = e.target.checked
                                        ? [...currentDays, day]
                                        : currentDays.filter(d => d !== day);
                                      setSendContractFollowup({ ...sendContractFollowup, days: newDays.length > 0 ? newDays : ['Monday'] });
                                    }}
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{day.slice(0, 3)}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                        {(sendContractFollowup.schedule === 'Month' || sendContractFollowup.schedule === 'Months') && (
                          <>
                            <span className="text-sm text-gray-600 flex-shrink-0">on the</span>
                            <div className="flex items-center gap-2 overflow-x-auto flex-nowrap max-w-xs py-1" style={{ scrollbarWidth: 'thin' }}>
                              {followupDayOfMonthOptions.map(day => (
                                <label key={day} className="flex items-center gap-1 cursor-pointer flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    checked={(sendContractFollowup.daysOfMonth || ['1st']).includes(day)}
                                    onChange={(e) => {
                                      const currentDays = sendContractFollowup.daysOfMonth || ['1st'];
                                      const newDays = e.target.checked
                                        ? [...currentDays, day]
                                        : currentDays.filter(d => d !== day);
                                      setSendContractFollowup({ ...sendContractFollowup, daysOfMonth: newDays.length > 0 ? newDays : ['1st'] });
                                    }}
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{day}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-600">at</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {followupTimeOptions.map(timeOption => (
                            <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={(sendContractFollowup.times || ['Morning']).includes(timeOption)}
                                onChange={(e) => {
                                  const currentTimes = sendContractFollowup.times || ['Morning'];
                                  const newTimes = e.target.checked
                                    ? [...currentTimes, timeOption]
                                    : currentTimes.filter(t => t !== timeOption);
                                  setSendContractFollowup({ ...sendContractFollowup, times: newTimes.length > 0 ? newTimes : ['Morning'] });
                                }}
                                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{timeOption}</span>
                            </label>
                          ))}
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
                {/* Send Invoice Title */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">Send Invoice</h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'send-invoice' ? null : 'send-invoice')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'send-invoice' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Once you indicate that the job has been completed, you can edit and send an invoice to the customer via email and/or text. Enable the followup feature to periodically remind the lead that the payment is due.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Followup Section */}
                <div className="space-y-3">
                  <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Enable AI Followup</span>
                        <button
                          type="button"
                          onClick={() => setSendInvoiceFollowup({ ...sendInvoiceFollowup, aiEnabled: !sendInvoiceFollowup.aiEnabled, enabled: false })}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            sendInvoiceFollowup.aiEnabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                          }`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            sendInvoiceFollowup.aiEnabled ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Enable Custom Followup</span>
                        <button
                          type="button"
                          onClick={() => setSendInvoiceFollowup({ ...sendInvoiceFollowup, enabled: !sendInvoiceFollowup.enabled, aiEnabled: false })}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            sendInvoiceFollowup.enabled ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                          }`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            sendInvoiceFollowup.enabled ? 'translate-x-5' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {sendInvoiceFollowup.aiEnabled && (
                    <p className="text-xs text-gray-500 italic">
                      Your AI agent will periodically re-engage unresponsive leads to guide them back into the sales process. Leads can opt out of further contact at any time.
                    </p>
                  )}

                  {sendInvoiceFollowup.enabled && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-600">If no lead response, reach back out the next day at:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {followupTimeOptions.map(timeOption => (
                          <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(sendInvoiceFollowup.nextDayTimes || ['Morning']).includes(timeOption)}
                              onChange={(e) => {
                                const currentTimes = sendInvoiceFollowup.nextDayTimes || ['Morning'];
                                const newTimes = e.target.checked
                                  ? [...currentTimes, timeOption]
                                  : currentTimes.filter(t => t !== timeOption);
                                setSendInvoiceFollowup({ ...sendInvoiceFollowup, nextDayTimes: newTimes.length > 0 ? newTimes : ['Morning'] });
                              }}
                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{timeOption}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {sendInvoiceFollowup.enabled && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-600">If still no response, reach out every:</span>
                        <input
                          type="number"
                          min="2"
                          value={sendInvoiceFollowup.scheduleValue}
                          onChange={(e) => setSendInvoiceFollowup({ ...sendInvoiceFollowup, scheduleValue: e.target.value })}
                          disabled={['Day', 'Week', 'Month'].includes(sendInvoiceFollowup.schedule)}
                          className={`w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none ${
                            ['Day', 'Week', 'Month'].includes(sendInvoiceFollowup.schedule) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'
                          }`}
                          placeholder="#"
                        />
                        <select
                          value={sendInvoiceFollowup.schedule}
                          onChange={(e) => setSendInvoiceFollowup({ ...sendInvoiceFollowup, schedule: e.target.value, scheduleValue: ['Days', 'Weeks', 'Months'].includes(e.target.value) ? sendInvoiceFollowup.scheduleValue : '' })}
                          className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        >
                          {followupScheduleOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {(sendInvoiceFollowup.schedule === 'Week' || sendInvoiceFollowup.schedule === 'Weeks') && (
                          <>
                            <span className="text-sm text-gray-600">on</span>
                            <div className="flex items-center gap-2 flex-wrap">
                              {followupDayOptions.map(day => (
                                <label key={day} className="flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={(sendInvoiceFollowup.days || ['Monday']).includes(day)}
                                    onChange={(e) => {
                                      const currentDays = sendInvoiceFollowup.days || ['Monday'];
                                      const newDays = e.target.checked
                                        ? [...currentDays, day]
                                        : currentDays.filter(d => d !== day);
                                      setSendInvoiceFollowup({ ...sendInvoiceFollowup, days: newDays.length > 0 ? newDays : ['Monday'] });
                                    }}
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{day.slice(0, 3)}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                        {(sendInvoiceFollowup.schedule === 'Month' || sendInvoiceFollowup.schedule === 'Months') && (
                          <>
                            <span className="text-sm text-gray-600 flex-shrink-0">on the</span>
                            <div className="flex items-center gap-2 overflow-x-auto flex-nowrap max-w-xs py-1" style={{ scrollbarWidth: 'thin' }}>
                              {followupDayOfMonthOptions.map(day => (
                                <label key={day} className="flex items-center gap-1 cursor-pointer flex-shrink-0">
                                  <input
                                    type="checkbox"
                                    checked={(sendInvoiceFollowup.daysOfMonth || ['1st']).includes(day)}
                                    onChange={(e) => {
                                      const currentDays = sendInvoiceFollowup.daysOfMonth || ['1st'];
                                      const newDays = e.target.checked
                                        ? [...currentDays, day]
                                        : currentDays.filter(d => d !== day);
                                      setSendInvoiceFollowup({ ...sendInvoiceFollowup, daysOfMonth: newDays.length > 0 ? newDays : ['1st'] });
                                    }}
                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{day}</span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-600">at</span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {followupTimeOptions.map(timeOption => (
                            <label key={timeOption} className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={(sendInvoiceFollowup.times || ['Morning']).includes(timeOption)}
                                onChange={(e) => {
                                  const currentTimes = sendInvoiceFollowup.times || ['Morning'];
                                  const newTimes = e.target.checked
                                    ? [...currentTimes, timeOption]
                                    : currentTimes.filter(t => t !== timeOption);
                                  setSendInvoiceFollowup({ ...sendInvoiceFollowup, times: newTimes.length > 0 ? newTimes : ['Morning'] });
                                }}
                                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{timeOption}</span>
                            </label>
                          ))}
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
            ) : selectedSalesFlowStage === 'After Job' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-6 mb-4">
                {/* After Job Title */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">After Job</h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'after-job' ? null : 'after-job')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'after-job' && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenHookTooltip(null)}
                        />
                        <div className="absolute left-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            After the job is completed and payment is received, your AI Agent can automatically request a review from the customer. This helps build your online reputation and gather valuable feedback for your business.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Enable Review Request Toggle */}
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Enable Review Request</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newValue = !enableReviewRequest;
                        setEnableReviewRequest(newValue);
                        // If toggling off, clear all saved and editing data
                        if (!newValue) {
                          setSelectedReviewPlatforms([]);
                          setReviewPlatformLinks({});
                          setSavedReviewPlatforms([]);
                          setSavedReviewLinks({});
                          setIsEditingReviewPlatforms(true);
                        }
                      }}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        enableReviewRequest ? 'bg-blue-600' : 'bg-gray-400 shadow-inner'
                      }`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        enableReviewRequest ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                {/* Review Platforms - Only show when enabled */}
                {enableReviewRequest && (
                  <>
                    {/* Display Version - Show when saved and not editing */}
                    {savedReviewPlatforms.length > 0 && !isEditingReviewPlatforms ? (
                      <div className="pt-4 relative">
                        {/* Edit Pencil */}
                        <button
                          type="button"
                          onClick={() => {
                            // Copy saved data to editing state
                            setSelectedReviewPlatforms([...savedReviewPlatforms]);
                            setReviewPlatformLinks({...savedReviewLinks});
                            setIsEditingReviewPlatforms(true);
                          }}
                          className="absolute top-4 right-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <div className="space-y-3 pr-10">
                          {/* Display selected platforms as pills */}
                          <div className="flex flex-wrap gap-2">
                            {savedReviewPlatforms.map((platformId) => {
                              const platform = reviewPlatformOptions.find(p => p.id === platformId);
                              return (
                                <span key={platformId} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                                  {platform?.name}
                                </span>
                              );
                            })}
                          </div>

                          {/* Display saved links */}
                          {Object.keys(savedReviewLinks).length > 0 && (
                            <div className="space-y-2 pt-2 border-t border-slate-100">
                              <label className="text-sm font-semibold text-gray-700">Review Page Links</label>
                              {savedReviewPlatforms.map((platformId) => {
                                const platform = reviewPlatformOptions.find(p => p.id === platformId);
                                const link = savedReviewLinks[platformId];
                                if (!link) return null;
                                return (
                                  <div key={platformId} className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600 w-24 flex-shrink-0">{platform?.name}:</span>
                                    <span className="text-sm text-blue-600 truncate">{link}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Edit Form - Show when no saved data or editing */
                      <div className="pt-4 space-y-4">
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500">Select the platforms where you'd like customers to leave reviews</p>

                          {/* Multi-select Dropdown - styled like Job Demos */}
                          <div className="service-dropdown-multi">
                            <button
                              type="button"
                              onClick={() => setReviewPlatformDropdownOpen(!reviewPlatformDropdownOpen)}
                              className={`service-dropdown-button-inline ${reviewPlatformDropdownOpen ? 'service-dropdown-button-open' : ''}`}
                            >
                              <div className="service-dropdown-content">
                                {selectedReviewPlatforms.length === 0 ? (
                                  <span className="service-dropdown-placeholder">Select platforms</span>
                                ) : (
                                  <div className="service-pills-inline">
                                    {selectedReviewPlatforms.map((platformId) => {
                                      const platform = reviewPlatformOptions.find(p => p.id === platformId);
                                      return (
                                        <span key={platformId} className="service-pill-inline">
                                          {platform?.name}
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedReviewPlatforms(selectedReviewPlatforms.filter(p => p !== platformId));
                                              const newLinks = { ...reviewPlatformLinks };
                                              delete newLinks[platformId];
                                              setReviewPlatformLinks(newLinks);
                                            }}
                                            className="service-pill-remove-inline"
                                          >
                                            <X className="w-3 h-3" />
                                          </button>
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                              <ChevronDown className={`service-dropdown-chevron ${reviewPlatformDropdownOpen ? 'service-dropdown-chevron-open' : ''}`} />
                            </button>

                            {reviewPlatformDropdownOpen && (
                              <>
                                <div
                                  className="service-dropdown-overlay"
                                  onClick={() => setReviewPlatformDropdownOpen(false)}
                                />
                                <div className="service-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                  <div className="service-dropdown-list">
                                    {reviewPlatformOptions.map((platform) => {
                                      const isSelected = selectedReviewPlatforms.includes(platform.id);
                                      return (
                                        <button
                                          key={platform.id}
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelected) {
                                              setSelectedReviewPlatforms(selectedReviewPlatforms.filter(p => p !== platform.id));
                                              const newLinks = { ...reviewPlatformLinks };
                                              delete newLinks[platform.id];
                                              setReviewPlatformLinks(newLinks);
                                            } else {
                                              setSelectedReviewPlatforms([...selectedReviewPlatforms, platform.id]);
                                            }
                                          }}
                                          className={`service-dropdown-item-multi ${isSelected ? 'service-dropdown-item-selected' : ''}`}
                                        >
                                          <div className={`w-4 h-4 rounded border flex items-center justify-center mr-2 ${
                                            isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                                          }`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                          </div>
                                          {platform.name}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Link inputs for selected platforms */}
                        {selectedReviewPlatforms.length > 0 && (
                          <div className="space-y-3 pt-3">
                            <label className="text-sm font-semibold text-gray-700">Review Page Links</label>
                            {selectedReviewPlatforms.map((platformId) => {
                              const platform = reviewPlatformOptions.find(p => p.id === platformId);
                              return (
                                <div key={platformId} className="flex items-center gap-3">
                                  <div className="w-24 flex-shrink-0">
                                    <span className="text-sm font-medium text-gray-600">{platform?.name}</span>
                                  </div>
                                  <input
                                    type="url"
                                    value={reviewPlatformLinks[platformId] || ''}
                                    onChange={(e) => setReviewPlatformLinks({
                                      ...reviewPlatformLinks,
                                      [platformId]: e.target.value
                                    })}
                                    placeholder={`Enter your ${platform?.name} review page URL`}
                                    className="service-dropdown-description-input"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-200 flex-shrink-0">
                  {afterJobSaveError && (
                    <span className="text-red-500 text-sm">* {afterJobSaveError}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      // Validation for After Job section
                      if (enableReviewRequest) {
                        // Check if platforms are selected
                        const platformsToCheck = isEditingReviewPlatforms ? selectedReviewPlatforms : savedReviewPlatforms;
                        const linksToCheck = isEditingReviewPlatforms ? reviewPlatformLinks : savedReviewLinks;

                        if (platformsToCheck.length === 0) {
                          setAfterJobSaveError('Please select at least one review platform');
                          return;
                        }

                        // Check if all selected platforms have URLs
                        const missingUrls = platformsToCheck.filter(platformId => !linksToCheck[platformId] || linksToCheck[platformId].trim() === '');
                        if (missingUrls.length > 0) {
                          const platformNames = missingUrls.map(id => reviewPlatformOptions.find(p => p.id === id)?.name).join(', ');
                          setAfterJobSaveError(`Please enter URLs for: ${platformNames}`);
                          return;
                        }

                        // Validate URL format
                        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
                        const invalidUrls = platformsToCheck.filter(platformId => {
                          const url = linksToCheck[platformId];
                          return url && !urlPattern.test(url.trim());
                        });
                        if (invalidUrls.length > 0) {
                          const platformNames = invalidUrls.map(id => reviewPlatformOptions.find(p => p.id === id)?.name).join(', ');
                          setAfterJobSaveError(`Invalid URL format for: ${platformNames}`);
                          return;
                        }

                        // If editing, save the platforms
                        if (isEditingReviewPlatforms && selectedReviewPlatforms.length > 0) {
                          setSavedReviewPlatforms([...selectedReviewPlatforms]);
                          setSavedReviewLinks({...reviewPlatformLinks});
                          setIsEditingReviewPlatforms(false);
                          setSelectedReviewPlatforms([]);
                          setReviewPlatformLinks({});
                        }
                      }

                      // Clear error on successful save
                      setAfterJobSaveError('');
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
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
                  const itemWithMedia = currentItems.find(item => item.media);

                  if (!itemWithMedia || !itemWithMedia.media) {
                    setPersonalGreetingError(true);
                    return;
                  }

                  // Save the video
                  setPersonalGreetingError(false);
                  setSavedPersonalGreeting({
                    id: itemWithMedia.id,
                    media: itemWithMedia.media,
                    mediaUrl: itemWithMedia.mediaUrl || URL.createObjectURL(itemWithMedia.media)
                  });
                  // Clear the editing item
                  setAgentFlowSteps(agentFlowSteps.map(s =>
                    s.id === step.id ? { ...s, mediaItems: [] } : s
                  ));
                };

                const editSavedPersonalGreeting = () => {
                  if (savedPersonalGreeting) {
                    const currentItems = step.mediaItems || [];
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id ? { ...s, mediaItems: [savedPersonalGreeting] } : s
                    ));
                    setSavedPersonalGreeting(null);
                  }
                };

                const deleteSavedPersonalGreeting = () => {
                  if (savedPersonalGreeting?.mediaUrl) {
                    URL.revokeObjectURL(savedPersonalGreeting.mediaUrl);
                  }
                  setSavedPersonalGreeting(null);
                };

                // VideoUploadBox component
                const VideoUploadBox = ({ onFileSelect, itemId = null, onDelete = null }) => (
                  <div className="photo-upload-box-large">
                    <label className="photo-upload-label-large">
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
                    className="bg-slate-50 rounded-2xl p-5 h-full flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setOpenHookTooltip(openHookTooltip === 'personal-greeting' ? null : 'personal-greeting')}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <HelpCircle className="w-5 h-5" />
                        </button>
                        {openHookTooltip === 'personal-greeting' && (
                          <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                            <p className="text-sm text-gray-600">
                              Upload a short video introducing yourself and your business. (Must be MP4 video format, up to 60 seconds long, max 50 MB.)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        {/* Saved Personal Greeting Video */}
                        {savedPersonalGreeting && (
                          <div className="p-4 bg-white rounded-xl border border-slate-200 relative">
                            <div className="absolute top-3 right-3 flex gap-2 z-10">
                              <button
                                type="button"
                                onClick={editSavedPersonalGreeting}
                                className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={deleteSavedPersonalGreeting}
                                className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex gap-4 pr-16">
                              <div className="w-60 h-36 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 relative group">
                                <video
                                  id="saved-video-personal-greeting"
                                  src={savedPersonalGreeting.mediaUrl}
                                  className={`w-full h-full object-contain bg-black ${fullscreenVideoId === 'personal-greeting' ? '' : 'video-no-controls'}`}
                                  muted={mutedVideoIds.includes('personal-greeting')}
                                  controls={fullscreenVideoId === 'personal-greeting'}
                                  disablePictureInPicture={fullscreenVideoId !== 'personal-greeting'}
                                  controlsList={fullscreenVideoId === 'personal-greeting' ? 'nodownload noplaybackrate' : 'nodownload nofullscreen noremoteplayback noplaybackrate'}
                                  onEnded={() => setPlayingVideoId(null)}
                                />
                                {/* Transparent overlay to block browser controls (only when not fullscreen) */}
                                {fullscreenVideoId !== 'personal-greeting' && (
                                  <div
                                    className="absolute inset-0 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const video = document.getElementById('saved-video-personal-greeting');
                                      if (video) {
                                        if (video.paused) {
                                          video.play();
                                          setPlayingVideoId('personal-greeting');
                                        } else {
                                          video.pause();
                                          setPlayingVideoId(null);
                                        }
                                      }
                                    }}
                                  />
                                )}
                                {/* Play/Pause overlay */}
                                {playingVideoId !== 'personal-greeting' && (
                                  <div
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                  >
                                    <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                                    </div>
                                  </div>
                                )}
                                {/* Fullscreen button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const video = document.getElementById('saved-video-personal-greeting');
                                    if (video) {
                                      setFullscreenVideoId('personal-greeting');
                                      if (video.requestFullscreen) {
                                        video.requestFullscreen();
                                      } else if (video.webkitRequestFullscreen) {
                                        video.webkitRequestFullscreen();
                                      } else if (video.msRequestFullscreen) {
                                        video.msRequestFullscreen();
                                      }
                                    }
                                  }}
                                  className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Maximize className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Editable Video Upload - show when no saved video or editing */}
                        {!savedPersonalGreeting && (
                          <div className="p-4 bg-white rounded-xl border border-slate-200">
                            {displayItems.map((item, itemIndex) => (
                              <div key={item.id}>
                                {item.media ? (
                                  <div>
                                    {item.media instanceof File && item.media.type.startsWith('video/') ? (
                                      <div className="w-60 h-36 rounded-lg overflow-hidden bg-slate-100 relative group" key={`video-container-pg-${item.id}-${item.mediaUrl}`}>
                                        <video
                                          key={`video-pg-${item.id}-${item.mediaUrl}`}
                                          src={item.mediaUrl || URL.createObjectURL(item.media)}
                                          className="w-full h-full object-contain bg-black video-no-controls"
                                          disablePictureInPicture
                                          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                                          onEnded={(e) => {
                                            const overlay = document.getElementById(`play-overlay-pg-${item.id}`);
                                            if (overlay) overlay.style.opacity = '1';
                                          }}
                                        />
                                        {/* Transparent overlay to block browser controls */}
                                        <div
                                          className="absolute inset-0 cursor-pointer"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const video = e.target.previousElementSibling;
                                            const overlay = document.getElementById(`play-overlay-pg-${item.id}`);
                                            if (video && video.tagName === 'VIDEO') {
                                              if (video.paused) {
                                                video.play();
                                                if (overlay) overlay.style.opacity = '0';
                                              } else {
                                                video.pause();
                                                if (overlay) overlay.style.opacity = '1';
                                              }
                                            }
                                          }}
                                        />
                                        <div id={`play-overlay-pg-${item.id}`} className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200">
                                          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                                            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                                          </div>
                                        </div>
                                        <button
                                          onClick={() => {
                                            clearMediaFromItem(item.id);
                                            setPersonalGreetingError(false);
                                          }}
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
                                    onFileSelect={(file) => {
                                      const blobUrl = URL.createObjectURL(file);
                                      const currentItems = step.mediaItems || [];
                                      if (currentItems.length === 0 && item.id.toString().startsWith('temp-')) {
                                        setAgentFlowSteps(agentFlowSteps.map(s =>
                                          s.id === step.id
                                            ? { ...s, mediaItems: [{ id: Date.now(), media: file, mediaUrl: blobUrl }] }
                                            : s
                                        ));
                                      } else {
                                        setAgentFlowSteps(agentFlowSteps.map(s =>
                                          s.id === step.id
                                            ? {
                                                ...s,
                                                mediaItems: currentItems.map(i =>
                                                  i.id === item.id ? { ...i, media: file, mediaUrl: blobUrl } : i
                                                )
                                              }
                                            : s
                                        ));
                                      }
                                      setPersonalGreetingError(false);
                                    }}
                                    itemId={item.id}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>

                    {/* Save Button - only show when not saved */}
                    {!savedPersonalGreeting && (
                      <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-200 flex-shrink-0">
                        {personalGreetingError && (
                          <span className="text-xs text-red-500 flex items-center gap-0.5">
                            <span className="text-red-500">*</span> Please upload a video
                          </span>
                        )}
                        <button
                          onClick={handleSavePersonalGreeting}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          type="button"
                        >
                          Save
                        </button>
                      </div>
                    )}
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
                // Ensure at least one media item exists for display only when no saved items
                const displayItems = mediaItems.length === 0 && savedJobDemos.length === 0
                  ? [{ id: 'temp-' + Date.now(), media: null, description: '', service: '', beforeAfter: '' }]
                  : mediaItems;

                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
                  // Limit to 10 items total (saved + editing)
                  if (savedJobDemos.length + currentItems.length >= 10) return;
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
                    const newItem = { id: Date.now(), media: null, mediaUrl: null, description: '', service: '', beforeAfter: '' };
                    // If setting media, also create the blob URL
                    if (field === 'media' && value instanceof File) {
                      const blobUrl = URL.createObjectURL(value);
                      setAgentFlowSteps(agentFlowSteps.map(s =>
                        s.id === step.id
                          ? { ...s, mediaItems: [{ ...newItem, media: value, mediaUrl: blobUrl }] }
                          : s
                      ));
                    } else {
                      setAgentFlowSteps(agentFlowSteps.map(s =>
                        s.id === step.id
                          ? { ...s, mediaItems: [{ ...newItem, [field]: value }] }
                          : s
                      ));
                    }
                  } else {
                    // If setting media, also create the blob URL
                    if (field === 'media' && value instanceof File) {
                      const blobUrl = URL.createObjectURL(value);
                      setAgentFlowSteps(agentFlowSteps.map(s =>
                        s.id === step.id
                          ? {
                              ...s,
                              mediaItems: currentItems.map(item =>
                                item.id === itemId ? { ...item, media: value, mediaUrl: blobUrl } : item
                              )
                            }
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
                  }
                };

                const removeMediaItem = (itemId) => {
                  const currentItems = step.mediaItems || [];
                  // If there are saved demos, allow removing all items completely
                  if (savedJobDemos.length > 0) {
                    // Revoke blob URLs before removing
                    const itemToRemove = currentItems.find(item => item.id === itemId);
                    if (itemToRemove?.mediaUrl) {
                      URL.revokeObjectURL(itemToRemove.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: currentItems.filter(item => item.id !== itemId) }
                        : s
                    ));
                  } else if (currentItems.length <= 1) {
                    // If no saved demos and it's the last item, clear the media instead of removing
                    const itemToReset = currentItems.find(item => item.id === itemId);
                    if (itemToReset?.mediaUrl) {
                      URL.revokeObjectURL(itemToReset.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? {
                            ...s,
                            mediaItems: currentItems.map(item =>
                              item.id === itemId ? { ...item, media: null, mediaUrl: null, description: '', services: [] } : item
                            )
                          }
                        : s
                    ));
                  } else {
                    // Multiple items, remove the item
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: currentItems.filter(item => item.id !== itemId) }
                        : s
                    ));
                  }
                };
                
                const clearMediaFromItem = (itemId) => {
                  const currentItems = step.mediaItems || [];
                  // Revoke blob URL before clearing
                  const itemToClear = currentItems.find(item => item.id === itemId);
                  if (itemToClear?.mediaUrl) {
                    URL.revokeObjectURL(itemToClear.mediaUrl);
                  }
                  // Clear media, mediaUrl, and description but keep the item
                  setAgentFlowSteps(agentFlowSteps.map(s =>
                    s.id === step.id
                      ? {
                          ...s,
                          mediaItems: currentItems.map(item =>
                            item.id === itemId ? { ...item, media: null, mediaUrl: null, description: '' } : item
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
                  if (itemsWithMedia.length === 0) {
                    return;
                  }
                  // Move valid items to saved demos
                  const newSavedDemos = [...savedJobDemos, ...itemsWithMedia];
                  setSavedJobDemos(newSavedDemos);
                  // Restore any pending items, or clear the edit section
                  if (pendingJobDemoItems.length > 0) {
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: pendingJobDemoItems }
                        : s
                    ));
                    setPendingJobDemoItems([]);
                  } else {
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: [] }
                        : s
                    ));
                  }
                };

                const editSavedDemo = (demoId) => {
                  const demoToEdit = savedJobDemos.find(d => d.id === demoId);
                  if (demoToEdit) {
                    // Save any existing editable items to pending
                    const currentItems = step.mediaItems || [];
                    if (currentItems.length > 0) {
                      setPendingJobDemoItems([...pendingJobDemoItems, ...currentItems]);
                    }
                    // Remove from saved
                    setSavedJobDemos(savedJobDemos.filter(d => d.id !== demoId));
                    // Set mediaItems to just the item being edited
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: [demoToEdit] }
                        : s
                    ));
                  }
                };

                const deleteSavedDemo = (demoId) => {
                  setSavedJobDemos(savedJobDemos.filter(d => d.id !== demoId));
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
                  const isOpen = openServicesDropdownId === itemId;
                  const [searchTerm, setSearchTerm] = useState('');

                  const filteredServices = allServices.filter(service =>
                    service.toLowerCase().includes(searchTerm.toLowerCase())
                  );

                  const handleListRef = (el) => {
                    if (el && jobDemosDropdownScrollRef.current > 0) {
                      // Use requestAnimationFrame to ensure scroll happens after layout
                      requestAnimationFrame(() => {
                        el.scrollTop = jobDemosDropdownScrollRef.current;
                      });
                    }
                  };

                  const toggleService = (service, e) => {
                    // Save scroll position from the list element
                    const listEl = e.target.closest('.service-dropdown-list');
                    if (listEl) {
                      jobDemosDropdownScrollRef.current = listEl.scrollTop;
                    }
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
                        onClick={() => setOpenServicesDropdownId(isOpen ? null : itemId)}
                        className={`service-dropdown-button-inline ${isOpen ? 'service-dropdown-button-open' : ''}`}
                      >
                        <div className="service-dropdown-content">
                          {(selectedServices || []).length === 0 ? (
                            <span className="service-dropdown-placeholder">Select services</span>
                          ) : (
                            <div className="service-pills-inline">
                              {selectedServices.map((service) => (
                                <span key={service} className="service-pill-inline">
                                  {service}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeService(e, service);
                                    }}
                                    className="service-pill-remove-inline"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ChevronDown className={`service-dropdown-chevron ${isOpen ? 'service-dropdown-chevron-open' : ''}`} />
                      </button>

                      {isOpen && (
                        <>
                          <div
                            className="service-dropdown-overlay"
                            onClick={() => setOpenServicesDropdownId(null)}
                          />
                          <div className="service-dropdown-menu" onClick={(e) => e.stopPropagation()}>
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
                            <div className="service-dropdown-list" ref={handleListRef}>
                              {filteredServices.length > 0 ? (
                                filteredServices.map((service) => {
                                  const isSelected = (selectedServices || []).includes(service);
                                  return (
                                    <button
                                      key={service}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleService(service, e);
                                      }}
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
                const VideoUploadBox = ({ onFileSelect, itemId = null, onDelete = null, hasError = false }) => (
                  <div className="photo-upload-box">
                    <label className={`photo-upload-label ${hasError ? 'border-red-500 bg-red-50' : ''}`}>
                      <div className="photo-upload-content">
                        <Upload className={`photo-upload-icon ${hasError ? 'text-red-400' : ''}`} />
                        <p className={`photo-upload-text ${hasError ? 'text-red-500' : ''}`}>Add video</p>
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
                    className="bg-slate-50 rounded-2xl p-5 h-full flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setOpenHookTooltip(openHookTooltip === 'job-demos' ? null : 'job-demos')}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <HelpCircle className="w-5 h-5" />
                        </button>
                        {openHookTooltip === 'job-demos' && (
                          <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                            <p className="text-sm text-gray-600">
                              Upload videos showcasing your work. Select the service type for each video to help match demos with customer inquiries. (Must be MP4 video format, up to 60 seconds long, max 50 MB.)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 section-spacing overflow-y-auto mb-4">
                        {/* Saved Demos Section */}
                        {savedJobDemos.length > 0 && (
                          <div className="mb-2">
                            <div className="space-y-3">
                              {savedJobDemos.map((demo) => (
                                <div key={demo.id} className="p-4 bg-white rounded-xl border border-slate-200 relative">
                                  <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => editSavedDemo(demo.id)}
                                      className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                      title="Edit"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteSavedDemo(demo.id)}
                                      className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="flex gap-4 pr-16">
                                    {demo.media && demo.media instanceof File && demo.media.type.startsWith('video/') && (
                                      <div className="w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 relative group">
                                        <video
                                          id={`saved-video-${demo.id}`}
                                          src={demo.mediaUrl || URL.createObjectURL(demo.media)}
                                          className={`w-full h-full object-contain bg-black ${fullscreenVideoId === demo.id ? '' : 'video-no-controls'}`}
                                          muted={mutedVideoIds.includes(demo.id)}
                                          controls={fullscreenVideoId === demo.id}
                                          disablePictureInPicture={fullscreenVideoId !== demo.id}
                                          controlsList={fullscreenVideoId === demo.id ? 'nodownload noplaybackrate' : 'nodownload nofullscreen noremoteplayback noplaybackrate'}
                                          onEnded={() => setPlayingVideoId(null)}
                                        />
                                        {/* Transparent overlay to block browser controls (only when not fullscreen) */}
                                        {fullscreenVideoId !== demo.id && (
                                          <div
                                            className="absolute inset-0 cursor-pointer"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const video = document.getElementById(`saved-video-${demo.id}`);
                                              if (video) {
                                                if (video.paused) {
                                                  video.play();
                                                  setPlayingVideoId(demo.id);
                                                } else {
                                                  video.pause();
                                                  setPlayingVideoId(null);
                                                }
                                              }
                                            }}
                                          />
                                        )}
                                        {/* Play/Pause overlay */}
                                        {playingVideoId !== demo.id && (
                                          <div
                                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                          >
                                            <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                                              <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                                            </div>
                                          </div>
                                        )}
                                        {/* Fullscreen button */}
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const video = document.getElementById(`saved-video-${demo.id}`);
                                            if (video) {
                                              setFullscreenVideoId(demo.id);
                                              if (video.requestFullscreen) {
                                                video.requestFullscreen();
                                              } else if (video.webkitRequestFullscreen) {
                                                video.webkitRequestFullscreen();
                                              } else if (video.msRequestFullscreen) {
                                                video.msRequestFullscreen();
                                              }
                                            }
                                          }}
                                          className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                          <Maximize className="w-4 h-4" />
                                        </button>
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      {demo.description && (
                                        <div className="mb-2">
                                          <span className="text-xs font-medium text-gray-700 mr-2">Description:</span>
                                          <span className="text-sm italic text-gray-600">{demo.description}</span>
                                        </div>
                                      )}
                                      {demo.services && demo.services.length > 0 && (
                                        <div>
                                          <span className="text-xs font-medium text-gray-700 mr-2">Tags:</span>
                                          <div className="inline-flex flex-wrap gap-1">
                                            {demo.services.map((service, idx) => (
                                              <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">{service}</span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Divider between saved and editable */}
                        {savedJobDemos.length > 0 && (displayItems.length > 0 || savedJobDemos.length < 10) && (
                          <div className="border-t border-slate-300 mt-1 mb-2"></div>
                        )}

                        {/* Edit Demos Section */}
                        {(displayItems.length > 0 && ((step.mediaItems || []).length > 0 || savedJobDemos.length === 0)) && (
                          <div className="media-items-container">
                            {displayItems.map((item, itemIndex) => (
                              <div key={item.id} className="media-item">
                                {item.media ? (
                                  <div className="media-preview">
                                    {item.media instanceof File && item.media.type.startsWith('image/') ? (
                                      <div className="media-preview-container">
                                        <img
                                          src={item.mediaUrl || URL.createObjectURL(item.media)}
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
                                      <div className="w-40 h-24 rounded-lg overflow-hidden bg-slate-100 relative group" key={`video-container-${item.id}-${item.mediaUrl}`}>
                                        <video
                                          key={`video-${item.id}-${item.mediaUrl}`}
                                          src={item.mediaUrl}
                                          className="w-full h-full object-contain bg-black video-no-controls"
                                          disablePictureInPicture
                                          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                                          onEnded={(e) => {
                                            const overlay = document.getElementById(`play-overlay-${item.id}`);
                                            if (overlay) overlay.style.opacity = '1';
                                          }}
                                        />
                                        {/* Transparent overlay to block browser controls */}
                                        <div
                                          className="absolute inset-0 cursor-pointer"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const video = e.target.previousElementSibling;
                                            const overlay = document.getElementById(`play-overlay-${item.id}`);
                                            if (video && video.tagName === 'VIDEO') {
                                              if (video.paused) {
                                                video.play();
                                                if (overlay) overlay.style.opacity = '0';
                                              } else {
                                                video.pause();
                                                if (overlay) overlay.style.opacity = '1';
                                              }
                                            }
                                          }}
                                        />
                                        <div id={`play-overlay-${item.id}`} className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200">
                                          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                                            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                                          </div>
                                        </div>
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
                                    onFileSelect={(file) => {
                                      updateMediaItem(item.id, 'media', file);
                                      // Clear errors when file is uploaded
                                      if (jobDemoErrors[item.id]) {
                                        setJobDemoErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    itemId={item.id}
                                    onDelete={displayItems.length > 1 || savedJobDemos.length > 0 ? () => removeMediaItem(item.id) : null}
                                  />
                                )}

                                <div className="media-item-fields">
                                  <ServiceDropdown
                                    itemId={item.id}
                                    selectedServices={item.services || []}
                                    onServicesChange={(services) => {
                                      updateMediaItem(item.id, 'services', services);
                                      // Clear errors when selection changes
                                      if (jobDemoErrors[item.id]) {
                                        setJobDemoErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                  />
                                  <DescriptionInput
                                    value={item.description || ''}
                                    onChange={(newDescription) => {
                                      updateMediaItem(item.id, 'description', newDescription);
                                      // Clear errors when user finishes typing
                                      if (jobDemoErrors[item.id]) {
                                        setJobDemoErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    maxLength={150}
                                  />
                                  <div className="flex items-center justify-end gap-3 mt-2">
                                    {jobDemoErrors[item.id] && (
                                      <span className="text-xs text-red-500 flex items-center gap-0.5">
                                        <span className="text-red-500">*</span> Please fill out all sections
                                      </span>
                                    )}
                                    <button
                                      onClick={() => {
                                        // Validate this item
                                        const errors = {
                                          media: !item.media,
                                          services: !item.services || item.services.length === 0,
                                          description: !item.description || item.description.trim() === ''
                                        };

                                        if (errors.media || errors.services || errors.description) {
                                          setJobDemoErrors(prev => ({
                                            ...prev,
                                            [item.id]: errors
                                          }));
                                          return;
                                        }

                                        // Clear errors and save this item
                                        setJobDemoErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                        setSavedJobDemos([...savedJobDemos, item]);
                                        // Remove from edit section
                                        const remainingItems = (step.mediaItems || []).filter(i => i.id !== item.id);
                                        // Restore pending items if any
                                        if (pendingJobDemoItems.length > 0) {
                                          setAgentFlowSteps(agentFlowSteps.map(s =>
                                            s.id === step.id
                                              ? { ...s, mediaItems: [...remainingItems, ...pendingJobDemoItems] }
                                              : s
                                          ));
                                          setPendingJobDemoItems([]);
                                        } else {
                                          setAgentFlowSteps(agentFlowSteps.map(s =>
                                            s.id === step.id
                                              ? { ...s, mediaItems: remainingItems }
                                              : s
                                          ));
                                        }
                                      }}
                                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                                      type="button"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Demo button */}
                        {(savedJobDemos.length + (step.mediaItems || []).length) < 10 && (() => {
                          const currentMediaItems = step.mediaItems || [];
                          const hasEditForm = currentMediaItems.length > 0;
                          return (
                            <div className="mt-1">
                              <button
                                onClick={addMediaItem}
                                disabled={hasEditForm}
                                className={`flex items-center gap-2 transition-colors ${
                                  hasEditForm
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-blue-600 hover:text-blue-700'
                                }`}
                                type="button"
                                title={hasEditForm ? 'Save or delete the current form before adding another' : 'Add Demo'}
                              >
                                <Plus className="w-4 h-4" />
                                <span className="text-sm font-medium">Add Demo</span>
                              </button>
                            </div>
                          );
                        })()}
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
                // Filter out items that are in pending state (hidden while editing a saved item)
                const filteredMediaItems = mediaItems.filter(item =>
                  !pendingBeforeAfterItems.some(pending => pending.id === item.id)
                );
                // Ensure at least one media item exists for display only when no saved items
                const displayItems = filteredMediaItems.length === 0 && savedBeforeAfter.length === 0
                  ? [{ id: 'temp-before-after', media: null, mediaUrl: null, description: '', services: [] }]
                  : filteredMediaItems;

                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
                  // Limit to 10 items total (saved + editing)
                  if (savedBeforeAfter.length + currentItems.length >= 10) return;
                  const newItem = { id: Date.now(), media: null, mediaUrl: null, description: '', services: [] };
                  setAgentFlowSteps(agentFlowSteps.map(s =>
                    s.id === step.id
                      ? { ...s, mediaItems: currentItems.length === 0 ? [newItem] : [...currentItems, newItem] }
                      : s
                  ));
                };

                const updateMediaItem = (itemId, field, value, extraFields = {}) => {
                  const currentItems = step.mediaItems || [];
                  // If updating a temp item and mediaItems is empty, initialize it
                  if (currentItems.length === 0 && itemId.toString().startsWith('temp-')) {
                    const newItem = {
                      id: Date.now(),
                      beforeMedia: null,
                      beforeMediaUrl: null,
                      afterMedia: null,
                      afterMediaUrl: null,
                      description: '',
                      services: [],
                      [field]: value,
                      ...extraFields
                    };
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: [newItem] }
                        : s
                    ));
                  } else {
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? {
                            ...s,
                            mediaItems: currentItems.map(item =>
                              item.id === itemId ? { ...item, [field]: value, ...extraFields } : item
                            )
                          }
                        : s
                    ));
                  }
                };

                const removeMediaItem = (itemId) => {
                  const currentItems = step.mediaItems || [];
                  // If there are saved items, allow removing all items completely
                  if (savedBeforeAfter.length > 0) {
                    // Revoke blob URLs before removing
                    const itemToRemove = currentItems.find(item => item.id === itemId);
                    if (itemToRemove?.beforeMediaUrl) {
                      URL.revokeObjectURL(itemToRemove.beforeMediaUrl);
                    }
                    if (itemToRemove?.afterMediaUrl) {
                      URL.revokeObjectURL(itemToRemove.afterMediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: currentItems.filter(item => item.id !== itemId) }
                        : s
                    ));
                  } else if (currentItems.length <= 1) {
                    // If no saved items and it's the last item, clear the media instead of removing
                    const itemToReset = currentItems.find(item => item.id === itemId);
                    if (itemToReset?.mediaUrl) {
                      URL.revokeObjectURL(itemToReset.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? {
                            ...s,
                            mediaItems: currentItems.map(item =>
                              item.id === itemId ? { ...item, media: null, mediaUrl: null, description: '', services: [] } : item
                            )
                          }
                        : s
                    ));
                  } else {
                    // Multiple items, remove the item
                    const itemToRemove = currentItems.find(item => item.id === itemId);
                    if (itemToRemove?.mediaUrl) {
                      URL.revokeObjectURL(itemToRemove.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: currentItems.filter(item => item.id !== itemId) }
                        : s
                    ));
                  }
                };

                const clearMediaFromItem = (itemId) => {
                  const currentItems = step.mediaItems || [];
                  // Revoke blob URL before clearing
                  const itemToClear = currentItems.find(item => item.id === itemId);
                  if (itemToClear?.mediaUrl) {
                    URL.revokeObjectURL(itemToClear.mediaUrl);
                  }
                  // Clear media, mediaUrl, and description but keep the item
                  setAgentFlowSteps(agentFlowSteps.map(s =>
                    s.id === step.id
                      ? {
                          ...s,
                          mediaItems: currentItems.map(item =>
                            item.id === itemId ? { ...item, media: null, mediaUrl: null, description: '' } : item
                          )
                        }
                      : s
                  ));
                };

                const editSavedBeforeAfter = (itemId) => {
                  const itemToEdit = savedBeforeAfter.find(d => d.id === itemId);
                  if (itemToEdit) {
                    // Save any existing editable items to pending
                    const currentItems = step.mediaItems || [];
                    if (currentItems.length > 0) {
                      setPendingBeforeAfterItems([...pendingBeforeAfterItems, ...currentItems]);
                    }
                    // Remove from saved and add to edit
                    setSavedBeforeAfter(savedBeforeAfter.filter(d => d.id !== itemId));
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id ? { ...s, mediaItems: [itemToEdit] } : s
                    ));
                  }
                };

                const deleteSavedBeforeAfter = (itemId) => {
                  const itemToDelete = savedBeforeAfter.find(d => d.id === itemId);
                  if (itemToDelete?.beforeMediaUrl) {
                    URL.revokeObjectURL(itemToDelete.beforeMediaUrl);
                  }
                  if (itemToDelete?.afterMediaUrl) {
                    URL.revokeObjectURL(itemToDelete.afterMediaUrl);
                  }
                  setSavedBeforeAfter(savedBeforeAfter.filter(d => d.id !== itemId));
                };

                // Title header for Before & After
                const BeforeAfterTitle = () => (
                  <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenHookTooltip(openHookTooltip === 'before-after' ? null : 'before-after')}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                      {openHookTooltip === 'before-after' && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Upload before and after photos to showcase the transformation and quality of your work. (Upload JPG/PNG (≤5MB). Images auto-resized for fast delivery.)
                          </p>
                        </div>
                      )}
                    </div>
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

                // ServiceDropdown component for Before & After (multi-select)
                const BeforeAfterServiceDropdown = ({ itemId, selectedServices = [], onServicesChange }) => {
                  const isOpen = openBeforeAfterServicesDropdownId === itemId;
                  const [searchTerm, setSearchTerm] = useState('');

                  const filteredServices = allServices.filter(service =>
                    service.toLowerCase().includes(searchTerm.toLowerCase())
                  );

                  const handleListRef = (el) => {
                    if (el && beforeAfterDropdownScrollRef.current > 0) {
                      // Use requestAnimationFrame to ensure scroll happens after layout
                      requestAnimationFrame(() => {
                        el.scrollTop = beforeAfterDropdownScrollRef.current;
                      });
                    }
                  };

                  const toggleService = (service, e) => {
                    // Save scroll position from the list element
                    const listEl = e.target.closest('.service-dropdown-list');
                    if (listEl) {
                      beforeAfterDropdownScrollRef.current = listEl.scrollTop;
                    }
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
                        onClick={() => setOpenBeforeAfterServicesDropdownId(isOpen ? null : itemId)}
                        className={`service-dropdown-button-inline ${isOpen ? 'service-dropdown-button-open' : ''}`}
                      >
                        <div className="service-dropdown-content">
                          {(selectedServices || []).length === 0 ? (
                            <span className="service-dropdown-placeholder">Select services</span>
                          ) : (
                            <div className="service-pills-inline">
                              {selectedServices.map((service) => (
                                <span key={service} className="service-pill-inline">
                                  {service}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeService(e, service);
                                    }}
                                    className="service-pill-remove-inline"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ChevronDown className={`service-dropdown-chevron ${isOpen ? 'service-dropdown-chevron-open' : ''}`} />
                      </button>

                      {isOpen && (
                        <>
                          <div
                            className="service-dropdown-overlay"
                            onClick={() => setOpenBeforeAfterServicesDropdownId(null)}
                          />
                          <div className="service-dropdown-menu" onClick={(e) => e.stopPropagation()}>
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
                            <div className="service-dropdown-list" ref={handleListRef}>
                              {filteredServices.length > 0 ? (
                                filteredServices.map((service) => {
                                  const isSelected = (selectedServices || []).includes(service);
                                  return (
                                    <button
                                      key={service}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleService(service, e);
                                      }}
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

                // PhotoUploadBox component for Before & After - single box with label
                const BeforeAfterUploadBox = ({ onFileSelect, label, mediaFile, mediaUrl, onClear }) => (
                  <div className="before-after-upload-wrapper">
                    <span className="before-after-label">{label}</span>
                    {mediaFile ? (
                      <div className="before-after-preview">
                        <img
                          src={mediaUrl || URL.createObjectURL(mediaFile)}
                          alt={label}
                          className="before-after-preview-image"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClear();
                          }}
                          className="before-after-remove-button"
                          type="button"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <label className="before-after-upload-label">
                        <div className="before-after-upload-content">
                          <Upload className="before-after-upload-icon" />
                        </div>
                        <input
                          type="file"
                          accept="image/jpeg,image/png"
                          className="photo-upload-input"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onFileSelect(file);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                );

                return (
                  <div
                    key={step.id}
                    className="bg-slate-50 rounded-2xl p-5 h-full flex flex-col"
                  >
                    <BeforeAfterTitle />

                    <div className="flex-1 section-spacing overflow-y-auto mb-4">
                        {/* Saved Before & After Section */}
                        {savedBeforeAfter.length > 0 && (
                          <div className="mb-2">
                            <div className="space-y-3">
                              {savedBeforeAfter.map((item) => (
                                <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 relative">
                                  <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => editSavedBeforeAfter(item.id)}
                                      className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                      title="Edit"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteSavedBeforeAfter(item.id)}
                                      className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="flex gap-4 pr-16">
                                    {/* Before Photo */}
                                    {item.beforeMedia && (
                                      <div className="before-after-saved-photo-wrapper">
                                        <span className="before-after-saved-label">Before</span>
                                        <div
                                          className="before-after-saved-photo group cursor-pointer"
                                          onClick={() => setExpandedBeforeAfterPhotoId(`${item.id}-before`)}
                                        >
                                          <img
                                            src={item.beforeMediaUrl || URL.createObjectURL(item.beforeMedia)}
                                            alt="Before"
                                            className="w-full h-full object-contain"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                              <Maximize className="w-5 h-5 text-white drop-shadow-lg" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    {/* After Photo */}
                                    {item.afterMedia && (
                                      <div className="before-after-saved-photo-wrapper">
                                        <span className="before-after-saved-label">After</span>
                                        <div
                                          className="before-after-saved-photo group cursor-pointer"
                                          onClick={() => setExpandedBeforeAfterPhotoId(`${item.id}-after`)}
                                        >
                                          <img
                                            src={item.afterMediaUrl || URL.createObjectURL(item.afterMedia)}
                                            alt="After"
                                            className="w-full h-full object-contain"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                              <Maximize className="w-5 h-5 text-white drop-shadow-lg" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      {item.description && (
                                        <div className="mb-2">
                                          <span className="text-xs font-medium text-gray-700 mr-2">Description:</span>
                                          <span className="text-sm italic text-gray-600">{item.description}</span>
                                        </div>
                                      )}
                                      {item.services && item.services.length > 0 && (
                                        <div>
                                          <span className="text-xs font-medium text-gray-700 mr-2">Tags:</span>
                                          <div className="inline-flex flex-wrap gap-1">
                                            {item.services.map((service, idx) => (
                                              <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">{service}</span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Expanded Photo Modal - Before */}
                                  {expandedBeforeAfterPhotoId === `${item.id}-before` && item.beforeMedia && (
                                    <div
                                      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                                      onClick={() => setExpandedBeforeAfterPhotoId(null)}
                                    >
                                      <div className="relative max-w-4xl max-h-[90vh] w-full">
                                        <img
                                          src={item.beforeMediaUrl || URL.createObjectURL(item.beforeMedia)}
                                          alt="Before - Expanded"
                                          className="w-full h-full object-contain rounded-lg"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => setExpandedBeforeAfterPhotoId(null)}
                                          className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                                        >
                                          <X className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  {/* Expanded Photo Modal - After */}
                                  {expandedBeforeAfterPhotoId === `${item.id}-after` && item.afterMedia && (
                                    <div
                                      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                                      onClick={() => setExpandedBeforeAfterPhotoId(null)}
                                    >
                                      <div className="relative max-w-4xl max-h-[90vh] w-full">
                                        <img
                                          src={item.afterMediaUrl || URL.createObjectURL(item.afterMedia)}
                                          alt="After - Expanded"
                                          className="w-full h-full object-contain rounded-lg"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => setExpandedBeforeAfterPhotoId(null)}
                                          className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                                        >
                                          <X className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Divider between saved and editable */}
                        {savedBeforeAfter.length > 0 && (displayItems.length > 0 || savedBeforeAfter.length < 10) && (
                          <div className="border-t border-slate-300 mt-1 mb-2"></div>
                        )}

                        {/* Editable Items Section */}
                        {(displayItems.length > 0 && ((step.mediaItems || []).length > 0 || savedBeforeAfter.length === 0)) && (
                          <div className="media-items-container">
                            {displayItems.map((item, itemIndex) => (
                              <div key={item.id} className="before-after-item">
                                {/* Before and After photo boxes side by side */}
                                <div className="before-after-photos">
                                  <BeforeAfterUploadBox
                                    label="Before"
                                    mediaFile={item.beforeMedia}
                                    mediaUrl={item.beforeMediaUrl}
                                    onFileSelect={(file) => {
                                      const url = URL.createObjectURL(file);
                                      updateMediaItem(item.id, 'beforeMedia', file, { beforeMediaUrl: url });
                                      if (beforeAfterErrors[item.id]) {
                                        setBeforeAfterErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    onClear={() => {
                                      if (item.beforeMediaUrl) URL.revokeObjectURL(item.beforeMediaUrl);
                                      updateMediaItem(item.id, 'beforeMedia', null, { beforeMediaUrl: null });
                                    }}
                                  />
                                  <BeforeAfterUploadBox
                                    label="After"
                                    mediaFile={item.afterMedia}
                                    mediaUrl={item.afterMediaUrl}
                                    onFileSelect={(file) => {
                                      const url = URL.createObjectURL(file);
                                      updateMediaItem(item.id, 'afterMedia', file, { afterMediaUrl: url });
                                      if (beforeAfterErrors[item.id]) {
                                        setBeforeAfterErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    onClear={() => {
                                      if (item.afterMediaUrl) URL.revokeObjectURL(item.afterMediaUrl);
                                      updateMediaItem(item.id, 'afterMedia', null, { afterMediaUrl: null });
                                    }}
                                  />
                                </div>

                                <div className="before-after-fields">
                                  <BeforeAfterServiceDropdown
                                    itemId={item.id}
                                    selectedServices={item.services || []}
                                    onServicesChange={(services) => {
                                      updateMediaItem(item.id, 'services', services);
                                      if (beforeAfterErrors[item.id]) {
                                        setBeforeAfterErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                  />
                                  <DescriptionInput
                                    value={item.description || ''}
                                    onChange={(newDescription) => {
                                      updateMediaItem(item.id, 'description', newDescription);
                                      if (beforeAfterErrors[item.id]) {
                                        setBeforeAfterErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    maxLength={150}
                                  />
                                  <div className="flex items-center justify-end gap-3 mt-2">
                                    {beforeAfterErrors[item.id] && (
                                      <span className="text-xs text-red-500 flex items-center gap-0.5">
                                        <span className="text-red-500">*</span> Please fill out all sections
                                      </span>
                                    )}
                                    <button
                                      onClick={() => {
                                        // Validate this item - need both before and after photos
                                        const errors = {
                                          beforeMedia: !item.beforeMedia,
                                          afterMedia: !item.afterMedia,
                                          services: !item.services || item.services.length === 0,
                                          description: !item.description || item.description.trim() === ''
                                        };

                                        if (errors.beforeMedia || errors.afterMedia || errors.services || errors.description) {
                                          setBeforeAfterErrors(prev => ({
                                            ...prev,
                                            [item.id]: errors
                                          }));
                                          return;
                                        }

                                        // Clear errors and save this item
                                        setBeforeAfterErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                        setSavedBeforeAfter([...savedBeforeAfter, item]);
                                        // Remove from edit section
                                        const remainingItems = (step.mediaItems || []).filter(i => i.id !== item.id);
                                        // Restore pending items if any
                                        if (pendingBeforeAfterItems.length > 0) {
                                          setAgentFlowSteps(agentFlowSteps.map(s =>
                                            s.id === step.id
                                              ? { ...s, mediaItems: [...remainingItems, ...pendingBeforeAfterItems] }
                                              : s
                                          ));
                                          setPendingBeforeAfterItems([]);
                                        } else {
                                          setAgentFlowSteps(agentFlowSteps.map(s =>
                                            s.id === step.id
                                              ? { ...s, mediaItems: remainingItems }
                                              : s
                                          ));
                                        }
                                      }}
                                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                                      type="button"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Photo button */}
                        {(savedBeforeAfter.length + (step.mediaItems || []).length) < 10 && (() => {
                          const currentMediaItems = step.mediaItems || [];
                          const hasEditForm = currentMediaItems.length > 0;
                          return (
                            <div className="mt-1">
                              <button
                                onClick={addMediaItem}
                                disabled={hasEditForm}
                                className={`flex items-center gap-2 transition-colors ${
                                  hasEditForm
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-blue-600 hover:text-blue-700'
                                }`}
                                type="button"
                                title={hasEditForm ? 'Save the current form before adding another' : 'Add Photo'}
                              >
                                <Plus className="w-4 h-4" />
                                <span className="text-sm font-medium">Add Photo</span>
                              </button>
                            </div>
                          );
                        })()}
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
                // Filter out items that are in pending state (hidden while editing a saved item)
                const filteredMediaItems = mediaItems.filter(item =>
                  !pendingInfographicsItems.some(pending => pending.id === item.id)
                );
                // Ensure at least one media item exists for display only when no saved items
                const displayItems = filteredMediaItems.length === 0 && savedInfographics.length === 0
                  ? [{ id: 'temp-infographics', media: null, mediaUrl: null, description: '', services: [] }]
                  : filteredMediaItems;

                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
                  // Limit to 10 items total (saved + editing)
                  if (savedInfographics.length + currentItems.length >= 10) return;
                  const newItem = { id: Date.now(), media: null, mediaUrl: null, description: '', services: [] };
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
                    const newItem = { id: Date.now(), media: null, mediaUrl: null, description: '', services: [] };
                    // If setting media, also create the blob URL
                    if (field === 'media' && value instanceof File) {
                      const blobUrl = URL.createObjectURL(value);
                      setAgentFlowSteps(agentFlowSteps.map(s =>
                        s.id === step.id
                          ? { ...s, mediaItems: [{ ...newItem, media: value, mediaUrl: blobUrl }] }
                          : s
                      ));
                    } else {
                      setAgentFlowSteps(agentFlowSteps.map(s =>
                        s.id === step.id
                          ? { ...s, mediaItems: [{ ...newItem, [field]: value }] }
                          : s
                      ));
                    }
                  } else {
                    // If setting media, also create the blob URL
                    if (field === 'media' && value instanceof File) {
                      const blobUrl = URL.createObjectURL(value);
                      setAgentFlowSteps(agentFlowSteps.map(s =>
                        s.id === step.id
                          ? {
                              ...s,
                              mediaItems: currentItems.map(item =>
                                item.id === itemId ? { ...item, media: value, mediaUrl: blobUrl } : item
                              )
                            }
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
                  }
                };

                const removeMediaItem = (itemId) => {
                  const currentItems = step.mediaItems || [];
                  // If there are saved items, allow removing all items completely
                  if (savedInfographics.length > 0) {
                    // Revoke blob URLs before removing
                    const itemToRemove = currentItems.find(item => item.id === itemId);
                    if (itemToRemove?.mediaUrl) {
                      URL.revokeObjectURL(itemToRemove.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: currentItems.filter(item => item.id !== itemId) }
                        : s
                    ));
                  } else if (currentItems.length <= 1) {
                    // If no saved items and it's the last item, clear the media instead of removing
                    const itemToReset = currentItems.find(item => item.id === itemId);
                    if (itemToReset?.mediaUrl) {
                      URL.revokeObjectURL(itemToReset.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? {
                            ...s,
                            mediaItems: currentItems.map(item =>
                              item.id === itemId ? { ...item, media: null, mediaUrl: null, description: '', services: [] } : item
                            )
                          }
                        : s
                    ));
                  } else {
                    // Multiple items, remove the item
                    const itemToRemove = currentItems.find(item => item.id === itemId);
                    if (itemToRemove?.mediaUrl) {
                      URL.revokeObjectURL(itemToRemove.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: currentItems.filter(item => item.id !== itemId) }
                        : s
                    ));
                  }
                };

                const clearMediaFromItem = (itemId) => {
                  const currentItems = step.mediaItems || [];
                  // Revoke blob URL before clearing
                  const itemToClear = currentItems.find(item => item.id === itemId);
                  if (itemToClear?.mediaUrl) {
                    URL.revokeObjectURL(itemToClear.mediaUrl);
                  }
                  // Clear media, mediaUrl, and description but keep the item
                  setAgentFlowSteps(agentFlowSteps.map(s =>
                    s.id === step.id
                      ? {
                          ...s,
                          mediaItems: currentItems.map(item =>
                            item.id === itemId ? { ...item, media: null, mediaUrl: null, description: '' } : item
                          )
                        }
                      : s
                  ));
                };

                const editSavedInfographic = (itemId) => {
                  const itemToEdit = savedInfographics.find(d => d.id === itemId);
                  if (itemToEdit) {
                    // Save any existing editable items to pending
                    const currentItems = step.mediaItems || [];
                    if (currentItems.length > 0) {
                      setPendingInfographicsItems([...pendingInfographicsItems, ...currentItems]);
                    }
                    // Remove from saved and add to edit
                    setSavedInfographics(savedInfographics.filter(d => d.id !== itemId));
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id ? { ...s, mediaItems: [itemToEdit] } : s
                    ));
                  }
                };

                const deleteSavedInfographic = (itemId) => {
                  const itemToDelete = savedInfographics.find(d => d.id === itemId);
                  if (itemToDelete?.mediaUrl) {
                    URL.revokeObjectURL(itemToDelete.mediaUrl);
                  }
                  setSavedInfographics(savedInfographics.filter(d => d.id !== itemId));
                };

                // Title header for Infographics
                const InfographicsTitle = () => (
                  <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Images className="w-5 h-5 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenHookTooltip(openHookTooltip === 'infographics' ? null : 'infographics')}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                      {openHookTooltip === 'infographics' && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Upload infographics to educate customers about your services, processes, or industry tips. (Upload JPG/PNG (≤5MB). Images auto-resized for fast delivery.)
                          </p>
                        </div>
                      )}
                    </div>
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

                // ServiceDropdown component for Infographics (multi-select)
                const InfographicsServiceDropdown = ({ itemId, selectedServices = [], onServicesChange }) => {
                  const isOpen = openInfographicsServicesDropdownId === itemId;
                  const [searchTerm, setSearchTerm] = useState('');

                  const filteredServices = allServices.filter(service =>
                    service.toLowerCase().includes(searchTerm.toLowerCase())
                  );

                  const handleListRef = (el) => {
                    if (el && infographicsDropdownScrollRef.current > 0) {
                      // Use requestAnimationFrame to ensure scroll happens after layout
                      requestAnimationFrame(() => {
                        el.scrollTop = infographicsDropdownScrollRef.current;
                      });
                    }
                  };

                  const toggleService = (service, e) => {
                    // Save scroll position from the list element
                    const listEl = e.target.closest('.service-dropdown-list');
                    if (listEl) {
                      infographicsDropdownScrollRef.current = listEl.scrollTop;
                    }
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
                        onClick={() => setOpenInfographicsServicesDropdownId(isOpen ? null : itemId)}
                        className={`service-dropdown-button-inline ${isOpen ? 'service-dropdown-button-open' : ''}`}
                      >
                        <div className="service-dropdown-content">
                          {(selectedServices || []).length === 0 ? (
                            <span className="service-dropdown-placeholder">Select services</span>
                          ) : (
                            <div className="service-pills-inline">
                              {selectedServices.map((service) => (
                                <span key={service} className="service-pill-inline">
                                  {service}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeService(e, service);
                                    }}
                                    className="service-pill-remove-inline"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ChevronDown className={`service-dropdown-chevron ${isOpen ? 'service-dropdown-chevron-open' : ''}`} />
                      </button>

                      {isOpen && (
                        <>
                          <div
                            className="service-dropdown-overlay"
                            onClick={() => setOpenInfographicsServicesDropdownId(null)}
                          />
                          <div className="service-dropdown-menu" onClick={(e) => e.stopPropagation()}>
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
                            <div className="service-dropdown-list" ref={handleListRef}>
                              {filteredServices.length > 0 ? (
                                filteredServices.map((service) => {
                                  const isSelected = (selectedServices || []).includes(service);
                                  return (
                                    <button
                                      key={service}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleService(service, e);
                                      }}
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
                    className="bg-slate-50 rounded-2xl p-5 h-full flex flex-col"
                  >
                    <InfographicsTitle />

                    <div className="flex-1 section-spacing overflow-y-auto mb-4">
                        {/* Saved Infographics Section */}
                        {savedInfographics.length > 0 && (
                          <div className="mb-2">
                            <div className="space-y-3">
                              {savedInfographics.map((item) => (
                                <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 relative">
                                  <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => editSavedInfographic(item.id)}
                                      className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                      title="Edit"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteSavedInfographic(item.id)}
                                      className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="flex gap-4 pr-16">
                                    {item.media && item.media instanceof File && item.media.type.startsWith('image/') && (
                                      <div
                                        className="w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 relative group cursor-pointer"
                                        onClick={() => setExpandedInfographicsPhotoId(item.id)}
                                      >
                                        <img
                                          src={item.mediaUrl || URL.createObjectURL(item.media)}
                                          alt="Infographic"
                                          className="w-full h-full object-contain"
                                        />
                                        {/* Expand overlay on hover */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Maximize className="w-6 h-6 text-white drop-shadow-lg" />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      {item.description && (
                                        <div className="mb-2">
                                          <span className="text-xs font-medium text-gray-700 mr-2">Description:</span>
                                          <span className="text-sm italic text-gray-600">{item.description}</span>
                                        </div>
                                      )}
                                      {item.services && item.services.length > 0 && (
                                        <div>
                                          <span className="text-xs font-medium text-gray-700 mr-2">Tags:</span>
                                          <div className="inline-flex flex-wrap gap-1">
                                            {item.services.map((service, idx) => (
                                              <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">{service}</span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Expanded Photo Modal */}
                                  {expandedInfographicsPhotoId === item.id && (
                                    <div
                                      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                                      onClick={() => setExpandedInfographicsPhotoId(null)}
                                    >
                                      <div className="relative max-w-4xl max-h-[90vh] w-full">
                                        <img
                                          src={item.mediaUrl || URL.createObjectURL(item.media)}
                                          alt="Infographic - Expanded"
                                          className="w-full h-full object-contain rounded-lg"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => setExpandedInfographicsPhotoId(null)}
                                          className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                                        >
                                          <X className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Divider between saved and editable */}
                        {savedInfographics.length > 0 && (displayItems.length > 0 || savedInfographics.length < 10) && (
                          <div className="border-t border-slate-300 mt-1 mb-2"></div>
                        )}

                        {/* Editable Items Section */}
                        {(displayItems.length > 0 && ((step.mediaItems || []).length > 0 || savedInfographics.length === 0)) && (
                          <div className="media-items-container">
                            {displayItems.map((item, itemIndex) => (
                              <div key={item.id} className="media-item">
                                {item.media ? (
                                  <div className="media-preview">
                                    {item.media instanceof File && item.media.type.startsWith('image/') ? (
                                      <div className="media-preview-container" key={`photo-container-${item.id}-${item.mediaUrl}`}>
                                        <img
                                          key={`photo-${item.id}-${item.mediaUrl}`}
                                          src={item.mediaUrl || URL.createObjectURL(item.media)}
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
                                    onFileSelect={(file) => {
                                      updateMediaItem(item.id, 'media', file);
                                      // Clear errors when file is uploaded
                                      if (infographicsErrors[item.id]) {
                                        setInfographicsErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    itemId={item.id}
                                    onDelete={displayItems.length > 1 || savedInfographics.length > 0 ? () => removeMediaItem(item.id) : null}
                                  />
                                )}

                                <div className="media-item-fields">
                                  <InfographicsServiceDropdown
                                    itemId={item.id}
                                    selectedServices={item.services || []}
                                    onServicesChange={(services) => {
                                      updateMediaItem(item.id, 'services', services);
                                      // Clear errors when selection changes
                                      if (infographicsErrors[item.id]) {
                                        setInfographicsErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                  />
                                  <DescriptionInput
                                    value={item.description || ''}
                                    onChange={(newDescription) => {
                                      updateMediaItem(item.id, 'description', newDescription);
                                      // Clear errors when user finishes typing
                                      if (infographicsErrors[item.id]) {
                                        setInfographicsErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    maxLength={150}
                                  />
                                  <div className="flex items-center justify-end gap-3 mt-2">
                                    {infographicsErrors[item.id] && (
                                      <span className="text-xs text-red-500 flex items-center gap-0.5">
                                        <span className="text-red-500">*</span> Please fill out all sections
                                      </span>
                                    )}
                                    <button
                                      onClick={() => {
                                        // Validate this item
                                        const errors = {
                                          media: !item.media,
                                          services: !item.services || item.services.length === 0,
                                          description: !item.description || item.description.trim() === ''
                                        };

                                        if (errors.media || errors.services || errors.description) {
                                          setInfographicsErrors(prev => ({
                                            ...prev,
                                            [item.id]: errors
                                          }));
                                          return;
                                        }

                                        // Clear errors and save this item
                                        setInfographicsErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                        setSavedInfographics([...savedInfographics, item]);
                                        // Remove from edit section
                                        const remainingItems = (step.mediaItems || []).filter(i => i.id !== item.id);
                                        // Restore pending items if any
                                        if (pendingInfographicsItems.length > 0) {
                                          setAgentFlowSteps(agentFlowSteps.map(s =>
                                            s.id === step.id
                                              ? { ...s, mediaItems: [...remainingItems, ...pendingInfographicsItems] }
                                              : s
                                          ));
                                          setPendingInfographicsItems([]);
                                        } else {
                                          setAgentFlowSteps(agentFlowSteps.map(s =>
                                            s.id === step.id
                                              ? { ...s, mediaItems: remainingItems }
                                              : s
                                          ));
                                        }
                                      }}
                                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                                      type="button"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Infographic button */}
                        {(savedInfographics.length + (step.mediaItems || []).length) < 10 && (() => {
                          const currentMediaItems = step.mediaItems || [];
                          const hasEditForm = currentMediaItems.length > 0;
                          return (
                            <div className="mt-1">
                              <button
                                onClick={addMediaItem}
                                disabled={hasEditForm}
                                className={`flex items-center gap-2 transition-colors ${
                                  hasEditForm
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-blue-600 hover:text-blue-700'
                                }`}
                                type="button"
                                title={hasEditForm ? 'Save the current form before adding another' : 'Add Infographic'}
                              >
                                <Plus className="w-4 h-4" />
                                <span className="text-sm font-medium">Add Infographic</span>
                              </button>
                            </div>
                          );
                        })()}
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
                // Filter out pending items (hidden while editing saved items)
                const filteredMediaItems = mediaItems.filter(item =>
                  !pendingJobHighlightItems.some(pending => pending.id === item.id)
                );
                // Ensure at least one media item exists for display only when no saved items
                const displayItems = filteredMediaItems.length === 0 && savedJobHighlight.length === 0
                  ? [{ id: 'temp-job-highlight', media: null, mediaUrl: null, description: '', services: [] }]
                  : filteredMediaItems;

                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
                  // Limit to 10 items total (saved + editing)
                  if (savedJobHighlight.length + currentItems.length >= 10) return;
                  const newItem = { id: Date.now(), media: null, mediaUrl: null, description: '', services: [] };
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
                    const newItem = { id: Date.now(), media: null, mediaUrl: null, description: '', services: [] };
                    // If setting media, also create the blob URL
                    if (field === 'media' && value instanceof File) {
                      const blobUrl = URL.createObjectURL(value);
                      setAgentFlowSteps(agentFlowSteps.map(s =>
                        s.id === step.id
                          ? { ...s, mediaItems: [{ ...newItem, media: value, mediaUrl: blobUrl }] }
                          : s
                      ));
                    } else {
                      setAgentFlowSteps(agentFlowSteps.map(s =>
                        s.id === step.id
                          ? { ...s, mediaItems: [{ ...newItem, [field]: value }] }
                          : s
                      ));
                    }
                  } else {
                    // If setting media, also create the blob URL
                    if (field === 'media' && value instanceof File) {
                      const blobUrl = URL.createObjectURL(value);
                      setAgentFlowSteps(agentFlowSteps.map(s =>
                        s.id === step.id
                          ? {
                              ...s,
                              mediaItems: currentItems.map(item =>
                                item.id === itemId ? { ...item, media: value, mediaUrl: blobUrl } : item
                              )
                            }
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
                  }
                };

                const removeMediaItem = (itemId) => {
                  const currentItems = step.mediaItems || [];
                  // If there are saved items, allow removing all items completely
                  if (savedJobHighlight.length > 0) {
                    // Revoke blob URLs before removing
                    const itemToRemove = currentItems.find(item => item.id === itemId);
                    if (itemToRemove?.mediaUrl) {
                      URL.revokeObjectURL(itemToRemove.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: currentItems.filter(item => item.id !== itemId) }
                        : s
                    ));
                  } else if (currentItems.length <= 1) {
                    // If no saved items and it's the last item, clear the media instead of removing
                    const itemToReset = currentItems.find(item => item.id === itemId);
                    if (itemToReset?.mediaUrl) {
                      URL.revokeObjectURL(itemToReset.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? {
                            ...s,
                            mediaItems: currentItems.map(item =>
                              item.id === itemId ? { ...item, media: null, mediaUrl: null, description: '', services: [] } : item
                            )
                          }
                        : s
                    ));
                  } else {
                    // Multiple items, remove the item
                    const itemToRemove = currentItems.find(item => item.id === itemId);
                    if (itemToRemove?.mediaUrl) {
                      URL.revokeObjectURL(itemToRemove.mediaUrl);
                    }
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id
                        ? { ...s, mediaItems: currentItems.filter(item => item.id !== itemId) }
                        : s
                    ));
                  }
                };

                const clearMediaFromItem = (itemId) => {
                  const currentItems = step.mediaItems || [];
                  // Revoke blob URL before clearing
                  const itemToClear = currentItems.find(item => item.id === itemId);
                  if (itemToClear?.mediaUrl) {
                    URL.revokeObjectURL(itemToClear.mediaUrl);
                  }
                  // Clear media, mediaUrl, and description but keep the item
                  setAgentFlowSteps(agentFlowSteps.map(s =>
                    s.id === step.id
                      ? {
                          ...s,
                          mediaItems: currentItems.map(item =>
                            item.id === itemId ? { ...item, media: null, mediaUrl: null, description: '' } : item
                          )
                        }
                      : s
                  ));
                };

                const editSavedJobHighlight = (itemId) => {
                  const itemToEdit = savedJobHighlight.find(d => d.id === itemId);
                  if (itemToEdit) {
                    // Save any existing editable items to pending
                    const currentItems = step.mediaItems || [];
                    if (currentItems.length > 0) {
                      setPendingJobHighlightItems([...pendingJobHighlightItems, ...currentItems]);
                    }
                    // Remove from saved and add to edit
                    setSavedJobHighlight(savedJobHighlight.filter(d => d.id !== itemId));
                    setAgentFlowSteps(agentFlowSteps.map(s =>
                      s.id === step.id ? { ...s, mediaItems: [itemToEdit] } : s
                    ));
                  }
                };

                const deleteSavedJobHighlight = (itemId) => {
                  const itemToDelete = savedJobHighlight.find(d => d.id === itemId);
                  if (itemToDelete?.mediaUrl) {
                    URL.revokeObjectURL(itemToDelete.mediaUrl);
                  }
                  setSavedJobHighlight(savedJobHighlight.filter(d => d.id !== itemId));
                };

                // Title header for Job Highlight
                const JobHighlightTitle = () => (
                  <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenHookTooltip(openHookTooltip === 'job-highlight' ? null : 'job-highlight')}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                      {openHookTooltip === 'job-highlight' && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Showcase your best work by adding photos of exceptional jobs you want to highlight. (Upload JPG/PNG (≤5MB). Images auto-resized for fast delivery.)
                          </p>
                        </div>
                      )}
                    </div>
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

                // ServiceDropdown component for Job Highlight (multi-select)
                const JobHighlightServiceDropdown = ({ itemId, selectedServices = [], onServicesChange }) => {
                  const isOpen = openJobHighlightServicesDropdownId === itemId;
                  const [searchTerm, setSearchTerm] = useState('');

                  const filteredServices = allServices.filter(service =>
                    service.toLowerCase().includes(searchTerm.toLowerCase())
                  );

                  const handleListRef = (el) => {
                    if (el && jobHighlightDropdownScrollRef.current > 0) {
                      // Use requestAnimationFrame to ensure scroll happens after layout
                      requestAnimationFrame(() => {
                        el.scrollTop = jobHighlightDropdownScrollRef.current;
                      });
                    }
                  };

                  const toggleService = (service, e) => {
                    // Save scroll position from the list element
                    const listEl = e.target.closest('.service-dropdown-list');
                    if (listEl) {
                      jobHighlightDropdownScrollRef.current = listEl.scrollTop;
                    }
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
                        onClick={() => setOpenJobHighlightServicesDropdownId(isOpen ? null : itemId)}
                        className={`service-dropdown-button-inline ${isOpen ? 'service-dropdown-button-open' : ''}`}
                      >
                        <div className="service-dropdown-content">
                          {(selectedServices || []).length === 0 ? (
                            <span className="service-dropdown-placeholder">Select services</span>
                          ) : (
                            <div className="service-pills-inline">
                              {selectedServices.map((service) => (
                                <span key={service} className="service-pill-inline">
                                  {service}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeService(e, service);
                                    }}
                                    className="service-pill-remove-inline"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ChevronDown className={`service-dropdown-chevron ${isOpen ? 'service-dropdown-chevron-open' : ''}`} />
                      </button>

                      {isOpen && (
                        <>
                          <div
                            className="service-dropdown-overlay"
                            onClick={() => setOpenJobHighlightServicesDropdownId(null)}
                          />
                          <div className="service-dropdown-menu" onClick={(e) => e.stopPropagation()}>
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
                            <div className="service-dropdown-list" ref={handleListRef}>
                              {filteredServices.length > 0 ? (
                                filteredServices.map((service) => {
                                  const isSelected = (selectedServices || []).includes(service);
                                  return (
                                    <button
                                      key={service}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleService(service, e);
                                      }}
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
                    className="bg-slate-50 rounded-2xl p-5 h-full flex flex-col"
                  >
                    <JobHighlightTitle />

                    <div className="flex-1 section-spacing overflow-y-auto mb-4">
                        {/* Saved Job Highlight Section */}
                        {savedJobHighlight.length > 0 && (
                          <div className="mb-2">
                            <div className="space-y-3">
                              {savedJobHighlight.map((item) => (
                                <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 relative">
                                  <div className="absolute top-3 right-3 flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => editSavedJobHighlight(item.id)}
                                      className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                      title="Edit"
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteSavedJobHighlight(item.id)}
                                      className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="flex gap-4 pr-16">
                                    {item.media && item.media instanceof File && item.media.type.startsWith('image/') && (
                                      <div
                                        className="w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 relative group cursor-pointer"
                                        onClick={() => setExpandedPhotoId(item.id)}
                                      >
                                        <img
                                          src={item.mediaUrl || URL.createObjectURL(item.media)}
                                          alt="Job Highlight"
                                          className="w-full h-full object-contain"
                                        />
                                        {/* Expand overlay on hover */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Maximize className="w-6 h-6 text-white drop-shadow-lg" />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      {item.description && (
                                        <div className="mb-2">
                                          <span className="text-xs font-medium text-gray-700 mr-2">Description:</span>
                                          <span className="text-sm italic text-gray-600">{item.description}</span>
                                        </div>
                                      )}
                                      {item.services && item.services.length > 0 && (
                                        <div>
                                          <span className="text-xs font-medium text-gray-700 mr-2">Tags:</span>
                                          <div className="inline-flex flex-wrap gap-1">
                                            {item.services.map((service, idx) => (
                                              <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">{service}</span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Expanded Photo Modal */}
                                  {expandedPhotoId === item.id && (
                                    <div
                                      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                                      onClick={() => setExpandedPhotoId(null)}
                                    >
                                      <div className="relative max-w-4xl max-h-[90vh] w-full">
                                        <img
                                          src={item.mediaUrl || URL.createObjectURL(item.media)}
                                          alt="Job Highlight - Expanded"
                                          className="w-full h-full object-contain rounded-lg"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => setExpandedPhotoId(null)}
                                          className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                                        >
                                          <X className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Divider between saved and editable */}
                        {savedJobHighlight.length > 0 && (displayItems.length > 0 || savedJobHighlight.length < 10) && (
                          <div className="border-t border-slate-300 mt-1 mb-2"></div>
                        )}

                        {/* Editable Items Section */}
                        {(displayItems.length > 0 && ((step.mediaItems || []).length > 0 || savedJobHighlight.length === 0)) && (
                          <div className="media-items-container">
                            {displayItems.map((item, itemIndex) => (
                              <div key={item.id} className="media-item">
                                {item.media ? (
                                  <div className="media-preview">
                                    {item.media instanceof File && item.media.type.startsWith('image/') ? (
                                      <div className="media-preview-container" key={`photo-container-${item.id}-${item.mediaUrl}`}>
                                        <img
                                          key={`photo-${item.id}-${item.mediaUrl}`}
                                          src={item.mediaUrl || URL.createObjectURL(item.media)}
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
                                    onFileSelect={(file) => {
                                      updateMediaItem(item.id, 'media', file);
                                      // Clear errors when file is uploaded
                                      if (jobHighlightErrors[item.id]) {
                                        setJobHighlightErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    itemId={item.id}
                                    onDelete={displayItems.length > 1 || savedJobHighlight.length > 0 ? () => removeMediaItem(item.id) : null}
                                  />
                                )}

                                <div className="media-item-fields">
                                  <JobHighlightServiceDropdown
                                    itemId={item.id}
                                    selectedServices={item.services || []}
                                    onServicesChange={(services) => {
                                      updateMediaItem(item.id, 'services', services);
                                      // Clear errors when selection changes
                                      if (jobHighlightErrors[item.id]) {
                                        setJobHighlightErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                  />
                                  <DescriptionInput
                                    value={item.description || ''}
                                    onChange={(newDescription) => {
                                      updateMediaItem(item.id, 'description', newDescription);
                                      // Clear errors when user finishes typing
                                      if (jobHighlightErrors[item.id]) {
                                        setJobHighlightErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    maxLength={150}
                                  />
                                  <div className="flex items-center justify-end gap-3 mt-2">
                                    {jobHighlightErrors[item.id] && (
                                      <span className="text-xs text-red-500 flex items-center gap-0.5">
                                        <span className="text-red-500">*</span> Please fill out all sections
                                      </span>
                                    )}
                                    <button
                                      onClick={() => {
                                        // Validate this item
                                        const errors = {
                                          media: !item.media,
                                          services: !item.services || item.services.length === 0,
                                          description: !item.description || item.description.trim() === ''
                                        };

                                        if (errors.media || errors.services || errors.description) {
                                          setJobHighlightErrors(prev => ({
                                            ...prev,
                                            [item.id]: errors
                                          }));
                                          return;
                                        }

                                        // Clear errors and save this item
                                        setJobHighlightErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors[item.id];
                                          return newErrors;
                                        });
                                        setSavedJobHighlight([...savedJobHighlight, item]);
                                        // Remove from edit section
                                        const remainingItems = (step.mediaItems || []).filter(i => i.id !== item.id);
                                        // Restore pending items if any
                                        if (pendingJobHighlightItems.length > 0) {
                                          setAgentFlowSteps(agentFlowSteps.map(s =>
                                            s.id === step.id
                                              ? { ...s, mediaItems: [...remainingItems, ...pendingJobHighlightItems] }
                                              : s
                                          ));
                                          setPendingJobHighlightItems([]);
                                        } else {
                                          setAgentFlowSteps(agentFlowSteps.map(s =>
                                            s.id === step.id
                                              ? { ...s, mediaItems: remainingItems }
                                              : s
                                          ));
                                        }
                                      }}
                                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                                      type="button"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Photo button */}
                        {(savedJobHighlight.length + (step.mediaItems || []).length) < 10 && (() => {
                          const currentMediaItems = step.mediaItems || [];
                          const hasEditForm = currentMediaItems.length > 0;
                          return (
                            <div className="mt-1">
                              <button
                                onClick={addMediaItem}
                                disabled={hasEditForm}
                                className={`flex items-center gap-2 transition-colors ${
                                  hasEditForm
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-blue-600 hover:text-blue-700'
                                }`}
                                type="button"
                                title={hasEditForm ? 'Save the current form before adding another' : 'Add Photo'}
                              >
                                <Plus className="w-4 h-4" />
                                <span className="text-sm font-medium">Add Photo</span>
                              </button>
                            </div>
                          );
                        })()}
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
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenHookTooltip(openHookTooltip === 'company-slogan' ? null : 'company-slogan')}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                      {openHookTooltip === 'company-slogan' && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            A memorable slogan helps customers remember your brand and what you stand for.
                          </p>
                        </div>
                      )}
                    </div>
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
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenHookTooltip(openHookTooltip === 'experience' ? null : 'experience')}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                      {openHookTooltip === 'experience' && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Highlight your experience to build credibility. Share how long you've been in business and the number of jobs you've completed.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-5">
                    {(savedBrandIdentity?.experienceYears || savedBrandIdentity?.jobsCompleted) && !editingBrandIdentity ? (
                      <div className="flex gap-4">
                        {savedBrandIdentity.experienceYears && (
                          <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200">
                            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 mb-1">
                              <Calendar className="w-3.5 h-3.5" />
                              Years in Business
                            </label>
                            <p className="text-2xl font-bold text-gray-700">{savedBrandIdentity.experienceYears}</p>
                          </div>
                        )}
                        {savedBrandIdentity.jobsCompleted && (
                          <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200">
                            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 mb-1">
                              <Briefcase className="w-3.5 h-3.5" />
                              Jobs Completed
                            </label>
                            <p className="text-2xl font-bold text-gray-700">{savedBrandIdentity.jobsCompleted}</p>
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
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenHookTooltip(openHookTooltip === 'company-qualities' ? null : 'company-qualities')}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                      {openHookTooltip === 'company-qualities' && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Select the qualities that best describe what sets your company apart from competitors.
                          </p>
                        </div>
                      )}
                    </div>
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
                                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                    isSelected
                                      ? 'bg-blue-100 text-blue-700'
                                      : isDisabled
                                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                      : 'bg-gray-100 text-gray-600'
                                  } focus:outline-none`}
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
                  <h3 className="text-2xl font-bold text-gray-900 flex-1">Promotions</h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'promotions' ? null : 'promotions')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'promotions' && (
                      <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                        <p className="text-sm text-gray-600">
                          Create promotions in the Pricing Tool tab, then enable them here to share with leads interested in relevant services.
                        </p>
                      </div>
                    )}
                  </div>
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
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenHookTooltip(openHookTooltip === 'customer-reviews' ? null : 'customer-reviews')}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {openHookTooltip === 'customer-reviews' && (
                      <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                        <p className="text-sm text-gray-600">
                          Add testimonials from satisfied customers to build trust and credibility with potential clients.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(100vh - 400px)' }}>
                  {/* Saved Customer Reviews - Always visible when there are saved reviews */}
                  {savedCustomerReviews.length > 0 && (
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
                          <div className="pr-20 space-y-2">
                            <p className="text-sm italic text-gray-600">"{review.reviewText}"</p>
                            <div className="flex items-center flex-wrap gap-1">
                              <span className="text-sm text-gray-500">—</span>
                              <span className="text-sm font-semibold text-gray-900 ml-1">{review.customerName || 'Anonymous'}</span>
                              {(review.services || []).length > 0 && (
                                <div className="flex flex-wrap gap-1 ml-2">
                                  {review.services.map((service) => (
                                    <span key={service} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{service}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Divider between saved and editable */}
                  {savedCustomerReviews.length > 0 && (companyInfo.customerReviewsList || []).length > 0 && (
                    <div className="border-t border-slate-300 my-2"></div>
                  )}

                  {/* Editable Customer Reviews - show when there are editable reviews OR no saved reviews */}
                  {((companyInfo.customerReviewsList || []).length > 0 || savedCustomerReviews.length === 0) && (() => {
                    // Create display items - show blank form if both saved and editable are empty
                    const editableReviews = companyInfo.customerReviewsList || [];
                    const displayReviews = editableReviews.length === 0 && savedCustomerReviews.length === 0
                      ? [{ id: 'temp-customer-review', customerName: '', services: [], reviewText: '' }]
                      : editableReviews;

                    // Build services list from props - same as Job Demos
                    const allServices = [
                      ...softWashingServices,
                      ...customSoftWashingServices,
                      ...pressureWashingServices,
                      ...customPressureWashingServices,
                      ...specialtyCleaningServices,
                      ...customSpecialtyCleaningServices
                    ].sort((a, b) => a.localeCompare(b));

                    // CustomerReviewServiceDropdown component (multi-select)
                    const CustomerReviewServiceDropdown = ({ itemId, selectedServices = [], onServicesChange }) => {
                      const isOpen = openCustomerReviewServicesDropdownId === itemId;
                      const [searchTerm, setSearchTerm] = useState('');

                      const filteredServices = allServices.filter(service =>
                        service.toLowerCase().includes(searchTerm.toLowerCase())
                      );

                      const handleListRef = (el) => {
                        if (el && customerReviewDropdownScrollRef.current > 0) {
                          requestAnimationFrame(() => {
                            el.scrollTop = customerReviewDropdownScrollRef.current;
                          });
                        }
                      };

                      const toggleService = (service, e) => {
                        const listEl = e.target.closest('.service-dropdown-list');
                        if (listEl) {
                          customerReviewDropdownScrollRef.current = listEl.scrollTop;
                        }
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
                            onClick={() => setOpenCustomerReviewServicesDropdownId(isOpen ? null : itemId)}
                            className={`review-dropdown-button ${isOpen ? 'review-dropdown-button-open' : ''}`}
                          >
                            <div className="service-dropdown-content">
                              {(selectedServices || []).length === 0 ? (
                                <span className="service-dropdown-placeholder">Select services</span>
                              ) : (
                                <div className="service-pills-inline">
                                  {selectedServices.map((service) => (
                                    <span key={service} className="service-pill-inline">
                                      {service}
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeService(e, service);
                                        }}
                                        className="service-pill-remove-inline"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <ChevronDown className={`service-dropdown-chevron ${isOpen ? 'service-dropdown-chevron-open' : ''}`} />
                          </button>

                          {isOpen && (
                            <>
                              <div
                                className="service-dropdown-overlay"
                                onClick={() => setOpenCustomerReviewServicesDropdownId(null)}
                              />
                              <div className="service-dropdown-menu" onClick={(e) => e.stopPropagation()}>
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
                                <div className="service-dropdown-list" ref={handleListRef}>
                                  {filteredServices.length > 0 ? (
                                    filteredServices.map((service) => {
                                      const isSelected = (selectedServices || []).includes(service);
                                      return (
                                        <button
                                          key={service}
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleService(service, e);
                                          }}
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
                                    <div className="service-dropdown-empty">No services found</div>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    };

                    return (
                    <div className="space-y-4">
                      {displayReviews.map((review, index) => {
                        return (
                          <div key={review.id} className="bg-white rounded-xl p-4 border border-slate-200 relative">
                            {/* Show delete button only if there are saved reviews OR multiple editable reviews */}
                            {(savedCustomerReviews.length > 0 || displayReviews.length > 1) && (
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
                                    const currentList = companyInfo.customerReviewsList || [];
                                    // Handle temp item - create a new real item
                                    if (review.id.toString().startsWith('temp-')) {
                                      updateCompanyInfo('customerReviewsList', [
                                        { id: Date.now() + Math.random(), customerName: e.target.value, services: [], reviewText: '' }
                                      ]);
                                    } else {
                                      const updated = currentList.map(r =>
                                        r.id === review.id ? { ...r, customerName: e.target.value } : r
                                      );
                                      updateCompanyInfo('customerReviewsList', updated);
                                    }
                                  }}
                                  placeholder="e.g., John D."
                                  className="review-input"
                                />
                              </div>

                              {/* Service Dropdown - Multi-select */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Services (optional)</label>
                                <CustomerReviewServiceDropdown
                                  itemId={review.id}
                                  selectedServices={review.services || []}
                                  onServicesChange={(newServices) => {
                                    const currentList = companyInfo.customerReviewsList || [];
                                    // Handle temp item - create a new real item
                                    if (review.id.toString().startsWith('temp-')) {
                                      const newId = Date.now() + Math.random();
                                      updateCompanyInfo('customerReviewsList', [
                                        { id: newId, customerName: '', services: newServices, reviewText: '' }
                                      ]);
                                      // Keep dropdown open with new ID
                                      setOpenCustomerReviewServicesDropdownId(newId);
                                    } else {
                                      const updated = currentList.map(r =>
                                        r.id === review.id ? { ...r, services: newServices } : r
                                      );
                                      updateCompanyInfo('customerReviewsList', updated);
                                    }
                                  }}
                                />
                              </div>

                              {/* Review Text */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Review</label>
                                <textarea
                                  value={review.reviewText || ''}
                                  onChange={(e) => {
                                    const currentList = companyInfo.customerReviewsList || [];
                                    // Handle temp item - create a new real item
                                    if (review.id.toString().startsWith('temp-')) {
                                      updateCompanyInfo('customerReviewsList', [
                                        { id: Date.now() + Math.random(), customerName: '', services: [], reviewText: e.target.value }
                                      ]);
                                    } else {
                                      const updated = currentList.map(r =>
                                        r.id === review.id ? { ...r, reviewText: e.target.value } : r
                                      );
                                      updateCompanyInfo('customerReviewsList', updated);
                                    }
                                  }}
                                  rows={3}
                                  placeholder="Enter a customer review..."
                                  className="review-textarea"
                                />
                              </div>

                              {/* Save Button */}
                              <div className="flex justify-end pt-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    // Validate - need at least customer name and review text
                                    if (!review.customerName || !review.customerName.trim() || !review.reviewText || !review.reviewText.trim()) {
                                      return;
                                    }
                                    // Save to savedCustomerReviews
                                    setSavedCustomerReviews([...savedCustomerReviews, review]);
                                    // Remove from editable list
                                    const updated = (companyInfo.customerReviewsList || []).filter(r => r.id !== review.id);
                                    updateCompanyInfo('customerReviewsList', updated);
                                  }}
                                  className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Add Review button - shown when total reviews < 10 */}
                      {(savedCustomerReviews.length + (companyInfo.customerReviewsList || []).length) < 10 && (() => {
                        // Button should be grayed out if there are editable forms OR if temp form is showing (no saved reviews)
                        const hasUnsavedForms = (companyInfo.customerReviewsList || []).length > 0 || savedCustomerReviews.length === 0;
                        return (
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                updateCompanyInfo('customerReviewsList', [
                                  ...(companyInfo.customerReviewsList || []),
                                  { id: Date.now() + Math.random(), customerName: '', services: [], reviewText: '' }
                                ]);
                              }}
                              disabled={hasUnsavedForms}
                              className={`flex items-center gap-2 transition-colors ${
                                hasUnsavedForms
                                  ? 'text-gray-400 cursor-not-allowed'
                                  : 'text-blue-600 hover:text-blue-700'
                              }`}
                              title={hasUnsavedForms ? 'Save the current form before adding another' : 'Add Review'}
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">Add Review</span>
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                    );
                  })()}

                  {/* Divider and Add Review button - only shown when there's at least one saved review and no editable ones */}
                  {savedCustomerReviews.length > 0 && (companyInfo.customerReviewsList || []).length === 0 && savedCustomerReviews.length < 10 && (
                    <>
                      <div className="border-t border-slate-300 mt-4"></div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            updateCompanyInfo('customerReviewsList', [
                              { id: Date.now() + Math.random(), customerName: '', services: [], reviewText: '' }
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
              </div>
            )}

            {/* Online Reviews Content */}
            {selectedSalesFlowHook === 'Online Reviews' && (() => {
              const allPlatforms = [
                { key: 'google', label: 'Google' },
                { key: 'facebook', label: 'Facebook' },
                { key: 'nextdoor', label: 'Nextdoor' },
                { key: 'yelp', label: 'Yelp' },
                { key: 'homeadvisor', label: 'HomeAdvisor' },
                { key: 'bbb', label: 'BBB' },
                { key: 'angi', label: 'Angi' },
                { key: 'thumbtack', label: 'Thumbtack' }
              ];

              // Get list of platforms already saved
              const savedPlatformKeys = Object.keys(savedOnlineReviews || {}).filter(key => {
                const review = savedOnlineReviews[key];
                return review && (review.averageRating || review.totalReviews || review.fiveStarReviews);
              });

              // Get list of platforms being edited
              const editingPlatformKeys = (companyInfo.onlineReviewsList || []).map(r => r.platform).filter(Boolean);

              // Available platforms for new rows (exclude saved and currently editing)
              const availablePlatforms = allPlatforms.filter(p =>
                !savedPlatformKeys.includes(p.key) && !editingPlatformKeys.includes(p.key)
              );

              const addNewReviewRow = () => {
                const currentList = companyInfo.onlineReviewsList || [];
                if (currentList.length + savedPlatformKeys.length >= allPlatforms.length) return;
                const newRow = {
                  id: Date.now(),
                  platform: '',
                  averageRating: '',
                  totalReviews: '',
                  fiveStarReviews: ''
                };
                updateCompanyInfo('onlineReviewsList', [...currentList, newRow]);
              };

              const updateReviewRow = (id, field, value) => {
                const updated = (companyInfo.onlineReviewsList || []).map(r =>
                  r.id === id ? { ...r, [field]: value } : r
                );
                updateCompanyInfo('onlineReviewsList', updated);
              };

              const deleteReviewRow = (id) => {
                const updated = (companyInfo.onlineReviewsList || []).filter(r => r.id !== id);
                updateCompanyInfo('onlineReviewsList', updated);
              };

              const saveReviewRow = (row) => {
                // Validate - need platform and at least one value
                if (!row.platform || (!row.averageRating && !row.totalReviews && !row.fiveStarReviews)) {
                  return;
                }

                // Add to saved
                const newSaved = { ...savedOnlineReviews };
                newSaved[row.platform] = {
                  averageRating: row.averageRating,
                  totalReviews: row.totalReviews,
                  fiveStarReviews: row.fiveStarReviews
                };
                setSavedOnlineReviews(newSaved);

                // Remove from editing list
                const remaining = (companyInfo.onlineReviewsList || []).filter(r => r.id !== row.id);
                updateCompanyInfo('onlineReviewsList', remaining);
              };

              const editSavedReview = (platformKey) => {
                const review = savedOnlineReviews[platformKey];
                if (!review) return;
                // Remove from saved
                const newSaved = { ...savedOnlineReviews };
                delete newSaved[platformKey];
                setSavedOnlineReviews(newSaved);
                // Add to editing list
                const newRow = {
                  id: Date.now(),
                  platform: platformKey,
                  averageRating: review.averageRating || '',
                  totalReviews: review.totalReviews || '',
                  fiveStarReviews: review.fiveStarReviews || ''
                };
                updateCompanyInfo('onlineReviewsList', [...(companyInfo.onlineReviewsList || []), newRow]);
              };

              const deleteSavedReview = (platformKey) => {
                const newSaved = { ...savedOnlineReviews };
                delete newSaved[platformKey];
                setSavedOnlineReviews(newSaved);
              };

              return (
                <div className="bg-slate-50 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex-1">Online Reviews</h3>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenHookTooltip(openHookTooltip === 'online-reviews' ? null : 'online-reviews')}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                      {openHookTooltip === 'online-reviews' && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-slate-100 rounded-lg p-4 shadow-lg z-50 border border-slate-200">
                          <p className="text-sm text-gray-600">
                            Add your ratings and review counts from popular platforms to highlight your online reputation.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {/* Saved Reviews - Display Mode */}
                    {savedPlatformKeys.length > 0 && (
                      <div className="space-y-3">
                        {savedPlatformKeys.map((platformKey) => {
                          const platform = allPlatforms.find(p => p.key === platformKey);
                          const review = savedOnlineReviews[platformKey];
                          if (!platform || !review) return null;
                          return (
                            <div key={platformKey} className="p-4 bg-white rounded-xl border border-slate-200 relative">
                              <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => editSavedReview(platformKey)}
                                  className="group p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteSavedReview(platformKey)}
                                  className="group p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="pr-20">
                                <p className="text-base font-semibold text-gray-900 mb-3">{platform.label}</p>
                                <div className="flex items-center gap-4">
                                  {review.averageRating && (
                                    <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-lg">
                                      <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="text-lg font-bold text-gray-500">{review.averageRating}</span>
                                      </div>
                                      <span className="text-xs text-gray-500">avg rating</span>
                                    </div>
                                  )}
                                  {review.totalReviews && (
                                    <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-lg">
                                      <span className="text-lg font-bold text-gray-500">{review.totalReviews}</span>
                                      <span className="text-xs text-gray-500">total reviews</span>
                                    </div>
                                  )}
                                  {review.fiveStarReviews && (
                                    <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-lg">
                                      <span className="text-lg font-bold text-gray-500">{review.fiveStarReviews}</span>
                                      <span className="text-xs text-gray-500">5-star reviews</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Divider between saved and editable */}
                    {savedPlatformKeys.length > 0 && ((companyInfo.onlineReviewsList || []).length > 0 || savedPlatformKeys.length < allPlatforms.length) && (
                      <div className="border-t border-slate-300 my-4"></div>
                    )}

                    {/* Editable Rows - show blank form by default when no saved reviews */}
                    {(() => {
                      const editableRows = companyInfo.onlineReviewsList || [];
                      // Show at least one blank form if no saved items and no editing items
                      const displayRows = editableRows.length === 0 && savedPlatformKeys.length === 0
                        ? [{ id: 'temp-' + Date.now(), platform: '', averageRating: '', totalReviews: '', fiveStarReviews: '' }]
                        : editableRows;

                      if (displayRows.length === 0) return null;

                      return (
                        <div className="space-y-3">
                          {displayRows.map((row) => {
                            // Get available platforms for this row (include current selection)
                            const rowAvailablePlatforms = allPlatforms.filter(p =>
                              !savedPlatformKeys.includes(p.key) &&
                              (!editingPlatformKeys.includes(p.key) || p.key === row.platform)
                            );

                            const isTemp = row.id.toString().startsWith('temp-');

                            return (
                              <div key={row.id} className="bg-white rounded-xl p-4 border border-slate-200 relative">
                                {!isTemp && (
                                  <button
                                    type="button"
                                    onClick={() => deleteReviewRow(row.id)}
                                    className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                <div className={`space-y-3 ${!isTemp ? 'pr-8' : ''}`}>
                                  {/* Platform Dropdown */}
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Platform</label>
                                    <select
                                      value={row.platform || ''}
                                      onChange={(e) => {
                                        if (isTemp) {
                                          // Convert temp to real row
                                          const newRow = {
                                            id: Date.now(),
                                            platform: e.target.value,
                                            averageRating: '',
                                            totalReviews: '',
                                            fiveStarReviews: ''
                                          };
                                          updateCompanyInfo('onlineReviewsList', [newRow]);
                                        } else {
                                          updateReviewRow(row.id, 'platform', e.target.value);
                                        }
                                      }}
                                      className="review-select"
                                    >
                                      <option value="">Select platform...</option>
                                      {rowAvailablePlatforms.map((p) => (
                                        <option key={p.key} value={p.key}>{p.label}</option>
                                      ))}
                                    </select>
                                  </div>

                                  {/* Rating and Review Inputs */}
                                  <div className="grid grid-cols-3 gap-3">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">Avg Rating</label>
                                      <div className="relative">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                          type="number"
                                          min="0"
                                          max="5"
                                          step="0.01"
                                          value={row.averageRating || ''}
                                          onChange={(e) => {
                                            let value = e.target.value;
                                            if (value !== '') {
                                              const numValue = parseFloat(value);
                                              if (!isNaN(numValue)) {
                                                if (numValue > 5) value = '5.00';
                                                else if (numValue < 0) value = '0';
                                              }
                                            }
                                            if (isTemp) {
                                              const newRow = { ...row, id: Date.now(), averageRating: value };
                                              updateCompanyInfo('onlineReviewsList', [newRow]);
                                            } else {
                                              updateReviewRow(row.id, 'averageRating', value);
                                            }
                                          }}
                                          placeholder="0.0"
                                          className="review-input-with-icon"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">Total Reviews</label>
                                      <input
                                        type="number"
                                        min="0"
                                        max="10000"
                                        value={row.totalReviews || ''}
                                        onChange={(e) => {
                                          let value = e.target.value;
                                          if (value !== '' && parseInt(value) > 10000) value = '10000';
                                          if (isTemp) {
                                            const newRow = { ...row, id: Date.now(), totalReviews: value };
                                            updateCompanyInfo('onlineReviewsList', [newRow]);
                                          } else {
                                            updateReviewRow(row.id, 'totalReviews', value);
                                          }
                                        }}
                                        placeholder="0"
                                        className="review-input"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-xs font-medium text-gray-700 mb-1">5-Star Reviews</label>
                                      <input
                                        type="number"
                                        min="0"
                                        max="10000"
                                        value={row.fiveStarReviews || ''}
                                        onChange={(e) => {
                                          let value = e.target.value;
                                          if (value !== '' && parseInt(value) > 10000) value = '10000';
                                          if (isTemp) {
                                            const newRow = { ...row, id: Date.now(), fiveStarReviews: value };
                                            updateCompanyInfo('onlineReviewsList', [newRow]);
                                          } else {
                                            updateReviewRow(row.id, 'fiveStarReviews', value);
                                          }
                                        }}
                                        placeholder="0"
                                        className="review-input"
                                      />
                                    </div>
                                  </div>

                                  {/* Save Button */}
                                  <div className="flex justify-end pt-3">
                                    <button
                                      type="button"
                                      onClick={() => saveReviewRow(row)}
                                      className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                                    >
                                      Save
                                    </button>
                                  </div>

                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}

                    {/* Add Platform Button - below review forms */}
                    {availablePlatforms.length > 0 && (() => {
                      // Button is grayed out if there are any unsaved forms (including the temp form shown when no saved reviews)
                      const hasUnsavedForms = (companyInfo.onlineReviewsList || []).length > 0 || savedPlatformKeys.length === 0;
                      return (
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={addNewReviewRow}
                            disabled={hasUnsavedForms}
                            className={`flex items-center gap-2 transition-colors ${
                              hasUnsavedForms
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-blue-600 hover:text-blue-700'
                            }`}
                            title={hasUnsavedForms ? 'Save the current form before adding another' : 'Add Platform'}
                          >
                            <Plus className="w-4 h-4" />
                            <span className="text-sm font-medium">Add Platform</span>
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })()}
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