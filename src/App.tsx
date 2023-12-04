import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { useTheme } from './contexts/theme';
import RoutesAuth from './auth.routes';
import RaoutesApp from './app.routes';
import { AuthContext } from './contexts/AuthContext';
import RoutesEmployesAuth from './authEmploye.routes';


const App: React.FC = () => {

    const { theme } = useTheme();
    const { isAuthenticated, admin } = useContext(AuthContext);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            { isAuthenticated && admin.role === "ADMIN" ? 
                <RoutesAuth /> 
            : 
                <RaoutesApp />
            }

            { isAuthenticated && admin.role === "EMPLOYEE" ? 
                <RoutesEmployesAuth /> 
            : 
                <RaoutesApp />
            }
        </ThemeProvider>
    );
}

export default App;