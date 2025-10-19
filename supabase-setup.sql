-- Supabase Database Setup for Flash Overseas Blog
-- Run these commands in your Supabase SQL Editor

-- 1. Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at DATE NOT NULL,
  image_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  slug TEXT UNIQUE NOT NULL,
  featured BOOLEAN DEFAULT false,
  read_time INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create admin_users table
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- 4. Set up Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 5. Create policies for blog_posts
-- Anyone can read blog posts
CREATE POLICY "Anyone can read blog posts" ON blog_posts
  FOR SELECT USING (true);

-- Only approved admin users can insert/update/delete blog posts
CREATE POLICY "Approved admins can manage blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() 
      AND admin_users.is_approved = true
    )
  );

-- 6. Create policies for admin_users
-- Users can read their own admin profile
CREATE POLICY "Users can read own admin profile" ON admin_users
  FOR SELECT USING (auth.uid() = id);

-- Users can insert their own admin profile (only if email is whitelisted)
CREATE POLICY "Users can insert own admin profile" ON admin_users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 7. Create storage policies for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- Only approved admins can manage blog images
CREATE POLICY "Approved admins can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images' AND 
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() 
      AND admin_users.is_approved = true
    )
  );

CREATE POLICY "Approved admins can update blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'blog-images' AND 
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() 
      AND admin_users.is_approved = true
    )
  );

CREATE POLICY "Approved admins can delete blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images' AND 
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() 
      AND admin_users.is_approved = true
    )
  );

-- 8. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 10. Insert sample blog posts (optional)
INSERT INTO blog_posts (title, excerpt, content, author, published_at, image_url, tags, slug, featured, read_time) VALUES
(
  'Complete Guide to Study Abroad in Canada 2024',
  'Everything you need to know about studying in Canada, from application process to post-graduation opportunities.',
  '<h2>Why Choose Canada for Your Studies?</h2><p>Canada has become one of the most popular destinations for international students...</p>',
  'Dr. Sarah Johnson',
  '2024-01-15',
  'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['Canada', 'Study Abroad', 'Guide'],
  'complete-guide-study-abroad-canada-2024',
  true,
  8
),
(
  'IELTS vs TOEFL: Which Test Should You Take?',
  'A comprehensive comparison of IELTS and TOEFL to help you choose the right English proficiency test.',
  '<h2>Understanding IELTS and TOEFL</h2><p>Both IELTS and TOEFL are internationally recognized English proficiency tests...</p>',
  'Michael Chen',
  '2024-01-10',
  'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ARRAY['IELTS', 'TOEFL', 'English Test'],
  'ielts-vs-toefl-which-test-should-you-take',
  false,
  6
);

-- 11. Create indexes for better performance
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

;
