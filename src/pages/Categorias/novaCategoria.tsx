import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import Titulos from '../../components/Titulos';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { Grid } from '../Dashboard/styles';
import MainHeader from '../../components/MainHeader';
import Aside from '../../components/Aside';
import {
    Container,
    Etiqueta,
    Block,
    BlockTop
} from './styles';
import { Button } from '../../components/ui/Button';
import Voltar from '../../components/Voltar';
import { InputPost } from '../../components/ui/InputPost';
import { Card } from '../../components/Content/styles';
import { useNavigate } from 'react-router-dom';
import { MdFileUpload } from 'react-icons/md';
import { BlockImagem, EtiquetaImagens, FormImagens, IconSpanImagens, ImagensPreviewUrl, ImagensUpload, InputImagens, TextImagens } from '../Configuracoes/ImagensInstitucionais/styles';


const NovaCategoria: React.FC = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState('');
    const [lojaID] = useState(user.loja_id);

    const [redeImage, setRedeImage] = useState(null);
    const [redeImageUrl, setRedeImageUrl] = useState('');


    async function handleRegisterCategory(event: FormEvent) {
        event.preventDefault();
        const apiClient = setupAPIClient();
        try {
            if (categoryName === '') {
                toast.error('Digite algum nome para sua categoria!');
                return;
            }

            if (lojaID === null) {
                toast.error('Cadastre os dados da sua loja antes de cadastrar uma categoria!');
                return;
            }

            const data = new FormData();
            /* @ts-ignore */
            data.append('file', logoLoja);
            data.append('categoryName', categoryName.replace(/[/]/g, "-"));
            data.append('posicao', "");
            data.append('order', "0");
            data.append('loja_id', lojaID);

            await apiClient.post(`/category`, data);

            toast.success('Loja cadastrada com sucesso.');

            setTimeout(() => {
                navigate('/categorias');
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.data.response);
            toast.error('Erro ao cadastrar a categoria!!!');
        }

    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            /* @ts-ignore */
            setRedeImage(image)
            setRedeImageUrl(URL.createObjectURL(image))
        }

    }


    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url={'/categorias'} />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Nova Categoria"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            form="form-category"
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <FormImagens id="form-category" onSubmit={handleRegisterCategory}>
                        <BlockImagem>
                            <EtiquetaImagens>
                                <IconSpanImagens>
                                    <MdFileUpload size={50} />
                                </IconSpanImagens>
                                <InputImagens type="file" accept="image/png, image/jpeg" onChange={handleFile} alt="imagem da loja" />
                                {imagesUrl ? (
                                    <ImagensPreviewUrl
                                        src={imagesUrl}
                                        alt="imagem da loja"
                                    />
                                ) :
                                    <>
                                        <ImagensUpload src={"http://localhost:3333/files/" + images} />
                                        <TextImagens>Clique na seta e insira<br /> uma imagem</TextImagens>
                                    </>
                                }
                            </EtiquetaImagens>
                        </BlockImagem>

                        <Block>
                            <Etiqueta>Nome:</Etiqueta>
                            <InputPost
                                type="text"
                                placeholder="Digite o nome da categoria"
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </Block>
                    </FormImagens>
                </Card>
            </Container>
        </Grid>
    )

}

export default NovaCategoria;