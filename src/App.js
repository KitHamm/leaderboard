import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Cookies from "universal-cookie";
import { createContext, useState } from "react";
export const tokenContext = createContext();

// apollo client
export const cookies = new Cookies(null, { path: "/leaderboardadmin" });
export const url = "https://cms.plasticelephant.co.uk";

function App() {
    const [token, setToken] = useState(cookies.get("jwt"));
    const httpLink = createHttpLink({
        uri: url + "/graphql",
    });
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
    return (
        <BrowserRouter>
            <ApolloProvider client={client}>
                <Routes>
                    <Route
                        path="/leaderboard"
                        element={
                            <tokenContext.Provider value={[token, setToken]}>
                                <Home />
                            </tokenContext.Provider>
                        }
                    />

                    <Route
                        path="/leaderboardadmin"
                        element={
                            <tokenContext.Provider value={[token, setToken]}>
                                <Dashboard />
                            </tokenContext.Provider>
                        }
                    />
                </Routes>
            </ApolloProvider>
        </BrowserRouter>
    );
}

export default App;
