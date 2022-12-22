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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { squadBorderClassName } from "../../../constant/data";

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
    const workspaces = useSelector((state) => state.workspace.workspaces);
    const { selectedSpace, allSpaces } = useSelector((state) => state.space);
    const navigate = useNavigate();
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

    const { id } = useParams();

    useEffect(() => {
        window.onload = () => {
            if (!id) {
                if (workspaces.length <= 0) {
                    navigate("/settings/manage-workspace");
                }
            }
        };
    }, [workspaces]);

    return (
        <>
            {showType === "grid" ? (
                <div className="mt-[30px] flex gap-[30px] flex-wrap overflow-y-scroll no-scrollbar items-start min-h-[200px]">
                    {allSpaces.map((space) => {
                        if (space.name === "Onboarding") return;
                        return (
                            <div
                                style={{
                                    backgroundColor: space.color + "10",
                                }}
                                className={`relative w-[214px] h-[110px] rounded-[16px] border border-transparent flex items-center px-[17px] gap-[16px] ${
                                    squadBorderClassName[space.color]
                                }`}
                            >
                                <div
                                    onClick={() => {
                                        dispatch(setSelectedSpaceId(space._id));
                                        dispatch(setSelectedSpaceObject(space));
                                        navigate(`squad/${space._id}`);
                                    }}
                                    className="absolute inset-0 w-full h-full cursor-pointer"
                                ></div>
                                <EditDeleteMenu
                                    deleteFunc={prepareDeleteProject}
                                    editFunc={prepareEditProject}
                                    data={space}
                                    className="absolute top-[10px] right-[10px]"
                                />
                                <FolderIcon style={{ fill: space.color }} />
                                <p className="text-[#424D5B] font-semibold cursor-pointer">
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
                    <div className="flex flex-col gap-[10px] mt-[30px] overflow-y-scroll h-full no-scrollbar max-h-[550px]">
                        <div
                            onClick={() => setShowCreateSquadModal(true)}
                            className="w-full min-h-[56px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer"
                        >
                            <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
                                <img src={PlusIcon} alt="" />
                            </div>
                        </div>
                        {allSpaces.map((space) => {
                            return (
                                <div
                                    style={{
                                        backgroundColor: space.color + "10",
                                    }}
                                    className={`relative w-full min-h-[80px] rounded-[16px] flex items-center px-[17px] gap-[16px]`}
                                >
                                    <div
                                        onClick={() => {
                                            dispatch(
                                                setSelectedSpaceId(space._id)
                                            );
                                            dispatch(
                                                setSelectedSpaceObject(space)
                                            );
                                            navigate(`squad/${space._id}`);
                                        }}
                                        className="absolute inset-0 w-full h-full cursor-pointer"
                                    ></div>
                                    <EditDeleteMenu
                                        data={space}
                                        editFunc={prepareEditProject}
                                        deleteFunc={prepareDeleteProject}
                                        className="absolute top-[10px] right-[10px]"
                                        boxClassName="right-[30px]"
                                    />
                                    <FolderIcon style={{ fill: space.color }} />
                                    <p className="text-[#424D5B] font-semibold cursor-pointer">
                                        {space.name}
                                    </p>
                                </div>
                            );
                        })}
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
