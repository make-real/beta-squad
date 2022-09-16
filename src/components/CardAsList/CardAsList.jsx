import { useStyleContext } from "../../context/StyleContext";
import { getCardAsList } from "../../hooks/useFetch";
import { HiOutlineUserAdd } from "react-icons/hi";
import { month } from "../../constant/data";
import { AddCardButton } from "..";
import { useState, useEffect } from "react";
import AssigneeUser from "../AssigneeUser/AssigneeUser";
import CardProgress from '../Board/CardProgress';
import images from "../../assets";



const CardAsList = ({ selectedSpaceId }) => {

  const { margin } = useStyleContext();
  const [allCardAsList, setAllCardAsList] = useState([])

  const [openAssigneeUserModal, setOpenAssigneeUserModal] = useState({
    isOpen: false,
    index: 0,
  });

  const [openCardProgress, setOpenCardProgress] = useState({
    isOpen: false,
    index: 0,
  });

  const [openTagModal, setOpenTagModal] = useState({
    isOpen: false,
    index: 0,
  })


  const progressStatus = (progress) => {
    switch (progress) {
      case 4:
        return 100;
      case 3:
        return 75;
      case 2:
        return 50;
      case 1:
        return 25;
      default:
        return 0;
    }
  }

  // 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
  // console.log(allCardAsList);
  // console.log('assignee', openAssigneeUserModal);

  //   {
  //     "_id": "62fd8d11f02fe7fec41725ff",
  //     "name": "Var",
  //     "progress": 4,
  //     "tags": [
  //         {
  //             "_id": "631a263453e3c0797afe91fc",
  //             "name": "JSX",
  //             "color": "#facc15"
  //         }
  //     ],
  //     "assignee": [
  //         {
  //             "_id": "62f2c5566a44ceb7795f7a31",
  //             "fullName": "taiseen",
  //             "username": "taiseen",
  //             "avatar": "https://res.cloudinary.com/duaxe7mr0/raw/upload/v1662658077/jx42zlvht3uqpysywu0s.jpg"
  //         }
  //     ],
  //     "spaceRef": "62fd87a5f02fe7fec4172196",
  //     "listRef": {
  //         "_id": "62fd8d07f02fe7fec41725c6",
  //         "name": "Variable"
  //     }
  // }

  const [localCard, setLocalCard] = useState({})

  useEffect(() => {
    const cardsList = async () => {
      try {
        const { data } = await getCardAsList(selectedSpaceId)
        setAllCardAsList(data.cards);
        // console.log(data.cards);
      } catch (error) {
        console.log(error);
      }
    }
    cardsList()
  }, [selectedSpaceId])




  return allCardAsList?.length === 0
    ? (
      <div
        className={`${margin ? 'ml-[325px] w-[81vw]' : 'ml-[50px] w-[95vw]'} w-full h-screen flex items-center justify-center flex-col text-center gap-3`}>
        <img src={images.cardAsList} alt="cardAsList" className="w-28" />
        <p className="text-2xl font-bold text-slate-400">There are no tasks assigned to <br /> you</p>

        <p className="text-slate-400 text-sm">We’ve searched everything but still no result. Maybe a <br /> little spelling mistake?</p>
      </div>
    )
    : (
      <section className={`pt-20 px-3 bg-gray-100`}>

        <table
          className={`
          ${margin ? 'ml-[325px] w-[81vw]' : 'ml-[50px] w-[95vw]'} 
          duration-200 text-left max-h-[800px] `
          }
        >
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
                <tr
                  key={card._id}
                  className={`${i % 2 && 'bg-slate-100'}`}
                  onClick={() => setLocalCard(card)}
                >

                  <td className="p-1 cursor-pointer">
                    <div className="p-3 hover:bg-gray-300 duration-200 rounded-lg">{card?.name}</div>
                  </td>

                  {/* Assignee User */}
                  <td className="p-1">
                    <div className="cursor-pointer w-10 h-10 flex justify-center items-center rounded-md duration-200 hover:bg-gray-200 group">
                      {
                        card?.assignee?.length > 0
                          ? card?.assignee?.map((user, i) =>
                            <div
                              key={user?._id}
                              className='flex -space-x-2'
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenAssigneeUserModal(pre => ({ ...pre, isOpen: !pre.isOpen, index: i }))
                              }}
                            >
                              {
                                user?.avatar
                                  ? <img src={user?.avatar} alt="" className="w-6 h-6 rounded-full " />
                                  : (
                                    <p
                                      className='w-6 h-6 rounded-full bg-gray-400 leading-6 text-center'
                                    >
                                      {user?.fullName.charAt(0).toUpperCase()}
                                    </p>
                                  )
                              }

                            </div>
                          )

                          : <div
                            className="relative"
                            onClick={() => setOpenAssigneeUserModal(pre => ({ ...pre, isOpen: !pre.isOpen, index: i }))}
                          >
                            <HiOutlineUserAdd className="text-xl text-gray-600 group-hover:text-teal-500" />
                            {
                              openAssigneeUserModal.isOpen && openAssigneeUserModal.index === i &&
                              <AssigneeUser
                                className='absolute'
                                listID={localCard?.listRef?._id}
                                localCard={localCard}
                                spaceID={localCard?.spaceRef}
                                setLocalCard={setLocalCard}
                                openAssigneeModal={openAssigneeUserModal.isOpen}
                              />
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
                      onClick={() => setOpenCardProgress(pre => ({ ...pre, isOpen: !pre.isOpen, index: i }))}
                      className="w-12  h-12 text-center leading-[48px] cursor-pointer rounded-full text-sm bg-white hover:bg-gray-200 hover:text-purple-900 duration-200 relative"
                    >
                      {progressStatus(card?.progress)}%

                      {
                        openCardProgress.isOpen && openCardProgress.index === i &&

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
                        <span
                          key={tag?._id}
                          style={{ backgroundColor: tag.color }}
                          className="cursor-pointer text-sm rounded-full px-2 py-1"
                        >
                          {tag.name}
                        </span>
                      )
                    }
                    <span
                      className="px-2 text-white bg-gray-500 rounded-full cursor-pointer"
                      onClick={() => setOpenTagModal(pre => ({ ...pre, isOpen: !pre.isOpen, index: i }))}
                    >
                      ...
                    </span>
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

export default CardAsList;



// assignee:  []
// listRef : {_id: '6314b5bbc86aca536353b316', name: 'Hello'}
// name : "Testing 1"
// progress : 0
// spaceRef : "62fd8794f02fe7fec417218e"
// tags : []
// _id : "6314b5c4c86aca536353b32a"