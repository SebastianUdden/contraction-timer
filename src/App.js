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
  text-align: center;
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
          {active && <Button onClick={() => setActive(false)}>Stop</Button>}
          {<Reset onClick={handleReset}>Reset</Reset>}
        </Buttons>
      </InnerWrapper>
    </Wrapper>
  );
}

export default App;