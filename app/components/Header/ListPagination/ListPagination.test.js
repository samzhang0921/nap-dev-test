import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import ListPagination from './ListPagination';

describe('ListPagination', () => {
  const totalPage = 10;
  const currentPage = 1;
  const updateOffset = jest.fn();

      it('should mount without props ', () => {
      const tree = toJson(mount(<ListPagination />));
      expect(tree).toMatchSnapshot();
    });

    it('should match its snapshot with props', () => {

      const tree = renderer.create(
      <ListPagination totalPage={totalPage} currentPage={currentPage} updateOffset={updateOffset} />
    ).toJSON();

      expect(tree).toMatchSnapshot();
    });

  it('should trigger updateOffset when its clicked', () => {
    const component = mount(  <ListPagination totalPage={totalPage} currentPage={currentPage} updateOffset={updateOffset} />);
    component.find('li').first().simulate('click');
      expect(updateOffset).toHaveBeenCalled();
  });
});
