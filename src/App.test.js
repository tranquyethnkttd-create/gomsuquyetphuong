import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand name', () => {
  render(<App />);
  const linkElement = screen.getByText(/Gốm Sứ Quyết Phương/i);
  expect(linkElement).toBeInTheDocument();
});
