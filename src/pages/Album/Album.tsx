import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';

import { ThumbModel } from '../../data/models';

import { selectFetchingThumbs } from '../../pages/Users/UsersSlice';
import { useSelector } from 'react-redux';
import PageContainer from '../../components/PageContainer';
import LazyImage from '../../components/Image';

function Album({ location }: any): React.ReactElement {
	const title = location.state.title;
	const thumbnails = location.state.thumbnails as Array<ThumbModel>;
	const history = useHistory();

	const fetchingThumbs = useSelector(selectFetchingThumbs);
	function handleClick() {
		history.goBack();
	}
	return (
		<PageContainer title={'Album details'}>
			<Typography variant="h5">Title: {title}</Typography>
			{fetchingThumbs ? (
				<Typography variant="h3">Loading...</Typography>
			) : (
				<Grid container spacing={1}>
					{thumbnails?.map((thumbnail, i) => (
						<Grid item xs={1} key={i}>
							<LazyImage
								alt={thumbnail.title}
								src={thumbnail.thumbnailUrl}
								style={{ width: '100%' }}
							/>
						</Grid>
					))}
				</Grid>
			)}
			<Button
				variant="contained"
				style={{ margin: '1em' }}
				onClick={handleClick}
			>
				Back to user details
			</Button>
		</PageContainer>
	);
}
export default Album;
