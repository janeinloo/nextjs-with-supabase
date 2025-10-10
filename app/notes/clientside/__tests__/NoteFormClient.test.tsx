import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NoteFormClient from '../NoteFormClient';

describe('NoteFormClient', () => {
  it('does not call onAdd when input is empty', () => {
    const onAdd = vi.fn();
    render(<NoteFormClient onAdd={onAdd} />);

    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('calls onAdd with correct value and clears input', () => {
    const onAdd = vi.fn();
    render(<NoteFormClient onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/new note title/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'My Note' } });

    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    expect(onAdd).toHaveBeenCalledWith('My Note');
    expect(input.value).toBe('');
  });
});