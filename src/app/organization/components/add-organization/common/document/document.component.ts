import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import { MyErrorStateMatcher } from '../Validations/MyErrorStateMatcher'


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  documentForm: FormGroup;
  documentList = [];
  @Output() isDocumentValid = new EventEmitter(false);
  matcher = new MyErrorStateMatcher();
  private ngUnsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private formBuilder: FormBuilder, private addOrganizationService: AddOrganizationService) { }

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      documentType: new FormControl('', Validators.required),
      documentNumber: new FormControl('', Validators.required),
      documentRegistrationDate: new FormControl(''),
      // checkMe: new FormControl('', Validators.required)
    });
  }

  addDocument(): void {
    const documentObject = this.documentForm.value;
    _.assign(documentObject, {
      id: _.uniqueId('address_')
    });
    console.log(documentObject);
    this.documentList.push(documentObject);

    this.isDocumentValid.emit(true);

    // Storing data
    this.addOrganizationService.$preview.next({
      section: "document",
      documentList: this.documentList
    })


    // Resetting the form
    let control: AbstractControl = null;
    this.documentForm.reset();
    this.documentForm.markAsUntouched();
    Object.keys(this.documentForm.controls).forEach((name) => {
      control = this.documentForm.controls[name];
      control.setErrors(null);
    });

    //localstorage
    localStorage.setItem('documentList', JSON.stringify(this.documentList))
  }

  removeDocument(id: string): void{
    _.remove(this.documentList, (a) => {
      return a.id === id;
    });

    if(this.documentList.length == 0){
      this.isDocumentValid.emit(false);
    }

    //localstorage
    localStorage.setItem('documentList', JSON.stringify(this.documentList))
  }

  editDocument(id: string): void {
    const documentToEdit = _.remove(this.documentList, (a) => {
      return a.id === id;
    });

    this.documentForm = this.formBuilder.group({
      addressTypeSelector: new FormControl(documentToEdit[0].addressTypeSelector, Validators.required),
      address: new FormControl(documentToEdit[0].address, Validators.required),
    });

    //localstorage
    localStorage.setItem('documentList', JSON.stringify(this.documentList))
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
