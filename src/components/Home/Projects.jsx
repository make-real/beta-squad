import PlusIcon from "../../assets/plus.svg";
import FolderIcon from "../../assets/icon_component/Folder";
import EditDeleteMenu from "../DropDown/EditDeleteMenu";
import DeleteProjectModal from "../Modals/DeleteProjectModal";
import { useState } from "react";
import DeletingModal from "../Modals/DeletingModal";
import { useSelector } from "react-redux";

const Projects = ({ showType }) => {
    const [deleteProjectData, setDeleteProjectData] = useState(null);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const [deletingProject, setDeletingProject] = useState({
        done: false,
        show: false,
        type: "project",
    });
    const { selectedSpace, allSpaces } = useSelector((state) => state.space);

    const projectsData = [
        {
            id: "random1",
            name: "Heart Live",
            color: "#FB397F",
        },
        {
            id: "random2",
            name: "JCI",
            color: "#FEB45E",
        },
        {
            id: "random3",
            name: "Cycle Nation",
            color: "#13E5C0",
        },
    ];

    const prepareDeleteProject = (projectData) => {
        setDeleteProjectData(projectData);
        setShowDeleteProjectModal(true);
    };

    return (
        <>
            {showType === "grid" ? (
                <div className="mt-[30px] flex items-center gap-[30px] flex-wrap">
                    {allSpaces.map((sapce) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: sapce.color + "10",
                                    borderColor: sapce.color,
                                }}
                                className={`relative w-[214px] h-[110px] rounded-[16px] border flex items-center px-[17px] gap-[16px]`}
                            >
                                <EditDeleteMenu
                                    deleteFunc={prepareDeleteProject}
                                    data={sapce}
                                    className="absolute top-[10px] right-[10px]"
                                />
                                <FolderIcon style={{ fill: sapce.color }} />
                                <p className="text-[#424D5B] font-semibold">
                                    {sapce.name}
                                </p>
                            </div>
                        );
                    })}

                    <div className="w-[214px] h-[110px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer">
                        <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
                            <img src={PlusIcon} alt="" />
                        </div>
                    </div>
                </div>
            ) : (
                showType === "stack" && (
                    <div className="mt-[30px] flex flex-col items-center gap-[10px]">
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
                                    <FolderIcon style={{ fill: space.color }} />
                                    <p className="text-[#424D5B] font-semibold">
                                        {space.name}
                                    </p>
                                </div>
                            );
                        })}

                        <div className="w-full h-[56px] rounded-[16px] bg-[#ECECEC80] flex items-center justify-center gap-[16px] cursor-pointer">
                            <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
                                <img src={PlusIcon} alt="" />
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
                <DeletingModal data={deleteProjectData} {...deletingProject} />
            )}
        </>
    );
};

export default Projects;
