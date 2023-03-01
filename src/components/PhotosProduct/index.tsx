import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import {
    EtiquetaPhotoProduct,
    IconSpan,
    InputLogo,
    PhotoProductPreview,
    PhotoProductImg,
    FormPhotoProduct,
    GridContainer,
    ClickPhoto,
    BlockButton
} from './styles';
import { ButtonConfirm, EditBox, ValueText } from "../ui/InputUpdate/styles";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/Button";


interface PhotoProduct {
    product_id: any;
}

const PhotosProduct = ({ product_id }: PhotoProduct) => {

    const navigate = useNavigate();

    const [productPhoto, setProductPhoto] = useState(null);
    const [photoProductUrl, setPhotoProductUrl] = useState('');
    const [photoInsertUrl, setPhotoInsertUrl] = useState('');

    const [allPhotos, setAllPhotos] = useState<any[]>([]);


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
    }, [product_id])

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

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
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
            setPhotoProductUrl(URL.createObjectURL(image));
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

            const apiClient = setupAPIClient();
            await apiClient.post(`/photo`, data);

            toast.success('Foto inserida com sucesso');

        } catch (err) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao inserir a foto!');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }

    async function handlePhotoUpdate(event: FormEvent, id: any) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', productPhoto);

            /* console.log("ID Update", id) */

            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePhoto?photoProduts_id=${id}`, data);

            toast.success('Foto atualizada com sucesso');

        } catch (err) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao atualizar a foto!');
        }
        setTimeout(() => {
            navigate(0);
        }, 3000);
    }


    return (
        <>
            <FormPhotoProduct onSubmit={handlePhoto}>
                <EtiquetaPhotoProduct>
                    <IconSpan>
                        <MdFileUpload size={30} />
                    </IconSpan>
                    <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFileInput} alt="foto do produto" />
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
                </EtiquetaPhotoProduct>
            </FormPhotoProduct>


            {allPhotos.length !== 0 && (
                <GridContainer>
                    {allPhotos.map((photos) => {
                        return (/* @ts-ignore */
                            <FormPhotoProduct key={photos.id} onSubmit={handlePhotoUpdate}>
                                <EtiquetaPhotoProduct>
                                    <IconSpan>
                                        <MdFileUpload size={30} />
                                    </IconSpan>
                                    <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="foto do produto" />
                                    {photoProductUrl ? (
                                        <>
                                            <PhotoProductPreview
                                                src={photoProductUrl}
                                                alt="foto do produto"
                                                width={170}
                                                height={80}
                                            />
                                            <EditBox>
                                                <ValueText style={{ marginBottom: '12px' }}>Editar imagem:</ValueText>
                                                <ButtonConfirm type="submit"><FaEdit /></ButtonConfirm>
                                            </EditBox>
                                        </>
                                    ) :
                                        <PhotoProductImg src={"http://localhost:3333/files/" + photos.photo} alt="foto do produto" />
                                    }
                                </EtiquetaPhotoProduct>
                            </FormPhotoProduct>
                        )
                    })}
                </GridContainer>
            )}
        </>
    )
}

export default PhotosProduct