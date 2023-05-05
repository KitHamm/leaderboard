import { useMutation } from "@apollo/client";
import { NEWENTRY } from "../components/Queries";
import { useState } from "react";
export default function EntryForm() {
    const [formState, setFormState] = useState({
        name: "",
        score: 0,
    });
    console.log(formState);
    const [createEntry, { loading, error, data }] = useMutation(NEWENTRY, {
        variables: {
            name: formState.name,
            score: formState.score,
        },
    });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (data) {
        window.location.reload();
    }
    return (
        <div className="row">
            <div className="col-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createEntry();
                    }}>
                    <div className="col-6">
                        <input
                            required
                            value={formState.name}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    name: e.target.value,
                                })
                            }
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                    <div className="col-6">
                        <input
                            required
                            value={formState.score}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    score: parseInt(e.target.value),
                                })
                            }
                            type="number"
                            min="1"
                            placeholder="Score"
                        />
                    </div>
                    <div className="col">
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
