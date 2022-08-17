import { useBoardCardContext } from '../../context/BoardCardContext';
import { boardListDelete, cardDelete } from '../../hooks/useFetch';
import { deleteList } from '../../store/slice/boardListsCards';
import { useSelector, useDispatch } from "react-redux";
import { Close } from '../../assets/icons'
import { toast } from 'react-toastify';


// This <Component /> called by 🟨🟨🟨 BoardListSettingDropDown.jsx 🟨🟨🟨
// This <Component /> called by 🟨🟨🟨 CardSettingDropDown.jsx 🟨🟨🟨
const ConfirmDialog = ({ listID, cardID, setCardSettingDropDownToggle, setConfirmModalOpen }) => {

  const { removeBoardList, removeCard } = useBoardCardContext();

  const selectedSpaceId = useSelector(state => state.space.selectedSpace);
  const dispatch = useDispatch();



  //🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
  const handleCancel = (e) => {
    e.stopPropagation();

    // for closing confirm modal window
    setConfirmModalOpen(false);

    if (cardID !== undefined) {
      setCardSettingDropDownToggle(false);

    } else {

    }
  }


  //🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
  const handleDelete = async (e) => {
    e.stopPropagation();

    // for closing confirm modal window
    setConfirmModalOpen(false);

    try {
      // if no card id is present, its mean list delete operation happening by user
      if (cardID === undefined) {

        const { data } = await boardListDelete(selectedSpaceId, listID);

        // list delete
        // removeBoardList(listID);
        
        dispatch(deleteList(listID));

        // display a notification for user
        toast.success(`${data?.message}`, { autoClose: 3000 });
      } else {

        const { data } = await cardDelete(selectedSpaceId, listID, cardID);

        // card delete
        removeCard(listID, cardID);


        // display a notification for user
        toast.success(`${data?.message}`, { autoClose: 3000 });
      }
    } catch (error) {
      console.log(error?.response?.data?.issue?.message);
      toast.error(`${error?.response?.data?.issue?.message}`, { autoClose: 3000 });
    }
  }



  return (
    <div
      onClick={e => e.stopPropagation()}
      className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50 grid place-items-center cursor-default'
    >

      <div className='bg-white rounded-lg p-4 space-y-2 relative'>

        {/* ❌❌❌❌❌❌❌❌❌ button */}
        <Close
          onClick={handleCancel}
          className='absolute top-4 right-4 w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 duration-200'
        />

        <p className='font-bold text-teal-500'>DELETE {`${cardID === undefined ? 'LIST' : 'CARD'}`}</p>

        <p className='pb-3'>Are you sure you want to delete this {`${cardID === undefined ? 'list' : 'card'}`} ?</p>

        <div className='flex items-center justify-end gap-3'>
          <div
            onClick={handleCancel}
            className='px-4 py-2 rounded-lg bg-gray-300 text-white cursor-pointer hover:text-black duration-200 ease-in-out'
          >Cancel</div>

          <div className='px-4 py-2 rounded-lg bg-teal-500 text-white cursor-pointer hover:text-black duration-200 ease-in-out'
            onClick={handleDelete}
          >Delete </div>
        </div>
      </div>

    </div>
  )
}

export default ConfirmDialog