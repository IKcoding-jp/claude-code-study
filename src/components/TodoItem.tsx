import { Todo } from '../types/todo';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const getPriorityClass = () => {
    switch (todo.priority) {
      case 'high':
        return styles.priorityHigh;
      case 'medium':
        return styles.priorityMedium;
      case 'low':
        return styles.priorityLow;
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`${todo.title}を完了としてマーク`}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{todo.title}</h3>
          <span className={`${styles.priority} ${getPriorityClass()}`}>
            {todo.priority === 'high' && '高'}
            {todo.priority === 'medium' && '中'}
            {todo.priority === 'low' && '低'}
          </span>
        </div>

        {todo.description && <p className={styles.description}>{todo.description}</p>}

        <div className={styles.metadata}>
          {todo.dueDate && (
            <span className={`${styles.dueDate} ${isOverdue ? styles.overdue : ''}`}>
              期限: {formatDate(todo.dueDate)}
              {isOverdue && ' (期限切れ)'}
            </span>
          )}

          {todo.category && <span className={styles.category}>{todo.category}</span>}

          {todo.tags.length > 0 && (
            <div className={styles.tags}>
              {todo.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.editButton}
          onClick={() => onEdit(todo)}
          aria-label={`${todo.title}を編集`}
        >
          編集
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(todo.id)}
          aria-label={`${todo.title}を削除`}
        >
          削除
        </button>
      </div>
    </div>
  );
};
