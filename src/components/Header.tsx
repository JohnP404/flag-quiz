import { GameContext } from "@/store/GameContext";
import { SunIcon, MoonIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
	isDarkTheme: boolean;
	setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
};

export function Header({ isDarkTheme, setIsDarkTheme }: Props) {
	const { resetGame } = GameContext();
	return (
		<header className="py-6 px-8 bg-background dark:bg-slate-700">
			<nav className="flex justify-between items-center">
				<Link href="/" className="flex items-center gap-2">
					<img src="https://flagcdn.com/40x30/br.png" />
					<h1>Flag Quiz</h1>
				</Link>
				<ul className="flex items-center gap-4">
					<li>
						<Link onClick={resetGame} href="/tempos">
							Tempos
						</Link>
					</li>
					<li
						className="cursor-pointer"
						onClick={() => setIsDarkTheme((state) => !state)}
					>
						{isDarkTheme ? (
							<SunIcon width={20} height={20} color="white" />
						) : (
							<MoonIcon width={20} height={20} color="black" />
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
}
