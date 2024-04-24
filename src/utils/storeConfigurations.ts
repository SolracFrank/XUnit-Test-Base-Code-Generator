//Services
export function StoreServices(values: string, storageKey: string) {
  const baseValues = values.trim().replace(/\s/g, "");
  if (baseValues.length == 0) return;

  const storeValues = baseValues.split(",");

  localStorage.setItem(storageKey, JSON.stringify(storeValues));
}

export function DeleteServices() {
  localStorage.clear();
}

export function GetServices(storageKey: string) {
  const value = localStorage.getItem(storageKey);

  if (value) {
    return JSON.parse(value) as string[];
  }
  return null;
}
