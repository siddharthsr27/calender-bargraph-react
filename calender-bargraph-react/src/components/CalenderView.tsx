import React, { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer
} from "react-big-calendar";

import { format, parse, startOfWeek, getDay } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "../store/dataSlice";
import DateDetailModal from "./DateDetailModel";

import "react-big-calendar/lib/css/react-big-calendar.css";

type CellProps = {
  value: Date;
  children: React.ReactNode;
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {}
});

function dateKey(date: Date) {
  return format(date, "dd-MM-yyyy");
}

const CalendarView = () => {
  const dispatch = useDispatch();
  const { events, raw } = useSelector((state: any) => state);
  const [open, setOpen] = useState(false);

  function openModal(date: Date) {
    dispatch(setSelectedDate(date));
    setOpen(true);
  }

  const dateCellWrapper = ({ value, children }: CellProps) => {
    const key = dateKey(value);
    const hasData = raw[key];

    return (
      <div
        style={{
          padding: 4,
          backgroundColor: hasData ? "#dff0ff" : "transparent",
          borderRadius: 4,
          cursor: "pointer"
        }}
        onClick={() => openModal(value)}
      >
        {children}
      </div>
    );
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event: any) => openModal(event.start)}
        onSelectSlot={(slot: any) => openModal(slot.start)} 
        components={{ dateCellWrapper }}
        style={{ height: 600, marginTop: 20 }}
      />

      <DateDetailModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CalendarView;
