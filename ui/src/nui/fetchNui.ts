export async function fetchNui<TResp = any, TBody = any>(
  eventName: string,
  body?: TBody,
): Promise<TResp> {
  const isFivem = typeof (window as any).GetParentResourceName === 'function';

  if (!isFivem) {
    console.warn('Running outside FiveM (dev). Implement mock if needed.');
    return {} as TResp;
  }

  const resource = (window as any).GetParentResourceName();
  const res = await fetch(`https://${resource}/${eventName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(body ?? {}),
  });

  return res.json();
}
