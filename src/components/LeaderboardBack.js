// Apollo imports
import { useQuery, useMutation } from "@apollo/client";
// React imports
import { useContext } from "react";
// gql query imports
import {
    LeaderboardView,
    updateView,
    AllTimeLeaders,
    TodayLeadersBoard,
    NowLeadersBoard,
} from "./Queries";
// component imports
import ContestantRow from "./ContestantRow";
import { viewContext } from "../pages/Dashboard";

export default function LeaderboardBack() {
    document.body.style.overflow = "auto";
    /* eslint-disable no-unused-vars */
    const [view, setView] = useContext(viewContext);
    const [selectView] = useMutation(updateView);
    const { loading, error, data } = useQuery(LeaderboardView, {
        fetchPolicy: "no-cache",
        pollInterval: 1000,
    });
    /* eslint-enable no-unused-vars */
    function handleClear() {
        selectView({ variables: { view: "now" } });
    }

    if (loading) {
        return (
            <div className="row mt-5 p-1 contestant">
                <div className="col-12 text-center">Loading...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="row mt-5 p-1 contestant">
                <div className="col-12  text-center">Error.</div>
            </div>
        );
    }
    if (data)
        return (
            <>
                <div className="row mt-5 top-title mb-4">
                    <div className="col-3">
                        <button
                            className="btn btn-danger"
                            onClick={(e) => {
                                setView(1);
                            }}>
                            Back
                        </button>
                    </div>
                    <div className="col-6 text-center">
                        <h4>Displayed Leaderboard</h4>
                    </div>
                    <div className="col-3 text-end">
                        {/* no longer desired by client */}
                        {/*<button
                            className="btn btn-danger"
                            onClick={(e) => {
                                document
                                    .getElementById("clear-dialog")
                                    .showModal();
                                document.body.style.overflow = "hidden";
                            }}>
                            Clear
                        </button>*/}
                    </div>
                </div>
                {/* switch component for the selected leaderboard view */}
                <LeaderboardViewSwitch
                    view={data.leaderboardView.data.attributes.view}
                    updatedAt={data.leaderboardView.data.attributes.updatedAt}
                />
                <dialog id="clear-dialog">
                    <div className="row mb-4">
                        <div className="col-12 text-center">
                            <h4>Are you sure?</h4>
                        </div>
                        <div className="col-12">
                            It is advised not to use this function, this was
                            created for testing purposes. The daily leaderboard
                            will automatically reset each day.
                            <br />
                            <br />
                            Clearing the leader board will remove the current
                            contestants from view, but will not delete the
                            contestants from todays competition or overall
                            competition. The leader board will display
                            contestants added from the time that you clear the
                            board and will continue to do so until another view
                            is selected. Todays leader board, or the overall
                            leaderboard, can be displayed again from the main
                            dashboard.
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClear();
                                    document
                                        .getElementById("clear-dialog")
                                        .close();
                                    document.body.style.overflow = "auto";
                                }}>
                                Clear
                            </button>
                        </div>
                        <div className="col-6 text-end">
                            <button
                                className="btn btn-success"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .getElementById("clear-dialog")
                                        .close();
                                    document.body.style.overflow = "auto";
                                }}>
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            </>
        );
}
// switch component for the selected leaderboard view
function LeaderboardViewSwitch(props) {
    switch (props.view) {
        case "now":
            return <NowLeaderboardComp updatedAt={props.updatedAt} />;
        case "allTime":
            return <AllTimeLeaderboardComp />;
        default:
            return <TodayLeaderboardComp />;
    }
}
// All different mini leaderboard views
// Should consider DRY.
function NowLeaderboardComp(props) {
    var showData = [];
    const { loading, error, data } = useQuery(NowLeadersBoard, {
        variables: { now: props.updatedAt },
        pollInterval: 1000,
        fetchPolicy: "no-cache",
    });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (data) {
        data.lbs.data.slice(0, 9).forEach((contestant) => {
            showData.push({
                id: contestant.id,
                displayName: contestant.attributes.displayName,
                firstName: contestant.attributes.firstName,
                lastName: contestant.attributes.lastName,
                email: contestant.attributes.email,
                scoreOne: contestant.attributes.scoreOne,
                scoreTwo: contestant.attributes.scoreTwo,
                score: contestant.attributes.score,
                dob: contestant.attributes.dob,
                age: contestant.attributes.age,
            });
        });
        return data.lbs.data.length > 0 ? (
            showData.map((contestant, index) => {
                return (
                    <ContestantRow
                        key={contestant.displayName + index}
                        contestant={contestant}
                        index={index}
                    />
                );
            })
        ) : (
            <div className="row p-1 contestant">
                <div className="col-12 text-center">No Entries.</div>
            </div>
        );
    }
}

function TodayLeaderboardComp() {
    var showData = [];
    const today = new Date().toJSON().split("T")[0];
    var todayVar = today + "T00:00:00.000Z";
    const { loading, error, data } = useQuery(TodayLeadersBoard, {
        variables: { today: todayVar },
        pollInterval: 1000,
        fetchPolicy: "no-cache",
    });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (data) {
        data.lbs.data.slice(0, 9).forEach((contestant) => {
            showData.push({
                id: contestant.id,
                displayName: contestant.attributes.displayName,
                firstName: contestant.attributes.firstName,
                lastName: contestant.attributes.lastName,
                email: contestant.attributes.email,
                scoreOne: contestant.attributes.scoreOne,
                scoreTwo: contestant.attributes.scoreTwo,
                score: contestant.attributes.score,
                dob: contestant.attributes.dob,
                age: contestant.attributes.age,
            });
        });
        return data.lbs.data.length > 0 ? (
            showData.map((contestant, index) => {
                return (
                    <ContestantRow
                        key={contestant.displayName + index}
                        contestant={contestant}
                        index={index}
                    />
                );
            })
        ) : (
            <div className="row p-1 contestant">
                <div className="col-12 text-center">No Entries.</div>
            </div>
        );
    }
}

function AllTimeLeaderboardComp() {
    var showData = [];
    const { loading, error, data } = useQuery(AllTimeLeaders, {
        pollInterval: 1000,
        fetchPolicy: "no-cache",
    });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (data) {
        data.lbs.data.forEach((contestant) => {
            showData.push({
                id: contestant.id,
                displayName: contestant.attributes.displayName,
                firstName: contestant.attributes.firstName,
                lastName: contestant.attributes.lastName,
                email: contestant.attributes.email,
                scoreOne: contestant.attributes.scoreOne,
                scoreTwo: contestant.attributes.scoreTwo,
                score: contestant.attributes.score,
                dob: contestant.attributes.dob,
                age: contestant.attributes.age,
            });
        });
        return data.lbs.data.length > 0 ? (
            showData.map((contestant, index) => {
                return (
                    <ContestantRow
                        key={contestant.displayName + index}
                        contestant={contestant}
                        index={index}
                    />
                );
            })
        ) : (
            <div className="row p-1 contestant">
                <div className="col-12 text-center">No Entries.</div>
            </div>
        );
    }
}
