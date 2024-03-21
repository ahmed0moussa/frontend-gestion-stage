import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormArray,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable } from 'rxjs';

// Sweet Alert
import Swal from 'sweetalert2';

import {
  NgbdListSortableHeader,
  listSortEvent,
} from './listjs-sortable.directive';
import { ListJsModel } from './listjs.model';
import { ListService } from './listjs.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listjs',
  templateUrl: './listjs.component.html',
  styleUrls: ['./listjs.component.scss'],
  providers: [ListService, DecimalPipe],
})
export class ListjsComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  listJsForm!: UntypedFormGroup;
  ListJsData!: ListJsModel[];
  checkedList: any;
  masterSelected!: boolean;
  ListJsDatas: any;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  existingTerm: any;
  fuzzyTerm: any;
  dataterm: any;
  term: any;

  // Table data
  ListJsList!: Observable<ListJsModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdListSortableHeader)
  headers!: QueryList<NgbdListSortableHeader>;
  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;
  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;
  constructor(
    public service: ListService,
    private formBuilder: UntypedFormBuilder,
    private pipe: DecimalPipe,
    private userService: UserProfileService,
    private toastr: ToastrService
  ) {
    this.ListJsList = service.countries$;
    console.log(this.ListJsList);
    this.total = service.total$;
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Utilisateurs' },
      { label: 'List', active: true },
    ];

    /**
     * Form Validation
     */
    this.listJsForm = this.formBuilder.group({
      ids: [''],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, this.emailPatternValidator()],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      cpassword: ['', Validators.required],
    });

    this.findall();
    /**
     * fetches data
     */
    this.ListJsList.subscribe((x) => {
      this.ListJsDatas = Object.assign([], x);
    });
  }
  findall() {
    // this.userService.fiddalluser().subscribe(
    //   (user) => {
    //     this.ListJsDatas = user;
    //     console.log(user)
    //   },
    //   (error) => {
    //     console.error('Error fetching data:', error);
    //     // Handle error as needed
    //   }
    // );
  }

  tablepageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
  }
  emailPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const valid = emailPattern.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
  }

  /**
   * Form data get
   */
  get form() {
    return this.listJsForm.controls;
  }

  /**
   * Save saveListJs
   */
  // saveListJs() {
  //   if (this.listJsForm.valid) {
  //     if (this.listJsForm.get('ids')?.value) {
  //       this.ListJsDatas = this.ListJsDatas.map((data: { id: any; }) => data.id === this.listJsForm.get('ids')?.value ? { ...data, ...this.listJsForm.value } : data)
  //     } else {
  //       const firstName = this.listJsForm.get('firstName')?.value;
  //       const lastName = this.listJsForm.get('lastName')?.value;
  //       const email = this.listJsForm.get('email')?.value;

  //       const password = this.listJsForm.get('password')?.value;

  //     }
  //   }
  //   this.showModal?.hide()
  //   setTimeout(() => {
  //     this.listJsForm.reset();
  //   }, 2000);
  //   this.submitted = true
  // }
  saveListJs() {
    this.submitted = true;
    if (this.listJsForm.valid) {
      const formData = { ...this.listJsForm.value };
      // const user: User = {};

      if (formData.ids) {
        console.log(formData);
        // Update existing data
        this.ListJsDatas = this.ListJsDatas.map((data: { id: any }) =>
          data.id === formData.ids ? { ...data, ...formData } : data
        );
        // user.id = formData.ids;

        // this.userService.updateUser(formData.ids, formData).subscribe(
        //   () => {
        //     console.log('User updated successfully', formData);
        //     this.toastr.success('Utilisateur modifié avec succès!', 'Success');
        //     this.findall();
        //   },
        //   (error) => {
        //     console.error('Error updating user:', error);
        //   }
        // );
      } else {
        // Add new data
        // this.userService.registerRh(formData).subscribe(
        //   (response) => {
        //     console.log('Data saved successfully!', response);
        //     this.toastr.success('Data saved successfully!', 'Success');
        //     this.findall()
        //   },
        //   (error) => {
        //     console.error('register error', error);
        //     this.toastr.error('Email déjà existant', 'Error');
        //   }
        // );
      }

      // Reset form and other actions
      this.showModal?.hide();
      setTimeout(() => {
        this.listJsForm.reset();
      }, 2000);
      this.submitted = true;
    }
  }
  onHidden(): void {
    const updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = 'Add Customer';
    this.listJsForm.reset();
    this.submitted = false;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.ListJsDatas.forEach(
      (x: { state: any }) => (x.state = ev.target.checked)
    );
    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.ListJsDatas.length; i++) {
      if (this.ListJsDatas[i].state == true) {
        result = this.ListJsDatas[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal;
    checkedVal.length > 0
      ? ((
          document.getElementById('remove-actions') as HTMLElement
        ).style.display = 'block')
      : ((
          document.getElementById('remove-actions') as HTMLElement
        ).style.display = 'none');
  }
  isAllChecked() {
    return this.ListJsDatas.every((_: { state: any }) => _.state);
  }

  /**
   * Confirmation mail model
   */
  deleteId: any;
  confirm(id: any) {
    this.deleteId = id;
    this.deleteModal?.show();
  }

  /**
   * Multiple Delete
   */
  checkedValGet: any[] = [];

  // Delete Data
  deleteData(id: any) {
    if (id) {
      document.getElementById('a_' + id)?.remove();
      // this.userService.deleteUser(id).subscribe(
      //   () => {
      //     console.log('User deleted successfully');
      //     this.masterSelected = false;
      //     this.toastr.success('User deleted successfully', 'Success');
      //     this.findall();
      //   },
      //   (error) => {
      //     console.error('Error deleting user:', error);
      //   }
      // );
    }
    this.checkedValGet.forEach((item: any) => {
      document.getElementById('a_' + item)?.remove();
      this.masterSelected = false;
    });

    this.deleteModal?.hide();
  }

  /**
   * Open modal
   * @param content modal content
   */
  editModal(id: any) {
    this.submitted = false;
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;

    updateBtn.innerHTML = 'Update';
    this.showModal?.show();
    var listData = this.ListJsDatas[id];
    this.listJsForm.controls['firstName'].setValue(listData.firstName);
    this.listJsForm.controls['lastName'].setValue(listData.lastName);
    this.listJsForm.controls['email'].setValue(listData.email);
    this.listJsForm.controls['ids'].setValue(listData.id);
  }

  // Sorting
  sortname() {
    this.ListJsDatas.sort(function (a: any, b: any) {
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.lasttName > b.lastName) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: listSortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.listsortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
