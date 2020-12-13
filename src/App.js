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
  );
}

export default App;