import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

type Time = {
	minutes: number;
	seconds: number;
	miliseconds: number;
};

type Context = {
	correct: number;
	wrong: number;
	time: Time;
	gamePaused: boolean;
	gameEnded: boolean;
	gameStarted: boolean;
	played: number[];
	setAnswer: (str: "wrong" | "correct") => void;
	setPlayed: Dispatch<SetStateAction<number[]>>;
	pauseGame: Dispatch<SetStateAction<boolean>>;
	startGame: Dispatch<SetStateAction<boolean>>;
	endGame: Dispatch<SetStateAction<boolean>>;
	resetGame: () => void;
};

const gameContext = createContext<Context | null>(null);
const start = Date.now();

export function GameContextProvider({ children }: { children: ReactNode }) {
	const [correct, setCorrect] = useState(0);
	const [wrong, setWrong] = useState(0);

	const [gamePaused, pauseGame] = useState(false);
	const [gameEnded, endGame] = useState(false);
	const [gameStarted, startGame] = useState(false);

	const [played, setPlayed] = useState<number[]>([]);
	const [time, setTime] = useState<Time>({
		minutes: 0,
		seconds: 0,
		miliseconds: 0,
	});

	const getTime = () => {
		if (gameEnded || gamePaused || !gameStarted) return;
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
	}, [gameEnded, gamePaused, gameStarted]);

	const setAnswer = (str: "wrong" | "correct") => {
		if (str === "correct") {
			setCorrect(correct + 1);
		} else {
			setWrong(wrong + 1);
		}
	};

	const resetGame = () => {
		setPlayed([]);
		setCorrect(0);
		setWrong(0);
		startGame(false);
		pauseGame(false);
		endGame(false);
		setTime(() => {
			const newState = { minutes: 0, seconds: 0, miliseconds: 0 };
			return newState;
		});
	};

	const value = {
		correct,
		wrong,
		time,
		gamePaused,
		gameEnded,
		gameStarted,
		played,
		setPlayed,
		pauseGame,
		endGame,
		startGame,
		resetGame,
		setAnswer,
	};

	return (
		<gameContext.Provider value={value}>{children}</gameContext.Provider>
	);
}

export const GameContext = () => useContext(gameContext) as Context;
