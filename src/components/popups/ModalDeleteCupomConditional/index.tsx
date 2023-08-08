import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContainerContent, ContainerButton, TextModal, ButtonClose } from './styles';
import { DeleteConditional } from '../../../pages/Coupoms/Cupom'; 


interface DeleteRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    cuponConditionalId: DeleteConditional;
}

export function ModalDeleteCupomConditional({ isOpen, onRequestClose, cuponConditionalId }: DeleteRequest) {

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

    async function handleDeleteConditional() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const couponConditional_id = cuponConditionalId.id;

            await apiClient.delete(`/deleteConditionalCupon?couponConditional_id=${couponConditional_id}`);
            
            toast.success(`Condição do cupom deletada com sucesso.`);

            onRequestClose();

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao deletar essa condição.');
            
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
                <TextModal>Deseja mesmo deletar a condição para esse cupom?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteConditional()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}