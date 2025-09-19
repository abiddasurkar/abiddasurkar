import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import apiService from '../services/apiService';

const StatsOverview = () => {
  const { addNotification } = useUI();
  const [stats, setStats] = useState({
    totalScans: 0,
    activeScans: 0,
    completedScans: 0,
    failedScans: 0,
    totalVulnerabilities: 0,
    highSeverity: 0,
    mediumSeverity: 0,
    lowSeverity: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      // Use the correct endpoint based on your backend
      const response = await apiService.get('/system/stats');
      const data = response?.data;

      // Handle the actual API response structure
      if (data) {
        setStats({
          totalScans: data.total_scans || 0,
          activeScans: data.active_scans || 0,
          completedScans: data.completed_scans || 0,
          failedScans: data.failed_scans || 0,
          totalVulnerabilities: data.total_vulnerabilities || 0,
          highSeverity: data.high_severity || 0,
          mediumSeverity: data.medium_severity || 0,
          lowSeverity: data.low_severity || 0
        });
      }
    } catch (error) {
      console.error('Stats fetch error:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to fetch dashboard statistics'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-24"></div>
        ))}
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Total Scans', 
      value: stats.totalScans, 
      color: 'blue',
      icon: '📊'
    },
    { 
      label: 'Active Scans', 
      value: stats.activeScans, 
      color: 'green',
      icon: '🔄'
    },
    { 
      label: 'Total Vulnerabilities', 
      value: stats.totalVulnerabilities, 
      color: 'red',
      icon: '🔍'
    },
    { 
      label: 'High Severity', 
      value: stats.highSeverity, 
      color: 'orange',
      icon: '⚠️'
    }
  ];

  const colorMap = {
    blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
    green: 'border-green-500 bg-green-50 dark:bg-green-900/20',
    red: 'border-red-500 bg-red-50 dark:bg-red-900/20',
    orange: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`rounded-lg shadow-sm p-6 border-l-4 transition-all hover:shadow-md ${colorMap[stat.color]}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value.toLocaleString()}</p>
            </div>
            <div className="text-2xl opacity-60">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ActiveScansList = () => {
  const { addNotification } = useUI();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    total: 0
  });

  useEffect(() => {
    fetchActiveScans();
    // Auto-refresh every 10 seconds for active scans
    const interval = setInterval(fetchActiveScans, 10000);
    return () => clearInterval(interval);
  }, [pagination.limit, pagination.offset]);

  const fetchActiveScans = async () => {
    try {
      const queryParams = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: pagination.offset.toString(),
        status: 'running' // Use correct status value
      }).toString();
      
      const response = await apiService.get(`/api/v1/scans?${queryParams}`);
      const data = response?.data;
      
      if (data) {
        setScans(data.scans || []);
        setPagination(prev => ({
          ...prev,
          total: data.total || 0
        }));
      }
    } catch (error) {
      console.error('Active scans fetch error:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to fetch active scans'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'running': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'failed': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'queued': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Scans</h3>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Scans</h3>
        <button 
          onClick={fetchActiveScans}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm flex items-center"
        >
          🔄 Refresh
        </button>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {scans.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No active scans found</p>
            <Link 
              to="/create-scan"
              className="mt-3 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Start New Scan
            </Link>
          </div>
        ) : (
          scans.map((scan) => (
            <div key={scan?.scan_id || Math.random()} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {scan?.scan_name || scan?.target || 'Unnamed Scan'}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(scan?.status)}`}>
                      {scan?.status || 'unknown'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Target: {scan?.target || 'N/A'} • Type: {scan?.scan_type || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Started: {formatDate(scan?.created_at)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {scan?.progress ?? 0}%
                    </div>
                  </div>
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scan?.progress ?? 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {scans.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Showing {pagination.offset + 1} to {Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total} scans
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }))}
              disabled={pagination.offset === 0}
              className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-500"
            >
              Previous
            </button>
            <button
              onClick={() => setPagination(prev => ({ ...prev, offset: prev.offset + prev.limit }))}
              disabled={pagination.offset + pagination.limit >= pagination.total}
              className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RecentResults = () => {
  const { addNotification } = useUI();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentResults();
  }, []);

  const fetchRecentResults = async () => {
    try {
      const response = await apiService.get('/api/v1/scans?status=completed&limit=5&offset=0');
      const data = response?.data;
      setResults(data?.scans || []);
    } catch (error) {
      console.error('Recent results fetch error:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to fetch recent results'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Results</h3>
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Results</h3>
      
      {results.length === 0 ? (
        <div className="text-center py-6">
          <div className="text-3xl mb-2">📋</div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No completed scans yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((scan) => (
            <Link
              key={scan?.scan_id || Math.random()}
              to={`/scan-results/${scan?.scan_id}`}
              className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {scan?.scan_name || scan?.target || 'Unnamed Scan'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {scan?.target} • {scan?.scan_type}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(scan?.completed_at || scan?.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-xs font-medium text-green-600 dark:text-green-400">
                    Completed
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/scan-results"
          className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
        >
          View All Results →
        </Link>
      </div>
    </div>
  );
};

const QuickActions = () => {
  const { addNotification } = useUI();
  const [loading, setLoading] = useState(false);

  const handleQuickScan = async () => {
    const target = prompt('Enter target URL for quick scan:');
    if (!target) return;

    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Please enter a valid URL with http:// or https://'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.post('/api/v1/scans', {
        target: target,
        scan_name: `Quick Scan - ${new Date().toLocaleString()}`,
        scan_type: 'basic',
        depth: 1,
        max_pages: 10,
        threads: 5,
        concurrent_requests: 2,
        timeout: 30,
        enable_evidence_collection: true,
        max_evidence_size: 1048576,
        priority: 'high'
      });

      if (response?.data?.scan_id) {
        addNotification({
          type: 'success',
          title: 'Success',
          message: `Quick scan started successfully (ID: ${response.data.scan_id})`
        });
      }
    } catch (error) {
      console.error('Quick scan error:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to start quick scan'
      });
    } finally {
      setLoading(false);
    }
  };

  const actions = [
    {
      label: 'New Scan',
      to: '/create-scan',
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: '➕'
    },
    {
      label: 'Quick Scan',
      onClick: handleQuickScan,
      color: 'bg-green-500 hover:bg-green-600',
      icon: '⚡',
      disabled: loading
    },
    {
      label: 'View Results',
      to: '/scan-results',
      color: 'bg-purple-500 hover:bg-purple-600',
      icon: '📊'
    },
    {
      label: 'System Health',
      to: '/health',
      color: 'bg-orange-500 hover:bg-orange-600',
      icon: '🏥'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => (
          action.to ? (
            <Link
              key={index}
              to={action.to}
              className={`${action.color} text-white px-4 py-3 rounded-lg text-center transition-colors flex items-center justify-center space-x-2 text-sm font-medium`}
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </Link>
          ) : (
            <button
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`${action.color} text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span>{action.icon}</span>
              <span>{loading && action.label === 'Quick Scan' ? 'Starting...' : action.label}</span>
            </button>
          )
        ))}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      <StatsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActiveScansList />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <RecentResults />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;