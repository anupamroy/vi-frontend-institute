import { Component, OnInit } from '@angular/core';
import { Stream } from '../../../../shared/models/stream';
import Swal from 'sweetalert2';
import { StreamService } from '../services/stream.service'

@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.scss']
})
export class ViewStreamComponent implements OnInit {

  item: any;
  stream: any;
  streamItems: any;
  constructor(private streamService: StreamService) { }

  ngOnInit(): void {
    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    })
    this.streamService.getAllStream().subscribe(responseData => {
      this.stream = JSON.parse(responseData).Items
      console.log(this.stream)
      Swal.close()
      let temp = []
      this.streamItems = this.stream.filter(record =>
        record.master === 'STREAM' && record.isDeleted === false)
      console.log(this.streamItems)
    },
      error => {
        console.log("Could not Fetch Data")
      })
  }

  processObjUpdated(object: Stream) {
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

  onDelete = (id:string) => {
    console.log('deleted data', id);
    Swal.fire({
      title: 'Are you sure you want to delete Stream?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.value) {

        Swal.fire({
          title: "Please Wait",
          willOpen: () => {
            Swal.showLoading()
          },
        })
        var newObj = new Stream();
        newObj.masterId = id;
        newObj.isDeleted = true;
        console.log("After Deleting  -- " + newObj)

        this.streamService.deleteStream(id, this.processObjUpdated(newObj)).subscribe(() => {
          this.streamItems = this.streamItems.filter((item :any) => {
            return item.masterId !== id;
          })
          Swal.fire(
            'Deleted!',
            'Your Data has been deleted.',
            'success'
          )
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Data is safe :)',
          'error'
        )
      }
    })

  }

  onActivate = (id: string) => {
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
        var newActivateObj = new Stream();
        newActivateObj.masterId = id;
        newActivateObj.isActivated = true;

        this.streamService.activateStream(id, this.processObjUpdated(newActivateObj)).subscribe((data) => {
          console.log(data);

          this.streamItems = this.streamItems.map((item) => {
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

        var newObj = new Stream();
        newObj.masterId = id;
        newObj.isActivated = false;
        console.log('NEW: ', newObj);
        this.streamService.activateStream(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.streamItems = this.streamItems.map((item) => {
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

}
