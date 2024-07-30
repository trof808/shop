interface Props {
	totalPrice: number;
}

export const BasketButtonFeature = ({ totalPrice }: Props) => {
	return <p>totalPice: {totalPrice}</p>;
};
