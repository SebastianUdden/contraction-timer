import { useEffect, useState } from "react";
import styled from "styled-components";
import Item from "./Item";
import { formatTime } from "./utils";

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 20px 0px 0;
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
const HistoryWrapper = styled.div`
  background-color: #efefef;
  color: #000;
  padding: 15px;
  margin: 15px 0;
  border-radius: 6px;
  cursor: pointer;
`;
const Header = styled.h1`
  margin: 5px 0;
  font-size: 25px;
`;
const Title = styled.h2`
  margin: 5px 0;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;
const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: ${(p) => (p.show ? "100vh" : "200px")};
  overflow: ${(p) => (p.show ? "auto" : "hidden")};
  transition: max-height 300ms ease-in-out;
  transition-delay: 200ms;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const Button = styled.button`
  padding: 15px;
  width: 100%;
  border-radius: 6px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  :last-child {
    margin: 0;
  }
`;
const Reset = styled(Button)`
  background-color: #781122;
  color: #fff;
`;
const Arrow = styled.span`
  display: inline-block;
  transform-origin: center;
  transform: ${(p) => `rotate(${p.show ? "-180deg" : "0"})`};
  transition: transform 300ms ease-in-out;
`;

const getTimerHistory = () => {
  const timerHistory = JSON.parse(localStorage.getItem("timer-history"));
  return (
    timerHistory?.map((h) => ({
      ...h,
      start: new Date(h.start),
      end: new Date(h.end),
    })) || []
  );
};

const ContractionTimer = () => {
  const [showClearAll, setShowClearAll] = useState(false);
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(formatTime(0));
  const [start, setStart] = useState();
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [timerHistory, setTimerHistory] = useState(getTimerHistory());

  const handleReset = () => {
    setActive(false);
    setCount(0);
    setTimer(formatTime(0));
    setStart(undefined);
  };

  const handleStop = () => {
    setTimerHistory([{ start, end: new Date(), time: timer }, ...timerHistory]);
    handleReset();
  };

  const handleClearAll = () => {
    setTimerHistory([]);
  };

  useEffect(() => {
    let interval;
    if (count === 0 && active) {
      setStart(new Date());
    }

    if (active) {
      interval = setInterval(() => {
        setCount(count + 1);
      }, 1000);
    }
    setTimer(formatTime(count));
    return () => clearInterval(interval);
  }, [active, count]);

  useEffect(() => {
    localStorage.setItem("timer-history", JSON.stringify(timerHistory));
  }, [timerHistory]);

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>Värk-timer</Header>
        <Timer active={active}>{timer}</Timer>
        <Buttons>
          {!active && <Button onClick={() => setActive(true)}>Start</Button>}
          {active && <Button onClick={() => setActive(false)}>Paus</Button>}
          {active && <Button onClick={handleStop}>Stopp</Button>}
          {(active || timer !== "00:00:00") && (
            <Reset onClick={handleReset}>Avbryt</Reset>
          )}
        </Buttons>
        {timerHistory.length > 0 && (
          <>
            <HistoryWrapper
              onClick={() => setShowFullHistory(!showFullHistory)}
            >
              <Title>
                Tidigare värkar <Arrow show={!showFullHistory}>&uarr;</Arrow>
              </Title>
              <List show={showFullHistory}>
                {timerHistory.map((props, index) => (
                  <Item
                    key={props.start}
                    list={timerHistory}
                    {...props}
                    index={index}
                  />
                ))}
              </List>
            </HistoryWrapper>
            {!showClearAll && (
              <Reset onClick={() => setShowClearAll(true)}>
                Rensa historik
              </Reset>
            )}
            {showClearAll && (
              <Buttons>
                <Reset onClick={handleClearAll}>Bekräfta</Reset>
                <Button onClick={() => setShowClearAll(false)}>Avbryt</Button>
              </Buttons>
            )}
          </>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default ContractionTimer;
