import React, { useState, useEffect } from 'react';
import { Search, MapPin, FolderTree, RotateCcw, Filter } from 'lucide-react';
import { JOB_TYPES } from '../../utils/constants';
import jobApi from '../../api/jobApi';

export const JobFilters = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  sortBy,
  onSortChange,
  onReset,
  availableLocations = []
}) => {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState(availableLocations);

  useEffect(() => {
    jobApi.getCategories().then((res) => {
      setCategories(res.categories || []);
    });
  }, []);

  useEffect(() => {
    if (availableLocations && availableLocations.length > 0) {
      setLocations(availableLocations);
    } else {
      jobApi.getLocations().then((locs) => {
        if (locs && locs.length > 0) setLocations(locs);
      });
    }
  }, [availableLocations]);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        padding: '24px',
        marginBottom: '28px',
        boxShadow: '0 12px 30px -10px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}
    >
      {/* Top Filter Bar: Search, Category, Location, Sort */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748B',
            }}
          />
          <input
            type="text"
            placeholder="Search role, keyword, or skills..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px 11px 42px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #CBD5E1',
              borderRadius: '12px',
              color: '#0F172A',
              fontSize: '0.925rem',
              fontWeight: 500,
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Category Dropdown Filter */}
        <div style={{ position: 'relative' }}>
          <FolderTree
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748B',
              pointerEvents: 'none'
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px 11px 42px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #CBD5E1',
              borderRadius: '12px',
              color: '#0F172A',
              fontSize: '0.9rem',
              fontWeight: 500,
              outline: 'none',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c.id || c._id} value={c.name || c.jobTypeName}>
                {c.name || c.jobTypeName}
              </option>
            ))}
          </select>
        </div>

        {/* Location Dropdown Filter */}
        <div style={{ position: 'relative' }}>
          <MapPin
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748B',
              pointerEvents: 'none'
            }}
          />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange && onLocationChange(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px 11px 42px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #CBD5E1',
              borderRadius: '12px',
              color: '#0F172A',
              fontSize: '0.9rem',
              fontWeight: 500,
              outline: 'none',
              cursor: 'pointer',
              boxSizing: 'border-box'
            }}
          >
            <option value="All">All Locations</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select & Reset Button */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              flex: 1,
              padding: '11px 14px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #CBD5E1',
              borderRadius: '12px',
              color: '#0F172A',
              fontSize: '0.875rem',
              fontWeight: 500,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="newest">Sort: Newest First</option>
            <option value="match">Sort: Highest Match</option>
            <option value="salary">Sort: Highest Salary</option>
          </select>

          <button
            onClick={onReset}
            title="Reset Filters"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '11px 16px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderRadius: '12px',
              color: '#475569',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'background 0.15s ease'
            }}
          >
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>

      {/* Type Filter Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '4px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B', marginRight: '6px' }}>
          Employment Type:
        </span>
        {['All', ...JOB_TYPES].map((type) => {
          const isSelected = selectedType === type;
          return (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.825rem',
                fontWeight: 600,
                border: isSelected ? '1.5px solid #2563EB' : '1.5px solid #E2E8F0',
                backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                color: isSelected ? '#1D4ED8' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JobFilters;
