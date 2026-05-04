
-- 1. Workers (Now featuring the skills array)
CREATE TABLE workers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    phone VARCHAR(15) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    area VARCHAR(100),
    skills text[], 
    availability BOOLEAN DEFAULT TRUE,
    rating NUMERIC(2,1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Clients
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    phone VARCHAR(15) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Job Requests (Streamlined with direct skill and description)
CREATE TABLE job_requests (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(id) ON DELETE CASCADE,
    skill VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    area VARCHAR(100),
    description TEXT,
    status VARCHAR(30) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Matches
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES job_requests(id) ON DELETE CASCADE,
    worker_id INT REFERENCES workers(id) ON DELETE CASCADE,
    rank INT,
    status VARCHAR(30) DEFAULT 'SENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Job Assignments
CREATE TABLE job_assignments (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES job_requests(id) ON DELETE CASCADE,
    worker_id INT REFERENCES workers(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'accepted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. OTP Codes
CREATE TABLE otp_codes (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(15) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    attempts INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Performance Indexes
CREATE INDEX idx_workers_city ON workers(city);
CREATE INDEX idx_workers_availability ON workers(availability);
CREATE INDEX idx_matches_job ON matches(job_id);

-- 8. Rating table

CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES job_requests(id),
    worker_id INT REFERENCES workers(id),
    client_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE job_requests
ADD COLUMN lat DOUBLE PRECISION,
ADD COLUMN lng DOUBLE PRECISION;

ALTER TABLE workers
ADD COLUMN lat DOUBLE PRECISION,
ADD COLUMN lng DOUBLE PRECISION;