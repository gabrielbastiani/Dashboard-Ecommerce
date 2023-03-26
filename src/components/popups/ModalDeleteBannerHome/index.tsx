import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteBanner } from '../../../pages/Banners/BannerHome/EditarBannerHome';


interface ModalDeleteBannerHomeRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    bannerId: DeleteBanner;
}

export function ModalDeleteBannerHome({ isOpen, onRequestClose, bannerId }: ModalDeleteBannerHomeRequest) {

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


    async function handleDeleteBanner() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const bannerHome_id = bannerId.id;

            await apiClient.delete(`/deleteBannerHome?bannerHome_id=${bannerHome_id}`);
            toast.success(`Banner deletado com sucesso.`);

            navigate('/banners/bannerHome');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar o banner!');
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

                <TextModal>Deseja mesmo deletar esse banner?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={() => handleDeleteBanner()}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}