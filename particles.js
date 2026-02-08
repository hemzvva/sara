export class HeartParticles {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#f472b6', '#ffdae9', '#ec4899', '#fbcfe8'];
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 20,
            size: Math.random() * 12 + 4,
            speed: Math.random() * 1.5 + 0.5,
            wiggle: Math.random() * 2,
            opacity: Math.random() * 0.4 + 0.1,
            color: this.colors[Math.floor(Math.random() * this.colors.length)]
        };
    }

    drawHeart(x, y, size, color, opacity) {
        const ctx = this.ctx;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.fillStyle = color;

        const d = size;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-d/2, -d/2, -d, d/3, 0, d);
        ctx.bezierCurveTo(d, d/3, d/2, -d/2, 0, 0);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.particles.length < 40 && Math.random() < 0.03) {
            this.particles.push(this.createParticle());
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.y -= p.speed;
            p.x += Math.sin(p.y / 50) * p.wiggle;
            
            this.drawHeart(p.x, p.y, p.size, p.color, p.opacity);

            if (p.y < -50) {
                this.particles.splice(i, 1);
            }
        }
        requestAnimationFrame(() => this.update());
    }
}
