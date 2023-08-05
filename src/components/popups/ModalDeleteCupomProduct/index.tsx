import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContainerContent, ContainerButton, TextModal, ButtonClose } from './styles';
import { DeleteProductCupon } from '../../../pages/Coupoms/Cupom';


interface DeleteRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    cuponProductId: DeleteProductCupon;
}

export function ModalDeleteCupomProduct({ isOpen, onRequestClose, cuponProductId }: DeleteRequest) {

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

    async function handleDeleteProductCupon() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const cuponProduct_id = cuponProductId.id;

            await apiClient.delete(`/deleteProductCoupom?cuponProduct_id=${cuponProduct_id}`);
            
            toast.success(`Produto deletado deste cupom com sucesso.`);

            onRequestClose();

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {
            /* @ts-ignore */
            console.log(error.response.data);
            toast.error('Erro ao deletar esse produto do cupom.');
            
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
                <TextModal>Deseja mesmo deletar esse produto, deste cupom de desconto?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteProductCupon()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}