import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteRede } from '../../../pages/Configuracoes/Rede';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalRedeDelete {
    isOpen: boolean;
    onRequestClose: () => void;
    rede: DeleteRede;
}

export function ModalDeleteRedeSocial({ isOpen, onRequestClose, rede }: ModalRedeDelete) {

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


    async function handleDeleteRedeSocial() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const redesocial_id = rede.id;

            await apiClient.delete(`/deleteRedeSocial?redesocial_id=${redesocial_id}`);
            toast.success(`Categoria deletada com sucesso.`);
            
            navigate('/configuracoes');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar a rede social!');
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
                <TextModal>Deseja mesmo deletar essa rede social?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteRedeSocial()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}