import styled from 'styled-components'

export const StyledInteractionPart = styled.div`
  position: relative;
  margin: 0 2px;
`;

export const BracketLabel = styled.div`
  position: absolute;
  bottom: -50px;
  width: 100%;
`;

export const Bracket = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid black;
  border-top: 0px;
`;

export const BracketArrow = styled.div`
  width: 50%;
  height: 15px;
  border-right: 1px solid black;
`;

export const PartLabel = styled.div`
  width: 100%;
  text-align: center;
`;

export const InteractionsContainer = styled.div`
  display: flex;
`;
