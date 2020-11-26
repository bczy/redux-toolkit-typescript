import React from 'react';
import { render, screen } from '@testing-library/react';

import UserEmail from './UserEmail';

const email = 'dummy@dummy.org';

test('renders email link', () => {
	render(<UserEmail email={email} />);
	const emailAddress = screen.getByText(/dummy@dummy.org/i);
	expect(emailAddress).toBeDefined();
});

test('renders email link with label', () => {
	render(<UserEmail email={email} showEmailLabel={true} />);
	const emailLabel = screen.getByText(/Email:/i);
	expect(emailLabel).toBeDefined();
});
