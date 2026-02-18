import { Link } from "wouter";
import { ArrowRight, Shield, Zap, Globe, Lock, Layers, Repeat, Wallet, Gift, UserCheck, ShoppingCart, RefreshCcw, ZapIcon, Download, Smartphone, LayoutGrid, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const actions = [
    {
      icon: <Layers className="w-6 h-6 text-primary" />,
      title: "Staking",
      description: "Stake your assets to earn rewards with high APY secure pools."
    },
    {
      icon: <Repeat className="w-6 h-6 text-primary" />,
      title: "Bridge",
      description: "Transfer assets between different blockchains seamlessly."
    },
    {
      icon: <Wallet className="w-6 h-6 text-primary" />,
      title: "Connect Wallet",
      description: "Link your Web3 wallet to access dapps securely."
    },
    {
      icon: <Gift className="w-6 h-6 text-primary" />,
      title: "Claim",
      description: "Check eligibility and claim your airdrop rewards."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      title: "KYC",
      description: "Complete identity verification for regulatory compliance."
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-primary" />,
      title: "BUY",
      description: "Purchase crypto assets directly using fiat currency."
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-primary" />,
      title: "Swap/Exchange",
      description: "Instant token swaps with the best market rates."
    },
    {
      icon: <ZapIcon className="w-6 h-6 text-primary" />,
      title: "Wallet Glitch",
      description: "Fix synchronization errors and connection issues."
    },
    {
      icon: <Download className="w-6 h-6 text-primary" />,
      title: "Airdrop",
      description: "Participate in new token distribution events."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: "NFT",
      description: "View, manage and trade your NFT collections."
    },
    {
      icon: <LayoutGrid className="w-6 h-6 text-primary" />,
      title: "Rectification",
      description: "Resolve transaction failures and stuck nonces."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      title: "Validation",
      description: "Validate your wallet and transaction history."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-[#0a0b0d]/50 backdrop-blur-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              VAULTLINK
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Protocol</a>
            <a href="#" className="hover:text-primary transition-colors">Governance</a>
            <a href="#" className="hover:text-primary transition-colors">Community</a>
            <Link href="/wallet" className="text-primary hover:text-primary/80">
              Connect Wallet
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-20">
        <div className="relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-white/80">Protocol V2 is Live</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 leading-tight">
              Universal Decentralized <br />
              <span className="text-primary">Wallet Resolution</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Open protocol for connecting decentralized applications to mobile wallets with QR code scanning or deep linking. Highly secure and encrypted.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/wallet">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all hover:scale-105">
                  Connect Wallet
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 text-white">
                View Documentation
              </Button>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, index) => (
              <Link key={index} href="/wallet">
                <div className="p-8 rounded-2xl bg-[#111318] border border-white/5 hover:border-primary/20 transition-all duration-300 hover:bg-[#161921] group cursor-pointer h-full">
                  <div className="mb-6 p-3 rounded-xl bg-[#1a1d26] w-fit group-hover:scale-110 transition-transform duration-300">
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{action.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Zap className="w-5 h-5" />
            <span className="font-bold">SyncyNode</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 SyncyNode Protocol. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
