import React, { useCallback, useEffect, useState } from "react";
import Modal from 'react-modal';
import { setupAPIClient } from "../../../../services/api";
import { Grid } from "../../../Dashboard/styles";
import Aside from "../../../../components/Aside";
import MainHeader from "../../../../components/MainHeader";
import { Card, Container } from "../../../../components/Content/styles";
import Voltar from "../../../../components/Voltar";
import { BlockTop } from "../styles";
import Titulos from "../../../../components/Titulos";
import { Button } from "../../../../components/ui/Button";
import { BlockDados } from "../../../Categorias/Categoria/styles";


export type DeleteCategory = {
    category_id: string;
}

const EditarBannerMosaico: React.FC = () => {

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);



    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(category_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/exactCategory', {
            params: {
                category_id: category_id,
            }
        });
        setModalItem(responseDelete.data || "");
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <Voltar
                            url="/banners/bannerHome"
                        />
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo={''}
                            />
                            <Button
                                type="submit"
                                style={{ backgroundColor: '#FB451E' }}
                                /* @ts-ignore */
                                onClick={ () => alert('clicou')}
                            >
                                Remover
                            </Button>
                        </BlockTop>

                        <BlockDados>
                         
                        </BlockDados>
                    </Card>
                </Container>
            </Grid>

            {/* {modalVisible && (
                <ModalDeleteCategory
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    category={modalItem}
                />
            )} */}
        </>
    )
}

export default EditarBannerMosaico;