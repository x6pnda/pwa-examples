import { useState, useEffect } from 'react';
import { makeFetchRequest } from '../../scripts/fetch';
import { IFetchResult } from './../../../../example-vue3/src/scripts/fetch';
import { NetworkStatus } from '../../components/NetworkStatus';
import { NewsItem } from './../../components/NewsItem';
import './style.scss';

type HeadlineType = {
	response: {
		results: any[];
	};
};
type latestHeadlinesType = {
	data?: HeadlineType;
	error?: string;
	loading: boolean;
};

type ArticlesProps = {};

export const Articles = (props: ArticlesProps) => {
	const [{ data, error, loading }, setLatestHeadlines] = useState<latestHeadlinesType>({ data: undefined, error: undefined, loading: true });

	useEffect(() => {
		makeFetchRequest<HeadlineType>('/search', 'games', undefined, { 'order-by': 'newest' })
			.then((result: IFetchResult<HeadlineType>) => {
				setLatestHeadlines({ data: result.data, error: undefined, loading: false });
			})
			.catch((result) => {
				setLatestHeadlines({ data: undefined, error: result.message, loading: false });
			});
	}, []);

	return (
		<>
			<NetworkStatus />
			<div className='newsList'>
				{loading ? (
					<p>Loading...</p>
				) : error !== undefined ? (
					<p>Error: {{ error }}</p>
				) : (
					data?.response.results.map((item) => <NewsItem item={item} key='index' />)
				)}
			</div>
		</>
	);
};
