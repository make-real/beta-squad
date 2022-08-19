import { useRef } from "react";
import Popup from "reactjs-popup";

const Dropdown = ({ menu, button, width, disabled }) => {
  const ref = useRef(null);
  return (
    <Popup
      ref={ref}
      contentStyle={{
        border: "none",
        padding: 10,
        width: `${width || 200}px`,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
      trigger={<div>{button}</div>}
      disabled={disabled}
    >
      {menu({ closePopup: () => ref.current?.close() })}
    </Popup>
  );
};

export default Dropdown;
