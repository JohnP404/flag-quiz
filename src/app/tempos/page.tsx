"use client";
import { TimeItem } from "@/components/TimeItem";
import { GameContext } from "@/store/GameContext";
import { useEffect, useState } from "react";

export default function TimesPage() {
	const { resetGame } = GameContext();
	const [times, setTimes] = useState<string[]>([]);

	useEffect(() => {
		resetGame();
		const storedTimes = localStorage.getItem("flag-quiz-times");
		if (storedTimes) setTimes(JSON.parse(storedTimes));
	}, []);

	return (
		<main className="grid grid-cols-7 p-4 py-8 justify-items-center">
			{times.map((t) => (
				<TimeItem setTimes={setTimes} time={t} />
			))}
		</main>
	);
}
