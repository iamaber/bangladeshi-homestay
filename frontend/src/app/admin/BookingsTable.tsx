"use client";

import type { Dispatch, SetStateAction } from "react";
import type { Booking, BookingStatus } from "@/lib/api";
import { emailInvoice, fetchInvoicePdf, updateBookingStatus } from "@/lib/admin-api";

const statuses: BookingStatus[] = [
  "requested",
  "reviewed",
  "invoice_sent",
  "paid",
  "confirmed",
  "cancelled",
];

type BookingsTableProps = {
  adminKey: string;
  bookings: Booking[];
  setBookings: Dispatch<SetStateAction<Booking[]>>;
  setError: (error: string) => void;
};

export default function BookingsTable({
  adminKey,
  bookings,
  setBookings,
  setError,
}: BookingsTableProps) {
  async function handleStatusChange(bookingId: string, status: BookingStatus) {
    setError("");
    try {
      const updated = await updateBookingStatus(bookingId, status, adminKey);
      replaceBooking(updated);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not update status.");
    }
  }

  async function handleEmailInvoice(bookingId: string) {
    setError("");
    try {
      const updated = await emailInvoice(bookingId, adminKey);
      replaceBooking(updated);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not email invoice.");
    }
  }

  async function handleOpenInvoice(bookingId: string) {
    setError("");
    try {
      const blob = await fetchInvoicePdf(bookingId, adminKey);
      window.open(URL.createObjectURL(blob), "_blank", "noopener,noreferrer");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not open invoice.");
    }
  }

  function replaceBooking(updated: Booking) {
    setBookings((current) => current.map((booking) => (booking.id === updated.id ? updated : booking)));
  }

  return (
    <div className="overflow-x-auto border border-rule bg-cream2">
      <table className="w-full min-w-[980px] border-collapse text-left text-[13px]">
        <thead className="bg-cream">
          <tr className="border-b border-rule text-[11px] uppercase tracking-[0.12em] text-muted">
            <th className="px-4 py-3">Guest</th>
            <th className="px-4 py-3">Dates</th>
            <th className="px-4 py-3">Package</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-rule-light align-top">
              <td className="px-4 py-4">
                <div className="font-medium text-ink">
                  {booking.first_name} {booking.last_name}
                </div>
                <div className="text-muted">{booking.email}</div>
                <div className="text-muted">{booking.phone}</div>
              </td>
              <td className="px-4 py-4 text-ink2">
                {booking.arrival_date} to {booking.departure_date}
                <div className="text-muted">{booking.guests} guest(s)</div>
              </td>
              <td className="px-4 py-4 text-ink2">
                {booking.package}
                <div className="text-muted">{booking.host_id}</div>
                <div className="text-muted">{booking.include_flight ? "With flight" : "No flight"}</div>
              </td>
              <td className="px-4 py-4 font-medium text-ink">CHF {booking.total_chf}</td>
              <td className="px-4 py-4">
                <select
                  value={booking.status}
                  onChange={(event) => {
                    handleStatusChange(booking.id, event.target.value as BookingStatus);
                  }}
                  className="border border-rule bg-cream px-3 py-2 text-[13px] text-ink"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-2">
                  <button
                    className="btn-line-sm"
                    type="button"
                    onClick={() => handleOpenInvoice(booking.id)}
                  >
                    Open PDF
                  </button>
                  <button
                    className="btn-line-sm"
                    type="button"
                    onClick={() => handleEmailInvoice(booking.id)}
                  >
                    Email invoice
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td className="px-4 py-8 text-muted" colSpan={6}>
                No bookings loaded.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
