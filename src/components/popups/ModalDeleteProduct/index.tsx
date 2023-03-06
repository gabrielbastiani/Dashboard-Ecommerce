import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { DeleteProduct } from '../../../pages/Produtos/Produto';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { useState } from 'react';


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

    const [showElement, setShowElement] = useState(false);

    const showOrHide = () => {
        setShowElement(!showElement)
    }


    async function handleDeleteProduct() {
        try {
            const apiClient = setupAPIClient();
            /* @ts-ignore */
            const product_id = product.id;
            /* @ts-ignore */
            /* if (product.variacoes.length >= 1 || product.photoproducts.length >= 1) {
                toast.warning(`ATENÇÃO: Delete as imagens desse produto, e as variações antes de poder deletar por completo.`);
                return
            } */

            await apiClient.delete(`/deleteAllPhotos?product_id=${product_id}`);
            /* await apiClient.delete(`/deleteProduct?product_id=${product_id}`); */
            /* toast.success(`Produto deletado com sucesso.`); */

            navigate('/produtos');

            onRequestClose();

        } catch (error) {/* @ts-ignore */
            console.log(err.response.data);
            /* toast.error('Ops erro ao deletar o produto!'); */
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    function handleDeleteAndShow() {
        showOrHide();
        handleDeleteProduct();
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

            {showElement ? (
                <ContainerContent>
                    <TextModal>Deletar todas as variações e as imagens das variações</TextModal>

                    <ContainerButton>
                        <Button
                            style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                            onClick={showOrHide}
                        >
                            Sim
                        </Button>
                    </ContainerButton>
                </ContainerContent>
            ) :
                <ContainerContent>

                    <TextModal
                        style={{ textAlign: 'center' }}
                    >
                        Deseja mesmo deletar esse produto? <br />Para isso, será deletada todas as imagens e as variações desse produto
                    </TextModal>

                    <ContainerButton>
                        <Button
                            style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                            onClick={handleDeleteAndShow}
                        >
                            Sim e continuar
                        </Button>
                    </ContainerButton>
                </ContainerContent>
            }
        </Modal>
    )
}