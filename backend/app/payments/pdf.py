from io import BytesIO

import qrcode
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen.canvas import Canvas

from app.payments.models import SwissQrInvoiceRequest, SwissQrPayload
from app.settings import CreditorSettings


def render_swiss_qr_invoice_pdf(
    invoice: SwissQrInvoiceRequest,
    creditor: CreditorSettings,
    qr_payload: SwissQrPayload,
) -> bytes:
    buffer = BytesIO()
    canvas = Canvas(buffer, pagesize=A4)
    draw_invoice(canvas, invoice, creditor, qr_payload)
    canvas.save()
    return buffer.getvalue()


def draw_invoice(
    canvas: Canvas,
    invoice: SwissQrInvoiceRequest,
    creditor: CreditorSettings,
    qr_payload: SwissQrPayload,
) -> None:
    width, height = A4
    canvas.setTitle(f"Swiss QR invoice {invoice.invoice_id}")
    draw_invoice_header(canvas, invoice, width, height)
    draw_payment_part(canvas, invoice, creditor, qr_payload)


def draw_invoice_header(canvas: Canvas, invoice: SwissQrInvoiceRequest, width: float, height: float) -> None:
    canvas.setFillColor(colors.HexColor("#24352d"))
    canvas.setFont("Helvetica-Bold", 18)
    canvas.drawString(20 * mm, height - 26 * mm, "Guru Gasthaus")
    canvas.setFont("Helvetica", 10)
    canvas.drawString(20 * mm, height - 34 * mm, f"Invoice {invoice.invoice_id}")
    canvas.drawRightString(width - 20 * mm, height - 34 * mm, f"CHF {invoice.amount:.2f}")


def draw_payment_part(
    canvas: Canvas,
    invoice: SwissQrInvoiceRequest,
    creditor: CreditorSettings,
    qr_payload: SwissQrPayload,
) -> None:
    payment_top = 105 * mm
    canvas.setStrokeColor(colors.HexColor("#d7d0c4"))
    canvas.line(0, payment_top, A4[0], payment_top)
    canvas.line(62 * mm, 0, 62 * mm, payment_top)
    draw_receipt(canvas, invoice, creditor, payment_top)
    draw_qr_section(canvas, invoice, creditor, qr_payload, payment_top)


def draw_receipt(
    canvas: Canvas,
    invoice: SwissQrInvoiceRequest,
    creditor: CreditorSettings,
    payment_top: float,
) -> None:
    canvas.setFillColor(colors.HexColor("#24352d"))
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(5 * mm, payment_top - 10 * mm, "Receipt")
    canvas.setFont("Helvetica-Bold", 7)
    canvas.drawString(5 * mm, payment_top - 20 * mm, "Account / Payable to")
    canvas.setFont("Helvetica", 7)
    draw_lines(canvas, 5 * mm, payment_top - 25 * mm, 4 * mm, creditor_lines(creditor))
    canvas.setFont("Helvetica-Bold", 7)
    canvas.drawString(5 * mm, 24 * mm, "Amount")
    canvas.setFont("Helvetica", 9)
    canvas.drawString(5 * mm, 19 * mm, f"CHF {invoice.amount:.2f}")


def draw_qr_section(
    canvas: Canvas,
    invoice: SwissQrInvoiceRequest,
    creditor: CreditorSettings,
    qr_payload: SwissQrPayload,
    payment_top: float,
) -> None:
    canvas.setFillColor(colors.HexColor("#24352d"))
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(68 * mm, payment_top - 10 * mm, "Payment part")
    qr_image = make_qr_image(qr_payload.payload)
    canvas.drawInlineImage(qr_image, 68 * mm, payment_top - 66 * mm, 46 * mm, 46 * mm)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(122 * mm, payment_top - 20 * mm, "Account / Payable to")
    canvas.setFont("Helvetica", 8)
    draw_lines(canvas, 122 * mm, payment_top - 25 * mm, 4.5 * mm, creditor_lines(creditor))
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(122 * mm, payment_top - 55 * mm, "Payable by")
    canvas.setFont("Helvetica", 8)
    draw_lines(canvas, 122 * mm, payment_top - 60 * mm, 4.5 * mm, debtor_lines(invoice))
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(122 * mm, 24 * mm, "Amount")
    canvas.setFont("Helvetica", 10)
    canvas.drawString(122 * mm, 18 * mm, f"CHF {invoice.amount:.2f}")


def draw_lines(canvas: Canvas, x: float, y: float, leading: float, lines: list[str]) -> None:
    for index, line in enumerate(lines):
        canvas.drawString(x, y - (index * leading), line)


def creditor_lines(creditor: CreditorSettings) -> list[str]:
    return [
        creditor.iban,
        creditor.name,
        f"{creditor.street} {creditor.building_number}",
        f"{creditor.postal_code} {creditor.city}",
        creditor.country,
    ]


def debtor_lines(invoice: SwissQrInvoiceRequest) -> list[str]:
    debtor = invoice.debtor
    return [
        debtor.name,
        f"{debtor.street} {debtor.building_number}",
        f"{debtor.postal_code} {debtor.city}",
        debtor.country,
    ]


def make_qr_image(payload: str):
    image = qrcode.make(payload)
    return image.get_image()
