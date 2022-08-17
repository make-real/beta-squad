import Popup from "reactjs-popup";

const Dropdown = ({ children, button, width }) => {
  return (
    <Popup
      contentStyle={{
        border: "none",
        padding: 10,
        width: `${width || 200}px`,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
      trigger={<div>{button}</div>}
    >
      {children}
    </Popup>
  );
};

export default Dropdown;
