import { Component, OnInit } from '@angular/core';

import { TransformersService } from './transformers.service';
import { Transformer } from '../transformer-class/transformer';
import { Autobots } from '../transformer-class/autobots';
import {Factions} from '../transformer-class/factions';

@Component({
  selector: 'app-list-of-transformers',
  templateUrl: './list-of-transformers.component.html',
  styleUrls: ['./list-of-transformers.component.css'],
  providers: [TransformersService]
})
export class ListOfTransformersComponent implements OnInit {
  transformers: Transformer[];
  factions: Factions[];
  private maxId = 0;
  constructor(private transformersService: TransformersService) { }

  getTransformers(): void {
    this.transformersService.getTransformers().subscribe(transformers => this.transformers = transformers);
  }

  getFactions() {
    this.transformersService.getFactions().subscribe(factions => this.factions = factions);
  }

  ngOnInit(): void {
    this.getTransformers();
    this.getFactions();
  }

  getMaxId(): number {
    if ((this.transformers.length - 1) > this.maxId){
      this.maxId = this.transformers.length - 1;
    }
    console.log(this.maxId);
    return this.maxId;
  }

}
