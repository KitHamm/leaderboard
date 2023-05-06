import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { LB, DELETEENTRY, EDITENTRY } from "../components/Queries";

export default function BeLeaderBoard() {
    const [formState, setFormState] = useState({
        name: "",
        score: 0,
    });
    const [Edit, setEdit] = useState(0);
    const [deleteEntry, { loadingDelete, errorDelete, dataDelete }] =
        useMutation(DELETEENTRY);
    const [editEntry, { loadingEdit, errorEdit, dataEdit }] =
        useMutation(EDITENTRY);
    const { loading, error, data } = useQuery(LB, { pollInterval: 500 });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    function handleEdit(id, name, score) {
        setEdit(id);
        setFormState({ name: name, score: score });
    }
    return (
        <>
            {data.lbs.data.slice(0, 10).map((contestant) => {
                if (contestant.id == Edit) {
                    return (
                        <form
                            key={contestant.id}
                            onSubmit={(e) => {
                                e.preventDefault();
                                setEdit(0);
                                editEntry({
                                    variables: {
                                        id: contestant.id,
                                        name: formState.name,
                                        score: formState.score,
                                    },
                                });
                            }}
                            className="row">
                            <div className="col-4">
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
                            <div className="col-4">
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
                                    placeholder="Score"
                                />
                            </div>
                            <div className="col-4">
                                <button className="btn">Submit</button>
                            </div>
                        </form>
                    );
                } else
                    return (
                        <div
                            key={contestant.attributes.name}
                            className="row entry fade-in">
                            <div className="col-4">
                                <h3> Name: {contestant.attributes.name}</h3>
                            </div>
                            <div className="col-4">
                                <h3> Score: {contestant.attributes.score}</h3>
                            </div>
                            <div className="col-4">
                                <button
                                    className="btn"
                                    onClick={() =>
                                        handleEdit(
                                            contestant.id,
                                            contestant.attributes.name,
                                            contestant.attributes.score
                                        )
                                    }>
                                    Edit
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        deleteEntry({
                                            variables: { id: contestant.id },
                                        });
                                    }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
            })}
        </>
    );
}
