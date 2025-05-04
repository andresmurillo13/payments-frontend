import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Asegúrate de importar estos módulos
import { routes } from './router';
// Asegúrate de que esta importación sea correcta

export const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <Routes>
                    {
                        routes.map(({ path, component: Component }) => (
                            <Route
                                key={path}
                                path={path}
                                element={React.createElement(Component)}
                            />
                        ))
                    }
                    <Route path="/*" element={<Navigate to={routes[0].to} replace />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};