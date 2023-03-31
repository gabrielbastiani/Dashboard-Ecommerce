import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ModalDeleteContato } from "../../../components/popups/ModalDeleteContato";
import { setupAPIClient } from '../../../services/api';
import { useParams } from 'react-router-dom';
import { Grid } from '../../Dashboard/styles';
import MainHeader from '../../../components/MainHeader';
import Aside from '../../../components/Aside';
import { BlockTop, Container } from '../../Categorias/styles';
import { Card } from '../../../components/Content/styles';
import Voltar from '../../../components/Voltar';
import Titulos from '../../../components/Titulos';
import { Button } from '../../../components/ui/Button';
import { BlockDados } from '../../Categorias/Categoria/styles';
import { TextoDados } from '../../../components/TextoDados';
import { GridDate } from '../../Perfil/styles';
import { SectionDate } from '../../Configuracoes/styles';


export type DeleteContato = {
    contato_id: string;
}

const Contato: React.FC = () => {

    let { contato_id } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [setor, setSetor] = useState('');
    const [mensagem, setMensagem] = useState('');

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        async function loadContato() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/listExactContato?contato_id=${contato_id}`);

                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setEmpresa(response.data.empresa);
                setSetor(response.data.setor);
                setMensagem(response.data.mensagem);

            } catch (error) {
                console.log(error);
            }
        }
        loadContato();
    }, [contato_id]);

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(contato_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/listExactContato', {
            params: {
                contato_id: contato_id,
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
                            url={'/contatos'}
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={"Contato - " + name}
                            />

                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={() => handleOpenModalDelete(contato_id)}
                            >
                                Remover
                            </Button>
                        </BlockTop>
                        <br />
                        <br />
                        <GridDate>
                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={'Nome'}
                                        dados={name}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={'E-mail'}
                                        dados={email}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={'Telefone'}
                                        dados={phone}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={'Empresa'}
                                        dados={empresa}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={'Setor'}
                                        dados={setor}
                                    />
                                </BlockDados>
                            </SectionDate>

                            <SectionDate>
                                <BlockDados>
                                    <TextoDados
                                        chave={'Mensagem'}
                                        dados={mensagem}
                                    />
                                </BlockDados>
                            </SectionDate>
                        </GridDate>
                    </Card>
                </Container>
            </Grid>
            {modalVisible && (
                <ModalDeleteContato
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    contato={modalItem}
                />
            )}
        </>
    )
}

export default Contato;