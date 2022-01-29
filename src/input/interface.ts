/**
 *
 * change history:
 * date            defect#        person            comments
 * -----------------------------------------------------------------------------
 * 2022/01/10      -------        cuongnt258        refactor: optimize
 *
 * @author cuongnt258
 * @date 2022/01/10 15:30
 */

export interface CustomInputProps {
  /** @param name */
  name: string;

  /** @param placeholder */
  placeholder?: string;

  /** @param disable */
  disable?: boolean;

  /** @param autoFocus */
  autoFocus?: boolean;

  /** @param keyboardType */
  keyboardType?: 'number' | 'email';

  /** @param secureTextEntry */
  secureTextEntry?: boolean;

  /** @param showCancel */
  showCancel?: boolean;

  /** @param iconRight */
  iconRight?: React.ReactElement;

  /** @param onPressIconRight */
  onPressIconRight?: VoidFunction;

  /** @param typeHeight */
  typeHeight?: '40';

  /** @param onFocus */
  onFocus?: VoidFunction;

  /** @param ref */
  ref?: any;

  /** @param onBlur */
  onBlur?: VoidFunction;

}
