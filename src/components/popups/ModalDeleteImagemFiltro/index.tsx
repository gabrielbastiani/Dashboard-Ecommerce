import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteImagemAtributo } from '../../../pages/Atributos/GrupoFiltroAtributo/editFiltro';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalImageFiltro {
    isOpen: boolean;
    onRequestClose: () => void;
    idImage: DeleteImagemAtributo;
}

export function ModalDeleteImagemFiltro({ isOpen, onRequestClose, idImage }: ModalImageFiltro) {

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


    async function handleDeleteImageFiltro() {
        try {
            const apiClient = setupAPIClient();
            const imageAtributoGroup_id = idImage;

            await apiClient.delete(`/deleteImageFiltro?imageAtributoGroup_id=${imageAtributoGroup_id}`);

            toast.success('Imagem do filtro deletada com sucesso');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar a imagem do filtro!');
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
                <TextModal>Deseja mesmo deletar a imagem desse filtro?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteImageFiltro()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}