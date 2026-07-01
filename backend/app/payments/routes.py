from fastapi import APIRouter, Depends, HTTPException, Response, status

from app.payments.models import SwissQrInvoiceRequest
from app.payments.pdf import render_swiss_qr_invoice_pdf
from app.payments.swiss_qr import build_swiss_qr_payload
from app.settings import Settings, get_settings


router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/swiss-qr/invoices", response_class=Response)
def create_swiss_qr_invoice(
    invoice: SwissQrInvoiceRequest,
    settings: Settings = Depends(get_settings),
) -> Response:
    try:
        creditor = settings.creditor()
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(error),
        ) from error

    qr_payload = build_swiss_qr_payload(invoice, creditor)
    pdf = render_swiss_qr_invoice_pdf(invoice, creditor, qr_payload)
    headers = {"Content-Disposition": f'inline; filename="{invoice.invoice_id}.pdf"'}
    return Response(content=pdf, media_type="application/pdf", headers=headers)
