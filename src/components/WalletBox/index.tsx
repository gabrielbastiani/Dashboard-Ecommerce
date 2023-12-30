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

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerlabel,
    color,
    image,
    width
}) => {

    return (
        <Container color={color} width={width}>
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
            <img src={image} alt={title} />
        </Container>
    );
}

export default WalletBox;