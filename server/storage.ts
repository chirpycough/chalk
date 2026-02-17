
import { manualConnectSchema } from "@shared/schema";

export interface IStorage {
  // We can keep this empty or minimal since we are using Firebase client-side
  // But let's add a method just in case we want to log something server-side
  logConnectionAttempt(walletName: string): Promise<void>;
}

export class MemStorage implements IStorage {
  async logConnectionAttempt(walletName: string): Promise<void> {
    console.log(`[Server] Manual connection attempt for wallet: ${walletName}`);
  }
}

export const storage = new MemStorage();
