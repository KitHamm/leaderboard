import { useState } from "react";
import EntryForm from "../components/EntryForm";
export default function Dashboard() {
    const [view, setView] = useState(1);
    return (
        <>
            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-12 text-center">
                        <h3>Leaderboard</h3>
                    </div>
                </div>
                {view === 2 ? (
                    <></>
                ) : (
                    <>
                        <div className="row mb-3">
                            <div className="col-12 text-center">
                                <button
                                    onClick={() => {
                                        setView(2);
                                    }}
                                    className="btn btn-success">
                                    Add Contestant
                                </button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 text-center">
                                <button
                                    onClick={() => {
                                        setView(3);
                                    }}
                                    className="btn btn-success">
                                    View/Edit Leaderboard
                                </button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 text-center">
                                <button
                                    onClick={() => {
                                        setView(4);
                                    }}
                                    className="btn btn-success">
                                    View/Edit all contestants
                                </button>
                            </div>
                        </div>
                    </>
                )}
                <View view={view} />
            </div>
        </>
    );
}

function View(props) {
    switch (props.view) {
        case 1:
            return <></>;
        case 2:
            return <EntryForm />;
        case 3:
            return <div>Leaderboard</div>;
        case 4:
            return <div>All Contestants</div>;
        default:
            return <></>;
    }
}
