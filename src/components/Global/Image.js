import React from "react";
import styled from "styled-components";

const Image = styled.img`
  max-width: 100%;
  width: ${({ width }) => width || "auto"};
  margin: ${({ margin }) => margin || null};
`;

const StyledImage = ({ ...props }) => <Image {...props} />;

export default StyledImage;