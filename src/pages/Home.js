import Leaderboard from "../components/Leaderboard";

export default function Home() {
    return (
        <div className="container">
            <div className="row mt-5 text-center">
                <div className="col-12">
                    <h1>Leaderboard</h1>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="leaderboard">
                        <Leaderboard />
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}
