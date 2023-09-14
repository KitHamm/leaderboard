import { useQuery } from "@apollo/client";
import { LB } from "../components/Queries";

const suffix = ["ST", "ND", "RD", "TH", "TH", "TH", "TH", "TH", "TH"];

export default function Leaderboard(props) {
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
                            props.admin === true
                                ? index === 0
                                    ? "row contestant back winner fade-in"
                                    : "row contestant back fade-in"
                                : index === 0
                                ? "row contestant front winner fade-in"
                                : "row contestant front fade-in"
                        }>
                        <div className="col-2 place text-center">
                            <h3>{index + 1}</h3>
                            <div className="suffix">{suffix[index]}</div>
                        </div>

                        <div className="col-7">
                            <h3 className="name">
                                {contestant.attributes.displayName}
                            </h3>
                        </div>
                        <div className="col-3">
                            <h3 className="score">
                                {contestant.attributes.score}
                            </h3>
                        </div>
                    </div>
                );
            })}
            <EmptyRows amount={9 - data.lbs.data.length} />
            <div className="row"></div>
        </>
    );
}

function EmptyRows(props) {
    let filled = 9 - props.amount;
    let rows = [];
    for (let index = 0; index < props.amount; index++) {
        rows.push(
            <div
                key={filled + index + 1}
                className={
                    props.admin === true
                        ? "row back contestant"
                        : "row front contestant"
                }>
                <div className="col-2 place text-center">
                    <h3>{filled + index + 1}</h3>
                    <div className="suffix">{suffix[filled + index]}</div>
                </div>
                <div className="col-7"></div>
                <div className="col-3">
                    <h3>0</h3>
                </div>
            </div>
        );
    }
    return rows;
}
