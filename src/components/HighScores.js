import React, { Component } from "react";

export default class HighScores extends Component {
	render() {
		return (
			<div className="scoreboard">
				<h2 className="scoreboard-title">Scoreboard</h2>
				<hr></hr>
				{this.props.topList.map((item, i) => {
					return (
						<div key={i}>
							{item.player} : {item.score}
						</div>
					);
				})}
			</div>
		);
	}
}
