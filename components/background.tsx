export function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* Static gradient wash layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,rgba(178,149,105,0.06),transparent_60%),radial-gradient(ellipse_50%_45%_at_50%_65%,rgba(28,53,34,0.05),transparent_60%),radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(178,149,105,0.04),transparent_60%)]" />

      {/* Static accent orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] max-w-[720px] max-h-[720px] rounded-full bg-[radial-gradient(circle,rgba(178,149,105,0.08),transparent_60%)] blur-[80px]" />
      <div className="absolute bottom-[-12%] left-[-8%] w-[40vw] h-[40vw] max-w-[640px] max-h-[640px] rounded-full bg-[radial-gradient(circle,rgba(28,53,34,0.07),transparent_60%)] blur-[80px]" />

      {/* Static fine grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(28,53,34,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,53,34,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
    </div>
  )
}