import { Close } from '../../assets/icons';



const ModalSearchSpace = ({ setSpaceSearchModal, setAllSpace }) => {


    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-black/30 grid place-items-center z-50'>

            <form className='relative w-[670px] h-[520px] bg-white rounded-xl shadow-2xl p-3 '  >

                {/* 🟨🟨🟨 UI For Close Button */}
                <div
                    className='absolute top-2 right-2 w-8 h-8 rounded-lg group hover:bg-gray-200 grid place-items-center cursor-pointer duration-200'
                    onClick={() => setSpaceSearchModal(false)}
                >
                    <Close width="14" height="14" className='text-gray-400 group-hover:text-fuchsia-600 duration-200' />
                </div>

            </form>

        </section >
    )
}

export default ModalSearchSpace