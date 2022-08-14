import Popup from "reactjs-popup";

const Dropdown = ({ children, button }) => {
  return (
    <Popup
      contentStyle={{
        border: 'none',
        padding: 10,
        width: "300px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
      className="w-[280px] min-h-fit p-3 rounded-lg shadow-2xl bg-white before:w-8 before:h-8 before:bg-white before:absolute before:top-[-8px] before:left-[50%] before:translate-x-[-50%] before:rotate-45 before:z-[-10]"
      trigger={<div>{button}</div>}
    >
      {children}
    </Popup>
  );
};

export default Dropdown;
