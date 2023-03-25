import React, { useState } from 'react';
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
    BlockTop
} from '../styles';



const NovoBannerHome: React.FC = () => {




    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url={'/banners/bannerHome'} />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Novo Banner para Home"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                            onClick={() => alert('clicou')}
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <Block>
                        <Etiqueta>Link do Banner:</Etiqueta>
                        <InputPost
                            type="text"
                            placeholder="Insira um link para destino..."
                            value={''}
                            onChange={(/* e */) => alert('clicou')}
                        />
                    </Block>

                </Card>
            </Container>
        </Grid>
    )

}

export default NovoBannerHome;