import { useStyleContext } from "../context/StyleContext";
import { HiOutlineUserAdd } from "react-icons/hi";
import { month } from "../constant/data";
import { AddCardButton } from ".";


const List = () => {

  const { margin } = useStyleContext();

  const userName = ['Mahbub vhai', 'Faruk Hossain', 'Mousumi Mitu', 'Taiseen Azam'];


  return (
    <section className={`pt-20 px-3 bg-gray-100`}>

      <table className={`${margin ? 'ml-[325px] w-[81vw]' : 'ml-[50px] w-[95vw]'} duration-200  text-left max-h-[800px]`}>

        <thead className="sticky top-0 ">
          <tr className="bg-white p-8 text-gray-400 font-thin font-[Signika]">
            <th className="py-3 px-4">Card Name</th>
            <th className="py-3 px-4">Assign</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Progress</th>
            <th className="py-3 px-4">List</th>
            <th className="py-3 px-4">Tags</th>
          </tr>
        </thead>

        <tbody className="bg-gray-200/70 ">
          {
            month.map((data, i) => (
              <tr className={`${i % 2 && 'bg-slate-100'}`} key={data}>
                <td className="p-1 cursor-pointer">
                  <div className="p-3 hover:bg-gray-300 duration-200 rounded-lg">{userName[i]}</div>
                </td>
                <td className="p-1"><div className="cursor-pointer w-10 h-10 flex justify-center items-center rounded-md duration-200 hover:bg-gray-200 group"><HiOutlineUserAdd className="text-xl text-gray-600 group-hover:text-teal-500" /></div></td>
                <td className="p-1"><span className="p-2 cursor-pointer rounded-lg duration-200 hover:bg-gray-300 hover:text-teal-500">Set Dates</span></td>
                <td className="p-1"><div className="w-12  h-12 text-center leading-[48px] cursor-pointer rounded-full text-sm bg-white hover:bg-gray-200 hover:text-purple-900 duration-200">25%</div></td>
                <td className="p-1"><span className="p-3 cursor-pointer hover:text-teal-300 duration-200">{userName[i]?.split(' ')[0]}</span></td>
                <td className="p-1"><span className="px-8 py-2 bg-white cursor-pointer hover:bg-zinc-200 duration-200 rounded-md">Add a Tag</span></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <AddCardButton />

    </section>
  );
};

export default List;