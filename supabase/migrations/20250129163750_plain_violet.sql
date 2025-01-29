/*
  # Initial Schema Setup for AgroPredict

  1. New Tables
    - users
      - Extends Supabase auth.users
      - Stores additional user information
    - crop_predictions
      - Stores crop yield predictions
    - soil_data
      - Stores soil analysis data
    - weather_data
      - Stores weather tracking information
    - fertilizer_recommendations
      - Stores fertilizer recommendations

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table extension
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  organization text,
  region text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crop predictions table
CREATE TABLE IF NOT EXISTS public.crop_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  crop_type text NOT NULL,
  region text NOT NULL,
  soil_type text NOT NULL,
  predicted_yield decimal NOT NULL,
  confidence_score decimal,
  prediction_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Soil data table
CREATE TABLE IF NOT EXISTS public.soil_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  region text NOT NULL,
  ph_level decimal,
  nitrogen_level decimal,
  phosphorus_level decimal,
  potassium_level decimal,
  organic_matter decimal,
  moisture_content decimal,
  sample_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Weather data table
CREATE TABLE IF NOT EXISTS public.weather_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region text NOT NULL,
  temperature decimal,
  humidity decimal,
  rainfall decimal,
  wind_speed decimal,
  recorded_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Fertilizer recommendations table
CREATE TABLE IF NOT EXISTS public.fertilizer_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  crop_type text NOT NULL,
  soil_type text NOT NULL,
  region text NOT NULL,
  primary_nutrient text NOT NULL,
  secondary_nutrient text,
  application_rate text NOT NULL,
  application_method text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fertilizer_recommendations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own crop predictions"
  ON public.crop_predictions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own crop predictions"
  ON public.crop_predictions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own soil data"
  ON public.soil_data
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own soil data"
  ON public.soil_data
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read weather data"
  ON public.weather_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read own fertilizer recommendations"
  ON public.fertilizer_recommendations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own fertilizer recommendations"
  ON public.fertilizer_recommendations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);