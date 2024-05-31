"use client";

import { GameContext } from "@/store/GameContext";
import { useEffect } from "react";

export function Timer() {
	const { gameEnded, time } = GameContext();

	useEffect(() => {
		if (!gameEnded) return;
		const formattedTime = `${time.minutes
			.toString()
			.padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}.${
			time.miliseconds
		}`;
		let updatedTimes;
		const storedTimes = localStorage.getItem("flag-quiz-times");

		if (storedTimes) {
			updatedTimes = [...JSON.parse(storedTimes), formattedTime];
		} else {
			updatedTimes = [formattedTime];
		}

		localStorage.setItem("flag-quiz-times", JSON.stringify(updatedTimes));
	}, [gameEnded]);

	return (
		<span className="text-xl">
			{`${time.minutes.toString().padStart(2, "0")}:${time.seconds
				.toString()
				.padStart(2, "0")}.${time.miliseconds}`}
		</span>
	);
}
