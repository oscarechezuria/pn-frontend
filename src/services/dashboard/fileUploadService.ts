export async function processFile(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const WEBHOOK_FILE_URL = process.env.NEXT_PUBLIC_WEBHOOK_FILE_URL

  if (!WEBHOOK_FILE_URL) throw new Error("❌ Falta la variable NEXT_PUBLIC_WEBHOOK_URL")

  const response = await fetch(WEBHOOK_FILE_URL, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`)

  return await response.json()
}
