import { cardUpdateApiCall, getSpaceMembers } from '../../hooks/useFetch';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addListId } from '../../store/slice/cardAsList';
import { useSelector } from 'react-redux';
import Button from '../Button';
import { Member } from '../../assets/icons/svg/Member';
import {
    MagnifyingGlassIcon,
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

const AssigneeUser = ({
    localCard,
    setLocalCard,
    spaceID,
    listID,
    openAssigneeModal,
    handleDataChange = () => {},
}) => {
    const dispatch = useDispatch();
    const selectedListId = useSelector((state) => state.cardAsList.listId);
    const [allUserForAssignee, setAllUserForAssignee] = useState([]);
    const [searchUserForAssignee, setSearchUserForAssignee] = useState('');
    const [localCardAssigne, setLocalCardAssigne] = useState(
        localCard?.assignee || []
    );

    useEffect(() => {
        setLocalCardAssigne(localCard?.assignee);
    }, [localCard?.assignee]);

    useEffect(() => {
        const getUserFromServer = async () => {
            try {
                if (spaceID) {
                    const { data } = await getSpaceMembers(spaceID);
                    setAllUserForAssignee(data.members);
                    handleDataChange();
                }
            } catch (error) {
                console.log(error);
            }
        };

        getUserFromServer();

        if (Boolean(listID)) {
            dispatch(addListId(listID));
        }
    }, [spaceID, listID, dispatch, handleDataChange]);

    const handle_add_assignee_users = async (user) => {
        try {
            setLocalCard({
                ...localCard,
                assignee: [...localCard?.assignee, user],
            });
            await cardUpdateApiCall(spaceID, selectedListId, localCard._id, {
                assignUser: user._id,
            });
            handleDataChange();
        } catch (error) {
            toast.error(error.response.data.issue.assignUser, {
                autoClose: 2000,
            });
        }
    };

    const handle_remove_assignee_users = async (user) => {
        try {
            setLocalCard({
                ...localCard,
                assignee: localCard?.assignee?.filter(
                    ({ _id }) => _id !== user?._id
                ),
            });
            await cardUpdateApiCall(spaceID, selectedListId, localCard._id, {
                removeAssignedUser: user._id,
            });
            handleDataChange();
        } catch (error) {
            toast.error(error.response.data.issue.assignUser, {
                autoClose: 2000,
            });
        }
    };

    const filterMember = () => {
        return allUserForAssignee.filter(
            ({ _id }) => !localCard?.assignee?.some((user) => user._id === _id)
        );
    };

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 text-[#818892]"
        >
            <div className="flex flex-col items-start justify-between">
                <p className="font-bold text-xl">Assign Member</p>
                <p className="text-sm text-[#818892]">
                    Assign member to development.
                </p>
            </div>

            <div className="relative my-3">
                <MagnifyingGlassIcon className="w-4 h-4 absolute top-[10px] left-[10px]" />
                <input
                    type="text"
                    value={searchUserForAssignee}
                    placeholder="Search"
                    onChange={(e) => setSearchUserForAssignee(e.target.value)}
                    className="text-black bg-[#ECECEC] w-full pl-8 pr-5 py-1 rounded-md outline-none border focus:border-blue-400 duration-150"
                />
            </div>

            {localCardAssigne?.length > 0 && (
                <div>
                    <p className="text-[#818892] text-sm py-1">
                        Assigned member
                    </p>
                    {localCardAssigne?.map((user) => (
                        <div
                            key={user?._id}
                            className="relative group flex items-center px-3 py-2 hover:bg-gray-200 space-x-3 cursor-pointer rounded-lg hover:after:content-['Remove'] after:absolute after:text-themeColor after:right-4"
                            onClick={() => handle_remove_assignee_users(user)}
                        >
                            <MinusIcon className="w-4 h-4 text-white bg-[#FF3659] rounded-full" />
                            {user.avatar ? (
                                <span className="rounded-full ring-[1px] bg-white ring-[#ECECEC] text-black font-bold grid place-items-center p-1">
                                    <img
                                        src={user.avatar}
                                        alt=""
                                        className="h-5 w-5 text-[#14BCBE] flex justify-center items-center"
                                    />
                                </span>
                            ) : (
                                <span className="rounded-full ring-[1px] bg-white ring-[#ECECEC] text-black font-bold grid place-items-center p-1">
                                    <p className="h-5 w-5 text-[#14BCBE] flex justify-center items-center">
                                        {user?.fullName.charAt(0)}
                                    </p>
                                </span>
                            )}

                            <span className="duration-150 group-hover:text-black">
                                {user?.fullName}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {filterMember()?.length > 0 && (
                <div className="mt-2 overflow-y-auto customScroll pb-2">
                    <div className="flex justify-start items-center">
                        <Member />
                        <p className="text-[#6576FF] py-1 text-base ml-2">
                            Add New Member
                        </p>
                    </div>
                    {filterMember().map((user) => (
                        <div
                            key={user?._id}
                            className="relative group flex items-center px-3 py-2 hover:bg-gray-200 space-x-3 cursor-pointer rounded-lg after:absolute after:text-themeColor after:right-2"
                            onClick={() => handle_add_assignee_users(user)}
                        >
                            <PlusIcon className="w-4 h-4 text-white bg-[#54CC7C] rounded-full" />
                            {user.avatar ? (
                                <span className="rounded-full ring-[1px] bg-white ring-[#ECECEC] text-black font-bold grid place-items-center p-1">
                                    <img
                                        src={user.avatar}
                                        alt=""
                                        className="h-5 w-5 text-[#14BCBE] flex justify-center items-center"
                                    />
                                </span>
                            ) : (
                                <span className="rounded-full ring-[1px] bg-white ring-[#ECECEC] text-black font-bold grid place-items-center p-1">
                                    <p className="h-5 w-5 text-[#14BCBE] flex justify-center items-center">
                                        {user?.fullName.charAt(0)}
                                    </p>
                                </span>
                            )}
                            <span className="duration-150 group-hover:text-black">
                                {user?.fullName}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssigneeUser;
