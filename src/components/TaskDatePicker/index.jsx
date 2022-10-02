import { cardUpdateApiCall } from "../../hooks/useFetch";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import Button from "../Button";

const TaskDatePicker = ({ startDate, endDate, onChange, close }) => {
  const selectedSpaceObj = useSelector((state) => state.space.selectedSpaceObj);

  const [state, setState] = useState([
    {
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(),
      key: "selection",
    },
  ]);

  const onChangeDate = (range) => {
    setState([range.selection]);
  };

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={onChangeDate}
        moveRangeOnFirstSelection={false}
        ranges={state}
        rangeColors={[selectedSpaceObj?.color]}
      />
      <div className="flex justify-between">
        <Button text onClick={close}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onChange({
              start: state[0].startDate,
              end: state[0].endDate,
            });
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default TaskDatePicker;
