import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteTexto } from '../../../pages/Configuracoes/TextosInstitucionais/Texto';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalDeleteTexto {
    isOpen: boolean;
    onRequestClose: () => void;
    texto: DeleteTexto;
}

export function ModalDeleteTextoInstitucional({ isOpen, onRequestClose, texto }: ModalDeleteTexto) {

    const navigate = useNavigate();

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black',
            zIndex: 9999999
        }
    };

    async function handleDeleteTexto() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const institutionalText_id = texto.id;

            await apiClient.delete(`/deleteInstitutionalText?institutionalText_id=${institutionalText_id}`);
            toast.success(`Texto institucional deletado com sucesso.`);

            navigate('/textosInstitucionais');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar o texto institucional.');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <ButtonClose
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
            >
                <FiX size={45} color="#f34748" />
            </ButtonClose>

            <ContainerContent>
                <TextModal>Deseja mesmo deletar esse texto institucional?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={handleDeleteTexto}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}