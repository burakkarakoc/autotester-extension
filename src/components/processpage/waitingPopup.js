import React, { useEffect } from "react";

function PopupComponent({ onClose }) {
  // // const [isLoading, setIsLoading] = useState(true);
  // const isLoading = true;

  // useEffect(() => {
  //   const interval = setInterval(async () => {}, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="fixed top-1/3 left-10 right-10 bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-600 h-12 w-12 rounded-full animate-spin bg-black"></div>
        {/* {isLoading ? ( */}
        <>
          <div className="loader border-4 border-t-4 border-gray-200 border-t-blue-600 h-12 w-12 rounded-full animate-spin bg-black"></div>
          <p className="mt-4 text-lg font-bold">Test started...</p>
          <p className="mt-4 text-lg ">You will see the run id soon</p>
        </>
        {/* ) : (
          <>
            <p className="text-lg">Testing complete!</p>
            <button
              onClick={onClose}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </>
        )} */}
      </div>
    </div>
  );
}

export default PopupComponent;
