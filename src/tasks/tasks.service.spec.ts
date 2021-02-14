import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  const userTasks = [
    {
      taskId: 'abc-123-1',
      name: 'Learning NestJS',
      completionDate: '2021-02-20',
      categories: ['work', 'dev'],
    },
    {
      taskId: 'abc-123-2',
      name: 'Learning NestJS Testing',
      completionDate: '2021-02-27',
      categories: ['work', 'dev', 'test'],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return an array', () => {
      const result = service.getTasks();
      expect(result).toBeInstanceOf(Array);
    });

    it('should return all tasks', () => {
      service.createTask(userTasks[1]);
      service.createTask(userTasks[2]);
      const result = service.getTasks();
      const tasks = [
        { id: 1, ...userTasks[1] },
        { id: 2, ...userTasks[2] },
      ];
      expect(result).toEqual(tasks);
    });
  });

  describe('getTask', () => {
    it('should return a task by id', () => {
      service.createTask(userTasks[0]);
      service.createTask(userTasks[1]);
      const result = service.getTask(2);
      const taskIdTwo = {
        id: 2,
        ...userTasks[1],
      };
      expect(result).toBeDefined();
      expect(result.id).toEqual(2);
      expect(result).toEqual(taskIdTwo);
    });

    it('should throw 404 error if there in no corresponding id', () => {
      try {
        service.getTask(999);
      } catch (e) {
        // expect(e).toBeInstanceOf(Error);
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Task with ID: 999 not found');
      }
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by id', () => {
      service.createTask(userTasks[0]);
      service.createTask(userTasks[1]);
      const beforeDelete = service.getTasks();

      service.deleteTask(1);
      const afterDelete = service.getTasks();
      const taskIdTwo = {
        id: 2,
        ...userTasks[1],
      };

      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
      expect(afterDelete).toEqual([taskIdTwo]);
    });

    it('should throw 404 error if there in no corresponding id', () => {
      try {
        service.deleteTask(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createTask', () => {
    it('should create a task', () => {
      service.createTask(userTasks[0]);
      const result = service.getTasks();
      const taskIdOne = {
        id: 1,
        ...userTasks[0],
      };
      expect(result).toEqual([taskIdOne]);
    });
  });

  describe('updateTask', () => {
    it('should update a task by id', () => {
      service.createTask(userTasks[0]);
      service.updateTask(1, { name: 'Update Testing' });
      const result = service.getTask(1);

      expect(result.name).toEqual('Update Testing');
    });

    it('should throw 404 error if there in no corresponding id', () => {
      try {
        service.deleteTask(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
