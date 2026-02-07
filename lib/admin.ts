import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkIsAdmin() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return false;
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { isAdmin: true }
    });

    return user?.isAdmin || false;
}
