import { suffix } from "./Leaderboard";

export default function EmptyRows(props) {
    let filled = 9 - props.amount;
    let rows = [];
    for (let index = 0; index < props.amount; index++) {
        rows.push(
            <div
                key={filled + index + 1}
                className={
                    props.admin === true
                        ? "row back fade-in contestant"
                        : "row front fade-in contestant"
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
