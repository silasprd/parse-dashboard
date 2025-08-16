/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
jest.dontMock('../../components/BrowserCell/BrowserCell.react');
jest.mock('idb-keyval');

import React from 'react';
import renderer from 'react-test-renderer';
const BrowserCell = require('../../components/BrowserCell/BrowserCell.react').default;

describe('BrowserCell', () => {
  describe('Required fields', () => {
    it('should not highlight 0 value', () => {
      const component = renderer
        .create(<BrowserCell value={0} markRequiredField={true} isRequired={true} />)
        .toJSON();
      expect(component.props.className).not.toContain('required');
    });

    it('should not highlight false value', () => {
      const component = renderer
        .create(<BrowserCell value={false} markRequiredField={true} isRequired={true} />)
        .toJSON();
      expect(component.props.className).not.toContain('required');
    });

    it('should not highlight empty string value', () => {
      const component = renderer
        .create(<BrowserCell value="" markRequiredField={true} isRequired={true} />)
        .toJSON();
      expect(component.props.className).not.toContain('required');
    });

    it('should highlight null value', () => {
      const component = renderer
        .create(<BrowserCell value={null} markRequiredField={true} isRequired={true} />)
        .toJSON();
      expect(component.props.className).toContain('required');
    });

    it('should highlight undefined value', () => {
      const component = renderer
        .create(<BrowserCell markRequiredField={true} isRequired={true} />)
        .toJSON();
      expect(component.props.className).toContain('required');
    });
  });
  describe('Delete key interception', () => {
    let obj;
    let renderCellContent;

    beforeEach(() => {
      obj = {
        set: jest.fn(),
      };
      renderCellContent = jest.fn();
    });

    it('should reset field value when Delete key is pressed', () => {
      const element = (<BrowserCell field="username" obj={obj} />);
      const testRenderer = renderer.create(element);
      const instance = testRenderer.getInstance();
      
      const e = { key: 'Delete', preventDefault: jest.fn() };
      instance.handleSensitiveFieldDelete(e, 'username', obj, renderCellContent);

      expect(e.preventDefault).toHaveBeenCalled();
      expect(obj.set).toHaveBeenCalledWith('username', null);
      expect(renderCellContent).toHaveBeenCalled();
    });

    it('should reset field value when Backspace key is pressed', () => {
      const element = (<BrowserCell field="password" obj={obj} />);
      const testRenderer = renderer.create(element);
      const instance = testRenderer.getInstance();  

      const e = { key: 'Backspace', preventDefault: jest.fn() };
      instance.handleSensitiveFieldDelete?.(e, 'password', obj, renderCellContent);

      expect(e.preventDefault).toHaveBeenCalled();
      expect(obj.set).toHaveBeenCalledWith('password', null);
      expect(renderCellContent).toHaveBeenCalled();
    });

    it('should do nothing for other keys', () => {
      const element = (<BrowserCell field="authData" obj={obj} />);
      const testRenderer = renderer.create(element);
      const instance = testRenderer.getInstance();

      const e = { key: 'Enter', preventDefault: jest.fn() };
      instance.handleSensitiveFieldDelete?.(e, 'password', obj, renderCellContent);
      instance.handleSensitiveFieldDelete?.(e, 'authData', obj, renderCellContent);

      expect(e.preventDefault).not.toHaveBeenCalled();
      expect(obj.set).not.toHaveBeenCalled();
      expect(renderCellContent).not.toHaveBeenCalled();
    });
  })
});
