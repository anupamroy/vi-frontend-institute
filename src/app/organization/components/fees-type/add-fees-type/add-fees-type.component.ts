import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeesService } from '../../../services/fees-type.service'
import { FeesType } from '../../../../shared/models/fees-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-fees-type',
  templateUrl: './add-fees-type.component.html',
  styleUrls: ['./add-fees-type.component.scss']
})
export class AddFeesTypeComponent implements OnInit {

  /** flag holds the form submit status */
  disableButton: boolean = true;

  /** Short Key for Masters Table NoSQL DynamoDB */
  feesType: string = '';

  constructor(private router: Router, private feesService: FeesService) { }

  /**
   * 
   * Enable disable submit button 
   *
   * @memberof AddFeesTypeComponent
   */
  enableButton() {
    if (this.feesType.trim() === '') {
      return true
    }
    else {
      return false
    }
  }


  /**
   * 
   * Test input against reg expression and return alert boolean
   *
   * @memberof AddFeesTypeComponent
   */
  enableAlert() {
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.feesType)
  }

  /**
   * 
   * Submit Handler for Add Feestype
   *
   * @memberof AddFeesTypeComponent
   */
  onSubmit() {
    const feesTypeObj = new FeesType();
    feesTypeObj.feesType = this.feesType;
    feesTypeObj.isActivated = true;
    feesTypeObj.isDeleted = false;

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        this.feesService
          .addFeesType(feesTypeObj)
          .subscribe((data) => {
            console.log('ID' + data);
            if (data) {
              Swal.fire({
                title: 'Added',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.router.navigate(['./org/list-fees-type']);
              })
            }
          });

      }
    });

  }

  ngOnInit(): void {
  }

}
