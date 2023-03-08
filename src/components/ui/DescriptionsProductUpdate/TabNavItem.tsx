import React, { useEffect, useState } from "react";
import { TituloTop } from "./styles";

interface TabRequest {
  id: any;
  title: any;
  activeTab: any;
  setActiveTab: any;
}

const TabNavItem = ({ id, title, activeTab, setActiveTab }: TabRequest) => {

  const [toogle, setToogle] = useState(activeTab === id);
  const [cor, setCor] = useState('#c3c3c3');

  useEffect(() => {
    setCor(toogle ? '#c3c3c3' : '');
  }, [toogle]);

  const handleClick = () => {
    setActiveTab(id);
    setToogle(state => !state)
  };

  return (
    <TituloTop
      style={{ backgroundColor: cor }}
      onClick={handleClick}
      className={activeTab === id ? "active" : ""}
    >
      {title}
    </TituloTop>
  );
};

export default TabNavItem;