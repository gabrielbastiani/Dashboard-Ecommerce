import Titulos from "../../Titulos";
import { Content } from "./styles";
import WalletBoxDate from "../../WalletBoxDate";
import usersVisited from '../../../assets/user.svg';

interface Customers {
    customersDate: any;
}

const CustomersDate = ({ customersDate }: Customers) => {

    const customers = customersDate.filter((item: any) => {
        const itemCustomer = item.authenticated === true;
        return itemCustomer;
    });


    return (
        <>
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
        </>
    )
}

export default CustomersDate