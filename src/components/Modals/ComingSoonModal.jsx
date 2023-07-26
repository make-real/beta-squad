import CrossIcon from "../../assets/cross.svg";
import VerticalDotsIcon from "../../assets/vertical_dots.svg";
import NotificationIcon from "../../assets/icon_component/NotificationIcon";
import { useCommingSoonContext } from "../../context/FeatureContext";
export default function ComingSoonModal() {
  const { showModal, setShowModal } = useCommingSoonContext();
  return (
    showModal && (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-[#03112440] z-[999] py-[20px]">
        <div className="h-full relative w-full max-w-[70%] max-h-[90%] bg-white rounded-[16px] px-[62px] py-[50px] overflow-y-scroll no-scrollbar flex flex-col">
          <div
            onClick={() => setShowModal(false)}
            className="w-max absolute top-[30px] right-[30px] cursor-pointer"
          >
            <img src={CrossIcon} alt="" />
          </div>
          <h1 className="text-[#031124] font-bold text-[30px]">
            Feature not available
            {/* <span className="font-light ml-[8px]">
            ({notifications?.length ?? 0})
          </span> */}
          </h1>
          <div className="h-full overflow-y-scroll no-scrollbar mt-[40px]">
            <div className="flex flex-col gap-[4px]">
              {/* <div className="w-full px-[16px] py-[15px] flex items-center justify-between bg-[#F2FAFF] rounded-[10px]">
                            <div className="flex items-center gap-[14px]">
                                <img
                                    src="https://thumbs.dreamstime.com/b/nice-to-talk-smart-person-indoor-shot-attractive-interesting-caucasian-guy-smiling-broadly-nice-to-112345489.jpg"
                                    alt=""
                                    className="w-[50px] h-[50px] object-cover rounded-full"
                                />
                                <p className="text-[#031124]">
                                    Mahbub Rahman added you to Make Real as a
                                    UI/UX designer.
                                </p>
                            </div>
                            <img
                                className="cursor-pointer"
                                src={VerticalDotsIcon}
                                alt=""
                            />
                        </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
