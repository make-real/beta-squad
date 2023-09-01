import CatImage from '../../assets/CatImage.svg'
 
const Welcome = () => {
    return (
        <div className=" w-[340px] space-y-3  flex flex-col items-center justify-center
         mx-auto text-center py-auto h-[90vh]">
          <img src={CatImage} alt="" />
          <h1 className='text-xl pt-4 text-center font-medium leading-6'>Welcome!</h1>
          <p className='text-center mx-10 font-light leading-6 text-[15px] w-[340px] text-[#031124]'>Thanks for signing up. Our Mobile App will be Available soon. Until then please use Squad in a desktop or laptop screen.</p>
        </div>
    );
};

export default Welcome;