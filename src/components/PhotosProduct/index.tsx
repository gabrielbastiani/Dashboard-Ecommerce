import { ChangeEvent, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import {
    EtiquetaPhotoProduct,
    IconSpan,
    InputLogo,
    PhotoProductPreview,
    PhotoProductImg,
    FormPhotoProduct
} from './styles';

interface PhotoProduct {
    setProductPhoto: any;
    onSubmitPhoto: () => void;
    id: string;
    productPhoto: string;
}

const PhotosProduct: React.FC<PhotoProduct> = ({ onSubmitPhoto, id }) => {

    const [productPhoto, setProductPhoto] = useState(null);
    const [photoProductUrl, setPhotoProductUrl] = useState('');

    console.log("Componente: ", productPhoto)

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


    return (
        <>
            <FormPhotoProduct id={id} onSubmit={onSubmitPhoto}>
                <EtiquetaPhotoProduct>
                    <IconSpan>
                        <MdFileUpload size={30} />
                    </IconSpan>
                    <InputLogo type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="foto do produto" />
                    {photoProductUrl ? (
                        <PhotoProductPreview
                            src={photoProductUrl}
                            alt="foto do produto"
                            width={170}
                            height={80}
                        />
                    ) :
                        <>
                            <PhotoProductImg src={"http://localhost:3333/files/" + productPhoto} />
                        </>
                    }
                </EtiquetaPhotoProduct>
            </FormPhotoProduct>
        </>
    )

}

export default PhotosProduct