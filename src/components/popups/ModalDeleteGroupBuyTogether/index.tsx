import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContainerContent, ContainerButton, TextModal, ButtonClose } from './styles';
import { DeleteBuyGroup } from '../../../pages/Produtos/CompreJunto/editGrupoCompreJunto';


interface DeleteRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    relation: DeleteBuyGroup;
}

export function ModalDeleteGroupBuyTogether({ isOpen, onRequestClose, relation }: DeleteRequest) {

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

    async function handleDeleteBuyGroup() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const buyTogether_id = relation.id;

            await apiClient.delete(`/deleteGroupAllProductsBuyTogether?buyTogether_id=${buyTogether_id}`);
            
            toast.success(`Grupo compre junto deletado com sucesso.`);

            onRequestClose();

            setTimeout(() => {
                navigate('/compreJunto');
            }, 3000);

        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
            /* @ts-ignore */
            toast.error(`${error.response.data.error}`);
            
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
                <TextModal>Deseja mesmo deletar esse grupo compre junto?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteBuyGroup()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}