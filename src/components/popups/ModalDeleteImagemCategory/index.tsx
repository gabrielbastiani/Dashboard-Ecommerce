import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteCategoryImage } from '../../../pages/Categorias/Categoria';


interface DeleteItemImagem {
    isOpen: boolean;
    onRequestClose: () => void;
    idImage: DeleteCategoryImage;
}

export function ModalDeleteImagemCategory({ isOpen, onRequestClose, idImage }: DeleteItemImagem) {

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

    async function handleDeleteImageCategory() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.delete(`/deleteImageCategory?imageCategory_id=${idImage}`);

            toast.success(`imagem da categoria deletada com sucesso.`);

            onRequestClose();

            setTimeout(() => {
                navigate(0);
            }, 3000);

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
                <TextModal>Deseja mesmo deletar a imagem dessa categoria?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={handleDeleteImageCategory}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}