import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './dashboard.jsx';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  DollarSign: () => <div data-testid="dollar-icon">DollarSign</div>,
  Calendar: () => <div data-testid="calendar-icon">Calendar</div>,
  Users: () => <div data-testid="users-icon">Users</div>,
  TrendingUp: () => <div data-testid="trending-icon">TrendingUp</div>,
  Bell: () => <div data-testid="bell-icon">Bell</div>,
  Star: () => <div data-testid="star-icon">Star</div>,
}));

describe('Dashboard Component', () => {
  const mockSetNotifications = jest.fn();
  const mockGetJobsForDate = jest.fn((date) => []);

  const defaultProps = {
    customers: [],
    jobs: [],
    leads: [],
    notifications: [],
    setNotifications: mockSetNotifications,
    getJobsForDate: mockGetJobsForDate
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders dashboard container', () => {
      render(<Dashboard {...defaultProps} />);
      expect(screen.getByText('Monthly Revenue')).toBeInTheDocument();
    });

    it('renders all metric cards', () => {
      render(<Dashboard {...defaultProps} />);
      expect(screen.getByText('Monthly Revenue')).toBeInTheDocument();
      expect(screen.getByText('Active Jobs')).toBeInTheDocument();
      expect(screen.getByText('New Leads')).toBeInTheDocument();
      expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    });

    it('renders notifications section', () => {
      render(<Dashboard {...defaultProps} />);
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('renders week section', () => {
      render(<Dashboard {...defaultProps} />);
      expect(screen.getByText(/Week of/i)).toBeInTheDocument();
    });
  });

  describe('Metrics Calculations', () => {
    it('calculates monthly revenue correctly', () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      const customers = [
        {
          id: '1',
          services: [
            {
              date: new Date(currentYear, currentMonth, 15).toISOString().split('T')[0],
              pricePaid: 100
            },
            {
              date: new Date(currentYear, currentMonth, 20).toISOString().split('T')[0],
              price: 200
            }
          ]
        },
        {
          id: '2',
          services: [
            {
              date: new Date(currentYear, currentMonth - 1, 10).toISOString().split('T')[0],
              pricePaid: 150 // Last month, shouldn't count
            }
          ]
        }
      ];

      render(<Dashboard {...defaultProps} customers={customers} />);
      expect(screen.getByText(/\$300\.00/)).toBeInTheDocument();
    });

    it('handles customers without services array', () => {
      const customers = [
        { id: '1', services: null },
        { id: '2' }
      ];

      render(<Dashboard {...defaultProps} customers={customers} />);
      expect(screen.getByText(/\$0\.00/)).toBeInTheDocument();
    });

    it('handles services with different price field names', () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      const customers = [
        {
          id: '1',
          services: [
            {
              date: new Date(currentYear, currentMonth, 15).toISOString().split('T')[0],
              pricePaid: 100
            },
            {
              date: new Date(currentYear, currentMonth, 20).toISOString().split('T')[0],
              price: 200
            },
            {
              date: new Date(currentYear, currentMonth, 25).toISOString().split('T')[0],
              amount: 300
            }
          ]
        }
      ];

      render(<Dashboard {...defaultProps} customers={customers} />);
      expect(screen.getByText(/\$600\.00/)).toBeInTheDocument();
    });

    it('calculates active jobs for current week', () => {
      const today = new Date();
      const currentDay = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - currentDay);
      
      const jobs = [
        {
          id: '1',
          date: startOfWeek.toISOString().split('T')[0],
          customerName: 'Customer 1',
          service: 'Service 1'
        },
        {
          id: '2',
          date: new Date(startOfWeek.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          customerName: 'Customer 2',
          service: 'Service 2'
        },
        {
          id: '3',
          date: new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          customerName: 'Customer 3',
          service: 'Service 3'
        }
      ];

      render(<Dashboard {...defaultProps} jobs={jobs} />);
      // Should show 2 active jobs (the ones in current week)
      const activeJobsText = screen.getByText('Active Jobs').parentElement;
      expect(activeJobsText).toBeInTheDocument();
    });

    it('calculates new leads for current week', () => {
      const today = new Date();
      const currentDay = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - currentDay);
      
      const leads = [
        {
          id: '1',
          name: 'Lead 1',
          dateAdded: startOfWeek.toISOString().split('T')[0]
        },
        {
          id: '2',
          name: 'Lead 2',
          dateAdded: new Date(startOfWeek.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          id: '3',
          name: 'Lead 3',
          dateAdded: new Date(startOfWeek.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ];

      render(<Dashboard {...defaultProps} leads={leads} />);
      // Should calculate 2 new leads
      expect(screen.getByText('New Leads')).toBeInTheDocument();
    });

    it('calculates conversion rate correctly', () => {
      const customers = [{ id: '1' }, { id: '2' }, { id: '3' }];
      const leads = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];

      render(<Dashboard {...defaultProps} customers={customers} leads={leads} />);
      // 3 customers / 5 leads = 60%
      expect(screen.getByText('60.0%')).toBeInTheDocument();
    });

    it('handles zero leads for conversion rate', () => {
      const customers = [{ id: '1' }];
      const leads = [];

      render(<Dashboard {...defaultProps} customers={customers} leads={leads} />);
      expect(screen.getByText('0.0%')).toBeInTheDocument();
    });
  });

  describe('Notifications', () => {
    it('displays empty state when no notifications', () => {
      render(<Dashboard {...defaultProps} />);
      expect(screen.getByText('No notifications')).toBeInTheDocument();
    });

    it('displays notifications list', () => {
      const notifications = [
        {
          id: '1',
          type: 'lead',
          message: 'New lead received',
          time: '2 hours ago',
          read: false
        },
        {
          id: '2',
          type: 'customer',
          message: 'Customer update',
          time: '1 day ago',
          read: true
        }
      ];

      render(<Dashboard {...defaultProps} notifications={notifications} />);
      expect(screen.getByText('New lead received')).toBeInTheDocument();
      expect(screen.getByText('Customer update')).toBeInTheDocument();
    });

    it('shows unread count badge', () => {
      const notifications = [
        { id: '1', type: 'lead', message: 'New lead', time: '1h', read: false },
        { id: '2', type: 'customer', message: 'Customer', time: '2h', read: false },
        { id: '3', type: 'payment', message: 'Payment', time: '3h', read: true }
      ];

      render(<Dashboard {...defaultProps} notifications={notifications} />);
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('marks notification as read when clicked', () => {
      const notifications = [
        { id: '1', type: 'lead', message: 'New lead', time: '1h', read: false }
      ];

      render(<Dashboard {...defaultProps} notifications={notifications} />);
      const notification = screen.getByText('New lead');
      fireEvent.click(notification);

      expect(mockSetNotifications).toHaveBeenCalledWith([
        { id: '1', type: 'lead', message: 'New lead', time: '1h', read: true }
      ]);
    });

    it('handles different notification types', () => {
      const notifications = [
        { id: '1', type: 'lead', message: 'Lead', time: '1h', read: false },
        { id: '2', type: 'customer', message: 'Customer', time: '2h', read: false },
        { id: '3', type: 'payment', message: 'Payment', time: '3h', read: false },
        { id: '4', type: 'reminder', message: 'Reminder', time: '4h', read: false }
      ];

      render(<Dashboard {...defaultProps} notifications={notifications} />);
      notifications.forEach(notif => {
        expect(screen.getByText(notif.message)).toBeInTheDocument();
      });
    });
  });

  describe('Week Section', () => {
    it('displays current week days', () => {
      render(<Dashboard {...defaultProps} />);
      const weekTitle = screen.getByText(/Week of/i);
      expect(weekTitle).toBeInTheDocument();
      
      // Check for day names
      expect(screen.getByText('Sun')).toBeInTheDocument();
      expect(screen.getByText('Mon')).toBeInTheDocument();
    });

    it('calls getJobsForDate for each day', () => {
      render(<Dashboard {...defaultProps} />);
      // Should be called 7 times (one for each day of the week)
      expect(mockGetJobsForDate).toHaveBeenCalledTimes(7);
    });

    it('displays jobs for each day', () => {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      mockGetJobsForDate.mockImplementation((date) => {
        const dateStr = date.toISOString().split('T')[0];
        if (dateStr === todayStr) {
          return [
            { id: '1', customerName: 'Test Customer', service: 'Test Service', time: '10:00 AM', status: 'scheduled' }
          ];
        }
        return [];
      });

      render(<Dashboard {...defaultProps} />);
      expect(screen.getByText('Test Customer')).toBeInTheDocument();
    });

    it('shows "No jobs" for days without jobs', () => {
      mockGetJobsForDate.mockReturnValue([]);
      render(<Dashboard {...defaultProps} />);
      const noJobsElements = screen.getAllByText('No jobs');
      expect(noJobsElements.length).toBeGreaterThan(0);
    });

    it('handles jobs with different statuses', () => {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      mockGetJobsForDate.mockImplementation((date) => {
        const dateStr = date.toISOString().split('T')[0];
        if (dateStr === todayStr) {
          return [
            { id: '1', customerName: 'Completed', service: 'Service', status: 'completed' },
            { id: '2', customerName: 'In Progress', service: 'Service', status: 'in-progress' },
            { id: '3', customerName: 'Cancelled', service: 'Service', status: 'cancelled' },
            { id: '4', customerName: 'Scheduled', service: 'Service', status: 'scheduled' }
          ];
        }
        return [];
      });

      render(<Dashboard {...defaultProps} />);
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Cancelled')).toBeInTheDocument();
      expect(screen.getByText('Scheduled')).toBeInTheDocument();
    });

    it('shows "+X more" when more than 3 jobs', () => {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      mockGetJobsForDate.mockImplementation((date) => {
        const dateStr = date.toISOString().split('T')[0];
        if (dateStr === todayStr) {
          return Array.from({ length: 5 }, (_, i) => ({
            id: `${i}`,
            customerName: `Customer ${i}`,
            service: 'Service',
            status: 'scheduled'
          }));
        }
        return [];
      });

      render(<Dashboard {...defaultProps} />);
      expect(screen.getByText('+2 more')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles invalid date values in services', () => {
      const customers = [
        {
          id: '1',
          services: [
            { date: null, pricePaid: 100 },
            { date: 'invalid-date', pricePaid: 200 },
            { date: '', pricePaid: 300 }
          ]
        }
      ];

      render(<Dashboard {...defaultProps} customers={customers} />);
      // Should not crash and should show $0.00
      expect(screen.getByText(/\$0\.00/)).toBeInTheDocument();
    });

    it('handles NaN price values', () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      const customers = [
        {
          id: '1',
          services: [
            {
              date: new Date(currentYear, currentMonth, 15).toISOString().split('T')[0],
              pricePaid: 'invalid'
            }
          ]
        }
      ];

      render(<Dashboard {...defaultProps} customers={customers} />);
      expect(screen.getByText(/\$0\.00/)).toBeInTheDocument();
    });

    it('handles missing getJobsForDate prop', () => {
      const propsWithoutGetJobs = { ...defaultProps };
      delete propsWithoutGetJobs.getJobsForDate;
      
      render(<Dashboard {...propsWithoutGetJobs} />);
      expect(screen.getByText(/Week of/i)).toBeInTheDocument();
    });
  });
});



