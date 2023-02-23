import React from 'react';

import { SelectItem, Options } from './styles';

interface SelectRequest {
    value: any;
    opcoes: any;
    onChange: () => void;
}

const Select = ({ value, opcoes, onChange }: SelectRequest) => (
    <SelectItem value={value} onChange={onChange}>
        {
            opcoes.map((opcao: any, idx: any) => (
                <Options key={opcao.value} value={opcao.value}>{opcao.label}</Options>
            ))
        }
    </SelectItem>
)

export default Select;