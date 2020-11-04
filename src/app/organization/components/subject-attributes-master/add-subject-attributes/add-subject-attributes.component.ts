import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubjectAttribute } from '../../../../shared/models/subjectAttribute'
import { SubjectAttributeService } from '../services/subject-attribute.service'
@Component({
  selector: 'app-add-subject-attributes',
  templateUrl: './add-subject-attributes.component.html',
  styleUrls: ['./add-subject-attributes.component.scss']
})
export class AddSubjectAttributesComponent implements OnInit {

  subjectAttribute: string = '';
  constructor(private router: Router, private subjectAttributeService: SubjectAttributeService) { }

  ngOnInit(): void {
  }


  enableButton = () => {
    console.log('enable button');
    return false;
  }

  enableAlert = () => {
    console.log('enable Alert');
    return true;
  }

  onSubmit = () => {
    console.log('form submitted......'); const obj = new SubjectAttribute();
    obj.subject_attribute = this.subjectAttribute;
    obj.isDeleted = false;
    obj.isActivated = true;
    console.log('obj......', obj);

    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })

    this.subjectAttributeService.saveSubjectAttribute(obj)
      .subscribe({
        next: responseData => {
          console.log(responseData)
          if (responseData) {
            Swal.fire(
              'Congratulations!',
              'Subject Attribute  has been added',
              'success'
            ).then(result => {
              this.router.navigate(['/org/list-subject-attributes'])

            })
          }

        },
        error: error => {
          Swal.fire(
            'Error!',
            'Could not add Subject Attribute',
            'error'
          )
          console.log(error)
        }
      })
  }
}
