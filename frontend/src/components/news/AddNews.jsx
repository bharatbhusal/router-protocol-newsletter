import React, {
	Fragment,
	useState,
	useEffect,
} from "react";
import { addNews } from "../../apis/newsAPIs";
import { useNewsContext } from "../../context/newsContext";
import { getNewsByDate } from "../../apis/newsAPIs";
import { useDateContext } from "../../context/dateContext";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import LogIn from "../auth/LogIn";
import ListNews from "./ListNews";

const AddNews = () => {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		if (!user) navigate("/login");
	});
	const [newNews, setNewNews] = useState({
		headline: "",
		summary: "",
		source: "",
		reporter: "",
	});
	const { setNewsOfGivenDate } = useNewsContext();
	const { date } = useDateContext();

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			await addNews({
				...newNews,
				reporter: user.email,
			});
			setNewsOfGivenDate(
				await getNewsByDate(
					date.year(),
					date.month() + 1,
					date.date()
				)
			);
			setNewNews({
				headline: "",
				summary: "",
				source: "",
				reporter: "",
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Fragment>
			{localStorage.getItem("user-jwt-token") ? (
				<>
					<div className="titles">
						<h2
							style={{
								fontWeight: "bold",
								maxWidth: "842px",
								marginTop: "2rem",
							}}
						>
							Add News
						</h2>
					</div>

					<form
						className="d-flex input_news"
						onSubmit={onSubmitForm}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="headline"
							label="Headline"
							name="headline"
							autoFocus
							value={newNews.headline}
							onChange={(e) =>
								setNewNews({ ...newNews, headline: e.target.value })
							}
						/>

						<textarea
							style={{ height: "10rem" }}
							className="form-control input_news"
							type="text"
							name="summary"
							placeholder="Summary"
							value={newNews.summary}
							onChange={(e) =>
								setNewNews({ ...newNews, summary: e.target.value })
							}
						/>

						<TextField
							type="url"
							margin="normal"
							required
							fullWidth
							id="source"
							label="Source"
							name="Source"
							value={newNews.source}
							onChange={(e) =>
								setNewNews({ ...newNews, source: e.target.value })
							}
						/>
						<Button
							type="submit"
							color="success"
							variant="contained"
							sx={{ mt: 1, mb: 0, padding: "10px 3rem" }}
						>
							Add
						</Button>
					</form>
					<ListNews />
				</>
			) : (
				<LogIn />
			)}
		</Fragment>
	);
};

export default AddNews;
