export default function Footer() {
    return (
        <footer className="relative py-5 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" className="text-nx-cyan/80">
                            <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>
                    <span className="font-mono text-[10px] text-nx-text-secondary/80 tracking-[0.2em]">
                        &copy; 2026 LUCAS GONTIJO — PORTFOLIO
                    </span>
                </div>
                <span className="font-mono text-[10px] text-nx-text-secondary/80 tracking-wider">
                    BUILT WITH NEXT.JS + FRAMER MOTION
                </span>
            </div>
        </footer>
    )
}