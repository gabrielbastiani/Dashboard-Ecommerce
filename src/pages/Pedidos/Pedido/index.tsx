import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { setupAPIClient } from "../../../services/api";
import { toast } from "react-toastify";
import { Grid } from "../../Dashboard/styles";
import MainHeader from "../../../components/MainHeader";
import Aside from "../../../components/Aside";
import { Card, Container } from "../../../components/Content/styles";
import VoltarNavagation from "../../../components/VoltarNavagation";
import Titulos from "../../../components/Titulos";
import { Button } from "../../../components/ui/Button";
import { TextoDados } from "../../../components/TextoDados";
import { InputUpdate } from "../../../components/ui/InputUpdate";
import Modal from 'react-modal';
import { IMaskInput } from "react-imask";
import { BlockTop, ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../../Categorias/styles";
import { BlockDados } from "../../Categorias/Categoria/styles";
import { InuptCheck } from "../../../components/ui/InuptCheck";
import { GridDate } from "../../Perfil/styles";
import { SectionDate } from "../../Configuracoes/styles";
import { ModalDeleteCustomer } from "../../../components/popups/ModalDeleteCustomer";
import SelectUpdate from "../../../components/ui/SelectUpdate";
import TabelaSimples from "../../../components/Tabelas";
import { Avisos } from "../../../components/Avisos";
import Select from "../../../components/ui/Select";
import moment from "moment";



const Pedido: React.FC = () => {

    let { order_id } = useParams();

    const [order, setOrder] = useState<any[]>([]);


    useEffect(() => {
        async function loadorderdata() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/exactOrder?order_id=${order_id}`);

                setOrder(data || []);

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadorderdata();
    }, [order_id]);

    /* const dados: any = [];
    (order || []).forEach((item) => {
        dados.push({
            "Pedido": item.id_order_store,
            "Valor Total": new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.cart.map((car: { total: any; }) => car.total).reduce((acumulador: any, valorAtual: any) => acumulador + valorAtual, 0)),
            "Data": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Situação": item.shipmentsTrackings[0].delivery_history,
            "botaoDetalhes": `/cliente/pedido/${item.id}`
        });
    }); */



    return (
        <>
            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <Titulos
                            tipo="h1"
                            titulo={`Pedido - `}
                        />

                        <VoltarNavagation />




                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export default Pedido;