import Link from 'next/link';

interface Props {
	href: string;
}

export const LinkBackButton = ({ href = '/' }: Props) => {
	return (
		<Link href={href}>
			<button>{'<'}</button>
		</Link>
	);
};
