import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeletePhotoProduct } from '../../PhotosProduct';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalPhotoDelete {
    isOpen: boolean;
    onRequestClose: () => void;
    photosVariante: DeletePhotoProduct[];
}

export function ModalDeletePhotoVariante({ isOpen, onRequestClose, photosVariante }: ModalPhotoDelete) {

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


    async function handleDeletePhotoVariante() {
        try {
            const apiClient = setupAPIClient();
            const photo_id = photosVariante[0].id;

            await apiClient.delete(`/deletePhotoVariacao?photovariacao_id=${photo_id}`)

            toast.success('Foto deletada com sucesso');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar a foto!');
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
                <TextModal>Deseja mesmo deletar essa imagem dessa variação?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeletePhotoVariante()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}