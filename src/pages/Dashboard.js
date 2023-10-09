import { useState, useEffect, createContext } from "react";
import EntryForm from "../components/EntryForm";
import LeaderboardBack from "../components/LeaderboardBack";
import LeaderboardAll from "../components/LeaderboardAll";
import Leaders from "../components/Leaders";
import { cookies } from "../App";
import Login from "../components/Login";
export const loggedInContext = createContext();
export const viewContext = createContext();

export default function Dashboard() {
    document.body.style.overflow = "auto";
    const [loggedIn, setLoggedIn] = useState(false);
    const [view, setView] = useState(1);
    var body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = "url('/leaderboardadmin/backgroundadmin.png')";
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "repeat-y";
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
            <loggedInContext.Provider value={[loggedIn, setLoggedIn]}>
                <Login />
            </loggedInContext.Provider>
        );
    }
    return (
        <>
            <div className="logout">
                <button
                    className="btn btn-danger"
                    onClick={(e) => {
                        e.preventDefault();
                        cookies.remove("jwt", {
                            path: "/leaderboardadmin",
                        });
                        setLoggedIn(false);
                        window.location.reload();
                    }}>
                    Log Out
                </button>
            </div>
            <div className="container">
                <div className="row mt-3 mb-3">
                    <div className="col-12 text-center">
                        <h3>Leaderboard</h3>
                    </div>
                </div>
                {view !== 1 ? (
                    <></>
                ) : (
                    <>
                        <div className="row mb-3">
                            <div className="col-8 offset-2 text-center">
                                <button
                                    onClick={() => {
                                        setView(2);
                                    }}
                                    className="btn btn-success">
                                    Add Contestant
                                </button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 text-center">
                                <button
                                    onClick={() => {
                                        setView(3);
                                    }}
                                    className="btn btn-success">
                                    View/Edit Leaderboard
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <button
                                    onClick={() => {
                                        setView(4);
                                    }}
                                    className="btn btn-success">
                                    View/Edit all contestants
                                </button>
                            </div>
                        </div>
                        <Leaders />
                    </>
                )}
                <viewContext.Provider value={[view, setView]}>
                    <View view={view} />
                </viewContext.Provider>
            </div>
        </>
    );
}

function View(props) {
    switch (props.view) {
        case 1:
            return <></>;
        case 2:
            return <EntryForm />;
        case 3:
            return <LeaderboardBack />;
        case 4:
            return <LeaderboardAll />;
        default:
            return <></>;
    }
}
