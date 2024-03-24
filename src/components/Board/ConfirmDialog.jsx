import { useBoardCardContext } from '../../context/BoardCardContext';
import {
    boardListDelete,
    cardDeleteApiCall,
    cardUpdateApiCall,
} from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { Close } from '../../assets/icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { delete_file_link, get_file_link } from '../../api/showFiles';
import { useDispatch } from 'react-redux';
import { RemoveCard } from '../../store/slice/allboard';
import { DeleteCard } from '../../api/board';

const ConfirmDialog = ({
    listID,
    cardID,
    spaceID,
    spaceFiledID,
    setCardSettingDropDownToggle,
    setConfirmModalOpen,
    setDeleteAttachFileLoading,
    deleteAttachment,
    setLocalCard,
    deleteAttachFile,
    setLinkDatas,
    isDepend,
    setIsDepend
}) => {
    const navigate = useNavigate();

    const { removeBoardList, removeCard } = useBoardCardContext();
    const dispatch = useDispatch();

    const selectedWorkspaceId = useSelector(
        (state) => state.workspace.selectedWorkspace
    );
    const selectedSpaceId = useSelector((state) => state.space.selectedSpace);

    const handleCancel = (e) => {
        // e.stopPropagation();

        if (cardID !== undefined && deleteAttachment === false) {
            setCardSettingDropDownToggle(false);
        } else if (deleteAttachment) {
            setDeleteAttachFileLoading(false);
        } else {
            setConfirmModalOpen(false);
        }
    };

    const handleDelete = async (e) => {
        // e.stopPropagation();



        try {
            if (listID) {
                const { data } = await boardListDelete(selectedSpaceId, listID);
                removeBoardList(listID);
                setIsDepend(!isDepend)
                toast.success(`${data?.message}`, { autoClose: 3000 });
            }

            if (cardID) {
                console.log( spaceID,spaceFiledID)
                dispatch(DeleteCard({spaceId:selectedSpaceId,listId:listID, cardId:cardID})).then((data) => {
                    if (data) {
                      toast.success(data?.payload?.message, {
                        autoClose: 1000,
                      });
                    }
                  })
                  .catch((error) => {
                    //for developer
                    console.error( error);
                  })
                navigate(
                    `/projects/${selectedWorkspaceId}/squad/${selectedSpaceId}`,
                    {
                        state: {
                            tab: 'board',
                        },
                    }
                );
            }

            if (deleteAttachment) {
               
                const { data } = await cardUpdateApiCall(
                    selectedSpaceId,
                    listID,
                    cardID,
                    { removeAttachmentUrl: deleteAttachFile }
                );

                setLocalCard((pre) => ({
                    ...pre,
                    attachments: data.updatedCard.attachments,
                }));
                setDeleteAttachFileLoading(false);
            }


            
            if(spaceFiledID && spaceFiledID ){
               
               const {data} = await delete_file_link(
                spaceID,spaceFiledID
               )

               if(data){
                const  datas  = await get_file_link(selectedSpaceId);

                setLinkDatas(datas?.data?.spaceFiles);
                toast.success(`${data?.message}`, { autoClose: 3000 });
                setConfirmModalOpen(false)
               }
            }
        } catch (error) {
            toast.error(`${error?.response?.data?.issue?.message}`, {
                autoClose: 3000,
            });
        }
    };

    return (
        <div
            // onClick={(e) => e.stopPropagation()}
            className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black/50 grid place-items-center cursor-default"
        >
            <div className="bg-white rounded-lg p-4 space-y-2 relative">
                {/* ❌❌❌❌❌❌❌❌❌ button */}
                <Close
                    onClick={(e) => {
                        handleCancel();
                        setConfirmModalOpen(false);
                    }}
                    className="absolute top-4 right-4 w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 duration-200"
                />

                {}
                <p className="font-bold text-teal-500">
                    DELETE{' '}
                    {`${
                        deleteAttachment
                            ? 'FILE'
                            : cardID === undefined
                            ? 'LIST'
                            : 'CARD'
                    }`}
                </p>

                <p className="pb-3">
                    Are you sure you want to delete this{' '}
                    {`${
                        deleteAttachment
                            ? 'file'
                            : cardID === undefined
                            ? 'list'
                            : 'card'
                    }`}{' '}
                    ?
                </p>

                <div className="flex items-center justify-end gap-3">
                    <div
                        onClick={(e) => {
                            handleCancel();
                            setConfirmModalOpen(false);
                        }}
                        className="px-4 py-2 rounded-lg bg-gray-300 text-white cursor-pointer hover:text-black duration-200 ease-in-out"
                    >
                        Cancel
                    </div>

                    <div
                        className="px-4 py-2 rounded-lg bg-teal-500 text-white cursor-pointer hover:text-black duration-200 ease-in-out"
                        onClick={(e) => {
                            handleDelete();
                            setConfirmModalOpen(false);
                        }}
                    >
                        Delete{' '}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
