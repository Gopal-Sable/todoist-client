import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Project } from "../utils/types";
import { useNavigate } from "react-router";

const ProjectCard = ({ id, name, is_favorite, color }: Project) => {
    const navigate = useNavigate();
    return (
        <div
            id={String(id)}
            // style={{ backgroundColor: color }}
            className={`card card-border bg-accent opacity-90  m-3 w-96 cursor-pointer hover:opacity-95 active:opacity-100`}
            onClick={() => {
                navigate(`/project/${id}`);
            }}
        >
            <div className="card-body">
                <div className="card-actions justify-center items-center text-center">
                    <span>
                        {is_favorite ? (
                            <MdOutlineFavorite
                                // color="red"
                                className="text-3xl text-red-600"
                            />
                        ) : (
                            <MdOutlineFavoriteBorder
                                color="red"
                                className="text-3xl"
                            />
                        )}
                    </span>
                    {name}
                </div>
            </div>
        </div>
    );
};
export default ProjectCard;
