'use client';
import React from 'react';

const AppContext = React.createContext();
function AppProvider({ children }) {
	const [theme, setTheme] = React.useState('light');
	return (
		<AppContext.Provider
			value={{
				theme,
				setTheme,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export const useAppProvider = () => React.useContext(AppContext);

export default AppProvider;
