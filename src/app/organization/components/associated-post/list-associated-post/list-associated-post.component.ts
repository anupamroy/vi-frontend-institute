import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AssociatedPostService } from '../services/associated-post.service'
import { AssociatedPost } from '../associate-post.model'

@Component({
  selector: 'app-list-associated-post',
  templateUrl: './list-associated-post.component.html',
  styleUrls: ['./list-associated-post.component.scss']
})
export class ListAssociatedPostComponent implements OnInit {

  /** Holds the list of associated post */
  associated_Post_list = [];

  constructor(private router: Router, private associatedPostService: AssociatedPostService) { }

  /**
   * Process the object to pass as body to update api
   * @memberof ListAssociatedPostComponent
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
   * Deletes the selected list item
   * @memberof ListAssociatedPostComponent
   * @param id of the item to be deleted
   */
  onDelete(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.value) {
        var newObj = new AssociatedPost();

        newObj.isDeleted = true;
        newObj.masterId = id;

        this.associatedPostService.deleteAssociatedPostById(this.processObjUpdated(newObj)).subscribe(() => {
          this.associated_Post_list = this.associated_Post_list.filter((item) => {
            return item.masterId !== id;
          })
        });
        Swal.fire(
          'Deleted!',
          'Your Associated Post has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Associated Post is safe :)',
          'error'
        )
      }
    })

  }


  /**
   * Redirects to dashboard
   * @memberof ListAssociatedPostComponent
   */
  onDashboard() {
    this.router.navigate(["./org"])
  }


  /**
   * Redirects to add associate page
   * @memberof ListAssociatedPostComponent
   */
  onAdd() {
    this.router.navigate(["/org/add-associated-post"])
  }


  /**
   * Deactivate the selected item
   * @param id of the selected item
   * @memberof ListAssociatedPostComponent
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
        var newObj = new AssociatedPost();

        newObj.masterId = id;
        newObj.isActivated = false;
        this.associatedPostService.updateAssociatedPostById(this.processObjUpdated(newObj)).subscribe((data) => {
          this.associated_Post_list = this.associated_Post_list.map((item) => {
            if (item.masterId === id) {
              item.isActivated = false
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Associated Post has been deactivated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Associated Post is not deactivated', 'error');
      }
    })
  }


  /**
   * Activates the selected item
   * @param id
   * @memberof ListAssociatedPostComponent 
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

        var newObj = new AssociatedPost();
        newObj.isActivated = true;
        newObj.masterId = id;

        this.associatedPostService.updateAssociatedPostById(this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.associated_Post_list = this.associated_Post_list.map((item) => {
            if (item.masterId === id) {
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Associated Post has been activated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Associated Post is not activated', 'error');
      }
    })
  }

  ngOnInit(): void {
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();

        this.associatedPostService.getAssociatedPost().subscribe(responseData => {
          const fetchData = JSON.parse(responseData).Items
          console.log('DATA FROM DATABASE: ', fetchData)

          this.associated_Post_list = fetchData.filter((item) => {
            if (item.isDeleted === false){
              return item;
            }
          })

          console.log('DATA TO BE POPULATED: ', this.associated_Post_list)

          Swal.close();
        }, error => {
          console.log("Could not Fetch Data")
          Swal.fire({
            text: 'Error Fetching',
            icon: 'warning'
          })
        })
      }
    })
  }
}
