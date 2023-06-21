import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import Titulos from "../Titulos";
import { Block, Etiqueta } from "../../pages/Categorias/styles";
import Select from "../ui/Select";
import { Button } from "../ui/Button";
import { ContainerCategories, ContainerCategoriesBox, GridContainer, TextNotFound } from "../CategoriesProduct/styles";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import { TextoDados } from "../TextoDados";
import SelectUpdate from "../ui/SelectUpdate";
import { BsTrash } from "react-icons/bs";
import { InputPost } from "../ui/InputPost";


interface AtributeRequest {
    product_id: any;
}

const AttributesProduct = ({ product_id }: AtributeRequest) => {

    const navigate = useNavigate();

    const { admin } = useContext(AuthContext);
    const [store_id] = useState(admin.store_id);

    const [atributes, setAtributes] = useState<any[]>([]);
    const [atributesSelected, setAtributesSelected] = useState();

    const [order, setOrder] = useState(Number);

    const [attributesProducts, setAttributesProducts] = useState<any[]>([]);

    function handleChangeTypeAttribute(e: any) {
        setAtributesSelected(e.target.value);
    }

    useEffect(() => {
        async function loadAtributos() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allTypeAttributes');
                setAtributes(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadAtributos();
    }, []);

    useEffect(() => {
        async function findAllRelation() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/getAllAttributesProduct?product_id=${product_id}`);

                setAttributesProducts(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findAllRelation();
    }, [product_id]);

    async function handleRegisterAttribute() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/createRelationAttributeProduct', {
                product_id: product_id,
                type: atributesSelected,
                order: Number(order),
                store_id: store_id
            });

            toast.success('Atributo cadastrado com sucesso!');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            toast.error(`${error.response.data.error}`);
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }


    return (
        <>
            <Titulos
                tipo="h2"
                titulo="Cadastre atributos para o produto"
            />
            <br />
            <br />
            <Etiqueta>Escolha tipo de atributo:</Etiqueta>
            <Select
                value={atributesSelected}
                /* @ts-ignore */
                onChange={handleChangeTypeAttribute}
                opcoes={
                    [
                        { label: "Selecionar...", value: "" },/* @ts-ignore */
                        ...(atributes || []).map((item) => ({ label: item.type, value: item.type }))
                    ]
                }
            />

            <Block>
                <Etiqueta>Ordem:</Etiqueta>
                <InputPost
                    type="number"
                    placeholder="0"
                    value={order}/* @ts-ignore */
                    onChange={(e) => setOrder(e.target.value)}
                />
            </Block>

            <Button
                style={{ backgroundColor: 'green' }}
                onClick={handleRegisterAttribute}
            >
                Salvar atributo
            </Button>
            <br />
            <br />
            <GridContainer>
                {attributesProducts.length < 1 ? (
                    <>
                        <TextNotFound>Não há atributos cadastrados no produto ainda...</TextNotFound>
                    </>
                ) :
                    <>
                        {attributesProducts.map((item) => {
                            return (
                                <>
                                    <ContainerCategories key={item.id}>
                                        <ContainerCategoriesBox>
                                            <BlockDados
                                                style={{ marginLeft: "10px" }}
                                            >
                                                <TextoDados
                                                    chave={"Tipo do atributo"}
                                                    dados={
                                                        <SelectUpdate
                                                            dado={item.type}
                                                            handleSubmit={alert}
                                                            value={atributesSelected}
                                                            opcoes={
                                                                [
                                                                    { label: "Selecionar...", value: "" },/* @ts-ignore */
                                                                    ...(atributes || []).map((item) => ({ label: item.type, value: item.type }))
                                                                ]
                                                            }/* @ts-ignore */
                                                            onChange={() => handleChangeTypeAttribute(item.id)}
                                                        />
                                                    }
                                                />
                                            </BlockDados>

                                            <BlockDados>
                                                <BsTrash
                                                    onClick={() => alert}
                                                    style={{ cursor: 'pointer', margin: '13px 0' }}
                                                    color="red"
                                                    size={35}
                                                />
                                            </BlockDados>
                                        </ContainerCategoriesBox>
                                    </ContainerCategories>
                                </>
                            )
                        })}
                    </>
                }
            </GridContainer>
        </>
    )
}

export default AttributesProduct;