import { Component, OnInit } from '@angular/core';
import { AddMaster, Checkbox } from '../add-master';
import { FeesMastersService } from '../../fees-masters.service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fees-masters',
  templateUrl: './add-fees-masters.component.html',
  styleUrls: ['./add-fees-masters.component.scss']
})
export class AddFeesMastersComponent implements OnInit {

  feesType: any[];
  feesGroup: any[];
  feesHead: any[];
  payable: any[];
  units: any[];
  lateFineCaluatedBy: any[];
  addMasterDTO: AddMaster;
  checkSection: Checkbox;
  data = '';
  constructor(private feesService : FeesMastersService,private router : Router) { }

  ngOnInit(): void {
    // this.addMasterDTO.amoutHead =9;/
    this.addMasterDTO = new AddMaster();
    this.checkSection = new Checkbox();
    this.addMasterDTO.feesHead = [];
    this.addMasterDTO.accountsHead = [];
    this.addMasterDTO.feesType = 'Select Fee Type'
    this.feesType = ['type1', 'type2', 'type3', 'type4'];
    this.feesHead = ['head1', 'head2', 'head3', 'head4'];
    this.feesGroup = ['group1', 'group2', 'group3', 'group4'];
    this.units = ['Amount', 'Percentage'];
    this.payable = ['Monthly', 'Yearly', 'Semester Wise'];
    this.lateFineCaluatedBy = ['Days', 'Monthly', 'Year'];
  }

  onChangeFeeType = (event) => {
    console.log(this.addMasterDTO);
    console.log('this is concession checked...', this.checkSection.isConcession);
    

  }

  addFeesMaster = (event) => {
    this.addMasterDTO.associated_with_org = "qwertrewqasdfrtyg";
    this.addMasterDTO.isActivated = true;
    this.addMasterDTO.isDeleted = false;
    console.log('Master DTO....', this.addMasterDTO);
    
    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
    
    this.feesService.addFeesMaster(this.addMasterDTO)
    .subscribe({
      next: responseData => {
        console.log(responseData)
        if (responseData) {
          Swal.fire(
            'Congratulations!',
            'Fees Master has been added',
            'success'
          ).then(result => {
            this.router.navigate(['/list-fees-masters'])
            console.log('data save ',result);
          })
        }
      },
      error: error => {
        Swal.fire(
          'Error!',
          'Could not add Stream',
          'error'
        )
        console.log(error)
      }
    })
  }

  feesHeadCheckBox = (value: string) => {
    console.log('value...', value);
    this.addMasterDTO.feesHead.includes(value) ?
      this.addMasterDTO.feesHead = this.addMasterDTO.feesHead.filter(e => {
        return e != value
      })
      :
      this.addMasterDTO.feesHead.push(value)
  }


  accountsHeadCheckBox = (value: string) => {
    console.log('value...', value);
    this.addMasterDTO.accountsHead.includes(value) ?
      this.addMasterDTO.accountsHead = this.addMasterDTO.accountsHead.filter(e => {
        return e != value
      })
      :
      this.addMasterDTO.accountsHead.push(value)
  }

}
