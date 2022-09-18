import { useStyleContext } from "../../context/StyleContext";
import { getCardAsList } from "../../hooks/useFetch";
import { HiOutlineUserAdd } from "react-icons/hi";
import { month } from "../../constant/data";
import { AddCardButton } from "..";
import { useState, useEffect } from "react";
import AssigneeUser from "../AssigneeUser/AssigneeUser";
import CardProgress from '../Board/CardProgress';
import images from "../../assets";
import { CardModal } from "../Board";
import { create_tag } from "../../api/tags";
import { useSelector } from "react-redux";



const CardAsList = ({ selectedSpaceId }) => {


  const { margin } = useStyleContext();
  const [allCardAsList, setAllCardAsList] = useState([])
  const [cardModal, setCardModal] = useState(false);
  const [localCard, setLocalCard] = useState({})
  const [progress, setProgress] = useState(0)
  const userSelectedWorkSpaceId = useSelector((state) => state.workspace.selectedWorkspace);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

  const [createNewTag, setCreateNewTag] = useState({
    name: "",
    color: "#47b9ea",
  });


  // 🟩🟩🟩
  const handle_new_tag_creation = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // POST Method for creating tag's inside a specific workSpace
      const { data } = await create_tag({ workSpaceId: userSelectedWorkSpaceId, ...createNewTag });
      // console.log(data);
      // dispatch(addNewTag({ newTag: data?.tag, cardID }))
      // setAllCardAsList((pre) => ({ ...pre, tags: [...pre.tags, data.tag] }));
      // setAllCardAsList((pre) => ({ ...pre, tags: [...pre.tags, data.tag] }));
      // workSpaceRef
      // console.log({allCardAsList.tags})

      // setAllCardAsList(pre => ({...pre, tags : pre.tags.find(({workSpaceRef}) => workSpaceRef === data?.tag?._id )}));

    } catch (error) {
      console.log(error)
    }

    // close drop down tag container...
    // setShowTags(false);

    // clear input field
    setCreateNewTag((pre) => ({ ...pre, name: "" }));
  };



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



  useEffect(() => {
    const cardsList = async () => {
      try {
        const { data } = await getCardAsList(selectedSpaceId)
        setAllCardAsList(data?.cards)
      } catch (error) {
        console.log(error);
      }
    }
    cardsList()
  }, [selectedSpaceId])


  useEffect(() => {
    // cardsList()
  }, [allCardAsList])




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
      <section className={`pt-20 px-3 bg-gray-100 h-screen `}>

        <table
          className={`
          ${margin ? 'ml-[325px] w-[81vw]' : 'ml-[50px] w-[95vw]'} 
          duration-200 text-left  `
          }
        >
          <thead className="sticky top-0 left-0 right-0 z-50">
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

                  {/* Card Name */}
                  <td className="p-1 cursor-pointer" onClick={() => setCardModal(true)}>
                    <div className="p-3 hover:bg-gray-300 duration-200 rounded-lg">{card?.name}</div>
                  </td>

                  {/* Assignee User */}
                  <td className="p-1">
                    <div className={`cursor-pointer ${card?.assignee?.length > 0 ? 'w-fit' : 'w-10 '} 
                    relative h-10 flex justify-center items-center rounded-md duration-200 hover:bg-gray-200 group mx-auto`}>
                      {
                        card?.assignee?.length > 0
                          ? card?.assignee?.map((user, i) =>
                            <div
                              key={user?._id}
                              className={`flex relative ${i !== 0 && `-left-${i + 1}`}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenAssigneeUserModal(pre => ({ ...pre, isOpen: !pre.isOpen, index: i }))
                              }}
                            >
                              {
                                user?.avatar
                                  ? <img src={user?.avatar} alt="" className={`w-6 h-6 rounded-full `}
                                    style={{ aspectRatio: '1:1' }} />
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
                            className=""
                            onClick={() => setOpenAssigneeUserModal(pre => ({ ...pre, isOpen: !pre.isOpen, index: i }))}
                          >
                            <HiOutlineUserAdd className="text-xl text-gray-600 group-hover:text-teal-500" />
                          </div>
                      }
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
                  </td>


                  {/* Date */}
                  <td className="p-1">
                    <span className="p-2 cursor-pointer rounded-lg duration-200 hover:bg-gray-300 hover:text-teal-500">Set Dates</span>
                  </td>


                  {/* Progress */}
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


                  {/* user name */}
                  <td className="p-1">
                    <span className="p-3 cursor-pointer hover:text-teal-300 duration-200">
                      {userInfo.fullName}
                    </span>
                  </td>


                  {/* Tags */}
                  <td className="p-1 space-x-1 flex">
                    {
                      card?.tags?.length > 0 &&
                      card?.tags?.slice(0, 2).map(tag =>
                        <span
                          key={tag?._id}
                          style={{ backgroundColor: tag.color }}
                          className="cursor-pointer text-sm rounded-full px-2 py-1 text-white"
                        >
                          {tag.name}
                        </span>
                      )
                    }
                    <div
                      className="relative px-3 text-white bg-gray-500 rounded-full cursor-pointer w-fit"
                      onClick={() => setOpenTagModal(pre => ({ ...pre, isOpen: !pre.isOpen, index: i }))}
                    >
                      ...
                      {
                        openTagModal.isOpen && openTagModal.index === i &&
                        <div className="absolute w-48 p-2 bg-white top-8 left-[50%] translate-x-[-50%] rounded-md z-50 flex flex-wrap gap-2 items-center">
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
                          <form onSubmit={handle_new_tag_creation}>
                            <input
                              type="text"
                              placeholder="Add a tag"
                              className="ml-2 py-1 px-2 outline-none bg-gray-100 w-24 rounded-md text-black"
                              value={createNewTag.name}
                              onClick={e => e.stopPropagation()}
                              onChange={(e) =>
                                setCreateNewTag((pre) => ({
                                  ...pre,
                                  name: e.target.value,
                                }))
                              }
                            // onClick={() => setShowTags(true)}
                            />
                          </form>
                        </div>
                      }
                    </div>
                  </td>

                </tr>
              ))
            }
          </tbody>

        </table>

        <AddCardButton />

        {
          // When Task Click >>> then Modal Open
          cardModal &&
          <CardModal
            card={localCard}
            listID={localCard?.listRef?._id}
            progress={progress}
            setProgress={setProgress}
            setBoardModal={setCardModal}
          // noteDone={noteDone}
          // setNoteDone={setNoteDone}
          />
        }
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