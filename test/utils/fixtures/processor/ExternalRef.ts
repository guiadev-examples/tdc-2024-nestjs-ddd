import { IProcessor } from 'typeorm-fixtures-cli';
import * as core from '../external/core';
import * as connectors from '../external/connectors';

export default class ExternalRef implements IProcessor<any> {
  preProcess(name: string, object: any): any {
    Object.entries(object).map(([key, value]) => {
      if (typeof value === 'string' && value.startsWith('$')) {
        object[key] = processValue(object[key]);
      }
    });

    return { ...object };
  }
}

function processValue(value: string): string {
  const newValue = value.replace('$', '');
  const function_ = `return ${newValue};`;

  return Function('core', 'connectors', function_)(core, connectors);
}
