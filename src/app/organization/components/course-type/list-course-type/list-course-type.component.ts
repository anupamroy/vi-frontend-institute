import { Component, OnInit } from '@angular/core';
import { CourseTypeService } from '../../../services/course-type.service'
import { CourseType } from '../../../../shared/models/course-type';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-list-course-type',
	templateUrl: './list-course-type.component.html',
	styleUrls: ['./list-course-type.component.scss']
})
export class ListCourseTypeComponent implements OnInit {
	/** Attroibute for Course Type Table NoSQL DynamoDB */
	courseType: any;

	/** Array of CourseType to show data for CourseType Table NoSQL DynamoDB */
	finalItems: any;

	constructor(private courseTypeService: CourseTypeService) { }	

	/**
	* 
	* Load Course Type data by Id
	*
	* @memberof ListCourseTypeComponent
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
				this.courseTypeService.getCourseType().subscribe(responseData => {
					this.courseType = JSON.parse(responseData).Items
					Swal.close()
					let temp = []
					this.finalItems = this.courseType.filter(record => record.master === 'COURSE_TYPE' && record.isDeleted === false)	
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
	* Process the Course Type Object to send for updation 
	*
	* @memberof ListCourseTypeComponent
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
	* handler for delete Operation
	*
	* @memberof ListCourseTypeComponent
	*/
	onDelete(id: string) {
		const deleteObj = new CourseType();
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
				this.courseTypeService.deleteCourseTypeById(id, this.processObjUpdated(deleteObj)).subscribe(() => {
					this.finalItems = this.finalItems.filter((item) => {
						return item.masterId !== id;
					})
				});
				Swal.fire(
					'Deleted!',
					'Your course type has been deleted.',
					'success'
				)
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire(
					'Cancelled',
					'Your course type is safe :)',
					'error'
				)
			}
		})
	}

	/**
	* 
	* handler for deactivate Operation
	*
	* @memberof ListCourseTypeComponent
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
				var deactivateObj = new CourseType();
				deactivateObj.masterId = id;
				deactivateObj.isActivated = false;
				console.log('NEW: ', deactivateObj);
				this.courseTypeService.updateCourseTypeById(id, this.processObjUpdated(deactivateObj)).subscribe((data) => {
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
	* @memberof ListCourseTypeComponent
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
				var activateObj = new CourseType();
				activateObj.masterId = id;
				activateObj.isActivated = true;
				this.courseTypeService.updateCourseTypeById(id, this.processObjUpdated(activateObj)).subscribe((data) => {
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