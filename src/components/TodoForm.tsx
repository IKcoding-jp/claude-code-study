import { useState, FormEvent } from 'react';
import { Priority, Todo } from '../types/todo';
import styles from './TodoForm.module.css';

interface TodoFormProps {
  onSubmit: (
    title: string,
    description?: string,
    priority?: Priority,
    dueDate?: string,
    category?: string,
    tags?: string[]
  ) => void;
  editingTodo?: Todo;
  onCancel?: () => void;
}

export const TodoForm = ({ onSubmit, editingTodo, onCancel }: TodoFormProps) => {
  const [title, setTitle] = useState(editingTodo?.title || '');
  const [description, setDescription] = useState(editingTodo?.description || '');
  const [priority, setPriority] = useState<Priority>(editingTodo?.priority || 'medium');
  const [dueDate, setDueDate] = useState(editingTodo?.dueDate || '');
  const [category, setCategory] = useState(editingTodo?.category || '');
  const [tagsInput, setTagsInput] = useState(editingTodo?.tags.join(', ') || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('タイトルを入力してください');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onSubmit(
      title.trim(),
      description.trim() || undefined,
      priority,
      dueDate || undefined,
      category.trim() || undefined,
      tags
    );

    // フォームをリセット（編集モードでない場合）
    if (!editingTodo) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setCategory('');
      setTagsInput('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{editingTodo ? 'TODO編集' : '新規TODO作成'}</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          タイトル <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タスクのタイトルを入力"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          説明
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="詳細な説明（オプション）"
          rows={3}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="priority" className={styles.label}>
            優先度
          </label>
          <select
            id="priority"
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dueDate" className={styles.label}>
            期限
          </label>
          <input
            type="date"
            id="dueDate"
            className={styles.input}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>
          カテゴリ
        </label>
        <input
          type="text"
          id="category"
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="例: 仕事、個人、趣味"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tags" className={styles.label}>
          タグ
        </label>
        <input
          type="text"
          id="tags"
          className={styles.input}
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="カンマ区切りで入力（例: 重要, 急ぎ）"
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          {editingTodo ? '更新' : '作成'}
        </button>
        {onCancel && (
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
};
