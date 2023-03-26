import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Card } from '../../../../components/Content/styles';
import Voltar from '../../../../components/Voltar';
import { Button } from '../../../../components/ui/Button';
import { InputPost } from '../../../../components/ui/InputPost';
import { Grid } from '../../../Dashboard/styles';
import MainHeader from '../../../../components/MainHeader';
import Aside from '../../../../components/Aside';
import Titulos from '../../../../components/Titulos';
import {
    Container,
    Etiqueta,
    Block,
    BlockTop,
    FormBanner,
    EtiquetaBannerInsert,
    IconSpan,
    InputBanner,
    BannerPreview,
    ClickBanner
} from '../styles';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../../../services/api';
import { MdFileUpload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const NovoBannerHome: React.FC = () => {

    const navigate = useNavigate();

    const [banner, setBanner] = useState(null);
    const [bannerInsertUrl, setBannerInsertUrl] = useState('');
    const [url, setUrl] = useState('');

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
            setBanner(image);
            setBannerInsertUrl(URL.createObjectURL(image));
        }
    }

    async function handleBanner(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (banner === null) {
                toast.error('Carregue uma imagem!')
                console.log("Carregue uma imagem!");
                return;
            }

            data.append('file', banner);
            data.append('url', url);

            const apiClient = setupAPIClient();
            await apiClient.post(`/createBannerHome`, data);

            toast.success('Banner inserido com sucesso');

        } catch (err) {/* @ts-ignore */
            console.log(err.response.data);
            toast.error('Ops erro ao inserir o banner!');
        }
        setTimeout(() => {
            navigate('/banners/bannerHome');
        }, 2000);
    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card style={{ height: '850px' }}>
                    <Voltar url={'/banners/bannerHome'} />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Novo Banner para Home"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            form="form-bannerHome"
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Block>
                        <Etiqueta>Link do Banner:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Insira um link para destino..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </Block>

                    <FormBanner id="form-bannerHome" onSubmit={handleBanner}>
                        <EtiquetaBannerInsert>
                            <IconSpan>
                                <MdFileUpload size={55} />
                            </IconSpan>
                            <InputBanner type="file" accept="image/png, image/jpeg" onChange={handleFileInput} alt="banner loja" />
                            {bannerInsertUrl ? (
                                <>
                                    <BannerPreview
                                        src={bannerInsertUrl}
                                        alt="banner loja"
                                        width={800}
                                        height={520}
                                    />
                                </>
                            ) :
                                <ClickBanner>Clique aqui e Insira o banner</ClickBanner>
                            }
                        </EtiquetaBannerInsert>
                    </FormBanner>
                </Card>
            </Container>
        </Grid>
    )

}

export default NovoBannerHome;