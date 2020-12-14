<<<<<<< HEAD
import "./App.css";
import { useState, useEffect } from "react"
import styled from "styled-components";

const Page = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 16px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${p => p.isStart ? "red" : "green"};
  color: white;
  margin: 0.5rem;
  :disabled {
    opacity: 0.2;
  }
`
const Start = styled(Button)`
  background-color: green;
`
const Stop = styled(Button)`
  background-color: red;
`
const Timer = styled.p`
  font-size: 60px;
  padding: 0px;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const timeFormat = (ms) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  
  if (minutes && minutes < 10 && seconds < 10) return `0${minutes}:0${seconds}`
  if (minutes && minutes < 10) return `0${minutes}:${seconds}`
  if (minutes) return `${minutes}:${seconds}`
  if (seconds < 10) return `00:0${seconds}`
  return `00:${seconds}`
}

function App() {
  const [start, setStart] = useState(false)
  const [count, setCount] = useState(0)
  // const [startTime, setStartTime] = useState(new Date())
  // const [stopTime, setStopTime] = useState(new Date())

  const handleStart = () => {
    setCount(1)
    setStart(true)
  }
  
  const handleStop = () => {
    setCount(0)
    setStart(false)
      // setStopTime(new Date())
      // setStartTime(new Date())
  }

  useEffect(() => {
    if (count === 0) return
    setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  }, [count])

  return (
    <Page>
      <Wrapper>
        {/* <p>Start: {startTime.toLocaleString()}</p>
        <p>Stop: {stopTime.toLocaleString()}</p> */}
        <p>{count}</p>
        {/* <Timer>{timeFormat(stopTime - startTime)}</Timer> */}
        <Start onClick={handleStart} disabled={start}>Start</Start>
        <Stop onClick={handleStop} disabled={!start}>Stop</Stop>
      </Wrapper>
    </Page>
=======
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const InnerWrapper = styled.div`
  width: 210px;
`;
const Timer = styled.p`
  font-size: 40px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 6px;
  margin: 0 0 10px;
  opacity: ${(p) => (p.active ? 1 : 0.3)};
  transition: opacity 100ms ease-in-out;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 15px;
  width: 100%;
  border-radius: 6px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  :first-child {
    margin-right: 5px;
  }
`;
const Reset = styled(Button)`
  background-color: #781122;
  color: #fff;
`;

const formatTime = (sec) => {
  const seconds = sec % 60;
  const minutes = Math.floor(sec / 60);
  const hours = Math.floor(minutes / 60);
  const ss = seconds > 9 ? seconds : `0${seconds}`;
  const mm = minutes > 9 ? minutes : `0${minutes}`;
  const hh = hours > 9 ? hours : `0${hours}`;
  return `${hh}:${mm}:${ss}`;
};

function App() {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(formatTime(0));

  const handleReset = () => {
    setActive(false);
    setCount(0);
    setTimer(formatTime(0));
  };

  useEffect(() => {
    let interval;

    if (active) {
      interval = setInterval(() => {
        setCount(count + 1);
      }, 1000);
    }
    setTimer(formatTime(count));
    return () => clearInterval(interval);
  }, [active, count]);

  return (
    <Wrapper>
      <InnerWrapper>
        <Timer active={active}>{timer}</Timer>
        <Buttons>
          {!active && <Button onClick={() => setActive(true)}>Start</Button>}
          {active && <Button onClick={() => setActive(false)}>Pause</Button>}
          {<Reset onClick={handleReset}>Reset</Reset>}
        </Buttons>
      </InnerWrapper>
    </Wrapper>
>>>>>>> eea7d27c6411faba292b65afd5be9fc1e144da86
  );
}

export default App;