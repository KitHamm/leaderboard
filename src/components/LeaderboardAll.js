import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { viewContext } from "../pages/Dashboard";
import { AllContestantBackend } from "./Queries";
import ContestantRow from "./ContestantRow";
import { CSVLink } from "react-csv";

export default function LeaderboardAll() {
    /* eslint-disable no-unused-vars */
    const [view, setView] = useContext(viewContext);
    /* eslint-enable no-unused-vars */
    const { loading, error, data } = useQuery(AllContestantBackend, {
        fetchPolicy: "no-cache",
        pollInterval: 1000,
    });

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
    if (data) {
        var CSVdata = [
            [
                "Display Name",
                "First Name",
                "Last Name",
                "Email",
                "Score One",
                "Score Two",
                "Final Score",
            ],
        ];
        data.lbs.data.forEach((contestant) => {
            CSVdata.push([
                contestant.attributes.displayName,
                contestant.attributes.firstName,
                contestant.attributes.lastName,
                contestant.attributes.email,
                contestant.attributes.scoreOne,
                contestant.attributes.scoreTwo,
                contestant.attributes.score,
            ]);
        });
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
                            <CSVLink
                                className="btn btn-success"
                                filename={"ContestantData.csv"}
                                data={CSVdata}>
                                Download
                            </CSVLink>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {data.lbs.data.length > 0 ? (
                    data.lbs.data.map((contestant, index) => {
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
}
