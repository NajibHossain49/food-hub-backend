# Prisma + Better Auth Quick Flow

```bash
# Always start here:
npx prisma generate
npx @better-auth/cli@latest generate

# Then choose:

# Fresh start (delete all data - most reliable in dev)
npx prisma migrate reset

# OR keep data (when possible)
npx prisma migrate dev --name init-better-auth

# Check result
npx prisma studio