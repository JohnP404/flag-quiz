import { GameContext } from "@/store/GameContext";
import { Button } from "./ui/button";

export function GameButtons() {
	const { gameStarted, gamePaused, resetGame, pauseGame, startGame } =
		GameContext();
	return (
		<div className="space-x-4">
			{!gameStarted && (
				<Button
					onClick={() => startGame(true)}
					className="bg-green-600 hover:bg-green-700 text-white"
					type="button"
				>
					<span>Começar</span>
				</Button>
			)}
			{gameStarted && !gamePaused && (
				<Button
					onClick={() => pauseGame((state) => !state)}
					className="bg-red-600 hover:bg-red-700 text-white"
					type="button"
				>
					<span>Pausar</span>
				</Button>
			)}
			{gameStarted && gamePaused && (
				<Button
					onClick={() => pauseGame((state) => !state)}
					className="bg-green-600 hover:bg-green-700 text-white"
					type="button"
				>
					<span>Resumir</span>
				</Button>
			)}
			<Button onClick={resetGame} className="text-white" type="button">
				<span>Resetar</span>
			</Button>
		</div>
	);
}
