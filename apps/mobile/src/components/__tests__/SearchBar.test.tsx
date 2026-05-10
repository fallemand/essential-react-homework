import { render, screen, fireEvent } from '@lottery/testing';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder and calls onChangeText', () => {
    const onChangeText = jest.fn();
    render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText('Filter lotteries');
    expect(input).toBeOnTheScreen();

    fireEvent.changeText(input, 'mega');
    expect(onChangeText).toHaveBeenCalledWith('mega');
  });
});
