import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Enable CORS for all routes
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Enable logging
app.use('*', logger(console.log))

// Create Supabase client with service role key for server operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Helper function to get user from access token
async function getUserFromToken(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1]
  if (!accessToken) {
    return { user: null, error: 'No authorization token provided' }
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken)
  if (error || !user) {
    return { user: null, error: 'Invalid or expired token' }
  }

  return { user, error: null }
}

// Initialize database tables if they don't exist
app.get('/make-server-e41c7639/init', async (c) => {
  try {
    // Create user profiles table
    const { error: profileError } = await supabase.rpc('create_user_profiles_table')
    if (profileError && !profileError.message.includes('already exists')) {
      console.log('Profile table creation error:', profileError)
    }

    // Create user debts table  
    const { error: debtError } = await supabase.rpc('create_user_debts_table')
    if (debtError && !debtError.message.includes('already exists')) {
      console.log('Debt table creation error:', debtError)
    }

    // Create payment history table
    const { error: paymentError } = await supabase.rpc('create_payment_history_table')
    if (paymentError && !paymentError.message.includes('already exists')) {
      console.log('Payment table creation error:', paymentError)
    }

    // Create debt goals table
    const { error: goalError } = await supabase.rpc('create_debt_goals_table')
    if (goalError && !goalError.message.includes('already exists')) {
      console.log('Goal table creation error:', goalError)
    }

    return c.json({ success: true, message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Database initialization error:', error)
    return c.json({ success: false, error: 'Failed to initialize database' }, 500)
  }
})

// User signup endpoint
app.post('/make-server-e41c7639/auth/signup', async (c) => {
  try {
    const { email, password, fullName } = await c.req.json()
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400)
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name: fullName },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (error) {
      console.error('Signup error:', error)
      return c.json({ error: error.message }, 400)
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        email: data.user.email!,
        full_name: fullName || null,
        preferences: {
          currency: 'USD',
          notifications: true,
          theme: 'light'
        }
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Don't fail signup if profile creation fails
    }

    return c.json({ 
      success: true, 
      user: data.user,
      message: 'Account created successfully' 
    })
  } catch (error) {
    console.error('Signup processing error:', error)
    return c.json({ error: 'Failed to create account' }, 500)
  }
})

