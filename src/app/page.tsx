"use client";

import { ScoresBoard } from "@/components/ScoreBoard";
import { Timer } from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GameContext } from "@/store/GameContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import countryData from "../../data.json" assert { type: "json" };

export default function Home() {
	const { setTimerStopped, setAnswer, endGame, gameEnded } = GameContext();
	const [played, setPlayed] = useState<number[]>([]);
	const [currCountry, setCurrCountry] = useState<CountryData | any>([]);
	const [countdown, setCountdown] = useState(20);

	const [input, setInput] = useState("");

	const countries = countryData.countries;
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		getRandomCountry();
	}, []);

	function getRandomNumber() {
		return Math.floor(Math.random() * (countries.length - 0) + 0);
	}

	function getRandomCountry() {
		const radInt = getRandomNumber();

		if (!played.includes(radInt)) {
			setPlayed((state) => [...state, radInt]);
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
			endGame();
			return;
		}

		if (input.toLowerCase() === currCountry?.name.toLowerCase()) {
			setAnswer("correct");
		} else {
			setAnswer("wrong");
		}
		setInput("");
		getRandomCountry();
	}

	useEffect(() => {
		if (gameEnded) return;
		const interval = setInterval(() => setCountdown(countdown - 1), 1000);
		if (countdown < 0) {
			setAnswer("wrong");
			setInput("");
			getRandomCountry();
			setCountdown(20);
		}
		return () => clearInterval(interval);
	}, [countdown]);

	function resetHandler() {
		window.location.reload();
	}

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
					{currCountry.flag && (
						<img
							onLoad={() => setTimerStopped(false)}
							loading="eager"
							className="justify-self-center h-[200px] w-auto"
							alt={`bandeira da ${currCountry.name}`}
							src={currCountry.flag}
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
					<Button
						onClick={resetHandler}
						className=" text-white"
						type="button"
					>
						<span>Resetar</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
