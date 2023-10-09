import { cookies } from "../App";
import { useState, useEffect, useContext } from "react";
import { LOGIN } from "./Queries";
import { useMutation } from "@apollo/client";
import { loggedInContext } from "../pages/Dashboard";
import { loggedInContextFront } from "../pages/Home";
import { tokenContext } from "../App";

export default function Login() {
    document.body.style.overflow = "auto";
    /* eslint-disable no-unused-vars */
    const [loggedIn, setLoggedIn] = useContext(loggedInContext);
    const [token, setToken] = useContext(tokenContext);
    const [isError, setIsError] = useState("");
    const [formState, setFormState] = useState({
        username: "",
        password: "",
    });
    const [login, { loading, error, data }] = useMutation(LOGIN, {
        variables: {
            username: formState.username.toLowerCase(),
            password: formState.password.toLowerCase(),
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

    useEffect(() => {
        if (error) {
            setIsError("Invalid Username or Password");
        }
    }, [error]);

    return (
        <div className="container">
            <div className="row vh-100">
                <div className="col-6 login offset-3 m-auto text-center">
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
                    <p className="mt-3">{isError}</p>
                    {isError !== "" ? (
                        <button
                            onClick={(e) => {
                                document.getElementById("forgot").showModal();
                                document.body.style.overflow = "hidden";
                            }}
                            className="btn btn-danger">
                            Forgot Password
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <dialog id="forgot">
                <div className="row">
                    <div className="col-12 text-center">
                        <h4>Forgot Password</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center mb-2">
                        Please contact -
                    </div>
                    <div className="col-12 text-center mb-2">
                        <a href="mailto:kit@themediaworkshop.co.uk">
                            kit@themediaworkshop.co.uk
                        </a>
                    </div>
                    <div className="col-12 text-center mb-2">
                        to request or reset password.
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.reload();
                            }}
                            className="btn btn-danger">
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
