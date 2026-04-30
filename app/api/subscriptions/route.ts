import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import type { Subscription } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const subscriptions: Subscription[] = [];
    
    querySnapshot.forEach((doc) => {
      subscriptions.push({ id: doc.id, ...doc.data() } as Subscription);
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, price, billingCycle, category, nextBillingDate, autoRenew } = body;

    if (!userId || !name || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subscriptionData = {
      userId,
      name,
      price: parseFloat(price),
      billingCycle,
      category,
      nextBillingDate,
      autoRenew,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "subscriptions"), subscriptionData);
    
    return NextResponse.json({ id: docRef.id, ...subscriptionData }, { status: 201 });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}
