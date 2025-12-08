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
    } else if (this.animation?.id === 7) {  
      this.animateHeadlessHat(ctx, canvas);  
    }else if (this.animation?.id === 8) {  
      this.animateFaintingBonbon(ctx, canvas);
    } else if (this.animation?.id === 9) {
      this.animateVomitPills(ctx, canvas); 
    }else if (this.animation?.id === 10) {
      this.animateTurronSangranarices(ctx, canvas); 
    }else if (this.animation?.id === 11) {
    this.animateCarameloFiebre(ctx, canvas); 
    }else if (this.animation?.id === 12) {
    this.animateManantialSangre(ctx, canvas);
    } else if (this.animation?.id === 13) {
    this.animateFakeWandBanana(ctx, canvas); 
    }else if (this.animation?.id === 14) {
    this.animateTruthCandy(ctx, canvas); 
    }else if (this.animation?.id === 15) { 
    this.animateChocolateRompedientes(ctx, canvas); 
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

// Animación de Sombreros Acéfalos (ID 7)
private animateHeadlessHat(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  class MagicParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
    color: string;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 1;
      this.life = 1;
      this.size = 2 + Math.random() * 3;
      this.color = ['#FFD700', '#FFA500', '#FFFF00'][Math.floor(Math.random() * 3)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy -= 0.03;
      this.life -= 0.02;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.life <= 0) return;

      ctx.save();
      ctx.globalAlpha = this.life;
      
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const particles: MagicParticle[] = [];
  let time = 0;

  const drawPerson = (ctx: CanvasRenderingContext2D, x: number, y: number, headVisible: boolean, headAlpha: number) => {
    ctx.save();
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(x, y + 160, 50, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    const bodyGrad = ctx.createLinearGradient(x - 40, y + 30, x + 40, y + 90);
    bodyGrad.addColorStop(0, '#5B9BD5');
    bodyGrad.addColorStop(0.5, '#4A90E2');
    bodyGrad.addColorStop(1, '#3A7BC8');
    
    ctx.fillStyle = bodyGrad;
    ctx.strokeStyle = '#2E5C8A';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(x - 35, y + 30);
    ctx.lineTo(x - 40, y + 85);
    ctx.quadraticCurveTo(x, y + 95, x + 40, y + 85);
    ctx.lineTo(x + 35, y + 30);
    ctx.quadraticCurveTo(x, y + 20, x - 35, y + 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(x, y + 40 + i * 20, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.strokeStyle = '#4A90E2';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(x - 35, y + 35);
    ctx.quadraticCurveTo(x - 50, y + 50, x - 45, y + 75);
    ctx.stroke();
    
    ctx.fillStyle = '#FFE4B5';
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x - 45, y + 80, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.strokeStyle = '#4A90E2';
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(x + 35, y + 35);
    ctx.quadraticCurveTo(x + 50, y + 50, x + 45, y + 75);
    ctx.stroke();
    
    ctx.fillStyle = '#FFE4B5';
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x + 45, y + 80, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    const pantsGrad = ctx.createLinearGradient(x - 35, y + 85, x + 35, y + 130);
    pantsGrad.addColorStop(0, '#3A5A7A');
    pantsGrad.addColorStop(1, '#2C4A6A');
    
    ctx.fillStyle = pantsGrad;
    ctx.strokeStyle = '#1A3A5A';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(x - 40, y + 85);
    ctx.lineTo(x - 25, y + 130);
    ctx.lineTo(x - 20, y + 130);
    ctx.lineTo(x - 15, y + 85);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + 15, y + 85);
    ctx.lineTo(x + 20, y + 130);
    ctx.lineTo(x + 25, y + 130);
    ctx.lineTo(x + 40, y + 85);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.strokeStyle = '#3A5A7A';
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(x - 22, y + 130);
    ctx.lineTo(x - 20, y + 155);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + 22, y + 130);
    ctx.lineTo(x + 20, y + 155);
    ctx.stroke();
    
    ctx.fillStyle = '#2C2C2C';
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.ellipse(x - 25, y + 158, 15, 8, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.ellipse(x + 25, y + 158, 15, 8, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#FFE4B5';
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 12, y + 25);
    ctx.lineTo(x - 10, y + 35);
    ctx.lineTo(x + 10, y + 35);
    ctx.lineTo(x + 12, y + 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    if (headVisible) {
      ctx.save();
      ctx.globalAlpha = headAlpha;
      
      if (headAlpha < 1) {
        const glowGrad = ctx.createRadialGradient(x, y - 5, 0, x, y - 5, 50);
        glowGrad.addColorStop(0, `rgba(255, 215, 0, ${(1 - headAlpha) * 0.5})`);
        glowGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(x, y - 5, 50, 0, Math.PI * 2);
        ctx.fill();
      }
      
      const headGrad = ctx.createRadialGradient(x - 8, y - 15, 0, x, y - 5, 32);
      headGrad.addColorStop(0, '#FFECDB');
      headGrad.addColorStop(1, '#FFE4B5');
      
      ctx.fillStyle = headGrad;
      ctx.strokeStyle = '#D4A574';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y - 5, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.arc(x, y - 20, 32, Math.PI, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x - 12, y - 10, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 12, y - 10, 7, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(x - 12, y - 9, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 12, y - 9, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x - 10, y - 11, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 14, y - 11, 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x - 18, y - 18);
      ctx.lineTo(x - 6, y - 16);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 6, y - 16);
      ctx.lineTo(x + 18, y - 18);
      ctx.stroke();
      
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(x, y + 5, 14, 0.2, Math.PI - 0.2);
      ctx.stroke();
      
      ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
      ctx.beginPath();
      ctx.arc(x - 20, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 20, y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
    
    ctx.restore();
  };

  const drawHat = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(0, 15, 45, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    const brimGrad = ctx.createLinearGradient(-40, 0, 40, 0);
    brimGrad.addColorStop(0, '#2C2C2C');
    brimGrad.addColorStop(0.5, '#1A1A1A');
    brimGrad.addColorStop(1, '#2C2C2C');
    
    ctx.fillStyle = brimGrad;
    ctx.strokeStyle = '#0A0A0A';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.ellipse(0, 0, 45, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    const crownGrad = ctx.createLinearGradient(-25, -30, 25, 0);
    crownGrad.addColorStop(0, '#3A3A3A');
    crownGrad.addColorStop(0.5, '#1A1A1A');
    crownGrad.addColorStop(1, '#2C2C2C');
    
    ctx.fillStyle = crownGrad;
    ctx.strokeStyle = '#0A0A0A';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(-25, 0);
    ctx.lineTo(-22, -35);
    ctx.lineTo(22, -35);
    ctx.lineTo(25, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#2C2C2C';
    ctx.strokeStyle = '#0A0A0A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, -35, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#8B0000';
    ctx.strokeStyle = '#5A0000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(-25, -8, 50, 8);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.ellipse(-15, -2, 20, 6, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const drawPoof = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
    if (scale <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = 1 - scale;
    
    ctx.font = `bold ${30 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 15;
    ctx.strokeText('POOF!', x, y);
    ctx.fillText('POOF!', x, y);
    
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const dist = 30 * scale;
      const cloudX = x + Math.cos(angle) * dist;
      const cloudY = y + Math.sin(angle) * dist;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${(1 - scale) * 0.6})`;
      ctx.beginPath();
      ctx.arc(cloudX, cloudY, 15 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  };

  const animate = () => {
    ctx.fillStyle = 'rgba(20, 10, 30, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    time += 0.016;

    const loopTime = time % 4;
    let phase = 0;
    let phaseProgress = 0;

    if (loopTime < 1) {
      phase = 1;
      phaseProgress = loopTime / 1;
    } else if (loopTime < 1.8) {
      phase = 2;
      phaseProgress = (loopTime - 1) / 0.8;
    } else if (loopTime < 2.3) {
      phase = 3;
      phaseProgress = (loopTime - 1.8) / 0.5;
    } else {
      phase = 4;
      phaseProgress = (loopTime - 2.3) / 1.7;
    }

    const personX = canvas.width / 2;
    const personY = canvas.height / 2 - 50;
    const hatStartY = -80;
    const hatEndY = personY - 50;

    if (phase === 1) {
      drawPerson(ctx, personX, personY, true, 1);
    }

    if (phase === 2) {
      drawPerson(ctx, personX, personY, true, 1);
      
      const fallProgress = phaseProgress * phaseProgress;
      const hatY = hatStartY + (hatEndY - hatStartY) * fallProgress;
      
      drawHat(ctx, personX, hatY);
    }

    if (phase === 3) {
      const headAlpha = 1 - phaseProgress;
      const poofScale = phaseProgress;
      
      drawHat(ctx, personX, hatEndY);
      drawPerson(ctx, personX, personY, true, headAlpha);
      drawPoof(ctx, personX, personY - 10, poofScale);
      
      if (Math.random() < 0.4) {
        for (let i = 0; i < 2; i++) {
          particles.push(new MagicParticle(personX + (Math.random() - 0.5) * 40, personY - 10));
        }
      }
    }

    if (phase === 4) {
      drawHat(ctx, personX, hatEndY);
      drawPerson(ctx, personX, personY, false, 0);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      
      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }

    if (phase === 1 && loopTime < 0.1) {
      particles.length = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación de Bombones Desmayo (ID 8)
private animateFaintingBonbon(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  interface Star {
    x: number;
    y: number;
    size: number;
    rotation: number;
    rotationSpeed: number;
    vx: number;
    vy: number;
    life: number;
    fadeSpeed: number;
  }

  interface Cloud {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    life: number;
    fadeSpeed: number;
  }

  let time = 0;

  class Character {
    x: number;
    y: number;
    state: string;
    faintProgress: number;
    eatProgress: number;
    rotation: number;
    eyesOpen: boolean;
    blinkTimer: number;
    bounceOffset: number;
    wobble: number;

    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.faintProgress = 0;
      this.eatProgress = 0;
      this.rotation = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
      this.bounceOffset = 0;
      this.wobble = 0;
    }

    update() {
      if (this.state === 'standing') {
        this.eatProgress += 0.015;
        this.bounceOffset = Math.sin(time * 0.05) * 3;
        
        if (this.eatProgress >= 1) {
          this.state = 'eating';
          this.eatProgress = 0;
        }
      } else if (this.state === 'eating') {
        this.eatProgress += 0.025;
        
        if (this.eatProgress >= 1) {
          this.state = 'fainting';
          this.eatProgress = 0;
        }
      } else if (this.state === 'fainting') {
        this.faintProgress += 0.012;
        this.rotation = this.faintProgress * Math.PI * 0.5;
        this.wobble = Math.sin(this.faintProgress * Math.PI * 8) * 5;
        this.y += Math.sin(this.faintProgress * Math.PI) * 0.8;
        
        if (this.faintProgress >= 1) {
          this.state = 'fainted';
          this.rotation = Math.PI / 2;
          this.eyesOpen = false;
          this.y = canvas.height / 2 + 30;
        }
      } else if (this.state === 'fainted') {
        this.faintProgress += 0.003;
        this.bounceOffset = Math.sin(this.faintProgress * 5) * 1;
        
        if (this.faintProgress >= 3) {
          this.reset();
        }
      }

      if (this.eyesOpen && this.state !== 'fainted') {
        this.blinkTimer++;
        if (this.blinkTimer > 80 && Math.random() < 0.03) {
          this.eyesOpen = false;
          setTimeout(() => { this.eyesOpen = true; }, 100);
          this.blinkTimer = 0;
        }
      }
    }

    reset() {
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.faintProgress = 0;
      this.eatProgress = 0;
      this.rotation = 0;
      this.eyesOpen = true;
      this.bounceOffset = 0;
      this.wobble = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x + this.wobble, this.y + this.bounceOffset);
      ctx.rotate(this.rotation);

      // Sombra
      if (this.state !== 'fainted') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.beginPath();
        ctx.ellipse(0, 110, 45, 8, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Piernas
      ctx.fillStyle = '#6B4E3D';
      ctx.beginPath();
      ctx.ellipse(-12, 85, 10, 25, -0.1, 0, Math.PI * 2);
      ctx.ellipse(12, 85, 10, 25, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Zapatos
      ctx.fillStyle = '#3D2817';
      ctx.beginPath();
      ctx.ellipse(-12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cuerpo
      const bodyGradient = ctx.createLinearGradient(0, 0, 0, 100);
      bodyGradient.addColorStop(0, '#9B6B47');
      bodyGradient.addColorStop(1, '#7D5635');
      ctx.fillStyle = bodyGradient;
      
      ctx.beginPath();
      ctx.ellipse(0, 35, 38, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      // Detalles del cuerpo
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.ellipse(0, 50, 30, 15, 0, 0, Math.PI);
      ctx.fill();

      // Brazos
      ctx.strokeStyle = '#FFD7BA';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';

      if (this.state === 'eating') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-25, -10, -5, -15);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-5, -15, 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.lineTo(-42, 60);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.moveTo(35, 20);
      ctx.lineTo(42, 60);
      ctx.stroke();
      
      ctx.fillStyle = '#FFD7BA';
      ctx.beginPath();
      ctx.arc(42, 60, 9, 0, Math.PI * 2);
      ctx.fill();

      // Cabeza
      const headGradient = ctx.createRadialGradient(-8, -28, 5, 0, -20, 45);
      headGradient.addColorStop(0, '#FFEBD4');
      headGradient.addColorStop(1, '#FFD7BA');
      ctx.fillStyle = headGradient;
      
      ctx.beginPath();
      ctx.arc(0, -20, 42, 0, Math.PI * 2);
      ctx.fill();

      // Cabello
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(0, -42, 40, 25, 0, 0, Math.PI, true);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(-20, -38, 15, 0, Math.PI * 2);
      ctx.arc(20, -38, 15, 0, Math.PI * 2);
      ctx.arc(0, -50, 18, 0, Math.PI * 2);
      ctx.fill();

      // Orejas
      ctx.fillStyle = '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(-40, -20, 8, 12, -0.2, 0, Math.PI * 2);
      ctx.ellipse(40, -20, 8, 12, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Ojos
      if (this.state === 'fainted') {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-23, -25);
        ctx.lineTo(-13, -15);
        ctx.moveTo(-13, -25);
        ctx.lineTo(-23, -15);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(13, -25);
        ctx.lineTo(23, -15);
        ctx.moveTo(23, -25);
        ctx.lineTo(13, -15);
        ctx.stroke();
      } else if (this.eyesOpen) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.ellipse(18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2C1810';
        ctx.beginPath();
        ctx.arc(-18, -22, 6, 0, Math.PI * 2);
        ctx.arc(18, -22, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-16, -25, 3, 0, Math.PI * 2);
        ctx.arc(20, -25, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-24, -23);
        ctx.lineTo(-12, -23);
        ctx.moveTo(12, -23);
        ctx.lineTo(24, -23);
        ctx.stroke();
      }

      // Cejas
      if (this.state !== 'fainted') {
        ctx.strokeStyle = '#6B4423';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-28, -32);
        ctx.quadraticCurveTo(-18, -35, -10, -32);
        ctx.moveTo(10, -32);
        ctx.quadraticCurveTo(18, -35, 28, -32);
        ctx.stroke();
      }

      // Nariz
      ctx.fillStyle = '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(0, -12, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Boca
      if (this.state === 'eating') {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(0, -3, 10, 0.2, Math.PI - 0.2);
        ctx.fill();
      } else if (this.state === 'fainted') {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.ellipse(0, -3, 8, 10, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.arc(0, -5, 14, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }

      // Mejillas
      ctx.fillStyle = 'rgba(255, 160, 160, 0.4)';
      ctx.beginPath();
      ctx.arc(-28, -12, 10, 0, Math.PI * 2);
      ctx.arc(28, -12, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Bonbon {
    x: number;
    y: number;
    visible: boolean;
    eaten: boolean;
    float: number;
    character: Character;

    constructor(character: Character) {
      this.character = character;
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    update() {
      if (!this.eaten) {
        this.float += 0.08;
      }

      if (this.character.state === 'eating' && !this.eaten) {
        this.x += (this.character.x - 5 - this.x) * 0.15;
        this.y += (this.character.y - 15 - this.y) * 0.15;

        if (Math.abs(this.x - (this.character.x - 5)) < 8) {
          this.visible = false;
          this.eaten = true;
        }
      }

      if (this.character.state === 'standing' && this.character.eatProgress < 0.1) {
        this.reset();
      }
    }

    reset() {
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.visible) return;

      const floatOffset = Math.sin(this.float) * 5;

      ctx.save();
      ctx.translate(this.x, this.y + floatOffset);

      const wrapperGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 18);
      wrapperGradient.addColorStop(0, '#FFB6E8');
      wrapperGradient.addColorStop(1, '#FF69B4');
      
      ctx.fillStyle = wrapperGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(-6, -6, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(4, 4, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FF85C1';
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(-28, -8);
      ctx.lineTo(-28, 8);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(28, -8);
      ctx.lineTo(28, 8);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#FFE0F0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-18, -5);
      ctx.lineTo(-25, -10);
      ctx.moveTo(-18, 5);
      ctx.lineTo(-25, 10);
      ctx.moveTo(18, -5);
      ctx.lineTo(25, -10);
      ctx.moveTo(18, 5);
      ctx.lineTo(25, 10);
      ctx.stroke();

      ctx.restore();
    }
  }

  const character = new Character();
  const bonbon = new Bonbon(character);
  const stars: Star[] = [];
  const clouds: Cloud[] = [];

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a33');
    gradient.addColorStop(1, '#2d1b4e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estrellas de fondo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 30; i++) {
      const sx = (i * 197) % canvas.width;
      const sy = (i * 137) % canvas.height;
      const size = ((i * 73) % 3) + 1;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (character.state === 'fainting' && Math.random() < 0.2) {
      stars.push({
        x: character.x + (Math.random() - 0.5) * 80,
        y: character.y - 50 + (Math.random() - 0.5) * 50,
        size: Math.random() * 12 + 6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 3 - 1,
        life: 1,
        fadeSpeed: 0.008
      });
    }

    if (character.state === 'fainted' && Math.random() < 0.1) {
      clouds.push({
        x: character.x + (Math.random() - 0.5) * 100,
        y: character.y - 30,
        size: Math.random() * 25 + 20,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 0.8 - 0.3,
        life: 1,
        fadeSpeed: 0.006
      });
    }

    for (let i = clouds.length - 1; i >= 0; i--) {
      const c = clouds[i];
      c.x += c.vx;
      c.y += c.vy;
      c.life -= c.fadeSpeed;

      if (c.life <= 0) {
        clouds.splice(i, 1);
      } else {
        ctx.save();
        ctx.globalAlpha = c.life * 0.7;
        
        const gradient = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size);
        gradient.addColorStop(0, '#E8D5F5');
        gradient.addColorStop(1, '#D4C5E8');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 0.6, 0, Math.PI * 2);
        ctx.arc(c.x + c.size * 0.5, c.y - c.size * 0.3, c.size * 0.5, 0, Math.PI * 2);
        ctx.arc(c.x - c.size * 0.5, c.y - c.size * 0.3, c.size * 0.5, 0, Math.PI * 2);
        ctx.arc(c.x, c.y - c.size * 0.5, c.size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    bonbon.update();
    character.update();

    bonbon.draw(ctx);
    character.draw(ctx);

    for (let i = stars.length - 1; i >= 0; i--) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.05;
      s.rotation += s.rotationSpeed;
      s.life -= s.fadeSpeed;

      if (s.life <= 0) {
        stars.splice(i, 1);
      } else {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = s.life;

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, s.size);
        gradient.addColorStop(0, '#FFEB3B');
        gradient.addColorStop(0.5, '#FFC107');
        gradient.addColorStop(1, '#FF9800');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          const angle = (j * 4 * Math.PI) / 5 - Math.PI / 2;
          const x = Math.cos(angle) * s.size;
          const y = Math.sin(angle) * s.size;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#FFD54F';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }
    }

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación de Pastillas Vomitivas (ID 9)
private animateVomitPills(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  interface Spiral {
    x: number;
    y: number;
    direction: number;
    size: number;
    maxSize: number;
    rotation: number;
    life: number;
    speed: number;
    opacity: number;
    offsetX: number;
    offsetY: number;
  }

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    fadeSpeed: number;
  }

  let time = 0;

  class Character {
    x: number;
    y: number;
    state: string;
    stateProgress: number;
    rotation: number;
    eyesOpen: boolean;
    blinkTimer: number;
    swayOffset: number;
    greenTint: number;
    headTilt: number;
    squish: number;
    nauseaIntensity: number;

    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.stateProgress = 0;
      this.rotation = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
      this.swayOffset = 0;
      this.greenTint = 0;
      this.headTilt = 0;
      this.squish = 1;
      this.nauseaIntensity = 0;
    }

    update() {
      if (this.state === 'standing') {
        this.stateProgress += 0.02;
        this.swayOffset = Math.sin(time * 0.05) * 2;
        
        if (this.stateProgress >= 1) {
          this.state = 'eating';
          this.stateProgress = 0;
        }
      } else if (this.state === 'eating') {
        this.stateProgress += 0.04;
        
        if (this.stateProgress >= 1) {
          this.state = 'nauseated';
          this.stateProgress = 0;
          this.nauseaIntensity = 0;
        }
      } else if (this.state === 'nauseated') {
        this.stateProgress += 0.01;
        
        if (this.nauseaIntensity < 1) {
          this.nauseaIntensity += 0.05;
        }
        
        const intensity = Math.min(this.nauseaIntensity, 1);
        this.swayOffset = Math.sin(this.stateProgress * 15) * 15 * intensity;
        this.headTilt = Math.sin(this.stateProgress * 10) * 0.3 * intensity;
        this.greenTint = (0.3 + Math.sin(this.stateProgress * 20) * 0.2) * intensity;
        this.squish = 1 + Math.sin(this.stateProgress * 25) * 0.15 * intensity;
        
        if (this.stateProgress >= 1) {
          this.reset();
        }
      }

      if (this.eyesOpen && this.state !== 'nauseated') {
        this.blinkTimer++;
        if (this.blinkTimer > 80 && Math.random() < 0.03) {
          this.eyesOpen = false;
          setTimeout(() => { this.eyesOpen = true; }, 100);
          this.blinkTimer = 0;
        }
      }
    }

    reset() {
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.stateProgress = 0;
      this.rotation = 0;
      this.eyesOpen = true;
      this.swayOffset = 0;
      this.greenTint = 0;
      this.headTilt = 0;
      this.squish = 1;
      this.nauseaIntensity = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x + this.swayOffset, this.y);
      ctx.rotate(this.headTilt);
      ctx.scale(this.squish, 1 / this.squish);

      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(0, 110, 45, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#4A5568';
      ctx.beginPath();
      ctx.ellipse(-12, 85, 10, 25, -0.1, 0, Math.PI * 2);
      ctx.ellipse(12, 85, 10, 25, 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#2D3748';
      ctx.beginPath();
      ctx.ellipse(-12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      const bodyGradient = ctx.createLinearGradient(0, 0, 0, 100);
      bodyGradient.addColorStop(0, '#5A67D8');
      bodyGradient.addColorStop(1, '#4C51BF');
      ctx.fillStyle = bodyGradient;
      
      ctx.beginPath();
      ctx.ellipse(0, 35, 38, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFD7BA';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';

      if (this.state === 'eating') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-25, -10, -5, -15);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-5, -15, 9, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.state === 'nauseated') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-30, 35, -15, 45);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-15, 45, 9, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.quadraticCurveTo(30, 35, 15, 45);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(15, 45, 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.lineTo(-42, 60);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.lineTo(42, 60);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      const headGradient = ctx.createRadialGradient(-8, -28, 5, 0, -20, 45);
      if (this.state === 'nauseated') {
        const greenMix = this.greenTint;
        headGradient.addColorStop(0, `rgba(255, 235, 212, ${1 - greenMix})`);
        headGradient.addColorStop(0, `rgba(180, 255, 180, ${greenMix})`);
        headGradient.addColorStop(1, `rgba(255, 215, 186, ${1 - greenMix})`);
        headGradient.addColorStop(1, `rgba(150, 230, 150, ${greenMix})`);
      } else {
        headGradient.addColorStop(0, '#FFEBD4');
        headGradient.addColorStop(1, '#FFD7BA');
      }
      ctx.fillStyle = headGradient;
      
      ctx.beginPath();
      ctx.arc(0, -20, 42, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#2C1810';
      ctx.beginPath();
      ctx.ellipse(0, -42, 40, 25, 0, 0, Math.PI, true);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(-20, -38, 15, 0, Math.PI * 2);
      ctx.arc(20, -38, 15, 0, Math.PI * 2);
      ctx.arc(0, -50, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = this.state === 'nauseated' 
        ? `rgba(255, 205, 176, ${1 - this.greenTint * 0.5})`
        : '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(-40, -20, 8, 12, -0.2, 0, Math.PI * 2);
      ctx.ellipse(40, -20, 8, 12, 0.2, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'nauseated') {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        for (let i = 0; i < 20; i++) {
          const angle = i * 0.5 + this.stateProgress * 10;
          const radius = i * 0.5;
          const x = -18 + Math.cos(angle) * radius;
          const y = -23 + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        ctx.beginPath();
        for (let i = 0; i < 20; i++) {
          const angle = i * 0.5 + this.stateProgress * 10;
          const radius = i * 0.5;
          const x = 18 + Math.cos(angle) * radius;
          const y = -23 + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (this.eyesOpen) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.ellipse(18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2C1810';
        ctx.beginPath();
        ctx.arc(-18, -22, 6, 0, Math.PI * 2);
        ctx.arc(18, -22, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-16, -25, 3, 0, Math.PI * 2);
        ctx.arc(20, -25, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-24, -23);
        ctx.lineTo(-12, -23);
        ctx.moveTo(12, -23);
        ctx.lineTo(24, -23);
        ctx.stroke();
      }

      if (this.state === 'nauseated') {
        ctx.strokeStyle = '#6B4423';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-28, -30);
        ctx.quadraticCurveTo(-18, -36, -10, -34);
        ctx.moveTo(10, -34);
        ctx.quadraticCurveTo(18, -36, 28, -30);
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#6B4423';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-28, -32);
        ctx.quadraticCurveTo(-18, -35, -10, -32);
        ctx.moveTo(10, -32);
        ctx.quadraticCurveTo(18, -35, 28, -32);
        ctx.stroke();
      }

      ctx.fillStyle = '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(0, -12, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'eating') {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(0, -3, 10, 0.2, Math.PI - 0.2);
        ctx.fill();
      } else if (this.state === 'nauseated') {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-12, -3);
        for (let i = 0; i <= 12; i++) {
          const x = -12 + i * 2;
          const y = -3 + Math.sin(i * 0.8 + this.stateProgress * 15) * 3;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.arc(0, -5, 14, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }

      if (this.state === 'nauseated') {
        ctx.fillStyle = 'rgba(160, 255, 160, 0.3)';
      } else {
        ctx.fillStyle = 'rgba(255, 160, 160, 0.4)';
      }
      ctx.beginPath();
      ctx.arc(-28, -12, 10, 0, Math.PI * 2);
      ctx.arc(28, -12, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Pill {
    x: number;
    y: number;
    visible: boolean;
    eaten: boolean;
    float: number;
    character: Character;

    constructor(character: Character) {
      this.character = character;
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    update() {
      if (!this.eaten) {
        this.float += 0.08;
      }

      if (this.character.state === 'eating' && !this.eaten) {
        this.x += (this.character.x - 5 - this.x) * 0.15;
        this.y += (this.character.y - 15 - this.y) * 0.15;

        if (Math.abs(this.x - (this.character.x - 5)) < 8) {
          this.visible = false;
          this.eaten = true;
        }
      }

      if (this.character.state === 'standing' && this.character.stateProgress < 0.1) {
        this.reset();
      }
    }

    reset() {
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.visible) return;

      const floatOffset = Math.sin(this.float) * 5;

      ctx.save();
      ctx.translate(this.x, this.y + floatOffset);

      const pillGradient = ctx.createLinearGradient(-12, -8, 12, 8);
      pillGradient.addColorStop(0, '#FF8C42');
      pillGradient.addColorStop(1, '#FF6B35');
      ctx.fillStyle = pillGradient;
      
      ctx.beginPath();
      ctx.arc(-6, 0, 8, Math.PI / 2, Math.PI * 1.5);
      ctx.arc(6, 0, 8, Math.PI * 1.5, Math.PI / 2);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#FF5722';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.lineTo(0, 8);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(-4, -3, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  const character = new Character();
  const pill = new Pill(character);
  const spirals: Spiral[] = [];
  const particles: Particle[] = [];

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a33');
    gradient.addColorStop(1, '#2d1b4e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 30; i++) {
      const sx = (i * 197) % canvas.width;
      const sy = (i * 137) % canvas.height;
      const size = ((i * 73) % 3) + 1;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (character.state === 'nauseated') {
      if (Math.random() < 0.25) {
        const side = Math.random() < 0.5 ? -1 : 1;
        spirals.push({
          x: character.x,
          y: character.y - 20,
          direction: side,
          size: 0,
          maxSize: 40 + Math.random() * 20,
          rotation: 0,
          life: 1,
          speed: 1.2 + Math.random() * 0.8,
          opacity: 0.7 + Math.random() * 0.3,
          offsetX: (Math.random() - 0.5) * 60,
          offsetY: -Math.random() * 80 - 20
        });
      }
      
      if (Math.random() < 0.4) {
        particles.push({
          x: character.x + (Math.random() - 0.5) * 50,
          y: character.y - 20 + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 3 - 1,
          size: Math.random() * 5 + 2,
          life: 1,
          fadeSpeed: 0.012
        });
      }
    }

    for (let i = spirals.length - 1; i >= 0; i--) {
      const s = spirals[i];
      if (s.size < s.maxSize) {
        s.size += s.speed;
      } else {
        s.life -= 0.015;
      }
      s.rotation += 0.08 * s.direction;
      s.y -= 0.5;

      if (s.life <= 0) {
        spirals.splice(i, 1);
      } else {
        ctx.save();
        ctx.translate(s.x + s.offsetX, s.y + s.offsetY);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = s.life * s.opacity;

        ctx.strokeStyle = '#4ADE80';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#4ADE80';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        for (let j = 0; j < 50; j++) {
          const angle = j * 0.3;
          const radius = (j / 50) * s.size;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.restore();
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life -= p.fadeSpeed;

      if (p.life <= 0) {
        particles.splice(i, 1);
      } else {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = '#4ADE80';
        ctx.shadowColor = '#4ADE80';
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.restore();
      }
    }

    pill.update();
    character.update();

    pill.draw(ctx);
    character.draw(ctx);

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación del Turrón Sangranarices (ID 10)
private animateTurronSangranarices(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;

  class Character {
    x: number;
    y: number;
    state: string;
    stateProgress: number;
    eyesOpen: boolean;
    blinkTimer: number;
    noseGlow: number;
    bleedingIntensity: number;

    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
      this.noseGlow = 0;
      this.bleedingIntensity = 0;
    }

    update() {
      if (this.state === 'standing') {
        this.stateProgress += 0.02;
        
        if (this.stateProgress >= 1) {
          this.state = 'eating';
          this.stateProgress = 0;
        }
      } else if (this.state === 'eating') {
        this.stateProgress += 0.04;
        
        if (this.stateProgress >= 1) {
          this.state = 'glowing';
          this.stateProgress = 0;
          this.noseGlow = 0;
        }
      } else if (this.state === 'glowing') {
        this.stateProgress += 0.03;
        
        if (this.noseGlow < 1) {
          this.noseGlow += 0.05;
        }
        
        if (this.stateProgress >= 1) {
          this.state = 'bleeding';
          this.stateProgress = 0;
          this.bleedingIntensity = 0;
        }
      } else if (this.state === 'bleeding') {
        this.stateProgress += 0.01;
        
        if (this.bleedingIntensity < 1) {
          this.bleedingIntensity += 0.03;
        }
        
        if (this.stateProgress >= 1) {
          this.reset();
        }
      }

      if (this.eyesOpen && this.state !== 'bleeding') {
        this.blinkTimer++;
        if (this.blinkTimer > 80 && Math.random() < 0.03) {
          this.eyesOpen = false;
          setTimeout(() => { this.eyesOpen = true; }, 100);
          this.blinkTimer = 0;
        }
      }
    }

    reset() {
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.noseGlow = 0;
      this.bleedingIntensity = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);

      // Sombra
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(0, 110, 45, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // Piernas
      ctx.fillStyle = '#3B3B98';
      ctx.beginPath();
      ctx.ellipse(-12, 85, 10, 25, -0.1, 0, Math.PI * 2);
      ctx.ellipse(12, 85, 10, 25, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Zapatos
      ctx.fillStyle = '#1F1F5C';
      ctx.beginPath();
      ctx.ellipse(-12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cuerpo
      const bodyGradient = ctx.createLinearGradient(0, 0, 0, 100);
      bodyGradient.addColorStop(0, '#5A67D8');
      bodyGradient.addColorStop(1, '#4C51BF');
      ctx.fillStyle = bodyGradient;
      
      ctx.beginPath();
      ctx.ellipse(0, 35, 38, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      // Brazos
      ctx.strokeStyle = '#FFD7BA';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';

      if (this.state === 'eating') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-25, -10, -5, -15);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-5, -15, 9, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.state === 'bleeding') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-30, -5, -10, -8);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-10, -8, 9, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.quadraticCurveTo(30, -5, 10, -8);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(10, -8, 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.lineTo(-42, 60);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.lineTo(42, 60);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cabeza
      const headGradient = ctx.createRadialGradient(-8, -28, 5, 0, -20, 45);
      headGradient.addColorStop(0, '#FFEBD4');
      headGradient.addColorStop(1, '#FFD7BA');
      ctx.fillStyle = headGradient;
      
      ctx.beginPath();
      ctx.arc(0, -20, 42, 0, Math.PI * 2);
      ctx.fill();

      // Orejas
      ctx.fillStyle = '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(-40, -20, 8, 12, -0.2, 0, Math.PI * 2);
      ctx.ellipse(40, -20, 8, 12, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Ojos
      if (this.state === 'bleeding') {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-26, -28);
        ctx.lineTo(-10, -18);
        ctx.moveTo(-10, -28);
        ctx.lineTo(-26, -18);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(10, -28);
        ctx.lineTo(26, -18);
        ctx.moveTo(26, -28);
        ctx.lineTo(10, -18);
        ctx.stroke();
      } else if (this.eyesOpen) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.ellipse(18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2C1810';
        ctx.beginPath();
        ctx.arc(-18, -22, 6, 0, Math.PI * 2);
        ctx.arc(18, -22, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-16, -25, 3, 0, Math.PI * 2);
        ctx.arc(20, -25, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-24, -23);
        ctx.lineTo(-12, -23);
        ctx.moveTo(12, -23);
        ctx.lineTo(24, -23);
        ctx.stroke();
      }

      // Cejas
      ctx.strokeStyle = '#6B4423';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      if (this.state === 'bleeding') {
        ctx.beginPath();
        ctx.moveTo(-28, -32);
        ctx.quadraticCurveTo(-18, -38, -10, -36);
        ctx.moveTo(10, -36);
        ctx.quadraticCurveTo(18, -38, 28, -32);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(-28, -32);
        ctx.quadraticCurveTo(-18, -35, -10, -32);
        ctx.moveTo(10, -32);
        ctx.quadraticCurveTo(18, -35, 28, -32);
        ctx.stroke();
      }

      // Cabello
      ctx.fillStyle = '#2C1810';
      ctx.beginPath();
      ctx.ellipse(0, -48, 40, 20, 0, 0, Math.PI, true);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(-20, -44, 15, 0, Math.PI * 2);
      ctx.arc(20, -44, 15, 0, Math.PI * 2);
      ctx.arc(0, -56, 18, 0, Math.PI * 2);
      ctx.fill();

      // Resplandor de nariz
      if (this.state === 'glowing' && this.noseGlow > 0) {
        const glowSize = 25 * this.noseGlow;
        const glowGradient = ctx.createRadialGradient(0, -12, 0, 0, -12, glowSize);
        glowGradient.addColorStop(0, `rgba(220, 20, 60, ${0.8 * this.noseGlow})`);
        glowGradient.addColorStop(0.4, `rgba(255, 100, 100, ${0.5 * this.noseGlow})`);
        glowGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(0, -12, glowSize, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 8; i++) {
          const angle = (time * 0.1 + i * Math.PI / 4);
          const radius = 18 + Math.sin(time * 0.15) * 3;
          const sparkleX = Math.cos(angle) * radius;
          const sparkleY = -12 + Math.sin(angle) * radius;
          
          ctx.fillStyle = `rgba(255, 60, 60, ${this.noseGlow * 0.8})`;
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Nariz
      ctx.fillStyle = '#FFB6A3';
      ctx.beginPath();
      ctx.ellipse(0, -12, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(-2, -15, 2.5, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Boca
      if (this.state === 'eating') {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(0, -3, 10, 0.2, Math.PI - 0.2);
        ctx.fill();
      } else if (this.state === 'bleeding') {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-12, -3);
        for (let i = 0; i <= 12; i++) {
          const x = -12 + i * 2;
          const y = -3 + Math.sin(i * 0.8) * 2;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.arc(0, -5, 14, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }

      // Mejillas
      ctx.fillStyle = 'rgba(255, 160, 160, 0.4)';
      ctx.beginPath();
      ctx.arc(-28, -12, 10, 0, Math.PI * 2);
      ctx.arc(28, -12, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Turron {
    x: number;
    y: number;
    visible: boolean;
    eaten: boolean;
    float: number;
    character: Character;

    constructor(character: Character) {
      this.character = character;
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    update() {
      if (!this.eaten) {
        this.float += 0.08;
      }

      if (this.character.state === 'eating' && !this.eaten) {
        this.x += (this.character.x - 5 - this.x) * 0.15;
        this.y += (this.character.y - 15 - this.y) * 0.15;

        if (Math.abs(this.x - (this.character.x - 5)) < 8) {
          this.visible = false;
          this.eaten = true;
        }
      }

      if (this.character.state === 'standing' && this.character.stateProgress < 0.1) {
        this.reset();
      }
    }

    reset() {
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.visible) return;

      const floatOffset = Math.sin(this.float) * 5;

      ctx.save();
      ctx.translate(this.x, this.y + floatOffset);

      const turronGradient = ctx.createLinearGradient(-15, -10, 15, 10);
      turronGradient.addColorStop(0, '#DC143C');
      turronGradient.addColorStop(0.5, '#B22222');
      turronGradient.addColorStop(1, '#8B0000');
      ctx.fillStyle = turronGradient;
      
      ctx.fillRect(-15, -10, 30, 20);

      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.strokeRect(-15, -10, 30, 20);

      ctx.fillStyle = '#FFD700';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(-12 + i * 8, -8, 2, 16);
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(-12, -8, 10, 3);

      ctx.restore();
    }
  }

  class BloodDrop {
    startX: number;
    startY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    rotation: number;
    rotationSpeed: number;

    constructor(x: number, y: number) {
      this.startX = x;
      this.startY = y;
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = Math.random() * 1 + 0.5;
      this.size = Math.random() * 3.5 + 2;
      this.life = 1;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.12;
      this.rotation += this.rotationSpeed;
      this.life -= 0.008;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.life;

      ctx.fillStyle = '#8B0000';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#CD5C5C';
      ctx.beginPath();
      ctx.ellipse(-this.size * 0.3, -this.size * 0.4, this.size * 0.4, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  const character = new Character();
  const turron = new Turron(character);
  const bloodDrops: BloodDrop[] = [];

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a33');
    gradient.addColorStop(1, '#2d1b4e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 30; i++) {
      const sx = (i * 197) % canvas.width;
      const sy = (i * 137) % canvas.height;
      const size = ((i * 73) % 3) + 1;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (character.state === 'bleeding' && character.bleedingIntensity > 0.2) {
      if (Math.random() < 0.35 * character.bleedingIntensity) {
        const noseX = character.x;
        const noseY = character.y - 12;
        
        bloodDrops.push(new BloodDrop(
          noseX + (Math.random() - 0.5) * 8,
          noseY
        ));
      }
    }

    for (let i = bloodDrops.length - 1; i >= 0; i--) {
      const drop = bloodDrops[i];
      drop.update();
      
      if (drop.life <= 0 || drop.y > canvas.height) {
        bloodDrops.splice(i, 1);
      }
    }

    turron.update();
    character.update();

    turron.draw(ctx);
    character.draw(ctx);

    for (const drop of bloodDrops) {
      drop.draw(ctx);
    }

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}
// Animación del Caramelo de la Fiebre (ID 11)
private animateCarameloFiebre(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;

  interface SweatDrop {
    x: number;
    y: number;
    vy: number;
    size: number;
    life: number;
  }

  class Character {
    x: number;
    y: number;
    state: string;
    stateProgress: number;
    eyesOpen: boolean;
    blinkTimer: number;
    heatIntensity: number;
    sweatDrops: SweatDrop[];

    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
      this.heatIntensity = 0;
      this.sweatDrops = [];
    }

    update() {
      if (this.state === 'standing') {
        this.stateProgress += 0.02;
        
        if (this.stateProgress >= 1) {
          this.state = 'eating';
          this.stateProgress = 0;
        }
      } else if (this.state === 'eating') {
        this.stateProgress += 0.04;
        
        if (this.stateProgress >= 1) {
          this.state = 'heating';
          this.stateProgress = 0;
          this.heatIntensity = 0;
        }
      } else if (this.state === 'heating') {
        this.stateProgress += 0.008;
        
        if (this.heatIntensity < 1) {
          this.heatIntensity += 0.015;
        }
        
        if (this.heatIntensity > 0.3 && Math.random() < 0.08) {
          this.sweatDrops.push({
            x: this.x + (Math.random() - 0.5) * 40,
            y: this.y - 20 + (Math.random() - 0.5) * 30,
            vy: Math.random() * 1.5 + 1,
            size: Math.random() * 2.5 + 1.5,
            life: 1
          });
        }
        
        if (this.stateProgress >= 1) {
          this.reset();
        }
      }

      for (let i = this.sweatDrops.length - 1; i >= 0; i--) {
        const drop = this.sweatDrops[i];
        drop.y += drop.vy;
        drop.vy += 0.1;
        drop.life -= 0.015;
        
        if (drop.life <= 0 || drop.y > this.y + 100) {
          this.sweatDrops.splice(i, 1);
        }
      }

      if (this.eyesOpen && this.state !== 'heating') {
        this.blinkTimer++;
        if (this.blinkTimer > 80 && Math.random() < 0.03) {
          this.eyesOpen = false;
          setTimeout(() => { this.eyesOpen = true; }, 100);
          this.blinkTimer = 0;
        }
      }
    }

    reset() {
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.heatIntensity = 0;
      this.sweatDrops = [];
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);

      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(0, 110, 45, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#3B3B98';
      ctx.beginPath();
      ctx.ellipse(-12, 85, 10, 25, -0.1, 0, Math.PI * 2);
      ctx.ellipse(12, 85, 10, 25, 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1F1F5C';
      ctx.beginPath();
      ctx.ellipse(-12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      const bodyGradient = ctx.createLinearGradient(0, 0, 0, 100);
      bodyGradient.addColorStop(0, '#5A67D8');
      bodyGradient.addColorStop(1, '#4C51BF');
      ctx.fillStyle = bodyGradient;
      
      ctx.beginPath();
      ctx.ellipse(0, 35, 38, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFD7BA';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';

      if (this.state === 'eating') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-25, -10, -5, -15);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-5, -15, 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.lineTo(-42, 60);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.lineTo(42, 60);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      const headGradient = ctx.createRadialGradient(-8, -28, 5, 0, -20, 45);
      if (this.state === 'heating') {
        const redTint = this.heatIntensity * 0.4;
        headGradient.addColorStop(0, `rgba(255, 235, 212, ${1 - redTint})`);
        headGradient.addColorStop(0, `rgba(255, 160, 140, ${redTint})`);
        headGradient.addColorStop(1, `rgba(255, 215, 186, ${1 - redTint})`);
        headGradient.addColorStop(1, `rgba(255, 140, 120, ${redTint})`);
      } else {
        headGradient.addColorStop(0, '#FFEBD4');
        headGradient.addColorStop(1, '#FFD7BA');
      }
      ctx.fillStyle = headGradient;
      
      ctx.beginPath();
      ctx.arc(0, -20, 42, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = this.state === 'heating' 
        ? `rgba(255, 140, 120, ${0.6 + this.heatIntensity * 0.4})`
        : '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(-40, -20, 8, 12, -0.2, 0, Math.PI * 2);
      ctx.ellipse(40, -20, 8, 12, 0.2, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'heating') {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 2.5;
        
        for (let side of [-18, 18]) {
          ctx.beginPath();
          for (let i = 0; i < 15; i++) {
            const angle = i * 0.5 + this.stateProgress * 5;
            const radius = i * 0.6;
            const x = side + Math.cos(angle) * radius;
            const y = -23 + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (this.eyesOpen) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.ellipse(18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2C1810';
        ctx.beginPath();
        ctx.arc(-18, -22, 6, 0, Math.PI * 2);
        ctx.arc(18, -22, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-16, -25, 3, 0, Math.PI * 2);
        ctx.arc(20, -25, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-24, -23);
        ctx.lineTo(-12, -23);
        ctx.moveTo(12, -23);
        ctx.lineTo(24, -23);
        ctx.stroke();
      }

      ctx.strokeStyle = '#6B4423';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      if (this.state === 'heating') {
        ctx.beginPath();
        ctx.moveTo(-28, -32);
        ctx.quadraticCurveTo(-18, -38, -10, -36);
        ctx.moveTo(10, -36);
        ctx.quadraticCurveTo(18, -38, 28, -32);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(-28, -32);
        ctx.quadraticCurveTo(-18, -35, -10, -32);
        ctx.moveTo(10, -32);
        ctx.quadraticCurveTo(18, -35, 28, -32);
        ctx.stroke();
      }

      ctx.fillStyle = '#2C1810';
      ctx.beginPath();
      ctx.ellipse(0, -48, 40, 20, 0, 0, Math.PI, true);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(-20, -44, 15, 0, Math.PI * 2);
      ctx.arc(20, -44, 15, 0, Math.PI * 2);
      ctx.arc(0, -56, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFB6A3';
      ctx.beginPath();
      ctx.ellipse(0, -12, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(-2, -15, 2.5, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'eating') {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(0, -3, 10, 0.2, Math.PI - 0.2);
        ctx.fill();
      } else if (this.state === 'heating') {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.arc(0, -3, 12, 0.4, Math.PI - 0.4);
        ctx.stroke();
        
        ctx.fillStyle = '#FF6B8A';
        ctx.beginPath();
        ctx.ellipse(0, 5, 8, 6, 0, 0, Math.PI);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.arc(0, -5, 14, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }

      if (this.state === 'heating') {
        ctx.fillStyle = `rgba(255, 100, 100, ${0.5 + this.heatIntensity * 0.3})`;
      } else {
        ctx.fillStyle = 'rgba(255, 160, 160, 0.4)';
      }
      ctx.beginPath();
      ctx.arc(-28, -12, 10, 0, Math.PI * 2);
      ctx.arc(28, -12, 10, 0, Math.PI * 2);
      ctx.fill();

      for (const drop of this.sweatDrops) {
        ctx.save();
        ctx.globalAlpha = drop.life;
        
        ctx.fillStyle = '#87CEEB';
        ctx.beginPath();
        ctx.ellipse(drop.x - this.x, drop.y - this.y, drop.size, drop.size * 1.3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(drop.x - this.x - drop.size * 0.3, drop.y - this.y - drop.size * 0.3, drop.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      ctx.restore();
    }
  }

  class Candy {
    x: number;
    y: number;
    visible: boolean;
    eaten: boolean;
    float: number;
    character: Character;

    constructor(character: Character) {
      this.character = character;
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    update() {
      if (!this.eaten) {
        this.float += 0.08;
      }

      if (this.character.state === 'eating' && !this.eaten) {
        this.x += (this.character.x - 5 - this.x) * 0.15;
        this.y += (this.character.y - 15 - this.y) * 0.15;

        if (Math.abs(this.x - (this.character.x - 5)) < 8) {
          this.visible = false;
          this.eaten = true;
        }
      }

      if (this.character.state === 'standing' && this.character.stateProgress < 0.1) {
        this.reset();
      }
    }

    reset() {
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.visible) return;

      const floatOffset = Math.sin(this.float) * 5;

      ctx.save();
      ctx.translate(this.x, this.y + floatOffset);

      const candyGradient = ctx.createRadialGradient(-3, -3, 2, 0, 0, 12);
      candyGradient.addColorStop(0, '#FFD700');
      candyGradient.addColorStop(0.4, '#FF8C00');
      candyGradient.addColorStop(1, '#FF6347');
      ctx.fillStyle = candyGradient;
      
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * 12, Math.sin(angle) * 12);
        ctx.lineTo(Math.cos(angle) * 18, Math.sin(angle) * 18);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(-4, -4, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class HeatWave {
    x: number;
    y: number;
    amplitude: number;
    frequency: number;
    speed: number;
    offset: number;
    life: number;
    width: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.amplitude = Math.random() * 15 + 10;
      this.frequency = Math.random() * 0.05 + 0.03;
      this.speed = Math.random() * 1.5 + 1;
      this.offset = Math.random() * Math.PI * 2;
      this.life = 1;
      this.width = Math.random() * 40 + 60;
    }

    update() {
      this.y -= this.speed;
      this.life -= 0.01;
      this.offset += 0.1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life * 0.4;
      
      const gradient = ctx.createLinearGradient(this.x - this.width / 2, 0, this.x + this.width / 2, 0);
      gradient.addColorStop(0, 'rgba(255, 140, 0, 0)');
      gradient.addColorStop(0.5, 'rgba(255, 69, 0, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 140, 0, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      for (let i = 0; i <= 20; i++) {
        const x = this.x - this.width / 2 + (i / 20) * this.width;
        const wave = Math.sin(i * this.frequency + this.offset + time * 0.1) * this.amplitude;
        const y = this.y + wave;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.restore();
    }
  }

  class HeatParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    hue: number;

    constructor(x: number, y: number) {
      this.x = x + (Math.random() - 0.5) * 60;
      this.y = y + (Math.random() - 0.5) * 60;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = -Math.random() * 2 - 1;
      this.size = Math.random() * 4 + 2;
      this.life = 1;
      this.hue = Math.random() * 60 + 10;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy -= 0.02;
      this.life -= 0.015;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life;
      
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, 1)`);
      gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
      
      ctx.fillStyle = gradient;
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
    size: number;
    life: number;
    rotation: number;
    rotationSpeed: number;

    constructor(x: number, y: number) {
      this.x = x + (Math.random() - 0.5) * 30;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -Math.random() * 1.5 - 0.5;
      this.size = Math.random() * 15 + 10;
      this.life = 1;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.05;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.size += 0.3;
      this.rotation += this.rotationSpeed;
      this.life -= 0.012;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life * 0.3;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      gradient.addColorStop(0, 'rgba(255, 200, 150, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 150, 100, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  const character = new Character();
  const candy = new Candy(character);
  const heatWaves: HeatWave[] = [];
  const heatParticles: HeatParticle[] = [];
  const smokeParticles: SmokeParticle[] = [];

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a33');
    gradient.addColorStop(1, '#2d1b4e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 30; i++) {
      const sx = (i * 197) % canvas.width;
      const sy = (i * 137) % canvas.height;
      const size = ((i * 73) % 3) + 1;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (character.state === 'heating' && character.heatIntensity > 0.1) {
      if (Math.random() < 0.15) {
        heatWaves.push(new HeatWave(character.x, character.y + 50));
      }
      
      if (Math.random() < 0.4 * character.heatIntensity) {
        heatParticles.push(new HeatParticle(character.x, character.y));
      }
      
      if (Math.random() < 0.1 * character.heatIntensity) {
        smokeParticles.push(new SmokeParticle(character.x, character.y - 50));
      }
    }

    for (let i = heatWaves.length - 1; i >= 0; i--) {
      const wave = heatWaves[i];
      wave.update();
      
      if (wave.life <= 0 || wave.y < 0) {
        heatWaves.splice(i, 1);
      } else {
        wave.draw(ctx);
      }
    }

    for (let i = smokeParticles.length - 1; i >= 0; i--) {
      const smoke = smokeParticles[i];
      smoke.update();
      
      if (smoke.life <= 0) {
        smokeParticles.splice(i, 1);
      } else {
        smoke.draw(ctx);
      }
    }

    candy.update();
    character.update();

    candy.draw(ctx);
    character.draw(ctx);

    for (let i = heatParticles.length - 1; i >= 0; i--) {
      const particle = heatParticles[i];
      particle.update();
      
      if (particle.life <= 0) {
        heatParticles.splice(i, 1);
      } else {
        particle.draw(ctx);
      }
    }

    if (character.state === 'heating' && character.heatIntensity > 0.3) {
      const glowGradient = ctx.createRadialGradient(
        character.x, character.y - 20, 0,
        character.x, character.y - 20, 120 * character.heatIntensity
      );
      glowGradient.addColorStop(0, `rgba(255, 140, 0, ${0.15 * character.heatIntensity})`);
      glowGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(character.x, character.y - 20, 120 * character.heatIntensity, 0, Math.PI * 2);
      ctx.fill();
    }

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}
// Animación del Manantial de Sangre (ID 12)
private animateManantialSangre(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;

  class Character {
    x: number;
    y: number;
    state: string;
    stateProgress: number;
    eyesOpen: boolean;
    blinkTimer: number;
    magicIntensity: number;
    bleedingIntensity: number;

    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
      this.magicIntensity = 0;
      this.bleedingIntensity = 0;
    }

    update() {
      if (this.state === 'standing') {
        this.stateProgress += 0.02;
        
        if (this.stateProgress >= 1) {
          this.state = 'eating';
          this.stateProgress = 0;
        }
      } else if (this.state === 'eating') {
        this.stateProgress += 0.04;
        
        if (this.stateProgress >= 1) {
          this.state = 'magical';
          this.stateProgress = 0;
          this.magicIntensity = 0;
        }
      } else if (this.state === 'magical') {
        this.stateProgress += 0.01;
        
        if (this.magicIntensity < 1) {
          this.magicIntensity += 0.02;
        }
        
        if (this.stateProgress > 0.3 && this.bleedingIntensity < 1) {
          this.bleedingIntensity += 0.025;
        }
        
        if (this.stateProgress >= 1) {
          this.reset();
        }
      }

      if (this.eyesOpen && this.state !== 'magical') {
        this.blinkTimer++;
        if (this.blinkTimer > 80 && Math.random() < 0.03) {
          this.eyesOpen = false;
          setTimeout(() => { this.eyesOpen = true; }, 100);
          this.blinkTimer = 0;
        }
      }
    }

    reset() {
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.magicIntensity = 0;
      this.bleedingIntensity = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);

      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(0, 110, 45, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#3B3B98';
      ctx.beginPath();
      ctx.ellipse(-12, 85, 10, 25, -0.1, 0, Math.PI * 2);
      ctx.ellipse(12, 85, 10, 25, 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1F1F5C';
      ctx.beginPath();
      ctx.ellipse(-12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      const bodyGradient = ctx.createLinearGradient(0, 0, 0, 100);
      bodyGradient.addColorStop(0, '#5A67D8');
      bodyGradient.addColorStop(1, '#4C51BF');
      ctx.fillStyle = bodyGradient;
      
      ctx.beginPath();
      ctx.ellipse(0, 35, 38, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFD7BA';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';

      if (this.state === 'eating') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-25, -10, -5, -15);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-5, -15, 9, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.state === 'magical') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-28, -8, -8, -10);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-8, -10, 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.lineTo(-42, 60);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.lineTo(42, 60);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      const headGradient = ctx.createRadialGradient(-8, -28, 5, 0, -20, 45);
      headGradient.addColorStop(0, '#FFEBD4');
      headGradient.addColorStop(1, '#FFD7BA');
      ctx.fillStyle = headGradient;
      
      ctx.beginPath();
      ctx.arc(0, -20, 42, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(-40, -20, 8, 12, -0.2, 0, Math.PI * 2);
      ctx.ellipse(40, -20, 8, 12, 0.2, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'magical') {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-24, -26);
        ctx.quadraticCurveTo(-18, -22, -12, -24);
        ctx.moveTo(12, -24);
        ctx.quadraticCurveTo(18, -22, 24, -26);
        ctx.stroke();
      } else if (this.eyesOpen) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.ellipse(18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2C1810';
        ctx.beginPath();
        ctx.arc(-18, -22, 6, 0, Math.PI * 2);
        ctx.arc(18, -22, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-16, -25, 3, 0, Math.PI * 2);
        ctx.arc(20, -25, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-24, -23);
        ctx.lineTo(-12, -23);
        ctx.moveTo(12, -23);
        ctx.lineTo(24, -23);
        ctx.stroke();
      }

      ctx.strokeStyle = '#6B4423';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      if (this.state === 'magical') {
        ctx.beginPath();
        ctx.moveTo(-28, -32);
        ctx.quadraticCurveTo(-18, -38, -10, -36);
        ctx.moveTo(10, -36);
        ctx.quadraticCurveTo(18, -38, 28, -32);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(-28, -32);
        ctx.quadraticCurveTo(-18, -35, -10, -32);
        ctx.moveTo(10, -32);
        ctx.quadraticCurveTo(18, -35, 28, -32);
        ctx.stroke();
      }

      ctx.fillStyle = '#2C1810';
      ctx.beginPath();
      ctx.ellipse(0, -48, 40, 20, 0, 0, Math.PI, true);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(-20, -44, 15, 0, Math.PI * 2);
      ctx.arc(20, -44, 15, 0, Math.PI * 2);
      ctx.arc(0, -56, 18, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'magical' && this.magicIntensity > 0) {
        for (let i = 0; i < 3; i++) {
          const radius = 20 + i * 8;
          const alpha = (this.magicIntensity * 0.3) * (1 - i * 0.3);
          
          ctx.strokeStyle = `rgba(220, 20, 60, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, -12, radius + Math.sin(time * 0.1 + i) * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.fillStyle = '#FFB6A3';
      ctx.beginPath();
      ctx.ellipse(0, -12, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(-2, -15, 2.5, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'eating') {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(0, -3, 10, 0.2, Math.PI - 0.2);
        ctx.fill();
      } else if (this.state === 'magical') {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-10, -3);
        ctx.lineTo(10, -3);
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.arc(0, -5, 14, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255, 160, 160, 0.4)';
      ctx.beginPath();
      ctx.arc(-28, -12, 10, 0, Math.PI * 2);
      ctx.arc(28, -12, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Candy {
    x: number;
    y: number;
    visible: boolean;
    eaten: boolean;
    float: number;
    character: Character;

    constructor(character: Character) {
      this.character = character;
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    update() {
      if (!this.eaten) {
        this.float += 0.08;
      }

      if (this.character.state === 'eating' && !this.eaten) {
        this.x += (this.character.x - 5 - this.x) * 0.15;
        this.y += (this.character.y - 15 - this.y) * 0.15;

        if (Math.abs(this.x - (this.character.x - 5)) < 8) {
          this.visible = false;
          this.eaten = true;
        }
      }

      if (this.character.state === 'standing' && this.character.stateProgress < 0.1) {
        this.reset();
      }
    }

    reset() {
      this.x = canvas.width / 2 + 120;
      this.y = canvas.height / 2 - 40;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.visible) return;

      const floatOffset = Math.sin(this.float) * 5;

      ctx.save();
      ctx.translate(this.x, this.y + floatOffset);

      const candyGradient = ctx.createRadialGradient(-3, -3, 2, 0, 0, 12);
      candyGradient.addColorStop(0, '#8B0000');
      candyGradient.addColorStop(0.5, '#5C0000');
      candyGradient.addColorStop(1, '#3A0000');
      ctx.fillStyle = candyGradient;
      
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(220, 20, 60, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 16 + Math.sin(this.float * 2) * 2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
      ctx.beginPath();
      ctx.arc(-4, -4, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class MagicParticle {
    x: number;
    y: number;
    startX: number;
    startY: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    rotation: number;
    rotationSpeed: number;
    sparkle: boolean;

    constructor(x: number, y: number) {
      this.startX = x;
      this.startY = y;
      this.x = x + (Math.random() - 0.5) * 20;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = -Math.random() * 2.5 - 1.5;
      this.size = Math.random() * 4 + 2;
      this.life = 1;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.1;
      this.sparkle = Math.random() < 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.98;
      this.vy += 0.05;
      this.rotation += this.rotationSpeed;
      this.life -= 0.012;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life;
      
      if (this.sparkle) {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);
        gradient.addColorStop(0, 'rgba(255, 50, 50, 1)');
        gradient.addColorStop(0.5, 'rgba(220, 20, 60, 0.8)');
        gradient.addColorStop(1, 'rgba(180, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5;
          const x1 = Math.cos(angle) * this.size;
          const y1 = Math.sin(angle) * this.size;
          const x2 = Math.cos(angle + Math.PI / 5) * this.size * 0.4;
          const y2 = Math.sin(angle + Math.PI / 5) * this.size * 0.4;
          
          if (i === 0) ctx.moveTo(x1, y1);
          else ctx.lineTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
        ctx.closePath();
        ctx.fill();
      } else {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, 'rgba(255, 80, 80, 1)');
        gradient.addColorStop(0.5, 'rgba(220, 20, 60, 0.9)');
        gradient.addColorStop(1, 'rgba(180, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    }
  }

  class BloodStream {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    trail: Array<{x: number, y: number}>;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = Math.random() * 1 + 0.8;
      this.size = Math.random() * 2.5 + 1.5;
      this.life = 1;
      this.trail = [];
    }

    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 8) {
        this.trail.shift();
      }
      
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.08;
      this.life -= 0.01;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      
      for (let i = 0; i < this.trail.length; i++) {
        const t = this.trail[i];
        const alpha = (i / this.trail.length) * this.life * 0.5;
        
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#DC143C';
        ctx.beginPath();
        ctx.arc(t.x, t.y, this.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalAlpha = this.life;
      
      const gradient = ctx.createRadialGradient(
        this.x - this.size * 0.3, 
        this.y - this.size * 0.3, 
        0,
        this.x, 
        this.y, 
        this.size
      );
      gradient.addColorStop(0, '#FF6B8A');
      gradient.addColorStop(0.5, '#DC143C');
      gradient.addColorStop(1, '#8B0000');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.size, this.size * 1.4, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  class MysticRing {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    life: number;
    rotation: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.maxRadius = 40 + Math.random() * 20;
      this.life = 1;
      this.rotation = Math.random() * Math.PI * 2;
    }

    update() {
      this.radius += 1.5;
      this.rotation += 0.05;
      this.life = 1 - (this.radius / this.maxRadius);
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life * 0.6;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      ctx.strokeStyle = '#DC143C';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.setLineDash([]);
      ctx.restore();
    }
  }

  const character = new Character();
  const candy = new Candy(character);
  const magicParticles: MagicParticle[] = [];
  const bloodStreams: BloodStream[] = [];
  const mysticRings: MysticRing[] = [];

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a33');
    gradient.addColorStop(1, '#2d1b4e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 30; i++) {
      const sx = (i * 197) % canvas.width;
      const sy = (i * 137) % canvas.height;
      const size = ((i * 73) % 3) + 1;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (character.state === 'magical') {
      if (Math.random() < 0.5 * character.magicIntensity) {
        const noseX = character.x;
        const noseY = character.y - 12;
        magicParticles.push(new MagicParticle(noseX, noseY));
      }
      
      if (character.bleedingIntensity > 0.2 && Math.random() < 0.25 * character.bleedingIntensity) {
        const noseX = character.x;
        const noseY = character.y - 12;
        bloodStreams.push(new BloodStream(noseX + (Math.random() - 0.5) * 8, noseY));
      }
      
      if (Math.random() < 0.05 && character.magicIntensity > 0.5) {
        const noseX = character.x;
        const noseY = character.y - 12;
        mysticRings.push(new MysticRing(noseX, noseY));
      }
    }

    for (let i = mysticRings.length - 1; i >= 0; i--) {
      const ring = mysticRings[i];
      ring.update();
      
      if (ring.radius >= ring.maxRadius) {
        mysticRings.splice(i, 1);
      } else {
        ring.draw(ctx);
      }
    }

    for (let i = magicParticles.length - 1; i >= 0; i--) {
      const particle = magicParticles[i];
      particle.update();
      
      if (particle.life <= 0 || particle.y < 0) {
        magicParticles.splice(i, 1);
      } else {
        particle.draw(ctx);
      }
    }

    candy.update();
    character.update();

    candy.draw(ctx);
    character.draw(ctx);

    for (let i = bloodStreams.length - 1; i >= 0; i--) {
      const stream = bloodStreams[i];
      stream.update();
      
      if (stream.life <= 0 || stream.y > canvas.height) {
        bloodStreams.splice(i, 1);
      } else {
        stream.draw(ctx);
      }
    }

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación de Varita Falsa - Plátano (ID 13)
private animateFakeWandBanana(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  class BananaParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;

    constructor(x: number, y: number, isRubber = false) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * (isRubber ? 6 : 3);
      this.vy = (Math.random() - 0.5) * (isRubber ? 6 : 3) - 2;
      this.life = isRubber ? 60 : 40;
      this.maxLife = this.life;
      this.size = isRubber ? 3 + Math.random() * 4 : 2 + Math.random() * 3;
      this.color = isRubber ? 
        `hsl(${Math.random() * 60 + 300}, 80%, 60%)` : 
        `hsl(${Math.random() * 60 + 200}, 80%, 70%)`;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.15;
      this.vx *= 0.98;
      this.life--;
      this.rotation += this.rotationSpeed;
    }

    draw(ctx: CanvasRenderingContext2D) {
      const alpha = this.life / this.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      ctx.fillStyle = this.color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const x = Math.cos(angle) * this.size;
        const y = Math.sin(angle) * this.size;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  const particles: BananaParticle[] = [];
  const poofParticles: BananaParticle[] = [];
  let time = 0;

  let wandState: 'normal' | 'charging' | 'transforming' | 'rubber' = 'normal';
  let stateTimer = 0;
  const STATE_DURATIONS = {
    normal: 120,
    charging: 40,
    transforming: 30,
    rubber: 90
  };

  let wandWobble = 0;
  let wandScale = 1;
  let wandRotation = 0;

  const drawNormalWand = (x: number, y: number, scale: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    const gradient = ctx.createLinearGradient(-50, 0, 50, 0);
    gradient.addColorStop(0, '#2d1810');
    gradient.addColorStop(0.5, '#5c3317');
    gradient.addColorStop(1, '#2d1810');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(-50, -4);
    ctx.lineTo(50, -2);
    ctx.lineTo(50, 2);
    ctx.lineTo(-50, 4);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 1;
    for (let i = -40; i < 40; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, -4);
      ctx.lineTo(i, 4);
      ctx.stroke();
    }

    ctx.fillStyle = '#ffffcc';
    ctx.beginPath();
    ctx.moveTo(50, -2);
    ctx.lineTo(65, 0);
    ctx.lineTo(50, 2);
    ctx.closePath();
    ctx.fill();

    const glowGradient = ctx.createRadialGradient(65, 0, 0, 65, 0, 10);
    glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(65, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const drawRubberBanana = (x: number, y: number, wobbleAmount: number) => {
    ctx.save();
    ctx.translate(x, y);

    const bendAmount = Math.sin(time * 0.12) * 30;
    const wiggle = Math.sin(time * 0.18) * 8;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      const baseX = -70 + t * 140;
      const curveY = Math.sin(t * Math.PI) * bendAmount;
      const px = baseX + 3;
      const py = curveY + 25 + 3;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.fill();

    ctx.strokeStyle = '#d4a017';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#ffe135';

    ctx.beginPath();
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      const baseX = -70 + t * 140;
      const curveY = Math.sin(t * Math.PI) * bendAmount;
      const width = 18 - Math.abs(t - 0.5) * 8;
      const px = baseX;
      const py = curveY - width;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    ctx.lineTo(70 + wiggle, bendAmount);

    for (let i = 30; i >= 0; i--) {
      const t = i / 30;
      const baseX = -70 + t * 140;
      const curveY = Math.sin(t * Math.PI) * bendAmount;
      const width = 18 - Math.abs(t - 0.5) * 8;
      const px = baseX;
      const py = curveY + width;
      ctx.lineTo(px, py);
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#d4a700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      const baseX = -70 + t * 140;
      const curveY = Math.sin(t * Math.PI) * bendAmount;
      const px = baseX;
      const py = curveY - 5;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i <= 30; i++) {
      const t = i / 30;
      const baseX = -70 + t * 140;
      const curveY = Math.sin(t * Math.PI) * bendAmount;
      const px = baseX;
      const py = curveY + 5;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.fillStyle = '#8b6914';
    const spots = [
      { x: -40, y: Math.sin(0.3 * Math.PI) * bendAmount + 3, w: 12, h: 8 },
      { x: -15, y: Math.sin(0.4 * Math.PI) * bendAmount - 2, w: 10, h: 7 },
      { x: 10, y: Math.sin(0.55 * Math.PI) * bendAmount + 4, w: 14, h: 9 },
      { x: 35, y: Math.sin(0.7 * Math.PI) * bendAmount - 1, w: 11, h: 7 },
      { x: 50, y: Math.sin(0.8 * Math.PI) * bendAmount + 2, w: 9, h: 6 },
    ];

    spots.forEach(spot => {
      ctx.beginPath();
      ctx.ellipse(spot.x, spot.y, spot.w, spot.h, Math.random() * 0.3, 0, Math.PI * 2);
      ctx.fill();
    });

    const stemY = Math.sin(0.05 * Math.PI) * bendAmount;
    ctx.fillStyle = '#654321';
    ctx.strokeStyle = '#4a3319';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(-72, stemY - 8);
    ctx.lineTo(-82, stemY - 12);
    ctx.lineTo(-82, stemY + 12);
    ctx.lineTo(-72, stemY + 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#3a2312';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(-78, stemY - 6 + i * 6);
      ctx.lineTo(-76, stemY - 6 + i * 6);
      ctx.stroke();
    }

    ctx.fillStyle = '#6b5d1f';
    ctx.beginPath();
    const tipY = Math.sin(0.95 * Math.PI) * bendAmount;
    ctx.arc(68 + wiggle, tipY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const faceX = 0;
    const faceY = Math.sin(0.5 * Math.PI) * bendAmount;

    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(faceX - 22, faceY - 6);
    ctx.lineTo(faceX - 16, faceY);
    ctx.moveTo(faceX - 22, faceY);
    ctx.lineTo(faceX - 16, faceY - 6);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(faceX + 16, faceY - 6);
    ctx.lineTo(faceX + 22, faceY);
    ctx.moveTo(faceX + 16, faceY);
    ctx.lineTo(faceX + 22, faceY - 6);
    ctx.stroke();

    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(faceX - 18, faceY + 10);
    ctx.quadraticCurveTo(faceX - 10, faceY + 8, faceX, faceY + 11);
    ctx.quadraticCurveTo(faceX + 10, faceY + 9, faceX + 18, faceY + 11);
    ctx.stroke();

    for (let i = 0; i < 4; i++) {
      const angle = (time * 0.08 + i * Math.PI * 2 / 4);
      const orbitRadius = 55;
      const starX = faceX + Math.cos(angle) * orbitRadius;
      const starY = faceY + Math.sin(angle) * (orbitRadius * 0.7);

      ctx.fillStyle = i % 2 === 0 ? '#ffff00' : '#ffa500';
      ctx.strokeStyle = '#ff8800';
      ctx.lineWidth = 1.5;
      ctx.save();
      ctx.translate(starX, starY);
      ctx.rotate(time * 0.15);

      ctx.beginPath();
      for (let j = 0; j < 8; j++) {
        const starAngle = (j * Math.PI) / 4;
        const radius = j % 2 === 0 ? 7 : 3;
        const sx = Math.cos(starAngle) * radius;
        const sy = Math.sin(starAngle) * radius;
        if (j === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    for (let i = 0; i < 3; i++) {
      const offset = i * 25 - 25;
      const moveY = Math.sin(0.5 * Math.PI) * bendAmount + offset;

      ctx.beginPath();
      ctx.moveTo(-85, moveY);
      ctx.lineTo(-90, moveY - 5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(75, moveY);
      ctx.lineTo(80, moveY + 5);
      ctx.stroke();
    }

    ctx.restore();
  };

  const createPoofEffect = (x: number, y: number) => {
    for (let i = 0; i < 30; i++) {
      poofParticles.push(new BananaParticle(x, y, true));
    }

    for (let i = 0; i < 20; i++) {
      const angle = (i * Math.PI * 2) / 20;
      const speed = 3 + Math.random() * 2;
      const p = new BananaParticle(x, y, true);
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.size = 4;
      poofParticles.push(p);
    }
  };

  const animate = () => {
    const bgGradient = ctx.createRadialGradient(300, 200, 0, 300, 200, 400);
    bgGradient.addColorStop(0, '#1a0a3e');
    bgGradient.addColorStop(1, '#0a0015');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stateTimer++;

    if (wandState === 'normal' && stateTimer >= STATE_DURATIONS.normal) {
      wandState = 'charging';
      stateTimer = 0;
    } else if (wandState === 'charging' && stateTimer >= STATE_DURATIONS.charging) {
      wandState = 'transforming';
      stateTimer = 0;
      createPoofEffect(canvas.width / 2, canvas.height / 2);
    } else if (wandState === 'transforming' && stateTimer >= STATE_DURATIONS.transforming) {
      wandState = 'rubber';
      stateTimer = 0;
    } else if (wandState === 'rubber' && stateTimer >= STATE_DURATIONS.rubber) {
      wandState = 'normal';
      stateTimer = 0;
      particles.length = 0;
      poofParticles.length = 0;
    }

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    if (wandState === 'normal') {
      wandWobble = 0;
      wandScale = 1;
      wandRotation = Math.sin(time * 0.03) * 0.1;

      if (time % 10 === 0) {
        particles.push(new BananaParticle(cx + 65, cy, false));
      }

    } else if (wandState === 'charging') {
      wandWobble = Math.sin(time * 0.3) * 2;
      wandScale = 1 + Math.sin(time * 0.2) * 0.1;
      wandRotation = Math.sin(time * 0.3) * 0.2;

      if (time % 3 === 0) {
        particles.push(new BananaParticle(cx + Math.random() * 100 - 50, cy + Math.random() * 100 - 50, false));
      }

    } else if (wandState === 'transforming') {
      wandScale = 1 + Math.sin(stateTimer * 0.5) * 0.5;
      wandRotation = stateTimer * 0.3;

    } else if (wandState === 'rubber') {
      wandWobble = 10;
    }

    if (wandState !== 'rubber') {
      drawNormalWand(cx, cy + wandWobble, wandScale, wandRotation);
    } else {
      drawRubberBanana(cx, cy, wandWobble);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    for (let i = poofParticles.length - 1; i >= 0; i--) {
      poofParticles[i].update();
      poofParticles[i].draw(ctx);
      if (poofParticles[i].life <= 0) {
        poofParticles.splice(i, 1);
      }
    }

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación de Caramelos de la Verdad (ID 14)
private animateTruthCandy(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;

  class Character {
    x: number;
    y: number;
    state: string;
    eatProgress: number;
    glowIntensity: number;
    eyesOpen: boolean;
    blinkTimer: number;
    bounceOffset: number;
    mouthOpen: boolean;
    speakTimer: number;

    constructor() {
      this.x = canvas.width / 2 - 80;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.eatProgress = 0;
      this.glowIntensity = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
      this.bounceOffset = 0;
      this.mouthOpen = false;
      this.speakTimer = 0;
    }

    update() {
      if (this.state === 'standing') {
        this.eatProgress += 0.012;
        this.bounceOffset = Math.sin(time * 0.05) * 2;
        
        if (this.eatProgress >= 1) {
          this.state = 'eating';
          this.eatProgress = 0;
        }
      } else if (this.state === 'eating') {
        this.eatProgress += 0.025;
        
        if (this.eatProgress >= 1) {
          this.state = 'glowing';
          this.eatProgress = 0;
        }
      } else if (this.state === 'glowing') {
        this.glowIntensity += 0.015;
        this.bounceOffset = Math.sin(time * 0.08) * 3;
        
        this.speakTimer++;
        if (this.speakTimer % 40 < 20) {
          this.mouthOpen = true;
        } else {
          this.mouthOpen = false;
        }
        
        if (this.glowIntensity >= 2.5) {
          this.reset();
        }
      }

      if (this.eyesOpen && this.state !== 'eating') {
        this.blinkTimer++;
        if (this.blinkTimer > 90 && Math.random() < 0.02) {
          this.eyesOpen = false;
          setTimeout(() => { this.eyesOpen = true; }, 120);
          this.blinkTimer = 0;
        }
      }
    }

    reset() {
      this.state = 'standing';
      this.eatProgress = 0;
      this.glowIntensity = 0;
      this.bounceOffset = 0;
      this.mouthOpen = false;
      this.speakTimer = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y + this.bounceOffset);

      if (this.state === 'glowing') {
        const haloAlpha = Math.sin(this.glowIntensity * 2) * 0.3 + 0.4;
        const haloSize = 100 + Math.sin(time * 0.1) * 10;
        
        const haloGradient = ctx.createRadialGradient(0, -20, 20, 0, -20, haloSize);
        haloGradient.addColorStop(0, `rgba(77, 208, 225, ${haloAlpha})`);
        haloGradient.addColorStop(0.5, `rgba(100, 181, 246, ${haloAlpha * 0.5})`);
        haloGradient.addColorStop(1, 'rgba(77, 208, 225, 0)');
        
        ctx.fillStyle = haloGradient;
        ctx.beginPath();
        ctx.arc(0, -20, haloSize, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 3; i++) {
          const ringProgress = (this.glowIntensity + i * 0.3) % 1;
          const ringRadius = 60 + ringProgress * 80;
          const ringAlpha = (1 - ringProgress) * 0.4;
          
          ctx.strokeStyle = `rgba(77, 208, 225, ${ringAlpha})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, -20, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.ellipse(0, 110, 45, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#6B4E3D';
      ctx.beginPath();
      ctx.ellipse(-12, 85, 10, 25, -0.1, 0, Math.PI * 2);
      ctx.ellipse(12, 85, 10, 25, 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#3D2817';
      ctx.beginPath();
      ctx.ellipse(-12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(12, 105, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      const bodyGradient = ctx.createLinearGradient(0, 0, 0, 100);
      bodyGradient.addColorStop(0, '#9B6B47');
      bodyGradient.addColorStop(1, '#7D5635');
      ctx.fillStyle = bodyGradient;
      
      ctx.beginPath();
      ctx.ellipse(0, 35, 38, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'glowing') {
        ctx.fillStyle = `rgba(77, 208, 225, ${Math.sin(time * 0.15) * 0.2 + 0.2})`;
        ctx.beginPath();
        ctx.ellipse(0, 35, 38, 55, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = '#FFD7BA';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';

      if (this.state === 'eating') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-25, -10, -5, -15);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-5, -15, 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.lineTo(-42, 60);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.moveTo(35, 20);
      ctx.lineTo(42, 60);
      ctx.stroke();
      
      ctx.fillStyle = '#FFD7BA';
      ctx.beginPath();
      ctx.arc(42, 60, 9, 0, Math.PI * 2);
      ctx.fill();

      const headGradient = ctx.createRadialGradient(-8, -28, 5, 0, -20, 45);
      headGradient.addColorStop(0, '#FFEBD4');
      headGradient.addColorStop(1, '#FFD7BA');
      ctx.fillStyle = headGradient;
      
      ctx.beginPath();
      ctx.arc(0, -20, 42, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'glowing') {
        ctx.fillStyle = `rgba(129, 212, 250, ${Math.sin(time * 0.2) * 0.15 + 0.15})`;
        ctx.beginPath();
        ctx.arc(0, -20, 42, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(0, -42, 40, 25, 0, 0, Math.PI, true);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(-20, -38, 15, 0, Math.PI * 2);
      ctx.arc(20, -38, 15, 0, Math.PI * 2);
      ctx.arc(0, -50, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(-40, -20, 8, 12, -0.2, 0, Math.PI * 2);
      ctx.ellipse(40, -20, 8, 12, 0.2, 0, Math.PI * 2);
      ctx.fill();

      if (this.eyesOpen) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.ellipse(18, -23, 11, 13, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2C1810';
        ctx.beginPath();
        ctx.arc(-18, -22, 6, 0, Math.PI * 2);
        ctx.arc(18, -22, 6, 0, Math.PI * 2);
        ctx.fill();

        if (this.state === 'glowing') {
          ctx.fillStyle = '#4dd0e1';
          ctx.beginPath();
          ctx.arc(-16, -25, 3, 0, Math.PI * 2);
          ctx.arc(20, -25, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(-16, -25, 3, 0, Math.PI * 2);
          ctx.arc(20, -25, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-24, -23);
        ctx.lineTo(-12, -23);
        ctx.moveTo(12, -23);
        ctx.lineTo(24, -23);
        ctx.stroke();
      }

      ctx.strokeStyle = '#6B4423';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(-28, -32);
      ctx.quadraticCurveTo(-18, -35, -10, -32);
      ctx.moveTo(10, -32);
      ctx.quadraticCurveTo(18, -35, 28, -32);
      ctx.stroke();

      ctx.fillStyle = '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(0, -12, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'eating') {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(0, -3, 10, 0.2, Math.PI - 0.2);
        ctx.fill();
      } else if (this.state === 'glowing' && this.mouthOpen) {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.ellipse(0, -3, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(77, 208, 225, 0.6)';
        ctx.beginPath();
        ctx.ellipse(0, -3, 8, 10, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.arc(0, -5, 14, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255, 160, 160, 0.4)';
      ctx.beginPath();
      ctx.arc(-28, -12, 10, 0, Math.PI * 2);
      ctx.arc(28, -12, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class TruthCandy {
    x: number;
    y: number;
    visible: boolean;
    eaten: boolean;
    float: number;
    sparkles: Array<{x: number, y: number, size: number, life: number, vx: number, vy: number}>;
    character: Character;

    constructor(character: Character) {
      this.character = character;
      this.x = canvas.width / 2 + 100;
      this.y = canvas.height / 2 - 30;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
      this.sparkles = [];
    }

    update() {
      if (!this.eaten) {
        this.float += 0.08;
        
        if (Math.random() < 0.15) {
          this.sparkles.push({
            x: this.x + (Math.random() - 0.5) * 20,
            y: this.y + (Math.random() - 0.5) * 20,
            size: Math.random() * 3 + 2,
            life: 1,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
          });
        }
      }

      for (let i = this.sparkles.length - 1; i >= 0; i--) {
        const s = this.sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.02;
        if (s.life <= 0) {
          this.sparkles.splice(i, 1);
        }
      }

      if (this.character.state === 'eating' && !this.eaten) {
        this.x += (this.character.x - 5 - this.x) * 0.12;
        this.y += (this.character.y - 15 - this.y) * 0.12;

        if (Math.abs(this.x - (this.character.x - 5)) < 10) {
          this.visible = false;
          this.eaten = true;
        }
      }

      if (this.character.state === 'standing' && this.character.eatProgress < 0.1) {
        this.reset();
      }
    }

    reset() {
      this.x = canvas.width / 2 + 100;
      this.y = canvas.height / 2 - 30;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
      this.sparkles = [];
    }

    draw(ctx: CanvasRenderingContext2D) {
      for (const s of this.sparkles) {
        ctx.save();
        ctx.globalAlpha = s.life;
        ctx.fillStyle = '#4dd0e1';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (!this.visible) return;

      const floatOffset = Math.sin(this.float) * 6;

      ctx.save();
      ctx.translate(this.x, this.y + floatOffset);

      const auraGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 35);
      auraGradient.addColorStop(0, 'rgba(77, 208, 225, 0.4)');
      auraGradient.addColorStop(1, 'rgba(77, 208, 225, 0)');
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 35, 0, Math.PI * 2);
      ctx.fill();

      const candyGradient = ctx.createRadialGradient(-5, -5, 0, 0, 0, 20);
      candyGradient.addColorStop(0, '#80deea');
      candyGradient.addColorStop(0.5, '#4dd0e1');
      candyGradient.addColorStop(1, '#00bcd4');
      
      ctx.fillStyle = candyGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(-6, -6, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(4, 5, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(129, 212, 250, 0.7)';
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.lineTo(-26, -7);
      ctx.lineTo(-26, 7);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(26, -7);
      ctx.lineTo(26, 7);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-18, -4);
      ctx.lineTo(-24, -8);
      ctx.moveTo(-18, 4);
      ctx.lineTo(-24, 8);
      ctx.moveTo(18, -4);
      ctx.lineTo(24, -8);
      ctx.moveTo(18, 4);
      ctx.lineTo(24, 8);
      ctx.stroke();

      ctx.restore();
    }
  }

  class TruthBubble {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    fadeSpeed: number;
    wobble: number;
    wobbleSpeed: number;
    text: string;
    rotation: number;

    constructor(x: number, y: number) {
      this.x = x + (Math.random() - 0.5) * 60;
      this.y = y - 40;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = -Math.random() * 1.5 - 1;
      this.size = Math.random() * 25 + 20;
      this.life = 1;
      this.fadeSpeed = 0.006;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.1 + 0.05;
      this.text = this.getRandomTruthText();
      this.rotation = Math.random() * 0.4 - 0.2;
    }

    getRandomTruthText(): string {
      const texts = ['!', '?', '...', 'SÍ', 'NO', 'VERDAD'];
      return texts[Math.floor(Math.random() * texts.length)];
    }

    update() {
      this.x += this.vx + Math.sin(this.wobble) * 0.5;
      this.y += this.vy;
      this.wobble += this.wobbleSpeed;
      this.life -= this.fadeSpeed;
      this.vy *= 0.98;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      const bubbleGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      bubbleGradient.addColorStop(0, 'rgba(225, 245, 254, 0.95)');
      bubbleGradient.addColorStop(1, 'rgba(179, 229, 252, 0.8)');
      
      ctx.fillStyle = bubbleGradient;
      ctx.strokeStyle = '#4dd0e1';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(-this.size * 0.3, -this.size * 0.3, this.size * 0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#00838f';
      ctx.font = `bold ${this.size * 0.5}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.text, 0, 0);

      ctx.restore();
    }
  }

  const character = new Character();
  const candy = new TruthCandy(character);
  const bubbles: TruthBubble[] = [];

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a33');
    gradient.addColorStop(1, '#0d1b2a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 40; i++) {
      const sx = (i * 197) % canvas.width;
      const sy = (i * 137) % canvas.height;
      const size = ((i * 73) % 3) + 1;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (character.state === 'glowing' && Math.random() < 0.08) {
      bubbles.push(new TruthBubble(character.x, character.y - 20));
    }

    for (let i = bubbles.length - 1; i >= 0; i--) {
      bubbles[i].update();
      bubbles[i].draw(ctx);
      
      if (bubbles[i].life <= 0) {
        bubbles.splice(i, 1);
      }
    }

    candy.update();
    character.update();

    candy.draw(ctx);
    character.draw(ctx);

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación del Chocolate Rompedientes (ID 15)
private animateChocolateRompedientes(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;
  const cycleTime = 200;

  const drawFace = (x: number, y: number, rotation: number, expression: any) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    const scale = expression.scale || 1;
    ctx.scale(scale, scale);

    // Cabeza con sombras realistas
    const headGradient = ctx.createRadialGradient(-10, -10, 10, 0, 0, 55);
    headGradient.addColorStop(0, '#ffe4c4');
    headGradient.addColorStop(0.7, '#ffd4a3');
    headGradient.addColorStop(1, '#e6b88a');
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.arc(0, 0, 55, 0, Math.PI * 2);
    ctx.fill();

    // Contorno de la cara
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Orejas
    ctx.fillStyle = '#ffd4a3';
    ctx.beginPath();
    ctx.ellipse(-50, 0, 15, 20, 0, 0, Math.PI * 2);
    ctx.ellipse(50, 0, 15, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sombras de orejas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.ellipse(-50, 0, 8, 12, 0, 0, Math.PI * 2);
    ctx.ellipse(50, 0, 8, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cabello
    ctx.fillStyle = '#4a2c2a';
    ctx.beginPath();
    ctx.arc(0, -15, 58, Math.PI, Math.PI * 2);
    ctx.fill();
    
    // Mechones de cabello
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.ellipse(i * 20, -55, 12, 20, i * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cejas expresivas
    ctx.strokeStyle = '#3a1c1a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    if (expression.eyebrowAngle) {
      // Cejas preocupadas
      ctx.beginPath();
      ctx.moveTo(-30, -20);
      ctx.quadraticCurveTo(-22, -18 - expression.eyebrowAngle * 5, -14, -20);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(30, -20);
      ctx.quadraticCurveTo(22, -18 - expression.eyebrowAngle * 5, 14, -20);
      ctx.stroke();
    } else {
      // Cejas normales
      ctx.beginPath();
      ctx.moveTo(-30, -20);
      ctx.lineTo(-14, -22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(30, -20);
      ctx.lineTo(14, -22);
      ctx.stroke();
    }

    // Ojos
    if (expression.eyesClosed) {
      // Ojos cerrados con fuerza
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-26, -8);
      ctx.quadraticCurveTo(-18, -12, -10, -8);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(26, -8);
      ctx.quadraticCurveTo(18, -12, 10, -8);
      ctx.stroke();

      // Arrugas de dolor
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.moveTo(-28 - i * 5, -5);
        ctx.lineTo(-24 - i * 5, -8);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(28 + i * 5, -5);
        ctx.lineTo(24 + i * 5, -8);
        ctx.stroke();
      }
    } else {
      // Ojos abiertos detallados
      const eyeWidth = 12 + (expression.eyeWide || 0);
      const eyeHeight = 14 + (expression.eyeWide || 0);

      // Ojo izquierdo
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(-18, -8, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#4a90e2';
      ctx.beginPath();
      ctx.arc(-18, -8, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-18, -8, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-16, -10, 2, 0, Math.PI * 2);
      ctx.fill();

      // Ojo derecho
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(18, -8, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#4a90e2';
      ctx.beginPath();
      ctx.arc(18, -8, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(18, -8, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(20, -10, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Nariz
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(-3, 8);
    ctx.lineTo(0, 10);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 192, 203, 0.3)';
    ctx.beginPath();
    ctx.ellipse(-2, 10, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mejillas sonrojadas
    const blushAlpha = expression.blush || 0.2;
    ctx.fillStyle = `rgba(255, 150, 150, ${blushAlpha})`;
    ctx.beginPath();
    ctx.ellipse(-28, 10, 12, 10, 0, 0, Math.PI * 2);
    ctx.ellipse(28, 10, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Boca expresiva
    if (expression.mouthOpen) {
      const openAmount = expression.mouthOpen;
      
      ctx.fillStyle = '#8b4444';
      ctx.beginPath();
      ctx.ellipse(0, 22, 18, openAmount, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#c97676';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-18, 22 - openAmount / 2);
      ctx.quadraticCurveTo(0, 18 - openAmount / 2, 18, 22 - openAmount / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-18, 22 + openAmount / 2);
      ctx.quadraticCurveTo(0, 26 + openAmount / 2, 18, 22 + openAmount / 2);
      ctx.stroke();

      // Dientes superiores
      ctx.fillStyle = '#ffffff';
      const numTeeth = 5;
      for (let i = 0; i < numTeeth; i++) {
        const toothX = -15 + (i * 30 / numTeeth);
        ctx.fillRect(toothX, 18 - openAmount / 2, 5, 8);
      }

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 1; i < numTeeth; i++) {
        const lineX = -15 + (i * 30 / numTeeth);
        ctx.beginPath();
        ctx.moveTo(lineX, 18 - openAmount / 2);
        ctx.lineTo(lineX, 26 - openAmount / 2);
        ctx.stroke();
      }

      // Dientes inferiores
      ctx.fillStyle = '#f5f5f5';
      for (let i = 0; i < numTeeth; i++) {
        const toothX = -15 + (i * 30 / numTeeth);
        ctx.fillRect(toothX, 22 + openAmount / 2 - 8, 5, 8);
      }

      // Lengua
      ctx.fillStyle = '#ff6b8a';
      ctx.beginPath();
      ctx.ellipse(0, 25, 10, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.ellipse(-2, 24, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();

    } else if (expression.mouthPain) {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 25, 15, 12, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#8b4444';
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.fillRect(-8, 18, 4, 6);
      ctx.fillRect(-2, 18, 4, 6);
      ctx.fillRect(4, 18, 4, 6);

    } else {
      ctx.strokeStyle = '#c97676';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-15, 25);
      ctx.quadraticCurveTo(0, 30, 15, 25);
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawChocolate = (x: number, y: number, shake: number, glow: number, biteMarks: number) => {
    ctx.save();

    if (glow > 0) {
      ctx.shadowBlur = glow;
      ctx.shadowColor = '#8b4513';
    }

    const chocolateGradient = ctx.createLinearGradient(x - 50, y - 35, x - 50, y + 35);
    chocolateGradient.addColorStop(0, '#3d2517');
    chocolateGradient.addColorStop(0.5, '#2d1810');
    chocolateGradient.addColorStop(1, '#1d0f08');
    
    ctx.fillStyle = chocolateGradient;
    ctx.fillRect(x - 50 + shake, y - 35, 100, 70);

    ctx.strokeStyle = '#1a0a06';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 50 + shake, y - 35, 100, 70);

    ctx.strokeStyle = '#2d1810';
    ctx.lineWidth = 1.5;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(x - 50 + i * 25 + shake, y - 35);
      ctx.lineTo(x - 50 + i * 25 + shake, y + 35);
      ctx.stroke();
    }
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(x - 50 + shake, y - 35 + i * 23.3);
      ctx.lineTo(x + 50 + shake, y - 35 + i * 23.3);
      ctx.stroke();
    }

    const shineGradient = ctx.createLinearGradient(x - 40, y - 30, x - 40, y - 20);
    shineGradient.addColorStop(0, 'rgba(139, 69, 19, 0.4)');
    shineGradient.addColorStop(1, 'rgba(139, 69, 19, 0)');
    ctx.fillStyle = shineGradient;
    ctx.fillRect(x - 45 + shake, y - 30, 90, 15);

    if (biteMarks > 0) {
      ctx.fillStyle = `rgba(100, 50, 20, ${biteMarks})`;
      ctx.beginPath();
      ctx.arc(x + shake, y - 35, 12, 0, Math.PI);
      ctx.fill();
      
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(x - 8 + i * 5 + shake, y - 35, 3, 5);
      }
    }

    ctx.shadowBlur = 0;
    ctx.restore();

    if (shake !== 0) {
      ctx.fillStyle = 'rgba(139, 69, 19, 0.4)';
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const dist = 60 + Math.random() * 10;
        ctx.beginPath();
        ctx.arc(
          x + Math.cos(angle) * dist + shake,
          y + Math.sin(angle) * dist,
          3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  };

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#0a0514');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const approachPhase = time < 70;
    const bitePhase = time >= 70 && time < 85;
    const impactPhase = time >= 85 && time < 100;
    const recoilPhase = time >= 100 && time < 150;
    const recoveryPhase = time >= 150;

    let headY = centerY - 80;
    let headRotation = 0;
    let expression: any = {
      mouthOpen: 0,
      eyesClosed: false,
      eyeWide: 0,
      eyebrowAngle: 0,
      blush: 0.2,
      mouthPain: false,
      scale: 1
    };

    if (approachPhase) {
      const progress = time / 70;
      headY = centerY - 80 + progress * 50;
      expression.mouthOpen = Math.sin(progress * Math.PI) * 20;
      expression.eyeWide = progress * 4;
    } else if (bitePhase) {
      headY = centerY - 30;
      expression.mouthOpen = 25;
      expression.eyeWide = 5;
    } else if (impactPhase) {
      const impactProgress = (time - 85) / 15;
      headY = centerY - 30 + Math.sin(impactProgress * Math.PI * 4) * 3;
      headRotation = Math.sin(impactProgress * Math.PI * 6) * 0.15;
      expression.eyesClosed = true;
      expression.mouthPain = true;
      expression.blush = 0.6;
      expression.eyebrowAngle = 1;
    } else if (recoilPhase) {
      const recoilProgress = (time - 100) / 50;
      const bounce = Math.sin(recoilProgress * Math.PI);
      headY = centerY - 30 - bounce * 100;
      headRotation = -bounce * 0.4;
      expression.eyesClosed = true;
      expression.mouthPain = true;
      expression.blush = 0.6 * (1 - recoilProgress * 0.5);
      expression.eyebrowAngle = 1;
      expression.scale = 1 + bounce * 0.1;
    } else if (recoveryPhase) {
      const recoveryProgress = (time - 150) / 50;
      headY = centerY - 80;
      expression.eyesClosed = recoveryProgress < 0.5;
      expression.blush = 0.3;
    }

    const chocolateY = centerY + 30;
    let chocolateShake = 0;
    let chocolateGlow = 0;
    let biteMarks = 0;

    if (bitePhase) {
      biteMarks = 0.5;
    } else if (impactPhase) {
      const impactProgress = (time - 85) / 15;
      chocolateShake = Math.sin(time * 4) * 10;
      chocolateGlow = 20;
      biteMarks = 1;
    } else if (recoilPhase) {
      const recoilProgress = (time - 100) / 50;
      chocolateShake = Math.sin(time * 3) * 8 * (1 - recoilProgress);
      chocolateGlow = 15 * (1 - recoilProgress);
      biteMarks = 1 - recoilProgress;
    }

    drawChocolate(centerX, chocolateY, chocolateShake, chocolateGlow, biteMarks);
    drawFace(centerX, headY, headRotation, expression);

    if (impactPhase) {
      const impactProgress = (time - 85) / 15;
      
      ctx.strokeStyle = `rgba(255, 215, 0, ${1 - impactProgress})`;
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(
          centerX,
          chocolateY,
          30 + impactProgress * 60 + i * 20,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      ctx.save();
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = `rgba(255, 215, 0, ${1 - impactProgress})`;
      ctx.strokeStyle = `rgba(139, 69, 19, ${1 - impactProgress})`;
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';
      const impactY = chocolateY - 60 - impactProgress * 30;
      ctx.strokeText('¡CLANG!', centerX, impactY);
      ctx.fillText('¡CLANG!', centerX, impactY);
      ctx.restore();
    }

    if (recoilPhase) {
      const recoilProgress = (time - 100) / 50;
      const alpha = 1 - recoilProgress;
      ctx.fillStyle = `rgba(255, 255, 100, ${alpha})`;
      
      const starPositions = [
        { x: centerX - 70, y: headY - 50, rotation: time * 0.1 },
        { x: centerX - 80, y: headY - 20, rotation: -time * 0.12 },
        { x: centerX - 70, y: headY + 10, rotation: time * 0.08 }
      ];

      starPositions.forEach(star => {
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(star.rotation);
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const radius = i % 2 === 0 ? 10 : 5;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
    }

    time++;
    if (time >= cycleTime) {
      time = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

}