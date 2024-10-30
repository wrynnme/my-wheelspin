import Link from "next/link";

const Navbar = (props: any) => {
	const pages = ["01", "02", "03", "04", "05"];
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<div className="btn btn-ghost text-xl">
					<Link href="./">HOME</Link>
				</div>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					{pages.map((page, index) => (
						<li key={index}>
							<Link href={page}>{page}</Link>
						</li>
					))}
					<li>
						<Link href="Login">Login</Link>
					</li>
					<li>
						<details>
							<summary>Theme</summary>
							<ul className="bg-base-100 rounded-t-none p-2">
								<li>
									<input
										type="radio"
										name="theme-buttons"
										className="btn theme-controller join-item"
										aria-label="Light"
										value="light"
									/>
								</li>
								<li>
									<input
										type="radio"
										name="theme-buttons"
										className="btn theme-controller join-item"
										aria-label="Dark"
										value="dark"
									/>
								</li>
								<li>
									<input
										type="radio"
										name="theme-buttons"
										className="btn theme-controller join-item"
										aria-label="Cupcake"
										value="cupcake"
									/>
								</li>
								<li>
									<input
										type="radio"
										name="theme-buttons"
										className="btn theme-controller join-item"
										aria-label="Dracula"
										value="dracula"
									/>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</div>
	);
};

Navbar.propTypes = {};

export default Navbar;
