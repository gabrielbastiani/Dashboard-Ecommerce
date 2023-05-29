import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import { BlockTop } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { setupAPIClient } from "../../../services/api";
import { Perfil, TextAvaliacao } from './styles';
import Modal from 'react-modal';
import { ModalDeleteAvaliacao } from "../../../components/popups/ModalDeleteAvaliacao";
import VoltarNavagation from "../../../components/VoltarNavagation";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { TextoDados } from "../../../components/TextoDados";
import { SendEmail } from "../../Contatos/Contato/styles";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import { toast } from "react-toastify";


export type DeleteAvaliacao = {
    avaliacao_id: string;
    slug: string;
    product_id: string;
}

const Avaliacao: React.FC = () => {

    let { slug, avaliacao_id } = useParams();
    const navigate = useNavigate();

    const [admin_id, setUser_id] = useState('');
    const [clientName, setClientName] = useState('');
    const [slugCliente, setSlugCliente] = useState('');
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState('');
    const [pontuacao, setPontuacao] = useState('');
    const [status, setStatus] = useState('');
    const [product_id, setProduct_id] = useState('');
    const [statusSelected, setStatusSelected] = useState();

    const [nameProduct, setNameProduct] = useState('');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadAvaliacao() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/avaliacaoDados?avaliacao_id=${avaliacao_id}`);

                setUser_id(response.data.admin.id || "");
                setClientName(response.data.admin.name || "");
                setSlugCliente(response.data.admin.slug || "");
                setEmail(response.data.admin.email || "");
                setPontuacao(response.data.pontuacao || "");
                setStatus(response.data.status || "");
                setDescription(response.data.description);
                setProduct_id(response.data.product_id || "");
                setNameProduct(response.data.product.nameProduct || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadAvaliacao();
    }, [avaliacao_id]);

    function handleChangeStatus(e: any) {
        setStatusSelected(e.target.value);
    }

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateStatusAvaliacao?avaliacao_id=${avaliacao_id}`, { status: statusSelected });
            toast.success('Status atualizado com sucesso.');
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o status.');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(avaliacao_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/avaliacaoDados', {
            params: {
                avaliacao_id: avaliacao_id,
            }
        });
        setModalItem(responseDelete.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <VoltarNavagation />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={"Avaliação - " + nameProduct + ' - ' + pontuacao}
                            />

                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(avaliacao_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>
                        <br />
                        <br />
                        <Titulos
                            tipo="h3"
                            titulo={"Cliente - " + clientName}
                        />

                        <BlockDados>
                            <TextoDados
                                chave={"Contato do avaliador"}
                                dados={
                                    <SendEmail
                                        href={`mailto:${email}?subject=${clientName} falo da loja virtual Builder Seu Negócio Online`}
                                    >
                                        {email}
                                    </SendEmail>
                                }
                            />
                        </BlockDados>

                        <BlockDados>
                            <Perfil
                                href={`/cliente/${slugCliente}/${admin_id}`}
                            >
                                Ver Perfil do Cliente
                            </Perfil>
                        </BlockDados>

                        <BlockDados>
                            <TextAvaliacao>{description}</TextAvaliacao>
                        </BlockDados>

                        <BlockDados>
                            <TextoDados
                                chave={"Status da Avaliação"}
                                dados={
                                    <SelectUpdate
                                        dado={status}
                                        value={statusSelected}
                                        /* @ts-ignore */
                                        onChange={handleChangeStatus}
                                        opcoes={
                                            [
                                                { label: "Selecionar...", value: "" },
                                                { label: "Pendente", value: "Pendente" },
                                                { label: "Não Aprovado", value: "Não Aprovado" },
                                                { label: "Aprovado", value: "Aprovado" },
                                            ]
                                        }
                                        handleSubmit={updateStatus}
                                    />
                                }
                            />
                        </BlockDados>

                    </Card>
                </Container>
            </Grid>

            {modalVisible && (
                <ModalDeleteAvaliacao
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    avaliacao={modalItem}
                    /* @ts-ignore */
                    slug={slug}
                    /* @ts-ignore */
                    product_id={product_id}
                />
            )}
        </>
    )
}

export default Avaliacao;