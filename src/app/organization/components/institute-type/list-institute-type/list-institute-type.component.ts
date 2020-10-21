import { Component, OnInit } from '@angular/core';
import { InstituteTypeService} from '../Services/institute-type.service'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-list-institute-type',
  templateUrl: './list-institute-type.component.html',
  styleUrls: ['./list-institute-type.component.scss']
})
export class ListInstituteTypeComponent implements OnInit {

  institute_Type : any;
  temp=[]
  finalItems : any
  constructor(private InstituteTypeService : InstituteTypeService) { }

  showDeleteAlert(id: string){
    let itemId =id
    Swal.fire({
      title: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.onDeleteConfirm(itemId)
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  onDeleteConfirm(id: string){
    this.InstituteTypeService.deleteInstituteType(id).subscribe(
      {next : resposeData =>{
      console.log(resposeData)

      this.finalItems = this.finalItems.filter((item) => {
        return item.itemId !== id;
      })
    },
      error : error => {
        console.log(error)
      }
  })
  }

  ngOnInit(): void {
    this.InstituteTypeService.getInstituteType().subscribe(responseData => {
      this.institute_Type = JSON.parse(responseData).Items
      console.log(this.institute_Type)
      let temp= []
          this.institute_Type.forEach(record => {
            if(record.instituteType){
              temp.push(record)
            }
          })
          this.finalItems = temp
        },
        error =>{
          console.log("Could not Fetch Data")
        })

        }
  }
    
    


    

  //   fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/all')
  //   .then( res=> res.json())
  //   .then( res => {
  //     this.institute_Type = JSON.parse(res).Items;
  //     console.log(this.institute_Type)

  //     let temp= []
  //     this.institute_Type.forEach(record => {
  //       if(record.instituteType){
  //         temp.push(record)
  //       }
  //     })
  //     this.finalItems = temp
  //   })
  //   .catch(err => console.log(err))
  // }

  

  //   fetch(`https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/${id}`, {
  //     method: 'DELETE'
  //   }).then((res) => {
  //     console.log(res)

  //     this.finalItems = this.finalItems.filter((item) => {
  //       return item.itemId !== id;
  //     })
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }
  
    


