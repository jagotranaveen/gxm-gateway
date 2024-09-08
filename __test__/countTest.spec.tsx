import React from 'react';
import { render } from '@testing-library/react'; 
import CountTest from "../src/components/counter/countTest";
import "@testing-library/jest-dom"

test('renders h1 with "Hello, World!"', () => {
    const { getByText } = render(<CountTest />); 
    const h1Element = getByText(/Hello, World/i);
    expect(h1Element).toBeInTheDocument();
    expect(h1Element.tagName).toBe('H1');
});
