import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import "./App.css";

import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(generateDice);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const firstValue = dice[0].value;
    const isAllDiceHeld = dice.every((die) => die.isHeld);
    const isAllDiceSame = dice.every((die) => die.value === firstValue);
    if (isAllDiceHeld && isAllDiceSame) setTenzies(true);
  }, [dice]);

  function generateRanNumber() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function generateDice() {
    let allDice = [];
    for (let i = 0; i < 10; i++) {
      allDice.push(generateRanNumber());
    }
    return allDice;
  }

  function rollDice() {
    const filteredDice = dice.map((die) => {
      return die.isHeld ? die : generateRanNumber();
    });
    setDice(filteredDice);
  }

  function holdDice(id) {
    setDice((oldDice) => {
      return oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      );
    });
  }

  function resetDice() {
    setDice(generateDice);
    setTenzies(false);
  }

  const displayAllDice = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onClick={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="app">
      {tenzies && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className={tenzies ? "tenzies animate" : "tenzies"}>
        <h2 className="tenzies-title">Tenzies</h2>
        <p className="tenzies-desc">
          Roll Dice and select same number on all dice to win game.
        </p>
        <div className="dice-container">{displayAllDice}</div>
        <button
          onClick={tenzies ? resetDice : rollDice}
          className="roll-dice-btn"
        >
          {tenzies ? "New Game" : "Roll Dice"}
        </button>
      </div>
    </div>
  );
}

export default App;
