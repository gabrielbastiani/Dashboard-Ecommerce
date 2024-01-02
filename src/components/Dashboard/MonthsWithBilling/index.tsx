import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment";
import Titulos from "../../Titulos";

interface Months {
    totalPaymentsStatus: any;
}

const MonthsWithBilling = ({ totalPaymentsStatus }: Months) => {

    const dados_dos_mes = totalPaymentsStatus.filter((item: any) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay;
    });

    const mes_agrupados = dados_dos_mes.reduce((acc: any, item: any) => {
        const mes = moment(item.created_at).format('YYYY-MM-DD');
        acc[mes] = acc[mes] || [];
        acc[mes].push(item);
        return acc;
    }, {});

    const somatorio_mes = Object.keys(mes_agrupados).map(mes => {
        const faturamento = mes_agrupados[mes].reduce((total: any, item: { order: any; valor: any; }) => total + item.order.payment.total_payment, 0);
        return { mes, faturamento };
    });

    const meses_dados: any = [];
    (somatorio_mes || []).forEach((item) => {
        meses_dados.push(
            { valor: item.faturamento, data: item.mes }
        );
    });

    function agruparPorMes(meses_dados: any[]) {
        const dadosAgrupados: any = {};

        meses_dados.forEach(obj => {
            const [ano, mes] = obj.data.split('-');

            const chave = `${ano}-${mes}`;

            if (!dadosAgrupados[chave]) {
                dadosAgrupados[chave] = [];
            }
            dadosAgrupados[chave].push(obj);
        });
        /* @ts-ignore */
        const resultadoFinal = [].concat(...Object.values(dadosAgrupados));

        return resultadoFinal;
    }

    const agrupados = agruparPorMes(meses_dados);

    function somarAgruparPorMes(agrupados: any[]) {
        const dadosAgrupados: any = {};

        agrupados.forEach(obj => {
            const [ano, mes] = obj.data.split('-');
            const chave = `${ano}-${mes}`;

            if (!dadosAgrupados[chave]) {
                dadosAgrupados[chave] = {
                    mes: mes,
                    ano: ano,
                    faturamento_total: 0,
                    agrupados: [],
                };
            }
            dadosAgrupados[chave].faturamento_total += obj.valor;
            dadosAgrupados[chave].agrupados.push(obj);
        });
        return Object.values(dadosAgrupados);
    }

    const agrupados_mes = somarAgruparPorMes(agrupados);



    return (
        <>
            <Titulos
                tipo="h2"
                titulo="Faturamentos totais por cada mês"
            />
            <br />
            <br />
            <ResponsiveContainer width="100%" aspect={4}>
                <BarChart
                    width={500}
                    height={500}
                    data={agrupados_mes}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="mes" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="faturamento_total" fill="#d08d29" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default MonthsWithBilling