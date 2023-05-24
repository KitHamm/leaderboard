import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Loading from "./Loading";
import {
    LB,
    DELETEENTRY,
    EDITENTRY,
    CREATEARCHIVE,
} from "../components/Queries";

export default function BeLeaderBoard() {
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        score: 0,
    });
    const [Edit, setEdit] = useState(0);
    const [archiveBoard, setArchiveBoard] = useState([{}]);

    const [deleteEntry, { loadingDelete, errorDelete, dataDelete }] =
        useMutation(DELETEENTRY);
    const [editEntry, { loadingEdit, errorEdit, dataEdit }] =
        useMutation(EDITENTRY);
    const [createArchive, { loadingArchive, errorArchive, dataArchive }] =
        useMutation(CREATEARCHIVE);
    const { loading, error, data } = useQuery(LB, { pollInterval: 500 });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    function handleEdit(id, name, score) {
        setEdit(id);
        setFormState({ name: name, score: score });
    }
    function handleArchive() {
        let text =
            "Are you sure? This action will archive the leaderboard and cannot be undone.";

        if (window.confirm(text) === true) {
            var names = ["", "", "", "", "", "", "", "", "", ""];
            var scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let index = 0; index < 10; index++) {
                if (data.lbs.data[index]) {
                    names[index] = data.lbs.data[index].attributes.name;
                    scores[index] = data.lbs.data[index].attributes.score;
                }
            }
            createArchive({
                variables: {
                    name1: names[0],
                    score1: scores[0],
                    name2: names[1],
                    score2: scores[1],
                    name3: names[2],
                    score3: scores[2],
                    name4: names[3],
                    score4: scores[3],
                    name5: names[4],
                    score5: scores[4],
                    name6: names[5],
                    score6: scores[5],
                    name7: names[6],
                    score7: scores[6],
                    name8: names[7],
                    score8: scores[7],
                    name9: names[8],
                    score9: scores[8],
                    name10: names[9],
                    score10: scores[9],
                },
            });
            for (let index = 0; index < data.lbs.data.length; index++) {
                deleteEntry({
                    variables: { id: data.lbs.data[index].id },
                });
            }
            setIsLoading(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            console.log("Canceled");
        }
    }
    if (isLoading) return <Loading />;
    return (
        <>
            <div className="row mb-4">
                <div className="col-3">
                    <button
                        onClick={handleArchive}
                        type="submit"
                        className="btn btn-danger">
                        (!) Clear Board (!)
                    </button>
                </div>
            </div>

            {data.lbs.data.slice(0, 10).map((contestant, index) => {
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
                            className="row entry">
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
                                    onChange={(e) => {
                                        if (e.target.value != "") {
                                            setFormState({
                                                ...formState,
                                                score: parseInt(e.target.value),
                                            });
                                        } else {
                                            setFormState({
                                                ...formState,
                                                score: e.target.value,
                                            });
                                        }
                                    }}
                                    type="number"
                                    placeholder="Score"
                                />
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn">
                                    Submit
                                </button>
                                <button
                                    onClick={() => handleEdit(0, "", "")}
                                    className="btn">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    );
                } else
                    return (
                        <div
                            key={contestant.attributes.name}
                            className={
                                index === 0
                                    ? "row contestant winner"
                                    : "row contestant"
                            }>
                            <div className="col-2 text-center">
                                <h3>{index + 1}</h3>
                            </div>
                            <div className="col-4">
                                <h3>{contestant.attributes.name}</h3>
                            </div>
                            <div className="col-4">
                                <h3> Score: {contestant.attributes.score}</h3>
                            </div>
                            <div className="col-2">
                                <button
                                    className="btn btn-warning me-3 ms-3"
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
                                    className="btn btn-danger"
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
            <EmptyRows amount={10 - data.lbs.data.length} />
        </>
    );
}
function EmptyRows(props) {
    let filled = 10 - props.amount;
    let rows = [];
    for (let index = 0; index < props.amount; index++) {
        rows.push(
            <div key={filled + index + 1} className="row contestant">
                <div className="col-2 text-center">
                    <h3>{filled + index + 1}</h3>
                </div>
                <div className="col-4">
                    <h3></h3>
                </div>
                <div className="col-4">
                    <h3> Score: </h3>
                </div>
            </div>
        );
    }
    return rows;
}
