import { useContext, useEffect, useState } from "react";
import { Block, BlockTop, Etiqueta } from "../../pages/Categorias/styles";
import { InputPost } from "../ui/InputPost";
import { Button } from "../ui/Button";
import Titulos from "../Titulos";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Select from "../ui/Select";


interface VariacaoRequest {
    product_id: any;
}

const NovaVariacao = ({ product_id }: VariacaoRequest) => {

    const navigate = useNavigate();
    const { admin } = useContext(AuthContext);

    const [products, setProducts] = useState<any[]>([]);
    const [productsSelected, setProductsSelected] = useState("");

    const [store_id] = useState(admin.store_id);
    const [product_ids] = useState(product_id);

    const [order, setOrder] = useState(Number);


    function handleChangeProduct(e: any) {
        setProductsSelected(e.target.value);
    }

    useEffect(() => {
        async function loadVariations() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get(`/allProductsStore`);
                setProducts(response.data || []);
            } catch (error) {
                console.log(error);
            }
        }
        loadVariations();
    }, []);

    async function handleRegisterVariation() {
        try {
            if (productsSelected === undefined || productsSelected === null || productsSelected === "") {
                toast.error('Preencha todos os campos')
                return
            }

            const apiClient = setupAPIClient();
            await apiClient.post('/createVariation', {
                name: productsSelected,
                product_id: product_ids,
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
                <Etiqueta>Escolha um produto para variação:</Etiqueta>
                <Select
                    value={productsSelected}
                    /* @ts-ignore */
                    onChange={handleChangeProduct}
                    opcoes={
                        [
                            { label: "Selecionar...", value: "" },/* @ts-ignore */
                            ...(products || []).map((item) => ({ label: item.name, value: item.name }))
                        ]
                    }
                />
            </Block>
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