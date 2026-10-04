import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { EditPartnerForm } from "./EditPartnerForm";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage({
  params,
}: {
  params: { id: string };
}) {
  const partner = await prisma.partner.findUnique({ where: { id: params.id } });
  if (!partner) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Edit Partner</h1>
        <p className="text-slate-500 text-sm mt-1">{partner.name}</p>
      </div>
      <EditPartnerForm
        partner={{
          id: partner.id,
          name: partner.name,
          description: partner.description ?? "",
          website: partner.website ?? "",
          country: partner.country ?? "",
          partnershipType: partner.partnershipType ?? "",
          logoPath: partner.logoPath,
          status: partner.status,
          displayOrder: partner.displayOrder,
        }}
      />
    </div>
  );
}