import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type RouletteResult = {
	number: number;
	color: "red" | "black" | "green";
	percentage: number;
};

const rouletteWheel: RouletteResult[] = [
	{ number: 0, color: "green", percentage: 2.7 },
	{ number: 32, color: "red", percentage: 2.6 },
	{ number: 15, color: "black", percentage: 2.6 },
	{ number: 19, color: "red", percentage: 2.6 },
];

const Home = (props: any) => {
	const [result, setResult] = useState<RouletteResult | null>(null);
	const [isSpinning, setIsSpinning] = useState<boolean>(false);
	const [rotationAngle, setRotationAngle] = useState<number>(0);
	const [isMounted, setIsMounted] = useState(false);
	const [numRotations, setNumRotations] = useState(5);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const wheel = document.querySelector(".wheel") as HTMLElement;
		if (wheel) {
			wheel.style.transform = `rotate(${rotationAngle}deg)`;
		}
	}, [rotationAngle]);

	const spinRoulette = (): RouletteResult => {
		/* const randomIndex = Math.floor(Math.random() * rouletteWheel.length);
		return rouletteWheel[randomIndex]; */

		const randomNumber = Math.random() * 100;
		let cumulativePercentage = 0;

		for (const slot of rouletteWheel) {
			cumulativePercentage += slot.percentage;
			if (randomNumber <= cumulativePercentage) {
				return slot;
			}
		}

		// Fallback to last slot (should never happen if percentages sum to 100)
		return rouletteWheel[rouletteWheel.length - 1];
	};

	const handleSpin = () => {
		setIsSpinning(true);

		const spinResult = spinRoulette();
		const resultIndex = rouletteWheel.findIndex(
			(i) => i.number === spinResult.number
		);
		const segmentAngle = 300 / rouletteWheel.length;
		const newAngle =
			360 * 10 + (360 - (resultIndex * 360) / rouletteWheel.length);
		// const newAngle = 360 * numRotations + resultIndex * segmentAngle;

		setRotationAngle((prevAngle) => prevAngle + newAngle);

		/* setTimeout(() => {
			setRotationAngle(newAngle);
		}, 50); */

		setTimeout(() => {
			setResult(spinResult);
			setIsSpinning(false);
		}, 5000);
	};

	const handleNumRotationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNumRotations(Math.max(1, parseInt(e.target.value) || 1));
	};

	if (!isMounted) {
		return null; // or a loading spinner
	}

	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center">
				<div className="relative w-64 h-64">
					<div
						className="wheel absolute w-full h-full rounded-full border-8 border-gray-800"
						style={{
							transform: `rotate(${rotationAngle}deg)`,
							background: `conic-gradient(
              from 0deg,
              green 0deg 10deg,
              ${rouletteWheel
								.map(
									(slot, index) =>
										`${slot.color} ${index * (360 / rouletteWheel.length)}deg ${
											(index + 1) * (360 / rouletteWheel.length)
										}deg`
								)
								.join(", ")}
            )`,
							transition: "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)",
						}}
					>
						{rouletteWheel.map((slot, index) => (
							<div
								key={slot.number}
								className="absolute w-full h-full flex items-center justify-center text-white text-xs font-bold"
								style={{
									transform: `rotate(${
										index * (360 / rouletteWheel.length)
									}deg)`,
								}}
							>
								<span
									style={{
										transform: `rotate(${
											90 + 360 / rouletteWheel.length / 2
										}deg)`,
										marginLeft: "100%",
									}}
								>
									{slot.number}
								</span>
							</div>
						))}
					</div>
					<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-180 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-yellow-400 z-10"></div>
				</div>
				<div className="mt-4 flex items-center">
					<></>
					<label htmlFor="rotations" className="mr-2">
						Number of rotations:
					</label>
					<input
						id="rotations"
						type="number"
						min="1"
						value={numRotations}
						onChange={handleNumRotationsChange}
						className="w-16 px-2 py-1 border rounded"
					/>
				</div>
				<button
					onClick={handleSpin}
					disabled={isSpinning}
					className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
				>
					{isSpinning ? "Spinning..." : "Spin"}
				</button>
				{result && (
					<div className="mt-4 text-xl">
						Result: {result.number} {result.color} (Probability:{" "}
						{result.percentage.toFixed(1)}%)
					</div>
				)}
			</div>
		</>
	);
};

Home.propTypes = {};

const ClientOnlyRouletteWheel = dynamic(() => Promise.resolve(Home), {
	ssr: false,
});

export default ClientOnlyRouletteWheel;
