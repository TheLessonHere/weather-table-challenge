import React from "react";
import styled from "styled-components";
import { Image, ThemeSwitch } from "components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${({ background }) => background};
  padding: 24px 32px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
`;

export const Spacer = styled.div`
  height: 88px;
  width: 100%;
  margin-bottom: 24px;
`;

const Header = ({ lightTheme, toggleTheme }) => (
    <>
        <Spacer />
        <Wrap padding="24px 0" background={lightTheme ? "#f56038" : "#12492f"}>
            <Image src={require(`assets/logo.svg`).default} />
            <ThemeSwitch lightTheme={lightTheme} onClick={toggleTheme} defaultChecked />
        </Wrap>
    </>
);

export default Header;