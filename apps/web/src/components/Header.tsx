import * as React from "react";
import { TypeAnimation } from "react-type-animation";

export type Props = {
	text?: string;
	textSize: string;
};

const Header: React.FC<Props> = ({ text, textSize }) => {
	// biome-ignore format: grouped by language
	// for ease of reading.
	const items = [
		"Hey", "Hi", "Hello",
		"Hola", "Olá",
		"Namastē",
		"Konnichiwa",
	];

	const item = text ?? `👋 ${items[(items.length * Math.random()) | 0]}`;

	return (
		<h1 className={`font-semibold h-7 ${textSize}`}>
			<TypeAnimation sequence={[item]} repeat={0} />
		</h1>
	);
};

export default Header;
