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

	function getRandomNumber() {
		return Math.floor(Math.random() * (countries.length - 0) + 0);
	}

	function getRandomCountry() {
		setCountdown(20);
		const radInt = getRandomNumber();

		if (!played.includes(radInt)) {
			setPlayed((state: any) => [...state, radInt]);
			setCurrCountry({
				name: countries[radInt].name,
				flag: countries[radInt].flag,
			});
		} else {
			getRandomCountry();
		}
	}

	function submitHandler(e: FormEvent) {
		e.preventDefault();
		if (played.length === 196) {
			endGame(true);
			return;
		}
		if (input.toLowerCase() === currCountry?.name.toLowerCase()) {
			setAnswer("correct");
		} else {
			setAnswer("wrong");
		}
		if (gamePaused) pauseGame(false);
		setInput("");
		getRandomCountry();
	}

	useEffect(() => {
		if (gamePaused || !gameStarted) return;
		const interval = setInterval(() => setCountdown(countdown - 1), 1000);
		if (countdown < 0) {
			setAnswer("wrong");
			setInput("");
			getRandomCountry();
			setCountdown(20);
		}
		return () => clearInterval(interval);
	}, [countdown, gamePaused, gameStarted]);

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
				<span>
					{gameEnded ? "Parabéns!" : `Faltam: ${196 - played.length}`}
				</span>
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
				<form className="grid" onSubmit={submitHandler}>
					<Input
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
