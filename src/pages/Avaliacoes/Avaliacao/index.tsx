import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import { BlockTop } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { setupAPIClient } from "../../../services/api";
import { TextAvaliacao } from './styles';
import Modal from 'react-modal';
import { ModalDeleteAvaliacao } from "../../../components/popups/ModalDeleteAvaliacao";


export type DeleteAvaliacao = {
    avaliacao_id: string;
    slug: string;
    product_id: string;
}

const Avaliacao: React.FC = () => {

    let { slug, avaliacao_id } = useParams();

    const [clientName, setClientName] = useState('');
    const [description, setDescription] = useState('');
    const [pontuacao, setPontuacao] = useState('');
    const [product_id, setProduct_id] = useState('');

    const [nameProduct, setNameProduct] = useState('');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadAvaliacao() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/avaliacaoDados?avaliacao_id=${avaliacao_id}`);

                setClientName(response.data.clientName || "");
                setPontuacao(response.data.pontuacao || "");
                setDescription(response.data.description);
                setProduct_id(response.data.product_id || "");
                setNameProduct(response.data.product.nameProduct || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadAvaliacao();
    }, [avaliacao_id])

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
                        <Voltar
                            url={`/produto/avaliacoes/${slug}/${product_id}`}
                        />
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

                        <TextAvaliacao>{description}</TextAvaliacao>

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