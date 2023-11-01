import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteAttribute } from '../../AttributesProduct';

interface DeleteAttributeProduct {
    isOpen: boolean;
    onRequestClose: () => void;
    relation: DeleteAttribute;
    reloadAtributes: () => void;
}

export function ModalDeleteRelationAttributeProduct({ isOpen, onRequestClose, reloadAtributes, relation }: DeleteAttributeProduct) {

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

    async function handleDelete() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const relationAttributeProduct_id = relation.id;

            await apiClient.delete(`/deleteAttributeProduct?relationAttributeProduct_id=${relationAttributeProduct_id}`);

            toast.success(`Atributo deletado do produto com sucesso.`);

            onRequestClose();

            reloadAtributes();

        } catch (error) {/* @ts-ignore */
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
                <TextModal>Deseja mesmo deletar esse atributo produto?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDelete()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}