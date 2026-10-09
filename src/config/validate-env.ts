const REQUIRED_ENV_VARS = ['DB_URL', 'JWT_SECRET'] as const;

// Fail the deploy at startup instead of failing requests later.
export function validateEnv(): void {
  const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
}
