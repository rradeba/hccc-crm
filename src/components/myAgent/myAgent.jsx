import React, { useState } from 'react';
import { Settings, Check, Building2, Phone, Upload, Trash2, Plus, ChevronDown, X, ArrowRight, Star, MessageSquare, Mail, AlertCircle } from 'lucide-react';
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
  updateCompanyInfo
}) => {
  // State for selected business account tab
  const [selectedAccountTab, setSelectedAccountTab] = useState('sms');
  
  // State for selected sales flow stage
  const [selectedSalesFlowStage, setSelectedSalesFlowStage] = useState('Contact Lead');
  
  // State for selected sales flow hook (tabs)
  const [selectedSalesFlowHook, setSelectedSalesFlowHook] = useState('Personal Greeting');
  
  // State for forward calls and texts toggle
  const [forwardToPersonalPhone, setForwardToPersonalPhone] = useState(false);
  
  // State for OAuth modals
  const [showFacebookOAuthModal, setShowFacebookOAuthModal] = useState(false);
  const [showInstagramOAuthModal, setShowInstagramOAuthModal] = useState(false);
  const [showTikTokOAuthModal, setShowTikTokOAuthModal] = useState(false);
  const [showGmailOAuthModal, setShowGmailOAuthModal] = useState(false);
  const [showOutlookOAuthModal, setShowOutlookOAuthModal] = useState(false);
  

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
          <div className="w-1/5 flex flex-col">
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
              <span className="text-sm font-medium text-gray-700 truncate">SMS & Call</span>
              {connectedAccounts.sms && (
                <Check className="w-4 h-4 text-green-600 ml-auto flex-shrink-0" strokeWidth={3} />
              )}
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
              <span className="text-sm font-medium text-gray-700 truncate">Email</span>
              {connectedAccounts.email && (
                <Check className="w-4 h-4 text-green-600 ml-auto flex-shrink-0" strokeWidth={3} />
              )}
            </button>

            {/* Website Tab */}
            <button
              type="button"
              onClick={() => setSelectedAccountTab('website')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all active:bg-slate-200 ${
                selectedAccountTab === 'website' 
                  ? 'bg-slate-100 shadow-sm' 
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 truncate">Website</span>
              {connectedAccounts.website && (
                <Check className="w-4 h-4 text-green-600 ml-auto flex-shrink-0" strokeWidth={3} />
              )}
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
              <span className="text-sm font-medium text-gray-700 truncate">Facebook</span>
              {connectedAccounts.facebook && (
                <Check className="w-4 h-4 text-green-600 ml-auto flex-shrink-0" strokeWidth={3} />
              )}
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
              <span className="text-sm font-medium text-gray-700 truncate">Instagram</span>
              {connectedAccounts.instagram && (
                <Check className="w-4 h-4 text-green-600 ml-auto flex-shrink-0" strokeWidth={3} />
              )}
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
              <span className="text-sm font-medium text-gray-700 truncate">TikTok</span>
              {connectedAccounts.tiktok && (
                <Check className="w-4 h-4 text-green-600 ml-auto flex-shrink-0" strokeWidth={3} />
              )}
            </button>
          </div>

          {/* Right Column - Content (80%) */}
          <div className="flex-1 bg-white border-2 border-slate-200 rounded-2xl p-6 min-h-[400px] relative">
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
                    className="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-3"
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
                    className="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-3"
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
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-2xl font-mono font-semibold text-gray-700">(555) 123-4567</p>
                  </div>
                </div>

                {/* Forward to Personal Phone Toggle */}
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Forward Calls & Texts to Personal Phone</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => companyInfo.phone && setForwardToPersonalPhone(!forwardToPersonalPhone)}
                      disabled={!companyInfo.phone}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        !companyInfo.phone 
                          ? 'bg-gray-200 cursor-not-allowed opacity-50' 
                          : forwardToPersonalPhone 
                            ? 'bg-blue-600' 
                            : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          forwardToPersonalPhone ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Personal Phone Number Display or Error */}
                  <div className="mb-3">
                    {companyInfo.phone ? (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Business Phone:</span>
                          <span className="text-lg font-mono font-semibold text-gray-700">{companyInfo.phone}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="text-xs text-red-600 font-medium">No business phone number found</span>
                      </div>
                    )}
                  </div>

                  {/* Note about Contact Details */}
                  <p className="text-sm text-gray-500 italic">
                    Business phone number is listed in Contact Details section of My Business tab
                  </p>
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
        <div className="flex gap-4">
          {/* Left Column - Tabs (20%) */}
          <div className="w-1/5 flex flex-col">
            {['Contact Lead', 'Send Estimate', 'Send Contract', 'Complete Job', 'Send Invoice', 'Job Followup'].map((stage, index) => {
              const colors = [
                'bg-blue-600',      // Contact Lead
                'bg-purple-600',    // Send Estimate
                'bg-cyan-600',      // Send Contract
                'bg-green-600',     // Complete Job
                'bg-amber-600',     // Send Invoice
                'bg-pink-600'       // Job Followup
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
                  <span className="text-sm font-medium text-gray-700 truncate text-left flex-1">{stage}</span>
                </button>
              );
            })}
          </div>

          {/* Right Column - Content (80%) */}
          <div className="flex-1 bg-white border-2 border-slate-200 rounded-2xl p-6 min-h-[400px]">
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <p className="text-sm">Content for {selectedSalesFlowStage} will appear here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sales Flowchart */}
      {/* Sales Flow Hooks Section */}
      <div className="sales-flow-section">
        <div className="sales-flow-title">
          <h3 className="sales-flow-title-text">Sales Flow Hooks</h3>
        </div>

        <div className="flex gap-4">
          {/* Left Column - Tabs (20%) */}
          <div className="w-1/5 flex flex-col gap-0">
            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Personal Greeting')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Personal Greeting' 
                  ? 'bg-slate-100 shadow-sm' 
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-5 h-5 text-slate-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 truncate flex-1">Personal Greeting</span>
            </button>
            
            <button
              type="button"
              onClick={() => setSelectedSalesFlowHook('Add Job Demos')}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all text-left active:bg-slate-200 ${
                selectedSalesFlowHook === 'Add Job Demos' 
                  ? 'bg-slate-100 shadow-sm' 
                  : 'bg-white hover:bg-slate-100'
              }`}
            >
              <Star className="w-5 h-5 text-slate-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 truncate flex-1">Add Job Demos</span>
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
              <ArrowRight className="w-5 h-5 text-slate-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 truncate flex-1">Before & After</span>
            </button>
          </div>

          {/* Right Column - Content (80%) */}
          <div className="flex-1">
            <div className="section-spacing">
          {agentFlowSteps
            .sort((a, b) => a.order - b.order)
            .map((step, index) => {
              const isEditing = editingStepId === step.id;
              const isPersonalGreeting = step.id === 1;
              const isSalesPitchHooks = step.id === 2;
              const isBeforeAfter = step.id === 4;
              
              // Only show step id 1, 2, or 4 in this section
              if (!isPersonalGreeting && !isSalesPitchHooks && !isBeforeAfter) {
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
                  <div 
                    key={step.id} 
                    className="bg-white border-2 border-slate-200 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-slate-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                    </div>
                    
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
                        
                      {/* Save Button */}
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={handleSavePersonalGreeting}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          type="button"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              
              // Special handling for Job Demos (Add Job Demos)
              if (isSalesPitchHooks && selectedSalesFlowHook === 'Add Job Demos') {
                const step = agentFlowSteps.find(s => s.id === 2);
                if (!step) return null;
                let mediaItems = step.mediaItems || [];
                // Ensure at least one media item exists for display
                const displayItems = mediaItems.length === 0 
                  ? [{ id: 'temp-' + Date.now(), media: null, description: '', service: '', beforeAfter: '' }]
                  : mediaItems;
                
                const addMediaItem = () => {
                  const currentItems = step.mediaItems || [];
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
                    className="bg-white border-2 border-slate-200 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-slate-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                    </div>
                    
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
                        
                      {/* Save Button */}
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={handleSaveSalesPitchHooks}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          type="button"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              
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
                  // Save the media items data
                  console.log('Saving Before & After:', currentItems);
                  // Here you can add API call to save the data
                  // For now, we'll just show an alert
                  alert('Before & After saved successfully!');
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
                    className="bg-white border-2 border-slate-200 rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-slate-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 flex-1">{step.name}</h3>
                    </div>
                    
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
                        
                      {/* Save Button */}
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={handleSaveBeforeAfter}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                          type="button"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={step.id} className="step-container">
                  <div className={`step-box ${!isPersonalGreeting && !isSalesPitchHooks && !isBeforeAfter ? 'step-box-editable' : ''}`}>
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
            </div>
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