'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function declareInterestChat(leagueId: string, targetUserId: string, targetPlayerId: string, playerName: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  
  const proposingUserId = (session.user as any).id;
  const proposingUser = await prisma.user.findUnique({ where: { id: proposingUserId } });

  // 1. Find or Create ChatThread
  let thread = await prisma.chatThread.findFirst({
    where: {
      leagueId,
      OR: [
        { userAId: proposingUserId, userBId: targetUserId },
        { userAId: targetUserId, userBId: proposingUserId }
      ]
    }
  });

  if (!thread) {
    thread = await prisma.chatThread.create({
      data: {
        leagueId,
        userAId: proposingUserId,
        userBId: targetUserId
      }
    });
  }

  // 2. Add the initial message
  await prisma.message.create({
    data: {
      threadId: thread.id,
      senderId: proposingUserId,
      content: `I am interested in ${playerName}. What is your price?`
    }
  });

  await prisma.notification.create({
    data: {
      leagueId,
      userId: targetUserId,
      type: 'INTEREST',
      message: `${proposingUser?.displayName} has declared interest in ${playerName}. Open Messages in league ${leagueId}.`,
    },
  });

  return { threadId: thread.id };
}

export async function getChatThreads(leagueId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return [];
  const userId = (session.user as any).id;

  return await prisma.chatThread.findMany({
    where: {
      leagueId,
      OR: [
        { userAId: userId },
        { userBId: userId }
      ]
    },
    include: {
      messages: { orderBy: { createdAt: 'asc' } }
    },
    orderBy: { updatedAt: 'desc' }
  });
}

export async function sendMessage(threadId: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  const userId = (session.user as any).id;

  const msg = await prisma.message.create({
    data: {
      threadId,
      senderId: userId,
      content
    }
  });

  // Update thread updatedAt
  await prisma.chatThread.update({
    where: { id: threadId },
    data: { updatedAt: new Date() }
  });

  return msg;
}

export async function markNotificationsRead(leagueId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false };
  const userId = (session.user as any).id;

  await prisma.notification.updateMany({
    where: { leagueId, userId, isRead: false },
    data: { isRead: true }
  });

  return { success: true };
}
