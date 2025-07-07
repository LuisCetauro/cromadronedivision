"use server";

import { redirect } from "next/navigation";
import { connectToDb } from "../ConnectToDB";
import { Contact } from "../Models/Contact";
import { Order } from "../Models/Order";

function generateRandomSlug(length = 8) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

async function generateUniqueSlug(): Promise<string> {
  let slug: string;
  let exists = true;

  do {
    slug = generateRandomSlug();
    const existing = await Contact.findOne({ slug });
    exists = !!existing;
  } while (exists);

  return slug;
}

export const AddContact = async (formData: FormData): Promise<void> => {
  const Name = formData.get("Name")?.toString();
  const Phone = formData.get("Phone")?.toString();
  const Email = formData.get("Email")?.toString();
  const Bussines = formData.get("Bussines")?.toString();
  const Message = formData.get("Message")?.toString();
  const ExecutiveName = formData.get("ExecutiveName")?.toString();

  try {
    await connectToDb();

    const slug = await generateUniqueSlug();

    const newContact = new Contact({
      Name,
      Phone,
      Email,
      Bussines,
      Message,
      ExecutiveName,
      slug,
    });

    await newContact.save();

    await Order.findOneAndUpdate(
      { executive: ExecutiveName },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
  }
};

export const GetMyContacts = async (executiveName: string) => {
  try {
    await connectToDb();
    const contacts = await Contact.find({
      ExecutiveName: executiveName,
    });
    return contacts;
  } catch (error) {
    console.error("Erro ao buscar seus contatos:", error);
    throw error;
  }
};

export const DeleteContact = async (formData: FormData) => {
  const { slug } = Object.fromEntries(formData);

  try {
    const res = await Contact.findOneAndDelete({ slug: slug });
    console.log(res);
    redirect("/Admin/Dashboard");
  } catch (error) {
    console.log(error);
  }
};
