import styled from "styled-components";

const Button = styled.button`
  background: ${props => props.primary ? "#007bff" : "white"};
  color: ${props => props.primary ? "white" : "#007bff"};

  font-size: 1em;
  padding: 1em 2em;
  border: 2px;
  border-radius: 5px;
  width: 17rem;
`;

export default Button;