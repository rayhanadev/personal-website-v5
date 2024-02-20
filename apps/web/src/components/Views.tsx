import * as React from "react";
import useSWR from "swr";

export type Props = {
	path: string;
	count?: boolean;
};

type Data = {
	success: true;
	data: {
		count: number;
	};
};

type Error = {
	success: false;
	message: string;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Views: React.FC<Props> = ({ path, count }) => {
	const { data, error } = useSWR<Data, Error>(
		`/api/views?path=${path}`,
		fetcher,
	);

	const runRef = React.useRef<number>(0);

	React.useEffect(() => {
		if (runRef.current === 1) return;
		runRef.current += 1;

		if (count) {
			fetch(`/api/views?path=${path}`, { method: "PUT" });
		}
	});

	if (error instanceof Error) {
		console.error(error);
		return <span>0</span>;
	}

	if (data) {
		return <span>{count ? data.data.count + 1 : data.data.count}</span>;
	}

	return <span>0</span>;
};

export default Views;
