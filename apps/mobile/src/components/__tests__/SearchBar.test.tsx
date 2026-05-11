import { render } from '@lottery/testing';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('matches snapshot with value', () => {
    const tree = render(<SearchBar value="mega" onChangeText={() => {}} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
