import { useEffect, useState } from "react";
import PhotosVariacoes from "../../../components/PhotosVariacoes";
import { TextoDados } from "../../../components/TextoDados";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { ButtonSelect } from "../../../components/ui/ButtonSelect";
import DescriptionsProductUpdate from "../../../components/ui/DescriptionsProductUpdate";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import { setupAPIClient } from "../../../services/api";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { BlockTop } from "../../Categorias/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { GridDate } from "../../Perfil/styles";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { ModalDeleteVariacao } from '../../../components/popups/ModalDeleteVariacao';
import { BoxCategory, ButtonUpdateCategory, GridContainer, NameCategory } from "../styles";


export type DeleteVariacao = {
    variacao_id: string;
}

interface ItemsVariacao {
    productId: string;
    variacao_id: string;
    photoVariacaoID: string;
    nameVariacao: string;
    descriptionVariacao1: any;
    descriptionVariacao2: any;
    descriptionVariacao3: any;
    descriptionVariacao4: any;
    descriptionVariacao5: any;
    descriptionVariacao6: any;
    preco: string;
    skuVariacao: string;
    estoqueVariacao: string;
    pesoKg: string;
    larguraCm: string;
    alturaCm: string;
    profundidadeCm: string;
    promocao: string;
}

const VariacaoDetalhes = ({
    variacao_id,
    productId,
    photoVariacaoID,
    nameVariacao,
    descriptionVariacao1,
    descriptionVariacao2,
    descriptionVariacao3,
    descriptionVariacao4,
    descriptionVariacao5,
    descriptionVariacao6,
    preco,
    skuVariacao,
    estoqueVariacao,
    pesoKg,
    larguraCm,
    alturaCm,
    profundidadeCm,
    promocao,
}: ItemsVariacao) => {

    const [nameVariacoes, setNameVariacoes] = useState('');
    const [precoVariacoes, setPrecoVariacoes] = useState('');
    const [skuVariacoes, setSkuVariacoes] = useState('');
    const [estoqueVariacoes, setEstoqueVariacoes] = useState('');
    const [pesoKgVariacoes, setPesoKgVariacoes] = useState('');
    const [larguraCmVariacoes, setLarguraCmVariacoes] = useState('');
    const [profundidadeCmVariacoes, setProfundidadeCmVariacoes] = useState('');
    const [alturaCmVariacoes, setAlturaCmVariacoes] = useState('');
    const [promocaoVariacoes, setPromocaoVariacoes] = useState('');
    const [disponibilidadeVariacoes, setDisponibilidadeVariacoes] = useState('');
    const [fretesGratis, setFretesGratis] = useState('');
    const [variacaoDestaques, setVariacaDestaques] = useState('');
    const [variacaoOfertas, setVariacaoOfertas] = useState('');

    const [descriptionVariacoes1, setDescriptionVariacoes1] = useState('');
    const [descriptionVariacoes2, setDescriptionVariacoes2] = useState('');
    const [descriptionVariacoes3, setDescriptionVariacoes3] = useState('');
    const [descriptionVariacoes4, setDescriptionVariacoes4] = useState('');
    const [descriptionVariacoes5, setDescriptionVariacoes5] = useState('');
    const [descriptionVariacoes6, setDescriptionVariacoes6] = useState('');

    const [allRelationAtributos, setAllRelationAtributos] = useState<any[]>([]);

    const [modalItem, setModalItem] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        async function loadVariacao() {
            const apiClient = setupAPIClient();
            try {
                const responseVariacao = await apiClient.get(`/exactVariacao?variacao_id=${variacao_id}`);
                const {
                    nameVariacao,
                    descriptionVariacao1,
                    descriptionVariacao2,
                    descriptionVariacao3,
                    descriptionVariacao4,
                    descriptionVariacao5,
                    descriptionVariacao6,
                    preco,
                    skuVariacao,
                    estoqueVariacao,
                    pesoKg,
                    larguraCm,
                    alturaCm,
                    profundidadeCm,
                    disponibilidadeVariacao,
                    promocao,
                    freteGratis,
                    variacaoDestaque,
                    variacaoOferta
                } = responseVariacao.data

                setNameVariacoes(nameVariacao);
                setPrecoVariacoes(preco);
                setSkuVariacoes(skuVariacao);
                setEstoqueVariacoes(estoqueVariacao);
                setPesoKgVariacoes(pesoKg);
                setLarguraCmVariacoes(larguraCm);
                setProfundidadeCmVariacoes(profundidadeCm);
                setAlturaCmVariacoes(alturaCm);
                setPromocaoVariacoes(promocao);
                setDisponibilidadeVariacoes(disponibilidadeVariacao);
                setFretesGratis(freteGratis);
                setVariacaDestaques(variacaoDestaque);
                setVariacaoOfertas(variacaoOferta);

                setDescriptionVariacoes1(descriptionVariacao1);
                setDescriptionVariacoes2(descriptionVariacao2);
                setDescriptionVariacoes3(descriptionVariacao3);
                setDescriptionVariacoes4(descriptionVariacao4);
                setDescriptionVariacoes5(descriptionVariacao5);
                setDescriptionVariacoes6(descriptionVariacao6);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadVariacao();
    }, [variacao_id]);

    useEffect(() => {
        async function findsRelationsProducts() {
            try {
                const apiClient = setupAPIClient();
                const response = await apiClient.get(`/allAtributosProductRelation?variacao_id=${variacao_id}`);

                setAllRelationAtributos(response.data || []);

            } catch (error) {
                console.error(error);
            }
        }
        findsRelationsProducts();
    }, [variacao_id]);

    async function updateStatus() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateDisponibilidadeVariacao?variacao_id=${variacao_id}`);

            refreshVariacao();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a disponibilidade da variacão.');
        }

        if (disponibilidadeVariacoes === "Indisponivel") {
            toast.success(`A variação se encontra Disponivel.`);
            return;
        }

        if (disponibilidadeVariacoes === "Disponivel") {
            toast.error(`A variação se encontra Indisponivel.`);
            return;
        }
    }

    async function updateFrete() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/freteGratisVariacao?variacao_id=${variacao_id}`);

            refreshVariacao();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o frete grátis.');
        }

        if (fretesGratis === "Nao") {
            toast.success(`O produto esta como frete grátis.`);
            return;
        }

        if (fretesGratis === "Sim") {
            toast.error(`O produto não esta como frete grátis.`);
            return;
        }
    }

    async function updateDestaqueVariacao() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/destaqueVariacao?variacao_id=${variacao_id}`);

            refreshVariacao();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar variação destaque.');
        }

        if (variacaoDestaques === "Nao") {
            toast.success(`Essa variação é um destaque na loja.`);
            return;
        }

        if (variacaoDestaques === "Sim") {
            toast.error(`Essa variação não está como destaque na loja.`);
            return;
        }
    }

    async function updateOfertaVariacao() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/ofertaVariacao?variacao_id=${variacao_id}`);

            refreshVariacao();

        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar variação de oferta.');
        }

        if (variacaoOfertas === "Nao") {
            toast.success(`Essa variação é uma oferta na loja.`);
            return;
        }

        if (variacaoOfertas === "Sim") {
            toast.error(`Essa variação não está como oferta na loja.`);
            return;
        }
    }

    async function updateNameVariacao() {
        try {
            const apiClient = setupAPIClient();
            if (nameVariacoes === '') {
                toast.error('Não deixe o nome da variação em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameVariacao?variacao_id=${variacao_id}`, { nameVariacao: nameVariacoes });
                toast.success('Nome da variação atualizada com sucesso.');
                refreshVariacao();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o nome do produto.');
        }
    }

    async function updateSKUVariacao() {
        try {
            const apiClient = setupAPIClient();
            if (skuVariacoes === '') {
                toast.error('Não deixe o código da variação em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateSkuVariacao?variacao_id=${variacao_id}`, { skuVariacao: skuVariacoes });
                toast.success('Código da variação atualizada com sucesso.');
                refreshVariacao();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o código da variação.');
        }
    }

    async function updateEstoqueVariacao() {
        try {
            const apiClient = setupAPIClient();
            if (Number(estoqueVariacoes) < 0) {
                toast.error('Não deixe o estoque da variação negativo... minimo de 0.');
                return;
            } else {
                await apiClient.put(`/updateEstoqueVariacao?variacao_id=${variacao_id}`, { estoqueVariacao: Number(estoqueVariacoes) });
                toast.success('Estoque da variação atualizada com sucesso.');
                refreshVariacao();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o estoque da variação.');
        }
    }

    async function updatePesoVariacao() {
        try {
            const apiClient = setupAPIClient();
            if (pesoKgVariacoes === "") {
                toast.error('Não deixe o peso da variação em branco!!!');
                return;
            } else {
                await apiClient.put(`/updatePesoVariacao?variacao_id=${variacao_id}`, { pesoKg: pesoKgVariacoes });
                toast.success('Peso da variação atualizado com sucesso.');
                refreshVariacao();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o peso da variação.');
        }
    }

    async function updateLarguraVariacao() {
        try {
            const apiClient = setupAPIClient();
            if (larguraCmVariacoes === "") {
                toast.error('Não deixe a largura da variação em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateLarguraVariacao?variacao_id=${variacao_id}`, { larguraCm: larguraCmVariacoes });
                toast.success('Largura da variação atualizado com sucesso.');
                refreshVariacao();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a largura da variação.');
        }
    }

    async function updateProfundidadeVariacao() {
        try {
            const apiClient = setupAPIClient();
            if (profundidadeCmVariacoes === "") {
                toast.error('Não deixe o comprimento da variação em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateProfundidadeVariacao?variacao_id=${variacao_id}`, { profundidadeCm: profundidadeCmVariacoes });
                toast.success('Comprimento da variação atualizado com sucesso.');
                refreshVariacao();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o comprimento da variação.');
        }
    }

    async function updateAlturaVariacao() {
        try {
            const apiClient = setupAPIClient();
            if (alturaCmVariacoes === "") {
                toast.error('Não deixe a altura da variação em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateAlturaVariacao?variacao_id=${variacao_id}`, { alturaCm: alturaCmVariacoes });
                toast.success('Altura da variação atualizado com sucesso.');
                refreshVariacao();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a altura da variação.');
        }
    }

    async function updatePrecoVariacao() {
        try {
            const apiClient = setupAPIClient();
            if (precoVariacoes === "") {
                toast.error('Não deixe o preço da variação em branco!!!');
                return;
            } else {
                await apiClient.put(`/updatePriceVariacao?variacao_id=${variacao_id}`, { preco: Number(precoVariacoes.replace(/[^\d]+/g, '')) });
                toast.success('Preço da variação atualizado com sucesso.');
                refreshVariacao();
            }
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar o preço da variação.');
        }
    }

    async function updatePromocaoVariacao() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updatePromocaoVariacao?variacao_id=${variacao_id}`, { promocao: Number(promocaoVariacoes.replace(/[^\d]+/g, '')) });
            toast.success('Promoção da variação atualizado com sucesso.');
            refreshVariacao();
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a promoção da variação.');
        }
    }

    async function updateDescriptionsVariacao() {
        try {
            const apiClient = setupAPIClient();
            await apiClient.put(`/updateAllDescriptionVariacao?variacao_id=${variacao_id}`, {
                descriptionVariacao1: descriptionVariacoes1,
                descriptionVariacao2: descriptionVariacoes2,
                descriptionVariacao3: descriptionVariacoes3,
                descriptionVariacao4: descriptionVariacoes4,
                descriptionVariacao5: descriptionVariacoes5,
                descriptionVariacao6: descriptionVariacoes6,
            });
            toast.success('Descrição atualizada com sucesso.');
            refreshVariacao();
        } catch (error) {
            console.log(error);
            toast.error('Ops erro ao atualizar a descrição.');
        }
    }

    async function refreshVariacao() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/exactVariacao?variacao_id=${variacao_id}`);
        setNameVariacoes(response?.data?.nameVariacao);
        setPrecoVariacoes(response?.data?.preco);
        setSkuVariacoes(response?.data?.skuVariacao);
        setEstoqueVariacoes(response?.data?.estoqueVariacao);
        setPesoKgVariacoes(response?.data?.pesoKg);
        setLarguraCmVariacoes(response?.data?.larguraCm);
        setProfundidadeCmVariacoes(response?.data?.profundidadeCm);
        setAlturaCmVariacoes(response?.data?.alturaCm);
        setPromocaoVariacoes(response?.data?.promocao);
        setDisponibilidadeVariacoes(response?.data?.disponibilidadeVariacao);
        setFretesGratis(response?.data?.freteGratis);
        setVariacaDestaques(response?.data?.variacaoDestaque);
        setVariacaoOfertas(response?.data?.variacaoOferta);

        setDescriptionVariacoes1(response?.data?.descriptionVariacao1);
        setDescriptionVariacoes2(response?.data?.descriptionVariacao2);
        setDescriptionVariacoes3(response?.data?.descriptionVariacao3);
        setDescriptionVariacoes4(response?.data?.descriptionVariacao4);
        setDescriptionVariacoes5(response?.data?.descriptionVariacao5);
        setDescriptionVariacoes6(response?.data?.descriptionVariacao6);
    }

    function handleCloseModalDelete() {
        setModalVisible(false);
    }

    async function handleDeleteVariacao(variacao_id: string) {
        const apiClient = setupAPIClient();
        const responseDelete = await apiClient.get('/exactVariacao', {
            params: {
                variacao_id: variacao_id,
            }
        });
        setModalItem(responseDelete.data);
        setModalVisible(true);
    }

    Modal.setAppElement('body');


    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h3"
                    titulo={'Variação - ' + nameVariacoes}
                />
                <Button
                    type="submit"
                    style={{ backgroundColor: '#FB451E' }}
                    onClick={() => handleDeleteVariacao(variacao_id)}
                >
                    Remover
                </Button>
            </BlockTop>
            <br />
            <br />
            <GridDate>
                <SectionDate>
                    <BlockDados>
                        <TextoDados
                            chave={"SKU"}
                            dados={
                                <InputUpdate
                                    dado={skuVariacoes}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={skuVariacao}
                                    value={skuVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setSkuVariacoes(e.target.value)}
                                    handleSubmit={updateSKUVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Nome"}
                            dados={
                                <InputUpdate
                                    dado={nameVariacoes}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={nameVariacao}
                                    value={nameVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setNameVariacoes(e.target.value)}
                                    handleSubmit={updateNameVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Estoque"}
                            dados={
                                <InputUpdate
                                    dado={estoqueVariacoes}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={estoqueVariacao}
                                    value={estoqueVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setEstoqueVariacoes(e.target.value)}
                                    handleSubmit={updateEstoqueVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Peso (Kg)"}
                            dados={
                                <InputUpdate
                                    dado={pesoKgVariacoes}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={pesoKg}
                                    value={pesoKgVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setPesoKgVariacoes(e.target.value)}
                                    handleSubmit={updatePesoVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Largura (Cm)"}
                            dados={
                                <InputUpdate
                                    dado={larguraCmVariacoes}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={larguraCm}
                                    value={larguraCmVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setLarguraCmVariacoes(e.target.value)}
                                    handleSubmit={updateLarguraVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Comprimento (Cm)"}
                            dados={
                                <InputUpdate
                                    dado={profundidadeCmVariacoes}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={profundidadeCm}
                                    value={profundidadeCmVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setProfundidadeCmVariacoes(e.target.value)}
                                    handleSubmit={updateProfundidadeVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Destaque? "}
                            dados={
                                <ButtonSelect
                                    /* @ts-ignore */
                                    dado={variacaoDestaques}
                                    handleSubmit={updateDestaqueVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <GridContainer>
                        {allRelationAtributos.map((atri) => {
                            return (
                                <BoxCategory key={atri.id} >
                                    <NameCategory>{atri.atributo.tipo + ": " + atri.atributo.valor}</NameCategory>
                                </BoxCategory>
                            )
                        })}
                    </GridContainer>

                    <ButtonUpdateCategory
                        href={`/produto/atributo/${variacao_id}/${productId}`}
                    >
                        Cadastrar atributos ou atualizar
                    </ButtonUpdateCategory>

                </SectionDate>

                <SectionDate>
                    <BlockDados>
                        <TextoDados
                            chave={"Altura (Cm)"}
                            dados={
                                <InputUpdate
                                    dado={alturaCmVariacoes}
                                    type="number"
                                    /* @ts-ignore */
                                    placeholder={alturaCm}
                                    value={alturaCmVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setAlturaCmVariacoes(e.target.value)}
                                    handleSubmit={updateAlturaVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Disponibilidade"}
                            dados={
                                <ButtonSelect
                                    /* @ts-ignore */
                                    dado={disponibilidadeVariacoes}
                                    handleSubmit={updateStatus}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Frete grátis?"}
                            dados={
                                <ButtonSelect
                                    /* @ts-ignore */
                                    dado={fretesGratis}
                                    handleSubmit={updateFrete}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Preço"}
                            dados={
                                <InputUpdate
                                    maxLength={10}/* @ts-ignore */
                                    dado={precoVariacoes.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={precoVariacoes.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    value={precoVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setPrecoVariacoes(e.target.value)}
                                    handleSubmit={updatePrecoVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave="Promoção"
                            dados={
                                <InputUpdate
                                    maxLength={10}/* @ts-ignore */
                                    dado={promocaoVariacoes.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={promocaoVariacoes.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    value={promocaoVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setPromocaoVariacoes(e.target.value)}
                                    handleSubmit={updatePromocaoVariacao}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Oferta? "}
                            dados={
                                <ButtonSelect
                                    /* @ts-ignore */
                                    dado={variacaoOfertas}
                                    handleSubmit={updateOfertaVariacao}
                                />
                            }
                        />
                    </BlockDados>
                </SectionDate>

                <SectionDate>
                    <PhotosVariacoes
                        variacao_id={photoVariacaoID}
                        product_id={productId}
                    />
                </SectionDate>
            </GridDate>
            <br />
            <br />
            <DescriptionsProductUpdate
                valor1={descriptionVariacoes1}
                valor2={descriptionVariacoes2}
                valor3={descriptionVariacoes3}
                valor4={descriptionVariacoes4}
                valor5={descriptionVariacoes5}
                valor6={descriptionVariacoes6}

                /* @ts-ignore */
                onChange1={(e) => setDescriptionVariacoes1(e.target.value)}
                /* @ts-ignore */
                onChange2={(e) => setDescriptionVariacoes2(e.target.value)}
                /* @ts-ignore */
                onChange3={(e) => setDescriptionVariacoes3(e.target.value)}
                /* @ts-ignore */
                onChange4={(e) => setDescriptionVariacoes4(e.target.value)}
                /* @ts-ignore */
                onChange5={(e) => setDescriptionVariacoes5(e.target.value)}
                /* @ts-ignore */
                onChange6={(e) => setDescriptionVariacoes6(e.target.value)}

                handleSubmit1={updateDescriptionsVariacao}
                handleSubmit2={updateDescriptionsVariacao}
                handleSubmit3={updateDescriptionsVariacao}
                handleSubmit4={updateDescriptionsVariacao}
                handleSubmit5={updateDescriptionsVariacao}
                handleSubmit6={updateDescriptionsVariacao}

                placeholder1={descriptionVariacao1}
                placeholder2={descriptionVariacao2}
                placeholder3={descriptionVariacao3}
                placeholder4={descriptionVariacao4}
                placeholder5={descriptionVariacao5}
                placeholder6={descriptionVariacao6}
            />

            {modalVisible && (
                <ModalDeleteVariacao
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModalDelete}
                    /* @ts-ignore */
                    variacao={modalItem}
                />
            )}
        </>
    )
}

export default VariacaoDetalhes;