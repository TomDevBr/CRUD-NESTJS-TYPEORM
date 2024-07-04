import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FindAllTasksDto, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  create(@Body() task: TaskDto) {
    return this.taskService.create(task);
  }

  @Get()
  findAll(@Query() params: FindAllTasksDto): TaskDto[] {
    return this.taskService.findAll(params);
  }

  @Get('/:id')
  findOne(@Param('id') id: string): TaskDto {
    return this.taskService.findOne(id);
  }

  @Put()
  update(@Body() task: TaskDto) {
    this.taskService.update(task);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.taskService.remove(id);
  }
}
