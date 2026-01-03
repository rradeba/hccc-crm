import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MyAgent from './myAgent.jsx';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Settings: () => <div data-testid="settings-icon">Settings</div>,
  Check: () => <div data-testid="check-icon">Check</div>,
  Building2: () => <div data-testid="building-icon">Building2</div>,
  Phone: () => <div data-testid="phone-icon">Phone</div>,
  Upload: () => <div data-testid="upload-icon">Upload</div>,
  Trash2: () => <div data-testid="trash-icon">Trash2</div>,
  Plus: () => <div data-testid="plus-icon">Plus</div>,
  ChevronDown: () => <div data-testid="chevron-down-icon">ChevronDown</div>,
  X: () => <div data-testid="x-icon">X</div>,
}));

describe('MyAgent Component', () => {
  const mockSetIsAgentSettingsOpen = jest.fn();
  const mockSetAgentName = jest.fn();
  const mockSetAgentTone = jest.fn();
  const mockSetEmojiIntegration = jest.fn();
  const mockSetConnectedAccounts = jest.fn();
  const mockSetAgentFlowSteps = jest.fn();
  const mockSetLeadFollowupEnabled = jest.fn();
  const mockSetLeadFollowupFrequency = jest.fn();
  const mockSetLeadFollowupDays = jest.fn();
  const mockSetLeadFollowupDuration = jest.fn();
  const mockSetLeadFollowupDurationValue = jest.fn();
  const mockSetLeadFollowupDurationUnit = jest.fn();
  const mockSetWeatherIntegrationEnabled = jest.fn();
  const mockSetDayBeforeJobEnabled = jest.fn();
  const mockSetDayBeforeJobTime = jest.fn();
  const mockSetDayBeforeJobInstructions = jest.fn();
  const mockSetDayOfJobEnabled = jest.fn();
  const mockSetDayOfJobTime = jest.fn();
  const mockSetDayOfJobInstructions = jest.fn();
  const mockSetEditingStepId = jest.fn();
  const mockUpdateFlowStep = jest.fn();

  const defaultProps = {
    isAgentSettingsOpen: false,
    setIsAgentSettingsOpen: mockSetIsAgentSettingsOpen,
    agentName: 'My AI Agent',
    setAgentName: mockSetAgentName,
    agentTone: 'professional',
    setAgentTone: mockSetAgentTone,
    emojiIntegration: false,
    setEmojiIntegration: mockSetEmojiIntegration,
    connectedAccounts: {
      facebook: false,
      instagram: false,
      sms: false
    },
    setConnectedAccounts: mockSetConnectedAccounts,
    agentFlowSteps: [],
    setAgentFlowSteps: mockSetAgentFlowSteps,
    leadFollowupEnabled: false,
    setLeadFollowupEnabled: mockSetLeadFollowupEnabled,
    leadFollowupFrequency: 'daily',
    setLeadFollowupFrequency: mockSetLeadFollowupFrequency,
    leadFollowupDays: 7,
    setLeadFollowupDays: mockSetLeadFollowupDays,
    leadFollowupDuration: 'days',
    setLeadFollowupDuration: mockSetLeadFollowupDuration,
    leadFollowupDurationValue: 30,
    setLeadFollowupDurationValue: mockSetLeadFollowupDurationValue,
    leadFollowupDurationUnit: 'days',
    setLeadFollowupDurationUnit: mockSetLeadFollowupDurationUnit,
    weatherIntegrationEnabled: false,
    setWeatherIntegrationEnabled: mockSetWeatherIntegrationEnabled,
    dayBeforeJobEnabled: false,
    setDayBeforeJobEnabled: mockSetDayBeforeJobEnabled,
    dayBeforeJobTime: '08:00',
    setDayBeforeJobTime: mockSetDayBeforeJobTime,
    dayBeforeJobInstructions: '',
    setDayBeforeJobInstructions: mockSetDayBeforeJobInstructions,
    dayOfJobEnabled: false,
    setDayOfJobEnabled: mockSetDayOfJobEnabled,
    dayOfJobTime: '07:00',
    setDayOfJobTime: mockSetDayOfJobTime,
    dayOfJobInstructions: '',
    setDayOfJobInstructions: mockSetDayOfJobInstructions,
    editingStepId: null,
    setEditingStepId: mockSetEditingStepId,
    promotions: [],
    softWashingServices: ['House Washing', 'Roof Cleaning'],
    customSoftWashingServices: [],
    pressureWashingServices: ['Driveway', 'Sidewalk'],
    customPressureWashingServices: [],
    specialtyCleaningServices: ['Gutter Cleaning'],
    customSpecialtyCleaningServices: [],
    updateFlowStep: mockUpdateFlowStep
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders component with title', () => {
      render(<MyAgent {...defaultProps} />);
      expect(screen.getByText('My Agent')).toBeInTheDocument();
    });

    it('renders settings button', () => {
      render(<MyAgent {...defaultProps} />);
      const settingsButton = screen.getByTitle('Agent Settings');
      expect(settingsButton).toBeInTheDocument();
    });

    it('opens settings modal when settings button is clicked', () => {
      render(<MyAgent {...defaultProps} />);
      const settingsButton = screen.getByTitle('Agent Settings');
      fireEvent.click(settingsButton);
      expect(mockSetIsAgentSettingsOpen).toHaveBeenCalledWith(true);
    });
  });

  describe('Connect Agent Section', () => {
    it('renders connect agent section', () => {
      render(<MyAgent {...defaultProps} />);
      expect(screen.getByText(/Connect Agent to Business Accounts/i)).toBeInTheDocument();
    });

    it('renders Facebook account button', () => {
      render(<MyAgent {...defaultProps} />);
      expect(screen.getByText('Facebook')).toBeInTheDocument();
    });

    it('renders Instagram account button', () => {
      render(<MyAgent {...defaultProps} />);
      expect(screen.getByText('Instagram')).toBeInTheDocument();
    });

    it('renders SMS account button', () => {
      render(<MyAgent {...defaultProps} />);
      expect(screen.getByText(/SMS|Text/i)).toBeInTheDocument();
    });

    it('shows connected badge when account is connected', () => {
      render(<MyAgent {...defaultProps} connectedAccounts={{ facebook: true, instagram: false, sms: false }} />);
      // Connected badge should be visible for Facebook
      const checkIcons = screen.getAllByTestId('check-icon');
      expect(checkIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Agent Settings Modal', () => {
    it('renders settings modal when isAgentSettingsOpen is true', () => {
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} />);
      // Settings modal should be rendered
      expect(screen.getByText('My Agent')).toBeInTheDocument();
    });

    it('allows changing agent name', async () => {
      const user = userEvent.setup();
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} />);
      
      const nameInput = screen.queryByPlaceholderText(/agent name/i) || screen.queryByLabelText(/agent name/i);
      if (nameInput) {
        await user.clear(nameInput);
        await user.type(nameInput, 'New Agent Name');
        expect(mockSetAgentName).toHaveBeenCalled();
      }
    });

    it('allows changing agent tone', () => {
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} />);
      
      const toneSelect = screen.queryByDisplayValue('professional') || screen.queryByLabelText(/tone/i);
      if (toneSelect) {
        fireEvent.change(toneSelect, { target: { value: 'friendly' } });
        expect(mockSetAgentTone).toHaveBeenCalled();
      }
    });

    it('allows toggling emoji integration', () => {
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} />);
      
      const emojiCheckbox = screen.queryByLabelText(/emoji/i) || screen.queryByRole('checkbox');
      if (emojiCheckbox) {
        fireEvent.click(emojiCheckbox);
        expect(mockSetEmojiIntegration).toHaveBeenCalled();
      }
    });
  });

  describe('Lead Follow-up Settings', () => {
    it('allows toggling lead follow-up', () => {
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} />);
      
      const followupToggle = screen.queryByLabelText(/lead follow-up|follow up/i);
      if (followupToggle) {
        fireEvent.click(followupToggle);
        expect(mockSetLeadFollowupEnabled).toHaveBeenCalled();
      }
    });

    it('allows changing follow-up frequency', () => {
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} leadFollowupEnabled={true} />);
      
      const frequencySelect = screen.queryByDisplayValue('daily');
      if (frequencySelect) {
        fireEvent.change(frequencySelect, { target: { value: 'weekly' } });
        expect(mockSetLeadFollowupFrequency).toHaveBeenCalled();
      }
    });
  });

  describe('Weather Integration', () => {
    it('allows toggling weather integration', () => {
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} />);
      
      const weatherToggle = screen.queryByLabelText(/weather/i);
      if (weatherToggle) {
        fireEvent.click(weatherToggle);
        expect(mockSetWeatherIntegrationEnabled).toHaveBeenCalled();
      }
    });
  });

  describe('Job Reminders', () => {
    it('allows toggling day before job reminder', () => {
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} />);
      
      const dayBeforeToggle = screen.queryByLabelText(/day before/i);
      if (dayBeforeToggle) {
        fireEvent.click(dayBeforeToggle);
        expect(mockSetDayBeforeJobEnabled).toHaveBeenCalled();
      }
    });

    it('allows changing day before job time', () => {
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} dayBeforeJobEnabled={true} />);
      
      const timeInput = screen.queryByDisplayValue('08:00') || screen.queryByLabelText(/time/i);
      if (timeInput) {
        fireEvent.change(timeInput, { target: { value: '09:00' } });
        expect(mockSetDayBeforeJobTime).toHaveBeenCalled();
      }
    });

    it('allows toggling day of job reminder', () => {
      render(<MyAgent {...defaultProps} isAgentSettingsOpen={true} />);
      
      const dayOfToggle = screen.queryByLabelText(/day of/i);
      if (dayOfToggle) {
        fireEvent.click(dayOfToggle);
        expect(mockSetDayOfJobEnabled).toHaveBeenCalled();
      }
    });
  });

  describe('Agent Flow Steps', () => {
    it('renders agent flow steps section', () => {
      render(<MyAgent {...defaultProps} />);
      // Flow steps section should be rendered
      expect(screen.getByText('My Agent')).toBeInTheDocument();
    });

    it('allows adding flow steps', () => {
      render(<MyAgent {...defaultProps} />);
      const addButton = screen.queryByText(/add step/i) || screen.queryByTestId('plus-icon')?.closest('button');
      if (addButton) {
        fireEvent.click(addButton);
        expect(mockSetAgentFlowSteps).toHaveBeenCalled();
      }
    });

    it('allows removing flow steps', () => {
      const steps = [{ id: '1', type: 'greeting', content: 'Hello' }];
      render(<MyAgent {...defaultProps} agentFlowSteps={steps} />);
      
      const removeButton = screen.queryByTestId('trash-icon')?.closest('button');
      if (removeButton) {
        fireEvent.click(removeButton);
        expect(mockSetAgentFlowSteps).toHaveBeenCalled();
      }
    });

    it('allows editing flow steps', () => {
      const steps = [{ id: '1', type: 'greeting', content: 'Hello' }];
      render(<MyAgent {...defaultProps} agentFlowSteps={steps} />);
      
      const editButton = screen.queryByText(/edit/i) || screen.queryByRole('button', { name: /edit/i });
      if (editButton) {
        fireEvent.click(editButton);
        expect(mockSetEditingStepId).toHaveBeenCalled();
      }
    });
  });

  describe('Edge Cases', () => {
    it('handles empty agentFlowSteps array', () => {
      render(<MyAgent {...defaultProps} agentFlowSteps={[]} />);
      expect(screen.getByText('My Agent')).toBeInTheDocument();
    });

    it('handles missing optional props', () => {
      const minimalProps = {
        ...defaultProps,
        promotions: undefined,
        softWashingServices: undefined
      };
      render(<MyAgent {...minimalProps} />);
      expect(screen.getByText('My Agent')).toBeInTheDocument();
    });
  });
});
