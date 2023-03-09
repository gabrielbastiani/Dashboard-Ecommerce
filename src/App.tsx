import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { useTheme } from './contexts/theme';
import RoutesAuth from './auth.routes';
import RaoutesApp from './app.routes';
import { AuthContext } from './contexts/AuthContext';


const App: React.FC = () => {

    const { theme } = useTheme();
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            { isAuthenticated ? 

                <RoutesAuth /> 

            : 
            
                <RaoutesApp />
                
            }
        </ThemeProvider>
    );
}

export default App;