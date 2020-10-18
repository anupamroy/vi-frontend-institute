import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-associated-post',
  templateUrl: './edit-associated-post.component.html',
  styleUrls: ['./edit-associated-post.component.scss']
})
export class EditAssociatedPostComponent implements OnInit {

  associated_post = "";
  id = "";

  instituteType = "MTech";

  enableButton(){
    const regEx = /^[a-zA-Z\s]+$/;
    // const regEx = /(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?/

    return regEx.test(this.associated_post);
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  onClick(){
    console.log(this.id)
    if (this.instituteType !== this.associated_post) {
      fetch(`https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/${this.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          attribute: ["associated_post"],
          value: [this.associated_post]
        })
      }).then((res) => {
        console.log(res);
        console.log('SUCCESS')
        this.router.navigate(["/org/list-associated-post"])
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params.id)
    this.id = this.activatedRoute.snapshot.params.id;
    this.associated_post = this.activatedRoute.snapshot.params.associated_post;
  }

}
