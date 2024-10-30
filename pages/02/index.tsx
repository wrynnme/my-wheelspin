import HttpClient from "@/services/http-client";
import { useEffect, useState } from "react";
// import { Wheel } from "react-custom-roulette";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const Wheel = dynamic(
	() => import("react-custom-roulette").then((mod) => mod.Wheel),
	{
		ssr: false,
	}
);

const Home = (props: any) => {
	const [listData, setListData] = useState([]);
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		getListData().then((v: any) => {
			const newDataSet: any = v.map((value: any) => ({
				option: value.label,

				style: {
					backgroundColor: value.backgroundColor,
					textColor: value.textColor,
				},
			}));
			setListData(newDataSet);
		});
	}, []);

	const getListData = async () => {
		try {
			const response: any = await HttpClient.get(`/list`).then(
				(response: any) => response.data
			);
			return response;
		} catch (error: any) {
			return error.message;
		}
	};

	const spinRoulette = async () => {
		try {
			const newPrizeNumber = Math.floor(Math.random() * listData.length);
			const response: any = await HttpClient.post(`/spin`, {
				userID: newPrizeNumber,
			}).then((response: any) => response.data);
			return response;
		} catch (error: any) {
			return error.message;
		}
	};

	const handleSpinClick = () => {
		if (!mustSpin) {
			spinRoulette().then((v: any) => {
				setPrizeNumber(v);
				setMustSpin(true);
			});
		}
	};

	if (!isClient) return null;

	return (
		<>
			<Navbar />
			<div className="container mx-auto">
				<div className="flex justify-center items-center flex-col w-full">
					{listData?.length > 0 ? (
						<>
							<Wheel
								mustStartSpinning={mustSpin}
								prizeNumber={prizeNumber}
								data={listData}
								onStopSpinning={() => {
									setMustSpin(false);
								}}
								perpendicularText={true}
								textDistance={75}
								spinDuration={0.5}
								outerBorderColor={"#fcc200"}
								radiusLineColor={"#fcc200"}
								radiusLineWidth={2}
								/* pointerProps={{
									src: "https://cdn-icons-png.flaticon.com/512/15953/15953741.png",
									style: { top: "42%", left: "90%" }, // Adjust based on your requirements
								}} */
							/>
							<button
								className="btn btn-outline btn-wide btn-primary mt-5"
								disabled={mustSpin}
								onClick={handleSpinClick}
							>
								{mustSpin ? (
									<span className="loading loading-dots"></span>
								) : (
									"SPIN"
								)}
							</button>
							<div className="divider"></div>
						</>
					) : (
						<span className="loading loading-infinity loading-lg"></span>
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
