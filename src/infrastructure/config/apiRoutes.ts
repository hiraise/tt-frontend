export const API_ROUTES = {
  LOGIN: "/v1/auth/login",
  SIGNUP: "/v1/auth/register",
  REFRESH: "/v1/auth/refresh",
  AUTH_CHECK: "/v1/auth/check",
  VERIFY: "/v1/auth/verify",
  RESEND_VERIFICATION: "/v1/auth/resend-verification",
  USER: (id: number) => `/v1/users/${id}`,
};
