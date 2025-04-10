/*
  # Initial Pokemon Battle Platform Schema

  1. New Tables
    - users
      - Extends Supabase auth.users
      - Stores user profile information
    - teams
      - Stores Pokemon teams
      - Links to users
    - battles
      - Records battle history
      - Links to users and teams
    - pokemon
      - Stores Pokemon data
      - Including stats and moves
    
  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- Users table extension
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  rating INTEGER DEFAULT 1000,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  name TEXT NOT NULL,
  pokemon JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Battles table
CREATE TABLE battles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player1_id UUID REFERENCES users(id) NOT NULL,
  player2_id UUID REFERENCES users(id) NOT NULL,
  player1_team_id UUID REFERENCES teams(id) NOT NULL,
  player2_team_id UUID REFERENCES teams(id) NOT NULL,
  winner_id UUID REFERENCES users(id),
  battle_log JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE battles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read their teams"
  ON teams
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create teams"
  ON teams
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their teams"
  ON teams
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read battles they participated in"
  ON battles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = player1_id OR auth.uid() = player2_id);

-- Indexes
CREATE INDEX idx_teams_user_id ON teams(user_id);
CREATE INDEX idx_battles_player1_id ON battles(player1_id);
CREATE INDEX idx_battles_player2_id ON battles(player2_id);