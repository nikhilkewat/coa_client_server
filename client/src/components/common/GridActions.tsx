import { keys } from "../../config/dev";

export type GridActionProps = {
  onEditClick?: (val: any) => void;
  onDeleteClick?: (val: any) => void;
  showEditButton?: Boolean;
  showDeleteButton?: Boolean;
  editLabel?: string;
  deleteLabel?: string;
  showEditLabel?: boolean;
  showDeleteLabel?: boolean;
  viewLabel?: string;
  showViewLabel?: boolean;
  showViewButton?: Boolean;
  data: any;
};

const GridActions = (props: GridActionProps) => {
  const {
    data,
    onEditClick = () => {},
    onDeleteClick = () => {},
    showEditButton = true,
    showDeleteButton = true,
    editLabel = " Edit",
    deleteLabel = " Delete",
    showEditLabel = false,
    showDeleteLabel = false,
    showViewLabel = false,
    showViewButton = false,
    viewLabel = "View",
  } = props;
  return (
    // <span className="agGrid-button-container gt-2">
    <div className="d-flex d-flex justify-content-evenly align-items-center align-self-center">
      {/* <div className="col"> */}
      {showEditButton && (
        <>
          <img
            src={require("../../Assets/images/pencil.png")}
            width={25}
            style={{ cursor: "pointer" }}
            alt="edit"
            onClick={() => onEditClick(data)}
          ></img>
          {showEditLabel && editLabel}
        </>
        // <button
        //   className="btn btn-success btn-sm agGrid-button"
        //   type="button"
        //   onClick={() => onEditClick(data)}
        // >
        //   <i className="fa-solid fa-pencil"></i>
        //   {showEditLabel && editLabel}
        // </button>
      )}
      {/* </div> */}
      {/* <div className="col"> */}
      {showDeleteButton && (
        <>
          <img
            src={require("../../Assets/images/trash.png")}
            width={25}
            style={{ cursor: "pointer" }}
            alt="delete"
            onClick={() => onDeleteClick(data)}
          ></img>
          {showDeleteLabel && deleteLabel}
        </>
        // <button
        //   className="btn btn-danger btn-sm agGrid-button"
        //   type="button"
        //   onClick={() => onDeleteClick(data)}
        // >
        //   <i className="fa-solid fa-trash"></i>
        //   {showDeleteLabel && deleteLabel}
        // </button>
      )}
      {/* </div> */}
      {showViewButton && (
        // <div className="col">
        <a
          href={`${keys.ServicePath}/${data.data.filePath}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-info btn-sm agGrid-button"
        >
          <i className="fa-solid fa-eye"></i>
          {showViewLabel && viewLabel}
        </a>
        // </div>
      )}
    </div>
    // </span>
  );
};

export default GridActions;
