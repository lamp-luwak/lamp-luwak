
export const state = new Map<string, any>();

export function init(data: object) {
  for (const key of Object.keys(data)) {
    state.set(key, (data as any)[key]);
  }
}
