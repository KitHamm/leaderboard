import { useQuery } from "@apollo/client";
import { LB } from "../components/Queries";

export default function Leaderboard() {
    const { loading, error, data } = useQuery(LB, { pollInterval: 500 });
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    console.log(data);
    return (
        <div className="container">
            {data.lbs.data.slice(0, 10).map((contestant) => {
                return (
                    <div key={contestant.attributes.name} className="row">
                        <div className="col-6">
                            <h3> Name: {contestant.attributes.name}</h3>
                        </div>
                        <div className="col-6">
                            <h3> Score: {contestant.attributes.score}</h3>
                        </div>
                    </div>
                );
            })}
            <div className="row"></div>
        </div>
    );
}
