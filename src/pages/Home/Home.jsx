import React from 'react';
import {
    Brain,
    Sparkles,
    Users,
    TrendingUp,
    Zap,
    BookOpen,
    ArrowRight,
    CheckCircle,
    MessageSquare,
    Heart,
    ThumbsUp,
} from 'lucide-react';
import { Button } from '~/components/ui/button';

const Home = () => {
    const features = [
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: 'Flashcards & Decks',
            description: 'Create unlimited decks and flashcards. Organize your learning materials your way.',
        },
        {
            icon: <Brain className="w-6 h-6" />,
            title: 'Spaced Repetition',
            description: 'Smart algorithm that shows cards at optimal intervals for long-term retention.',
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: 'AI Flashcard Generator',
            description: 'Generate high-quality flashcards instantly from your notes using AI technology.',
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: 'Real-time Study Rooms',
            description: 'Study together with peers in live sessions. Collaborate and stay motivated.',
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: 'Progress Tracking',
            description: 'Visualize your learning journey with detailed analytics and insights.',
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: 'Community Decks',
            description: 'Access thousands of shared decks created by learners worldwide.',
        },
    ];

    const steps = [
        {
            number: '01',
            title: 'Create or import a deck',
            description: 'Build your own flashcards or import from our community library',
        },
        {
            number: '02',
            title: 'Study with smart flashcards',
            description: 'Use spaced repetition to maximize retention and minimize study time',
        },
        {
            number: '03',
            title: 'Get AI explanations',
            description: 'Stuck on a concept? Get instant AI-powered explanations and examples',
        },
        {
            number: '04',
            title: 'Track progress & improve',
            description: 'Monitor your performance and watch your knowledge grow over time',
        },
    ];

    const mockStudyUsers = [
        { name: 'Alex M.', avatar: 'AM', status: 'studying' },
        { name: 'Sarah K.', avatar: 'SK', status: 'studying' },
        { name: 'John D.', avatar: 'JD', status: 'studying' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-violet-50">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-8">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Learning Platform</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        Learn Smarter with
                        <span className="text-indigo-600"> AI-Powered</span> Flashcards
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Master any subject with intelligent flashcards, spaced repetition, and AI assistance. Build
                        lasting knowledge that stays in your long-term memory.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="custom"
                            className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5" />
                        </Button>

                        <Button
                            size="custom"
                            className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
                        >
                            Explore Decks
                        </Button>
                    </div>

                    <div className="mt-16 bg-white rounded-2xl shadow-2xl p-8 border border-indigo-100">
                        <div className="grid grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-indigo-600 mb-2">10M+</div>
                                <div className="text-gray-600">Flashcards Created</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-indigo-600 mb-2">500K+</div>
                                <div className="text-gray-600">Active Learners</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
                                <div className="text-gray-600">Retention Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Everything you need to excel</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful features designed to accelerate your learning and help you retain information longer
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 border border-indigo-100 hover:border-indigo-300 hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section id="how" className="bg-gradient-to-b from-indigo-50 to-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How Memora Works</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Start learning in minutes with our simple, proven approach
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white rounded-2xl p-8 border-2 border-indigo-100 hover:border-indigo-300 transition-all h-full flex flex-col">
                                    <div>
                                        <div className="text-5xl font-bold text-indigo-200 mb-4">{step.number}</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2">
                                        <ArrowRight className="w-8 h-8 text-indigo-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Real-time Learning Highlight */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="p-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
                                <Users className="w-4 h-4" />
                                <span>Live Collaboration</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Study Together in Real-Time
                            </h2>

                            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                                Join live study rooms, collaborate with peers, share reactions, and stay motivated
                                together. Learning is better when you're not alone.
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-white">
                                    <CheckCircle className="w-6 h-6 text-indigo-200" />
                                    <span className="text-lg">Real-time sync across all devices</span>
                                </div>
                                <div className="flex items-center gap-3 text-white">
                                    <CheckCircle className="w-6 h-6 text-indigo-200" />
                                    <span className="text-lg">Live chat and reactions</span>
                                </div>
                                <div className="flex items-center gap-3 text-white">
                                    <CheckCircle className="w-6 h-6 text-indigo-200" />
                                    <span className="text-lg">See who's studying the same deck</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-12">
                            <div className="bg-white rounded-2xl shadow-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                                            <Brain className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Biology 101</div>
                                            <div className="text-sm text-gray-500">Cell Structure</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>{mockStudyUsers.length} studying</span>
                                    </div>
                                </div>

                                <div className="bg-indigo-50 rounded-xl p-6 mb-4">
                                    <div className="text-sm text-indigo-600 font-medium mb-2">Question</div>
                                    <div className="text-gray-900 font-semibold text-lg">
                                        What is the powerhouse of the cell?
                                    </div>
                                </div>

                                <div className="flex gap-2 mb-6">
                                    {mockStudyUsers.map((user, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2"
                                        >
                                            <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                                {user.avatar}
                                            </div>
                                            <span className="text-sm text-gray-700">{user.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MessageSquare className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm font-medium text-gray-700">Live Chat</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                                                AM
                                            </div>
                                            <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                                                Mitochondria! 🎯
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-10">
                                            <Button
                                                size="custom"
                                                className="flex items-center gap-1 px-3 py-1 bg-red-50 rounded-full text-red-600 text-sm hover:bg-red-100 transition-colors"
                                            >
                                                <Heart className="w-4 h-4" />
                                                <span>5</span>
                                            </Button>

                                            <Button
                                                size="custom"
                                                className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-sm hover:bg-blue-100 transition-colors"
                                            >
                                                <ThumbsUp className="w-4 h-4" />
                                                <span>3</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-12 md:p-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Learning?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                        Join thousands of learners who are already mastering new skills with Memora. Start your journey
                        today, completely free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="custom"
                            className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            Start Learning Now
                            <ArrowRight className="w-5 h-5" />
                        </Button>

                        <Button
                            size="custom"
                            className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                        >
                            Sign Up Free
                        </Button>
                    </div>

                    <p className="text-indigo-200 text-sm mt-6">
                        No credit card required • Free forever • 5-minute setup
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
