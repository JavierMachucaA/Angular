import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../model/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor( 
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

    ngOnInit(): void {
      this.getHero();
    }
    
    getHero(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
    }
    
    save(): void {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }

    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
    }

    delete(hero: Hero): void {
      this.heroes = this.heroes.filter(h => h !== hero);
      this.heroService.deleteHero(hero).subscribe();
    }

}
