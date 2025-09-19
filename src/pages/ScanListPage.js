import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import apiService from '../services/apiService';

const ScanFilters = ({ filters, setFilters }) => {
  const statusOptions = ['all', 'pending', 'active', 'completed', 'failed', 'cancelled'];
  const typeOptions = ['all', 'basic', 'advanced', 'comprehensive'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search targets..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Items per page
          </label>
          <select
            value={filters.limit}
            onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value) })}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const ScanTable = ({ scans, loading, onDelete }) => {
  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      active: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || statusColors.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getSeverityBadge = (severity) => {
    const severityColors = {
      critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      info: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${severityColors[severity] || severityColors.info}`}>
        {severity ? severity.charAt(0).toUpperCase() + severity.slice(1) : 'N/A'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Target
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Findings
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Started
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {scans.map((scan) => (
            <tr key={scan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{scan.target}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">{scan.scan_type}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(scan.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {scan.findings_count > 0 ? (
                  <div className="flex space-x-1">
                    {getSeverityBadge(scan.max_severity)}
                    <span className="text-sm text-gray-900 dark:text-white">({scan.findings_count})</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">No findings</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {new Date(scan.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/scans/${scan.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                >
                  View
                </Link>
                {scan.status === 'active' && (
                  <button
                    onClick={() => onDelete(scan.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    Cancel
                  </button>
                )}
                {(scan.status === 'completed' || scan.status === 'failed') && (
                  <button
                    onClick={() => onDelete(scan.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between mt-6 bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-3">
      <div className="flex-1 flex justify-between items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        
        <div className="hidden md:flex">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`mx-1 px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ScanListPage = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    search: '',
    limit: 10
  });
  const { addNotification } = useUI();

  useEffect(() => {
    fetchScans();
  }, [filters, pagination.page]);

const fetchScans = async () => {
  try {
    setLoading(true);

    const params = new URLSearchParams({
      page: pagination.page,
      limit: filters.limit,
      ...(filters.status !== 'all' && { status: filters.status }),
      ...(filters.type !== 'all' && { type: filters.type }),
      ...(filters.search && { search: filters.search })
    });

    console.log('[fetchScans] Request URL:', `/api/v1/scans?${params}`);

    const response = await apiService.get(`/api/v1/scans?${params}`);
    console.log('[fetchScans] Raw response:', response);

    // Extract data safely
    const scans = response.data?.scans ?? [];
    const paginationData = response.data?.pagination ?? {};
    const total = paginationData.total ?? 0;
    const limit = paginationData.limit ?? filters.limit;
    const pages = Math.ceil(total / limit) || 1;

    console.log('[fetchScans] Parsed scans:', scans);
    console.log('[fetchScans] Parsed pagination:', { total, limit, pages });

    setScans(scans);
    setPagination(prev => ({
      ...prev,
      total,
      pages,
      limit
    }));

  } catch (error) {
    console.error('[fetchScans] Error caught:', error);

    addNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to fetch scans'
    });
  } finally {
    setLoading(false);
  }
};


const handleDelete = async (scanId) => {
  if (!window.confirm('Are you sure you want to delete this scan?')) return;

  try {
    await apiService.delete(`/scans/${scanId}`);
    addNotification({
      type: 'success',
      title: 'Success',
      message: 'Scan deleted successfully'
    });

    try {
      await fetchScans(); // nested try/catch
    } catch (fetchError) {
      console.warn('Fetch after delete failed', fetchError);
      // optional: skip notification here
    }

  } catch (error) {
    addNotification({
      type: 'error',
      title: 'Error',
      message: 'Failed to delete scan'
    });
  }
};


  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scan List</h1>
        <Link
          to="/create-scan"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          New Scan
        </Link>
      </div>

      <ScanFilters filters={filters} setFilters={setFilters} />
      <ScanTable scans={scans} loading={loading} onDelete={handleDelete} />
      
      {pagination.pages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ScanListPage;