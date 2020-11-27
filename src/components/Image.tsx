import React, { useEffect, useState } from 'react';
import placeHolder from '../assets/loading.gif';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	alt: string;
	errorImg?: string;
}

const LazyImage = ({ src, errorImg, alt, ...props }: ImageProps) => {
	const [imgSrc, setSrc] = useState(placeHolder || src);
	useEffect(() => {
		const img = new Image();
		img.src = src as string;
		img.addEventListener('load', () => {
			setSrc(src);
		});
		img.addEventListener('error', () => {
			setSrc(errorImg || placeHolder);
		});
	}, [src, errorImg]);
	return <img {...props} src={imgSrc} alt={alt} />;
};
export default LazyImage;
