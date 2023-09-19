import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { viewContext } from "../pages/Dashboard";
import { AllContestantBackend } from "./Queries";
import ContestantRow from "./ContestantRow";

export default function LeaderboardAll() {
    /* eslint-disable no-unused-vars */
    const [view, setView] = useContext(viewContext);
    /* eslint-enable no-unused-vars */
    const { loading, error, data } = useQuery(
        AllContestantBackend,
        {
            fetchPolicy: "no-cache",
        },
        {
            pollInterval: 500,
        }
    );

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
                <div className="row mt-5 mb-4">
                    <div className="col-3">
                        <button
                            className="btn btn-danger"
                            onClick={(e) => {
                                setView(1);
                            }}>
                            Close
                        </button>
                    </div>
                    <div className="col-6 text-center">
                        <div>All Entries</div>
                    </div>
                    {data.lbs.data.length > 0 ? (
                        <div className="col-3 text-end">
                            <button
                                className="btn btn-success"
                                onClick={(e) => {
                                    console.log("Download");
                                }}>
                                Download
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {data.lbs.data.length > 0 ? (
                    data.lbs.data.slice(0, 9).map((contestant, index) => {
                        return (
                            <ContestantRow
                                key={contestant.attributes.displayName + index}
                                contestant={contestant}
                                index={index}
                            />
                        );
                    })
                ) : (
                    <div className="row p-1 contestant">
                        <div className="col-12 text-center">No Entries.</div>
                    </div>
                )}
            </>
        );
}
