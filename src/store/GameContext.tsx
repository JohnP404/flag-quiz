import { ReactNode, createContext, useContext, useState } from "react";

type Time = {
	minutes: number;
	seconds: number;
	miliseconds: number;
};

type Context = {
	correct: number;
	wrong: number;
	time: Time;
	timerStopped: boolean;
	gameEnded: boolean;
	endGame: () => void;
	setTimerStopped: (val: boolean) => void;
	resetGame: () => void;
	setAnswer: (str: "wrong" | "correct") => void;
};

const gameContext = createContext<Context | null>(null);

export function GameContextProvider({ children }: { children: ReactNode }) {
	const [correct, setCorrect] = useState(0);
	const [wrong, setWrong] = useState(0);
	const [timerStopped, stopTimer] = useState(true);
	const [gameEnded, setGameEnded] = useState(false);
	const [time, setTime] = useState<Time>({
		minutes: 0,
		seconds: 0,
		miliseconds: 0,
	});

	function setAnswer(str: "wrong" | "correct") {
		if (str === "correct") {
			setCorrect(correct + 1);
		} else {
			setWrong(wrong + 1);
		}
	}

	function setTimerStopped(val: boolean) {
		stopTimer(val);
	}

	function resetGame() {
		setCorrect(0);
		setWrong(0);
		setTimerStopped(true);
		setTime(() => {
			const newState = { minutes: 0, seconds: 0, miliseconds: 0 };
			return newState;
		});
	}

	function endGame() {
		stopTimer(true);
		setGameEnded(true);
	}

	const value = {
		correct,
		wrong,
		time,
		gameEnded,
		timerStopped,
		endGame,
		setTimerStopped,
		resetGame,
		setAnswer,
	};

	return (
		<gameContext.Provider value={value}>{children}</gameContext.Provider>
	);
}

export const GameContext = () => useContext(gameContext) as Context;