// Get user debts
app.get('/make-server-e41c7639/debts', async (c) => {
  try {
    const { user, error: authError } = await getUserFromToken(c.req.raw)
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401)
    }

    const { data: debts, error } = await supabase
      .from('user_debts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching debts:', error)
      return c.json({ error: 'Failed to fetch debts' }, 500)
    }

    return c.json({ debts: debts || [] })
  } catch (error) {
    console.error('Error in get debts:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Create new debt
app.post('/make-server-e41c7639/debts', async (c) => {
  try {
    const { user, error: authError } = await getUserFromToken(c.req.raw)
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401)
    }

    const debtData = await c.req.json()
    
    // Validate required fields
    const requiredFields = ['name', 'type', 'remaining', 'original', 'monthly_payment', 'interest_rate', 'next_payment', 'color']
    for (const field of requiredFields) {
      if (debtData[field] === undefined || debtData[field] === null) {
        return c.json({ error: `Missing required field: ${field}` }, 400)
      }
    }

    // Validate data types and ranges
    if (debtData.remaining < 0 || debtData.original < 0 || debtData.monthly_payment <= 0) {
      return c.json({ error: 'Invalid numerical values' }, 400)
    }

    if (debtData.interest_rate < 0 || debtData.interest_rate > 100) {
      return c.json({ error: 'Interest rate must be between 0 and 100' }, 400)
    }

    const { data, error } = await supabase
      .from('user_debts')
      .insert({
        user_id: user.id,
        ...debtData
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating debt:', error)
      return c.json({ error: 'Failed to create debt' }, 500)
    }

    return c.json({ success: true, debt: data })
  } catch (error) {
    console.error('Error in create debt:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Update debt
app.put('/make-server-e41c7639/debts/:id', async (c) => {
  try {
    const { user, error: authError } = await getUserFromToken(c.req.raw)
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401)
    }

    const debtId = c.req.param('id')
    const updateData = await c.req.json()

    // Remove user_id from update data to prevent unauthorized changes
    delete updateData.user_id
    delete updateData.id

    const { data, error } = await supabase
      .from('user_debts')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', debtId)
      .eq('user_id', user.id) // Ensure user can only update their own debts
      .select()
      .single()

    if (error) {
      console.error('Error updating debt:', error)
      return c.json({ error: 'Failed to update debt' }, 500)
    }

    if (!data) {
      return c.json({ error: 'Debt not found or unauthorized' }, 404)
    }

    return c.json({ success: true, debt: data })
  } catch (error) {
    console.error('Error in update debt:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Delete debt
app.delete('/make-server-e41c7639/debts/:id', async (c) => {
  try {
    const { user, error: authError } = await getUserFromToken(c.req.raw)
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401)
    }

    const debtId = c.req.param('id')

    // First delete associated payments and goals
    await supabase.from('payment_history').delete().eq('debt_id', debtId).eq('user_id', user.id)
    await supabase.from('debt_goals').delete().eq('debt_id', debtId).eq('user_id', user.id)

    // Then delete the debt
    const { error } = await supabase
      .from('user_debts')
      .delete()
      .eq('id', debtId)
      .eq('user_id', user.id) // Ensure user can only delete their own debts

    if (error) {
      console.error('Error deleting debt:', error)
      return c.json({ error: 'Failed to delete debt' }, 500)
    }

    return c.json({ success: true, message: 'Debt deleted successfully' })
  } catch (error) {
    console.error('Error in delete debt:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Add payment
app.post('/make-server-e41c7639/payments', async (c) => {
  try {
    const { user, error: authError } = await getUserFromToken(c.req.raw)
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401)
    }

    const { debt_id, amount, payment_date, payment_type = 'manual', notes } = await c.req.json()

    if (!debt_id || !amount || amount <= 0) {
      return c.json({ error: 'Valid debt ID and amount are required' }, 400)
    }

    // Verify debt belongs to user and get current balance
    const { data: debt, error: debtError } = await supabase
      .from('user_debts')
      .select('remaining')
      .eq('id', debt_id)
      .eq('user_id', user.id)
      .single()

    if (debtError || !debt) {
      return c.json({ error: 'Debt not found or unauthorized' }, 404)
    }

    // Calculate new remaining balance
    const newRemaining = Math.max(0, debt.remaining - amount)

    // Record payment
    const { data: payment, error: paymentError } = await supabase
      .from('payment_history')
      .insert({
        user_id: user.id,
        debt_id,
        amount,
        payment_date: payment_date || new Date().toISOString(),
        payment_type,
        notes
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Error recording payment:', paymentError)
      return c.json({ error: 'Failed to record payment' }, 500)
    }

    // Update debt balance
    const { error: updateError } = await supabase
      .from('user_debts')
      .update({ 
        remaining: newRemaining,
        updated_at: new Date().toISOString()
      })
      .eq('id', debt_id)
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Error updating debt balance:', updateError)
      return c.json({ error: 'Failed to update debt balance' }, 500)
    }

    return c.json({ 
      success: true, 
      payment,
      new_remaining: newRemaining,
      is_paid_off: newRemaining === 0
    })
  } catch (error) {
    console.error('Error in add payment:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get payment history
app.get('/make-server-e41c7639/payments', async (c) => {
  try {
    const { user, error: authError } = await getUserFromToken(c.req.raw)
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401)
    }

    const debtId = c.req.query('debt_id')
    let query = supabase
      .from('payment_history')
      .select(`
        *,
        user_debts!inner(name)
      `)
      .eq('user_id', user.id)
      .order('payment_date', { ascending: false })

    if (debtId) {
      query = query.eq('debt_id', debtId)
    }

    const { data: payments, error } = await query

    if (error) {
      console.error('Error fetching payments:', error)
      return c.json({ error: 'Failed to fetch payment history' }, 500)
    }

    return c.json({ payments: payments || [] })
  } catch (error) {
    console.error('Error in get payments:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Sync local data to cloud (migration endpoint)
app.post('/make-server-e41c7639/sync/import', async (c) => {
  try {
    const { user, error: authError } = await getUserFromToken(c.req.raw)
    if (authError || !user) {
      return c.json({ error: authError || 'Unauthorized' }, 401)
    }

    const { debts, payment_history } = await c.req.json()

    if (!Array.isArray(debts)) {
      return c.json({ error: 'Invalid debts data' }, 400)
    }

    let imported = { debts: 0, payments: 0 }

    // Import debts
    for (const debt of debts) {
      try {
        const { error } = await supabase
          .from('user_debts')
          .insert({
            user_id: user.id,
            name: debt.name,
            type: debt.type,
            remaining: debt.remaining,
            original: debt.original,
            monthly_payment: debt.monthlyPayment,
            interest_rate: debt.interestRate,
            next_payment: debt.nextPayment,
            color: debt.color
          })

        if (!error) {
          imported.debts++
        }
      } catch (e) {
        console.warn('Failed to import debt:', debt.name, e)
      }
    }

    // Import payment history if provided
    if (Array.isArray(payment_history)) {
      for (const payment of payment_history) {
        try {
          const { error } = await supabase
            .from('payment_history')
            .insert({
              user_id: user.id,
              debt_id: payment.debt_id,
              amount: payment.amount,
              payment_date: payment.date,
              payment_type: 'manual',
              notes: `Imported: ${payment.debt_name || ''}`
            })

          if (!error) {
            imported.payments++
          }
        } catch (e) {
          console.warn('Failed to import payment:', e)
        }
      }
    }

    return c.json({ 
      success: true, 
      imported,
      message: `Imported ${imported.debts} debts and ${imported.payments} payments` 
    })
  } catch (error) {
    console.error('Error in sync import:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Health check
app.get('/make-server-e41c7639/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

Deno.serve(app.fetch)