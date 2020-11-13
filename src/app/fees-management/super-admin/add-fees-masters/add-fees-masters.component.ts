import { Component, OnInit } from '@angular/core';
import { AddMaster, Checkbox } from '../add-master'

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
  constructor() { }

  ngOnInit(): void {
    // this.addMasterDTO.amoutHead =9;/
    this.addMasterDTO = new AddMaster();
    this.checkSection = new Checkbox();
    this.addMasterDTO.feesHead = [];
    this.addMasterDTO.accountsHead = [];
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
    console.log('Master DTO....', this.addMasterDTO);

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
