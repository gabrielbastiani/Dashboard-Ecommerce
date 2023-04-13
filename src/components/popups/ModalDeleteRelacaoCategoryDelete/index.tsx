import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteID, DeleteRelation } from '../../../pages/Produtos/ProdutoCategoria/newNivel';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalRelation {
    isOpen: boolean;
    onRequestClose: () => void;
    relation: DeleteRelation[];
    relationID: DeleteID;
}

export function ModalDeleteRelacaoCategoryDelete({ isOpen, onRequestClose, relation, relationID }: ModalRelation) {

    const navigate = useNavigate();

    console.log("ID de relação", relationID)
    console.log("ID Tabela", relation[0].id)

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

    async function handleDeleteRelationID() {
        try {
            const apiClient = setupAPIClient();
            const relationId = relation[0].id;

            await apiClient.delete(`/deleteRelation?relationId=${relationId || relationID}`);
            
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
        setTimeout(() => {
            handleDeleteRelation()
        }, 2000);
    }

    async function handleDeleteRelation() {
        try {
            const apiClient = setupAPIClient();
            const relationProductCategory_id = relation[0].id;

            await apiClient.delete(`/deleteIDRelation?relationProductCategory_id=${relationProductCategory_id}`);
            toast.success('Categoria deletada do produto com sucesso.');
            
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
                <TextModal>Deseja mesmo deletar essa categoria desse produto?<br />Será deletada suas subcategorias também.</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteRelationID()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}