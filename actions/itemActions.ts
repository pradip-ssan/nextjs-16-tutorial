"use server";

import connectToDatabase from "@/lib/mongodb";
import Item from "../models /Item";
import { revalidatePath } from "next/cache";

// --- CREATE ---
export async function createItem(formData: FormData) {
  await connectToDatabase();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) throw new Error("Missing fields");

  const newItem = new Item({ title, description });
  await newItem.save();

  revalidatePath("/"); // Purges page cache to display newly appended data immediately
}

// --- READ ---
export async function getItems() {
  await connectToDatabase();
  // Lean speeds up data retrieval; mapping changes MongoDB object IDs cleanly to strings
  const items = await Item.find({}).sort({ createdAt: -1 }).lean();
  return items.map((item: any) => ({
    id: item._id.toString(),
    title: item.title,
    description: item.description,
  }));
}

// --- UPDATE ---
export async function updateItem(id: string, formData: FormData) {
  await connectToDatabase();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await Item.findByIdAndUpdate(id, { title, description });

  revalidatePath("/");
}

// --- DELETE ---
export async function deleteItem(id: string) {
  await dbConnect();
  await Item.findByIdAndDelete(id);

  revalidatePath("/");
}
