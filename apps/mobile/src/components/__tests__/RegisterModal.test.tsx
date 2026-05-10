import { render, screen, fireEvent, waitFor } from '@lottery/testing';
import { RegisterModal } from '../RegisterModal';

const defaultProps = {
  visible: true,
  selectedCount: 3,
  onClose: jest.fn(),
  onRegister: jest.fn().mockResolvedValue(undefined),
};

beforeEach(() => jest.clearAllMocks());

describe('RegisterModal', () => {
  it('disables register button when name is empty', () => {
    render(<RegisterModal {...defaultProps} />);

    const registerButton = screen.getByText('Register');
    expect(registerButton).toBeDisabled();
  });

  it('calls onRegister with name and closes on success', async () => {
    render(<RegisterModal {...defaultProps} />);

    fireEvent.changeText(
      screen.getByPlaceholderText('Enter your name'),
      'Alice'
    );
    fireEvent.press(screen.getByText('Register'));

    await waitFor(() => {
      expect(defaultProps.onRegister).toHaveBeenCalledWith('Alice');
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('shows correct pluralization in subtitle', () => {
    const { rerender } = render(
      <RegisterModal {...defaultProps} selectedCount={1} />
    );
    expect(screen.getByText(/1 lottery/)).toBeOnTheScreen();

    rerender(<RegisterModal {...defaultProps} selectedCount={5} />);
    expect(screen.getByText(/5 lotteries/)).toBeOnTheScreen();
  });
});
