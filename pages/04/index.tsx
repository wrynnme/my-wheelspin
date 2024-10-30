import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

interface Prize {
	name: string;
	color: string;
}

const prizes: Prize[] = [
	{ name: "iPhone 15", color: "#4CAF50" },
	{ name: "Laptop", color: "#2196F3" },
	{ name: "Gift Card", color: "#FF9800" },
	{ name: "Headphones", color: "#9C27B0" },
	{ name: "Tablet", color: "#F44336" },
	{ name: "Vacation", color: "#009688" },
];

const RouletteWheel: React.FC = () => {
	const [isMounted, setIsMounted] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [angle, setAngle] = useState(0);
	const [result, setResult] = useState<Prize | null>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const spinWheel = () => {
		setIsSpinning(true);

		const sectorAngle = 360 / prizes.length; // มุมของแต่ละช่อง
		const resultIndex = Math.floor(Math.random() * prizes.length); // สุ่มรางวัล

		// คำนวณมุมที่จะให้ตรงกับ Pin (0 degrees)
		const spins = 10; // จำนวนรอบเต็มที่จะหมุน
		/* const newAngle =
			spins * 360 + (resultIndex * sectorAngle + sectorAngle / 2); */
		// const newAngle = spins * 360 - resultIndex * sectorAngle - sectorAngle / 2;
		const newAngle = spins * 360 + sectorAngle * resultIndex;
		console.log(`newAngle: ${newAngle} resultIndex: ${resultIndex}`);
		setAngle(newAngle); // ตั้งค่ามุมการหมุน

		setTimeout(() => {
			setResult(prizes[resultIndex]);
			setIsSpinning(false);
		}, 5000); // เวลาแอนิเมชันตรงกับ transition
	};

	if (!isMounted) {
		return null; // or a loading spinner
	}

	return (
		<>
			<Navbar />
			<div className="flex flex-col items-center gap-8">
				<div className="relative w-64 h-64">
					{/* วงล้อรูเล็ต */}
					<div
						className="absolute w-full h-full rounded-full border-8 border-gray-800"
						style={{
							transform: `rotate(${angle}deg)`,
							transition: isSpinning
								? "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)"
								: "none",
							background: `conic-gradient(
              ${prizes
								.map(
									(prize, index) =>
										`${prize.color} ${index * (360 / prizes.length)}deg ${
											(index + 1) * (360 / prizes.length)
										}deg`
								)
								.join(", ")}
            )`,
						}}
					>
						{prizes.map((prize, index) => (
							<div
								key={prize.name}
								className="absolute w-full h-full flex items-center justify-center text-white text-xs font-bold"
								style={{
									transform: `rotate(${index * (360 / prizes.length)}deg)`,
								}}
							>
								<span
									style={{
										transform: `rotate(${90 + 360 / prizes.length / 2}deg)`,
										marginLeft: "100%",
									}}
								>
									{prize.name}
								</span>
							</div>
						))}
					</div>

					{/* Pin */}
					<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-180 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-yellow-400 z-10"></div>
				</div>

				<button
					onClick={spinWheel}
					disabled={isSpinning}
					className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
				>
					{isSpinning ? "Spinning..." : "Spin"}
				</button>

				{result && (
					<div className="text-lg font-bold text-center">
						🎉 คุณได้รับรางวัล:{" "}
						<span className="text-green-500">{result.name}</span> 🎉
					</div>
				)}
			</div>
		</>
	);
};

export default RouletteWheel;
