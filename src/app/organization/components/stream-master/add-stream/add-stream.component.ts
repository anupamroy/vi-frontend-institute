import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Stream } from '../../../../shared/models/stream';
import { StreamService } from '../services/stream.service'

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.scss']
})
export class AddStreamComponent implements OnInit {

  streamType :string ='';
  constructor(private streamService : StreamService, private router:Router) { }

  ngOnInit(): void {
  }


 
  enableButton() {
    if (this.streamType !== '' && this.streamType.trim() === '') {
      return true
    }
    else {
      return false;
    }
  }

  enableAlert() { // need to add in commom framework validationss
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.streamType)
  }

  onSubmit =()=>{
    const obj = new Stream();
    obj.stream_type = this.streamType;
    obj.isDeleted = false;
    obj.isActivated = true;
    console.log('obj......',obj);

    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
    
    this.streamService.saveStream(obj)
    .subscribe({
      next: responseData => {
        console.log(responseData)
        if (responseData) {
          Swal.fire(
            'Congratulations!',
            'Stream  has been added',
            'success'
          ).then(result => {
            this.router.navigate(['/org/list-stream'])

          })
        }

      },
      error: error => {
        Swal.fire(
          'Error!',
          'Could not add Stream',
          'error'
        )
        console.log(error)
      }
    })
    
  }

}
