import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, pipe, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddOrganizationService } from 'src/app/organization/services/add-organization.service';
import { AssociatedPostService } from '../../associated-post/services/associated-post.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() thirdFormGroup: FormGroup;
  /** used to help terminate all subscriptions when component destroyed */
  private ngUnsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

  orgkey = "";
  associated_Post_list;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private formBuilder: FormBuilder,
    public addOrganizationService: AddOrganizationService,
    private associatedPostService: AssociatedPostService) { }

  ngOnInit(): void {
    this.associatedPostService.getAssociatedPost().subscribe(responseData => {
      const fetchData = JSON.parse(responseData).Items
      console.log('DATA FROM DATABASE: ', fetchData)

      this.associated_Post_list = fetchData.filter((item) => {
        if (item.isDeleted === false) {
          return item;
        }
      })
      this.addOrganizationService.broadcastAssociatedPostList(this.associated_Post_list);
      console.log('DATA TO BE POPULATED: ', this.associated_Post_list)


    }, error => {
      console.log("Could not Fetch Data")

    })

    this.addOrganizationService.$orgKey.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      console.log("subscribed ", res);
      this.orgkey = res;

    })
    this.thirdFormGroup = this.formBuilder.group({
      daysSelector: new FormControl([], Validators.required),
      time: new FormControl('', Validators.required)
    });
  }

  toggleAll(e): void {
    if (e.source.value) {
      this.thirdFormGroup.controls.daysSelector.setValue(this.days);
    } else {
      this.thirdFormGroup.controls.daysSelector.setValue([]);
    }
    e.source.value = !e.source.value;

    console.log(this.thirdFormGroup.value);
  }

  displayData(): void {
    console.log(this.thirdFormGroup.value);
  }

  resetForm() {
    this.thirdFormGroup.reset();
  }

  /**
 * Unsubscribe from any observable
 * This avoids "Attempt to use a destroyed view" when user navigates away before page done loading
 *
 * @memberof ContactDetailsComponent
 */
  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
