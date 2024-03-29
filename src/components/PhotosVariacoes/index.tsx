import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { IoIosRemoveCircle } from 'react-icons/io'
import {
    EtiquetaPhotoProduct,
    IconSpan,
    InputLogo,
    PhotoProductPreview,
    PhotoProductImg,
    FormPhotoVariante,
    GridContainer,
    ClickPhoto,
    BlockButton,
    IconButton,
    EtiquetaPhotoProductInsert
} from './styles';
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import Modal from 'react-modal';
import { ModalDeletePhotoVariante } from '../popups/ModalDeletePhotoVariante/index';


export type DeletePhotoVariacao = {
    id: string;
}

interface PhotoVariacao {
    variation_id: string;
}

const PhotosVariacoes = ({ variation_id }: PhotoVariacao) => {

    const navigate = useNavigate();

    const [photoVariacao, setPhotoVariacao] = useState(null);
    const [photoInsertVarianteUrl, setPhotoInsertVarianteUrl] = useState('');

    const [allPhotosVariantes, setAllPhotosVariantes] = useState<any[]>([]);

    const [modalItem, setModalItem] = useState<DeletePhotoVariacao[]>();
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadAllImagesVariation() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allVariationImages?productVariation_id=${variation_id}`);

                setAllPhotosVariantes(response.data);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadAllImagesVariation();
    }, [variation_id])

    function handleFilePhotoVariacao(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0];
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setPhotoVariacao(image);
            setPhotoInsertVarianteUrl(URL.createObjectURL(image));
        }
    }

    async function handlePhotoVariacao(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (photoVariacao === null) {
                toast.error('Carregue uma imagem!')
                console.log("Carregue uma imagem!");
                return;
            }

            data.append('file', photoVariacao);
            /* @ts-ignore */
            data.append('productVariation_id', variation_id);

            const apiClient = setupAPIClient();
            await apiClient.post(`/createImageVariation`, data);

            toast.success('Imagem inserida com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (err) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao inserir a imagem!');
        }
    }

    function handleCloseModalPhotoVariante() {
        setModalVisible(false);
    }

    async function handleOpenModalDeleteVariante(id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/allImagesVariation', {
            params: {
                photoVariation_id: id,
            }
        });
        setModalItem(responseDelete.data);
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <FormPhotoVariante onSubmit={handlePhotoVariacao}>
                <EtiquetaPhotoProductInsert>
                    <IconSpan>
                        <MdFileUpload size={35} />
                    </IconSpan>
                    <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFilePhotoVariacao} alt="foto da variacao" />
                    {photoInsertVarianteUrl ? (
                        <>
                            <PhotoProductPreview
                                src={photoInsertVarianteUrl}
                                alt="foto do produto"
                                width={170}
                                height={120}
                            />
                            <BlockButton>
                                <Button
                                    type="submit"
                                    style={{ backgroundColor: 'green' }}
                                >
                                    Salvar Imagem</Button>
                            </BlockButton>
                        </>
                    ) :
                        <ClickPhoto>Insira a foto aqui</ClickPhoto>
                    }
                </EtiquetaPhotoProductInsert>
            </FormPhotoVariante>


            {allPhotosVariantes.length !== 0 && (
                <GridContainer>
                    {allPhotosVariantes.map((variantePhotos) => {
                        return (
                            <EtiquetaPhotoProduct key={variantePhotos.id}>
                                <IconButton onClick={() => handleOpenModalDeleteVariante(variantePhotos.id)}>
                                    <IoIosRemoveCircle size={30} />
                                </IconButton>
                                <PhotoProductImg src={"http://localhost:3333/files/" + variantePhotos.image} alt="foto da variacao" />
                            </EtiquetaPhotoProduct>
                        )
                    })}
                </GridContainer>
            )}

            {modalVisible && (
                <ModalDeletePhotoVariante
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalPhotoVariante}
                    /* @ts-ignore */
                    photosVariante={modalItem}
                />
            )}
        </>
    )
}

export default PhotosVariacoes