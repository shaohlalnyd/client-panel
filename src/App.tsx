import React from 'react';
import './App.css';
import FirstLevelOrganism from "./components/organisms/first-level/first-level.organism";
import {QueryClient, QueryClientProvider} from "react-query";
import {createTheme, ThemeProvider} from '@mui/material';


function App() {


    const theme = createTheme({
        typography: {
            fontFamily: [
                'iran-sans',
            ].join(','),
        }
    });

    const queryClient = new QueryClient();
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <div className="App">
                    <div className="app-container">
                        <FirstLevelOrganism/>
                    </div>
                </div>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
