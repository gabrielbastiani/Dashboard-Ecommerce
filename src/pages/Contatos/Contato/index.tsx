import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ModalDeleteNewsletter } from "../../../components/popups/ModalDeleteNewsletter";
import { setupAPIClient } from '../../../services/api';
import { useParams } from 'react-router-dom';


export type DeleteNews = {
    newsletter_id: string;
}

const Contato: React.FC = () => {

    let { newsletter_id } = useParams();

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(newsletter_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/listExactNewsletter', {
            params: {
                newsletter_id: newsletter_id,
            }
        });
        setModalItem(responseDelete.data || "");
        setModalVisible(true);
    }

    useEffect(() => {
        function newsDelete() {
            /* @ts-ignore */
            handleOpenModalDelete(newsletter_id)
        }
        newsDelete();
    },[newsletter_id])

    Modal.setAppElement('body');

    return (
        <>
            {modalVisible && (
                <ModalDeleteNewsletter
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    newsletter={modalItem}
                />
            )}
        </>
    )
}

export default Contato;