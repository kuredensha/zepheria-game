import { Leaderboards } from './leaderboards'; // adjust the import to your file structure

import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.querySelector('#root')!).render(
    <React.StrictMode>
        <Leaderboards />
    </React.StrictMode>
);
