import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { LB, DELETEENTRY } from "../components/Queries";

export default function BeLeaderBoard() {
    const [idState, setIdState] = useState({
        id: 0,
    });
    const [deleteEntry, { loading1, error1, data1 }] = useMutation(DELETEENTRY);
    const { loading, error, data } = useQuery(LB, { pollInterval: 500 });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    console.log(data);
    return (
        <div className="container">
            {data.lbs.data.slice(0, 10).map((contestant) => {
                return (
                    <div key={contestant.attributes.name} className="row">
                        <div className="col-4">
                            <h3> Name: {contestant.attributes.name}</h3>
                        </div>
                        <div className="col-4">
                            <h3> Score: {contestant.attributes.score}</h3>
                        </div>
                        <div className="col-4">
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
            <div className="row"></div>
        </div>
    );
}
