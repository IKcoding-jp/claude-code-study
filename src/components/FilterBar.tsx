import { Priority, SortBy, SortOrder } from '../types/todo';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  categories: string[];
  allTags: string[];
  selectedCategory: string;
  selectedPriority: Priority | '';
  selectedCompleted: 'all' | 'completed' | 'active';
  selectedTag: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  onCategoryChange: (category: string) => void;
  onPriorityChange: (priority: Priority | '') => void;
  onCompletedChange: (completed: 'all' | 'completed' | 'active') => void;
  onTagChange: (tag: string) => void;
  onSortByChange: (sortBy: SortBy) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({
  categories,
  allTags,
  selectedCategory,
  selectedPriority,
  selectedCompleted,
  selectedTag,
  sortBy,
  sortOrder,
  onCategoryChange,
  onPriorityChange,
  onCompletedChange,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
  onClearFilters,
}: FilterBarProps) => {
  return (
    <div className={styles.filterBar}>
      <h3 className={styles.title}>フィルター & ソート</h3>

      <div className={styles.filterGrid}>
        <div className={styles.filterGroup}>
          <label htmlFor="category" className={styles.label}>
            カテゴリ
          </label>
          <select
            id="category"
            className={styles.select}
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">すべて</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="priority" className={styles.label}>
            優先度
          </label>
          <select
            id="priority"
            className={styles.select}
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value as Priority | '')}
          >
            <option value="">すべて</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="completed" className={styles.label}>
            状態
          </label>
          <select
            id="completed"
            className={styles.select}
            value={selectedCompleted}
            onChange={(e) =>
              onCompletedChange(e.target.value as 'all' | 'completed' | 'active')
            }
          >
            <option value="all">すべて</option>
            <option value="active">未完了</option>
            <option value="completed">完了</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="tag" className={styles.label}>
            タグ
          </label>
          <select
            id="tag"
            className={styles.select}
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
          >
            <option value="">すべて</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="sortBy" className={styles.label}>
            並び替え
          </label>
          <select
            id="sortBy"
            className={styles.select}
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortBy)}
          >
            <option value="createdAt">作成日時</option>
            <option value="updatedAt">更新日時</option>
            <option value="dueDate">期限</option>
            <option value="priority">優先度</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="sortOrder" className={styles.label}>
            順序
          </label>
          <select
            id="sortOrder"
            className={styles.select}
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
          >
            <option value="asc">昇順</option>
            <option value="desc">降順</option>
          </select>
        </div>
      </div>

      <button className={styles.clearButton} onClick={onClearFilters}>
        フィルターをクリア
      </button>
    </div>
  );
};
