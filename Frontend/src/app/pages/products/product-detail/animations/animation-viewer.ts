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
    }else if (this.animation?.id === 16) {  
    this.animateLibroMordedor(ctx, canvas);  
    }else if (this.animation?.id === 17) { 
    this.animatePergaminoInservible(ctx, canvas);
    }else if (this.animation?.id === 18) {  
    this.animatePlumaInvisible(ctx, canvas);  
    } else if (this.animation?.id === 19) {
    this.animateSprayAumentaTodo(ctx, canvas);
    }else if (this.animation?.id === 20) {  
    this.animateVaritasDelReves(ctx, canvas); 
    }else if (this.animation?.id === 21) { 
    this.animateDaydreamFantasy(ctx, canvas); 
    }else if (this.animation?.id === 22) {
    this.animateMarcasTenebrosas(ctx, canvas);
    }else if (this.animation?.id === 23) {
    this.animateEscudoMagico(ctx, canvas);
    }else if (this.animation?.id === 24) {
    this.animatePeruvianDarknessPowder(ctx, canvas); 
    } else if (this.animation?.id === 25) {  
    this.animateDetonadoresTrampa(ctx, canvas); 
    }else if (this.animation?.id === 26) {  
    this.animatePuffskeinsPigmeos(ctx, canvas); 
    } else if (this.animation?.id === 27) {
    this.animateLovePotion(ctx, canvas); 
    }else if (this.animation?.id === 28) {
    this.animateLordKakadura(ctx, canvas);
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


// Animación del Libro Mordedor (ID 16)
private animateLibroMordedor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;
  const cycleTime = 240;

  interface MagicParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
  }

  const particles: MagicParticle[] = [];

  class ParticleClass {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;

    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = (Math.random() - 0.5) * 1;
      this.life = 100;
      this.maxLife = 100;
      this.size = Math.random() * 3 + 1;
      this.color = ['#ffd700', '#ffaa00', '#ff6b00', '#ff00ff'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;

      this.vx += (Math.random() - 0.5) * 0.1;
      this.vy += (Math.random() - 0.5) * 0.1;

      const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
      if (speed > 2) {
        this.vx = (this.vx / speed) * 2;
        this.vy = (this.vy / speed) * 2;
      }

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      const alpha = this.life / this.maxLife;
      ctx.fillStyle = this.color;
      ctx.globalAlpha = alpha * 0.8;
      
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? this.size : this.size / 2;
        const x = this.x + Math.cos(angle) * radius;
        const y = this.y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.globalAlpha = 1;
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const drawBook = (x: number, y: number, angle: number, mouthOpen: number, eyeExpression: any, bounce: number) => {
    ctx.save();
    ctx.translate(x, y + bounce);
    ctx.rotate(angle);

    const bookWidth = 120;
    const bookHeight = 90;

    // Sombra del libro
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(0, bookHeight / 2 + 10, bookWidth / 2, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Parte inferior del libro
    const lowerGradient = ctx.createLinearGradient(-bookWidth / 2, 0, bookWidth / 2, 0);
    lowerGradient.addColorStop(0, '#6d4c2a');
    lowerGradient.addColorStop(0.5, '#8b6332');
    lowerGradient.addColorStop(1, '#6d4c2a');
    ctx.fillStyle = lowerGradient;
    ctx.fillRect(-bookWidth / 2, 0, bookWidth, bookHeight / 2);

    // Textura peluda en parte inferior
    ctx.strokeStyle = 'rgba(139, 99, 50, 0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 40; i++) {
      const furX = -bookWidth / 2 + Math.random() * bookWidth;
      const furY = Math.random() * (bookHeight / 2);
      const furLength = Math.random() * 6 + 2;
      ctx.beginPath();
      ctx.moveTo(furX, furY);
      ctx.lineTo(furX + Math.random() * 4 - 2, furY + furLength);
      ctx.stroke();
    }

    // Parte superior del libro
    ctx.save();
    ctx.translate(0, 0);
    
    const openAngle = (mouthOpen / 100) * Math.PI * 0.4;
    ctx.rotate(-openAngle);

    const upperGradient = ctx.createLinearGradient(-bookWidth / 2, -bookHeight / 2, bookWidth / 2, 0);
    upperGradient.addColorStop(0, '#8b6332');
    upperGradient.addColorStop(0.5, '#a67c3a');
    upperGradient.addColorStop(1, '#8b6332');
    ctx.fillStyle = upperGradient;
    ctx.fillRect(-bookWidth / 2, -bookHeight / 2, bookWidth, bookHeight / 2);

    // Textura peluda en parte superior
    ctx.strokeStyle = 'rgba(166, 124, 58, 0.4)';
    for (let i = 0; i < 40; i++) {
      const furX = -bookWidth / 2 + Math.random() * bookWidth;
      const furY = -bookHeight / 2 + Math.random() * (bookHeight / 2);
      const furLength = Math.random() * 6 + 2;
      ctx.beginPath();
      ctx.moveTo(furX, furY);
      ctx.lineTo(furX + Math.random() * 4 - 2, furY - furLength);
      ctx.stroke();
    }

    // Ojos
    const eyeY = -bookHeight / 4;
    const eyeSize = 12;
    const pupilSize = 6;

    // Ojo izquierdo
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-25, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.arc(-25 + eyeExpression.pupilOffsetX, eyeY + eyeExpression.pupilOffsetY, pupilSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(-25 + eyeExpression.pupilOffsetX, eyeY + eyeExpression.pupilOffsetY, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(-27 + eyeExpression.pupilOffsetX, eyeY - 2 + eyeExpression.pupilOffsetY, 2, 0, Math.PI * 2);
    ctx.fill();

    // Ojo derecho
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(25, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.arc(25 + eyeExpression.pupilOffsetX, eyeY + eyeExpression.pupilOffsetY, pupilSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(25 + eyeExpression.pupilOffsetX, eyeY + eyeExpression.pupilOffsetY, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(23 + eyeExpression.pupilOffsetX, eyeY - 2 + eyeExpression.pupilOffsetY, 2, 0, Math.PI * 2);
    ctx.fill();

    // Cejas
    ctx.strokeStyle = '#5c3d1f';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    if (eyeExpression.angry) {
      ctx.beginPath();
      ctx.moveTo(-35, eyeY - 15);
      ctx.lineTo(-15, eyeY - 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(35, eyeY - 15);
      ctx.lineTo(15, eyeY - 10);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(-35, eyeY - 12);
      ctx.quadraticCurveTo(-25, eyeY - 15, -15, eyeY - 12);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(35, eyeY - 12);
      ctx.quadraticCurveTo(25, eyeY - 15, 15, eyeY - 12);
      ctx.stroke();
    }

    ctx.restore();

    // Dientes
    if (mouthOpen > 10) {
      ctx.fillStyle = '#fff';
      const numTeeth = 8;
      const toothWidth = bookWidth / (numTeeth * 1.5);
      const toothHeight = 12;

      for (let i = 0; i < numTeeth; i++) {
        const toothX = -bookWidth / 2 + (i * bookWidth) / numTeeth + toothWidth / 2;
        
        ctx.beginPath();
        ctx.moveTo(toothX - toothWidth / 2, -2);
        ctx.lineTo(toothX, toothHeight);
        ctx.lineTo(toothX + toothWidth / 2, -2);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(toothX - toothWidth / 2 + 5, 2);
        ctx.lineTo(toothX + 5, -toothHeight);
        ctx.lineTo(toothX + toothWidth / 2 + 5, 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    // Título
    if (mouthOpen < 50) {
      ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.font = 'bold 14px Georgia';
      ctx.textAlign = 'center';
      
    }

    ctx.restore();
  };

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#0a0514');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Partículas
    if (Math.random() < 0.2) {
      particles.push(new ParticleClass() as any);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i] as any;
      p.update();
      p.draw();
      
      if (p.isDead()) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 30) {
      particles.shift();
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const idlePhase = time < 60;
    const snapPhase1 = time >= 60 && time < 90;
    const jumpPhase = time >= 90 && time < 120;
    const snapPhase2 = time >= 120 && time < 150;
    const movePhase = time >= 150 && time < 180;
    const snapPhase3 = time >= 180 && time < 210;
    const returnPhase = time >= 210;

    let bookX = centerX;
    let bookY = centerY;
    let bookAngle = 0;
    let mouthOpen = 0;
    let eyeExpression = {
      pupilOffsetX: 0,
      pupilOffsetY: 0,
      angry: false
    };
    let bounce = 0;

    if (idlePhase) {
      const breathe = Math.sin(time * 0.1) * 3;
      bounce = breathe;
      mouthOpen = 10 + Math.sin(time * 0.15) * 5;
      eyeExpression.pupilOffsetX = Math.sin(time * 0.05) * 3;
      eyeExpression.pupilOffsetY = Math.cos(time * 0.03) * 2;

    } else if (snapPhase1) {
      const progress = (time - 60) / 30;
      const snapCycle = Math.sin(progress * Math.PI * 4);
      mouthOpen = 50 + snapCycle * 40;
      bounce = Math.abs(snapCycle) * 10;
      eyeExpression.angry = true;
      eyeExpression.pupilOffsetY = 3;

    } else if (jumpPhase) {
      const progress = (time - 90) / 30;
      const jumpHeight = Math.sin(progress * Math.PI) * -80;
      bookY = centerY + jumpHeight;
      bookAngle = Math.sin(progress * Math.PI * 2) * 0.3;
      mouthOpen = 30 + Math.sin(progress * Math.PI * 6) * 20;
      eyeExpression.pupilOffsetY = -4;

    } else if (snapPhase2) {
      const progress = (time - 120) / 30;
      const snapCycle = Math.sin(progress * Math.PI * 6);
      mouthOpen = 60 + snapCycle * 50;
      bounce = Math.abs(snapCycle) * 12;
      bookAngle = snapCycle * 0.2;
      eyeExpression.angry = true;
      eyeExpression.pupilOffsetX = Math.sin(time * 0.5) * 4;

    } else if (movePhase) {
      const progress = (time - 150) / 30;
      bookX = centerX + Math.sin(progress * Math.PI * 2) * 60;
      bookAngle = Math.sin(progress * Math.PI * 2) * 0.15;
      mouthOpen = 25 + Math.sin(time * 0.3) * 15;
      eyeExpression.pupilOffsetX = Math.sin(progress * Math.PI * 2) * 5;

    } else if (snapPhase3) {
      const progress = (time - 180) / 30;
      const snapCycle = Math.sin(progress * Math.PI * 3);
      mouthOpen = 70 + snapCycle * 60;
      bounce = Math.abs(snapCycle) * 15;
      bookAngle = snapCycle * 0.25;
      eyeExpression.angry = true;
      eyeExpression.pupilOffsetY = 4;
      bookX = centerX + Math.sin(time * 2) * 3;

    } else if (returnPhase) {
      const progress = (time - 210) / 30;
      const easeProgress = progress * (2 - progress);
      bookX = centerX;
      bookY = centerY;
      bookAngle = bookAngle * (1 - easeProgress);
      mouthOpen = 10 + Math.sin(time * 0.15) * 5;
      bounce = Math.sin(time * 0.1) * 3;
    }

    drawBook(bookX, bookY, bookAngle, mouthOpen, eyeExpression, bounce);

    // Efectos
    if (snapPhase1 || snapPhase2 || snapPhase3) {
      ctx.strokeStyle = 'rgba(255, 200, 100, 0.3)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(bookX - 80 - i * 10, bookY);
        ctx.lineTo(bookX - 60 - i * 10, bookY + (Math.random() - 0.5) * 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bookX + 80 + i * 10, bookY);
        ctx.lineTo(bookX + 60 + i * 10, bookY + (Math.random() - 0.5) * 20);
        ctx.stroke();
      }

      if ((time - 60) % 30 < 5 || (time - 120) % 30 < 5 || (time - 180) % 30 < 5) {
        ctx.save();
        ctx.font = 'bold 30px Arial';
        ctx.fillStyle = '#ffd700';
        ctx.strokeStyle = '#8b4513';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.strokeText('¡SNAP!', bookX, bookY - 80);
        ctx.fillText('¡SNAP!', bookX, bookY - 80);
        ctx.restore();
      }
    }

    time++;
    if (time >= cycleTime) {
      time = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación del Pergamino Inservible (ID 17)
private animatePergaminoInservible(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;
  const cycleTime = 180;

  const particles: any[] = [];

  class MagicParticle {
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

    constructor(x: number, y: number, color?: string) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = (Math.random() - 0.5) * 3 - 1;
      this.life = 60;
      this.maxLife = 60;
      this.size = Math.random() * 4 + 2;
      this.color = color || ['#ffd700', '#ffaa00', '#fff', '#88ccff'][Math.floor(Math.random() * 4)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05;
      this.vx *= 0.98;
      this.rotation += this.rotationSpeed;
      this.life--;
    }

    draw(context: CanvasRenderingContext2D) {
      const alpha = this.life / this.maxLife;
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.globalAlpha = alpha;
      
      context.fillStyle = this.color;
      context.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? this.size : this.size / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.fill();
      
      context.shadowBlur = 8;
      context.shadowColor = this.color;
      context.fill();
      
      context.globalAlpha = 1;
      context.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  class DisappearingLetter {
    char: string;
    x: number;
    y: number;
    delay: number;
    age: number;
    alpha: number;
    dissolveProgress: number;
    isDissolved: boolean;

    constructor(char: string, x: number, y: number, delay: number) {
      this.char = char;
      this.x = x;
      this.y = y;
      this.delay = delay;
      this.age = 0;
      this.alpha = 0;
      this.dissolveProgress = 0;
      this.isDissolved = false;
    }

    update() {
      this.age++;
      
      if (this.age < this.delay) {
        return;
      }

      const activeAge = this.age - this.delay;

      if (activeAge < 20) {
        this.alpha = activeAge / 20;
      } else if (activeAge < 80) {
        this.alpha = 1;
      } else if (activeAge < 100) {
        this.dissolveProgress = (activeAge - 80) / 20;
        this.alpha = 1 - this.dissolveProgress;
        
        if (Math.random() < 0.3) {
          particles.push(new MagicParticle(this.x, this.y));
        }
      } else {
        this.isDissolved = true;
      }
    }

    draw(context: CanvasRenderingContext2D) {
      if (this.age < this.delay || this.isDissolved) return;

      context.save();
      context.globalAlpha = this.alpha;
      
      if (this.dissolveProgress > 0) {
        const fragmentOffset = this.dissolveProgress * 10;
        context.translate(
          (Math.random() - 0.5) * fragmentOffset,
          (Math.random() - 0.5) * fragmentOffset
        );
      }

      context.fillStyle = '#2d1810';
      context.font = '20px Georgia, serif';
      context.fillText(this.char, this.x, this.y);
      
      context.globalAlpha = 1;
      context.restore();
    }
  }

  const textLines = [
    "Querido Fred y George,",
    "Este pergamino es",
    "completamente inútil...",
    "¡TODO DESAPARECE!"
  ];

  let letters: DisappearingLetter[] = [];

  const createTextAnimation = () => {
    letters = [];
    let charIndex = 0;
    
    ctx.font = '20px Georgia, serif';
    
    textLines.forEach((line, lineIndex) => {
      const lineY = 140 + lineIndex * 35;
      const lineWidth = ctx.measureText(line).width;
      const startX = (canvas.width - lineWidth) / 2;
      
      for (let i = 0; i < line.length; i++) {
        const charX = startX + ctx.measureText(line.substring(0, i)).width;
        
        letters.push(new DisappearingLetter(
          line[i],
          charX,
          lineY,
          charIndex * 3
        ));
        charIndex++;
      }
    });
  };

  const drawParchment = (x: number, y: number, width: number, height: number, curl: number) => {
    ctx.save();
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    
    const parchmentGradient = ctx.createLinearGradient(x, y, x, y + height);
    parchmentGradient.addColorStop(0, '#f4e8d0');
    parchmentGradient.addColorStop(0.5, '#e8d4b0');
    parchmentGradient.addColorStop(1, '#d4c4a8');
    
    ctx.fillStyle = parchmentGradient;
    
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + width - 10, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + 10);
    ctx.lineTo(x + width + curl, y + height - 10);
    ctx.quadraticCurveTo(x + width + curl, y + height, x + width - 10 + curl, y + height);
    ctx.lineTo(x + 10, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - 10);
    ctx.lineTo(x - curl, y + 10);
    ctx.quadraticCurveTo(x - curl, y, x + 10 - curl, y);
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowBlur = 0;
    
    ctx.strokeStyle = '#a89070';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.strokeStyle = 'rgba(168, 144, 112, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 15; i++) {
      const lineY = y + 20 + i * (height - 40) / 15;
      ctx.beginPath();
      ctx.moveTo(x + 20, lineY);
      ctx.lineTo(x + width - 20, lineY);
      ctx.stroke();
    }
    
    ctx.fillStyle = 'rgba(139, 99, 50, 0.1)';
    for (let i = 0; i < 8; i++) {
      const spotX = x + 30 + Math.random() * (width - 60);
      const spotY = y + 30 + Math.random() * (height - 60);
      const spotRadius = Math.random() * 15 + 5;
      ctx.beginPath();
      ctx.arc(spotX, spotY, spotRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const rollGradient = ctx.createLinearGradient(x, y - 15, x, y);
    rollGradient.addColorStop(0, '#8b7355');
    rollGradient.addColorStop(1, '#a89070');
    ctx.fillStyle = rollGradient;
    ctx.fillRect(x, y - 15, width, 15);
    
    ctx.strokeStyle = '#6d5d45';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 5) {
      ctx.beginPath();
      ctx.moveTo(x + i, y - 15);
      ctx.lineTo(x + i, y);
      ctx.stroke();
    }
    
    ctx.fillStyle = rollGradient;
    ctx.fillRect(x, y + height, width, 15);
    
    for (let i = 0; i < width; i += 5) {
      ctx.beginPath();
      ctx.moveTo(x + i, y + height);
      ctx.lineTo(x + i, y + height + 15);
      ctx.stroke();
    }
    
    ctx.restore();
  };

  const drawQuill = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    
    const quillGradient = ctx.createLinearGradient(0, -40, 0, 0);
    quillGradient.addColorStop(0, '#8b4513');
    quillGradient.addColorStop(1, '#654321');
    
    ctx.fillStyle = quillGradient;
    ctx.fillRect(-2, -40, 4, 40);
    
    ctx.fillStyle = 'rgba(139, 69, 19, 0.6)';
    for (let i = 0; i < 5; i++) {
      const plY = -35 + i * 8;
      const plWidth = 12 - i * 2;
      
      ctx.beginPath();
      ctx.moveTo(0, plY);
      ctx.quadraticCurveTo(-plWidth, plY - 3, -plWidth, plY + 5);
      ctx.lineTo(0, plY + 3);
      ctx.closePath();
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(0, plY);
      ctx.quadraticCurveTo(plWidth, plY - 3, plWidth, plY + 5);
      ctx.lineTo(0, plY + 3);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.fillStyle = '#c0c0c0';
    ctx.beginPath();
    ctx.moveTo(-3, -2);
    ctx.lineTo(0, 3);
    ctx.lineTo(3, -2);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  };

  createTextAnimation();

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#0a0514');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const curlAmount = Math.sin(time * 0.05) * 3;

    drawParchment(centerX - 200, centerY - 120, 400, 240, curlAmount);

    ctx.font = '20px Georgia, serif';
    letters.forEach(letter => {
      letter.update();
      letter.draw(ctx);
    });

    if (time < 100) {
      const quillProgress = time / 100;
      const quillX = 150 + quillProgress * 300;
      const quillY = 140 + Math.sin(quillProgress * Math.PI * 8) * 15;
      const quillAngle = Math.sin(time * 0.3) * 0.2 + 0.3;
      
      drawQuill(quillX, quillY, quillAngle);
      
      if (Math.random() < 0.1) {
        particles.push(new MagicParticle(quillX, quillY + 3, '#2d1810'));
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      
      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }

    if (time > 100 && time < 120) {
      const glowProgress = (time - 100) / 20;
      ctx.save();
      ctx.globalAlpha = Math.sin(glowProgress * Math.PI);
      ctx.fillStyle = '#ffd700';
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#ffd700';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    time++;
    
    if (time >= cycleTime) {
      time = 0;
      createTextAnimation();
      particles.length = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}
// Animación de la Pluma Invisible (ID 18)
private animatePlumaInvisible(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;
  const cycleTime = 240;

  class InkStroke {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    delay: number;
    age: number;
    drawProgress: number;
    fadeProgress: number;
    alpha: number;
    isComplete: boolean;
    color: string;

    constructor(startX: number, startY: number, endX: number, endY: number, delay: number) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.delay = delay;
      this.age = 0;
      this.drawProgress = 0;
      this.fadeProgress = 0;
      this.alpha = 0;
      this.isComplete = false;
      this.color = ['#00ffff', '#88ccff', '#aaddff', '#66ddff'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.age++;

      if (this.age < this.delay) return;

      const activeAge = this.age - this.delay;

      if (activeAge < 20) {
        this.drawProgress = activeAge / 20;
        this.alpha = 1;
      } else if (activeAge < 80) {
        this.drawProgress = 1;
        this.alpha = 1;
      } else if (activeAge < 110) {
        this.drawProgress = 1;
        this.fadeProgress = (activeAge - 80) / 30;
        this.alpha = 1 - this.fadeProgress;
      } else {
        this.isComplete = true;
      }
    }

    draw(context: CanvasRenderingContext2D) {
      if (this.age < this.delay || this.isComplete) return;

      context.save();
      context.globalAlpha = this.alpha;

      const currentX = this.startX + (this.endX - this.startX) * this.drawProgress;
      const currentY = this.startY + (this.endY - this.startY) * this.drawProgress;

      context.strokeStyle = this.color;
      context.lineWidth = 3;
      context.lineCap = 'round';
      context.shadowBlur = 15;
      context.shadowColor = this.color;

      context.beginPath();
      context.moveTo(this.startX, this.startY);
      context.lineTo(currentX, currentY);
      context.stroke();

      context.shadowBlur = 25;
      context.lineWidth = 1;
      context.stroke();

      if (this.drawProgress < 1 && this.drawProgress > 0) {
        context.fillStyle = this.color;
        context.shadowBlur = 20;
        context.beginPath();
        context.arc(currentX, currentY, 4, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      context.restore();
    }
  }

  const fadeParticles: any[] = [];

  class FadeParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;

    constructor(x: number, y: number, color: string) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2 - 1;
      this.life = 30;
      this.maxLife = 30;
      this.size = Math.random() * 3 + 1;
      this.color = color;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05;
      this.vx *= 0.98;
      this.life--;
    }

    draw(context: CanvasRenderingContext2D) {
      const alpha = this.life / this.maxLife;
      context.save();
      context.globalAlpha = alpha;
      context.fillStyle = this.color;
      context.shadowBlur = 10;
      context.shadowColor = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  let strokes: InkStroke[] = [];

  const createWritingStrokes = () => {
    strokes = [];
    const lines = [
      { text: "Mensaje secreto:", y: 130 },
      { text: "Esta tinta es", y: 160 },
      { text: "completamente", y: 190 },
      { text: "temporal...", y: 220 }
    ];

    let strokeDelay = 0;

    lines.forEach((line, lineIndex) => {
      const startX = 180;
      const y = line.y;
      const text = line.text;

      const segmentLength = 30;
      const numSegments = Math.ceil((text.length * 12) / segmentLength);

      for (let i = 0; i < numSegments; i++) {
        const segStartX = startX + i * segmentLength;
        const segEndX = startX + (i + 1) * segmentLength;
        const segStartY = y + Math.sin(i * 0.5) * 3;
        const segEndY = y + Math.sin((i + 1) * 0.5) * 3;

        strokes.push(new InkStroke(
          segStartX,
          segStartY,
          segEndX,
          segEndY,
          strokeDelay
        ));

        strokeDelay += 3;
      }

      strokeDelay += 5;
    });
  };

  const drawPaper = (x: number, y: number, width: number, height: number) => {
    ctx.save();

    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;

    const paperGradient = ctx.createLinearGradient(x, y, x + width, y + height);
    paperGradient.addColorStop(0, '#ffffff');
    paperGradient.addColorStop(0.5, '#f8f8f8');
    paperGradient.addColorStop(1, '#f0f0f0');

    ctx.fillStyle = paperGradient;
    ctx.fillRect(x, y, width, height);

    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    ctx.strokeStyle = 'rgba(200, 220, 255, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 10; i++) {
      const lineY = y + (i * height) / 10;
      ctx.beginPath();
      ctx.moveTo(x + 20, lineY);
      ctx.lineTo(x + width - 20, lineY);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 200, 200, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + 40, y + 20);
    ctx.lineTo(x + 40, y + height - 20);
    ctx.stroke();

    ctx.restore();
  };

  const drawQuill = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const quillGradient = ctx.createLinearGradient(0, -50, 0, 0);
    quillGradient.addColorStop(0, '#4a90e2');
    quillGradient.addColorStop(0.5, '#357abd');
    quillGradient.addColorStop(1, '#2a5f9e');

    ctx.fillStyle = quillGradient;
    ctx.fillRect(-2, -50, 4, 50);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(-1, -48, 2, 40);

    ctx.fillStyle = 'rgba(74, 144, 226, 0.5)';
    for (let i = 0; i < 6; i++) {
      const plY = -45 + i * 9;
      const plWidth = 14 - i * 2;

      ctx.beginPath();
      ctx.moveTo(0, plY);
      ctx.quadraticCurveTo(-plWidth, plY - 4, -plWidth, plY + 6);
      ctx.lineTo(0, plY + 4);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, plY);
      ctx.quadraticCurveTo(plWidth, plY - 4, plWidth, plY + 6);
      ctx.lineTo(0, plY + 4);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = '#88ccff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#88ccff';
    ctx.beginPath();
    ctx.moveTo(-4, -2);
    ctx.lineTo(0, 5);
    ctx.lineTo(4, -2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  createWritingStrokes();

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#0a0514');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    drawPaper(centerX - 220, centerY - 140, 440, 280);

    strokes.forEach(stroke => {
      stroke.update();
      stroke.draw(ctx);

      if (stroke.fadeProgress > 0 && stroke.fadeProgress < 0.5 && Math.random() < 0.1) {
        const t = stroke.drawProgress;
        const particleX = stroke.startX + (stroke.endX - stroke.startX) * t;
        const particleY = stroke.startY + (stroke.endY - stroke.startY) * t;
        fadeParticles.push(new FadeParticle(particleX, particleY, stroke.color));
      }
    });

    for (let i = fadeParticles.length - 1; i >= 0; i--) {
      fadeParticles[i].update();
      fadeParticles[i].draw(ctx);

      if (fadeParticles[i].isDead()) {
        fadeParticles.splice(i, 1);
      }
    }

    if (time < 150) {
      const writeProgress = time / 150;
      const totalStrokes = strokes.length;
      const currentStrokeIndex = Math.floor(writeProgress * totalStrokes);
      
      if (currentStrokeIndex < totalStrokes) {
        const currentStroke = strokes[currentStrokeIndex];
        const strokeProgress = currentStroke.drawProgress;
        
        const quillX = currentStroke.startX + 
          (currentStroke.endX - currentStroke.startX) * strokeProgress;
        const quillY = currentStroke.startY + 
          (currentStroke.endY - currentStroke.startY) * strokeProgress - 30;
        
        const quillAngle = Math.atan2(
          currentStroke.endY - currentStroke.startY,
          currentStroke.endX - currentStroke.startX
        ) + Math.PI / 2;

        drawQuill(quillX, quillY, quillAngle);

        if (Math.random() < 0.3) {
          ctx.save();
          ctx.fillStyle = '#88ccff';
          ctx.globalAlpha = 0.5;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#88ccff';
          ctx.beginPath();
          ctx.arc(quillX + (Math.random() - 0.5) * 10, quillY + 10, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    if (time > 150 && time < 170) {
      const glowProgress = (time - 150) / 20;
      ctx.save();
      ctx.globalAlpha = Math.sin(glowProgress * Math.PI) * 0.3;
      
      ctx.fillStyle = '#88ccff';
      ctx.shadowBlur = 60;
      ctx.shadowColor = '#88ccff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    time++;

    if (time >= cycleTime) {
      time = 0;
      createWritingStrokes();
      fadeParticles.length = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación del Spray Aumenta Todo (ID 19)
private animateSprayAumentaTodo(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;
  const cycleTime = 200;

  const sprayParticles: any[] = [];

  class SprayParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    alpha: number;
    color: string;
    rotation: number;
    rotationSpeed: number;

    constructor(x: number, y: number, angle: number) {
      this.x = x;
      this.y = y;
      const spreadAngle = angle + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3 + 2;
      this.vx = Math.cos(spreadAngle) * speed;
      this.vy = Math.sin(spreadAngle) * speed;
      this.life = 60;
      this.maxLife = 60;
      this.size = Math.random() * 8 + 4;
      this.alpha = 1;
      this.color = ['#9b59b6', '#8e44ad', '#bb8fce', '#d7bde2'][Math.floor(Math.random() * 4)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.08;
      this.vx *= 0.98;
      this.rotation += this.rotationSpeed;
      this.life--;
      this.alpha = this.life / this.maxLife;
    }

    draw(context: CanvasRenderingContext2D) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.globalAlpha = this.alpha * 0.8;

      context.fillStyle = this.color;
      context.shadowBlur = 15;
      context.shadowColor = this.color;
      context.beginPath();
      context.arc(0, 0, this.size, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = '#ffffff';
      context.shadowBlur = 10;
      context.beginPath();
      context.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
      context.fill();

      context.globalAlpha = 1;
      context.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const expandGlowParticles: any[] = [];

  class ExpandGlow {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 40;
      this.maxLife = 40;
      this.size = Math.random() * 4 + 2;
      this.color = ['#9b59b6', '#e74c3c', '#f39c12', '#fff'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.95;
      this.vy *= 0.95;
      this.life--;
    }

    draw(context: CanvasRenderingContext2D) {
      const alpha = this.life / this.maxLife;
      context.save();
      context.globalAlpha = alpha;
      context.fillStyle = this.color;
      context.shadowBlur = 12;
      context.shadowColor = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const drawSprayBottle = (x: number, y: number, angle: number, pressing: boolean) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const pressOffset = pressing ? 3 : 0;

    const bottleGradient = ctx.createLinearGradient(-15, 0, 15, 60);
    bottleGradient.addColorStop(0, '#9b59b6');
    bottleGradient.addColorStop(0.5, '#8e44ad');
    bottleGradient.addColorStop(1, '#6c3483');

    ctx.fillStyle = bottleGradient;
    ctx.fillRect(-15, 10, 30, 50);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(-12, 15, 8, 40);

    ctx.fillStyle = '#6c3483';
    ctx.fillRect(-15, 60, 30, 5);

    ctx.fillStyle = '#34495e';
    ctx.fillRect(-12, 0, 24, 10);

    ctx.fillStyle = pressing ? '#e74c3c' : '#2c3e50';
    ctx.fillRect(-8, -10 + pressOffset, 16, 10);

    ctx.fillStyle = '#7f8c8d';
    ctx.fillRect(-2, -15 + pressOffset, 4, 5);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(-10, 30, 20, 15);

    ctx.fillStyle = '#8e44ad';
    ctx.font = 'bold 8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SIZE', 0, 38);
    ctx.fillText('UP!', 0, 44);

    if (pressing) {
      ctx.fillStyle = 'rgba(155, 89, 182, 0.6)';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#9b59b6';
      ctx.beginPath();
      ctx.arc(-5, 30, 3, 0, Math.PI * 2);
      ctx.arc(5, 45, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawTargetObject = (x: number, y: number, scale: number, type: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    if (type === 'apple') {
      const appleGradient = ctx.createRadialGradient(-5, -5, 5, 0, 0, 25);
      appleGradient.addColorStop(0, '#ff6b6b');
      appleGradient.addColorStop(0.7, '#ee5a52');
      appleGradient.addColorStop(1, '#c0392b');

      ctx.fillStyle = appleGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#c0392b';
      ctx.beginPath();
      ctx.ellipse(0, -15, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#8b4513';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.quadraticCurveTo(-5, -30, -3, -35);
      ctx.stroke();

      ctx.fillStyle = '#27ae60';
      ctx.beginPath();
      ctx.ellipse(-8, -32, 8, 5, -0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.ellipse(-8, -8, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#0a0514');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const sprayingPhase = time >= 30 && time < 80;
    const expandingPhase = time >= 80 && time < 140;
    const holdPhase = time >= 140 && time < 160;
    const resetPhase = time >= 160;

    let objectScale = 1;
    if (expandingPhase) {
      const expandProgress = (time - 80) / 60;
      const elasticProgress = expandProgress < 0.5 
        ? 2 * expandProgress * expandProgress
        : 1 - Math.pow(-2 * expandProgress + 2, 2) / 2;
      objectScale = 1 + elasticProgress * 1.5;
    } else if (holdPhase) {
      objectScale = 2.5;
    } else if (resetPhase) {
      const resetProgress = (time - 160) / 40;
      objectScale = 2.5 - resetProgress * 1.5;
    }

    const objectX = centerX + 80;
    const objectY = centerY;
    
    const sprayX = centerX - 120;
    const sprayY = centerY + 20;
    const sprayAngle = -0.3;
    const sprayPressing = sprayingPhase;

    if (sprayingPhase && Math.random() < 0.5) {
      const nozzleX = sprayX + Math.cos(sprayAngle - Math.PI / 2) * 15;
      const nozzleY = sprayY + Math.sin(sprayAngle - Math.PI / 2) * 15;
      const angleToApple = Math.atan2(objectY - nozzleY, objectX - nozzleX);
      sprayParticles.push(new SprayParticle(nozzleX, nozzleY, angleToApple));
    }

    for (let i = sprayParticles.length - 1; i >= 0; i--) {
      sprayParticles[i].update();
      sprayParticles[i].draw(ctx);

      if (sprayParticles[i].isDead()) {
        sprayParticles.splice(i, 1);
      }
    }

    drawTargetObject(objectX, objectY, objectScale, 'apple');

    if (expandingPhase && Math.random() < 0.3) {
      expandGlowParticles.push(new ExpandGlow(objectX, objectY));
    }

    for (let i = expandGlowParticles.length - 1; i >= 0; i--) {
      expandGlowParticles[i].update();
      expandGlowParticles[i].draw(ctx);

      if (expandGlowParticles[i].isDead()) {
        expandGlowParticles.splice(i, 1);
      }
    }

    if (expandingPhase) {
      const expandProgress = (time - 80) / 60;
      ctx.save();
      ctx.strokeStyle = '#9b59b6';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1 - expandProgress;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(objectX, objectY, 40 + expandProgress * 80 + i * 20, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    }

    drawSprayBottle(sprayX, sprayY, sprayAngle, sprayPressing);

    if (sprayingPhase) {
      const sprayCloudProgress = (time - 30) / 50;
      ctx.save();
      ctx.globalAlpha = 0.4 * (1 - sprayCloudProgress);
      
      const cloudGradient = ctx.createRadialGradient(
        centerX - 20, centerY, 10,
        centerX - 20, centerY, 80
      );
      cloudGradient.addColorStop(0, '#9b59b6');
      cloudGradient.addColorStop(0.5, '#8e44ad');
      cloudGradient.addColorStop(1, 'rgba(155, 89, 182, 0)');
      
      ctx.fillStyle = cloudGradient;
      ctx.beginPath();
      ctx.arc(centerX - 20, centerY, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Texto indicador eliminado

    if (expandingPhase || holdPhase) {
      ctx.save();
      ctx.strokeStyle = '#e74c3c';
      ctx.fillStyle = '#e74c3c';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.8;

      ctx.beginPath();
      ctx.moveTo(objectX, objectY - 60);
      ctx.lineTo(objectX, objectY - 80);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(objectX, objectY - 80);
      ctx.lineTo(objectX - 5, objectY - 75);
      ctx.lineTo(objectX + 5, objectY - 75);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(objectX + 50, objectY);
      ctx.lineTo(objectX + 70, objectY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(objectX + 70, objectY);
      ctx.lineTo(objectX + 65, objectY - 5);
      ctx.lineTo(objectX + 65, objectY + 5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    time++;

    if (time >= cycleTime) {
      time = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación de las Varitas del Revés (ID 20)
private animateVaritasDelReves(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;
  const cycleTime = 220;
  const spellParticles: any[] = [];

  class SpellParticle {
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

    constructor(x: number, y: number, vx: number, vy: number, color: string) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.life = 40;
      this.maxLife = 40;
      this.size = Math.random() * 4 + 2;
      this.color = color;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.rotation += this.rotationSpeed;
      this.life--;
    }

    draw(context: CanvasRenderingContext2D) {
      const alpha = this.life / this.maxLife;
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.globalAlpha = alpha;

      context.fillStyle = this.color;
      context.shadowBlur = 12;
      context.shadowColor = this.color;
      context.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const radius = i % 2 === 0 ? this.size : this.size / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.fill();

      context.globalAlpha = 1;
      context.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  class SpellBeam {
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    progress: number;
    returning: boolean;
    currentX: number;
    currentY: number;
    color: string;

    constructor(startX: number, startY: number, targetX: number, targetY: number) {
      this.startX = startX;
      this.startY = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.progress = 0;
      this.returning = false;
      this.currentX = startX;
      this.currentY = startY;
      this.color = '#00ffff';
    }

    update() {
      if (!this.returning) {
        this.progress += 0.04;
        if (this.progress >= 1) {
          this.progress = 1;
          this.returning = true;
        }
      } else {
        this.progress -= 0.05;
        if (this.progress <= 0) {
          this.progress = 0;
        }
      }

      const t = this.progress;
      const curveHeight = 50;
      
      this.currentX = this.startX + (this.targetX - this.startX) * t;
      this.currentY = this.startY + (this.targetY - this.startY) * t - Math.sin(t * Math.PI) * curveHeight;
    }

    draw(context: CanvasRenderingContext2D) {
      context.save();
      context.strokeStyle = this.color;
      context.lineWidth = 4;
      context.shadowBlur = 20;
      context.shadowColor = this.color;
      context.lineCap = 'round';

      context.beginPath();
      const segments = 20;
      for (let i = 0; i <= segments; i++) {
        const t = (i / segments) * this.progress;
        const x = this.startX + (this.targetX - this.startX) * t;
        const y = this.startY + (this.targetY - this.startY) * t - Math.sin(t * Math.PI) * 50;
        
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();

      context.fillStyle = '#ffffff';
      context.shadowBlur = 30;
      context.beginPath();
      context.arc(this.currentX, this.currentY, 6, 0, Math.PI * 2);
      context.fill();

      if (Math.random() < 0.3) {
        spellParticles.push(new SpellParticle(
          this.currentX,
          this.currentY,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          this.color
        ));
      }

      context.restore();
    }

    isComplete() {
      return this.returning && this.progress <= 0;
    }
  }

  let spellBeam: SpellBeam | null = null;

  const drawWizard = (x: number, y: number, surprised: boolean, hitBySpell: boolean, armAngle: number) => {
    ctx.save();
    ctx.translate(x, y);

    const scale = hitBySpell ? 1.35 + Math.sin(time * 0.5) * 0.15 : 1.5;
    ctx.scale(scale, scale);

    const robeGradient = ctx.createLinearGradient(-25, 0, 25, 80);
    robeGradient.addColorStop(0, '#5b2c8a');
    robeGradient.addColorStop(0.5, '#4a148c');
    robeGradient.addColorStop(1, '#38006b');
    ctx.fillStyle = robeGradient;
    ctx.beginPath();
    ctx.moveTo(-25, 10);
    ctx.quadraticCurveTo(-30, 40, -28, 80);
    ctx.lineTo(28, 80);
    ctx.quadraticCurveTo(30, 40, 25, 10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.moveTo(-10, 20);
    ctx.quadraticCurveTo(-15, 50, -12, 80);
    ctx.lineTo(-5, 80);
    ctx.quadraticCurveTo(-8, 50, -5, 20);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffe4c4';
    ctx.fillRect(-8, 8, 16, 8);

    ctx.fillStyle = '#ffd700';
    ctx.fillRect(-25, 30, 50, 6);
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(-6, 28, 12, 10);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(-4, 30, 8, 6);

    ctx.fillStyle = '#6a1b9a';
    ctx.beginPath();
    ctx.arc(0, 10, 12, 0, Math.PI);
    ctx.fill();

    ctx.save();
    ctx.translate(-20, 18);
    ctx.fillStyle = '#4a148c';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#5b2c8a';
    ctx.fillRect(-5, 0, 10, 25);
    ctx.beginPath();
    ctx.arc(0, 25, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-4, 25, 8, 20);
    ctx.fillStyle = '#ffe4c4';
    ctx.beginPath();
    ctx.arc(0, 48, 6, 0, Math.PI * 2);
    ctx.fill();
    for (let i = -1; i <= 1; i++) {
      ctx.fillRect(i * 3 - 1.5, 48, 3, 8);
    }
    ctx.restore();

    ctx.save();
    ctx.translate(20, 18);
    ctx.rotate(armAngle);
    ctx.fillStyle = '#4a148c';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#5b2c8a';
    ctx.fillRect(-5, 0, 10, 25);
    ctx.beginPath();
    ctx.arc(0, 25, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-4, 25, 8, 20);
    ctx.fillStyle = '#ffe4c4';
    ctx.beginPath();
    ctx.arc(0, 48, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-6, 46, 3, 6);
    ctx.fillRect(-2, 48, 4, 8);
    ctx.fillRect(2, 50, 3, 6);
    ctx.restore();

    const headGradient = ctx.createRadialGradient(-8, -25, 8, 0, -20, 25);
    headGradient.addColorStop(0, '#ffe4c4');
    headGradient.addColorStop(0.7, '#ffd4a3');
    headGradient.addColorStop(1, '#e6b88a');
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.arc(0, -20, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffd4a3';
    ctx.beginPath();
    ctx.ellipse(-22, -20, 8, 12, 0.3, 0, Math.PI * 2);
    ctx.ellipse(22, -20, 8, 12, -0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4a148c';
    ctx.beginPath();
    ctx.moveTo(-28, -35);
    ctx.quadraticCurveTo(-5, -75, 0, -80);
    ctx.quadraticCurveTo(5, -75, 28, -35);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-15, -38);
    ctx.quadraticCurveTo(-8, -60, -5, -70);
    ctx.stroke();

    ctx.fillStyle = '#5b2c8a';
    ctx.beginPath();
    ctx.ellipse(0, -35, 32, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(0, -55);
    ctx.rotate(time * 0.05);
    ctx.fillStyle = '#ffd700';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ffd700';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? 8 : 4;
      const starX = Math.cos(angle) * radius;
      const starY = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(starX, starY);
      else ctx.lineTo(starX, starY);
    }
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    if (surprised) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-10, -22, 7, 0, Math.PI * 2);
      ctx.arc(10, -22, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#4a90e2';
      ctx.beginPath();
      ctx.arc(-10, -22, 5, 0, Math.PI * 2);
      ctx.arc(10, -22, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-10, -22, 3, 0, Math.PI * 2);
      ctx.arc(10, -22, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-11, -24, 2, 0, Math.PI * 2);
      ctx.arc(9, -24, 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(-10, -22, 6, 7, 0, 0, Math.PI * 2);
      ctx.ellipse(10, -22, 6, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#4a90e2';
      ctx.beginPath();
      ctx.arc(-10, -22, 4, 0, Math.PI * 2);
      ctx.arc(10, -22, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-10, -22, 2.5, 0, Math.PI * 2);
      ctx.arc(10, -22, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-11, -24, 1.5, 0, Math.PI * 2);
      ctx.arc(9, -24, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    if (surprised) {
      ctx.beginPath();
      ctx.moveTo(-16, -30);
      ctx.quadraticCurveTo(-10, -33, -4, -30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(16, -30);
      ctx.quadraticCurveTo(10, -33, 4, -30);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(-16, -28);
      ctx.quadraticCurveTo(-10, -30, -4, -28);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(16, -28);
      ctx.quadraticCurveTo(10, -30, 4, -28);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-1, -18);
    ctx.lineTo(-3, -10);
    ctx.quadraticCurveTo(-3, -8, -1, -8);
    ctx.stroke();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (surprised || hitBySpell) {
      ctx.arc(0, -8, 8, 0, Math.PI * 2);
    } else {
      ctx.arc(0, -8, 8, 0, Math.PI);
    }
    ctx.stroke();

    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.moveTo(-8, -2);
    ctx.quadraticCurveTo(0, 5, 8, -2);
    ctx.quadraticCurveTo(5, 8, 0, 10);
    ctx.quadraticCurveTo(-5, 8, -8, -2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  const drawWand = (x: number, y: number, angle: number, glowing: boolean) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const wandGradient = ctx.createLinearGradient(0, 0, 40, 0);
    wandGradient.addColorStop(0, '#8b4513');
    wandGradient.addColorStop(0.5, '#a0522d');
    wandGradient.addColorStop(1, '#654321');
    ctx.fillStyle = wandGradient;
    
    ctx.beginPath();
    ctx.moveTo(0, -2.5);
    ctx.lineTo(40, -1.5);
    ctx.lineTo(40, 1.5);
    ctx.lineTo(0, 2.5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#654321';
    ctx.fillRect(0, -3, 8, 6);

    if (glowing) {
      ctx.fillStyle = '#00ffff';
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#00ffff';
      ctx.beginPath();
      ctx.arc(40, 0, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(40, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 4; i++) {
        const starAngle = (time * 0.1 + i * (Math.PI * 2 / 4));
        const starDist = 15;
        const starX = 40 + Math.cos(starAngle) * starDist;
        const starY = Math.sin(starAngle) * starDist;
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(starX, starY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = '#d4a574';
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(40, 0, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    ctx.restore();
  };

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#0a0514');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const castPhase = time >= 40 && time < 50;
    const flyPhase = time >= 50 && time < 120;
    const returnPhase = time >= 120 && time < 180;
    const hitPhase = time >= 180 && time < 200;

    const wizardX = centerX - 100;
    const wizardY = centerY + 80;
    const wizardSurprised = returnPhase || hitPhase;
    const wizardHit = hitPhase;

    let armAngle = wizardSurprised ? -0.5 : 0.3;

    const handX = wizardX + 20 + Math.cos(armAngle) * 48;
    const handY = wizardY + 18 + Math.sin(armAngle) * 48;

    drawWizard(wizardX, wizardY, wizardSurprised, wizardHit, armAngle);

    const wandGlowing = castPhase || flyPhase;

    drawWand(handX, handY, armAngle, wandGlowing);

    if (castPhase && !spellBeam) {
      const wandTipX = handX + Math.cos(armAngle) * 40;
      const wandTipY = handY + Math.sin(armAngle) * 40;
      const targetX = centerX + 150;
      const targetY = centerY - 20;
      spellBeam = new SpellBeam(wandTipX, wandTipY, targetX, targetY);
    }

    if (spellBeam) {
      spellBeam.update();
      spellBeam.draw(ctx);

      if (spellBeam.isComplete()) {
        spellBeam = null;
      }
    }

    for (let i = spellParticles.length - 1; i >= 0; i--) {
      spellParticles[i].update();
      spellParticles[i].draw(ctx);

      if (spellParticles[i].isDead()) {
        spellParticles.splice(i, 1);
      }
    }

    if (hitPhase) {
      const hitProgress = (time - 180) / 20;
      ctx.save();
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1 - hitProgress;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(wizardX, wizardY, 30 + hitProgress * 50 + i * 15, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      for (let i = 0; i < 3; i++) {
        const starAngle = (time * 0.2 + i * (Math.PI * 2 / 3));
        const starDist = 50;
        const starX = wizardX + Math.cos(starAngle) * starDist;
        const starY = wizardY - 80 + Math.sin(starAngle) * starDist;
        
        ctx.save();
        ctx.fillStyle = '#ffd700';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ffd700';
        ctx.translate(starX, starY);
        ctx.rotate(time * 0.1);
        
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          const angle = (j * 4 * Math.PI) / 5 - Math.PI / 2;
          const radius = j % 2 === 0 ? 6 : 3;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    time++;

    if (time >= cycleTime) {
      time = 0;
      spellBeam = null;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}


// Animación de Fantasías Patentadas (ID 21)
private animateDaydreamFantasy(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  class Sparkle {
    x: number;
    y: number;
    size: number;
    life: number;
    vy: number;
    vx: number;
    twinkle: number;
    color: string;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = 2 + Math.random() * 4;
      this.life = 1;
      this.vy = -0.3 - Math.random() * 0.5;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.twinkle = Math.random() * Math.PI * 2;
      this.color = ['#E1F5FE', '#F3E5F5', '#FFF9C4', '#E8EAF6'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= 0.01;
      this.twinkle += 0.1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.life <= 0) return;

      ctx.save();
      ctx.globalAlpha = this.life * (0.5 + Math.sin(this.twinkle) * 0.5);
      
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  class DreamParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    color: string;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 0.5;
      this.size = 3 + Math.random() * 5;
      this.life = 1;
      this.color = ['#B39DDB', '#90CAF9', '#CE93D8', '#80DEEA'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.life -= 0.015;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.life <= 0) return;

      ctx.save();
      ctx.globalAlpha = this.life * 0.6;
      
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'rgba(179, 157, 219, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const sparkles: Sparkle[] = [];
  const dreamParticles: DreamParticle[] = [];
  let time = 0;

  const drawVial = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    
    const vialGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 50);
    vialGlow.addColorStop(0, 'rgba(179, 157, 219, 0.3)');
    vialGlow.addColorStop(1, 'rgba(179, 157, 219, 0)');
    ctx.fillStyle = vialGlow;
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2);
    ctx.fill();
    
    const glassGrad = ctx.createLinearGradient(-25, -40, 25, 40);
    glassGrad.addColorStop(0, 'rgba(200, 230, 255, 0.3)');
    glassGrad.addColorStop(0.5, 'rgba(220, 240, 255, 0.5)');
    glassGrad.addColorStop(1, 'rgba(200, 230, 255, 0.3)');
    
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = '#7986CB';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(-25, 30);
    ctx.lineTo(-25, -25);
    ctx.quadraticCurveTo(-25, -35, -15, -35);
    ctx.lineTo(15, -35);
    ctx.quadraticCurveTo(25, -35, 25, -25);
    ctx.lineTo(25, 30);
    ctx.quadraticCurveTo(25, 40, 0, 40);
    ctx.quadraticCurveTo(-25, 40, -25, 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    const liquidGrad = ctx.createLinearGradient(0, -10, 0, 35);
    liquidGrad.addColorStop(0, 'rgba(179, 157, 219, 0.4)');
    liquidGrad.addColorStop(0.5, 'rgba(156, 39, 176, 0.3)');
    liquidGrad.addColorStop(1, 'rgba(179, 157, 219, 0.5)');
    
    ctx.fillStyle = liquidGrad;
    ctx.beginPath();
    ctx.moveTo(-23, 30);
    ctx.lineTo(-23, -10);
    ctx.quadraticCurveTo(0, -8, 23, -10);
    ctx.lineTo(23, 30);
    ctx.quadraticCurveTo(23, 38, 0, 38);
    ctx.quadraticCurveTo(-23, 38, -23, 30);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = '#7986CB';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(-12, -50, 24, 15);
    ctx.fill();
    ctx.stroke();
    
    const stopperGrad = ctx.createLinearGradient(-10, -65, 10, -50);
    stopperGrad.addColorStop(0, '#9FA8DA');
    stopperGrad.addColorStop(1, '#7986CB');
    
    ctx.fillStyle = stopperGrad;
    ctx.strokeStyle = '#5C6BC0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, -50);
    ctx.lineTo(-8, -62);
    ctx.lineTo(8, -62);
    ctx.lineTo(10, -50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#9FA8DA';
    ctx.strokeStyle = '#5C6BC0';
    ctx.beginPath();
    ctx.ellipse(0, -62, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.strokeStyle = '#9575CD';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(-18, 0, 36, 20);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#673AB7';
    ctx.font = 'italic 9px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText('Daydream', 0, 10);
    ctx.fillText('Fantasy', 0, 18);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.ellipse(-12, -15, 10, 20, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  const drawDreamCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    const cloudColors = [
      { color: 'rgba(179, 157, 219, 0.3)', size: 60 },
      { color: 'rgba(156, 39, 176, 0.2)', size: 50 },
      { color: 'rgba(206, 147, 216, 0.25)', size: 55 }
    ];
    
    cloudColors.forEach(({ color, size }) => {
      ctx.fillStyle = color;
      ctx.filter = 'blur(8px)';
      
      ctx.beginPath();
      ctx.arc(-30, 0, size * 0.6, 0, Math.PI * 2);
      ctx.arc(30, 0, size * 0.6, 0, Math.PI * 2);
      ctx.arc(0, -20, size * 0.7, 0, Math.PI * 2);
      ctx.arc(-15, 15, size * 0.5, 0, Math.PI * 2);
      ctx.arc(15, 15, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.filter = 'none';
    ctx.restore();
  };

  const drawDreamScene = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, alpha: number) => {
    if (scale <= 0.1) return;
    
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    const castleGrad = ctx.createLinearGradient(0, -50, 0, 20);
    castleGrad.addColorStop(0, '#E1BEE7');
    castleGrad.addColorStop(1, '#CE93D8');
    
    ctx.fillStyle = castleGrad;
    ctx.strokeStyle = '#AB47BC';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.rect(-15, -30, 30, 50);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#BA68C8';
    ctx.beginPath();
    ctx.moveTo(-20, -30);
    ctx.lineTo(0, -55);
    ctx.lineTo(20, -30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = castleGrad;
    ctx.beginPath();
    ctx.rect(-35, -10, 15, 30);
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.rect(20, -10, 15, 30);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#BA68C8';
    ctx.beginPath();
    ctx.moveTo(-40, -10);
    ctx.lineTo(-27.5, -25);
    ctx.lineTo(-15, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(20, -10);
    ctx.lineTo(27.5, -25);
    ctx.lineTo(35, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#FFF59D';
    ctx.shadowColor = '#FFEB3B';
    ctx.shadowBlur = 10;
    
    ctx.fillRect(-8, -15, 6, 8);
    ctx.fillRect(2, -15, 6, 8);
    ctx.fillRect(-30, 0, 5, 6);
    ctx.fillRect(25, 0, 5, 6);
    
    ctx.shadowBlur = 5;
    ctx.fillStyle = '#FFD54F';
    for (let i = 0; i < 5; i++) {
      const starX = -50 + Math.random() * 100;
      const starY = -60 + Math.random() * 30;
      const starSize = 2 + Math.random() * 3;
      
      ctx.save();
      ctx.translate(starX, starY);
      ctx.rotate(time * 2 + i);
      ctx.fillRect(-starSize / 2, -starSize / 2, starSize, starSize);
      ctx.restore();
    }
    
    ctx.restore();
  };

  const animate = () => {
    ctx.fillStyle = 'rgba(20, 10, 30, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    time += 0.016;

    const loopTime = time % 6;
    let phase = 0;
    let phaseProgress = 0;

    if (loopTime < 1) {
      phase = 1;
      phaseProgress = loopTime / 1;
    } else if (loopTime < 2.5) {
      phase = 2;
      phaseProgress = (loopTime - 1) / 1.5;
    } else if (loopTime < 5) {
      phase = 3;
      phaseProgress = (loopTime - 2.5) / 2.5;
    } else {
      phase = 4;
      phaseProgress = (loopTime - 5) / 1;
    }

    const vialX = canvas.width / 2 - 150;
    const vialY = canvas.height / 2 + 50;
    const cloudX = canvas.width / 2 + 80;
    const cloudY = canvas.height / 2 - 80;

    drawVial(ctx, vialX, vialY);

    if (phase === 1) {
      if (Math.random() < 0.1) {
        sparkles.push(new Sparkle(vialX + (Math.random() - 0.5) * 40, vialY + (Math.random() - 0.5) * 40));
      }
    }

    if (phase === 2) {
      const cloudScale = phaseProgress < 0.5 
        ? 2 * phaseProgress * phaseProgress 
        : 1 - Math.pow(-2 * phaseProgress + 2, 2) / 2;
      const cloudAlpha = cloudScale;
      
      drawDreamCloud(ctx, cloudX, cloudY, cloudScale, cloudAlpha);
      
      if (Math.random() < 0.4) {
        dreamParticles.push(new DreamParticle(vialX, vialY - 50));
      }
      
      if (Math.random() < 0.3) {
        sparkles.push(new Sparkle(cloudX + (Math.random() - 0.5) * 80, cloudY + (Math.random() - 0.5) * 60));
      }
    }

    if (phase === 3) {
      drawDreamCloud(ctx, cloudX, cloudY, 1, 0.9);
      
      const sceneScale = 0.7 + Math.sin(phaseProgress * Math.PI * 2) * 0.1;
      drawDreamScene(ctx, cloudX, cloudY, sceneScale, 0.9);
      
      if (Math.random() < 0.2) {
        sparkles.push(new Sparkle(cloudX + (Math.random() - 0.5) * 100, cloudY + (Math.random() - 0.5) * 80));
      }
      
      if (Math.random() < 0.15) {
        dreamParticles.push(new DreamParticle(vialX, vialY - 50));
      }
    }

    if (phase === 4) {
      const fadeAlpha = 1 - phaseProgress;
      const fadeScale = 1 - phaseProgress * 0.3;
      
      drawDreamCloud(ctx, cloudX, cloudY, fadeScale, fadeAlpha * 0.9);
      drawDreamScene(ctx, cloudX, cloudY, fadeScale, fadeAlpha * 0.9);
    }

    for (let i = sparkles.length - 1; i >= 0; i--) {
      sparkles[i].update();
      sparkles[i].draw(ctx);
      
      if (sparkles[i].isDead()) {
        sparkles.splice(i, 1);
      }
    }

    for (let i = dreamParticles.length - 1; i >= 0; i--) {
      dreamParticles[i].update();
      dreamParticles[i].draw(ctx);
      
      if (dreamParticles[i].isDead()) {
        dreamParticles.splice(i, 1);
      }
    }

    if (phase === 1 && loopTime < 0.1) {
      sparkles.length = 0;
      dreamParticles.length = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}
// Animación de Marcas Tenebrosas Comestibles (ID 22)
private animateMarcasTenebrosas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;

  class Character {
    x: number;
    y: number;
    state: string;
    stateProgress: number;
    eyesOpen: boolean;
    blinkTimer: number;
    sickIntensity: number;

    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
      this.sickIntensity = 0;
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
          this.state = 'cursed';
          this.stateProgress = 0;
          this.sickIntensity = 0;
        }
      } else if (this.state === 'cursed') {
        this.stateProgress += 0.008;
        
        if (this.sickIntensity < 1) {
          this.sickIntensity += 0.015;
        }
        
        if (this.stateProgress >= 1) {
          this.reset();
        }
      }

      if (this.eyesOpen && this.state !== 'cursed') {
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
      this.sickIntensity = 0;
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
      } else if (this.state === 'cursed') {
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
      if (this.state === 'cursed') {
        const greenTint = this.sickIntensity * 0.5;
        headGradient.addColorStop(0, `rgba(255, 235, 212, ${1 - greenTint})`);
        headGradient.addColorStop(0, `rgba(200, 255, 200, ${greenTint})`);
        headGradient.addColorStop(1, `rgba(255, 215, 186, ${1 - greenTint})`);
        headGradient.addColorStop(1, `rgba(180, 240, 180, ${greenTint})`);
      } else {
        headGradient.addColorStop(0, '#FFEBD4');
        headGradient.addColorStop(1, '#FFD7BA');
      }
      ctx.fillStyle = headGradient;
      
      ctx.beginPath();
      ctx.arc(0, -20, 42, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = this.state === 'cursed' 
        ? `rgba(180, 240, 180, ${0.6 + this.sickIntensity * 0.4})`
        : '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(-40, -20, 8, 12, -0.2, 0, Math.PI * 2);
      ctx.ellipse(40, -20, 8, 12, 0.2, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'cursed') {
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
      
      if (this.state === 'cursed') {
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
      } else if (this.state === 'cursed') {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-12, -3);
        for (let i = 0; i <= 12; i++) {
          const x = -12 + i * 2;
          const y = -3 + Math.sin(i * 0.8 + this.stateProgress * 10) * 3;
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

      if (this.state === 'cursed') {
        ctx.fillStyle = `rgba(150, 255, 150, ${0.3 + this.sickIntensity * 0.3})`;
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

      const candyGradient = ctx.createRadialGradient(-3, -3, 2, 0, 0, 15);
      candyGradient.addColorStop(0, '#1a1a1a');
      candyGradient.addColorStop(0.5, '#0d0d0d');
      candyGradient.addColorStop(1, '#000000');
      ctx.fillStyle = candyGradient;
      
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(100, 255, 100, 0.6)';
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.quadraticCurveTo(3, -3, 0, 0);
      ctx.quadraticCurveTo(-3, 3, 0, 6);
      ctx.stroke();

      ctx.strokeStyle = `rgba(100, 255, 100, ${0.3 + Math.sin(this.float * 2) * 0.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 18 + Math.sin(this.float * 2) * 2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }
  }

  class DarkMark {
    x: number;
    y: number;
    size: number;
    maxSize: number;
    opacity: number;
    rotation: number;
    phase: string;
    life: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = 0;
      this.maxSize = 80;
      this.opacity = 0;
      this.rotation = 0;
      this.phase = 'appearing';
      this.life = 1;
    }

    update() {
      this.rotation += 0.02;

      if (this.phase === 'appearing') {
        this.size += 2;
        this.opacity += 0.03;
        
        if (this.size >= this.maxSize) {
          this.phase = 'visible';
        }
      } else if (this.phase === 'visible') {
        this.life -= 0.005;
        
        if (this.life <= 0.5) {
          this.phase = 'fading';
        }
      } else if (this.phase === 'fading') {
        this.opacity -= 0.02;
        this.life -= 0.01;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity * 0.8;

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      gradient.addColorStop(0, 'rgba(100, 255, 100, 0.8)');
      gradient.addColorStop(0.5, 'rgba(50, 200, 50, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 150, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(150, 255, 150, 1)';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(100, 255, 100, 0.8)';
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = Math.cos(angle) * this.size * 0.3;
        const y1 = Math.sin(angle) * this.size * 0.3;
        const x2 = Math.cos(angle) * this.size * 0.5;
        const y2 = Math.sin(angle) * this.size * 0.5;
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const radius = this.size * 0.3 + Math.sin(i * 2 + this.rotation * 5) * this.size * 0.08;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.restore();
    }
  }

  class CurseParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    alpha: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 0.5;
      this.size = Math.random() * 3 + 1;
      this.life = 1;
      this.alpha = Math.random() * 0.5 + 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.98;
      this.vy += 0.05;
      this.life -= 0.012;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life * this.alpha;
      
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, 'rgba(150, 255, 150, 1)');
      gradient.addColorStop(0.5, 'rgba(100, 200, 100, 0.8)');
      gradient.addColorStop(1, 'rgba(50, 150, 50, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  class GlowWave {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    life: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.maxRadius = 100;
      this.life = 1;
    }

    update() {
      this.radius += 2;
      this.life = 1 - (this.radius / this.maxRadius);
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life * 0.5;
      
      ctx.strokeStyle = 'rgba(100, 255, 100, 0.8)';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(100, 255, 100, 0.6)';
      ctx.shadowBlur = 15;
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      ctx.restore();
    }
  }

  const character = new Character();
  const candy = new Candy(character);
  const darkMarks: DarkMark[] = [];
  const curseParticles: CurseParticle[] = [];
  const glowWaves: GlowWave[] = [];

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

    if (character.state === 'cursed' && character.sickIntensity > 0.3 && character.sickIntensity < 0.4) {
      darkMarks.push(new DarkMark(character.x, character.y - 100));
    }

    if (character.state === 'cursed' && character.sickIntensity > 0.25 && character.sickIntensity < 0.35) {
      glowWaves.push(new GlowWave(character.x, character.y - 100));
    }

    if (character.state === 'cursed' && character.sickIntensity > 0.2) {
      if (Math.random() < 0.3) {
        curseParticles.push(new CurseParticle(character.x, character.y - 100));
      }
    }

    for (let i = glowWaves.length - 1; i >= 0; i--) {
      const wave = glowWaves[i];
      wave.update();
      
      if (wave.radius >= wave.maxRadius) {
        glowWaves.splice(i, 1);
      } else {
        wave.draw(ctx);
      }
    }

    for (let i = darkMarks.length - 1; i >= 0; i--) {
      const mark = darkMarks[i];
      mark.update();
      
      if (mark.phase === 'fading' && mark.opacity <= 0) {
        darkMarks.splice(i, 1);
      } else {
        mark.draw(ctx);
      }
    }

    for (let i = curseParticles.length - 1; i >= 0; i--) {
      const particle = curseParticles[i];
      particle.update();
      
      if (particle.life <= 0) {
        curseParticles.splice(i, 1);
      } else {
        particle.draw(ctx);
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
// Animación de Sombreros, Capas y Guantes Escudo (ID 23)
private animateEscudoMagico(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;

  class Character {
    x: number;
    y: number;
    state: string;
    stateProgress: number;
    eyesOpen: boolean;
    blinkTimer: number;
    shieldActive: boolean;
    shieldIntensity: number;

    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
      this.shieldActive = false;
      this.shieldIntensity = 0;
    }

    update() {
      if (this.state === 'standing') {
        this.stateProgress += 0.015;
        
        if (this.stateProgress >= 1) {
          this.state = 'activating';
          this.stateProgress = 0;
        }
      } else if (this.state === 'activating') {
        this.stateProgress += 0.03;
        
        if (this.shieldIntensity < 1) {
          this.shieldIntensity += 0.04;
        }
        
        if (this.stateProgress >= 1) {
          this.state = 'protected';
          this.stateProgress = 0;
          this.shieldActive = true;
        }
      } else if (this.state === 'protected') {
        this.stateProgress += 0.008;
        
        if (this.stateProgress >= 1) {
          this.reset();
        }
      }

      if (this.eyesOpen) {
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
      this.shieldActive = false;
      this.shieldIntensity = 0;
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
      if (this.shieldActive) {
        bodyGradient.addColorStop(0, '#7C3AED');
        bodyGradient.addColorStop(1, '#5B21B6');
      } else {
        bodyGradient.addColorStop(0, '#5A67D8');
        bodyGradient.addColorStop(1, '#4C51BF');
      }
      ctx.fillStyle = bodyGradient;
      
      ctx.beginPath();
      ctx.ellipse(0, 35, 38, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      if (this.shieldActive) {
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-25, 30, 15, 0, Math.PI);
        ctx.arc(25, 30, 15, 0, Math.PI);
        ctx.stroke();
      }

      ctx.strokeStyle = '#FFD7BA';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';

      if (this.state === 'activating') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-40, -10, -20, -30);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-20, -30, 9, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.quadraticCurveTo(40, -10, 20, -30);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(20, -30, 9, 0, Math.PI * 2);
        ctx.fill();

        if (this.shieldIntensity > 0.3) {
          ctx.fillStyle = `rgba(139, 92, 246, ${this.shieldIntensity * 0.5})`;
          ctx.beginPath();
          ctx.arc(-20, -30, 12, 0, Math.PI * 2);
          ctx.arc(20, -30, 12, 0, Math.PI * 2);
          ctx.fill();
        }
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
      
      ctx.beginPath();
      ctx.moveTo(-28, -32);
      ctx.quadraticCurveTo(-18, -35, -10, -32);
      ctx.moveTo(10, -32);
      ctx.quadraticCurveTo(18, -35, 28, -32);
      ctx.stroke();

      ctx.fillStyle = this.shieldActive ? '#5B21B6' : '#2C1810';
      ctx.beginPath();
      ctx.ellipse(0, -48, 40, 20, 0, 0, Math.PI, true);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(-20, -44, 15, 0, Math.PI * 2);
      ctx.arc(20, -44, 15, 0, Math.PI * 2);
      ctx.arc(0, -56, 18, 0, Math.PI * 2);
      ctx.fill();

      if (this.shieldActive) {
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, -45, 42, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = '#FFB6A3';
      ctx.beginPath();
      ctx.ellipse(0, -12, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(-2, -15, 2.5, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.arc(0, -5, 14, 0.3, Math.PI - 0.3);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 160, 160, 0.4)';
      ctx.beginPath();
      ctx.arc(-28, -12, 10, 0, Math.PI * 2);
      ctx.arc(28, -12, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Shield {
    rotation: number;
    runesRotation: number;
    pulsePhase: number;
    character: Character;

    constructor(character: Character) {
      this.character = character;
      this.rotation = 0;
      this.runesRotation = 0;
      this.pulsePhase = 0;
    }

    update() {
      if (this.character.shieldActive) {
        this.rotation += 0.01;
        this.runesRotation += 0.02;
        this.pulsePhase += 0.05;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.character.shieldIntensity <= 0) return;

      const x = this.character.x;
      const y = this.character.y;
      const intensity = this.character.shieldIntensity;
      const radius = 80;

      ctx.save();

      const pulse = Math.sin(this.pulsePhase) * 0.15 + 0.85;
      
      const shieldGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * pulse);
      shieldGradient.addColorStop(0, `rgba(139, 92, 246, ${0.05 * intensity})`);
      shieldGradient.addColorStop(0.7, `rgba(167, 139, 250, ${0.2 * intensity})`);
      shieldGradient.addColorStop(1, `rgba(196, 181, 253, ${0.4 * intensity})`);
      
      ctx.fillStyle = shieldGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius * pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(167, 139, 250, ${0.8 * intensity})`;
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(139, 92, 246, 0.8)';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(x, y, radius * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(this.runesRotation);

      const numRunes = 8;
      for (let i = 0; i < numRunes; i++) {
        const angle = (i / numRunes) * Math.PI * 2;
        const runeX = Math.cos(angle) * (radius * 0.85);
        const runeY = Math.sin(angle) * (radius * 0.85);

        ctx.save();
        ctx.translate(runeX, runeY);
        ctx.rotate(-this.runesRotation + angle);

        ctx.globalAlpha = intensity * 0.8;
        ctx.strokeStyle = '#A78BFA';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(0, 6);
        ctx.moveTo(-4, -3);
        ctx.lineTo(0, 0);
        ctx.lineTo(4, -3);
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();

      for (let i = 0; i < 3; i++) {
        const ringRadius = radius * (0.4 + i * 0.2);
        const ringAlpha = intensity * (0.3 - i * 0.1);
        const ringRotation = this.rotation * (1 + i * 0.5);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ringRotation);

        ctx.strokeStyle = `rgba(167, 139, 250, ${ringAlpha})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
      }

      ctx.restore();
    }
  }

  class Spell {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    speed: number;
    angle: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    bounced: boolean;
    color: string;
    trail: Array<{x: number, y: number}>;

    constructor(targetX: number, targetY: number) {
      this.x = Math.random() < 0.5 ? -50 : canvas.width + 50;
      this.y = Math.random() * canvas.height * 0.5 + canvas.height * 0.25;
      this.targetX = targetX;
      this.targetY = targetY;
      this.speed = 4;
      this.angle = Math.atan2(targetY - this.y, targetX - this.x);
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;
      this.size = 8;
      this.life = 1;
      this.bounced = false;
      this.color = this.getRandomSpellColor();
      this.trail = [];
    }

    getRandomSpellColor() {
      const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update(character: Character) {
      if (!this.bounced) {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 10) {
          this.trail.shift();
        }

        this.x += this.vx;
        this.y += this.vy;

        if (character.shieldActive) {
          const dx = this.x - character.x;
          const dy = this.y - character.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80 && !this.bounced) {
            this.bounced = true;
            const bounceAngle = Math.atan2(dy, dx);
            this.vx = Math.cos(bounceAngle) * this.speed * 1.5;
            this.vy = Math.sin(bounceAngle) * this.speed * 1.5;
          }
        }
      } else {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.02;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      for (let i = 0; i < this.trail.length; i++) {
        const t = this.trail[i];
        const alpha = (i / this.trail.length) * 0.5 * this.life;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(t.x, t.y, this.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = this.life;

      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(0.5, this.color);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class ShieldFlash {
    x: number;
    y: number;
    size: number;
    maxSize: number;
    life: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = 0;
      this.maxSize = 40;
      this.life = 1;
    }

    update() {
      this.size += 3;
      this.life = 1 - (this.size / this.maxSize);
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life * 0.8;

      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.8)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class MagicParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 3 + 1;
      this.life = 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= 0.015;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life;

      ctx.fillStyle = '#A78BFA';
      ctx.shadowColor = '#8B5CF6';
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.restore();
    }
  }

  const character = new Character();
  const shield = new Shield(character);
  const spells: Spell[] = [];
  const shieldFlashes: ShieldFlash[] = [];
  const magicParticles: MagicParticle[] = [];

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

    if (character.state === 'protected' && Math.random() < 0.03) {
      spells.push(new Spell(character.x, character.y));
    }

    if (character.shieldActive && Math.random() < 0.2) {
      magicParticles.push(new MagicParticle(
        character.x + (Math.random() - 0.5) * 80,
        character.y + (Math.random() - 0.5) * 80
      ));
    }

    for (let i = spells.length - 1; i >= 0; i--) {
      const spell = spells[i];
      const wasBounced = spell.bounced;
      
      spell.update(character);

      if (!wasBounced && spell.bounced) {
        shieldFlashes.push(new ShieldFlash(spell.x, spell.y));
        
        for (let j = 0; j < 8; j++) {
          magicParticles.push(new MagicParticle(spell.x, spell.y));
        }
      }

      if (spell.life <= 0 || spell.x < -100 || spell.x > canvas.width + 100 || 
          spell.y < -100 || spell.y > canvas.height + 100) {
        spells.splice(i, 1);
      } else {
        spell.draw(ctx);
      }
    }

    for (let i = shieldFlashes.length - 1; i >= 0; i--) {
      const flash = shieldFlashes[i];
      flash.update();
      
      if (flash.size >= flash.maxSize) {
        shieldFlashes.splice(i, 1);
      } else {
        flash.draw(ctx);
      }
    }

    for (let i = magicParticles.length - 1; i >= 0; i--) {
      const particle = magicParticles[i];
      particle.update();
      
      if (particle.life <= 0) {
        magicParticles.splice(i, 1);
      } else {
        particle.draw(ctx);
      }
    }

    shield.update();
    character.update();

    shield.draw(ctx);
    character.draw(ctx);

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación de Polvo Peruano de Oscuridad Instantánea (ID 24)
private animatePeruvianDarknessPowder(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;

  class Character {
    x: number;
    y: number;
    state: string;
    stateProgress: number;
    eyesOpen: boolean;
    blinkTimer: number;

    constructor() {
      this.x = canvas.width / 2 - 80;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
    }

    update() {
      if (this.state === 'standing') {
        this.stateProgress += 0.015;
        
        if (this.stateProgress >= 1) {
          this.state = 'shaking';
          this.stateProgress = 0;
        }
      } else if (this.state === 'shaking') {
        this.stateProgress += 0.04;
        
        if (this.stateProgress >= 1) {
          this.state = 'throwing';
          this.stateProgress = 0;
        }
      } else if (this.state === 'throwing') {
        this.stateProgress += 0.05;
        
        if (this.stateProgress >= 1) {
          this.state = 'waiting';
          this.stateProgress = 0;
        }
      } else if (this.state === 'waiting') {
        this.stateProgress += 0.008;
        
        if (this.stateProgress >= 1) {
          this.reset();
        }
      }

      if (this.eyesOpen) {
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

      ctx.beginPath();
      ctx.moveTo(-35, 20);
      ctx.lineTo(-42, 60);
      ctx.stroke();
      
      ctx.fillStyle = '#FFD7BA';
      ctx.beginPath();
      ctx.arc(-42, 60, 9, 0, Math.PI * 2);
      ctx.fill();

      let armShake = 0;
      if (this.state === 'shaking') {
        armShake = Math.sin(this.stateProgress * Math.PI * 10) * 5;
      }

      if (this.state === 'throwing') {
        const throwAngle = -0.8 * this.stateProgress;
        const handX = 35 + Math.cos(throwAngle) * 50;
        const handY = 20 + Math.sin(throwAngle) * 50;
        
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.lineTo(handX, handY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(handX, handY, 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.lineTo(30 + armShake, 0);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(30 + armShake, 0, 9, 0, Math.PI * 2);
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
      
      ctx.beginPath();
      ctx.moveTo(-28, -32);
      ctx.quadraticCurveTo(-18, -35, -10, -32);
      ctx.moveTo(10, -32);
      ctx.quadraticCurveTo(18, -35, 28, -32);
      ctx.stroke();

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

      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.arc(0, -5, 14, 0.3, Math.PI - 0.3);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 160, 160, 0.4)';
      ctx.beginPath();
      ctx.arc(-28, -12, 10, 0, Math.PI * 2);
      ctx.arc(28, -12, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Bottle {
    x: number;
    y: number;
    visible: boolean;
    thrown: boolean;
    throwProgress: number;
    character: Character;

    constructor(character: Character) {
      this.character = character;
      this.x = character.x + 30;
      this.y = character.y;
      this.visible = true;
      this.thrown = false;
      this.throwProgress = 0;
    }

    update() {
      if (this.character.state === 'shaking') {
        const shake = Math.sin(this.character.stateProgress * Math.PI * 10) * 5;
        this.x = this.character.x + 30 + shake;
        this.y = this.character.y;
      }

      if (this.character.state === 'throwing' && !this.thrown) {
        this.throwProgress = this.character.stateProgress;
        
        const startX = this.character.x + 30;
        const startY = this.character.y;
        const targetX = canvas.width / 2 + 100;
        const targetY = canvas.height / 2 + 20;
        
        this.x = startX + (targetX - startX) * this.throwProgress;
        this.y = startY + (targetY - startY) * this.throwProgress - Math.sin(this.throwProgress * Math.PI) * 50;

        if (this.throwProgress >= 0.9) {
          this.visible = false;
          this.thrown = true;
        }
      }

      if (this.character.state === 'standing' && this.character.stateProgress < 0.1) {
        this.reset();
      }
    }

    reset() {
      this.x = this.character.x + 30;
      this.y = this.character.y;
      this.visible = true;
      this.thrown = false;
      this.throwProgress = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.visible) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      
      const rotation = this.throwProgress * Math.PI * 2;
      ctx.rotate(rotation);

      const bottleGradient = ctx.createLinearGradient(-8, -15, 8, 15);
      bottleGradient.addColorStop(0, 'rgba(200, 220, 255, 0.8)');
      bottleGradient.addColorStop(0.5, 'rgba(150, 180, 230, 0.6)');
      bottleGradient.addColorStop(1, 'rgba(100, 140, 200, 0.5)');
      ctx.fillStyle = bottleGradient;
      
      ctx.beginPath();
      ctx.moveTo(-8, -10);
      ctx.lineTo(-8, 10);
      ctx.quadraticCurveTo(-8, 15, -3, 15);
      ctx.lineTo(3, 15);
      ctx.quadraticCurveTo(8, 15, 8, 10);
      ctx.lineTo(8, -10);
      ctx.quadraticCurveTo(8, -15, 3, -15);
      ctx.lineTo(-3, -15);
      ctx.quadraticCurveTo(-8, -15, -8, -10);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(20, 10, 30, 0.9)';
      ctx.fillRect(-6, -5, 12, 18);

      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-4, -18, 8, 6);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(-6, -8, 3, 10);

      ctx.fillStyle = 'rgba(160, 120, 255, 0.6)';
      ctx.fillRect(-7, 0, 14, 8);

      ctx.restore();
    }
  }

  class DarknessCloud {
    centerX: number;
    centerY: number;
    radius: number;
    maxRadius: number;
    opacity: number;
    phase: string;
    pulsePhase: number;
    swirls: Array<{angle: number, distance: number, rotation: number}>;

    constructor(x: number, y: number) {
      this.centerX = x;
      this.centerY = y;
      this.radius = 0;
      this.maxRadius = 200;
      this.opacity = 0;
      this.phase = 'expanding';
      this.pulsePhase = 0;
      this.swirls = [];
      
      for (let i = 0; i < 6; i++) {
        this.swirls.push({
          angle: (i / 6) * Math.PI * 2,
          distance: 0,
          rotation: Math.random() * Math.PI * 2
        });
      }
    }

    update() {
      this.pulsePhase += 0.03;

      if (this.phase === 'expanding') {
        this.radius += 3;
        this.opacity += 0.02;
        
        for (const swirl of this.swirls) {
          swirl.distance += 2;
          swirl.rotation += 0.05;
        }
        
        if (this.radius >= this.maxRadius) {
          this.phase = 'pulsing';
          this.opacity = 0.95;
        }
      } else if (this.phase === 'pulsing') {
        for (const swirl of this.swirls) {
          swirl.rotation += 0.02;
        }
      } else if (this.phase === 'contracting') {
        this.radius -= 3;
        this.opacity -= 0.02;
        
        for (const swirl of this.swirls) {
          swirl.distance -= 2;
        }
      }
    }

    startContracting() {
      this.phase = 'contracting';
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();

      const pulse = Math.sin(this.pulsePhase) * 10;
      
      for (let layer = 0; layer < 3; layer++) {
        const layerRadius = this.radius * (1 - layer * 0.15) + pulse * (1 - layer * 0.3);
        const layerOpacity = this.opacity * (0.4 - layer * 0.1);
        
        const gradient = ctx.createRadialGradient(
          this.centerX, this.centerY, 0,
          this.centerX, this.centerY, layerRadius
        );
        gradient.addColorStop(0, `rgba(10, 5, 20, ${layerOpacity})`);
        gradient.addColorStop(0.5, `rgba(20, 10, 30, ${layerOpacity * 0.8})`);
        gradient.addColorStop(1, `rgba(30, 15, 40, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, layerRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const swirl of this.swirls) {
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(swirl.angle + swirl.rotation);
        
        ctx.globalAlpha = this.opacity * 0.4;
        ctx.strokeStyle = 'rgba(40, 20, 60, 0.6)';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        for (let i = 0; i < 20; i++) {
          const t = i / 20;
          const angle = t * Math.PI * 2;
          const distance = swirl.distance * t;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        ctx.restore();
      }

      ctx.restore();
    }
  }

  class VioletMote {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    twinklePhase: number;
    twinkleSpeed: number;
    orbitAngle: number;
    orbitSpeed: number;
    orbitRadius: number;

    constructor(cloudX: number, cloudY: number, cloudRadius: number) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * cloudRadius;
      
      this.x = cloudX + Math.cos(angle) * distance;
      this.y = cloudY + Math.sin(angle) * distance;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 3 + 1;
      this.life = 1;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.1 + 0.05;
      this.orbitAngle = angle;
      this.orbitSpeed = (Math.random() - 0.5) * 0.02;
      this.orbitRadius = distance;
    }

    update(cloudX: number, cloudY: number) {
      this.orbitAngle += this.orbitSpeed;
      this.twinklePhase += this.twinkleSpeed;
      
      this.x = cloudX + Math.cos(this.orbitAngle) * this.orbitRadius + this.vx;
      this.y = cloudY + Math.sin(this.orbitAngle) * this.orbitRadius + this.vy;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      
      const twinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;
      ctx.globalAlpha = this.life * twinkle;

      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
      gradient.addColorStop(0, 'rgba(200, 140, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(160, 100, 230, 0.8)');
      gradient.addColorStop(1, 'rgba(120, 60, 200, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 200, 255, 1)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class ImpactEffect {
    x: number;
    y: number;
    size: number;
    maxSize: number;
    life: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = 0;
      this.maxSize = 50;
      this.life = 1;
    }

    update() {
      this.size += 4;
      this.life = 1 - (this.size / this.maxSize);
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.life;

      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, 'rgba(100, 50, 150, 0.8)');
      gradient.addColorStop(0.5, 'rgba(60, 30, 100, 0.4)');
      gradient.addColorStop(1, 'rgba(20, 10, 40, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  const character = new Character();
  const bottle = new Bottle(character);
  const darknessClouds: DarknessCloud[] = [];
  const violetMotes: VioletMote[] = [];
  const impactEffects: ImpactEffect[] = [];

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

    if (bottle.thrown && bottle.throwProgress >= 0.9 && darknessClouds.length === 0) {
      const cloud = new DarknessCloud(bottle.x, bottle.y);
      darknessClouds.push(cloud);
      impactEffects.push(new ImpactEffect(bottle.x, bottle.y));
    }

    if (darknessClouds.length > 0) {
      const cloud = darknessClouds[0];
      if (cloud.phase === 'expanding' && Math.random() < 0.3) {
        violetMotes.push(new VioletMote(cloud.centerX, cloud.centerY, cloud.radius));
      } else if (cloud.phase === 'pulsing' && violetMotes.length < 40 && Math.random() < 0.15) {
        violetMotes.push(new VioletMote(cloud.centerX, cloud.centerY, cloud.radius));
      }
    }

    if (character.state === 'standing' && character.stateProgress < 0.1 && darknessClouds.length > 0) {
      for (const cloud of darknessClouds) {
        cloud.startContracting();
      }
    }

    for (let i = darknessClouds.length - 1; i >= 0; i--) {
      const cloud = darknessClouds[i];
      cloud.update();
      
      if (cloud.radius <= 0 && cloud.phase === 'contracting') {
        darknessClouds.splice(i, 1);
        violetMotes.length = 0;
      } else {
        cloud.draw(ctx);
      }
    }

    for (let i = impactEffects.length - 1; i >= 0; i--) {
      const effect = impactEffects[i];
      effect.update();
      
      if (effect.size >= effect.maxSize) {
        impactEffects.splice(i, 1);
      } else {
        effect.draw(ctx);
      }
    }

    for (let i = violetMotes.length - 1; i >= 0; i--) {
      const mote = violetMotes[i];
      
      if (darknessClouds.length > 0) {
        mote.update(darknessClouds[0].centerX, darknessClouds[0].centerY);
        mote.draw(ctx);
      } else {
        violetMotes.splice(i, 1);
      }
    }

    bottle.update();
    character.update();

    character.draw(ctx);
    bottle.draw(ctx);

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}
// Animación de los Detonadores Trampa (ID 25)
private animateDetonadoresTrampa(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;
  const cycleTime = 180;

  const explosionParticles: any[] = [];

  class ExplosionParticle {
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

    constructor(x: number, y: number, angle: number, speed: number) {
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 60;
      this.maxLife = 60;
      this.size = Math.random() * 8 + 4;
      this.color = ['#ff6b00', '#ffd700', '#ff0000', '#ffaa00', '#fff'][Math.floor(Math.random() * 5)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.15;
      this.vx *= 0.98;
      this.rotation += this.rotationSpeed;
      this.life--;
    }

    draw(context: CanvasRenderingContext2D) {
      const alpha = this.life / this.maxLife;
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.globalAlpha = alpha;

      context.fillStyle = this.color;
      context.shadowBlur = 15;
      context.shadowColor = this.color;
      context.beginPath();
      context.arc(0, 0, this.size, 0, Math.PI * 2);
      context.fill();

      if (this.life > this.maxLife * 0.5) {
        context.fillStyle = '#fff';
        context.shadowBlur = 20;
        context.beginPath();
        context.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      context.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const soundWaves: any[] = [];

  class SoundWave {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    life: number;
    maxLife: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.maxRadius = 120;
      this.life = 40;
      this.maxLife = 40;
    }

    update() {
      this.radius += 4;
      this.life--;
    }

    draw(context: CanvasRenderingContext2D) {
      const alpha = this.life / this.maxLife;
      context.save();
      context.strokeStyle = '#ffd700';
      context.lineWidth = 3;
      context.globalAlpha = alpha;
      context.shadowBlur = 10;
      context.shadowColor = '#ffd700';

      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.stroke();

      context.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const drawDetonator = (x: number, y: number, vibrating: boolean, scale: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    if (vibrating) {
      const shake = Math.sin(time * 0.8) * 3;
      ctx.translate(shake, Math.cos(time * 1.2) * 2);
    }

    const hornGradient = ctx.createLinearGradient(-30, 0, 30, 0);
    hornGradient.addColorStop(0, '#ff6b00');
    hornGradient.addColorStop(0.5, '#ff8c00');
    hornGradient.addColorStop(1, '#ff4500');

    ctx.fillStyle = hornGradient;
    ctx.beginPath();
    ctx.moveTo(-40, -25);
    ctx.quadraticCurveTo(-50, 0, -40, 25);
    ctx.lineTo(-10, 15);
    ctx.lineTo(-10, -15);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#d94d00';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 200, 100, 0.4)';
    ctx.beginPath();
    ctx.moveTo(-35, -20);
    ctx.quadraticCurveTo(-42, -5, -35, 10);
    ctx.lineTo(-15, 5);
    ctx.lineTo(-15, -10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ff6b00';
    ctx.fillRect(-10, -12, 30, 24);

    ctx.strokeStyle = '#d94d00';
    ctx.lineWidth = 1.5;
    for (let i = -5; i < 20; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, -12);
      ctx.lineTo(i, 12);
      ctx.stroke();
    }

    ctx.fillStyle = '#8b4513';
    ctx.fillRect(20, -8, 15, 16);

    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(22 + i * 4, -8);
      ctx.lineTo(22 + i * 4, 8);
      ctx.stroke();
    }

    const buttonY = vibrating ? 2 : 0;
    ctx.fillStyle = '#ff0000';
    ctx.shadowBlur = vibrating ? 15 : 5;
    ctx.shadowColor = '#ff0000';
    ctx.beginPath();
    ctx.arc(27, buttonY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(25, buttonY - 2, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-5, -18);
    ctx.lineTo(0, -23);
    ctx.lineTo(5, -18);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-5, 18);
    ctx.lineTo(0, 23);
    ctx.lineTo(5, 18);
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('BOOM', 5, 3);

    ctx.restore();
  };

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#0a0514');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const idlePhase = time < 40;
    const vibratingPhase = time >= 40 && time < 70;
    const explosionPhase = time >= 70 && time < 90;
    const cloudPhase = time >= 90 && time < 140;
    const fadePhase = time >= 140;

    let detonatorVisible = !explosionPhase && !cloudPhase && !fadePhase;
    let detonatorVibrating = vibratingPhase;
    let detonatorScale = 1;

    if (vibratingPhase) {
      const vibrateProgress = (time - 40) / 30;
      detonatorScale = 1 + Math.sin(vibrateProgress * Math.PI * 8) * 0.1;
    }

    if (detonatorVisible) {
      drawDetonator(centerX, centerY, detonatorVibrating, detonatorScale);
    }

    if (time === 70) {
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2;
        const speed = Math.random() * 5 + 3;
        explosionParticles.push(new ExplosionParticle(centerX, centerY, angle, speed));
      }

      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          soundWaves.push(new SoundWave(centerX, centerY));
        }, i * 100);
      }
    }

    for (let i = explosionParticles.length - 1; i >= 0; i--) {
      explosionParticles[i].update();
      explosionParticles[i].draw(ctx);

      if (explosionParticles[i].isDead()) {
        explosionParticles.splice(i, 1);
      }
    }

    for (let i = soundWaves.length - 1; i >= 0; i--) {
      soundWaves[i].update();
      soundWaves[i].draw(ctx);

      if (soundWaves[i].isDead()) {
        soundWaves.splice(i, 1);
      }
    }

    if (explosionPhase) {
      const flashProgress = (time - 70) / 20;
      ctx.save();
      ctx.globalAlpha = 1 - flashProgress;
      
      const flashGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
      flashGradient.addColorStop(0, '#ffffff');
      flashGradient.addColorStop(0.3, '#ffd700');
      flashGradient.addColorStop(0.6, '#ff6b00');
      flashGradient.addColorStop(1, 'rgba(255, 107, 0, 0)');
      
      ctx.fillStyle = flashGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (time >= 72 && time < 85) {
        const textProgress = (time - 72) / 13;
        const textScale = 1 + textProgress * 0.5;
        const textAlpha = 1 - textProgress;

        ctx.save();
        ctx.translate(centerX, centerY - 20);
        ctx.scale(textScale, textScale);
        ctx.globalAlpha = textAlpha;

        ctx.font = 'bold 60px Arial';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 6;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeText('BOOM!', 0, 0);

        ctx.fillStyle = '#ffd700';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ff6b00';
        ctx.fillText('BOOM!', 0, 0);

        ctx.restore();
      }
    }

    if (explosionPhase) {
      const impactProgress = (time - 70) / 20;
      ctx.save();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 4;
      ctx.globalAlpha = 1 - impactProgress;

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const length = 60 + impactProgress * 80;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * length,
          centerY + Math.sin(angle) * length
        );
        ctx.stroke();
      }

      ctx.restore();
    }

    if (cloudPhase || fadePhase) {
      const cloudProgress = fadePhase ? 1 : (time - 90) / 50;
      const cloudAlpha = fadePhase ? 1 - (time - 140) / 40 : 0.6;

      ctx.save();
      ctx.globalAlpha = cloudAlpha;
      ctx.fillStyle = '#666';

      const cloudCircles = [
        { x: 0, y: -10, r: 35 },
        { x: -20, y: 10, r: 30 },
        { x: 20, y: 10, r: 30 },
        { x: -10, y: 25, r: 25 },
        { x: 10, y: 25, r: 25 },
      ];

      cloudCircles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(
          centerX + circle.x,
          centerY + circle.y - cloudProgress * 20,
          circle.r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      ctx.restore();
    }

    time++;

    if (time >= cycleTime) {
      time = 0;
      explosionParticles.length = 0;
      soundWaves.length = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}
// Animación de los Puffskeins Pigmeos (ID 26)
private animatePuffskeinsPigmeos(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;
  const cycleTime = 240;

  const heartParticles: any[] = [];

  class HeartParticle {
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

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = -Math.random() * 2 - 1;
      this.life = 60;
      this.maxLife = 60;
      this.size = Math.random() * 8 + 4;
      this.color = ['#ffb3d9', '#ffc9e5', '#ffe0f0', '#ffd1dc'][Math.floor(Math.random() * 4)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.life--;
    }

    draw(context: CanvasRenderingContext2D) {
      const alpha = this.life / this.maxLife;
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.rotation);
      context.globalAlpha = alpha;

      context.fillStyle = this.color;
      context.shadowBlur = 10;
      context.shadowColor = this.color;
      context.beginPath();
      context.moveTo(0, this.size * 0.3);
      context.bezierCurveTo(-this.size, -this.size * 0.3, -this.size * 0.5, -this.size, 0, -this.size * 0.2);
      context.bezierCurveTo(this.size * 0.5, -this.size, this.size, -this.size * 0.3, 0, this.size * 0.3);
      context.fill();

      context.globalAlpha = 1;
      context.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const sparkleParticles: any[] = [];

  class SparkleParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.life = 30;
      this.maxLife = 30;
      this.size = Math.random() * 3 + 1;
      this.color = ['#fff9e6', '#fffacd', '#fff', '#ffefdb'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
    }

    draw(context: CanvasRenderingContext2D) {
      const alpha = this.life / this.maxLife;
      context.save();
      context.globalAlpha = alpha;
      context.fillStyle = this.color;
      context.shadowBlur = 8;
      context.shadowColor = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    isDead() {
      return this.life <= 0;
    }
  }

  const drawPuffskein = (x: number, y: number, bounceOffset: number, color: any, size: number) => {
    ctx.save();
    ctx.translate(x, y + bounceOffset);

    const baseSize = size;

    const furGradient = ctx.createRadialGradient(-5, -5, baseSize * 0.3, 0, 0, baseSize);
    furGradient.addColorStop(0, color.light);
    furGradient.addColorStop(0.7, color.base);
    furGradient.addColorStop(1, color.dark);

    ctx.fillStyle = furGradient;
    ctx.beginPath();
    ctx.arc(0, 0, baseSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = color.dark;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const startDist = baseSize * 0.7;
      const endDist = baseSize + Math.random() * 5;
      const startX = Math.cos(angle) * startDist;
      const startY = Math.sin(angle) * startDist;
      const endX = Math.cos(angle) * endDist;
      const endY = Math.sin(angle) * endDist;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(0, baseSize * 0.8, baseSize * 0.8, baseSize * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    const eyeY = -baseSize * 0.2;
    const eyeSize = baseSize * 0.25;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(-baseSize * 0.3, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-baseSize * 0.3 - eyeSize * 0.3, eyeY - eyeSize * 0.3, eyeSize * 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(-baseSize * 0.3 + eyeSize * 0.2, eyeY + eyeSize * 0.2, eyeSize * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(baseSize * 0.3, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(baseSize * 0.3 - eyeSize * 0.3, eyeY - eyeSize * 0.3, eyeSize * 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(baseSize * 0.3 + eyeSize * 0.2, eyeY + eyeSize * 0.2, eyeSize * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff9999';
    ctx.beginPath();
    ctx.arc(0, eyeY + baseSize * 0.15, baseSize * 0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 182, 193, 0.4)';
    ctx.beginPath();
    ctx.ellipse(-baseSize * 0.5, eyeY + baseSize * 0.3, baseSize * 0.2, baseSize * 0.15, 0, 0, Math.PI * 2);
    ctx.ellipse(baseSize * 0.5, eyeY + baseSize * 0.3, baseSize * 0.2, baseSize * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() < 0.1) {
      ctx.fillStyle = '#ffb6c1';
      ctx.beginPath();
      ctx.ellipse(0, eyeY + baseSize * 0.35, baseSize * 0.15, baseSize * 0.1, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = color.dark;
    ctx.beginPath();
    ctx.ellipse(-baseSize * 0.4, baseSize * 0.7, baseSize * 0.15, baseSize * 0.2, 0.3, 0, Math.PI * 2);
    ctx.ellipse(baseSize * 0.4, baseSize * 0.7, baseSize * 0.15, baseSize * 0.2, -0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#0a0514');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const puffskeins = [
      {
        x: centerX - 120,
        y: centerY,
        color: {
          light: '#fff4e6',
          base: '#ffe4b3',
          dark: '#f5d199'
        },
        size: 35,
        bounceDelay: 0
      },
      {
        x: centerX,
        y: centerY - 20,
        color: {
          light: '#ffe6f7',
          base: '#ffccf0',
          dark: '#f5b3e0'
        },
        size: 40,
        bounceDelay: 20
      },
      {
        x: centerX + 120,
        y: centerY,
        color: {
          light: '#e6f3ff',
          base: '#cce6ff',
          dark: '#b3d9ff'
        },
        size: 35,
        bounceDelay: 40
      }
    ];

    puffskeins.forEach((puff, index) => {
      const jumpCycle = (time + puff.bounceDelay) % 80;
      let bounceOffset = 0;

      if (jumpCycle < 20) {
        bounceOffset = -Math.sin((jumpCycle / 20) * Math.PI) * 30;
      }

      drawPuffskein(puff.x, puff.y, bounceOffset, puff.color, puff.size);

      if (jumpCycle > 5 && jumpCycle < 15 && Math.random() < 0.3) {
        sparkleParticles.push(new SparkleParticle(puff.x, puff.y + bounceOffset));
      }

      if (Math.random() < 0.02) {
        heartParticles.push(new HeartParticle(puff.x, puff.y));
      }
    });

    for (let i = heartParticles.length - 1; i >= 0; i--) {
      heartParticles[i].update();
      heartParticles[i].draw(ctx);

      if (heartParticles[i].isDead()) {
        heartParticles.splice(i, 1);
      }
    }

    for (let i = sparkleParticles.length - 1; i >= 0; i--) {
      sparkleParticles[i].update();
      sparkleParticles[i].draw(ctx);

      if (sparkleParticles[i].isDead()) {
        sparkleParticles.splice(i, 1);
      }
    }

    if (time % 60 === 0) {
      const noteX = centerX + (Math.random() - 0.5) * 200;
      const noteY = centerY - 80;
      
      ctx.save();
      ctx.fillStyle = '#ffd700';
      ctx.font = '20px Arial';
      ctx.globalAlpha = 0.7;
      ctx.fillText('♪', noteX, noteY);
      ctx.fillText('♫', noteX + 30, noteY - 20);
      ctx.restore();
    }

    // Texto eliminado

    time++;

    if (time >= cycleTime) {
      time = 0;
    }

    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}
// Animación de Pociones de Amor (ID 27)
private animateLovePotion(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;

  class AnimationController {
    phase: string;
    progress: number;
    zoom: number;
    focusX: number;
    focusY: number;

    constructor() {
      this.phase = 'intro';
      this.progress = 0;
      this.zoom = 1;
      this.focusX = 0;
      this.focusY = 0;
    }

    update() {
      this.progress += 0.008;

      if (this.phase === 'intro') {
        if (this.progress >= 1) {
          this.phase = 'spray';
          this.progress = 0;
        }
      } else if (this.phase === 'spray') {
        if (this.progress >= 1) {
          this.phase = 'zoom';
          this.progress = 0;
        }
      } else if (this.phase === 'zoom') {
        this.zoom = 1 + this.progress * 2;
        this.focusX = canvas.width / 2;
        this.focusY = canvas.height / 2 - 80;
        
        if (this.progress >= 1) {
          this.phase = 'enchanted';
          this.progress = 0;
          this.zoom = 3;
        }
      } else if (this.phase === 'enchanted') {
        if (this.progress >= 1.2) {
          this.phase = 'zoomOut';
          this.progress = 0;
        }
      } else if (this.phase === 'zoomOut') {
        this.zoom = 3 - this.progress * 2;
        
        if (this.progress >= 1) {
          this.phase = 'intro';
          this.progress = 0;
          this.zoom = 1;
        }
      }
    }

    shouldSpray(): boolean {
      return this.phase === 'spray' && this.progress > 0.3 && this.progress < 0.6;
    }

    shouldEnchant(): boolean {
      return this.phase === 'zoom' || this.phase === 'enchanted';
    }
  }

  class Character {
    x: number;
    y: number;
    state: string;
    eyeState: string;
    blush: number;
    float: number;
    enchantProgress: number;

    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.state = 'normal';
      this.eyeState = 'normal';
      this.blush = 0;
      this.float = 0;
      this.enchantProgress = 0;
    }

    enchant() {
      if (this.state !== 'enchanted') {
        this.state = 'enchanted';
        this.enchantProgress = 0;
      }
    }

    reset() {
      this.state = 'normal';
      this.eyeState = 'normal';
      this.blush = 0;
      this.enchantProgress = 0;
    }

    update() {
      this.float += 0.05;

      if (this.state === 'enchanted') {
        this.enchantProgress += 0.03;
        
        if (this.enchantProgress > 0.3) {
          this.eyeState = 'hearts';
          this.blush = Math.min((this.enchantProgress - 0.3) / 0.4, 1);
        }
      }
    }

    draw(ctx: CanvasRenderingContext2D, isZoomed: boolean = false) {
      ctx.save();
      
      if (!isZoomed) {
        ctx.translate(this.x, this.y + Math.sin(this.float) * 3);
      } else {
        ctx.translate(this.x, this.y);
      }

      if (!isZoomed) {
        const bodyGradient = ctx.createLinearGradient(0, 0, 0, 80);
        bodyGradient.addColorStop(0, '#E74C3C');
        bodyGradient.addColorStop(1, '#C0392B');
        ctx.fillStyle = bodyGradient;
        ctx.beginPath();
        ctx.ellipse(0, 30, 30, 45, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#FFD7BA';
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-25, 20);
        ctx.lineTo(-32, 50);
        ctx.moveTo(25, 20);
        ctx.lineTo(32, 50);
        ctx.stroke();

        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-32, 50, 7, 0, Math.PI * 2);
        ctx.arc(32, 50, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#C0392B';
        ctx.beginPath();
        ctx.ellipse(-10, 70, 8, 20, -0.1, 0, Math.PI * 2);
        ctx.ellipse(10, 70, 8, 20, 0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.ellipse(-10, 88, 10, 6, 0, 0, Math.PI * 2);
        ctx.ellipse(10, 88, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      const headGradient = ctx.createRadialGradient(-6, -22, 5, 0, -18, 35);
      headGradient.addColorStop(0, '#FFEBD4');
      headGradient.addColorStop(1, '#FFD7BA');
      ctx.fillStyle = headGradient;
      ctx.beginPath();
      ctx.arc(0, -18, 35, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(0, -38, 33, 20, 0, 0, Math.PI, true);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(-18, -35, 13, 0, Math.PI * 2);
      ctx.arc(18, -35, 13, 0, Math.PI * 2);
      ctx.arc(0, -45, 15, 0, Math.PI * 2);
      ctx.fill();
      
      if (!isZoomed) {
        ctx.beginPath();
        ctx.ellipse(-25, -15, 12, 20, -0.3, 0, Math.PI * 2);
        ctx.ellipse(25, -15, 12, 20, 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(-35, -18, 7, 10, -0.2, 0, Math.PI * 2);
      ctx.ellipse(35, -18, 7, 10, 0.2, 0, Math.PI * 2);
      ctx.fill();

      if (this.eyeState === 'hearts') {
        ctx.save();
        ctx.translate(-16, -20);
        const heartScale = 1.2;
        ctx.scale(heartScale, heartScale);
        
        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
        glowGradient.addColorStop(0, 'rgba(255, 20, 147, 0.6)');
        glowGradient.addColorStop(1, 'rgba(255, 20, 147, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        
        const heartGradient = ctx.createRadialGradient(-2, -2, 0, 0, 0, 8);
        heartGradient.addColorStop(0, '#FF1493');
        heartGradient.addColorStop(1, '#C71585');
        ctx.fillStyle = heartGradient;
        
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.bezierCurveTo(-10, -6, -6, -10, 0, -4);
        ctx.bezierCurveTo(6, -10, 10, -6, 0, 4);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(-2, -4, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(1, -2, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        ctx.save();
        ctx.translate(16, -20);
        ctx.scale(heartScale, heartScale);
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = heartGradient;
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.bezierCurveTo(-10, -6, -6, -10, 0, -4);
        ctx.bezierCurveTo(6, -10, 10, -6, 0, 4);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(-2, -4, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(1, -2, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        for (let i = 0; i < 3; i++) {
          const angle = -0.4 + i * 0.3;
          ctx.beginPath();
          ctx.moveTo(-16 + Math.cos(angle) * 12, -28 + Math.sin(angle) * 12);
          ctx.lineTo(-16 + Math.cos(angle) * 18, -28 + Math.sin(angle) * 18);
          ctx.stroke();
        }
        
        for (let i = 0; i < 3; i++) {
          const angle = Math.PI + 0.4 - i * 0.3;
          ctx.beginPath();
          ctx.moveTo(16 + Math.cos(angle) * 12, -28 + Math.sin(angle) * 12);
          ctx.lineTo(16 + Math.cos(angle) * 18, -28 + Math.sin(angle) * 18);
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(-16, -20, 9, 11, 0, 0, Math.PI * 2);
        ctx.ellipse(16, -20, 9, 11, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2C1810';
        ctx.beginPath();
        ctx.arc(-16, -19, 5, 0, Math.PI * 2);
        ctx.arc(16, -19, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-14, -22, 2, 0, Math.PI * 2);
        ctx.arc(18, -22, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        
        for (let i = 0; i < 3; i++) {
          const angle = -0.3 + i * 0.25;
          ctx.beginPath();
          ctx.moveTo(-16 + Math.cos(angle) * 10, -26 + Math.sin(angle) * 10);
          ctx.lineTo(-16 + Math.cos(angle) * 14, -26 + Math.sin(angle) * 14);
          ctx.stroke();
        }
        
        for (let i = 0; i < 3; i++) {
          const angle = Math.PI + 0.3 - i * 0.25;
          ctx.beginPath();
          ctx.moveTo(16 + Math.cos(angle) * 10, -26 + Math.sin(angle) * 10);
          ctx.lineTo(16 + Math.cos(angle) * 14, -26 + Math.sin(angle) * 14);
          ctx.stroke();
        }
      }

      ctx.strokeStyle = '#6B4423';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-24, -28);
      ctx.quadraticCurveTo(-16, -30, -10, -28);
      ctx.moveTo(10, -28);
      ctx.quadraticCurveTo(16, -30, 24, -28);
      ctx.stroke();

      ctx.fillStyle = '#FFCDB0';
      ctx.beginPath();
      ctx.ellipse(0, -10, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      if (this.state === 'enchanted') {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, -4, 12, 0.2, Math.PI - 0.2);
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, -5, 11, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }

      const blushOpacity = this.state === 'enchanted' ? this.blush * 0.8 : 0.3;
      ctx.fillStyle = `rgba(255, 100, 150, ${blushOpacity})`;
      ctx.beginPath();
      ctx.arc(-24, -10, 9, 0, Math.PI * 2);
      ctx.arc(24, -10, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Bottle {
    x: number;
    y: number;
    float: number;
    glowIntensity: number;

    constructor() {
      this.x = canvas.width / 2 - 80;
      this.y = canvas.height / 2 + 60;
      this.float = 0;
      this.glowIntensity = 0.5;
    }

    update() {
      this.float += 0.06;
      this.glowIntensity = 0.5 + Math.sin(this.float * 2) * 0.3;
    }

    draw(ctx: CanvasRenderingContext2D) {
      const floatOffset = Math.sin(this.float) * 4;

      ctx.save();
      ctx.translate(this.x, this.y + floatOffset);

      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
      glowGradient.addColorStop(0, `rgba(255, 105, 180, ${this.glowIntensity * 0.6})`);
      glowGradient.addColorStop(0.5, `rgba(255, 182, 193, ${this.glowIntensity * 0.3})`);
      glowGradient.addColorStop(1, 'rgba(255, 105, 180, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.fill();

      const bottleGradient = ctx.createLinearGradient(-12, -20, 12, 20);
      bottleGradient.addColorStop(0, 'rgba(255, 182, 193, 0.9)');
      bottleGradient.addColorStop(0.5, 'rgba(255, 105, 180, 0.9)');
      bottleGradient.addColorStop(1, 'rgba(255, 20, 147, 0.8)');
      ctx.fillStyle = bottleGradient;

      ctx.beginPath();
      ctx.moveTo(-12, -12);
      ctx.lineTo(-12, 12);
      ctx.quadraticCurveTo(-12, 18, -6, 18);
      ctx.lineTo(6, 18);
      ctx.quadraticCurveTo(12, 18, 12, 12);
      ctx.lineTo(12, -12);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(200, 100, 150, 0.9)';
      ctx.fillRect(-6, -20, 12, 8);
      
      ctx.fillStyle = 'rgba(180, 80, 130, 0.9)';
      ctx.beginPath();
      ctx.moveTo(-8, -24);
      ctx.lineTo(-6, -20);
      ctx.lineTo(6, -20);
      ctx.lineTo(8, -24);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(-8, -4, 16, 12);
      
      ctx.fillStyle = '#FF1493';
      ctx.save();
      ctx.translate(0, 2);
      ctx.scale(0.4, 0.4);
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.bezierCurveTo(-10, -6, -6, -10, 0, -4);
      ctx.bezierCurveTo(6, -10, 10, -6, 0, 5);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.ellipse(-6, -6, 3, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 20, 147, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-12, -12);
      ctx.lineTo(-12, 12);
      ctx.quadraticCurveTo(-12, 18, -6, 18);
      ctx.lineTo(6, 18);
      ctx.quadraticCurveTo(12, 18, 12, 12);
      ctx.lineTo(12, -12);
      ctx.stroke();

      ctx.restore();
    }
  }

  interface SprayParticle {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    progress: number;
    size: number;
    life: number;
  }

  interface Heart {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    life: number;
    fadeSpeed: number;
    rotation: number;
    rotationSpeed: number;
  }

  const controller = new AnimationController();
  const character = new Character();
  const bottle = new Bottle();
  const sprayParticles: SprayParticle[] = [];
  const hearts: Heart[] = [];

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a0a2e');
    gradient.addColorStop(1, '#2d1b4e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 40; i++) {
      const sx = (i * 197) % canvas.width;
      const sy = (i * 137) % canvas.height;
      const size = ((i * 73) % 3) + 1;
      const twinkle = Math.sin(time * 0.05 + i) * 0.3 + 0.7;
      ctx.globalAlpha = twinkle;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    controller.update();

    if (controller.shouldSpray() && Math.random() < 0.3) {
      sprayParticles.push({
        x: bottle.x,
        y: bottle.y - 20,
        targetX: character.x,
        targetY: character.y - 20,
        progress: 0,
        size: Math.random() * 4 + 3,
        life: 1
      });
    }

    if (controller.shouldEnchant()) {
      character.enchant();
    } else if (controller.phase === 'intro') {
      character.reset();
    }

    if (controller.phase === 'enchanted' && Math.random() < 0.15) {
      hearts.push({
        x: character.x + (Math.random() - 0.5) * 60,
        y: character.y - 30,
        size: Math.random() * 6 + 5,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 1,
        life: 1,
        fadeSpeed: 0.01,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      });
    }

    for (let i = sprayParticles.length - 1; i >= 0; i--) {
      const p = sprayParticles[i];
      p.progress += 0.05;
      p.x = p.x + (p.targetX - p.x) * 0.1;
      p.y = p.y + (p.targetY - p.y) * 0.1;
      
      if (p.progress > 0.5) {
        p.life -= 0.05;
      }

      if (p.life <= 0) {
        sprayParticles.splice(i, 1);
      } else {
        ctx.save();
        ctx.globalAlpha = p.life;
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, 'rgba(255, 182, 193, 0.9)');
        gradient.addColorStop(1, 'rgba(255, 105, 180, 0.4)');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.x += h.vx;
      h.y += h.vy;
      h.rotation += h.rotationSpeed;
      h.life -= h.fadeSpeed;

      if (h.life <= 0) {
        hearts.splice(i, 1);
      } else {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rotation);
        ctx.globalAlpha = h.life;

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, h.size);
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(1, '#FF1493');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(0, h.size * 0.3);
        ctx.bezierCurveTo(-h.size, -h.size * 0.5, -h.size * 0.5, -h.size, 0, -h.size * 0.3);
        ctx.bezierCurveTo(h.size * 0.5, -h.size, h.size, -h.size * 0.5, 0, h.size * 0.3);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    bottle.update();
    character.update();

    if (controller.phase === 'zoom' || controller.phase === 'enchanted') {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(controller.zoom, controller.zoom);
      ctx.translate(-controller.focusX, -controller.focusY);
      
      character.draw(ctx, true);
      
      ctx.restore();
    } else {
      bottle.draw(ctx);
      character.draw(ctx, false);
    }

    time++;
    this.animationFrameId = requestAnimationFrame(animate);
  };

  animate();
}

// Animación de Lord Kakadura (ID 28)
private animateLordKakadura(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  let time = 0;

  class Character {
    x: number;
    y: number;
    state: string;
    stateProgress: number;
    eyesOpen: boolean;
    blinkTimer: number;
    bodyInflation: number;
    faceColor: number;
    sweatDrops: Array<{x: number, y: number, vy: number, life: number}>;
    struggle: number;
    shake: number;

    constructor() {
      this.x = canvas.width / 2 - 80;
      this.y = canvas.height / 2;
      this.state = 'standing';
      this.stateProgress = 0;
      this.eyesOpen = true;
      this.blinkTimer = 0;
      this.bodyInflation = 0;
      this.faceColor = 0;
      this.sweatDrops = [];
      this.struggle = 0;
      this.shake = 0;
    }

    update() {
      if (this.state === 'standing') {
        this.stateProgress += 0.012;
        
        if (this.stateProgress >= 1) {
          this.state = 'eating';
          this.stateProgress = 0;
        }
      } else if (this.state === 'eating') {
        this.stateProgress += 0.025;
        
        if (this.stateProgress >= 1) {
          this.state = 'digesting';
          this.stateProgress = 0;
        }
      } else if (this.state === 'digesting') {
        this.stateProgress += 0.015;
        
        if (this.stateProgress >= 1) {
          this.state = 'constipated';
          this.stateProgress = 0;
        }
      } else if (this.state === 'constipated') {
        this.stateProgress += 0.008;
        this.bodyInflation = Math.min(this.stateProgress * 1.5, 1);
        this.faceColor = Math.min(this.stateProgress * 2, 1);
        this.struggle = Math.sin(this.stateProgress * Math.PI * 8) * 3;
        this.shake = Math.sin(time * 0.5) * 2;
        
        if (Math.random() < 0.1 && this.bodyInflation > 0.3) {
          this.sweatDrops.push({
            x: this.x + (Math.random() > 0.5 ? 25 : -25),
            y: this.y - 30,
            vy: 0,
            life: 1
          });
        }
        
        if (this.stateProgress >= 1) {
          this.reset();
        }
      }

      for (let i = this.sweatDrops.length - 1; i >= 0; i--) {
        const drop = this.sweatDrops[i];
        drop.vy += 0.3;
        drop.y += drop.vy;
        drop.life -= 0.02;
        
        if (drop.life <= 0 || drop.y > canvas.height) {
          this.sweatDrops.splice(i, 1);
        }
      }

      if (this.eyesOpen && this.state !== 'constipated') {
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
      this.bodyInflation = 0;
      this.faceColor = 0;
      this.sweatDrops = [];
      this.struggle = 0;
      this.shake = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x + this.shake, this.y + this.struggle);

      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(0, 110, 45, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

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

      const bodyScale = 1 + this.bodyInflation * 0.4;
      const bodyGradient = ctx.createLinearGradient(0, 0, 0, 100);
      bodyGradient.addColorStop(0, '#9B6B47');
      bodyGradient.addColorStop(1, '#7D5635');
      ctx.fillStyle = bodyGradient;
      
      ctx.save();
      ctx.scale(bodyScale, bodyScale);
      ctx.beginPath();
      ctx.ellipse(0, 35 / bodyScale, 38, 55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (this.bodyInflation > 0.5) {
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.4)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(0, 35, 25 + i * 8, 0.3, Math.PI - 0.3);
          ctx.stroke();
        }
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
      } else if (this.state === 'constipated') {
        ctx.beginPath();
        ctx.moveTo(-35, 20);
        ctx.quadraticCurveTo(-25, 30, -15, 35);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(-15, 35, 9, 0, Math.PI * 2);
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
      if (this.state === 'constipated') {
        ctx.moveTo(35, 20);
        ctx.quadraticCurveTo(25, 30, 15, 35);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(15, 35, 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.moveTo(35, 20);
        ctx.lineTo(42, 60);
        ctx.stroke();
        
        ctx.fillStyle = '#FFD7BA';
        ctx.beginPath();
        ctx.arc(42, 60, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      const faceR = 255 - (50 * this.faceColor);
      const faceG = 235 - (80 * this.faceColor);
      const faceB = 212 - (100 * this.faceColor);
      
      const headGradient = ctx.createRadialGradient(-8, -28, 5, 0, -20, 45);
      headGradient.addColorStop(0, `rgb(${faceR + 20}, ${faceG + 20}, ${faceB + 20})`);
      headGradient.addColorStop(1, `rgb(${faceR}, ${faceG}, ${faceB})`);
      ctx.fillStyle = headGradient;
      
      ctx.beginPath();
      ctx.arc(0, -20, 42, 0, Math.PI * 2);
      ctx.fill();

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

      if (this.state === 'constipated') {
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-24, -23);
        ctx.lineTo(-12, -23);
        ctx.moveTo(12, -23);
        ctx.lineTo(24, -23);
        ctx.stroke();
        
        ctx.lineWidth = 2;
        for (let i = 0; i < 2; i++) {
          ctx.beginPath();
          ctx.moveTo(-28, -28 - i * 4);
          ctx.lineTo(-24, -26 - i * 4);
          ctx.moveTo(24, -26 - i * 4);
          ctx.lineTo(28, -28 - i * 4);
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

      const eyebrowRaise = this.state === 'constipated' ? this.bodyInflation * 8 : 0;
      ctx.strokeStyle = '#6B4423';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(-28, -32 - eyebrowRaise);
      ctx.quadraticCurveTo(-18, -35 - eyebrowRaise, -10, -32 - eyebrowRaise);
      ctx.moveTo(10, -32 - eyebrowRaise);
      ctx.quadraticCurveTo(18, -35 - eyebrowRaise, 28, -32 - eyebrowRaise);
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
      } else if (this.state === 'constipated') {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(-12, -5);
        ctx.lineTo(12, -5);
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.arc(0, -5, 14, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }

      const cheekAlpha = 0.4 + this.faceColor * 0.3;
      ctx.fillStyle = `rgba(255, 100, 100, ${cheekAlpha})`;
      ctx.beginPath();
      ctx.arc(-28, -12, 10, 0, Math.PI * 2);
      ctx.arc(28, -12, 10, 0, Math.PI * 2);
      ctx.fill();

      for (const drop of this.sweatDrops) {
        ctx.save();
        ctx.globalAlpha = drop.life;
        
        const dropGradient = ctx.createRadialGradient(drop.x - this.x, drop.y - this.y, 0, drop.x - this.x, drop.y - this.y, 4);
        dropGradient.addColorStop(0, 'rgba(180, 220, 255, 1)');
        dropGradient.addColorStop(1, 'rgba(100, 180, 230, 0.6)');
        ctx.fillStyle = dropGradient;
        
        ctx.beginPath();
        ctx.arc(drop.x - this.x, drop.y - this.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      ctx.restore();
    }
  }

  class Pill {
    x: number;
    y: number;
    visible: boolean;
    eaten: boolean;
    float: number;
    rotation: number;
    character: Character;

    constructor(character: Character) {
      this.character = character;
      this.x = canvas.width / 2 + 100;
      this.y = canvas.height / 2 - 30;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
      this.rotation = 0;
    }

    update() {
      if (!this.eaten) {
        this.float += 0.08;
        this.rotation += 0.05;
      }

      if (this.character.state === 'eating' && !this.eaten) {
        this.x += (this.character.x - 5 - this.x) * 0.12;
        this.y += (this.character.y - 15 - this.y) * 0.12;

        if (Math.abs(this.x - (this.character.x - 5)) < 10) {
          this.visible = false;
          this.eaten = true;
        }
      }

      if (this.character.state === 'standing' && this.character.stateProgress < 0.1) {
        this.reset();
      }
    }

    reset() {
      this.x = canvas.width / 2 + 100;
      this.y = canvas.height / 2 - 30;
      this.visible = true;
      this.eaten = false;
      this.float = 0;
      this.rotation = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (!this.visible) return;

      const floatOffset = Math.sin(this.float) * 6;

      ctx.save();
      ctx.translate(this.x, this.y + floatOffset);
      ctx.rotate(this.rotation);

      const auraGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
      auraGradient.addColorStop(0, 'rgba(155, 89, 182, 0.4)');
      auraGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.2)');
      auraGradient.addColorStop(1, 'rgba(155, 89, 182, 0)');
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();

      const pillGradient = ctx.createRadialGradient(-3, -3, 0, 0, 0, 15);
      pillGradient.addColorStop(0, '#A0522D');
      pillGradient.addColorStop(0.7, '#8B4513');
      pillGradient.addColorStop(1, '#654321');
      
      ctx.fillStyle = pillGradient;
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.ellipse(-5, -5, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class MagicParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    fadeSpeed: number;
    twinkle: number;
    color: string;

    constructor() {
      const angle = Math.random() * Math.PI * 2;
      const radius = 80 + Math.random() * 60;
      
      this.x = canvas.width / 2 + Math.cos(angle) * radius;
      this.y = canvas.height / 2 + Math.sin(angle) * radius;
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = (Math.random() - 0.5) * 1;
      this.size = Math.random() * 4 + 2;
      this.life = 1;
      this.fadeSpeed = 0.008;
      this.twinkle = Math.random() * Math.PI * 2;
      
      const colors = ['#8B4513', '#9B59B6', '#FFD700'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.fadeSpeed;
      this.twinkle += 0.1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      const alpha = this.life * (Math.sin(this.twinkle) * 0.3 + 0.7);
      
      ctx.save();
      ctx.globalAlpha = alpha;

      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, this.color + '00');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  const character = new Character();
  const pill = new Pill(character);
  const particles: MagicParticle[] = [];

  const animate = () => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#2C1B47');
    gradient.addColorStop(1, '#1a0a33');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
    for (let i = 0; i < 30; i++) {
      const sx = (i * 197) % canvas.width;
      const sy = (i * 137) % canvas.height;
      const size = ((i * 73) % 3) + 1;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    if (Math.random() < 0.15) {
      particles.push(new MagicParticle());
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
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
}