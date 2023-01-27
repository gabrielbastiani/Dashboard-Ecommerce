import React from 'react';
import { Switch, Route } from 'react-router-dom'; 

import LoginAdmin from '../pages/LoginAdmin';

const AuthRoutes: React.FC = () => (
    <Switch>
        <Route path="/" component={LoginAdmin} />
    </Switch>
);

export default AuthRoutes;