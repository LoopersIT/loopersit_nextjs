'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useUploadThing } from '@/lib/uploadthing';

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            if (res && res[0]) {
                onChange(res[0].ufsUrl);
                setUploading(false);
            }
        },
        onUploadError: (error) => {
            console.error('Error uploading file:', error);
            alert('Failed to upload image: ' + error.message);
            setPreview(value || '');
            setUploading(false);
        },
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file using UploadThing
        setUploading(true);
        await startUpload([file]);
    };

    const handleRemove = () => {
        setPreview('');
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

            <div className="flex items-start gap-4">
                {preview ? (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image src={preview} alt="Preview" fill className="object-cover" />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                    >
                        <Upload className="text-gray-400" size={24} />
                        <span className="text-sm text-gray-500">Upload</span>
                    </button>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {uploading && (
                    <div className="flex items-center gap-2 text-indigo-600">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                        <span className="text-sm">Uploading...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
