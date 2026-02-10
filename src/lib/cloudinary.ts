export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
export const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  formData.append("folder", "inmobiliaria")

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  )

  if (!res.ok) throw new Error("Error al subir imagen")

  const data = await res.json()
  return data.secure_url
}

export async function deleteImage(publicId: string): Promise<void> {
  // Deletion requires server-side API with API secret
  // For now, images are managed manually in Cloudinary dashboard
  console.warn("Image deletion requires server-side implementation:", publicId)
}
