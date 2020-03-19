import { Component, OnInit } from '@angular/core';

import { faArrowLeft, faWineGlassAlt, faHamburger, faFish, faPizzaSlice, faIceCream, faSeedling, faMugHot, faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-menu-categories',
  templateUrl: './menu-categories.component.html',
  styleUrls: ['./menu-categories.component.css']
})
export class MenuCategoriesComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faWineGlassAlt = faWineGlassAlt;
  faHamburger = faHamburger;
  faFish = faFish;
  faPizzaSlice = faPizzaSlice;
  faIceCream = faIceCream;
  faSeedling = faSeedling;
  faMugHot = faMugHot;
  faStar= faStar;
  
  category: string = "Hamburger";
  categoryChanged = new Subject<string>();


  constructor() { }

  ngOnInit() {
    
  }

}
