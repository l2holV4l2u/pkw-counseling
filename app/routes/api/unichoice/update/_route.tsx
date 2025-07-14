import { ActionFunctionArgs } from "@remix-run/node";
import { updateUniChoice } from "@functions/server/uniChoice";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const rawData = formData.get("data");
    if (typeof rawData !== "string") {
      throw new Error(
        "Invalid form data: 'data' field is missing or not a string"
      );
    }
    const { userId, uniChoice } = JSON.parse(rawData);
    await updateUniChoice(userId, uniChoice);
    return new Response("Successfully update user", { status: 200 });
  } catch (err) {
    console.error("Failed to update event:", err);
    return new Response("Failed to update event", { status: 500 });
  }
}
