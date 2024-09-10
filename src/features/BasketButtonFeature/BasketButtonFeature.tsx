import Link from 'next/link';

interface Props {
	totalPrice: number;
}

export const BasketButtonFeature = ({ totalPrice }: Props) => {
	return <Link href='/basket'>totalPrice: {totalPrice}</Link>;
};
