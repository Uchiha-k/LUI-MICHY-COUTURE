'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Ruler, Info, CheckCircle2 } from 'lucide-react';

const MEASUREMENT_STEPS = [
    {
        id: 'bust',
        label: 'Bust',
        description: 'Measure around the fullest part of your bust, keeping the tape parallel to the floor.',
        image: '/images/hero-lui-michy.jpg' // Using hero image as placeholder/background
    },
    {
        id: 'waist',
        label: 'Natural Waist',
        description: 'Measure around the narrowest part of your waistline, usually above the belly button.',
        image: '/images/bespoke-couture.jpg'
    },
    {
        id: 'hips',
        label: 'Hips',
        description: 'Measure around the fullest part of your hips, approximately 8 inches below your waist.',
        image: '/images/bridal-collection.jpg'
    }
];

interface MeasurementGuideProps {
    children?: React.ReactNode;
}

export function MeasurementGuide({ children }: MeasurementGuideProps) {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children || (
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-all">
                        <Ruler size={14} /> Measurement Guide
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-none border-none">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Visual Side */}
                    <div className="relative aspect-square md:aspect-auto h-full bg-muted overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 z-10" />
                        <img
                            src={MEASUREMENT_STEPS[activeStep].image}
                            alt={MEASUREMENT_STEPS[activeStep].label}
                            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="text-center p-12">
                                <h3 className="text-white text-7xl font-black italic font-serif opacity-20">LUI MICHY</h3>
                            </div>
                        </div>
                        <div className="absolute bottom-8 left-8 z-20 text-white space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Step 0{activeStep + 1}</span>
                            <h4 className="text-4xl font-black uppercase tracking-tighter">{MEASUREMENT_STEPS[activeStep].label}</h4>
                        </div>
                    </div>

                    {/* Guide Side */}
                    <div className="p-12 space-y-12">
                        <DialogHeader>
                            <DialogTitle className="text-xs font-black uppercase tracking-[0.4em] mb-4">Precision Sizing</DialogTitle>
                            <p className="text-sm font-medium text-black/40 uppercase tracking-widest leading-relaxed">
                                Follow our master atelier guidance for a perfect silhouette. Ensure you are wearing minimal undergarments for accuracy.
                            </p>
                        </DialogHeader>

                        <div className="space-y-8">
                            {MEASUREMENT_STEPS.map((step, i) => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(i)}
                                    className={`w-full flex items-start gap-6 text-left group transition-all ${activeStep === i ? 'opacity-100' : 'opacity-30 hover:opacity-50'
                                        }`}
                                >
                                    <span className={`text-xs font-black p-2 border ${activeStep === i ? 'border-black' : 'border-transparent'}`}>
                                        {activeStep > i ? <CheckCircle2 size={12} className="text-black" /> : `0${i + 1}`}
                                    </span>
                                    <div>
                                        <h5 className="text-sm font-black uppercase tracking-widest mb-1">{step.label}</h5>
                                        {activeStep === i && (
                                            <p className="text-xs text-black/60 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2 duration-500">
                                                {step.description}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-black/5">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <Info size={14} />
                                <span>Measurements are recorded in Inches</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
