// Corta la conexión con AbortSignal si Supabase no responde a tiempo, en vez
// de solo dejar de esperarla — mitigación portada de personal-finance-app
// tras el cuelgue de servidor del 29-ago-2026 (agotamiento de conexiones).
export function createTimedFetch(timeoutMs: number): typeof fetch {
  return (input, init = {}) => {
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    const signal = init.signal ? AbortSignal.any([init.signal, timeoutSignal]) : timeoutSignal;
    return fetch(input, { ...init, signal });
  };
}
