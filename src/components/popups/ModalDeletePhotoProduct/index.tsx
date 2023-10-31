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
    photos: DeletePhotoProduct[];
    reloadPhotos: () => void;
}

export function ModalDeletePhotoProduct({ isOpen, onRequestClose, reloadPhotos, photos }: ModalPhotoDelete) {

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


    async function handleDeletePhoto() {
        try {
            const apiClient = setupAPIClient();
            const photo_id = photos[0].id;

            await apiClient.delete(`/deletePhoto?photoProduts_id=${photo_id}`);

            toast.success('Foto deletada com sucesso');

            onRequestClose();

            reloadPhotos();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar a foto!');
        }
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
                <TextModal>Deseja mesmo deletar essa imagem desse produto?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeletePhoto()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}