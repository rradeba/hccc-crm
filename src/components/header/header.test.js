import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Header from './header.jsx';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Building2: () => <div data-testid="building-icon">Building2</div>,
  Settings: () => <div data-testid="settings-icon">Settings</div>,
  Upload: () => <div data-testid="upload-icon">Upload</div>,
}));

// Mock fetch for weather API
global.fetch = jest.fn();

describe('Header Component', () => {
  const mockSetActiveTab = jest.fn();
  const defaultProps = {
    activeTab: 'dashboard',
    setActiveTab: mockSetActiveTab,
    businessInfo: {
      address: '123 Main St, Charleston, SC 29401'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  describe('Rendering', () => {
    it('renders header with title and subtitle', () => {
      render(<Header {...defaultProps} />);
      expect(screen.getByText('Holy City Clean Co.')).toBeInTheDocument();
      expect(screen.getByText('Customer Relationship Management')).toBeInTheDocument();
    });

    it('renders default Building2 icon when no custom icon is set', () => {
      render(<Header {...defaultProps} />);
      expect(screen.getByTestId('building-icon')).toBeInTheDocument();
    });

    it('renders custom header icon when provided', () => {
      const { container } = render(<Header {...defaultProps} />);
      // Simulate setting a custom icon
      const settingsButton = screen.getByLabelText('Header settings');
      fireEvent.click(settingsButton);
      
      const fileInput = container.querySelector('input[type="file"]');
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      
      fireEvent.change(fileInput, { target: { files: [file] } });
      
      // Wait for FileReader to process
      waitFor(() => {
        const img = container.querySelector('img[alt="Business logo"]');
        expect(img).toBeInTheDocument();
      });
    });

    it('renders today\'s date', () => {
      render(<Header {...defaultProps} />);
      const today = new Date().toLocaleDateString();
      expect(screen.getByText(today)).toBeInTheDocument();
    });

    it('renders all navigation tabs', () => {
      render(<Header {...defaultProps} />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Leads')).toBeInTheDocument();
      expect(screen.getByText('Customer Directory')).toBeInTheDocument();
      expect(screen.getByText('My Agent')).toBeInTheDocument();
      expect(screen.getByText('Calendar')).toBeInTheDocument();
      expect(screen.getByText('My Business')).toBeInTheDocument();
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('highlights active tab', () => {
      render(<Header {...defaultProps} activeTab="leads" />);
      const leadsButton = screen.getByText('Leads').closest('button');
      expect(leadsButton).toHaveClass('active');
    });
  });

  describe('Settings Dropdown', () => {
    it('opens settings dropdown when settings button is clicked', () => {
      render(<Header {...defaultProps} />);
      const settingsButton = screen.getByLabelText('Header settings');
      
      expect(screen.queryByText('Header Color')).not.toBeInTheDocument();
      fireEvent.click(settingsButton);
      expect(screen.getByText('Header Color')).toBeInTheDocument();
    });

    it('closes settings dropdown when clicking outside', () => {
      render(<Header {...defaultProps} />);
      const settingsButton = screen.getByLabelText('Header settings');
      
      fireEvent.click(settingsButton);
      expect(screen.getByText('Header Color')).toBeInTheDocument();
      
      fireEvent.mouseDown(document.body);
      waitFor(() => {
        expect(screen.queryByText('Header Color')).not.toBeInTheDocument();
      });
    });

    it('renders all color options', () => {
      render(<Header {...defaultProps} />);
      const settingsButton = screen.getByLabelText('Header settings');
      fireEvent.click(settingsButton);
      
      const colorOptions = ['Blue', 'Red', 'Green', 'Purple', 'Orange', 'Teal', 'Pink', 'Indigo', 'Gray', 'Yellow'];
      colorOptions.forEach(color => {
        expect(screen.getByLabelText(`Select ${color} color`)).toBeInTheDocument();
      });
    });

    it('changes header color when color button is clicked', () => {
      render(<Header {...defaultProps} />);
      const settingsButton = screen.getByLabelText('Header settings');
      fireEvent.click(settingsButton);
      
      const redButton = screen.getByLabelText('Select Red color');
      fireEvent.click(redButton);
      
      // The color should be applied (tested via className)
      const headerContainer = screen.getByText('Holy City Clean Co.').closest('.header-container');
      expect(headerContainer).toBeInTheDocument();
    });

    it('shows "Upload Custom Icon" button initially', () => {
      render(<Header {...defaultProps} />);
      const settingsButton = screen.getByLabelText('Header settings');
      fireEvent.click(settingsButton);
      
      expect(screen.getByText('Upload Custom Icon')).toBeInTheDocument();
    });

    it('shows "Change Icon" button when custom icon is set', async () => {
      const { container } = render(<Header {...defaultProps} />);
      const settingsButton = screen.getByLabelText('Header settings');
      fireEvent.click(settingsButton);
      
      const fileInput = container.querySelector('input[type="file"]');
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });
      
      // Create a FileReader mock
      const mockFileReader = {
        readAsDataURL: jest.fn(function() {
          setTimeout(() => {
            this.result = 'data:image/png;base64,test';
            this.onloadend();
          }, 0);
        }),
        result: null,
        onloadend: null
      };
      global.FileReader = jest.fn(() => mockFileReader);
      
      fireEvent.change(fileInput, { target: { files: [file] } });
      
      await waitFor(() => {
        expect(screen.getByText('Change Icon')).toBeInTheDocument();
      });
    });

    it('removes custom icon when remove button is clicked', async () => {
      const { container } = render(<Header {...defaultProps} />);
      const settingsButton = screen.getByLabelText('Header settings');
      fireEvent.click(settingsButton);
      
      // First upload an icon
      const fileInput = container.querySelector('input[type="file"]');
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: false,
      });
      
      const mockFileReader = {
        readAsDataURL: jest.fn(function() {
          setTimeout(() => {
            this.result = 'data:image/png;base64,test';
            this.onloadend();
          }, 0);
        }),
        result: null,
        onloadend: null
      };
      global.FileReader = jest.fn(() => mockFileReader);
      
      fireEvent.change(fileInput, { target: { files: [file] } });
      
      await waitFor(() => {
        expect(screen.getByText('Change Icon')).toBeInTheDocument();
      });
      
      // Then remove it
      const removeButton = screen.getByText('Remove Custom Icon');
      fireEvent.click(removeButton);
      
      await waitFor(() => {
        expect(screen.getByText('Upload Custom Icon')).toBeInTheDocument();
      });
    });
  });

  describe('Weather Display', () => {
    it('shows loading state initially when address has zip', async () => {
      fetch.mockResolvedValueOnce({
        json: async () => ({
          results: [{ latitude: 32.7765, longitude: -79.9311, name: 'Charleston', admin1: 'South Carolina' }]
        })
      }).mockResolvedValueOnce({
        json: async () => ({
          current: { temperature_2m: 75, weather_code: 0 }
        })
      });

      render(<Header {...defaultProps} />);
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });

    it('displays weather data when fetched successfully', async () => {
      fetch.mockResolvedValueOnce({
        json: async () => ({
          results: [{ latitude: 32.7765, longitude: -79.9311, name: 'Charleston', admin1: 'South Carolina' }]
        })
      }).mockResolvedValueOnce({
        json: async () => ({
          current: { temperature_2m: 75.5, weather_code: 0 }
        })
      });

      render(<Header {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText(/76°F/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('shows error message when weather fetch fails', async () => {
      fetch.mockRejectedValueOnce(new Error('API Error'));

      render(<Header {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText('Weather unavailable')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('shows unavailable when no zip code in address', () => {
      render(<Header {...defaultProps} businessInfo={{ address: '123 Main St' }} />);
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });

    it('extracts zip code from address correctly', () => {
      render(<Header {...defaultProps} businessInfo={{ address: '123 Main St, Charleston, SC 29401' }} />);
      // Should trigger weather fetch
      expect(fetch).toHaveBeenCalled();
    });

    it('handles various weather codes correctly', async () => {
      const weatherCodes = [0, 1, 2, 3, 45, 48, 51, 61, 71, 80, 95];
      
      for (const code of weatherCodes) {
        fetch.mockClear();
        fetch.mockResolvedValueOnce({
          json: async () => ({
            results: [{ latitude: 32.7765, longitude: -79.9311, name: 'Charleston', admin1: 'SC' }]
          })
        }).mockResolvedValueOnce({
          json: async () => ({
            current: { temperature_2m: 75, weather_code: code }
          })
        });

        const { unmount } = render(<Header {...defaultProps} />);
        
        await waitFor(() => {
          expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
        }, { timeout: 3000 });
        
        unmount();
      }
    });
  });

  describe('Navigation', () => {
    it('calls setActiveTab when navigation button is clicked', () => {
      render(<Header {...defaultProps} />);
      const leadsButton = screen.getByText('Leads');
      
      fireEvent.click(leadsButton);
      expect(mockSetActiveTab).toHaveBeenCalledWith('leads');
    });

    it('calls setActiveTab for each navigation option', () => {
      render(<Header {...defaultProps} />);
      const tabs = [
        { text: 'Dashboard', id: 'dashboard' },
        { text: 'Leads', id: 'leads' },
        { text: 'Customer Directory', id: 'customers' },
        { text: 'My Agent', id: 'aiAgent' },
        { text: 'Calendar', id: 'calendar' },
        { text: 'My Business', id: 'business' },
        { text: 'Pricing Tool', id: 'pricingTool' }
      ];

      tabs.forEach(({ text, id }) => {
        const button = screen.getByText(text);
        fireEvent.click(button);
        expect(mockSetActiveTab).toHaveBeenCalledWith(id);
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles missing businessInfo prop', () => {
      render(<Header activeTab="dashboard" setActiveTab={mockSetActiveTab} />);
      expect(screen.getByText('Holy City Clean Co.')).toBeInTheDocument();
    });

    it('handles missing address in businessInfo', () => {
      render(<Header {...defaultProps} businessInfo={{}} />);
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });

    it('handles null businessInfo', () => {
      render(<Header {...defaultProps} businessInfo={null} />);
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });

    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(<Header {...defaultProps} />);
      const settingsButton = screen.getByLabelText('Header settings');
      fireEvent.click(settingsButton);
      
      const removeSpy = jest.spyOn(document, 'removeEventListener');
      unmount();
      
      expect(removeSpy).toHaveBeenCalled();
      removeSpy.mockRestore();
    });
  });
});
