import axios from "axios";

const HttpClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 60000 * 2,
});

HttpClient.interceptors.request.use(
	(config) => {
		const {
			screenResolution,
			userAgent,
			language,
			timezone,
			colorDepth,
			hardwareConcurrency,
			touchSupport,
			onlineStatus,
			deviceMemory,
		} = getClientFingerprint();

		config.headers["x-screen-resolution"] = screenResolution;
		config.headers["x-user-agent"] = userAgent;
		config.headers["x-language"] = language;
		config.headers["x-timezone"] = timezone;
		config.headers["x-color-depth"] = colorDepth;
		config.headers["x-hardware-concurrency"] = hardwareConcurrency;
		config.headers["x-touch-support"] = touchSupport;
		config.headers["x-online-status"] = onlineStatus;
		config.headers["x-device-memory"] = deviceMemory;

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

HttpClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		if (error && error.response) {
			const originalRequest = error.config;
			if (error.response.status === 401 && !originalRequest._retry) {
				// Token Expired
			}

			if (error.response.status === 404) {
				// Not Found
			}

			if (error.response.status === 400) {
				// Not Found
				if (error.response.data.message === "Forbidden") {
					return Promise.reject(403);
				}
			}

			if (error.response.status === 403) {
				window.location.reload();
			}

			if (error.response.status === 504) {
				// Gateway Timeout
				return Promise.reject({
					message: `Something weng wrong. Please check your internet connection or contact administrator.`,
				});
			}

			if (error.response.status === 504) {
				// Gateway Timeout
				return Promise.reject({
					message: `Something weng wrong. Please check your internet connection or contact administrator.`,
				});
			}

			if (error.response.status === 500) {
				if (error.response.data.message === "DUPLICATE_LOGIN") {
					alert("พบการเข้าสู่ระบบซ้อน กรุณาเข้าสู่ระบบใหม่เพื่อใช้งานอีกครั้ง");
					window.location.reload();
				}
				//
			}

			return Promise.reject(error.response.data);
		} else {
			return Promise.reject({
				message: `Something went wrong. Please check your internet connection or contact administrator.`,
			});
		}
	}
);

export const setAccessToken = (token: string | null) => {
	if (token) {
		localStorage.setItem("accessToken", token);
		HttpClient.defaults.headers.common.Authorization = "Bearer " + token;
	}
};

export const getClientFingerprint = () => {
	const screenResolution = `${window.screen.width}x${window.screen.height}`;
	const userAgent = navigator.userAgent;
	const language = navigator.language;
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const colorDepth = window.screen.colorDepth;
	const hardwareConcurrency = navigator.hardwareConcurrency || "unknown";
	const touchSupport =
		"ontouchstart" in window || navigator.maxTouchPoints > 0 ? "true" : "false";
	const onlineStatus = navigator.onLine ? "online" : "offline";
	const deviceMemory = (navigator as any).deviceMemory || "unknown";

	return {
		screenResolution,
		userAgent,
		language,
		timezone,
		colorDepth,
		hardwareConcurrency,
		touchSupport,
		onlineStatus,
		deviceMemory,
	};
};

export default HttpClient;
