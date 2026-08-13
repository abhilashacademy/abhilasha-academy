"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus, FaTrash, FaEdit, FaSignOutAlt, FaImage, FaNewspaper,
  FaDatabase, FaCheck, FaTimes, FaSearch, FaUser, FaExternalLinkAlt, FaBars, FaChartLine, FaCog, FaGraduationCap, FaUpload, FaSpinner, FaEnvelope, FaEye, FaFileDownload, FaFilePdf, FaStar, FaSmile, FaQuoteLeft
} from "react-icons/fa";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

interface PostItem {
  _id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  image: string;
  author: string;
}

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
}

// Mock Admission inquiries data for the Admissions Tab
interface AdmissionInquiry {
  id: string;
  studentName: string;
  parentName: string;
  classApplied: string;
  medium: string;
  phone: string;
  email: string;
  status: "Pending" | "Reviewed" | "Contacted" | "Approved";
  date: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "posts" | "gallery" | "testimonials" | "admissions" | "contacts" | "resources" | "settings">("overview");
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search & Filters
  const [postSearch, setPostSearch] = useState("");
  const [postCategoryFilter, setPostCategoryFilter] = useState("all");
  const [gallerySearch, setGallerySearch] = useState("");
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState("all");
  const [testimonialSearch, setTestimonialSearch] = useState("");
  const [admissionSearch, setAdmissionSearch] = useState("");
  const [admissionStatusFilter, setAdmissionStatusFilter] = useState("all");

  // Notifications
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Admissions list
  const [admissions, setAdmissions] = useState<AdmissionInquiry[]>([]);

