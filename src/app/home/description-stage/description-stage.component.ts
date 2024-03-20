import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-description-stage',
  
  templateUrl: './description-stage.component.html',
  styleUrl: './description-stage.component.scss'
})
export class DescriptionStageComponent {
  

  breadCrumbItems!: Array<{}>;
  reviewForm!: UntypedFormGroup;
  reviewData: any;
  submitted: boolean = false;
  deleteId: any;
  files: File[] = [];
  rate: any;
  currentTab = 'description';

  @ViewChild('addReview', { static: false }) addReview?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;

  constructor(private router: Router,private formBuilder: UntypedFormBuilder) { }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Courses', active: true },
      { label: 'Overview', active: true }
    ];

    /**
 * Form Validation
 */
    this.reviewForm = this.formBuilder.group({
      _id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      img: ['']
    });

    // Fetch Data
    
  }

  // public dropzoneConfig: DropzoneConfigInterface = {
  //   clickable: true,
  //   addRemoveLinks: true,
  //   previewsContainer: false,
  // };

  uploadedFiles: any[] = [];

  // File Upload
  profile: any = [];
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.profile.push(event[0].dataURL)
      this.reviewForm.controls['img'].setValue(this.uploadedFiles);
    }, 0);
  }

  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }


  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // open & close chatbox
  openchatbox() {
    document.getElementById('emailchat-detailElem')?.classList.add('d-block')
  }
  closechatbox() {
    document.getElementById('emailchat-detailElem')?.classList.remove('d-block')
  }




  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
  
  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
