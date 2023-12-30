import React from 'react';
import CountUp from 'react-countup';
import { Container }  from './styles';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerlabel: string;
    color: string;
    image: string;
    width: number;
}

const WalletBoxTax: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerlabel,
    color,
    width,
    image
}) => {

    return (
        <Container color={color} width={width}>
            <span>{title}</span>
            <h1>
                <CountUp 
                    end={amount}
                    decimal=","
                    decimals={2}                                    
                />
                <strong>%</strong>
            </h1>
            <small>{footerlabel}</small>
            <img src={image} alt={title} />
        </Container>
    );
}

export default WalletBoxTax;