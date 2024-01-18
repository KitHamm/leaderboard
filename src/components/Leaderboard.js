// Apollo imports
import { useQuery } from "@apollo/client";
// Component imports
import { LeaderboardView } from "../components/Queries";
import TodayLeaderboard from "./leaderboards/TodayLeaderboard";
import AllTimeLeaderboard from "./leaderboards/AllTimeLeaderboardV";
import NowLeaderboard from "./leaderboards/NowLeaderboard";
// suffix usage for leaderboard placement
export const suffix = [
    "ST",
    "ND",
    "RD",
    "TH",
    "TH",
    "TH",
    "TH",
    "TH",
    "TH",
    "TH",
];

export default function Leaderboard() {
    // poll strapi for which leaderboard to view on the main display
    const {
        loading: loadingView,
        error: errorView,
        data: dataView,
    } = useQuery(LeaderboardView, { pollInterval: 3000 });
    if (loadingView) return <LodErView text="Loading..." />;
    if (errorView) return <LodErView text="Error" />;
    if (dataView)
        // switch case for the main display leaderboard
        switch (dataView.leaderboardView.data.attributes.view) {
            case "now":
                return (
                    <NowLeaderboard
                        updatedAt={
                            dataView.leaderboardView.data.attributes.updatedAt
                        }
                    />
                );
            case "allTime":
                return <AllTimeLeaderboard />;
            default:
                return <TodayLeaderboard />;
        }
}
// Error display component
export function LodErView(props) {
    return (
        <div className="row">
            <div className="col-12 text-center">
                <h2 className="lod-er-view">{props.text}</h2>
            </div>
        </div>
    );
}
