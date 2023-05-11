import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteFiltroAndImage } from '../../../pages/Atributos/GrupoFiltroAtributo/editFiltro';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalDeleteFiltroImage {
    isOpen: boolean;
    onRequestClose: () => void;
    relationIDS: DeleteFiltroAndImage;
    idGroupImage: DeleteFiltroAndImage;
}

export function ModalDeleteFiltroAndImage({ isOpen, onRequestClose, relationIDS, idGroupImage }: ModalDeleteFiltroImage) {

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

    async function handleDeleteFiltroAndImage() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const groupFilterAtributo_id = relationIDS.id;

            await apiClient.delete(`/deleteImageFiltro?imageAtributoGroup_id=${idGroupImage}`);
            await apiClient.delete(`/deleteImagesAndFiltroAtributo?groupFilterAtributo_id=${groupFilterAtributo_id}`);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }

        setTimeout(() => {
            handleDeleteFiltro();
        }, 3000);

    }

    async function handleDeleteFiltro() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const groupFilterAtributo_id = relationIDS.id;

            await apiClient.delete(`/deleteFiltroAtributo?groupFilterAtributo_id=${groupFilterAtributo_id}`);
            toast.success(`Filtro/atributo deletado com sucesso.`);

            navigate('/filterGrupos');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar o filtro/atributo!');
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

                <TextModal
                    style={{ textAlign: 'center' }}
                >
                    Deseja mesmo deletar esse filtro/atributo? Para isso, <br />será deletada todas as imagens desse filtro/atributo também.
                </TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={handleDeleteFiltroAndImage}
                    >
                        Sim
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}