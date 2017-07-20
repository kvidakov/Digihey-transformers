import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { NgIf } from '@angular/common';

import { ListOfTransformersComponent } from '../list-of-transformers/list-of-transformers.component';
import { TransformersService } from '../list-of-transformers/transformers.service';
import { VehicleTypes } from '../transformer-class/vehicle-types';
import { Transformer } from '../transformer-class/transformer';
import { Factions } from '../transformer-class/factions';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css'],
    providers: [ TransformersService ]
})
export class DetailsComponent implements OnInit {
    transformer: Transformer;
    factions: Factions[];
    vehicleTypes: VehicleTypes[];
    name: string;
    selectedFaction: number;
    faction: string;
    vehicleGroup: string;
    vehicleType: string;
    vehicleModel: string;
    newStatus: string;
    counterForAdding = 1;
    counterForRemoving: number;
    gear = [];
    constructor(private transformersService: TransformersService, private route: ActivatedRoute,) { }

    ngOnInit() {
        this.getTransformer();
        setTimeout(() =>this.setStartingValues(),500);
        this.getFactions();
    }

    getTransformer(): void {
        this.route.paramMap.switchMap((params: ParamMap) => this.transformersService.getTransformer(+params.get('id'))).subscribe(transformer => this.transformer = transformer);
    }

    setStartingValues() {
        if (this.transformer.factionsId === 0) {
            this.faction = 'Autobots';
        }
        else {
            this.faction = 'Decepticons';
        }
        this.name = this.transformer.name;
        this.vehicleGroup = this.transformer.vehicleGroup;
        this.vehicleType = this.transformer.vehicleType;
        this.vehicleModel = this.transformer.vehicleModel;
        this.newStatus = this.transformer.status;
        this.gear = this.transformer.gear;
    }

    getFactions() {
        return this.transformersService.getFactions().subscribe((factions => this.factions = factions));
    }

    getVehicleGroups() {
        return this.transformersService.getVehicleGroups(this.vehicleGroup).subscribe(vehicleTypes => this.vehicleTypes = vehicleTypes);
    }

    addInputField() {
        var gearDiv = document.getElementById('gearDiv');
        var firstInputField = (<HTMLInputElement>document.getElementById((this.counterForAdding).toString())).value;
        if(firstInputField != ''){
            this.counterForAdding++;
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
        var firstValue = (<HTMLInputElement>document.getElementById((1).toString())).value;
        if (firstValue == ''){
            for (var i = 0; i <= this.counterForAdding; i++){
                this.gear.pop();
            }
            this.gear.push('');
        }else {
            if (this.transformer.gear[0] == ''){
                this.gear.pop();
                for (var i = 1; i <= this.counterForAdding; i++){
                    this.gear.push((<HTMLInputElement>document.getElementById((i).toString())).value);
                }
            }
            else {
                this.gear.pop();
                for (var i = 1; i <= this.counterForAdding; i++){
                    this.gear.push((<HTMLInputElement>document.getElementById((i).toString())).value);
                }
            }
        }
    }

    updateTransformer(id: number) {
        const newChangedProperties = {
            id: id,
            name: this.name,
            vehicleGroup: this.vehicleGroup,
            vehicleType: this.vehicleType,
            vehicleModel: this.vehicleModel,
            gear: this.gear,
            status: this.newStatus,
            factionsId: 0
        };
        this.setGear();
        if(this.faction != 'defaultOption' && this.vehicleGroup != 'defaultOption' && this.vehicleType != 'defaultOption' && this.vehicleModel != 'defaultOption') {
            if (this.faction === 'Autobots') {
                newChangedProperties.factionsId = 0;
            }
            else {
                newChangedProperties.factionsId = 1;
            }
            if (this.vehicleGroup == this.transformer.vehicleGroup) {
                if (this.vehicleType == this.transformer.vehicleType){
                    this.transformersService.update(id, newChangedProperties).subscribe((res) => {
                            console.log(res);
                            this.getTransformer();
                        },
                        (err) => {
                            console.log(err);
                        });
                }
                else {
                    if (this.vehicleModel == this.transformer.vehicleModel) {
                        alert('You changed the vehicle group, so you also need to change a vehicle type and a model!');
                    }
                    else {
                        this.transformersService.update(id, newChangedProperties).subscribe((res) => {
                                console.log(res);
                                this.getTransformer();
                            },
                            (err) => {
                                console.log(err);
                            });
                    }
                }
            }
            else{
                if (this.vehicleType == this.transformer.vehicleType){
                    alert('You changed the vehicle group, so you also need to change a vehicle type and a model!');
                }
                else {
                    if (this.vehicleModel == this.transformer.vehicleModel) {
                        alert('You changed the vehicle group, so you also need to change a vehicle type and a model!');
                    }
                    else {
                        this.transformersService.update(id, newChangedProperties).subscribe((res) => {
                                console.log(res);
                                this.getTransformer();
                            },
                            (err) => {
                                console.log(err);
                            });
                    }
                }
            }
        }
        else{
            alert('You can\'t have default option selected!');
        }
    }

}
