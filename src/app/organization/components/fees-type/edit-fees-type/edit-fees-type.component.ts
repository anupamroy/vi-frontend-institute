import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesService } from '../../../services/fees-type.service';
import { FeesType } from '../../../../shared/models/fees-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-fees-type',
  templateUrl: './edit-fees-type.component.html',
  styleUrls: ['./edit-fees-type.component.scss']
})
export class EditFeesTypeComponent implements OnInit {

  /** Attribute for FeesType Table NoSQL DynamoDB */
  feesType: string;

  /** Short Key for FeesType Table NoSQL DynamoDB */
  id: string;

  /** feesData hold Feestype object */
  feesData: any


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private feesService: FeesService) { }

  /**
   * 
   * Enable disable submit button 
   *
   * @memberof AddFeesTypeComponent
   */
  enableButton() {
    if (this.feesType && this.feesType.trim() === "") {
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
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.feesType)
  }


  /**
* 
* Process the Fees Type Object to send for updation 
*
* @memberof AddFeesTypeComponent
*/
  processObjUpdated(object: FeesType) {
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'master' && key !== 'masterId') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      master: object.master,
      masterId: object.masterId
    }
  }

  /**
   * 
   * handler for edit Operation
   *
   * @memberof AddFeesTypeComponent
   */
  onClick() {

    const editObj = new FeesType();

    editObj.masterId = this.id;
    editObj.feesType = this.feesType;

    console.log(this.feesType)
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        this.feesService
          .updateFeesTypeById(this.id, this.processObjUpdated(editObj))
          .subscribe((data) => {
            console.log('ID' + data);
            if (data) {
              Swal.fire({
                title: 'Edited',
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
  /**
    * 
    * Route to Add fees type component
    *
    * @memberof AddFeesTypeComponent
    */
  onAdd() {
    this.router.navigate(['./org/add-fees-type'])
  }

  /**
    * 
    * Route to View Fees Type Component
    *
    * @memberof AddFeesTypeComponent
    */
  onView() {
    this.router.navigate(['./org/list-fees-type'])
  }
  /**
    * 
    * Route to Org Component
    *
    * @memberof AddFeesTypeComponent
    */
  onDashboard() {
    this.router.navigate(['./org'])
  }

  /**
   * 
   * Load FeesType by Id
   *
   * @memberof AddFeesTypeComponent
   */
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.masterId;
    console.log('id....', this.id);

    this.feesService.getFeesTypeById(this.id).subscribe((item) => {
      item = JSON.parse(item);
      this.feesType = item.Items[0].feesType
      console.log(item)
      console.log('this fees type', this.feesType);

    })
  }



}
