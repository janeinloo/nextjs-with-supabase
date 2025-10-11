import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NoteRowClient, { Note } from '../NoteRowClient';

describe('NoteRowClient', () => {
  const note: Note = { id: 1, title: 'Test Note' };

  it('renders note title and buttons', () => {
    const onDelete = vi.fn();
    const onUpdate = vi.fn();
    render(<NoteRowClient note={note} onDelete={onDelete} onUpdate={onUpdate} />);

    expect(screen.getByText('Test Note')).toBeDefined();
    expect(screen.getByText('Edit')).toBeDefined();
    expect(screen.getByText('Delete')).toBeDefined();
  });

  it('enters edit mode when Edit button is clicked', () => {
    const onDelete = vi.fn();
    const onUpdate = vi.fn();
    render(<NoteRowClient note={note} onDelete={onDelete} onUpdate={onUpdate} />);

    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByDisplayValue('Test Note')).toBeDefined();
    expect(screen.getByText('Save')).toBeDefined();
    expect(screen.getByText('Cancel')).toBeDefined();
  });

  it('calls onUpdate with new title and exits edit mode on Save', () => {
    const onDelete = vi.fn();
    const onUpdate = vi.fn();
    render(<NoteRowClient note={note} onDelete={onDelete} onUpdate={onUpdate} />);

    fireEvent.click(screen.getByText('Edit'));
    const input = screen.getByDisplayValue('Test Note') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Updated Note' } });

    fireEvent.click(screen.getByText('Save'));
    expect(onUpdate).toHaveBeenCalledWith(1, 'Updated Note');
    expect(screen.queryByText('Save')).toBeNull(); // edit mode closed
  });

  it('cancels edit and restores original title', () => {
    const onDelete = vi.fn();
    const onUpdate = vi.fn();
    render(<NoteRowClient note={note} onDelete={onDelete} onUpdate={onUpdate} />);

    fireEvent.click(screen.getByText('Edit'));
    const input = screen.getByDisplayValue('Test Note') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Title' } });

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByText('Test Note')).toBeDefined(); // original restored
  });

  it('calls onDelete when Delete button is clicked', () => {
    const onDelete = vi.fn();
    const onUpdate = vi.fn();
    render(<NoteRowClient note={note} onDelete={onDelete} onUpdate={onUpdate} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});