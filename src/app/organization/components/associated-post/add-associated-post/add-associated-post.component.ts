import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import Swal from 'sweetalert2'
import {AssociatedPostService} from '../services/associated-post.service';
import { AssociatedPost } from '../associate-post.model';

@Component({
  selector: 'app-add-associated-post',
  templateUrl: './add-associated-post.component.html',
  styleUrls: ['./add-associated-post.component.scss']
})
export class AddAssociatedPostComponent implements OnInit {

  /** Holds the associatedPost name */
  associatedPost: string = "";

  constructor(private router: Router,private associatedPostService:AssociatedPostService) { }

  /**
   * Enable disable the add button
   * @memberof AddAssociatedPostComponent
   * @returns {boolean}
   */
  enableButton(){
    if(this.associatedPost.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  /**
   * Enable disable validation alert
   * @memberof AddAssociatedPostComponent
   * @returns {boolean}
   */
  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.associatedPost)
  }

  /**
   * Submits the add form
   * @memberof AddAssociatedPostComponent
   */
  onClick() {
    // console.log(this.associatedPost);
    const obj = new AssociatedPost();

    obj.associated_post_name = this.associatedPost;
    obj.master = 'ASSOCIATED_POST'
    obj.isActivated = true;
    obj.isDeleted = false;

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: ()=>{
        Swal.showLoading();
        this.associatedPostService
          .addAssociatedPost(obj)
          .subscribe((data) => {
          if(data){
            Swal.fire({
              title: 'Added',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              this.router.navigate(['./org/list-associated-post']);
            })  
          }
        });
      }
    })
  }


  /**
   * Redirects to dashboard
   * @memberof AddAssociatedPostComponent
   */
  onDashboard(){
    this.router.navigate(["./org"])
  }

  ngOnInit(): void {
  }

}
