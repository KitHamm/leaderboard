import { useMutation } from "@apollo/client";
import { NEWENTRY } from "../components/Queries";
import { useEffect, useState } from "react";
export default function EntryForm() {
    const [success, setSuccess] = useState(false);
    const [accept, setAccept] = useState(false);
    const [formState, setFormState] = useState({
        displayName: "",
        firstName: "",
        lastName: "",
        email: "",
        scoreOne: 0,
        scoreTwo: 0,
    });
    const [createEntry, { loading, error, data }] = useMutation(NEWENTRY, {
        variables: {
            displayName: formState.displayName,
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            scoreOne: formState.scoreOne,
            scoreTwo: formState.scoreTwo,
        },
    });
    useEffect(() => {
        if (data !== undefined) {
            if (data.id) {
                console.log(data.id);
                setSuccess(true);
            }
        }
    }, [data]);
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
    if (success) {
        return (
            <div className="row">
                <div className="col-12 entry text-center">
                    <div className="col-8 offset-2">Success!</div>
                    <div className="col-2">
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                window.location.reload();
                            }}>
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    if (data) {
        return (
            <div className="row">
                <div className="col-12 entry text-center">
                    <div className="col-8 offset-2">Success!</div>
                    <div className="col-2">
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                window.location.reload();
                            }}>
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        );
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
                            createEntry();
                            //window.location.reload();
                        }}>
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
                                type="text"
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
                                type="checkbox"
                                onChange={() => {
                                    setAccept(!accept);
                                }}
                            />
                        </div>
                        <div className="col-10 mb-4">I accept blah blah</div>
                        {accept ? (
                            <>
                                <div className="col-6 mb-4">
                                    <label>First Score</label>
                                    <input
                                        required
                                        //value={formState.scoreOne}
                                        onChange={(e) =>
                                            setFormState({
                                                ...formState,
                                                scoreOne: parseInt(
                                                    e.target.value
                                                ),
                                            })
                                        }
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
                                        onChange={(e) =>
                                            setFormState({
                                                ...formState,
                                                scoreTwo: parseInt(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                        type="number"
                                        min={1}
                                        placeholder="Score"
                                    />
                                </div>
                                <div className="col-4">
                                    <button
                                        className="btn btn-success"
                                        type="submit">
                                        Submit
                                    </button>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
