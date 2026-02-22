export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden">
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-400 opacity-20 blur-3xl animate-pulse rounded-full" />

      <div className="relative flex flex-col items-center gap-6 px-10 py-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-gray-200 shadow-xl">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-black animate-bounce [animation-delay:-0.3s]" />
          <span className="h-3 w-3 rounded-full bg-black animate-bounce [animation-delay:-0.15s]" />
          <span className="h-3 w-3 rounded-full bg-black animate-bounce" />
        </div>
        <p className="text-sm tracking-widest text-gray-500 uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
