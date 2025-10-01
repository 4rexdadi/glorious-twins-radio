/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Verify Paystack webhook signature
function verifyWebhookSignature(payload: string, signature: string): boolean {
	const secret = process.env.PAYSTACK_SECRET_KEY!;
	const hash = crypto
		.createHmac("sha512", secret)
		.update(payload)
		.digest("hex");
	return hash === signature;
}

export async function POST(request: NextRequest) {
	try {
		const signature = request.headers.get("x-paystack-signature");
		const body = await request.text();

		if (!signature || !verifyWebhookSignature(body, signature)) {
			return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
		}

		const event = JSON.parse(body);

		// Handle different event types
		switch (event.event) {
			case "charge.success":
				await handleSuccessfulPayment(event.data);
				break;
			case "charge.failed":
				await handleFailedPayment(event.data);
				break;
			default:
				console.log(`Unhandled event type: ${event.event}`);
		}

		return NextResponse.json({ status: "success" });
	} catch (error) {
		console.error("Webhook error:", error);
		return NextResponse.json(
			{ error: "Webhook processing failed" },
			{ status: 500 }
		);
	}
}

async function handleSuccessfulPayment(data: any) {
	const { reference, amount, customer, metadata } = data;

	await prisma.donation.update({
		where: { paymentReference: reference },
		data: {
			paymentStatus: "success",
			metadata: {
				...metadata,
				paystackData: data,
			},
		},
	});

	// You can add email notification logic here
	console.log(`Payment successful for ${customer.email}: ₦${amount / 100}`);
}

async function handleFailedPayment(data: any) {
	const { reference } = data;

	await prisma.donation.update({
		where: { paymentReference: reference },
		data: {
			paymentStatus: "failed",
		},
	});
}
