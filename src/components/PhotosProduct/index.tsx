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
import { ModalDeletePhotoProduct } from '../popups/ModalDeletePhotoProduct/index';

export type DeletePhotoProduct = {
    id: string;
}

interface PhotoProduct {
    product_id: any;
}

const PhotosProduct = ({ product_id }: PhotoProduct) => {

    const navigate = useNavigate();

    const [productPhoto, setProductPhoto] = useState(null);
    const [photoInsertUrl, setPhotoInsertUrl] = useState('');

    const [allPhotos, setAllPhotos] = useState<any[]>([]);

    const [modalItem, setModalItem] = useState<DeletePhotoProduct[]>();
    const [modalVisible, setModalVisible] = useState(false);

    const [categories, setCategories] = useState<any[]>([]);
    const [atributos, setAtributos] = useState<any[]>([]);

    const photosProduct = allPhotos.map((item) => { return item.id });
    const existCategories = categories.length;
    const existAtributos = atributos.length;


    useEffect(() => {
        async function loadAtributos() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/findAllAtributosProduct?product_id=${product_id}`);
                setAtributos(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadAtributos();
    }, [product_id]);

    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/findRelationCategoryProduct?product_id=${product_id}`);
                setCategories(data.allFindOrderAsc || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadCategorys();
    }, [product_id]);

    useEffect(() => {
        async function loadAllPhotosProduct() {
            const apiClient = setupAPIClient();
            try {
                const responseProduct = await apiClient.get(`/allPhotosProducts?product_id=${product_id}`)

                setAllPhotos(responseProduct.data);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadAllPhotosProduct();
    }, [product_id]);

    function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0];
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setProductPhoto(image);
            setPhotoInsertUrl(URL.createObjectURL(image));
        }
    }

    useEffect(() => {
        if (existCategories >= 1) {
            updateRelationPhotoProduct();
            updateRelationPhotoProduct1();
        }
    });

    async function updateRelationPhotoProduct() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateFirstPhotoProduct?product_id=${product_id}`, { photoProduct_id: photosProduct[0] });
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function updateRelationPhotoProduct1() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateFirstPhotoProduct1?product_id=${product_id}`, { photoProduct_id1: photosProduct[1] });
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        if (existAtributos >= 1) {
            updatePhotoAtributo();
            updatePhotoAtributo1();
        }
    });

    async function updatePhotoAtributo() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateFirstPhotoProductAtributo?product_id=${product_id}`, { photoProduct_id: photosProduct[0] });
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function updatePhotoAtributo1() {
        const apiClient = setupAPIClient();
        try {
            await apiClient.put(`/updateFirstPhotoProduct1Atributo?product_id=${product_id}`, { photoProduct_id1: photosProduct[1] });
        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function handlePhoto(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (productPhoto === null) {
                toast.error('Carregue uma imagem!')
                console.log("Carregue uma imagem!");
                return;
            }

            data.append('file', productPhoto);
            /* @ts-ignore */
            data.append('product_id', product_id);
            data.append('posicao', "");

            const apiClient = setupAPIClient();
            await apiClient.post(`/photo`, data);

            toast.success('Foto inserida com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (err) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao inserir a foto!');
        }
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleOpenModalDelete(id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/photos', {
            params: {
                photoProduct_id: id,
            }
        });
        setModalItem(responseDelete.data);
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (

        <>
            <FormPhotoProduct onSubmit={handlePhoto}>
                <EtiquetaPhotoProductInsert>
                    <IconSpan>
                        <MdFileUpload size={35} />
                    </IconSpan>
                    <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFileInput} alt="foto do produto" />
                    {photoInsertUrl ? (

                        <>
                            <PhotoProductPreview src={photoInsertUrl} alt="foto do produto" width={170} height={120} />
                            <BlockButton>
                                <Button type="submit" style={{ backgroundColor: 'green' }}>
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
                                <PhotoProductImg src={"http://localhost:3333/files/" + photos.photo} alt="foto do produto" />
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

export default PhotosProduct