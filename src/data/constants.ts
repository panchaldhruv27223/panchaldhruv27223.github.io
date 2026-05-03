import { Project, SkillCategory, ExperienceItem, BlogPost, Certificate } from '../types';

// Images
import rooftopImg from '../../images/project_images/solar_rooftop.webp';
import paligemmaImg from '../../images/project_images/vlm_paligemma_model.webp';
import quantumImg from '../../images/project_images/BenchMarkCNN.webp';
import cert1Img from '../../images/certificates/cert1.webp';
import cert2Img from '../../images/certificates/cert2.webp';
import cert3Img from '../../images/certificates/cert3.webp';

export const TAGLINES = ["Vision", "Language", "Intelligence", "Future"];

export const PROJECTS: Project[] = [
    {
        id: 'rooftop',
        title: 'Rooftop Segmentation',
        category: 'Computer Vision',
        problem: 'Identifying rooftops in high-resolution urban satellite imagery for solar potential assessment.',
        approach: 'Hybrid pipeline using YOLOS/DETR + SAM (Segment Anything Model). Created India-specific dataset with 5000+ aerial tiles.',
        impact: '+23% IoU improvement over baseline models',
        metric: { value: '+23%', label: 'IoU vs baseline' },
        tech: ['YOLOS', 'SAM', 'PyTorch', 'Active Learning', 'GeoTIFF'],
        link: 'https://github.com/panchaldhruv27223/Solar_Rooftop_Detection',
        image: rooftopImg
    },
    {
        id: 'paligemma',
        title: 'Vision-Language Model',
        category: 'Multimodal AI',
        problem: 'Enabling scalable visual catalog understanding and complex visual question answering.',
        approach: 'Custom VLM combining SigLIP vision encoder and Gemma decoder. Integrated top-p decoding and KV caching.',
        impact: 'Production-ready visual reasoning engine',
        metric: { value: 'Top-p', label: 'Decoding + KV cache' },
        tech: ['SigLIP', 'Gemma', 'PyTorch', 'KV Cache', 'HuggingFace'],
        link: 'https://github.com/panchaldhruv27223/Vision-Language-Model',
        image: paligemmaImg
    },
    {
        id: 'quantum',
        title: 'QuanvolutionNet',
        category: 'Quantum ML',
        problem: 'Exploring quantum circuits as feature extractors in classical CNN architectures.',
        approach: 'Integrated quanvolutional filters into CNNs. Benchmarked 15+ quantum circuits with varied expressibility.',
        impact: '81.12% accuracy on CIFAR-10',
        metric: { value: '81%', label: 'CIFAR-10 accuracy' },
        tech: ['PennyLane', 'PyTorch', 'CIFAR-10', 'CNN', 'QNN'],
        link: 'https://github.com/panchaldhruv27223/Image_classification_by_QNN',
        image: quantumImg
    }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        name: 'Machine Learning',
        skills: [
            { name: 'Python', years: 5, primary: true },
            { name: 'PyTorch', years: 3, primary: true },
            { name: 'TensorFlow', years: 2 },
            { name: 'Scikit-Learn', years: 4 },
            { name: 'NumPy', years: 5 },
            { name: 'Pandas', years: 5 },
            { name: 'Transfer Learning', years: 2 },
            { name: 'Model Optimization', years: 2 },
        ]
    },
    {
        name: 'Vision & NLP',
        skills: [
            { name: 'HuggingFace', years: 3, primary: true },
            { name: 'Transformers', years: 3, primary: true },
            { name: 'OpenCV', years: 3 },
            { name: 'YOLO', years: 2 },
            { name: 'DETR', years: 1 },
            { name: 'SAM', years: 1 },
            { name: 'Gemma', years: 1 },
            { name: 'SigLIP', years: 1 },
        ]
    },
    {
        name: 'Gen-AI & Agents',
        skills: [
            { name: 'Prompt Engineering', years: 2, primary: true },
            { name: 'RAG', years: 2, primary: true },
            { name: 'LangChain', years: 2 },
            { name: 'LangGraph', years: 1 },
            { name: 'Agentic AI', years: 1 },
            { name: 'Multi-Agent Orchestration', years: 1 },
            { name: 'MCP', years: 1 },
            { name: 'OpenAI Agent SDK', years: 1 },
            { name: 'LangFuse', years: 1 },
            { name: 'Neo4j', years: 1 },
            { name: 'Faiss', years: 1 },
        ]
    },
    {
        name: 'Tools & Cloud',
        skills: [
            { name: 'Git', years: 5, primary: true },
            { name: 'Docker', years: 3 },
            { name: 'AWS', years: 2 },
            { name: 'Linux', years: 4 },
            { name: 'MongoDB', years: 2 },
            { name: 'PostgreSQL', years: 2 },
            { name: 'TensorBoard', years: 2 },
        ]
    }
];

