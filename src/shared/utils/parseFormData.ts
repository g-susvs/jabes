export function parseFormDataToJson<T>(formData: FormData): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (value instanceof File) return; // ignoramos archivos
    // intentamos parsear JSON si viene como string
    try {
      obj[key] = JSON.parse(value as string);
    } catch {
      obj[key] = value;
    }
  });

  return obj as T;
}
