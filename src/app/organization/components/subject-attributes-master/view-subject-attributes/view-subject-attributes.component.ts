import { Component, OnInit } from '@angular/core';
import { SubjectAttribute } from '../../../../shared/models/subjectAttribute';
import Swal from 'sweetalert2';
import { SubjectAttributeService } from '../services/subject-attribute.service'
@Component({
  selector: 'app-view-subject-attributes',
  templateUrl: './view-subject-attributes.component.html',
  styleUrls: ['./view-subject-attributes.component.scss']
})
export class ViewSubjectAttributesComponent implements OnInit {

  item: any;
  subjectAttributeItems: any;
  constructor(private subjectAttributeService: SubjectAttributeService) { }

  ngOnInit(): void {
    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    })
    this.subjectAttributeService.getAllSubjectAttribute().subscribe(responseData => {
      this.subjectAttributeItems = JSON.parse(responseData).Items
      console.log(this.subjectAttributeItems)
      Swal.close()
      let temp = []
      this.subjectAttributeItems = this.subjectAttributeItems.filter(record =>
        record.master === 'SUBJECT_ATTRIBUTE' && record.isDeleted === false)
      console.log(this.subjectAttributeItems)
    },
      error => {
        console.log("Could not Fetch Data")
      })
  }


  processObjUpdated(object: SubjectAttribute) {
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

  onDelete = (id: string) => {
    console.log('deleted data');
    Swal.fire({
      title: 'Are you sure you want to delete Subject Attribute?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.value) {

        Swal.fire({
          title: "Please Wait",
          willOpen: () => {
            Swal.showLoading()
          },
        })
        var newObj = new SubjectAttribute();
        newObj.masterId = id;
        newObj.isDeleted = true;
        console.log("After Deleting  -- " + newObj)

        this.subjectAttributeService.deleteSubjectAttribute(id, this.processObjUpdated(newObj)).subscribe(() => {
          this.subjectAttributeItems = this.subjectAttributeItems.filter((item: any) => {
            return item.masterId !== id;
          })
          Swal.fire(
            'Deleted!',
            'Your Data has been deleted.',
            'success'
          )
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Data is safe :)',
          'error'
        )
      }
    })
  }
  onActivate = (id: string) => {
    Swal.fire({
      title: 'Are you sure you want to activate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.isConfirmed) {
        // Activate Logic
        console.log('Activate');
        var newActivateObj = new SubjectAttribute();
        newActivateObj.masterId = id;
        newActivateObj.isActivated = true;

        this.subjectAttributeService.activateSubjectAttribute(id, this.processObjUpdated(newActivateObj)).subscribe((data) => {
          console.log(data);

          this.subjectAttributeItems = this.subjectAttributeItems.map((item) => {
            if (item.masterId === id) {
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Data has been activated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Data is not activated', 'error');
      }
    })
  }

  onDeactivate(id: string) {
    Swal.fire({
      title: 'Are you sure you want to deactivate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.isConfirmed) {
        // Deactivate Logic
        console.log('Deactivate')

        var newObj = new SubjectAttribute();
        newObj.masterId = id;
        newObj.isActivated = false;
        console.log('NEW: ', newObj);
        this.subjectAttributeService.activateSubjectAttribute(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.subjectAttributeItems = this.subjectAttributeItems.map((item) => {
            if (item.masterId === id) {
              item.isActivated = false
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Data has been deactivated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Data is not deactivated', 'error');
      }
    })
  }
}
