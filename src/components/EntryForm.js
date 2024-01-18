// Apollo imports
import { useMutation } from "@apollo/client";
// gql query imports
import { NEWENTRY } from "../components/Queries";
// React imports
import { useState, useEffect } from "react";
// component imports
import Placed from "./Placed";
import Terms from "./terms";

export default function EntryForm() {
    // entry form states and form state
    const [emailText, setEmailText] = useState("");
    const [view, setView] = useState(1);
    const [ageVerifyText, setAgeVerifyText] = useState("");
    const [ageVerified, setAgeVerified] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [formState, setFormState] = useState({
        displayName: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        age: "",
        scoreOne: 0,
        scoreTwo: 0,
        score: 0,
    });
    // create entry mutation
    const [createEntry, { loading, error, data }] = useMutation(NEWENTRY, {
        variables: {
            displayName: formState.displayName,
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            dob: formState.dob,
            age: formState.age,
            scoreOne: formState.scoreOne,
            scoreTwo: formState.scoreTwo,
            score: formState.score,
        },
    });
    // score calculator !simplified since confirmation from client on game rules.
    // No longer using difference, now using sum of scores.
    // Should be exported and imported, this is not DRY.
    function scoreCalc(scoreOne, scoreTwo) {
        let score;
        score = scoreOne + scoreTwo;
        return score;
    }

    // update total score on change
    useEffect(() => {
        setFormState({
            ...formState,
            score: scoreCalc(formState.scoreOne, formState.scoreTwo),
        });
    }, [formState.scoreOne, formState.scoreTwo]);

    // form validation
    function handleValidation() {
        var div = document.getElementById("emailText");
        setEmailText("");
        if (formState.email.split("@").length === 2) {
            if (
                formState.email.split("@")[1].split(".").length > 1 &&
                formState.email.split("@")[1].split(".").length < 4
            ) {
                if (formState.email.split("@")[1].split(".")[1].length > 0) {
                    setView(2);
                } else {
                    setEmailText("Please enter a valid email.");
                    div.classList.contains("fade-in-2")
                        ? div.classList.replace("fade-in-2", "fade-in-3")
                        : div.classList.replace("fade-in-3", "fade-in-2");
                }
            } else {
                setEmailText("Please enter a valid email.");
                div.classList.contains("fade-in-2")
                    ? div.classList.replace("fade-in-2", "fade-in-3")
                    : div.classList.replace("fade-in-3", "fade-in-2");
            }
        } else {
            setEmailText("Please enter a valid email.");
            div.classList.contains("fade-in-2")
                ? div.classList.replace("fade-in-2", "fade-in-3")
                : div.classList.replace("fade-in-3", "fade-in-2");
        }
    }
    // set age verified
    // should be exported and imported. This is not DRY.
    function ageVerification(date) {
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        console.log(age);
        if (age >= 18) {
            setAgeVerified(true);
            setAgeVerifyText("");
            setFormState({
                ...formState,
                dob: date,
                age: age,
            });
        } else {
            setAgeVerifyText("Players must be 18 or over to participate.");
            setFormState({
                ...formState,
                dob: "",
            });
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
                    <form
                        className="row mt-5 entry"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                        <div className="col-4 offset-4 mb-4 text-center">
                            <h4>New Contestant</h4>
                        </div>
                        <div className="col-4 mb-4 text-end">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.reload();
                                }}
                                className="btn btn-danger"
                                type="submit">
                                Cancel
                            </button>
                        </div>
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
                                <div className="col-6 mb-4">
                                    <label>Date Of Birth</label>
                                    <input
                                        value={formState.dob}
                                        onChange={(e) => {
                                            ageVerification(e.target.value);
                                        }}
                                        type="date"
                                        required
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
                                <div className="col-4 mb-4">
                                    I have read and agree to the
                                    <br />
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
                                <div
                                    id="emailText"
                                    className="col-10 fade-in-2">
                                    {ageVerifyText}
                                </div>
                                {
                                    // only allow next state button if form is filled
                                    acceptTerms &&
                                    formState.displayName !== "" &&
                                    formState.firstName !== "" &&
                                    formState.lastName !== "" &&
                                    formState.email !== "" &&
                                    formState.dob !== "" &&
                                    ageVerified ? (
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
                                    )
                                }
                            </>
                        ) : (
                            <>
                                <div className="col-6 mb-4">
                                    <label>First Score</label>
                                    <input
                                        required
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
