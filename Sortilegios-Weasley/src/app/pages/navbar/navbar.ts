import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CauldronService } from '../../services/cualdron.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  itemCount = 0;

  constructor(private cauldronService: CauldronService) {}

  ngOnInit(): void {
    this.cauldronService.items$.subscribe(items => {
      this.itemCount = items.length;
    });
  }
}
