import Navbar from "@/components/Navbar";
import styles from "@/styles/wheelspin.module.css";
import { useRef, useState } from "react";

const Home = () => {
	const wheelRef = useRef<HTMLDivElement>(null);
	const [wheelSpin, setWheelSpin] = useState([
		{ value: 100, color: "#db7093", percent: 10 },
		{ value: 1, color: "#20b2aa", percent: 10 },
		{ value: 50, color: "#d63e92", percent: 10 },
		{ value: 0, color: "#daa520", percent: 10 },
		{ value: 200, color: "#ff340f", percent: 10 },
		{ value: 10, color: "#ff7f50", percent: 10 },
		{ value: 20, color: "#3cb371", percent: 10 },
		{ value: 1000, color: "#4169e1", percent: 10 },
	]);
	const [spinValue, setSpinValue] = useState(Math.ceil(Math.random() * 3600));

	const spin = () => {
		console.log(spinValue);
		if (wheelRef.current) {
			wheelRef.current.style.transform = `rotate(${spinValue}deg)`;

			setSpinValue(spinValue + Math.ceil(Math.random() * 3600));
		}
	};

	return (
		<>
			<Navbar />

			<div className="container mx-auto py-10">
				<div className={styles.wheelSpin}>
					<div className={styles.spinButton} onClick={() => spin()}>
						spin
					</div>
					<div ref={wheelRef} className={styles.wheel}>
						{wheelSpin.map((val, index) => {
							return (
								<div
									key={index}
									className={`${styles.item} v-${val.value}`}
									style={
										{
											"--i": `${index}`,
											"--p": `${val.percent}`,
											"--c": `${val.color}`,
										} as React.CSSProperties
									}
								>
									<span>{val.value}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
