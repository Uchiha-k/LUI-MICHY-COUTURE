'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
    const [show, setShow] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShow(true);
            // Delay for animation
            setTimeout(() => setIsVisible(true), 100);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
        setTimeout(() => setShow(false), 300);

        // Initialize analytics if consent given
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                analytics_storage: 'granted',
            });
        }
    };

    const decline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
        setTimeout(() => setShow(false), 300);

        // Disable analytics if consent declined
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                analytics_storage: 'denied',
            });
        }
    };

    if (!show) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
        >
            <div className="max-w-7xl mx-auto bg-background border rounded-lg shadow-lg p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-start gap-3 flex-1">
                        <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <div className="space-y-1.5">
                            <h3 className="font-semibold text-sm sm:text-base">
                                We value your privacy
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                We use cookies to enhance your browsing experience, serve personalized content,
                                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                                Read our{' '}
                                <a
                                    href="/policies/privacy"
                                    className="underline hover:text-foreground"
                                >
                                    Privacy Policy
                                </a>{' '}
                                to learn more.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto sm:flex-shrink-0">
                        <Button
                            variant="outline"
                            onClick={decline}
                            className="flex-1 sm:flex-none"
                        >
                            Decline
                        </Button>
                        <Button
                            onClick={accept}
                            className="flex-1 sm:flex-none"
                        >
                            Accept All
                        </Button>
                    </div>

                    <button
                        onClick={decline}
                        className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
