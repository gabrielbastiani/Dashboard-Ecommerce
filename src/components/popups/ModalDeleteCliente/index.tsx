import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteCliente } from '../../../pages/Clientes/Cliente'; 
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalDeleteClientes {
    isOpen: boolean;
    onRequestClose: () => void;
    cliente: DeleteCliente;
}

export function ModalDeleteCliente({ isOpen, onRequestClose, cliente }: ModalDeleteClientes) {

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


    async function handleDeleteCliente() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const user_id = cliente.id;

            await apiClient.delete(`/deleteUser?user_id=${user_id}`);
            toast.success(`Cliente deletado com sucesso.`);
            
            navigate('/clientes');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar o cliente!');
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
                <TextModal>Deseja mesmo deletar esse cliente?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteCliente()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}