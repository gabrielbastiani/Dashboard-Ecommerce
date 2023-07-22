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
import { Mensagem, LabelMensagem, SendEmail } from './styles';
import { RiMailSendLine } from 'react-icons/ri';


const Contato: React.FC = () => {

    let { contact_id } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [sector, setSector] = useState('');
    const [message, setMessage] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        async function loadContact() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/findUniqueContact?contact_id=${contact_id}`);

                setName(data.name || "");
                setEmail(data.email || "");
                setPhone(data.phone || "");
                setCompany(data.company || "");
                setSector(data.sector || "");
                setMessage(data.message || "");

            } catch (error) {
                console.log(error);
            }
        }
        loadContact();
    }, [contact_id]);

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete() {
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
                                onClick={() => handleOpenModalDelete(contact_id)}
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
                                        dados={
                                            <SendEmail href={`mailto:${email}?subject=${name} falo da loja virtual Builder Seu Negócio Online`}>
                                                {email} <RiMailSendLine color='red' size={25} />
                                            </SendEmail>
                                        }
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
                                        dados={company || "Não é empresa"}
                                    />
                                </BlockDados>

                                <BlockDados>
                                    <TextoDados
                                        chave={'Setor'}
                                        dados={sector}
                                    />
                                </BlockDados>
                            </SectionDate>

                            <SectionDate>
                                <BlockDados style={{ flexDirection: 'column' }}>
                                    <LabelMensagem>Mensagem:</LabelMensagem>
                                    <br />
                                    <Mensagem
                                        value={message}
                                    ></Mensagem>
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
                    contato={contact_id}
                />
            )}
        </>
    )
}

export default Contato;