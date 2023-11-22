import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteTags } from '../../TagsProduct';


interface TagDelete {
    isOpen: boolean;
    onRequestClose: () => void;
    relation: DeleteTags;
    reloadTags: () => void;
}

export function ModalDeleteTag({ isOpen, onRequestClose, reloadTags, relation }: TagDelete) {

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

    async function handleTagsDelete() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const tag_id = relation.id;

            await apiClient.delete(`/deleteTagProduct?tag_id=${tag_id}`);
            toast.success(`Tag deletada do produto com sucesso.`);

            onRequestClose();
            reloadTags();

        } catch (error) {
            toast.error('Erro ao deletar a tag desse produto');
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
                <TextModal>Deseja mesmo deletar essa TAG deste produto?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleTagsDelete()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}