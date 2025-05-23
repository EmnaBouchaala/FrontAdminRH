import { Component, OnInit, ViewChild } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';

import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { selectData } from 'src/app/store/Tasks/tasks-selector';
import { addtasklist, fetchtasklistData, updatetasklist } from 'src/app/store/Tasks/tasks.action';
import { Task } from 'src/app/store/Tasks/tasks.model';
import { memberList } from 'src/app/core/data';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';

@Component({
  selector: 'app-kanbanboard',
  templateUrl: './kanbanboard.component.html',
  styleUrls: ['./kanbanboard.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,BsDropdownModule,ReactiveFormsModule,ModalModule,CommonModule]
})

/**
 * Kanbanboard Component
 */
export class KanbanboardComponent implements OnInit {

  upcomingTasks: Task[];
  inprogressTasks: Task[];
  completedTasks: Task[];
  memberLists: any;
  status: any;
  assigneeMember: any = [];

  // bread crumb items
  breadCrumbItems: Array<{}>;
  taskForm!: UntypedFormGroup;
  submitted = false;

  @ViewChild('modalForm', { static: false }) modalForm?: ModalDirective;
  alltask: ({ id: number; title: string; date: string; task: string; user: string[]; budget: number; status: string; groupId?: undefined; } | { id: number; title: string; date: string; task: string; user: string[]; budget: number; groupId: number; status: string; })[];

  constructor(private formBuilder: UntypedFormBuilder, public store: Store, private datePipe: DatePipe) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Kanban Board', active: true }];

    this.taskForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      taskdesc: ['', [Validators.required]],
      task: ['', [Validators.required]],
      budget: ['', [Validators.required]],
      user: [],
      status: [''],
      date: ['']
    })
    /**
 * fetches data
 */
    this.store.dispatch(fetchtasklistData());
    this.store.select(selectData).subscribe(data => {
      this.alltask = data;

      this.inprogressTasks = this.alltask.filter(t => t.status === 'inprogress');
      this.upcomingTasks = this.alltask.filter(t => t.status === 'upcoming');
      this.completedTasks = this.alltask.filter(t => t.status === 'completed');
      this.memberLists = memberList
    });
  }

  /**
   * on dragging task
   * @param item item dragged
   * @param list list from item dragged
   */
  onDragged(item: any, list: any[]) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }

  /**
   * On task drop event
   */
  onDrop(event: DndDropEvent, filteredList?: any[], targetStatus?: string) {
    if (filteredList && event.dropEffect === 'move') {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = filteredList.length;
      }

      filteredList.splice(index, 0, event.data);
    }
  }


  // Delete Data
  delete(event: any) {
    event.target.closest('.card .task-box')?.remove();
  }

  // Select Member
  selectMember(id: any) {
    if (this.memberLists[id].checked == true) {
      this.memberLists[id].checked = false;
      this.assigneeMember = this.assigneeMember.filter(item => item !== this.memberLists[id].profile);
    } else {
      this.memberLists[id].checked = true;
      this.assigneeMember.push(this.memberLists[id].profile)
    }

  }

  // add new tak  
  addnewTask(status: any) {
    this.status = status
    this.assigneeMember = []
    this.memberLists.forEach(element => {
      element.checked = false;
    });
    this.modalForm.show()
  }

  // Save Form
  submitForm() {
    if (this.taskForm.valid) {
      if (this.taskForm.get('id')?.value) {
        const updatedData = this.taskForm.value;
        this.store.dispatch(updatetasklist({ updatedData }));
      } else {
        this.taskForm.controls['id'].setValue((this.alltask.length + 1).toString())
        this.taskForm.controls['status'].setValue(this.status)
        this.taskForm.controls['user'].setValue(this.assigneeMember)
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'dd MMM, yyyy');
        this.taskForm.controls['date'].setValue(formattedDate);
        const newData = { ...this.taskForm.value }
        this.store.dispatch(addtasklist({ newData }))
      }
      this.modalForm.hide()
      setTimeout(() => {
        this.taskForm.reset();
      }, 2000);
      this.submitted = true
    }
  }
  // Update Task
  updateTask(id: any) {
    this.submitted = false;
    this.modalForm?.show()

    var updatetitle = document.querySelector('.modal-title') as HTMLAreaElement
    updatetitle.innerHTML = "Update Task";

    var updatebtn = document.getElementById('addtask') as HTMLAreaElement
    updatebtn.innerHTML = "Update Task";
    this.taskForm.patchValue(this.alltask[id]);
  }

}
