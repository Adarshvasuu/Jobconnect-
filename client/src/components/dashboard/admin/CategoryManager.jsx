import React, { useState } from 'react';
import { Plus, Trash2, FolderTree, Layers } from 'lucide-react';
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
      onAddCategory({
        name: name.trim(),
        jobTypeName: name.trim(),
        description: description.trim()
      });
    }
    setName('');
    setDescription('');
    setIsAdding(false);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid #E2E8F0',
        padding: '28px',
        boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.08), 0 4px 16px rgba(15, 23, 42, 0.03)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <FolderTree size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Job Categories (JobType)
            </h3>
            <span style={{ fontSize: '0.825rem', color: '#64748B' }}>
              Total: {categories.length} active sectors in MongoDB
            </span>
          </div>
        </div>

        <Button size="sm" icon={Plus} onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : 'Create Category'}
        </Button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#F8FAFC',
            padding: '20px',
            borderRadius: '16px',
            border: '1.5px solid #CBD5E1',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <InputField
            label="Category Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cloud & DevOps Architecture"
            required
          />
          <InputField
            label="Category Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief overview of roles within this category..."
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Save Category to Database
            </Button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
        {categories.map((cat) => {
          const catId = cat._id || cat.id;
          const catName = cat.name || cat.jobTypeName || 'Category';

          return (
            <div
              key={catId}
              style={{
                padding: '18px',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '12px',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)',
                transition: 'border-color 0.15s ease'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A', marginBottom: '4px' }}>
                  {catName}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4 }}>
                  {cat.description || 'Verified job category sector.'}
                </div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm(`Delete category "${catName}"?`)) {
                    onDeleteCategory && onDeleteCategory(catId);
                  }
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E11D48')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                title="Delete Category"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryManager;
