import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const status = searchParams.get("status");
		const limit = searchParams.get("limit");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const where: any = {};
		if (status) where.paymentStatus = status;

		const donations = await prisma.donation.findMany({
			where,
			orderBy: { createdAt: "desc" },
			take: limit ? parseInt(limit) : undefined,
		});

		return NextResponse.json(donations);
	} catch (error) {
		console.error("Error fetching donations:", error);
		return NextResponse.json(
			{ error: "Failed to fetch donations" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const donation = await prisma.donation.create({
			data: {
				firstName: body.firstName,
				lastName: body.lastName,
				email: body.email,
				phone: body.phone,
				amount: body.amount,
				currency: body.currency || "NGN",
				paymentReference: body.paymentReference,
				paymentStatus: body.paymentStatus || "pending",
				paymentMethod: body.paymentMethod,
				metadata: body.metadata,
			},
		});

		return NextResponse.json(donation, { status: 201 });
	} catch (error) {
		console.error("Error creating donation:", error);
		return NextResponse.json(
			{ error: "Failed to create donation" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const body = await request.json();
		const { paymentReference, ...data } = body;

		if (!paymentReference) {
			return NextResponse.json(
				{ error: "Payment reference is required" },
				{ status: 400 }
			);
		}

		const donation = await prisma.donation.update({
			where: { paymentReference },
			data,
		});

		return NextResponse.json(donation);
	} catch (error) {
		console.error("Error updating donation:", error);
		return NextResponse.json(
			{ error: "Failed to update donation" },
			{ status: 500 }
		);
	}
}
