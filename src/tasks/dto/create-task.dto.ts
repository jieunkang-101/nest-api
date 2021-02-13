// DTO: Data Transfer Object

export class CreateTaskDto {
  readonly id: number;
  readonly taskId: string;
  readonly name: string;
  readonly completionDate: string;
  readonly categories: string[];
}
