import React, { useState } from 'react';
import { Plus, Mail, Phone, MessageSquare, Calendar, User, Search, X } from 'lucide-react';
import './customerCorrespondence.css';

const CustomerCorrespondence = ({ customers = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [correspondenceType, setCorrespondenceType] = useState('Email');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [correspondences, setCorrespondences] = useState([
    {
      id: 'corr-001',
      customerId: 'cust-hc-002',
      customerName: 'Danielle Knox',
      type: 'Email',
      subject: 'Follow-up on service',
      message: 'Thank you for your recent service. We hope everything met your expectations.',
      date: '2025-01-15',
      time: '10:30 AM',
      status: 'Sent'
    },
    {
      id: 'corr-002',
      customerId: 'cust-hc-001',
      customerName: 'Marcus Reeves',
      type: 'Call',
      subject: 'Service inquiry',
      message: 'Called to discuss upcoming maintenance schedule.',
      date: '2025-01-14',
      time: '2:15 PM',
      status: 'Completed'
    },
    {
      id: 'corr-003',
      customerId: 'cust-hc-002',
      customerName: 'Danielle Knox',
      type: 'Text',
      subject: 'Appointment confirmation',
      message: 'Your appointment is confirmed for next Tuesday at 9 AM.',
      date: '2025-01-13',
      time: '4:45 PM',
      status: 'Sent'
    }
  ]);

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.phone?.includes(searchTerm);
  });

  const filteredCorrespondences = correspondences.filter(corr => {
    if (selectedCustomer) {
      return corr.customerId === selectedCustomer.id;
    }
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer || !subject || !message) return;

    const newCorrespondence = {
      id: `corr-${Date.now()}`,
      customerId: selectedCustomer.id,
      customerName: `${selectedCustomer.firstName} ${selectedCustomer.lastName}`,
      type: correspondenceType,
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Draft'
    };

    setCorrespondences([newCorrespondence, ...correspondences]);
    setSubject('');
    setMessage('');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Email':
        return <Mail className="correspondence-type-icon" />;
      case 'Call':
        return <Phone className="correspondence-type-icon" />;
      case 'Text':
        return <MessageSquare className="correspondence-type-icon" />;
      default:
        return <Mail className="correspondence-type-icon" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Email':
        return 'correspondence-type-email';
      case 'Call':
        return 'correspondence-type-call';
      case 'Text':
        return 'correspondence-type-text';
      default:
        return '';
    }
  };

  return (
    <div className="customer-correspondence-container">
      <div className="correspondence-header">
        <h2 className="correspondence-title">Customer Correspondence</h2>
      </div>

      <div className="correspondence-content">
        {/* Create New Correspondence Section */}
        <div className="create-correspondence-section">
          <h3 className="section-title">Create New Correspondence</h3>
          
          <form onSubmit={handleSubmit} className="correspondence-form">
            {/* Customer Search */}
            <div className="form-group">
              <label className="form-label">Select Customer</label>
              <div className="customer-search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  className="customer-search-input"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {selectedCustomer && (
                  <button
                    type="button"
                    className="clear-customer-button"
                    onClick={() => {
                      setSelectedCustomer(null);
                      setSearchTerm('');
                    }}
                  >
                    <X className="clear-icon" />
                  </button>
                )}
              </div>
              {searchTerm && !selectedCustomer && (
                <div className="customer-dropdown">
                  {filteredCustomers.slice(0, 5).map(customer => (
                    <div
                      key={customer.id}
                      className="customer-option"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setSearchTerm(`${customer.firstName} ${customer.lastName}`);
                      }}
                    >
                      <User className="customer-option-icon" />
                      <div className="customer-option-info">
                        <div className="customer-option-name">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="customer-option-details">
                          {customer.email} • {customer.phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedCustomer && (
                <div className="selected-customer">
                  <User className="selected-customer-icon" />
                  <span>{selectedCustomer.firstName} {selectedCustomer.lastName}</span>
                </div>
              )}
            </div>

            {/* Correspondence Type */}
            <div className="form-group">
              <label className="form-label">Type</label>
              <div className="type-selector">
                {['Email', 'Call', 'Text'].map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`type-button ${correspondenceType === type ? 'type-button-active' : ''}`}
                    onClick={() => setCorrespondenceType(type)}
                  >
                    {getTypeIcon(type)}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                placeholder="Enter your message..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={!selectedCustomer || !subject || !message}
              >
                <Plus className="submit-icon" />
                Create Correspondence
              </button>
            </div>
          </form>
        </div>

        {/* Previous Correspondences List */}
        <div className="correspondences-list-section">
          <div className="list-header">
            <h3 className="section-title">Previous Correspondences</h3>
            {selectedCustomer && (
              <button
                className="clear-filter-button"
                onClick={() => setSelectedCustomer(null)}
              >
                Clear Filter
              </button>
            )}
          </div>

          {filteredCorrespondences.length === 0 ? (
            <div className="empty-state">
              <Mail className="empty-icon" />
              <p>No correspondences found</p>
            </div>
          ) : (
            <div className="correspondences-list">
              {filteredCorrespondences.map(corr => (
                <div key={corr.id} className="correspondence-item">
                  <div className="correspondence-item-header">
                    <div className="correspondence-item-left">
                      <div className={`correspondence-type-badge ${getTypeColor(corr.type)}`}>
                        {getTypeIcon(corr.type)}
                        <span>{corr.type}</span>
                      </div>
                      <div className="correspondence-item-info">
                        <div className="correspondence-customer-name">{corr.customerName}</div>
                        <div className="correspondence-subject">{corr.subject}</div>
                      </div>
                    </div>
                    <div className="correspondence-item-right">
                      <div className="correspondence-date">
                        <Calendar className="date-icon" />
                        <span>{corr.date}</span>
                        <span className="correspondence-time">{corr.time}</span>
                      </div>
                      <div className={`correspondence-status correspondence-status-${corr.status.toLowerCase()}`}>
                        {corr.status}
                      </div>
                    </div>
                  </div>
                  <div className="correspondence-message">
                    {corr.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCorrespondence;

