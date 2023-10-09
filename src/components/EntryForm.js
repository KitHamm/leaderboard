import { useMutation } from "@apollo/client";
import { NEWENTRY } from "../components/Queries";
import { useState, useEffect } from "react";
import Placed from "./Placed";
import Terms from "./terms";
export default function EntryForm() {
    const [emailText, setEmailText] = useState("");
    const [view, setView] = useState(1);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [formState, setFormState] = useState({
        displayName: "",
        firstName: "",
        lastName: "",
        email: "",
        scoreOne: 0,
        scoreTwo: 0,
        score: 0,
    });
    const [createEntry, { loading, error, data }] = useMutation(NEWENTRY, {
        variables: {
            displayName: formState.displayName,
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            scoreOne: formState.scoreOne,
            scoreTwo: formState.scoreTwo,
            score: formState.score,
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
        setFormState({
            ...formState,
            score: scoreCalc(formState.scoreOne, formState.scoreTwo),
        });
    }, [formState.scoreOne, formState.scoreTwo]);

    function handleValidation() {
        var div = document.getElementById("emailText");
        setEmailText("");
        if (formState.email.split("@").length === 2) {
            if (
                formState.email.split("@")[1].split(".").length > 1 &&
                formState.email.split("@")[1].split(".").length < 4
            ) {
                if (formState.email.split("@")[1].split(".")[1].length > 0) {
                    //console.log("Valid");
                    setView(2);
                } else {
                    //console.log("Not Valid");
                    setEmailText("Please enter a valid email.");
                    div.classList.contains("fade-in-2")
                        ? div.classList.replace("fade-in-2", "fade-in-3")
                        : div.classList.replace("fade-in-3", "fade-in-2");
                }
            } else {
                //console.log("Not Valid");
                setEmailText("Please enter a valid email.");
                div.classList.contains("fade-in-2")
                    ? div.classList.replace("fade-in-2", "fade-in-3")
                    : div.classList.replace("fade-in-3", "fade-in-2");
            }
        } else {
            //console.log("Not Valid");
            setEmailText("Please enter a valid email.");
            div.classList.contains("fade-in-2")
                ? div.classList.replace("fade-in-2", "fade-in-3")
                : div.classList.replace("fade-in-3", "fade-in-2");
        }
    }

    function handleSubmit() {
        setFormState({
            ...formState,
            score: scoreCalc(formState.scoreOne, formState.scoreTwo),
        });
        createEntry();
    }

    if (loading)
        return (
            <div className="row">
                <div className="col-12 entry text-center">
                    <div className="col-8 offset-2">Submitting...</div>
                    <div className="col-2">
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                window.location.reload();
                            }}>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    if (error)
        return (
            <div className="row">
                <div className="col-12 entry text-center">
                    <div className="col-8 offset-2">Error :(</div>
                </div>
            </div>
        );
    if (data) {
        return <Placed id={data.createLb.data.id} />;
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="col-4 offset-8 text-end">
                        <button
                            onClick={() => {
                                window.location.reload();
                            }}
                            className="btn btn-danger"
                            type="submit">
                            Cancel
                        </button>
                    </div>
                    <form
                        className="row entry"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                        {view === 1 ? (
                            <>
                                <div className="col-6 mb-4">
                                    <label>Display Name</label>
                                    <input
                                        required
                                        value={formState.displayName}
                                        onChange={(e) =>
                                            setFormState({
                                                ...formState,
                                                displayName: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Email</label>
                                    <input
                                        required
                                        value={formState.email}
                                        onChange={(e) =>
                                            setFormState({
                                                ...formState,
                                                email: e.target.value,
                                            })
                                        }
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="col-6 mb-4">
                                    <label>First Name</label>
                                    <input
                                        required
                                        value={formState.firstName}
                                        onChange={(e) =>
                                            setFormState({
                                                ...formState,
                                                firstName: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Last Name</label>
                                    <input
                                        required
                                        value={formState.lastName}
                                        onChange={(e) =>
                                            setFormState({
                                                ...formState,
                                                lastName: e.target.value,
                                            })
                                        }
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className="col-1 offset-1 mb-4">
                                    <input
                                        id="terms-check"
                                        type="checkbox"
                                        onChange={() => {
                                            setAcceptTerms(!acceptTerms);
                                        }}
                                    />
                                </div>
                                <div className="col-10 mb-4">
                                    I have read and agree to the{" "}
                                    <strong
                                        style={{ textDecoration: "underline" }}
                                        onClick={(e) => {
                                            document
                                                .getElementById("terms-dialog")
                                                .showModal();
                                            document.body.style.overflow =
                                                "hidden";
                                        }}>
                                        Terms of Service
                                    </strong>
                                </div>
                                {acceptTerms &&
                                formState.displayName !== "" &&
                                formState.firstName !== "" &&
                                formState.lastName !== "" &&
                                formState.email !== "" ? (
                                    <>
                                        <div
                                            id="emailText"
                                            className="col-10 fade-in-2">
                                            {emailText}
                                        </div>
                                        <div className="col-2 text-end">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleValidation();
                                                    //setView(2);
                                                }}
                                                className="btn btn-success">
                                                Next
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="col-6 mb-4">
                                    <label>First Score</label>
                                    <input
                                        required
                                        //value={formState.scoreOne}
                                        onChange={(e) => {
                                            setFormState({
                                                ...formState,
                                                scoreOne: parseInt(
                                                    e.target.value
                                                ),
                                            });
                                        }}
                                        type="number"
                                        min={1}
                                        placeholder="Score"
                                    />
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Second Score</label>
                                    <input
                                        required
                                        //value={formState.scoreTwo}
                                        onChange={(e) => {
                                            setFormState({
                                                ...formState,
                                                scoreTwo: parseInt(
                                                    e.target.value
                                                ),
                                            });
                                        }}
                                        type="number"
                                        min={1}
                                        placeholder="Score"
                                    />
                                </div>
                                <div className="col-6 mb-4">
                                    <label>Final Score</label>
                                    <input
                                        required
                                        readOnly
                                        value={scoreCalc(
                                            formState.scoreOne,
                                            formState.scoreTwo
                                        )}
                                        type="number"
                                        min={1}
                                        placeholder="Score"
                                    />
                                </div>
                                <div className="col-6 text-end">
                                    <button
                                        className="btn btn-success"
                                        type="submit">
                                        Submit
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                    <dialog id="terms-dialog">
                        <div className="row mb-5">
                            <div className="col-10 offset-1">
                                <Terms />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 text-start">
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        setAcceptTerms(true);
                                        document.getElementById(
                                            "terms-check"
                                        ).checked = true;
                                        document
                                            .getElementById("terms-dialog")
                                            .close();
                                        document.body.style.overflow = "auto";
                                    }}>
                                    Agree
                                </button>
                            </div>
                            <div className="col-2 offset-8 text-end">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        document
                                            .getElementById("terms-dialog")
                                            .close();
                                        document.body.style.overflow = "auto";
                                    }}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </>
    );
}
