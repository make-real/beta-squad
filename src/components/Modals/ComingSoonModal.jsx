import CrossIcon from "../../assets/cross.svg";
import Development from "../../assets/images/development.avif";

import { useCommingSoonContext } from "../../context/FeatureContext";
export default function ComingSoonModal() {
  const { showModal, setShowModal } = useCommingSoonContext();
  return (
    showModal && (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999] py-[20px]">
        <div className="h-full relative w-full max-w-[30%] max-h-[65%] bg-white rounded-[16px] px-[62px] py-[50px] overflow-y-scroll no-scrollbar flex flex-col">
          <div
            onClick={() => setShowModal(false)}
            className="w-max absolute top-[30px] right-[30px] cursor-pointer"
          >
            <img src={CrossIcon} alt="" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={Development} alt="" />
            <h1 className="text-[#6576FF] opacity-80 text-2xl">
              We are developing this feature
            </h1>
          </div>
        </div>
      </div>
    )
  );
}
