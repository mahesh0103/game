import "./App.css";
import Die from "./Die";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [die, setDie] = React.useState(die_random());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = die.every((die) => die.isHeld);
    const firstValue = die[0].value;
    const allSame = die.every((die) => die.value === firstValue);
    if (allHeld && allSame) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [die]);

  function Roll() {
    setDie((old) =>
      old.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6) + 1 };
      })
    );
  }

  function holdDice(id) {
    setDie((old) =>
      old.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  function die_random() {
    let roll = [];
    for (let i = 0; i < 10; i++) {
      roll.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return roll;
  }

  function newGame() {
    setTenzies(false);
    setDie(die_random());
  }

  const diceElements = die.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      Hold={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="container-fluid">
      {tenzies && <Confetti />}
      <div className="border" id="b1">
        <div className="d-flex flex-column border m-4" id="b2">
          <div className="col m-4" id="b3">
            <h1>Tenzies</h1>
            <p>
              Roll until all dice are the same .Click each dice to freeze it at
              its current value
            </p>
          </div>
          <div
            className="row row-cols-5 p-2 m-auto justify-content-center"
            id="b4"
          >
            {diceElements}
          </div>
          <div className="col-auto d-block my-3 mx-auto">
            {tenzies ? (
              <button onClick={newGame} id="button">
                New Game
              </button>
            ) : (
              <button onClick={Roll} id="button">
                Roll
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
