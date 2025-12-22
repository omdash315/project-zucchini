import { NextRequest } from "next/server";
import { handleResponse, handleApiError } from "@repo/shared-utils/server";
import { seedDatabase, type SeedData } from "@repo/database";

export async function POST(req: NextRequest) {
  try {
    const data: SeedData = await req.json();

    if (!data || typeof data !== "object") {
      return handleApiError(new Error("Invalid seed data"), "Invalid data format");
    }

    const results = await seedDatabase(data);

    return handleResponse({
      success: true,
      message: "Seed completed",
      results: {
        inserted: {
          users: results.users,
          transactions: results.transactions,
          munRegistrations: results.munRegistrations,
          munTransactions: results.munTransactions,
          admins: results.admins,
        },
        errors: results.errors,
      },
    });
  } catch (error) {
    return handleApiError(error, "Seed failed");
  }
}
