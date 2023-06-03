import { useEffect, useState } from "react";
import Modal from 'react-modal';
import {
    TableSection,
    Cabecalho,
    TituloTop,
    TabContents,
    TextAreaDescription,
    EditBoxDesc,
    TextButton
} from './styles';
import { setupAPIClient } from "../../services/api";
import { ButtonConfirm } from "../ui/SelectUpdate/styles";
import { ValueText } from "../ui/ButtonSelect/styles";
import { GiConfirmed } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr";
import { Button } from "../ui/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ModalDeleteDescriptionProduct } from "../popups/ModalDeleteDescriptionProduct";


export type DeleteDescriptions = {
    id: string;
}

interface DescriptionRequest {
    product_id: any;
}

const DescriptionsProduct = ({ product_id }: DescriptionRequest) => {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("");

    const [description, setDescription] = useState("");

    const [toogle, setToogle] = useState(!activeTab);
    const [cor, setCor] = useState('#999494');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

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

    async function handleUpdateDescription(id: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDescriptionProduct?descriptionProduct_id=${id}`, {
                description: description
            });

            toast.success('Descrição do produto atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a descrição do produto.');
        }
    }

    async function handleUpdateStatus(id: string, status: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusDescriptionProduct?descriptionProduct_id=${id}`);

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a status da descrição.');
        }

        if (status === "Indisponivel") {
            toast.success(`A descrição se encontra Disponivel.`);
            return;
        }

        if (status === "Disponivel") {
            toast.error(`A descrição se encontra Indisponivel.`);
            return;
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueDescriptionProduct', {
            params: {
                descriptionProduct_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <TableSection>
                <Cabecalho>
                    {descriptions.map((item) => {
                        return (
                            <>
                                <TituloTop
                                    key={item.id}
                                    style={{ backgroundColor: cor }}
                                    onClick={() => handleClick(item.id)}
                                >
                                    {item.title}
                                </TituloTop>
                            </>
                        )
                    })}
                </Cabecalho>

                {descriptions.map((item) => {
                    return (
                        <>
                            {activeTab === item.id ?
                                <TabContents key={item.id}>
                                    <TextAreaDescription
                                        onChange={(e) => setDescription(e.target.value)}
                                    >
                                        {item.description}
                                    </TextAreaDescription>
                                    <br />
                                    <br />
                                    <EditBoxDesc>
                                        <ValueText style={{ marginBottom: '12px' }}>Salvar edição:</ValueText>
                                        <ButtonConfirm onClick={() => handleUpdateDescription(item.id)}><GiConfirmed /></ButtonConfirm>
                                        <ValueText style={{ marginBottom: '12px' }}>Decrição ativa?:</ValueText>
                                        <ButtonConfirm onClick={() => handleUpdateStatus(item.id, item.status)}><GrStatusUnknown /><TextButton>{item.status}</TextButton></ButtonConfirm>
                                        <ValueText style={{ marginBottom: '12px' }}>Deletar descrição acima:</ValueText>&nbsp;&nbsp;
                                        <Button onClick={() => handleOpenModalDelete(item.id)}>Deletar</Button>
                                    </EditBoxDesc>
                                </TabContents>
                                :
                                null
                            }
                        </>
                    )
                })}

            </TableSection>
            {modalVisible && (
                <ModalDeleteDescriptionProduct
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    relation={modalItem}
                />
            )}
        </>
    )
}

export default DescriptionsProduct;