import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../Img/companyLogo.PNG";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
	const [isSignUp, setIsSignUp] = useState(false); // Initially show the login page
	const dispatch = useDispatch();
	const loading = useSelector(
		(state) => state.authReducer?.loading
	);
	const [data, setData] = useState({
		firstName: "Bharat",
		lastName: "Bhusal",
		email: "bharat@gmail.com",
		password: "aaa",
		confirmPass: "aaa",
	});

	const [confirmPass, setConfirmPass] = useState(true);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
		if (!confirmPass) {
			setConfirmPass(true); // Clear the confirm password error message on typing
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isSignUp) {
			data.password === data.confirmPass
				? dispatch(signUp(data))
				: setConfirmPass(false);
		} else {
			dispatch(logIn(data));
		}
	};

	const resetForm = () => {
		setConfirmPass(true);
		setData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPass: "",
		});
	};

	return (
		<div className="Auth">
			<div className="a-left">
				<img src={Logo} alt="" />
				<div className="Webname">
					<h2>Router Protocol Newsletter</h2>
					<h5>Stay Informed, Stay Ahead</h5>
				</div>
			</div>

			<div className="a-right">
				<form
					className="infoForm authForm"
					onSubmit={handleSubmit}
				>
					<h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

					{isSignUp && (
						<div>
							<input
								type="text"
								placeholder="First Name"
								className="infoInput"
								name="firstName"
								required
								onChange={handleChange}
								value={data.firstName}
							/>
							<input
								type="text"
								placeholder="Last Name"
								className="infoInput"
								name="lastName"
								required
								onChange={handleChange}
								value={data.lastName}
							/>
						</div>
					)}

					<div>
						<input
							type="text"
							placeholder="Email"
							className="infoInput"
							name="email"
							required
							onChange={handleChange}
							value={data.email}
						/>
					</div>

					<div>
						<input
							type="password"
							placeholder="Password"
							className="infoInput"
							name="password"
							required
							onChange={handleChange}
							value={data.password}
						/>
						{isSignUp && (
							<input
								type="password"
								placeholder="Confirm Password"
								className="infoInput"
								name="confirmPass"
								required
								onChange={handleChange}
								value={data.confirmPass}
							/>
						)}
					</div>

					{isSignUp && (
						<span
							style={{
								display: confirmPass ? "none" : "block",
								color: "red",
								fontSize: "12px",
								alignSelf: "flex-end",
								marginRight: "5px",
							}}
						>
							* Confirm Password does not match
						</span>
					)}

					<div>
						<span
							style={{ fontSize: "12px", cursor: "pointer" }}
							onClick={() => {
								setIsSignUp((prev) => !prev);
								resetForm();
							}}
						>
							{isSignUp
								? "Already have an account? Login here"
								: "Don't have an account? Sign Up here"}
						</span>
					</div>

					<button
						className="button infoButton"
						type="submit"
						disabled={loading}
					>
						{loading
							? isSignUp
								? "Signing Up..."
								: "Logging In..."
							: isSignUp
							? "Sign Up"
							: "Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Auth;