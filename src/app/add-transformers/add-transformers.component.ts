import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';
import { Http } from '@angular/http';

import { TransformersService } from '../list-of-transformers/transformers.service';
import { VehicleTypes } from '../transformer-class/vehicle-types';
import { Transformer } from '../transformer-class/transformer';
import { Factions } from '../transformer-class/factions';
import { UniquePipe } from '../pipes/unique.pipe';

@Component({
    selector: 'app-add-transformers',
    templateUrl: './add-transformers.component.html',
    styleUrls: ['./add-transformers.component.css'],
    providers: [ TransformersService ]
})
export class AddTransformersComponent implements OnInit {
    transformers: Transformer[];
    factions: Factions[];
    selectedFaction: string;
    vehicleGroup: string;
    vehicleType: string;
    vehicleModel: string;
    counterForAdding = 1;
    counterForRemoving: number;
    gear = [];
    name: string;
    private maxId = 0;
    vehicleTypes: VehicleTypes[];
    constructor(private transformersService: TransformersService) { }

    getVehicleGroups() {
        console.log(this.vehicleGroup);
        return this.transformersService.getVehicleGroups(this.vehicleGroup)
        .subscribe(vehicleTypes => this.vehicleTypes = vehicleTypes);
    }

    getVehicleTypes() {
        return this.transformersService.getVehicleTypes().subscribe((vehicleTypes => this.vehicleTypes = vehicleTypes));
    }

    setDefaultOptionsSelected() {
        const defOpt = 'defaultOption';
        if (!(this.vehicleGroup)) {
            this.selectedFaction = defOpt;
            this.vehicleGroup = defOpt;
            this.vehicleType = defOpt;
            this.vehicleModel = defOpt;
        }
    }

    addInputField() {
        var gearDiv = document.getElementById('gearDiv');
        var firstInputField = (<HTMLInputElement>document.getElementById((this.counterForAdding).toString())).value;
        console.log('firstInputField --- ' + firstInputField);
        if(firstInputField != ''){
            this.counterForAdding++;
            console.log(this.counterForAdding);
            var newInputElement = document.createElement('input');
            newInputElement.type = 'text';
            newInputElement.name = 'addGear';
            newInputElement.className = 'gearInput';
            newInputElement.setAttribute('ng-model', 'gear');
            newInputElement.setAttribute('change', 'setGear()');
            newInputElement.id = this.counterForAdding.toString();
            gearDiv.appendChild(newInputElement);
            var newBr = document.createElement('br');
            gearDiv.appendChild(newBr);
            this.counterForRemoving = this.counterForAdding;
        }
        else {
            alert('First fill out existing gear field!');
        }
    }

    removeInputField() {
        var gearDiv = document.getElementById('gearDiv');
        if(this.counterForRemoving > 1){
            var elementForRemoving = document.getElementById(this.counterForRemoving.toString());
            elementForRemoving.parentNode.removeChild(elementForRemoving);
            this.counterForRemoving--;
            this.counterForAdding = this.counterForRemoving;
        }
        else {
            alert("You can't remove all gear fields!");
        }
    }

    setGear() {
        var gearDiv = document.getElementById('gearDiv');
        console.log('this.counterForAdding je --- ' + this.counterForAdding);
        for (var i = 1; i <= this.counterForAdding; i++){
            // this.gear[i-1] = (<HTMLInputElement>document.getElementById((i).toString())).value;
            this.gear.push((<HTMLInputElement>document.getElementById((i).toString())).value);
        }
    }

    getTransformers(): void {
        this.transformersService.getTransformers().subscribe(transformers => this.transformers = transformers);
        // document.getElementsByName(status).
    }


    getMaxId(): number {
        if ((this.transformers.length - 1) > this.maxId) {
            this.maxId = this.transformers.length - 1;
        }
        console.log(this.maxId);
        return this.maxId;
    }

    addTransformer() {
        let id = this.getMaxId() + 1;
        let status = 'OK';
        let factionsId: number;
        this.setGear();
        if(this.selectedFaction == 'Autobots'){
            factionsId = 0;
        }
        else {
            factionsId = 1;
        }
        if (this.name != null && this.vehicleGroup != 'defaultOption' && this.vehicleType != 'defaultOption' && this.vehicleModel != 'defaultOption' && this.selectedFaction != 'defaultOption') {
            return this.transformersService.addTransformer(id, this.name, this.vehicleGroup, this.vehicleType, this.vehicleModel, this.gear, status, factionsId).subscribe((res) => {
                console.log('res je -- ' + res);
            }, (err) => {
                console.log('error je -- ' + err);
            });
        }
        else {
            alert('You didn\'t fill out the form');
        }
    }

    getFactions() {
        return this.transformersService.getFactions().subscribe((factions => this.factions = factions));
    }

    ispisi() {
        console.log('this.vehicleType --- ' + this.vehicleType);
    }
    ngOnInit() {
        // this.getVehicleTypes();
        this.getTransformers();
        this.getFactions();
        // this.ispisi();
        this.setDefaultOptionsSelected();
    }
}
