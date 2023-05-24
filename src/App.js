import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

// apollo client

export const url = "https://cms.plasticelephant.co.uk";
const api = new ApolloClient({
    uri: url + "/graphql",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <BrowserRouter>
            <ApolloProvider client={api}>
                <Routes>
                    <Route path="/leaderboard" element={<Home />} />
                    <Route path="/leaderboardadmin" element={<Dashboard />} />
                </Routes>
            </ApolloProvider>
        </BrowserRouter>
    );
}

export default App;
