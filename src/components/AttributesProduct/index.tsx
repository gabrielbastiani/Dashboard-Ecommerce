import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import Titulos from "../Titulos";
import { Etiqueta } from "../../pages/Categorias/styles";
import Select from "../ui/Select";
import { Button } from "../ui/Button";
import { ContainerCategories, ContainerCategoriesBox, GridContainer, TextNotFound } from "../CategoriesProduct/styles";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import { TextoDados } from "../TextoDados";
import SelectUpdate from "../ui/SelectUpdate";
import { BsTrash } from "react-icons/bs";


interface AtributeRequest {
    product_id: any;
}

const AttributesProduct = ({ product_id }: AtributeRequest) => {

    const navigate = useNavigate();

    const { admin } = useContext(AuthContext);
    const [store_id] = useState(admin.store_id);

    const [atributes, setAtributes] = useState<any[]>([]);
    const [atributesSelected, setAtributesSelected] = useState();

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
                const response = await apiClient.get(`/findAllRelationsProductAndCategory?product_id=${product_id}`);

                setAttributesProducts(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findAllRelation();
    }, [product_id]);


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

            <Button
                style={{ backgroundColor: 'green' }}
                onClick={alert}
            >
                Salvar atributo
            </Button>
            <br />
            <br />
            <GridContainer>
                {attributesLoad.length < 1 ? (
                    <>
                        <TextNotFound>Não há atributos cadastrados no produto ainda...</TextNotFound>
                    </>
                ) :
                    <>
                        {attributesLoad.map((item) => {
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