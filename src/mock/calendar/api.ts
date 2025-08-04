import eventsData from "./events.json";

export interface majorEventItem {
  id: number;
  eventName: string;
  date: string;
  location: string;
  description: string;
}

export async function getMajorEvent(): Promise<majorEventItem[]> {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  return eventsData.majorEvents;
}

export async function getAnotherMajorEvent(): Promise<majorEventItem[]> {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  return eventsData.anotherEvents;
}
