"use client";

import Navbar from "@/components/Navbar";
import WheelSpinner from "@/components/WheelSpinner";
import { useEffect, useRef, useState } from "react";

const Home = () => {
	const bigWheelRef = useRef<HTMLDivElement>(null);
	const smallWheelRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [prizeResult, setPrizeResult] = useState(0);
	const [miniPrizeResult, setMiniPrizeResult] = useState(0);

	const [prizes, setPrizes] = useState([
		{
			id: "1",
			label: "เครดิต 5 บาท",
			image:
				"https://cdn.zabbet.com/HM42/rewards/1715853564927-4b838d94-bbb0-486d-ba15-e7661bfa6907.png",
		},
		{
			id: "2",
			label: "Samsung Galaxy",
			image:
				"https://cdn.zabbet.com/HM42/rewards/1714643703345-673a3577-8702-4327-b2b1-97a436cad1d3.png",
		},
		{
			id: "3",
			label: "เครดิต 50 บาท",
			image:
				"https://cdn.zabbet.com/HM42/rewards/1715853564927-4b838d94-bbb0-486d-ba15-e7661bfa6907.png",
		},
		{
			id: "4",
			label: "Labubu Macaron",
			image:
				"https://cdn.zabbet.com/HM42/rewards/1714643693772-c568b30c-6b76-4918-9073-0cf04b4a9822.png",
		},
		{
			id: "5",
			label: "เครดิต 100 บาท",
			image:
				"https://cdn.zabbet.com/HM42/rewards/1715853564927-4b838d94-bbb0-486d-ba15-e7661bfa6907.png",
		},
		{
			id: "6",
			label: "เครดิต 1000 บาท",
			image:
				"https://cdn.zabbet.com/HM42/rewards/1715853564927-4b838d94-bbb0-486d-ba15-e7661bfa6907.png",
		},
		{
			id: "7",
			label: "Giorno+ 125cc",
			image:
				"https://cdn.zabbet.com/HM42/rewards/1721462936513-6329a09c-2e58-4dad-a4c1-77b59bc581c8.png",
		},
		{
			id: "8",
			label: "เครดิต 500 บาท",
			image:
				"https://cdn.zabbet.com/HM42/rewards/1715853564927-4b838d94-bbb0-486d-ba15-e7661bfa6907.png",
		},
	]);

	const [miniPrizes, setMiniPrizes] = useState([
		{ id: "1", label: "x1" },
		{ id: "2", label: "x30" },
		{ id: "3", label: "x5" },
		{ id: "4", label: "x3" },
		{ id: "5", label: "x20" },
		{ id: "6", label: "x10" },
	]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<Navbar />
			<div className="container mx-auto py-10">
				<div className="relative flex flex-col max-w-[640px] h-full mx-auto z-0 overflow-hidden">
					<div className="flex-1 overflow-y-auto flex flex-col justify-start no-scrollbar">
						<div className="w-full min-h-full flex flex-col justify-start items-center">
							<div className="w-full overflow-auto no-scrollbar">
								<div className="w-full flex flex-col">
									<div className="relative w-full min-h-full overflow-hidden">
										<div className="px-4 flex flex-col">
											<WheelSpinner
												prizes={prizes}
												miniPrizes={miniPrizes}
												resultIndex={6}
												miniResultIndex={1}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
