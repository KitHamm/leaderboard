// Apollo imports
import { useMutation, useQuery } from "@apollo/client";
// React imports
import { useState, useEffect, useContext } from "react";
// context/cookie import
// use loggedInContextFront when building main display
import { cookies } from "../App";
import { loggedInContextFront } from "../pages/Home";
import { tokenContext } from "../App";
// gql query imports
import { LOGIN, ROLE, loginEvent } from "./Queries";
// component imports
import { loggedInContext } from "../pages/Dashboard";

// Log in component
export default function Login() {
    document.body.style.overflow = "auto";
    /* eslint-disable no-unused-vars */
    const [loggedIn, setLoggedIn] = useContext(loggedInContext);
    const [token, setToken] = useContext(tokenContext);
    const [notAuth, setNotAuth] = useState(false);
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
    const userId = data?.login?.user?.id;
    const { data: roleData } = useQuery(ROLE, {
        skip: !userId,
        variables: { id: userId },
    });
    const [loginEventPost, { data: dataLoginEvent }] = useMutation(loginEvent);

    /* eslint-enable no-unused-vars */
    useEffect(() => {
        if (roleData !== undefined) {
            if (
                roleData.usersPermissionsUser.data.attributes.role.data
                    .attributes.name === "leaderboard"
            ) {
                cookies.set("jwt", data.login.jwt, {
                    maxAge: 21600,
                    path: "/leaderboardadmin",
                });
                setToken(data.login.jwt);
                setLoggedIn(true);
            } else {
                setNotAuth(true);
            }
        }
    }, [roleData, setLoggedIn, setToken]);

    useEffect(() => {
        if (error) {
            setIsError("Invalid Username or Password");
        }
    }, [error]);

    if (notAuth) {
        return (
            <div className="container">
                <div className="row vh-100">
                    <div className="col-12 login p-4 offset-3 m-auto text-center">
                        You are not authorised to view this page
                        <div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.reload();
                                }}
                                className="btn btn-danger mt-4">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row vh-100">
                <div className="col-6 login offset-3 m-auto text-center">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login();
                            loginEventPost();
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
