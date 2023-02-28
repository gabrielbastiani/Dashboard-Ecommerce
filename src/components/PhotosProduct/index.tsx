import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import {
    EtiquetaPhotoProduct,
    IconSpan,
    InputLogo,
    PhotoProductPreview,
    PhotoProductImg,
    FormPhotoProduct
} from './styles';
import { ButtonConfirm, EditBox, ValueText } from "../ui/InputUpdate/styles";
import { GiConfirmed } from "react-icons/gi";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";


interface PhotoProduct {
    product_id: any;
}

const PhotosProduct = ({ product_id }: PhotoProduct) => {

    const navigate = useNavigate();

    const [productPhoto, setProductPhoto] = useState(null);
    const [photoProductUrl, setPhotoProductUrl] = useState('');

    const [allPhotos, setAllPhotos] = useState([]);

    console.log(allPhotos)

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

    async function handlePhotoUpdate(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            /* @ts-ignore */
            data.append('file', productPhoto);

            const apiClient = setupAPIClient();
            /* await apiClient.put(`/updatePhoto?photoProduts_id=${photoProduts_id}`, data); */

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
            <div>
                {allPhotos.map((photos) => {
                    return (
                        <>
                            <div>

                                <PhotoProductImg src={"http://localhost:3333/files/" + photos.photo} alt="foto do produto" />
                            </div>
                        </>
                    )
                })}
            </div>
            {productPhoto ? (
                <FormPhotoProduct onSubmit={handlePhotoUpdate}>
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
                            <>
                                <PhotoProductImg src={"http://localhost:3333/files/" + productPhoto} alt="foto do produto" />
                            </>
                        }
                    </EtiquetaPhotoProduct>
                </FormPhotoProduct>
            ) :
                <FormPhotoProduct onSubmit={handlePhoto}>
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
                                    <ValueText style={{ marginBottom: '12px' }}>Salvar imagem:</ValueText>
                                    <ButtonConfirm type="submit"><GiConfirmed /></ButtonConfirm>
                                </EditBox>
                            </>
                        ) :
                            <>
                                <PhotoProductImg src={"http://localhost:3333/files/" + productPhoto} alt="foto do produto" />
                            </>
                        }
                    </EtiquetaPhotoProduct>
                </FormPhotoProduct>
            }
        </>
    )

}

export default PhotosProduct