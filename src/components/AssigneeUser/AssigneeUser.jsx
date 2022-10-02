import { cardUpdateApiCall, getSpaceMembers } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addListId } from "../../store/slice/cardAsList";
import { useSelector } from "react-redux";
import Button from "../Button";

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
  const [searchUserForAssignee, setSearchUserForAssignee] = useState("");
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
  }, [spaceID, listID]);

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
      toast.error(error.response.data.issue.assignUser, { autoClose: 2000 });
    }
  };

  const handle_remove_assignee_users = async (user) => {
    try {
      setLocalCard({
        ...localCard,
        assignee: localCard?.assignee?.filter(({ _id }) => _id !== user?._id),
      });
      await cardUpdateApiCall(spaceID, selectedListId, localCard._id, {
        removeAssignedUser: user._id,
      });
      handleDataChange();
    } catch (error) {
      toast.error(error.response.data.issue.assignUser, { autoClose: 2000 });
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
      className="bg-white rounded-md p-2"
    >
      <div className="flex items-center justify-between text-gray-600">
        <p>Assign user to card</p>
      </div>

      <div className="my-3">
        <input
          type="text"
          value={searchUserForAssignee}
          onChange={(e) => setSearchUserForAssignee(e.target.value)}
          className="text-black w-full px-2 py-1 rounded-md outline-none border focus:border-blue-400 duration-150"
        />
      </div>

      {localCardAssigne?.length > 0 && (
        <div>
          <p className="text-black py-1">Assigned</p>
          {localCardAssigne?.map((user) => (
            <div
              key={user?._id}
              className="relative group flex items-center px-3 py-2 hover:bg-gray-200 space-x-3 cursor-pointer rounded-lg hover:after:content-['Remove'] after:absolute after:text-themeColor after:right-4"
              onClick={() => handle_remove_assignee_users(user)}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="w-6 h-6 rounded-full ring ring-teal-500"
                />
              ) : (
                <p className="w-6 h-6 rounded-full ring ring-teal-500 text-black font-bold grid place-items-center">
                  {user?.fullName.charAt(0)}
                </p>
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
          <p className="text-black py-1">Members</p>
          {filterMember().map((user) => (
            <div
              key={user?._id}
              className="relative group flex items-center px-3 py-2 hover:bg-gray-200 space-x-3 cursor-pointer rounded-lg hover:after:content-['Assign'] after:absolute after:text-themeColor after:right-2"
              onClick={() => handle_add_assignee_users(user)}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="w-6 h-6 rounded-full ring ring-teal-500"
                />
              ) : (
                <p className="w-6 h-6 rounded-full ring ring-teal-500 text-black font-bold grid place-items-center">
                  {user?.fullName.charAt(0)}
                </p>
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
