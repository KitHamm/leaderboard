import { useQuery } from "@apollo/client";
import { AllTimeLeaders } from "../Queries";
import EmptyRows from "../EmptyRows";

export const suffix = ["ST", "ND", "RD", "TH", "TH", "TH", "TH", "TH", "TH"];

export default function AllTimeLeaderboard(props) {
    const { loading, error, data } = useQuery(AllTimeLeaders, {
        pollInterval: 1000,
        fetchPolicy: "no-cache",
    });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (data)
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

                            <div className="col-7">
                                <h3 className="name">
                                    {contestant.attributes.displayName}
                                </h3>
                            </div>
                            <div className="col-3">
                                <h3 className="score">
                                    {contestant.attributes.score}
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
