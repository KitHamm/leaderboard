import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export default function ContestantRow(props) {
    const contestant = props.contestant;
    const index = props.index;
    return (
        <div>
            <div className="row p-3 contestant-back mb-1">
                <div className="col-1">
                    <strong>{index + 1}</strong>
                </div>
                <div className="col-5 ">
                    <strong>Display:</strong>{" "}
                    {contestant.attributes.displayName}
                </div>
                <div className="col-3">
                    <strong>1st:</strong> {contestant.attributes.scoreOne}
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
                    {contestant.attributes.firstName +
                        " " +
                        contestant.attributes.lastName}
                </div>
                <div className="col-2">
                    <strong>2nd:</strong> {contestant.attributes.scoreTwo}
                </div>
                <div className="col-5 offset-1">
                    <strong>Email:</strong> {contestant.attributes.email}
                </div>
                <div className="col-3">
                    <strong>Final:</strong> {contestant.attributes.score}
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
            </div>
            <DeleteModal id={contestant.id} data={contestant} />
            <EditModal id={contestant.id} data={contestant} />
        </div>
    );
}
