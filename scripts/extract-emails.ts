import { readFileSync, writeFileSync } from 'fs';

const csv = readFileSync('email.csv', 'utf-8');
const lines = csv.split('\n');
const emails: string[] = [];

// Skip header, extract email column (index 4)
for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(',');
  const email = cols[4]?.trim();
  if (email && email.includes('@')) {
    emails.push(email);
  }
}

// Deduplicate and write in Google Calendar format (comma-separated)
const unique = [...new Set(emails)];
writeFileSync('extracted-emails.txt', unique.join(', '));
console.log(`Extracted ${unique.length} unique emails`);
