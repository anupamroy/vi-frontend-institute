import { Component, OnInit } from '@angular/core';
import { SubjectTypeService } from '../../../services/subject-type.service'
import { SubjectType } from '../../../../shared/models/subject-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-subject-type',
  templateUrl: './list-subject-type.component.html',
  styleUrls: ['./list-subject-type.component.scss']
})
export class ListSubjectTypeComponent implements OnInit {
	/** Attroibute for Subject Type Table NoSQL DynamoDB */
	subjectType: any;

	/** Array of SubjectType to show data for SubjectType Table NoSQL DynamoDB */
	finalItems: any;

	constructor(private subjectTypeService: SubjectTypeService) { }	

	/**
	* 
	* Load Subject Type data by Id
	*
	* @memberof AddSubjectTypeComponent
	*/
	ngOnInit(): void {
		Swal.fire({
			title: 'Please Wait',
			allowEscapeKey: false,
			allowOutsideClick: true,
			background: '#fff',
			showConfirmButton: false,
			didOpen: () => {
				Swal.showLoading();
				this.subjectTypeService.getSubjectType().subscribe(responseData => {
					this.subjectType = JSON.parse(responseData).Items
					Swal.close()
					let temp = []
					this.finalItems = this.subjectType.filter(record => record.master === 'SUBJECT_TYPE' && record.isDeleted === false)	
				},
				error => {
					console.log("Could not Fetch Data")
					Swal.fire({
						text: 'Error Fetching',
						icon: 'warning'
					})
				})
			}
		});
	}

	/**
	* 
	* Process the Subject Type Object to send for updation 
	*
	* @memberof ListSubjectTypeComponent
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
	* handler for delete Operation
	*
	* @memberof ListSubjectTypeComponent
	*/
	onDelete(id: string) {
		const deleteObj = new SubjectType();
		deleteObj.masterId = id;
		deleteObj.isDeleted = true;
		Swal.fire({
			title: 'Are you sure you want to delete?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
			confirmButtonColor: "#DD6B55"
		}).then((result) => {
			if (result.value) {
				this.subjectTypeService.deleteSubjectTypeById(id, this.processObjUpdated(deleteObj)).subscribe(() => {
					this.finalItems = this.finalItems.filter((item) => {
						return item.masterId !== id;
					})
				});
				Swal.fire(
					'Deleted!',
					'Your subject type has been deleted.',
					'success'
				)
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire(
					'Cancelled',
					'Your subject type is safe :)',
					'error'
				)
			}
		})
	}

	/**
	* 
	* handler for deactivate Operation
	*
	* @memberof ListSubjectTypeComponent
	*/
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
				var deactivateObj = new SubjectType();
				deactivateObj.masterId = id;
				deactivateObj.isActivated = false;
				console.log('NEW: ', deactivateObj);
				this.subjectTypeService.updateSubjectTypeById(id, this.processObjUpdated(deactivateObj)).subscribe((data) => {
					console.log(data);
					this.finalItems = this.finalItems.map((item) => {
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

	/**
	* 
	* handler for Activate Operation
	*
	* @memberof ListSubjectTypeComponent
	*/
	onActivate(id: string) {
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
				var activateObj = new SubjectType();
				activateObj.masterId = id;
				activateObj.isActivated = true;
				this.subjectTypeService.updateSubjectTypeById(id, this.processObjUpdated(activateObj)).subscribe((data) => {
					console.log(data);
					this.finalItems = this.finalItems.map((item) => {
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
}