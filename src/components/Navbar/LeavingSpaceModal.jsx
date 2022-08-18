import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import { leave_space } from "../../api/space";

const LeavingSpaceModal = ({ setModal, onUpdate, id }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.code === "Escape") setModal(false);
    };

    document.addEventListener("keydown", handleEscapeKeyPress);
    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, [setModal]);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await leave_space(id);
      setLoading(false);
      setModal(false);
      onUpdate();
    } catch (error) {
      setLoading(false);
      toast.error(error?.message, { autoClose: 3000 });
    }
  };

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black/70 grid place-items-center z-50 duration-700">
      <div className="relative bg-white rounded-xl shadow-2xl p-5 ">
        <p className="text-lg font-bolder text-themeColor uppercase mb-1">
          Leave space
        </p>
        <p>Are you sure you want to leave space?</p>
        <div className="flex">
          <Button loading={loading} onClick={onConfirm}>
            Leave
          </Button>
          {!loading && (
            <Button
              className="ml-2"
              text
              loading={loading}
              onClick={() => setModal(false)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeavingSpaceModal;
