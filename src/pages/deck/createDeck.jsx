import React, { useState, useRef } from 'react';
import { Plus, Sparkles, Save, Eye, X, Lock, Globe, LayersPlusIcon } from 'lucide-react';
import { Dropdown, Form } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import FlashcardItem from './flashcardItem';
import { Button } from '~/components/ui/button';
import { Modal } from 'antd';
import { Input } from '~/components/ui/input';
import { useForm } from 'antd/es/form/Form';
import { CREATE_DECK } from '~/constants/APIs';
import isSuccessResponse from '~/utils/checkResponse';
import { message } from 'antd';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

const visibilityOptions = [
    {
        key: 'public',
        label: 'Public',
        icon: Globe,
        value: 'public',
    },
    {
        key: 'private',
        label: 'Private',
        icon: Lock,
        value: 'private',
    },
];

const CreateDeck = () => {
    const axiosPrivate = useAxiosPrivate();
    const [tags, setTags] = useState([]);
    const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [form] = useForm();
    const visibility = Form.useWatch('visibility', form) || 'private';
    const imageFilesRef = useRef({});
    const flashcards = Form.useWatch('flashcards', form) || [
        {
            id: crypto.randomUUID(),
            front: { text: '', imageUrl: null },
            back: { text: '', imageUrl: null },
            difficulty: 1,
        },
    ];

    const visibilityMenuItems = visibilityOptions.map((option) => {
        const OptionIcon = option.icon;

        return {
            key: option.value,
            label: (
                <div className="flex items-center gap-3 w-full">
                    <OptionIcon className="w-4 h-4 text-gray-700" />
                    <span
                        className={`font-medium ${visibility === option.value ? 'text-indigo-600' : 'text-gray-900'}`}
                    >
                        {option.label}
                    </span>
                    {visibility === option.value && <CheckOutlined className="ml-auto text-indigo-600" />}
                </div>
            ),
            onClick: () => form.setFieldValue('visibility', option.value),
        };
    });

    const selectedOption = visibilityOptions.find((opt) => opt.value === visibility);
    const SelectedIcon = selectedOption?.icon;

    const suggestedTags = [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'History',
        'Geography',
        'English',
        'Spanish',
        'Web Development',
        'Programming',
    ];

    const handleAddTag = (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const handleCreateTag = () => {
        if (!newTagName.trim()) return;

        if (!tags.includes(newTagName.trim())) {
            setTags([...tags, newTagName.trim()]);
        }

        setNewTagName('');
        setIsCreateTagOpen(false);
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleGenerateWithAI = () => {
        const currentFlashcards = form.getFieldValue('flashcards') || [];
        const aiCards = [
            {
                id: Date.now(),
                question: 'What is the capital of France?',
                answer: 'Paris is the capital and most populous city of France.',
                image: null,
                difficulty: 1,
            },
            {
                id: Date.now() + 1,
                question: 'Explain the water cycle',
                answer: 'The water cycle describes how water evaporates, forms clouds, precipitates, and returns to bodies of water.',
                image: null,
                difficulty: 1,
            },
        ];
        form.setFieldsValue({
            flashcards: [...currentFlashcards, ...aiCards],
        });
    };

    const handleSaveDraft = () => {
        alert('Draft saved successfully!');
    };

    const buildCreateDeckFormData = (values) => {
        const formData = new FormData();

        const deckPayload = {
            title: values.title,
            description: values.description,
            tags: values.tags,
            isPublic: values.isPublic,
            difficulty: values.difficulty,
            flashcards: values.flashcards.map((card, index) => ({
                front: {
                    text: card.front.text,
                    imageIndex: imageFilesRef.current[index] ? index : null,
                },
                back: {
                    text: card.back.text,
                },
            })),
        };

        formData.append('deck', JSON.stringify(deckPayload));

        Object.values(imageFilesRef.current).forEach((file) => {
            if (file) formData.append('images', file);
        });

        return formData;
    };

    const handlePublish = async (value) => {
        const payload = await buildCreateDeckFormData(value);
        try {
            const response = await axiosPrivate.post(CREATE_DECK, payload, {
                headers: {
                    'Content-Type': undefined,
                },
            });
            if (isSuccessResponse(response)) {
                message.success('Deck published successfully!');
            }
        } catch (error) {
            message.error('Failed to publish deck. Please try again.');
            console.error('Error publishing deck:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-4xl font-bold text-gray-900">Create New Deck</h1>
                    </div>
                    <p className="text-lg text-gray-600">
                        Build a collection of flashcards to help you learn effectively
                    </p>
                </div>

                {/* Deck Information */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handlePublish}
                    initialValues={{
                        flashcards: [
                            {
                                id: crypto.randomUUID(),
                                front: { text: '', imageUrl: null },
                                back: { text: '' },
                                difficulty: 1,
                            },
                        ],
                    }}
                >
                    <div className="mb-8 space-y-4">
                        <Form.Item name="visibility" initialValue="private" hidden>
                            <input />
                        </Form.Item>
                        {/* Visibility Dropdown */}
                        <div className="relative inline-block">
                            <Dropdown menu={{ items: visibilityMenuItems }} placement="bottomRight" arrow>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 transition-colors shadow-sm"
                                >
                                    {SelectedIcon && <SelectedIcon className="w-4 h-4 text-gray-700" />}

                                    <span className="font-medium text-gray-900">{selectedOption?.label}</span>

                                    <svg
                                        className="w-4 h-4 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                            </Dropdown>
                        </div>

                        {/* Title */}
                        <Form.Item
                            name="title"
                            label={<span className="text-sm font-semibold text-gray-900">Title</span>}
                            rules={[
                                { required: true, message: 'Please enter a deck title' },
                                { min: 3, message: 'Title must be at least 3 characters' },
                            ]}
                        >
                            <Input placeholder="e.g., Advanced JavaScript Concepts" />
                        </Form.Item>

                        {/* Description */}
                        <Form.Item
                            name="description"
                            label={<span className="text-sm font-semibold text-gray-900">Description</span>}
                        >
                            <Input.TextArea
                                placeholder="Describe what this deck covers..."
                                rows={3}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400 resize-none shadow-sm"
                            />
                        </Form.Item>

                        <div>
                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Tags</label>

                                {/* Selected Tags */}
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="group rounded-full p-0.5 transition-colors"
                                                >
                                                    <X className="w-3 h-3 text-gray-500 group-hover:text-indigo-700 transition-colors" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Suggested Tags */}
                                <div className="bg-white border-2 border-gray-300 rounded-xl p-4 shadow-sm">
                                    <div className="text-xs font-semibold text-gray-500 uppercase mb-3">
                                        Suggested Tags
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedTags
                                            .filter((tag) => !tags.includes(tag))
                                            .map((tag, idx) => (
                                                <Button
                                                    type="button"
                                                    key={idx}
                                                    onClick={() => handleAddTag(tag)}
                                                    size="sm"
                                                    className=" h-8 text-sm font-medium"
                                                    variant="outline"
                                                >
                                                    {tag}
                                                </Button>
                                            ))}
                                        <Button
                                            type="button"
                                            onClick={() => setIsCreateTagOpen(true)}
                                            variant="outline"
                                            size="custom"
                                            className="
                                                w-8 h-8
                                                rounded-full
                                                flex items-center justify-center
                                            "
                                        >
                                            <Plus className="w-6 h-6" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flashcards Section */}
                    <Form.List name="flashcards" noStyle>
                        {(fields, { add, remove }) => (
                            <div className="mb-8">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Flashcards ({fields.length})
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Add questions and answers for your deck
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGenerateWithAI}
                                        className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Generate with AI
                                    </button>
                                </div>

                                {/* Flashcard List */}
                                <div className="space-y-4 mb-4">
                                    {fields.map((field, index) => (
                                        <FlashcardItem
                                            key={field.key}
                                            index={index}
                                            field={field}
                                            onRemove={() => remove(field.name)}
                                            totalCards={fields.length}
                                            imageFilesRef={imageFilesRef}
                                        />
                                    ))}
                                </div>

                                {/* Add Card Button */}
                                <div className="flex justify-center">
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            add({
                                                front: { text: '' },
                                                back: { text: '' },
                                                difficulty: 'medium',
                                            })
                                        }
                                        size="lg"
                                        variant="outline"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add Another Card
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form.List>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-5 border-2 border-gray-300">
                        <div className="text-sm text-gray-600">
                            <span className="font-bold text-gray-900 text-lg">{flashcards.length}</span> flashcard
                            {flashcards.length !== 1 ? 's' : ''} created
                        </div>
                        <div className="flex items-center gap-3">
                            <Button type="button" variant="outline" onClick={handleSaveDraft}>
                                <Save className="w-4 h-4" />
                                Save Draft
                            </Button>
                            <Button variant="gradient" type="submit">
                                <LayersPlusIcon className="w-4 h-4" />
                                Create
                            </Button>
                        </div>
                    </div>

                    {/* Create Tag Modal */}
                    {isCreateTagOpen && (
                        <Modal
                            title="Create new tag"
                            open={isCreateTagOpen}
                            centered
                            onOk={() => {
                                if (!newTagName.trim()) return;

                                setNewTagName('');
                                setIsCreateTagOpen(false);
                            }}
                            onCancel={() => {
                                setNewTagName('');
                                setIsCreateTagOpen(false);
                            }}
                            okText="Create"
                            cancelText="Cancel"
                            okButtonProps={{ disabled: !newTagName.trim() }}
                        >
                            <Input
                                placeholder="Enter tag name..."
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                onPressEnter={handleCreateTag}
                                autoFocus
                            />
                        </Modal>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default CreateDeck;
