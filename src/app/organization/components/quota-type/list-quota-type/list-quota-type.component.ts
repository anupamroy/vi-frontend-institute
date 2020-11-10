import { Component, OnInit } from '@angular/core';
import { QuotaTypeService } from '../../../services/quota-type.service'
import { QuotaType } from '../../../../shared/models/quota-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-quota-type',
  templateUrl: './list-quota-type.component.html',
  styleUrls: ['./list-quota-type.component.scss']
})
export class ListQuotaTypeComponent implements OnInit {
	/** Attroibute for Quota Type Table NoSQL DynamoDB */
	quota: any;

	/** Array of QuotaType to show data for QuotaType Table NoSQL DynamoDB */
	finalItems: any;

	constructor(private quotaTypeService: QuotaTypeService) { }	

	/**
	* 
	* Load Quota Type data by Id
	*
	* @memberof AddQuotaTypeComponent
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
				this.quotaTypeService.getQuotaType().subscribe(responseData => {
					this.quota = JSON.parse(responseData).Items
					Swal.close()
					let temp = []
					this.finalItems = this.quota.filter(record => record.master === 'QUOTA' && record.is_delete === false)	
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
	* Process the Quota Type Object to send for updation 
	*
	* @memberof ListQuotaTypeComponent
	*/
	processObjUpdated(object: QuotaType) {
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
	* @memberof ListQuotaTypeComponent
	*/
	onDelete(id: string) {
		const deleteObj = new QuotaType();
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
				this.quotaTypeService.deleteQuotaTypeById(id, this.processObjUpdated(deleteObj)).subscribe(() => {
					this.finalItems = this.finalItems.filter((item) => {
						return item.masterId !== id;
					})
				});
				Swal.fire(
					'Deleted!',
					'Your Quota Type has been deleted.',
					'success'
				)
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire(
					'Cancelled',
					'Your Quota Type is safe :)',
					'error'
				)
			}
		})
	}

	/**
	* 
	* handler for deactivate Operation
	*
	* @memberof ListQuotaTypeComponent
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
				var deactivateObj = new QuotaType();
				deactivateObj.masterId = id;
				deactivateObj.is_active = false;
				console.log('NEW: ', deactivateObj);
				this.quotaTypeService.updateQuotaTypeById(id, this.processObjUpdated(deactivateObj)).subscribe((data) => {
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
	* @memberof ListQuotaTypeComponent
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
				var activateObj = new QuotaType();
				activateObj.masterId = id;
				activateObj.is_active = true;
				this.quotaTypeService.updateQuotaTypeById(id, this.processObjUpdated(activateObj)).subscribe((data) => {
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