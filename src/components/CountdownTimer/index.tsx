import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";

type ItemProps = {
    text_promotion: string;
    text_button: string;
    link_button: string;
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    second: string;
}

function CountdownTimer() {

    const [dataAll, setDataAll] = useState<ItemProps>();

    useEffect(() => {
        async function loadCountDown() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get('/findCountDownTime');

                setDataAll(data || {});

            } catch (error) {/* @ts-ignore */
                console.log(error.response.data);
            }
        }
        loadCountDown();
    }, []);

    const data = `${dataAll?.year}-${dataAll?.month}-${dataAll?.day}T${dataAll?.hour}:${dataAll?.minute}:00`;

    const targetDate = new Date(data).getTime();

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimeLeft = calculateTimeLeft(targetDate);
            setTimeLeft(updatedTimeLeft);

            if (updatedTimeLeft.total <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [targetDate]);

    function calculateTimeLeft(targetDate: number) {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return {
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return {
            total: difference,
            days,
            hours,
            minutes,
            seconds,
        };
    }


    return (
        <div>
            <span>FALTA:</span>
            &nbsp;
            &nbsp;
            <span>
                {timeLeft.days}
                &nbsp;
                Dias:
            </span>
            &nbsp;
            <span>
                {timeLeft.hours}
                &nbsp;
                Horas:
            </span>
            &nbsp;
            <span>
                {timeLeft.minutes}
                &nbsp;
                Minutos:
            </span>
            &nbsp;
            <span>
                {timeLeft.seconds}
                &nbsp;
                Segundos
            </span>
        </div>
    );
}

export default CountdownTimer;