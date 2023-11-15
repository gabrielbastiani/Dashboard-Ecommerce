import styled from "styled-components";

export const LojaFront = styled.a`
  color: ${(props) => props.theme.colors.white};
  padding: 0 5px;
  font-size: 14px;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }

  svg {
    margin: 0 10px;
    color: ${(props) => props.theme.colors.info};
  }
`;

export const ToggleDesktop = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const Container = styled.div`
  grid-area: MH;

  background-color: ${(props) => props.theme.colors.secondary};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export const Profile = styled.div`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    margin-left: 200px;
  }
`;

export const BoxProfile = styled.div``;

export const NotificationBell = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;

  svg {
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
  }
`;

export const Welcome = styled.h3``;

export const UserName = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
`;
