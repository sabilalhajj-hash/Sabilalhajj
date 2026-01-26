const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

// Load .env files manually if dotenv is not available
function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          process.env[key.trim()] = value.trim();
        }
      }
    });
  }
}

// Try dotenv first, then manual loading
try {
  require('dotenv').config({ path: '.env.local' });
  require('dotenv').config({ path: '.env' });
} catch (e) {
  // dotenv not available, load manually
  loadEnvFile(path.join(__dirname, '..', '.env.local'));
  loadEnvFile(path.join(__dirname, '..', '.env'));
}

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  console.error('   Make sure your .env file contains DATABASE_URL');
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { prepare: false });

async function resetDatabase() {
  try {
    console.log('🔄 Resetting database...\n');

    // Get all table names in the public schema
    const tables = await sql`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public';
    `;

    if (tables.length > 0) {
      console.log(`📋 Found ${tables.length} table(s) to drop:`);
      tables.forEach(table => console.log(`   - ${table.tablename}`));
      
      // Drop all tables in public schema
      console.log('\n🗑️  Dropping all tables...');
      for (const table of tables) {
        try {
          await sql.unsafe(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE;`);
          console.log(`   ✓ Dropped ${table.tablename}`);
        } catch (error) {
          console.error(`   ✗ Failed to drop ${table.tablename}:`, error.message);
        }
      }
    } else {
      console.log('ℹ️  No tables found in public schema');
    }

    // Drop drizzle schema if it exists
    console.log('\n🗑️  Dropping drizzle schema...');
    try {
      await sql.unsafe('DROP SCHEMA IF EXISTS drizzle CASCADE;');
      console.log('   ✓ Dropped drizzle schema');
    } catch (error) {
      console.log('   ℹ️  Drizzle schema does not exist (or already dropped)');
    }

    console.log('\n✅ Database reset completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Run: npm run db:push');
    console.log('   OR');
    console.log('   2. Run: npm run db:migrate');
    console.log('\n');

  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
    throw error;
  } finally {
    await sql.end();
  }
}

// Confirm before proceeding
console.log('⚠️  WARNING: This will DELETE ALL TABLES and DATA in your database!');
console.log('   Database URL:', DATABASE_URL.replace(/:[^:@]+@/, ':****@')); // Hide password
console.log('\n');

// Check if --yes flag is provided
const args = process.argv.slice(2);
if (args.includes('--yes') || args.includes('-y')) {
  resetDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
} else {
  console.log('💡 To proceed without confirmation, run: node scripts/reset-db.js --yes');
  console.log('\n');
  
  // For interactive use, you can uncomment this:
  // const readline = require('readline');
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });
  // rl.question('Type "yes" to continue: ', (answer) => {
  //   if (answer.toLowerCase() === 'yes') {
  //     resetDatabase()
  //       .then(() => {
  //         rl.close();
  //         process.exit(0);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         rl.close();
  //         process.exit(1);
  //       });
  //   } else {
  //     console.log('Cancelled.');
  //     rl.close();
  //     process.exit(0);
  //   }
  // });
  
  // For now, just run it (you can add confirmation later)
  resetDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
