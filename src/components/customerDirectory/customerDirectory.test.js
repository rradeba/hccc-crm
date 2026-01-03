import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CustomerDirectory from './customerDirectory.jsx';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon">Search</div>,
  Plus: () => <div data-testid="plus-icon">Plus</div>,
  ChevronDown: () => <div data-testid="chevron-down-icon">ChevronDown</div>,
  Edit3: () => <div data-testid="edit-icon">Edit3</div>,
  Calendar: () => <div data-testid="calendar-icon">Calendar</div>,
  FileText: () => <div data-testid="file-text-icon">FileText</div>,
  FileSignature: () => <div data-testid="file-signature-icon">FileSignature</div>,
  Receipt: () => <div data-testid="receipt-icon">Receipt</div>,
  ArrowUp: () => <div data-testid="arrow-up-icon">ArrowUp</div>,
  ArrowDown: () => <div data-testid="arrow-down-icon">ArrowDown</div>,
}));

// Mock alert
global.alert = jest.fn();

describe('CustomerDirectory Component', () => {
  const mockSetCustomers = jest.fn();
  const mockOpenModal = jest.fn();
  const mockSetSearchTerm = jest.fn();

  const defaultProps = {
    customers: [],
    setCustomers: mockSetCustomers,
    openModal: mockOpenModal,
    searchTerm: '',
    setSearchTerm: mockSetSearchTerm
  };

  const sampleCustomers = [
    {
      id: '1',
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '555-0100',
      address: '123 Main St, Charleston, SC 29401',
      totalSpent: 500,
      serviceCount: 2,
      lastService: '2025-01-10',
      rating: 5,
      services: [
        {
          type: 'Home/Business Exterior',
          date: '2025-01-10',
          pricePaid: 300
        },
        {
          type: 'Concrete Pressure Washing',
          date: '2024-12-15',
          price: 200
        }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '555-0200',
      address: '456 Oak Ave, Mount Pleasant, SC 29464',
      totalSpent: 750,
      serviceCount: 3,
      lastService: '2025-01-08',
      rating: 4,
      services: [
        {
          type: 'Deck/Fence Cleaning',
          date: '2025-01-08',
          amount: 250
        }
      ]
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders component with title', () => {
      render(<CustomerDirectory {...defaultProps} />);
      expect(screen.getByText('Customer Management')).toBeInTheDocument();
    });

    it('renders Add Customer button', () => {
      render(<CustomerDirectory {...defaultProps} />);
      const addButton = screen.getByText('Add Customer');
      expect(addButton).toBeInTheDocument();
    });

    it('renders search input', () => {
      render(<CustomerDirectory {...defaultProps} />);
      expect(screen.getByPlaceholderText('Search customers...')).toBeInTheDocument();
    });

    it('renders sort controls', () => {
      render(<CustomerDirectory {...defaultProps} />);
      expect(screen.getByDisplayValue('Name')).toBeInTheDocument();
    });

    it('displays customers when provided', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('filters customers by name', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} searchTerm="John" />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('filters customers by first name', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} searchTerm="Jane" />);
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('filters customers by last name', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} searchTerm="Smith" />);
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('filters customers by email', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} searchTerm="john@example.com" />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('filters customers by address', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} searchTerm="Charleston" />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('calls setSearchTerm when search input changes', async () => {
      const user = userEvent.setup();
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const searchInput = screen.getByPlaceholderText('Search customers...');
      
      await user.type(searchInput, 'test');
      expect(mockSetSearchTerm).toHaveBeenCalled();
    });
  });

  describe('Sorting Functionality', () => {
    it('sorts customers by name ascending', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const customers = screen.getAllByText(/John Doe|Jane Smith/);
      // Jane should come before John alphabetically
      expect(customers[0].textContent).toBe('Jane Smith');
    });

    it('sorts customers by name descending', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const sortOrderButton = screen.getByTitle('Ascending');
      fireEvent.click(sortOrderButton);
      
      const customers = screen.getAllByText(/John Doe|Jane Smith/);
      // John should come before Jane in descending order
      expect(customers[0].textContent).toBe('John Doe');
    });

    it('changes sort field when select changes', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const sortSelect = screen.getByDisplayValue('Name');
      
      fireEvent.change(sortSelect, { target: { value: 'totalSpent' } });
      // Should re-render with new sort
      expect(sortSelect.value).toBe('totalSpent');
    });

    it('sorts by totalSpent', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const sortSelect = screen.getByDisplayValue('Name');
      fireEvent.change(sortSelect, { target: { value: 'totalSpent' } });
      
      const customers = screen.getAllByText(/John Doe|Jane Smith/);
      // Jane has higher totalSpent (750 > 500)
      expect(customers[0].textContent).toBe('Jane Smith');
    });

    it('sorts by serviceCount', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const sortSelect = screen.getByDisplayValue('Name');
      fireEvent.change(sortSelect, { target: { value: 'serviceCount' } });
      
      const customers = screen.getAllByText(/John Doe|Jane Smith/);
      // Jane has more services (3 > 2)
      expect(customers[0].textContent).toBe('Jane Smith');
    });

    it('sorts by lastService', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const sortSelect = screen.getByDisplayValue('Name');
      fireEvent.change(sortSelect, { target: { value: 'lastService' } });
      
      const customers = screen.getAllByText(/John Doe|Jane Smith/);
      // John's last service is more recent (2025-01-10 > 2025-01-08)
      expect(customers[0].textContent).toBe('John Doe');
    });
  });

  describe('Customer Expansion', () => {
    it('expands customer when clicked', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const customerRow = screen.getByText('John Doe').closest('.customer-row');
      
      // Initially services should not be visible
      expect(screen.queryByText('Home/Business Exterior')).not.toBeInTheDocument();
      
      // Click to expand
      fireEvent.click(customerRow);
      
      // Now services should be visible
      expect(screen.getByText('Home/Business Exterior')).toBeInTheDocument();
    });

    it('collapses expanded customer when clicked again', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const customerRow = screen.getByText('John Doe').closest('.customer-row');
      
      // Expand
      fireEvent.click(customerRow);
      expect(screen.getByText('Home/Business Exterior')).toBeInTheDocument();
      
      // Collapse
      fireEvent.click(customerRow);
      expect(screen.queryByText('Home/Business Exterior')).not.toBeInTheDocument();
    });
  });

  describe('Service Display', () => {
    it('displays services when customer is expanded', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const customerRow = screen.getByText('John Doe').closest('.customer-row');
      fireEvent.click(customerRow);
      
      expect(screen.getByText('Home/Business Exterior')).toBeInTheDocument();
      expect(screen.getByText('Concrete Pressure Washing')).toBeInTheDocument();
    });

    it('formats service prices correctly', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const customerRow = screen.getByText('John Doe').closest('.customer-row');
      fireEvent.click(customerRow);
      
      // Should show formatted prices
      expect(screen.getByText('$300.00')).toBeInTheDocument();
      expect(screen.getByText('$200.00')).toBeInTheDocument();
    });

    it('handles missing price fields', () => {
      const customersWithNoPrice = [
        {
          id: '1',
          name: 'Test Customer',
          services: [{ type: 'Test Service', date: '2025-01-10' }]
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customersWithNoPrice} />);
      const customerRow = screen.getByText('Test Customer').closest('.customer-row');
      fireEvent.click(customerRow);
      
      // Should show em dash for missing price
      expect(screen.getByText('—')).toBeInTheDocument();
    });
  });

  describe('Service Label Mapping', () => {
    it('maps service labels correctly', () => {
      const customersWithVariousServices = [
        {
          id: '1',
          name: 'Test Customer',
          services: [
            { type: 'exterior softwash', date: '2025-01-10', pricePaid: 100 },
            { type: 'concrete driveway', date: '2025-01-10', pricePaid: 200 },
            { type: 'deck cleaning', date: '2025-01-10', pricePaid: 150 },
            { type: 'other service', date: '2025-01-10', pricePaid: 50 }
          ]
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customersWithVariousServices} />);
      const customerRow = screen.getByText('Test Customer').closest('.customer-row');
      fireEvent.click(customerRow);
      
      expect(screen.getByText('Home/Business Exterior')).toBeInTheDocument();
      expect(screen.getByText('Concrete Pressure Washing')).toBeInTheDocument();
      expect(screen.getByText('Deck/Fence Cleaning')).toBeInTheDocument();
      expect(screen.getByText('Other')).toBeInTheDocument();
    });
  });

  describe('Address Formatting', () => {
    it('formats address with city, state, and zip correctly', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      // Address should be formatted properly
      expect(screen.getByText(/Charleston/)).toBeInTheDocument();
      expect(screen.getByText(/SC/)).toBeInTheDocument();
      expect(screen.getByText(/29401/)).toBeInTheDocument();
    });

    it('handles addresses without proper formatting', () => {
      const customersWithBadAddress = [
        {
          id: '1',
          name: 'Test Customer',
          address: 'Just a street name'
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customersWithBadAddress} />);
      expect(screen.getByText('Just a street name')).toBeInTheDocument();
    });

    it('handles null or undefined address', () => {
      const customersWithNoAddress = [
        {
          id: '1',
          name: 'Test Customer',
          address: null
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customersWithNoAddress} />);
      expect(screen.getByText('Test Customer')).toBeInTheDocument();
    });
  });

  describe('Source Badge', () => {
    it('renders Facebook badge for Facebook source', () => {
      const customerWithFacebook = [
        {
          id: '1',
          name: 'Test Customer',
          source: 'Facebook Ads'
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customerWithFacebook} />);
      // Should render Facebook badge SVG
      const svg = screen.getByText('Test Customer').closest('.customer-row').querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders Instagram badge for Instagram source', () => {
      const customerWithInstagram = [
        {
          id: '1',
          name: 'Test Customer',
          source: 'Instagram'
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customerWithInstagram} />);
      const svg = screen.getByText('Test Customer').closest('.customer-row').querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders default badge for other sources', () => {
      const customerWithOtherSource = [
        {
          id: '1',
          name: 'Test Customer',
          source: 'Google Search'
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customerWithOtherSource} />);
      const svg = screen.getByText('Test Customer').closest('.customer-row').querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Service File Actions', () => {
    it('handles service file clicks', () => {
      render(<CustomerDirectory {...defaultProps} customers={sampleCustomers} />);
      const customerRow = screen.getByText('John Doe').closest('.customer-row');
      fireEvent.click(customerRow);
      
      const fileButtons = screen.getAllByTestId(/file-text-icon|file-signature-icon|receipt-icon/);
      if (fileButtons.length > 0) {
        fireEvent.click(fileButtons[0]);
        expect(global.alert).toHaveBeenCalled();
      }
    });
  });

  describe('Add Customer Button', () => {
    it('calls openModal with addCustomer when clicked', () => {
      render(<CustomerDirectory {...defaultProps} />);
      const addButton = screen.getByText('Add Customer');
      
      fireEvent.click(addButton);
      expect(mockOpenModal).toHaveBeenCalledWith('addCustomer');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty customers array', () => {
      render(<CustomerDirectory {...defaultProps} customers={[]} />);
      expect(screen.getByText('Customer Management')).toBeInTheDocument();
    });

    it('handles customers without services array', () => {
      const customersWithoutServices = [
        {
          id: '1',
          name: 'Test Customer',
          services: null
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customersWithoutServices} />);
      expect(screen.getByText('Test Customer')).toBeInTheDocument();
    });

    it('handles customers with missing name fields', () => {
      const customerWithoutName = [
        {
          id: '1',
          firstName: 'First',
          lastName: 'Last'
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customerWithoutName} />);
      // Should display first + last name
      expect(screen.getByText(/First.*Last/)).toBeInTheDocument();
    });

    it('handles customers with NaN price values', () => {
      const customersWithInvalidPrice = [
        {
          id: '1',
          name: 'Test Customer',
          services: [
            { type: 'Test Service', date: '2025-01-10', pricePaid: 'invalid' }
          ]
        }
      ];
      
      render(<CustomerDirectory {...defaultProps} customers={customersWithInvalidPrice} />);
      const customerRow = screen.getByText('Test Customer').closest('.customer-row');
      fireEvent.click(customerRow);
      
      // Should show em dash for invalid price
      expect(screen.getByText('—')).toBeInTheDocument();
    });
  });
});
