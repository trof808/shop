interface Props {
	product: any;
}

export const ProductsItem = ({ product }: Props) => {
	return (
		<div>
			<div key={product.id}>
				<h2>{product.name}</h2>
				<p>Price: ${product.price}</p>
			</div>
		</div>
	);
};
