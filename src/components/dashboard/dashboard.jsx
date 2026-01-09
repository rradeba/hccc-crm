import React, { useState } from 'react';
import { DollarSign, Calendar, Users, TrendingUp, Bell, Star, ChevronLeft, ChevronRight, Percent } from 'lucide-react';
import './dashboard.css';

const Dashboard = ({ 
  customers, 
  jobs, 
  leads, 
  notifications, 
  setNotifications,
  getJobsForDate 
}) => {
  const [dashboardWeek, setDashboardWeek] = useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    return startOfWeek.toISOString().split('T')[0];
  });

  const navigateDashboardWeek = (direction) => {
    const currentWeekStart = new Date(dashboardWeek);
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    const newWeekStr = newWeekStart.toISOString().split('T')[0];
    setDashboardWeek(newWeekStr);
  };
  return (
    <div className="dashboard-container">
      {/* Key Metrics Cards */}
      {(() => {
        // Calculate Monthly Revenue
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyRevenue = customers.reduce((total, customer) => {
          if (Array.isArray(customer.services)) {
            const monthServices = customer.services.filter(service => {
              if (!service.date) return false;
              const serviceDate = new Date(service.date);
              return serviceDate.getMonth() === currentMonth && serviceDate.getFullYear() === currentYear;
            });
            const monthTotal = monthServices.reduce((sum, service) => {
              const price = parseFloat(service?.pricePaid ?? service?.price ?? service?.amount ?? 0);
              return sum + (isNaN(price) ? 0 : price);
            }, 0);
            return total + monthTotal;
          }
          return total;
        }, 0);

        // Calculate New Leads (added this week)
        const today = new Date();
        const currentDay = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDay);
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        
        const newLeads = leads.filter(lead => {
          if (!lead.dateAdded) return false;
          const leadDate = new Date(lead.dateAdded);
          return leadDate >= startOfWeek && leadDate <= endOfWeek;
        }).length;

        // Calculate Ready Jobs (jobs ready to be completed - scheduled for today or earlier, not completed)
        today.setHours(0, 0, 0, 0);
        
        const readyJobs = jobs.filter(job => {
          if (!job.date) return false;
          const jobDate = new Date(job.date);
          jobDate.setHours(0, 0, 0, 0);
          // Job is ready if it's scheduled for today or earlier and not completed
          return jobDate <= today && job.status !== 'Completed';
        }).length;

        // Calculate Conversion Rate
        // Conversion rate = (Leads that became customers or jobs) / Total leads
        const totalLeads = leads.length;
        const convertedLeads = leads.filter(lead => {
          // A lead is considered converted if:
          // 1. It has a status indicating conversion (Contract Signed, Scheduled, In Progress, Completed)
          // 2. Or if there's a matching customer
          const convertedStatuses = ['Contract Signed', 'Scheduled', 'In Progress', 'Completed'];
          return convertedStatuses.includes(lead.status);
        }).length;
        
        const conversionRate = totalLeads > 0 
          ? ((convertedLeads / totalLeads) * 100).toFixed(1)
          : '0.0';

        return (
          <div className="metrics-grid">
            {/* New Leads Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon-container metric-icon-purple">
                  <Users className="metric-icon metric-icon-purple" />
                </div>
              </div>
              <h4 className="metric-title">New Leads</h4>
              <p className="metric-value">{newLeads}</p>
              <p className="metric-subtext">Added this week</p>
            </div>

            {/* Ready Jobs Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon-container metric-icon-emerald">
                  <Calendar className="metric-icon metric-icon-emerald" />
                </div>
              </div>
              <h4 className="metric-title">Ready Jobs</h4>
              <p className="metric-value">{readyJobs}</p>
            </div>

            {/* Revenue This Month Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon-container metric-icon-blue">
                  <DollarSign className="metric-icon metric-icon-blue" />
                </div>
              </div>
              <h4 className="metric-title">Revenue This Month</h4>
              <p className="metric-value">${monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>

            {/* Conversion Rate Card */}
            <div className="metric-card">
              <div className="metric-header">
                <div className="metric-icon-container metric-icon-amber">
                  <Percent className="metric-icon metric-icon-amber" />
                </div>
              </div>
              <h4 className="metric-title">Conversion Rate</h4>
              <p className="metric-value">{conversionRate}%</p>
              <p className="metric-subtext">{convertedLeads} of {totalLeads} leads</p>
            </div>
          </div>
        );
      })()}

      {/* Notifications Section */}
      <div className="notifications-section">
        <div className="notifications-header">
          <div className="notifications-header-content">
            <div className="notifications-title-wrapper">
              <div className="notifications-icon-container">
                <Bell className="notifications-icon" />
              </div>
              <h3 className="notifications-title">Notifications</h3>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notifications-badge">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="notifications-content">
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="notifications-empty">
                <Bell className="notifications-empty-icon" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map(notification => {
                const typeIcons = {
                  lead: Users,
                  customer: Star,
                  payment: DollarSign,
                  reminder: Calendar
                };
                const Icon = typeIcons[notification.type] || Bell;
                
                const getActionLabel = (notification) => {
                  if (notification.type === 'lead') return 'Send Estimate';
                  if (notification.type === 'customer') return 'Send Invoice';
                  if (notification.type === 'payment') return 'View Payment';
                  if (notification.type === 'reminder') return 'View Reminder';
                  return 'Follow Up';
                };
                
                const actionLabel = getActionLabel(notification);
                
                const getNotificationIconClass = () => {
                  if (notification.read) return 'notification-icon-wrapper-read';
                  if (notification.type === 'lead') return 'notification-icon-wrapper-lead';
                  if (notification.type === 'customer') return 'notification-icon-wrapper-customer';
                  if (notification.type === 'payment') return 'notification-icon-wrapper-payment';
                  if (notification.type === 'reminder') return 'notification-icon-wrapper-reminder';
                  return 'notification-icon-wrapper-read';
                };
                
                const getActionButtonClass = () => {
                  if (notification.type === 'lead') return 'action-button-green';
                  if (notification.type === 'customer') return 'action-button-amber';
                  if (notification.type === 'payment') return 'action-button-emerald';
                  if (notification.type === 'reminder') return 'action-button-purple';
                  return 'action-button-emerald';
                };
                
                return (
                  <div
                    key={notification.id}
                    className="notification-item"
                    onClick={() => {
                      setNotifications(notifications.map(n => 
                        n.id === notification.id ? { ...n, read: true } : n
                      ));
                    }}
                  >
                    {/* Green circle icon on far left */}
                    <div className={`notification-indicator ${!notification.read ? 'notification-indicator-unread' : ''}`}></div>
                    
                    <div className={`notification-icon-wrapper ${getNotificationIconClass()}`}>
                      <Icon className="notification-icon" />
                    </div>
                    <div className="notification-content">
                      <p className={`notification-message ${notification.read ? 'notification-message-read' : 'notification-message-unread'}`}>
                        {notification.message}
                      </p>
                      <p className="notification-time">{notification.time}</p>
                    </div>
                    
                    {/* Action button matching retracted lead row style */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle action button click
                      }}
                      className={`action-button ${getActionButtonClass()}`}
                      title={actionLabel}
                      aria-label={actionLabel}
                    >
                      {actionLabel}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      
      {/* Week of Section */}
      {(() => {
        // Get selected week (Sunday to Saturday)
        const startOfWeek = new Date(dashboardWeek);
        startOfWeek.setHours(0, 0, 0, 0);
        
        const weekDays = [];
        const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        for (let i = 0; i < 7; i++) {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + i);
          const dateStr = date.toISOString().split('T')[0];
          const dayJobs = getJobsForDate ? getJobsForDate(date) : [];
          const isToday = dateStr === new Date().toISOString().split('T')[0];
          
          weekDays.push({
            date,
            dateStr,
            dayName: weekDayNames[i],
            dayNumber: date.getDate(),
            jobs: dayJobs,
            isToday
          });
        }
        
        const weekStartStr = startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const weekEndStr = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        // Check if current week
        const today = new Date();
        const currentWeekStart = new Date(today);
        currentWeekStart.setDate(today.getDate() - today.getDay());
        currentWeekStart.setHours(0, 0, 0, 0);
        const isCurrentWeek = startOfWeek.getTime() === currentWeekStart.getTime();
        
        const getJobStatusClass = (status) => {
          if (status === 'completed') return 'week-job-completed';
          if (status === 'in-progress') return 'week-job-in-progress';
          if (status === 'cancelled') return 'week-job-cancelled';
          return 'week-job-scheduled';
        };
        
        return (
          <div className="week-section">
            <div className="week-header">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <button
                  onClick={() => navigateDashboardWeek(-1)}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                  title="Previous Week"
                >
                  <ChevronLeft style={{ width: '1.25rem', height: '1.25rem', color: '#4b5563' }} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h3 className="week-title">Week of {weekStartStr} - {weekEndStr}</h3>
                  {isCurrentWeek && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '0.375rem'
                    }}>
                      Current Week
                    </span>
                  )}
                </div>
                <button
                  onClick={() => navigateDashboardWeek(1)}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                  title="Next Week"
                >
                  <ChevronRight style={{ width: '1.25rem', height: '1.25rem', color: '#4b5563' }} />
                </button>
              </div>
            </div>
            <div className="week-content">
              <div className="week-grid">
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`week-day ${day.isToday ? 'week-day-today' : 'week-day-other'}`}
                  >
                    <div className="week-day-header">
                      <div className={`week-day-number ${day.isToday ? 'week-day-number-today' : 'week-day-number-other'}`}>
                        {day.dayNumber}
                      </div>
                      <div className={`week-day-name ${day.isToday ? 'week-day-name-today' : 'week-day-name-other'}`}>
                        {day.dayName}
                      </div>
                    </div>
                    <div className="week-day-jobs">
                      {day.jobs.length === 0 ? (
                        <div className="week-day-empty">No jobs</div>
                      ) : (
                        <>
                          {day.jobs.slice(0, 3).map(job => (
                            <div
                              key={job.id}
                              className={`week-job-item ${getJobStatusClass(job.status)}`}
                              title={`${job.customerName} - ${job.service}${job.time ? ` at ${job.time}` : ''}`}
                            >
                              {job.time && <span className="week-job-time">{job.time} </span>}
                              {job.customerName}
                            </div>
                          ))}
                          {day.jobs.length > 3 && (
                            <div className="week-job-more">
                              +{day.jobs.length - 3} more
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Dashboard;

