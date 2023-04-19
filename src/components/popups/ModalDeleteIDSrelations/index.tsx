import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { Button } from '../../ui/Button/index';
import { setupAPIClient } from '../../../services/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, ContainerContent, ContainerButton, TextModal } from './styles';
import { DeleteIDSRelations } from '../../../pages/Produtos/ProdutoCategoria/newNivelCategoryProduct';


interface DeleteRelationsCategorys {
    isOpen: boolean;
    onRequestClose: () => void;
    relationIDS: DeleteIDSRelations;
    idPai: DeleteIDSRelations;
}

export function ModalDeleteIDSrelations({ isOpen, onRequestClose, relationIDS }: DeleteRelationsCategorys) {

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

    async function handleRelationsIDSDelete() {
        try {
            const apiClient = setupAPIClient();
            const relationsIDS = relationIDS.id;
            /* DELETAR A LINHA DO ID PRINCIPAL */
            await apiClient.delete(`/deleteIDRelation?relationProductCategory_id=${relationsIDS}`);

            toast.success(`Relação de categoria deletada com sucesso.`);

            onRequestClose();

        } catch (error) {
            /* @ts-ignore */
            toast.error(`${error.response.data.error}`);
            /* @ts-ignore */
            console.log(error.response.data);
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
                <TextModal>Deseja mesmo deletar essa relação de categoria?</TextModal>

                <ContainerButton>
                    <Button
                        style={{ width: '40%', fontWeight: "bold", fontSize: '1.2rem' }}
                        onClick={handleRelationsIDSDelete}
                    >
                        Deletar
                    </Button>
                </ContainerButton>
            </ContainerContent>
        </Modal>
    )
}