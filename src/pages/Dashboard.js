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
    const [showInfo, setShowInfo] = useState(false);
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
    useEffect(() => {
        if (!cookies.get("infoCheck")) {
            if (document.getElementById("info-button")) {
                document.getElementById("info-button").click();
            }
        }
    }, [loggedIn]);
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
                        cookies.remove("infoCheck", {
                            path: "/leaderboardadmin",
                        });
                        setLoggedIn(false);
                        window.location.reload();
                    }}>
                    Log Out
                </button>
            </div>
            <div className="info-button">
                <button
                    id="info-button"
                    className="btn btn-success"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("info").showModal();
                        document.body.style.overflow = "hidden";
                    }}>
                    Useful Info
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
                                    View/Edit displayed Leaderboard
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
                <InfoDialog showInfo={showInfo} />
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

function InfoDialog(props) {
    return (
        <dialog id="info" open={props.showInfo}>
            <div className="row">
                <div className="col-12 text-center">
                    <h4>Useful Info</h4>
                </div>
                <div className="col-10 offset-1 mt-3">
                    From this dashboard you can view the daily and overall
                    leaders of the competition.
                    <br />
                    <br />
                    You can add, edit and delete contestants.
                    <br />
                    <br />
                    You can also select which view is displayed on the main
                    leader board (either todays leaders or overall leaders).
                    <br />
                    <br />
                    The daily leader board is reset automatically each day at
                    midnight. <br /> <br />
                    Upon adding a qualifying entrant their daily position and
                    overall position will be displayed to you.
                    <br />
                    <br />
                    If in the event the two qualifying entrants get the same
                    score, the qualifying entrant that achieved the score first
                    will be ranked higher.
                </div>
                <div className="col-12 text-center">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            cookies.set("infoCheck", true);
                            document.getElementById("info").close();
                            document.body.style.overflow = "auto";
                        }}
                        className="btn btn-success mt-4">
                        Got it!
                    </button>
                </div>
            </div>
        </dialog>
    );
}
