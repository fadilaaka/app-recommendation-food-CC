import React from "react";

const Modal = ({ modal, id, title, onDelete, onClose }) => {
  return (
    <>
      {modal && (
        <div
          className="mx-auto fixed w-[30%] h-[15%] inset-0 items-center p-4 my-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300"
          role="alert"
        >
          <span className="font-medium">
            Apakah Anda yakin ingin menghapus {title} ini?
          </span>
          <div className="my-3">
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm w-1/5 px-1.5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Ya
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm w-1/5 px-1.5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Tidak
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
