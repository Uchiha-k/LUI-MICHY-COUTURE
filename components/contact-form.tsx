'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Message sent successfully!', {
                    description: 'We will get back to you soon.',
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            toast.error('Failed to send message', {
                description: 'Please try again or contact us directly.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                </label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us more..."
                />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
            </Button>
        </form>
    );
}
