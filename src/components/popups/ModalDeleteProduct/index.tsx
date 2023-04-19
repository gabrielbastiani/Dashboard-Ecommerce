import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteProduct } from '../../../pages/Produtos/Produto';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';


interface ModalDeleteProductRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    product: DeleteProduct;
}

export function ModalDeleteProduct({ isOpen, onRequestClose, product }: ModalDeleteProductRequest) {

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

    async function handleDeletePhotosAndVariacao() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const product_id = product.id;

            await apiClient.delete(`/deleteAllPhotos?product_id=${product_id}`);
            await apiClient.delete(`/deleteAllPhotosVariacao?product_id=${product_id}`);
            await apiClient.delete(`/deleteAllVariacaoProduct?product_id=${product_id}`);
            await apiClient.delete(`/deleteRelationProductIds?product_id=${product_id}`);
            await apiClient.delete(`/deleteAvaliacaoProductID?product_id=${product_id}`);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }

        setTimeout(() => {
            handleDeleteProduct();
        }, 2000);

    }

    async function handleDeleteProduct() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const product_id = product.id;

            await apiClient.delete(`/deleteProduct?product_id=${product_id}`);
            toast.success(`Produto deletado com sucesso.`);

            navigate('/produtos');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao deletar o produto!');
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

                <TextModal
                    style={{ textAlign: 'center' }}
                >
                    Deseja mesmo deletar esse produto? Para isso, <br />será deletada todas as imagens e as variações desse produto também.
                </TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={handleDeletePhotosAndVariacao}
                    >
                        Sim
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}