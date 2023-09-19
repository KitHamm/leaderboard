import { useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import ContestantRow from "./ContestantRow";
import { viewContext } from "../pages/Dashboard";
import { LBBackend, setNoShow } from "./Queries";

export default function LeaderboardBack() {
    /* eslint-disable no-unused-vars */
    const [view, setView] = useContext(viewContext);
    const { loading, error, data } = useQuery(LBBackend, { pollInterval: 500 });
    const [
        updateShow,
        { loading: loadingShow, error: errorShow, data: dataShow },
    ] = useMutation(setNoShow);
    /* eslint-enable no-unused-vars */
    function handleNoShow(data) {
        data.forEach((element) => {
            updateShow({ variables: { id: element.id } });
        });
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
                        <div>Current Leaderboard</div>
                    </div>
                    {data.lbs.data.length > 0 ? (
                        <div className="col-3 text-end">
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                    document
                                        .getElementById("clear-dialog")
                                        .showModal();
                                    document.body.style.overflow = "hidden";
                                }}>
                                Clear
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
                <dialog id="clear-dialog">
                    <div className="row mb-4">
                        <div className="col-12 text-center">
                            <h4>Are you sure?</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNoShow(data.lbs.data);
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
                                className="btn btn-danger"
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
