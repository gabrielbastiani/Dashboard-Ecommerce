import { useContext, useEffect, useState } from "react";
import {
    TableSection,
    Cabecalho,
    TableAllDescription,
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
import { AuthContext } from "../../contexts/AuthContext";


interface AtributeRequest {
    product_id: any;
}

const AttributesProduct = ({ product_id }: AtributeRequest) => {

    const navigate = useNavigate();
    const { admin } = useContext(AuthContext);
    const [store_id] = useState(admin.store_id);

    const [typesAttributes, setTypesAttributes] = useState<any[]>([]);


    useEffect(() => {
        async function loadTypes() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allTypeAttributes');
                setTypesAttributes(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadTypes();
    }, [product_id]);

    async function handleDeleteRelationAttribute(id: string) {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete(`/deleteDescriptionProduct?descriptionProduct_id=${id}`);

            toast.success('Descrição do produto deletada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao deletar a descrição do produto.');
        }
    }

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

    return (
        <>
            <TableSection>
                <Cabecalho>
                    {typesAttributes.map((item) => {
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
                    {typesAttributes.map((item) => {
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
                                            <ButtonConfirm onClick={ () => handleUpdateDescription(item.id) }><GiConfirmed /></ButtonConfirm>
                                            <ValueText style={{ marginBottom: '12px' }}>Decrição ativa?:</ValueText>
                                            <ButtonConfirm onClick={ () => handleUpdateStatus(item.id, item.status) }><GrStatusUnknown /><TextButton>{item.status}</TextButton></ButtonConfirm>
                                            <ValueText style={{ marginBottom: '12px' }}>Deletar descrição acima:</ValueText>&nbsp;&nbsp;
                                            <Button onClick={ () => handleDeleteRelationAttribute(item.id) }>Deletar</Button>
                                        </EditBoxDesc>
                                    </TabContents>
                                    : 
                                    null
                                }
                            </>
                        )
                    })}
                </TableAllDescription>
            </TableSection>
        </>
    )
}

export default AttributesProduct;