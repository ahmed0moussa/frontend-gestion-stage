import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { fetchcourcegriddata, updatecourcegridData, addcourcegridData, deletecourcegridData } from 'src/app/store/Learning-cources/cources.action';
import { selectgridData } from 'src/app/store/Learning-cources/cources.selector';
@Component({
  selector: 'app-postes-stage',
  
  templateUrl: './postes-stage.component.html',
  styleUrl: './postes-stage.component.scss'
})
export class PostesStageComponent {
  
  
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  listForm!: UntypedFormGroup;
  term: any
  submitted = false;
  gridlist: any;
  endItem: any
  listData!: any;
  masterSelected!: boolean;
  files: File[] = [];
  @ViewChild('addCourse', { static: false }) addCourse?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;

  deleteID: any;
  editData: any;

  constructor(private router: Router,private formBuilder: UntypedFormBuilder, public store: Store) {

  }

  ngOnInit(): void {
    

    // Fetch Data

    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchcourcegriddata());
      this.store.select(selectgridData).subscribe((data) => {
        this.listData = data;
        this.gridlist = data;
        this.listData = this.gridlist.slice(0, 10)
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)

    /**
     * Form Validation
     */
    this.listForm = this.formBuilder.group({
      id: [''],
      name: [''],
      img: [''],
      category: ['', [Validators.required]],
      instructor: ['', [Validators.required]],
      lessons: ['', [Validators.required]],
      students: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      fees: ['', [Validators.required]],
      coursestatus: ['', [Validators.required]]
    });
  }


  /**
 * Returns form
 */
  get form() {
    return this.listForm.controls;
  }

 

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.listForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Edit Data
  editList(id: any) {
    this.uploadedFiles = [];
    this.addCourse?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    this.editData = this.listData[id]
    this.uploadedFiles.push({ 'dataURL': this.editData.img, 'name': this.editData.imgalt, 'size': 1024, });
    this.listForm.patchValue(this.listData[id]);
  }

  /**
  * Save product
  */
  saveProduct() {
    if (this.listForm.valid) {
      if (this.listForm.get('id')?.value) {
        const updatedData = { color: this.editData.color,profile: this.editData.profile, ...this.listForm.value };
        this.store.dispatch(updatecourcegridData({ updatedData }));
      }
      else {
        this.listForm.controls['id'].setValue(this.listData.length + 1)
        const newData = { color: 'info', profile: 'assets/images/users/32/avatar-9.jpg', ...this.listForm.value }
        this.store.dispatch(addcourcegridData({ newData }))
      }
      setTimeout(() => {
        this.listForm.reset();
      }, 1000);
      this.uploadedFiles = [];
      this.listForm.reset();
      this.addCourse?.hide()
    }
  }

  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  confirmDelete() {
    this.store.dispatch(deletecourcegridData({ id: this.deleteID }))
    this.deleteRecordModal?.hide()
  }

  // filterdata
  filterdata() {
    if (this.term) {
      this.listData = this.gridlist.filter((el: any) => el.name.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.listData = this.gridlist.slice(0,10)
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement
    if (this.term && this.listData.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.listData = this.gridlist.slice(startItem, this.endItem);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
  
  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
