import { useEffect, useState } from "react";
import { setupAPIClient } from "../../../services/api";
import { useParams } from "react-router-dom";
import { ModalDeleteGroup } from "../../../components/popups/ModalDeleteGroup";
import Modal from 'react-modal';


export type DeleteGroups = {
    groupCategoy_id: string;
}

const DeletePageGroup: React.FC = () => {

    let { groupCategoy_id } = useParams();

    const [modalItemGroup, setModalItemGroup] = useState<DeleteGroups>();
    const [modalVisibleGroups, setModalVisibleGroups] = useState(false);

    useEffect(() => {
        async function handleOpenModalDeleteGroup() {
            const apiClient = setupAPIClient();
            const response = await apiClient.get('/findUniqueGroup', {
                params: {
                    groupCategoy_id: groupCategoy_id,
                }
            });
            setModalItemGroup(response.data || "");
            setModalVisibleGroups(true);
        }
        handleOpenModalDeleteGroup();
    }, [groupCategoy_id]);

    function handleCloseModalDeleteGroup() {
        setModalVisibleGroups(false);
    }

    Modal.setAppElement('body');

    return (
        <>
            {modalVisibleGroups && (
                <ModalDeleteGroup
                    isOpen={modalVisibleGroups}
                    onRequestClose={handleCloseModalDeleteGroup}
                    /* @ts-ignore */
                    groupId={modalItemGroup}
                />
            )}
        </>
    )
}

export default DeletePageGroup;