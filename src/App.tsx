import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { useTheme } from './contexts/theme';
import Mainroutes from './routes';


const App: React.FC = () => {

    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Mainroutes />
        </ThemeProvider>
    );
}

export default App;