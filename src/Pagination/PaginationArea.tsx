import React from "react";

interface PaginationProps {
  pagenumber: number[];
  paginate: (page: number) => void;
  currentpage: number;
  next: () => void;
  prev: () => void;
}

const PaginationArea: React.FC<PaginationProps> = ({
  pagenumber,
  paginate,
  currentpage,
  next,
  prev,
}) => {
  return (
    <nav className="inline-flex gap-2 items-center justify-end mt-5">
      <button
        onClick={prev}
        disabled={currentpage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>
      {pagenumber.map(num => (
        <button
          key={num}
          onClick={() => paginate(num)}
          className={`px-3 py-1 border rounded ${
            currentpage === num + 1 ? "bg-black text-white" : ""
          }`}
        >
          {num + 1}
        </button>
      ))}
      <button
        onClick={next}
        disabled={currentpage === pagenumber.length}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </nav>
  );
};

export default PaginationArea;
