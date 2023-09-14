import { useState, useEffect } from "react";
import EntryForm from "../components/EntryForm";
import { useQuery, useMutation } from "@apollo/client";
import {
    LBBackend,
    AllContestantBackend,
    EDITENTRY,
    DELETEENTRY,
    setNoShow,
} from "../components/Queries";

export default function Dashboard() {
    const [view, setView] = useState(1);
    return (
        <>
            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-12 text-center">
                        <h3>Leaderboard</h3>
                    </div>
                </div>
                {view === 2 ? (
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
                            {view !== 1 ? (
                                <div className="col-2">
                                    <button
                                        onClick={() => setView(1)}
                                        className="btn btn-danger">
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
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
                    </>
                )}
                <View view={view} />
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
    const { loading, error, data } = useQuery(LBBackend, { pollInterval: 500 });
    const [
        updateShow,
        { loading: loadingShow, error: errorShow, data: dataShow },
    ] = useMutation(setNoShow);

    function handleNoShow(data) {
        data.forEach((element) => {
            updateShow({ variables: { id: element.id } });
        });
    }

    if (loading) {
        return (
            <div className="row p-1 contestant">
                <div className="col-12 text-center">Loading...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="row p-1 contestant">
                <div className="col-12  text-center">Error.</div>
            </div>
        );
    }
    if (data)
        return (
            <>
                <div className="row mt-5 mb-4">
                    <div className="col-6 offset-3 text-center">
                        <div style={{ color: "white" }}>
                            Current Leaderboard
                        </div>
                    </div>
                    {data.lbs.data.length > 0 ? (
                        <div className="col-3 text-end">
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                    handleNoShow(data.lbs.data);
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
                            <div
                                key={contestant.attributes.displayName + index}>
                                <div className="row p-1 contestant-back mb-1">
                                    <div className="col-1">{index + 1}</div>
                                    <div className="col-5">
                                        Display:{" "}
                                        {contestant.attributes.displayName}
                                    </div>
                                    <div className="col-2">
                                        1st: {contestant.attributes.scoreOne}
                                    </div>
                                    <div className="col-2">
                                        2nd: {contestant.attributes.scoreTwo}
                                    </div>
                                    <div className="col-2">
                                        Final: {contestant.attributes.score}
                                    </div>
                                    <div className="col-5 offset-1">
                                        Name:{" "}
                                        {contestant.attributes.firstName +
                                            " " +
                                            contestant.attributes.lastName}
                                    </div>

                                    <div className="col-5">
                                        Email: {contestant.attributes.email}
                                    </div>
                                    <div className="col-2 offset-8 mt-2 mb-2 text-center">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                document
                                                    .getElementById(
                                                        "delete-" +
                                                            contestant.id
                                                    )
                                                    .showModal();
                                                document.body.style.overflow =
                                                    "hidden";
                                            }}>
                                            Delete
                                        </button>
                                    </div>
                                    <div
                                        className="col-2 mt-2 mb-2 text-center"
                                        onClick={() => {
                                            document
                                                .getElementById(contestant.id)
                                                .showModal();
                                            document.body.style.overflow =
                                                "hidden";
                                        }}>
                                        <button className="btn btn-success">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                <DeleteModal
                                    id={contestant.id}
                                    data={contestant}
                                />
                                <EditModal
                                    id={contestant.id}
                                    data={contestant}
                                />
                            </div>
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

function LeaderboardAll() {
    const { loading, error, data } = useQuery(AllContestantBackend, {
        pollInterval: 500,
    });

    if (loading) {
        return (
            <div className="row p-1 contestant">
                <div className="col-12 text-center">Loading...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="row p-1 contestant">
                <div className="col-12  text-center">Error.</div>
            </div>
        );
    }
    if (data)
        return (
            <>
                <div className="row mt-5 mb-4">
                    <div className="col-6 offset-3 text-center">
                        <div style={{ color: "white" }}>All Entries</div>
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
                            <div
                                key={contestant.attributes.displayName + index}>
                                <div className="row p-1 contestant-back mb-1">
                                    <div className="col-1">{index + 1}</div>
                                    <div className="col-5">
                                        Display:{" "}
                                        {contestant.attributes.displayName}
                                    </div>
                                    <div className="col-2">
                                        1st: {contestant.attributes.scoreOne}
                                    </div>
                                    <div className="col-2">
                                        2nd: {contestant.attributes.scoreTwo}
                                    </div>
                                    <div className="col-2">
                                        Final: {contestant.attributes.score}
                                    </div>
                                    <div className="col-5 offset-1">
                                        Name:{" "}
                                        {contestant.attributes.firstName +
                                            " " +
                                            contestant.attributes.lastName}
                                    </div>

                                    <div className="col-5">
                                        Email: {contestant.attributes.email}
                                    </div>
                                    <div className="col-2 offset-8 mt-2 mb-2 text-center">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                document
                                                    .getElementById(
                                                        "delete-" +
                                                            contestant.id
                                                    )
                                                    .showModal();
                                                document.body.style.overflow =
                                                    "hidden";
                                            }}>
                                            Delete
                                        </button>
                                    </div>
                                    <div
                                        className="col-2 mt-2 mb-2 text-center"
                                        onClick={() => {
                                            document
                                                .getElementById(contestant.id)
                                                .showModal();
                                            document.body.style.overflow =
                                                "hidden";
                                        }}>
                                        <button className="btn btn-success">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                <DeleteModal
                                    id={contestant.id}
                                    data={contestant}
                                />
                                <EditModal
                                    id={contestant.id}
                                    data={contestant}
                                />
                            </div>
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
                        Edit {props.data.attributes.displayName}
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
