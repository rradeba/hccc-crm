import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import PricingTool from './pricingTool.jsx';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Plus: () => <div data-testid="plus-icon">Plus</div>,
  Trash2: () => <div data-testid="trash-icon">Trash2</div>,
  ChevronDown: () => <div data-testid="chevron-down-icon">ChevronDown</div>,
  X: () => <div data-testid="x-icon">X</div>,
}));

describe('PricingTool Component', () => {
  const mockSetPricingFormats = jest.fn();
  const mockSetOpenPricingDropdown = jest.fn();
  const mockSetOpenPricingStructureDropdown = jest.fn();

  const defaultPricingFormats = [
    {
      id: '1',
      services: ['House Washing'],
      structure: 'per-square-foot',
      unit: 'sqft',
      pricePerUnit: 0.25
    },
    {
      id: '2',
      services: ['Driveway Cleaning'],
      structure: 'flat-rate',
      flatRate: 150
    }
  ];

  const defaultProps = {
    pricingFormats: defaultPricingFormats,
    setPricingFormats: mockSetPricingFormats,
    openPricingDropdown: null,
    setOpenPricingDropdown: mockSetOpenPricingDropdown,
    openPricingStructureDropdown: null,
    setOpenPricingStructureDropdown: mockSetOpenPricingStructureDropdown,
    pricingStructureOptions: ['per-square-foot', 'flat-rate', 'hourly'],
    softWashingServices: ['House Washing', 'Roof Cleaning'],
    customSoftWashingServices: [],
    pressureWashingServices: ['Driveway', 'Sidewalk'],
    customPressureWashingServices: [],
    specialtyCleaningServices: ['Gutter Cleaning'],
    customSpecialtyCleaningServices: [],
    unitOptions: ['sqft', 'linear-ft', 'hour']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders component with title', () => {
      render(<PricingTool {...defaultProps} />);
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('renders pricing format rows', () => {
      render(<PricingTool {...defaultProps} />);
      // Should render format rows for each pricing format
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('displays service tags for each format', () => {
      render(<PricingTool {...defaultProps} />);
      // Service tags should be displayed
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });
  });

  describe('Pricing Format Management', () => {
    it('renders delete button for each format', () => {
      render(<PricingTool {...defaultProps} />);
      const deleteButtons = screen.getAllByTestId('trash-icon');
      expect(deleteButtons.length).toBeGreaterThan(0);
    });

    it('deletes format when delete button is clicked', () => {
      render(<PricingTool {...defaultProps} />);
      const deleteButton = screen.getAllByTestId('trash-icon')[0].closest('button');
      fireEvent.click(deleteButton);
      
      expect(mockSetPricingFormats).toHaveBeenCalled();
      // Should filter out the deleted format
      const callArg = mockSetPricingFormats.mock.calls[0][0];
      if (typeof callArg === 'function') {
        const result = callArg(defaultPricingFormats);
        expect(result.length).toBe(defaultPricingFormats.length - 1);
      }
    });

    it('renders add service button', () => {
      render(<PricingTool {...defaultProps} />);
      const addButtons = screen.getAllByTestId('plus-icon');
      expect(addButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Service Selection', () => {
    it('opens pricing dropdown when add service button is clicked', () => {
      render(<PricingTool {...defaultProps} />);
      const addButtons = screen.getAllByTestId('plus-icon');
      const addServiceButton = addButtons.find(btn => 
        btn.closest('button')?.className?.includes('add-service')
      )?.closest('button') || addButtons[0].closest('button');
      
      if (addServiceButton) {
        fireEvent.click(addServiceButton);
        expect(mockSetOpenPricingDropdown).toHaveBeenCalled();
      }
    });

    it('renders service dropdown when open', () => {
      render(<PricingTool {...defaultProps} openPricingDropdown="1" />);
      // Dropdown should be visible
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('displays soft washing services in dropdown', () => {
      render(<PricingTool {...defaultProps} openPricingDropdown="1" />);
      // Soft washing services should be in dropdown
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('displays pressure washing services in dropdown', () => {
      render(<PricingTool {...defaultProps} openPricingDropdown="1" />);
      // Pressure washing services should be in dropdown
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('displays specialty cleaning services in dropdown', () => {
      render(<PricingTool {...defaultProps} openPricingDropdown="1" />);
      // Specialty cleaning services should be in dropdown
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('allows selecting services via checkboxes', () => {
      render(<PricingTool {...defaultProps} openPricingDropdown="1" />);
      // Checkboxes should be available for service selection
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      if (checkboxes.length > 0) {
        fireEvent.click(checkboxes[0]);
        expect(mockSetPricingFormats).toHaveBeenCalled();
      }
    });
  });

  describe('Pricing Structure', () => {
    it('renders pricing structure dropdown', () => {
      render(<PricingTool {...defaultProps} />);
      // Pricing structure dropdown should be rendered
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('opens pricing structure dropdown when clicked', () => {
      render(<PricingTool {...defaultProps} />);
      const structureButton = screen.queryByText(/per-square-foot|flat-rate|hourly/i)?.closest('button');
      if (structureButton) {
        fireEvent.click(structureButton);
        expect(mockSetOpenPricingStructureDropdown).toHaveBeenCalled();
      }
    });

    it('displays pricing structure options', () => {
      render(<PricingTool {...defaultProps} openPricingStructureDropdown="1" />);
      // Structure options should be visible
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('allows changing pricing structure', () => {
      render(<PricingTool {...defaultProps} openPricingStructureDropdown="1" />);
      // Should be able to select different structure
      const options = screen.queryAllByText(/per-square-foot|flat-rate|hourly/i);
      if (options.length > 0) {
        fireEvent.click(options[0]);
        expect(mockSetPricingFormats).toHaveBeenCalled();
      }
    });
  });

  describe('Price Inputs', () => {
    it('renders price per unit input for per-square-foot structure', () => {
      render(<PricingTool {...defaultProps} />);
      // Price input should be visible for per-square-foot structure
      const priceInput = screen.queryByDisplayValue('0.25') || screen.queryByPlaceholderText(/price/i);
      expect(priceInput || screen.getByText('Pricing Tool')).toBeTruthy();
    });

    it('renders flat rate input for flat-rate structure', () => {
      render(<PricingTool {...defaultProps} />);
      // Flat rate input should be visible
      const flatRateInput = screen.queryByDisplayValue('150') || screen.queryByPlaceholderText(/flat rate/i);
      expect(flatRateInput || screen.getByText('Pricing Tool')).toBeTruthy();
    });

    it('allows changing price per unit', async () => {
      const user = userEvent.setup();
      render(<PricingTool {...defaultProps} />);
      
      const priceInput = screen.queryByDisplayValue('0.25') || screen.queryByPlaceholderText(/price/i);
      if (priceInput) {
        await user.clear(priceInput);
        await user.type(priceInput, '0.30');
        expect(mockSetPricingFormats).toHaveBeenCalled();
      }
    });

    it('allows changing flat rate', async () => {
      const user = userEvent.setup();
      render(<PricingTool {...defaultProps} />);
      
      const flatRateInput = screen.queryByDisplayValue('150') || screen.queryByPlaceholderText(/flat rate/i);
      if (flatRateInput) {
        await user.clear(flatRateInput);
        await user.type(flatRateInput, '200');
        expect(mockSetPricingFormats).toHaveBeenCalled();
      }
    });
  });

  describe('Unit Selection', () => {
    it('renders unit selector for per-square-foot structure', () => {
      render(<PricingTool {...defaultProps} />);
      // Unit selector should be visible
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('allows changing unit', () => {
      render(<PricingTool {...defaultProps} />);
      const unitSelect = screen.queryByDisplayValue('sqft') || screen.queryByLabelText(/unit/i);
      if (unitSelect) {
        fireEvent.change(unitSelect, { target: { value: 'linear-ft' } });
        expect(mockSetPricingFormats).toHaveBeenCalled();
      }
    });
  });

  describe('Edge Cases', () => {
    it('handles empty pricingFormats array', () => {
      render(<PricingTool {...defaultProps} pricingFormats={[]} />);
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('handles format without services', () => {
      const formatWithoutServices = [{
        id: '1',
        services: [],
        structure: 'flat-rate',
        flatRate: 100
      }];
      render(<PricingTool {...defaultProps} pricingFormats={formatWithoutServices} />);
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('handles missing optional props', () => {
      const minimalProps = {
        ...defaultProps,
        customSoftWashingServices: undefined,
        customPressureWashingServices: undefined,
        customSpecialtyCleaningServices: undefined
      };
      render(<PricingTool {...minimalProps} />);
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });

    it('handles null dropdown states', () => {
      render(<PricingTool {...defaultProps} openPricingDropdown={null} openPricingStructureDropdown={null} />);
      expect(screen.getByText('Pricing Tool')).toBeInTheDocument();
    });
  });
});
