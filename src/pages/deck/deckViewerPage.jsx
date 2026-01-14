import React, { useState } from 'react';
import { Bookmark, Share2, Edit, Grid, List, Search, ChevronLeft, ChevronRight, RotateCw, Clock, TrendingUp, User } from 'lucide-react';

// Mock Data
const deckData = {
  id: 1,
  title: "Advanced JavaScript Concepts",
  description: "Master closures, prototypes, async/await, and modern ES6+ features to become a JavaScript expert.",
  author: {
    name: "Sarah Chen",
    avatar: "SC"
  },
  tags: ["JavaScript", "Programming", "Web Development"],
  stats: {
    cardCount: 24,
    lastUpdated: "2 days ago",
    studyProgress: 67
  },
  isOwner: true
};

const flashcardsData = [
  {
    id: 1,
    question: "What is a closure in JavaScript?",
    answer: "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. Closures allow functions to maintain private state and create function factories.",
    difficulty: "Medium",
    lastReviewed: "1 day ago",
    status: "learning"
  },
  {
    id: 2,
    question: "Explain the difference between var, let, and const",
    answer: "var is function-scoped and can be redeclared; let is block-scoped and can be reassigned but not redeclared; const is block-scoped and cannot be reassigned or redeclared (though object properties can still be modified).",
    difficulty: "Easy",
    lastReviewed: "3 hours ago",
    status: "mastered"
  },
  {
    id: 3,
    question: "What is the Event Loop and how does it work?",
    answer: "The Event Loop is a mechanism that handles asynchronous operations in JavaScript. It continuously checks the call stack and task queues, executing tasks from the queue when the stack is empty. This enables non-blocking I/O operations.",
    difficulty: "Hard",
    lastReviewed: "5 days ago",
    status: "new"
  },
  {
    id: 4,
    question: "What are Promises and how do they work?",
    answer: "Promises are objects representing the eventual completion or failure of an asynchronous operation. They have three states: pending, fulfilled, or rejected. Promises allow chaining with .then() and .catch() for cleaner async code.",
    difficulty: "Medium",
    lastReviewed: "2 days ago",
    status: "learning"
  },
  {
    id: 5,
    question: "Explain prototypal inheritance",
    answer: "Prototypal inheritance is JavaScript's inheritance model where objects inherit properties and methods from other objects. Every object has an internal [[Prototype]] link to another object, forming a prototype chain.",
    difficulty: "Hard",
    lastReviewed: "1 week ago",
    status: "new"
  },
  {
    id: 6,
    question: "What is the difference between == and ===?",
    answer: "== performs type coercion before comparison (loose equality), while === compares both value and type without coercion (strict equality). === is generally preferred for more predictable comparisons.",
    difficulty: "Easy",
    lastReviewed: "1 day ago",
    status: "mastered"
  }
];

const DeckViewerPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isStudying, setIsStudying] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCards = flashcardsData.filter(card => {
    const matchesSearch = card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || card.difficulty === filterDifficulty;
    const matchesStatus = filterStatus === 'all' || card.status === filterStatus;
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const currentCard = filteredCards[currentCardIndex];

  const handleStartStudy = () => {
    setIsStudying(true);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleNextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setIsStudying(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'learning': return 'bg-purple-100 text-purple-700';
      case 'mastered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isStudying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Study Mode Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsStudying(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Exit Study Mode</span>
              </button>
              <div className="text-center">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-lg font-semibold text-gray-900">
                  {currentCardIndex + 1} / {filteredCards.length}
                </div>
              </div>
              <div className="w-24"></div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Flashcard Display */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-8 text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
              {currentCard.difficulty}
            </span>
          </div>

          {/* Flashcard */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative cursor-pointer group"
            style={{ perspective: '1000px' }}
          >
            <div 
              className="relative w-full h-96 transition-transform duration-500"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front of Card */}
              <div 
                className="absolute inset-0 bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-sm font-medium text-indigo-600 mb-4">QUESTION</div>
                <h2 className="text-3xl font-bold text-gray-900 text-center leading-relaxed">
                  {currentCard.question}
                </h2>
                <div className="mt-8 text-sm text-gray-400 flex items-center gap-2">
                  <RotateCw className="w-4 h-4" />
                  Click to reveal answer
                </div>
              </div>

              {/* Back of Card */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-12 flex flex-col items-center justify-center text-white"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-sm font-medium text-indigo-200 mb-4">ANSWER</div>
                <p className="text-xl leading-relaxed text-center">
                  {currentCard.answer}
                </p>
              </div>
            </div>
          </div>

          {/* Study Actions */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextCard}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Again
            </button>
            <button
              onClick={handleNextCard}
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Hard
            </button>
            <button
              onClick={handleNextCard}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Good
            </button>
            <button
              onClick={handleNextCard}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Easy
            </button>

            <button
              onClick={handleNextCard}
              disabled={currentCardIndex === filteredCards.length - 1}
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Keyboard: <kbd className="px-2 py-1 bg-gray-100 rounded">Space</kbd> to flip • 
            <kbd className="px-2 py-1 bg-gray-100 rounded ml-2">←</kbd> Previous • 
            <kbd className="px-2 py-1 bg-gray-100 rounded ml-2">→</kbd> Next
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">Memora</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="hover:text-gray-900 cursor-pointer">My Decks</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">JavaScript</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Deck Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {deckData.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{deckData.title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{deckData.description}</p>
              
              {/* Author & Stats */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {deckData.author.avatar}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Created by</div>
                    <div className="font-semibold text-gray-900">{deckData.author.name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">{deckData.stats.cardCount}</div>
                    <div className="text-sm text-gray-500">Cards</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{deckData.stats.studyProgress}%</div>
                    <div className="text-sm text-gray-500">Progress</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">{deckData.stats.lastUpdated}</div>
                    <div className="text-sm text-gray-500">Updated</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              {deckData.isOwner && (
                <button className="p-3 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                  <Edit className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Study Progress</span>
              <span className="text-sm text-gray-500">{deckData.stats.studyProgress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all"
                style={{ width: `${deckData.stats.studyProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={handleStartStudy}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Start Studying
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4">Filter & Search</h3>
              
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Cards</option>
                  <option value="new">New</option>
                  <option value="learning">Learning</option>
                  <option value="mastered">Mastered</option>
                </select>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">
                  Showing <span className="font-semibold text-gray-900">{filteredCards.length}</span> cards
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Flashcards</h2>
              <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'list'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Flashcards Grid/List */}
            {filteredCards.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cards found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
                : 'space-y-4'
              }>
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(card.difficulty)}`}>
                          {card.difficulty}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                          {card.status}
                        </span>
                      </div>
                      {deckData.isOwner && (
                        <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">
                      {card.question}
                    </h3>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {card.answer}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Reviewed {card.lastReviewed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckViewerPage;