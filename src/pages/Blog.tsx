import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import FadeInSection from '../components/FadeInSection';
import { supabase, BlogPost } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

// BlogPost interface is now imported from supabase.ts

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample blog data (replace with Firebase/Supabase data)
  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'Complete Guide to Study Abroad in Canada 2024',
      excerpt: 'Everything you need to know about studying in Canada, from application process to post-graduation opportunities.',
      content: 'Full blog content here...',
      author: 'Dr. Sarah Johnson',
      published_at: '2024-01-15',
      image_url: 'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tags: ['Canada', 'Study Abroad', 'Guide'],
      slug: 'complete-guide-study-abroad-canada-2024',
      featured: true,
      read_time: 5,
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      title: 'IELTS vs TOEFL: Which Test Should You Take?',
      excerpt: 'A comprehensive comparison of IELTS and TOEFL to help you choose the right English proficiency test.',
      content: 'Full blog content here...',
      author: 'Michael Chen',
      published_at: '2024-01-10',
      image_url: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tags: ['IELTS', 'TOEFL', 'English Test'],
      slug: 'ielts-vs-toefl-which-test-should-you-take',
      featured: false,
      read_time: 4,
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z'
    },
    {
      id: '3',
      title: 'Scholarship Opportunities for International Students',
      excerpt: 'Discover the best scholarship opportunities available for international students in 2024.',
      content: 'Full blog content here...',
      author: 'Priya Sharma',
      published_at: '2024-01-05',
      image_url: 'https://images.pexels.com/photos/1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      tags: ['Scholarships', 'Funding', 'International Students'],
      slug: 'scholarship-opportunities-international-students',
      featured: true,
      read_time: 6,
      created_at: '2024-01-05T00:00:00Z',
      updated_at: '2024-01-05T00:00:00Z'
    },
    {
      id: '4',
      title: 'Visa Application Process: Step-by-Step Guide',
      excerpt: 'Navigate the complex visa application process with our detailed step-by-step guide.',
      content: 'Full blog content here...',
      author: 'David Wilson',
      published_at: '2024-01-01',
      image_url: 'https://images.pexels.com/photos/2397414/pexels-photo-2397414.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tags: ['Visa', 'Application', 'Guide'],
      slug: 'visa-application-process-step-by-step-guide',
      featured: false,
      read_time: 7,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  ];

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      // Fallback to sample data if database is not set up
      setBlogPosts(samplePosts);
    } finally {
      setLoading(false);
    }
  };

  // Removed hero animations since we're not using a hero section

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get all unique tags from posts
  const getAllTags = () => {
    const tagSet = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  return (
    <div className="bg-white">
      <SEO 
        title="Study Abroad Blog - Latest News, Tips & Guides | Flash Overseas"
        description="Stay updated with the latest study abroad news, tips, and comprehensive guides. Expert insights on university applications, visa processes, and student life abroad."
        keywords="study abroad blog, study abroad news, study abroad tips, university application guide, visa guide, student life abroad, study abroad advice, international education blog"
        url="https://flashoverseas.com/blog"
      />
      
      {/* Page Header */}
      <FadeInSection>
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-light text-slate-900 mb-4 tracking-tight">
              Study Abroad <span className="font-semibold">Blog</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Stay updated with the latest study abroad news, expert tips, and comprehensive guides to help you succeed in your international education journey.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Search and Filter Section */}
      <FadeInSection>
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Tag Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === '' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-slate-600 hover:bg-primary-50'
                  }`}
                >
                  All Topics
                </button>
                {getAllTags().map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-white text-slate-600 hover:bg-primary-50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <FadeInSection>
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <FadeInSection key={post.id} delay={index * 0.1}>
                    <Link to={`/blog/${post.slug}`} className="group block">
                      <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Featured
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col min-h-[260px]">
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.published_at)}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-600 mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>
      )}

      {/* Regular Posts */}
      <FadeInSection>
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Latest Articles</h2>
            
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-slate-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-slate-200 rounded mb-3"></div>
                      <div className="h-4 bg-slate-200 rounded mb-3"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <FadeInSection key={post.id} delay={index * 0.1}>
                    <Link to={`/blog/${post.slug}`} className="group block">
                      <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col min-h-[240px]">
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.published_at)}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-600 mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </FadeInSection>
                ))}
              </div>
            )}

            {!loading && filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-slate-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No posts found</h3>
                <p className="text-slate-600">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        </section>
      </FadeInSection>
    </div>
  );
};

export default Blog;
