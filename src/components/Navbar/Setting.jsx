import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineCheck, AiOutlineInfoCircle } from "react-icons/ai";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { update_space } from "../../api/space";
import { toast } from "react-toastify";
import { updateSpace } from "../../store/slice/space";
import ColorPicker from "../ColorPicker";
import {PRIVACY} from '../../constant/enums'

const Setting = () => {
  const [space, setSpace] = useState({
    name: "",
    description: "",
    color: "",
    privacy: "",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { selectedSpace, allSpaces } = useSelector((state) => state.space);

  useEffect(() => {
    const currentSpace = allSpaces?.find(
      (space) => space._id === selectedSpace
    );
    setSpace(currentSpace);
  }, [selectedSpace]);

  const onChange = (e) => {
    setSpace({ ...space, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await update_space(selectedSpace, space);
      dispatch(updateSpace(space));
      toast.success("Your space has been updated!", { autoClose: 1000 });
      setLoading(false);
    } catch (error) {
      toast.error(error.message, { autoClose: 1000 });
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <section className="p-2 pb-[100px]">
      <div className="flex text-teal-600 text-sm">
        <FiSettings className="my-auto" />{" "}
        <span className="my-auto pl-2">Setting</span>
      </div>

      {/* <p className="text-sm text-gray-400 p-3">
        Note that only Space manager can fully modify space settings.
      </p> */}

      <div className="mt-5 bg-white p-3.5 rounded-md">
        <div className="flex text-gray-600">
          <AiOutlineInfoCircle className="my-auto" />
          <h6 className="pl-3"> Details</h6>
        </div>

        <div className="py-3">
          <label className="text-gray-700">Space Name</label>
          <input
            name="name"
            value={space?.name}
            onChange={onChange}
            type="text"
            placeholder="Space clone"
            className="border w-full bg-slate-100 rounded-md p-1 mt-2"
          />
        </div>

        <div>
          <label className="pb-1.5 text-gray-700">Purpose</label>
          <textarea
            value={space?.description || ""}
            name="description"
            onChange={onChange}
            id=""
            rows="3"
            className="border w-full bg-slate-100 rounded-md p-1 mt-2"
          ></textarea>
        </div>
      </div>
      <div className="mt-5 bg-white p-3.5 rounded-md">
        <div className="flex text-gray-600 mb-3">
          <AiOutlineInfoCircle className="my-auto" />
          <h6 className="pl-3">Colour</h6>
        </div>
        <ColorPicker
          value={space.color}
          onChange={(c) => setSpace((prev) => ({ ...prev, color: c }))}
        />
      </div>

      <div className="my-5 bg-white p-3.5 rounded-md">
        <div className="flex justify-between text-gray-600">
          <div className="flex text-gray-700">
            <AiOutlineInfoCircle className="my-auto" />
            <h6 className="pl-3">Space privacy</h6>
          </div>
        </div>

        <div className="py-3">
          <div className="flex items-center gap-3 mb-1">
            <input
              type="radio"
              value="public"
              className="radioButton"
              checked={space.privacy === PRIVACY.PUBLIC}
              onChange={(e) =>
                setSpace((pre) => ({
                  ...pre,
                  privacy: e.target.value,
                }))
              }
            />
            <label htmlFor="public" className="cursor-pointer">
              Public to team
            </label>
          </div>
          <p className="pl-7 text-xs text-gray-400">
            Space is visible to members of your team. Only people added to the
            space can edit it.
          </p>

          <div className="flex items-center gap-3 mb-1 mt-4">
            <input
              type="radio"
              value="private"
              className="radioButton"
              checked={space.privacy === PRIVACY.PRIVATE}
              onChange={(e) =>
                setSpace((pre) => ({
                  ...pre,
                  privacy: e.target.value,
                }))
              }
            />
            <label htmlFor="private" className="cursor-pointer">
              Private
            </label>
          </div>

          <p className="pl-7 text-xs text-gray-400">
            Space is private. Only people added to the space can view it and
            edit.
          </p>
        </div>
      </div>
      <Button onClick={onSubmit} loading={loading} block className="mt-5">
        Save
      </Button>
    </section>
  );
};

export default Setting;
