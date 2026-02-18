import { Link } from "wouter";
import { ArrowLeft, Zap } from "lucide-react";
import { WalletGrid } from "@/components/ui/wallet-grid";

export default function Wallets() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-background/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-bold text-lg hidden sm:block">Vaultlink</span>
          </div>

          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Connect Wallet</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Please select a wallet to connect to the SyncyNode protocol. 
              Multiple chains supported.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <h2 className="text-lg font-semibold text-white/90">Popular Wallets</h2>
                <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">SECURE ENCLAVE</span>
             </div>
             <WalletGrid />
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Don't see your wallet? <a href="#" className="text-primary hover:underline">View all supported wallets</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
