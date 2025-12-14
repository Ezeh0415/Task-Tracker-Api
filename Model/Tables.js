const UsersTable = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);`;

const TasksTable = `
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  due_date VARCHAR(50) NOT NULL,
  priority VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`;

const PaymentTable = `
 CREATE TABLE IF NOT EXISTS payment (
    id SERIAL PRIMARY KEY,

    user_id INT NOT NULL,

    reference VARCHAR(100) UNIQUE NOT NULL,
    access_code VARCHAR(100) NOT NULL,
    authorization_url TEXT NOT NULL,

    amount INT NOT NULL,
    currency VARCHAR(10) DEFAULT 'NGN',

    email VARCHAR(150) NOT NULL,

    status VARCHAR(20) DEFAULT 'pending'
        CHECK (status IN ('pending', 'success', 'failed')),

    gateway_response TEXT,
    paid_at TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


`;

module.exports = { UsersTable, TasksTable, PaymentTable };
