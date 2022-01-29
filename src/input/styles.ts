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

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 16,
  },

  iconRight: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  paddingRight14Percent: {
    paddingRight: '14%',
  },

  height40: {
    height: 40,
  },

  borderOrangeLighter: {
    borderColor: 'red',
  },

  borderGrayLighter: {
    borderColor: 'red',
  },
});

export default styles;
