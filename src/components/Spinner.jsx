import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black w-[100vw] z-[10000] h-[100vh] opacity-50 flex justify-center items-center ">
      <div className="w-16 h-16 border-4 border-t-4 botder-t-[2px] border-b-white border-solid  border-t-red-700 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
