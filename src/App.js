import React, { useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [gifts, setGifts] = useState([]);
  const [gift, setGift] = useState("");
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [displayedGift, setDisplayedGift] = useState("");
  const [finalGift, setFinalGift] = useState(null);

  const addGift = () => {
    if (gift.trim()) {
      setGifts([...gifts, gift]);
      setGift("");
    } else {
      alert("Gift cannot be empty!");
    }
  };

  const startRandomization = () => {
    setIsRandomizing(true);
    setFinalGift(null);

    const interval = setInterval(() => {
      const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
      setDisplayedGift(randomGift);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const chosenGift = gifts[Math.floor(Math.random() * gifts.length)];
      setFinalGift(chosenGift);
      setIsRandomizing(false);
    }, 3000);
  };

  const resetApp = () => {
    setGifts([]);
    setGift("");
    setDisplayedGift("");
    setFinalGift(null);
    setIsRandomizing(false);
  };

  return (
    <div className="container custom-padding">
      <h1 className="text-center text-success mb-5">Gifts Random App</h1>

      <div className="mb-3 d-flex justify-content-center">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter a gift"
          value={gift}
          onChange={(e) => setGift(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addGift();
            }
          }}
          style={{ maxWidth: "300px" }}
        />
        <button className="btn btn-success" onClick={addGift}>
          Add Gift
        </button>
      </div>

      <p className="text-center">
        You have added <strong>{gifts.length}</strong> gift(s).
      </p>

      <div className="text-center mb-4">
        <button
          className="btn btn-primary me-2"
          onClick={startRandomization}
          disabled={gifts.length === 0 || isRandomizing}
        >
          Start Random
        </button>
      </div>

      <div className="text-center">
        {isRandomizing && (
          <p className="text-warning fs-4">Randomizing: {displayedGift}</p>
        )}
        {finalGift && (
          <h2 className="text-danger">
            Final Gift: <strong>{finalGift}</strong> 🎉
          </h2>
        )}
      </div>
      <div className="text-center mb-4" idName="reset">
      <button className="btn btn-danger" onClick={resetApp}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;