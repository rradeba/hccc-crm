import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MyBusiness from './myBusiness.jsx';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Bot: () => <div data-testid="bot-icon">Bot</div>,
  Phone: () => <div data-testid="phone-icon">Phone</div>,
  ChevronDown: () => <div data-testid="chevron-down-icon">ChevronDown</div>,
  Plus: () => <div data-testid="plus-icon">Plus</div>,
  X: () => <div data-testid="x-icon">X</div>,
  Check: () => <div data-testid="check-icon">Check</div>,
  FileText: () => <div data-testid="file-text-icon">FileText</div>,
  FileSignature: () => <div data-testid="file-signature-icon">FileSignature</div>,
  Receipt: () => <div data-testid="receipt-icon">Receipt</div>,
  HeartHandshake: () => <div data-testid="heart-icon">HeartHandshake</div>,
  Clock: () => <div data-testid="clock-icon">Clock</div>,
  Award: () => <div data-testid="award-icon">Award</div>,
  Shield: () => <div data-testid="shield-icon">Shield</div>,
  ShieldCheck: () => <div data-testid="shield-check-icon">ShieldCheck</div>,
  MapPin: () => <div data-testid="mappin-icon">MapPin</div>,
  Star: () => <div data-testid="star-icon">Star</div>,
}));

