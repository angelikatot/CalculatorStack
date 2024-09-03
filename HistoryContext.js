// komponentti väliaikaisen muistin luomiseen, muisti tyhjentyy kun sovellus suljetaan

import React, { createContext, useState, useContext } from 'react';

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
    const [history, setHistory] = useState([]);

    return (
        <HistoryContext.Provider value={{ history, setHistory }}>
            {children}
        </HistoryContext.Provider>
    );
}

export function useHistory() {
    return useContext(HistoryContext);
}
// https://react.dev/reference/react/createContext