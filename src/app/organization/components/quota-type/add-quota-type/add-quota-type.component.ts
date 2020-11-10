import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuotaTypeService } from '../../../services/quota-type.service'
import { QuotaType } from '../../../../shared/models/quota-type';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-add-quota-type',
	templateUrl: './add-quota-type.component.html',
	styleUrls: ['./add-quota-type.component.scss']
})
export class AddQuotaTypeComponent implements OnInit {
	/** flag holds the form submit status */
	disableButton: boolean = true;

	/** Short Key for Quota Type Table NoSQL DynamoDB */
	quotaType: string = '';

  	constructor(private router: Router, private quotaTypeService: QuotaTypeService) { }

	ngOnInit(): void {
	}
	/**
	* 
	* Enable disable submit button 
	*
	* @memberof AddQuotaTypeComponent
	*/
	enableButton() {
		if (this.quotaType !== '' && this.quotaType.trim() === '') {
			return true
		} else {
			return false
		}
	}


	/**
	* 
	* Test input against reg expression and return alert boolean
	*
	* @memberof AddQuotaTypeComponent
	*/
	enableAlert() {
		const regex = /^[a-zA-Z ]*$/
		return regex.test(this.quotaType)
	}

	/**
	* 
	* Submit Handler for Add Quota Type
	*
	* @memberof AddQuotaTypeComponent
	*/
	onSubmit() {
		const quotaTypeObj = new QuotaType();
		quotaTypeObj.quota = this.quotaType;
		quotaTypeObj.is_active = true;
		quotaTypeObj.is_delete = false;
		Swal.fire({
			title: 'Please Wait',
			allowEscapeKey: false,
			allowOutsideClick: true,
			background: '#fff',
			showConfirmButton: false,
			onOpen: () => {
				Swal.showLoading();
				this.quotaTypeService.addQuotaType(quotaTypeObj).subscribe((data) => {
					if (data) {
						Swal.fire({
							title: 'Added',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500,
						}).then(() => {
							this.router.navigate(['./org/list-quota-type']);
						})
					}
				});
			}
		});
	}
}