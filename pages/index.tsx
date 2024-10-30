import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const Home = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<>
			<Navbar />
		</>
	);
};

export default Home;
