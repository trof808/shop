import { useEffect } from 'react';

export const useInfinityScroll = (
	listRef: React.RefObject<HTMLDivElement>,
	onScrollEnd: () => void
) => {
	useEffect(() => {
		const handleScroll = () => {
			if (listRef.current) {
				const { scrollTop, scrollHeight, clientHeight } = listRef.current;
				if (scrollTop + clientHeight >= scrollHeight) {
					onScrollEnd();
				}
			}
		};

		const refCurrent = listRef.current;
		refCurrent?.addEventListener('scroll', handleScroll);

		return () => {
			refCurrent?.removeEventListener('scroll', handleScroll);
		};
	}, [listRef, onScrollEnd]);
};
