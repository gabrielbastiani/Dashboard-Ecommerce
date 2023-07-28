import { useContext, useEffect, useState } from "react";
import { Block, BlockTop, Etiqueta } from "../../pages/Categorias/styles";
import { InputPost } from "../ui/InputPost";
import { Button } from "../ui/Button";
import Titulos from "../Titulos";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { BlockDados } from "../../pages/Categorias/Categoria/styles";
import Select from "../ui/Select";


interface VariacaoRequest {
    product_id: any;
}

const NovaVariacao = ({ product_id }: VariacaoRequest) => {

    const navigate = useNavigate();
    const { admin } = useContext(AuthContext);

    const [store_id] = useState(admin.store_id);
    const [product_ids] = useState(product_id);

    const [variationName, setVariationName] = useState("");
    const [variationProduct, setVariationProduct] = useState<any[]>([]);
    const [variationProductSelected, setVariationProductSelected] = useState("");
    const [order, setOrder] = useState(Number);

    function handleChangeProducts(e: any) {
        setVariationProductSelected(e.target.value)
    }

    useEffect(() => {
        async function loadVariations() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allProductsStore`);
                setVariationProduct(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadVariations();
    }, []);

    async function handleRegisterVariation() {
        try {
            if (variationName === "") {
                toast.error('Preencha todos os campos')
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createVariation', {
                product_id: product_ids,
                variationName: variationName,
                variationProduct: variationProductSelected,
                order: order,
                store_id: store_id
            })

            toast.success('Variação cadastrada com sucesso');

            setTimeout(() => {
                navigate(0);
            }, 3000);

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
            toast.error('Ops erro ao cadastrar a variação!')
        }
    }


    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h2"
                    titulo="Nova Variação"
                />
                <Button
                    type="submit"
                    style={{ backgroundColor: 'green' }}
                    onClick={handleRegisterVariation}
                >
                    Salvar
                </Button>
            </BlockTop>

            <Block>
                <Etiqueta>Nome da variação:</Etiqueta>
                <InputPost
                    type="text"
                    placeholder="Digite aqui..."
                    value={variationName}
                    onChange={(e) => setVariationName(e.target.value)}
                />
            </Block>
            <br />
            <BlockDados>
                <Etiqueta>Qual produto usar para esse nome de variação?:</Etiqueta>
                <Select
                    value={variationProductSelected}
                    /* @ts-ignore */
                    onChange={handleChangeProducts}
                    opcoes={
                        [
                            { label: "Selecionar...", value: "" },/* @ts-ignore */
                            ...(variationProduct || []).map((item) => ({ label: item.name, value: item.name }))
                        ]
                    }
                />
            </BlockDados>
            <br />
            <Block>
                <Etiqueta>Ordem:</Etiqueta>
                <InputPost
                    type="number"
                    placeholder="0"
                    value={order}/* @ts-ignore */
                    onChange={(e) => setOrder(e.target.value)}
                />
            </Block>
        </>
    )
}

export default NovaVariacao;