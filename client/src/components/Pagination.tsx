type PaginationProps = {
  totalItems: number;
  page: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
};

export const Pagination = ({
  totalItems,
  page,
  onPageChange,
  pageSize = 10,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  console.log('totalItems::', totalItems);
  

  const handleClick = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange?.(newPage);
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => handleClick(page - 1)}
        className="bg-black text-white p-2 opacity-75"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          className={p === page ? "bg-black text-white p-2 font-bold" : "bg-black text-white p-2 opacity-75"}
          onClick={() => handleClick(p)}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => handleClick(page + 1)}
        className="bg-black text-white p-2 opacity-75"
      >
        Next
      </button>
    </div>
  );
};