import { render, screen, fireEvent, waitFor } from '@lottery/testing';
import AddLottery from '../AddLottery';
import { createLottery } from '@lottery/shared/utils';

jest.mock('@lottery/shared/utils', () => ({
  createLottery: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({ show: jest.fn() }));

const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() } as any;
const mockRoute = { key: '', name: 'AddLottery' as const, params: undefined };

describe('AddLottery', () => {
  beforeEach(() => jest.clearAllMocks());

  it('disables submit button until form is valid', async () => {
    render(<AddLottery navigation={mockNavigation} route={mockRoute} />);

    const button = screen.getByText('ADD');
    expect(button).toBeDisabled();

    fireEvent.changeText(
      screen.getByPlaceholderText('Enter lottery name'),
      'Test Lottery'
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Enter lottery prize'),
      '$1000'
    );

    await waitFor(() => expect(button).toBeEnabled());
  });

  it('shows validation errors for short inputs', async () => {
    render(<AddLottery navigation={mockNavigation} route={mockRoute} />);

    fireEvent.changeText(
      screen.getByPlaceholderText('Enter lottery name'),
      'ab'
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Enter lottery prize'),
      'xy'
    );

    await waitFor(() => {
      expect(
        screen.getByText('name must be at least 4 characters')
      ).toBeOnTheScreen();
      expect(
        screen.getByText('prize must be at least 4 characters')
      ).toBeOnTheScreen();
    });
  });

  it('calls createLottery and navigates back on success', async () => {
    (createLottery as jest.Mock).mockResolvedValue({});
    render(<AddLottery navigation={mockNavigation} route={mockRoute} />);

    fireEvent.changeText(
      screen.getByPlaceholderText('Enter lottery name'),
      'My Lottery'
    );
    fireEvent.changeText(
      screen.getByPlaceholderText('Enter lottery prize'),
      'Grand Prize'
    );

    await waitFor(() => expect(screen.getByText('ADD')).toBeEnabled());
    fireEvent.press(screen.getByText('ADD'));

    await waitFor(() => {
      expect(createLottery).toHaveBeenCalledWith({
        name: 'My Lottery',
        prize: 'Grand Prize',
        type: 'simple',
      });
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });
});
