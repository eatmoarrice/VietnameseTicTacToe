import React, { Component } from "react";
import Square from "./Square";

const row = 9;
const column = 9;

export default class Board extends Component {
	renderSquare = (x, y) => {
		return <Square id={x * row + y} boxClick={this.boxClick} valueX={x} valueY={y} value={this.props.squares[x][y]} />;
	};
	// renderRow = (row, numPerRow) => {
	// 	let rowHTML = [];
	// 	for (let i = (row - 1) * numPerRow; i < row * numPerRow; i++) {
	// 		rowHTML.push(this.renderSquare(i));
	// 	}
	// 	console.log(this.renderSquare(0));
	// 	return rowHTML;
	// };
	renderGrid = () => {
		let gridHTML = [];
		for (let x = 0; x < row; x++) {
			let rowHTML = [];
			// console.log(rowHTML);
			for (let y = 0; y < column; y++) {
				rowHTML.push(this.renderSquare(x, y));
			}
			gridHTML.push(<div className="ticrow">{rowHTML}</div>);
		}

		return gridHTML;
	};

	checkAroundClick = (x, y, currentPlayer, enemyPlayer) => {
		let boardCoord = this.props.squares;
		// console.log(boardCoord[x][y]);
		let streakN = 0;
		let streakW = 0;
		let streakS = 0;
		let streakE = 0;
		let streakNW = 0;
		let streakNE = 0;
		let streakSW = 0;
		let streakSE = 0;
		let wrapHor = 0;
		let wrapVer = 0;
		let wrapDiag = 0;
		let wrapDiag2 = 0;

		// console.log(boardCoord[x - 1][y - 1] == "X");
		// North
		while (x - streakN >= 0 && boardCoord[x - streakN][y] == currentPlayer) {
			streakN += 1;
		}
		if (x - streakN - 1 >= 0 && boardCoord[x - streakN - 1][y] == enemyPlayer) {
			wrapVer += 1;
			console.log("hahaha");
		}
		//South
		while (x + streakN < row && boardCoord[x + streakS][y] == currentPlayer) {
			streakS += 1;
		}
		if (x + streakN + 1 < row && boardCoord[x + streakN + 1][y] == enemyPlayer) {
			wrapVer += 1;
			console.log("hahaha");
		}
		//West
		while (y - streakW >= 0 && boardCoord[x][y - streakW] == currentPlayer) {
			streakW += 1;
		}
		if (y - streakW - 1 >= 0 && boardCoord[x][y - streakW - 1] == enemyPlayer) {
			wrapHor += 1;
			console.log("hahaha");
		}
		console.log(boardCoord[x][y - streakW - 1]);
		//East
		while (y + streakE < column && boardCoord[x][y + streakE] == currentPlayer) {
			streakE += 1;
		}
		if (y + streakE + 1 < column && boardCoord[x][y + streakE + 1] == enemyPlayer) {
			wrapHor += 1;
			console.log("hahaha");
		}
		//NW
		while (x - streakNW >= 0 && y - streakNW >= 0 && boardCoord[x - streakNW][y - streakNW] == currentPlayer) {
			streakNW += 1;
		}
		if (x - streakNW - 1 >= 0 && y - streakNW - 1 >= 0 && boardCoord[x - streakNW - 1][y - streakNW - 1] == enemyPlayer) {
			wrapDiag += 1;
			console.log("hahaha");
		}
		//NE
		while (x - streakNE >= 0 && y + streakNE < column && boardCoord[x - streakNE][y + streakNE] == currentPlayer) {
			streakNE += 1;
		}
		if (x - streakNE - 1 >= 0 && y + streakNE + 1 < column && boardCoord[x - streakNE - 1][y + streakNE + 1] == enemyPlayer) {
			wrapDiag2 += 1;
			console.log("hahaha");
		}

		//SW
		while (x + streakSW < row && y - streakSW >= 0 && boardCoord[x + streakSW][y - streakSW] == currentPlayer) {
			streakSW += 1;
		}
		if (x + streakSW + 1 < row && y - streakSW - 1 >= 0 && boardCoord[x + streakSW + 1][y - streakSW - 1] == enemyPlayer) {
			wrapDiag2 += 1;
		}

		//SE
		while (x + streakSE < row && y + streakSE < column && boardCoord[x + streakSE][y + streakSE] == currentPlayer) {
			streakSE += 1;
		}
		if (x + streakSE + 1 < row && y + streakSE + 1 < column && boardCoord[x + streakSE + 1][y + streakNW + 1] == enemyPlayer) {
			wrapDiag += 1;
		}

		let hor = streakW + streakE - 1;
		if (streakW == 0 || streakE == 0) hor += 1;
		let ver = streakN + streakS - 1;
		if (streakN == 0 || streakS == 0) ver += 1;
		let diag1 = streakNE + streakSW - 1;
		if (streakNE == 0 || streakSW == 0) diag1 += 1;
		let diag2 = streakNW + streakSE - 1;
		if (streakNW == 0 || streakSE == 0) diag2 += 1;
		console.log(ver, wrapVer);
		if ((hor >= 5 && wrapHor < 2) || (ver >= 5 && wrapVer < 2) || (diag1 >= 5 && wrapDiag2 < 2) || (diag2 >= 5 && wrapDiag < 2)) {
			// if (hor >= 5 || ver >= 5 || diag1 >= 5 || diag2 >= 5) {
			alert(currentPlayer + " wins!");
		}
	};

