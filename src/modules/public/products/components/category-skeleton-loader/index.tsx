export const CategorySkeletonLoader = () => {
  return (
    <div className="flex animate-pulse flex-wrap justify-center gap-3">
      {Array.from({ length: 5 }).map((_i, index) => (
        <div key={index} className="h-9 w-28 rounded-full bg-line/60"></div>
      ))}
    </div>
  );
};
