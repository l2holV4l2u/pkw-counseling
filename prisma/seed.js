import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateFakeResField(field) {
  switch (field.type) {
    case "Section":
      return null;
    case "Short Answer":
      return { textField: faker.lorem.words(3) };
    case "Long Answer":
      return { textField: faker.lorem.sentences(2) };
    case "Multiple Choice":
      const choiceIndex = faker.number.int({
        min: 0,
        max: field.choices.length - 1,
      });
      return { selectField: choiceIndex };
    case "Checkbox":
      const numberOfChoices = faker.number.int({
        min: 1,
        max: field.choices.length,
      });
      const choiceIndices = faker.helpers.arrayElements(
        Array.from(field.choices.keys()),
        numberOfChoices
      );
      return { choiceField: choiceIndices };
    case "Date Field":
      return { dateField: faker.date.past() };
    case "File Upload":
      return { fileField: faker.image.url() };
    default:
      return { textField: faker.lorem.words(2) };
  }
}

async function main() {
  console.log("Seeding users...");

  const event = await prisma.event.findFirst();
  if (!event) throw new Error("No event found. Please seed an event first.");

  const form = await prisma.form.findUnique({
    where: { eventId: event.id },
    include: { fields: true },
  });

  if (!form)
    throw new Error("No form found for the event. Please seed a form first.");

  for (let i = 0; i < 100; i++) {
    const name = faker.person.fullName();

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name,
        profileUrl: faker.image.avatar(),
        password: faker.internet.password(),
        role: "participant",
      },
    });

    const res = await prisma.res.create({
      data: {
        id: faker.string.uuid(),
        userId: user.id,
        eventId: event.id,
        formId: form.id,
        paymentIntent: faker.string.uuid(),
        paymentStatus: "succeeded",
      },
    });

    for (const field of form.fields) {
      const data = generateFakeResField(field);
      if (data) {
        await prisma.resField.create({
          data: {
            id: faker.string.uuid(),
            formFieldId: field.id,
            resId: res.id,
            ...data,
          },
        });
      }
    }
  }

  console.log("Seeding finished.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
