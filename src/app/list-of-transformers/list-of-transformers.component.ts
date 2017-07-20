import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  faction: string;
  name: string;
  // status: string;
  private maxId = 0;
  constructor(private transformersService: TransformersService, private router: Router) { }

  getTransformers(): void {
    this.transformersService.getTransformers().subscribe(transformers => this.transformers = transformers);
    // document.getElementsByName(status).
  }

  getFactions() {
    this.transformersService.getFactions().subscribe(factions => this.factions = factions);
  }

  ngOnInit(): void {
    this.getTransformers();
    this.getFactions();
  }

  updateStatus(id: number, status: string) {
    const statusChanged = {
      id: id,
      name: this.transformers[id].name,
      vehicleGroup: this.transformers[id].vehicleGroup,
      vehicleType: this.transformers[id].vehicleType,
      vehicleModel: this.transformers[id].vehicleModel,
      gear: this.transformers[id].gear,
      status: status,
      factionsId: this.transformers[id].factionsId
    };

    return this.transformersService.update(id, statusChanged).subscribe((res) => {
      // console.debug('Success!');
      console.log(res);
    }, (err) => {
      console.error(err);
    });
  }

  goToTransformerDetails(id) {
      this.router.navigate(['/details', id]);
  }
}
