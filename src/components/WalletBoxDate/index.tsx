import React from 'react';
import { Container }  from './styles';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerlabel: string;
    color: string;
    image: string;
}

const WalletBoxDate: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerlabel,
    color,
    image
}) => {

    return (
        <Container color={color}>
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