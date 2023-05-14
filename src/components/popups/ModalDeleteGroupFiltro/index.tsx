import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContainerContent, ContainerButton, TextModal, ButtonClose } from './styles';
import { DeleteFitrosGrupo } from '../../../pages/Filtros/editGroupFiltroAtributo';


interface DeleteIDGrupos {
    isOpen: boolean;
    onRequestClose: () => void;
    groupId: DeleteFitrosGrupo;
}

export function ModalDeleteGroupFiltro({ isOpen, onRequestClose, groupId }: DeleteIDGrupos) {

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

    async function handleDeleteGrupoFiltro() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const groupFilter_id = groupId.id;

            await apiClient.delete(`/deleteGroupFilter?groupFilter_id=${groupFilter_id}`);
            toast.success(`Grupo de filtro deletado com sucesso.`);

            onRequestClose();

            setTimeout(() => {
                navigate('/filterGrupos');
            }, 3000);

        } catch (error) {
            /* @ts-ignore */
            toast.error("Erro ao deletar esse grupo.");
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
                <TextModal>Deseja mesmo deletar esse grupo?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteGrupoFiltro()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}