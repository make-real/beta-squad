import { CardChip } from ".";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfirmDialog";
import { Link } from "react-router-dom";
import moment from "moment";
import Flag from "../../assets/icons/svg/Flag";
import Check from "../../assets/card-check.svg";
import { GoCommentDiscussion } from "react-icons/go";
import { GrAttachment } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { UpdatedCard } from "../../api/board";
import { toast } from "react-toastify";

// This <Component /> called by 🟨🟨🟨 BoardList.jsx 🟨🟨🟨
const Card = ({ card, listID }) => {
  const dropDownRef = useRef();

  const dispatch = useDispatch();
  const [progress, setProgress] = useState(card?.progress);
  const selectedSpaceObj = useSelector((state) => state.space.selectedSpaceObj);
  const selectedWorkspaceId = useSelector(
    (state) => state.workspace.selectedWorkspace
  );
  const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

  const [localCard, setLocalCard] = useState(card);

  const handleClick = (e) => {
    if (!dropDownRef?.current?.contains(e.target)) {
    }
  };

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleProgressUpdate = async () => {
    setProgress((pre) => (pre === 4 ? 0 : 4));

    const cardTagObject = { ...card, progress: progress === 0 ? 4 : 0 };

    try {
      dispatch(
        UpdatedCard({
          spaceId: selectedSpaceId,
          listId: listID,
          cardId: card._id,
          cardObj: cardTagObject,
        })
      )
        .then((data) => {
          if (data) {
            toast.success(
              `${data?.payload?.updatedCard?.name} - card updated`,
              {
                autoClose: 1000,
              }
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const checked = card.checkList?.filter((item) => item?.checked);
  const unchecked = card.checkList?.filter((item) => !item?.checked);
  const assignee = card.assignee;
  let assineesLength;
  if (assignee) {
    assineesLength = assignee.length;
  } else {
    assineesLength = 0;
  }
  const neededLength = assineesLength - 5;
  let sliced;
  if (assignee) {
    sliced = assignee.slice(0, 5);
  } else {
    sliced = [];
  }

  const neededValue = neededLength > 0;

  const hexToRgb = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
  };
  const rgb = hexToRgb(card?.color);

  const averageRgb = (rgb) => {
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];
    return (r + g + b) / 3;
  };
  const average = averageRgb(rgb);
  const isDark = average > 100;

  const Description = localCard.description;

  return (
    <>
      <div
        ref={dropDownRef}
        className="group relative w-[285px] h-fit bg-white px-3 py-3 rounded-2xl cursor-grab hover:bg-gray-200"
      >
        <span
          className={`absolute top-0 left-0 py-[3px] px-3 text-xs rounded-t-[16px] rounded-tr-none rounded-bl-none rounded-br-[10px] ${
            isDark ? "text-black" : "text-white"
          }`}
          style={{ backgroundColor: card?.color }}
        >
          {card.cardKey}
        </span>
        {/* message indicator */}
        {card?.seen === false && (
          <span
            className="absolute -top-1 right-1 h-3 w-3 rounded-full"
            style={{ backgroundColor: "#FF3659" }}
          />
        )}
        <div className="flex items-center justify-between">
          <div>
            {" "}
            {card?.tags?.length > 0 && (
              <div className="flex justify-between items-center ">
                <div className=" text-white mt-5  flex gap-1 flex-wrap">
                  {card?.tags?.length
                    ? card?.tags?.map((tag) => (
                        <CardChip small tag={tag} key={tag?._id} />
                      ))
                    : null}
                </div>
                <div
                  style={{}}
                  className={`mt-[2px] flex items-center justify-center w-5 h-5 rounded-full text-white`}
                >
                  {progress === 4 && (
                    <img src={Check} alt="" className="w-6 h-6" />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="absolute right-1 p-[5px] top-0">
            {card.endDate && (
              <div className="flex items-center gap-2 ">
                <div>
                  <Flag />
                </div>

                <p className="text-gray-400 text-[12px]">
                  {moment(card.endDate).format("MMMM DD")}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mb-1">
          <p className="text-[16px] leading-6 mt-[12px] mr-4 font-inter text-[rgba(17, 24, 39, 1)]  font-normal line-clamp-2">
            {card.name}
          </p>
        </div>
        <div className="text-sm text-gray-800">
          <p
            id="desText"
            className="line-clamp-2 font-[12px] leading-[17.5px] font-inter"
            dangerouslySetInnerHTML={{ __html: Description }}
          ></p>
        </div>

        {!!(checked?.length + unchecked?.length) && (
          <div className="relative flex items-center mt-2">
            <div className="relative flex w-[100px] h-2 bg-slate-300 rounded-full">
              <div
                style={{
                  backgroundColor: selectedSpaceObj?.color,
                  width:
                    (checked.length / (checked.length + unchecked.length)) *
                      100 +
                    "%",
                }}
                className="h-full rounded-full"
              />
            </div>
            <p className="text-gray-400 text-sm ml-2">
              {checked?.length}/{checked?.length + unchecked?.length}
            </p>
          </div>
        )}

        {!!card.assignee?.length && (
          <>
            <div className="flex">
              <div className="mb-3 flex pt-2">
                {sliced?.map((user, i) => (
                  <div key={i} style={{ marginLeft: i ? "-5px" : 0 }}>
                    {user.avatar ? (
                      <div className="flex">
                        {" "}
                        <img
                          src={user.avatar}
                          alt=""
                          className="w-7 h-7 rounded-full bg-white"
                        />
                      </div>
                    ) : (
                      <p className="w-6 h-6 rounded-full bg-white text-black font-bold grid place-items-center">
                        {user?.fullName.charAt(0)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="-mx-2 mt-2">
                {card?.assignee && neededValue ? (
                  <p className="w-7 h-7 rounded-full bg-red-300 bg-opacity-50 text-center">
                    +{neededLength}
                  </p>
                ) : (
                  " "
                )}
              </div>
            </div>
            <div className="flex  justify-end">
              <>
                <div className="flex -my-10 mr-3">
                  <GoCommentDiscussion className="mt-1 " />
                  <p className="mx-1">{card.commentsCount}</p>
                </div>
              </>
              <>
                <div className="flex -my-10 ">
                  <GrAttachment className="mt-1" />
                  <p className="mx-1">{card.attachmentsCount}</p>
                </div>
              </>
            </div>
          </>
        )}

        {/* hover element */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl w-full h-0 flex flex-col justify-center items-center bg-[#031124]/[0.6] opacity-0 group-hover:h-full group-hover:opacity-100 duration-100 ease-in-out">
          <div className="absolute top-2 right-2 grid grid-cols-2 gap-2 place-content-end text-white">
            <span className="cursor-pointer">
              <TrashIcon
                className="w-5 h-5"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmModalOpen(true);
                }}
              />
            </span>
            <span className="cursor-pointer">
              <CheckCircleIcon
                className={`w-5 h-5 ${
                  progress === 4 ? "bg-[#54CC7C] rounded-full" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProgressUpdate();
                }}
              />
            </span>
          </div>

          <Link
            to={`/projects/${selectedWorkspaceId}/squad/${selectedSpaceId}/board/${card._id}`}
          >
            <span className="flex justify-center items-center p-2 rounded-xl bg-[#031124]/[0.4] hover:bg-[#031124]/[0.6] duration-300 text-white cursor-pointer">
              <EyeIcon className="mr-2 w-5 h-5" />
              <p>View</p>
            </span>
          </Link>
        </div>
      </div>

      {confirmModalOpen && (
        <ConfirmDialog
          listID={listID}
          cardID={card._id}
          setConfirmModalOpen={setConfirmModalOpen}
        />
      )}
    </>
  );
};

export default Card;
