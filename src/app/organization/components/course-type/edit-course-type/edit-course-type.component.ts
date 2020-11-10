import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTypeService } from '../../../services/course-type.service'
import { CourseType } from '../../../../shared/models/course-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-course-type',
  templateUrl: './edit-course-type.component.html',
  styleUrls: ['./edit-course-type.component.scss']
})
export class EditCourseTypeComponent implements OnInit {
	/** Attribute for CourseType Table NoSQL DynamoDB */
	courseType: string;

	/** Attribute for CourseType Table NoSQL DynamoDB */
	minDuration: string;
	
	/** Attribute for CourseType Table NoSQL DynamoDB */
	maxDuration: string;
	
	/** Attribute for CourseType Table NoSQL DynamoDB */
	durationUnit: string;

	/** Short Key for CourseType Table NoSQL DynamoDB */
	id: string;

	/** CourseTypeData hold CourseTypeData object */
	courseTypeData: any


	constructor(private activatedRoute: ActivatedRoute, private router: Router, private courseTypeService: CourseTypeService) { }

	/**
	* 
	* Load CourseType by Id
	*
	* @memberof EditCourseTypeComponent
	*/
	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params.masterId;
		console.log('id....', this.id);
		this.courseTypeService.getCourseTypeById(this.id).subscribe((item) => {
			item = JSON.parse(item);
			this.courseType = item.Items[0].courseType;
			this.minDuration = item.Items[0].minDuration;
			this.maxDuration = item.Items[0].maxDuration;
			this.durationUnit = item.Items[0].durationUnit;
			console.log(item)
			console.log('this course type', this.courseType);
		})
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
	* Process the Course Type Object to send for updation 
	*
	* @memberof EditCourseTypeComponent
	*/
	processObjUpdated(object: CourseType) {
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
	* @memberof EditCourseTypeComponent
	*/
	onClick() {
		const editObj = new CourseType();
		editObj.masterId = this.id;
		editObj.courseType = this.courseType;
		editObj.minDuration = this.minDuration;
		editObj.maxDuration = this.maxDuration;
		editObj.durationUnit = this.durationUnit;
		console.log(this.courseType)
		Swal.fire({
			title: 'Please Wait',
			allowEscapeKey: false,
			allowOutsideClick: true,
			background: '#fff',
			showConfirmButton: false,
			onOpen: () => {
				Swal.showLoading();
				this.courseTypeService.updateCourseTypeById(this.id, this.processObjUpdated(editObj)).subscribe((data) => {
					console.log('ID' + data);
					if (data) {
						Swal.fire({
							title: 'Edited',
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
	/**
	* 
	* Route to Add Course Type component
	*
	* @memberof EditCourseTypeComponent
	*/
	onAdd() {
		this.router.navigate(['./org/add-course-type'])
	}

	/**
	* 
	* Route to View Course Type Component
	*
	* @memberof EditCourseTypeComponent
	*/
	onView() {
		this.router.navigate(['./org/list-course-type'])
	}
	/**
	* 
	* Route to Org Component
	*
	* @memberof EditCourseTypeComponent
	*/
	onDashboard() {
		this.router.navigate(['./org'])
	}
}