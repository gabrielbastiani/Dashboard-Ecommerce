import React, { createContext, useState, useContext } from 'react';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';


interface IThemeContext {
    toggleTheme(): void;
    theme: ITheme;
    children: JSX.Element;
}

interface ITheme {
    title: string;

    colors: {
        primary: string;
        secondary: string;
        tertiary: string;

        white: string;
        black: string;
        gray: string;

        success: string;
        info: string;
        warning: string;
    }
}

interface PropsChildrens {
    children: React.ReactNode;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: React.FC<PropsChildrens> = ({ children }) => {
    const [theme, setTheme] = useState<ITheme>(() => {
        const themeSaved = localStorage.getItem('@storedashboard:theme');

        if(themeSaved) {
            return JSON.parse(themeSaved);
        }else{
            return dark;
        }
    });

    const toggleTheme = () => {
        if(theme.title === 'dark'){
            setTheme(light);
            localStorage.setItem('@storedashboard:theme', JSON.stringify(light));
        }else{
            setTheme(dark);
            localStorage.setItem('@storedashboard:theme', JSON.stringify(dark));
        }
    };

    return (/* @ts-ignore */
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    )
}

function useTheme(): IThemeContext {
    const context = useContext(ThemeContext);

    return context;
}


export { ThemeProvider, useTheme };