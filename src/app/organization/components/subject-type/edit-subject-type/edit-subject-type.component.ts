import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectTypeService } from '../../../services/subject-type.service'
import { SubjectType } from '../../../../shared/models/subject-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-subject-type',
  templateUrl: './edit-subject-type.component.html',
  styleUrls: ['./edit-subject-type.component.scss']
})
export class EditSubjectTypeComponent implements OnInit {
	/** Attribute for subjectType Table NoSQL DynamoDB */
	subjectType: string;

	/** Short Key for subjectType Table NoSQL DynamoDB */
	id: string;

	/** subjectTypeData hold SubjectTypeData object */
	subjectTypeData: any


	constructor(private activatedRoute: ActivatedRoute, private router: Router, private subjectTypeService: SubjectTypeService) { }

	/**
	* 
	* Load SubjectType by Id
	*
	* @memberof EditSubjectTypeComponent
	*/
	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params.masterId;
		console.log('id....', this.id);
		this.subjectTypeService.getSubjectTypeById(this.id).subscribe((item) => {
			item = JSON.parse(item);
			this.subjectType = item.Items[0].subjectType
			console.log(item)
			console.log('this fees type', this.subjectType);
		})
	}

	/**
	* 
	* Enable disable submit button 
	*
	* @memberof EditSubjectTypeComponent
	*/
	enableButton() {
		if (this.subjectType && this.subjectType.trim() === "") {
			return true
		} else {
			return false
		}
	}

	/**
	* 
	* Test input against reg expression and return alert boolean
	*
	* @memberof EditSubjectTypeComponent
	*/
	enableAlert() {
	const regex = /^[a-zA-Z_ ]*$/
		return regex.test(this.subjectType)
	}


	/**
	* 
	* Process the Subject Type Object to send for updation 
	*
	* @memberof EditSubjectTypeComponent
	*/
	processObjUpdated(object: SubjectType) {
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
	* @memberof EditSubjectTypeComponent
	*/
	onClick() {
		const editObj = new SubjectType();
		editObj.masterId = this.id;
		editObj.subjectType = this.subjectType;
		console.log(this.subjectType)
		Swal.fire({
			title: 'Please Wait',
			allowEscapeKey: false,
			allowOutsideClick: true,
			background: '#fff',
			showConfirmButton: false,
			onOpen: () => {
				Swal.showLoading();
				this.subjectTypeService.updateSubjectTypeById(this.id, this.processObjUpdated(editObj)).subscribe((data) => {
					console.log('ID' + data);
					if (data) {
						Swal.fire({
							title: 'Edited',
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
	/**
	* 
	* Route to Add Subject Type component
	*
	* @memberof EditSubjectTypeComponent
	*/
	onAdd() {
		this.router.navigate(['./org/add-subject-type'])
	}

	/**
	* 
	* Route to View Subject Type Component
	*
	* @memberof EditSubjectTypeComponent
	*/
	onView() {
		this.router.navigate(['./org/list-subject-type'])
	}
	/**
	* 
	* Route to Org Component
	*
	* @memberof EditSubjectTypeComponent
	*/
	onDashboard() {
		this.router.navigate(['./org'])
	}
}