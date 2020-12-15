import React, { useState } from "react";
import styled from "styled-components";
import { formatTime } from "./utils";

const Wrapper = styled.li`
  border-bottom: 1px solid #000;
`;
const Button = styled.button`
  width: 100%;
  background-color: inherit;
  border: none;
  outline: none;
  padding: 10px;
  opacity: 0.6;
  border-radius: 6px;
  transition: background-color 100ms ease-in-out;
  cursor: pointer;
  :hover,
  :active {
    opacity: 1;
  }
  :active {
    background-color: #dedede;
  }
`;
const Details = styled.div`
  max-height: ${(p) => (p.show ? "100px" : 0)};
  overflow: hidden;
  transition: max-height 150ms ease-in-out;
`;
const P = styled.p`
  margin: 0;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;
const Time = styled(P)`
  font-size: 16px;
  margin: 3px 0;
  color: #497a9a;
`;
const Start = styled(P)`
  color: #999;
  font-weight: 700;
`;
const End = styled(P)`
  color: #999;
  font-weight: 700;
`;
const Between = styled(P)`
  font-size: 16px;
  margin: 3px 0;
`;
const Text = styled.strong``;

const Item = ({ list, time, start, end, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Wrapper>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setShowDetails(!showDetails);
        }}
      >
        <Time>
          <Text>Värk:</Text>
          {time}
        </Time>
        <Details show={showDetails}>
          <Start>
            <Text>Start:</Text>
            {start.toLocaleTimeString()}
          </Start>
          <End>
            <Text>Stop:</Text>
            {end.toLocaleTimeString()}
          </End>
        </Details>
        {list[index + 1]?.end && (
          <Between>
            <Text>Intervall:</Text>
            {formatTime(Math.floor(start - list[index + 1].end) / 1000)}
          </Between>
        )}
      </Button>
    </Wrapper>
  );
};

export default Item;
