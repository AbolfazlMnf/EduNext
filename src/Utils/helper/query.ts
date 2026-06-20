type TValue = string | number | boolean | null | undefined | string[];

export const buildQuery = (params: Record<string, TValue>) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === "" || value === undefined || value === null) return;

    query.set(key, String(value));
  });
  return query.toString();
};
