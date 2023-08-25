import { useBoardCardContext } from "../../context/BoardCardContext";
import { create_tag, get_tags, delete_tag } from "../../api/tags";
import { cardUpdateApiCall } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import { XMarkIcon } from "@heroicons/react/24/outline";

const colorStyles = {
  control: (provided, state) => ({
    ...provided,
    borderWidth: 0,
    borderRadius: "1rem",
    backgroundColor: "rgba(236,236,236,0.5)",
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: "1rem",
    padding: "8px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "8px",
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    marginLeft: "-10px",
  }),
};

const CardTags = (props) => {
  const {
    localCard,
    setLocalCard,
    selectedSpaceId,
    selectedWorkspaceId,
    listID,
    handleDataChange,
  } = props || {};
  console.log(props)

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  // const [value, setValue] = useState();
  const { updateCard } = useBoardCardContext();

  // 🟩🟩🟩
  const handle_add_tags = async (tag) => {
    // add for display at UI
    setLocalCard((pre) => ({ ...pre, tags: [...pre.tags, tag] }));

    // remove from drop-down ui of tag's list
    setOptions((pre) => pre.filter((data) => data?._id !== tag?._id));

    const cardTagObject = { ...localCard, tagId: tag._id };

    try {
      const { data } = await cardUpdateApiCall(
        selectedSpaceId,
        listID,
        localCard._id,
        cardTagObject
      );
      handleDataChange();

      updateCard(listID, localCard._id, data.updatedCard);
    } catch (error) {
      console.log(error?.response?.data?.issue);
    }
  };

  // 🟥🟥🟥
  const handle_remove_tags = async (tag) => {
    // add for display at UI
    setLocalCard((pre) => ({
      ...pre,
      tags: pre.tags.filter(({ _id }) => _id !== tag._id),
    }));

    // remove from drop-down ui of tag's list
    setOptions((pre) => [...pre, tag]);

    const tempTagObject = { ...localCard };
    const cardTagRemoved = { ...tempTagObject, removeTagId: tag._id };

    try {
      const { data } = await cardUpdateApiCall(
        selectedSpaceId,
        listID,
        localCard._id,
        cardTagRemoved
      );

      updateCard(listID, localCard._id, data.updatedCard);
      handleDataChange();
    } catch (error) {
      // error for user at notification...
      toast.error(error?.response?.data?.issue, { autoClose: 3000 });
      console.log(error?.response?.data?.issue);
    }
  };

  // 🟩🟩🟩
  const handle_new_tag_creation = async (name) => {
    setIsLoading(true);
    // e.preventDefault();

    const randomColor =
      "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");

    try {
      // POST Method for creating tag's inside a specific workSpace
      const { data } = await create_tag({
        workSpaceId: selectedWorkspaceId,
        name: name,
        color: randomColor,
      });

      const { data: updateCard } = await cardUpdateApiCall(
        selectedSpaceId,
        listID,
        localCard._id,
        { tagId: data.tag._id }
      );
      // console.log(updateCard.updatedCard);
      setLocalCard(updateCard.updatedCard);
      setOptions((pre) => pre.filter((data) => data?._id !== data?.tag?._id));
      handleDataChange();
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handle_delete_tag = async (id) => {
    await delete_tag({
      workSpaceId: selectedWorkspaceId,
      tagId: id,
    });

    setOptions((pre) => pre.filter((data) => data?._id !== id));
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        // GET Method || For fetching all tag's under specific workShop
        const { data } = await get_tags({
          workSpaceId: selectedWorkspaceId,
        });

        // tags
        const remainTag = data?.tags.filter(
          ({ _id }) => !localCard?.tags?.some((tag) => tag._id === _id)
        );

        setOptions(remainTag);
      } catch (error) {
        console.log(error);
      }
    };

    getTags();
  }, [selectedWorkspaceId, localCard?.tags]);

  return (
    <div className="pb-2 relative">
      {/* <div
                onClick={() => setShowTags((pre) => !pre)}
                className="flex items-center gap-2 py-2 cursor-pointer w-fit rounded-md duration-200 text-gray-400  group"
            >
                <Tag className="text-[#B9C3CE] group-hover:text-teal-400" />{' '}
                <span>Tags</span>
            </div> */}

      <div className="py-2 w-fit text-gray-400  group">
        <p className="text-[14px] text-[#818892]">Tags</p>
      </div>

      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        styles={colorStyles}
        isMulti
        options={options}
        value={localCard?.tags || []}
        onChange={(_, e) => {
          if (e.action === "select-option") {
            handle_add_tags(e.option);
          } else {
            handle_remove_tags(e.removedValue);
          }
        }}
        onCreateOption={handle_new_tag_creation}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        components={{
          Option: ({ data, innerRef, innerProps }) => (
            <div
              key={data._id}
              className="p-2 mx-2 hover:bg-[rgba(236,236,236,0.5)] flex justify-between items-center cursor-pointer rounded-2xl"
            >
              <span
                {...innerProps}
                {...innerRef}
                className={`px-2 py-1 w-fit font-inter rounded-full flex items-center gap-2 text-sm`}
                style={{
                  color: "#6B7280",

                  border: `1px solid #E5E7EB`,
                }}
              >
                <div
                  style={{
                    backgroundColor: `${data?.color}90`,
                  }}
                  className="w-2 h-2  rounded-full"
                ></div>{" "}
                {data?.name || data?.label}
              </span>
              <span onClick={() => handle_delete_tag(data?._id)}>
                <XMarkIcon
                  style={{
                    color: data?.color,
                    backgroundColor: `${data?.color}10`,
                    border: `1px solid ${data?.color}`,
                  }}
                  className={`h-5 px-2 py-1 w-fit rounded-full`}
                />
              </span>
            </div>
          ),
          MultiValueLabel: () => null,
          ClearIndicator: () => null,
          //   MultiValueContainer: (props) => <div {...props} />,
          MultiValueRemove: ({ data, innerRef, innerProps }) => (
            <div
              {...innerProps}
              {...innerRef}
              key={data._id}
              className="mr-1 cursor-pointer"
            >
              <span
                className={`px-2 py-1 w-fit flex items-center gap-2 rounded-full text-sm`}
                style={{
                  color: "#6B7280",

                  border: `1px solid #E5E7EB`,
                }}
              >
                <div
                  style={{
                    backgroundColor: `${data?.color}90`,
                  }}
                  className="w-2 h-2  rounded-full"
                ></div>{" "}
                {data?.name}
              </span>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default CardTags;
