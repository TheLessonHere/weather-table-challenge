import styled from "styled-components";

const BackgroundProvider = styled.div`
  background-image: ${({ url }) => (url ? `url(${url})` : "")};
  background-size: cover;
  background-position: center;
  background-color: ${({ lightTheme }) => (lightTheme ? "#f7a325" : "#0a2f35")};
  min-height: ${({ height }) => (height ? height : "auto")};
`;

export default BackgroundProvider;