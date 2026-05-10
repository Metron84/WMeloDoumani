import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { inviteCode } = await req.json();

  if (!inviteCode) {
    return NextResponse.json({ message: "Invite code required" }, { status: 400 });
  }

  const league = await prisma.league.findUnique({
    where: { inviteCode }
  });

  if (!league) {
    return NextResponse.json({ message: "Invalid invite code" }, { status: 404 });
  }

  const user = await prisma.user.update({
    where: { id: (session.user as any).id },
    data: { leagueId: league.id }
  });

  return NextResponse.json({ message: "Joined successfully", user });
}
