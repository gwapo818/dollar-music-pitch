// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ryqrqcjbxujecrcvisvu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cXJxY2pieHVqZWNyY3Zpc3Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1OTgzNDEsImV4cCI6MjA1MTE3NDM0MX0.a-azKodmytIx827FkyU0dELVOPtKohM3sWgj_D5VUw4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);