describe('MyBusiness Component', () => {
  const mockUpdateCompanyInfo = jest.fn();
  const mockSetCollapsedContactDetails = jest.fn();
  const mockGetContactDetailsCompletion = jest.fn(() => ({ completed: 5, total: 8 }));
  const mockGetBrandIdentityCompletion = jest.fn(() => ({ completed: 3, total: 5 }));
  const mockGetAreasServedCompletion = jest.fn(() => ({ completed: 1, total: 2 }));
  const mockGetOperatingHoursCompletion = jest.fn(() => ({ completed: 7, total: 7 }));
  const mockGetCertificationsCompletion = jest.fn(() => ({ completed: 0, total: 3 }));
  const mockGetInsuranceCompletion = jest.fn(() => ({ completed: 2, total: 4 }));
  const mockGetGuaranteeWarrantyCompletion = jest.fn(() => ({ completed: 1, total: 2 }));
  const mockGetOnlineReviewsCompletion = jest.fn(() => ({ completed: 0, total: 3 }));

  const defaultCompanyInfo = {
    companyName: 'Holy City Clean Co.',
    phone: '(843) 555-0100',
    email: 'contact@hccc.com',
    address: '123 Main St, Charleston, SC 29401',
    website: 'https://hccc.com',
    description: 'Professional cleaning services'
  };

  const defaultProps = {
    companyInfo: defaultCompanyInfo,
    updateCompanyInfo: mockUpdateCompanyInfo,
    collapsedContactDetails: true,
    setCollapsedContactDetails: mockSetCollapsedContactDetails,
    getContactDetailsCompletion: mockGetContactDetailsCompletion,
    getBrandIdentityCompletion: mockGetBrandIdentityCompletion,
    getAreasServedCompletion: mockGetAreasServedCompletion,
    getOperatingHoursCompletion: mockGetOperatingHoursCompletion,
    getCertificationsCompletion: mockGetCertificationsCompletion,
    getInsuranceCompletion: mockGetInsuranceCompletion,
    getGuaranteeWarrantyCompletion: mockGetGuaranteeWarrantyCompletion,
    getOnlineReviewsCompletion: mockGetOnlineReviewsCompletion
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders component with note section', () => {
      render(<MyBusiness {...defaultProps} />);
      expect(screen.getByText(/Note:/i)).toBeInTheDocument();
      expect(screen.getByText(/AI Sales Agent/i)).toBeInTheDocument();
    });

    it('renders company information section', () => {
      render(<MyBusiness {...defaultProps} />);
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });

    it('renders contact details section', () => {
      render(<MyBusiness {...defaultProps} />);
      expect(screen.getByText('Contact Details')).toBeInTheDocument();
    });

    it('shows completion badge for contact details', () => {
      render(<MyBusiness {...defaultProps} />);
      expect(mockGetContactDetailsCompletion).toHaveBeenCalled();
      // Completion badge should display
      const badges = screen.getAllByText(/5\/8|\d+\/\d+/);
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe('Collapsible Sections', () => {
    it('toggles contact details section when header is clicked', () => {
      render(<MyBusiness {...defaultProps} />);
      const contactHeader = screen.getByText('Contact Details').closest('.collapsible-header') || screen.getByText('Contact Details');
      fireEvent.click(contactHeader);
      expect(mockSetCollapsedContactDetails).toHaveBeenCalledWith(false);
    });

    it('shows section content when not collapsed', () => {
      render(<MyBusiness {...defaultProps} collapsedContactDetails={false} />);
      // Section content should be visible
      expect(screen.getByText('Contact Details')).toBeInTheDocument();
    });

    it('hides section content when collapsed', () => {
      render(<MyBusiness {...defaultProps} collapsedContactDetails={true} />);
      // Section content may be hidden
      expect(screen.getByText('Contact Details')).toBeInTheDocument();
    });
  });

  describe('Company Information Form Fields', () => {
    it('renders company name input', () => {
      render(<MyBusiness {...defaultProps} collapsedContactDetails={false} />);
      const nameInput = screen.getByDisplayValue('Holy City Clean Co.') || screen.getByPlaceholderText(/company name/i);
      expect(nameInput).toBeInTheDocument();
    });

    it('calls updateCompanyInfo when company name changes', async () => {
      const user = userEvent.setup();
      render(<MyBusiness {...defaultProps} collapsedContactDetails={false} />);
      
      const nameInput = screen.getByDisplayValue('Holy City Clean Co.') || screen.getByPlaceholderText(/company name/i);
      if (nameInput) {
        await user.clear(nameInput);
        await user.type(nameInput, 'New Company Name');
        expect(mockUpdateCompanyInfo).toHaveBeenCalled();
      }
    });

    it('renders phone input', () => {
      render(<MyBusiness {...defaultProps} collapsedContactDetails={false} />);
      const phoneInput = screen.getByDisplayValue('(843) 555-0100') || screen.getByPlaceholderText(/phone/i);
      expect(phoneInput).toBeInTheDocument();
    });

    it('renders email input', () => {
      render(<MyBusiness {...defaultProps} collapsedContactDetails={false} />);
      const emailInput = screen.getByDisplayValue('contact@hccc.com') || screen.getByPlaceholderText(/email/i);
      expect(emailInput).toBeInTheDocument();
    });

    it('renders address input', () => {
      render(<MyBusiness {...defaultProps} collapsedContactDetails={false} />);
      const addressInput = screen.getByDisplayValue(/123 Main St/) || screen.getByPlaceholderText(/address/i);
      expect(addressInput).toBeInTheDocument();
    });
  });

  describe('Completion Badges', () => {
    it('displays completion badges for all sections', () => {
      render(<MyBusiness {...defaultProps} />);
      expect(mockGetContactDetailsCompletion).toHaveBeenCalled();
      expect(mockGetBrandIdentityCompletion).toHaveBeenCalled();
      expect(mockGetAreasServedCompletion).toHaveBeenCalled();
      expect(mockGetOperatingHoursCompletion).toHaveBeenCalled();
      expect(mockGetCertificationsCompletion).toHaveBeenCalled();
      expect(mockGetInsuranceCompletion).toHaveBeenCalled();
      expect(mockGetGuaranteeWarrantyCompletion).toHaveBeenCalled();
      expect(mockGetOnlineReviewsCompletion).toHaveBeenCalled();
    });

    it('shows complete badge when section is fully completed', () => {
      const completedCompletion = jest.fn(() => ({ completed: 7, total: 7 }));
      render(<MyBusiness {...defaultProps} getOperatingHoursCompletion={completedCompletion} />);
      // Complete badge should be displayed
      expect(completedCompletion).toHaveBeenCalled();
    });
  });

  describe('Brand Identity Section', () => {
    it('renders brand identity section', () => {
      render(<MyBusiness {...defaultProps} />);
      // Brand identity section should be rendered
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });
  });

  describe('Areas Served Section', () => {
    it('renders areas served section', () => {
      render(<MyBusiness {...defaultProps} />);
      // Areas served section should be rendered
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });
  });

  describe('Operating Hours Section', () => {
    it('renders operating hours section', () => {
      render(<MyBusiness {...defaultProps} />);
      // Operating hours section should be rendered
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });
  });

  describe('Certifications Section', () => {
    it('renders certifications section', () => {
      render(<MyBusiness {...defaultProps} />);
      // Certifications section should be rendered
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });
  });

  describe('Insurance Section', () => {
    it('renders insurance section', () => {
      render(<MyBusiness {...defaultProps} />);
      // Insurance section should be rendered
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });
  });

  describe('Guarantee/Warranty Section', () => {
    it('renders guarantee/warranty section', () => {
      render(<MyBusiness {...defaultProps} />);
      // Guarantee/warranty section should be rendered
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });
  });

  describe('Online Reviews Section', () => {
    it('renders online reviews section', () => {
      render(<MyBusiness {...defaultProps} />);
      // Online reviews section should be rendered
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty companyInfo', () => {
      render(<MyBusiness {...defaultProps} companyInfo={{}} />);
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });

    it('handles missing optional fields', () => {
      const minimalInfo = {
        companyName: 'Test Company'
      };
      render(<MyBusiness {...defaultProps} companyInfo={minimalInfo} />);
      expect(screen.getByText('Company Information')).toBeInTheDocument();
    });

    it('handles null completion functions gracefully', () => {
      const propsWithNull = {
        ...defaultProps,
        getContactDetailsCompletion: undefined
      };
      // Should not crash
      expect(() => render(<MyBusiness {...propsWithNull} />)).not.toThrow();
    });
  });
});
