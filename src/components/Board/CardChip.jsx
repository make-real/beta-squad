const CardChip = ({ tag, small }) => {
  return (
    <span
      className={`px-2 flex items-center gap-2 py-1 w-fit rounded-full`}
      style={{
        color: "#6B7280",
       
        border: `1px solid #E5E7EB`,
        fontSize: small ? "11px" : "13px",
      }}
    >
      <div style={{
       backgroundColor: `${tag?.color}90`,
      }} className={`w-[8px] h-[8px]  rounded-full opacity-100`}></div>{" "}
      <span className="font-inter "> {tag?.name}</span>
    </span>

  );
};

export default CardChip;
