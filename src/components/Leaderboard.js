import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LB } from "../components/Queries";

export default function Leaderboard() {
    const { loading, error, data } = useQuery(LB, { pollInterval: 500 });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return (
        <>
            {data.lbs.data.slice(0, 10).map((contestant, index) => {
                return (
                    <div
                        key={contestant.id}
                        className={
                            index === 0
                                ? "row contestant winner fade-in"
                                : "row contestant fade-in"
                        }>
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
            <EmptyRows amount={10 - data.lbs.data.length} />
            <div className="row"></div>
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
                <div className="col-5">
                    <h3></h3>
                </div>
                <div className="col-5">
                    <h3> Score: </h3>
                </div>
            </div>
        );
    }
    return rows;
}
