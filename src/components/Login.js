import { cookies } from "../App";
import { useState, useEffect, useContext } from "react";
import { LOGIN } from "./Queries";
import { useMutation } from "@apollo/client";
import { loggedInContext } from "../pages/Dashboard";
import { loggedInContextFront } from "../pages/Home";
import { tokenContext } from "../App";

export default function Login() {
    /* eslint-disable no-unused-vars */
    const [loggedIn, setLoggedIn] = useContext(loggedInContext);
    const [token, setToken] = useContext(tokenContext);
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    });
    const [login, { loading, error, data }] = useMutation(LOGIN, {
        variables: {
            username: formState.username,
            password: formState.password,
        },
    });
    /* eslint-enable no-unused-vars */
    useEffect(() => {
        if (data !== undefined) {
            cookies.set("jwt", data.login.jwt, {
                maxAge: 21600,
                path: "/leaderboardadmin",
            });
            setToken(data.login.jwt);
            setLoggedIn(true);
        }
    }, [data, setLoggedIn, setToken]);

    return (
        <div className="container">
            <div className="row vh-100">
                <div className="col-6 offset-3 m-auto text-center">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login();
                        }}>
                        <h3 className="mb-5">Login</h3>
                        <label>Username</label>
                        <input
                            required
                            value={formState.username}
                            onChange={(e) => {
                                setFormState({
                                    ...formState,
                                    username: e.target.value,
                                });
                            }}
                            type="text"
                            placeholder="Username"
                        />
                        <label>Password</label>
                        <input
                            required
                            value={formState.password}
                            onChange={(e) => {
                                setFormState({
                                    ...formState,
                                    password: e.target.value,
                                });
                            }}
                            type="password"
                            placeholder="Password"
                        />
                        <button className="btn btn-success mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
