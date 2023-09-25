import Leaderboard from "../components/Leaderboard";
import { useState, useEffect, createContext } from "react";
import Login from "../components/Login";
import { cookies } from "../App";
export const loggedInContextFront = createContext();

export default function Home() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (!cookies.get("jwt")) {
            setLoggedIn(false);
        } else {
            cookies.set("jwt", cookies.get("jwt"));
            setLoggedIn(true);
        }
    }, []);

    if (!loggedIn) {
        return (
            <loggedInContextFront.Provider value={[loggedIn, setLoggedIn]}>
                <Login />
            </loggedInContextFront.Provider>
        );
    }

    return (
        <div className="container">
            <div className="row top">
                <div className="mt-auto row mb-auto">
                    <div className="col-2 m-auto text-center">
                        {
                            <img
                                onClick={(e) => {
                                    e.preventDefault();
                                    cookies.remove("jwt", {
                                        path: "/leaderboard",
                                    });
                                    setLoggedIn(false);
                                    window.location.reload();
                                }}
                                alt="cup"
                                className="cup"
                                src="leaderboard/cup.png"
                            />
                        }
                    </div>
                    <div className="col-10 text-center m-auto">
                        <h1>LEADERBOARD</h1>
                    </div>
                </div>
            </div>
            <div className="row middle">
                <div className="col-12">
                    <div className="leaderboard">
                        <Leaderboard admin={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
