import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onEdit, onDelete }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>TODOがありません</p>
        <p className={styles.emptyHint}>上のフォームから新しいTODOを作成してください</p>
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
