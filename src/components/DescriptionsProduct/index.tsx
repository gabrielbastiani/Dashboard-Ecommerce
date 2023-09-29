import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css';
import QuillImageResize from 'quill-image-resize';
import Modal from 'react-modal';
import {
    TableSection,
    Cabecalho,
    TituloTop,
    TabContents,
    EditBoxDesc,
    TextButton,
    ContainerDescriptions,
    SectionTitleDescriptions
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
import { InputUpdate } from "../ui/InputUpdate";
import { TextoDados } from "../TextoDados";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";


export type DeleteDescriptions = {
    id: string;
}

interface DescriptionRequest {
    product_id: any;
}

const DescriptionsProduct = ({ product_id }: DescriptionRequest) => {

    Quill.register('modules/imageResize', QuillImageResize);

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [order, setOrder] = useState(Number);

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

    const handleChange = (html: string) => {
        setDescription(html);
    };

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['formula', 'link', 'image', 'video']
    ];

    const module = {
        toolbar: toolbarOptions,
        imageResize: {
            handleStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white',
            },
        },
    }

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

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
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

    async function updateTitleDescription(id: string) {
        try {
            const apiClient = setupAPIClient();
            if (title === "") {
                toast.error('Não deixe o titulo em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateTitleDescription?descriptionProduct_id=${id}`,
                    {
                        title: title
                    });

                toast.success('Titulo da descrição atualizada com sucesso.');

                setTimeout(() => {
                    navigate(0);
                }, 3000);
            }
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar o titulo dessa descrição.');
        }
    }

    async function updateOrderDescription(id: string) {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateOrderDescription?descriptionProduct_id=${id}`,
                { order: Number(order) }
            );

            toast.success('Ordem da descrição atualizada com sucesso.');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao atualizar a ordem dessa descrição.');
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
                    {descriptions.map((item, index) => {
                        return (
                            <SectionTitleDescriptions key={index}>
                                <BlockDados
                                    style={{ marginTop: '8px' }}
                                >
                                    <InputUpdate
                                        dado={item.title}
                                        type="text"
                                        value={title}
                                        /* @ts-ignore */
                                        onChange={(e) => setTitle(e.target.value)}
                                        handleSubmit={() => updateTitleDescription(item.id)}
                                    />
                                </BlockDados>

                                <BlockDados
                                    style={{ marginTop: '-5px' }}
                                >
                                    <TextoDados
                                        chave={"Ordem"}
                                        dados={
                                            <InputUpdate
                                                dado={item.order}
                                                type="number"
                                                value={order}
                                                /* @ts-ignore */
                                                onChange={(e) => setOrder(e.target.value)}
                                                handleSubmit={() => updateOrderDescription(item.id)}
                                            />
                                        }
                                    />
                                </BlockDados>

                                <TituloTop
                                    key={item.id}
                                    style={{ backgroundColor: cor }}
                                    onClick={() => handleClick(item.id)}
                                >
                                    {item.title}
                                </TituloTop>
                            </SectionTitleDescriptions>
                        )
                    })}
                </Cabecalho>

                {descriptions.map((item, index) => {
                    return (
                        <ContainerDescriptions key={index}>
                            {activeTab === item.id ?
                                <TabContents>
                                    <ReactQuill
                                        style={{ backgroundColor: 'white', color: 'black', height: '500px' }}
                                        theme="snow"
                                        value={description}
                                        onChange={handleChange}
                                        modules={module}
                                    />
                                    <br />
                                    <br />
                                    <br />
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
                        </ContainerDescriptions>
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