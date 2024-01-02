import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import moment from "moment";
import { BlockTop } from "../../../pages/Categorias/styles";
import Titulos from "../../Titulos";

interface Payments {
    typesPayments: any;
}

const PaymentsTypes = ({ typesPayments }: Payments) => {

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const typesPaymentMonth = typesPayments.filter((item: any) => {
        const itemDateDay = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= firstDayOfMonth && itemDateDay <= lastDayOfMonth;
    });

    const agrupadosPaymentTypes = typesPaymentMonth.reduce((acc: any, item: any) => {
        const dia = moment(item.created_at).format('DD/MM/YYYY');
        acc[dia] = acc[dia] || [];
        acc[dia].push(item);
        return acc;
    }, {});

    const somatoriosPorDiaTypesPayment = Object.keys(agrupadosPaymentTypes).map(dia => {
        const boleto = agrupadosPaymentTypes[dia].reduce((total: any, item: any) => total + item.qtd_type_boleto, 0);
        const cartao = agrupadosPaymentTypes[dia].reduce((total: any, item: any) => total + item.qtd_type_cartao, 0);
        const pix = agrupadosPaymentTypes[dia].reduce((total: any, item: any) => total + item.qtd_type_pix, 0);
        return { dia, boleto, cartao, pix };
    });

    const meios_pagamentos: any = [];
    (somatoriosPorDiaTypesPayment || []).forEach((item) => {
        meios_pagamentos.push({
            "boleto": item.boleto,
            "cartao": item.cartao,
            "pix": item.pix
        });
    });

    const propriedadeParaSomarBoleto = 'boleto';
    const propriedadeParaSomarCartao = 'cartao';
    const propriedadeParaSomarPix = 'pix';

    const soma_boleto = meios_pagamentos
        .map((objeto: { [x: string]: any; }) => objeto[propriedadeParaSomarBoleto])
        .reduce((acumulador: any, boleto: any) => acumulador + boleto, 0)

    const soma_cartao = meios_pagamentos
        .map((objeto: { [x: string]: any; }) => objeto[propriedadeParaSomarCartao])
        .reduce((acumulador: any, cartao: any) => acumulador + cartao, 0)

    const soma_pix = meios_pagamentos
        .map((objeto: { [x: string]: any; }) => objeto[propriedadeParaSomarPix])
        .reduce((acumulador: any, pix: any) => acumulador + pix, 0)

    const meios_pagamentos_total = [
        { name: "Boleto", quantidade: soma_boleto },
        { name: "Cartao", quantidade: soma_cartao },
        { name: "Pix", quantidade: soma_pix }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };



    return (
        <>
            <BlockTop>
                <Titulos
                    tipo="h2"
                    titulo="Formas de pagamento do mês"
                />
            </BlockTop>

            <ResponsiveContainer width="100%" aspect={4}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={meios_pagamentos_total}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="quantidade"
                    >
                        {meios_pagamentos.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default PaymentsTypes