import { useEffect, useRef, useState } from 'react';

export const useVirtualList = <ItemsType>(
	items: ItemsType[],
	itemHeight: number
) => {
	const [listScrollTop, setListScrollTop] = useState(0);
	const [listHeight, setListHeight] = useState(0);
	const [visibleItems, setVisibleItems] = useState(items.slice(0, 0));
	const listRef = useRef<HTMLDivElement>(null);

	const updateVisibleItems = () => {
		const startIndex = Math.floor(listScrollTop / itemHeight);
		const endIndex = Math.min(
			startIndex + Math.ceil(listHeight / itemHeight),
			items.length
		);

		setVisibleItems(items.slice(startIndex, endIndex));
	};

	useEffect(() => {
		if (listRef.current) {
			setListHeight(listRef.current.clientHeight);
		}
	}, []);

	useEffect(() => {
		updateVisibleItems();
	}, [listScrollTop, listHeight, items]);

	const handleScroll = () => {
		if (listRef.current) {
			setListScrollTop(listRef.current.scrollTop);
		}
	};

	useEffect(() => {
		const listElement = listRef.current;

		if (listElement) {
			listElement.addEventListener('scroll', handleScroll);

			return () => {
				listElement.removeEventListener('scroll', handleScroll);
			};
		}
	}, []);

	const containerProps = {
		style: { height: items.length * itemHeight },
	};

	const wrapperProps = {
		style: {
			transform: `translateY(${
				Math.floor(listScrollTop / itemHeight) * itemHeight
			}px)`,
		},
	};

	return { listRef, visibleItems, containerProps, wrapperProps };
};
