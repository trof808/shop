import React from 'react';
import { render, screen } from '@testing-library/react';
import { BasketButtonFeature } from './BasketButtonFeature';

describe('BasketButtonFeature', () => {
	test('renders correctly with app router mounted', () => {
		const { getByText } = render(<BasketButtonFeature totalPrice={123} />);
		expect(getByText('totalPrice: 123')).toBeInTheDocument();
	});
});
