import BeLeaderBoard from "../components/BeLeaderBoard";
import EntryForm from "../components/EntryForm";

export default function Dashboard() {
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-12">
                    <div className="leaderboard">
                        <BeLeaderBoard />
                        <EntryForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
