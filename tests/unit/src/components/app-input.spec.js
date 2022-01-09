import { mount } from '@vue/test-utils';
import AppInput from '../../../../src/components/app-input.vue'

test('mount component', async() => {
  expect(AppInput).toBeTruthy()

  const wrapper = mount(AppInput, {
    props: {
      type: 'password',
      modelValue: 'testi',
    },
  });

  const input = await wrapper.get('input');
  expect(input.element.type).toEqual('password');
  expect(input.element.value).toEqual('testi');
  await input.setValue('testit');
  expect(wrapper.emitted()).toBeTruthy();
  expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  expect(input.element.value).toEqual('testit');
  expect(wrapper.html()).toMatchSnapshot()
});
