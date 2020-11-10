import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperTypeService } from '../../../services/paper-type.service'
import { PaperType } from '../../../../shared/models/paper-type';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-edit-paper-type',
	templateUrl: './edit-paper-type.component.html',
	styleUrls: ['./edit-paper-type.component.scss']
})
export class EditPaperTypeComponent implements OnInit {
	/** Attribute for Paper Type Table NoSQL DynamoDB */
	paperType: string;

	/** Short Key for Paper Type Table NoSQL DynamoDB */
	id: string;

	/** PaperTypeData hold PaperTypeData object */
	paperTypeData: any


	constructor(private activatedRoute: ActivatedRoute, private router: Router, private paperTypeService: PaperTypeService) { }

	/**
	* 
	* Load Paper Type by Id
	*
	* @memberof EditPaperTypeComponent
	*/
	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params.masterId;
		console.log('id....', this.id);
		this.paperTypeService.getPaperTypeById(this.id).subscribe((item) => {
			item = JSON.parse(item);
			this.paperType = item.Items[0].paper_type
			console.log(item)
			console.log('this paper type', this.paperType);
		})
	}

	/**
	* 
	* Enable disable submit button 
	*
	* @memberof EditPaperTypeComponent
	*/
	enableButton() {
		if (this.paperType && this.paperType.trim() === "") {
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
		return regex.test(this.paperType)
	}


	/**
	* 
	* Process the Paper Type Object to send for updation 
	*
	* @memberof EditPaperTypeComponent
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
	* handler for edit Operation
	*
	* @memberof EditPaperTypeComponent
	*/
	onClick() {
		const editObj = new PaperType();
		editObj.masterId = this.id;
		editObj.paper_type = this.paperType;
		console.log(this.paperType)
		Swal.fire({
			title: 'Please Wait',
			allowEscapeKey: false,
			allowOutsideClick: true,
			background: '#fff',
			showConfirmButton: false,
			onOpen: () => {
				Swal.showLoading();
				this.paperTypeService.updatePaperTypeById(this.id, this.processObjUpdated(editObj)).subscribe((data) => {
					console.log('ID' + data);
					if (data) {
						Swal.fire({
							title: 'Edited',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500,
						}).then(() => {
							this.router.navigate(['./org/list-paper-type']);
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
		this.router.navigate(['./org/add-paper-type'])
	}

	/**
	* 
	* Route to View Paper Type Component
	*
	* @memberof EditPaperTypeComponent
	*/
	onView() {
		this.router.navigate(['./org/list-paper-type'])
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