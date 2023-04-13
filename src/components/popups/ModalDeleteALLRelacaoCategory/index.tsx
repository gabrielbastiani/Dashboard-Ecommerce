import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteRelationAll } from '../../../pages/Produtos/ProdutoCategoria';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalRelationAll {
    isOpen: boolean;
    onRequestClose: () => void;
    relationAll: DeleteRelationAll[];
}

export function ModalDeleteALLRelacaoCategory({ isOpen, onRequestClose, relationAll }: ModalRelationAll) {

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

    async function handleDeleteRelation() {
        try {
            const apiClient = setupAPIClient();
            const relationProductCategory_id = relationAll[0].id;

            await apiClient.delete(`/deleteIDRelation?relationProductCategory_id=${relationProductCategory_id}`);
            toast.success('Categoria principal deletada do produto com sucesso.');
            
            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao deletar a categoria do produto.');
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
                <TextModal>Deseja mesmo deletar essa categoria principal desse produto?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteRelation()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}