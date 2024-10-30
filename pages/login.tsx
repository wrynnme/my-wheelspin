import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const Login = (props: any) => {
	const { user, login } = useContext(AuthContext);
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	if (user) {
		router.push("/");
		return null;
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// Login(username, password);
		router.push("/");
	};

	return (
		<div className="container mx-auto flex justify-center">
			<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
				<form onSubmit={handleSubmit} className="card-body">
					<div className="form-control">
						<label className="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="h-4 w-4 opacity-70"
							>
								<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
							</svg>
							<input
								type="text"
								className="grow"
								placeholder="Username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</label>
					</div>
					<div className="form-control">
						<label className="input input-bordered flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="h-4 w-4 opacity-70"
							>
								<path
									fillRule="evenodd"
									d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
									clipRule="evenodd"
								/>
							</svg>
							<input
								type="password"
								className="grow"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
					</div>
					<div className="form-control">
						<button type="submit" className="btn btn-active btn-primary">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

Login.propTypes = {};

export default Login;
