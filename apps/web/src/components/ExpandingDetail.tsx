import * as React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { LazyMotion, domAnimation, m } from "framer-motion";

import ChevronDown from "~icons/ion/chevron-down";

const icon = cva(
	["w-6", "h-6", "transition-transform", "duration-300", "transform-gpu"],
	{
		variants: {
			state: {
				disabled: [],
				enabled: ["rotate-180"],
			},
		},
	},
);

interface IconProps
	extends React.SVGProps<SVGSVGElement>,
		VariantProps<typeof icon> {}

const Icon: React.FC<IconProps> = ({ state, ...props }) => (
	<ChevronDown className={icon({ state })} {...props} />
);

const list = cva(["list-disc ml-4"], {
	variants: {
		loaded: {
			enabled: ["visible"],
			disabled: ["invisible"],
		},
	},
});

interface ListProps
	extends React.HTMLProps<HTMLUListElement>,
		VariantProps<typeof list> {
	description: string[];
}

const List: React.FC<ListProps> = ({ loaded, description, ...props }) => (
	<ul className={list({ loaded })} {...props}>
		{description.map((line) => (
			<li key={btoa(line).slice(16)} className="mb-2 leading-7">
				{line}
			</li>
		))}
	</ul>
);

export type Props = {
	org?: string;
	url?: string;
	title: string;
	description: string[];
	timeframe: string;
};

const ExpandingDetail: React.FC<Props> = ({
	org,
	url,
	title,
	description,
	timeframe,
}) => {
	const [expanded, setExpanded] = React.useState(false);
	const [loaded, setLoaded] = React.useState(false);
	const runRef = React.useRef(0);

	React.useEffect(() => {
		if (runRef.current === 1) return;
		runRef.current += 1;

		setLoaded(true);
	}, []);

	return (
		<div className="flex flex-col items-start justify-start w-full bg-background-root z-10">
			<div
				onClick={() => setExpanded(!expanded)}
				onKeyPress={() => setExpanded(!expanded)}
				className="flex flex-row items-center justify-start w-full transition-colors hover:bg-background-default cursor-pointer rounded-md p-2 z-30"
			>
				<div className="flex flex-col items-start justify-start gap-1">
					<p className="text-foreground-default font-medium w-full text-base md:text-lg">
						{title}
						{org && ","}{" "}
						{org && (
							<a
								className="underline transition-color decoration-foreground-dimmer hover:text-foreground-default hover:decoration-foreground-default underline-offset-5"
								href={url}
							>
								{org}
							</a>
						)}
					</p>
					<span className="text-foreground-dimmest font-thin w-full text-sm md:text-base italic">
						{timeframe}
					</span>
				</div>
				<div className="ml-auto">
					<Icon state={expanded ? "enabled" : "disabled"} />
				</div>
			</div>
			<LazyMotion features={domAnimation} strict>
				<m.div
					variants={{
						expanded: {
							y: 0,
							opacity: 1,
							height: "auto",
							zIndex: 100,
						},
						collapsed: {
							y: "-100%",
							opacity: 0,
							height: 0,
							zIndex: 20,
							transition: {
								height: { duration: 0.5 },
								opacity: { duration: 0.15 },
								zIndex: { duration: 0 },
							},
						},
					}}
					initial="collapsed"
					animate={expanded ? "expanded" : "collapsed"}
					className="mt-2 text-foreground-dimmest font-thin w-full text-sm md:text-md pl-2"
				>
					<List
						loaded={loaded ? "enabled" : "disabled"}
						description={description}
					/>
				</m.div>
			</LazyMotion>
		</div>
	);
};

export default ExpandingDetail;
