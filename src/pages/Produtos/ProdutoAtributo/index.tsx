import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Block, BlockTop, Container, Etiqueta } from "../../Categorias/styles";
import { Card } from "../../../components/Content/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { toast } from "react-toastify";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import Modal from 'react-modal';
import { ModalDeleteRelationsAtributosProduct } from "../../../components/popups/ModalDeleteRelationsAtributosProduct";
import { BsTrash } from "react-icons/bs";
import VoltarNavagation from "../../../components/VoltarNavagation";
import { AuthContext } from "../../../contexts/AuthContext";
import Select from "../../../components/ui/Select";
import { InputPost } from "../../../components/ui/InputPost";
import { Avisos } from "../../../components/Avisos";
import SelectUpdate from "../../../components/ui/SelectUpdate";


export type DeleteRelationsAtributos = {
    id: string;
}

const ProdutoAtributo: React.FC = () => {

    let { variacao_id, productId } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [nameVariacao, setNameVariacao] = useState("");
    const [atributo, setAtributo] = useState<any>([]);
    const [selectedAtributo, setSelectedAtributo] = useState();
    const [order, setOrder] = useState(Number);
    const [lojaID] = useState(user.loja_id);
    const [allRelationAtributos, setAllRelationAtributos] = useState<any[]>([]);

    const [atributoID, setAtributoID] = useState();
    const [orderUpdate, setOrderUpdate] = useState();

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        async function findLoadDates() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/variacoes?variacao_id=${variacao_id}`);

                setNameVariacao(response.data.nameVariacao || "");

            } catch (error) {
                console.error(error);
            }
        }
        findLoadDates();
    }, [variacao_id]);

    useEffect(() => {
        async function findsRelationsProducts() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/allAtributosProductRelation?variacao_id=${variacao_id}`);

                setAllRelationAtributos(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findsRelationsProducts();
    }, [variacao_id]);

    function handleChangeAtributo(e: any) {
        setSelectedAtributo(e.target.value)
    }

    function handleChangeAtributoUpdate(e: any) {
        setAtributoID(e.target.value)
    }

    useEffect(() => {
        async function loadAtributos() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/listAtributosNotDistinct');
                setAtributo(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadAtributos();
    }, []);

    async function handleRegisterAtributo() {
        const apiClient = setupAPIClient();
        try {
            if (selectedAtributo === "" || selectedAtributo === null || selectedAtributo === undefined) {
                toast.error('Favor, selecione um atributo!');
                return;
            }

            await apiClient.post('/createRelationAtributos', {
                product_id: productId,
                variacao_id: variacao_id,
                atributo_id: selectedAtributo,
                order: Number(order),
                loja_id: lojaID
            });

            toast.success('Atributo cadastrado com sucesso!');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error("Ops, erro ao cadastrar o atributo no produto.");
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function updateAtributo(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (atributoID === "") {
                toast.error('Não deixe o atributo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateAtributoIDProduct?relationProductAtributo_id=${id}`, { atributo_id: atributoID });
                toast.success('Atributo atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o atributo.');
        }
    }

    async function updateOrder(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (updateOrder === null) {
                toast.error('Não deixe a ordem em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateOrderRelationProductAtributo?relationProductAtributo_id=${id}`, { order: Number(orderUpdate) });
                toast.success('Ordem do atributo atualizado com sucesso.');
                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a ordem do atributo.');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueRelationAtributoProduct', {
            params: {
                relationProductAtributo_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>
                    <VoltarNavagation />
                    <br />
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo={`Cadastro de atributo para - ${nameVariacao}`}
                        />
                        <Button
                            style={{ backgroundColor: 'green' }}
                            onClick={handleRegisterAtributo}
                        >
                            Salvar atributo no produto
                        </Button>
                    </BlockTop>

                    <Etiqueta>Escolha um atributo para esse produto:</Etiqueta>
                    <Select
                        value={selectedAtributo}
                        /* @ts-ignore */
                        onChange={handleChangeAtributo}
                        opcoes={
                            [
                                { label: "Selecionar...", value: "" },/* @ts-ignore */
                                ...(atributo || []).map((item) => ({ label: item.tipo + "= " + item.valor, value: item.id }))
                            ]
                        }
                    />
                    <br />
                    <Block>
                        <Etiqueta>Ordem:</Etiqueta>
                        <InputPost
                            type="number"
                            placeholder="0"
                            value={order}/* @ts-ignore */
                            onChange={(e) => setOrder(e.target.value)}
                        />
                    </Block>
                    <br />
                    <br />
                    <br />
                    <br />
                    {allRelationAtributos.length < 1 ? (
                        <>
                            <Avisos
                                texto="Não há atributos cadastrados nesse produto ainda..."
                            />
                        </>
                    ) :
                        <>
                            {allRelationAtributos.map((IDRelation) => {
                                return (
                                    <>
                                        <Card key={IDRelation.id}>
                                            <GridDate>
                                                <SectionDate>
                                                    <Titulos
                                                        tipo="h2"
                                                        titulo={IDRelation.atributo.tipo + " = " + IDRelation.atributo.valor}
                                                    />

                                                    <BlockDados>
                                                        <TextoDados
                                                            chave={"Atualize o atributo"}
                                                            dados={
                                                                <SelectUpdate
                                                                    dado={IDRelation.atributo.tipo + " = " + IDRelation.atributo.valor}
                                                                    handleSubmit={() => updateAtributo(IDRelation.id)}
                                                                    value={atributoID}
                                                                    opcoes={
                                                                        [
                                                                            { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                                            ...(atributo || []).map((item) => ({ label: item.tipo + "= " + item.valor, value: item.id }))
                                                                        ]
                                                                    }/* @ts-ignore */
                                                                    onChange={handleChangeAtributoUpdate}
                                                                />
                                                            }
                                                        />
                                                    </BlockDados>
                                                </SectionDate>

                                                <SectionDate>
                                                    <BlockDados>
                                                        <TextoDados
                                                            chave={"Ordem"}
                                                            dados={
                                                                <InputUpdate
                                                                    dado={String(IDRelation.order)}
                                                                    type="number"
                                                                    /* @ts-ignore */
                                                                    placeholder={String(IDRelation.order)}
                                                                    value={orderUpdate}
                                                                    /* @ts-ignore */
                                                                    onChange={(e) => setOrderUpdate(e.target.value)}
                                                                    handleSubmit={() => updateOrder(IDRelation.id)}
                                                                />
                                                            }
                                                        />
                                                    </BlockDados>
                                                </SectionDate>

                                                <SectionDate>
                                                    <BsTrash
                                                        onClick={() => handleOpenModalDelete(IDRelation.id)}
                                                        style={{ cursor: 'pointer' }}
                                                        color="red"
                                                        size={35}
                                                    />
                                                </SectionDate>

                                            </GridDate>
                                        </Card>
                                        {modalVisible && (
                                            <ModalDeleteRelationsAtributosProduct
                                                isOpen={modalVisible}
                                                onRequestClose={handleCloseModalDelete}
                                                /* @ts-ignore */
                                                relation={modalItem}
                                            />
                                        )}
                                    </>
                                )
                            })}
                        </>
                    }
                </Card>
            </Container>
        </Grid>
    )
}

export default ProdutoAtributo;