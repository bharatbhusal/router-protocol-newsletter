// index.js

import React from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from "./App";
// import {
// 	LogIn,
// 	SignUp,
// 	ForgotPassword,
// } from "./components/auth/Auth";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";

import { DateProvider } from "./context/dateContext";
import { NewsProvider } from "./context/newsContext";
import { UserProvider } from "./context/userContext";
import AddNews from "./components/news/AddNews";
import ListNews from "./components/news/ListNews";
import PageNotFound from "./components/utils/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "./serviceWorker"; // Import the register function
import "./index.css";
import UserProfile from "./components/UserProfile";

const divContainer = document.getElementById("root");
const root = createRoot(divContainer);

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <PageNotFound />,
		children: [
			{
				path: "/",
				element: <ListNews />,
			},
			{ path: "/login", element: <LogIn /> },
			{ path: "/add-news", element: <AddNews /> },
			{ path: "/signup", element: <SignUp /> },
			// userMenu
			{ path: "/profile", element: <UserProfile /> },

			{ path: "/reset", element: <ForgotPassword /> },
		],
	},
]);

root.render(
	<UserProvider>
		<NewsProvider>
			<DateProvider>
				<ToastContainer />
				<RouterProvider router={router} />
			</DateProvider>
		</NewsProvider>
	</UserProvider>
);

// Register the service worker
// register();
