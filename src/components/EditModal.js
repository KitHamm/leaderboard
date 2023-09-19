import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDITENTRY } from "./Queries";

export default function EditModal(props) {
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
