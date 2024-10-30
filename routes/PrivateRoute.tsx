import { useAuth } from "@/hooks/useAuth";

const PrivateRoute = ({ children }: any) => {
	const { user } = useAuth();
	return children;
};

export default PrivateRoute;
