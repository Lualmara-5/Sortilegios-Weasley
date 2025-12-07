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
            <!-- Caramelo longuilinguo -->
            <div *ngIf="animation.id === 1">
              <div class="tongue-base"></div>
              <div class="tongue-extension"></div>
            </div>

            <!-- Galletas de canarios -->
            <div *ngIf="animation.id === 2">
              <div class="human-silhouette"></div>
              <div class="canary-bird"></div>
            </div>

            <!-- Orejas extensibles -->
            <div *ngIf="animation.id === 5">
              <div class="head-base">
                <div class="ear ear-left"></div>
                <div class="ear ear-right"></div>
              </div>
            </div>

            <!-- Bombones desmayo -->
            <div *ngIf="animation.id === 8">
              <div class="person-standing">
                <div class="person-head"></div>
                <div class="dizzy-stars">⭐💫✨</div>
              </div>
            </div>

            <!-- Poción de amor -->
            <div *ngIf="animation.id === 27">
              <div class="potion-bottle"></div>
              <div class="heart">💕</div>
              <div class="heart">❤️</div>
              <div class="heart">💖</div>
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
      
      // Si es animación canvas, iniciar después de que se renderice
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
    // Para CSS, forzar recarga removiendo y agregando clase
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
    
    // Para canvas, reiniciar animación
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

    // Determinar qué animación canvas ejecutar
    if (this.animation?.id === 3) {
      this.animateFireworksBasic(ctx, canvas);
    } else if (this.animation?.id === 4) {
      this.animateFireworksDeluxe(ctx, canvas);
    }
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

      // Crear nuevas partículas cada cierto tiempo
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

      // Actualizar y dibujar partículas
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // gravedad
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

      // Lanzar nuevo cohete
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

      // Actualizar cohetes
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];

        if (!fw.exploded) {
          fw.x += fw.vx;
          fw.y += fw.vy;
          fw.vy += 0.15;

          // Dibujar cohete
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Explotar si alcanza altura
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
          // Actualizar partículas
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