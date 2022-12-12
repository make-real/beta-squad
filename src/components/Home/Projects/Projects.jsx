import PlusIcon from "../../../assets/plus.svg";
import FolderIcon from "../../../assets/icon_component/Folder";
import EditDeleteMenu from "../../DropDown/EditDeleteMenu";
import DeleteProjectModal from "./Modals/DeleteProjectModal";
import { useState } from "react";
import DeletingProjectModal from "./Modals/DeletingProjectModal";
import { useSelector } from "react-redux";
import EditSquadModal from "./Modals/EditSquadModal";
import CreateSquadModal from "./Modals/CreateSquadModal";
import { useDispatch } from "react-redux";
import {
    setSelectedSpaceId,
    setSelectedSpaceObject,
} from "../../../store/slice/space";

const Projects = ({ showType }) => {
    const [deleteProjectData, setDeleteProjectData] = useState(null);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const [deletingProject, setDeletingProject] = useState({
        done: false,
        show: false,
    });
    const [showCreateSquadModal, setShowCreateSquadModal] = useState(false);
    const [editProjectData, setEditProjectData] = useState(null);
    const [showEditSquadModal, setShowEditSquadModal] = useState(false);
    const { selectedSpace, allSpaces } = useSelector((state) => state.space);
    const dispatch = useDispatch();

    const prepareDeleteProject = (projectData) => {
        setDeleteProjectData(projectData);
        setShowDeleteProjectModal(true);
    };

    const prepareEditProject = (projectData) => {
        setEditProjectData(projectData);
        setShowEditSquadModal(true);
    };

    const cancelEditProject = () => {
        setEditProjectData(null);
        setShowEditSquadModal(false);
    };

    const cancelDeletionFunc = () => {
        setDeleteProjectData(null);
        setDeletingProject((prev) => ({
            ...prev,
            done: false,
            show: false,
        }));
    };

    return (
        <>
            {showType === "grid" ? (
                <div className="mt-[30px] flex items-center gap-[30px] flex-wrap">
                    {allSpaces.map((space) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: space.color + "10",
                                    borderColor: space.color,
                                }}
                                className={`relative w-[214px] h-[110px] rounded-[16px] border flex items-center px-[17px] gap-[16px]`}
                            >
                                <EditDeleteMenu
                                    deleteFunc={prepareDeleteProject}
                                    editFunc={prepareEditProject}
                                    data={space}
                                    className="absolute top-[10px] right-[10px]"
                                />
                                <FolderIcon style={{ fill: space.color }} />
                                <p
                                    onClick={() => {
                                        dispatch(setSelectedSpaceId(space._id));
                                        dispatch(setSelectedSpaceObject(space));
                                    }}
                                    className="text-[#424D5B] font-semibold cursor-pointer"
                                >
                                    {space.name}
                                </p>
                            </div>
                        );
                    })}

                    <div
                        onClick={() => setShowCreateSquadModal(true)}
                        className="w-[214px] h-[110px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer"
                    >
                        <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
                            <img src={PlusIcon} alt="" />
                        </div>
                    </div>
                </div>
            ) : (
                showType === "stack" && (
                    <div className="h-full overflow-y-scroll no-scrollbar mt-[30px]">
                        <div className="flex flex-col items-center gap-[10px]">
                            {allSpaces.map((space) => {
                                return (
                                    <div
                                        style={{
                                            backgroundColor: space.color + "10",
                                        }}
                                        className={`relative w-full h-[80px] rounded-[16px] flex items-center px-[17px] gap-[16px]`}
                                    >
                                        <EditDeleteMenu
                                            data={space}
                                            deleteFunc={prepareDeleteProject}
                                            className="absolute top-[10px] right-[10px]"
                                        />
                                        <FolderIcon
                                            style={{ fill: space.color }}
                                        />
                                        <p
                                            onClick={() => {
                                                dispatch(
                                                    setSelectedSpaceId(
                                                        space._id
                                                    )
                                                );
                                                dispatch(
                                                    setSelectedSpaceObject(
                                                        space
                                                    )
                                                );
                                            }}
                                            className="text-[#424D5B] font-semibold cursor-pointer"
                                        >
                                            {space.name}
                                        </p>
                                    </div>
                                );
                            })}

                            <div
                                onClick={() => setShowCreateSquadModal(true)}
                                className="w-full h-[56px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer"
                            >
                                <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
                                    <img src={PlusIcon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}

            {showDeleteProjectModal && (
                <DeleteProjectModal
                    setDeleteProjectData={setDeleteProjectData}
                    setShowDeleteProjectModal={setShowDeleteProjectModal}
                    setDeletingProject={setDeletingProject}
                    data={deleteProjectData}
                />
            )}
            {deletingProject.show && (
                <DeletingProjectModal
                    data={deleteProjectData}
                    {...deletingProject}
                    cancelDeletion={cancelDeletionFunc}
                />
            )}
            {showEditSquadModal && (
                <EditSquadModal
                    data={editProjectData}
                    cancelEditProject={cancelEditProject}
                />
            )}
            {showCreateSquadModal && (
                <CreateSquadModal
                    setShowCreateSquadModal={setShowCreateSquadModal}
                />
            )}
        </>
    );
};

export default Projects;
