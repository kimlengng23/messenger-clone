
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ conversationId?: string }> }
) {
    try {
        const { conversationId } = await params;
        const currentUser = await getCurrentUser();
        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const existingConversation = await prisma?.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true
            }

        })
        if (!existingConversation) {
            return new NextResponse("Invalid ID", { status: 400 })
        }
        const deletedConversation = await prisma?.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })
        existingConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
            }
        })
        return NextResponse.json(deletedConversation)
    }
    catch (error: any) {
        console.log(error, "ERROR_CONVERSATION_DELETE");
        return new NextResponse("Internal Error", { status: 500 })
    }
}