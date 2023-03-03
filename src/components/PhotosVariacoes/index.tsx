import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { IoIosRemoveCircle } from 'react-icons/io'
import {
    EtiquetaPhotoProduct,
    IconSpan,
    InputLogo,
    PhotoProductPreview,
    PhotoProductImg,
    FormPhotoProduct,
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
import { ModalDeletePhotoProduct } from '../../components/ModalDeletePhotoProduct/index';


export type DeletePhotoProduct = {
    id: string;
}

interface PhotoVariacao {
    variacao_id: any;
}

const PhotosVariacoes = ({ variacao_id }: PhotoVariacao) => {

    const navigate = useNavigate();

    const [photoVariacao, setPhotoVariacao] = useState(null);
    const [photoInsertUrl, setPhotoInsertUrl] = useState('');

    const [allPhotos, setAllPhotos] = useState<any[]>([]);

    const [modalItem, setModalItem] = useState<DeletePhotoProduct[]>();
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadAllPhotosProduct() {
            const apiClient = setupAPIClient();
            try {
                const responseProduct = await apiClient.get(`/variacoes?variacao_id=${variacao_id}`)

                setAllPhotos(responseProduct.data);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadAllPhotosProduct();
    }, [variacao_id])

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
            setPhotoInsertUrl(URL.createObjectURL(image));
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
            data.append('variacao_id', variacao_id);

            const apiClient = setupAPIClient();
            await apiClient.post(`/photoVariante`, data);

            toast.success('Foto inserida com sucesso');

        } catch (err) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao inserir a foto!');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/photosVariacao', {
            params: {
                photoVariacao_id: id,
            }
        });
        setModalItem(responseDelete.data);
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <FormPhotoProduct onSubmit={handlePhotoVariacao}>
                <EtiquetaPhotoProductInsert>
                    <IconSpan>
                        <MdFileUpload size={35} />
                    </IconSpan>
                    <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFilePhotoVariacao} alt="foto da variacao" />
                    {photoInsertUrl ? (
                        <>
                            <PhotoProductPreview
                                src={photoInsertUrl}
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
            </FormPhotoProduct>


            {allPhotos.length !== 0 && (
                <GridContainer>
                    {allPhotos.map((photos) => {
                        return (
                            <EtiquetaPhotoProduct key={photos.id}>
                                <IconButton onClick={() => handleOpenModalDelete(photos.id)}>
                                    <IoIosRemoveCircle size={30} />
                                </IconButton>
                                <PhotoProductImg src={"http://localhost:3333/files/" + photos.photoVariacao} alt="foto da variacao" />
                            </EtiquetaPhotoProduct>
                        )
                    })}
                </GridContainer>
            )}

            {modalVisible && (
                <ModalDeletePhotoProduct
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    photos={modalItem}
                />
            )}
        </>
    )
}

export default PhotosVariacoes