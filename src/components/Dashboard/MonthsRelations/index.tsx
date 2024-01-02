import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment";
import { BlockTop } from "../../../pages/Categorias/styles";
import Titulos from "../../Titulos";
import { BoxFilterData, InputData } from "./styles";

interface Months {
    totalPaymentsStatus: any;
}

const MonthsRelations = ({ totalPaymentsStatus }: Months) => {

    const [startDate_months, setStartDate_months] = useState('');
    const [end_date_months, setEnd_date_months] = useState('');
    const [primeiroDia, setPrimeiroDia] = useState(Date);
    const [ultimoDia, setUltimoDia] = useState(Date);

    const star_data = startDate_months === "" ? primeiroDia : startDate_months;
    const end_data = end_date_months === "" ? ultimoDia : end_date_months;

    useEffect(() => {
        const dataAtual = new Date();
        const primeiroDiaMesPassado = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 1, 1);
        const ultimoDiaMesPassado = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0);
        setPrimeiroDia(primeiroDiaMesPassado.toISOString().split('T')[0]);
        setUltimoDia(ultimoDiaMesPassado.toISOString().split('T')[0]);
    }, []);

    const dadosDoMesPassado = totalPaymentsStatus.filter((item: any) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= new Date(star_data) && itemDateDay <= new Date(end_data);
    });

    const dadosAgrupadosPassado = dadosDoMesPassado.reduce((acc: any, item: any) => {
        const dia = moment(item.created_at).format('DD/MM/YYYY');
        acc[dia] = acc[dia] || [];
        acc[dia].push(item);
        return acc;
    }, {});

    const somatoriosPorDiaPassado = Object.keys(dadosAgrupadosPassado).map(dia => {
        const faturamento = dadosAgrupadosPassado[dia].reduce((total: any, item: { order: any; valor: any; }) => total + item.order.payment.total_payment, 0);
        return { dia, faturamento };
    });

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const dadosDoMes = totalPaymentsStatus.filter((item: any) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= firstDayOfMonth && itemDateDay <= lastDayOfMonth;
    });

    const dadosAgrupados = dadosDoMes.reduce((acc: any, item: any) => {
        const dia = moment(item.created_at).format('DD/MM/YYYY');
        acc[dia] = acc[dia] || [];
        acc[dia].push(item);
        return acc;
    }, {});

    const somatoriosPorDia = Object.keys(dadosAgrupados).map(dia => {
        const faturamento = dadosAgrupados[dia].reduce((total: any, item: { order: any; valor: any; }) => total + item.order.payment.total_payment, 0);
        return { dia, faturamento };
    });

    const past_and_last = somatoriosPorDiaPassado.concat(somatoriosPorDia);

    const dados_do_mes_passado: any = [];
    (past_and_last || []).forEach((item) => {
        dados_do_mes_passado.push({
            "dia": item.dia.substring(0, 2),
            "faturamento": item.faturamento
        });
    });

    const dadosAgrupadosPassadoFilter = dados_do_mes_passado.reduce((acc: any, item: any) => {
        const dia = item.dia.substring(0, 2);
        acc[dia] = acc[dia] || [];
        acc[dia].push(item);
        return acc;
    }, {});

    const somatoriosPorDiaPassadoFilter = Object.keys(dadosAgrupadosPassadoFilter).map(dia => {
        const faturamento = dadosAgrupadosPassadoFilter[dia]
        return { dia, faturamento };
    });

    const dados_do_mes_comparativos: any = [];
    (somatoriosPorDiaPassadoFilter || []).forEach((item) => {
        dados_do_mes_comparativos.push({
            "dia": `Dia ${item.dia}`,
            "Faturamento anterior": item.faturamento[1]?.faturamento ? item.faturamento[0]?.faturamento : 0,
            "Faturamento atual": item.faturamento[1]?.faturamento ? item.faturamento[1]?.faturamento : item.faturamento[0]?.faturamento
        });
    });



    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h2"
                    titulo="Comparativos entre meses"
                />

                <BoxFilterData>
                    <InputData
                        type="date"
                        value={startDate_months}
                        onChange={(e) => setStartDate_months(e.target.value)}
                    />
                    <InputData
                        type="date"
                        value={end_date_months}
                        onChange={(e) => setEnd_date_months(e.target.value)}
                    />
                </BoxFilterData>
            </BlockTop>
            <br />
            <br />
            <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart
                    width={500}
                    height={200}
                    data={dados_do_mes_comparativos}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeDasharray="10 10" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Faturamento anterior" stackId="1" stroke='#82caed' fill="#5faf40" />
                    <Area type="monotone" dataKey="Faturamento atual" stackId="1" stroke='#82caed' fill="#d08d29" />
                    <Legend />
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}

export default MonthsRelations