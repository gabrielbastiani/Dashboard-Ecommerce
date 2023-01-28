import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import  { Route, Routes }  from  "react-router-dom" ;

import { useTheme } from './contexts/theme';
import LoginAdmin from './pages/LoginAdmin';


const App: React.FC = () => {

    const { theme } = useTheme();
    
    return (
        <ThemeProvider theme={ theme }>
            <GlobalStyles />
            <Routes>
                <Route path='/loginAdmin'  element={ <LoginAdmin />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;