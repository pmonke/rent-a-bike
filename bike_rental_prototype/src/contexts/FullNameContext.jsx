import { createContext, useContext, useState } from 'react';

const FullNameContext = createContext();

export function FullNameProvider({ children }) {
    const [fullName, setFullName] = useState('');

    return (
        <FullNameContext.Provider value={{ fullName, setFullName }}>
            {children}
        </FullNameContext.Provider>
    );
}

export function useFullName() {
    return useContext(FullNameContext);
}