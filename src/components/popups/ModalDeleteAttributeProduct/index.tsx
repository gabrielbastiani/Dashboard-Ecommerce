import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteRelationsAttribute } from '../../../pages/Produtos/Atributos/atributo';


interface DeleteAttribute {
    isOpen: boolean;
    onRequestClose: () => void;
    relation: DeleteRelationsAttribute;
}

export function ModalDeleteAttributeProduct({ isOpen, onRequestClose, relation }: DeleteAttribute) {

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

    async function handleDeleteAttribute() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const relationAttributeProduct_id = relation.id;

            await apiClient.delete(`/deleteAllImageRelationAttribute?relationAttributeProduct_id=${relationAttributeProduct_id}`);
            await apiClient.delete(`/deleteAttributeProduct?relationAttributeProduct_id=${relationAttributeProduct_id}`);
            
            toast.success(`Atributo deletado do produto com sucesso.`);

            onRequestClose();

        } catch (error) {
            toast.error('Erro ao deletar o atributo desse produto');
            /* @ts-ignore */
            console.log(error.response.data);
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
                <TextModal>Deseja mesmo deletar esse atributo produto?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteAttribute()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}