import Leaderboard from "../components/Leaderboard";

export default function Home() {
    return (
        <div className="container">
            <div className="row top">
                <div className="mt-auto row mb-auto">
                    <div className="col-1 m-auto">
                        <img
                            alt="cup"
                            className="cup"
                            src="leaderboard/cup.png"
                        />
                    </div>
                    <div className="col-8 m-auto">
                        <h1>LEADERBOARD</h1>
                    </div>
                </div>
            </div>
            <div className="row middle">
                <div className="col-12">
                    <div className="leaderboard">
                        <Leaderboard />
                    </div>
                </div>
            </div>
        </div>
    );
}
