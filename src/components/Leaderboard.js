import { useState } from "react";
import { useQuery } from "@apollo/client";
import { LB } from "../components/Queries";

export default function Leaderboard() {
    const { loading, error, data } = useQuery(LB, { pollInterval: 500 });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    console.log(data);
    return (
        <>
            {data.lbs.data.slice(0, 10).map((contestant, index) => {
                return (
                    <div
                        key={contestant.attributes.name}
                        className="row contestant fade-in">
                        <div className="col-2 text-center">
                            <h3>{index + 1}</h3>
                        </div>
                        <div className="col-5">
                            <h3>{contestant.attributes.name}</h3>
                        </div>
                        <div className="col-5">
                            <h3> Score: {contestant.attributes.score}</h3>
                        </div>
                    </div>
                );
            })}
            <div className="row"></div>
        </>
    );
}
