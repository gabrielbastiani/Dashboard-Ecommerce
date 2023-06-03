import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteAvaliacao } from '../../../pages/Avaliacoes/Avaliacao';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalAvaliacaoDelete {
    isOpen: boolean;
    onRequestClose: () => void;
    avaliacao: DeleteAvaliacao;
    slug: DeleteAvaliacao;
    product_id: DeleteAvaliacao;
}

export function ModalDeleteAvaliacao({ isOpen, onRequestClose, avaliacao, slug, product_id }: ModalAvaliacaoDelete) {

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


    async function handelDeleteAvaliacao() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const avalietion_id = avaliacao.id;

            await apiClient.delete(`/deleteAvalietion?avalietion_id=${avalietion_id}`);
            toast.success(`Avaliação deletada com sucesso.`);

            navigate(`/produto/avaliacoes/${slug}/${product_id}`);

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao deletar a avaliação!');
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
                <TextModal>Deseja mesmo deletar essa avaliação?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handelDeleteAvaliacao()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}