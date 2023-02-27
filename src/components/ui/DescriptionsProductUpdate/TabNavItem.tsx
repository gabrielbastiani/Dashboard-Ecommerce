import React from "react";
import { TituloTop } from "./styles";

interface TabRequest {
    id: any;
    title: any;
    activeTab: any;
    setActiveTab: any;
}

const TabNavItem = ({ id, title, activeTab, setActiveTab }: TabRequest) => {
 
 const handleClick = () => {
   setActiveTab(id);
 };
 
return (
   <TituloTop onClick={handleClick} className={activeTab === id ? "active" : ""}>
     { title }
   </TituloTop>
 );
};

export default TabNavItem;