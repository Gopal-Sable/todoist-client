import { IoAdd } from "react-icons/io5";

const AddProject = () => {
    return (
        <button
            className="card card-border bg-gray-600  m-3 w-96 cursor-pointer hover:bg-gray-700 active:bg-gray-600"
            onClick={() => {}}
        >
            <div className="card-body">
                <div className="card-actions justify-center items-center text-center">
                    {true ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        <IoAdd />
                    )}
                    ADD PROJECT
                </div>
            </div>
        </button>
    );
};

export default AddProject;
