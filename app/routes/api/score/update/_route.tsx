import { ActionFunctionArgs } from "@remix-run/node";
import { updateScore } from "@functions/server/score";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const rawData = formData.get("data");
    if (typeof rawData !== "string") {
      throw new Error(
        "Invalid form data: 'data' field is missing or not a string"
      );
    }
    const { userWithScore } = JSON.parse(rawData);
    await updateScore(userWithScore);
    return new Response("Successfully update user", { status: 200 });
  } catch (err) {
    console.error("Failed to update event:", err);
    return new Response("Failed to update event", { status: 500 });
  }
}
