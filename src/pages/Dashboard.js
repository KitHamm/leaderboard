import BeLeaderBoard from "../components/BeLeaderBoard";
import EntryForm from "../components/EntryForm";
import Archive from "../components/Archived";

export default function Dashboard() {
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-12">
                    <div className="leaderboard">
                        <BeLeaderBoard />
                        <EntryForm />
                        <Archive />
                    </div>
                </div>
            </div>
        </div>
    );
}
