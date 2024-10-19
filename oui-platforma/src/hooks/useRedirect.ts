import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useRedirect(to: string, condition: boolean | Promise<boolean>): boolean {
	const [isRunning, setIsRunning] = useState(true);
	const router = useRouter();

	useEffect(() => {
		Promise.resolve(condition)
			.then((shouldRedirect) => {
				if (shouldRedirect) {
					router.push(to);
				}
			})
			.finally(() => {
				setIsRunning(false);
			});
	}, [to, condition, router]);

	return isRunning;
}