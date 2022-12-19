const CardChip = ({ tag, close, small }) => {
    return (
        <span
            className={`px-2 py-1 w-fit rounded-full`}
            style={{
                color: tag?.color,
                backgroundColor: `${tag?.color}10`,
                border: `1px solid ${tag?.color}`,
                fontSize: small ? '9px' : '10px',
            }}
        >
            {tag?.name}
        </span>
        // <div
        //   className={`py-1 px-2 rounded-full relative duration-150 ${
        //     close &&
        //     'before:content-["X"] before:absolute before:top-1 before:right-1 before:px-[3px] before:font-bold before:bg-green-600 before:rounded-full before:hover:cursor-pointer before:invisible hover:before:visible'
        //   }`}
        //   style={{ backgroundColor: tag?.color, fontSize: small ? "9px" : "10px" }}
        // >
        //   {tag?.name}
        // </div>
    );
};

export default CardChip;
