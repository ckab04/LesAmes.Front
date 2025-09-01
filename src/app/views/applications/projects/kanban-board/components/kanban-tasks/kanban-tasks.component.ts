import { Component, inject, type TemplateRef } from '@angular/core'
import { taskList1, taskList2, taskList3, taskList4, type KanbanTaskType } from '../../data'
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { KanbanCardComponent } from '../kanban-card/kanban-card.component'

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { CommonModule } from '@angular/common'

const illustration1 = 'assets/images/extra/ill-1.png'
const illustration2 = 'assets/images/extra/ill-2.png'

@Component({
  selector: 'kanban-tasks',
  standalone: true,
  imports: [
    NgbDropdownModule,
    KanbanCardComponent,
    CommonModule,
    CdkDropListGroup, CdkDropList, CdkDrag,
  ],
  templateUrl: './kanban-tasks.component.html',
  styles: ``,
})
export class KanbanTasksComponent {

  private modalService = inject(NgbModal)

  taskList1: KanbanTaskType[] = [
    {
      id: '601',
      sectionId: '501',
      priority: 'Medium',
      title: 'Simple Design',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 3,
      totalTasks: 16,
      completedTasks: 11,
    },
    {
      id: '602',
      sectionId: '501',
      priority: 'Low',
      title: 'UI/UX Design img.',
      image: illustration2,
      commentsCount: 6,
      totalTasks: 2,
      completedTasks: 0,
    },
    {
      id: '603',
      sectionId: '501',
      priority: 'High',
      title: 'Strong Password',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      tags: ['API', 'Form Submit', 'Responsive'],
      commentsCount: 12,
      totalTasks: 4,
      completedTasks: 0,
    },
    {
      id: '604',
      sectionId: '501',
      priority: 'Medium',
      title: 'Multi Color Dashboard',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 45,
      totalTasks: 4,
      completedTasks: 0,
    },
  ]

  taskList2: KanbanTaskType[] = [
    {
      id: '605',
      sectionId: '502',
      priority: 'High',
      title: 'Nodejs setup',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 34,
      tags: ['API', 'Form Submit'],
      totalTasks: 3,
      completedTasks: 0,
    },
    {
      id: '606',
      sectionId: '502',
      priority: 'Medium',
      title: 'Add Animation Page',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 56,
      totalTasks: 5,
      completedTasks: 0,
    },
    {
      id: '607',
      sectionId: '502',
      priority: 'Medium',
      title: 'QR code issue fix',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 38,
      totalTasks: 15,
      completedTasks: 7,
    },
    {
      id: '608',
      sectionId: '502',
      priority: 'Low',
      title: 'UI/UX Design img.',
      image: illustration2,
      commentsCount: 23,
      totalTasks: 5,
      completedTasks: 0,
    },
  ]

  taskList3: KanbanTaskType[] = [
    {
      id: '609',
      sectionId: '503',
      priority: 'Low',
      title: 'Figma Layer Setup',
      image: illustration1,
      commentsCount: 53,
      totalTasks: 5,
      completedTasks: 0,
    },
    {
      id: '610',
      sectionId: '503',
      priority: 'High',
      title: 'Components BS 5',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 73,
      tags: ['Form Submit', 'Responsive'],
      totalTasks: 5,
      completedTasks: 0,
    },
    {
      id: '611',
      sectionId: '503',
      priority: 'Medium',
      title: 'Live data in data table',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 67,
      totalTasks: 6,
      completedTasks: 0,
    },
    {
      id: '612',
      sectionId: '503',
      priority: 'High',
      title: 'ReactJs setup',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 64,
      totalTasks: 8,
      completedTasks: 5,
    },
  ]

  taskList4: KanbanTaskType[] = [
    {
      id: '613',
      sectionId: '504',
      priority: 'Low',
      title: 'Photoshop 7',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 21,
      totalTasks: 3,
      completedTasks: 0,
    },
    {
      id: '614',
      sectionId: '504',
      priority: 'Medium',
      title: 'Mobile Account Setting',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 12,
      totalTasks: 12,
      completedTasks: 8,
    },
    {
      id: '615',
      sectionId: '504',
      priority: 'Low',
      title: 'UI/UX Design img.',
      image: illustration1,
      commentsCount: 6,
      totalTasks: 2,
      completedTasks: 0,
    },
    {
      id: '616',
      sectionId: '504',
      priority: 'High',
      title: 'Mobile Account Setting',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      commentsCount: 7,
      tags: ['API', 'Responsive'],
      totalTasks: 8,
      completedTasks: 0,
    },
  ]

  drop(event: CdkDragDrop<KanbanTaskType[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  getTaskVariant(title: string) {
    let variant = 'primary'
    if (title === 'To Do') variant = 'pink'
    else if (title === 'In Progress') variant = 'warning'
    else if (title === 'Review') variant = 'success'
    else if (title === 'Done') variant = 'info'
    return variant
  }


  OpenTaskModel(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
