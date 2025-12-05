import rawData from "../data/dummy_data.json";
import { parse } from "date-fns";

function convert(dateStr: string) {
  return parse(dateStr, "dd-MM-yyyy", new Date());
}

function generateEvents(data: any) {
  return Object.keys(data).map((key) => ({
    title: `${data[key].length} items`,
    start: convert(key),
    end: convert(key),
    allDay: true,
    dateKey: key
  }));
}

const initialState = {
  raw: rawData,
  events: generateEvents(rawData),
  selectedDate: null
};

export default function dataReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}

export const setSelectedDate = (date: Date | null) => ({
  type: "SET_SELECTED_DATE",
  payload: date
});
