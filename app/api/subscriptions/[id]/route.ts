import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 });
    }

    const { name, price, billingCycle, category, nextBillingDate, autoRenew } = body;
    const parsedPrice = typeof price === "string" ? parseFloat(price) : price;

    if (isNaN(parsedPrice)) {
      return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
    }

    const subscriptionRef = doc(db, "subscriptions", id);
    
    const updateData = {
      name,
      price: parsedPrice,
      billingCycle,
      category,
      nextBillingDate,
      autoRenew: !!autoRenew,
    };

    await updateDoc(subscriptionRef, updateData);
    
    return NextResponse.json({ id, ...updateData }, { status: 200 });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json({ 
      error: "Failed to update subscription", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 });
    }

    const subscriptionRef = doc(db, "subscriptions", id);
    await deleteDoc(subscriptionRef);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return NextResponse.json({ 
      error: "Failed to delete subscription", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
