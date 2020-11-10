import { Component, OnInit } from '@angular/core';
import { PaperTypeService } from '../../../services/paper-type.service'
import { PaperType } from '../../../../shared/models/paper-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-paper-type',
  templateUrl: './list-paper-type.component.html',
  styleUrls: ['./list-paper-type.component.scss']
})
export class ListPaperTypeComponent implements OnInit {
	/** Attroibute for Paper Type Table NoSQL DynamoDB */
	paperType: any;

	/** Array of Paper Type to show data for QuotaType Table NoSQL DynamoDB */
	finalItems: any;

	constructor(private paperTypeService: PaperTypeService) { }	

	/**
	* 
	* Load Paper Type data by Id
	*
	* @memberof AddPaperTypeComponent
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
				this.paperTypeService.getPaperType().subscribe(responseData => {
					this.paperType = JSON.parse(responseData).Items
					Swal.close()
					let temp = []
					this.finalItems = this.paperType.filter(record => record.master === 'PAPER_TYPE' && record.is_delete === false)	
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
	* Process the Paper Type Object to send for updation 
	*
	* @memberof ListPaperTypeComponent
	*/
	processObjUpdated(object: PaperType) {
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
	* @memberof ListPaperTypeComponent
	*/
	onDelete(id: string) {
		const deleteObj = new PaperType();
		deleteObj.masterId = id;
		deleteObj.is_delete = true;
		Swal.fire({
			title: 'Are you sure you want to delete?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
			confirmButtonColor: "#DD6B55"
		}).then((result) => {
			if (result.value) {
				this.paperTypeService.deletePaperTypeById(id, this.processObjUpdated(deleteObj)).subscribe(() => {
					this.finalItems = this.finalItems.filter((item) => {
						return item.masterId !== id;
					})
				});
				Swal.fire(
					'Deleted!',
					'Your Paper Type has been deleted.',
					'success'
				)
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire(
					'Cancelled',
					'Your Paper Type is safe :)',
					'error'
				)
			}
		})
	}

	/**
	* 
	* handler for deactivate Operation
	*
	* @memberof ListPaperTypeComponent
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
				var deactivateObj = new PaperType();
				deactivateObj.masterId = id;
				deactivateObj.is_active = false;
				console.log('NEW: ', deactivateObj);
				this.paperTypeService.updatePaperTypeById(id, this.processObjUpdated(deactivateObj)).subscribe((data) => {
					console.log(data);
					this.finalItems = this.finalItems.map((item) => {
						if (item.masterId === id) {
							item.is_active = false
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
	* @memberof ListPaperTypeComponent
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
				var activateObj = new PaperType();
				activateObj.masterId = id;
				activateObj.is_active = true;
				this.paperTypeService.updatePaperTypeById(id, this.processObjUpdated(activateObj)).subscribe((data) => {
					console.log(data);
					this.finalItems = this.finalItems.map((item) => {
						if (item.masterId === id) {
							item.is_active = true;
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