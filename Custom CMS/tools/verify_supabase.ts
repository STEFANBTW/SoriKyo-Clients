import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('🔴 Missing Supabase Environment Variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  console.log('Testing Supabase JSONB Content Lake...');
  
  const { data, error } = await supabase
    .from('documents')
    .insert([
      { 
        _type: 'test_verification', 
        content: { greeting: 'Hello from Omni-CMS Verification', timestamp: new Date().toISOString() } 
      }
    ])
    .select();

  if (error) {
    if (error.code === '42P01') {
      console.warn('🟡 Table "documents" does not exist yet. This is expected before migration.');
      process.exit(0);
    }
    console.error('🔴 Supabase Insert Failed:', error.message);
    process.exit(1);
  }

  console.log('🟢 Supabase JSONB Insert Successful:', data);
}

verify();
