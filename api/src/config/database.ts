import mongoose from "mongoose";

export async function connectToDatabase({
  mongoUri,
}: {
  mongoUri: string;
}): Promise<void> {
  await mongoose.connect(mongoUri);

  console.log("MongoDB connected");
}
