'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface ImageManagerProps {
    images: string[];
    onChange: (images: string[]) => void;
}

export function ImageManager({ images, onChange }: ImageManagerProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                onChange([...images, data.url]);
                toast.success('Image uploaded successfully');
            } else {
                toast.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Something went wrong during upload');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest block">Product Media</Label>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((url, index) => (
                    <div key={index} className="relative aspect-square border border-black/5 bg-muted group">
                        <Image
                            src={url}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-black text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-black/10 hover:border-black/30 flex flex-col items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                    {uploading ? (
                        <Loader2 className="animate-spin text-black/40" size={24} />
                    ) : (
                        <>
                            <Upload className="text-black/40" size={24} />
                            <span className="text-[10px] uppercase font-black tracking-widest text-black/40">Upload</span>
                        </>
                    )}
                </button>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                className="hidden"
            />

            <p className="text-[10px] text-muted-foreground uppercase">Recommended: High quality JPG or PNG, max 5MB</p>
        </div>
    );
}
