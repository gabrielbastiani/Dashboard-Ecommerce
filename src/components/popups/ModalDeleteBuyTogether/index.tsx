import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { ContainerContent, ContainerButton, TextModal, ButtonClose } from './styles';
import { DeleteBuy } from '../../../pages/Produtos/CompreJunto/produtosGrupo';


interface DeleteRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    relation: DeleteBuy;
    reloadBuyTogheter: () => void;
}

export function ModalDeleteBuyTogether({ isOpen, onRequestClose, relation, reloadBuyTogheter }: DeleteRequest) {

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

    async function handleDeleteBuy() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const buyTogether_id = relation.id;

            await apiClient.delete(`/deleteGroupBuyTogether?buyTogether_id=${buyTogether_id}`);
            
            toast.success(`Produto do grupo compre junto deletado com sucesso.`);

            onRequestClose();

            reloadBuyTogheter();

        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao deletar esse produto do grupo.');
            
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
                <TextModal>Deseja mesmo deletar esse produto, do grupo compre junto em questão?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteBuy()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}