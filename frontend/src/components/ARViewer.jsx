import React, { useEffect, useState, useRef } from 'react';
import '@google/model-viewer';

const ARViewer = ({
    modelSrc = '/models/god_osiris.glb',
    posterSrc = null,
    alt = '3D Artifact Model',
    title = 'Ancient Artifact',
    description = 'Explore this artifact in stunning 3D detail',
    showQROnDesktop = true,
    className = ''
}) => {
    const [currentUrl, setCurrentUrl] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        // Get current URL for QR code
        setCurrentUrl(window.location.href);

        // Detect mobile device
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

        // Cleanup on unmount
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            setCameraError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Prefer rear camera on mobile
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setIsCameraActive(true);
            }
        } catch (error) {
            console.error('Camera access error:', error);
            setCameraError('Unable to access camera. Please check permissions.');
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsCameraActive(false);
        setCameraError(null);
    };

    const toggleCamera = () => {
        if (isCameraActive) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    return (
        <div className={`bg-[#FFF4E2] rounded-2xl shadow-xl shadow-[#472825]/10 p-6 border-2 border-[#D3AB80]/30 ${className}`}>

            {/* Header */}
            {title && (
                <div className="mb-6 text-center">
                    <h3 className="text-3xl font-bold text-[#472825] mb-2">{title}</h3>
                    {description && (
                        <p className="text-[#96786F] leading-relaxed max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Camera Error Alert */}
            {cameraError && (
                <div className="mb-4 bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                    <p className="font-semibold">Camera Error</p>
                    <p className="text-sm">{cameraError}</p>
                </div>
            )}

            {/* Main Grid: 3D Viewer + QR Code (Desktop) */}
            <div className={`grid gap-6 ${showQROnDesktop && !isMobile ? 'lg:grid-cols-3' : 'grid-cols-1'}`}>

                {/* 3D Model Viewer with Webcam Overlay */}
                <div className={showQROnDesktop && !isMobile ? 'lg:col-span-2' : 'col-span-1'}>
                    {/* Camera Simulator Toggle Button (Desktop Only) */}
                    {!isMobile && (
                        <div className="mb-4 flex justify-center">
                            <button
                                onClick={toggleCamera}
                                className={`
                                    ${isCameraActive
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-[#D3AB80] hover:bg-[#96786F]'
                                    }
                                    text-white font-bold px-6 py-3 rounded-full
                                    shadow-lg transition-all duration-300
                                    flex items-center gap-2
                                    hover:-translate-y-1 hover:shadow-xl
                                `}
                            >
                                {isCameraActive ? (
                                    <>
                                        <span>❌</span>
                                        <span>Close Camera</span>
                                    </>
                                ) : (
                                    <>
                                        <span>📸</span>
                                        <span>Open Camera Simulator</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* AR Viewfinder Container */}
                    <div className="relative bg-gradient-to-br from-[#FFF4E2] to-[#FDE4BC] rounded-xl overflow-hidden border-2 border-[#D3AB80]/40 shadow-lg"
                        style={{ height: '600px' }}>

                        {/* Layer 1: Webcam Video (Background) */}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isCameraActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                            style={{ zIndex: 1 }}
                        />

                        {/* Layer 2: 3D Model (Foreground) */}
                        <div
                            className="absolute inset-0"
                            style={{ zIndex: 2 }}
                        >
                            <model-viewer
                                src={modelSrc}
                                alt={alt}
                                poster={posterSrc}
                                shadow-intensity="1"
                                camera-controls
                                auto-rotate={!isCameraActive}
                                auto-rotate-delay="0"
                                rotation-per-second="30deg"
                                ar
                                ar-modes="webxr scene-viewer quick-look"
                                ar-scale="auto"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: isCameraActive ? 'transparent' : '#FFF4E2',
                                    '--poster-color': isCameraActive ? 'transparent' : '#FFF4E2'
                                }}
                            >
                                {/* Loading State */}
                                <div slot="poster" className="flex flex-col items-center justify-center h-full bg-[#FFF4E2]">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#D3AB80]"></div>
                                    <p className="mt-4 text-[#472825] font-semibold">Loading 3D Model...</p>
                                    <p className="text-[#96786F] text-sm mt-2">Preparing your artifact</p>
                                </div>

                                {/* Custom AR Button (Mobile) */}
                                <button
                                    slot="ar-button"
                                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10
                                               bg-[#D3AB80] hover:bg-[#96786F] 
                                               text-[#472825] hover:text-white 
                                               font-bold px-8 py-4 rounded-full 
                                               shadow-2xl shadow-[#472825]/30 
                                               transition-all duration-300 
                                               hover:-translate-y-1 hover:shadow-[#D3AB80]/50
                                               flex items-center gap-3
                                               border-2 border-[#472825]/10
                                               text-base md:text-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>View in Your Space 🏠✨</span>
                                </button>

                                {/* Progress Bar */}
                                <div slot="progress-bar" className="absolute bottom-0 left-0 right-0 h-2 bg-[#FDE4BC]">
                                    <div className="h-full bg-gradient-to-r from-[#D3AB80] to-[#96786F] transition-all duration-300"></div>
                                </div>
                            </model-viewer>
                        </div>

                        {/* AR Simulator Active Indicator */}
                        {isCameraActive && (
                            <div className="absolute top-4 left-4 z-30 bg-red-500/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border-2 border-white animate-pulse">
                                <p className="text-white text-sm font-bold flex items-center gap-2">
                                    <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
                                    AR SIMULATOR ACTIVE
                                </p>
                            </div>
                        )}

                        {/* Desktop Controls Hint */}
                        {!isCameraActive && (
                            <div className="hidden md:block absolute top-4 right-4 z-20 bg-[#FFF4E2]/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-[#D3AB80]/30">
                                <p className="text-[#472825] text-sm font-semibold flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D3AB80]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                    Drag to rotate • Scroll to zoom
                                </p>
                            </div>
                        )}

                        {/* Camera Active Instructions */}
                        {isCameraActive && (
                            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-[#D3AB80]/95 backdrop-blur-sm rounded-xl px-6 py-3 shadow-xl border-2 border-white max-w-md">
                                <p className="text-[#472825] font-bold text-center text-sm">
                                    🎮 Move your camera around! The 3D model stays in place like real AR.
                                    You can still rotate and zoom the artifact.
                                </p>
                            </div>
                        )}

                        {/* Mobile Touch Hint */}
                        {!isCameraActive && (
                            <div className="md:hidden absolute top-4 left-4 right-4 z-20 bg-[#FFF4E2]/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-[#D3AB80]/30">
                                <p className="text-[#472825] text-xs font-semibold text-center">
                                    👆 Touch to explore • Use AR button below
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* QR Code Panel (Desktop Only) */}
                {showQROnDesktop && !isMobile && (
                    <div className="lg:col-span-1 hidden lg:block">
                        <div className="bg-gradient-to-br from-[#FDE4BC] to-[#FFF4E2] rounded-xl p-6 border-2 border-[#D3AB80]/40 shadow-lg h-full flex flex-col justify-center">
                            <div className="text-center">
                                <h4 className="text-xl font-bold text-[#472825] mb-3 flex items-center justify-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D3AB80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    Mobile AR
                                </h4>
                                <p className="text-[#96786F] text-sm mb-4">
                                    Scan with your phone 📱
                                </p>

                                {/* QR Code */}
                                <div className="bg-white p-4 rounded-lg inline-block shadow-md border-2 border-[#D3AB80]/30">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}&bgcolor=FFF4E2&color=472825`}
                                        alt="QR Code for AR View"
                                        className="w-44 h-44"
                                    />
                                </div>

                                <p className="text-[#96786F] text-xs mt-4 leading-relaxed">
                                    Experience true AR on your smartphone
                                </p>

                                {/* Divider */}
                                <div className="my-4 h-px bg-[#D3AB80]/30"></div>

                                {/* Desktop Simulator Info */}
                                <div className="text-left bg-[#FFF4E2]/50 rounded-lg p-3 border border-[#D3AB80]/20">
                                    <p className="text-[#472825] font-semibold text-xs mb-2">💡 Desktop Tip:</p>
                                    <p className="text-[#96786F] text-xs leading-relaxed">
                                        Click "Camera Simulator" above to preview AR using your webcam (works with Camo Studio too!)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Features Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#FDE4BC] rounded-lg p-4 border border-[#D3AB80]/20 text-center">
                    <p className="text-[#96786F] text-sm font-semibold mb-1">Feature</p>
                    <p className="text-[#472825] font-bold">360° Rotation</p>
                </div>
                <div className="bg-[#FDE4BC] rounded-lg p-4 border border-[#D3AB80]/20 text-center">
                    <p className="text-[#96786F] text-sm font-semibold mb-1">Platform</p>
                    <p className="text-[#472825] font-bold">iOS & Android AR</p>
                </div>
                <div className="bg-[#FDE4BC] rounded-lg p-4 border border-[#D3AB80]/20 text-center">
                    <p className="text-[#96786F] text-sm font-semibold mb-1">Technology</p>
                    <p className="text-[#472825] font-bold">WebXR & WebGL</p>
                </div>
            </div>
        </div>
    );
};

export default ARViewer;
