import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaperTypeService } from '../../../services/paper-type.service'
import { PaperType } from '../../../../shared/models/paper-type';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-add-paper-type',
	templateUrl: './add-paper-type.component.html',
	styleUrls: ['./add-paper-type.component.scss']
})
export class AddPaperTypeComponent implements OnInit {
	/** flag holds the form submit status */
	disableButton: boolean = true;

	/** Short Key for Paper Type Table NoSQL DynamoDB */
	paperType: string = '';

  	constructor(private router: Router, private paperTypeService: PaperTypeService) { }

	ngOnInit(): void {
	}
	/**
	* 
	* Enable disable submit button 
	*
	* @memberof AddPaperTypeComponent
	*/
	enableButton() {
		if (this.paperType !== '' && this.paperType.trim() === '') {
			return true
		} else {
			return false
		}
	}


	/**
	* 
	* Test input against reg expression and return alert boolean
	*
	* @memberof AddPaperTypeComponent
	*/
	enableAlert() {
		const regex = /^[a-zA-Z ]*$/
		return regex.test(this.paperType)
	}

	/**
	* 
	* Submit Handler for Add Paper Type
	*
	* @memberof AddPaperTypeComponent
	*/
	onSubmit() {
		const paperTypeObj = new PaperType();
		paperTypeObj.paper_type = this.paperType;
		paperTypeObj.is_active = true;
		paperTypeObj.is_delete = false;
		Swal.fire({
			title: 'Please Wait',
			allowEscapeKey: false,
			allowOutsideClick: true,
			background: '#fff',
			showConfirmButton: false,
			onOpen: () => {
				Swal.showLoading();
				this.paperTypeService.addPaperType(paperTypeObj).subscribe((data) => {
					if (data) {
						Swal.fire({
							title: 'Added',
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
}