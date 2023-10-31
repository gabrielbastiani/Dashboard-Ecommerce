import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteDescriptions } from '../../DescriptionsProduct';


interface DeleteDescriptionRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    relation: DeleteDescriptions;
    reloadDescriptions: () => void;
}

export function ModalDeleteDescriptionProduct({ isOpen, onRequestClose, reloadDescriptions, relation }: DeleteDescriptionRequest) {

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

    async function handleDeleteDescription() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const descriptionProduct_id = relation.id;

            await apiClient.delete(`/deleteDescriptionProduct?descriptionProduct_id=${descriptionProduct_id}`);

            toast.success(`Descrição deletada do produto com sucesso.`);

            onRequestClose();
            reloadDescriptions();

        } catch (error) {
            toast.error('Erro ao deletar a descrição desse produto');
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
                <TextModal>Deseja mesmo deletar essa descrição deste produto?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteDescription()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}