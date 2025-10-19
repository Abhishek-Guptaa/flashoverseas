import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Tag, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import FadeInSection from '../components/FadeInSection';
import { supabase, BlogPost as BlogPostType } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

// BlogPost interface is now imported from supabase.ts

const BlogPostPage = () => {
  const { slug } = useParams();
  const heroRef = useRef<HTMLDivElement>(null);
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample blog data (replace with Firebase/Supabase data)
  const samplePosts: BlogPostType[] = [
    {
      id: '1',
      title: 'Complete Guide to Study Abroad in Canada 2024',
      excerpt: 'Everything you need to know about studying in Canada, from application process to post-graduation opportunities.',
      content: `
        <h2>Why Choose Canada for Your Studies?</h2>
        <p>Canada has become one of the most popular destinations for international students, and for good reason. With world-class universities, affordable education, and excellent post-graduation opportunities, Canada offers an unparalleled study abroad experience.</p>
        
        <h3>Top Universities in Canada</h3>
        <p>Canada is home to some of the world's most prestigious universities, including:</p>
        <ul>
          <li>University of Toronto</li>
          <li>University of British Columbia</li>
          <li>McGill University</li>
          <li>University of Alberta</li>
          <li>McMaster University</li>
        </ul>
        
        <h3>Application Process</h3>
        <p>The application process for Canadian universities typically involves:</p>
        <ol>
          <li>Research and select universities</li>
          <li>Prepare required documents</li>
          <li>Submit applications</li>
          <li>Apply for study permit</li>
          <li>Plan your arrival</li>
        </ol>
        
        <h3>Cost of Education</h3>
        <p>Compared to other popular study destinations, Canada offers relatively affordable education. Tuition fees typically range from CAD 15,000 to CAD 35,000 per year for undergraduate programs.</p>
        
        <h3>Post-Graduation Opportunities</h3>
        <p>Canada offers excellent post-graduation work opportunities through the Post-Graduation Work Permit (PGWP) program, which allows international students to work in Canada for up to three years after graduation.</p>
      `,
      author: 'Dr. Sarah Johnson',
      published_at: '2024-01-15',
      image_url: 'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tags: ['Canada', 'Study Abroad', 'Guide'],
      slug: 'complete-guide-study-abroad-canada-2024',
      featured: true,
      read_time: 8
    },
    {
      id: '2',
      title: 'IELTS vs TOEFL: Which Test Should You Take?',
      excerpt: 'A comprehensive comparison of IELTS and TOEFL to help you choose the right English proficiency test.',
      content: `
        <h2>Understanding IELTS and TOEFL</h2>
        <p>Both IELTS and TOEFL are internationally recognized English proficiency tests required by universities worldwide. Choosing the right test can significantly impact your application success.</p>
        
        <h3>IELTS (International English Language Testing System)</h3>
        <p>IELTS is jointly managed by the British Council, IDP Education, and Cambridge Assessment English. It's widely accepted in the UK, Australia, Canada, and many other countries.</p>
        
        <h3>TOEFL (Test of English as a Foreign Language)</h3>
        <p>TOEFL is administered by ETS and is primarily used by universities in the United States, though it's accepted worldwide.</p>
        
        <h3>Key Differences</h3>
        <ul>
          <li><strong>Format:</strong> IELTS offers both paper-based and computer-based tests, while TOEFL is primarily computer-based</li>
          <li><strong>Speaking:</strong> IELTS includes a face-to-face speaking test, while TOEFL uses a computer-based speaking section</li>
          <li><strong>Scoring:</strong> IELTS uses a 9-band scale, while TOEFL uses a 0-120 point scale</li>
        </ul>
        
        <h3>Which Test Should You Choose?</h3>
        <p>Consider your target universities and countries when choosing between IELTS and TOEFL. Research the specific requirements of your chosen institutions.</p>
      `,
      author: 'Michael Chen',
      published_at: '2024-01-10',
      image_url: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tags: ['IELTS', 'TOEFL', 'English Test'],
      slug: 'ielts-vs-toefl-which-test-should-you-take',
      featured: false,
      read_time: 6
    }
  ];

  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  const fetchBlogPost = async () => {
    if (!slug) return;
    
    try {
      // Fetch the specific blog post by slug
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      
      if (data) {
        setPost(data);
        
        // Get related posts (same tags)
        const { data: relatedData, error: relatedError } = await supabase
          .from('blog_posts')
          .select('*')
          .neq('id', data.id)
          .overlaps('tags', data.tags)
          .limit(3);

        if (!relatedError && relatedData) {
          setRelatedPosts(relatedData);
        }
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      // Fallback to sample data if database is not set up
      const foundPost = samplePosts.find(p => p.slug === slug);
      setPost(foundPost || null);
      
      if (foundPost) {
        const related = samplePosts
          .filter(p => p.id !== foundPost.id && p.tags.some(tag => foundPost.tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.hero-meta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-slate-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <SEO 
        title={`${post.title} | Flash Overseas Blog`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        url={`https://flashoverseas.com/blog/${post.slug}`}
        pageType="blog-post"
      />
      
      {/* Hero Section */}
      <FadeInSection>
        <section ref={heroRef} className="relative min-h-[60vh] md:min-h-[50vh] lg:min-h-[40vh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </Link>
            </div>
            
            <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-4 tracking-tight">
              {post.title}
            </h1>

            <div className="hero-meta flex flex-wrap items-center justify-center gap-6 text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.read_time} min read</span>
              </div>
              <button
                onClick={sharePost}
                className="flex items-center gap-2 hover:text-primary-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Featured Image */}
      <FadeInSection>
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Article Content */}
      <FadeInSection>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg prose-slate max-w-none overflow-hidden">
              <div 
                className="text-slate-700 leading-relaxed prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-a:text-primary-600 prose-a:hover:text-primary-700 prose-blockquote:border-primary-200 prose-blockquote:text-slate-600 overflow-wrap-anywhere break-words word-break-break-word hyphens-auto"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600 font-medium">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <FadeInSection>
          <section className="py-16 bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <FadeInSection key={relatedPost.id} delay={index * 0.1}>
                    <Link to={`/blog/${relatedPost.slug}`} className="group block">
                      <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48 overflow-hidden">
                            <img
                            src={relatedPost.image_url}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {relatedPost.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(relatedPost.published_at)}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-slate-600 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
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
    </div>
  );
};

export default BlogPostPage;
