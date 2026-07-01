"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { apiBaseUrl, apiRequest, type Booking, type BookingStatus } from "@/lib/api";

const statuses: BookingStatus[] = [
  "requested",
  "reviewed",
  "invoice_sent",
  "paid",
  "confirmed",
  "cancelled",
];

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(getSavedAdminKey);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  return (
    <main className="min-h-screen bg-cream px-6 py-10 lg:px-14">
      <div className="mx-auto max-w-[1180px]">
        <header className="mb-8 flex flex-col gap-5 border-b border-rule pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-[clamp(34px,4vw,56px)] text-ink">Bookings</h1>
            <p className="mt-2 max-w-[620px] text-[14px] font-light leading-[1.75] text-muted">
              Review booking requests, mark payment status, and open Swiss QR invoices.
            </p>
          </div>
          <form
            className="flex max-w-[460px] gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              window.localStorage.setItem("adminKey", adminKey);
              loadBookings(adminKey, setBookings, setError);
            }}
          >
            <input
              aria-label="Admin API key"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              className="min-w-0 flex-1 border border-rule bg-cream2 px-4 py-3 text-[14px] text-ink"
              placeholder="Admin API key"
              type="password"
            />
            <button className="btn-fill-sm" type="submit">
              Load
            </button>
          </form>
        </header>

        {error && (
          <div className="mb-6 border border-terra/30 bg-terra/5 p-4 text-[14px] text-terra" role="alert">
            {error}
          </div>
        )}

        <div className="overflow-x-auto border border-rule bg-cream2">
          <table className="w-full min-w-[980px] border-collapse text-left text-[13px]">
            <thead className="bg-cream">
              <tr className="border-b border-rule text-[11px] uppercase tracking-[0.12em] text-muted">
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Invoice</th>
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
                    <div className="text-muted">{booking.include_flight ? "With flight" : "No flight"}</div>
                  </td>
                  <td className="px-4 py-4 font-medium text-ink">CHF {booking.total_chf}</td>
                  <td className="px-4 py-4">
                    <select
                      value={booking.status}
                      onChange={(event) => {
                        updateStatus(booking.id, event.target.value as BookingStatus, adminKey, setBookings, setError);
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
                    <a
                      className="btn-line-sm inline-block"
                      href={`${apiBaseUrl}/admin/bookings/${booking.id}/invoice.pdf`}
                      onClick={(event) => {
                        event.preventDefault();
                        openInvoice(booking.id, adminKey, setError);
                      }}
                    >
                      Open PDF
                    </a>
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
      </div>
    </main>
  );
}

function getSavedAdminKey() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.localStorage.getItem("adminKey") || "";
}

function loadBookings(
  adminKey: string,
  setBookings: (bookings: Booking[]) => void,
  setError: (error: string) => void,
) {
  setError("");
  apiRequest<Booking[]>("/admin/bookings", { headers: { "X-Admin-Key": adminKey } })
    .then(setBookings)
    .catch((error) => setError(error instanceof Error ? error.message : "Could not load bookings."));
}

function updateStatus(
  bookingId: string,
  status: BookingStatus,
  adminKey: string,
  setBookings: Dispatch<SetStateAction<Booking[]>>,
  setError: (error: string) => void,
) {
  setError("");
  apiRequest<Booking>(`/admin/bookings/${bookingId}/status`, {
    method: "PATCH",
    headers: { "X-Admin-Key": adminKey },
    body: JSON.stringify({ status }),
  })
    .then((updated) => {
      setBookings((bookings) => bookings.map((booking) => (booking.id === updated.id ? updated : booking)));
    })
    .catch((error) => setError(error instanceof Error ? error.message : "Could not update status."));
}

function openInvoice(bookingId: string, adminKey: string, setError: (error: string) => void) {
  setError("");
  fetch(`${apiBaseUrl}/admin/bookings/${bookingId}/invoice.pdf`, {
    headers: { "X-Admin-Key": adminKey },
  })
    .then(assertPdfResponse)
    .then((response) => response.blob())
    .then(openBlob)
    .catch((error) => setError(error instanceof Error ? error.message : "Could not open invoice."));
}

function assertPdfResponse(response: Response) {
  if (!response.ok) {
    throw new Error("Could not open invoice. Check creditor settings.");
  }
  return response;
}

function openBlob(blob: Blob) {
  window.open(URL.createObjectURL(blob), "_blank", "noopener,noreferrer");
}
