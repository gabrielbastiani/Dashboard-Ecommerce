import { useState } from "react";
import {
    TableSection,
    Cabecalho,
    TableAllDescription,
    TextAreaDescription1,
    TextAreaDescription2,
    TextAreaDescription3,
    TextAreaDescription4,
    TextAreaDescription5,
    TextAreaDescription6
} from './styles';
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";


interface DescriptionRequest {
    valor1: any;
    valor2: any;
    valor3: any;
    valor4: any;
    valor5: any;
    valor6: any;
    onChange1: () => void;
    onChange2: () => void;
    onChange3: () => void;
    onChange4: () => void;
    onChange5: () => void;
    onChange6: () => void;
    placeholder1: any;
    placeholder2: any;
    placeholder3: any;
    placeholder4: any;
    placeholder5: any;
    placeholder6: any;
}

const DescriptionsProduct = ({
    valor1,
    valor2,
    valor3,
    valor4,
    valor5,
    valor6,
    onChange1,
    onChange2,
    onChange3,
    onChange4,
    onChange5,
    onChange6,
    placeholder1,
    placeholder2,
    placeholder3,
    placeholder4,
    placeholder5,
    placeholder6
}: DescriptionRequest) => {

    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <>
            <TableSection>
                <Cabecalho>
                    <TabNavItem
                        id="tab1"
                        title="1º Descrição"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <TabNavItem
                        id="tab2"
                        title="2º Descrição"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <TabNavItem
                        id="tab3"
                        title="3º Descrição"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <TabNavItem
                        id="tab4"
                        title="4º Descrição"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <TabNavItem
                        id="tab5"
                        title="5º Descrição"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <TabNavItem
                        id="tab6"
                        title="6º Descrição"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                </Cabecalho>
                <TableAllDescription>
                    <TabContent id="tab1" activeTab={activeTab}>
                        <TextAreaDescription1
                            placeholder={placeholder1}
                            value={valor1}
                            onChange={onChange1}
                        ></TextAreaDescription1>
                    </TabContent>
                    <TabContent id="tab2" activeTab={activeTab}>
                        <TextAreaDescription2
                            placeholder={placeholder2}
                            value={valor2}
                            onChange={onChange2}
                        ></TextAreaDescription2>
                    </TabContent>
                    <TabContent id="tab3" activeTab={activeTab}>
                        <TextAreaDescription3
                            placeholder={placeholder3}
                            value={valor3}
                            onChange={onChange3}
                        ></TextAreaDescription3>
                    </TabContent>
                    <TabContent id="tab4" activeTab={activeTab}>
                        <TextAreaDescription4
                            placeholder={placeholder4}
                            value={valor4}
                            onChange={onChange4}
                        ></TextAreaDescription4>
                    </TabContent>
                    <TabContent id="tab5" activeTab={activeTab}>
                        <TextAreaDescription5
                            placeholder={placeholder5}
                            value={valor5}
                            onChange={onChange5}
                        ></TextAreaDescription5>
                    </TabContent>
                    <TabContent id="tab6" activeTab={activeTab}>
                        <TextAreaDescription6
                            placeholder={placeholder6}
                            value={valor6}
                            onChange={onChange6}
                        ></TextAreaDescription6>
                    </TabContent>
                </TableAllDescription>
            </TableSection>
        </>

    )
}

export default DescriptionsProduct;