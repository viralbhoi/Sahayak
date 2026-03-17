-- CREATE TABLE skills (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) UNIQUE NOT NULL
-- );

-- CREATE TABLE workers (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(150),
--     phone VARCHAR(15) UNIQUE NOT NULL,
--     city VARCHAR(100) NOT NULL,
--     area VARCHAR(100),
--     availability BOOLEAN DEFAULT TRUE,
--     rating NUMERIC(2,1) DEFAULT 0.0,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE worker_skills (
--     worker_id INT REFERENCES workers(id) ON DELETE CASCADE,
--     skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
--     PRIMARY KEY (worker_id, skill_id)
-- );

-- CREATE TABLE clients (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(150),
--     phone VARCHAR(15) UNIQUE NOT NULL,
--     city VARCHAR(100) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE job_requests (
--     id SERIAL PRIMARY KEY,
--     client_id INT REFERENCES clients(id) ON DELETE CASCADE,
--     skill_id INT REFERENCES skills(id),
--     city VARCHAR(100) NOT NULL,
--     area VARCHAR(100),
--     urgency VARCHAR(50),
--     status VARCHAR(30) DEFAULT 'OPEN',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE matches (
--     id SERIAL PRIMARY KEY,
--     job_id INT REFERENCES job_requests(id) ON DELETE CASCADE,
--     worker_id INT REFERENCES workers(id),
--     rank INT,
--     status VARCHAR(30) DEFAULT 'SENT',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE INDEX idx_workers_city ON workers(city);
-- CREATE INDEX idx_workers_availability ON workers(availability);
-- CREATE INDEX idx_job_skill ON job_requests(skill_id);
-- CREATE INDEX idx_matches_job ON matches(job_id);

-- -- matching query

-- SELECT 
--     w.id,
--     w.name,
--     w.phone,
--     w.area,
--     MAX(m.created_at) AS last_assigned_at
-- FROM workers w
-- JOIN worker_skills ws ON ws.worker_id = w.id
-- LEFT JOIN matches m ON m.worker_id = w.id
-- WHERE ws.skill_id = 1
--   AND w.city = 'Vadodara'
--   AND w.availability = TRUE
-- GROUP BY w.id
-- ORDER BY 
--     (w.area = 'Alkapuri') DESC,
--     last_assigned_at NULLS FIRST
-- LIMIT 5;

-- CREATE TABLE otp_codes (
--     id SERIAL PRIMARY KEY,
--     phone VARCHAR(15) NOT NULL,
--     otp VARCHAR(6) NOT NULL,
--     expires_at TIMESTAMP NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- ALTER TABLE otp_codes
-- ADD COLUMN attempts INT DEFAULT 0;

-- CREATE TABLE job_assignments (
--     id SERIAL PRIMARY KEY,
--     job_id INT REFERENCES job_requests(id),
--     worker_id INT REFERENCES workers(id),
--     status VARCHAR(30) DEFAULT 'accepted',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- ALTER TABLE job_requests
-- ADD COLUMN status VARCHAR(30) DEFAULT 'pending';

-- ALTER TABLE job_requests
-- ADD COLUMN skill VARCHAR(100);

-- ALTER TABLE job_requests
-- ADD COLUMN description TEXT;

-- ALTER TABLE job_requests
-- DROP COLUMN skill_id;

-- ALTER TABLE job_requests
-- DROP COLUMN urgency;

-- ALTER TABLE workers
-- ADD COLUMN skills TEXT[];


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