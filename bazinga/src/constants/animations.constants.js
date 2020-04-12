import { useTransition } from 'react-spring';

export 	const useHorizontalTransition = (change) => {
	return useTransition(change, p => p, {
		from: {opacity: 0, transform: 'translate3d(100%,0,0)'},
		enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
		leave: {opacity: 0, transform: 'translate3d(-50%,0,0)'},
	});
};