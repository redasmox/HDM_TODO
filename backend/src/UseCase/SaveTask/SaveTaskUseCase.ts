import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import { PrismaService } from '../../PrismaService'

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly prisma: PrismaService) {}

  async handle(dto: SaveTaskDto) {
    /*
    * @todo IMPLEMENT HERE : VALIDATION DTO, DATA SAVING, ERROR CATCHING
     */
    if (dto.id) {
      // Mise à jour de la tâche existante
      return this.prisma.task.update({
        where: { id: dto.id },
        data: {
          name: dto.name,
        },
      });
    } else {
      // Création d'une nouvelle tâche
      return this.prisma.task.create({
        data: {
          name: dto.name,
        },
      });
    }
    // return null;
  }
}
