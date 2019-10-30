DROP EXTENSION IF EXISTS pgcrypto;
DROP TABLE IF EXISTS users;

CREATE EXTENSION pgcrypto;
CREATE TABLE users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  create_date DATE NOT NULL DEFAULT CURRENT_DATE,
  first_name TEXT,
  last_name TEXT
);