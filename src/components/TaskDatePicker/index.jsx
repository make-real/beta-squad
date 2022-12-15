import { cardUpdateApiCall } from '../../hooks/useFetch';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DateRange } from 'react-date-range';
import Button from '../Button';

const TaskDatePicker = ({ startDate, endDate, onChange, close }) => {
    const selectedSpaceObj = useSelector(
        (state) => state.space.selectedSpaceObj
    );

    const [state, setState] = useState([
        {
            startDate: startDate ? new Date(startDate) : new Date(),
            endDate: endDate ? new Date(endDate) : new Date(),
            key: 'selection',
        },
    ]);

    const onChangeDate = (range) => {
        setState([range.selection]);
    };

    return (
        <div className="rounded-2xl p-2 flex flex-col justify-center items-center">
            <DateRange
                editableDateInputs={true}
                onChange={onChangeDate}
                moveRangeOnFirstSelection={false}
                ranges={state}
                rangeColors={[selectedSpaceObj?.color]}
            />
            <div className="flex justify-between p-2 w-full">
                <Button
                    text
                    className="p-2 duration-200 text-black font-bold bg-[#ECECEC] hover:bg-gray-300 hover:text-red-500 rounded-lg"
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button
                    className="p-2 duration-200 text-white font-bold bg-[#6576FF] hover:bg-[#323f9e] rounded-lg"
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
