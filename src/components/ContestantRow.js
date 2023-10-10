import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export default function ContestantRow(props) {
    const contestant = props.contestant;
    const index = props.index;
    return (
        <div>
            <div className="row p-3 contestant-back mb-1">
                <div className="col-1">
                    {props.boardView === "date" ? (
                        ""
                    ) : (
                        <strong>{index + 1}</strong>
                    )}
                </div>
                <div className="col-5 ">
                    <strong>Display:</strong> {contestant.displayName}
                </div>
                <div className="col-3">
                    <strong>Final:</strong>{" "}
                    {contestant.score.toLocaleString("en-US")}
                </div>
                <div className="col-3 text-end">
                    <button
                        onClick={() => {
                            document.getElementById(contestant.id).showModal();
                            document.body.style.overflow = "hidden";
                        }}
                        className="btn btn-warning">
                        Edit
                    </button>
                </div>
                <div className="col-5 offset-1">
                    <strong>Name:</strong>{" "}
                    {contestant.firstName + " " + contestant.lastName}
                </div>
                <div className="col-6">
                    <strong>First:</strong>{" "}
                    {contestant.scoreOne.toLocaleString("en-US")}
                </div>
                <div className="col-5 offset-1">
                    <strong>Email:</strong> {contestant.email}
                </div>
                <div className="col-3">
                    <strong>Second:</strong>{" "}
                    {contestant.scoreTwo.toLocaleString("en-US")}
                </div>
                <div className="col-3 text-end">
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            document
                                .getElementById("delete-" + contestant.id)
                                .showModal();
                            document.body.style.overflow = "hidden";
                        }}>
                        Delete
                    </button>
                </div>
                <div className="col-5 offset-1">DOB: {contestant.dob}</div>
                <div className="col-6">Age: {contestant.age}</div>
            </div>
            <DeleteModal id={contestant.id} data={contestant} />
            <EditModal id={contestant.id} data={contestant} />
        </div>
    );
}
