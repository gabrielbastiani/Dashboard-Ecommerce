import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ImagemDelete } from '../../../pages/Configuracoes/ImagensInstitucionais/Imagem';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalImagemTexto {
    isOpen: boolean;
    onRequestClose: () => void;
    imagem: ImagemDelete;
}

export function ModalDeleteImagem({ isOpen, onRequestClose, imagem }: ModalImagemTexto) {

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

    async function handleDeleteImagem() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const imageStore_id = imagem.id;

            await apiClient.delete(`/deleteImageStore?imageStore_id=${imageStore_id}`);
            toast.success(`Imagem deletada com sucesso.`);

            navigate(`/ImagensInstitucionais`);

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar a imagem do texto!');
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
                <TextModal>Deseja mesmo deletar essa imagem?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteImagem()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}