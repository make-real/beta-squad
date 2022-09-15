import React from 'react'

const AssigneeUser = (props) => {

    const {
        localCard,
        searchUserForAssignee,
        setSearchUserForAssignee,
        handle_remove_assignee_users,
        allUserForAssignee,
        handle_add_assignee_users,
    } = props;

    return (
        <div className="absolute top-12 left-[50%] translate-x-[-50%]  w-[450px] bg-white rounded-md z-50 shadow-[1px_1px_8px_8px_rgba(0,0,0,.3)] before:content-[''] before:absolute before:top-[-6px] before:z-[-50] before:left-[50%] before:translate-x-[-50%] before:rotate-45 before:bg-white before:w-7 before:h-7"
        >
            <div className="flex py-3 px-4 items-center justify-between text-gray-600">
                <p>Assign user to card</p>
                <p className="px-2 py-1 cursor-pointer hover:bg-gray-400 duration-300 rounded-md">Assign yourself</p>
            </div>

            <div className="px-4 pb-.5">
                {/* 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎 */}
                <input
                    type="text"
                    value={searchUserForAssignee}
                    onChange={e => setSearchUserForAssignee(e.target.value)}
                    className="text-black w-full px-2 py-1 rounded-md outline-none border focus:border-blue-400 duration-150"
                />
            </div>

            {
                // * List of users ===> that Assign yet...
                // 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
                localCard?.assignee?.length > 0 &&
                <div className={`mt-2 px-2  ${allUserForAssignee?.length === 0 && 'pb-2'}`}>
                    <p className="text-black py-1">Already assigned</p>
                    {
                        localCard?.assignee?.map(user =>
                            <div
                                key={user?._id}
                                className="relative group flex items-center px-2.5 py-2 hover:bg-gray-200 space-x-3 cursor-pointer rounded-lg hover:after:content-['X'] after:absolute after:text-themeColor after:right-4"
                                onClick={() => handle_remove_assignee_users(user)}
                            >
                                {
                                    user.avatar
                                        ? <img src={user.avatar} alt="" className="w-6 h-6 rounded-full ring ring-teal-500" />
                                        : <p className="w-6 h-6 rounded-full ring ring-teal-500 text-black font-bold grid place-items-center">
                                            {user?.fullName.charAt(0)}
                                        </p>
                                }

                                <span className="duration-150 group-hover:text-black">{user?.fullName}</span>
                            </div>
                        )
                    }
                </div>
            }

            {
                // ? Just Print List of users ===> that NOT Assign yet...
                // 🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵
                allUserForAssignee?.length > 0 &&
                <div className="mt-2 px-2 overflow-y-auto h-[250px] customScroll pb-2">
                    <p className="text-black py-1">Not assigned</p>
                    {
                        allUserForAssignee
                            ?.filter(user => user.fullName?.toLowerCase()?.includes(searchUserForAssignee?.toLowerCase()))
                            ?.map(user =>
                                <div
                                    key={user?._id}
                                    className="relative group flex items-center px-2.5 py-2 hover:bg-gray-200 space-x-3 cursor-pointer rounded-lg hover:after:content-['Assign'] after:absolute after:text-themeColor after:right-2"
                                    onClick={() => handle_add_assignee_users(user)}
                                >
                                    {
                                        user.avatar
                                            ? <img src={user.avatar} alt="" className="w-6 h-6 rounded-full ring ring-teal-500" />
                                            : <p className="w-6 h-6 rounded-full ring ring-teal-500 text-black font-bold grid place-items-center">
                                                {user?.fullName.charAt(0)}
                                            </p>
                                    }
                                    <span className="duration-150 group-hover:text-black">{user?.fullName}</span>
                                </div>
                            )
                    }
                </div>
            }
        </div>
    )
}

export default AssigneeUser