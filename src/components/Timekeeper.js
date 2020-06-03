import React, { Component } from "react";

export default class Timekeeper extends Component {
	// constructor() {
	// 	super();
	// 	this.timeElapsed = 0;
	// }
	// timeCount = () => {
	// 	if (this.props.time !== 0 && this.props.winner === null) {
	// 		let localElapsedTime = Math.floor((Date.now() - this.props.time) / 1000);
	// 		if (localElapsedTime !== this.props.timeElapsed) this.props.setTheState({ timeElapsed: localElapsedTime });
	// 	}
	// };
	// componentDidMount() {
	// 	this.timeCount();
	// }
	render() {
		return <div>Time elapsed: {this.props.time}</div>;
	}
}
