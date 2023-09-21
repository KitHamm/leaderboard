import { useQuery } from "@apollo/client";
import { PlaceAllTime, PlaceToday } from "./Queries";
import { suffix } from "./Leaderboard";

export default function Placed(props) {
    const today = new Date().toJSON().split("T")[0];
    var todayVar = today + "T00:00:00.000Z";
    const {
        loading: loadingToday,
        error: errorToday,
        data: dataToday,
    } = useQuery(PlaceToday, {
        variables: { today: todayVar },
        fetchPolicy: "no-cache",
    });
    const {
        loading: loadingAllTime,
        error: errorAllTime,
        data: dataAllTime,
    } = useQuery(PlaceAllTime, { fetchPolicy: "no-cache" });
    if (loadingToday || loadingAllTime)
        return (
            <div className="row">
                <div className="col-12 entry text-center">
                    <div className="col-12">Loading Results</div>
                </div>
            </div>
        );

    if (errorToday || errorAllTime)
        return (
            <div className="row">
                <div className="col-12 entry text-center">
                    <div className="col-12">Error Getting Results</div>
                </div>
            </div>
        );

    if (dataToday && dataAllTime) {
        console.log(dataToday);
        console.log(dataAllTime);
        var todayIDs = [];
        var allTimeIDs = [];
        dataToday.lbs.data.map((id, index) => {
            todayIDs.push(id.id);
            return null;
        });
        dataAllTime.lbs.data.map((id, index) => {
            allTimeIDs.push(id.id);
            return null;
        });
        var placeToday = todayIDs.indexOf(props.id) + 1;
        var placeAllTime = allTimeIDs.indexOf(props.id) + 1;

        return (
            <div className="row entry">
                <div className="col-12 text-center mb-4">
                    <h4>Results</h4>
                </div>
                <div className="col-6 text-center mb-4">Today</div>
                <div className="col-6 text-center mb-4">All Time</div>
                <div className="col-6 text-center mb-4">
                    You Placed {placeToday + suffix[placeToday]}
                </div>
                <div className="col-6 text-center mb-4">
                    You Placed {ordinal_suffix_of(placeAllTime)}
                </div>
                <div className="col-12 text-end">
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            window.location.reload();
                        }}>
                        Finish
                    </button>
                </div>
            </div>
        );
    }
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "ST";
    }
    if (j === 2 && k !== 12) {
        return i + "ND";
    }
    if (j === 3 && k !== 13) {
        return i + "RD";
    }
    return i + "TH";
}
