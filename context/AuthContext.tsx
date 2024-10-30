import HttpClient from "@/services/http-client";
import { createContext, useEffect, useState } from "react";

interface AuthContextType {
	isAuthorized: boolean;
	loading: boolean;
	setLoading: (value: boolean) => void;
	user: any | null;
	setUser: (value: any | null) => void;
	verifyPermission: (menu: string) => void;
	login: (username: string, password: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	isAuthorized: false,
	loading: false,
	setLoading: () => Boolean,
	user: null,
	setUser: () => null,
	verifyPermission: async () => Promise.resolve(),
	login: async () => Promise.resolve(),
	logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState(null);

	const login = async (username: string, password: string) => {
		// ทำการเรียก API สำหรับล็อกอิน
		// ตัวอย่าง (ควรเปลี่ยน URL และวิธีการตาม API ของคุณ)
		try {
			const response = await HttpClient.post(`/login`, {
				username: username,
				password: password,
			}).then((response: any) => response.data);
			console.log(response);
			const data = response;
			/* const response = await fetch("https://yourapi.com/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: username, password }),
			});
			const data = await response.json(); */

			if (data.user) {
				setUser(data.user);
				localStorage.setItem("token", data.token);
			} else {
				alert("Login failed");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("token");
		// ทำการเรียก API สำหรับล็อกเอาท์ถ้าจำเป็น
	};

	// ตรวจสอบการล็อกอินเมื่อโหลดครั้งแรก
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			// ทำการเรียก API เพื่อรับข้อมูลผู้ใช้งานจาก Token
			// ตัวอย่าง:
			fetch("https://yourapi.com/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.user) {
						setUser(data.user);
					} else {
						localStorage.removeItem("token");
					}
				})
				.catch((err) => {
					console.error("Error fetching user:", err);
					localStorage.removeItem("token");
				});
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
