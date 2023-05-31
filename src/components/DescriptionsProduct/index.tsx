import { useEffect, useState } from "react";
import {
    TableSection,
    Cabecalho,
    TableAllDescription,
    TituloTop,
    TabContents,
    TextAreaDescription
} from './styles';
import { setupAPIClient } from "../../services/api";
import { ButtonConfirm, EditBox } from "../ui/SelectUpdate/styles";
import { ValueText } from "../ui/ButtonSelect/styles";
import { GiConfirmed } from "react-icons/gi";


interface DescriptionRequest {
    product_id: any;
    handleSubmit: () => void;
}

const DescriptionsProduct = ({ product_id, handleSubmit }: DescriptionRequest) => {

    const [activeTab, setActiveTab] = useState("");

    const [toogle, setToogle] = useState(!activeTab);
    const [cor, setCor] = useState('#999494');

    useEffect(() => {
        setCor(toogle ? '#c3c3c3' : '');
    }, [toogle]);

    const handleClick = (id: string) => {
        setActiveTab(id);
        setToogle(state => !state)
    };

    const [descriptions, setDescriptions] = useState<any[]>([]);

    useEffect(() => {
        async function loadDescriptions() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allProductsDescriptionsStore?product_id=${product_id}`);
                setDescriptions(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadDescriptions();
    }, [product_id]);

    return (
        <>
            <TableSection>
                <Cabecalho>
                    {descriptions.map((item) => {
                        return (
                            <>
                                <TituloTop
                                    style={{ backgroundColor: cor }}
                                    onClick={() => handleClick(item.id)}
                                    className={activeTab === item.id ? "active" : "desactive"}
                                >
                                    {item.title}
                                </TituloTop>
                            </>
                        )
                    })}
                </Cabecalho>

                <TableAllDescription>
                    {descriptions.map((item) => {
                        return (
                            <>
                                {activeTab === item.id ? <TabContents>
                                    <TextAreaDescription>
                                        {item.description}
                                    </TextAreaDescription>
                                    <EditBox>
                            <ValueText style={{ marginBottom: '12px' }}>Salvar edição:</ValueText>
                            <ButtonConfirm type="submit" onClick={handleSubmit}><GiConfirmed /></ButtonConfirm>
                        </EditBox>
                                </TabContents>
                                    : null}
                            </>
                        )
                    })}
                </TableAllDescription>
            </TableSection>
        </>
    )
}

export default DescriptionsProduct;