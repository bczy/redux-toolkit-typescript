import React from 'react';
import { Paper, Typography } from '@material-ui/core';

interface PageContainerProps {
	title: string;
	children: React.ReactNode;
}
const PageContainer = ({ title, children }: PageContainerProps) => (
	<Paper style={{ padding: '1em' }}>
		<Typography variant="h4">{title}</Typography>
		{children}
	</Paper>
);
export default PageContainer;
