"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

type Props = {
	time: string;
	setTimes: Dispatch<SetStateAction<string[]>>;
};
export function TimeItem({ time, setTimes }: Props) {
	function deleteTime() {
		setTimes((state) => {
			const newSate = state.filter((t) => t !== time);
			sessionStorage.setItem("flag-quiz-times", JSON.stringify(newSate));
			return newSate;
		});
	}

	return (
		<div className="border py-4 px-6 rounded-md grid shadow-lg bg-secondary dark:border-transparent dark:bg-slate-700 dark:shadow-blue-500/30 ">
			<span className="text-2xl text-center">{time}</span>
			<Button
				onClick={deleteTime}
				className="bg-red-600 text-white h-[30px] hover:bg-red-400"
			>
				Deletar
			</Button>
		</div>
	);
}
