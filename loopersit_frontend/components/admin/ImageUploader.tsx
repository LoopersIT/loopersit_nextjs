'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { UploadButton } from '@/lib/uploadthing';

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
    const [preview, setPreview] = useState(value || '');
    const [error, setError] = useState<string | null>(null);

    // Keep preview in sync with value prop
    useEffect(() => {
        setPreview(value || '');
    }, [value]);

    const handleRemove = () => {
        setPreview('');
        setError(null);
        onChange('');
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
                ) : error ? (
                    <div className="flex flex-col items-start gap-2">
                        <div className="w-32 h-32 border-2 border-dashed border-red-300 rounded-lg flex flex-col items-center justify-center gap-2 bg-red-50">
                            <AlertCircle className="text-red-400" size={24} />
                            <span className="text-xs text-red-500 text-center px-2">Error</span>
                        </div>
                        <p className="text-sm text-red-600 max-w-xs">{error}</p>
                        <button
                            type="button"
                            onClick={() => setError(null)}
                            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                console.log("Upload complete:", res);
                                if (res && res[0]) {
                                    const url = res[0].ufsUrl || res[0].url;
                                    onChange(url);
                                    setPreview(url);
                                    setError(null);
                                }
                            }}
                            onUploadError={(err: Error) => {
                                console.error("Upload error:", err);
                                let message = err.message;
                                if (message.includes('FileSizeMismatch') || message.includes('too large')) {
                                    message = 'File is too large. Maximum size is 8MB.';
                                } else if (message.includes('Unauthorized')) {
                                    message = 'Please log in to upload images.';
                                }
                                setError(message);
                            }}
                            appearance={{
                                button: "w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all bg-white text-gray-500 text-sm ut-uploading:bg-indigo-50 ut-uploading:border-indigo-300 ut-uploading:text-indigo-600",
                                allowedContent: "hidden",
                            }}
                            content={{
                                button({ ready, isUploading }) {
                                    if (isUploading) return "Uploading...";
                                    if (ready) return "Upload Image";
                                    return "Loading...";
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
