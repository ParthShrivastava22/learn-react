import { useState } from "react";

export default function Player({ name, symbol, isActive, rename }) {
  const [playerName, setPlayerName] = useState(name);

  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing((isEditing) => !isEditing);
    rename(symbol, playerName);
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <li className={`${isActive ? "active" : ""} `}>
      <span className="player">
        {editing ? (
          <input
            type="text"
            placeholder="Player Name"
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{editing ? "Save" : "Edit"}</button>
    </li>
  );
}
