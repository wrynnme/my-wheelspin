import congratsRing from "@/public/imgs/congrats_ring.gif";
import spinCoin from "@/public/imgs/spin_coin.png";
import Image from "next/image";
import { useRef, useState } from "react";

interface Prize {
	id: string;
	label: string;
	image: any;
}

interface WheelSpinnerProps {
	prizes: Prize[];
	miniPrizes: any[];
	resultIndex: number;
	miniResultIndex: number;
}

const WheelSpinner: React.FC<WheelSpinnerProps> = ({
	prizes,
	miniPrizes,
	resultIndex,
	miniResultIndex,
}) => {
	const bigWheelRef = useRef<HTMLDivElement>(null);
	const smallWheelRef = useRef<HTMLDivElement>(null);

	const [isSpinning, setIsSpinning] = useState(false);
	const [bigWheelAngle, setBigWheelAngle] = useState(0);
	const [smallWheelAngle, setSmallWheelAngle] = useState(0);
	const [timeSpin, setTimeSpin] = useState(1);

	const getRandomOffset = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const spinWheel = (
		wheelRef: React.RefObject<HTMLDivElement>,
		currentAngle: () => number,
		segments: number,
		resultIndex: number,
		rotations: number,
		setAngle: React.Dispatch<React.SetStateAction<number>>
	) => {
		const degreesPerSegment = 360 / segments;
		const stopAngle = (segments - resultIndex) * degreesPerSegment;
		// const randomOffset = Math.floor(Math.random() * degreesPerSegment);
		const randomOffset = getRandomOffset(4, degreesPerSegment - 4);
		console.log("🚀 ~ randomOffset:", randomOffset);
		const offsetAngle = currentAngle() + randomOffset;

		const additionalRotation =
			360 * rotations + stopAngle - (offsetAngle % 360) - randomOffset;
		const newAngle = offsetAngle + additionalRotation;

		setAngle(newAngle);

		if (wheelRef.current) {
			wheelRef.current.style.transition = `transform ${timeSpin}s ease-out`;
			wheelRef.current.style.transform = `rotate(${newAngle}deg)`;
		}

		return newAngle;
	};

	const handlePlay = () => {
		if (isSpinning) return; // Prevent double clicks

		setIsSpinning(true); // Disable the button

		spinWheel(
			bigWheelRef,
			() => bigWheelAngle,
			prizes.length,
			resultIndex,
			4,
			setBigWheelAngle
		);

		setTimeout(() => {
			spinWheel(
				smallWheelRef,
				() => smallWheelAngle,
				miniPrizes.length,
				miniResultIndex,
				4,
				setSmallWheelAngle
			);
			setIsSpinning(false); // Re-enable the button

			console.log(`Big Wheel Angle: ${bigWheelAngle}`);
			console.log(`Small Wheel Angle: ${smallWheelAngle}`);
			console.log(
				`Big Prize: ${prizes[resultIndex]?.label}, Mini Prize: ${miniPrizes[miniResultIndex]?.label}`
			);
		}, timeSpin * 1000);
	};

	return (
		<>
			{`big wheel angle: ${bigWheelAngle}`}
			{`small wheel angle: ${smallWheelAngle}`}
			<div className="flex justify-center items-center w-full py-10">
				<div className="relative w-[300px] h-[300px] xs:w-[300px] xs:h-[300px] flex justify-center items-center">
					<div className="absolute w-[300px] h-[300px] xs:w-[300px] xs:h-[300px] flex justify-center items-center transition-all rounded-full overflow-hidden">
						<div
							id="bigWheel"
							ref={bigWheelRef}
							className="relative w-full h-full"
						>
							{prizes.map((prize, index) => (
								<div
									key={index}
									className="absolute w-full h-full select-none"
									style={{
										// transform: `rotate(${index * (360 / prizes.length)}deg)`,
										transform: `rotate(${
											270 + index * (360 / prizes.length)
										}deg)`,
									}}
								>
									<div
										className="absolute w-full h-full top-[50%] left-[50%]"
										style={{
											clipPath: "polygon(0% 0%, 100% 0%, 70.71% 70.71%)",
											background: `${
												index % 2 !== 0
													? "linear-gradient(220deg, rgb(235, 125, 0) 22%, rgb(235, 125, 0) 52%)"
													: "linear-gradient(220deg, rgb(255, 255, 255) 22%, rgb(255, 255, 255) 52%)"
											}`,
										}}
									>
										<div
											className="mr-[8%]"
											style={{
												transform: `rotate(115deg)`,
												transformOrigin: "center center",
											}}
										>
											<div className="translate-y-[55%] translate-x-[5%]">
												<div
													className="absolute top-1 -translate-x-1/2 -translate-y-1/2"
													style={{
														left: "65%",
														transform: `rotate(0deg)`,
													}}
												>
													<div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-3">
														<span
															className="text-[15px] absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-fit line-clamp-3 z-10 overflow-hidden whitespace-nowrap scale-[0.75] scale-100"
															style={{
																color: `${
																	index % 2 !== 0
																		? "rgb(255, 255, 255)"
																		: "rgb(232, 195, 11)"
																}`,
															}}
														>
															{prize.label}
														</span>
														<div className="relative w-[70px] h-[48px] mt-5">
															<span className="box-border block overflow-hidden w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 absolute inset-0">
																<Image
																	src={prize.image}
																	alt={prize.label}
																	width={300}
																	height={300}
																	decoding="async"
																	className="absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-contain"
																	style={{
																		minWidth: "100%",
																		minHeight: "100%",
																	}}
																/>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="absolute w-[192px] h-[192px] xs:w-[206px] xs:h-[206px] flex justify-center items-center transition-all">
						<div className="bg-gradient-to-b from-[#fef1c1] via-[#f8e0a2] to-[#d49b49] p-[3px] rounded-full">
							<div className="w-[130px] h-[130px] xs:w-[90px] xs:h-[90px] rounded-full overflow-hidden">
								<div
									id="smallWheel"
									ref={smallWheelRef}
									className="relative w-full h-full"
								>
									{miniPrizes.map((mini, index) => (
										<div
											key={index}
											className="absolute w-full h-full select-none"
											style={{
												transform: `rotate(${
													270 + index * (360 / miniPrizes.length)
												}deg)`,
											}}
										>
											<div
												className={`absolute w-full h-full top-[50%] left-[50%] ${
													index % 2 === 0 ? "bg-[#FFC500]" : "bg-white"
												}`}
												style={{
													clipPath: "polygon(0% 0%, 100% 0%, 50% 86.6%)",
												}}
											>
												<div
													className="whitespace-nowrap text-sm font-bold text-[#000] mr-[45%]"
													style={{
														transform: `rotate(30deg)`,
														transformOrigin: "left top",
													}}
												>
													<div className="rotate-180">
														<div className="translate-y-[50%]">
															<div className="text-[13px] ml-[20%]">
																<span>{mini.label}</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div
						className="absolute w-[350px] h-[350px] xs:w-[206px] xs:h-[206px] flex justify-center items-center z-50"
						onClick={handlePlay}
					>
						<div className="relative w-[22%] h-[22%] xs:w-[25%]">
							<span className="box-border block overflow-hidden w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 absolute inset-0">
								<Image
									src={spinCoin}
									alt="Spin Coin"
									width={300}
									height={300}
									className="absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-contain"
								/>
							</span>
						</div>
					</div>
					<div className="absolute w-[397px] h-[397px] top-[-48px] left-[-45px] flex justify-center items-center z-10">
						<div className="relative w-full h-full">
							<span className="box-border block overflow-hidden w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 absolute inset-0">
								<Image
									src={congratsRing}
									alt="Congrats Ring"
									width={377}
									height={367}
									className="absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-contain"
								/>
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WheelSpinner;
