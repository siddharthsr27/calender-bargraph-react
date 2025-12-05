import React, { useMemo } from "react";
import Modal from "react-modal";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,} from "recharts";
import { parse, format } from "date-fns";
import { DateDataMap } from "../types/DataTypes";

Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  dateKey: string | null;
  rawData: DateDataMap;
};

export default function DateDetailModel({
  isOpen,
  onRequestClose,
  dateKey,
  rawData,
}: Props) {
  const dataForDate = dateKey ? rawData[dateKey] : null;

  const chartData = useMemo(() => {
    if (!dataForDate) return [];
    return dataForDate.map((entry) => {
      const key = Object.keys(entry)[0];
      return { name: key, value: entry[key] };
    });
  }, [dataForDate]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay"
      className="modal-content">
      <button className="modal-close-btn" onClick={onRequestClose}>✕</button>
       <h3 className="modal-heading">
        {dateKey ? format(parse(dateKey, "dd-MM-yyyy", new Date()), "do MMM yyyy") : ""}
      </h3>

      {!dataForDate || dataForDate.length === 0 ? (
        <div className="no-data-text">No data found for {dateKey}</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Modal>
  );
}
