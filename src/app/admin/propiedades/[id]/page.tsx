"use client"

import { useParams } from "next/navigation"
import PropertyForm from "@/components/admin/PropertyForm"

export default function EditPropertyPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-dark mb-6">Editar Propiedad</h1>
      <PropertyForm propertyId={id} />
    </div>
  )
}
