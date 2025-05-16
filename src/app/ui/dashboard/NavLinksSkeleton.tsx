export default function NavSkeleton() {
  return (
    <div className="flex flex-col gap-3 px-4">
      {[...Array(4)].map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 h-12 animate-pulse rounded-md bg-gray-800 p-3"
        >
          <div className="h-6 w-6 rounded bg-gray-700" />
          <div className="h-4 w-24 rounded bg-gray-700" />
        </div>
      ))}
    </div>
  );
}
