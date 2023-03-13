import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { CancelPedido } from '../../../pages/Pedidos/Pedido';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalAvaliacaoDelete {
    isOpen: boolean;
    onRequestClose: () => void;
    pedido: CancelPedido;
    cancelado: CancelPedido;
}

export function ModalCancelarPedido({ isOpen, onRequestClose, pedido, cancelado }: ModalAvaliacaoDelete) {

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

    async function handleCacelarPedido() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const pedido_id = pedido.id;
            await apiClient.put(`/cancelarPedidoAdmin?pedido_id=${pedido_id}`);

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao cancelar o pedido.');
        }
        /* @ts-ignore */
        if (cancelado === "Cancelado") {
            toast.success(`Pedido ativo com sucesso.`);
            onRequestClose();
            return;
        }
        /* @ts-ignore */
        if (cancelado === "Valido") {
            toast.error(`Pedido cancelado com sucesso.`);
            onRequestClose();
            return;
        }
        
    }

    const cancelNo = String("Cancelado");
    const cancelYes = String("Valido");
    const statusAtual = String(cancelado);


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
                
                {cancelNo === statusAtual && (
                    <>
                        <TextModal>Deseja mesmo ativar esse pedido?</TextModal>
                    </>
                )}

                {cancelYes === statusAtual && (
                    <>
                        <TextModal>Deseja mesmo cancelar esse pedido?</TextModal>
                    </>
                )}

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleCacelarPedido()}
                    >
                        Sim
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}