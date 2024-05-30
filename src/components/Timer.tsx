"use client";

import { GameContext } from "@/store/GameContext";
import { useEffect, useState } from "react";

const start = Date.now();

export function Timer() {
	const { timerStopped, time: timer, gameEnded } = GameContext();
	const [time, setTime] = useState(timer);

	const getTime = () => {
		if (timerStopped) return;
		const now = new Date(Date.now() - start);
		setTime({
			minutes: now.getMinutes(),
			seconds: now.getSeconds(),
			miliseconds: now.getMilliseconds(),
		});
	};

	useEffect(() => {
		const interval = setInterval(getTime, 1);
		return () => clearInterval(interval);
	}, [timerStopped]);

	useEffect(() => {
		if (!gameEnded) return;
		const formattedTime = `${time.minutes
			.toString()
			.padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}.${
			time.miliseconds
		}`;
		const storedTimes = localStorage.getItem("flag-quiz-times");
		if (storedTimes) {
			const updatedTimes = [...JSON.parse(storedTimes), formattedTime];
			localStorage.setItem(
				"flag-quiz-times",
				JSON.stringify(updatedTimes)
			);
		}
	}, [gameEnded]);

	return (
		<span className="text-xl">
			{`${time.minutes.toString().padStart(2, "0")}:${time.seconds
				.toString()
				.padStart(2, "0")}.${time.miliseconds}`}
		</span>
	);
}