	// checkBoard = (player, enemy) => {
	// 	let squareFromApp = this.props.squares;
	// 	// console.log("yaya", squareFromApp[0][3]);
	// 	let winningCordinations = [null, null];
	// 	let streak = 0;
	// 	let startXY = [null, null];
	// 	let endXY = [null, null];
	// 	// right
	// 	// console.log(squareFromApp);
	// 	for (let x = 0; x < row; x++) {
	// 		streak = 0;
	// 		for (let y = 0; y < column; y++) {
	// 			if (squareFromApp[x][y] == player) {
	// 				streak += 1;
	// 				// console.log("streak", streak, y);
	// 			} else streak = 0;
	// 			if (streak == 1) {
	// 				startXY = [x, y];
	// 			}
	// 			if (streak == 3) {
	// 				endXY = [x, y];
	// 				if (squareFromApp[startXY[0]][startXY[1] - 1] != enemy || squareFromApp[endXY[0]][endXY[1] + 1] != enemy) {
	// 					winningCordinations = [startXY, endXY];
	// 				}
	// 			}
	// 			if (winningCordinations.every((item) => item !== null)) return winningCordinations;
	// 		}
	// 	}
	// 	// downleft

	// 	//downright
	// 	//dr - first row
	// 	for (let y = 0; y < column; y++) {
	// 		let streak = 0;
	// 		for (let x = 0; x < row; x++) {
	// 			console.log("wtf", y, y + x);
	// 			if (squareFromApp[y][y + x] == player) {
	// 				streak += 1;
	// 				console.log("streak diag", streak);
	// 			} else streak = 0;
	// 			if (streak == 1) {
	// 				startXY = [y, y + x];
	// 			}
	// 			if (streak == 3) {
	// 				endXY = [y, y + x];
	// 				if (squareFromApp[startXY[0] - 1][startXY[1] - 1] != enemy || squareFromApp[endXY[0] + 1][endXY[1] + 1] != enemy) {
	// 					winningCordinations = [startXY, endXY];
	// 				}
	// 			}
	// 			if (winningCordinations.every((item) => item !== null)) return winningCordinations;
	// 		}
	// 	}
	// 	//dr - first col
	// 	//downward
	// 	for (let y = 0; y < column; y++) {
	// 		streak = 0;
	// 		for (let x = 0; x < row; x++) {
	// 			if (squareFromApp[x][y] == player) {
	// 				streak += 1;
	// 				// console.log("streak", streak, y);
	// 			} else streak = 0;
	// 			if (streak == 1) {
	// 				startXY = [x, y];
	// 			}
	// 			if (streak == 3) {
	// 				endXY = [x, y];
	// 				if (squareFromApp[startXY[0] - 1][startXY[1]] != enemy || squareFromApp[endXY[0] - 1][endXY[1]] != enemy) {
	// 					winningCordinations = [startXY, endXY];
	// 				}
	// 			}
	// 			if (winningCordinations.every((item) => item !== null)) return winningCordinations;
	// 		}
	// 	}
	// };

	checkWinner = () => {
		// console.log(this.checkBoard("X", "O"));
		// console.log(this.checkBoard("O", "X"));
	};

	boxClick = (x, y) => {
		let squareFromApp = this.props.squares;
		if (squareFromApp[x][y] == null) {
			squareFromApp[x][y] = this.props.isXNext ? "X" : "O";
			let currentPlayer = squareFromApp[x][y];
			let enemyPlayer = currentPlayer == "X" ? "O" : "X";
			this.props.setTheState({ squares: squareFromApp, isXNext: !this.props.isXNext });
			this.checkWinner();
			this.checkAroundClick(x, y, currentPlayer, enemyPlayer);
			// console.log(squareFromApp[x][y] == "X");
		}
	};

	render() {
		let status = "";
		status = `Next player: ${this.props.isXNext ? "X" : "O"}`;
		return (
			<div className="text-center d-flex flex-column align-items-center">
				<h2>{status}</h2>
				<h1>Vietnamese Tic Tac Toe!</h1>
				<h4>Get 5 in a row with at least one end NOT blocked to win!</h4>
				<div>
					{/* <div className="ticrow">{this.renderRow(1, 6)}</div>
					<div className="ticrow">{this.renderRow(2, 6)}</div>
					<div className="ticrow">{this.renderRow(3, 6)}</div>
					<div className="ticrow">{this.renderRow(4, 6)}</div>
					<div className="ticrow">{this.renderRow(5, 6)}</div>
					<div className="ticrow">{this.renderRow(6, 6)}</div> */}
					{this.renderGrid()}
				</div>
			</div>
		);
	}
}
