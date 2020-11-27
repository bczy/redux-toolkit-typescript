import { TableCell } from '@material-ui/core';
import React from 'react';

type UserWebSiteProps = {
	url?: string;
};

export default function UserWebSite({ url }: UserWebSiteProps) {
	return (
		<TableCell>
			<a
				href={url?.indexOf('http') === -1 ? `https://${url}` : url}
				target="_blank"
			>
				{url}
			</a>
		</TableCell>
	);
}