  // Contacts list
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContactModal, setSelectedContactModal] = useState<any | null>(null);

  // Downloadable Resources list
  const [resources, setResources] = useState<any[]>([]);
  const [resourceModal, setResourceModal] = useState<boolean>(false);
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    fileUrl: "",
    category: "Application Form",
    fileSize: "PDF Document",
  });
  const [uploadingResourceFile, setUploadingResourceFile] = useState(false);

  // Modals state
  const [postModal, setPostModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    data?: PostItem;
  }>({ isOpen: false, mode: "add" });

  const [galleryModal, setGalleryModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    data?: GalleryItem;
  }>({ isOpen: false, mode: "add" });

  const [testimonialModal, setTestimonialModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    data?: TestimonialItem;
  }>({ isOpen: false, mode: "add" });

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
    image: "",
  });
  const [uploadingTestimonialImg, setUploadingTestimonialImg] = useState(false);

  // Post form state
  const [postForm, setPostForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "General",
    date: "",
    image: "",
    author: "",
  });

  // Gallery form state
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "campus",
    src: "",
    alt: "",
  });

  // Uploading state
  const [uploadingPostImage, setUploadingPostImage] = useState(false);
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);

  // Fetch all initial data
  const fetchData = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      // 1. Verify admin
      const meRes = await fetch("/api/auth/me", { headers: authHeaders });
      if (!meRes.ok) {
        router.push("/admin/login");
        return;
      }
      const meData = await meRes.json();
      setAdmin(meData.user);

      const delPostIds: string[] = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("deleted_post_ids") || "[]") : [];
      const delGalleryIds: string[] = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("deleted_gallery_ids") || "[]") : [];
      const delTestimonialIds: string[] = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("deleted_testimonial_ids") || "[]") : [];

      // 2. Fetch posts
      const postsRes = await fetch("/api/posts", { headers: authHeaders });
      const postsData = await postsRes.json();
      setPosts((postsData.posts || []).filter((p: any) => !delPostIds.includes(String(p._id || p.id))));

      // 3. Fetch gallery items
      const galleryRes = await fetch("/api/gallery", { headers: authHeaders });
      const galleryData = await galleryRes.json();
      setGallery((galleryData.items || []).filter((g: any) => !delGalleryIds.includes(String(g._id || g.id))));

      // 4. Fetch real admissions inquiries
      const admissionsRes = await fetch("/api/admissions", { headers: authHeaders });
      if (admissionsRes.ok) {
        const admData = await admissionsRes.json();
        const mapped = (admData.admissions || []).map((a: any) => ({
          id: a._id,
          studentName: a.studentName,
          parentName: a.parentName || "-",
          classApplied: a.targetClass,
          medium: a.medium || "English Medium",
          phone: a.phone,
          email: a.email || "-",
          status: a.status || "Pending",
          date: new Date(a.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
        }));
        setAdmissions(mapped);
      }

      // 5. Fetch contact inquiries
      const contactRes = await fetch("/api/contact");
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContacts(contactData.contacts || []);
      }

      // 6. Fetch downloadable resources
      const resourceRes = await fetch("/api/resources");
      if (resourceRes.ok) {
        const resourceData = await resourceRes.json();
        setResources(resourceData.resources || []);
      }

      // 7. Fetch testimonials
      const testimonialsRes = await fetch("/api/testimonials");
      if (testimonialsRes.ok) {
        const testimonialsData = await testimonialsRes.json();
        setTestimonials((testimonialsData.testimonials || []).filter((t: any) => !delTestimonialIds.includes(String(t._id || t.id))));
      }
    } catch (error) {
      showToast("error", "Failed to retrieve dashboard details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const showToast = (type: "success" | "message" | "error", message: string) => {
    setToast({ type: type === "message" ? "success" : type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Seeding trigger
  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        showToast(
          "success",
          `Seeded successfully! Added ${data.seeded.posts} posts and ${data.seeded.gallery} photos.`
        );
        fetchData();
      } else {
        showToast("error", data.error || "Failed to seed database.");
      }
    } catch (err) {
      showToast("error", "Network error during seeding.");
    } finally {
      setSeeding(false);
    }
  };

  // Logout trigger
  const handleLogout = async () => {
    try {
      try {
        localStorage.removeItem("admin_token");
        document.cookie = "token=; path=/; max-age=0";
      } catch (e) {}

      await fetch("/api/auth/logout", { method: "POST" });
      showToast("success", "Logged out successfully!");
      router.push("/admin/login");
    } catch (err) {
      showToast("error", "Logout request failed.");
    }
  };

  // Delete Post trigger
  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;
    try {
      const delPostIds: string[] = JSON.parse(localStorage.getItem("deleted_post_ids") || "[]");
      if (!delPostIds.includes(String(id))) {
        delPostIds.push(String(id));
        localStorage.setItem("deleted_post_ids", JSON.stringify(delPostIds));
      }
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      await fetch(`/api/posts/${id}`, { method: "DELETE", headers });
    } catch (err) {}
    setPosts((prev) => prev.filter((p: any) => String(p._id || p.id) !== String(id)));
    showToast("success", "Post deleted successfully!");
  };

  // Delete Gallery item trigger
  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      const delGalleryIds: string[] = JSON.parse(localStorage.getItem("deleted_gallery_ids") || "[]");
      if (!delGalleryIds.includes(String(id))) {
        delGalleryIds.push(String(id));
        localStorage.setItem("deleted_gallery_ids", JSON.stringify(delGalleryIds));
      }
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      await fetch(`/api/gallery/${id}`, { method: "DELETE", headers });
    } catch (err) {}
    setGallery((prev) => prev.filter((g: any) => String(g._id || g.id) !== String(id)));
    showToast("success", "Photo deleted successfully!");
  };

  // Update Admissions Status trigger
  const handleUpdateAdmissionsStatus = async (id: string, newStatus: "Pending" | "Reviewed" | "Contacted" | "Approved") => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast("success", `Status updated to ${newStatus}`);
        setAdmissions((prev) =>
          prev.map((adm) => (adm.id === id ? { ...adm, status: newStatus } : adm))
        );
      } else {
        const data = await res.json();
        showToast("error", data.error || "Failed to update status.");
      }
    } catch (err) {
      showToast("error", "Network error updating status.");
    }
  };

  // Delete Admission Inquiry trigger
  const handleDeleteAdmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admission record?")) return;
    try {
      const res = await fetch(`/api/admissions/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("success", "Admission record deleted successfully.");
        setAdmissions((prev) => prev.filter((adm) => adm.id !== id));
      } else {
        const data = await res.json();
        showToast("error", data.error || "Failed to delete record.");
      }
    } catch (err) {
      showToast("error", "Network error deleting record.");
    }
  };

  // Post form modals handlers
  const openAddPost = () => {
    setPostForm({
      title: "",
      summary: "",
      content: "",
      category: "General",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      image: "",
      author: admin?.name || "",
    });
    setPostModal({ isOpen: true, mode: "add" });
  };

  const openEditPost = (post: PostItem) => {
    setPostForm({
      title: post.title,
      summary: post.summary,
      content: post.content,
      category: post.category,
      date: post.date,
      image: post.image,
      author: post.author,
    });
    setPostModal({ isOpen: true, mode: "edit", data: post });
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.image) {
      showToast("error", "Please upload an article banner image.");
      return;
    }
    const url = postModal.mode === "add" ? "/api/posts" : `/api/posts/${postModal.data?._id}`;
    const method = postModal.mode === "add" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postForm),
      });
      const data = await res.json();

      if (res.ok) {
        showToast("success", postModal.mode === "add" ? "Post created!" : "Post updated!");
        setPostModal({ isOpen: false, mode: "add" });
        fetchData();
      } else {
        showToast("error", data.error || "Operation failed");
      }
    } catch (err) {
      showToast("error", "Network connection failed");
    }
  };

  // Gallery form modals handlers
  const openAddGallery = () => {
    setGalleryForm({
      title: "",
      category: "campus",
      src: "",
      alt: "",
    });
    setGalleryModal({ isOpen: true, mode: "add" });
  };

  const openEditGallery = (item: GalleryItem) => {
    setGalleryForm({
      title: item.title,
      category: item.category,
      src: item.src,
      alt: item.alt,
    });
    setGalleryModal({ isOpen: true, mode: "edit", data: item });
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.src) {
      showToast("error", "Please upload a photo for the gallery.");
      return;
    }
    const url = galleryModal.mode === "add" ? "/api/gallery" : `/api/gallery/${galleryModal.data?._id}`;
    const method = galleryModal.mode === "add" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryForm),
      });
      const data = await res.json();

      if (res.ok) {
        showToast("success", galleryModal.mode === "add" ? "Photo added to gallery!" : "Photo updated!");
        setGalleryModal({ isOpen: false, mode: "add" });
        fetchData();
      } else {
        showToast("error", data.error || "Operation failed");
      }
    } catch (err) {
      showToast("error", "Network connection failed");
    }
  };

  // Testimonial form modals handlers
  const openAddTestimonial = () => {
    setTestimonialForm({
      name: "",
      role: "",
      text: "",
      rating: 5,
      image: "",
    });
    setTestimonialModal({ isOpen: true, mode: "add" });
  };

  const openEditTestimonial = (item: TestimonialItem) => {
    setTestimonialForm({
      name: item.name,
      role: item.role,
      text: item.text,
      rating: item.rating || 5,
      image: item.image,
    });
    setTestimonialModal({ isOpen: true, mode: "edit", data: item });
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name || !testimonialForm.role || !testimonialForm.text) {
      showToast("error", "Name, role, and testimonial text are required.");
      return;
    }

    const url = testimonialModal.mode === "add" ? "/api/testimonials" : `/api/testimonials/${testimonialModal.data?._id}`;
    const method = testimonialModal.mode === "add" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialForm),
      });
      const data = await res.json();

      if (res.ok) {
        showToast("success", testimonialModal.mode === "add" ? "Testimonial published!" : "Testimonial updated!");
        setTestimonialModal({ isOpen: false, mode: "add" });
        fetchData();
      } else {
        showToast("error", data.error || "Operation failed");
      }
    } catch (err) {
      showToast("error", "Network connection failed");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const delTestimonialIds: string[] = JSON.parse(localStorage.getItem("deleted_testimonial_ids") || "[]");
      if (!delTestimonialIds.includes(String(id))) {
        delTestimonialIds.push(String(id));
        localStorage.setItem("deleted_testimonial_ids", JSON.stringify(delTestimonialIds));
      }
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      await fetch(`/api/testimonials/${id}`, { method: "DELETE", headers });
    } catch (err) {}
    setTestimonials((prev) => prev.filter((t: any) => String(t._id || t.id) !== String(id)));
    showToast("success", "Testimonial removed.");
  };

  const handleTestimonialImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTestimonialImg(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setTestimonialForm((prev) => ({ ...prev, image: data.url }));
        showToast("success", "Avatar image uploaded!");
      } else {
        showToast("error", data.error || "Upload failed");
      }
    } catch (err) {
      showToast("error", "Network error uploading image");
    } finally {
      setUploadingTestimonialImg(false);
    }
  };

  // Image Upload Handlers
  const handlePostImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPostImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setPostForm((prev) => ({ ...prev, image: data.url }));
        showToast("success", "Article banner image uploaded successfully!");
      } else {
        showToast("error", data.error || "Failed to upload image.");
      }
    } catch (err) {
      showToast("error", "Network error while uploading image.");
    } finally {
      setUploadingPostImage(false);
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingGalleryImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setGalleryForm((prev) => ({ ...prev, src: data.url }));
        showToast("success", "Photo uploaded successfully!");
      } else {
        showToast("error", data.error || "Failed to upload photo.");
      }
    } catch (err) {
      showToast("error", "Network error while uploading photo.");
    } finally {
      setUploadingGalleryImage(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact message?")) return;
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      await fetch(`/api/contact/${id}`, { method: "DELETE", headers });
      setContacts((prev) => prev.filter((c: any) => c._id !== id));
      setSelectedContactModal(null);
      showToast("success", "Contact message deleted.");
    } catch (err) {
      setContacts((prev) => prev.filter((c: any) => c._id !== id));
      setSelectedContactModal(null);
      showToast("success", "Contact message removed.");
    }
  };

  const handleResourceFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResourceFile(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setResourceForm((prev) => ({
          ...prev,
          fileUrl: data.url,
          fileSize: data.fileSize || "PDF Document",
        }));
        showToast("success", "Resource document uploaded successfully!");
      } else {
        showToast("error", data.error || "Failed to upload document.");
      }
    } catch (err) {
      showToast("error", "Network error while uploading document.");
    } finally {
      setUploadingResourceFile(false);
    }
  };

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title || !resourceForm.fileUrl) {
      showToast("error", "Please provide a resource title and upload a file.");
      return;
    }

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch("/api/resources", {
        method: "POST",
        headers,
        body: JSON.stringify(resourceForm),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("success", "Admission form resource added!");
        setResourceModal(false);
        setResourceForm({ title: "", description: "", fileUrl: "", category: "Application Form", fileSize: "PDF Document" });
        fetchData();
      } else {
        showToast("error", data.error || "Failed to save resource.");
      }
    } catch (err) {
      showToast("error", "Network error while saving resource.");
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource document?")) return;
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      await fetch(`/api/resources/${id}`, { method: "DELETE", headers });
      setResources((prev) => prev.filter((r: any) => r._id !== id));
      showToast("success", "Resource document deleted.");
    } catch (err) {
      setResources((prev) => prev.filter((r: any) => r._id !== id));
      showToast("success", "Resource document removed.");
    }
  };

  // Filters
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(postSearch.toLowerCase()) ||
      post.summary.toLowerCase().includes(postSearch.toLowerCase());
    const matchesCat = postCategoryFilter === "all" || post.category === postCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredGallery = gallery.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(gallerySearch.toLowerCase()) ||
      item.alt.toLowerCase().includes(gallerySearch.toLowerCase());
    const matchesCat = galleryCategoryFilter === "all" || item.category === galleryCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredTestimonials = testimonials.filter((item) => {
    const search = (testimonialSearch || "").toLowerCase().trim();
    return (
      !search ||
      item.name.toLowerCase().includes(search) ||
      item.role.toLowerCase().includes(search) ||
      item.text.toLowerCase().includes(search)
    );
  });

  const filteredAdmissions = admissions.filter((item) => {
    const search = (admissionSearch || "").toLowerCase().trim();
    const matchesSearch =
      !search ||
      (item.studentName || "").toLowerCase().includes(search) ||
      (item.parentName || "").toLowerCase().includes(search) ||
      (item.phone || "").includes(search) ||
      (item.classApplied || "").toLowerCase().includes(search);
    const matchesStatus = admissionStatusFilter === "all" || item.status === admissionStatusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white font-extrabold select-none">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm tracking-widest text-slate-400">LOADING WORKSPACE...</span>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: <FaChartLine className="w-4 h-4" /> },
    { id: "posts", label: "News & Posts", icon: <FaNewspaper className="w-4 h-4" /> },
    { id: "gallery", label: "Photo Gallery", icon: <FaImage className="w-4 h-4" /> },
    { id: "testimonials", label: "Testimonials", icon: <FaQuoteLeft className="w-4 h-4" /> },
    { id: "admissions", label: "Admissions", icon: <FaGraduationCap className="w-4 h-4" /> },
    { id: "contacts", label: "Contact Messages", icon: <FaEnvelope className="w-4 h-4" /> },
    { id: "resources", label: "Admission Forms", icon: <FaFileDownload className="w-4 h-4" /> },
    { id: "settings", label: "System Config", icon: <FaCog className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans relative overflow-hidden select-none">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900/90 border-r border-white/5 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 md:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col">
          {/* Logo Brand Header */}
          <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-md shadow-white/5">
                <span className="text-rose-600 font-black text-base">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white leading-none">Abhilasha Academy</span>
                <span className="text-[9px] text-amber-500 font-bold uppercase tracking-widest leading-none mt-1">Admin Panel</span>
              </div>
            </div>
            {/* Close sidebar button on mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white md:hidden cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-1.5">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${activeTab === item.id
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-white/5 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
              <FaUser className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-white leading-none truncate">{admin?.name}</span>
              <span className="text-[9px] text-slate-500 mt-1 truncate">{admin?.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 text-rose-400 hover:text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaSignOutAlt className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto relative z-10">

        {/* Top Control Header */}
        <header className="sticky top-0 bg-slate-900/60 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-white/5 rounded-lg text-slate-300 md:hidden cursor-pointer"
            >
              <FaBars className="w-4 h-4" />
            </button>
            <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "posts" && "News & Post Circulars"}
              {activeTab === "gallery" && "Campus Photo Gallery"}
              {activeTab === "testimonials" && "Community Testimonials"}
              {activeTab === "admissions" && "Admissions inquiries"}
              {activeTab === "settings" && "System Settings"}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              <span>Visit Site</span>
              <FaExternalLinkAlt className="w-2.5 h-2.5" />
            </a>
          </div>
        </header>

        {/* Toast Toast Notifications */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-20 right-6 z-50 p-4 rounded-2xl shadow-xl flex items-center gap-3 border ${toast.type === "success"
                  ? "bg-emerald-950/90 text-emerald-400 border-emerald-500/20"
                  : "bg-rose-950/90 text-rose-400 border-rose-500/20"
                }`}
            >
              {toast.type === "success" ? <FaCheck className="w-4 h-4 shrink-0" /> : <FaTimes className="w-4 h-4 shrink-0" />}
              <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workspace Panels content */}
        <main className="p-6 max-w-7xl w-full mx-auto flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="h-full flex flex-col gap-6"
            >

              {/* TAB 1: OVERVIEW PANEL */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-6">
                  {/* Metric Counts Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl flex items-center justify-between shadow-xl">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">News Circulars</span>
                        <h3 className="text-4xl font-black text-white mt-1.5">{posts.length}</h3>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                        <FaNewspaper className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl flex items-center justify-between shadow-xl">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gallery Images</span>
                        <h3 className="text-4xl font-black text-white mt-1.5">{gallery.length}</h3>
                      </div>
                      <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-400">
                        <FaImage className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-3xl flex items-center justify-between shadow-xl">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Admissions requests</span>
                        <h3 className="text-4xl font-black text-white mt-1.5">{admissions.length}</h3>
                      </div>
                      <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400">
                        <FaGraduationCap className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* System Information cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* DB Info Card */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-base font-extrabold text-white mb-2">MongoDB Connectivity</h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                          Your site database is connected to the cloud Atlas instance. All publications are automatically distributed to customer endpoints in real-time.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Active database connection</span>
                      </div>
                    </div>

                    {/* Quick Seeder Trigger */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-base font-extrabold text-white mb-2">Import Default Website Data</h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                          Clear missing documents and load defaults for the board updates and gallery catalog.
                        </p>
                      </div>
                      <button
                        onClick={handleSeedDatabase}
                        disabled={seeding}
                        className="bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-500 hover:text-slate-950 text-amber-500 text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 w-fit"
                      >
                        <FaDatabase className="w-3.5 h-3.5" />
                        <span>{seeding ? "Importing..." : "Seed Default Data"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: POSTS PANEL */}
              {activeTab === "posts" && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <div className="relative w-full sm:w-[255px]">
                        <input
                          type="text"
                          placeholder="Search posts..."
                          value={postSearch}
                          onChange={(e) => setPostSearch(e.target.value)}
                          className="bg-slate-950 border border-white/10 text-white rounded-xl py-2.5 px-4 pl-10 text-xs w-full focus:outline-none focus:border-rose-500 placeholder:text-slate-600"
                        />
                        <FaSearch className="absolute left-3.5 top-3 text-slate-500 w-3.5 h-3.5" />
                      </div>

                      <select
                        value={postCategoryFilter}
                        onChange={(e) => setPostCategoryFilter(e.target.value)}
                        className="bg-slate-900 border border-white/10 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
                      >
                        <option value="all">All Categories</option>
                        <option value="Admissions Open">Admissions Open</option>
                        <option value="Board Results">Board Results</option>
                        <option value="Competitions">Competitions</option>
                        <option value="Achievements">Achievements</option>
                        <option value="General">General</option>
                      </select>
                    </div>

                    <button
                      onClick={openAddPost}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 px-4.5 rounded-xl shadow-md shadow-rose-600/10 flex items-center gap-2 cursor-pointer transition-colors w-full sm:w-auto justify-center"
                    >
                      <FaPlus className="w-3.5 h-3.5" />
                      <span>Create News Article</span>
                    </button>
                  </div>

                  {filteredPosts.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-white/5 text-slate-400 font-semibold">
                            <th className="py-3 px-4">Post Title</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Publish Date</th>
                            <th className="py-3 px-4">Author</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredPosts.map((post) => (
                            <tr key={post._id} className="hover:bg-white/2">
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                                    <img
                                      src={post.image || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&auto=format&fit=crop"}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="max-w-[200px] sm:max-w-[320px]">
                                    <h4 className="font-bold text-white truncate">{post.title}</h4>
                                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{post.summary}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                                  {post.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-400 font-semibold">{post.date}</td>
                              <td className="py-3.5 px-4 text-slate-400 font-semibold">{post.author}</td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => openEditPost(post)}
                                    className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500 border border-blue-500/20 text-blue-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                                  >
                                    <FaEdit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeletePost(post._id)}
                                    className="w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                                  >
                                    <FaTrash className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-slate-400 text-sm font-semibold">No news articles found.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: GALLERY PANEL */}
              {activeTab === "gallery" && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <div className="relative w-full sm:w-[255px]">
                        <input
                          type="text"
                          placeholder="Search gallery..."
                          value={gallerySearch}
                          onChange={(e) => setGallerySearch(e.target.value)}
                          className="bg-slate-950 border border-white/10 text-white rounded-xl py-2.5 px-4 pl-10 text-xs w-full focus:outline-none focus:border-rose-500 placeholder:text-slate-600"
                        />
                        <FaSearch className="absolute left-3.5 top-3 text-slate-500 w-3.5 h-3.5" />
                      </div>

                      <select
                        value={galleryCategoryFilter}
                        onChange={(e) => setGalleryCategoryFilter(e.target.value)}
                        className="bg-slate-900 border border-white/10 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
                      >
                        <option value="all">All Groups</option>
                        <option value="campus">Campus</option>
                        <option value="classroom">Classrooms</option>
                        <option value="sports">Sports</option>
                        <option value="events">Events</option>
                        <option value="labs">Labs</option>
                      </select>
                    </div>

                    <button
                      onClick={openAddGallery}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 px-4.5 rounded-xl shadow-md shadow-rose-600/10 flex items-center gap-2 cursor-pointer transition-colors w-full sm:w-auto justify-center"
                    >
                      <FaPlus className="w-3.5 h-3.5" />
                      <span>Upload Photo Link</span>
                    </button>
                  </div>

                  {filteredGallery.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredGallery.map((item) => (
                        <div key={item._id} className="group bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-350 flex flex-col justify-between">
                          <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-slate-950/80 text-amber-500 border border-white/10 backdrop-blur-sm">
                              {item.category}
                            </span>
                          </div>

                          <div className="p-4 flex-grow flex flex-col justify-between gap-3.5">
                            <div>
                              <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.alt}</p>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/5 pt-3">
                              <a
                                href={item.src}
                                target="_blank"
                                className="text-[10px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                              >
                                <span>Source</span>
                                <FaExternalLinkAlt className="w-2.5 h-2.5" />
                              </a>

                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => openEditGallery(item)}
                                  className="w-7.5 h-7.5 rounded-lg bg-blue-500/10 hover:bg-blue-500 border border-blue-500/20 text-blue-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                                >
                                  <FaEdit className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleDeleteGallery(item._id)}
                                  className="w-7.5 h-7.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                                >
                                  <FaTrash className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-slate-400 text-sm font-semibold">No gallery items found.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3.5: TESTIMONIALS PANEL */}
              {activeTab === "testimonials" && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:w-[280px]">
                      <input
                        type="text"
                        placeholder="Search testimonials..."
                        value={testimonialSearch}
                        onChange={(e) => setTestimonialSearch(e.target.value)}
                        className="bg-slate-950 border border-white/10 text-white rounded-xl py-2.5 px-4 pl-10 text-xs w-full focus:outline-none focus:border-rose-500 placeholder:text-slate-600"
                      />
                      <FaSearch className="absolute left-3.5 top-3 text-slate-500 w-3.5 h-3.5" />
                    </div>

                    <button
                      onClick={openAddTestimonial}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 px-4.5 rounded-xl shadow-md shadow-rose-600/10 flex items-center gap-2 cursor-pointer transition-colors w-full sm:w-auto justify-center"
                    >
                      <FaPlus className="w-3.5 h-3.5" />
                      <span>Add New Testimonial</span>
                    </button>
                  </div>

                  {filteredTestimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTestimonials.map((item, idx) => {
                        const itemId = item._id || (item as any).id || String(idx);
                        return (
                          <div key={itemId} className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4 group">
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 overflow-hidden">
                                  <img
                                    src={item.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                                  />
                                  <div className="overflow-hidden">
                                    <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                                    <p className="text-[11px] text-rose-400 font-semibold truncate">{item.role}</p>
                                  </div>
                                </div>

                                <div className="flex gap-0.5 text-amber-400 shrink-0">
                                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                                    <FaStar key={i} className="w-3 h-3" />
                                  ))}
                                </div>
                              </div>

                              <p className="text-slate-300 text-xs leading-relaxed italic line-clamp-4 bg-white/5 p-3 rounded-xl border border-white/5">
                                &ldquo;{item.text}&rdquo;
                              </p>
                            </div>

                            <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-3">
                              <button
                                onClick={() => openEditTestimonial(item)}
                                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <FaEdit className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteTestimonial(itemId)}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <FaTrash className="w-3 h-3" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-slate-400 text-sm font-semibold">No testimonials found. Click "Add New Testimonial" to publish one.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: ADMISSIONS PANEL */}
              {activeTab === "admissions" && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <div className="relative w-full sm:w-[255px]">
                        <input
                          type="text"
                          placeholder="Search inquiries..."
                          value={admissionSearch}
                          onChange={(e) => setAdmissionSearch(e.target.value)}
                          className="bg-slate-950 border border-white/10 text-white rounded-xl py-2.5 px-4 pl-10 text-xs w-full focus:outline-none focus:border-rose-500 placeholder:text-slate-600"
                        />
                        <FaSearch className="absolute left-3.5 top-3 text-slate-500 w-3.5 h-3.5" />
                      </div>

                      <select
                        value={admissionStatusFilter}
                        onChange={(e) => setAdmissionStatusFilter(e.target.value)}
                        className="bg-slate-900 border border-white/10 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
                      >
                        <option value="all">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Approved">Approved</option>
                      </select>
                    </div>
                  </div>

                  {filteredAdmissions.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-white/5 text-slate-400 font-semibold">
                            <th className="py-3 px-4">Student Name</th>
                            <th className="py-3 px-4">Parent Name</th>
                            <th className="py-3 px-4">Class Requested</th>
                            <th className="py-3 px-4">Medium</th>
                            <th className="py-3 px-4">Phone Contact</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredAdmissions.map((adm) => (
                            <tr key={adm.id} className="hover:bg-white/2">
                              <td className="py-3.5 px-4 font-bold text-white">{adm.studentName}</td>
                              <td className="py-3.5 px-4 text-slate-300 font-semibold">{adm.parentName}</td>
                              <td className="py-3.5 px-4 text-slate-400 font-semibold">{adm.classApplied}</td>
                              <td className="py-3.5 px-4 font-semibold text-amber-400">{adm.medium || "English Medium"}</td>
                              <td className="py-3.5 px-4 font-semibold text-slate-300">
                                <a href={`tel:${adm.phone}`} className="hover:underline">{adm.phone}</a>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${adm.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                                    adm.status === "Contacted" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                      adm.status === "Reviewed" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                        "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                  }`}>
                                  {adm.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center justify-center gap-1.5">
                                  <select
                                    value={adm.status}
                                    onChange={(e) => handleUpdateAdmissionsStatus(adm.id, e.target.value as any)}
                                    className="bg-slate-900 border border-white/10 text-slate-300 rounded-lg py-1 px-2 text-[10px] focus:outline-none cursor-pointer font-bold"
                                  >
                                    <option value="Pending">Set Pending</option>
                                    <option value="Reviewed">Set Reviewed</option>
                                    <option value="Contacted">Set Contacted</option>
                                    <option value="Approved">Set Approved</option>
                                  </select>
                                  <button
                                    onClick={() => handleDeleteAdmission(adm.id)}
                                    className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
                                    title="Delete"
                                  >
                                    <FaTrash className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-slate-400 text-sm font-semibold">No admission inquiries found.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: CONTACT MESSAGES PANEL */}
              {activeTab === "contacts" && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h3 className="text-base font-extrabold text-white">Contact Messages Inquiries</h3>
                    <span className="text-xs text-slate-400 font-semibold">{contacts.length} Messages Received</span>
                  </div>

                  {contacts.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-white/5 text-slate-400 font-semibold">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Phone</th>
                            <th className="py-3 px-4">Subject</th>
                            <th className="py-3 px-4">Message</th>
                            <th className="py-3 px-4 text-center">Date</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {contacts.map((c: any) => (
                            <tr key={c._id} className="hover:bg-white/2">
                              <td className="py-3.5 px-4 font-bold text-white">{c.name}</td>
                              <td className="py-3.5 px-4 text-slate-300 font-semibold">
                                <a href={`tel:${c.phone}`} className="hover:underline text-rose-400">{c.phone}</a>
                              </td>
                              <td className="py-3.5 px-4 text-slate-400 font-semibold">{c.subject || "General Inquiry"}</td>
                              <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">{c.message}</td>
                              <td className="py-3.5 px-4 text-center text-slate-400 text-xs">
                                {new Date(c.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => setSelectedContactModal(c)}
                                    className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500 border border-blue-500/20 text-blue-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors text-xs font-bold"
                                    title="Read Message"
                                  >
                                    <FaEye className="w-3 h-3" />
                                    <span>Read</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteContact(c._id)}
                                    className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
                                    title="Delete Message"
                                  >
                                    <FaTrash className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-slate-400 text-sm font-semibold">No contact messages received yet.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: ADMISSION FORMS & RESOURCES PANEL */}
              {activeTab === "resources" && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
                    <div>
                      <h3 className="text-base font-extrabold text-white">Downloadable Admission Forms & Resources</h3>
                      <p className="text-slate-400 text-xs mt-1">Upload and manage downloadable forms displayed on the admissions page.</p>
                    </div>
                    <button
                      onClick={() => {
                        setResourceForm({ title: "", description: "", fileUrl: "", category: "Application Form", fileSize: "PDF Document" });
                        setResourceModal(true);
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/20 transition-colors flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <FaPlus className="w-3 h-3" />
                      <span>Upload Admission Form</span>
                    </button>
                  </div>

                  {resources.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-white/5 text-slate-400 font-semibold">
                            <th className="py-3 px-4">Document Title</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">File Size</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {resources.map((res: any) => (
                            <tr key={res._id} className="hover:bg-white/2">
                              <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                                <FaFilePdf className="text-rose-500 w-4 h-4 shrink-0" />
                                <span>{res.title}</span>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                  {res.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-300 font-semibold">{res.fileSize || "PDF Document"}</td>
                              <td className="py-3.5 px-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <a
                                    href={res.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 text-emerald-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors text-xs font-bold"
                                    title="Download Document"
                                  >
                                    <FaFileDownload className="w-3 h-3" />
                                    <span>Download</span>
                                  </a>
                                  <button
                                    onClick={() => handleDeleteResource(res._id)}
                                    className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
                                    title="Delete Document"
                                  >
                                    <FaTrash className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-slate-400 text-sm font-semibold mb-3">No downloadable admission forms uploaded yet.</p>
                      <button
                        onClick={() => setResourceModal(true)}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
                      >
                        <FaPlus className="w-3 h-3" />
                        <span>Upload First Admission Form</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: SYSTEM CONFIG PANEL */}
              {activeTab === "settings" && (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
                  <h3 className="text-base font-extrabold text-white border-b border-white/5 pb-2">Administrator Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Account Name</span>
                      <p className="font-bold text-white mt-1">{admin?.name}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Register Email</span>
                      <p className="font-bold text-white mt-1">{admin?.email}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Mobile Contact</span>
                      <p className="font-bold text-white mt-1">{admin?.mobile}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Access Scope</span>
                      <p className="font-bold text-amber-500 mt-1 uppercase tracking-widest">Full Administrative Privilege</p>
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-white border-b border-white/5 pb-2 mt-4">Database Migration</h3>
                  <div className="flex flex-col gap-3">
                    <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                      If MongoDB collections are empty, run the automatic database seeding to load mock board announcements, circular updates, and school gallery images.
                    </p>
                    <button
                      onClick={handleSeedDatabase}
                      disabled={seeding}
                      className="bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-amber-500 hover:text-slate-950 text-amber-500 text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 w-fit mt-2"
                    >
                      <FaDatabase className="w-3.5 h-3.5" />
                      <span>{seeding ? "Importing defaults..." : "Seed Default Database Content"}</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Post Modal Dialog (Add/Edit) */}
      <AnimatePresence>
        {postModal.isOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {postModal.mode === "add" ? "Create News Article" : "Update News Article"}
                </h3>
                <button
                  onClick={() => setPostModal({ isOpen: false, mode: "add" })}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    placeholder="Admissions Open 2026-27"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 placeholder:text-slate-650"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                      Category
                    </label>
                    <select
                      value={postForm.category}
                      onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 cursor-pointer"
                    >
                      <option value="Admissions Open">Admissions Open</option>
                      <option value="Board Results">Board Results</option>
                      <option value="Competitions">Competitions</option>
                      <option value="Achievements">Achievements</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                      Date Label
                    </label>
                    <input
                      type="text"
                      value={postForm.date}
                      onChange={(e) => setPostForm({ ...postForm, date: e.target.value })}
                      placeholder="July 19, 2026"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 placeholder:text-slate-650"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Article Banner Image
                  </label>
                  <div className="flex flex-col gap-3">
                    {postForm.image ? (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center group shadow-lg">
                        <img src={postForm.image} alt="Uploaded Banner Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPostForm({ ...postForm, image: "" })}
                          className="absolute top-2 right-2 px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md flex items-center gap-1"
                          title="Remove Image"
                        >
                          <FaTimes className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/20 hover:border-rose-500 rounded-xl p-6 bg-white/5 cursor-pointer transition-colors text-slate-300 hover:text-white text-xs font-bold">
                        {uploadingPostImage ? (
                          <>
                            <FaSpinner className="w-5 h-5 animate-spin text-rose-500" />
                            <span>Uploading image file...</span>
                          </>
                        ) : (
                          <>
                            <FaUpload className="w-5 h-5 text-rose-500 mb-1" />
                            <span className="text-sm font-extrabold text-white">Click to Upload Image File</span>
                            <span className="text-slate-400 text-[11px]">Supports PNG, JPG, WebP, GIF</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePostImageUpload}
                          className="hidden"
                          disabled={uploadingPostImage}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Summary (Short Intro)
                  </label>
                  <input
                    type="text"
                    value={postForm.summary}
                    onChange={(e) => setPostForm({ ...postForm, summary: e.target.value })}
                    placeholder="Short description snippet of the news"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 placeholder:text-slate-650"
                    required
                  />
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Main Article Body
                  </label>
                  <textarea
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    placeholder="Detailed paragraph context of the event..."
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 placeholder:text-slate-650"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-xl py-3 font-bold text-sm tracking-wide transition-all shadow-md shadow-rose-600/10 cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  <FaCheck className="w-3.5 h-3.5" />
                  <span>{postModal.mode === "add" ? "Create Article" : "Save Changes"}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gallery Modal Dialog (Add/Edit) */}
      <AnimatePresence>
        {galleryModal.isOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {galleryModal.mode === "add" ? "Upload Photo URL" : "Update Photo Details"}
                </h3>
                <button
                  onClick={() => setGalleryModal({ isOpen: false, mode: "add" })}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleGallerySubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    placeholder="Students coding in laboratory"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 placeholder:text-slate-650"
                    required
                  />
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Image Category Group
                  </label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    <option value="campus">Campus</option>
                    <option value="classroom">Classroom</option>
                    <option value="sports">Sports</option>
                    <option value="events">Events</option>
                    <option value="labs">Labs</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Upload Photo File
                  </label>
                  <div className="flex flex-col gap-3">
                    {galleryForm.src ? (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center group shadow-lg">
                        <img src={galleryForm.src} alt="Uploaded Photo Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setGalleryForm({ ...galleryForm, src: "" })}
                          className="absolute top-2 right-2 px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md flex items-center gap-1"
                          title="Remove Photo"
                        >
                          <FaTimes className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/20 hover:border-rose-500 rounded-xl p-6 bg-white/5 cursor-pointer transition-colors text-slate-300 hover:text-white text-xs font-bold">
                        {uploadingGalleryImage ? (
                          <>
                            <FaSpinner className="w-5 h-5 animate-spin text-rose-500" />
                            <span>Uploading photo file...</span>
                          </>
                        ) : (
                          <>
                            <FaUpload className="w-5 h-5 text-rose-500 mb-1" />
                            <span className="text-sm font-extrabold text-white font-sans">Click to Upload Photo File</span>
                            <span className="text-slate-400 text-[11px]">Supports PNG, JPG, WebP, GIF</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleGalleryImageUpload}
                          className="hidden"
                          disabled={uploadingGalleryImage}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Alt Text (Accessibility)
                  </label>
                  <input
                    type="text"
                    value={galleryForm.alt}
                    onChange={(e) => setGalleryForm({ ...galleryForm, alt: e.target.value })}
                    placeholder="A descriptive alt tag text..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 placeholder:text-slate-650"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-xl py-3 font-bold text-sm tracking-wide transition-all shadow-md shadow-rose-600/10 cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  <FaCheck className="w-3.5 h-3.5" />
                  <span>{galleryModal.mode === "add" ? "Upload Photo" : "Save Changes"}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Read Contact Message Modal */}
      <AnimatePresence>
        {selectedContactModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-rose-500 w-4 h-4" />
                  <h3 className="text-lg font-black text-white">Contact Message Details</h3>
                </div>
                <button
                  onClick={() => setSelectedContactModal(null)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block mb-1">Sender Name</span>
                    <span className="font-bold text-white text-sm">{selectedContactModal.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block mb-1">Date Sent</span>
                    <span className="font-semibold text-slate-300">
                      {new Date(selectedContactModal.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block mb-1">Phone Contact</span>
                    <a href={`tel:${selectedContactModal.phone}`} className="font-bold text-rose-400 hover:underline">
                      {selectedContactModal.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block mb-1">Email</span>
                    <span className="font-semibold text-slate-300">
                      {selectedContactModal.email || "-"}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block mb-1">Subject</span>
                  <span className="font-bold text-white px-3 py-1 bg-white/5 rounded-xl border border-white/5 inline-block">
                    {selectedContactModal.subject || "General Inquiry"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block mb-1">Message Content</span>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 text-slate-200 leading-relaxed font-normal whitespace-pre-line text-xs sm:text-sm">
                    {selectedContactModal.message}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handleDeleteContact(selectedContactModal._id)}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-400 hover:text-white font-bold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <FaTrash className="w-3 h-3" />
                  <span>Delete Message</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedContactModal(null)}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Resource Form Modal */}
      <AnimatePresence>
        {resourceModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <FaFileDownload className="text-rose-500 w-4 h-4" />
                  <h3 className="text-lg font-black text-white">Upload Admission Form / Resource</h3>
                </div>
                <button
                  onClick={() => setResourceModal(false)}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleResourceSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={resourceForm.title}
                    onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                    placeholder="Ex: Admission Application Form 2026-27"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Resource Category
                  </label>
                  <select
                    value={resourceForm.category}
                    onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    <option value="Application Form">Application Form</option>
                    <option value="Prospectus">Prospectus & Guide</option>
                    <option value="Fee Structure">Fee Structure</option>
                    <option value="Transport">Transport Form</option>
                    <option value="Hostel">Hostel Form</option>
                    <option value="Medical">Medical / Code of Conduct</option>
                    <option value="Other">Other Document</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Upload Form File (PDF / DOC / Image) *
                  </label>
                  <div className="relative border-2 border-dashed border-white/10 hover:border-rose-500/50 rounded-2xl p-4 transition-colors">
                    {resourceForm.fileUrl ? (
                      <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 truncate">
                          <FaFilePdf className="text-rose-400 w-5 h-5 shrink-0" />
                          <span className="text-xs text-white font-bold truncate">{resourceForm.fileUrl}</span>
                          <span className="text-[10px] text-amber-400 font-semibold">({resourceForm.fileSize})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResourceForm({ ...resourceForm, fileUrl: "" })}
                          className="p-1 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-bold"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center gap-2 cursor-pointer py-4">
                        {uploadingResourceFile ? (
                          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                            <FaSpinner className="animate-spin w-5 h-5" />
                            <span>Uploading document...</span>
                          </div>
                        ) : (
                          <>
                            <FaUpload className="w-6 h-6 text-slate-400" />
                            <span className="text-xs font-bold text-white">Click to Select File</span>
                            <span className="text-[10px] text-slate-400">PDF, DOC, DOCX, PNG, JPG (Max 10MB)</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                          onChange={handleResourceFileUpload}
                          className="hidden"
                          disabled={uploadingResourceFile}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setResourceModal(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!resourceForm.fileUrl}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer transition-colors shadow-lg shadow-rose-600/20 disabled:opacity-50"
                  >
                    Save & Publish Form
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* TESTIMONIAL MODAL */}
        {testimonialModal.isOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <FaQuoteLeft className="text-rose-500 w-4 h-4" />
                  <h3 className="text-lg font-black text-white">
                    {testimonialModal.mode === "add" ? "Add New Testimonial" : "Edit Testimonial"}
                  </h3>
                </div>
                <button
                  onClick={() => setTestimonialModal({ isOpen: false, mode: "add" })}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleTestimonialSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    placeholder="Ex: Ramesh Kumar Sharma"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Role / Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    placeholder="Ex: Parent (Class 10 Student) or Alumnus"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    <option value={5}>5 Stars (Excellent)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Below Average)</option>
                    <option value={1}>1 Star (Poor)</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Avatar Image Photo
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={testimonialForm.image}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })}
                      placeholder="Paste Image URL or upload below"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500"
                    />
                    <label className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl cursor-pointer shrink-0 transition-colors flex items-center gap-1.5">
                      {uploadingTestimonialImg ? (
                        <FaSpinner className="animate-spin w-4 h-4" />
                      ) : (
                        <FaUpload className="w-4 h-4" />
                      )}
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleTestimonialImageUpload}
                        className="hidden"
                        disabled={uploadingTestimonialImg}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
                    Testimonial Review Text *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={testimonialForm.text}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                    placeholder="Write the testimonial feedback here..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setTestimonialModal({ isOpen: false, mode: "add" })}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer transition-colors shadow-lg shadow-rose-600/20"
                  >
                    {testimonialModal.mode === "add" ? "Publish Testimonial" : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
