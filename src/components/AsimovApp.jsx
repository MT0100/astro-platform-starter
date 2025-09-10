import React, { useState, useEffect, useRef } from 'react';

const AsimovApp = () => {
    const [currentLanguage, setCurrentLanguage] = useState('tr');
    const [currentPage, setCurrentPage] = useState('isaac');
    const [loading, setLoading] = useState(true);
    const [speed, setSpeed] = useState(0);

    const [carRotation, setCarRotation] = useState(0);
    const [techCarRotation, setTechCarRotation] = useState(0);

    const galleryTrackRef = useRef(null);
    const specsRef = useRef([]);

    const translations = {
        tr: {
            isaac: 'ISAAC', about: 'HAKKIMIZDA', contact: 'İLETİŞİM', ec: 'EC',
            heroTitle1: 'OTONOM', heroTitle2: 'SÜRÜŞÜN GELECEĞİ',
            heroSubtitle: "ASIMOV'un son teknoloji yapay zeka sistemleri ve benzersiz güvenlik özellikleri ile otonom sürüş devrimini deneyimleyin.",
            reserveNow: 'ŞİMDİ REZERVE ET', learnMore: 'DAHA FAZLA BİLGİ',
            techTitle1: 'TEKNİK', techTitle2: 'ÖZELLİKLER',
            techDetailsBtn: 'TEKNİK DETAYLAR',
            spec1Title: 'Yapay Zeka Sinir Ağı', spec1Desc: 'Gerçek zamanlı karar verme ve engel kaçınma için 1.2 trilyon parametreli gelişmiş 12 çekirdekli kuantum sinir işlemcisi.',
            spec2Title: 'Batarya Menzili', spec2Desc: 'Tek şarjla 800km menzil sunan yeni nesil katı hal bataryası. Hızlı şarj özelliği: Sadece 15 dakikada %10-80.',
            spec3Title: 'Sensör Dizisi', spec3Desc: '300 metreye kadar tam çevresel farkındalık sağlayan 16 yüksek çözünürlüklü kamera ve ultrasonik sensörlerle 360° LiDAR sistemi.',
            spec4Title: 'Performans', spec4Desc: '1.200 beygir gücü sunan dörtlü motor konfigürasyonu. Optimal yol tutuş için akıllı tork vektörleme ile 0-100 km/s 2.3 saniyede.',
            spec5Title: 'Güvenlik Sistemleri', spec5Desc: '%99.98 doğrulukla öngörülü çarpışma kaçınma. 12 hava yastığı ve acil durum otonom kaçınma protokolleri ile güçlendirilmiş karbon fiber çerçeve.',
            spec6Title: 'Bağlantı', spec6Desc: 'Sürekli kablosuz güncellemeler ve gerçek zamanlı trafik optimizasyonu için uydu bağlantısı ile entegre 6G ağ yetenekleri.',
            aboutTitle: 'HAKKIMIZDA', aboutContent: 'Bu sayfa henüz hazırlanmaktadır...',
            contactTitle: 'İLETİŞİM', contactContent: 'Bu sayfa henüz hazırlanmaktadır...',
            ecTitle: 'EC', ecContent: 'Bu sayfa henüz hazırlanmaktadır...',
            loadingText: 'SİSTEMLER BAŞLATILIYOR',
            footerCopyright: '© 2023 ASIMOV Otonom Araçlar. Tüm hakları saklıdır.',
            privacyPolicy: 'Gizlilik Politikası', termsOfService: 'Hizmet Şartları', contactFooter: 'İletişim'
        },
        en: {
            isaac: 'ISAAC', about: 'ABOUT', contact: 'CONTACT', ec: 'EC',
            heroTitle1: 'AUTONOMOUS', heroTitle2: 'DRIVING',
            heroSubtitle: "Experience the revolution in self-driving technology with ASIMOV's cutting-edge AI systems and unparalleled safety features.",
            reserveNow: 'RESERVE NOW', learnMore: 'LEARN MORE',
            techTitle1: 'TECHNICAL', techTitle2: 'SPECIFICATIONS',
            techDetailsBtn: 'TECHNICAL DETAILS',
            spec1Title: 'AI Neural Network', spec1Desc: 'Advanced 12-core quantum neural processor with 1.2 trillion parameters for real-time decision making and obstacle avoidance.',
            spec2Title: 'Battery Range', spec2Desc: 'Next-gen solid-state battery with 800km range on a single charge. Fast charging capability: 10-80% in just 15 minutes.',
            spec3Title: 'Sensor Array', spec3Desc: '360° LiDAR system with 16 high-definition cameras and ultrasonic sensors providing complete environmental awareness up to 300 meters.',
            spec4Title: 'Performance', spec4Desc: 'Quad motor configuration delivering 1,200 horsepower. 0-100 km/h in 2.3 seconds with intelligent torque vectoring for optimal handling.',
            spec5Title: 'Safety Systems', spec5Desc: 'Predictive collision avoidance with 99.98% accuracy. Reinforced carbon-fiber frame with 12 airbags and emergency autonomous evasion protocols.',
            spec6Title: 'Connectivity', spec6Desc: 'Integrated 6G network capabilities with satellite uplink for continuous over-the-air updates and real-time traffic optimization.',
            aboutTitle: 'ABOUT US', aboutContent: 'This page is under construction...',
            contactTitle: 'CONTACT', contactContent: 'This page is under construction...',
            ecTitle: 'EC', ecContent: 'This page is under construction...',
            loadingText: 'INITIALIZING SYSTEMS',
            footerCopyright: '© 2023 ASIMOV Autonomous Vehicles. All rights reserved.',
            privacyPolicy: 'Privacy Policy', termsOfService: 'Terms of Service', contactFooter: 'Contact'
        }
    };
    
    const t = translations[currentLanguage];

    const toggleLanguage = () => {
        setCurrentLanguage(prev => prev === 'tr' ? 'en' : 'tr');
    };

    // Loading screen and particles effect
    useEffect(() => {
        let speedInterval;
        if (loading) {
            let currentSpeed = 0;
            let direction = 1;
            speedInterval = setInterval(() => {
                currentSpeed += 2 * direction;
                if (currentSpeed >= 100) {
                    direction = -1;
                }
                if (currentSpeed <= 0 && direction === -1) {
                    clearInterval(speedInterval);
                    setTimeout(() => setLoading(false), 500);
                }
                setSpeed(currentSpeed);
            }, 20);
        }

        const particlesContainer = document.getElementById('particles');
        const createdParticles = [];
        const animateParticle = (particle) => {
            const duration = Math.random() * 15000 + 10000;
            const xDistance = (Math.random() - 0.5) * 100;
            const yDistance = (Math.random() - 0.5) * 100;
            
            particle.style.transition = `transform ${duration}ms linear, opacity ${duration}ms ease-in-out`;
            particle.style.transform = `translate(${xDistance}vw, ${yDistance}vh)`;
            particle.style.opacity = Math.random() * 0.5;
            
            setTimeout(() => {
                particle.style.transition = 'none';
                particle.style.transform = 'translate(0, 0)';
                setTimeout(() => animateParticle(particle), 100);
            }, duration);
        };
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 2 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particlesContainer.appendChild(particle);
            createdParticles.push(particle);
            animateParticle(particle);
        }

        return () => {
            clearInterval(speedInterval);
            createdParticles.forEach(p => p.remove());
        };
    }, []);

    // Gallery scroll effect
    useEffect(() => {
        if (!galleryTrackRef.current) return;

        const track = galleryTrackRef.current;
        const items = Array.from(track.children);
        items.forEach(item => track.appendChild(item.cloneNode(true)));
        
        let position = 0;
        const itemWidth = items[0].offsetWidth + 30;

        const scrollInterval = setInterval(() => {
            position -= 1;
            if (Math.abs(position) >= itemWidth * items.length) {
                position = 0;
            }
            track.style.transform = `translateX(${position}px)`;
        }, 30);

        return () => clearInterval(scrollInterval);
    }, [loading]); // Run after loading is complete

    // Tech specs highlight effect
    useEffect(() => {
        const specs = specsRef.current.filter(Boolean);
        if (specs.length === 0) return;
        
        let currentIndex = 0;
        specs[currentIndex].classList.add('active');

        const specInterval = setInterval(() => {
            specs[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % specs.length;
            specs[currentIndex].classList.add('active');
        }, 10000);

        return () => clearInterval(specInterval);
    }, [loading]);


    const scrollToTech = () => {
        const techSection = document.getElementById('tech');
        if (techSection) {
            techSection.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>
            {loading && (
                <div className="loading-screen" style={{ opacity: loading ? 1 : 0 }}>
                    <div className="speedometer">
                        <div className="speedometer-circle">
                            <div className="speedometer-needle" style={{ transform: `rotate(${-90 + (speed * 1.8)}deg)` }}></div>
                            <div className="speedometer-center"></div>
                        </div>
                        <div className="speed-value">{Math.round(speed)}</div>
                        <div className="speed-unit">km/h</div>
                    </div>
                    <h2 className="orbitron text-2xl neon-blue-glow">{t.loadingText}</h2>
                </div>
            )}
            
            <div style={{ display: loading ? 'none' : 'block' }}>
                <nav className="fixed top-0 left-0 w-full z-50 glassmorphism bg-opacity-80 px-6 py-4">
                    <div className="container mx-auto flex justify-center items-center">
                        <div className="flex items-center">
                            <svg className="w-10 h-10 mr-3" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="45" stroke="#00ffff" strokeWidth="2"/>
                                <path d="M30 30L70 70M30 70L70 30" stroke="#00ffff" strokeWidth="2"/>
                                <circle cx="50" cy="50" r="20" stroke="#ff1b1b" strokeWidth="2"/>
                            </svg>
                            <h1 className="orbitron text-2xl font-bold text-white">
                                <span className="neon-blue-glow">ASIMOV</span>
                            </h1>
                        </div>
                    </div>
                </nav>

                <nav className="fixed bottom-0 left-0 w-full z-50 glassmorphism bg-opacity-90 px-4 py-3">
                    <div className="container mx-auto">
                        <div className="flex justify-around items-center">
                            <a href="#" className="nav-link text-white hover:text-cyan-400 transition-colors text-center flex flex-col items-center py-2" onClick={(e) => {e.preventDefault(); setCurrentPage('isaac')}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                <span className="text-xs orbitron">{t.isaac}</span>
                            </a>
                            <a href="#" className="nav-link text-white hover:text-cyan-400 transition-colors text-center flex flex-col items-center py-2" onClick={(e) => {e.preventDefault(); setCurrentPage('about')}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span className="text-xs orbitron">{t.about}</span>
                            </a>
                            <a href="#" className="nav-link text-white hover:text-cyan-400 transition-colors text-center flex flex-col items-center py-2" onClick={(e) => {e.preventDefault(); setCurrentPage('contact')}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span className="text-xs orbitron">{t.contact}</span>
                            </a>
                            <a href="#" className="nav-link text-white hover:text-cyan-400 transition-colors text-center flex flex-col items-center py-2" onClick={(e) => {e.preventDefault(); setCurrentPage('ec')}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                <span className="text-xs orbitron">{t.ec}</span>
                            </a>
                            <button onClick={toggleLanguage} className="nav-link text-white hover:text-cyan-400 transition-colors text-center flex flex-col items-center py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                                <span className="text-xs orbitron">{currentLanguage === 'tr' ? 'EN' : 'TR'}</span>
                            </button>
                        </div>
                    </div>
                </nav>

                <main>
                    <div id="isaac-page" className={`page-content ${currentPage !== 'isaac' ? 'hidden' : ''}`}>
                         {/* Hero, Gallery, Tech Section, Footer */}
                        <section className="min-h-screen pt-24 pb-20 px-6 flex flex-col justify-center items-center relative">
                            <div className="container mx-auto text-center">
                                <h1 className="orbitron text-4xl md:text-6xl font-bold mb-6 fade-in">
                                    <span className="text-white">THE FUTURE OF </span>
                                    <span className="red-glow text-red-500">{t.heroTitle1}</span>
                                    <span className="text-white"> {t.heroTitle2}</span>
                                </h1>
                                <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300 fade-in delay-100">
                                    {t.heroSubtitle}
                                </p>
                                <div className="flex flex-wrap justify-center gap-6 fade-in delay-200">
                                    <button className="bg-red-600 text-white px-8 py-3 rounded-full orbitron button-glow">
                                        {t.reserveNow}
                                    </button>
                                    <button className="border border-cyan-400 text-cyan-400 px-8 py-3 rounded-full orbitron hover:bg-cyan-400/10 transition-colors">
                                        {t.learnMore}
                                    </button>
                                </div>
                            </div>
                            
                            {/* 3D Car Model */}
                            <div className="w-full max-w-5xl mx-auto mt-20 fade-in delay-300">
                                <h2 className="orbitron text-3xl font-bold mb-8 text-center">
                                    <span className="neon-blue-glow">ASIMOV</span> <span className="red-glow">NEXUS</span>
                                </h2>
                                <div className="car-model-container">
                                    <div className="car-model" style={{ transform: `rotateY(${carRotation}deg)` }}>
                                        <div className="car-face" style={{ transform: 'rotateY(0deg) translateZ(200px)' }}> {/* Placeholder translateZ */}
                                           <svg className="w-full max-w-lg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150 300 L650 300 L600 200 L200 200 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M200 200 L600 200 L550 150 L250 150 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2"/><rect x="250" y="170" width="300" height="20" fill="#00ffff" opacity="0.3"/><circle cx="250" cy="250" r="40" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="250" cy="250" r="30" fill="#1a1a2e" stroke="#ff1b1b" strokeWidth="1"/><circle cx="250" cy="250" r="15" fill="#ff1b1b" opacity="0.7"/><circle cx="550" cy="250" r="40" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="550" cy="250" r="30" fill="#1a1a2e" stroke="#ff1b1b" strokeWidth="1"/><circle cx="550" cy="250" r="15" fill="#ff1b1b" opacity="0.7"/><path d="M300 170 L500 170 L480 155 L320 155 Z" fill="#00ffff" opacity="0.5"/></svg>
                                        </div>
                                        <div className="car-face" style={{ transform: 'rotateY(90deg) translateZ(200px)' }}>
                                           <svg className="w-full max-w-lg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 300 L700 300 L650 250 L200 250 L150 280 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M200 250 L650 250 L600 180 L250 180 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2"/><path d="M250 180 L600 180 L580 150 L270 150 Z" fill="#0f0f0f" stroke="#00ffff" strokeWidth="2"/><rect x="300" y="200" width="250" height="30" fill="#00ffff" opacity="0.2"/><circle cx="220" cy="300" r="30" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="220" cy="300" r="15" fill="#ff1b1b" opacity="0.7"/><circle cx="580" cy="300" r="30" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="580" cy="300" r="15" fill="#ff1b1b" opacity="0.7"/></svg>
                                        </div>
                                        <div className="car-face" style={{ transform: 'rotateY(180deg) translateZ(200px)' }}>
                                           <svg className="w-full max-w-lg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150 300 L650 300 L600 200 L200 200 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M200 200 L600 200 L550 150 L250 150 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2"/><rect x="200" y="220" width="400" height="10" fill="#ff1b1b" opacity="0.7"/><circle cx="250" cy="250" r="40" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="250" cy="250" r="30" fill="#1a1a2e" stroke="#ff1b1b" strokeWidth="1"/><circle cx="250" cy="250" r="15" fill="#ff1b1b" opacity="0.7"/><circle cx="550" cy="250" r="40" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="550" cy="250" r="30" fill="#1a1a2e" stroke="#ff1b1b" strokeWidth="1"/><circle cx="550" cy="250" r="15" fill="#ff1b1b" opacity="0.7"/></svg>
                                        </div>
                                        <div className="car-face" style={{ transform: 'rotateY(270deg) translateZ(200px)' }}>
                                           <svg className="w-full max-w-lg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 300 L700 300 L650 250 L200 250 L150 280 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M200 250 L650 250 L600 180 L250 180 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2"/><path d="M250 180 L600 180 L580 150 L270 150 Z" fill="#0f0f0f" stroke="#00ffff" strokeWidth="2"/><rect x="300" y="200" width="250" height="30" fill="#00ffff" opacity="0.2"/><circle cx="220" cy="300" r="30" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="220" cy="300" r="15" fill="#ff1b1b" opacity="0.7"/><circle cx="580" cy="300" r="30" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="580" cy="300" r="15" fill="#ff1b1b" opacity="0.7"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="rotate-controls">
                                    <button className="rotate-btn" onClick={() => setCarRotation(r => r - 90)}>ROTATE LEFT</button>
                                    <button className="rotate-btn" onClick={() => setCarRotation(r => r + 90)}>ROTATE RIGHT</button>
                                </div>
                            </div>
                            
                            {/* Gallery */}
                            <div className="w-full max-w-5xl mx-auto mt-16 fade-in delay-400">
                                <div className="gallery">
                                    <div className="gallery-track" ref={galleryTrackRef}>
                                       {/* Gallery items here, will be duplicated by useEffect */}
                                       <div className="gallery-item glassmorphism"><svg className="w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 150 L250 150 L230 80 L70 80 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M70 80 L230 80 L210 50 L90 50 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2"/><rect x="100" y="70" width="100" height="10" fill="#00ffff" opacity="0.3"/><circle cx="100" cy="130" r="20" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="100" cy="130" r="10" fill="#ff1b1b" opacity="0.7"/><circle cx="200" cy="130" r="20" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="200" cy="130" r="10" fill="#ff1b1b" opacity="0.7"/></svg></div>
                                       <div className="gallery-item glassmorphism"><svg className="w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 150 L270 150 L250 120 L70 120 L50 140 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M70 120 L250 120 L230 70 L90 70 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2"/><rect x="100" y="90" width="120" height="15" fill="#00ffff" opacity="0.2"/><circle cx="90" cy="150" r="15" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="90" cy="150" r="7" fill="#ff1b1b" opacity="0.7"/><circle cx="210" cy="150" r="15" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="210" cy="150" r="7" fill="#ff1b1b" opacity="0.7"/></svg></div>
                                       <div className="gallery-item glassmorphism"><svg className="w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M75 50 L225 50 L250 150 L50 150 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><rect x="90" y="70" width="120" height="60" fill="#16213e" stroke="#00ffff" strokeWidth="1"/><path d="M90 70 L210 70 L200 100 L100 100 Z" fill="#00ffff" opacity="0.2"/><circle cx="80" cy="120" r="10" fill="#ff1b1b" opacity="0.5"/><circle cx="220" cy="120" r="10" fill="#ff1b1b" opacity="0.5"/></svg></div>
                                       <div className="gallery-item glassmorphism"><svg className="w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 150 L250 150 L230 80 L70 80 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M70 80 L230 80 L210 50 L90 50 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2"/><rect x="70" y="100" width="160" height="5" fill="#ff1b1b" opacity="0.7"/><circle cx="100" cy="130" r="20" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="100" cy="130" r="10" fill="#ff1b1b" opacity="0.7"/><circle cx="200" cy="130" r="20" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="200" cy="130" r="10" fill="#ff1b1b" opacity="0.7"/></svg></div>
                                       <div className="gallery-item glassmorphism"><svg className="w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="50" width="240" height="100" rx="10" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M50 80 L250 80" stroke="#00ffff" strokeWidth="1" strokeDasharray="5 5"/><rect x="70" y="100" width="160" height="30" rx="5" fill="#16213e" stroke="#00ffff" strokeWidth="1"/><circle cx="150" cy="115" r="10" fill="#ff1b1b" opacity="0.7"/><rect x="180" y="105" width="30" height="20" rx="3" fill="#00ffff" opacity="0.3"/></svg></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 text-center fade-in delay-500">
                                <button onClick={scrollToTech} className="bg-red-600 text-white px-10 py-4 rounded-full orbitron text-xl button-glow">
                                    {t.techDetailsBtn}
                                </button>
                            </div>
                        </section>

                        <section id="tech" className="min-h-screen py-20 pb-24 px-6">
                           <div className="container mx-auto">
                                <h2 className="orbitron text-4xl font-bold mb-16 text-center">
                                    <span className="red-glow">{t.techTitle1}</span> <span className="neon-blue-glow">{t.techTitle2}</span>
                                </h2>
                                <div className="flex flex-col lg:flex-row gap-12">
                                    <div className="lg:w-1/2">
                                       <div className="car-model-container">
                                        <div className="car-model" style={{ transform: `rotateY(${techCarRotation}deg)` }}>
                                           {/* Tech car faces */}
                                            <div className="car-face" style={{ transform: 'rotateY(0deg) translateZ(200px)' }}><svg className="w-full max-w-lg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150 300 L650 300 L600 200 L200 200 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M200 200 L600 200 L550 150 L250 150 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2" strokeDasharray="5 5"/><path d="M250 150 L550 150 L500 100 L300 100 Z" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><rect x="350" y="120" width="100" height="20" fill="#ff1b1b" opacity="0.5"/><circle cx="380" cy="130" r="8" fill="#00ffff"/><circle cx="420" cy="130" r="8" fill="#00ffff"/><rect x="330" y="110" width="140" height="5" fill="#00ffff" opacity="0.7"/><rect x="330" y="145" width="140" height="5" fill="#00ffff" opacity="0.7"/><circle cx="250" cy="250" r="40" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="250" cy="250" r="15" fill="#ff1b1b" opacity="0.7"/><circle cx="550" cy="250" r="40" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="550" cy="250" r="15" fill="#ff1b1b" opacity="0.7"/></svg></div>
                                            <div className="car-face" style={{ transform: 'rotateY(90deg) translateZ(200px)' }}><svg className="w-full max-w-lg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 300 L700 300 L650 250 L200 250 L150 280 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M200 250 L650 250 L600 180 L250 180 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2" opacity="0.5"/><rect x="300" y="200" width="250" height="40" fill="#0f0f0f" stroke="#00ffff" strokeWidth="1"/><circle cx="400" cy="220" r="15" fill="#ff1b1b" opacity="0.7"/><rect x="450" y="210" width="60" height="20" rx="3" fill="#00ffff" opacity="0.3"/><circle cx="220" cy="300" r="30" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="220" cy="300" r="15" fill="#ff1b1b" opacity="0.7"/><circle cx="580" cy="300" r="30" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="580" cy="300" r="15" fill="#ff1b1b" opacity="0.7"/></svg></div>
                                            <div className="car-face" style={{ transform: 'rotateY(180deg) translateZ(200px)' }}><svg className="w-full max-w-lg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150 300 L650 300 L600 200 L200 200 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M200 200 L600 200 L550 150 L250 150 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2" strokeDasharray="5 5"/><rect x="300" y="170" width="200" height="30" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="1"/><rect x="320" y="180" width="160" height="10" fill="#ff1b1b" opacity="0.3"/><circle cx="250" cy="250" r="40" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="250" cy="250" r="15" fill="#ff1b1b" opacity="0.7"/><circle cx="550" cy="250" r="40" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="550" cy="250" r="15" fill="#ff1b1b" opacity="0.7"/></svg></div>
                                            <div className="car-face" style={{ transform: 'rotateY(270deg) translateZ(200px)' }}><svg className="w-full max-w-lg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 300 L700 300 L650 250 L200 250 L150 280 Z" fill="#1a1a2e" stroke="#00ffff" strokeWidth="2"/><path d="M200 250 L650 250 L600 180 L250 180 Z" fill="#16213e" stroke="#00ffff" strokeWidth="2" opacity="0.5"/><rect x="300" y="230" width="250" height="10" fill="#00ffff" opacity="0.7"/><rect x="320" y="210" width="50" height="20" fill="#00ffff" opacity="0.3"/><rect x="380" y="210" width="50" height="20" fill="#00ffff" opacity="0.3"/><rect x="440" y="210" width="50" height="20" fill="#00ffff" opacity="0.3"/><rect x="500" y="210" width="50" height="20" fill="#00ffff" opacity="0.3"/><circle cx="220" cy="300" r="30" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="220" cy="300" r="15" fill="#ff1b1b" opacity="0.7"/><circle cx="580" cy="300" r="30" fill="#0f0f0f" stroke="#ff1b1b" strokeWidth="2"/><circle cx="580" cy="300" r="15" fill="#ff1b1b" opacity="0.7"/></svg></div>
                                        </div>
                                       </div>
                                       <div className="rotate-controls">
                                            <button className="rotate-btn" onClick={() => setTechCarRotation(r => r - 90)}>ROTATE LEFT</button>
                                            <button className="rotate-btn" onClick={() => setTechCarRotation(r => r + 90)}>ROTATE RIGHT</button>
                                       </div>
                                    </div>
                                    <div className="lg:w-1/2">
                                       <div className="glassmorphism p-8">
                                            <ul className="space-y-6">
                                                {[1, 2, 3, 4, 5, 6].map(i => (
                                                    <li key={i} ref={el => specsRef.current[i-1] = el} className="tech-spec p-4 glassmorphism">
                                                        <h3 className="orbitron text-xl font-bold mb-2">{t[`spec${i}Title`]}</h3>
                                                        <p>{t[`spec${i}Desc`]}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                       </div>
                                    </div>
                                </div>
                           </div>
                        </section>

                        <footer className="py-12 pb-20 px-6 border-t border-cyan-900">
                            <div className="container mx-auto">
                                <p className="text-gray-500 text-sm text-center">{t.footerCopyright}</p>
                            </div>
                        </footer>
                    </div>

                    <div id="about-page" className={`page-content ${currentPage !== 'about' ? 'hidden' : ''}`}>
                        <section className="min-h-screen pt-24 pb-20 px-6 flex flex-col justify-center items-center">
                            <div className="container mx-auto text-center">
                                <h1 className="orbitron text-4xl md:text-6xl font-bold mb-6"><span className="neon-blue-glow">{t.aboutTitle}</span></h1>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.aboutContent}</p>
                            </div>
                        </section>
                    </div>

                    <div id="contact-page" className={`page-content ${currentPage !== 'contact' ? 'hidden' : ''}`}>
                        <section className="min-h-screen pt-24 pb-20 px-6 flex flex-col justify-center items-center">
                            <div className="container mx-auto text-center">
                                <h1 className="orbitron text-4xl md:text-6xl font-bold mb-6"><span className="neon-blue-glow">{t.contactTitle}</span></h1>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.contactContent}</p>
                            </div>
                        </section>
                    </div>

                    <div id="ec-page" className={`page-content ${currentPage !== 'ec' ? 'hidden' : ''}`}>
                         <section className="min-h-screen pt-24 pb-20 px-6 flex flex-col justify-center items-center">
                            <div className="container mx-auto text-center">
                                <h1 className="orbitron text-4xl md:text-6xl font-bold mb-6"><span className="neon-blue-glow">{t.ecTitle}</span></h1>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.ecContent}</p>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AsimovApp;
