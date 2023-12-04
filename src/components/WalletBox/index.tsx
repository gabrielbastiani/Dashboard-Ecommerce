import React from 'react';
import CountUp from 'react-countup';
import dolarImg from '../../assets/dolar.svg';


import { Container }  from './styles';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerlabel: string;
    color: string;
}

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerlabel,
    color
}) => {

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>R$ </strong>
                <CountUp 
                    end={amount}
                    separator="."
                    decimal=","
                    decimals={2}                                    
                />
            </h1>
            <small>{footerlabel}</small>
            <img src={dolarImg} alt={title} />
        </Container>
    );
}

export default WalletBox;