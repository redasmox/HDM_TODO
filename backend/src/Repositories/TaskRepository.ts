import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (!data.id) {
      // @todo IMPLEMENT HERE USING PRISMA API
      return this.prisma.task.create({
        data: data as Prisma.TaskCreateInput,
      });
    }

    // @todo IMPLEMENT HERE USING PRISMA API
    return this.prisma.task.update({
      where: {
        id: data.id as number, // Cast pour assurer que `id` est bien un nombre
      },
      data: data as Prisma.TaskUpdateInput,
    });
  }
  async findFiltered(name?: string, status?: boolean) {
    return this.prisma.task.findMany({
      where: {
        ...(name && { name: { contains: name.toLowerCase() } }),
        ...(status !== undefined && { status }),
      },
    });
  }
}
