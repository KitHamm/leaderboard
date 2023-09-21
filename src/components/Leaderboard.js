import { useQuery } from "@apollo/client";
import { LeaderboardView } from "../components/Queries";
import TodayLeaderboard from "./leaderboards/TodayLeaderboard";
import AllTimeLeaderboard from "./leaderboards/AllTimeLeaderboardV";
import NowLeaderboard from "./leaderboards/NowLeaderboard";

export const suffix = ["ST", "ND", "RD", "TH", "TH", "TH", "TH", "TH", "TH"];

export default function Leaderboard(props) {
    const {
        loading: loadingView,
        error: errorView,
        data: dataView,
    } = useQuery(LeaderboardView, { pollInterval: 3000 });
    if (loadingView) return <div>Loading...</div>;
    if (errorView) return <div>Error</div>;
    if (dataView)
        switch (dataView.leaderboardView.data.attributes.view) {
            case "now":
                return <NowLeaderboard />;
            case "allTime":
                return <AllTimeLeaderboard />;
            default:
                return <TodayLeaderboard />;
        }
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
