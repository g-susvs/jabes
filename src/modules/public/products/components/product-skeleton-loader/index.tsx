export const ProductsSkeletonLoader = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_i, index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-line bg-card"
        >
          <div className="h-[230px] w-full bg-line/60"></div>
          <div className="flex flex-col gap-3 p-5">
            <div className="h-4 w-24 rounded-full bg-line/60"></div>
            <div className="h-6 w-48 rounded bg-line/60"></div>
            <div className="h-4 w-full rounded bg-line/60"></div>
            <div className="h-4 w-28 rounded bg-line/60"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
