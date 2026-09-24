import React, { useState } from 'react';
import { Plus, Trash2, FolderTree } from 'lucide-react';
import Button from '../../common/Button';
import InputField from '../../common/InputField';

export const CategoryManager = ({ categories = [], onAddCategory, onDeleteCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (onAddCategory) {
      onAddCategory({ name: name.trim(), description: description.trim() });
    }
    setName('');
    setDescription('');
    setIsAdding(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FolderTree size={20} color="var(--accent-primary)" />
          <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Job Categories</h3>
        </div>
        <Button size="sm" icon={Plus} onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : 'New Category'}
        </Button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '16px',
          }}
        >
          <InputField
            label="Category Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cloud & DevOps"
            required
          />
          <InputField
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Infrastructure, Kubernetes, CI/CD"
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="sm" type="submit">Save Category</Button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{cat.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cat.description}</div>
            </div>
            <button
              onClick={() => onDeleteCategory && onDeleteCategory(cat.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
              }}
              title="Delete Category"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
