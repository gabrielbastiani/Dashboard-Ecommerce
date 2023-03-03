import { useState } from "react";
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


interface ItemsVariacao {
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
    disponibilidadeVariacao: string;
    promocao: string;
    freteGratis: string;

    setDescriptionVariacao1: () => void;
    setDescriptionVariacao2: () => void;
    setDescriptionVariacao3: () => void;
    setDescriptionVariacao4: () => void;
    setDescriptionVariacao5: () => void;
    setDescriptionVariacao6: () => void;
}

const VariacaoDetalhes = ({
    variacao_id,
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
    disponibilidadeVariacao,
    promocao,
    freteGratis,
    setDescriptionVariacao1,
    setDescriptionVariacao2,
    setDescriptionVariacao3,
    setDescriptionVariacao4,
    setDescriptionVariacao5,
    setDescriptionVariacao6
}: ItemsVariacao) => {

    const [nameVariacoes, setNameVariacoes] = useState(nameVariacao);
    const [dataNameVariacao, setDataNameVariacao] = useState('');
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

    const [descriptionVariacoes1, setDescriptionVariacoes1] = useState('');
    const [descriptionVariacoes2, setDescriptionVariacoes2] = useState('');
    const [descriptionVariacoes3, setDescriptionVariacoes3] = useState('');
    const [descriptionVariacoes4, setDescriptionVariacoes4] = useState('');
    const [descriptionVariacoes5, setDescriptionVariacoes5] = useState('');
    const [descriptionVariacoes6, setDescriptionVariacoes6] = useState('');



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
            await apiClient.put(`/updateEntregaVariacao?variacao_id=${variacao_id}`);

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

    async function updateNameVariacao() {
        try {
            const apiClient = setupAPIClient();
            if (nameVariacoes === '') {
                toast.error('Não deixe o nome da variação em branco!!!');
                return;
            } else {
                await apiClient.put(`/updateNameVariacao?variacao_id=${variacao_id}`, { nameVariacao: nameVariacoes || dataNameVariacao });
                toast.success('Nome da categoria atualizada com sucesso.');
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
                await apiClient.put(`/updateAltura?variacao_id=${variacao_id}`, { alturaCm: alturaCmVariacoes });
                toast.success('Altura do produto atualizado com sucesso.');
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
        setNameVariacoes(response?.data?.nameProduct);
        setDataNameVariacao(response?.data?.nameProduct);
        setDisponibilidadeVariacoes(response?.data?.disponibilidade);
    }

    function formatPrecoUpdate() {
        var elementoUpdate = document.getElementById('valorupdate');
        /* @ts-ignore */
        var valorupdate = elementoUpdate.value;

        valorupdate = valorupdate + '';
        valorupdate = parseInt(valorupdate.replace(/[\D]+/g, ''));
        valorupdate = valorupdate + '';
        valorupdate = valorupdate.replace(/([0-9]{2})$/g, ",$1");

        if (valorupdate.length > 6) {
            valorupdate = valorupdate.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        /* @ts-ignore */
        elementoUpdate.value = valorupdate;
        /* @ts-ignore */
        // eslint-disable-next-line eqeqeq
        if (valorupdate == 'NaN') elementoUpdate.value = '';
    }

    function formatPromocaoUpdate() {
        var elementopromocaoupdate = document.getElementById('valorpromocaoupdate');
        /* @ts-ignore */
        var valorpromocaoupdate = elementopromocaoupdate.value;

        valorpromocaoupdate = valorpromocaoupdate + '';
        valorpromocaoupdate = parseInt(valorpromocaoupdate.replace(/[\D]+/g, ''));
        valorpromocaoupdate = valorpromocaoupdate + '';
        valorpromocaoupdate = valorpromocaoupdate.replace(/([0-9]{2})$/g, ",$1");

        if (valorpromocaoupdate.length > 6) {
            valorpromocaoupdate = valorpromocaoupdate.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        /* @ts-ignore */
        elementopromocaoupdate.value = valorpromocaoupdate;
        /* @ts-ignore */
        // eslint-disable-next-line eqeqeq
        if (valorpromocaoupdate == 'NaN') elementopromocaoupdate.value = '';
    }

    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h3"
                    titulo={'Variação - ' + nameVariacao}
                />
                <Button
                    type="submit"
                    style={{ backgroundColor: '#FB451E' }}
                /* onClick={''} */
                >
                    Remover
                </Button>
            </BlockTop>

            <GridDate>
                <SectionDate>
                    <BlockDados>
                        <TextoDados
                            chave={"SKU"}
                            dados={
                                <InputUpdate
                                    dado={skuVariacao}
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
                                    dado={dataNameVariacao}
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
                                    dado={estoqueVariacao}
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
                                    dado={pesoKg}
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
                                    dado={larguraCm}
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
                                    dado={profundidadeCm}
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
                </SectionDate>

                <SectionDate>
                    <BlockDados>
                        <TextoDados
                            chave={"Altura (Cm)"}
                            dados={
                                <InputUpdate
                                    dado={alturaCm}
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
                                    dado={disponibilidadeVariacao}
                                    handleSubmit={updateStatus}
                                />
                            }
                        />
                    </BlockDados>

                    <BlockDados>
                        <TextoDados
                            chave={"Frete Grátis?"}
                            dados={
                                <ButtonSelect
                                    /* @ts-ignore */
                                    dado={freteGratis}
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
                                    id="valorupdate"
                                    /* @ts-ignore */
                                    onKeyUp={formatPrecoUpdate}
                                    maxLength={10}
                                    dado={preco}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={preco}
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
                            chave={"Valor em Promoção"}
                            dados={
                                <InputUpdate
                                    id="valorpromocaoupdate"
                                    /* @ts-ignore */
                                    onKeyUp={formatPromocaoUpdate}
                                    maxLength={10}
                                    dado={promocao}
                                    type="text"
                                    /* @ts-ignore */
                                    placeholder={promocao}
                                    value={promocaoVariacoes}
                                    /* @ts-ignore */
                                    onChange={(e) => setPromocaoVariacoes(e.target.value)}
                                    handleSubmit={updatePromocaoVariacao}
                                />
                            }
                        />
                    </BlockDados>
                </SectionDate>

                <SectionDate>
                    <PhotosVariacoes
                        variacao_id={photoVariacaoID}
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
                placeholder1={""}
                placeholder2={""}
                placeholder3={""}
                placeholder4={""}
                placeholder5={""}
                placeholder6={""}
            />
        </>
    )
}

export default VariacaoDetalhes;