import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Edit2, Trash2, ChevronDown } from 'lucide-react';
import './calendar.css';

const Calendar = ({ 
  setModalType, 
  setIsModalOpen, 
  setEditingItem, 
  setDeleteConfirm,
  openJobDetailModal 
}) => {
  const [jobs, setJobs] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAvailabilityCollapsed, setIsAvailabilityCollapsed] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    return startOfWeek.toISOString().split('T')[0];
  });
  const [weeklyAvailability, setWeeklyAvailability] = useState({});
  const [currentWeekHours, setCurrentWeekHours] = useState(() => {
    const defaultHours = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day, idx) => ({
      day,
      enabled: idx < 6,
      startTime: idx === 6 ? '09:00' : '08:00',
      endTime: idx === 6 ? '14:00' : '18:00'
    }));
    return defaultHours;
  });

  // Load week hours when selected week changes
  useEffect(() => {
    if (weeklyAvailability[selectedWeek]) {
      setCurrentWeekHours(weeklyAvailability[selectedWeek]);
    } else {
      const defaultHours = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day, idx) => ({
        day,
        enabled: idx < 6,
        startTime: idx === 6 ? '09:00' : '08:00',
        endTime: idx === 6 ? '14:00' : '18:00'
      }));
      setCurrentWeekHours(defaultHours);
    }
  }, [selectedWeek, weeklyAvailability]);

  // Calendar and Job Functions
  const addJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      ...jobData,
      createdAt: new Date().toISOString()
    };
    setJobs([...jobs, newJob]);
  };

  const updateJob = (id, updatedData) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updatedData } : job));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const getJobsForDate = (date) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    return jobs.filter(job => job.date === dateStr);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const navigateWeek = (direction) => {
    const currentWeekStart = new Date(selectedWeek);
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    const newWeekStr = newWeekStart.toISOString().split('T')[0];
    setSelectedWeek(newWeekStr);
    // useEffect will handle loading the hours for the new week
  };

  const handleWeekHoursChange = (dayIndex, field, value) => {
    const updatedHours = [...currentWeekHours];
    if (field === 'enabled') {
      updatedHours[dayIndex].enabled = value;
    } else {
      updatedHours[dayIndex][field] = value;
    }
    setCurrentWeekHours(updatedHours);
  };

  const saveWeekHours = () => {
    setWeeklyAvailability(prev => ({
      ...prev,
      [selectedWeek]: [...currentWeekHours]
    }));
    // You could add a toast notification here
    console.log('Week hours saved for', selectedWeek);
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div>
          <h2 className="calendar-title">Job Calendar</h2>
        </div>
        <div className="add-job-button">
          <button
            onClick={() => {
              setModalType('addJob');
              setIsModalOpen(true);
            }}
            className="add-job-button-inner"
          >
            <Plus className="add-job-icon" />
            <span>Add Job</span>
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="calendar-controls">
        <div className="month-navigation">
          <div className="month-nav-controls">
            <button
              onClick={() => navigateMonth(-1)}
              className="month-nav-button"
            >
              <ChevronLeft className="month-nav-icon" />
            </button>
            <h3 className="month-title">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => navigateMonth(1)}
              className="month-nav-button"
            >
              <ChevronRight className="month-nav-icon" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {(() => {
            const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
            const days = [];
            
            // Empty cells for days before month starts
            for (let i = 0; i < startingDayOfWeek; i++) {
              days.push(
                <div key={`empty-${i}`} className="calendar-day calendar-day-empty"></div>
              );
            }

            // Days of the month
            for (let day = 1; day <= daysInMonth; day++) {
              const date = new Date(year, month, day);
              const dateStr = date.toISOString().split('T')[0];
              const dayJobs = getJobsForDate(date);
              const isToday = dateStr === new Date().toISOString().split('T')[0];
              const isSelected = selectedDate && dateStr === new Date(selectedDate).toISOString().split('T')[0];

              const getDayClass = () => {
                if (isToday) return 'calendar-day calendar-day-today';
                if (isSelected) return 'calendar-day calendar-day-selected';
                return 'calendar-day calendar-day-normal';
              };
              
              const getDayNumberClass = () => {
                if (isToday) return 'day-number day-number-today';
                if (isSelected) return 'day-number day-number-selected';
                return 'day-number day-number-normal';
              };
              
              const getJobStatusClass = (status) => {
                if (status === 'completed') return 'job-item job-item-completed';
                if (status === 'in-progress') return 'job-item job-item-in-progress';
                if (status === 'cancelled') return 'job-item job-item-cancelled';
                return 'job-item job-item-scheduled';
              };
              
              days.push(
                <div
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className={getDayClass()}
                >
                  <div className={getDayNumberClass()}>
                    {day}
                  </div>
                  <div className="day-jobs">
                    {dayJobs.slice(0, 3).map(job => (
                      <div
                        key={job.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (openJobDetailModal) {
                            openJobDetailModal(job);
                          }
                        }}
                        className={`${getJobStatusClass(job.status)}`}
                        title={`${job.customerName} - ${job.service}`}
                      >
                        <span className="job-time">{job.time}</span> {job.customerName}
                      </div>
                    ))}
                    {dayJobs.length > 3 && (
                      <div className="job-more">
                        +{dayJobs.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return days;
          })()}
        </div>
      </div>

      {/* Availability Settings */}
      <div className="availability-section">
        <div className="availability-header">
          <div className="availability-title-section">
            <h3 className="availability-title">Adjust Availability</h3>
            <p className="availability-note">Note: Default hours are set in the My Business tab</p>
          </div>
          <button
            onClick={() => setIsAvailabilityCollapsed(!isAvailabilityCollapsed)}
            className="availability-toggle"
            aria-label={isAvailabilityCollapsed ? "Expand availability" : "Collapse availability"}
          >
            <ChevronDown 
              className={`availability-chevron ${isAvailabilityCollapsed ? '' : 'availability-chevron-expanded'}`}
            />
          </button>
        </div>

        {!isAvailabilityCollapsed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Week Selection with Navigation */}
          <div className="week-selection">
            <div className="week-nav">
              <button
                onClick={() => navigateWeek(-1)}
                className="week-nav-button"
                title="Previous Week"
              >
                <ChevronLeft className="week-nav-icon" />
              </button>
              <div className="week-label">
                <p className="week-text">
                  {(() => {
                    const weekStart = new Date(selectedWeek);
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);
                    return `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
                  })()}
                </p>
                {(() => {
                  const today = new Date();
                  const currentWeekStart = new Date(today);
                  currentWeekStart.setDate(today.getDate() - today.getDay());
                  const currentWeekStr = currentWeekStart.toISOString().split('T')[0];
                  const isCurrentWeek = selectedWeek === currentWeekStr;
                  return isCurrentWeek ? (
                    <span className="week-badge">
                      Current Week
                    </span>
                  ) : null;
                })()}
              </div>
              <button
                onClick={() => navigateWeek(1)}
                className="week-nav-button"
                title="Next Week"
              >
                <ChevronRight className="week-nav-icon" />
              </button>
            </div>
          </div>

          <div className="weekly-hours-grid">
            <div className="hours-panel">
              <div className="panel-header">
                <div className="panel-indicator"></div>
                <h4 className="panel-title">Weekly Hours</h4>
              </div>
            <div className="hours-list">
              {currentWeekHours.map((dayHours, idx) => (
                <div key={dayHours.day} className="hour-item">
                  <div className="hour-item-left">
                    <input 
                      type="checkbox" 
                      checked={dayHours.enabled}
                      onChange={(e) => handleWeekHoursChange(idx, 'enabled', e.target.checked)}
                      className="hour-checkbox" 
                    />
                    <span className="hour-day-name">{dayHours.day}</span>
                  </div>
                  <div className="hour-item-right">
                    <input 
                      type="time" 
                      value={dayHours.startTime}
                      onChange={(e) => handleWeekHoursChange(idx, 'startTime', e.target.value)}
                      disabled={!dayHours.enabled}
                      className="hour-time-input" 
                    />
                    <span className="hour-separator">to</span>
                    <input 
                      type="time" 
                      value={dayHours.endTime}
                      onChange={(e) => handleWeekHoursChange(idx, 'endTime', e.target.value)}
                      disabled={!dayHours.enabled}
                      className="hour-time-input" 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgb(226 232 240)' }}>
              <button
                onClick={saveWeekHours}
                className="save-week-button"
              >
                Save Week
              </button>
            </div>
          </div>

          <div className="hours-panel">
            <div className="panel-header">
              <div className="panel-indicator"></div>
              <h4 className="panel-title">Job Capacity</h4>
            </div>
            <div className="capacity-field">
              <label className="capacity-label">Max jobs per day</label>
              <input type="number" defaultValue={6} className="capacity-input" />
            </div>
            <div className="capacity-toggle-container">
              <div className="capacity-toggle-label">
                <p className="capacity-toggle-title">Auto-open cancellations</p>
                <p className="capacity-toggle-description">Automatically offer freed slots to waitlisted customers.</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked className="toggle-input" />
                <div className="toggle-slider"></div>
              </label>
            </div>
          </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;

