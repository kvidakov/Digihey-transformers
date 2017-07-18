import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { TransformersService } from '../list-of-transformers/transformers.service';
import { VehicleTypes } from '../transformer-class/vehicle-types';
import { Factions } from '../transformer-class/factions';
import { UniquePipe } from '../pipes/unique.pipe';

@Component({
  selector: 'app-add-transformers',
  templateUrl: './add-transformers.component.html',
  styleUrls: ['./add-transformers.component.css'],
  providers: [ TransformersService ],

})
export class AddTransformersComponent implements OnInit {
  factions: Factions[];
  selectedFaction: string;
  vehicleGroup: string;
  vehicleType: string;
  vehicleModel: string[];
  gear: string[];
  name: string;
  vehicleTypes: VehicleTypes[];
  constructor(http: Http, private transformersService: TransformersService) { }

  getVehicleGroups() {
    console.log(this.vehicleGroup);
    return this.transformersService.getVehicleGroups(this.vehicleGroup)
      .subscribe(vehicleTypes => this.vehicleTypes = vehicleTypes);
  }

  filterData() {
    const data = this.getVehicleGroups();
  }

  getVehicleTypes() {
    return this.transformersService.getVehicleTypes().subscribe((vehicleTypes => this.vehicleTypes = vehicleTypes));
  }

  getFactions() {
    return this.transformersService.getFactions().subscribe((factions => this.factions = factions));
  }
  setSelectionOptions() {
    // document.getElementById('faction').appendChild();
  }

  ngOnInit() {
    // this.getVehicleTypes();
    this.getFactions();
    // this.ispisi();
  }

}
