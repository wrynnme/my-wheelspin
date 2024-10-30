import PrivateRoute from "@/routes/PrivateRoute";
import store from "@/store/index";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<Head>
				<title>My Roulette</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content="My Roulette" />
				{/* <link rel="icon" href="/favicon.png" /> */}
			</Head>
			<PrivateRoute>
				<Component {...pageProps} />
			</PrivateRoute>
		</Provider>
	);
};

export default App;
