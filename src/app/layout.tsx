"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { GameContextProvider } from "@/store/GameContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isDarkTheme, setIsDarkTheme] = useState(true);

	useEffect(() => {
		setIsDarkTheme(
			window.matchMedia("(prefers-color-scheme:dark)").matches
		);
	}, []);

	return (
		<html lang="en">
			<title>Flag Quiz</title>
			<body className={`${inter.className} ${isDarkTheme ? "dark" : ""}`}>
				<GameContextProvider>
					<Header
						isDarkTheme={isDarkTheme}
						setIsDarkTheme={setIsDarkTheme}
					/>
					{children}
				</GameContextProvider>
			</body>
		</html>
	);
}
