import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { ContainerCategories, ContainerCategoriesBox, GridContainer, TextNotFound } from "./styles";
import { Block, Etiqueta } from "../../pages/Categorias/styles";
import { InputPost } from "../ui/InputPost";
import { Button } from "../ui/Button";
import Titulos from "../Titulos";
import { BsTrash } from "react-icons/bs";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import { TextoDados } from "../TextoDados";
import { InputUpdate } from "../ui/InputUpdate";
import { ModalDeleteTag } from "../popups/ModalDeleteTag";


export type DeleteTags = {
    id: string;
}

interface TagRequest {
    product_id: any;
}

const TagsProduct = ({ product_id }: TagRequest) => {

    const navigate = useNavigate();

    const { admin } = useContext(AuthContext);
    const [store_id] = useState(admin.store_id);

    const [tagName, setTagName] = useState("");
    const [tagNameUpdate, setTagNameUpdate] = useState("");
    const [tagsProducts, setTagsProducts] = useState<any[]>([]);

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadTags() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allTagProducts?product_id=${product_id}`);
                setTagsProducts(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadTags();
    }, [product_id]);

    async function handleRegisterTag() {
        const apiClient = setupAPIClient();
        try {
            if (tagName === "") {
                toast.error('Não deixe o campo em branco!');
                return;
            }

            await apiClient.post('/createTagProduct', {
                product_id: product_id,
                tagName: tagName,
                store_id: store_id
            });

            toast.success('TAG cadastrada com sucesso no produto!');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            toast.error("Ops! erro ao cadastrar a TAG no produto.");
            /* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function updateNameTag(id: string) {
        try {
            if (tagNameUpdate === "") {
                toast.error("Não deixe o campo em branco!");
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateTagNameProduct?tag_id=${id}`, { tagName: tagNameUpdate });

            toast.success('TAG atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a TAG.');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/findUniqueTagProduct', {
            params: {
                tag_id: id,
            }
        });
        setModalItem(response.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');



    return (
        <>
            <Titulos
                tipo="h2"
                titulo="Cadastre TAGs para o produto"
            />
            <br />
            <br />
            <Block>
                <Etiqueta>Nome da TAG:</Etiqueta>
                <InputPost
                    type="text"
                    placeholder="Digite aqui..."
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                />
            </Block>

            <Button
                style={{ backgroundColor: 'green' }}
                onClick={handleRegisterTag}
            >
                Salvar TAG no produto
            </Button>

            <GridContainer>
                {tagsProducts.length < 1 ? (
                    <>
                        <TextNotFound>Não há categorias cadastrados no produto ainda...</TextNotFound>
                    </>
                ) :
                    <>
                        {tagsProducts.map((item, index) => {
                            return (
                                <ContainerCategories key={index}>
                                    <ContainerCategoriesBox>
                                        <BlockDados style={{ marginLeft: "10px" }} >
                                            <TextoDados
                                                chave={"Nome da TAG"}
                                                dados={
                                                    <InputUpdate
                                                        dado={item.tagName}
                                                        type="text"
                                                        placeholder={item.tagName}
                                                        value={tagNameUpdate}
                                                        onChange={(e) => setTagNameUpdate(e.target.value)}
                                                        handleSubmit={() => updateNameTag(item.id)}
                                                    />
                                                }
                                            />
                                        </BlockDados>

                                        <BsTrash
                                            onClick={() => handleOpenModalDelete(item.id)}
                                            style={{ cursor: 'pointer', margin: '13px 0' }}
                                            color="red"
                                            size={35}
                                        />
                                    </ContainerCategoriesBox>
                                </ContainerCategories>
                            )
                        })}
                    </>
                }
            </GridContainer>

            {modalVisible && (
                <ModalDeleteTag
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    relation={modalItem}
                />
            )}
        </>
    )
}

export default TagsProduct;