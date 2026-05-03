import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import GalleryPage from './pages/GalleryPage';
import ConsultationPage from './pages/ConsultationPage';
import ContactPage from './pages/ContactPage';
import BlogPostPage from './pages/BlogPostPage';
import SupervisedLearningBlog from './pages/SupervisedLearningBlog';
import SklearnEssentialsBlog from './pages/SklearnEssentialsBlog';
import ProGANBlog from './pages/ProGANBlog';
import UNetBlog from './pages/UNetBlog';
import UNetFineTuningBlog from './pages/UNetFineTuningBlog';
import TensorBoardBlog from './pages/TensorBoardBlog';
import CollectionsBlog from './pages/CollectionsBlog';
import NotFoundPage from './pages/NotFoundPage';

import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import RouteProgress from './components/RouteProgress';

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <a href="#main-content" className="skip-link">Skip to content</a>
                <ScrollToTop />
                <RouteProgress />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/consultation" element={<ConsultationPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    {/* Blog Posts */}
                    <Route path="/blog/mastering-classification" element={<BlogPostPage />} />
                    <Route path="/blog/supervised-learning" element={<SupervisedLearningBlog />} />
                    <Route path="/blog/sklearn-essentials" element={<SklearnEssentialsBlog />} />
                    <Route path="/blog/progan" element={<ProGANBlog />} />
                    <Route path="/blog/unet" element={<UNetBlog />} />
                    <Route path="/blog/unet-finetuning" element={<UNetFineTuningBlog />} />
                    <Route path="/blog/tensorboard" element={<TensorBoardBlog />} />
                    <Route path="/blog/collections" element={<CollectionsBlog />} />
                    {/* Catch-all 404 — must be last */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </ErrorBoundary>
    );
};

export default App;
