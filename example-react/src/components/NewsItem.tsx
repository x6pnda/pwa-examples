import { useMemo } from 'react';
import { MONTHS } from '../constants/MONTHS';
import { INewsItem } from '../types/INewsItem';
import './NewsItem.scss';

export const NewsItem = ({ item }: { item: INewsItem }) => {
	const formatedDate: string = useMemo(() => {
		const parsedDate = new Date(item.webPublicationDate);
		return `${parsedDate.getDate()} ${MONTHS[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;
	}, [item]);

	return (
		<div className='rowMiddle newsItem'>
			<div className='col'>
				<h1>{item.webTitle}</h1>
				<span className='date'>{formatedDate}</span>
			</div>
		</div>
	);
};
