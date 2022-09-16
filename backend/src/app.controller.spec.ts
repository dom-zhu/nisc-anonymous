import { Test, TestingModule } from '@nestjs/testing';
import { StoriesController } from './app.controller';
import { StoriesService } from './stories.service';

// describe('AppController', () => {
//   let appController: AppController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [StoriesService],
//     }).compile();

//     appController = app.get<AppController>(AppController);
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(appController.getHello()).toBe('Hello World!');
//     });
//   });
// });
