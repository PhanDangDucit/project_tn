type PaginationProps = {
  totalItems: number;
  page: number
};

export const Pagination= ({
  totalItems,
  page
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / 10);
  const handleClick = (page: number) => {

  }
  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => handleClick(page - 1)}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={page === page ? "active" : ""}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => handleClick(page + 1)}
      >
        Next
      </button>
    </div>
  );
};