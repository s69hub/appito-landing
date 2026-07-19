// Bank Mellat (به‌پرداخت ملت) REST API integration
// Docs: BPM-PGW-REST v1.1
// Test server: https://pgwstest.bpm.bankmellat.ir/ipg2/rest
// Prod server:  https://bpm2.shaparak.ir/ipg2/rest

const isProd = process.env.NODE_ENV === "production";

const BASE_URL = isProd
    ? "https://bpm2.shaparak.ir/ipg2/rest"
    : "https://pgwstest.bpm.bankmellat.ir/ipg2/rest";

export const PAY_PAGE_URL = isProd
    ? "https://bpm2.shaparak.ir/ipg2/startpay.mellat"
    : "https://pgwstest.bpm.bankmellat.ir/ipg2/startpay.mellat";

function getAuthHeader(): string {
    const user = process.env.BPM_USERNAME ?? "";
    const pass = process.env.BPM_PASSWORD ?? "";
    const encoded = Buffer.from(`${user}:${pass}`).toString("base64");
    return `Basic ${encoded}`;
}

function getCredentials() {
    return {
        terminalId: Number(process.env.BPM_TERMINAL_ID ?? "0"),
        userName: process.env.BPM_USERNAME ?? "",
        userPassword: process.env.BPM_PASSWORD ?? "",
    };
}

function headers() {
    return {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
    };
}

// ── bpPayRequest ──────────────────────────────────────────────────────────────

export interface PayRequestParams {
    orderId: number;
    amount: number; // in Rials
    localDate: string; // YYYYMMDD
    localTime: string; // HHMMSS
    callBackUrl: string;
    additionalData?: string;
    payerId?: string;
}

export interface PayRequestResult {
    resCode: string;
    refId: string;
}

export async function bpPayRequest(
    params: PayRequestParams
): Promise<PayRequestResult> {
    const body = {
        ...getCredentials(),
        orderId: params.orderId,
        amount: String(params.amount),
        localDate: params.localDate,
        localTime: params.localTime,
        callBackUrl: params.callBackUrl,
        additionalData: params.additionalData ?? "",
        payerId: params.payerId ?? "0",
        mobileNo: "0",
        encPan: "",
        panHiddenMode: "",
        cartItem: "",
        enc: "",
    };

    const res = await fetch(`${BASE_URL}/bpPayRequest`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    });

    const text = (await res.text()).replace(/^"|"$/g, ""); // strip surrounding quotes
    const [resCode, refId] = text.split(",");
    return { resCode: resCode.trim(), refId: (refId ?? "").trim() };
}

// ── bpVerifySettleRequest ─────────────────────────────────────────────────────

export interface VerifySettleParams {
    orderId: number;
    saleOrderId: number;
    saleReferenceId: number;
}

export async function bpVerifySettleRequest(
    params: VerifySettleParams
): Promise<string> {
    const body = {
        ...getCredentials(),
        orderId: params.orderId,
        saleOrderId: params.saleOrderId,
        saleReferenceId: params.saleReferenceId,
    };

    const res = await fetch(`${BASE_URL}/bpVerifySettleRequest`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(body),
    });

    const text = (await res.text()).replace(/^"|"$/g, "");
    return text.trim(); // returns the resCode string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Generate a unique numeric orderId from current timestamp. Safe for Long. */
export function generateOrderId(): number {
    return Date.now(); // 13-digit ms timestamp, well within Long range
}

/** Format Date as YYYYMMDD */
export function formatDate(d = new Date()): string {
    return d.toISOString().slice(0, 10).replace(/-/g, "");
}

/** Format Date as HHMMSS */
export function formatTime(d = new Date()): string {
    return d.toTimeString().slice(0, 8).replace(/:/g, "");
}

/** Maps Bank Mellat resCode to a human-readable Persian message. */
export function mellatResCodeMessage(code: string): string {
    const map: Record<string, string> = {
        "0": "تراکنش با موفقیت انجام شد",
        "11": "شماره کارت نامعتبر است",
        "12": "موجودی کافی نیست",
        "13": "رمز نادرست است",
        "14": "تعداد دفعات وارد کردن رمز بیش از حد مجاز است",
        "15": "کارت نامعتبر است",
        "17": "کاربر از انجام تراکنش منصرف شده است",
        "18": "تاریخ انقضای کارت گذشته است",
        "21": "پذیرنده نامعتبر است",
        "23": "خطای امنیتی رخ داده است",
        "24": "اطلاعات کاربری پذیرنده نامعتبر است",
        "25": "مبلغ نامعتبر است",
        "41": "شماره درخواست تکراری است",
        "43": "قبلاً درخواست Verify داده شده است",
        "44": "درخواست Verify یافت نشد",
        "45": "تراکنش Settle شده است",
        "48": "تراکنش Reverse شده است",
        "51": "تراکنش تکراری است",
        "61": "خطا در واریز",
        "62": "مسیر بازگشت در دامنه ثبت‌شده قرار ندارد",
        "98": "سقف استفاده از رمز ایستا به پایان رسیده است",
    };
    return map[code] ?? `خطای ناشناخته (کد ${code})`;
}
