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
    } else if (this.animation?.id === 2) {
      this.animateCanaryTransform(ctx, canvas);
    } else if (this.animation?.id === 3) {
      this.animateFireworksBasic(ctx, canvas);
    } else if (this.animation?.id === 4) {
      this.animateFireworksDeluxe(ctx, canvas);
    } else if (this.animation?.id === 5) {
      this.animateExtendableEars(ctx, canvas);
    } else if (this.animation?.id === 6) {  
      this.animatePortableSwamp(ctx, canvas);  
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
    class Firework {
      x: number;
      y: number;
      targetY: number;
      vy: number;
      exploded: boolean;
      color: string;
      trail: Array<{x: number, y: number, alpha: number}>;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.targetY = y - 100 - Math.random() * 100;
        this.vy = -8 - Math.random() * 4;
        this.exploded = false;
        this.color = ['#FF6B00', '#FFA500', '#FFFF00', '#FF0000', '#FF1493', '#00CED1'][Math.floor(Math.random() * 6)];
        this.trail = [];
      }

      update() {
        if (!this.exploded) {
          this.trail.push({ x: this.x, y: this.y, alpha: 1 });
          if (this.trail.length > 10) this.trail.shift();
          
          this.y += this.vy;
          this.vy += 0.2;
          
          if (this.y <= this.targetY || this.vy > 0) {
            this.exploded = true;
            this.createExplosion();
          }
        }
      }

      createExplosion() {
        const count = 15 + Math.floor(Math.random() * 10);
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          const speed = 2 + Math.random() * 3;
          sparks.push(new SparkParticle(this.x, this.y, angle, speed, this.color));
        }
        
        for (let i = 0; i < 5; i++) {
          smokeParticles.push(new SmokeParticle(this.x, this.y));
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.exploded) {
          this.trail.forEach((t, i) => {
            const alpha = (i / this.trail.length) * 0.8;
            ctx.save();
            ctx.globalAlpha = alpha;
            
            const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, 4);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(t.x, t.y, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          
          ctx.save();
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 20;
          
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 6);
          gradient.addColorStop(0, '#FFFFFF');
          gradient.addColorStop(0.5, this.color);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    class SparkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;

      constructor(x: number, y: number, angle: number, speed: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1;
        this.color = color;
        this.size = 2 + Math.random() * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15;
        this.vx *= 0.98;
        this.life -= 0.015;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, this.color + '80');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    class SmokeParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      rotation: number;
      rotationSpeed: number;

      constructor(x: number, y: number) {
        this.x = x + (Math.random() - 0.5) * 20;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = -0.5 - Math.random() * 1;
        this.life = 1;
        this.size = 5 + Math.random() * 10;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.life -= 0.008;
        this.size += 0.2;
        this.rotation += this.rotationSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life * 0.6;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, '#8B008B');
        gradient.addColorStop(0.5, '#4B0082');
        gradient.addColorStop(1, 'rgba(75, 0, 130, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const fireworks: Firework[] = [];
    const sparks: SparkParticle[] = [];
    const smokeParticles: SmokeParticle[] = [];
    let time = 0;

    const drawBox = (ctx: CanvasRenderingContext2D, x: number, y: number, openProgress: number) => {
      ctx.save();
      
      if (openProgress > 0) {
        const glowSize = 80 + openProgress * 30;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${0.3 * (1 - openProgress)})`);
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      const boxGradient = ctx.createLinearGradient(x - 40, y - 20, x + 40, y + 20);
      boxGradient.addColorStop(0, '#FF6B00');
      boxGradient.addColorStop(0.5, '#FF8C00');
      boxGradient.addColorStop(1, '#FFA500');
      
      ctx.fillStyle = boxGradient;
      ctx.strokeStyle = '#D2691E';
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.rect(x - 40, y - 20, 80, 60);
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(x - 35, y - 15, 70, 50);
      ctx.stroke();
      
      ctx.fillStyle = '#FFD700';
      ctx.save();
      ctx.translate(x, y + 15);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const x1 = Math.cos(angle) * 8;
        const y1 = Math.sin(angle) * 8;
        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      
      const lidOffset = openProgress * -50;
      const lidAngle = openProgress * -0.8;
      
      ctx.save();
      ctx.translate(x - 40, y - 20 + lidOffset);
      ctx.rotate(lidAngle);
      
      const lidGradient = ctx.createLinearGradient(0, 0, 80, 0);
      lidGradient.addColorStop(0, '#FF0000');
      lidGradient.addColorStop(0.5, '#FF1493');
      lidGradient.addColorStop(1, '#FF69B4');
      
      ctx.fillStyle = lidGradient;
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.rect(0, 0, 80, 25);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.ellipse(15, 8, 20, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
      
      if (openProgress > 0.3) {
        for (let i = 0; i < 3; i++) {
          const angle = time * 3 + (i * Math.PI * 2) / 3;
          const radius = 50 + Math.sin(time * 5 + i) * 10;
          const px = x + Math.cos(angle) * radius;
          const py = y + Math.sin(angle) * radius;
          
          ctx.save();
          ctx.globalAlpha = 0.6 + Math.sin(time * 8 + i) * 0.4;
          ctx.fillStyle = '#FFD700';
          ctx.shadowColor = '#FFA500';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 5, 20, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      const loopTime = time % 4;
      let phase = 0;
      let phaseProgress = 0;

      if (loopTime < 1) {
        phase = 1;
        phaseProgress = loopTime / 1;
      } else if (loopTime < 1.5) {
        phase = 2;
        phaseProgress = (loopTime - 1) / 0.5;
      } else {
        phase = 3;
        phaseProgress = (loopTime - 1.5) / 2.5;
      }

      const boxX = canvas.width / 2;
      const boxY = canvas.height - 100;

      if (phase === 1) {
        drawBox(ctx, boxX, boxY, 0);
      }

      if (phase === 2) {
        const easeOpen = phaseProgress < 0.5 
          ? 2 * phaseProgress * phaseProgress 
          : 1 - Math.pow(-2 * phaseProgress + 2, 2) / 2;
        drawBox(ctx, boxX, boxY, easeOpen);
      }

      if (phase === 3) {
        drawBox(ctx, boxX, boxY, 1);
        
        if (Math.random() < 0.15) {
          const offsetX = (Math.random() - 0.5) * 40;
          fireworks.push(new Firework(boxX + offsetX, boxY - 20));
        }
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw(ctx);
        
        if (fireworks[i].exploded) {
          fireworks.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw(ctx);
        
        if (sparks[i].life <= 0) {
          sparks.splice(i, 1);
        }
      }

      for (let i = smokeParticles.length - 1; i >= 0; i--) {
        smokeParticles[i].update();
        smokeParticles[i].draw(ctx);
        
        if (smokeParticles[i].life <= 0) {
          smokeParticles.splice(i, 1);
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

    // Animación de fuegos artificiales deluxe (ID 4)
  private animateFireworksDeluxe(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    class DeluxeRocket {
      x: number;
      y: number;
      targetY: number;
      vx: number;
      vy: number;
      exploded: boolean;
      color: string;
      type: string;
      trail: Array<{x: number, y: number, alpha: number}>;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.targetY = 100 + Math.random() * 150;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = -10 - Math.random() * 5;
        this.exploded = false;
        this.color = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000', '#00FF00', '#FFA500'][Math.floor(Math.random() * 6)];
        this.type = Math.random() < 0.5 ? 'dragon' : 'burst';
        this.trail = [];
      }

      update() {
        if (!this.exploded) {
          this.trail.push({ x: this.x, y: this.y, alpha: 1 });
          if (this.trail.length > 10) this.trail.shift();
          
          this.x += this.vx;
          this.y += this.vy;
          this.vy += 0.15;
          
          if (this.y <= this.targetY || this.vy > 0) {
            this.exploded = true;
            this.createExplosion();
          }
        }
      }

      createExplosion() {
        if (this.type === 'dragon') {
          const count = 20;
          for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 3 + Math.random() * 2;
            particles.push(new DragonParticle(this.x, this.y, angle, speed, this.color, i / count));
          }
        } else {
          const count = 25;
          for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 2 + Math.random() * 3;
            particles.push(new BurstParticle(this.x, this.y, angle, speed, this.color));
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.exploded) {
          this.trail.forEach((t, i) => {
            const alpha = (i / this.trail.length) * 0.8;
            ctx.save();
            ctx.globalAlpha = alpha;
            
            const size = 5;
            const gradient = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, size);
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(0.5, this.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
          
          ctx.save();
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 20;
          
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 8);
          gradient.addColorStop(0, '#FFFFFF');
          gradient.addColorStop(0.5, this.color);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    class DragonParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
      phase: number;

      constructor(x: number, y: number, angle: number, speed: number, color: string, phase: number) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1;
        this.color = color;
        this.size = 3;
        this.phase = phase;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        this.vx += Math.sin(this.phase * 8 + time * 4) * 0.2;
        this.vy += 0.1;
        this.vx *= 0.98;
        this.life -= 0.01;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.4, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    class BurstParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;

      constructor(x: number, y: number, angle: number, speed: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1;
        this.color = color;
        this.size = 2.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.12;
        this.vx *= 0.98;
        this.life -= 0.012;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.life;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.3, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const rockets: DeluxeRocket[] = [];
    const particles: Array<DragonParticle | BurstParticle> = [];
    let time = 0;

    const drawDeluxeBox = (ctx: CanvasRenderingContext2D, x: number, y: number, openProgress: number) => {
      ctx.save();
      
      if (openProgress > 0) {
        const glowSize = 120 + openProgress * 50;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        gradient.addColorStop(0, `rgba(255, 0, 255, ${0.4 * (1 - openProgress)})`);
        gradient.addColorStop(0.5, `rgba(0, 255, 255, ${0.3 * (1 - openProgress)})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      const boxGradient = ctx.createLinearGradient(x - 50, y - 30, x + 50, y + 30);
      boxGradient.addColorStop(0, '#8B008B');
      boxGradient.addColorStop(0.3, '#9370DB');
      boxGradient.addColorStop(0.5, '#BA55D3');
      boxGradient.addColorStop(0.7, '#9370DB');
      boxGradient.addColorStop(1, '#8B008B');
      
      ctx.fillStyle = boxGradient;
      ctx.strokeStyle = '#4B0082';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#FF00FF';
      ctx.shadowBlur = 20;
      
      ctx.beginPath();
      ctx.roundRect(x - 50, y - 30, 100, 70, 5);
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FFD700';
      ctx.beginPath();
      ctx.roundRect(x - 45, y - 25, 90, 60, 3);
      ctx.stroke();
      
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 15;
      ctx.fillText('DELUXE', x, y + 20);
      
      const drawDiamond = (dx: number, dy: number, size: number) => {
        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = '#00FFFF';
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 15;
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
      };
      
      drawDiamond(x - 30, y - 10, 6);
      drawDiamond(x + 30, y - 10, 6);
      drawDiamond(x, y + 5, 6);
      
      const lidOffset = openProgress * -70;
      const lidAngle = openProgress * -1;
      
      ctx.save();
      ctx.translate(x - 50, y - 30 + lidOffset);
      ctx.rotate(lidAngle);
      
      const lidGradient = ctx.createLinearGradient(0, 0, 100, 0);
      lidGradient.addColorStop(0, '#4B0082');
      lidGradient.addColorStop(0.5, '#8B008B');
      lidGradient.addColorStop(1, '#4B0082');
      
      ctx.fillStyle = lidGradient;
      ctx.strokeStyle = '#2F004F';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#FF00FF';
      ctx.shadowBlur = 20;
      
      ctx.beginPath();
      ctx.roundRect(0, 0, 100, 30, 5);
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(50, 15, 8, 0, Math.PI);
      ctx.stroke();
      
      ctx.restore();
      
      if (openProgress > 0.2) {
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 * i) / 8 + time * 2;
          const length = 60 + Math.sin(time * 5 + i) * 20;
          
          ctx.save();
          ctx.translate(x, y - 10);
          ctx.rotate(angle);
          
          const rayGradient = ctx.createLinearGradient(0, 0, length, 0);
          rayGradient.addColorStop(0, `rgba(255, 255, 255, ${openProgress * 0.8})`);
          rayGradient.addColorStop(0.5, `rgba(255, 215, 0, ${openProgress * 0.5})`);
          rayGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = rayGradient;
          ctx.beginPath();
          ctx.moveTo(0, -3);
          ctx.lineTo(length, -1);
          ctx.lineTo(length, 1);
          ctx.lineTo(0, 3);
          ctx.closePath();
          ctx.fill();
          
          ctx.restore();
        }
      }
      
      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 0, 15, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      const loopTime = time % 5;
      let phase = 0;
      let phaseProgress = 0;

      if (loopTime < 1.2) {
        phase = 1;
        phaseProgress = loopTime / 1.2;
      } else if (loopTime < 1.8) {
        phase = 2;
        phaseProgress = (loopTime - 1.2) / 0.6;
      } else {
        phase = 3;
        phaseProgress = (loopTime - 1.8) / 3.2;
      }

      const boxX = canvas.width / 2;
      const boxY = canvas.height - 80;

      if (phase === 1) {
        drawDeluxeBox(ctx, boxX, boxY, 0);
      }

      if (phase === 2) {
        const easeOpen = phaseProgress < 0.5 
          ? 4 * phaseProgress * phaseProgress * phaseProgress
          : 1 - Math.pow(-2 * phaseProgress + 2, 3) / 2;
        drawDeluxeBox(ctx, boxX, boxY, easeOpen);
      }

      if (phase === 3) {
        drawDeluxeBox(ctx, boxX, boxY, 1);
        
        if (Math.random() < 0.12) {
          const offsetX = (Math.random() - 0.5) * 50;
          rockets.push(new DeluxeRocket(boxX + offsetX, boxY - 25));
        }
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw(ctx);
        
        if (rockets[i].exploded) {
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

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

  // Animación de Orejas Extensibles (ID 5)
  private animateExtendableEars(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    class SoundWave {
      x: number;
      y: number;
      targetX: number | null;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;

      constructor(x: number, y: number, targetX: number | null) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.radius = 5;
        this.maxRadius = 40;
        this.alpha = 1;
        this.speed = 2;
      }

      update() {
        this.radius += this.speed;
        this.alpha = 1 - (this.radius / this.maxRadius);
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#FFA500';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      isDead() {
        return this.radius >= this.maxRadius;
      }
    }

    const soundWaves: SoundWave[] = [];
    let time = 0;

    const drawEar = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, flipped: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      if (flipped) ctx.scale(-scale, scale);
      else ctx.scale(scale, scale);
      
      const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 60);
      glowGrad.addColorStop(0, 'rgba(255, 182, 193, 0.4)');
      glowGrad.addColorStop(1, 'rgba(255, 182, 193, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFD4C4';
      ctx.strokeStyle = '#D8A494';
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.moveTo(0, -35);
      ctx.bezierCurveTo(20, -35, 30, -20, 30, 0);
      ctx.bezierCurveTo(30, 25, 15, 40, 0, 40);
      ctx.bezierCurveTo(-15, 40, -30, 25, -30, 0);
      ctx.bezierCurveTo(-30, -20, -20, -35, 0, -35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = '#C8947E';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-5, -30);
      ctx.bezierCurveTo(15, -32, 25, -15, 25, 5);
      ctx.stroke();
      
      ctx.strokeStyle = '#C8947E';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-8, -20);
      ctx.bezierCurveTo(8, -22, 18, -8, 18, 10);
      ctx.stroke();
      
      ctx.fillStyle = '#FFBEA3';
      ctx.beginPath();
      ctx.ellipse(0, 32, 12, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#D8A494';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.fillStyle = '#E8A48E';
      ctx.beginPath();
      ctx.ellipse(-5, 0, 15, 22, -0.2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#D89A7E';
      ctx.beginPath();
      ctx.ellipse(-8, 0, 10, 16, -0.2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#C88A6E';
      ctx.beginPath();
      ctx.ellipse(-10, 2, 5, 8, -0.2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFD4C4';
      ctx.beginPath();
      ctx.ellipse(8, 5, 6, 10, 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.ellipse(8, -15, 8, 12, 0.4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.ellipse(-15, 15, 5, 8, -0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawDoor = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.save();
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(x + 5, y + 5, 100, 180);
      
      const doorGrad = ctx.createLinearGradient(x, y, x + 100, y);
      doorGrad.addColorStop(0, '#8B4513');
      doorGrad.addColorStop(0.5, '#A0522D');
      doorGrad.addColorStop(1, '#8B4513');
      
      ctx.fillStyle = doorGrad;
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 3;
      ctx.fillRect(x, y, 100, 180);
      ctx.strokeRect(x, y, 100, 180);
      
      ctx.strokeStyle = '#6B3410';
      ctx.lineWidth = 2;
      for (let i = 1; i < 4; i++) {
        const yPos = y + (180 / 4) * i;
        ctx.beginPath();
        ctx.moveTo(x, yPos);
        ctx.lineTo(x + 100, yPos);
        ctx.stroke();
      }
      
      ctx.fillStyle = '#FFD700';
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(x + 80, y + 90, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(x, y + 180, 100, 3);
      
      ctx.restore();
    };

    const drawExtensionCord = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, vibration: number) => {
      ctx.save();
      
      const segments = 30;
      const points = [];
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t;
        
        const wave = Math.sin(t * Math.PI * 4 + time * 5) * vibration * 3;
        const finalY = y + wave;
        
        points.push({ x, y: finalY });
      }
      
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x + 2, p.y + 2);
        else ctx.lineTo(p.x + 2, p.y + 2);
      });
      ctx.stroke();
      
      const cordGrad = ctx.createLinearGradient(startX, startY, endX, endY);
      cordGrad.addColorStop(0, '#FFD4C4');
      cordGrad.addColorStop(0.5, '#FFB6A3');
      cordGrad.addColorStop(1, '#FFD4C4');
      
      ctx.strokeStyle = cordGrad;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(255, 182, 193, 0.5)';
      ctx.shadowBlur = 5;
      
      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      
      ctx.strokeStyle = '#E89A7E';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y - 2);
        else ctx.lineTo(p.x, p.y - 2);
      });
      ctx.stroke();
      
      ctx.beginPath();
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y + 2);
        else ctx.lineTo(p.x, p.y + 2);
      });
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, 'rgba(30, 20, 40, 0.3)');
      bgGrad.addColorStop(1, 'rgba(20, 10, 30, 0.3)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      const loopTime = time % 3;
      let phase = 0;
      let phaseProgress = 0;

      if (loopTime < 0.8) {
        phase = 1;
        phaseProgress = loopTime / 0.8;
      } else {
        phase = 2;
        phaseProgress = (loopTime - 0.8) / 2.2;
      }

      const earLeftX = 120;
      const earLeftY = canvas.height / 2;
      const doorX = canvas.width - 200;
      const doorY = canvas.height / 2 - 90;
      const cordEndX = doorX + 50;
      const cordEndY = doorY + 183;

      drawDoor(ctx, doorX, doorY);

      const vibration = phase === 2 ? Math.sin(time * 8) * 0.5 + 0.5 : 0;

      drawExtensionCord(ctx, earLeftX, earLeftY, cordEndX, cordEndY, vibration);

      drawEar(ctx, earLeftX, earLeftY, 1.2, false);
      drawEar(ctx, cordEndX, cordEndY, 1, true);

      if (phase === 2) {
        if (Math.random() < 0.15) {
          soundWaves.push(new SoundWave(doorX + 30, doorY + 90, earLeftX));
          soundWaves.push(new SoundWave(doorX + 70, doorY + 90, earLeftX));
        }
        
        if (Math.random() < 0.1) {
          soundWaves.push(new SoundWave(earLeftX, earLeftY, null));
        }
      }

      for (let i = soundWaves.length - 1; i >= 0; i--) {
        soundWaves[i].update();
        soundWaves[i].draw(ctx);
        
        if (soundWaves[i].isDead()) {
          soundWaves.splice(i, 1);
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  // Animación de Pantano Portátil (ID 6)
private animatePortableSwamp(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  class Bubble {
    x: number;
    y: number;
    size: number;
    vy: number;
    life: number;
    maxY: number;
    wobble: number;

    constructor(x: number, y: number, swampRadius: number) {
      this.x = x;
      this.y = y;
      this.size = 3 + Math.random() * 8;
      this.vy = -0.5 - Math.random() * 1;
      this.life = 1;
      this.maxY = y - 50 - Math.random() * 30;
      this.wobble = Math.random() * Math.PI * 2;
    }

    update() {
      this.y += this.vy;
      this.wobble += 0.1;
      this.x += Math.sin(this.wobble) * 0.5;
      
      if (this.y <= this.maxY) {
        this.life -= 0.05;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.life <= 0) return;

      ctx.save();
      ctx.globalAlpha = this.life * 0.8;
      
      const bubbleGrad = ctx.createRadialGradient(this.x - this.size * 0.3, this.y - this.size * 0.3, 0, this.x, this.y, this.size);
      bubbleGrad.addColorStop(0, '#C8FF9A');
      bubbleGrad.addColorStop(0.5, '#90EE90');
      bubbleGrad.addColorStop(1, '#4CAF50');
      
      ctx.fillStyle = bubbleGrad;
      ctx.strokeStyle = '#2E7D32';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  class SwampPlant {
    x: number;
    y: number;
    type: string;
    height: number;
    sway: number;
    swaySpeed: number;
    alpha: number;
    targetAlpha: number;

    constructor(x: number, y: number, type: string) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.height = 20 + Math.random() * 30;
      this.sway = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.02 + Math.random() * 0.03;
      this.alpha = 0;
      this.targetAlpha = 0.7 + Math.random() * 0.3;
    }

    update() {
      this.sway += this.swaySpeed;
      if (this.alpha < this.targetAlpha) {
        this.alpha += 0.02;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.x, this.y);
      
      const swayAngle = Math.sin(this.sway) * 0.15;
      ctx.rotate(swayAngle);
      
      if (this.type === 'grass') {
        const grassGrad = ctx.createLinearGradient(0, 0, 0, -this.height);
        grassGrad.addColorStop(0, '#1B5E20');
        grassGrad.addColorStop(0.5, '#4CAF50');
        grassGrad.addColorStop(1, '#81C784');
        
        ctx.strokeStyle = grassGrad;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(2, -this.height * 0.5, 0, -this.height);
        ctx.stroke();
        
      } else {
        ctx.strokeStyle = '#6B8E23';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -this.height);
        ctx.stroke();
        
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.ellipse(0, -this.height - 3, 3, 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    }
  }

  const bubbles: Bubble[] = [];
  const plants: SwampPlant[] = [];
  let time = 0;

  const drawBottle = (ctx: CanvasRenderingContext2D, x: number, y: number, tipped: boolean, liquidLevel: number) => {
    ctx.save();
    ctx.translate(x, y);
    
    if (tipped) {
      ctx.rotate(Math.PI / 3);
    }
    
    const bottleGrad = ctx.createLinearGradient(-20, 0, 20, 0);
    bottleGrad.addColorStop(0, 'rgba(200, 230, 255, 0.4)');
    bottleGrad.addColorStop(0.5, 'rgba(220, 240, 255, 0.6)');
    bottleGrad.addColorStop(1, 'rgba(200, 230, 255, 0.4)');
    
    ctx.fillStyle = bottleGrad;
    ctx.strokeStyle = '#4FC3F7';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(-20, 10);
    ctx.lineTo(-20, -30);
    ctx.lineTo(20, -30);
    ctx.lineTo(20, 10);
    ctx.lineTo(-20, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    if (liquidLevel > 0) {
      const liquidY = 10 - (40 * liquidLevel);
      const liquidGrad = ctx.createLinearGradient(0, liquidY, 0, 10);
      liquidGrad.addColorStop(0, '#81C784');
      liquidGrad.addColorStop(1, '#4CAF50');
      
      ctx.fillStyle = liquidGrad;
      ctx.beginPath();
      ctx.moveTo(-18, 10);
      ctx.lineTo(-18, liquidY);
      ctx.lineTo(18, liquidY);
      ctx.lineTo(18, 10);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.fillStyle = bottleGrad;
    ctx.strokeStyle = '#4FC3F7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(-10, -45, 20, 15);
    ctx.fill();
    ctx.stroke();
    
    if (!tipped) {
      ctx.fillStyle = '#8B4513';
      ctx.strokeStyle = '#5D4037';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.rect(-12, -55, 24, 10);
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = '#6D4C41';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-10, -52 + i * 3);
        ctx.lineTo(10, -52 + i * 3);
        ctx.stroke();
      }
    }
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.ellipse(-10, -15, 8, 15, 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const drawSwamp = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    
    const swampGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    swampGrad.addColorStop(0, '#7CB342');
    swampGrad.addColorStop(0.5, '#558B2F');
    swampGrad.addColorStop(0.8, '#33691E');
    swampGrad.addColorStop(1, 'rgba(51, 105, 30, 0)');
    
    ctx.fillStyle = swampGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const dist = radius * (0.3 + Math.random() * 0.5);
      const spotX = x + Math.cos(angle) * dist;
      const spotY = y + Math.sin(angle) * dist;
      const spotSize = 5 + Math.random() * 10;
      
      ctx.fillStyle = 'rgba(46, 125, 50, 0.4)';
      ctx.beginPath();
      ctx.ellipse(spotX, spotY, spotSize, spotSize * 0.6, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const shineGrad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius * 0.8);
    shineGrad.addColorStop(0, 'rgba(200, 255, 154, 0.3)');
    shineGrad.addColorStop(1, 'rgba(200, 255, 154, 0)');
    
    ctx.fillStyle = shineGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const animate = () => {
    ctx.fillStyle = 'rgba(20, 10, 30, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    time += 0.016;

    const loopTime = time % 5;
    let phase = 0;
    let phaseProgress = 0;

    if (loopTime < 1) {
      phase = 1;
      phaseProgress = loopTime / 1;
    } else if (loopTime < 1.5) {
      phase = 2;
      phaseProgress = (loopTime - 1) / 0.5;
    } else if (loopTime < 3.5) {
      phase = 3;
      phaseProgress = (loopTime - 1.5) / 2;
    } else {
      phase = 4;
      phaseProgress = (loopTime - 3.5) / 1.5;
    }

    const bottleX = canvas.width / 2 - 120;
    const bottleY = 150;
    const swampX = canvas.width / 2 + 60;
    const swampY = canvas.height - 150;

    if (phase === 1) {
      drawBottle(ctx, bottleX, bottleY, false, 0.7);
    }

    if (phase === 2) {
      const liquidLevel = 0.7 - (phaseProgress * 0.7);
      drawBottle(ctx, bottleX, bottleY, true, liquidLevel);
    }

    if (phase === 3 || phase === 4) {
      drawBottle(ctx, bottleX, bottleY, true, 0);
      
      let swampRadius;
      let swampAlpha;
      
      if (phase === 3) {
        const easeExpand = phaseProgress < 0.5 
          ? 2 * phaseProgress * phaseProgress 
          : 1 - Math.pow(-2 * phaseProgress + 2, 2) / 2;
        swampRadius = easeExpand * 120;
        swampAlpha = easeExpand;
        
        if (phaseProgress > 0.3 && plants.length < 15 && Math.random() < 0.3) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * swampRadius * 0.8;
          const px = swampX + Math.cos(angle) * dist;
          const py = swampY + Math.sin(angle) * dist;
          const type = Math.random() < 0.6 ? 'grass' : 'reed';
          plants.push(new SwampPlant(px, py, type));
        }
        
        if (phaseProgress > 0.5 && Math.random() < 0.2) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * swampRadius * 0.7;
          const bx = swampX + Math.cos(angle) * dist;
          const by = swampY + Math.sin(angle) * dist;
          bubbles.push(new Bubble(bx, by, swampRadius));
        }
      } else {
        const easeContract = 1 - (phaseProgress < 0.5 
          ? 2 * phaseProgress * phaseProgress 
          : 1 - Math.pow(-2 * phaseProgress + 2, 2) / 2);
        swampRadius = easeContract * 120;
        swampAlpha = easeContract;
      }
      
      drawSwamp(ctx, swampX, swampY, swampRadius, swampAlpha);
      
      for (let i = plants.length - 1; i >= 0; i--) {
        const p = plants[i];
        const dist = Math.sqrt(Math.pow(p.x - swampX, 2) + Math.pow(p.y - swampY, 2));
        
        if (dist <= swampRadius) {
          p.update();
          p.draw(ctx);
        }
        
        if (phase === 4 && dist > swampRadius) {
          plants.splice(i, 1);
        }
      }
      
      for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].update();
        bubbles[i].draw(ctx);
        
        if (bubbles[i].isDead()) {
          bubbles.splice(i, 1);
        }
      }
    }

    if (phase === 1 && loopTime < 0.1) {
      plants.length = 0;
      bubbles.length = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

}