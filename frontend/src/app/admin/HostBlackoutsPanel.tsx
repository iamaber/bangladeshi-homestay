"use client";

import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { HostBlackout } from "@/lib/api";
import { createBlackout, deleteBlackout, loadBlackouts } from "@/lib/admin-api";
import { hosts } from "@/lib/hosts";

type HostBlackoutsPanelProps = {
  adminKey: string;
  blackouts: HostBlackout[];
  setBlackouts: Dispatch<SetStateAction<HostBlackout[]>>;
  setError: (error: string) => void;
};

export default function HostBlackoutsPanel({
  adminKey,
  blackouts,
  setBlackouts,
  setError,
}: HostBlackoutsPanelProps) {
  async function refreshBlackouts() {
    setError("");
    try {
      setBlackouts(await loadBlackouts(adminKey));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not load availability.");
    }
  }

  async function handleCreateBlackout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const created = await createBlackout(
        {
          host_id: String(data.get("hostId") || ""),
          start_date: String(data.get("startDate") || ""),
          end_date: String(data.get("endDate") || ""),
          note: String(data.get("note") || ""),
        },
        adminKey,
      );
      setBlackouts((current) => [...current, created]);
      form.reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not add availability block.");
    }
  }

  async function handleDeleteBlackout(blackoutId: number) {
    setError("");
    try {
      await deleteBlackout(blackoutId, adminKey);
      setBlackouts((current) => current.filter((blackout) => blackout.id !== blackoutId));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not delete availability block.");
    }
  }

  return (
    <section className="mt-10 border border-rule bg-cream2 p-5">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-serif text-[28px] text-ink">Host availability</h2>
          <p className="mt-1 text-[13px] text-muted">
            Add date ranges where a host cannot receive booking requests.
          </p>
        </div>
        <button className="btn-line-sm" type="button" onClick={refreshBlackouts}>
          Refresh
        </button>
      </div>

      <form
        className="grid grid-cols-1 gap-3 md:grid-cols-[1.1fr_0.8fr_0.8fr_1fr_auto]"
        onSubmit={handleCreateBlackout}
      >
        <select name="hostId" className="border border-rule bg-cream px-3 py-2 text-[13px] text-ink">
          {hosts.map((host) => (
            <option key={host.id} value={host.id}>
              {host.label}
            </option>
          ))}
        </select>
        <input
          name="startDate"
          type="date"
          required
          className="border border-rule bg-cream px-3 py-2 text-[13px] text-ink"
        />
        <input
          name="endDate"
          type="date"
          required
          className="border border-rule bg-cream px-3 py-2 text-[13px] text-ink"
        />
        <input
          name="note"
          placeholder="Note"
          className="border border-rule bg-cream px-3 py-2 text-[13px] text-ink"
        />
        <button className="btn-fill-sm" type="submit">
          Add
        </button>
      </form>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-rule text-[11px] uppercase tracking-[0.12em] text-muted">
              <th className="px-3 py-2">Host</th>
              <th className="px-3 py-2">Dates</th>
              <th className="px-3 py-2">Note</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {blackouts.map((blackout) => (
              <tr key={blackout.id} className="border-b border-rule-light">
                <td className="px-3 py-3">{blackout.host_id}</td>
                <td className="px-3 py-3">
                  {blackout.start_date} to {blackout.end_date}
                </td>
                <td className="px-3 py-3 text-muted">{blackout.note || "-"}</td>
                <td className="px-3 py-3">
                  <button
                    className="btn-line-sm"
                    type="button"
                    onClick={() => handleDeleteBlackout(blackout.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {blackouts.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-muted" colSpan={4}>
                  No blackout dates loaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
