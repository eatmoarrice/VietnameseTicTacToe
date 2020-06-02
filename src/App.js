import React, { Component } from "react";
import Board from "./components/Board";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9)
				.fill(null)
				.map((x) => Array(9).fill(null)),
			isXNext: true,
		};
	}

	setTheState = (obj) => {
		this.setState(obj);
	};
	render() {
		return (
			<div>
				<Board {...this.state} setTheState={this.setTheState} />
			</div>
		);
	}
}
