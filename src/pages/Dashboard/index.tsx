import React, { useCallback, useMemo, useState } from "react";
import { Grid } from "./styles";
import MainHeader from "../../components/MainHeader";
import Aside from "../../components/Aside";
import Warnings from "../../components/Warnings";
import { BlockTop, Container } from "../Categorias/styles";
import { Card } from "../../components/Content/styles";
import Titulos from "../../components/Titulos";
import SelectInput from "../../components/ui/SelectInput";
import listOfMonths from '../../utils/months';

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());


    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });
    }, []);

    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch {
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }, []);


    const handleYearSelected = useCallback((year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }
        catch {
            throw new Error('invalid year value. Is accept integer numbers.')
        }
    }, []);



    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Container>
                <Warnings />
                <Card>
                    <BlockTop>
                        <Titulos
                            tipo="h1"
                            titulo="Dashboard"
                        />

                        <SelectInput
                            options={months}
                            onChange={(e) => handleMonthSelected(e.target.value)}
                            defaultValue={monthSelected}
                        />

                        <SelectInput
                            options={months}
                            onChange={(e) => handleMonthSelected(e.target.value)}
                            defaultValue={monthSelected}
                        />
                        {/* <SelectInput
                            options={years}
                            onChange={(e) => handleYearSelected(e.target.value)}
                            defaultValue={yearSelected}
                        /> */}

                    </BlockTop>
                </Card>
            </Container>
        </Grid>
    )
}

export default Dashboard;