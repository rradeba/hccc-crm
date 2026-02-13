import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, ChevronDown, FileText, FileSignature, Receipt, HeartHandshake, Check, Pause, X, Mail, ArrowUp, Phone, Image, Video, MessageSquare, Star, ArrowRight, Briefcase, User, Globe } from 'lucide-react';
import './leads.css';

// SourceBadge component (same as in customerDirectory)
const SourceBadge = ({ source }) => {
  const normalized = String(source || '').toLowerCase();

  if (normalized.includes('facebook')) {
    return (
      <div className="source-badge">
        <svg viewBox="0 0 24 24" className="source-badge-icon">
          <path
            fill="#1877F2"
            d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H8.03v-2.91h2.41V9.41c0-2.4 1.43-3.72 3.62-3.72 1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.2 0-1.57.75-1.57 1.53v1.84h2.67l-.43 2.91h-2.24v7.03C18.34 21.19 22 17.05 22 12.06z"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes('instagram')) {
    return (
      <div className="source-badge">
        <svg viewBox="0 0 24 24" className="source-badge-icon">
          <defs>
            <linearGradient id="igGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="50%" stopColor="#DD2A7B" />
              <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#igGradient)"
            d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.505 4.505 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.503 2.503 0 0 1 12 9.5zm4.75-2.62a1.12 1.12 0 1 0 1.12 1.12 1.12 1.12 0 0 0-1.12-1.12z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="source-badge-large">
      <svg viewBox="0 0 24 24" className="source-badge-icon-small">
        <path
          fill="#10B981"
          d="M12 3C6.486 3 2 6.944 2 11.5c0 2.28 1.107 4.351 2.934 5.931-.139.955-.566 2.158-1.542 3.088a1 1 0 0 0 1.12 1.63c2.273-.935 3.74-2.364 4.552-3.41A11.8 11.8 0 0 0 12 20c5.514 0 10-3.944 10-8.5S17.514 3 12 3z"
        />
        <circle cx="8" cy="12" r="1.15" fill="#fff" />
        <circle cx="12" cy="12" r="1.15" fill="#fff" />
        <circle cx="16" cy="12" r="1.15" fill="#fff" />
      </svg>
    </div>
  );
};

const Leads = ({ 
  uncontactedLeads,
  readyJobs,
  inProgress,
  stopped,
  rejected,
  searchTerm,
  setSearchTerm,
  expandedLeads,
  toggleLeadExpansion,
  expandedChatPanels,
  chatMediumByLead,
  setChatMediumByLead,
  toggleChatPanelSize,
  toggleChatPanel,
  getLeadActionButton,
  mapServiceLabel,
  formatAddressLines,
  handleEstimateClick,
  handleServiceFileClick,
  openModal
}) => {
  // State to track which call history items are expanded (keyed by `${leadId}_${callIndex}`)
  const [expandedCallItems, setExpandedCallItems] = useState({});

  // State to track which attachment menu is open (keyed by `${leadId}_${medium}`)
  const [openAttachmentMenu, setOpenAttachmentMenu] = useState(null);

  // State to track attached files (keyed by `${leadId}_${medium}`)
  const [attachedFiles, setAttachedFiles] = useState({});

  // State to track sent messages (keyed by `${leadId}_${medium}`)
  const [sentMessages, setSentMessages] = useState({});

  // State to track message input values (keyed by `${leadId}_${medium}`)
  const [messageInputs, setMessageInputs] = useState({});

  // State to track email subject lines (keyed by leadId)
  const [emailSubjects, setEmailSubjects] = useState({});

  // State to track chat panel heights (keyed by leadId)
  const [chatHeights, setChatHeights] = useState({});
  const [isDragging, setIsDragging] = useState(null);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);

  // Ref for file input and current target
  const fileInputRef = useRef(null);
  const [currentFileTarget, setCurrentFileTarget] = useState(null);

  // Refs for message containers to enable auto-scroll
  const messageContainerRefs = useRef({});

  // Sales Flow Hooks options
  const salesFlowHooks = [
    { name: 'Personal Greeting', icon: MessageSquare, color: 'text-blue-600' },
    { name: 'Job Demos', icon: Star, color: 'text-purple-600' },
    { name: 'Before & After', icon: ArrowRight, color: 'text-green-600' },
    { name: 'Company Slogan', icon: MessageSquare, color: 'text-lime-600' },
    { name: 'Experience', icon: Briefcase, color: 'text-amber-600' },
    { name: 'Company Qualities', icon: Star, color: 'text-cyan-600' },
    { name: 'Customer Reviews', icon: User, color: 'text-rose-600' },
    { name: 'Online Reviews', icon: Globe, color: 'text-violet-600' }
  ];

  const toggleCallExpansion = (leadId, callIndex) => {
    const key = `${leadId}_${callIndex}`;
    setExpandedCallItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleAttachmentMenu = (leadId, medium) => {
    const key = `${leadId}_${medium}`;
    setOpenAttachmentMenu(prev => prev === key ? null : key);
  };

  const handleHookSelect = (hookName) => {
    // Handle hook selection - could insert into message
    console.log('Selected hook:', hookName);
    setOpenAttachmentMenu(null);
  };

  const handleMediaUpload = (leadId, medium) => {
    // Set the current target for the file upload
    setCurrentFileTarget(`${leadId}_${medium}`);
    setOpenAttachmentMenu(null);
    // Trigger the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0 && currentFileTarget) {
      const currentAttachments = attachedFiles[currentFileTarget] || [];
      const remainingSlots = 5 - currentAttachments.length;

      // Only add files up to the limit of 5
      const filesToAdd = files.slice(0, remainingSlots);

      const newAttachments = filesToAdd.map(file => {
        const fileUrl = URL.createObjectURL(file);
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        return {
          file,
          url: fileUrl,
          name: file.name,
          type: isImage ? 'image' : isVideo ? 'video' : 'file'
        };
      });

      setAttachedFiles(prev => ({
        ...prev,
        [currentFileTarget]: [...(prev[currentFileTarget] || []), ...newAttachments]
      }));
    }
    // Reset the input so the same file can be selected again
    event.target.value = '';
    setCurrentFileTarget(null);
  };

  const removeAttachedFile = (key, index) => {
    setAttachedFiles(prev => {
      const currentAttachments = prev[key] || [];
      if (index !== undefined && currentAttachments[index]) {
        // Revoke the URL for the removed file
        URL.revokeObjectURL(currentAttachments[index].url);
        // Remove the specific file at index
        const newAttachments = currentAttachments.filter((_, i) => i !== index);
        if (newAttachments.length === 0) {
          const newFiles = { ...prev };
          delete newFiles[key];
          return newFiles;
        }
        return { ...prev, [key]: newAttachments };
      }
      return prev;
    });
  };

  // Handle message input change
  const handleMessageInputChange = (leadId, medium, value) => {
    const key = `${leadId}_${medium}`;
    setMessageInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle sending a message
  const handleSendMessage = (leadId, medium) => {
    const key = `${leadId}_${medium}`;
    const messageText = messageInputs[key]?.trim() || '';
    const attachments = attachedFiles[key] || [];

    // Don't send if there's no content
    if (!messageText && attachments.length === 0) return;

    const newMessage = {
      from: 'user',
      text: messageText,
      attachments: attachments.length > 0 ? attachments.map(att => ({
        type: att.type,
        url: att.url,
        name: att.name
      })) : [],
      timestamp: new Date().toISOString()
    };

    // Add to sent messages
    setSentMessages(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), newMessage]
    }));

    // Clear the input and attachments
    setMessageInputs(prev => ({
      ...prev,
      [key]: ''
    }));

    // Remove attachments (but don't revoke URLs since they're now in sent messages)
    setAttachedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[key];
      return newFiles;
    });
  };

  // Close attachment menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openAttachmentMenu && !event.target.closest('.attachment-menu-wrapper')) {
        setOpenAttachmentMenu(null);
      }
    };

    if (openAttachmentMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openAttachmentMenu]);

  // Auto-scroll to bottom when messages are sent
  useEffect(() => {
    Object.keys(sentMessages).forEach(key => {
      const container = messageContainerRefs.current[key];
      if (container) {
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 50);
      }
    });
  }, [sentMessages]);

  // Handle chat panel resize drag
  const handleDragStart = (e, leadId) => {
    e.preventDefault();
    setIsDragging(leadId);
    dragStartY.current = e.clientY || e.touches?.[0]?.clientY || 0;
    dragStartHeight.current = chatHeights[leadId] || 340;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0;
    const deltaY = clientY - dragStartY.current;
    const newHeight = Math.max(200, Math.min(600, dragStartHeight.current + deltaY));
    setChatHeights(prev => ({ ...prev, [isDragging]: newHeight }));
  };

  const handleDragEnd = () => {
    setIsDragging(null);
  };

  // Add global mouse/touch listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDragMove);
      document.addEventListener('touchend', handleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleDragMove);
        document.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging]);

  // Render a lead section (Ready Jobs, In Progress, Paused, or Rejected)
  const renderLeadSection = (leads, sectionType) => {
    if (!leads || leads.length === 0) return null;

    const sectionTitles = {
      uncontactedLeads: 'Uncontacted Leads',
      readyJobs: 'Ready Jobs',
      inProgress: 'In Progress',
      stopped: 'Paused',
      rejected: 'Rejected'
    };

    const renderLeadRow = (lead) => {
      const isChatExpanded = !!expandedChatPanels[lead.id];
      const actionButtons = sectionType === 'rejected' ? [] : [
        { label: 'Estimate', icon: FileText },
        { label: 'Contract', icon: FileSignature },
        { label: 'Invoice', icon: Receipt },
        { label: 'Thank You', icon: HeartHandshake }
      ];
      const chatMediumOptions = ['Text', 'Email'];
      const selectedMedium = chatMediumByLead[lead.id] || 'Text';
      const leadFirstName = lead.firstName || lead.name?.split(' ')[0] || 'there';
      
      const chatScripts = {
        Text: sectionType === 'rejected' ? [
          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for reaching out to Holy City Clean Co. If your plans change, we're happy to revisit your estimate anytime.` },
          { from: 'lead', text: "Thanks, I'll keep that in mind." },
          { from: 'assistant', text: 'No problem at all—have a great day!' }
        ] : [
          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for texting Holy City Clean Co. Want me to reserve that estimate slot?` },
          { from: 'lead', text: 'Yes, can we keep Tuesday open?' },
          { from: 'assistant', text: 'Done! I will send a confirmation text with prep instructions.' }
        ],
        Call: sectionType === 'rejected' ? [
          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for calling Holy City Clean Co. If your plans change, we're happy to revisit your estimate anytime.` },
          { from: 'lead', text: "Thanks, I'll keep that in mind." },
          { from: 'assistant', text: 'No problem at all—have a great day!' }
        ] : [
          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for calling Holy City Clean Co. I'd be happy to help you with your service needs.` },
          { from: 'lead', text: 'Yes, can we schedule something?' },
          { from: 'assistant', text: 'Absolutely! Let me check our availability and get back to you shortly.' }
        ],
        Email: sectionType === 'rejected' ? [
          { from: 'assistant', text: `Hi ${leadFirstName}, thanks for reaching out to Holy City Clean Co. If your plans change, we're happy to revisit your estimate anytime.` },
          { from: 'lead', text: "Thanks, I'll keep that in mind." },
          { from: 'assistant', text: 'No problem at all—have a great day!' }
        ] : [
          { from: 'assistant', text: `Hi ${leadFirstName}, thank you for reaching out via email. I'll send you more information shortly.` },
          { from: 'lead', text: 'Appreciate it. Can you send the quote?' },
          { from: 'assistant', text: 'Absolutely—sending the estimate to your email now.' }
        ]
      };
      const transcript = chatScripts[selectedMedium] || chatScripts.Text;

      // Call history data for the Call tab
      const callHistory = [
        {
          date: '01/28/2026',
          time: '2:34 PM',
          duration: '3:42',
          type: 'outgoing',
          status: 'answered',
          transcript: [
            { speaker: 'Agent', text: `Hi ${leadFirstName}, this is Holy City Clean Co. calling about your cleaning service inquiry.` },
            { speaker: 'Lead', text: 'Oh yes, hi! Thanks for getting back to me.' },
            { speaker: 'Agent', text: 'Of course! I wanted to discuss your estimate and see if you had any questions.' },
            { speaker: 'Lead', text: 'Yes, I was wondering about the scheduling options.' },
            { speaker: 'Agent', text: 'We have availability next Tuesday and Thursday. Would either of those work for you?' },
            { speaker: 'Lead', text: 'Tuesday would be perfect.' },
          ]
        },
        {
          date: '01/25/2026',
          time: '10:15 AM',
          duration: '1:23',
          type: 'outgoing',
          status: 'answered',
          transcript: [
            { speaker: 'Agent', text: `Hello, is this ${leadFirstName}? This is Holy City Clean Co.` },
            { speaker: 'Lead', text: 'Yes, speaking.' },
            { speaker: 'Agent', text: 'Great! I\'m following up on your service request. Do you have a moment to discuss?' },
            { speaker: 'Lead', text: 'I\'m a bit busy right now, can you call back later?' },
            { speaker: 'Agent', text: 'Absolutely! When would be a good time to reach you?' },
          ]
        },
        { date: '01/22/2026', time: '4:50 PM', duration: '0:00', type: 'outgoing', status: 'no answer' },
      ];


      const isExpanded = expandedLeads.has(lead.id);
      
      const addressLines = formatAddressLines(lead.address || '');
      
      const serviceDisplay = (() => {
        if (Array.isArray(lead.service) && lead.service.length > 0) {
          return lead.service.map(s => mapServiceLabel(s)).join(', ');
        } else if (lead.service && typeof lead.service === 'string') {
          return mapServiceLabel(lead.service);
        }
        return 'No service specified';
      })();

      return (
        <React.Fragment key={lead.id}>
          <tr 
            onClick={(e) => toggleLeadExpansion(lead.id, e)}
            className="lead-row"
          >
            <td className="lead-cell lead-cell-center">
              {sectionType === 'uncontactedLeads' ? (
                <div className="status-uncontacted">
                  <span className="status-uncontacted-text">Uncontacted</span>
                  {lead.dateAdded && (
                    <span className="status-uncontacted-date">
                      {new Date(lead.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              ) : sectionType === 'readyJobs' ? (
                <div className="status-scheduled">
                  <span className="status-scheduled-text">Scheduled</span>
                  {lead.dateAdded && (
                    <span className="status-scheduled-date">
                      {new Date(lead.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} {new Date(lead.dateAdded).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </span>
                  )}
                </div>
              ) : sectionType === 'inProgress' ? (
                <div className="status-indicator-container">
                  <div className="status-pulse-container">
                    <div className="status-pulse-dot"></div>
                    <div className="status-pulse-ring"></div>
                  </div>
                </div>
              ) : sectionType === 'stopped' ? (
                <div className="status-indicator-container">
                  <div className="status-stopped-dot"></div>
                </div>
              ) : (
                <div className="status-indicator-container">
                  <X className="status-rejected-icon" />
                </div>
              )}
            </td>
            <td className="lead-cell">
              <span className="lead-name">{lead.name}</span>
            </td>
            <td className="lead-cell lead-cell-hide-md">
              <span className="lead-text">{lead.phone || 'No phone'}</span>
            </td>
            <td className="lead-cell lead-cell-hide-md">
              <div className="lead-address-container">
                <span className="lead-address-line">{addressLines.line1 || lead.address || 'No address'}</span>
                {addressLines.line2 && (
                  <span className="lead-address-line">{addressLines.line2}</span>
                )}
              </div>
            </td>
            <td className="lead-cell lead-cell-hide-md">
              {sectionType === 'readyJobs' || sectionType === 'uncontactedLeads' ? (
                <span className="lead-date">
                  {lead.dateAdded ? new Date(lead.dateAdded).toLocaleDateString() : 'No date'}
                </span>
              ) : (
                <div className="lead-date-container">
                  <span className="lead-date">
                    {lead.dateAdded ? new Date(lead.dateAdded).toLocaleDateString() : 'No date'}
                  </span>
                  <span className="lead-time">
                    {lead.dateAdded ? new Date(lead.dateAdded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
              )}
            </td>
            <td className="lead-cell">
              <span className="lead-text">{serviceDisplay}</span>
            </td>
            <td className="lead-cell lead-cell-center">
              <div className="lead-source-badge-container">
                <SourceBadge source={lead.source} />
              </div>
            </td>
            <td className="lead-cell lead-cell-center">
              {(() => {
                const action = getLeadActionButton ? getLeadActionButton(lead) : null;
                if (!action) return null;
                return (
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className={`lead-action-button ${action.color || ''}`}
                  >
                    {action.label}
                  </button>
                );
              })()}
            </td>
            <td className="lead-cell">
              <div className="lead-chevron-container">
                <ChevronDown 
                  className={`lead-chevron ${isExpanded ? 'lead-chevron-expanded' : ''}`}
                />
              </div>
            </td>
          </tr>
          {isExpanded && (
            <tr>
              <td colSpan="9" className="lead-expanded-row">
                <div className="lead-expanded-content">
                  {/* Chat Panel */}
                  <div className="chat-panel">
                    <div className="chat-panel-container">
                      <div className="chat-header">
                        <div className="chat-medium-selector">
                          {chatMediumOptions.map(option => {
                            const isActive = option === selectedMedium;
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setChatMediumByLead(prev => ({ ...prev, [lead.id]: option }))}
                                className={`chat-medium-button ${isActive ? 'chat-medium-button-active' : 'chat-medium-button-inactive'}`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                        {sectionType === 'rejected' ? (
                          <div className="chat-header-action">
                            <button
                              type="button"
                              onClick={(e) => handleEstimateClick && handleEstimateClick(lead, e)}
                              className="open-estimate-button"
                            >
                              <FileText className="open-estimate-icon" />
                              Open Estimate
                            </button>
                          </div>
                        ) : sectionType === 'uncontactedLeads' ? (
                          <div className="chat-header-status">
                            <span className="text-sm text-gray-500">Not contacted yet</span>
                          </div>
                        ) : (
                          <div className="chat-header-status">
                            <button
                              type="button"
                              className={`pause-button ${sectionType === 'readyJobs' ? 'pause-button-ready' : 'pause-button-normal'}`}
                              title="Pause AI Agent"
                              aria-label="Pause AI Agent"
                            >
                              <Pause className={`pause-icon ${sectionType === 'readyJobs' ? 'pause-icon-ready' : 'pause-icon-normal'}`} fill="currentColor" />
                            </button>
                            <span className="ai-status-dot"></span>
                            AI Agent
                          </div>
                        )}
                      </div>
                      {sectionType === 'rejected' ? (
                        <div className={`chat-rejected-container ${isChatExpanded ? 'chat-rejected-container-expanded' : ''}`}>
                          <div className="chat-rejected-overlay"></div>
                          <div className="chat-messages">
                            {transcript.map((msg, idx) => (
                              <div
                                key={idx}
                                className={`chat-message ${msg.from === 'lead' ? 'chat-message-lead' : 'chat-message-assistant'}`}
                              >
                                <div
                                  className={`chat-message-bubble ${
                                    msg.from === 'lead'
                                      ? 'chat-message-bubble-rejected-lead'
                                      : 'chat-message-bubble-rejected-assistant'
                                  }`}
                                >
                                  {msg.text}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : selectedMedium === 'Call' ? (
                        /* Call History View */
                        <div className="call-history-container">
                          <div className="call-history-list">
                            {callHistory.map((call, idx) => {
                              const isCallExpanded = expandedCallItems[`${lead.id}_${idx}`];
                              const isExpandable = call.status === 'answered' && call.transcript;

                              return (
                                <div key={idx} className="call-history-item-wrapper">
                                  <div
                                    className={`call-history-item ${isExpandable ? 'call-history-item-expandable' : ''} ${isCallExpanded ? 'call-history-item-expanded' : ''}`}
                                    onClick={() => isExpandable && toggleCallExpansion(lead.id, idx)}
                                  >
                                    <div className="call-history-icon-wrapper">
                                      <Phone className={`call-history-icon ${call.type === 'outgoing' ? 'call-outgoing' : 'call-incoming'}`} />
                                      {call.type === 'outgoing' && (
                                        <span className="call-direction-arrow">↗</span>
                                      )}
                                    </div>
                                    <div className="call-history-details">
                                      <div className="call-history-top-row">
                                        <span className="call-history-date">{call.date}</span>
                                        <span className="call-history-time">{call.time}</span>
                                      </div>
                                      <div className="call-history-bottom-row">
                                        <span className={`call-history-status ${call.status === 'answered' ? 'status-answered' : 'status-missed'}`}>
                                          {call.status === 'answered' ? 'Answered' : 'No Answer'}
                                        </span>
                                        <span className="call-history-duration">{call.duration}</span>
                                      </div>
                                    </div>
                                    {isExpandable && (
                                      <ChevronDown className={`call-expand-chevron ${isCallExpanded ? 'call-expand-chevron-rotated' : ''}`} />
                                    )}
                                  </div>
                                  {isCallExpanded && call.transcript && (
                                    <div className="call-transcript">
                                      <div className="call-transcript-header">Call Transcript</div>
                                      <div className="call-transcript-messages">
                                        {call.transcript.map((line, lineIdx) => (
                                          <div key={lineIdx} className={`call-transcript-line ${line.speaker === 'Agent' ? 'transcript-agent' : 'transcript-lead'}`}>
                                            <span className="transcript-speaker">{line.speaker}:</span>
                                            <span className="transcript-text">{line.text}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : selectedMedium === 'Email' ? (
                        /* Email View */
                        <div className="email-view-wrapper"
                          style={{ height: chatHeights[lead.id] ? `${chatHeights[lead.id]}px` : undefined }}
                        >
                          <div
                            className="email-thread"
                            ref={el => messageContainerRefs.current[`${lead.id}_email`] = el}
                          >
                            {transcript.map((message, idx) => {
                              const emailDate = new Date(Date.now() - (transcript.length - idx) * 86400000);
                              const emailSubject = 'Re: Service Inquiry';
                              return (
                                <div key={`email-${lead.id}-${idx}`} className="email-item">
                                  <div className="email-header">
                                    <div className="email-from">
                                      {message.from === 'assistant' ? 'Holy City Clean Co.' : lead.name || 'Customer'}
                                    </div>
                                    <div className="email-header-right">
                                      <button
                                        type="button"
                                        className="email-reply-btn"
                                        onClick={() => setEmailSubjects(prev => ({ ...prev, [lead.id]: emailSubject }))}
                                        title="Reply"
                                      >
                                        <Mail className="email-reply-icon" />
                                        Reply
                                      </button>
                                      <div className="email-date">
                                        {emailDate.toLocaleDateString()}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="email-subject">
                                    {emailSubject}
                                  </div>
                                  <div className="email-body">
                                    {message.text}
                                  </div>
                                  <div className="email-footer">
                                    {message.from === 'assistant' ? 'Sent' : 'Received'} {emailDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                  </div>
                                </div>
                              );
                            })}
                            {/* Sent Emails */}
                            {(sentMessages[`${lead.id}_email`] || []).map((message, idx) => {
                              const attachments = message.attachments || (message.attachment ? [message.attachment] : []);
                              const emailSubject = message.subject || 'Re: Service Inquiry';
                              return (
                                <div key={`sent-email-${lead.id}-${idx}`} className="email-item email-item-sent">
                                  <div className="email-header">
                                    <div className="email-from">You</div>
                                    <div className="email-header-right">
                                      <button
                                        type="button"
                                        className="email-reply-btn"
                                        onClick={() => setEmailSubjects(prev => ({ ...prev, [lead.id]: emailSubject }))}
                                        title="Reply"
                                      >
                                        <Mail className="email-reply-icon" />
                                        Reply
                                      </button>
                                      <div className="email-date">
                                        {new Date(message.timestamp).toLocaleDateString()}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="email-subject">
                                    {emailSubject}
                                  </div>
                                  {attachments.length > 0 && (
                                    <div className="sent-email-attachments-row">
                                      {attachments.map((att, attIdx) => (
                                        <div key={attIdx} className="sent-email-attachment">
                                          {att.type === 'image' ? (
                                            <img src={att.url} alt="Attachment" className="sent-attachment-image" />
                                          ) : att.type === 'video' ? (
                                            <video src={att.url} className="sent-attachment-video" controls />
                                          ) : (
                                            <div className="sent-attachment-file">
                                              <FileText className="file-icon" />
                                              <span>{att.name}</span>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  <div className="email-body">
                                    {message.text}
                                  </div>
                                  <div className="email-footer">
                                    Sent {new Date(message.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {/* Email Compose Section */}
                          <div className="email-compose-section">
                            {/* Subject Line */}
                            <div className="email-subject-input-row">
                              <span className="email-subject-label">Subject:</span>
                              <input
                                type="text"
                                className="email-subject-input"
                                placeholder="Enter subject..."
                                value={emailSubjects[lead.id] || ''}
                                onChange={(e) => setEmailSubjects(prev => ({ ...prev, [lead.id]: e.target.value }))}
                              />
                              {emailSubjects[lead.id] && (
                                <button
                                  type="button"
                                  className="email-subject-clear"
                                  onClick={() => setEmailSubjects(prev => ({ ...prev, [lead.id]: '' }))}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            {/* Attachments Preview */}
                            {attachedFiles[`${lead.id}_email`] && attachedFiles[`${lead.id}_email`].length > 0 && (
                              <div className="attached-files-row">
                                {attachedFiles[`${lead.id}_email`].map((attachment, idx) => (
                                  <div key={idx} className="attached-file-item">
                                    {attachment.type === 'image' ? (
                                      <img
                                        src={attachment.url}
                                        alt="Attached"
                                        className="attached-media-thumb"
                                      />
                                    ) : attachment.type === 'video' ? (
                                      <video
                                        src={attachment.url}
                                        className="attached-media-thumb"
                                      />
                                    ) : (
                                      <span className="attached-name-inline">{attachment.name}</span>
                                    )}
                                    <button
                                      type="button"
                                      className="remove-attachment-btn"
                                      onClick={() => removeAttachedFile(`${lead.id}_email`, idx)}
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                                {attachedFiles[`${lead.id}_email`].length < 5 && (
                                  <div className="attachment-count-label">
                                    {attachedFiles[`${lead.id}_email`].length}/5
                                  </div>
                                )}
                              </div>
                            )}
                            {/* Message Input */}
                            <div className="message-input-box-inline">
                              <textarea
                                placeholder="Compose email..."
                                className="message-textarea-inline"
                                value={messageInputs[`${lead.id}_email`] || ''}
                                onChange={(e) => handleMessageInputChange(lead.id, 'email', e.target.value)}
                                rows={4}
                              />
                              <div className="message-buttons-inline">
                                <div className="attachment-menu-wrapper">
                                  <button
                                    type="button"
                                    className={`message-plus-btn-inline ${openAttachmentMenu === `${lead.id}_email` ? 'active' : ''}`}
                                    onClick={() => toggleAttachmentMenu(lead.id, 'email')}
                                  >
                                    <Plus className="message-plus-icon" />
                                  </button>
                                  {openAttachmentMenu === `${lead.id}_email` && (
                                    <div className="attachment-dropdown">
                                      <div className="attachment-dropdown-section">
                                        <div className="attachment-dropdown-label">Sales Flow Hooks</div>
                                        {salesFlowHooks.map((hook) => {
                                          const HookIcon = hook.icon;
                                          return (
                                            <button
                                              key={hook.name}
                                              type="button"
                                              className="attachment-dropdown-item"
                                              onClick={() => handleHookSelect(hook.name)}
                                            >
                                              <HookIcon className={`attachment-item-icon ${hook.color}`} />
                                              <span>{hook.name}</span>
                                            </button>
                                          );
                                        })}
                                      </div>
                                      <div className="attachment-dropdown-divider" />
                                      <div className="attachment-dropdown-section">
                                        <button
                                          type="button"
                                          className="attachment-dropdown-item"
                                          onClick={() => handleMediaUpload(lead.id, 'email')}
                                        >
                                          <Image className="attachment-item-icon text-gray-500" />
                                          <span>Select from files</span>
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="message-send-btn-inline"
                                  onClick={() => {
                                    const key = `${lead.id}_email`;
                                    const messageText = messageInputs[key]?.trim() || '';
                                    const attachments = attachedFiles[key] || [];
                                    const subject = emailSubjects[lead.id] || 'Re: Service Inquiry';

                                    if (!messageText && attachments.length === 0) return;

                                    const newMessage = {
                                      from: 'user',
                                      text: messageText,
                                      subject: subject,
                                      attachments: attachments.length > 0 ? attachments.map(att => ({
                                        type: att.type,
                                        url: att.url,
                                        name: att.name
                                      })) : [],
                                      timestamp: new Date().toISOString()
                                    };

                                    setSentMessages(prev => ({
                                      ...prev,
                                      [key]: [...(prev[key] || []), newMessage]
                                    }));

                                    setMessageInputs(prev => ({ ...prev, [key]: '' }));
                                    setEmailSubjects(prev => ({ ...prev, [lead.id]: '' }));
                                    setAttachedFiles(prev => {
                                      const newFiles = { ...prev };
                                      delete newFiles[key];
                                      return newFiles;
                                    });
                                  }}
                                >
                                  <ArrowUp className="message-send-arrow" />
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* Resize Handle */}
                          <div
                            className={`chat-resize-handle ${isDragging === lead.id ? 'dragging' : ''}`}
                            onMouseDown={(e) => handleDragStart(e, lead.id)}
                            onTouchStart={(e) => handleDragStart(e, lead.id)}
                          >
                            <div className="chat-resize-bar"></div>
                          </div>
                        </div>
                      ) : (
                        /* Text View with Messages and Input */
                        <div
                          className="chat-messages-wrapper"
                          style={{ height: chatHeights[lead.id] ? `${chatHeights[lead.id]}px` : undefined }}
                        >
                          <div
                            className={`chat-active-messages ${isChatExpanded ? 'chat-active-messages-expanded' : ''}`}
                            ref={el => messageContainerRefs.current[`${lead.id}_text`] = el}
                          >
                            {transcript.map((message, idx) => (
                              <div
                                key={`${selectedMedium}-${lead.id}-${idx}`}
                                className={`chat-message ${message.from === 'assistant' ? 'chat-message-lead' : 'chat-message-assistant'}`}
                              >
                                {message.from === 'assistant' ? (
                                  <div className="sent-message-wrapper">
                                    <div className="chat-message-bubble chat-message-bubble-active-assistant">
                                      {message.text}
                                    </div>
                                    <span className="sent-indicator">Sent <Check className="sent-check-icon" /></span>
                                  </div>
                                ) : (
                                  <div className="chat-message-bubble chat-message-bubble-active-lead">
                                    {message.text}
                                  </div>
                                )}
                              </div>
                            ))}
                            {/* Sent Messages */}
                            {(sentMessages[`${lead.id}_text`] || []).map((message, idx) => {
                              const attachments = message.attachments || (message.attachment ? [message.attachment] : []);
                              const hasMedia = attachments.some(att => att.type === 'image' || att.type === 'video');

                              return (
                                <div
                                  key={`sent-text-${lead.id}-${idx}`}
                                  className="chat-message chat-message-lead"
                                >
                                  <div className="sent-message-wrapper">
                                    {hasMedia ? (
                                      <>
                                        <div className="sent-media-row">
                                          {attachments.map((att, attIdx) => (
                                            <div key={attIdx} className="sent-media-item">
                                              {att.type === 'image' ? (
                                                <img src={att.url} alt="Sent" className="sent-media-image" />
                                              ) : att.type === 'video' ? (
                                                <video src={att.url} className="sent-media-video" controls />
                                              ) : null}
                                            </div>
                                          ))}
                                        </div>
                                        {message.text && (
                                          <div className="chat-message-bubble chat-message-bubble-active-assistant">
                                            {message.text}
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <div className="chat-message-bubble chat-message-bubble-active-assistant">
                                        {attachments.length > 0 && (
                                          <div className="sent-attachment">
                                            {attachments.map((att, attIdx) => (
                                              <div key={attIdx} className="sent-attachment-file">
                                                <FileText className="file-icon" />
                                                <span>{att.name}</span>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                        {message.text}
                                      </div>
                                    )}
                                    <span className="sent-indicator">
                                      Sent {new Date(message.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                      <Check className="sent-check-icon" />
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {/* Text Message Input */}
                          <div className="message-compose-inline">
                            {attachedFiles[`${lead.id}_text`] && attachedFiles[`${lead.id}_text`].length > 0 && (
                              <div className="attached-files-row">
                                {attachedFiles[`${lead.id}_text`].map((attachment, idx) => (
                                  <div key={idx} className="attached-file-item">
                                    {attachment.type === 'image' ? (
                                      <img
                                        src={attachment.url}
                                        alt="Attached"
                                        className="attached-media-thumb"
                                      />
                                    ) : attachment.type === 'video' ? (
                                      <video
                                        src={attachment.url}
                                        className="attached-media-thumb"
                                      />
                                    ) : (
                                      <span className="attached-name-inline">{attachment.name}</span>
                                    )}
                                    <button
                                      type="button"
                                      className="remove-attachment-btn"
                                      onClick={() => removeAttachedFile(`${lead.id}_text`, idx)}
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                                {attachedFiles[`${lead.id}_text`].length < 5 && (
                                  <div className="attachment-count-label">
                                    {attachedFiles[`${lead.id}_text`].length}/5
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="message-input-box-inline">
                              <textarea
                                placeholder="Text Message"
                                className="message-textarea-inline"
                                value={messageInputs[`${lead.id}_text`] || ''}
                                onChange={(e) => handleMessageInputChange(lead.id, 'text', e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(lead.id, 'text');
                                  }
                                }}
                                rows={4}
                              />
                              <div className="message-buttons-inline">
                                <div className="attachment-menu-wrapper">
                                  <button
                                    type="button"
                                    className={`message-plus-btn-inline ${openAttachmentMenu === `${lead.id}_text` ? 'active' : ''}`}
                                    onClick={() => toggleAttachmentMenu(lead.id, 'text')}
                                  >
                                    <Plus className="message-plus-icon" />
                                  </button>
                                  {openAttachmentMenu === `${lead.id}_text` && (
                                    <div className="attachment-dropdown">
                                      <div className="attachment-dropdown-section">
                                        <div className="attachment-dropdown-label">Sales Flow Hooks</div>
                                        {salesFlowHooks.map((hook) => {
                                          const HookIcon = hook.icon;
                                          return (
                                            <button
                                              key={hook.name}
                                              type="button"
                                              className="attachment-dropdown-item"
                                              onClick={() => handleHookSelect(hook.name)}
                                            >
                                              <HookIcon className={`attachment-item-icon ${hook.color}`} />
                                              <span>{hook.name}</span>
                                            </button>
                                          );
                                        })}
                                      </div>
                                      <div className="attachment-dropdown-divider" />
                                      <div className="attachment-dropdown-section">
                                        <button
                                          type="button"
                                          className="attachment-dropdown-item"
                                          onClick={() => handleMediaUpload(lead.id, 'text')}
                                        >
                                          <Image className="attachment-item-icon text-gray-500" />
                                          <span>Select from files</span>
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="message-send-btn-inline"
                                  onClick={() => handleSendMessage(lead.id, 'text')}
                                >
                                  <ArrowUp className="message-send-arrow" />
                                </button>
                              </div>
                            </div>
                            <span className="text-input-hint">Press Enter to send, Shift+Enter for new line</span>
                          </div>
                          {/* Resize Handle */}
                          <div
                            className={`chat-resize-handle ${isDragging === lead.id ? 'dragging' : ''}`}
                            onMouseDown={(e) => handleDragStart(e, lead.id)}
                            onTouchStart={(e) => handleDragStart(e, lead.id)}
                          >
                            <div className="chat-resize-bar"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {sectionType === 'rejected' ? (
                    <div className="rejected-panel">
                      <div className="rejected-panel-container">
                        <div className="rejected-header">
                          <div>
                            <div className="rejected-status-label">Lead Status</div>
                            <div className="rejected-status-value">{lead.status}</div>
                          </div>
                          <div className="rejected-badge">
                            <X className="rejected-badge-icon" strokeWidth={3} />
                            Rejected
                          </div>
                        </div>
                        <div className="rejected-content">
                          <p className="rejected-text">
                            This lead has been marked as <span className="rejected-text-highlight">Rejected</span>. 
                            You can still reference the conversation and estimate history if they return in the future.
                          </p>
                          <ul className="rejected-list">
                            <li>Keep notes on why the lead was rejected.</li>
                            <li>Use this for future targeting and campaign exclusions.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="action-buttons-panel">
                      <div className="action-buttons-grid">
                        {actionButtons.map(action => {
                          const Icon = action.icon;
                          const getIconClass = () => {
                            if (action.label === 'Estimate') return 'action-button-icon action-button-icon-green';
                            if (action.label === 'Contract') return 'action-button-icon action-button-icon-purple';
                            if (action.label === 'Invoice') return 'action-button-icon action-button-icon-amber';
                            if (action.label === 'Thank You') return 'action-button-icon action-button-icon-rose';
                            return 'action-button-icon action-button-icon-slate';
                          };
                          const getLabelClass = () => {
                            if (action.label === 'Estimate') return 'action-button-label action-button-label-green';
                            if (action.label === 'Contract') return 'action-button-label action-button-label-purple';
                            if (action.label === 'Invoice') return 'action-button-label action-button-label-amber';
                            if (action.label === 'Thank You') return 'action-button-label action-button-label-rose';
                            return 'action-button-label action-button-label-slate';
                          };
                          const getCardClass = () => {
                            if (action.label === 'Estimate') return 'action-button-card action-button-card-green';
                            if (action.label === 'Contract') return 'action-button-card action-button-card-purple';
                            if (action.label === 'Invoice') return 'action-button-card action-button-card-amber';
                            if (action.label === 'Thank You') return 'action-button-card action-button-card-rose';
                            return 'action-button-card action-button-card-slate';
                          };
                          const formStatus = (() => {
                            if (action.label === 'Estimate' || action.label === 'Contract') return 'received';
                            if (action.label === 'Invoice' && lead.status === 'Completed') return 'received';
                            return 'sent';
                          })();

                          return (
                            <button
                              key={action.label}
                              className={getCardClass()}
                              type="button"
                              title={action.label}
                              aria-label={action.label}
                            >
                              {formStatus === 'received' && (
                                <div className="action-button-check">
                                  <div className="action-button-check-badge">
                                    <Check className="action-button-check-icon" strokeWidth={3} />
                                  </div>
                                </div>
                              )}
                              {formStatus === 'sent' && (
                                <div className="action-button-sent">
                                  <span className="action-button-sent-badge">
                                    SENT
                                  </span>
                                </div>
                              )}
                              <Icon className={getIconClass()} />
                              <span className={getLabelClass()}>{action.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    };

    return (
      <div className="lead-section">
        <h3 className="lead-section-title">{sectionTitles[sectionType]}</h3>
        <div className="leads-table-container">
          <table className="leads-table">
            <thead className="leads-table-head">
              <tr>
                <th className="leads-table-header leads-table-header-center" style={{ width: '8rem' }}>Status</th>
                <th className="leads-table-header">Name</th>
                <th className="leads-table-header leads-table-header-hide-md">Phone</th>
                <th className="leads-table-header leads-table-header-hide-md">Address</th>
                <th className="leads-table-header leads-table-header-hide-md">
                  {sectionType === 'readyJobs' ? 'Job Date/Time' : sectionType === 'uncontactedLeads' ? 'Date Added' : 'Contact Date/Time'}
                </th>
                <th className="leads-table-header">Job Requested</th>
                <th className="leads-table-header leads-table-header-center">Lead Source</th>
                <th className="leads-table-header leads-table-header-center">TO-DO</th>
                <th className="leads-table-header" style={{ width: '3rem' }}></th>
              </tr>
            </thead>
            <tbody className="leads-table-body">
              {leads.map(lead => renderLeadRow(lead))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="9" className="leads-empty">
                    No {sectionTitles[sectionType].toLowerCase()}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="leads-container">
      {/* Hidden file input for attachments */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        multiple
        style={{ display: 'none' }}
      />

      {/* Header */}
      <div className="leads-header">
        <div>
          <h2 className="leads-title">Leads Management</h2>
        </div>
        <div className="add-lead-button">
          <button
            onClick={() => openModal && openModal('addLead')}
            className="add-lead-button-inner"
          >
            <Plus className="add-lead-icon" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="leads-search-container">
        <Search className="leads-search-icon" />
        <input
          type="text"
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
          className="leads-search-input"
        />
      </div>

      {/* Lead Sections */}
      {renderLeadSection(uncontactedLeads, 'uncontactedLeads')}
      {renderLeadSection(readyJobs, 'readyJobs')}
      {renderLeadSection(inProgress, 'inProgress')}
      {renderLeadSection(stopped, 'stopped')}
      {renderLeadSection(rejected, 'rejected')}
    </div>
  );
};

export default Leads;
