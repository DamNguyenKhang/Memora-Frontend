import { Trash2, Image } from 'lucide-react';
import { Dropdown, Form } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { Zap, TrendingUp, Flame, ChevronDown } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { useRef } from 'react';
import ImagePreview from './imagePreview';

const difficultyOptions = [
    { value: 1, label: 'Easy', icon: Zap, color: 'text-green-600' },
    { value: 2, label: 'Medium', icon: TrendingUp, color: 'text-yellow-600' },
    { value: 3, label: 'Hard', icon: Flame, color: 'text-red-600' },
];

const FlashcardItem = ({ index, field, totalCards, onRemove, imageFilesRef }) => {
    const form = Form.useFormInstance();
    const fileInputRef = useRef(null);
    const difficulty = Form.useWatch([field.name, 'difficulty'], form) ?? 1;
    const difficultyMenuItems = difficultyOptions.map((option) => {
        const Icon = option.icon;

        return {
            key: option.value,
            label: (
                <div className="flex items-center gap-3 w-full">
                    <Icon className={`w-4 h-4 ${option.color}`} />
                    <span className="font-medium text-gray-900">{option.label}</span>
                    {difficulty === option.value && <CheckOutlined className="ml-auto text-indigo-600" />}
                </div>
            ),
            onClick: () => form.setFieldValue([field.name, 'difficulty'], option.value),
        };
    });

    const selectedDifficulty = difficultyOptions.find((opt) => opt.value === difficulty) ?? difficultyOptions[0];
    const SelectedIcon = selectedDifficulty.icon;

    const handleChooseImage = () => {
        fileInputRef.current?.click();
    };

    // const fileToBase64 = (file) =>
    //     new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = reject;
    //         reader.readAsDataURL(file);
    //     });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);

        imageFilesRef.current[field.name] = file;

        const currentFront = form.getFieldValue([field.name, 'front']) || {};
        form.setFieldValue([field.name, 'front'], {
            ...currentFront,
            previewUrl,
        });
    };

    return (
        <div className="bg-white border-2 border-gray-300 rounded-xl p-5 shadow-sm hover:border-indigo-300 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <span className="inline-block px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-semibold">
                    Card {index + 1}
                </span>

                <div className="flex items-center gap-2">
                    <Form.Item name={[field.name, 'difficulty']} hidden>
                        <input />
                    </Form.Item>
                    {/* Difficulty Dropdown */}
                    <Dropdown
                        menu={{ items: difficultyMenuItems }}
                        placement="bottomLeft"
                        getPopupContainer={(trigger) => trigger.parentElement}
                        classNames={{ root: 'difficulty-dropdown' }}
                        arrow
                    >
                        <button
                            type="button"
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-300 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors"
                        >
                            <SelectedIcon className={`w-4 h-4 ${selectedDifficulty.color}`} />
                            <span>{selectedDifficulty.label}</span>
                            <ChevronDown className="w-3 h-3 text-gray-600 ml-1" />
                        </button>
                    </Dropdown>

                    {/* Remove */}
                    {totalCards > 1 && (
                        <button
                            type="button"
                            onClick={onRemove}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Question / Answer / Image */}
            <div className="flex gap-4 mb-4 items-start">
                <div className="flex-1">
                    <Form.Item
                        name={[field.name, 'front', 'text']}
                        rules={[{ required: true, message: 'Question is required' }]}
                        label="Question"
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </div>

                <div className="flex-1">
                    <Form.Item
                        name={[field.name, 'back', 'text']}
                        rules={[{ required: true, message: 'Answer is required' }]}
                        label="Answer"
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </div>

                <div className="flex flex-col">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Image (Optional)</label>
                    <Form.Item name={[field.name, 'front']} style={{ display: 'none' }} preserve />
                    <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageChange} />

                    <div
                        onClick={handleChooseImage}
                        className="
                            w-26 h-26
                            border-2 border-dashed border-gray-300
                            rounded-xl
                            bg-gray-50
                            hover:border-indigo-500
                            transition-colors
                            cursor-pointer
                            flex items-center justify-center
                            overflow-hidden
                            relative
                        "
                    >
                        <ImagePreview field={field} fileInputRef={fileInputRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardItem;
