import { HeartParticles } from './particles.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();


    const particles = new HeartParticles('heartCanvas');
    particles.update();

    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const questionCard = document.getElementById('questionCard');
    const letterView = document.getElementById('letterView');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const audioToggle = document.getElementById('audioToggle');
    const bgMusic = document.getElementById('bgMusic');
    const muteIcon = document.getElementById('muteIcon');
    const unmuteIcon = document.getElementById('unmuteIcon');

    let yesScale = 1;


    audioToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Interaction required"));
            muteIcon.classList.add('hidden');
            unmuteIcon.classList.remove('hidden');
        } else {
            bgMusic.pause();
            muteIcon.classList.remove('hidden');
            unmuteIcon.classList.add('hidden');
        }
    });


    const dodge = (e) => {

        yesScale += 0.12;
        gsap.to(yesBtn, {
            scale: yesScale,
            duration: 0.4,
            ease: "back.out(2)"
        });


        const padding = 100; // Keep away from edges
        const btnRect = noBtn.getBoundingClientRect();
        const winW = window.innerWidth;
        const winH = window.innerHeight;


        let targetX, targetY;
        

        const currentX = btnRect.left;
        const currentY = btnRect.top;


        targetX = Math.random() * (winW - btnRect.width - padding * 2) + padding;
        targetY = Math.random() * (winH - btnRect.height - padding * 2) + padding;


        const yesRect = yesBtn.getBoundingClientRect();
        const buffer = 150;
        
        if (targetX > yesRect.left - buffer && targetX < yesRect.right + buffer &&
            targetY > yesRect.top - buffer && targetY < yesRect.bottom + buffer) {

            targetX = targetX < winW / 2 ? padding : winW - btnRect.width - padding;
        }

        if (noBtn.style.position !== 'fixed') {
            noBtn.style.position = 'fixed';
            noBtn.style.zIndex = '1000';
        }

        gsap.to(noBtn, {
            left: targetX,
            top: targetY,
            x: 0,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            onStart: () => {

                gsap.to(noBtn, { rotation: Math.random() * 20 - 10, duration: 0.1 });
            }
        });
    };

    noBtn.addEventListener('mouseenter', dodge);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodge();
    });


    yesBtn.addEventListener('click', () => {

        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        
        const shoot = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#f472b6', '#d4af37']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#f472b6', '#d4af37']
            });

            if (Date.now() < animationEnd) {
                requestAnimationFrame(shoot);
            }
        };
        shoot();


        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
            muteIcon.classList.add('hidden');
            unmuteIcon.classList.remove('hidden');
        }


        const tl = gsap.timeline();
        
        tl.to(questionCard, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            ease: "power4.in",
            onComplete: () => {
                questionCard.classList.add('hidden');
                noBtn.style.display = 'none';
                letterView.classList.remove('hidden');
            }
        });

        tl.to(letterView, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "expo.out"
        }, "+=0.2");

        tl.to(birthdayMessage, {
            opacity: 1,
            duration: 2,
            ease: "power1.inOut"
        });


        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#f472b6', '#ffd700', '#ffffff']
        });
    });
});
