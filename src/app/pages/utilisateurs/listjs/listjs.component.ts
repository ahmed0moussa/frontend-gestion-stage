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
import { UserProfileService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GestionUsersService } from 'src/app/core/services/servicesProject/gestion-users.service';
import { GestionRolesService } from 'src/app/core/services/servicesProject/gestion-roles.service';
import { Role } from 'src/app/core/models/role';
import { ListService } from './listjs.service';
import { LabelValu } from 'src/app/core/models/label-valu';
import { MultiSelect } from 'primeng/multiselect';
import { MultiselectRole } from 'src/app/core/models/multiselect-role';
import { User } from 'src/app/core/models/user';

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
  labelValu: LabelValu[] = [];
  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;
  addForm!: boolean; // pour desactiver 2 champs pwd et confirm pwd
  arayRole!: string[];
  selectedRoles: string[] = [];
  existingTerm: any;
  fuzzyTerm: any;
  dataterm: any;
  term: any;
  roles!: any;
  defaultRole!: any;
  multiRoles: MultiselectRole = new MultiselectRole();
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
    private userService: GestionUsersService,
    private toastr: ToastrService,
    private roleService: GestionRolesService
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
     * Form for Validation
     */
    this.listJsForm = this.formBuilder.group({
      id: [''],

      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, this.emailPatternValidator()],
      ],
      //rolee: ['[]', Validators.required],

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
    this.fetchRoles();
    this.getListRoles();

    /**
     * fetches data
     */
    this.ListJsList.subscribe((x) => {
      this.ListJsDatas = Object.assign([], x);
      console.log('ffffff', this.ListJsDatas);
    });
  }
  // methodes recupération de toutes les roles
  fetchRoles() {
    this.roleService.getAllRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }
  // meth pour affichier les roles dans champ role in update
  validAjout() {
    this.addForm = true;
  }
  // pushRole(event: any) {
  //   const roleName: string = event.target.value;
  //   // Check if the selected role is not already in the array
  //   if (!this.selectedRoles.includes(roleName)) {
  //     // If not, add it to the array
  //     this.selectedRoles.push(roleName);
  //     console.log('array', this.selectedRoles);
  //   }
  // }
  pushRole(event: any) {
    const roleName: string = event.target.value;
    // Clear the selectedRoles array before adding the new role
    this.selectedRoles = [];
    // Add the selected role to the array
    this.selectedRoles.push(roleName);
    console.log('array', this.selectedRoles);
  }

  //affichage de toutes les users
  findall() {
    this.userService.getAllUsers().subscribe(
      (user) => {
        this.ListJsDatas = user;
        // this.defaultRole=
        console.log('testTest', user);
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    );
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

  saveListJs() {
    this.submitted = true;

    if (this.listJsForm.valid) {
      console.log('form2', this.listJsForm);

      const formData = { ...this.listJsForm.value };
      const user: User = {
        id: formData.ids,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        //role: formData.rolee,
        //role: [formData.rolee],
        role: this.selectedRoles,
      };
      if (formData.ids) {
        const formData = { ...this.listJsForm.value };
        console.log('aaappp', formData);
        const user: User = {
          id: formData.ids,
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          // role: formData.rolee,
          role: this.selectedRoles,
        };
        // Update existing user
        this.userService.updateUser(user).subscribe(
          () => {
            console.log('User updated successfully', user);
            this.toastr.success('Utilisateur modifié avec succès!', 'Success');
            this.findall();
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        console.log('user', user);

        // Add new user
        this.userService.createUser(user).subscribe(
          (response) => {
            console.log('Data saved successfully!', response);
            this.toastr.success('Data saved successfully!', 'Success');
            this.findall();
          },
          (error) => {
            console.error('register error', error);
            this.toastr.error('Email déjà existant', 'Error');
          }
        );
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
  confirm(i: any) {
    console.log(i);
    this.deleteId = i;
    this.deleteModal?.show();
  }

  /**
   * Multiple Delete
   */
  checkedValGet: any[] = [];

  // Delete Data
  deleteData() {
    console.log('id', this.deleteId);

    if (this.deleteId) {
      document.getElementById('a_' + this.deleteId)?.remove();
      this.userService.deleteUser(this.deleteId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.masterSelected = false;
          this.toastr.success('User deleted successfully', 'Success');
          this.findall();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
    this.checkedValGet.forEach((item: any) => {
      document.getElementById('a_' + item)?.remove();
      this.masterSelected = false;
    });

    this.deleteModal?.hide();
  }

  /**
   * Open modal / LES donnee dans modal
   * @param content modal content
   */
  editModal(id: number) {
    this.submitted = false;
    this.addForm = false;
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    // console.log('id', data.id );
    updateBtn.innerHTML = 'Update';
    this.showModal?.show();
    var listData = this.ListJsDatas[id];
    console.log('iddd', listData.nameRoles);

    this.listJsForm.controls['firstname'].setValue(listData.firstname);
    this.listJsForm.controls['lastname'].setValue(listData.lastname);
    this.listJsForm.controls['email'].setValue(listData.email);
    this.listJsForm.controls['rolee'].setValue(listData.nameRoles);
    this.listJsForm.controls['id'].setValue(listData.id);
    // const passwordControl = this.listJsForm.get('password') as FormControl;
    // passwordControl.clearValidators();
    // passwordControl.updateValueAndValidity();
  }

  // Sorting
  sortname() {
    this.ListJsDatas.sort(function (a: any, b: any) {
      if (a.firstname < b.firstname) {
        return -1;
      }
      if (a.lastname > b.lastname) {
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
  // meth multiselect Roles
  getListRoles() {
    this.roleService.getListRoles().subscribe({
      next: (data) => {
        this.labelValu = data;
        console.log('cc', this.labelValu);
      },
      error: console.log,
    });
  }
}
