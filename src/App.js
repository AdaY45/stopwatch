import { useState, useEffect } from "react";
import { interval, Subject, takeUntil } from "rxjs";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import useDoubleClick from "./hooks/use-doubleClick";

import "./App.css";

function App() {
  const [isSet, setIsSet] = useState(false);
  const [time, setTime] = useState(0);
  const [isWait, setIsWait] = useState(false);

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (isSet) {
          setTime((val) => val + 1);
        }
      });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [isSet]);

  const startStopHandler = () => {
    if (!isWait) {
      setTime(0);
    }
    setIsSet((prevState) => !prevState);
    setIsWait(false);
  };

  const waitHandler = () => {
    setIsWait(true);
    setIsSet((prevState) => !prevState);
  };

  const resetHandler = () => {
    setTime(0);
    setIsSet(false);
    startStopHandler();
  };

  const startStopClass = !isSet ? "start-btn" : "stop-btn";
  const refCallback = useDoubleClick(waitHandler);

  return (
    <div className="container">
      <div className="stopwatch-container">
        <h2 className="header-text">Stopwatch</h2>
        <Stopwatch time={time} />
        <button className={startStopClass} onClick={startStopHandler}>
          {!isSet ? "Start" : "Stop"}
        </button>
        {isSet ? (
          <button className="wait-btn" ref={refCallback}>
            Wait
          </button>
        ) : (
          <button className="wait-btn" ref={refCallback} disabled>
            Wait
          </button>
        )}
        <button className="reset-btn" onClick={resetHandler}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
