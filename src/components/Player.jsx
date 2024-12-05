import { useState } from "react";

export function Player({ initialName, symbol, isActive, onChangeName }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	function handleChange(event) {
		setPlayerName(event.target.value);
	}

	function handleEditClick() {
		setIsEditing((editing) => !editing);
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	}
	return (
		<li className={isActive ? "active" : ""}>
			<span className="player">
				{isEditing ? (
					<input
						type="text"
						required
						value={playerName}
						onChange={handleChange}
					/>
				) : (
					<span className="player-name">{playerName}</span>
				)}
				<span className="player-symbol">{symbol}</span>
				<button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
			</span>
		</li>
	);
}
