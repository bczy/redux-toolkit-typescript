import { Typography } from '@material-ui/core';
import React from 'react';

type UserEmailProps = {
	email: string;
	showEmailLabel?: boolean;
};

export default function UserEmail({ email, showEmailLabel }: UserEmailProps) {
	return (
		<>
			{showEmailLabel && <b>Email: </b>}
			<a href={`mailto://${email}`}>{email}</a>
		</>
	);
}
