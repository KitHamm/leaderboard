// React imports
import { useState, useEffect } from "react";
// Apollo imports
import { useMutation } from "@apollo/client";
// gql query imports
import { EDITENTRY } from "./Queries";

export default function EditModal(props) {
    // verification state and form state
    const [ageVerifiedText, setAgeVerifyText] = useState("");
    const [editFormState, setEditFormState] = useState({
        id: props.data.id,
        displayName: props.data.displayName,
        firstName: props.data.firstName,
        lastName: props.data.lastName,
        email: props.data.email,
        scoreOne: props.data.scoreOne,
        scoreTwo: props.data.scoreTwo,
        score: props.data.score,
        age: props.data.age,
        dob: props.data.dob,
    });
    // edit entry mutation
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
            age: editFormState.age,
            dob: editFormState.dob,
        },
    });
    // score calculator !simplified since confirmation from client on game rules.
    // No longer using difference, now using sum of scores.
    function scoreCalc(scoreOne, scoreTwo) {
        let score;
        score = scoreOne + scoreTwo;
        return score;
    }
    // set age verified
    function ageVerification(date) {
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age >= 18) {
            setAgeVerifyText("");
            setEditFormState({
                ...editFormState,
                dob: date,
                age: age,
            });
        } else {
            setAgeVerifyText("Players must be 18 or over to participate.");
            setEditFormState({
                ...editFormState,
                dob: "",
            });
        }
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
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.reload();
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h5 className="mb-5">Editing {props.data.displayName}</h5>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            editEntry();
                        }}>
                        <div className="row row-cols-2">
                            <div className="col">
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
                            </div>
                            <div className="col">
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
                            </div>
                            <div className="col">
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
                            </div>
                            <div className="col">
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
                            </div>
                            <div className="col">
                                <label>DOB</label>
                                <input
                                    type="date"
                                    className="mb-4"
                                    value={editFormState.dob}
                                    onChange={(e) =>
                                        ageVerification(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col">
                                <label>Age</label>
                                <input
                                    type="number"
                                    value={editFormState.age}
                                    readOnly
                                />
                            </div>
                        </div>
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
                            <div className="col mb-4">{ageVerifiedText}</div>
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
                                        window.location.reload();
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
