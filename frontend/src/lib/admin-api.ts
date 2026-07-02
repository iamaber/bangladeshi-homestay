import { apiBaseUrl, apiRequest, type Booking, type BookingStatus, type HostBlackout } from "@/lib/api";

export type HostBlackoutPayload = {
  host_id: string;
  start_date: string;
  end_date: string;
  note: string;
};

function adminHeaders(adminKey: string) {
  return { "X-Admin-Key": adminKey };
}

export function loadBookings(adminKey: string) {
  return apiRequest<Booking[]>("/admin/bookings", { headers: adminHeaders(adminKey) });
}

export function loadBlackouts(adminKey: string) {
  return apiRequest<HostBlackout[]>("/admin/hosts/blackouts", { headers: adminHeaders(adminKey) });
}

export function createBlackout(payload: HostBlackoutPayload, adminKey: string) {
  return apiRequest<HostBlackout>("/admin/hosts/blackouts", {
    method: "POST",
    headers: adminHeaders(adminKey),
    body: JSON.stringify(payload),
  });
}

export async function deleteBlackout(blackoutId: number, adminKey: string) {
  const response = await fetch(`${apiBaseUrl}/admin/hosts/blackouts/${blackoutId}`, {
    method: "DELETE",
    headers: adminHeaders(adminKey),
  });
  if (!response.ok) {
    throw new Error("Could not delete availability block.");
  }
}

export function updateBookingStatus(bookingId: string, status: BookingStatus, adminKey: string) {
  return apiRequest<Booking>(`/admin/bookings/${bookingId}/status`, {
    method: "PATCH",
    headers: adminHeaders(adminKey),
    body: JSON.stringify({ status }),
  });
}

export function emailInvoice(bookingId: string, adminKey: string) {
  return apiRequest<Booking>(`/admin/bookings/${bookingId}/send-invoice`, {
    method: "POST",
    headers: adminHeaders(adminKey),
  });
}

export async function fetchInvoicePdf(bookingId: string, adminKey: string) {
  const response = await fetch(`${apiBaseUrl}/admin/bookings/${bookingId}/invoice.pdf`, {
    headers: adminHeaders(adminKey),
  });
  if (!response.ok) {
    throw new Error("Could not open invoice. Check creditor settings.");
  }
  return response.blob();
}
