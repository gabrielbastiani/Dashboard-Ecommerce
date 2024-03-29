import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteImagemItem } from '../../../pages/Categorias/MenusCategorias/editItem';


interface DeleteItemImagem {
    isOpen: boolean;
    onRequestClose: () => void;
    idImage: DeleteImagemItem;
    loadImage: () => void;
}

export function ModalDeleteImagemCategoryMenu({ isOpen, onRequestClose, idImage, loadImage }: DeleteItemImagem) {

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

    async function handleDeleteImagemMenu() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete(`/deleteImageMenuCategory?imageMenuCategory_id=${idImage}`);

            toast.success(`imagem deletada da categoria do menu deletada com sucesso.`);

            onRequestClose();

            loadImage();

        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
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
                <TextModal>Deseja mesmo deletar a imagem dessa categoria desse menu?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={handleDeleteImagemMenu}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}