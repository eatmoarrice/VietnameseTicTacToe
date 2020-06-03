import React, { Component } from "react";

export default class HighScores extends Component {
	render() {
		return (
			<div className="scoreboard">
				<h2 className="scoreboard-title">Scoreboard</h2>
				<hr></hr>
				{this.props.topList.map((item) => {
					return (
						<div>
							{item.player} : {item.score}
						</div>
					);
				})}
			</div>
		);
	}
}
