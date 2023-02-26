import React, { useEffect, useState } from "react";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import Voltar from "../../../components/Voltar";
import { AddButton, BlockTop, SpanText } from "../../Categorias/styles";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { MdOutlineAssessment } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";


const Produto: React.FC = () => {

    let { nameProduct, product_id } = useParams();

    const navigate = useNavigate();

    const [nameProducts, setNameProducts] = useState(nameProduct);
    const [dataName, setDataName] = useState('');

    const [descriptionProducts1, setDescriptionProducts1] = useState('');
    const [dataDescriptionProducts1, setDataDescriptionProducts1] = useState('');

    const [descriptionProducts2, setDescriptionProducts2] = useState('');
    const [dataDescriptionProducts2, setDataDescriptionProducts2] = useState('');

    const [descriptionProducts3, setDescriptionProducts3] = useState('');
    const [dataDescriptionProducts3, setDataDescriptionProducts3] = useState('');

    const [descriptionProducts4, setDescriptionProducts4] = useState('');
    const [dataDescriptionProducts4, setDataDescriptionProducts4] = useState('');

    const [descriptionProducts5, setDescriptionProducts5] = useState('');
    const [dataDescriptionProducts5, setDataDescriptionProducts5] = useState('');

    const [descriptionProducts6, setDescriptionProducts6] = useState('');
    const [dataDescriptionProducts6, setDataDescriptionProducts6] = useState('');

    const [precos, setPrecos] = useState('');
    const [dataPrecos, setDataPrecos] = useState('');

    const [skus, setSkus] = useState('');
    const [dataSkus, setDataSkus] = useState('');

    const [estoques, setEstoques] = useState('');
    const [dataEstoques, setDataEstoques] = useState('');

    const [pesoKGs, setPesoKGs] = useState('');
    const [dataPesoKGs, setDataPesoKGs] = useState('');

    const [larguraCMs, setLarguraCMs] = useState('');
    const [dataLarguraCMs, setDataLarguraCMs] = useState('');

    const [alturaCMs, setAlturaCMs] = useState('');
    const [dataAlturaCMs, setDataAlturaCMs] = useState('');

    const [profundidadeCMs, setProfundidadeCMs] = useState('');
    const [dataProfundidadeCMs, setDataProfundidadeCMs] = useState('');

    const [promocoes, setPromocoes] = useState('');
    const [dataPromocoes, setDataPromocoes] = useState('');

    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState();

    const [disponibilidades, setDisponibilidades] = useState('');


    useEffect(() => {
        async function loadCategorys() {
            const apiClient = setupAPIClient();
            try {
                const response = await apiClient.get('/allCategorys');
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadCategorys();
    }, [])

    useEffect(() => {
        async function loadProduct() {
            const apiClient = setupAPIClient();
            try {
                const responseProduct = await apiClient.get(`/exactProduct?product_id=${product_id}`)
                const {
                    nameProduct,
                    descriptionProduct1,
                    descriptionProduct2,
                    descriptionProduct3,
                    descriptionProduct4,
                    descriptionProduct5,
                    descriptionProduct6,
                    preco,
                    sku,
                    estoque,
                    pesoKG,
                    larguraCM,
                    profundidadeCM,
                    alturaCM,
                    promocao,
                    disponibilidade,
                    category_id
                } = responseProduct.data
                /* @ts-ignore */
                let categoryFilter = categories.filter(result => result.id.match(category_id));

                setNameProducts(nameProduct);
                setDescriptionProducts1(descriptionProduct1);
                setDescriptionProducts2(descriptionProduct2);
                setDescriptionProducts3(descriptionProduct3);
                setDescriptionProducts4(descriptionProduct4);
                setDescriptionProducts5(descriptionProduct5);
                setDescriptionProducts6(descriptionProduct6);
                setPrecos(preco);
                setSkus(sku);
                setEstoques(estoque);
                setPesoKGs(pesoKG);
                setLarguraCMs(larguraCM);
                setProfundidadeCMs(profundidadeCM);
                setAlturaCMs(alturaCM);
                setPromocoes(promocao);
                setDisponibilidades(disponibilidade);
                setCategories(categoryFilter);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadProduct();
    }, [categories, product_id])

    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Card>

                    <Voltar url={'/produtos'} />

                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Produto"
                        />
                        <Button
                            type="submit"
                            style={{ backgroundColor: 'green' }}
                        /* onClick={''} */
                        >
                            Salvar
                        </Button>
                    </BlockTop>

                    <AddButton
                        style={{ backgroundColor: '#f6ba24' }}
                    >
                        <MdOutlineAssessment />
                        <Link to="/produto/avaliacao" >
                            <SpanText>Ver avaliações</SpanText>
                        </Link>
                    </AddButton>

                </Card>
            </Container>
        </Grid>
    )
}

export default Produto;