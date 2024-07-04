import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllTasksDto, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findAll(params: FindAllTasksDto): TaskDto[] {
    return this.tasks.filter((task) => {
      let match = true;

      if (params.title != undefined && !task.title.includes(params.title)) {
        match = false;
      }

      if (params.status != undefined && !task.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
  }

  findOne(id: string): TaskDto {
    const foundTask = this.tasks.filter((task) => task.id === id);

    if (foundTask.length) {
      return foundTask[0];
    }

    throw new NotFoundException('Task not found');
  }

  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new NotFoundException('Task not found');
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }
    throw new NotFoundException('Task not found');
  }
}
