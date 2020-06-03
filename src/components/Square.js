import React, { Component } from "react";

export default class Square extends Component {
	render() {
		return (
			<div className="box d-flex justify-content-center align-items-center" onClick={() => this.props.boxClick(this.props.valueX, this.props.valueY)}>
				{/* box {this.props.id} */}
				<div>
					{this.props.value === "X" ? <span className="red">X</span> : ""}
					{this.props.value === "O" ? <span className="green">O</span> : ""}
				</div>
				<div className="vertical-line"></div>
				<div className="horizontal-line"></div>
			</div>
		);
	}
}
