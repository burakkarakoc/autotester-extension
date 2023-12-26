import React, { useState, useEffect } from "react";

function PopupComponent({ onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      // Mock API call for status
      //   const mockStatus = Math.round(Math.random()); // Replace with actual API call
      //   if (mockStatus === 1) {
      //     setIsLoading(false);
      //     clearInterval(interval);
      //   }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className=" bg-white p-6 rounded-lg shadow-lg text-center mr-20">
        {isLoading ? (
          <>
            <div className="flex loader border-4 border-t-4 border-gray-200 border-t-blue-600 h-12 w-12 rounded-full animate-spin bg-black ml-20"></div>
            <p className="mt-4 text-lg font-bold">Test started...</p>
            <p className="mt-4 text-lg ">You will see the run id soon</p>
          </>
        ) : (
          <>
            <p className="text-lg">Testing complete!</p>
            <button
              onClick={onClose}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PopupComponent;
