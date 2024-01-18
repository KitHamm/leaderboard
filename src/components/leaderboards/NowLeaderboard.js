// Apollo imports
import { useQuery } from "@apollo/client";
// gwl query imports
import { NowLeadersBoard } from "../Queries";
// component imports
import EmptyRows from "../EmptyRows";
import { LodErView } from "../Leaderboard";
export const suffix = ["ST", "ND", "RD", "TH", "TH", "TH", "TH", "TH", "TH"];

export default function NowLeaderboard(props) {
    const { loading, error, data } = useQuery(NowLeadersBoard, {
        variables: { now: props.updatedAt },
        pollInterval: 1000,
        fetchPolicy: "no-cache",
    });
    if (loading) return <LodErView text="Loading..." />;
    if (error) return <LodErView text="Error" />;
    if (data)
        // main display map of contestants
        return (
            <>
                {data.lbs.data.slice(0, 10).map((contestant, index) => {
                    return (
                        <div
                            key={contestant.id}
                            className={
                                props.admin === true
                                    ? index === 0
                                        ? "row contestant back winner fade-in"
                                        : "row contestant back fade-in"
                                    : index === 0
                                    ? "row contestant front winner fade-in"
                                    : "row contestant front fade-in"
                            }>
                            <div className="col-2 place text-center">
                                <h3>{index + 1}</h3>
                                <div className="suffix">{suffix[index]}</div>
                            </div>

                            <div className="col-6">
                                <h3 className="name d-name">
                                    {contestant.attributes.displayName}
                                </h3>
                            </div>
                            <div className="col-4 text-end pe-4">
                                <h3 className="score">
                                    {contestant.attributes.score.toLocaleString(
                                        "en-US"
                                    )}
                                </h3>
                            </div>
                        </div>
                    );
                })}
                <EmptyRows amount={9 - data.lbs.data.length} />
                <div className="row"></div>
            </>
        );
}
