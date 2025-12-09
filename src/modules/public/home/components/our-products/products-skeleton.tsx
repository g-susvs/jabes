export const ProductsSkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_i, index) => (
        <div key={index} className="flex flex-col animate-pulse gap-2">
          <div className="min-w-[280px] w-full max-w-[320px] h-[231px] bg-gray-300 rounded-2xl"></div>
          <div className="flex flex-col gap-2">
            <div className="w-60 h-8 bg-gray-300 rounded-2xl"></div>
            <div className="w-40 h-4 bg-gray-300 rounded-2xl"></div>
            <div className="w-40 h-8 bg-gray-300 rounded-2xl"></div>
          </div>
        </div>
      ))}
    </>
  );
};
