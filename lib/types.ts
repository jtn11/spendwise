export type BillingCycle = "Weekly" | "Monthly" | "Yearly";

export interface Subscription {
  id?: string;
  userId: string;
  name: string;
  price: number;
  billingCycle: BillingCycle;
  category: string;
  nextBillingDate: string; // ISO date string
  autoRenew: boolean;
  createdAt?: string;
}
