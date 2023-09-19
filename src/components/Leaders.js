import { useQuery } from "@apollo/client";
import { TodayLeadersBoard, AllTimeLeaders } from "./Queries";

export default function Leaders(props) {
    return (
        <div className="row backend-boards mt-3">
            <div className="col-12 text-center">
                <div className="col-12 mt-4">
                    <h5>Todays Leaderboard</h5>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="col-6 offset-2 text-start">Name</div>
                    <div className="col-3 text-end">Score</div>
                </div>
                <Today />
            </div>
            <div className="col-12 text-center">
                <div className="col-12 mt-4">
                    <h5>All Time Leaderboard</h5>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="col-6 offset-2 text-start">Name</div>
                    <div className="col-3 text-end">Score</div>
                </div>
                <AllTime />
            </div>
        </div>
    );
}
function Today() {
    const today = new Date().toJSON().split("T")[0];
    var todayVar = today + "T00:00:00.000Z";
    const {
        loading: loadingToday,
        error: errorToday,
        data: dataToday,
    } = useQuery(
        TodayLeadersBoard,
        {
            fetchPolicy: "no-cache",
        },
        {
            variables: { today: todayVar },
        }
    );
    if (loadingToday) return <div>Loading...</div>;
    if (errorToday) return <div>Error.</div>;
    if (dataToday)
        return (
            <>
                {dataToday.lbs.data.length > 0 ? (
                    dataToday.lbs.data.map((contestant, index) => {
                        return (
                            <Contestant
                                key={contestant.attributes.displayName + index}
                                contestant={contestant}
                                index={index}
                            />
                        );
                    })
                ) : (
                    <div>No Entries</div>
                )}
            </>
        );
}

function AllTime() {
    const {
        loading: loadingAllTime,
        error: errorAllTime,
        data: dataAllTime,
    } = useQuery(AllTimeLeaders, {
        fetchPolicy: "no-cache",
    });

    if (loadingAllTime) return <div>Loading...</div>;

    if (errorAllTime) return <div>Error</div>;
    if (dataAllTime)
        return (
            <>
                {dataAllTime.lbs.data.length > 0 ? (
                    dataAllTime.lbs.data.map((contestant, index) => {
                        return (
                            <Contestant
                                key={contestant.attributes.displayName + index}
                                contestant={contestant}
                                index={index}
                            />
                        );
                    })
                ) : (
                    <div>No Entries</div>
                )}
            </>
        );
}

function Contestant(props) {
    return (
        <div className="row">
            <div className="col-1 offset-1 text-start">{props.index + 1}</div>
            <div className="col-6 text-start">
                {props.contestant.attributes.displayName}
            </div>
            <div className="col-3 text-end">
                {props.contestant.attributes.score}
            </div>
        </div>
    );
}
