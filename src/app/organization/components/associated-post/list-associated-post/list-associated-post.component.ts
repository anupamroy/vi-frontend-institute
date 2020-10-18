import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-associated-post',
  templateUrl: './list-associated-post.component.html',
  styleUrls: ['./list-associated-post.component.scss']
})
export class ListAssociatedPostComponent implements OnInit {

  associated_Post: any;
  final_items: any;

  constructor() { }

  ngOnInit(): void {
    fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/all')
    .then(res => res.json())
    .then((res) => {
      this.associated_Post = JSON.parse(res).Items;
      // this.associated_Post = this.associated_Post.find(item => item === 'associated_post')
      console.log('hello....',this.associated_Post);
      let temp = [];
      this.associated_Post.forEach(record => {
        if(record.associated_post){
          temp.push(record)
        }
      })
      this.final_items = temp;
      }).catch(err=>console.log(err)
      )
      
      
      
  } 


}
