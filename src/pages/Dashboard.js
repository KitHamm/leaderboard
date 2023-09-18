import { useState, useEffect, createContext, useContext } from "react";
import EntryForm from "../components/EntryForm";
import { useQuery, useMutation } from "@apollo/client";
import { cookies } from "../App";
import { tokenContext } from "../App";
import Login from "../components/Login";
import {
    LBBackend,
    AllContestantBackend,
    EDITENTRY,
    DELETEENTRY,
    setNoShow,
} from "../components/Queries";
export const loggedInContext = createContext();
export const viewContext = createContext();
export default function Dashboard() {
    /* eslint-disable no-unused-vars */
    const [token, setToken] = useContext(tokenContext);
    /* eslint-enable no-unused-vars */
    const [loggedIn, setLoggedIn] = useState(false);
    const [view, setView] = useState(1);
    var body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = "url('/leaderboardadmin/backgroundadmin.png')";
    body.style.backgroundSize = "cover";

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
            <div className="container">
                <div className="row mt-5 mb-5">
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
                        <div className="row mb-3">
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
                        <div className="row">
                            <div className="col-12 text-center">
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
                        </div>
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
            return <Leaderboard />;
        case 4:
            return <LeaderboardAll />;
        default:
            return <></>;
    }
}

function Leaderboard() {
    /* eslint-disable no-unused-vars */
    const [view, setView] = useContext(viewContext);
    const { loading, error, data } = useQuery(LBBackend, { pollInterval: 500 });
    const [
        updateShow,
        { loading: loadingShow, error: errorShow, data: dataShow },
    ] = useMutation(setNoShow);
    /* eslint-enable no-unused-vars */
    function handleNoShow(data) {
        data.forEach((element) => {
            updateShow({ variables: { id: element.id } });
        });
    }

    if (loading) {
        return (
            <div className="row mt-5 p-1 contestant">
                <div className="col-12 text-center">Loading...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="row mt-5 p-1 contestant">
                <div className="col-12  text-center">Error.</div>
            </div>
        );
    }
    if (data)
        return (
            <>
                <div className="row mt-5 mb-4">
                    <div className="col-3">
                        <button
                            className="btn btn-danger"
                            onClick={(e) => {
                                setView(1);
                            }}>
                            Close
                        </button>
                    </div>
                    <div className="col-6 text-center">
                        <div>Current Leaderboard</div>
                    </div>
                    {data.lbs.data.length > 0 ? (
                        <div className="col-3 text-end">
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                    document
                                        .getElementById("clear-dialog")
                                        .showModal();
                                    document.body.style.overflow = "hidden";
                                }}>
                                Clear
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {data.lbs.data.length > 0 ? (
                    data.lbs.data.slice(0, 9).map((contestant, index) => {
                        return (
                            <ContestantRow
                                key={contestant.attributes.displayName + index}
                                contestant={contestant}
                                index={index}
                            />
                        );
                    })
                ) : (
                    <div className="row p-1 contestant">
                        <div className="col-12 text-center">No Entries.</div>
                    </div>
                )}
                <dialog id="clear-dialog">
                    <div className="row mb-4">
                        <div className="col-12 text-center">
                            <h4>Are you sure?</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNoShow(data.lbs.data);
                                    document
                                        .getElementById("clear-dialog")
                                        .close();
                                    document.body.style.overflow = "auto";
                                }}>
                                Clear
                            </button>
                        </div>
                        <div className="col-6 text-end">
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .getElementById("clear-dialog")
                                        .close();
                                    document.body.style.overflow = "auto";
                                }}>
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            </>
        );
}