export const EXPERIENCE: ExperienceItem[] = [
    {
        role: 'Teaching Assistant',
        company: 'DA-IICT',
        period: 'Jan 2025 - Dec 2025',
        details: [
            'Guiding 350+ students through ML concepts and assignments',
            'Conducting lab sessions and evaluating projects',
            'Developing comprehensive learning materials'
        ]
    },
    {
        role: 'ML Researcher',
        company: 'DA-IICT Research Lab',
        period: 'Aug 2024 - Dec 2025',
        details: [
            'Led hybrid pipeline development for aerial imagery segmentation',
            'Created India-specific rooftop dataset with 1300+ manual annotations',
            'Applied active learning for improved data efficiency'
        ]
    },
    {
        role: 'Python/ML Intern',
        company: 'Kody Technolab Pvt. Ltd.',
        period: 'Jan 2024 - Jun 2024',
        details: [
            'Engineered multimodal AI assistant with face authentication',
            'Built Keras NLP classifier with 97% accuracy across 52 intents',
            'Integrated Whisper for voice-to-query processing'
        ]
    }
];

export const BLOGS: BlogPost[] = [
    {
        title: 'Mastering Classification with Scikit-Learn',
        excerpt: 'A comprehensive guide to one of the most common ML tasks, from distinguishing spam emails to predicting customer churn.',
        link: '/blog/mastering-classification',
        date: 'Jan 2025'
    },
    {
        title: 'Supervised Learning with Scikit-learn',
        excerpt: 'Understanding the core of machine learning: training models with labeled data to predict outcomes.',
        link: '/blog/supervised-learning',
        date: 'Dec 2024'
    },
    {
        title: 'Scikit-learn Essentials: Why & How',
        excerpt: 'Why Scikit-learn is the go-to library for ML in Python and how to use its unified API for efficient workflows.',
        link: '/blog/sklearn-essentials',
        date: 'Dec 2024'
    },
    {
        title: 'ProGAN: Generating High Resolution Images',
        excerpt: 'Exploring Progressive GANs and how they stabilize training to generate stunning high-resolution images.',
        link: '/blog/progan',
        date: 'Nov 2024'
    },
    {
        title: 'Understanding the U-Net Model',
        excerpt: 'Revolutionizing image segmentation with the U-Net architecture - a deep dive into encoder-decoder networks.',
        link: '/blog/unet',
        date: 'Oct 2024'
    },
    {
        title: 'Fine-Tuning U-Net for Satellite Image Segmentation',
        excerpt: 'A practical follow-up on the theoretical foundations of U-Net, applying it to real-world satellite imagery tasks.',
        link: '/blog/unet-finetuning',
        date: 'Oct 2024'
    },
    {
        title: 'Mastering TensorBoard with PyTorch',
        excerpt: 'A hands-on guide to using TensorBoard for visualizing data and model training with the Fashion-MNIST dataset.',
        link: '/blog/tensorboard',
        date: 'Sep 2024'
    },
    {
        title: 'Collections Module in Python',
        excerpt: 'All you need to know about the Collections module - specialized container datatypes for efficient data handling.',
        link: '/blog/collections',
        date: 'Aug 2024'
    }
];

export const CERTIFICATES: Certificate[] = [
    {
        title: 'Data Science Masters 2.0',
        issuer: 'Physics Wallah',
        date: 'December 2024',
        description: 'Comprehensive Data Science program covering ML, DL, and data engineering.',
        link: 'https://pwskills.com/learn/certificate/16bba64e-2a1e-4ac-90aa-a9068284264f',
        image: cert3Img
    },
    {
        title: 'Advanced Learning Algorithms',
        issuer: 'DeepLearning.AI & Stanford University',
        date: 'March 2023',
        description: 'Advanced machine learning algorithms and optimization techniques.',
        link: 'https://coursera.org/verify/7ZVANPB76FCM',
        image: cert2Img
    },
    {
        title: 'Supervised Machine Learning',
        issuer: 'DeepLearning.AI & Stanford University',
        date: 'March 2023',
        description: 'Foundational concepts in regression and classification models.',
        link: 'https://coursera.org/verify/NJH2VBRLUNF3',
        image: cert1Img
    }
];

export const EDUCATION = [
    {
        degree: 'M.Tech in Machine Learning',
        institution: 'Dhirubhai Ambani Institute of Information and Communication Technology',
        period: 'Jul 2024 - Present',
        cgpa: '9.58'
    },
    {
        degree: 'B.E. in Information Technology',
        institution: 'Gandhinagar Institute of Technology',
        period: 'Aug 2020 - Jul 2024',
        cgpa: '9.01',
        achievement: 'Gold Medal'
    }
];

export const SOCIAL_LINKS = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/dhruv-panchal-ab7135217' },
    { name: 'GitHub', url: 'https://github.com/panchaldhruv27223' },
    { name: 'Medium', url: 'https://dhruv-panchal.medium.com' },
    { name: 'Topmate', url: 'https://topmate.io/panchal_dhruv' },
    { name: 'Codolio', url: 'https://codolio.com/profile/Dhruv%20Panchal' }
];

export const CONTACT = {
    email: 'dhruv.panchal27223@gmail.com',
    location: 'Ahmedabad, Gujarat, India'
};
