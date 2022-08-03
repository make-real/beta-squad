import { useBoardCardContext } from '../../context/BoardCardContext';
import { Close } from '../../assets/icons'


// This <Component /> called by 🟨🟨🟨 BoardListSettingDropDown.jsx 🟨🟨🟨
// This <Component /> called by 🟨🟨🟨 CardSettingDropDown.jsx 🟨🟨🟨
const ConfirmDialog = ({ listID, cardID, setBoardListSettingDropDownToggle, setCardSettingDropDownToggle, setConfirmModalOpen }) => {

  const { removeList, removeCard } = useBoardCardContext();


  //🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
  const handleCancel = (e) => {
    e.stopPropagation();

    // for closing confirm modal window
    setConfirmModalOpen(false);

    if (cardID === undefined) {
      setBoardListSettingDropDownToggle(false);
    } else {
      setCardSettingDropDownToggle(false);
    }
  }


  //🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
  const handleDelete = (e) => {
    e.stopPropagation();

    // for closing confirm modal window
    setConfirmModalOpen(false);

    // if no card id is present, its mean list delete operation happening by user
    if (cardID === undefined) {
      // list delete
      removeList(listID);
      setBoardListSettingDropDownToggle(false);

    } else {
      // card delete
      removeCard(listID, cardID);
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

        <p className='font-bold text-teal-500'>ARCHIVE LIST</p>

        <p className='pb-3'>Are you sure you want to archive this list?</p>

        <div className='flex items-center justify-end gap-3'>
          <div
            onClick={handleCancel}
            className='px-4 py-2 rounded-lg bg-gray-300 text-white cursor-pointer hover:text-black duration-200 ease-in-out'
          >Cancel</div>

          <div className='px-4 py-2 rounded-lg bg-teal-500 text-white cursor-pointer hover:text-black duration-200 ease-in-out'
            onClick={handleDelete}
          >Archive </div>
        </div>
      </div>

    </div>
  )
}

export default ConfirmDialog