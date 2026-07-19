// Run: node scripts/hash-password.mjs yourpassword
// Copy the output into .env.local as ADMIN_PASSWORD_HASH

import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
// Next.js uses dotenv-expand which treats `$` as a variable reference.
// Escape every `$` so the hash value is stored and loaded correctly.
const escaped = hash.replaceAll("$", "\\$");
console.log("\nADMIN_PASSWORD_HASH=" + escaped + "\n");
