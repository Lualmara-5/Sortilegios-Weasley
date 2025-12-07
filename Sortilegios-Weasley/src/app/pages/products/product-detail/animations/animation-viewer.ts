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
    } else if (this.animation?.id === 3) {
      this.animateFireworksBasic(ctx, canvas);
    } else if (this.animation?.id === 4) {
      this.animateFireworksDeluxe(ctx, canvas);
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
}