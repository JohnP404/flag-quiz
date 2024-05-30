import { GameContext } from "@/store/GameContext";

export function ScoresBoard() {
	const { correct, wrong } = GameContext();
	return (
		<div className="flex items-center gap-6">
			<span>Erros: {wrong}</span>
			<span>Acertos: {correct}</span>
		</div>
	);
}
