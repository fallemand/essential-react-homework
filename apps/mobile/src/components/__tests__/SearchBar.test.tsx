import { render } from '@lottery/testing';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('matches snapshot', () => {
    const tree = render(<SearchBar value="" onChangeText={() => {}} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
