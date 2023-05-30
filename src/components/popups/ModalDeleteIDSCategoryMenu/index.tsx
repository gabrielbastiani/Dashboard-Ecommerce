import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteCategoriesGroups } from '../../../pages/Categorias/MenusCategorias/editItem';


interface DeleteRelationsCategorys {
    isOpen: boolean;
    onRequestClose: () => void;
    relationIDS: DeleteCategoriesGroups;
    idGroupImage: DeleteCategoriesGroups;
}

export function ModalDeleteIDSCategoryMenu({ isOpen, onRequestClose, relationIDS, idGroupImage }: DeleteRelationsCategorys) {

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

    async function handleDeleteItemsMenusAndImage() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const menuCategory_id = relationIDS.id;
            await apiClient.delete(`/deleteImageMenuCategory?imageMenuCategory_id=${idGroupImage}`);
            await apiClient.delete(`/deleteCategoryMenu?menuCategory_id=${menuCategory_id}`);

            toast.success(`Categoria item do menu deletada com sucesso.`);

            onRequestClose();

        } catch (error) {
            /* @ts-ignore */
            toast.error(`${error.response.data.error}`);
            /* @ts-ignore */
            console.log(error.response.data);
        }
        setTimeout(() => {
            navigate(-1);
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
                <TextModal>Deseja mesmo deletar a categoria desse menu?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={handleDeleteItemsMenusAndImage}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}