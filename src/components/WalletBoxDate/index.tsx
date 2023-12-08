import React from 'react';
import { Container }  from './styles';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerlabel: string;
    color: string;
    image: string;
    width: number;
}

const WalletBoxDate: React.FC<IWalletBoxProps> = ({
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
                <strong>{amount}</strong>
            </h1>
            <small>{footerlabel}</small>
            <img src={image} alt={title} />
        </Container>
    );
}

export default WalletBoxDate;