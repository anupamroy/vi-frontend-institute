import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotaTypeService } from '../../../services/quota-type.service'
import { QuotaType } from '../../../../shared/models/quota-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-quota-type',
  templateUrl: './edit-quota-type.component.html',
  styleUrls: ['./edit-quota-type.component.scss']
})
export class EditQuotaTypeComponent implements OnInit {
		/** Attribute for Paper Type Table NoSQL DynamoDB */
	quotaType: string;

	/** Short Key for Paper Type Table NoSQL DynamoDB */
	id: string;

	/** PaperTypeData hold PaperTypeData object */
	quotaTypeData: any


	constructor(private activatedRoute: ActivatedRoute, private router: Router, private quotaTypeService: QuotaTypeService) { }

	/**
	* 
	* Load Paper Type by Id
	*
	* @memberof EditPaperTypeComponent
	*/
	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params.masterId;
		console.log('id....', this.id);
		this.quotaTypeService.getQuotaTypeById(this.id).subscribe((item) => {
			item = JSON.parse(item);
			this.quotaType = item.Items[0].quotaType
			console.log(item)
			console.log('this quota type', this.quotaType);
		})
	}

	/**
	* 
	* Enable disable submit button 
	*
	* @memberof EditPaperTypeComponent
	*/
	enableButton() {
		if (this.quotaType && this.quotaType.trim() === "") {
			return true
		} else {
			return false
		}
	}

	/**
	* 
	* Test input against reg expression and return alert boolean
	*
	* @memberof EditPaperTypeComponent
	*/
	enableAlert() {
	const regex = /^[a-zA-Z_ ]*$/
		return regex.test(this.quotaType)
	}


	/**
	* 
	* Process the Paper Type Object to send for updation 
	*
	* @memberof EditPaperTypeComponent
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
	* handler for edit Operation
	*
	* @memberof EditPaperTypeComponent
	*/
	onClick() {
		const editObj = new QuotaType();
		editObj.masterId = this.id;
		editObj.quota = this.quotaType;
		console.log(this.quotaType)
		Swal.fire({
			title: 'Please Wait',
			allowEscapeKey: false,
			allowOutsideClick: true,
			background: '#fff',
			showConfirmButton: false,
			onOpen: () => {
				Swal.showLoading();
				this.quotaTypeService.updateQuotaTypeById(this.id, this.processObjUpdated(editObj)).subscribe((data) => {
					console.log('ID' + data);
					if (data) {
						Swal.fire({
							title: 'Edited',
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
	/**
	* 
	* Route to Add Paper Type component
	*
	* @memberof EditPaperTypeComponent
	*/
	onAdd() {
		this.router.navigate(['./org/add-quota-type'])
	}

	/**
	* 
	* Route to View Paper Type Component
	*
	* @memberof EditPaperTypeComponent
	*/
	onView() {
		this.router.navigate(['./org/list-quota-type'])
	}
	/**
	* 
	* Route to Org Component
	*
	* @memberof EditPaperTypeComponent
	*/
	onDashboard() {
		this.router.navigate(['./org'])
	}
}