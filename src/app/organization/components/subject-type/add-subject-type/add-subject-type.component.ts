import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectTypeService } from '../../../services/subject-type.service'
import { SubjectType } from '../../../../shared/models/subject-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-subject-type',
  templateUrl: './add-subject-type.component.html',
  styleUrls: ['./add-subject-type.component.scss']
})
export class AddSubjectTypeComponent implements OnInit {
	/** flag holds the form submit status */
	disableButton: boolean = true;

	/** Short Key for Masters Table NoSQL DynamoDB */
	subjectType: string = '';

  	constructor(private router: Router, private subjectTypeService: SubjectTypeService) { }

	/**
	* 
	* Enable disable submit button 
	*
	* @memberof AddSubjectTypeComponent
	*/
	enableButton() {
		if (this.subjectType.trim() === '') {
			return true
		} else {
			return false
		}
	}


	/**
	* 
	* Test input against reg expression and return alert boolean
	*
	* @memberof AddSubjectTypeComponent
	*/
	enableAlert() {
		const regex = /^[a-zA-Z ]*$/
		return regex.test(this.subjectType)
	}

	/**
	* 
	* Submit Handler for Add Feestype
	*
	* @memberof AddSubjectTypeComponent
	*/
	onSubmit() {
		const subjectTypeObj = new SubjectType();
		subjectTypeObj.subjectType = this.subjectType;
		subjectTypeObj.isActivated = true;
		subjectTypeObj.isDeleted = false;
		Swal.fire({
			title: 'Please Wait',
			allowEscapeKey: false,
			allowOutsideClick: true,
			background: '#fff',
			showConfirmButton: false,
			onOpen: () => {
				Swal.showLoading();
				this.subjectTypeService.addSubjectType(subjectTypeObj).subscribe((data) => {
					console.log('ID' + data);
					if (data) {
						Swal.fire({
							title: 'Added',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500,
						}).then(() => {
							this.router.navigate(['./org/list-subject-type']);
						})
					}
				});
			}
		});
	}
	ngOnInit(): void {
	}
}