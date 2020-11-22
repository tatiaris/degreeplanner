import styled from 'styled-components'

export const StyledInteraction = styled.table`
  max-width: 250px;
  width: min-content;
  margin: 5px;
`;

export const Initiator = styled.td`
  padding: 0em 2em;
  border: 1px solid black;
  border-radius: 10px;
  min-height: 50px;
  max-width: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Technology = styled.td`
  width: 40px;
  height: 40px;
  margin: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border: 1px solid black;
  border-radius: 25px;
  z-index: 1;
`;

export const Receiver = styled.td`
  padding: 0em 2em;
  border: 1px solid black;
  border-radius: 10px;
  min-height: 50px;
  max-width: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const Conversation = styled.td`
  padding: 0 1em;
  font-size: 0.9em;
`;

export const Ptr = styled.tr`
  display: flex;
  justify-content: center;
`;