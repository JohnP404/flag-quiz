"use client";

import { ScoresBoard } from "@/components/ScoreBoard";
import { Timer } from "@/components/Timer";
import { Input } from "@/components/ui/input";
import { GameContext } from "@/store/GameContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import countryData from "../../data.json" assert { type: "json" };
import { GameButtons } from "@/components/GameButtons";

export default function Home() {
	const {
		gamePaused,
		gameStarted,
		gameEnded,
		played,
		setAnswer,
		setPlayed,
		pauseGame,
		endGame,
	} = GameContext();

	const [currCountry, setCurrCountry] = useState<CountryData | any>([]);
	const [countdown, setCountdown] = useState(20);
	const [input, setInput] = useState("");

	const countries = countryData.countries;
	const inputRef = useRef<HTMLInputElement>(null);

	const getRandomNumber = () =>
		Math.floor(Math.random() * (countries.length - 0) + 0);

	const getRandomCountry = () => {
		setCountdown(20);
		const randomIdx = getRandomNumber();

		if (!played.includes(randomIdx)) {
			setCurrCountry({
				name: countries[randomIdx].name,
				flag: countries[randomIdx].flag,
			});
			setPlayed((previous: number[]) => [...previous, randomIdx]);
		} else {
			getRandomCountry();
		}
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (gameEnded) return;

		const isCorrect =
			input.toLowerCase() === currCountry?.name.toLowerCase();

		setAnswer(isCorrect ? "correct" : "wrong");

		if (played.length === 196) {
			endGame(true);
			return;
		}

		if (gamePaused) {
			pauseGame(false);
		}

		setInput("");
		getRandomCountry();
	};

	useEffect(() => {
		if (gamePaused || !gameStarted || gameEnded) return;
		const interval = setInterval(() => setCountdown(countdown - 1), 1000);
		if (countdown < 0) {
			setAnswer("wrong");
			setInput("");
			getRandomCountry();
			setCountdown(20);
		}
		return () => clearInterval(interval);
	}, [gamePaused, gameEnded, gameStarted]);

	useEffect(() => {
		if (gameStarted) {
			getRandomCountry();
			inputRef.current?.focus();
		} else {
			setCurrCountry(null);
			setCountdown(20);
		}
	}, [gameStarted]);

	useEffect(() => {
		if (!gamePaused) inputRef.current?.focus();
	}, [gamePaused]);

	return (
		<div className="w-screen h-[calc(100svh-98px)] grid place-content-center relative">
			<div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
				<div className="w-[100px]">
					<Timer />
				</div>
				<ScoresBoard />
				{gameStarted ? (
					<span>
						{gameEnded
							? "Parabéns!"
							: `Faltam: ${197 - played.length}`}
					</span>
				) : (
					<span className="w-[87.25px]"></span>
				)}
			</div>
			<div className="min-w-[300px] grid gap-8">
				<figure className="h-[200px] flex justify-center">
					{gameStarted && currCountry?.flag && (
						<img
							loading="eager"
							className="justify-self-center h-[200px] w-auto"
							alt={`bandeira da ${currCountry?.name}`}
							src={currCountry?.flag}
						/>
					)}
				</figure>
				<form className="grid" onSubmit={handleSubmit}>
					<Input
						disabled={!gameStarted}
						ref={inputRef}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="w-[300px] justify-self-center"
					/>
					<button type={"submit"} />
				</form>
				<div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-6">
					<div
						className={`${
							countdown < 6 ? "text-red-600" : "text-green-400"
						}  text-2xl bg-slate-700 rounded-full w-[50px] h-[50px] grid place-content-center`}
					>
						{countdown}
					</div>
					<GameButtons />
				</div>
			</div>
		</div>
	);
}
