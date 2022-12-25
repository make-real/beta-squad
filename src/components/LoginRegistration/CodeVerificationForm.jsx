import React, { useRef } from "react";
import { Loader } from "../Loader";

const CodeVerificationForm = ({ handleAccountActivation, loader }) => {
  const firstCode = useRef();
  const secondCode = useRef();
  const thirdCode = useRef();
  const fourthCode = useRef();
  const fifthCode = useRef();
  const sixthCode = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const code =
      firstCode?.current?.value +
      secondCode?.current?.value +
      thirdCode?.current?.value +
      fourthCode?.current?.value +
      fifthCode?.current?.value +
      sixthCode?.current?.value;
    handleAccountActivation(code);
  };

  return (
    <div className=''>
      <div className='space-y-2 mb-8'>
        <h2 className='font-bold text-2xl'>Code Verification</h2>
        <p className='text-gray-500 text-xs'>
          Enter one time password sent on{" "}
          <span className='text-blue-600'>example@gmail.com</span>
        </p>
      </div>

      <form className='flex flex-col gap-8 w-full' onSubmit={handleSubmit}>
        <span className='flex justify-between gap-4 items-center'>
          <input
            type='number'
            className='bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500'
            ref={firstCode}
            pattern='\d*'
            maxLength='1'
          />
          <input
            type='number'
            className='bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500'
            ref={secondCode}
            pattern='\d*'
            maxLength='1'
          />
          <input
            type='number'
            className='bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500'
            ref={thirdCode}
            pattern='\d*'
            maxLength='1'
          />
          <input
            type='number'
            className='bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500'
            ref={fourthCode}
            pattern='\d*'
            maxLength='1'
          />
          <input
            type='number'
            className='bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500'
            ref={fifthCode}
            pattern='\d*'
            maxLength='1'
          />
          <input
            type='number'
            className='bg-[#ECECEC] w-14 h-14 rounded-md text-4xl text-center outline-blue-500'
            ref={sixthCode}
            pattern='\d*'
            maxLength='1'
          />
        </span>
        <p className='text-gray-500 text-xs'>
          Didn’t get code yet?{" "}
          <button className='text-blue-600 underline'>Resend OTP</button>
        </p>
        <div>
          <button className='w-96 py-2.5 text-white text-xs bg-[#6576FF] rounded'>
            {loader ? <Loader /> : "Verify Code"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CodeVerificationForm;
