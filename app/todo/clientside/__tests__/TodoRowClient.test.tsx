import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoRowClient, { Todo } from '../TodoRowClient';

describe('TodoRowClient', () => {
  const todo: Todo = { id: 1, title: 'My Todo' };

  it('renders todo title and buttons', () => {
    render(<TodoRowClient todo={todo} onDelete={() => {}} onUpdate={() => {}} />);
    expect(screen.getByText('My Todo')).toBeDefined();
    expect(screen.getByText('Edit')).toBeDefined();
    expect(screen.getByText('Delete')).toBeDefined();
  });

  it('enters edit mode when Edit button is clicked', () => {
    render(<TodoRowClient todo={todo} onDelete={() => {}} onUpdate={() => {}} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByDisplayValue('My Todo')).toBeDefined();
    expect(screen.getByText('Save')).toBeDefined();
    expect(screen.getByText('Cancel')).toBeDefined();
  });

  it('calls onUpdate with new title and exits edit mode on Save', () => {
  const onUpdate = vi.fn();
  render(<TodoRowClient todo={todo} onDelete={() => {}} onUpdate={onUpdate} />);
  fireEvent.click(screen.getByText('Edit'));

  const input = screen.getByDisplayValue('My Todo') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Updated Todo' } });
  fireEvent.click(screen.getByText('Save'));

  expect(onUpdate).toHaveBeenCalledWith(1, 'Updated Todo');

  expect(screen.queryByText('Save')).toBeNull();
  expect(screen.queryByDisplayValue('Updated Todo')).toBeNull();
});

  it('cancels edit and restores original title', async () => {
    render(<TodoRowClient todo={todo} onDelete={() => {}} onUpdate={() => {}} />);
    fireEvent.click(screen.getByText('Edit'));

    const input = screen.getByDisplayValue('My Todo') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Changed Title' } });
    fireEvent.click(screen.getByText('Cancel'));

    expect(await screen.findByText('My Todo')).toBeDefined(); // algne title taastatud
    expect(screen.queryByText('Save')).toBeNull(); // edit mode suletud
  });

  it('calls onDelete when Delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<TodoRowClient todo={todo} onDelete={onDelete} onUpdate={() => {}} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});