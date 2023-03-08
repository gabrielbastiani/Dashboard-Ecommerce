import { TabContents } from "./styles";

interface TabContentRequest {
  id: any;
  activeTab: any;
  children: any;
}

const TabContent = ({ id, activeTab, children }: TabContentRequest) => {
  return (
    activeTab === id ? <TabContents>
      {children}
    </TabContents>
      : null
  );
};

export default TabContent;