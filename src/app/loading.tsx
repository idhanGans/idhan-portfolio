export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/10 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-white text-2xl">
              IZ
            </span>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full animate-loading-bar" />
        </div>

        {/* Text */}
        <p className="text-accent-dim text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
