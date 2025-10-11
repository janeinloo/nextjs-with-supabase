import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoFormClient from '../TodoFormClient';

describe('TodoFormClient', () => {
  it('does not call onAdd when input is empty', () => {
    const onAdd = vi.fn();
    render(<TodoFormClient onAdd={onAdd} />);
    
    // Klikk Add nupule ilma sisendit täitmata
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('calls onAdd with correct value and clears input', () => {
    const onAdd = vi.fn();
    render(<TodoFormClient onAdd={onAdd} />);
    
    const input = screen.getByPlaceholderText(/new todo/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'My Todo' } });

    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    expect(onAdd).toHaveBeenCalledWith('My Todo');
    expect(input.value).toBe('');
  });
});