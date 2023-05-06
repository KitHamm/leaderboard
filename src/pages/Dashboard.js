import Leaderboard from "../components/Leaderboard";
import BeLeaderBoard from "../components/BeLeaderBoard";
import EntryForm from "../components/EntryForm";

export default function Dashboard() {
    return (
        <div className="container">
            <BeLeaderBoard />
            <EntryForm />
        </div>
    );
}
