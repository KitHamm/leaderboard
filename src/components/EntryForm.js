import { useMutation } from "@apollo/client";
import { NEWENTRY } from "../components/Queries";
import { useState } from "react";
export default function EntryForm() {
    const [formState, setFormState] = useState({
        name: "",
        score: "",
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
    return (
        <div className="row">
            <div className="col-12">
                <form
                    className="row"
                    onSubmit={(e) => {
                        e.preventDefault();
                        createEntry();
                        setFormState({ name: "", score: 0 });
                    }}>
                    <div className="col-5">
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
                    <div className="col-5">
                        <input
                            required
                            value={formState.score}
                            onChange={(e) => {
                                if (e.target.value != "") {
                                    setFormState({
                                        ...formState,
                                        score: parseInt(e.target.value),
                                    });
                                }
                            }}
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
