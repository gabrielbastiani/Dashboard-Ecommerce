import Titulos from "../../Titulos";
import { Content } from "./styles";
import WalletBoxDate from "../../WalletBoxDate";
import WalletBox from "../../WalletBox";
import dolarImg from '../../../assets/dolar.svg';
import productsImg from '../../../assets/products.svg';
import stock from "../../../assets/stock.svg";

interface Products {
    products: any;
}

const ProductsDate = ({ products }: Products) => {

    const valuesProducts: number = products.reduce((acumulador: any, objeto: { promotion: any; }) => {
        return acumulador + objeto.promotion
    }, 0);

    const stockAll = products.filter((item: { stock: number; }) => {
        const itemDateDayConfirmed = item.stock === 0;
        return itemDateDayConfirmed;
    });


    return (
        <>
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
        </>
    )
}

export default ProductsDate