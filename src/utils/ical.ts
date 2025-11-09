import { convertTimestampToArray, createEvents } from "ics";
import { ORGANISATION_CONTACT, ORGANISATION_NAME } from "@/utils/constants";
import { YError } from "yerror";
import { AgendaDate } from "./agendaDate";

export type AgendaDescription = {
  sourceURL: string;
  title: string;
  description: string;
  url: string;
  updatedAt: string;
  builtAt: string;
};

export type AgendaItem = {
  title: string;
  description: string;
  url: string;
  author: { name: string };
  updatedAt: string;
  publishedAt: string;
};

export async function generateICal(
  informations: AgendaDescription,
  items: AgendaDate[]
) {
  const { error, value } = createEvents(
    items.map((item) => ({
      // TODO: use timezone
      created: convertTimestampToArray(Date.parse(item.date), ""),
      lastModified: convertTimestampToArray(Date.parse(item.date), ""),
      title: item.title,
      start: convertTimestampToArray(Date.parse(item.startDate), ""),
      duration: item.duration,
      location: item.location,
      geo: item.geolocation
        ? {
            lat: item.geolocation.lat,
            lon: item.geolocation.lng,
          }
        : undefined,
      organizer: {
        name: ORGANISATION_NAME,
        email: ORGANISATION_CONTACT,
      },
    })),
    {
      calName: `Agenda ${ORGANISATION_NAME}`,
      method: "PUBLISH",
    }
  );

  if (error) {
    throw YError.wrap(error, "E_ICAL_ERROR");
  }

  if (!value) {
    throw new YError("E_ICAL_EMPTY");
  }

  return value;
}
