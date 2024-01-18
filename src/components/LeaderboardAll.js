// Apollo imports
import { useQuery } from "@apollo/client";
// React imports
import { useContext, useState } from "react";
// component imports
import { viewContext } from "../pages/Dashboard";
import ContestantRow from "./ContestantRow";
// gql query imports
import { AllContestantBackend } from "./Queries";
// library imports
// CSV download data
import { CSVLink } from "react-csv";

export default function LeaderboardAll() {
    document.body.style.overflow = "auto";
    /* eslint-disable no-unused-vars */
    const [page, setPage] = useState(1);
    var numPages = 0;
    var pages = [];
    const [contestantPerPage] = useState(10);
    const [view, setView] = useContext(viewContext);
    const [boardView, setBoardView] = useState("date");
    const [viewText, setViewText] = useState("All Time - Newest First");
    /* eslint-enable no-unused-vars */
    const { loading, error, data } = useQuery(AllContestantBackend, {
        fetchPolicy: "no-cache",
    });
    var contestants = [];
    var dates = [];
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
        data.lbs.data.forEach((contestant) => {
            contestants.push({
                id: contestant.id,
                createdAt: contestant.attributes.createdAt,
                displayName: contestant.attributes.displayName,
                firstName: contestant.attributes.firstName,
                lastName: contestant.attributes.lastName,
                email: contestant.attributes.email,
                age: contestant.attributes.age,
                dob: contestant.attributes.dob,
                scoreOne: contestant.attributes.scoreOne,
                scoreTwo: contestant.attributes.scoreTwo,
                score: contestant.attributes.score,
            });
            if (
                !dates.includes(contestant.attributes.createdAt.split("T")[0])
            ) {
                dates.push(contestant.attributes.createdAt.split("T")[0]);
            }
        });
        dates = dates.sort(function (a, b) {
            if (a < b) return 1;
            if (a > b) return -1;
            return 0;
        });
        var showData = [];
        if (boardView === "date") {
            pages = [];
            if (contestants.length % 10 === 0) {
                numPages = contestants.length / 10;
            } else {
                numPages = Math.floor(contestants.length / 10) + 1;
            }
            for (let index = 0; index < numPages; index++) {
                pages.push(index);
            }
            showData = contestants.sort(function (a, b) {
                var keyA = a.createdAt,
                    keyB = b.createdAt;
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
        } else if (boardView === "score") {
            pages = [];
            if (contestants.length % 10 === 0) {
                numPages = contestants.length / 10;
            } else {
                numPages = Math.floor(contestants.length / 10) + 1;
            }
            for (let index = 0; index < numPages; index++) {
                pages.push(index);
            }
            showData = contestants.sort(function (a, b) {
                var keyA = parseInt(a.score),
                    keyB = parseInt(b.score);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
        } else {
            var temp = [];
            contestants.forEach((contestant) => {
                if (contestant.createdAt.split("T")[0] === boardView) {
                    temp.push(contestant);
                }
            });
            pages = [];
            if (temp.length % 10 === 0) {
                numPages = temp.length / 10;
            } else {
                numPages = Math.floor(temp.length / 10) + 1;
            }
            for (let index = 0; index < numPages; index++) {
                pages.push(index);
            }
            showData = temp.sort(function (a, b) {
                var keyA = parseInt(a.score),
                    keyB = parseInt(b.score);
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
        }

        return (
            <>
                <div className="row mt-5 top-title mb-4">
                    <div className="col-3">
                        <button
                            className="btn btn-danger w-100"
                            onClick={(e) => {
                                setView(1);
                            }}>
                            Back
                        </button>
                    </div>
                    <div className="col-6 text-center">
                        <h4>All Entries</h4>
                    </div>
                    {data.lbs.data.length > 0 ? (
                        <div className="col-3 text-end">
                            <button
                                className="btn btn-success w-100"
                                onClick={() => {
                                    document
                                        .getElementById("download-options")
                                        .show();
                                    document.body.style.overflow = "hidden";
                                }}>
                                Download
                            </button>
                        </div>
                    ) : (
                        <div className="col-4"></div>
                    )}

                    <div className="col-12 mt-4">
                        <div className="col text-center">
                            {viewText} ({showData.length} Entries)
                        </div>
                    </div>
                </div>
                <div className="row pt-4 mb-4 admin-select">
                    <div className="col-3 mb-4 text-center">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setBoardView("date");
                                setViewText("All Time - Newest First");
                                setPage(1);
                                window.scrollTo(0, 0);
                            }}
                            className={
                                viewText === "All Time - Newest First"
                                    ? "btn btn-warning"
                                    : "btn gold btn-success"
                            }>
                            Newest First
                        </button>
                    </div>
                    <div className="col-3 mb-4 text-center">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setBoardView("score");
                                setViewText("All Time - Highest Score First");
                                setPage(1);
                                window.scrollTo(0, 0);
                            }}
                            className={
                                viewText === "All Time - Highest Score First"
                                    ? "btn btn-warning"
                                    : "btn gold btn-success"
                            }>
                            Highest Score
                        </button>
                    </div>
                    {dates.map((date) => {
                        return (
                            <div key={date} className="col-3 mb-4 text-center">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setBoardView(date);
                                        setViewText(
                                            date.split("-")[2] +
                                                "-" +
                                                date.split("-")[1] +
                                                "-" +
                                                date.split("-")[0] +
                                                " - Highest Score First"
                                        );
                                        setPage(1);
                                        window.scrollTo(0, 0);
                                    }}
                                    className={
                                        viewText ===
                                        date.split("-")[2] +
                                            "-" +
                                            date.split("-")[1] +
                                            "-" +
                                            date.split("-")[0] +
                                            " - Highest Score First"
                                            ? "btn btn-warning"
                                            : "btn gold btn-success"
                                    }>
                                    {date.split("-")[2] +
                                        "-" +
                                        date.split("-")[1] +
                                        "-" +
                                        date.split("-")[0]}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {showData.length > 0 ? (
                    showData
                        .slice(
                            page * contestantPerPage - contestantPerPage,
                            page * contestantPerPage
                        )
                        .map((contestant, index) => {
                            return (
                                <ContestantRow
                                    boardView={boardView}
                                    key={contestant.displayName + index}
                                    contestant={contestant}
                                    index={
                                        (page - 1) * contestantPerPage + index
                                    }
                                />
                            );
                        })
                ) : (
                    <div className="row p-1 contestant">
                        <div className="col-12 text-center">No Entries.</div>
                    </div>
                )}
                <div className="row admin-select p-3 mt-4 mb-3">
                    <div className="col-12 mb-2 text-center">
                        {pages.length} Page/s
                    </div>
                    <div className="col-12 text-center">
                        {page > 1 ? (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(1);
                                        window.scrollTo(0, 0);
                                    }}
                                    className="btn btn-success me-1">
                                    First
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page - 1);
                                        window.scrollTo(0, 0);
                                    }}
                                    className="btn btn-success ms-1 me-1">
                                    Prev
                                </button>
                            </>
                        ) : (
                            ""
                        )}
                        {page > 2 ? "..." : ""}
                        {pages
                            .slice(
                                page === 1
                                    ? page - 1
                                    : page === pages.length
                                    ? page - 3
                                    : page - 2,
                                page === 1 ? page + 2 : page + 1
                            )
                            .map((p) => {
                                return (
                                    <button
                                        key={p}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(p + 1);
                                            window.scrollTo(0, 0);
                                        }}
                                        className={
                                            page === p + 1
                                                ? "btn btn-warning ms-1 me-1"
                                                : "btn btn-success ms-1 me-1"
                                        }>
                                        {p + 1}
                                    </button>
                                );
                            })}
                        {page < pages.length - 1 ? "..." : ""}
                        {page < pages.length ? (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                        window.scrollTo(0, 0);
                                    }}
                                    className="btn btn-success me-1 ms-1">
                                    Next
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(pages.length);
                                        window.scrollTo(0, 0);
                                    }}
                                    className="btn btn-success ms-1 me-1">
                                    Last
                                </button>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <dialog id="download-options">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>Download Options</h4>
                        </div>
                    </div>
                    <div className="row mt-4 text-center">
                        <div className="col-12 mb-4">
                            <CSVLink
                                className="btn btn-success"
                                filename={"Contestant-Data-All-Sorted-Time.csv"}
                                data={sortCSVData("date", data.lbs.data)}>
                                Download All - Newest First
                            </CSVLink>
                        </div>
                        <div className="col-12 mb-4">
                            <CSVLink
                                className="btn btn-success"
                                filename={
                                    "Contestant-Data-All-Sorted-Score.csv"
                                }
                                data={sortCSVData("score", data.lbs.data)}>
                                Download All - Highest Score First
                            </CSVLink>
                        </div>
                        <div className="col-12 mb-4">
                            All Daily Downloads are Highest score (winner) first
                        </div>
                        {dates.map((date, index) => {
                            return (
                                <div key={date + index} className="col-12 mb-4">
                                    <CSVLink
                                        className="btn btn-success"
                                        filename={
                                            "Contestant-Data-" +
                                            date.split("-")[2] +
                                            "-" +
                                            date.split("-")[1] +
                                            "-" +
                                            date.split("-")[0] +
                                            "-Sorted-Score.csv"
                                        }
                                        data={sortCSVData(date, data.lbs.data)}>
                                        Download{" "}
                                        {date.split("-")[2] +
                                            "-" +
                                            date.split("-")[1] +
                                            "-" +
                                            date.split("-")[0]}
                                    </CSVLink>
                                </div>
                            );
                        })}
                    </div>
                    <div className="row text-center">
                        <div className="col-12 text-center">
                            <button
                                onClick={() => {
                                    document
                                        .getElementById("download-options")
                                        .close();
                                    document.body.style.overflow = "auto";
                                }}
                                className="btn btn-danger">
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            </>
        );
    }
}

