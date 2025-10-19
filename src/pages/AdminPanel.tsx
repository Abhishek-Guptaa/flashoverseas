import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  Save, 
  X,
  Calendar,
  User,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '../components/ui/ToastProvider';
import RichTextEditor from '../components/RichTextEditor';

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  image_url: string;
  tags: string[];
  slug: string;
  featured: boolean;
  read_time: number;
}

const AdminPanel: React.FC = () => {
  const toast = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tags, setTags] = useState<string>('');

  useEffect(() => {
    checkAdminAccess();
    fetchPosts();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/admin';
        return;
      }

      // First try to find admin profile by matching the primary id
      let adminData: any = null;
      let error: any = null;

      try {
        const res = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', user.id)
          .single();
        adminData = (res as any).data;
        error = (res as any).error;
      } catch (e) {
        // ignore, we'll attempt fallback
        console.error('admin_users lookup by id threw:', e);
        adminData = null;
        error = e;
      }

      // If not found by id, try matching by email (handles cases where the table
      // uses a different PK column like user_id or the row was created with email)
      if (!adminData) {
        const userEmail = user.email ?? '';
        if (!userEmail) {
          console.error('Authenticated user has no email to match admin_users');
        } else {
          try {
            const res2 = await supabase
              .from('admin_users')
              .select('*')
              .ilike('email', userEmail)
              .single();
            adminData = (res2 as any).data;
            error = (res2 as any).error;
          } catch (e) {
            console.error('admin_users lookup by email threw:', e);
            adminData = null;
          }
        }
      }

      if (error) {
        console.error('Error checking admin_users:', error);
        // If the error looks like a permission/RLS error, give a helpful message
        toast.push({ type: 'error', message: 'Access denied. Unable to verify admin profile (permission error). Contact the site administrator.' });
        await supabase.auth.signOut();
        window.location.href = '/admin';
        return;
      }

      if (!adminData) {
        // No admin row was found for this user
        toast.push({ type: 'error', message: 'Access denied. No admin profile found for your account. Contact the site administrator.' });
        await supabase.auth.signOut();
        window.location.href = '/admin';
        return;
      }

      if (!adminData.is_approved) {
        toast.push({ type: 'error', message: 'Access denied. Your account is not approved for admin access.' });
        await supabase.auth.signOut();
        window.location.href = '/admin';
        return;
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
      window.location.href = '/admin';
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.push({ type: 'error', message: 'Error uploading image' });
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      if (editingPost) {
        setEditingPost({ ...editingPost, image_url: imageUrl });
      }
    } catch (error) {
      alert('Error uploading image');
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleSave = async () => {
    if (!editingPost) return;

    try {
      const postData = {
        ...editingPost,
        slug: generateSlug(editingPost.title),
        read_time: calculateReadTime(editingPost.content),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        updated_at: new Date().toISOString()
      };

      if (isCreating) {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{ ...postData, created_at: new Date().toISOString() }]);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
      }

      await fetchPosts();
      setEditingPost(null);
      setIsCreating(false);
      setTags('');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.push({ type: 'error', message: 'Error saving post' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.push({ type: 'success', message: 'Post deleted' });
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.push({ type: 'error', message: 'Error deleting post' });
    }
  };

  const startEditing = (post: BlogPost) => {
    setEditingPost({ ...post });
    setTags(post.tags.join(', '));
    setIsCreating(false);
  };

  const startCreating = () => {
    setEditingPost({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      published_at: new Date().toISOString().split('T')[0],
      image_url: '',
      tags: [],
      slug: '',
      featured: false,
      read_time: 0
    });
    setTags('');
    setIsCreating(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Logo Header */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105" aria-label="Flash Overseas home">
              <img 
                src="/Logo.png" 
                alt="Flash Overseas" 
                className="h-12 w-auto"
              />
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/admin';
              }}
              className="text-sm text-slate-600 hover:text-slate-800 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
            <p className="text-slate-600 mt-2">Manage your blog posts and content</p>
          </div>
          <button
            onClick={startCreating}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        {/* Posts List */}
        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
                    {post.featured && (
                      <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.published_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {post.tags.length} tags
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => startEditing(post)}
                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id!)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit/Create Modal */}
        {editingPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {isCreating ? 'Create New Post' : 'Edit Post'}
                  </h2>
                  <button
                    onClick={() => setEditingPost(null)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter post title"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter post excerpt"
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter author name"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Featured Image
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                      {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    </label>
                    {editingPost.image_url && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <ImageIcon className="w-4 h-4" />
                        Image uploaded
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Study Abroad, Canada, Guide"
                  />
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingPost.featured}
                    onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                    className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                    Featured Post
                  </label>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content
                  </label>
                  <RichTextEditor
                    value={editingPost.content}
                    onChange={(content) => setEditingPost({ ...editingPost, content })}
                    placeholder="Start writing your blog post content..."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setEditingPost(null)}
                  className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {isCreating ? 'Create Post' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
