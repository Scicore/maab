import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { EditUserForm } from "./EditUserForm";

export const dynamic = "force-dynamic";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const currentUserId = (session?.user as { id?: string })?.id;

  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Edit User</h1>
        <p className="text-slate-500 text-sm mt-1">{user.email}</p>
      </div>
      <EditUserForm
        user={{
          id: user.id,
          email: user.email,
          name: user.name || "",
          role: user.role,
          status: user.status,
        }}
        isSelf={currentUserId === user.id}
      />
    </div>
  );
}