function LeaderboardAll() {
    /* eslint-disable no-unused-vars */
    const [view, setView] = useContext(viewContext);
    /* eslint-enable no-unused-vars */
    const { loading, error, data } = useQuery(AllContestantBackend, {
        pollInterval: 500,
    });

    if (loading) {
        return (
            <div className="row mt-5 p-1 contestant">
                <div className="col-12 text-center">Loading...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="row mt-5 p-1 contestant">
                <div className="col-12  text-center">Error.</div>
            </div>
        );
    }
    if (data)
        return (
            <>
                <div className="row mt-5 mb-4">
                    <div className="col-3">
                        <button
                            className="btn btn-danger"
                            onClick={(e) => {
                                setView(1);
                            }}>
                            Close
                        </button>
                    </div>
                    <div className="col-6 text-center">
                        <div>All Entries</div>
                    </div>
                    {data.lbs.data.length > 0 ? (
                        <div className="col-3 text-end">
                            <button
                                className="btn btn-success"
                                onClick={(e) => {
                                    console.log("Download");
                                }}>
                                Download
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {data.lbs.data.length > 0 ? (
                    data.lbs.data.slice(0, 9).map((contestant, index) => {
                        return (
                            <ContestantRow
                                key={contestant.attributes.displayName + index}
                                contestant={contestant}
                                index={index}
                            />
                        );
                    })
                ) : (
                    <div className="row p-1 contestant">
                        <div className="col-12 text-center">No Entries.</div>
                    </div>
                )}
            </>
        );
}

function DeleteModal(props) {
    const [
        deleteEntry,
        { loading: loadingDelete, error: errorDelete, data: dataDelete },
    ] = useMutation(DELETEENTRY);
    return (
        <dialog id={"delete-" + props.id}>
            {loadingDelete ? (
                <div>Deleting...</div>
            ) : errorDelete ? (
                <div className="row">
                    <div className="col-12 text-center mb-5">Error.</div>
                    <div className="col-12 text-end">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                document
                                    .getElementById("delete-" + props.id)
                                    .close();
                                document.body.style.overflow = "auto";
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            ) : dataDelete ? (
                <div className="row">
                    <div className="col-12 text-center mb-5">Deleted.</div>
                    <div className="col-12 text-end">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                window.location.reload();
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-12 mb-4 text-center">Are you sure?</div>
                    <div className="col-12 ays mb-4 text-center">
                        <h4>Delete {props.data.attributes.displayName}?</h4>
                    </div>
                    <div className="col-6">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                deleteEntry({
                                    variables: {
                                        id: props.id,
                                    },
                                });
                            }}>
                            Delete
                        </button>
                    </div>
                    <div className="col-6 text-end">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                document
                                    .getElementById("delete-" + props.id)
                                    .close();
                                document.body.style.overflow = "auto";
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </dialog>
    );
}
function EditModal(props) {
    const [editFormState, setEditFormState] = useState({
        id: props.data.id,
        displayName: props.data.attributes.displayName,
        firstName: props.data.attributes.firstName,
        lastName: props.data.attributes.lastName,
        email: props.data.attributes.email,
        scoreOne: props.data.attributes.scoreOne,
        scoreTwo: props.data.attributes.scoreTwo,
        score: props.data.attributes.score,
    });

    const [editEntry, { loading, error, data }] = useMutation(EDITENTRY, {
        variables: {
            id: editFormState.id,
            displayName: editFormState.displayName,
            firstName: editFormState.firstName,
            lastName: editFormState.lastName,
            email: editFormState.email,
            scoreOne: editFormState.scoreOne,
            scoreTwo: editFormState.scoreTwo,
            score: editFormState.score,
        },
    });

    function scoreCalc(scoreOne, scoreTwo) {
        let score;
        if (scoreOne > scoreTwo) {
            score = scoreOne - scoreTwo;
        } else if (scoreOne < scoreTwo) {
            score = scoreTwo - scoreOne;
        } else {
            score = 0;
        }
        return score;
    }

    useEffect(() => {
        setEditFormState({
            ...editFormState,
            score: scoreCalc(editFormState.scoreOne, editFormState.scoreTwo),
        });
    }, [editFormState.scoreOne, editFormState.scoreTwo]);

    return (
        <dialog id={props.id}>
            {loading ? (
                <div>Submitting...</div>
            ) : error ? (
                <div>Error :(</div>
            ) : data ? (
                <div className="row">
                    <div className="col-12">Complete.</div>
                    <div className="col-2 text-end">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                window.location.reload();
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h5 className="mb-5">
                        Editing {props.data.attributes.displayName}
                    </h5>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            editEntry();
                        }}>
                        <label>Display Name</label>
                        <input
                            className="mb-4"
                            type="text"
                            value={editFormState.displayName}
                            onChange={(e) =>
                                setEditFormState({
                                    ...editFormState,
                                    displayName: e.target.value,
                                })
                            }
                        />
                        <label>First Name</label>
                        <input
                            className="mb-4"
                            type="text"
                            value={editFormState.firstName}
                            onChange={(e) =>
                                setEditFormState({
                                    ...editFormState,
                                    firstName: e.target.value,
                                })
                            }
                        />
                        <label>Last Name</label>
                        <input
                            className="mb-4"
                            type="text"
                            value={editFormState.lastName}
                            onChange={(e) =>
                                setEditFormState({
                                    ...editFormState,
                                    lastName: e.target.value,
                                })
                            }
                        />
                        <label>Email</label>
                        <input
                            className="mb-4"
                            type="text"
                            value={editFormState.email}
                            onChange={(e) =>
                                setEditFormState({
                                    ...editFormState,
                                    email: e.target.value,
                                })
                            }
                        />
                        <div className="mb-4 row">
                            <div className="col-4">
                                <label>Score One</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={editFormState.scoreOne}
                                    onChange={(e) =>
                                        setEditFormState({
                                            ...editFormState,
                                            scoreOne: parseInt(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            <div className="col-4">
                                <label>Score Two</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={editFormState.scoreTwo}
                                    onChange={(e) =>
                                        setEditFormState({
                                            ...editFormState,
                                            scoreTwo: parseInt(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            <div className="col-4">
                                <label>Score</label>
                                <input
                                    readOnly
                                    type="number"
                                    min={1}
                                    value={scoreCalc(
                                        editFormState.scoreOne,
                                        editFormState.scoreTwo
                                    )}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <button
                                    className="btn btn-success"
                                    type="submit">
                                    Submit
                                </button>
                            </div>
                            <div className="col-6 text-end">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        document
                                            .getElementById(props.id)
                                            .close();
                                        document.body.style.overflow = "auto";
                                    }}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </dialog>
    );
}

function ContestantRow(props) {
    const contestant = props.contestant;
    const index = props.index;
    return (
        <div>
            <div className="row p-3 contestant-back mb-1">
                <div className="col-1">
                    <strong>{index + 1}</strong>
                </div>
                <div className="col-5 ">
                    <strong>Display:</strong>{" "}
                    {contestant.attributes.displayName}
                </div>
                <div className="col-3">
                    <strong>1st:</strong> {contestant.attributes.scoreOne}
                </div>
                <div className="col-3 text-end">
                    <button
                        onClick={() => {
                            document.getElementById(contestant.id).showModal();
                            document.body.style.overflow = "hidden";
                        }}
                        className="btn btn-warning">
                        Edit
                    </button>
                </div>
                <div className="col-5 offset-1">
                    <strong>Name:</strong>{" "}
                    {contestant.attributes.firstName +
                        " " +
                        contestant.attributes.lastName}
                </div>
                <div className="col-2">
                    <strong>2nd:</strong> {contestant.attributes.scoreTwo}
                </div>
                <div className="col-5 offset-1">
                    <strong>Email:</strong> {contestant.attributes.email}
                </div>
                <div className="col-3">
                    <strong>Final:</strong> {contestant.attributes.score}
                </div>
                <div className="col-3 text-end">
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            document
                                .getElementById("delete-" + contestant.id)
                                .showModal();
                            document.body.style.overflow = "hidden";
                        }}>
                        Delete
                    </button>
                </div>
            </div>
            <DeleteModal id={contestant.id} data={contestant} />
            <EditModal id={contestant.id} data={contestant} />
        </div>
    );
}
