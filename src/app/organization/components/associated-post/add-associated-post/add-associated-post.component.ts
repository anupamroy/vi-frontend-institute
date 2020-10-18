import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-associated-post',
  templateUrl: './add-associated-post.component.html',
  styleUrls: ['./add-associated-post.component.scss']
})
export class AddAssociatedPostComponent implements OnInit {

  associatedPost: string = "";

  constructor() { }

  onKey(event: any) { // without type info
    this.associatedPost = event.target.value;
  }

  onClick() {
    console.log(this.associatedPost);
    fetch("https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org", {
      method: 'POST',
      body: JSON.stringify({
        associated_post: this.associatedPost
      })
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  ngOnInit(): void {
  }

}
