import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteRelationsAtributos } from '../../../pages/Produtos/ProdutoAtributo';


interface DeleteRelationsAtributes {
    isOpen: boolean;
    onRequestClose: () => void;
    relation: DeleteRelationsAtributos;
}

export function ModalDeleteRelationsAtributosProduct({ isOpen, onRequestClose, relation }: DeleteRelationsAtributes) {

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

    async function handleRelationAtributos() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const relationProductAtributo_id = relation.id;

            await apiClient.delete(`/deleteRelationAtributoProduct?relationProductAtributo_id=${relationProductAtributo_id}`);
            toast.success(`Atributo do produto deletado com sucesso.`);

            onRequestClose();

        } catch (error) {
            toast.error("Ops, erro ao deletar o atributo do produto");
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
                <TextModal>Deseja mesmo deletar esse atributo do produto?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleRelationAtributos()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}