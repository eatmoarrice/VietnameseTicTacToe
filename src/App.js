import React, { Component } from "react";
import Board from "./components/Board";
import History from "./components/History";
import FacebookLogin from "react-facebook-login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Timekeeper from "./components/Timekeeper";
import HighScores from "./components/HighScores";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9)
				.fill(null)
				.map((x) => Array(9).fill(null)),
			isXNext: true,
			winner: null,
			time: -1,
			FBuser: null,
			avatar: null,
			history: [],
			topList: [],
		};
	}

	setTheState = (obj) => {
		this.setState(obj);
	};
	getTopScores = async () => {
		try {
			const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev?reverse`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error("data is wrong");
			}

			let result = await data.json();
			console.log(result);
			this.setState({ topList: result.items });
		} catch (err) {
			alert(err.message);
		}
	};
	componentDidMount = () => {
		this.getTopScores();
	};
	render() {
		const responseFacebook = (response) => {
			this.setTheState({ FBuser: response.name, avatar: response.picture.data.url });
			console.log(response);
		};
		return (
			<div className="text-center">
				<h1 className="title">Vietnamese Tic Tac Toe!</h1>
				<h6>Get 5 in a row with at least one end NOT blocked to win!</h6>

				<div className="d-flex flex-wrap justify-content-center">
					<div>
						<Board {...this.state} setTheState={this.setTheState} />
						<div className="text-center">{this.state.winner != null ? <h1 className="green">{this.state.winner} has won the match!</h1> : ""}</div>
					</div>

					<div className="d-flex flex-column align-items-center">
						{this.state.FBuser === null ? (
							<FacebookLogin autoLoad={false} appId="270564750982029" fields="name,email,picture" callback={(resp) => responseFacebook(resp)} />
						) : (
							<span>
								Welcome {this.state.FBuser}! <img src={this.state.avatar} />
							</span>
						)}
						{this.state.time >= 0 ? <Timekeeper time={this.state.time} /> : ""}
						<HighScores topList={this.state.topList} />
					</div>
					{/* <History {...this.state} setTheState={this.setTheState} /> */}
				</div>
			</div>
		);
	}
}
