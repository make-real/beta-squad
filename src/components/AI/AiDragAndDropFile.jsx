import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { FileUploader } from "react-drag-drop-files";

// const fileTypes = ['JPEG', 'JPG', 'PNG', 'GIF'];

function AiDragAndDropFile({
  setAttachFileLoading,
  cardAttachmentUpdateApiCall,
  selectedSpaceId,
  listID,
  card,
  setLocalCard,
  handleDataChange,
  handle_card_attachments
}) {


  const stack2 = (
    <div className="flex justify-center items-center p-4 rounded-2xl border-2 border-dashed space-x-1 cursor-pointer text-gray-400 hover:text-gray-500 duration-150 bg-[#ECECEC]/[0.5]">
      <FolderOpenIcon className="w-5 h-5 mr-2" />
      <p className="text-center mr-1">Drop File here or</p>
      <p className="text-[#6576FF] cursor-pointer hover:text-teal-700 underline underline-offset-4 font-bold">
        Browse
      </p>
    </div>
  );

  return (
    <FileUploader
      className="max-w-full w-full"
      multiple={true}
      handleChange={handle_card_attachments}
      name="file"
      // types={fileTypes}
      children={stack2}
    />
  );
}

export default AiDragAndDropFile;
