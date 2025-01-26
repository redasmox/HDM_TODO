import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class GetAllTasksUseCase
  implements UseCase<Promise<Task[]>, []>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  /*async handle() {
    try {
      return this.taskRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }*/
  async handle(filters?: { name?: string; status?: boolean }) {
    if (filters) {
      return this.taskRepository.findFiltered(filters.name, filters.status);
    }
    return this.taskRepository.findAll();
  }
}
