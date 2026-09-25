import React, { useState } from 'react';
import { Briefcase, Download, Plus, Trash2, Edit2, Check, X, MapPin, DollarSign } from 'lucide-react';
import Button from '../../common/Button';
import InputField from '../../common/InputField';
import Modal from '../../common/Modal';

export const AdminJobsTable = ({
  jobs = [],
  categories = [],
  onCreateJob,
  onUpdateJob,
  onDeleteJob,
  onExportCSV
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    company: 'JobConnect Partner',
    salary: '90000',
    location: 'Remote',
    type: 'Full-time',
    description: '',
    available: true,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: categories[0]?.name || 'Technology',
      company: 'JobConnect Partner',
      salary: '90000',
      location: 'Remote',
      type: 'Full-time',
      description: '',
      available: true,
    });
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || '',
      category: job.category || job.jobType?.jobTypeName || categories[0]?.name || 'Technology',
      company: job.company || 'JobConnect Partner',
      salary: typeof job.salary === 'object' ? `${job.salary.min || 0}` : (job.salary || '90000'),
      location: job.location || 'Remote',
      type: job.type || 'Full-time',
      description: job.description || '',
      available: job.available !== false,
    });
  };

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    if (onCreateJob) {
      onCreateJob({
        ...formData,
        salary: Number(formData.salary) || formData.salary
      });
    }
    setIsCreateOpen(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!editingJob) return;
    if (onUpdateJob) {
      onUpdateJob(editingJob._id || editingJob.id, {
        ...formData,
        salary: Number(formData.salary) || formData.salary
      });
    }
    setEditingJob(null);
  };

  const filteredJobs = jobs.filter(j =>
    (j.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (j.company || '').toLowerCase().includes(search.toLowerCase()) ||
    (j.category || j.jobType?.jobTypeName || '').toLowerCase().includes(search.toLowerCase())
  );

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
      {/* Table Header and Actions */}
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
            <Briefcase size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Job Listings Management
            </h3>
            <span style={{ fontSize: '0.825rem', color: '#64748B' }}>
              Total: {jobs.length} listings in MongoDB Atlas
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '0.85rem',
              color: '#0F172A',
              outline: 'none',
              width: '180px'
            }}
          />

          <Button
            size="sm"
            variant="secondary"
            icon={Download}
            onClick={() => onExportCSV && onExportCSV(filteredJobs)}
          >
            Download CSV
          </Button>

          <Button
            size="sm"
            icon={Plus}
            onClick={handleOpenCreate}
          >
            Create Job
          </Button>
        </div>
      </div>

      {/* Jobs Data Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 10px' }}>Job Title</th>
              <th style={{ padding: '12px 10px' }}>Category</th>
              <th style={{ padding: '12px 10px' }}>Salary</th>
              <th style={{ padding: '12px 10px' }}>Location</th>
              <th style={{ padding: '12px 10px' }}>Available</th>
              <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '36px', textAlign: 'center', color: '#64748B' }}>
                  No jobs found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => {
                const isAvail = job.available !== false;
                const categoryName = job.category || job.jobType?.jobTypeName || 'General';
                const salaryDisplay = job.salaryString || (typeof job.salary === 'object' ? `$${job.salary.min || 0} - $${job.salary.max || 0}` : `$${job.salary}`);

                return (
                  <tr
                    key={job._id || job.id}
                    style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s ease' }}
                  >
                    <td style={{ padding: '14px 10px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{job.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{job.company || 'JobConnect Partner'}</div>
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <span
                        style={{
                          backgroundColor: '#EFF6FF',
                          color: '#1E40AF',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          border: '1px solid #BFDBFE'
                        }}
                      >
                        {categoryName}
                      </span>
                    </td>
                    <td style={{ padding: '14px 10px', fontWeight: 600, color: '#059669' }}>
                      {salaryDisplay}
                    </td>
                    <td style={{ padding: '14px 10px', color: '#475569' }}>
                      {job.location || 'Remote'}
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: isAvail ? '#ECFDF5' : '#F1F5F9',
                          color: isAvail ? '#059669' : '#64748B',
                          border: `1px solid ${isAvail ? '#A7F3D0' : '#CBD5E1'}`
                        }}
                      >
                        {isAvail ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <Button
                          size="sm"
                          variant="secondary"
                          icon={Edit2}
                          onClick={() => handleOpenEdit(job)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          icon={Trash2}
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
                              onDeleteJob && onDeleteJob(job._id || job.id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Create Job Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Job Posting">
        <form onSubmit={handleSubmitCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <InputField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Senior Backend Engineer"
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Job Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                {categories.map((c) => (
                  <option key={c.id || c._id} value={c.name || c.jobTypeName}>
                    {c.name || c.jobTypeName}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Salary (USD)"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              placeholder="e.g. 120000"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. San Francisco, CA or Remote"
              required
            />

            <InputField
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company name"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Job Description
            </label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of responsibilities, requirements, and tech stack..."
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="availableCheck"
              checked={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="availableCheck" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}>
              Mark listing as available for applicants
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button type="submit">Publish Job</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Job Modal */}
      <Modal isOpen={!!editingJob} onClose={() => setEditingJob(null)} title="Edit Job Details">
        <form onSubmit={handleSubmitEdit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <InputField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                {categories.map((c) => (
                  <option key={c.id || c._id} value={c.name || c.jobTypeName}>
                    {c.name || c.jobTypeName}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />

            <InputField
              label="Company"
              name="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Job Description
            </label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="editAvailableCheck"
              checked={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="editAvailableCheck" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}>
              Available for applicants
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="ghost" onClick={() => setEditingJob(null)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminJobsTable;
