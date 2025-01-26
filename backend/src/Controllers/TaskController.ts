import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import { Query } from '@nestjs/common';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS*
    const saveTaskUseCase = await this.useCaseFactory.create(SaveTaskUseCase);
  return saveTaskUseCase.handle(dto);
  }

  @Patch('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS
    const saveTaskUseCase = await this.useCaseFactory.create(SaveTaskUseCase);
  return saveTaskUseCase.handle({ ...dto, id: Number(id) });
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
  @Get('/tasks/filter')
async filterTasks(@Query('name') name?: string, @Query('status') status?: string) {
  const parsedStatus = status !== undefined ? status === 'true' : undefined;
  return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle({ name, status: parsedStatus });
}
}
