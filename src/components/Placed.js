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
    });
    const {
        loading: loadingAllTime,
        error: errorAllTime,
        data: dataAllTime,
    } = useQuery(PlaceAllTime);
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
                    You Placed {placeToday + suffix[placeToday - 1]}
                </div>
                <div className="col-6 text-center mb-4">
                    You Placed {placeAllTime + suffix[placeAllTime - 1]}
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
