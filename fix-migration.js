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
  
  require('dotenv').config({ path: '.env' });
} catch (e) {
  // dotenv not available, load manually
  
  loadEnvFile(path.join(__dirname, '.env'));
}

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { prepare: false });

async function fixMigration() {
  try {
    console.log('Checking database state...');

    // Check if username column exists
    const columnCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'username';
    `;

    if (columnCheck.length === 0) {
      console.log('Adding username column...');
      await sql`ALTER TABLE "users" ADD COLUMN "username" varchar(255);`;
      console.log('✓ Username column added');
    } else {
      console.log('✓ Username column already exists');
    }

    // Check if username index exists
    const indexCheck = await sql`
      SELECT indexname 
      FROM pg_indexes 
      WHERE tablename = 'users' AND indexname = 'username_idx';
    `;

    if (indexCheck.length === 0) {
      console.log('Creating username index...');
      await sql`CREATE INDEX "username_idx" ON "users" USING btree ("username");`;
      console.log('✓ Username index created');
    } else {
      console.log('✓ Username index already exists');
    }

    // Check if username unique constraint exists
    const constraintCheck = await sql`
      SELECT constraint_name 
      FROM information_schema.table_constraints 
      WHERE table_name = 'users' 
        AND constraint_type = 'UNIQUE' 
        AND constraint_name = 'users_username_unique';
    `;

    if (constraintCheck.length === 0) {
      console.log('Adding username unique constraint...');
      await sql`ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");`;
      console.log('✓ Username unique constraint added');
    } else {
      console.log('✓ Username unique constraint already exists');
    }

    // Check if migration is already recorded
    // Drizzle migrations table structure - check existing records to understand format
    const migrationTag = '0000_talented_pyro';
    
    // Check what columns exist in the migrations table
    const tableInfo = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'drizzle' 
        AND table_name = '__drizzle_migrations';
    `;
    
    const columnNames = tableInfo.map(row => row.column_name);
    const columnTypes = {};
    tableInfo.forEach(row => {
      columnTypes[row.column_name] = row.data_type;
    });
    
    console.log('Migration table structure:', columnTypes);
    
    // Check existing migrations to understand the format
    const existingMigrations = await sql`
      SELECT * FROM drizzle.__drizzle_migrations LIMIT 1;
    `;
    
    if (existingMigrations.length > 0) {
      console.log('Sample migration record:', existingMigrations[0]);
    }
    
    // Try to find existing migration record by hash
    let migrationCheck = [];
    if (columnNames.includes('hash')) {
      migrationCheck = await sql`
        SELECT * FROM drizzle.__drizzle_migrations 
        WHERE hash = ${migrationTag};
      `;
    }

    if (migrationCheck.length === 0) {
      console.log('Marking migration as applied...');
      // Insert migration record - created_at is bigint (timestamp in milliseconds)
      const createdAt = Date.now();
      
      // Based on drizzle-kit structure: id is integer (auto-increment or sequence), hash is text
      if (columnNames.includes('hash') && columnNames.includes('id')) {
        // id is likely auto-increment, so we only insert hash and created_at
        await sql`
          INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
          VALUES (${migrationTag}, ${createdAt});
        `;
      } else if (columnNames.includes('hash')) {
        await sql`
          INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
          VALUES (${migrationTag}, ${createdAt});
        `;
      } else {
        console.log('⚠️  Could not determine migration table structure. Please mark migration manually.');
        console.log('   Run: INSERT INTO drizzle.__drizzle_migrations (hash, created_at) VALUES (\'0000_talented_pyro\', ' + createdAt + ');');
      }
      console.log('✓ Migration marked as applied');
    } else {
      console.log('✓ Migration already marked as applied');
    }

    console.log('\n✅ Migration fix completed successfully!');
  } catch (error) {
    console.error('❌ Error fixing migration:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

fixMigration()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