function sortCSVData(sort, contestants) {
    var array = [
        [
            "Display Name",
            "First Name",
            "Last Name",
            "Email",
            "Age",
            "DOB",
            "Score One",
            "Score Two",
            "Final Score",
        ],
    ];
    var temp2 = [];
    if (sort === "date") {
        var temp = contestants.sort(function (a, b) {
            var keyA = a.attributes.createdAt,
                keyB = b.attributes.createdAt;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        temp.forEach((contestant) => {
            temp2.push([
                contestant.attributes.displayName,
                contestant.attributes.firstName,
                contestant.attributes.lastName,
                contestant.attributes.email,
                contestant.attributes.age,
                contestant.attributes.dob,
                contestant.attributes.scoreOne,
                contestant.attributes.scoreTwo,
                contestant.attributes.score,
            ]);
        });
        temp2.reverse();
        temp2.forEach((contestant) => {
            array.push(contestant);
        });
        return array;
    } else if (sort === "score") {
        var temp = contestants.sort(function (a, b) {
            var keyA = parseInt(a.attributes.score),
                keyB = parseInt(b.attributes.score);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
        temp.forEach((contestant) => {
            temp2.push([
                contestant.attributes.displayName,
                contestant.attributes.firstName,
                contestant.attributes.lastName,
                contestant.attributes.email,
                contestant.attributes.age,
                contestant.attributes.dob,
                contestant.attributes.scoreOne,
                contestant.attributes.scoreTwo,
                contestant.attributes.score,
            ]);
        });
        //temp2.reverse();
        temp2.forEach((contestant) => {
            array.push(contestant);
        });
        return array;
    } else {
        contestants.forEach((contestant) => {
            if (contestant.attributes.createdAt.split("T")[0] === sort) {
                temp2.push({
                    id: contestant.id,
                    createdAt: contestant.attributes.createdAt,
                    displayName: contestant.attributes.displayName,
                    firstName: contestant.attributes.firstName,
                    lastName: contestant.attributes.lastName,
                    email: contestant.attributes.email,
                    age: contestant.attributes.age,
                    dob: contestant.attributes.dob,
                    scoreOne: contestant.attributes.scoreOne,
                    scoreTwo: contestant.attributes.scoreTwo,
                    score: contestant.attributes.score,
                });
            }
        });
        var temp = temp2.sort(function (a, b) {
            var keyA = parseInt(a.score),
                keyB = parseInt(b.score);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
        //temp.reverse();
        temp.forEach((contestant) => {
            array.push([
                contestant.displayName,
                contestant.firstName,
                contestant.lastName,
                contestant.email,
                contestant.age,
                contestant.dob,
                contestant.scoreOne,
                contestant.scoreTwo,
                contestant.score,
            ]);
        });
        return array;
    }
}
