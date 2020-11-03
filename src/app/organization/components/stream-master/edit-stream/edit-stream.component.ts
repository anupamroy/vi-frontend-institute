import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StreamService } from '../../stream-master/services/stream.service'
import { Stream } from "../../../../shared/models/stream";
@Component({
  selector: 'app-edit-stream',
  templateUrl: './edit-stream.component.html',
  styleUrls: ['./edit-stream.component.scss']
})
export class EditStreamComponent implements OnInit {

  id: string;
  stream : string ='';
  constructor(private activatedRoute: ActivatedRoute, private streamService : StreamService , private router :Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.masterId;
    this.streamService.getStreamById(this.id).subscribe((item) => {
      item = JSON.parse(item);
      this.stream = item.Items[0].stream_type
      console.log(item)
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
  onClick = () => {
    console.log('on click');
    console.log(this.stream)
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();

        var obj = new Stream();
        obj.stream_type = this.stream;
        obj.masterId = this.id;
        this.streamService
          .updateStream(this.id, this.processObjUpdated(obj))
          .subscribe((data) => {
            console.log('ID' + data);
            if (data) {
              Swal.fire({
                title: 'Edited',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.router.navigate(['./org/list-stream']);
              })
            }
          });

      }
    });

  }

  enableButton = () => {
    console.log('enable button');
    return false;
  }

  enableAlert = () => {
    console.log('enable Alert');
    return true;
  }
}
