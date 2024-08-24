import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { getUserById } from "../apis/usersAPIs";

const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const [newsByGivenUser, setNewsByGivenUser] = useState([]);

	useEffect(() => {
		const getUser = async () => {
			try {
				if (user) {
					const response = await getUserById(user.id);
					setUser(response);
				}
			} catch (error) {
				console.error("Failed to fetch user:", error.message);
			}
		};
		getUser();
	}, []);
	return (
		<UserContext.Provider
			value={{
				setUser,
				user,
				newsByGivenUser,
				setNewsByGivenUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, useUserContext };
