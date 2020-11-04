import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubjectAttributeService } from '../services/subject-attribute.service'
import { SubjectAttribute } from "../../../../shared/models/subjectAttribute";

@Component({
  selector: 'app-edit-subject-attributes',
  templateUrl: './edit-subject-attributes.component.html',
  styleUrls: ['./edit-subject-attributes.component.scss']
})
export class EditSubjectAttributesComponent implements OnInit {

  id: string;
  subjectAttribute : string ='';
  constructor(private activatedRoute: ActivatedRoute, private subjectAttributeService : SubjectAttributeService , private router :Router) { }


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.masterId;
    this.subjectAttributeService.getSubjectAttributeById(this.id).subscribe((item) => {
      item = JSON.parse(item);
      this.subjectAttribute = item.Items[0].subject_attribute
      console.log(item)
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
  onClick = () => {
    console.log('on click');
    console.log('this.subjectattribute',this.subjectAttribute);
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();

        var obj = new SubjectAttribute();
        obj.subject_attribute = this.subjectAttribute;
        obj.masterId = this.id;
        this.subjectAttributeService
          .updateSubjectAttribute(this.id, this.processObjUpdated(obj))
          .subscribe((data) => {
            console.log('ID' + data);
            if (data) {
              Swal.fire({
                title: 'Edited',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.router.navigate(['./org/list-subject-attributes']);
              })
            }
          });

      }
    });

  }

  enableButton() {
    if (this.subjectAttribute !== '' && this.subjectAttribute.trim() === '') {
      return true
    }
    else {
      return false;
    }
  }

  enableAlert() { // need to add in commom framework validationss
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.subjectAttribute)
  }

}
