import { useMutation } from "@apollo/client";
import { DELETEENTRY } from "./Queries";

export default function DeleteModal(props) {
    const [
        deleteEntry,
        { loading: loadingDelete, error: errorDelete, data: dataDelete },
    ] = useMutation(DELETEENTRY);
    return (
        <dialog id={"delete-" + props.id}>
            {loadingDelete ? (
                <div>Deleting...</div>
            ) : errorDelete ? (
                <div className="row">
                    <div className="col-12 text-center mb-5">Error.</div>
                    <div className="col-12 text-end">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                document
                                    .getElementById("delete-" + props.id)
                                    .close();
                                document.body.style.overflow = "auto";
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            ) : dataDelete ? (
                <div className="row">
                    <div className="col-12 text-center mb-5">Deleted.</div>
                    <div className="col-12 text-end">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                window.location.reload();
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-12 mb-4 text-center">Are you sure?</div>
                    <div className="col-12 ays mb-4 text-center">
                        <h4>Delete {props.data.displayName}?</h4>
                    </div>
                    <div className="col-6">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                deleteEntry({
                                    variables: {
                                        id: props.id,
                                    },
                                });
                            }}>
                            Delete
                        </button>
                    </div>
                    <div className="col-6 text-end">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                document
                                    .getElementById("delete-" + props.id)
                                    .close();
                                document.body.style.overflow = "auto";
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </dialog>
    );
}
