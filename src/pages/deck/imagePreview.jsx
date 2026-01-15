import { Form } from 'antd';
import { Image, X } from 'lucide-react';

const ImagePreview = ({ field, fileInputRef }) => {
    const form = Form.useFormInstance();

    const handleRemove = (e) => {
        e.stopPropagation();

        form.setFieldValue([field.name, 'front'], {
            ...form.getFieldValue([field.name, 'front']),
            imageFile: null,
            previewUrl: null,
        });

        if (fileInputRef?.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) => {
                const front = getFieldValue([field.name, 'front']);
                const previewUrl = front?.previewUrl;

                if (previewUrl) {
                    return (
                        <div className="relative w-full h-full group overflow-hidden rounded-xl">
                            <img
                                src={previewUrl}
                                alt="preview"
                                className="w-full h-full object-contain"
                            />

                            <button
                                type="button"
                                onClick={handleRemove}
                                className="
                                    absolute top-2 right-2
                                    bg-black/60 hover:bg-black/80
                                    text-white
                                    rounded-full
                                    p-1
                                    opacity-0 group-hover:opacity-100
                                    transition
                                "
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    );
                }

                return (
                    <div className="flex flex-col items-center gap-2 text-center px-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Image className="w-5 h-5 text-indigo-600" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">Image</p>
                    </div>
                );
            }}
        </Form.Item>
    );
};
export default ImagePreview;