import Modal from 'react-modal';
import { FiX } from 'react-icons/fi'; 
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalDeleteVariacaoRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    variacao: string;
    variationReload: () => void;
    deleteClose: () => void;
}

export function ModalDeleteVariacao({ isOpen, onRequestClose, variacao, variationReload, deleteClose }: ModalDeleteVariacaoRequest) {

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

    async function handleDeletePhotosVariacao() {
        try {
            const apiClient = setupAPIClient();

            await apiClient.delete(`/deleteAllPhotosVariation?productVariation_id=${variacao}`);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }

        setTimeout(() => {
            handleDeleteVariacao();
        }, 2000);

    }

    async function handleDeleteVariacao() {
        try {
            const apiClient = setupAPIClient();

            await apiClient.delete(`/deleteVariation?productVariation_id=${variacao}`);
            toast.success(`Variação deletada com sucesso.`);

            onRequestClose();
            variationReload();
            deleteClose();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao deletar a variação!');
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

                <TextModal
                    style={{ textAlign: 'center' }}
                >
                    Deseja mesmo deletar essa variação?
                </TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={handleDeletePhotosVariacao}
                    >
                        Sim
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}