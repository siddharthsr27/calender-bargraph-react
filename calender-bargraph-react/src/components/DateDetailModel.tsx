import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

Modal.setAppElement("#root");

const DateDetailModal = ({ open, onClose }: any) => {
  const { raw, selectedDate } = useSelector((state: any) => state);

  if (!selectedDate) return null;

  const key = format(selectedDate, "dd-MM-yyyy");
  const data = raw[key];

  const chartData = data
    ? data.map((item: any) => {
        const user = Object.keys(item)[0];
        return { name: user, value: item[user] };
      })
    : [];

  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <h2>Data for {key}</h2>

      {data ? (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No data found for {key}</p>
      )}

      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default DateDetailModal;
