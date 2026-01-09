import React from 'react';
import { Search, Plus, ChevronDown, FileText, FileSignature, Receipt, HeartHandshake, MoveDiagonal, Check, Pause, X, Mail } from 'lucide-react';
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
      const chatHeightClass = isChatExpanded ? 'min-h-[360px]' : 'min-h-[260px]';
      const actionButtons = sectionType === 'rejected' ? [] : [
        { label: 'Estimate', icon: FileText },
        { label: 'Contract', icon: FileSignature },
        { label: 'Invoice', icon: Receipt },
        { label: 'Thank You', icon: HeartHandshake }
      ];
      const chatMediumOptions = ['Text', 'Call', 'Email'];
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
                          <button
                            type="button"
                            onClick={() => toggleChatPanel && toggleChatPanel(lead.id)}
                            className="chat-toggle-button"
                          >
                            <span>{isChatExpanded ? 'Hide full thread' : 'Show full thread'}</span>
                            <ChevronDown className={`chat-toggle-chevron ${isChatExpanded ? 'chat-toggle-chevron-expanded' : ''}`} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className={`chat-active-messages ${isChatExpanded ? 'chat-active-messages-expanded' : ''}`}>
                            {transcript.map((message, idx) => (
                              <div
                                key={`${selectedMedium}-${lead.id}-${idx}`}
                                className={`chat-message ${message.from === 'assistant' ? 'chat-message-lead' : 'chat-message-assistant'}`}
                              >
                                <div
                                  className={`chat-message-bubble ${
                                    message.from === 'assistant'
                                      ? 'chat-message-bubble-active-assistant'
                                      : 'chat-message-bubble-active-lead'
                                  }`}
                                >
                                  {message.text}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="typing-indicator">
                            <span className="typing-dot"></span>
                            <span>Typing...</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleChatPanelSize && toggleChatPanelSize(lead.id)}
                            className="chat-resize-button"
                            aria-label="Toggle chat panel size"
                          >
                            <MoveDiagonal className="chat-resize-icon" />
                          </button>
                        </>
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
                            return 'action-button-card';
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
