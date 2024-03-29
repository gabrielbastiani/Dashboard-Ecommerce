import styled, { css } from "styled-components";

interface IContainerProps {
  menuIsOpen: boolean;
}

interface IThemeToggleFooterProps {
  menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
  grid-area: AS;

  background-color: ${(props) => props?.theme?.colors?.secondary};
  padding-left: 20px;

  border-right: 1px solid ${(props) => props?.theme?.colors?.gray};

  position: relative;

  @media (max-width: 600px) {
    padding-left: 20px;
    position: fixed;
    z-index: 2;

    width: 170px;

    height: ${(props) => (props?.menuIsOpen ? "100vh" : "70px")};
    overflow: hidden;

    ${(props) =>
      !props?.menuIsOpen &&
      css`
        border: none;
        border-bottom: 1px solid ${(props) => props?.theme?.colors?.gray};
      `};
  }
`;

export const LojaFrontMobile = styled.a`
  display: none;

  @media (max-width: 485px) {
    display: block;
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 55px;

    svg {
      margin: 0 10px;
      color: ${(props) => props.theme.colors.info};
    }
  }
`;

export const LogImg = styled.img`
  height: 40px;
  width: 140px;
  @media (max-width: 600px) {
    display: none;
  }
`;

export const Header = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 15px 0;
`;

export const Title = styled.h3`
  color: ${(props) => props?.theme?.colors?.white};
  margin-left: 10px;
  font-size: 16px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const MenuItemLink = styled.a`
  color: ${(props) => props?.theme?.colors?.info};
  text-decoration: none;

  margin: 7px 0;
  display: flex;
  align-items: center;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const SubMenuItemLink = styled.a`
  color: ${(props) => props?.theme?.colors?.white};
  text-decoration: none;
  font-size: 14px;

  margin: 5px 18px 5px;
  display: flex;
  align-items: center;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 16px;
    margin-right: 5px;
  }
`;

export const SubMenuItemLink1 = styled.a`
  color: ${(props) => props?.theme?.colors?.white};
  text-decoration: none;
  font-size: 14px;

  margin: 5px 30px 5px;
  display: flex;
  align-items: center;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 4px;
  }
`;

export const MenuItemButton = styled.button`
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => props?.theme?.colors?.info};

  border: none;
  background: none;

  margin: 7px 0;
  display: flex;
  align-items: center;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const ToggleMenu = styled.button`
  width: 40px;
  height: 40px;

  border-radius: 5px;
  font-size: 22px;

  background-color: ${(props) => props?.theme?.colors?.warning};
  color: ${(props) => props?.theme?.colors?.white};

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  display: none;

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ThemeToggleFooter = styled.footer<IThemeToggleFooterProps>`
  display: none;
  position: absolute;
  bottom: 30px;
  flex-direction: column;

  @media (max-width: 600px) {
    display: ${(props) => (props?.menuIsOpen ? "flex" : "none")};
  }
`;