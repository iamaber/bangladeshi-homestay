export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type BookingStatus =
  | "requested"
  | "reviewed"
  | "invoice_sent"
  | "paid"
  | "confirmed"
  | "cancelled";

export type Booking = {
  id: string;
  status: BookingStatus;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  street: string;
  building_number: string;
  postal_code: string;
  city: string;
  guests: number;
  package: string;
  include_flight: boolean;
  total_chf: string;
  arrival_date: string;
  departure_date: string;
  notes?: string | null;
  created_at: string;
  updated_at: string;
};

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(await errorMessage(response));
  }

  return response.json() as Promise<T>;
}

export async function errorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return typeof data.detail === "string" ? data.detail : "Request failed";
  } catch {
    return "Request failed";
  }
}
