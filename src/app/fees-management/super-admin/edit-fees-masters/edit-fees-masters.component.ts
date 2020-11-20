import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FeesMastersService } from '../../fees-masters.service';
import { FeesService } from '../../services/fees.service';
import { AddMaster } from '../add-master';
@Component({
  selector: 'app-edit-fees-masters',
  templateUrl: './edit-fees-masters.component.html',
  styleUrls: ['./edit-fees-masters.component.scss']
})
export class EditFeesMastersComponent implements OnInit {

  feesDTO : AddMaster;
  feesType: any[];
  feesGroup: any[];
  feesHead: any[];
  payable: any[];
  units: any[];
  lateFineCaluatedBy: any[];
  _id :string;
  constructor(private activatedRoute : ActivatedRoute,private router : Router, private feesService : FeesMastersService) { }

  ngOnInit(): void {
    this.feesDTO = new AddMaster()
    this.feesType = ['type1', 'type2', 'type3', 'type4'];
    this.feesHead = ['head1', 'head2', 'head3', 'head4'];
    this.feesGroup = ['group1', 'group2', 'group3', 'group4'];
    this.units = ['Amount', 'Percentage'];
    this.payable = ['Monthly', 'Yearly', 'Semester Wise'];
    this.lateFineCaluatedBy = ['Days', 'Monthly', 'Year'];
    this._id = this.activatedRoute.snapshot.params.feesKey;
    console.log('key....',this._id);
    this.feesService.getFeesMasterById(this._id).subscribe(data=>{
      data = JSON.parse(data);
      this.feesDTO.feesKey =  data.Items[0].feesKey;
      this.feesDTO.feesHash = data.Items[0].feesHash;
      this.feesDTO.associated_with_org = data.Items[0].associated_with_org;
      this.feesDTO.feesHead = data.Items[0].feesHead;
      this.feesDTO.isConcession = data.Items[0].isConcession;
	    this.feesDTO.feesType = data.Items[0].feesType
	    this.feesDTO.feesGroup = data.Items[0].feesGroup
      this.feesDTO.amount = data.Items[0].amount
      this.feesDTO.payableBy = data.Items[0].payableBy
	    this.feesDTO.accountsHead = data.Items[0].accountsHead
	    this.feesDTO.accademicYear = data.Items[0].accademicYear
	    this.feesDTO.payable = data.Items[0].payable
	    this.feesDTO.maxConcession = data.Items[0].maxConcession
	    this.feesDTO.maxConcessionUnit = data.Items[0].maxConcessionUnit
	    this.feesDTO.lateFine = data.Items[0].lateFine
	    this.feesDTO.lateFineCalculatedBy = data.Items[0].lateFineCalculatedBy
	    this.feesDTO.lateFineAmount = data.Items[0].lateFineAmount
	    this.feesDTO.lateFineUnit = data.Items[0].lateFineUnit
	    this.feesDTO.maxLateFine = data.Items[0].maxLateFine
	    this.feesDTO.maxLateFineConcessionUnit = data.Items[0].maxLateFineConcessionUnit
	    this.feesDTO.lateFineRevocable = data.Items[0].lateFineRevocable
	    this.feesDTO.maxLateFineRevocable = data.Items[0].maxLateFineRevocable
	    this.feesDTO.maxLateFineRevocableUnit = data.Items[0].maxLateFineRevocableUnit      
      console.log('this.feesDto..',this.feesDTO);
      
    })
    
    
  }

  editFeesMaster(event){
    console.log(event);
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        this.feesService.updateFeesMaster(this._id,this.processObjUpdated(this.feesDTO))
          .subscribe((data) => {
            console.log('ID' + data);
            if (data) {
              Swal.fire({
                title: 'Edited',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.router.navigate(['../../list-fees-masters']);
              })
            }
          });
        // Swal.close()

      }
    });

    
    
  }
  onChangeFeeType($event){

  }

  processObjUpdated(object: AddMaster) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'feesHash' && key != 'feesKey') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      feesKey: object.feesKey,
      feesHash: object.feesHash
    }
  }
}
