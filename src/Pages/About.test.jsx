import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

test('renders About component with correct text', () => {
  render(<About />);

  expect(screen.getByText("I'm About")).toBeInTheDocument;

  expect(screen.getByText("This is the About page.")).toBeInTheDocument;
});
