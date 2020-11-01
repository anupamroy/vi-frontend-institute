import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import {AssociatedPostService} from '../services/associated-post.service'
import { AssociatedPost } from '../associate-post.model';

@Component({
  selector: 'app-edit-associated-post',
  templateUrl: './edit-associated-post.component.html',
  styleUrls: ['./edit-associated-post.component.scss']
})
export class EditAssociatedPostComponent implements OnInit {

  /** Holds the name of associate post to be edited */
  associated_post :string= '';

  /** Holds the id of the item to be edited */
  id:string;

  /**
   * Enable disable edit button
   * @memberof EditAssociatedPostComponent
   * @returns {boolean}
   */
  enableButton(){
    if(this.associated_post && 
      this.associated_post.trim() === '') {
      return true
    }
    else {
      return false
    }
  }


  /**
   * Enable disable validation alert
   * @memberof EditAssociatedPostComponent
   */
  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.associated_post)
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private associatedPostService:AssociatedPostService) {
  }


  /**
   * Process the object to pass as body to update api
   * @memberof EditAssociatedPostComponent
   * @param object of Associate Post
   * @returns {object} of Associate Post
   */
  processObjUpdated(object: AssociatedPost){
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
   * Submits the edit form
   * @memberof EditAssociatedPostComponent
   */
  onClick(){
    var obj = new AssociatedPost();

    obj.associated_post_name = this.associated_post;
    obj.masterId = this.id;

    this.associatedPostService
      .updateAssociatedPostById(this.processObjUpdated(obj))
      .subscribe((data) => {
        console.log(data);
      });

    Swal.fire({
      title: 'Edited',
      text: 'Data Edited Successfully',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(()=>{
      setTimeout(() => {
        this.router.navigate(['./org/list-associated-post']);
      }, 500);
    })
  }

  /**
   * Redirects to list of associated post page
   * @memberof EditAssociatedPostComponent
   */
  onView(){
    this.router.navigate(["/org/list-associated-post"])
  }

  /**
   * Redirects to dashboard
   * @memberof EditAssociatedPostComponent
   */
  onDashboard(){
    this.router.navigate(["./org"])
  }

  /**
   * Redirects to add associated post page
   * @memberof EditAssociatedPostComponent
   */
  onAdd(){
    this.router.navigate(["/org/add-associated-post"])
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.associated_post = this.activatedRoute.snapshot.params.associated_post;
  }

}
