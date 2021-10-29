import { useEffect, useRef } from 'react';
import './NetworkStatus.scss';

export const NetworkStatus = (props: any) => {
	const userOnline = useRef(window.navigator.onLine);

	useEffect(() => {
		const onNetworkChange = (e: Event) => {
			userOnline.current = e.type === 'online';
		};
		window.addEventListener('online', onNetworkChange);
		window.addEventListener('offline', onNetworkChange);
		return () => {
			window.removeEventListener('online', onNetworkChange);
			window.removeEventListener('offline', onNetworkChange);
		};
	}, []);

	return (
		<div className='statusShower row'>
			<p>
				You are currently:{' '}
				<span v-if='userOnline' className='online'>
					Online
				</span>
				<span v-if='!userOnline' className='offline'>
					Offline
				</span>
				!
			</p>
		</div>
	);
};
