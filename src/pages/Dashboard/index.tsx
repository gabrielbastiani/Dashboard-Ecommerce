import React, { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { setupAPIClient } from "../../services/api";
import { BoxFilterData, ButtonFilterData, Content, Grid, InputData } from "./styles";
import MainHeader from "../../components/MainHeader";
import { DivisorHorizontal } from "../../components/ui/DivisorHorizontal";
import Aside from "../../components/Aside";
import Warnings from "../../components/Warnings";
import { BlockTop, Container } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import WalletBoxTax from "../../components/WalletBoxTax";
import WalletBox from "../../components/WalletBox";
import moment from 'moment';
import dolarImg from '../../assets/dolar.svg';
import WalletBoxDate from "../../components/WalletBoxDate";
import cart from '../../assets/cart.svg';
import orders from '../../assets/orders.svg';
import productsImg from '../../assets/products.svg';
import usersVisited from '../../assets/user.svg';
import taxConvert from '../../assets/tax.svg';
import fretes from "../../assets/frete.svg";
import stock from "../../assets/stock.svg";
import boleto from '../../assets/boleto.png';
import cartao from '../../assets/credit-card.png';
import pix from '../../assets/pix.png';


const Dashboard: React.FC = () => {

    const [totalPaymentsStatus, setTotalPaymentsStatus] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [visited, setVisited] = useState<any[]>([]);
    const [customersDate, setCustomersDate] = useState<any[]>([]);
    const [typesPayments, setTypesPayments] = useState<any[]>([]);


    useEffect(() => {
        async function loadDates() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/totalStorePayments`);

                setProducts(data?.product);
                setTotalPaymentsStatus(data?.statusOrder);
                setVisited(data?.visitedUser);
                setCustomersDate(data?.customer);
                setTypesPayments(data?.typespayment);

            } catch (error) {
                console.error(error);
            }
        }
        loadDates();
    }, []);


    // VALORES DIA


    const dayAtual = moment(new Date()).format('DD/MM/YYYY');
    const startDateObjDay = new Date(moment().format('YYYY-MM-DD'));
    const endDateObjDay = new Date(moment().format('YYYY-MM-DD'));

    const filteredDataDay = totalPaymentsStatus.filter((item) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= startDateObjDay && itemDateDay <= endDateObjDay;
    });

    const filteredDataDayConfirmed = totalPaymentsStatus.filter((item) => {
        const itemDateDayConfirmed = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDayConfirmed >= startDateObjDay && itemDateDayConfirmed <= endDateObjDay;
    });

    const customersDay = customersDate.filter((item) => {
        const itemDateDayConfirmed = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDayConfirmed >= startDateObjDay && itemDateDayConfirmed <= endDateObjDay;
    });

    const visitedStore = visited.filter((item) => {
        const visitedItem = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return visitedItem >= startDateObjDay && visitedItem <= endDateObjDay;
    });

    const paymentsDayTotal = filteredDataDayConfirmed.map(item => item.order.payment.total_payment);

    const paymentsDay = filteredDataDay.map(item => item.order.payment.total_payment);

    const fretesDay = filteredDataDay.map(item => item.order.frete_cupom === 0 ? item.order.frete : item.order.frete_cupom);

    const totalfaturamentoDayTotal: number = paymentsDayTotal.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    const totalfaturamentoDayConfirmed: number = paymentsDay.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    const totalfreteDayTotal: number = fretesDay.reduce((acumulador, objeto) => {
        return acumulador + objeto
    }, 0);

    const visitedUser: number = visitedStore.reduce((acumulador, objeto) => {
        return acumulador + objeto.visited
    }, 0);

    const ticketDay = totalfaturamentoDayConfirmed / filteredDataDay.length;

    const convert_users: number = (filteredDataDay.length / visitedUser) * 100;


    // DADOS DO MES ATUAL


    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const dadosDoMes = totalPaymentsStatus.filter((item) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= firstDayOfMonth && itemDateDay <= lastDayOfMonth;
    });

    const dadosAgrupados = dadosDoMes.reduce((acc, item) => {
        const dia = moment(item.created_at).format('DD/MM/YYYY');
        acc[dia] = acc[dia] || [];
        acc[dia].push(item);
        return acc;
    }, {});

    const somatoriosPorDia = Object.keys(dadosAgrupados).map(dia => {
        const faturamento = dadosAgrupados[dia].reduce((total: any, item: { order: any; valor: any; }) => total + item.order.payment.total_payment, 0);
        return { dia, faturamento };
    });

    const dados_do_mes: any = [];
    (somatoriosPorDia || []).forEach((item) => {
        dados_do_mes.push({
            "Dia_do_mes": item.dia,
            "Faturamento": item.faturamento
        });
    });

    const total_mes: number = dados_do_mes.reduce(function (acumulador: any, objetoAtual: { Faturamento: any; }) {
        return acumulador + objetoAtual.Faturamento;
    }, 0);

    const visitedStoreMonth = visited.filter((item) => {
        const itemDateDay = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= firstDayOfMonth && itemDateDay <= lastDayOfMonth;
    });

    const visitedUserMonth: number = visitedStoreMonth.reduce((acumulador, objeto) => {
        return acumulador + objeto.visited
    }, 0);

    const ticketMonth = total_mes / dadosDoMes.length;

    const convert_users_month: number = (dadosDoMes.length / visitedUserMonth) * 100;

    // --------------------------------------------------------------
    // Formas de pagamentos do mês

    const typesPaymentMonth = typesPayments.filter((item) => {
        const itemDateDay = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= firstDayOfMonth && itemDateDay <= lastDayOfMonth;
    });

    const agrupadosPaymentTypes = typesPaymentMonth.reduce((acc, item) => {
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


    // COMPARATIVOS ENTRE MESES
    // Filtro

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

    const dadosDoMesPassado = totalPaymentsStatus.filter((item) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= new Date(star_data) && itemDateDay <= new Date(end_data);
    });

    const dadosAgrupadosPassado = dadosDoMesPassado.reduce((acc, item) => {
        const dia = moment(item.created_at).format('DD/MM/YYYY');
        acc[dia] = acc[dia] || [];
        acc[dia].push(item);
        return acc;
    }, {});

    const somatoriosPorDiaPassado = Object.keys(dadosAgrupadosPassado).map(dia => {
        const faturamento = dadosAgrupadosPassado[dia].reduce((total: any, item: { order: any; valor: any; }) => total + item.order.payment.total_payment, 0);
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


    // Faturamentos de cada mês


    const dados_dos_mes = totalPaymentsStatus.filter((item) => {
        const itemDateDay = item.status_order === "CONFIRMED" && new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay;
    });

    const mes_agrupados = dados_dos_mes.reduce((acc, item) => {
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


    // DADOS TOTAIS DA LOJA
    // Filtro

    const datesFilter = totalPaymentsStatus.map(item => item);

    const [data_total, setData_total] = useState<any[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filterData = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const filteredData = datesFilter.filter((item) => {
            const itemDate = new Date(moment(item.created_at).format('YYYY-MM-DD'));
            return itemDate >= startDateObj && itemDate <= endDateObj;
        });

        setData_total(filteredData);
    };

    const total_date = data_total.length === 0 ? totalPaymentsStatus : data_total.filter((item) => {
        const item_total = item.status_order === "CONFIRMED";
        return item_total;
    });

    const visitedStoreAll = visited.filter((item) => {
        const visitedItem = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return visitedItem >= new Date(startDate) && visitedItem <= new Date(endDate);
    });

    const total_faturamento: number = total_date.reduce(function (acumulador, objetoAtual) {
        return acumulador + objetoAtual.order.payment.total_payment;
    }, 0);

    const typesPaymentFilter: any[] = typesPayments.filter((item) => {
        const itemDateDay = new Date(moment(item.created_at).format('YYYY-MM-DD'));
        return itemDateDay >= new Date(startDate) && itemDateDay <= new Date(endDate);
    });

    const total_boleto_sem_filtro = typesPayments.reduce((total: any, item: any) => total + item.qtd_type_boleto, 0);
    const total_cartao_sem_filtro = typesPayments.reduce((total: any, item: any) => total + item.qtd_type_cartao, 0);
    const total_pix_sem_filtro = typesPayments.reduce((total: any, item: any) => total + item.qtd_type_pix, 0);

    const total_boleto = typesPaymentFilter.reduce((total: any, item: any) => total + item.qtd_type_boleto, 0);
    const total_cartao = typesPaymentFilter.reduce((total: any, item: any) => total + item.qtd_type_cartao, 0);
    const total_pix = typesPaymentFilter.reduce((total: any, item: any) => total + item.qtd_type_pix, 0);


    // CLIENTES


    const customers = customersDate.filter((item) => {
        const itemCustomer = item.authenticated === true;
        return itemCustomer;
    });


    // PRODUTOS


    const valuesProducts: number = products.reduce((acumulador, objeto) => {
        return acumulador + objeto.promotion
    }, 0);

    const stockAll = products.filter((item) => {
        const itemDateDayConfirmed = item.stock === 0;
        return itemDateDayConfirmed;
    });



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>
                    <BlockTop>
                        <Titulos
                            tipo="h2"
                            titulo="Dados do dia"
                        />

                    </BlockTop>
                    <br />
                    <Content>
                        <WalletBoxDate
                            title={`Qtd. pedidos hoje ${dayAtual}`}
                            color="#e0232a"
                            amount={filteredDataDayConfirmed.length}
                            footerlabel="todos os pedidos do dia"
                            image={cart}
                            width={32}
                        />

                        <WalletBoxDate
                            title={`Qtd. pedidos confirmados hoje ${dayAtual}`}
                            color="#5faf40"
                            amount={filteredDataDay.length}
                            footerlabel="todos os pedidos pagos e confirmados do dia"
                            image={orders}
                            width={32}
                        />

                        <WalletBox
                            title={`Valores total do dia ${dayAtual}`}
                            color="#4E41F0"
                            amount={totalfaturamentoDayTotal}
                            footerlabel="valor total do dia"
                            image={dolarImg}
                            width={32}
                        />

                        <WalletBox
                            title={`Faturamento confirmado do dia ${dayAtual}`}
                            color="#F7931B"
                            amount={totalfaturamentoDayConfirmed}
                            footerlabel="faturamento total do dia confirmado"
                            image={dolarImg}
                            width={32}
                        />

                        <WalletBox
                            title={`Valores em frete do dia ${dayAtual}`}
                            color="#1595eb"
                            amount={totalfreteDayTotal}
                            footerlabel="total em fretes dos pedidos neste dia"
                            image={fretes}
                            width={32}
                        />

                        <WalletBoxDate
                            title={`Visitantes do dia ${dayAtual}`}
                            color="#c9cc00"
                            amount={visitedUser}
                            footerlabel="total de visitantes na loja virtual"
                            image={usersVisited}
                            width={32}
                        />

                        <WalletBox
                            title={`Ticket médio do dia ${dayAtual}`}
                            color="#5faf40"
                            amount={ticketDay}
                            footerlabel="ticket médio de faturamento"
                            image={dolarImg}
                            width={32}
                        />

                        <WalletBoxTax
                            title={`Taxa de conversão do dia ${dayAtual}`}
                            color="#4E41F0"
                            amount={convert_users}
                            footerlabel="total de convertido"
                            image={taxConvert}
                            width={32}
                        />

                        <WalletBoxDate
                            title={`Novos clientes do dia ${dayAtual}`}
                            color="#e0232a"
                            amount={customersDay.length}
                            footerlabel="clientes cadastrados"
                            image={usersVisited}
                            width={32}
                        />
                    </Content>

                    <DivisorHorizontal />

                    <Titulos
                        tipo="h2"
                        titulo="Números do mês"
                    />
                    <br />
                    <br />
                    <Content>
                        <WalletBox
                            title="Vendas do mês"
                            color="#1595eb"
                            amount={total_mes}
                            footerlabel="vendas totais desse mês"
                            image={dolarImg}
                            width={49}
                        />

                        <WalletBoxDate
                            title="Pedidos do mês"
                            color="#5faf40"
                            amount={dadosDoMes.length}
                            footerlabel="total de pedidos desse mês"
                            image={orders}
                            width={49}
                        />
                        <WalletBoxDate
                            title="Acessos do mês"
                            color="#c9cc00"
                            amount={visitedStoreMonth.length}
                            footerlabel="total de acessos desse mês"
                            image={usersVisited}
                            width={49}
                        />

                        <WalletBoxTax
                            title="Taxa de conversão do mês"
                            color="#F7931B"
                            amount={convert_users_month}
                            footerlabel="total de conversões de pedidos desse mês"
                            image={taxConvert}
                            width={49}
                        />

                        <WalletBox
                            title="Ticket médio do mês"
                            color="#e0232a"
                            amount={ticketMonth}
                            footerlabel="montante médio relativo desse mês"
                            image={dolarImg}
                            width={100}
                        />
                    </Content>
                    <br />
                    <ResponsiveContainer width="100%" aspect={3}>
                        <AreaChart
                            width={500}
                            height={200}
                            data={dados_do_mes}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="10 10" />
                            <XAxis dataKey="Dia_do_mes" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="Faturamento" stackId="1" stroke='#82caed' fill="#5faf40" />
                            <Legend />
                        </AreaChart>
                    </ResponsiveContainer>
                    <br />
                    <br />
                    <Titulos
                        tipo="h2"
                        titulo="Formas de pagamento do mês"
                    />
                    <ResponsiveContainer width="100%" aspect={3}>
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
                    <br />
                    <br />
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
                    <br />
                    <br />
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

                    <DivisorHorizontal />

                    <BlockTop>
                        <Titulos
                            tipo="h2"
                            titulo="Números totais"
                        />

                        <BoxFilterData>
                            <InputData
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <InputData
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />

                            <ButtonFilterData onClick={filterData}>Filtrar</ButtonFilterData>
                        </BoxFilterData>
                    </BlockTop>
                    <br />
                    <br />
                    <Content>
                        <WalletBox
                            title="Faturamento total"
                            color="#1595eb"
                            amount={total_faturamento}
                            footerlabel="faturamento total da loja"
                            image={dolarImg}
                            width={32}
                        />

                        <WalletBoxDate
                            title="Total de pedidos"
                            color="#5faf40"
                            amount={total_date.length}
                            footerlabel="todos os pedidos efetivados na loja"
                            image={orders}
                            width={32}
                        />
                        <WalletBoxDate
                            title="Acessos totais"
                            color="#c9cc00"
                            amount={visitedStoreAll.length === 0 ? visited.length : visitedStoreAll.length}
                            footerlabel="quantidade total de acessos na loja"
                            image={usersVisited}
                            width={32}
                        />

                        <WalletBoxDate
                            title="Pagamentos por boleto bancario"
                            color="#F7931B"
                            amount={total_boleto === 0 ? total_boleto_sem_filtro : total_boleto}
                            footerlabel="total de pagamentos feitos com boletos bancarios"
                            image={boleto}
                            width={32}
                        />

                        <WalletBoxDate
                            title="Pagamentos por cartão de crédito"
                            color="#e0232a"
                            amount={total_cartao === 0 ? total_cartao_sem_filtro : total_cartao}
                            footerlabel="total de pagamentos feitos com cartão de crédito"
                            image={cartao}
                            width={32}
                        />

                        <WalletBoxDate
                            title="Pagamentos por PIX"
                            color="#1595eb"
                            amount={total_pix === 0 ? total_pix_sem_filtro : total_pix}
                            footerlabel="total de pagamentos feitos com pix"
                            image={pix}
                            width={32}
                        />
                    </Content>

                    <DivisorHorizontal />

                    <Titulos
                        tipo="h2"
                        titulo="Clientes"
                    />
                    <br />
                    <Content>
                        <WalletBoxDate
                            title="Total de clientes"
                            color="#1595eb"
                            amount={customersDate.length}
                            footerlabel="total de clientes da loja"
                            image={usersVisited}
                            width={49}
                        />

                        <WalletBoxDate
                            title="Clientes ativos"
                            color="#5faf40"
                            amount={customers.length}
                            footerlabel="total de clientes ativos na loja"
                            image={usersVisited}
                            width={49}
                        />
                    </Content>

                    <DivisorHorizontal />

                    <Titulos
                        tipo="h2"
                        titulo="Dados de produtos"
                    />
                    <br />
                    <Content>
                        <WalletBoxDate
                            title="Total de produtos"
                            color="#5faf40"
                            amount={products.length}
                            footerlabel="todos produtos cadastrados na loja"
                            image={productsImg}
                            width={32}
                        />

                        <WalletBoxDate
                            title="Estoque de produtos"
                            color="#1595eb"
                            amount={stockAll.length}
                            footerlabel="produtos faltantes de estoque"
                            image={stock}
                            width={32}
                        />

                        <WalletBox
                            title="Valor em produtos"
                            color="#F7931B"
                            amount={valuesProducts}
                            footerlabel="valor total monetario em produtos"
                            image={dolarImg}
                            width={32}
                        />
                    </Content>
                </Card>
            </Container>
        </Grid>
    )
}

export default Dashboard;