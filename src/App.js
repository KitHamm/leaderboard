import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
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
                    <Route path="/test" element={<Home />} />
                    <Route path="/test2" element={<Dashboard />} />
                </Routes>
            </ApolloProvider>
        </BrowserRouter>
    );
}

export default App;
