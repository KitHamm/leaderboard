import { useQuery } from "@apollo/client";
import { LeaderboardView } from "../components/Queries";
import TodayLeaderboard from "./leaderboards/TodayLeaderboard";
import AllTimeLeaderboard from "./leaderboards/AllTimeLeaderboardV";
import NowLeaderboard from "./leaderboards/NowLeaderboard";

export const suffix = ["ST", "ND", "RD", "TH", "TH", "TH", "TH", "TH", "TH"];

export default function Leaderboard() {
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
