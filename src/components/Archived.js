import { useQuery, useMutation } from "@apollo/client";
import { AllLb } from "./Queries";

export default function Archive() {
    const { loading, error, data } = useQuery(AllLb);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    const leaderBoardsArray = data.leaderBoards.data;
    function handleTableClick(id) {
        //console.log(id);
        let content = document.getElementById(id);
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
    function handleArchiveClick() {
        let content = document.getElementById("content-archive");
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = "fit-content";
        }
    }
    return (
        <>
            <div className="row archive">
                <button
                    onClick={handleArchiveClick}
                    className="collapsible-archive">
                    Archive
                </button>
                <div id="content-archive" className="content-archive">
                    {leaderBoardsArray.map((lb, index) => {
                        return (
                            <div key={lb.id} className="">
                                <button
                                    onClick={(e) =>
                                        handleTableClick("table-" + lb.id)
                                    }
                                    className="collapsible">
                                    Table: {DateRender(lb.attributes.createdAt)}
                                </button>
                                <div id={"table-" + lb.id} className="content">
                                    {lb.attributes.Board.map((table, index) => {
                                        return (
                                            <div
                                                key={table.id}
                                                className={
                                                    index === 0
                                                        ? "row winner"
                                                        : "row"
                                                }>
                                                <div className="col-2 text-center">
                                                    <h3>{index + 1}</h3>
                                                </div>
                                                <div className="col-4">
                                                    <h3>{table.Name}</h3>
                                                </div>
                                                <div className="col-4">
                                                    <h3>
                                                        Score: {table.Score}
                                                    </h3>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

function DateRender(date) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const formattedDate = date.split("T");
    const splitDate = formattedDate[0].split("-");
    const returnDate =
        splitDate[2] +
        " " +
        months[parseInt(splitDate[1]) - 1] +
        " " +
        splitDate[0];
    return returnDate;
}
