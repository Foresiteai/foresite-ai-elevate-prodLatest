-- Add slug column to industries table
ALTER TABLE industries ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create an index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);

-- Update existing industries with slugs
UPDATE industries SET slug = 'mining' WHERE name = 'Mining';
UPDATE industries SET slug = 'oil-and-gas' WHERE name = 'Oil & Gas';
UPDATE industries SET slug = 'retail' WHERE name = 'Retail';
UPDATE industries SET slug = 'manufacturing' WHERE name = 'Manufacturing';
UPDATE industries SET slug = 'healthcare' WHERE name = 'Healthcare';
UPDATE industries SET slug = 'finance' WHERE name = 'Finance';
UPDATE industries SET slug = 'supply-chain' WHERE name = 'Supply Chain';