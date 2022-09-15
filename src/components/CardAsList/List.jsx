import { useStyleContext } from "../../context/StyleContext";
import { getCardAsList } from "../../hooks/useFetch";
import { HiOutlineUserAdd } from "react-icons/hi";
import { month } from "../../constant/data";
import { AddCardButton } from "..";
import { useState, useEffect } from "react";
import AssigneeUser from "../AssigneeUser/AssigneeUser";
import CardProgress from './../Board/CardProgress';



const List = ({ selectedSpaceId }) => {

  const { margin } = useStyleContext();
  const [allCardAsList, setAllCardAsList] = useState([])

  const [openAssigneeUserModal, setOpenAssigneeUserModal] = useState(false);
  const [openCardProgress, setOpenCardProgress] = useState(false)


  useEffect(() => {
    const cardsList = async () => {
      try {
        const { data } = await getCardAsList(selectedSpaceId)
        setAllCardAsList(data.cards);
      } catch (error) {
        console.log(error);
      }
    }
    cardsList()
  }, [selectedSpaceId])

  console.log(openCardProgress);

  return (
    <section className={`pt-20 px-3 bg-gray-100`}>

      <table className={`${margin ? 'ml-[325px] w-[81vw]' : 'ml-[50px] w-[95vw]'} duration-200  text-left max-h-[800px]`}>

        <thead className="sticky top-0 ">
          <tr className="bg-white p-8 text-gray-400 font-thin font-[Signika]">
            <th className="py-3 px-4">Card Name</th>
            <th className="py-3 px-4">Assign</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Progress</th>
            <th className="py-3 px-4">List</th>
            <th className="py-3 px-4">Tags</th>
          </tr>
        </thead>


        <tbody className="bg-gray-200/70 ">
          {
            allCardAsList?.length > 0 &&
            allCardAsList.map((card, i) => (
              <tr className={`${i % 2 && 'bg-slate-100'}`} key={card._id}>

                <td className="p-1 cursor-pointer">
                  <div className="p-3 hover:bg-gray-300 duration-200 rounded-lg">{card?.name}</div>
                </td>

                {/* Assigne User */}
                <td className="p-1">
                  <div className="cursor-pointer w-10 h-10 flex justify-center items-center rounded-md duration-200 hover:bg-gray-200 group">
                    {
                      card?.assignee?.length > 0
                        ? card?.assignee?.map(user => <p key={user?._id}>{user?.fullName.charAt(0)}</p>)
                        : <div onClick={() => setOpenAssigneeUserModal(pre => !pre)} className="relative">
                          <HiOutlineUserAdd className="text-xl text-gray-600 group-hover:text-teal-500" />
                          {
                            openAssigneeUserModal &&
                            <AssigneeUser className='absolute' />
                          }
                        </div>
                    }
                  </div>
                </td>

                <td className="p-1">
                  <span className="p-2 cursor-pointer rounded-lg duration-200 hover:bg-gray-300 hover:text-teal-500">Set Dates</span>
                </td>

                <td className="p-1">

                  <div
                    onClick={() => setOpenCardProgress(pre => !pre)}
                    className="w-12  h-12 text-center leading-[48px] cursor-pointer rounded-full text-sm bg-white hover:bg-gray-200 hover:text-purple-900 duration-200 relative"
                  >
                    {card?.progress}%

                    {
                      openCardProgress &&
                      
                        <CardProgress list />
                     
                    }
                  </div>

                </td>

                <td className="p-1">
                  <span className="p-3 cursor-pointer hover:text-teal-300 duration-200">
                    DEMO
                  </span>
                </td>

                <td className="p-1 space-x-1">
                  {
                    card?.tags?.length > 0 &&
                    card?.tags?.map(tag =>
                      <span className="cursor-pointer text-sm rounded-full px-2 py-1" key={tag?._id} style={{ backgroundColor: tag.color }}>{tag.name}</span>
                    )
                  }
                </td>

              </tr>
            ))
          }
        </tbody>

      </table>

      <AddCardButton />

    </section >
  );
};

export default List;



// assignee:  []
// listRef : {_id: '6314b5bbc86aca536353b316', name: 'Hello'}
// name : "Testing 1"
// progress : 0
// spaceRef : "62fd8794f02fe7fec417218e"
// tags : []
// _id : "6314b5c4c86aca536353b32a"