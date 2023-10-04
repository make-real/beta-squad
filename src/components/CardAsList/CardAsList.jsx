/* eslint-disable jsx-a11y/alt-text */
import { cardUpdateApiCall, getCardAsList } from "../../hooks/useFetch";
import { useStyleContext } from "../../context/StyleContext";
import { create_tag, get_tags } from "../../api/tags";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CardModal } from "../Board";
import { AddCardButton } from "..";
import AssigneeUser from "../AssigneeUser/AssigneeUser";
import CardProgress from "../Board/CardProgress";
import images from "../../assets";
import Dropdown from "../Dropdown";
import { useBoardCardContext } from "../../context/BoardCardContext";
import { RightOK, UserPlus } from "../../assets/icons";
import TaskDatePicker from "../TaskDatePicker";
import Button from "../Button";
import { formatDate } from "../../util/date";
import sort from "../../assets/sort.svg";
import { useCallback } from "react";

const CardAsList = ({ selectedSpaceId }) => {
  const userSelectedWorkSpaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );
  const selectedSpaceObj = useSelector((state) => state.space.selectedSpaceObj);
  const { updateCard } = useBoardCardContext();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [allCardAsList, setAllCardAsList] = useState([]);
  const [cardModal, setCardModal] = useState(false);
  const [localCard, setLocalCard] = useState({});
  const [progress, setProgress] = useState(0);
  const { margin } = useStyleContext();
  const [tagsFromAPI, setTagsFromAPI] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  const toggleModal = (card) => {
    const copy = [...allCardAsList];
    const index = copy.findIndex((c) => c._id === card._id);
    copy[index].modal = !copy[index].modal;
    setAllCardAsList(copy);
  };

  const updateLocalCard = (card) => {
    const copy = [...allCardAsList];
    const index = copy.findIndex((c) => c._id === card._id);
    copy[index] = { ...card, modal: false };
    setAllCardAsList(copy);
  };

  const [createNewTag, setCreateNewTag] = useState({
    name: "",
    color: "#47b9ea",
  });

  const [showTagsDropDown, setShowTagsDropDown] = useState(false);

  const cardsList = async () => {
    try {
      const { data } = await getCardAsList(selectedSpaceId);
      setAllCardAsList(data?.cards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cardsList();
  }, [selectedSpaceId]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const { data } = await get_tags(userSelectedWorkSpaceId);
        setTagsFromAPI(data.tags);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, [showTagsDropDown, userSelectedWorkSpaceId]);

  const filterTags = (tagsOfArray) => {
    const tagsID = tagsOfArray.map((tag) => tag._id);

    const remainTag = tagsFromAPI?.filter(({ _id }) => !tagsID?.includes(_id));

    return remainTag;
  };

  const handle_new_tag_creation = async (e, card) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { data } = await create_tag({
        workSpaceId: userSelectedWorkSpaceId,
        ...createNewTag,
      });
      await cardUpdateApiCall(selectedSpaceId, card?.listRef?._id, card?._id, {
        tagId: data?.tag?._id,
      });
      toast.success("New tag create + add successful");
    } catch (error) {
      toast.error(error.response.data.issue.message);
    }
    setCreateNewTag((pre) => ({ ...pre, name: "" }));
  };

  const handle_add_tags = async (tag, card) => {
    const cardCopy = [...allCardAsList];
    const cardIndex = cardCopy.findIndex((c) => c._id === card?._id);
    cardCopy[cardIndex].tags.push(tag);
    setAllCardAsList(cardCopy);

    try {
      await cardUpdateApiCall(selectedSpaceId, card?.listRef?._id, card?._id, {
        tagId: tag?._id,
      });
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
  };

  const handle_delete_tags = async (tagDelete, tagIdx, card) => {
    const cardCopy = [...allCardAsList];
    const cardIndex = cardCopy.findIndex((c) => c._id === card?._id);
    cardCopy[cardIndex].tags.splice(tagIdx, 1);
    setAllCardAsList(cardCopy);

    try {
      await cardUpdateApiCall(selectedSpaceId, card?.listRef?._id, card?._id, {
        removeTagId: tagDelete._id,
      });
    } catch (error) {
      toast.error(error?.response?.data?.issue, { autoClose: 3000 });
    }
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
  };

  const cardProgressUpdate = async (p, cardData) => {
    const cardTagObject = { ...cardData, progress: p };
    try {
      setAllCardAsList((pre) =>
        pre.map((card) =>
          card._id === cardData._id ? { ...card, progress: p } : card
        )
      );
      const { data } = await cardUpdateApiCall(
        selectedSpaceId,
        cardData?.listRef?._id,
        cardData._id,
        cardTagObject
      );
      updateCard(cardData?.listRef?._id, cardData._id, data.updatedCard);
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
  };

  const changeDate = async (date, cardData) => {
    const cardTagObject = {
      ...cardData,
      startDate: date.start,
      endDate: date.end,
    };
    try {
      setAllCardAsList((pre) =>
        pre.map((card) => (card._id === cardData._id ? cardTagObject : card))
      );
      const { data } = await cardUpdateApiCall(
        selectedSpaceId,
        cardData?.listRef?._id,
        cardData._id,
        cardTagObject
      );
      updateCard(cardData?.listRef?._id, cardData._id, data.updatedCard);
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
  };

  const sortCards = () => {
    if (!filterBy) {
      return allCardAsList;
    }
    return allCardAsList.sort((sa, sb) => {
      let a = sa[filterBy];
      let b = sb[filterBy];
      if (filterBy.toLocaleLowerCase().includes("name")) {
        [a, b] = [b, a];
      }
      if (filterBy === "endDate") {
        a = a ? new Date(a).getTime() : 0;
        b = b ? new Date(b).getTime() : 0;
      }
      if (a < b) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  return sortCards()?.length === 0 ? (
    <div
      className={`${
        margin ? "ml-[325px] w-[81vw]" : "ml-[50px] w-[95vw]"
      } w-full h-screen flex items-center justify-center flex-col text-center gap-3`}
    >
      <img src={images.cardAsList} alt="cardAsList" className="w-28" />
      <p className="text-2xl font-bold text-slate-400">
        There are no tasks assigned to <br /> you
      </p>

      <p className="text-slate-400 text-sm">
        We’ve searched everything but still no result. Maybe a <br /> little
        spelling mistake?
      </p>
    </div>
  ) : (
    <section className={`pt-20 px-3 bg-gray-100 h-screen `}>
      <table
        className={`
          ${margin ? "ml-[325px] w-[81vw]" : "ml-[50px] w-[95vw]"} 
          duration-200 text-left`}
      >
        <thead className="sticky top-0 left-0 right-0">
          <tr className="bg-white p-8 text-gray-400 font-thin">
            <th
              className="py-3 px-4 cursor-pointer"
              onClick={() => setFilterBy("name")}
            >
              <div className="flex items-center">
                <p>Card Name</p>
                <img className="w-3 h-3 ml-2" src={sort} />
              </div>
            </th>
            <th className="py-3 cursor-pointer">Assign</th>
            <th
              className="py-3 px-4 text-center cursor-pointer"
              onClick={() => setFilterBy("endDate")}
            >
              <div className="flex items-center justify-center">
                <p>Date</p>
                <img className="w-3 h-3 ml-2" src={sort} />
              </div>
            </th>
            <th
              className="py-3 px-4 text-center cursor-pointer"
              onClick={() => setFilterBy("progress")}
            >
              <div className="flex items-center justify-center">
                <p>Progress</p>
                <img className="w-3 h-3 ml-2" src={sort} />
              </div>
            </th>
            <th className="py-3 px-4 cursor-pointer">List</th>
            <th className="py-3 cursor-pointer">Tags</th>
          </tr>
        </thead>

        <tbody className="bg-gray-200/70 ">
          {sortCards()?.length > 0 &&
            sortCards().map((card, i) => (
              <>
                <tr key={card?._id} className={`${i % 2 && "bg-slate-100"}`}>
                  {/* Card Name */}
                  <td
                    className="p-1 cursor-pointer"
                    onClick={() => {
                      toggleModal(card);
                    }}
                  >
                    <div className="p-3 hover:bg-gray-300 duration-200 rounded-lg">
                      {card?.name}
                    </div>
                  </td>

                  {/* Assignee User */}
                  <td className="p-1">
                    <div
                      className={`pl-[10px] relative h-10 flex items-center`}
                    >
                      {card.assignee?.slice(0, 3).map((user, i) => (
                        <div key={user._id} className="ml-[-8px]">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt=""
                              className="w-8 h-8 rounded-full bg-slate-600 border-slate-500 border-2"
                            />
                          ) : (
                            <p className="w-8 h-8 rounded-full bg-slate-600 border-slate-500 border-2 text-white text-xs flex items-center justify-center">
                              {user?.fullName.charAt(0)}
                            </p>
                          )}
                        </div>
                      ))}
                      <Dropdown
                        width={400}
                        button={
                          <div className="cursor-pointer z-10 w-8 h-8 rounded-full bg-white text-slate-400 font-bold grid place-items-center ml-[-8px]">
                            <UserPlus className="w-5 h-5" />
                          </div>
                        }
                        menu={() => (
                          <AssigneeUser
                            listID={card?.listRef?._id}
                            localCard={card}
                            spaceID={card?.spaceRef}
                            setLocalCard={updateLocalCard}
                          />
                        )}
                      />
                      {/* {openAssigneeUserModal.isOpen &&
                      openAssigneeUserModal.index === i && (
                      )} */}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-1">
                    <Dropdown
                      width={350}
                      button={
                        card.startDate ? (
                          <div className="p-2 text-center cursor-pointer rounded-lg duration-200 hover:bg-gray-300 hover:text-teal-500">
                            {formatDate(card.startDate, "MMM, dd")} -{" "}
                            {formatDate(card.endDate, "MMM, dd")}
                          </div>
                        ) : (
                          <div className="p-2 text-center cursor-pointer rounded-lg duration-200 hover:bg-gray-300 hover:text-teal-500">
                            -
                          </div>
                        )
                      }
                      menu={({ closePopup }) => (
                        <TaskDatePicker
                          startDate={card?.startDate}
                          endDate={card?.endDate}
                          onChange={(date) => {
                            closePopup();
                            changeDate(date, card);
                          }}
                          close={closePopup}
                        />
                      )}
                    />
                  </td>

                  {/* Progress */}
                  <td className="p-1">
                    <Dropdown
                      width={300}
                      button={
                        <div
                          style={{
                            background:
                              card?.progress === 4
                                ? selectedSpaceObj?.color
                                : "grey",
                          }}
                          className={`cursor-pointer m-auto flex items-center justify-center w-8 h-8 rounded-full text-white`}
                        >
                          {card?.progress === 4 ? (
                            <RightOK className="w-5 h-5" />
                          ) : (
                            <span className="text-[10px] text-center">
                              {progressStatus(card?.progress)}%
                            </span>
                          )}
                        </div>
                      }
                      menu={() => (
                        <CardProgress
                          setProgress={(v) => {
                            cardProgressUpdate(v, card);
                          }}
                          progress={card?.progress}
                        />
                      )}
                    />
                  </td>

                  {/* user name */}
                  <td className="p-1">
                    <span className="p-3 cursor-pointer hover:text-violet-700 duration-200">
                      {card.listRef.name}
                    </span>
                  </td>

                  {/* Tags */}
                  <td className="p-1">
                    <div className="flex items-center space-x-1">
                      {card?.tags?.slice(0, 2).map((tag, i) => (
                        <span
                          key={tag?._id}
                          style={{ backgroundColor: tag.color }}
                          className="cursor-pointer text-xs rounded-full px-2 py-1 text-white self-center"
                          onClick={() => handle_delete_tags(tag, i, card)}
                        >
                          {tag.name}
                        </span>
                      ))}
                      <Dropdown
                        position={i < 5 ? "bottom right" : "top right"}
                        width={350}
                        button={
                          !card?.tags.length ? (
                            <div className="cursor-pointer bg-white text-sm rounded-sm px-4 py-1 text-slate-700 self-center">
                              Add Tag
                            </div>
                          ) : (
                            <div className="cursor-pointer bg-slate-400 text-sm rounded-full px-4 py-1 text-white self-center">
                              ...
                            </div>
                          )
                        }
                        menu={() => (
                          <div>
                            <div className="flex flex-wrap">
                              {card?.tags?.map((tag, tagIdx) => (
                                <span
                                  key={tag?._id}
                                  style={{ backgroundColor: tag.color }}
                                  className="cursor-pointer text-xs rounded-full px-2 py-1 mr-2 mb-2 text-white self-center"
                                  onClick={(e) =>
                                    handle_delete_tags(tag, tagIdx, card)
                                  }
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                            <div>
                              <form
                                onSubmit={(e) =>
                                  handle_new_tag_creation(e, card)
                                }
                              >
                                <input
                                  type="text"
                                  placeholder="Add a tag..."
                                  className="my-2 py-2 px-2 outline-none w-full border rounded-md text-black"
                                  value={createNewTag.name}
                                  onChange={(e) =>
                                    setCreateNewTag((pre) => ({
                                      ...pre,
                                      name: e.target.value,
                                    }))
                                  }
                                />
                              </form>
                            </div>
                            <div className="bg-white text-black max-h-[300px] overflow-auto customScroll">
                              {filterTags(card?.tags)?.map((tag) => (
                                <p
                                  key={tag?._id}
                                  className="cursor-pointer my-4 text-white"
                                  onClick={() => handle_add_tags(tag, card)}
                                >
                                  <span
                                    style={{
                                      backgroundColor: tag.color,
                                    }}
                                    className="text-sm rounded-full px-3 py-2"
                                  >
                                    {tag.name}
                                  </span>
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </td>
                </tr>
                {card.modal && (
                  <CardModal
                    card={card}
                    listID={card?.listRef?._id}
                    progress={card?.progress}
                    setProgress={setProgress}
                    setBoardModal={(updatedCard) => {
                      updateLocalCard(updatedCard);
                    }}
                    // handleDataChange={cardsList}
                  />
                )}
              </>
            ))}
        </tbody>
      </table>

      <AddCardButton />
    </section>
  );
};

export default CardAsList;
