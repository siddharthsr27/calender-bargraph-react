import React, { useMemo, useState } from "react";
import {Calendar, dateFnsLocalizer, Views,} from "react-big-calendar";
import { parse, format, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles.css";
import rawDummyData from "../data/dummy_data.json";
import { DateDataMap } from "../types/DataTypes";
import DateDetailModel from "./DateDetailModel";

const dummyData = rawDummyData as DateDataMap;
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay,locales,});
type EventItem = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  key: string;
};

function parseKey(key: string): Date {
  return parse(key, "dd-MM-yyyy", new Date());
}

export default function CalendarView() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const events: EventItem[] = useMemo(() => {
    return Object.keys(dummyData).map((key) => ({
      title: `Data (${dummyData[key].length})`,
      start: parseKey(key),
      end: parseKey(key),
      allDay: true,
      key,
    }));
  }, []);

  const dayPropGetter = (date: Date) => {
    const key = format(date, "dd-MM-yyyy");
    const hasData = dummyData[key] !== undefined;

    return {
      className: hasData ? "has-data" : "",
    };
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    const key = format(start, "dd-MM-yyyy");
    setSelectedKey(key);
    setModalOpen(true);
  };

  const handleSelectEvent = (event: EventItem) => {
    setSelectedKey(event.key);
    setModalOpen(true);
  };

  return (
  <>
      <Calendar
        localizer={localizer}
        events={events}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        dayPropGetter={dayPropGetter}
        style={{ height: "80vh" }}/>

      <DateDetailModel
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        dateKey={selectedKey}
        rawData={dummyData}/>
    </>
  );
}
