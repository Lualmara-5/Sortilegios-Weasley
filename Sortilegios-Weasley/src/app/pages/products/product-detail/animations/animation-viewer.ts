// src/app/pages/products/product-detail/animations/animation-viewer.ts
import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getProductAnimation, ProductAnimation } from './product-animations';

@Component({
  selector: 'app-animation-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animation-wrapper" *ngIf="animation">
      <div class="animation-header">
        <h3 class="animation-title">✨ Demostración del Efecto Mágico</h3>
        <p class="animation-description">{{ animation.description }}</p>
      </div>

      <div class="animation-container">
        <!-- Animaciones CSS -->
        <div *ngIf="animation.animationType === 'css'" class="animation-stage">
          <div [class]="animation.cssClass">
            
            <!-- PRODUCTO 2: Galletas de canarios -->
            <div *ngIf="animation.id === 2">
              <div class="human-silhouette"></div>
              
              <div class="transform-sparkles">
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
              </div>
              
              <div class="canary-bird">
                <div class="canary-eye left"></div>
                <div class="canary-eye right"></div>
                <div class="canary-beak"></div>
              </div>
            </div>

            <!-- PRODUCTO 5: Orejas extensibles - PROFESIONAL -->
            <div *ngIf="animation.id === 5">
              <div class="spy-character">
                <div class="spy-eye left"></div>
                <div class="spy-eye right"></div>
                <div class="spy-eyebrow left"></div>
                <div class="spy-eyebrow right"></div>
                <div class="spy-mouth"></div>
                
                <div class="ear-base left"></div>
                <div class="ear-base right"></div>
              </div>
              
              <div class="extension-cable left"></div>
              <div class="extension-cable right"></div>
              
              <div class="audio-receiver left"></div>
              <div class="audio-receiver right"></div>
              
              <div class="signal-wave left"></div>
              <div class="signal-wave left"></div>
              <div class="signal-wave right"></div>
              <div class="signal-wave right"></div>
            </div>

          </div>
        </div>

        <!-- Animaciones Canvas -->
        <canvas
          *ngIf="animation.animationType === 'canvas'"
          #animationCanvas
          class="animation-canvas"
          width="600"
          height="400"
        ></canvas>
      </div>
      <div class="animation-controls">
        <button class="animation-btn" (click)="restartAnimation()">
          🔄 Ver de nuevo
        </button>
      </div>
    </div>

    <div class="no-animation" *ngIf="!animation && productId">
      <p>🪄 Esta demostración mágica aún no está disponible.</p>
      <p class="no-animation-hint">¡Pronto podrás ver los efectos de este sortilegio!</p>
    </div>
  `,
  styleUrls: ['./product-animations.css'],
  styles: [`
    .animation-wrapper {
      margin: 30px 0;
    }

    .animation-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .animation-title {
      font-family: 'Harry P', 'Cinzel Decorative', serif;
      color: var(--color-primary);
      font-size: 2rem;
      margin-bottom: 8px;
    }

    .animation-description {
      color: var(--color-accent);
      font-size: 1.1rem;
      font-style: italic;
    }

    .no-animation {
      text-align: center;
      padding: 60px 20px;
      background: #1a0a2e;
      border-radius: 16px;
      border: 2px dashed var(--color-primary);
      margin: 30px 0;
    }

    .no-animation p {
      font-size: 1.2rem;
      color: var(--color-text);
      margin: 8px 0;
    }

    .no-animation-hint {
      opacity: 0.7;
      font-size: 1rem !important;
    }
  `]
})
export class AnimationViewerComponent implements OnInit, OnDestroy {
  @Input() productId!: number;
  @ViewChild('animationCanvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  animation: ProductAnimation | null = null;
  private animationFrameId?: number;

  ngOnInit() {
    if (this.productId) {
      this.animation = getProductAnimation(this.productId);
      
      setTimeout(() => {
        if (this.animation?.animationType === 'canvas') {
          this.startCanvasAnimation();
        }
      }, 100);
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  restartAnimation() {
    if (this.animation?.animationType === 'css' && this.animation.cssClass) {
      const element = document.querySelector(`.${this.animation.cssClass}`);
      if (element) {
        const cssClass = this.animation.cssClass;
        element.classList.remove(cssClass);
        setTimeout(() => {
          element?.classList.add(cssClass);
        }, 10);
      }
    }
    
    if (this.animation?.animationType === 'canvas') {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      this.startCanvasAnimation();
    }
  }

  private startCanvasAnimation() {
    if (!this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.animation?.id === 1) {
      this.animateTongueCandy(ctx, canvas);
    } else if (this.animation?.id === 2) {  // ⬅️ AGREGAR ESTA LÍNEA
      this.animateCanaryTransform(ctx, canvas);  // ⬅️ Y ESTA
    } else if (this.animation?.id === 3) {
    }

  }
  // Animación del Caramelo Longuilinguo (ID 1)
  private animateTongueCandy(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    class MagicParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      hue: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.size = Math.random() * 3 + 1;
        this.hue = 320 + Math.random() * 40;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.01;
        this.vy -= 0.02;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life * 0.8;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, 1)`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 60%, 0.5)`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const particles: MagicParticle[] = [];
    let time = 0;

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const drawFace = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, tongueProgress: number) => {
      ctx.save();
      
      const headGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
      headGlow.addColorStop(0, 'rgba(255, 182, 193, 0.3)');
      headGlow.addColorStop(1, 'rgba(255, 182, 193, 0)');
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFE4B5';
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      const eyeScale = 1 + tongueProgress * 0.3;
      
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(centerX - 20, centerY - 10, 12 * eyeScale, 15 * eyeScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      ctx.fillStyle = '#4A2511';
      ctx.beginPath();
      ctx.arc(centerX - 20, centerY - 8, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(centerX - 17, centerY - 11, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(centerX + 20, centerY - 10, 12 * eyeScale, 15 * eyeScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      ctx.fillStyle = '#4A2511';
      ctx.beginPath();
      ctx.arc(centerX + 20, centerY - 8, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(centerX + 23, centerY - 11, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      const browLift = tongueProgress * 5;
      ctx.beginPath();
      ctx.arc(centerX - 20, centerY - 25 - browLift, 12, Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(centerX + 20, centerY - 25 - browLift, 12, Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();

      const blushIntensity = 0.3 + tongueProgress * 0.3;
      ctx.fillStyle = `rgba(255, 105, 180, ${blushIntensity})`;
      ctx.beginPath();
      ctx.arc(centerX - 35, centerY + 5, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX + 35, centerY + 5, 8, 0, Math.PI * 2);
      ctx.fill();

      const mouthWidth = 20 + tongueProgress * 10;
      const mouthHeight = 15 + tongueProgress * 5;
      
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 25, mouthWidth, mouthHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#2A1810';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 25, mouthWidth - 3, mouthHeight - 3, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawTongue = (ctx: CanvasRenderingContext2D, startX: number, startY: number, tongueProgress: number) => {
      const maxLength = 200;
      const currentLength = maxLength * tongueProgress;
      
      if (currentLength < 5) return;

      ctx.save();

      const segments = 25;
      const points = [];
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const y = startY + currentLength * t;
        
        const wave = Math.sin(t * Math.PI * 4 + time * 0.15) * 5 * tongueProgress * t;
        const x = startX + wave;
        
        points.push({ x, y });
      }

      const getWidth = (t: number) => {
        if (t < 0.1) {
          return 18;
        } else if (t < 0.7) {
          return 22 - t * 8;
        } else {
          return 14 * (1 - t);
        }
      };

      ctx.shadowColor = 'rgba(255, 105, 180, 0.8)';
      ctx.shadowBlur = 20;

      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const t = i / (points.length - 1);
        const width = getWidth(t);
        
        if (i === 0) {
          ctx.moveTo(points[i].x - width / 2, points[i].y);
        }
        
        ctx.lineTo(points[i].x - width / 2, points[i].y);
      }
      
      const lastPoint = points[points.length - 1];
      const tipSplit = 4;
      ctx.lineTo(lastPoint.x - tipSplit, lastPoint.y + 8);
      ctx.lineTo(lastPoint.x, lastPoint.y + 12);
      ctx.lineTo(lastPoint.x + tipSplit, lastPoint.y + 8);
      
      for (let i = points.length - 1; i >= 0; i--) {
        const t = i / (points.length - 1);
        const width = getWidth(t);
        ctx.lineTo(points[i].x + width / 2, points[i].y);
      }
      
      ctx.closePath();

      const gradient = ctx.createLinearGradient(startX, startY, startX, startY + currentLength);
      gradient.addColorStop(0, '#FF1493');
      gradient.addColorStop(0.5, '#FF69B4');
      gradient.addColorStop(1, '#FFB6C1');
      
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = '#C71585';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 0;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(199, 21, 133, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      for (let i = 1; i < points.length - 2; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      for (let i = 0; i < points.length - 3; i += 3) {
        const t = i / (points.length - 1);
        const width = getWidth(t);
        
        const shineGradient = ctx.createRadialGradient(
          points[i].x - width * 0.15, points[i].y, 0,
          points[i].x - width * 0.15, points[i].y, width / 2.5
        );
        shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = shineGradient;
        ctx.beginPath();
        ctx.ellipse(points[i].x - width * 0.15, points[i].y, width / 3, width / 4, -0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (tongueProgress > 0.3) {
        ctx.fillStyle = 'rgba(199, 21, 133, 0.3)';
        for (let i = 5; i < points.length - 5; i += 4) {
          const t = i / (points.length - 1);
          const width = getWidth(t);
          
          for (let j = 0; j < 3; j++) {
            const offsetX = (Math.random() - 0.5) * width * 0.6;
            const offsetY = Math.random() * 3;
            ctx.beginPath();
            ctx.arc(points[i].x + offsetX, points[i].y + offsetY, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(20, 10, 30, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      const loopTime = time % 3;
      let tongueProgress = 0;

      if (loopTime < 1.2) {
        tongueProgress = easeInOutCubic(loopTime / 1.2);
      } else if (loopTime < 2.4) {
        tongueProgress = 1;
      } else {
        tongueProgress = 1 - easeInOutCubic((loopTime - 2.4) / 0.6);
      }

      const centerX = canvas.width / 2;
      const centerY = 150;
      const mouthY = centerY + 25;

      drawFace(ctx, centerX, centerY, tongueProgress);
      drawTongue(ctx, centerX, mouthY + 3, tongueProgress);

      if (tongueProgress > 0.1 && tongueProgress < 0.95 && Math.random() < 0.3) {
        const particleY = mouthY + 3 + (200 * tongueProgress * Math.random());
        particles.push(new MagicParticle(centerX + (Math.random() - 0.5) * 40, particleY));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      ctx.save();
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FF69B4';
      ctx.shadowColor = '#FF1493';
      ctx.shadowBlur = 10;
      ctx.restore();

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  // Animación de fuegos artificiales básicos (ID 3)
  private animateFireworksBasic(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    }

    const particles: Particle[] = [];
    let time = 0;

    const colors = ['#ff6b00', '#ffa500', '#ffff00', '#ff0000'];

    const animate = () => {
      ctx.fillStyle = 'rgba(26, 10, 46, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (time % 30 === 0) {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        
        for (let i = 0; i < 20; i++) {
          const angle = (Math.PI * 2 * i) / 20;
          particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * 3,
            vy: Math.sin(angle) * 3 - 2,
            life: 60,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 60;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      time++;

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  // Animación de fuegos artificiales deluxe (ID 4)
  private animateFireworksDeluxe(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    interface Firework {
      x: number;
      y: number;
      vx: number;
      vy: number;
      exploded: boolean;
      particles: Particle[];
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
    }

    const fireworks: Firework[] = [];
    let time = 0;

    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00', '#ffa500'];

    const animate = () => {
      ctx.fillStyle = 'rgba(26, 10, 46, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.05) {
        fireworks.push({
          x: Math.random() * canvas.width,
          y: canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: -8 - Math.random() * 4,
          exploded: false,
          particles: []
        });
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];

        if (!fw.exploded) {
          fw.x += fw.vx;
          fw.y += fw.vy;
          fw.vy += 0.15;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
          ctx.fill();

          if (fw.vy > 0 || fw.y < canvas.height * 0.3) {
            fw.exploded = true;
            const numParticles = 50;
            const baseColor = colors[Math.floor(Math.random() * colors.length)];
            
            for (let j = 0; j < numParticles; j++) {
              const angle = (Math.PI * 2 * j) / numParticles;
              const speed = 2 + Math.random() * 3;
              fw.particles.push({
                x: fw.x,
                y: fw.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 60 + Math.random() * 40,
                color: baseColor,
                size: 2 + Math.random() * 2
              });
            }
          }
        } else {
          let allDead = true;
          for (const p of fw.particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.08;
            p.vx *= 0.99;
            p.life--;

            if (p.life > 0) {
              allDead = false;
              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.life / 100;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          if (allDead) {
            fireworks.splice(i, 1);
          }
        }
      }

      ctx.globalAlpha = 1;
      time++;

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }
  // Animación de Galletas de Canarios (ID 2)
  private animateCanaryTransform(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    class MagicParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      hue: number;
      rotation: number;
      rotationSpeed: number;

      constructor(x: number, y: number, burst = false) {
        this.x = x;
        this.y = y;
        if (burst) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 3 + Math.random() * 6;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
        } else {
          this.vx = (Math.random() - 0.5) * 4;
          this.vy = -Math.random() * 2 - 1;
        }
        this.life = 1;
        this.size = Math.random() * 5 + 2;
        this.hue = 40 + Math.random() * 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.012;
        this.vy -= 0.05;
        this.vx *= 0.97;
        this.rotation += this.rotationSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 75%, 1)`);
        gradient.addColorStop(0.4, `hsla(${this.hue}, 100%, 65%, 0.7)`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.fillStyle = `hsla(${this.hue}, 100%, 85%, ${this.life})`;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, 1)`;
        ctx.shadowBlur = 15;
        
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const radius = i % 2 === 0 ? this.size : this.size * 0.4;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    class Sparkle {
      x: number;
      y: number;
      life: number;
      size: number;
      hue: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.life = 1;
        this.size = Math.random() * 3 + 1;
        this.hue = 45 + Math.random() * 15;
      }

      update() {
        this.life -= 0.02;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life;
        
        ctx.fillStyle = `hsla(${this.hue}, 100%, 90%, 1)`;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, 1)`;
        ctx.shadowBlur = 20;
        
        ctx.fillRect(this.x - this.size * 2, this.y - 0.5, this.size * 4, 1);
        ctx.fillRect(this.x - 0.5, this.y - this.size * 2, 1, this.size * 4);
        
        ctx.restore();
      }
    }

    const particles: MagicParticle[] = [];
    const sparkles: Sparkle[] = [];
    let time = 0;

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const easeOutElastic = (t: number) => {
      const c4 = (2 * Math.PI) / 3;
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    };

    const easeInCubic = (t: number) => t * t * t;

    const drawCookie = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, glow: number) => {
      ctx.save();
      
      if (glow > 0) {
        const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, 50 * scale);
        glowGrad.addColorStop(0, `rgba(255, 215, 0, ${glow * 0.8})`);
        glowGrad.addColorStop(0.5, `rgba(255, 180, 0, ${glow * 0.5})`);
        glowGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(x, y, 50 * scale, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.fillStyle = '#D2691E';
      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.arc(x, y, 28 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#654321';
      const chips = [
        {x: -10, y: -6}, {x: 10, y: -10}, {x: -12, y: 6},
        {x: 6, y: 10}, {x: 0, y: -3}, {x: -6, y: 12},
        {x: 12, y: 3}, {x: -3, y: -12}
      ];
      chips.forEach(chip => {
        ctx.beginPath();
        ctx.arc(x + chip.x * scale, y + chip.y * scale, 3.5 * scale, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.fillStyle = `rgba(255, 235, 205, ${0.6 + glow * 0.4})`;
      ctx.beginPath();
      ctx.arc(x - 10 * scale, y - 10 * scale, 8 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = `rgba(255, 235, 205, ${0.4 + glow * 0.3})`;
      ctx.beginPath();
      ctx.arc(x + 8 * scale, y + 8 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawPerson = (ctx: CanvasRenderingContext2D, x: number, y: number, alpha: number, mouthOpen: boolean) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      
      if (alpha < 0.7) {
        const bodyGlow = ctx.createRadialGradient(x, y + 20, 0, x, y + 20, 80);
        bodyGlow.addColorStop(0, `rgba(255, 215, 0, ${(1 - alpha) * 0.5})`);
        bodyGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = bodyGlow;
        ctx.beginPath();
        ctx.arc(x, y + 20, 80, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#6A5ACD';
      ctx.beginPath();
      ctx.ellipse(x, y + 45, 28, 38, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      
      const headGlow = ctx.createRadialGradient(x, y, 0, x, y, 50);
      headGlow.addColorStop(0, 'rgba(255, 230, 190, 0.3)');
      headGlow.addColorStop(1, 'rgba(255, 230, 190, 0)');
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.arc(x, y, 50, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFE4B5';
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x, y, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      if (mouthOpen) {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(x - 12, y - 8, 8, 0.2, Math.PI - 0.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + 12, y - 8, 8, 0.2, Math.PI - 0.2);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x - 12, y - 8, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 12, y - 8, 8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#4A2511';
        ctx.beginPath();
        ctx.arc(x - 12, y - 8, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 12, y - 8, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x - 10, y - 10, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 14, y - 10, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
      ctx.beginPath();
      ctx.arc(x - 22, y + 3, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 22, y + 3, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      if (mouthOpen) {
        ctx.fillStyle = '#4A2511';
        ctx.beginPath();
        ctx.ellipse(x, y + 12, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y + 10, 8, 0, Math.PI, true);
        ctx.stroke();
      }
      
      ctx.restore();
    };

    const drawCanary = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      
      const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, 120 * scale);
      outerGlow.addColorStop(0, `rgba(255, 215, 0, ${0.6 * alpha})`);
      outerGlow.addColorStop(0.5, `rgba(255, 180, 0, ${0.3 * alpha})`);
      outerGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(x, y, 120 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowColor = 'rgba(218, 165, 32, 0.5)';
      ctx.shadowBlur = 20 * scale;
      ctx.shadowOffsetY = 5 * scale;
      
      const bodyGradient = ctx.createRadialGradient(x - 10 * scale, y, 0, x, y + 10 * scale, 50 * scale);
      bodyGradient.addColorStop(0, '#FFE55C');
      bodyGradient.addColorStop(0.5, '#FFD700');
      bodyGradient.addColorStop(1, '#FFA500');
      
      ctx.fillStyle = bodyGradient;
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.ellipse(x, y + 15 * scale, 40 * scale, 50 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      
      ctx.strokeStyle = 'rgba(255, 200, 0, 0.4)';
      ctx.lineWidth = 1.5 * scale;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(x - 10 * scale, y + (i * 8 - 10) * scale, 15 * scale, Math.PI * 0.2, Math.PI * 0.8);
        ctx.stroke();
      }
      
      const headGradient = ctx.createRadialGradient(x - 8 * scale, y - 30 * scale, 0, x, y - 25 * scale, 30 * scale);
      headGradient.addColorStop(0, '#FFE55C');
      headGradient.addColorStop(0.6, '#FFD700');
      headGradient.addColorStop(1, '#FFA500');
      
      ctx.fillStyle = headGradient;
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.arc(x, y - 28 * scale, 28 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(x - 5 * scale, y - 50 * scale);
      ctx.lineTo(x - 2 * scale, y - 58 * scale);
      ctx.lineTo(x + 2 * scale, y - 56 * scale);
      ctx.lineTo(x + 5 * scale, y - 50 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 2 * scale;
      ctx.stroke();
      
      ctx.fillStyle = '#FF8C00';
      ctx.strokeStyle = '#FF6347';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(x + 22 * scale, y - 30 * scale);
      ctx.lineTo(x + 40 * scale, y - 28 * scale);
      ctx.lineTo(x + 22 * scale, y - 24 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = '#D2691E';
      ctx.lineWidth = 1.5 * scale;
      ctx.beginPath();
      ctx.moveTo(x + 22 * scale, y - 27 * scale);
      ctx.lineTo(x + 38 * scale, y - 28 * scale);
      ctx.stroke();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x - 10 * scale, y - 33 * scale, 7 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 10 * scale, y - 33 * scale, 7 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5 * scale;
      ctx.stroke();
      
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(x - 10 * scale, y - 32 * scale, 4.5 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 10 * scale, y - 32 * scale, 4.5 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x - 8 * scale, y - 34 * scale, 2 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 12 * scale, y - 34 * scale, 2 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      const wingAngle = Math.sin(time * 4) * 0.4;
      const wingGradient = ctx.createLinearGradient(x - 50 * scale, y, x - 20 * scale, y);
      wingGradient.addColorStop(0, '#FFD700');
      wingGradient.addColorStop(1, '#FFA500');
      
      ctx.save();
      ctx.translate(x - 35 * scale, y + 8 * scale);
      ctx.rotate(-0.6 + wingAngle);
      ctx.fillStyle = wingGradient;
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 2.5 * scale;
      ctx.beginPath();
      ctx.ellipse(0, 0, 18 * scale, 38 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(218, 165, 32, 0.6)';
      ctx.lineWidth = 1.5 * scale;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-5 * scale, (i * 12 - 18) * scale);
        ctx.lineTo(-12 * scale, (i * 12 - 15) * scale);
        ctx.stroke();
      }
      ctx.restore();
      
      ctx.save();
      ctx.translate(x + 35 * scale, y + 8 * scale);
      ctx.rotate(0.6 - wingAngle);
      ctx.fillStyle = wingGradient;
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 2.5 * scale;
      ctx.beginPath();
      ctx.ellipse(0, 0, 18 * scale, 38 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(218, 165, 32, 0.6)';
      ctx.lineWidth = 1.5 * scale;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(5 * scale, (i * 12 - 18) * scale);
        ctx.lineTo(12 * scale, (i * 12 - 15) * scale);
        ctx.stroke();
      }
      ctx.restore();
      
      ctx.fillStyle = '#FFD700';
      ctx.strokeStyle = '#DAA520';
      ctx.lineWidth = 2.5 * scale;
      ctx.beginPath();
      ctx.moveTo(x, y + 65 * scale);
      ctx.lineTo(x - 18 * scale, y + 95 * scale);
      ctx.lineTo(x - 8 * scale, y + 90 * scale);
      ctx.lineTo(x, y + 92 * scale);
      ctx.lineTo(x + 8 * scale, y + 90 * scale);
      ctx.lineTo(x + 18 * scale, y + 95 * scale);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = '#FF8C00';
      ctx.lineWidth = 3 * scale;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(x - 12 * scale, y + 60 * scale);
      ctx.lineTo(x - 12 * scale, y + 75 * scale);
      ctx.stroke();
      
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(x - 12 * scale, y + 75 * scale);
      ctx.lineTo(x - 18 * scale, y + 78 * scale);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - 12 * scale, y + 75 * scale);
      ctx.lineTo(x - 6 * scale, y + 78 * scale);
      ctx.stroke();
      
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(x + 12 * scale, y + 60 * scale);
      ctx.lineTo(x + 12 * scale, y + 75 * scale);
      ctx.stroke();
      
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(x + 12 * scale, y + 75 * scale);
      ctx.lineTo(x + 6 * scale, y + 78 * scale);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 12 * scale, y + 75 * scale);
      ctx.lineTo(x + 18 * scale, y + 78 * scale);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(20, 10, 30, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      const loopTime = time % 5;
      let phase = 0;
      let phaseProgress = 0;

      if (loopTime < 1.2) {
        phase = 1;
        phaseProgress = loopTime / 1.2;
      } else if (loopTime < 2.2) {
        phase = 2;
        phaseProgress = (loopTime - 1.2) / 1;
      } else if (loopTime < 3.7) {
        phase = 3;
        phaseProgress = (loopTime - 2.2) / 1.5;
      } else {
        phase = 4;
        phaseProgress = (loopTime - 3.7) / 1.3;
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (phase === 1) {
        const pulse = Math.sin(time * 5) * 0.3 + 0.7;
        const glow = Math.sin(time * 6) * 0.5 + 0.5;
        
        drawCookie(ctx, centerX, centerY - 50, 1 + pulse * 0.15, glow);
        
        if (Math.random() < 0.5) {
          const angle = time * 2;
          const radius = 50 + Math.sin(time * 3) * 10;
          particles.push(new MagicParticle(
            centerX + Math.cos(angle) * radius,
            centerY - 50 + Math.sin(angle) * radius
          ));
        }
        
        if (Math.random() < 0.3) {
          const offsetX = (Math.random() - 0.5) * 80;
          const offsetY = (Math.random() - 0.5) * 80;
          sparkles.push(new Sparkle(centerX + offsetX, centerY - 50 + offsetY));
        }
      }

      if (phase === 2) {
        const eating = phaseProgress < 0.6;
        const cookieProgress = Math.min(phaseProgress / 0.6, 1);
        const cookieScale = 1 - easeInCubic(cookieProgress);
        const cookieY = centerY - 50 + (40 * easeInOutCubic(cookieProgress));
        
        if (cookieScale > 0.05) {
          drawCookie(ctx, centerX, cookieY, cookieScale, 0.5);
          
          if (Math.random() < 0.6) {
            particles.push(new MagicParticle(centerX, cookieY));
          }
        }
        
        drawPerson(ctx, centerX, centerY + 30, 1, eating);
      }

      if (phase === 3) {
        const personAlpha = 1 - easeInOutCubic(Math.min(phaseProgress * 1.5, 1));
        const canaryAlpha = easeInOutCubic(Math.max((phaseProgress - 0.3) * 1.5, 0));
        const canaryScale = easeOutElastic(Math.max((phaseProgress - 0.2) * 1.3, 0));
        
        if (personAlpha > 0.05) {
          drawPerson(ctx, centerX, centerY + 30, personAlpha, false);
        }
        
        if (canaryScale > 0.05) {
          drawCanary(ctx, centerX, centerY + 10, canaryScale, canaryAlpha);
        }
        
        if (phaseProgress > 0.35 && phaseProgress < 0.65) {
          if (Math.random() < 0.8) {
            particles.push(new MagicParticle(centerX, centerY, true));
          }
          if (Math.random() < 0.5) {
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 60;
            sparkles.push(new Sparkle(centerX + offsetX, centerY + offsetY));
          }
        }
        
        if (phaseProgress > 0.4 && phaseProgress < 0.7) {
          const waveProgress = (phaseProgress - 0.4) / 0.3;
          const waveRadius = waveProgress * 150;
          ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - waveProgress) * 0.8})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (phase === 4) {
        drawCanary(ctx, centerX, centerY + 10, 1, 1);
        
        if (Math.random() < 0.4) {
          const offsetX = (Math.random() - 0.5) * 120;
          const offsetY = (Math.random() - 0.5) * 120;
          particles.push(new MagicParticle(centerX + offsetX, centerY + offsetY));
        }
        
        if (Math.random() < 0.2) {
          const offsetX = (Math.random() - 0.5) * 100;
          const offsetY = (Math.random() - 0.5) * 100;
          sparkles.push(new Sparkle(centerX + offsetX, centerY + offsetY));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].update();
        sparkles[i].draw(ctx);
        
        if (sparkles[i].life <= 0) {
          sparkles.splice(i, 1);
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    }
}

