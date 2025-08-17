/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

const { buildClassSchemaData } = require('../../lib/schemaUtils');

describe('buildClassSchemaData', () => {
  it('should return empty objects when class does not exist', () => {
    const schema = { data: new Map([['classes', new Map()]]) };
    const result = buildClassSchemaData(schema, 'NonExistentClass', false, null);

    expect(result.columns).toEqual({});
    expect(result.userPointers).toEqual([]);
    expect(result.schemaSimplifiedData).toEqual({});
  });

it('should return columns and schemaSimplifiedData for a normal class', () => {
    const schema = {
      data: new Map([
        ['classes', new Map([
          ['TestClass', new Map([
            ['name', { type: 'String' }],
            ['age', { type: 'Number' }],
            ['objectId', { type: 'String' }]
          ])]
        ])]
      ])
    };

    const result = buildClassSchemaData(schema, 'TestClass', false, null);

    expect(result.columns).toEqual({
      name: { type: 'String' },
      age: { type: 'Number' },
      objectId: { type: 'String' }
    });
    expect(result.userPointers).toEqual([]);
    expect(result.schemaSimplifiedData).toEqual({
      TestClass: {
        name: { type: 'String' },
        age: { type: 'Number' },
        objectId: { type: 'String' }
      }
    });
  });

  it('should identify _User pointers and Array columns', () => {
    const schema = {
      data: new Map([
        ['classes', new Map([
          ['TestClass', new Map([
            ['owner', { type: 'Pointer', targetClass: '_User' }],
            ['tags', { type: 'Array' }],
            ['objectId', { type: 'String' }]
          ])]
        ])]
      ])
    };

    const result = buildClassSchemaData(schema, 'TestClass', false, null);

    expect(result.userPointers).toEqual(['owner', 'tags']);
  });
});
