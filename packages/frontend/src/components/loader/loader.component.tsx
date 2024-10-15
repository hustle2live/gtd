import * as React from 'react';
import { loaderCentered, loaderStyles } from './loader.styles';

type Props = {
	centered?: boolean;
};

const Loader: React.FunctionComponent<Props> = ({ centered }: Props) => {
	const addStyles = centered ? loaderCentered : '';

	return <div className={`${loaderStyles} ${addStyles}`}></div>;
};

export default Loader;
