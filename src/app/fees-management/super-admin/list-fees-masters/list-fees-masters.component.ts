import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FeesMastersService } from '../../fees-masters.service';
import { AddMaster } from '../add-master';

@Component({
  selector: 'app-list-fees-masters',
  templateUrl: './list-fees-masters.component.html',
  styleUrls: ['./list-fees-masters.component.scss']
})
export class ListFeesMastersComponent implements OnInit {

  feesMaster : any;
  finalItems : any;
  viewFeesMaster : boolean = false ;
  feesDTO : AddMaster = new AddMaster();

  constructor(private feesService :FeesMastersService) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      didOpen: ()=>{
        Swal.showLoading();
        this.feesService.getFeesMaster().subscribe(responseData => {
          this.feesMaster = JSON.parse(responseData).Items
          console.log(this.feesMaster)
          let temp = []
          this.feesMaster.forEach(record => {
             if (record.isDeleted === false && record.feesHash==="FEES") {
             // if (record) {

              temp.push(record)
            }
          })
          this.finalItems = temp
          console.log('this.finalItems...',this.finalItems);
          
          Swal.close()
        },
          error => {
            console.log("Could not Fetch Data")
            Swal.fire({
              text: 'Error Fetching',
              icon: 'warning'
            })
          }
        )
      }

    });
  }

  viewFeesDetails(_id : string) :void {
    console.log('key....',_id);
    
    this.feesService.getFeesMasterById(_id).subscribe((data)=>{
      data  = JSON.parse(data);
      console.log('data is here...',data);
      
      this.feesDTO.associated_with_org = data.Items[0].associated_with_org;
      this.feesDTO.feesHead = data.Items[0].feesHead;
      this.feesDTO.isConcession = data.Items[0].isConcession;
	    this.feesDTO.feesType = data.Items[0].feesType
	    this.feesDTO.feesGroup = data.Items[0].feesGroup
	    this.feesDTO.amount = data.Items[0].amount
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
      this.feesMaster=true;
      console.log(this.feesDTO);
    })
    this.viewFeesMaster =true;
    console.log('eye clicked', this.viewFeesMaster);

  }

}
