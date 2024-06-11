import { Test, TestingModule } from '@nestjs/testing';
import { InfraModule } from '@infra/infra.module';

export async function createTestingModule(
  modules: Array<any>,
): Promise<TestingModule> {
  const module: TestingModule = await Test.createTestingModule({
    imports: [InfraModule].concat(modules),
  }).compile();

  return module;
}
