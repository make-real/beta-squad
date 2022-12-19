import { useBoardCardContext } from '../../context/BoardCardContext';
import { create_tag, get_tags } from '../../api/tags';
import { cardUpdateApiCall } from '../../hooks/useFetch';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Select from 'react-select';

const colorStyles = {
    control: (provided, state) => ({
        ...provided,
        borderWidth: 0,
        borderRadius: '1rem',
        backgroundColor: 'rgba(236,236,236,0.5)',
    }),
    menu: (provided, state) => ({
        ...provided,
        borderRadius: '1rem',
        padding: '8px',
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        padding: '8px',
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        marginLeft: '-10px',
    }),
};

const CardTags = (props) => {
    const {
        localCard,
        setLocalCard,
        selectedSpaceId,
        listID,
        handleDataChange,
    } = props || {};

    const userSelectedWorkSpaceId = useSelector(
        (state) => state.workspace.selectedWorkspace
    );

    const { updateCard } = useBoardCardContext();
    const [showTags, setShowTags] = useState(false);
    const [tagsFromAPI, setTagsFromAPI] = useState([]);
    const [createNewTag, setCreateNewTag] = useState({
        name: '',
        color: '#47b9ea',
    });

    // 🟩🟩🟩
    const handle_add_tags = async (tag) => {
        // add for display at UI
        setLocalCard((pre) => ({ ...pre, tags: [...pre.tags, tag] }));

        // remove from drop-down ui of tag's list
        setTagsFromAPI((pre) => pre.filter((data) => data?._id !== tag?._id));

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
    const handle_delete_tags = async (tag) => {
        // add for display at UI
        setLocalCard((pre) => ({
            ...pre,
            tags: pre.tags.filter(({ _id }) => _id !== tag._id),
        }));

        // remove from drop-down ui of tag's list
        setTagsFromAPI((pre) => [...pre, tag]);

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
    const handle_new_tag_creation = async (e) => {
        e.preventDefault();

        try {
            // POST Method for creating tag's inside a specific workSpace
            const { data } = await create_tag({
                workSpaceId: userSelectedWorkSpaceId,
                ...createNewTag,
            });
            const { data: updateCard } = await cardUpdateApiCall(
                selectedSpaceId,
                listID,
                localCard._id,
                { tagId: data.tag._id }
            );
            // console.log(updateCard.updatedCard);
            setLocalCard(updateCard.updatedCard);
            setTagsFromAPI((pre) =>
                pre.filter((data) => data?._id !== data?.tag?._id)
            );
            handleDataChange();
        } catch (error) {
            console.log(error);
        }

        // close drop down tag container...
        setShowTags(false);

        // clear input field
        setCreateNewTag((pre) => ({ ...pre, name: '' }));
    };

    useEffect(() => {
        const getTags = async () => {
            try {
                // GET Method || For fetching all tag's under specific workShop
                const { data } = await get_tags(userSelectedWorkSpaceId);

                // tags
                const remainTag = data?.tags.filter(
                    ({ _id }) =>
                        !localCard?.tags?.some((tag) => tag._id === _id)
                );

                setTagsFromAPI(remainTag);
            } catch (error) {
                console.log(error);
            }
        };

        getTags();
    }, [userSelectedWorkSpaceId, createNewTag, localCard?.tags]);
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

            <Select
                styles={colorStyles}
                isMulti
                options={tagsFromAPI}
                value={localCard?.tags || []}
                onChange={(_, e) => {
                    if (e.action === 'select-option') {
                        handle_add_tags(e.option);
                    } else {
                        handle_delete_tags(e.removedValue);
                    }
                }}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                components={{
                    Option: ({ data, innerRef, innerProps }) => (
                        <div
                            {...innerProps}
                            {...innerRef}
                            key={data._id}
                            className="pl-3 mx-2 py-2 hover:bg-[rgba(236,236,236,0.5)] flex items-center cursor-pointer rounded-2xl"
                        >
                            <span
                                className={`px-2 py-1 w-fit rounded-full text-sm`}
                                style={{
                                    color: data?.color,
                                    backgroundColor: `${data?.color}10`,
                                    border: `1px solid ${data?.color}`,
                                }}
                            >
                                {data?.name}
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
                                className={`px-2 py-1 w-fit rounded-full text-sm`}
                                style={{
                                    color: data?.color,
                                    backgroundColor: `${data?.color}10`,
                                    border: `1px solid ${data?.color}`,
                                }}
                            >
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
