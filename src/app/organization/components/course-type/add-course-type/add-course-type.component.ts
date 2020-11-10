import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseTypeService } from '../../../services/course-type.service'
import { CourseType } from '../../../../shared/models/course-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-course-type',
  templateUrl: './add-course-type.component.html',
  styleUrls: ['./add-course-type.component.scss']
})
export class AddCourseTypeComponent implements OnInit {
/** flag holds the form submit status */
	disableButton: boolean = true;

	/** Short Key for courseType Table NoSQL DynamoDB */
	courseType: string = '';

	/** Short Key for courseType Table NoSQL DynamoDB */
	minDuration: string = '';

	/** Short Key for courseType Table NoSQL DynamoDB */
	maxDuration: string = '';

	/** Short Key for courseType Table NoSQL DynamoDB */
	durationUnit: string = '';

  	constructor(private router: Router, private courseTypeService: CourseTypeService) { }

	ngOnInit(): void {
	}

	/**
	* 
	* Enable disable submit button 
	*
	* @memberof AddSubjectTypeComponent
	*/
	enableButton() {
		if (this.courseType !== '' && this.courseType.trim() === '') {
			return true
		} else {
			return false
		}
	}
	
	/**
	* 
	* Enable disable submit button 
	*
	* @memberof AddSubjectTypeComponent
	*/
	enableButtonMax() {
		if (this.maxDuration !== '' && this.maxDuration.trim() === '') {
			return true
		} else {
			return false
		}
	}
	
	/**
	* 
	* Enable disable submit button 
	*
	* @memberof AddSubjectTypeComponent
	*/
	enableButtonMin() {
		if (this.minDuration !== '' && this.minDuration.trim() === '') {
			return true
		} else {
			return false
		}
	}
	
	/**
	* 
	* Enable disable submit button 
	*
	* @memberof AddSubjectTypeComponent
	*/
	enableButtonUnit() {
		if (this.durationUnit !== '' && this.durationUnit.trim() === '') {
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
		return regex.test(this.courseType)
	}

	/**
	* 
	* Test input against reg expression and return alert boolean
	*
	* @memberof AddSubjectTypeComponent
	*/
	enableAlertMax() {
		const regex = /^[0-9]*$/
		return regex.test(this.maxDuration)
	}

	/**
	* 
	* Test input against reg expression and return alert boolean
	*
	* @memberof AddSubjectTypeComponent
	*/
	enableAlertMin() {
		const regex = /^[0-9]*$/
		return regex.test(this.minDuration)
	}

	/**
	* 
	* Test input against reg expression and return alert boolean
	*
	* @memberof AddSubjectTypeComponent
	*/
	enableAlertUnit() {
		const regex = /^[a-zA-z]*$/
		return regex.test(this.durationUnit)
	}

	/**
	* 
	* Submit Handler for Add Course Type
	*
	* @memberof AddCourseTypeComponent
	*/
	onSubmit() {
		const courseTypeObj = new CourseType();
		courseTypeObj.courseType = this.courseType;
		courseTypeObj.minDuration = this.minDuration;
		courseTypeObj.maxDuration = this.maxDuration;
		courseTypeObj.durationUnit = this.durationUnit;
		courseTypeObj.isActivated = true;
		courseTypeObj.isDeleted = false;
		Swal.fire({
			title: 'Please Wait',
			allowEscapeKey: false,
			allowOutsideClick: true,
			background: '#fff',
			showConfirmButton: false,
			onOpen: () => {
				Swal.showLoading();
				this.courseTypeService.addCourseType(courseTypeObj).subscribe((data) => {
					console.log('ID' + data);
					if (data) {
						Swal.fire({
							title: 'Added',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500,
						}).then(() => {
							this.router.navigate(['./org/list-course-type']);
						})
					}
				});
			}
		});
	}
}