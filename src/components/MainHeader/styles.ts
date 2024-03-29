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
  cursor: pointer;

  svg {
    color: ${(props) => props.theme.colors.white};
  }
`;

export const Welcome = styled.h3`
  color: ${(props) => props.theme.colors.white};
`;

export const UserName = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
`;

export const Title = styled.h2`
  color: ${(props) => props?.theme?.colors?.black};
  margin-bottom: 25px;
`;

export const LinkNotification = styled.a`
  color: inherit;
`;

export const DropDownContent = styled.div`
  height: 58vh;
  overflow-y: auto;
  right: 0;
  top: 70px;
  padding: 20px;
  position: absolute;
  background-color: ${(props) => props?.theme?.colors?.white};
  color: ${(props) => props?.theme?.colors?.black};
  width: 33%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.7);
  z-index: 99;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const BoxIcons = styled.div``;

export const BlockNotification = styled.div`
  border: 1px solid ${(props) => props?.theme?.colors?.black};
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  svg {
    margin: 13px;
  }
`;

export const Menssages = styled.span`
  padding-bottom: 12px;
  color: ${(props) => props.theme.colors.black};
`;

export const DataNotification = styled.span`
  color: ${(props) => props.theme.colors.black};
`;

export const ClockBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const Viewed = styled.strong`
  color: ${(props) => props.theme.colors.warning};
  font-style: italic;
  padding-bottom: 7px;
`;

export const BlockButtonsNotification = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

export const AllViewd = styled.button`
  background: transparent;
  color: ${(props) => props.theme.colors.black};
`;

export const ClearNotifications = styled.button`
  background-color: ${(props) => props.theme.colors.warning};
  color: ${(props) => props.theme.colors.white};
  padding: 8px;
`;

export const BoxButtonAll = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonAllNotifications = styled.a`
  display: flex;
  align-items: center;
  font-weight: bold;
  background: transparent;
`;

export const AmountItens = styled.div`
  align-items: center;
  justify-content: center;
  background-color: red;
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
  margin-top: 10px;
  margin-left: -8px;
`