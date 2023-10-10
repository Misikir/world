import App from './App';
import { render } from './test-utils';
describe('App working test', () => {
  it('renders without errors', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('map')).toBeTruthy();
  });
});
