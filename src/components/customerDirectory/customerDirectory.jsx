import React, { useState } from 'react';
import { Search, Plus, ChevronDown, Edit3, Calendar, FileText, FileSignature, Receipt, ArrowUp, ArrowDown } from 'lucide-react';
import './customerDirectory.css';

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

const CustomerDirectory = ({ 
  customers, 
  setCustomers, 
  openModal,
  searchTerm,
  setSearchTerm 
}) => {
  const [customerSortBy, setCustomerSortBy] = useState('name');
  const [customerSortOrder, setCustomerSortOrder] = useState('asc');
  const [expandedCustomers, setExpandedCustomers] = useState(new Set());

  const mapServiceLabel = (raw) => {
    const v = String(raw || '').toLowerCase();
    if (!v) return 'Other';
    if (v.includes('exterior') || v.includes('softwash') || v.includes('soft wash')) return 'Home/Business Exterior';
    if (v.includes('concrete') || v.includes('driveway') || v.includes('walkway') || v.includes('sidewalk')) return 'Concrete Pressure Washing';
    if (v.includes('deck') || v.includes('fence')) return 'Deck/Fence Cleaning';
    return 'Other';
  };

  const formatAddressLines = (address) => {
    const result = { line1: '', line2: '' };
    if (!address || typeof address !== 'string') return result;
    const parts = address.split(',').map(p => p.trim());
    if (parts.length >= 2) {
      result.line1 = parts[0];
      const city = parts[1];
      // Extract ZIP code (supports 5 or 9 digits)
      const zipMatch = address.match(/\b\d{5}(?:-\d{4})?\b/);
      const zip = zipMatch ? zipMatch[0] : '';
      
      // Extract state (2-letter abbreviation)
      const stateMatch = address.match(/\b([A-Z]{2})\b/);
      const state = stateMatch ? stateMatch[1] : '';
      
      // Remove state and zip from city string
      let cityOnly = city.replace(/\b[A-Z]{2}\b/, '').replace(/\b\d{5}(?:-\d{4})?\b/, '').trim();
      
      if (cityOnly === city && parts.length > 2) {
        // If state/zip weren't in the city part, check next parts
        cityOnly = city;
      }
      
      // Build line2 with city, state, and zip
      const line2Parts = [cityOnly || city, state, zip].filter(Boolean);
      result.line2 = line2Parts.join(' ');
    } else {
      result.line1 = address.trim();
    }
    return result;
  };

  const formatServicePrice = (service) => {
    const raw =
      service?.pricePaid ??
      service?.price ??
      service?.amount ??
      service?.total ??
      (typeof service?.cost === 'number' ? service.cost : null);
    if (raw == null || Number.isNaN(Number(raw))) return '—';
    return `$${Number(raw).toFixed(2)}`;
  };

  const handleServiceFileClick = (type, customer, service) => {
    // Placeholder action until real files are wired up
    alert(`${type} link for ${service?.type || 'service'} - customer ${customer?.name || customer?.id}`);
  };

  const toggleCustomerExpansion = (customerId) => {
    setExpandedCustomers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(customerId)) {
        newSet.delete(customerId);
      } else {
        newSet.add(customerId);
      }
      return newSet;
    });
  };

  const filteredCustomers = customers.filter(customer => {
    const term = searchTerm.toLowerCase();
    const nameMatch = (customer.name || '').toLowerCase().includes(term);
    const firstMatch = (customer.firstName || '').toLowerCase().includes(term);
    const lastMatch = (customer.lastName || '').toLowerCase().includes(term);
    const emailMatch = (customer.email || '').toLowerCase().includes(term);
    const addressMatch = (customer.address || '').toLowerCase().includes(term);
    return nameMatch || firstMatch || lastMatch || emailMatch || addressMatch;
  }).sort((a, b) => {
    let aValue, bValue;
    
    switch (customerSortBy) {
      case 'name':
        aValue = (a.name || `${a.firstName || ''} ${a.lastName || ''}`).trim().toLowerCase();
        bValue = (b.name || `${b.firstName || ''} ${b.lastName || ''}`).trim().toLowerCase();
        break;
      case 'totalSpent':
        aValue = a.totalSpent || 0;
        bValue = b.totalSpent || 0;
        break;
      case 'serviceCount':
        aValue = a.serviceCount || 0;
        bValue = b.serviceCount || 0;
        break;
      case 'lastService':
        aValue = a.lastService ? new Date(a.lastService).getTime() : 0;
        bValue = b.lastService ? new Date(b.lastService).getTime() : 0;
        break;
      case 'rating':
        aValue = a.rating || 0;
        bValue = b.rating || 0;
        break;
      case 'phone':
        aValue = (a.phone || '').toLowerCase();
        bValue = (b.phone || '').toLowerCase();
        break;
      case 'address':
        aValue = (a.address || '').toLowerCase();
        bValue = (b.address || '').toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (typeof aValue === 'string') {
      if (customerSortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    } else {
      if (customerSortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
  });

  return (
    <div className="customer-directory-container">
      {/* Header */}
      <div className="customer-header">
        <div>
          <h2 className="customer-title">Customer Management</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={() => openModal('addCustomer')}
            className="add-customer-button"
          >
            <Plus className="add-customer-icon" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="search-sort-section">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="sort-controls">
          <div className="sort-select-container">
            <select
              value={customerSortBy}
              onChange={(e) => setCustomerSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Name</option>
              <option value="totalSpent">Total Spent</option>
              <option value="serviceCount">Service Count</option>
              <option value="lastService">Last Service</option>
            </select>
            <ChevronDown className="sort-chevron" />
          </div>
          <button
            onClick={() => setCustomerSortOrder(customerSortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-order-button"
            title={customerSortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {customerSortOrder === 'asc' ? (
              <ArrowUp className="sort-order-icon" />
            ) : (
              <ArrowDown className="sort-order-icon" />
            )}
            <span>{customerSortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
          </button>
        </div>
      </div>

      {/* Customers List */}
      <div className="table-container">
        <table className="customer-table">
          <thead className="table-head">
            <tr>
              <th className="table-header-cell">Name</th>
              <th className="table-header-cell">Phone</th>
              <th className="table-header-cell">Address</th>
              <th className="table-header-cell">Last Service</th>
              <th className="table-header-cell table-header-center table-header-cell-hide-md">Number of Services</th>
              <th className="table-header-cell table-header-center table-header-cell-hide-md">Total Spent</th>
              <th className="table-header-cell table-header-center table-header-cell-hide-md">Lead Source</th>
              <th className="table-header-cell" style={{ width: '3rem' }}></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredCustomers.map(customer => {
              const isExpanded = expandedCustomers.has(customer.id);
              const customerName = (() => {
                const composed = `${customer.firstName || ''} ${customer.lastName || ''}`.trim();
                return composed || customer.name || 'Customer';
              })();
              
              // Get most recent service
              const getMostRecentService = () => {
                if (!Array.isArray(customer.services) || customer.services.length === 0) {
                  return null;
                }
                const servicesWithDates = customer.services
                  .map(s => ({
                    service: s,
                    date: s?.date ? new Date(s.date) : null
                  }))
                  .filter(item => item.date !== null)
                  .sort((a, b) => b.date - a.date);
                return servicesWithDates.length > 0 ? servicesWithDates[0].service : null;
              };
              const mostRecentService = getMostRecentService();
              const serviceDateText = mostRecentService?.date
                ? new Date(mostRecentService.date).toLocaleDateString()
                : 'No services';
              const mostRecentJobType = mostRecentService
                ? mapServiceLabel(mostRecentService?.type || mostRecentService?.name || mostRecentService)
                : null;
              
              // Format address for display
              const addressLines = formatAddressLines(customer.address || '');
              
              // Calculate number of services
              const numberOfServices = customer.serviceCount || (Array.isArray(customer.services) ? customer.services.length : 0);
              
              // Calculate total spent
              const calculateTotalSpent = () => {
                if (customer.totalSpent !== undefined) {
                  return customer.totalSpent;
                }
                if (Array.isArray(customer.services) && customer.services.length > 0) {
                  return customer.services.reduce((total, service) => {
                    const price = parseFloat(
                      service?.pricePaid ?? 
                      service?.price ?? 
                      service?.amount ?? 
                      0
                    );
                    return total + (isNaN(price) ? 0 : price);
                  }, 0);
                }
                return 0;
              };
              const totalSpent = calculateTotalSpent();
              
              return (
                <React.Fragment key={customer.id}>
                  <tr 
                    onClick={() => toggleCustomerExpansion(customer.id)}
                    className="table-row"
                  >
                    <td className="table-cell">
                      <span className="customer-name">{customerName}</span>
                    </td>
                    <td className="table-cell">
                      <span className="customer-text">{customer.phone || 'No phone'}</span>
                    </td>
                    <td className="table-cell">
                      <div className="address-container">
                        <span className="address-line">{addressLines.line1 || customer.address || 'No address'}</span>
                        {addressLines.line2 && (
                          <span className="address-line">{addressLines.line2}</span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="customer-text">{serviceDateText}</span>
                    </td>
                    <td className="table-cell table-cell-center table-cell-hide-md">
                      <span className="customer-value">{numberOfServices}</span>
                    </td>
                    <td className="table-cell table-cell-center table-cell-hide-md">
                      <span className="customer-value">
                        {totalSpent > 0 ? `$${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'}
                      </span>
                    </td>
                    <td className="table-cell table-cell-center table-cell-hide-md">
                      <div className="source-badge-container">
                        <SourceBadge source={customer.source} />
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="chevron-container">
                        <ChevronDown 
                          className={`chevron-icon ${isExpanded ? 'chevron-icon-expanded' : ''}`}
                        />
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan="8" className="expanded-row">
                        <div className="expanded-content">
                          <div className="expanded-inner">
                            <div className="expanded-panel">
                              <div className="expanded-services">
                                {Array.isArray(customer.services) && customer.services.length > 0 ? (
                                  customer.services.map((service, idx) => {
                                    const type = mapServiceLabel(service?.type || service?.name || service);
                                    const date = service?.date ? new Date(service.date).toLocaleDateString() : '—';
                                    const price = formatServicePrice(service);
                                    const actionButtons = [
                                      { label: 'Estimate', icon: FileText, color: 'text-blue-600 bg-blue-50' },
                                      { label: 'Contract', icon: FileSignature, color: 'text-purple-600 bg-purple-50' },
                                      { label: 'Invoice', icon: Receipt, color: 'text-amber-600 bg-amber-50' }
                                    ];
                                    const bgClasses = {
                                      'Estimate': 'bg-white hover:bg-slate-50 text-blue-600',
                                      'Contract': 'bg-white hover:bg-slate-50 text-purple-600',
                                      'Invoice': 'bg-white hover:bg-slate-50 text-amber-600'
                                    };
                                    const getActionButtonClass = (label) => {
                                      if (label === 'Estimate') return 'service-action-button-blue';
                                      if (label === 'Contract') return 'service-action-button-purple';
                                      if (label === 'Invoice') return 'service-action-button-amber';
                                      return '';
                                    };
                                    
                                    return (
                                      <div key={`${customer.id}-service-${idx}`} className="service-card">
                                        {/* Header Row */}
                                        <div className="service-header">
                                          <div className="service-info">
                                            <h4 className="service-title">{type}</h4>
                                            <div className="service-meta">
                                              <span className="service-meta-item">
                                                <Calendar className="service-meta-icon" />
                                                <span className="service-meta-text">{date}</span>
                                              </span>
                                            </div>
                                          </div>
                                          <div className="service-actions">
                                            {actionButtons.map(action => {
                                              const Icon = action.icon;
                                              return (
                                                <button
                                                  key={action.label}
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleServiceFileClick(action.label, customer, service);
                                                  }}
                                                  className={`service-action-button ${getActionButtonClass(action.label)}`}
                                                  title={`${action.label} file`}
                                                >
                                                  <Icon className="service-action-icon" />
                                                  <span className="service-action-label">{action.label}</span>
                                                </button>
                                              );
                                            })}
                                            <div className="price-display">
                                              <p className="price-amount">{price}</p>
                                              <p className="price-label">Price Paid</p>
                                            </div>
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleServiceFileClick('Edit Service', customer, service);
                                              }}
                                              className="edit-service-button"
                                              title="Edit service entry"
                                            >
                                              <Edit3 className="edit-service-icon" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div className="service-empty">
                                    No services recorded
                                  </div>
                                )}
                              </div>
                              <div className="add-service-footer">
                                <button
                                  type="button"
                                  className="add-service-button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal('addService', customer);
                                  }}
                                  title="Add service"
                                  aria-label="Add service"
                                >
                                  <Plus className="add-service-icon" />
                                  <span>Add Service</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}

            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-customers">
                  No customers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDirectory;
