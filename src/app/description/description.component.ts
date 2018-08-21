import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../game';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location
    ) { }

  title = "Description"

  ngOnInit() {
  }

  back(): void {
    this.location.back();
  }

}
