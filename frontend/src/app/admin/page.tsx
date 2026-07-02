"use client";

import { useState } from "react";
import BookingsTable from "@/app/admin/BookingsTable";
import HostBlackoutsPanel from "@/app/admin/HostBlackoutsPanel";
import type { Booking, HostBlackout } from "@/lib/api";
import { loadBlackouts, loadBookings } from "@/lib/admin-api";

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(getSavedAdminKey);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blackouts, setBlackouts] = useState<HostBlackout[]>([]);
  const [error, setError] = useState("");

  async function loadAdminData() {
    setError("");
    window.localStorage.setItem("adminKey", adminKey);
    try {
      const [loadedBookings, loadedBlackouts] = await Promise.all([
        loadBookings(adminKey),
        loadBlackouts(adminKey),
      ]);
      setBookings(loadedBookings);
      setBlackouts(loadedBlackouts);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not load admin data.");
    }
  }

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
              loadAdminData();
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

        <BookingsTable
          adminKey={adminKey}
          bookings={bookings}
          setBookings={setBookings}
          setError={setError}
        />
        <HostBlackoutsPanel
          adminKey={adminKey}
          blackouts={blackouts}
          setBlackouts={setBlackouts}
          setError={setError}
        />
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
