import { DynamicFormValidators } from './dynamic-form-validators';

describe('DynamicFormValidators', () => {
  describe('equalTo', () => {
    let form: any;

    beforeEach(() => {
      form = {
        controls: {
          password: { value: '' },
          passwordConfirm: { value: '' }
        }
      };

      form.controls.passwordConfirm.parent = form;
    });

    it('should return error when values are different', () => {
      form.controls.password.value = 'password';
      form.controls.passwordConfirm.value = 'not password';
      expect(DynamicFormValidators.equalTo('password')(form.controls.passwordConfirm)).toEqual({ equalTo: true });
    });

    it('should return success when values are the same', () => {
      form.controls.password.value = 'password';
      form.controls.passwordConfirm.value = 'password';
      expect(DynamicFormValidators.equalTo('password')(form.controls.passwordConfirm)).toBeNull();
    });

    it('should return success when related field is not found', () => {
      delete form.controls.password;
      expect(DynamicFormValidators.equalTo('password')(form.controls.passwordConfirm)).toBeNull();
    });
  });
});
