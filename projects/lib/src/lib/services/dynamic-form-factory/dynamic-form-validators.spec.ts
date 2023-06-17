import { DynamicFormValidatorPattern } from '../../types';
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

  describe('patternList', () => {
    let form: any;

    beforeEach(() => {
      form = {
        controls: {
          text: { value: '' }
        }
      };
    });

    it('should skip empty values', () => {
      form.controls.text.value = '';
      expect(DynamicFormValidators.patternList([])(form.controls.text)).toBeNull();
    });

    it('should return errors when validation fails', () => {
      form.controls.text.value = 'Some text';

      const patterns: DynamicFormValidatorPattern[] = [
        {
          type: 'pattern',
          pattern: '^[0-9]+$',
          errorCode: 'pattern1'
        },
        {
          type: 'pattern',
          pattern: '^[A-C]+$',
          errorCode: 'pattern2'
        }
      ];

      const result = DynamicFormValidators.patternList(patterns)(form.controls.text);

      expect(result).toEqual({
        pattern1: true,
        pattern2: true
      });
    });

    it('should return NULL when validation is OK', () => {
      form.controls.text.value = 'Some text';

      const patterns: DynamicFormValidatorPattern[] = [
        {
          type: 'pattern',
          pattern: '^[a-zA-Z ]+$',
          errorCode: 'pattern1'
        }
      ];

      const result = DynamicFormValidators.patternList(patterns)(form.controls.text);

      expect(result).toBeNull();
    });
  });
});
