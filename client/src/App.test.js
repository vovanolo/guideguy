import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Admin from './pages/Admin';

test('renders Admin heading', () => {
  const adminPage = (
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  )
  const { getByText } = render(adminPage);
  const hElement = getByText('Admin');
  expect(hElement).toBeInTheDocument();
});
