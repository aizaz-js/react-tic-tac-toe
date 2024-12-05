import { useState } from "react";
import { Header, Player, GameBoard, Log, GameOver } from "@components";
import { WINNING_COMBINATIONS } from "./data";

const PLAYERS = { X: "Player 1", O: "Player 2" };

const INITIAL_GAMEBOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveActivePlayer(gameTurns) {
	return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
}

function deriverWinner(gameBoard, players) {
	for (const combination of WINNING_COMBINATIONS) {
		const [first, second, third] = combination;
		const firstSymbol = gameBoard[first.row][first.column];
		const secondSymbol = gameBoard[second.row][second.column];
		const thirdSymbol = gameBoard[third.row][third.column];
		if (
			firstSymbol &&
			firstSymbol === secondSymbol &&
			firstSymbol === thirdSymbol
		) {
			return players[firstSymbol];
		}
	}
	return null;
}

function deriveGameBoard(gameTurns) {
	const gameBoard = INITIAL_GAMEBOARD.map((array) => [...array]);
	for (const { square, player } of gameTurns) {
		const { row, col } = square;
		gameBoard[row][col] = player;
	}
	return gameBoard;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	const [players, setPlayers] = useState(PLAYERS);
	const activePlayer = deriveActivePlayer(gameTurns);
	const derivedGameBoard = deriveGameBoard(gameTurns);
	const winner = deriverWinner(derivedGameBoard, players);
	const hasDraw = gameTurns.length === 9 && !winner;

	function handleSelectSquare(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			const derivedBoard = deriveGameBoard(prevTurns);
			if (derivedBoard[rowIndex][colIndex]) return prevTurns;
			const currentPlayer = deriveActivePlayer(prevTurns);
			return [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];
		});
	}

	function handleRestart() {
		setGameTurns([]);
	}

	function handlePlayerNameChange(symbol, name) {
		setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: name }));
	}

	return (
		<>
			<Header />
			<main>
				<div id="game-container">
					<ol id="players" className="highlight-player">
						<Player
							initialName={PLAYERS.X}
							symbol="X"
							isActive={activePlayer === "X"}
							onChangeName={handlePlayerNameChange}
						/>
						<Player
							initialName={PLAYERS.O}
							symbol="O"
							isActive={activePlayer === "O"}
							onChangeName={handlePlayerNameChange}
						/>
					</ol>
					{(winner || hasDraw) && (
						<GameOver onRestart={handleRestart} winner={winner} />
					)}
					<GameBoard
						board={derivedGameBoard}
						onSelectSquare={handleSelectSquare}
					/>
				</div>
				<Log turns={gameTurns} />
			</main>
		</>
	);
}

export default App;
