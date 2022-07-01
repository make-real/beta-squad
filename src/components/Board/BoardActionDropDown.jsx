import { Copy, Delete, LinkingChain, RightOK } from '../../assets/icons'


const BoardActionDropDown = ({ right, noteDone, setNoteDone, setModalActionToggling }) => {

    return (
        <div className={`w-[210px] absolute top-[65px] ${right ? 'right-[-90px]' : 'right-[30px]'} bg-white p-2 rounded-lg shadow-xl z-20 
        after:content-[""] after:w-8 after:h-8 after:bg-white after:absolute after:rotate-45 after:z-[-10]
        after:top-[-10px] ${right ? 'after:right-[50%] after:translate-x-[50%] ' : 'after:right-[15px]'} `}>

            <div className='boardActionDropDown group'>
                <Copy className='group-hover:text-teal-500' /> <span>Copy Card</span>
            </div>

            <div className='boardActionDropDown group'>
                <LinkingChain className='group-hover:text-teal-500' /> <span>Copy Card link</span>
            </div>
            <div className='boardActionDropDown group' onClick={(e) => { e.stopPropagation(); setNoteDone(pre => !pre); setModalActionToggling(false) }}>
                <RightOK className='group-hover:text-teal-500' /> <span>Make as {noteDone ? 'not' : ''} done</span>
            </div>
            <div className='boardActionDropDown group'>
                <Delete className='group-hover:text-teal-500' /> <span>Archive Card</span>
            </div>
        </div>
    )
}

export default BoardActionDropDown