import { describe, expect, it } from 'vitest';
import { render } from '../../test-utils';
import { DeleteControl } from './delete-btn';

describe('DeleteControl', () => {
  it('should call onDelete when clicked', () => {
    const onDelete = () => {
      onDelete.called = true;
    };
    onDelete.called = false;

    const { getByTitle } = render(DeleteControl({ onDelete }));

    const button = getByTitle('Delete');
    button.click();

    expect(onDelete.called).toBe(true);
  });
});
