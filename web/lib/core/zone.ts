
export function getZoneId() { return null; }
export async function zone(callback: () => Promise<any>) {
  return callback();
}
