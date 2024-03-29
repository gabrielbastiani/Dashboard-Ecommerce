import Modal from 'react-modal';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteNews } from '../../../pages/Newsletters/Newsletter';
import VoltarNavagation from '../../VoltarNavagation';


interface DeleteNewsletter {
    isOpen: boolean;
    onRequestClose: () => void;
    newsletter: DeleteNews;
}

export function ModalDeleteNewsletter({ isOpen, onRequestClose, newsletter }: DeleteNewsletter) {

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


    async function handleDeleteNews() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const newsletter_id = newsletter.id;

            await apiClient.delete(`/deleteNewsletter?newsletter_id=${newsletter_id}`);
            toast.success(`Newsletter deletada com sucesso.`);
            
            navigate('/newsletters');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar a newsletter!');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }


    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
        >
            <VoltarNavagation />

            <ContainerContent>
                <TextModal>Deseja mesmo deletar essa newsletter?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteNews()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}